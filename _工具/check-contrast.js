/* Text contrast check for the site.
 *   node _工具/check-contrast.js site [widths=390,1440] [langs=zh,en] [only=home,alliance]
 * The page is scrolled one screen at a time. On each screen, every line of text is recorded with
 * its colour, then all glyphs are made transparent and the screen is captured again: that capture is
 * the real background behind each line (fog, photos, gradients, overlays), so contrast is measured
 * against what a reader sees, not against a CSS background colour.
 * Text drawn with a blend mode is always reported: its colour depends on what drifts behind it.
 * Thresholds follow WCAG AA: 4.5:1, or 3:1 for large text (24px+, or 18.66px+ bold).
 */
const fs = require("fs"), path = require("path"), http = require("http");
const pw = require("playwright");

const root = path.resolve(process.argv[2] || "site");
const args = Object.fromEntries(process.argv.slice(3).map((a) => { const i = a.indexOf("="); return [a.slice(0, i), a.slice(i + 1)]; }));
const WIDTHS = (args.widths || "390,1440").split(",").map(Number);
const LANGS = (args.langs || "zh,en").split(",");
const ONLY = args.only ? args.only.split(",") : null;
const VH = 860;

const PAGES = [
  ["home", "index.html"], ["404", "404.html"], ["journal", "journal/index.html"], ["article", "journal/curator-day.html"],
  ["prog-studio", "programmes/advanced-studio.html"], ["prog-apply", "programmes/applications.html"], ["prog-summer", "programmes/summer-lab.html"],
  ["tutor-xg", "faculty/xg.html"], ["tutor-ld", "faculty/ld.html"], ["tutor-sd", "faculty/service-design-tutor.html"], ["tutor-cw", "faculty/curating-writing-tutor.html"],
  ["tutor-guests", "faculty/guest-tutors.html"], ["alliance", "alliance/index.html"], ["lab", "lab/index.html"], ["privacy", "lab/privacy.html"]
].filter(([id]) => !ONLY || ONLY.includes(id));

const MIME = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "application/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".woff2": "font/woff2", ".json": "application/json", ".webmanifest": "application/manifest+json", ".txt": "text/plain" };
const srv = http.createServer((q, r) => {
  let p = decodeURIComponent(q.url.split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  const f = path.join(root, p);
  if (!f.startsWith(root)) { r.writeHead(403); return r.end(); }
  fs.readFile(f, (e, d) => {
    if (e) { r.writeHead(404); return r.end(); }
    r.writeHead(200, { "Content-Type": MIME[path.extname(f)] || "application/octet-stream" });
    r.end(d);
  });
});

// Runs in the page: text lines fully inside the current screen, in viewport coordinates.
// Text inside fixed or sticky bars is only taken on the first screen, so it is counted once.
function collect(first) {
  const out = [], walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const name = (el) => el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") + (typeof el.className === "string" && el.className.trim() ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".") : "");
  const rgba = (c) => { const m = (c.match(/[\d.]+/g) || [0, 0, 0, 0]).map(Number); return { rgb: m.slice(0, 3), a: m[3] == null ? 1 : m[3] }; };
  for (let n; (n = walker.nextNode());) {
    const txt = n.nodeValue.replace(/\s+/g, " ").trim();
    if (!txt) continue;
    const el = n.parentElement;
    if (!el || el.closest("[aria-hidden=true],script,style,noscript,option,.skip,.form__hp,[hidden]")) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility !== "visible" || cs.display === "none") continue;
    let op = 1, blend = null, fixed = false;
    for (let a = el; a && a !== document.documentElement; a = a.parentElement) {
      const s = getComputedStyle(a);
      op *= +s.opacity;
      if (s.mixBlendMode !== "normal" && !blend) blend = s.mixBlendMode;
      if (s.position === "fixed" || s.position === "sticky") fixed = true;
      if (s.display === "none") op = 0;
    }
    if (op < 0.05 || (fixed && !first)) continue;
    // What the glyphs are painted with: SVG fill, a text stroke on hollow text, or the text colour.
    let paint = rgba(cs.color);
    if (el instanceof SVGElement) paint = rgba(cs.fill);
    else if (paint.a === 0 && parseFloat(cs.webkitTextStrokeWidth) > 0) paint = rgba(cs.webkitTextStrokeColor);
    if (paint.a === 0) continue;
    const range = document.createRange(); range.selectNodeContents(n);
    Array.from(range.getClientRects()).forEach((r) => {
      if (r.width < 2 || r.height < 2 || r.top < 0 || r.bottom > innerHeight || r.left < 0 || r.right > innerWidth) return;
      // Skip lines covered by something else (the phone booking bar, the nav): they are hidden, not low-contrast.
      const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      if (!hit || !(hit === el || el.contains(hit) || (hit.contains(el) && getComputedStyle(el).pointerEvents === "none"))) return;
      out.push({
        key: name(el) + "|" + txt.slice(0, 30) + "|" + Math.round(r.left) + "|" + Math.round(r.top + scrollY),
        x: r.left, y: r.top, w: r.width, h: r.height, rgb: paint.rgb, a: paint.a * op,
        size: parseFloat(cs.fontSize), weight: parseInt(cs.fontWeight, 10) || 400,
        blend, sel: (el.parentElement ? name(el.parentElement) + ">" : "") + name(el), text: txt.slice(0, 48)
      });
    });
  }
  return out;
}

// Runs in a blank page: worst-case contrast of each line against the text-free capture.
async function measure({ png, runs, dpr }) {
  const img = new Image(); img.src = "data:image/png;base64," + png; await img.decode();
  const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
  const g = c.getContext("2d"); g.drawImage(img, 0, 0);
  const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  const L = (r, gg, b) => 0.2126 * lin(r) + 0.7152 * lin(gg) + 0.0722 * lin(b);
  return runs.map((t) => {
    const x = Math.round(t.x * dpr), y = Math.round(t.y * dpr), w = Math.min(c.width - x, Math.round(t.w * dpr)), h = Math.min(c.height - y, Math.round(t.h * dpr));
    if (w < 1 || h < 1) return null;
    const d = g.getImageData(x, y, w, h).data, ratios = [], step = Math.max(1, Math.floor(Math.sqrt((w * h) / 900)));
    for (let yy = 0; yy < h; yy += step) for (let xx = 0; xx < w; xx += step) {
      const i = (yy * w + xx) * 4, br = d[i], bg = d[i + 1], bb = d[i + 2];
      const fr = t.a * t.rgb[0] + (1 - t.a) * br, fg = t.a * t.rgb[1] + (1 - t.a) * bg, fb = t.a * t.rgb[2] + (1 - t.a) * bb;
      const l1 = L(fr, fg, fb), l2 = L(br, bg, bb);
      ratios.push((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05));
    }
    ratios.sort((p, q) => p - q);
    return ratios[Math.floor(ratios.length * 0.1)]; // 10th percentile: the weakest patches behind the line, ignoring stray edge pixels
  });
}

(async () => {
  await new Promise((r) => srv.listen(0, r));
  const base = "http://127.0.0.1:" + srv.address().port + "/";
  const browser = await pw.chromium.launch();
  const blank = await browser.newPage();
  const found = new Map();
  for (const [id, url] of PAGES) for (const lang of LANGS) for (const W of WIDTHS) {
    const page = await browser.newPage({ viewport: { width: W, height: VH } });
    // Cloudflare Turnstile (the contact form check) polls forever and is a third-party frame: keep it out of layout checks.
    await page.route(/challenges\.cloudflare\.com/, (r) => r.abort());
    await page.goto(base + url + "?lang=" + lang, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: "*,*::before,*::after{animation-play-state:paused!important;transition:none!important} #dock{display:none!important}" }); // the phone booking bar covers the bottom of every screen
    await page.evaluate(() => { document.querySelectorAll(".reveal").forEach((e) => e.classList.add("in")); document.querySelectorAll("img[loading=lazy]").forEach((i) => (i.loading = "eager")); });
    await page.waitForTimeout(600);
    const H = await page.evaluate(() => document.documentElement.scrollHeight);
    const seen = new Set();
    for (let y = 0; y < H; y += VH - 160) {
      await page.evaluate((yy) => scrollTo(0, yy), y);
      await page.waitForTimeout(350);
      const runs = (await page.evaluate(collect, y === 0)).filter((t) => !seen.has(t.key) && seen.add(t.key));
      if (!runs.length) continue;
      const hide = await page.addStyleTag({ content: "*,*::before,*::after{color:transparent!important;-webkit-text-fill-color:transparent!important;-webkit-text-stroke-color:transparent!important;text-shadow:none!important;text-decoration-color:transparent!important;caret-color:transparent!important} svg text{fill:transparent!important;stroke:transparent!important} ::placeholder{color:transparent!important}" });
      await page.waitForTimeout(80);
      const png = (await page.screenshot()).toString("base64");
      await hide.evaluate((n) => n.remove());
      const ratios = await blank.evaluate(measure, { png, runs, dpr: 1 });
      runs.forEach((t, i) => {
        const r = ratios[i]; if (r == null) return;
        const need = t.size >= 24 || (t.size >= 18.66 && t.weight >= 700) ? 3 : 4.5;
        if (r >= need && !t.blend) return;
        const key = id + " | " + t.sel + ' "' + t.text + '"';
        const f = found.get(key) || { worst: 99, need, blend: t.blend, at: new Set() };
        f.worst = Math.min(f.worst, r); f.at.add(lang + "@" + W); found.set(key, f);
      });
      if (y + VH >= H) break;
    }
    await page.close();
  }
  await browser.close(); srv.close();
  const rows = [...found.entries()].sort((a, b) => a[1].worst - b[1].worst);
  rows.forEach(([k, f]) => console.log((f.blend ? "BLEND(" + f.blend + ") " : "") + f.worst.toFixed(2) + " < " + f.need + "  " + k + "  " + [...f.at].join(" ")));
  console.log("TOTAL " + rows.length + " low-contrast text runs" + (rows.length ? "" : " — all text meets WCAG AA"));
  process.exitCode = rows.length ? 1 : 0;
})();
