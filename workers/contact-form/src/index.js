/*
 * Contact-form Worker (avantgarde-contact) for the site's "从一次作品集评估开始" form.
 * Served at https://email-api.a-v-a-n-t-g-a-r-d-e.com/v1/contact/avantgarde (site/assets/js/content.js → formEndpoint).
 * Its bindings, Durable Object, domain and secrets live in Cloudflare; deploys upload this file only (see README.md).
 * Email template: keep in step with workers/lab-results/src/template.js.
 */
import { DurableObject } from "cloudflare:workers";

const SERVICE_NAME = "avantgarde-contact";
const CONTACT_PATH = "/v1/contact/avantgarde";
const MAX_BODY_BYTES = 32 * 1024;
const MAX_TURNSTILE_TOKEN_LENGTH = 2048;
const DEDUPLICATION_WINDOW_MS = 10 * 60_000;
const TURNSTILE_ACTION = "avantgarde-contact";
const TURNSTILE_HOSTNAMES = new Set([
  "a-v-a-n-t-g-a-r-d-e.com",
  "www.a-v-a-n-t-g-a-r-d-e.com",
]);
const ALLOWED_ORIGINS = new Set([
  "https://a-v-a-n-t-g-a-r-d-e.com",
  "https://www.a-v-a-n-t-g-a-r-d-e.com",
]);
const SENDER = { email: "noreply@a-v-a-n-t-g-a-r-d-e.com", name: "Avantgarde Studio" };
// The visitor's acknowledgement comes from the studio inbox, so a reply reaches a person (Email Routing forwards hello@).
const STUDIO_EMAIL = "hello@a-v-a-n-t-g-a-r-d-e.com";
const ACK_SENDER = { email: STUDIO_EMAIL, name: "Avantgarde Studio 先端艺培" };
const SITE_URL = "https://www.a-v-a-n-t-g-a-r-d-e.com";
const EMAIL_ASSETS = SITE_URL + "/assets/img/email/";
// The form's three choices, in the order the site shows them. Anything else is never echoed to a visitor.
const STAGES = { zh: ["本科", "硕士", "还在考虑"], en: ["BA", "MA", "Not sure yet"] };
const ACK_WINDOW_MS = 60 * 60_000;
const ACK_BUCKETS = [{ key: "ack:global:day", limit: 30, windowMs: 24 * 60 * 60_000 }];
const RATE_BUCKETS = [
  { key: "contact:global:minute", limit: 12, windowMs: 60_000 },
  // Reserve the shared Email Sending daily allowance for Getag transactional mail.
  { key: "contact:global:day", limit: 20, windowMs: 24 * 60 * 60_000 },
  { key: "contact:ip:", limit: 6, windowMs: 10 * 60_000 },
];

export function createAvantgardeContactWorker({ fetchImpl = fetch } = {}) {
  return {
    async fetch(request, env) {
      const url = new URL(request.url);
      if (url.pathname === "/healthz" && request.method === "GET") {
        return json({ ok: true, service: SERVICE_NAME }, 200);
      }
      if (url.pathname !== CONTACT_PATH) {
        return json({ error: "not_found" }, 404);
      }
      if (request.method === "OPTIONS") {
        return handlePreflight(request);
      }
      if (request.method !== "POST") {
        return withCors(json({ error: "method_not_allowed" }, 405), request);
      }
      return handleContact(request, env, fetchImpl);
    },
  };
}

export default createAvantgardeContactWorker();

async function handleContact(request, env, fetchImpl) {
  if (!originIsAllowed(request)) {
    return json({ error: "origin_not_allowed" }, 403);
  }

  const binding = env.SEND_EMAIL;
  const turnstileSecret = readSecret(env.TURNSTILE_SECRET);
  const deduplicationKey = readSecret(env.CONTACT_DEDUPLICATION_KEY);
  if (!binding || typeof binding.send !== "function" || !turnstileSecret || !deduplicationKey) {
    return withCors(json({ error: "service_not_configured" }, 503), request);
  }

  const contentType = mediaType(request.headers.get("content-type"));
  if (!isAcceptedContactContentType(contentType)) {
    return withCors(json({ error: "unsupported_media_type" }, 415), request);
  }

  const body = await inspectRequestBody(request, MAX_BODY_BYTES);
  if (!body.ok) {
    return withCors(json({ error: body.error }, body.status), request);
  }

  let payload;
  try {
    payload = await readContactPayload(request, contentType, body.text);
  } catch {
    return withCors(json({ error: "invalid_submission" }, 400), request);
  }

  if (payload.website) {
    return withCors(json({ ok: true }, 202), request);
  }

  const validationError = validateContactPayload(payload);
  if (validationError) {
    return withCors(json({ error: validationError }, 400), request);
  }

  const turnstile = await verifyTurnstile({
    fetchImpl,
    secret: turnstileSecret,
    token: payload.turnstileToken,
    remoteIp: request.headers.get("cf-connecting-ip"),
  });
  if (!turnstile.ok) {
    return withCors(json({ error: "verification_failed" }, 403), request);
  }

  const claim = await claimContactSubmission(env, request.headers.get("cf-connecting-ip"), payload, deduplicationKey);
  if (claim.status === "duplicate") {
    return withCors(json({ ok: true }, 202), request);
  }
  if (claim.status === "recipient_suppressed") {
    return withCors(json({ error: "recipient_suppressed" }, 422), request);
  }
  if (claim.status === "in_flight") {
    return withCors(json({ error: "delivery_in_progress" }, 503), request);
  }
  if (claim.status === "rate_limited") {
    return withCors(json({ error: "rate_limited" }, 429), request);
  }
  if (claim.status !== "allowed") {
    return withCors(json({ error: "service_not_configured" }, 503), request);
  }

  const receivedAt = new Date();
  try {
    await binding.send(buildContactEmail(payload, receivedAt));
  } catch (error) {
    if (isSuppressedRecipientError(error)) {
      const recorded = await markRecipientSuppressed(env, claim.deduplicationFingerprint);
      return withCors(
        json(recorded ? { error: "recipient_suppressed" } : { error: "delivery_state_unknown" }, recorded ? 422 : 503),
        request,
      );
    }
    const released = await releaseContactSubmission(env, claim.deduplicationFingerprint);
    return withCors(json({ error: released ? "delivery_failed" : "delivery_state_unknown" }, released ? 502 : 503), request);
  }
  await commitContactSubmission(env, claim.deduplicationFingerprint);

  // The enquiry is safely with the studio; the visitor's acknowledgement is best effort and never fails the request.
  const acknowledged = isEmail(payload.contact)
    ? await sendAcknowledgement(env, payload, deduplicationKey, receivedAt)
    : false;
  return withCors(json({ ok: true, acknowledged }, 202), request);
}

// At most one acknowledgement per address per hour, and a daily cap, so the form cannot be used to mail a stranger repeatedly.
async function sendAcknowledgement(env, payload, deduplicationKey, receivedAt) {
  const binding = env.SEND_ACK;
  if (!binding || typeof binding.send !== "function") return false;
  if (!env.EMAIL_GUARD || typeof env.EMAIL_GUARD.idFromName !== "function") return false;
  let fingerprint;
  try {
    fingerprint = await hmacSha256Hex("ack:" + payload.contact.toLowerCase(), deduplicationKey);
    const stub = env.EMAIL_GUARD.get(env.EMAIL_GUARD.idFromName(SERVICE_NAME));
    const response = await stub.fetch("https://email-guard.internal/claim", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ buckets: ACK_BUCKETS, deduplication: { key: fingerprint, windowMs: ACK_WINDOW_MS } }),
    });
    const result = await response.json();
    if (!response.ok || !result.ok || result.pending || result.duplicate || result.suppressed) return false;
  } catch {
    return false;
  }
  try {
    await binding.send(buildAcknowledgementEmail(payload, receivedAt));
  } catch {
    await releaseContactSubmission(env, fingerprint);
    return false;
  }
  await commitContactSubmission(env, fingerprint);
  return true;
}

function handlePreflight(request) {
  if (!originIsAllowed(request) || !preflightHeadersAreAllowed(request)) {
    return json({ error: "origin_not_allowed" }, 403);
  }
  return new Response(null, {
    status: 204,
    headers: corsHeaders(request.headers.get("origin")),
  });
}

async function readContactPayload(request, contentType, jsonText) {
  if (contentType === "application/json") {
    const value = JSON.parse(jsonText);
    return {
      name: valueText(value.name),
      contact: valueText(value.contact),
      stage: valueText(value.stage),
      note: valueText(value.note),
      website: valueText(value.website),
      lang: valueText(value.lang) === "en" ? "en" : "zh",
      turnstileToken: valueText(value.turnstileToken || value["cf-turnstile-response"]),
    };
  }

  const form = await request.formData();
  return {
    name: formText(form.get("name")),
    contact: formText(form.get("contact")),
    stage: formText(form.get("stage")),
    note: formText(form.get("note")),
    website: formText(form.get("website")),
    lang: formText(form.get("lang")) === "en" ? "en" : "zh",
    turnstileToken: formText(form.get("turnstileToken") || form.get("cf-turnstile-response")),
  };
}

function validateContactPayload(payload) {
  if (!payload.name || !payload.contact || !payload.stage || !payload.turnstileToken) {
    return "missing_required_field";
  }
  if (
    payload.name.length > 120 ||
    payload.contact.length > 254 ||
    payload.stage.length > 100 ||
    payload.note.length > 2_000 ||
    payload.website.length > 254 ||
    payload.turnstileToken.length > MAX_TURNSTILE_TOKEN_LENGTH
  ) {
    return "field_too_long";
  }
  if (
    hasLineBreak(payload.name) ||
    hasLineBreak(payload.stage) ||
    [payload.name, payload.contact, payload.stage, payload.note].some(hasUnsafeControlCharacter)
  ) {
    return "invalid_submission";
  }
  return null;
}

async function verifyTurnstile({ fetchImpl, secret, token, remoteIp }) {
  if (!token || token.length > MAX_TURNSTILE_TOKEN_LENGTH) return { ok: false };

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7_000);

  try {
    const response = await fetchImpl(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body, signal: controller.signal },
    );
    if (!response.ok) return { ok: false };
    const result = await response.json();
    return {
      ok: Boolean(result.success) &&
        TURNSTILE_HOSTNAMES.has(result.hostname) &&
        result.action === TURNSTILE_ACTION,
    };
  } catch {
    return { ok: false };
  } finally {
    clearTimeout(timeout);
  }
}

async function claimContactSubmission(env, clientIp, payload, deduplicationKey) {
  if (!env.EMAIL_GUARD || typeof env.EMAIL_GUARD.idFromName !== "function") {
    return { status: "unavailable" };
  }

  try {
    const ipFingerprint = await hmacSha256Hex("ip:" + (clientIp || "missing-client-ip"), deduplicationKey);
    const deduplicationFingerprint = await hmacSha256Hex(canonicalSubmissionValue(payload), deduplicationKey);
    const buckets = RATE_BUCKETS.map((bucket) => ({
      key: bucket.key === "contact:ip:" ? bucket.key + ipFingerprint : bucket.key,
      limit: bucket.limit,
      windowMs: bucket.windowMs,
    }));
    const id = env.EMAIL_GUARD.idFromName(SERVICE_NAME);
    const stub = env.EMAIL_GUARD.get(id);
    if (!stub || typeof stub.fetch !== "function") return { status: "unavailable" };
    const response = await stub.fetch("https://email-guard.internal/claim", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        buckets,
        deduplication: {
          key: deduplicationFingerprint,
          windowMs: DEDUPLICATION_WINDOW_MS,
        },
      }),
    });
    const result = await response.json();
    if (response.status === 429 || result.reason === "rate_limited") return { status: "rate_limited" };
    if (response.ok && result.ok && result.pending) return { status: "in_flight" };
    if (response.ok && result.ok && result.suppressed) return { status: "recipient_suppressed" };
    if (response.ok && result.ok && result.duplicate) return { status: "duplicate" };
    return response.ok && result.ok
      ? { status: "allowed", deduplicationFingerprint }
      : { status: "unavailable" };
  } catch {
    return { status: "unavailable" };
  }
}

async function commitContactSubmission(env, deduplicationFingerprint) {
  if (!deduplicationFingerprint || !env.EMAIL_GUARD || typeof env.EMAIL_GUARD.idFromName !== "function") return false;
  try {
    const id = env.EMAIL_GUARD.idFromName(SERVICE_NAME);
    const stub = env.EMAIL_GUARD.get(id);
    if (!stub || typeof stub.fetch !== "function") return false;
    const response = await stub.fetch("https://email-guard.internal/commit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ deduplication: { key: deduplicationFingerprint } }),
    });
    const result = await response.json();
    return response.ok && result.ok;
  } catch {
    return false;
  }
}

async function releaseContactSubmission(env, deduplicationFingerprint) {
  if (!deduplicationFingerprint || !env.EMAIL_GUARD || typeof env.EMAIL_GUARD.idFromName !== "function") return false;
  try {
    const id = env.EMAIL_GUARD.idFromName(SERVICE_NAME);
    const stub = env.EMAIL_GUARD.get(id);
    if (!stub || typeof stub.fetch !== "function") return false;
    const response = await stub.fetch("https://email-guard.internal/release", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ deduplication: { key: deduplicationFingerprint } }),
    });
    const result = await response.json();
    return response.ok && result.ok;
  } catch {
    return false;
  }
}

async function markRecipientSuppressed(env, deduplicationFingerprint) {
  if (!deduplicationFingerprint || !env.EMAIL_GUARD || typeof env.EMAIL_GUARD.idFromName !== "function") return false;
  try {
    const id = env.EMAIL_GUARD.idFromName(SERVICE_NAME);
    const stub = env.EMAIL_GUARD.get(id);
    if (!stub || typeof stub.fetch !== "function") return false;
    const response = await stub.fetch("https://email-guard.internal/suppress", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ deduplication: { key: deduplicationFingerprint } }),
    });
    const result = await response.json();
    return response.ok && result.ok;
  } catch {
    return false;
  }
}

/* ---------------- email templates ----------------
 * Table layout with inline styles, 600 px wide, so Gmail, Outlook, Apple Mail, QQ Mail and phones
 * render the same. Brand: ink #0e0f0e, paper #f4f5f3, panel grey #d6d6d5, secondary text #4d4e4c.
 * Every template has a plain-text twin. Visitor-typed text appears only in the studio's own copy. */

const FONT = "-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif";
const C = { ink: "#0e0f0e", paper: "#f4f5f3", grey: "#d6d6d5", mid: "#4d4e4c", line: "#e4e4e3", white: "#ffffff" };

function formatTime(date, lang) {
  const opts = { year: "numeric", month: lang === "zh" ? "long" : "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false };
  const beijing = new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : "en-GB", { ...opts, timeZone: "Asia/Shanghai" }).format(date);
  const london = new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : "en-GB", { ...opts, timeZone: "Europe/London" }).format(date);
  return lang === "zh" ? beijing + "（北京时间）· 伦敦 " + london.replace(/^.*\s/, "") : london + " London · " + beijing.replace(/^.*,\s*/, "") + " Beijing";
}

function stageIndex(stage) {
  const zh = STAGES.zh.indexOf(stage), en = STAGES.en.indexOf(stage);
  return zh >= 0 ? zh : en;
}

function emailShell({ lang, preheader, kicker, body }) {
  const year = new Date().getFullYear();
  const foot = lang === "zh"
    ? { org: "先端艺培 Avantgarde Studio · 尚岸光景（ASHORE TIME）旗下", place: "伦敦 · 上海 · 苏州" }
    : { org: "Avantgarde Studio 先端艺培 · part of ASHORE TIME", place: "London · Shanghai · Suzhou" };
  return '<!doctype html><html lang="' + (lang === "zh" ? "zh-CN" : "en") + '"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only">' +
    "<style>:root{color-scheme:light only;supported-color-schemes:light only;}</style>" +
    "<title>Avantgarde Studio</title></head>" +
    '<body style="margin:0;padding:0;background:' + C.paper + ';-webkit-text-size-adjust:100%;">' +
    '<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">' + escapeHtml(preheader) + "&#8203;&nbsp;".repeat(30) + "</div>" +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:' + C.paper + ';"><tr><td align="center" style="padding:32px 12px;">' +
    '<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;border-collapse:separate;">' +
    // header
    '<tr><td style="background:' + C.ink + ';border-radius:18px 18px 0 0;padding:20px 28px;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
    '<td valign="middle"><a href="' + SITE_URL + '" style="text-decoration:none;"><img src="' + EMAIL_ASSETS + 'badge.png" width="108" height="84" alt="Avantgarde Studio 先端艺培" style="display:block;border:0;width:108px;height:84px;color:' + C.paper + ';font:600 18px ' + FONT + ';"></a></td>' +
    '<td valign="bottom" align="right" style="font:600 11px/1.4 ' + FONT + ';letter-spacing:2px;text-transform:uppercase;color:' + C.grey + ';">' + escapeHtml(kicker) + "</td>" +
    "</tr></table></td></tr>" +
    // card
    '<tr><td style="background:' + C.white + ';border-radius:0 0 18px 18px;padding:40px 36px 36px;font:16px/1.7 ' + FONT + ';color:' + C.ink + ';">' + body + "</td></tr>" +
    // footer
    '<tr><td style="padding:28px 36px 8px;font:13px/1.7 ' + FONT + ';color:' + C.mid + ';">' +
    '<img src="' + EMAIL_ASSETS + 'badge.png" width="54" height="42" alt="" style="display:block;border:0;width:54px;height:42px;margin:0 0 12px;">' +
    escapeHtml(foot.org) + "<br>" + escapeHtml(foot.place) + " · " +
    '<a href="mailto:' + STUDIO_EMAIL + '" style="color:' + C.mid + ';">' + STUDIO_EMAIL + "</a> · " +
    '<a href="' + SITE_URL + '" style="color:' + C.mid + ';">a-v-a-n-t-g-a-r-d-e.com</a><br>© ' + year + " Avantgarde Studio</td></tr>" +
    "</table></td></tr></table></body></html>";
}

function heading(text) {
  return '<h1 style="margin:0 0 16px;font:800 28px/1.25 ' + FONT + ';letter-spacing:-0.3px;color:' + C.ink + ';">' + escapeHtml(text) + "</h1>";
}
function para(text, style) {
  return '<p style="margin:0 0 18px;' + (style || "") + '">' + text + "</p>";
}
function label(text) {
  return '<div style="font:600 11px/1.4 ' + FONT + ';letter-spacing:1.6px;text-transform:uppercase;color:' + C.mid + ';margin:0 0 6px;">' + escapeHtml(text) + "</div>";
}
function detailRows(rows) {
  return '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 28px;border-top:1px solid ' + C.line + ';">' +
    rows.map(([k, v]) =>
      '<tr><td valign="top" style="padding:12px 16px 12px 0;border-bottom:1px solid ' + C.line + ';width:34%;font:500 13px/1.5 ' + FONT + ';color:' + C.mid + ';">' + escapeHtml(k) + "</td>" +
      '<td valign="top" style="padding:12px 0;border-bottom:1px solid ' + C.line + ';font:600 15px/1.5 ' + FONT + ';color:' + C.ink + ';word-break:break-word;">' + v + "</td></tr>").join("") +
    "</table>";
}
function button(href, text) {
  return '<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 8px;"><tr><td style="background:' + C.ink + ';border-radius:999px;">' +
    '<a href="' + escapeHtml(href) + '" style="display:inline-block;padding:14px 28px;font:600 15px/1 ' + FONT + ';color:' + C.paper + ';text-decoration:none;border-radius:999px;">' + escapeHtml(text) + " &rarr;</a></td></tr></table>";
}

/* To the studio: everything the visitor sent, ready to reply to. */
function buildContactEmail(payload, receivedAt = new Date()) {
  const note = payload.note || "";
  const email = isEmail(payload.contact);
  const langName = payload.lang === "en" ? "English 英文" : "中文 Chinese";
  const subject = "新预约 New enquiry · " + payload.name + " · " + payload.stage;
  const text = [
    "新的作品集评估预约 · New portfolio review request",
    "",
    "姓名 Name: " + payload.name,
    "联系方式 Contact: " + payload.contact,
    "申请阶段 Applying for: " + payload.stage,
    "页面语言 Site language: " + langName,
    "收到时间 Received: " + formatTime(receivedAt, "zh"),
    "",
    "想聊的方向 Note:",
    note || "（未填写 None）",
    "",
    email ? "对方已留下邮箱，直接回复这封邮件即可。系统会自动给对方发一封确认邮件（同一邮箱每小时最多一封）。" : "对方留的是微信号或其他联系方式，请在微信里添加。没有自动确认邮件。",
  ].join("\n");
  const contactCell = email
    ? '<a href="mailto:' + escapeHtml(payload.contact) + '" style="color:' + C.ink + ';">' + escapeHtml(payload.contact) + "</a>"
    : escapeHtml(payload.contact) + '<div style="font:400 12px/1.5 ' + FONT + ';color:' + C.mid + ';">微信或其他联系方式 · WeChat or other</div>';
  const body =
    heading("新的作品集评估预约") +
    para("New portfolio review request from the website.", "color:" + C.mid + ";font-size:14px;margin-top:-10px;") +
    detailRows([
      ["姓名 Name", escapeHtml(payload.name)],
      ["联系方式 Contact", contactCell],
      ["申请阶段 Applying for", escapeHtml(payload.stage)],
      ["页面语言 Site language", escapeHtml(langName)],
      ["收到时间 Received", escapeHtml(formatTime(receivedAt, "zh"))],
    ]) +
    label("想聊的方向 · Note") +
    '<div style="background:' + C.paper + ';border-radius:12px;padding:16px 18px;margin:0 0 28px;white-space:pre-wrap;font:400 15px/1.7 ' + FONT + ';color:' + C.ink + ';">' +
    (note ? escapeHtml(note) : '<span style="color:' + C.mid + ';">（未填写 None）</span>') + "</div>" +
    (email
      ? button("mailto:" + payload.contact + "?subject=" + encodeURIComponent(payload.lang === "en" ? "Your portfolio review · Avantgarde Studio" : "你的作品集评估 · 先端艺培"), "回复 Reply to " + payload.name) +
        para("直接回复这封邮件也会发给对方。系统会自动给对方发一封确认邮件（同一邮箱每小时最多一封）。", "color:" + C.mid + ";font-size:13px;margin:12px 0 0;")
      : para("对方留的是微信号或其他联系方式，请在微信里添加；没有自动确认邮件。", "color:" + C.mid + ";font-size:13px;margin:0;"));
  // Cloudflare needs an explicit recipient even on a restricted binding; the studio copy goes to the monitored hello@ inbox.
  const message = {
    from: SENDER,
    to: STUDIO_EMAIL,
    subject,
    text,
    html: emailShell({ lang: "zh", preheader: payload.name + " · " + payload.stage + " · " + (note ? note.slice(0, 80) : payload.contact), kicker: "网站预约 · Enquiry", body }),
    headers: { "Auto-Submitted": "auto-generated" },
  };
  if (email) message.replyTo = payload.contact;
  return message;
}

/* To the visitor: a warm, fixed confirmation in the language they used. It never repeats what they typed. */
function buildAcknowledgementEmail(payload, receivedAt = new Date()) {
  const lang = payload.lang === "en" ? "en" : "zh";
  const i = stageIndex(payload.stage);
  const stage = i >= 0 ? STAGES[lang][i] : null;
  const L = lang === "zh" ? {
    subject: "我们收到了你的作品集评估预约 · 先端艺培",
    preheader: "导师团队会在两个工作日内联系你。",
    kicker: "已收到 · Received",
    title: "谢谢你，我们收到了。",
    lead: "你的作品集评估预约已经送到先端艺培。导师团队会在两个工作日内，通过你留下的这个邮箱回复你。",
    rows: [["申请阶段", stage], ["收到时间", formatTime(receivedAt, "zh")], ["回复方式", "本邮箱"]],
    next: "接下来",
    steps: [
      ["看作品，聊方向", "先看你手头的作品和想法，不需要准备完整的作品集。"],
      ["定位与规划", "一起确定专业、院校和时间线。"],
      ["诚实的建议", "告诉你哪里已经不错、哪里还要补，再一起决定下一步。"],
    ],
    tip: "想让第一次沟通更有效？直接回复这封邮件，附上几张作品、作业或过程稿就好。",
    cta: "了解课程",
    ctaHref: SITE_URL + "/?lang=zh#programmes",
    lab: "或者先做一次 AG LAB 创作人格测试（约 8 分钟）",
    labHref: SITE_URL + "/lab/?lang=zh",
    wechat: "也可以扫码添加企业微信",
    wechatWho: "XG · 先端艺培学术主理",
    small: "这是一封自动确认邮件，直接回复即可联系我们。如果你没有在 a-v-a-n-t-g-a-r-d-e.com 提交过预约，请忽略这封邮件。",
  } : {
    subject: "We’ve received your portfolio review request · Avantgarde Studio",
    preheader: "Our tutors will be in touch within two working days.",
    kicker: "Received · 已收到",
    title: "Thank you — it’s with us.",
    lead: "Your portfolio review request has reached Avantgarde Studio. Our tutors will reply to this email address within two working days.",
    rows: [["Applying for", stage], ["Received", formatTime(receivedAt, "en")], ["We’ll reply", "To this email address"]],
    next: "What happens next",
    steps: [
      ["We look and listen", "We look at the work and ideas you have now — no finished portfolio needed."],
      ["We plan together", "Course, schools and timeline, agreed with you."],
      ["Honest advice", "What already works, what still needs doing, and the next step."],
    ],
    tip: "Want the first conversation to go further? Reply to this email with a few pieces of work, coursework or sketches.",
    cta: "Explore the programmes",
    ctaHref: SITE_URL + "/?lang=en#programmes",
    lab: "Or try the AG LAB creative persona test first (about 8 minutes)",
    labHref: SITE_URL + "/lab/?lang=en",
    wechat: "Prefer WeChat? Scan to add us on WeCom",
    wechatWho: "XG · Academic lead, Avantgarde Studio",
    small: "This is an automatic confirmation; reply to reach us. If you didn’t send a request on a-v-a-n-t-g-a-r-d-e.com, you can ignore this email.",
  };
  const rows = L.rows.filter(([, v]) => v);
  const text = [
    L.title, "", L.lead, "",
    ...rows.map(([k, v]) => k + (lang === "zh" ? "：" : ": ") + v), "",
    L.next + (lang === "zh" ? "：" : ":"),
    ...L.steps.map(([t, d], n) => "0" + (n + 1) + "  " + t + " — " + d), "",
    L.tip, "",
    L.cta + ": " + L.ctaHref,
    L.lab + ": " + L.labHref, "",
    "Avantgarde Studio 先端艺培 · " + STUDIO_EMAIL + " · " + SITE_URL,
    L.small,
  ].join("\n");
  const steps = '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">' +
    L.steps.map(([t, d], n) =>
      '<tr><td valign="top" style="width:44px;padding:14px 0;border-top:1px solid ' + C.line + ';font:800 15px/1.5 ' + FONT + ';color:' + C.ink + ';">0' + (n + 1) + "</td>" +
      '<td valign="top" style="padding:14px 0;border-top:1px solid ' + C.line + ';"><div style="font:600 15px/1.5 ' + FONT + ';color:' + C.ink + ';">' + escapeHtml(t) + "</div>" +
      '<div style="font:400 14px/1.6 ' + FONT + ';color:' + C.mid + ';">' + escapeHtml(d) + "</div></td></tr>").join("") +
    "</table>";
  const wechat = '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 0;background:' + C.paper + ';border-radius:14px;"><tr>' +
    '<td style="padding:18px;width:112px;"><img src="' + EMAIL_ASSETS + 'wechat-qr.png" width="112" height="112" alt="WeCom QR" style="display:block;border:0;width:112px;height:112px;border-radius:8px;background:#ffffff;"></td>' +
    '<td valign="middle" style="padding:18px 18px 18px 4px;"><div style="font:600 15px/1.5 ' + FONT + ';color:' + C.ink + ';">' + escapeHtml(L.wechat) + "</div>" +
    '<div style="font:400 13px/1.6 ' + FONT + ';color:' + C.mid + ';">' + escapeHtml(L.wechatWho) + "</div></td></tr></table>";
  const body =
    heading(L.title) + para(escapeHtml(L.lead)) +
    detailRows(rows.map(([k, v]) => [k, escapeHtml(v)])) +
    label(L.next) + steps +
    '<div style="border-left:3px solid ' + C.ink + ';padding:2px 0 2px 16px;margin:0 0 28px;font:400 15px/1.7 ' + FONT + ';color:' + C.ink + ';">' + escapeHtml(L.tip) + "</div>" +
    button(L.ctaHref, L.cta) +
    para('<a href="' + escapeHtml(L.labHref) + '" style="color:' + C.ink + ';">' + escapeHtml(L.lab) + "</a>", "margin:16px 0 0;font-size:14px;") +
    wechat +
    para(escapeHtml(L.small), "margin:24px 0 0;font-size:12px;line-height:1.6;color:" + C.mid + ";");
  return {
    from: ACK_SENDER,
    to: payload.contact,
    replyTo: STUDIO_EMAIL,
    subject: L.subject,
    text,
    html: emailShell({ lang, preheader: L.preheader, kicker: L.kicker, body }),
    headers: { "Auto-Submitted": "auto-replied" },
  };
}

export class AvantgardeEmailGuard extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.ctx = ctx;
    this.env = env;
  }

  async fetch(request) {
    return handleGuardRequest(this.ctx, request);
  }

  async alarm() {
    await cleanExpiredGuardState(this.ctx);
  }
}

async function handleGuardRequest(ctx, request) {
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405);
  const pathname = new URL(request.url).pathname;
  if (pathname === "/commit") return handleGuardCommit(ctx, request);
  if (pathname === "/release") return handleGuardRelease(ctx, request);
  if (pathname === "/suppress") return handleGuardSuppress(ctx, request);
  if (pathname !== "/claim") return json({ error: "not_found" }, 404);
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "invalid_submission" }, 400);
  }
  if (
    !payload ||
    !Array.isArray(payload.buckets) ||
    payload.buckets.length < 1 ||
    payload.buckets.length > 4 ||
    !validDeduplication(payload.deduplication)
  ) {
    return json({ error: "invalid_submission" }, 400);
  }

  const now = Date.now();
  const deduplicationStorageKey = "dedupe:" + payload.deduplication.key;
  const deduplicationCurrent = await ctx.storage.get(deduplicationStorageKey);
  if (deduplicationCurrent && deduplicationCurrent.expiresAt > now) {
    if (deduplicationCurrent.state === "pending") return json({ ok: true, pending: true }, 200);
    if (deduplicationCurrent.state === "suppressed") return json({ ok: true, suppressed: true }, 200);
    return json({ ok: true, duplicate: true }, 200);
  }
  const buckets = [];
  for (const bucket of payload.buckets) {
    if (!validBucket(bucket)) return json({ error: "invalid_submission" }, 400);
    const storageKey = "rate:" + bucket.key;
    const current = await ctx.storage.get(storageKey);
    const active = current && current.expiresAt > now ? current : null;
    if (active && active.count >= bucket.limit) {
      return json({ ok: false, reason: "rate_limited" }, 429);
    }
    buckets.push({
      storageKey,
      value: {
        count: (active ? active.count : 0) + 1,
        expiresAt: active ? active.expiresAt : now + bucket.windowMs,
      },
    });
  }

  const deduplicationEntry = {
    storageKey: deduplicationStorageKey,
    value: { expiresAt: now + payload.deduplication.windowMs, state: "pending" },
  };
  await Promise.all([...buckets, deduplicationEntry].map((entry) => ctx.storage.put(entry.storageKey, entry.value)));
  await ctx.storage.setAlarm(Math.min(...buckets.map((entry) => entry.value.expiresAt), deduplicationEntry.value.expiresAt));
  return json({ ok: true, duplicate: false }, 200);
}

async function handleGuardCommit(ctx, request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "invalid_submission" }, 400);
  }
  if (!payload || !validDeduplicationKey(payload.deduplication?.key)) {
    return json({ error: "invalid_submission" }, 400);
  }
  await ctx.storage.put("dedupe:" + payload.deduplication.key, {
    expiresAt: Date.now() + DEDUPLICATION_WINDOW_MS,
    state: "sent",
  });
  return json({ ok: true }, 200);
}

async function handleGuardRelease(ctx, request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "invalid_submission" }, 400);
  }
  if (!payload || !validDeduplicationKey(payload.deduplication?.key)) {
    return json({ error: "invalid_submission" }, 400);
  }
  const storageKey = "dedupe:" + payload.deduplication.key;
  const current = await ctx.storage.get(storageKey);
  if (current && current.expiresAt > Date.now() && current.state !== "pending") {
    return json({ ok: false }, 409);
  }
  await ctx.storage.delete(storageKey);
  return json({ ok: true }, 200);
}

async function handleGuardSuppress(ctx, request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "invalid_submission" }, 400);
  }
  if (!payload || !validDeduplicationKey(payload.deduplication?.key)) {
    return json({ error: "invalid_submission" }, 400);
  }
  await ctx.storage.put("dedupe:" + payload.deduplication.key, {
    expiresAt: Date.now() + DEDUPLICATION_WINDOW_MS,
    state: "suppressed",
  });
  return json({ ok: true }, 200);
}

async function cleanExpiredGuardState(ctx) {
  const now = Date.now();
  const entries = await ctx.storage.list({ limit: 1_000 });
  let nextExpiry = null;
  for (const [key, value] of entries) {
    if (!value || value.expiresAt <= now) {
      await ctx.storage.delete(key);
    } else if (nextExpiry === null || value.expiresAt < nextExpiry) {
      nextExpiry = value.expiresAt;
    }
  }
  if (nextExpiry !== null) await ctx.storage.setAlarm(nextExpiry);
}

function validBucket(bucket) {
  return Boolean(
    bucket &&
    typeof bucket.key === "string" &&
    /^[a-z0-9:_-]{1,160}$/.test(bucket.key) &&
    Number.isInteger(bucket.limit) &&
    bucket.limit >= 1 &&
    bucket.limit <= 10_000 &&
    Number.isInteger(bucket.windowMs) &&
    bucket.windowMs >= 1_000 &&
    bucket.windowMs <= 86_400_000,
  );
}

function validDeduplication(value) {
  return Boolean(
    value &&
    validDeduplicationKey(value.key) &&
    Number.isInteger(value.windowMs) &&
    value.windowMs >= 60_000 &&
    value.windowMs <= 3_600_000,
  );
}

function validDeduplicationKey(value) {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}

async function inspectRequestBody(request, maxBytes) {
  const contentLength = request.headers.get("content-length");
  if (contentLength !== null) {
    if (!/^[0-9]+$/.test(contentLength)) return { ok: false, status: 400, error: "invalid_content_length" };
    if (Number(contentLength) > maxBytes) return { ok: false, status: 413, error: "payload_too_large" };
  }

  let clone;
  try {
    clone = request.clone();
  } catch {
    return { ok: false, status: 400, error: "invalid_submission" };
  }
  if (!clone.body) return { ok: true, text: "" };

  const reader = clone.body.getReader();
  const chunks = [];
  let total = 0;
  try {
    while (true) {
      const result = await reader.read();
      if (result.done) break;
      total += result.value.byteLength;
      if (total > maxBytes) {
        await reader.cancel();
        return { ok: false, status: 413, error: "payload_too_large" };
      }
      chunks.push(result.value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return { ok: true, text: new TextDecoder("utf-8", { fatal: true }).decode(bytes) };
  } catch {
    return { ok: false, status: 400, error: "invalid_submission" };
  }
}

function originIsAllowed(request) {
  return ALLOWED_ORIGINS.has(request.headers.get("origin"));
}

function preflightHeadersAreAllowed(request) {
  const requested = request.headers.get("access-control-request-headers");
  if (!requested) return true;
  return requested.split(",").every((header) => header.trim().toLowerCase() === "content-type");
}

function withCors(response, request) {
  if (!originIsAllowed(request)) return response;
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(corsHeaders(request.headers.get("origin")))) {
    headers.set(key, value);
  }
  return new Response(response.body, { status: response.status, headers });
}

function corsHeaders(origin) {
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
    vary: "Origin",
  };
}

function mediaType(value) {
  return (value || "").split(";", 1)[0].trim().toLowerCase();
}

function isAcceptedContactContentType(value) {
  return value === "application/json" ||
    value === "multipart/form-data" ||
    value === "application/x-www-form-urlencoded";
}

function readSecret(value) {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function formText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function valueText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function hasLineBreak(value) {
  return /[\r\n]/.test(value);
}

function isEmail(value) {
  return !hasUnsafeControlCharacter(value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function hasUnsafeControlCharacter(value) {
  return /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/.test(value);
}

function escapeHtml(value) {
  return valueText(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function canonicalSubmissionValue(payload) {
  return JSON.stringify([
    payload.name,
    payload.contact.toLowerCase(),
    payload.stage,
    payload.note,
  ]);
}

function isSuppressedRecipientError(error) {
  return Boolean(error && error.code === "E_RECIPIENT_SUPPRESSED");
}

async function hmacSha256Hex(value, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function json(payload, status) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
