/*
 * Demo-phase password gate for the whole Cloudflare Pages site.
 *
 * The password is the Pages secret SITE_PASSWORD (Cloudflare dashboard > Workers & Pages >
 * avantgarde-site > Settings > Variables and Secrets, type "Secret"). It is never in this repo.
 * While SITE_PASSWORD is unset the site is open, as before. To open the site to everyone at
 * launch, delete the secret (and redeploy) or delete this file.
 *
 * Signing in sets an HttpOnly cookie for 30 days. Changing the password signs everyone out.
 * /api/lab/* is served by the lab-results Worker route, not by Pages, so it is not affected.
 */

const COOKIE = "ag_demo";
const MAX_AGE = 60 * 60 * 24 * 30;
const LOGIN_PATH = "/__demo-login";
const OPEN_PATHS = new Set(["/favicon.svg"]);

const enc = new TextEncoder();

async function hmac(key, message) {
  const k = await crypto.subtle.importKey("raw", enc.encode(key), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", k, enc.encode(message)));
}

function hex(bytes) {
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Compares two strings in constant time by comparing their HMACs (equal length by construction).
async function same(a, b, key) {
  const [x, y] = await Promise.all([hmac(key, a), hmac(key, b)]);
  return crypto.subtle.timingSafeEqual(x, y);
}

// The cookie holds an HMAC keyed by the password, so it can't be forged and says nothing about it.
function sessionToken(password) {
  return hmac(password, "avantgarde-demo-session-v1").then(hex);
}

function readCookie(request, name) {
  const header = request.headers.get("Cookie") || "";
  for (const part of header.split(";")) {
    const i = part.indexOf("=");
    if (i > -1 && part.slice(0, i).trim() === name) return part.slice(i + 1).trim();
  }
  return "";
}

// Only same-site paths, so the login form can't be used to redirect elsewhere.
function safeNext(value) {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") && !value.startsWith("/\\") ? value : "/";
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function loginPage(next, failed) {
  const html = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Avantgarde Studio · 预览</title>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<style>
  :root { color-scheme: light dark; --bg: #f4f5f3; --fg: #0e0f0e; --line: #d6d6d5; }
  @media (prefers-color-scheme: dark) { :root { --bg: #0e0f0e; --fg: #f4f5f3; --line: #d6d6d5; } }
  * { box-sizing: border-box; }
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 16px;
    background: var(--bg); color: var(--fg);
    font: 16px/1.5 -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, "PingFang SC", "Microsoft YaHei", sans-serif; }
  main { width: 100%; max-width: 360px; }
  h1 { font-size: 13px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; margin: 0 0 32px; }
  p { margin: 0 0 24px; }
  p span { display: block; opacity: .7; font-size: 14px; }
  label { display: block; font-size: 13px; margin-bottom: 8px; }
  input { width: 100%; padding: 12px 14px; font: inherit; color: inherit; background: transparent;
    border: 1px solid var(--line); border-radius: 0; }
  input:focus { outline: 2px solid var(--fg); outline-offset: -1px; }
  button { margin-top: 16px; width: 100%; padding: 12px 14px; font: inherit; cursor: pointer;
    background: var(--fg); color: var(--bg); border: 1px solid var(--fg); border-radius: 0; }
  .error { margin: 16px 0 0; font-size: 14px; }
</style>
</head>
<body>
<main>
  <h1>Avantgarde Studio</h1>
  <p>网站仍在预览阶段，请输入密码。<span>This site is still in preview. Please enter the password.</span></p>
  <form method="post" action="${LOGIN_PATH}">
    <input type="hidden" name="next" value="${escapeHtml(next)}">
    <label for="pw">密码 · Password</label>
    <input id="pw" name="password" type="password" autocomplete="current-password" required autofocus>
    <button type="submit">进入 · Enter</button>
    ${failed ? '<p class="error" role="alert">密码不正确。<span>Wrong password.</span></p>' : ""}
  </form>
</main>
</body>
</html>`;
  return new Response(html, {
    status: 401,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow"
    }
  });
}

export async function onRequest(context) {
  const { request, env, next } = context;
  const password = env.SITE_PASSWORD;
  if (!password) return next();

  const url = new URL(request.url);
  if (OPEN_PATHS.has(url.pathname)) return next();

  const expected = await sessionToken(password);

  if (url.pathname === LOGIN_PATH && request.method === "POST") {
    let form;
    try { form = await request.formData(); } catch (e) { form = new FormData(); }
    const given = String(form.get("password") || "");
    const target = safeNext(String(form.get("next") || "/"));
    if (!(await same(given, password, expected))) return loginPage(target, true);
    return new Response(null, {
      status: 303,
      headers: {
        Location: target,
        "Set-Cookie": `${COOKIE}=${expected}; Max-Age=${MAX_AGE}; Path=/; HttpOnly; Secure; SameSite=Lax`,
        "Cache-Control": "no-store"
      }
    });
  }

  if (await same(readCookie(request, COOKIE), expected, password)) {
    const response = await next();
    // Keep the demo out of search engines while it is locked.
    const out = new Response(response.body, response);
    out.headers.set("X-Robots-Tag", "noindex, nofollow");
    return out;
  }

  return loginPage(url.pathname === LOGIN_PATH ? "/" : url.pathname + url.search, false);
}
