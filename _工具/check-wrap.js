#!/usr/bin/env node
/*
 * Line-wrap check for the site and AG LAB: every page and every lab step, zh + en, 280-2560px.
 *   node _工具/check-wrap.js site [engine=chromium|webkit] [only=home,lab-result] [langs=zh,en]
 *        [widths=320,390] [stress=1] [shots=<dir>] [json=<file>] [scrollbar=17] [pages=a.html,b.html]
 * stress=1 also tries every persona name, school, question etc. in its slot; scrollbar=17 mimics Windows;
 * pages= checks plain pages under the given folder instead (e.g. the 平台实施包 previews).
 * Prints, per page state and language, the widths where it finds:
 *   WRAP      a button, pill, tab or short label broken onto two lines
 *   ORPHAN-H  a title or short line ending in one lone character / a lone short word (ORPHAN-P: body text)
 *   SPLIT     a Latin word or number cut in two;  SPLIT-ZH  a Chinese word cut in two in a title
 *   KINSOKU   a line starting with ，。）· etc. or ending with （
 *   STACK     a short title stacked one word per line
 *   OVER / SPILL / CLIP / OFFSCREEN / HSCROLL  text outside its box, its card, a clipping parent, the screen
 *   SELECT / PLACEHOLDER  a chosen option or placeholder wider than its field;  OVERLAP  positioned text on text
 */
"use strict";
const fs = require("fs"), path = require("path"), http = require("http");
const pw = require("playwright");

const root = path.resolve(process.argv[2] || ".");
const args = Object.fromEntries(process.argv.slice(3).map((a) => { const i = a.indexOf("="); return [a.slice(0, i), a.slice(i + 1)]; }));
const ENGINE = args.engine || "chromium";
const LANGS = (args.langs || "zh,en").split(",");
const WIDTHS = (args.widths || "280,320,340,360,375,390,412,430,460,500,540,559,561,600,639,641,680,720,768,800,834,899,901,959,961,1000,1024,1079,1081,1120,1179,1181,1240,1280,1366,1440,1536,1680,1920,2560").split(",").map(Number);
const ONLY = args.only ? args.only.split(",") : null;
const SHOTS = args.shots ? path.resolve(args.shots) : null;
const SCROLLBAR = +args.scrollbar || 0;

const MIME = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "application/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".json": "application/json", ".webmanifest": "application/manifest+json", ".txt": "text/plain" };
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

/* ------------------------------------------------------------------ */
/* in-page audit                                                       */
/* ------------------------------------------------------------------ */
function audit(opt) {
  const vw = document.documentElement.clientWidth;
  const SKIP = "script,style,noscript,svg,canvas,select,option,textarea,template,.sr,.skip,.marquee,.foot__giant,.hero__fog,.grain" + (opt.skip ? "," + opt.skip : "");
  const CONTROL = "button,a,label,[role=tab],[role=radio],[role=button],.chip,.kicker,.btn,.lang,.sample,.extra__tag,.hero__kicker,.seg";
  // may take two even lines by design: answer tiles, scale captions, the kicker and sample badge on phones, long place names
  const ALLOW = ".lk__o,.dots__lbl span,.hero__kicker,.sample,.search__list";
  const LABEL = "dt,th,legend,figcaption,.bar__l,.bar__v,.dim__a,.dim__b,.tz__k,.stepper span,.pmini__pos,.preview__t,.inp span,.qbar__sec,.qbar__n,.dots__lbl span";
  const HEAD = "h1,h2,h3,h4,h5,.h2,.hero__en,.hero__zh,.quote p,.bi__s,.lk__s,.lock p,.r-hero__en,.intro__lead,.step-lead,.sec__intro,.hero__lead";
  const HAN = /[\u3400-\u9FFF\uF900-\uFAFF]/, WORD = /[A-Za-z0-9\u00C0-\u024F]/;
  const PUNCT_G = /[\s，。、：；！？）」』》】（「『《【,.;:!?()"“”'’…·—–\-]/g;
  const isInline = (el) => /^(inline|contents)$/.test(getComputedStyle(el).display);
  const unitOf = (el) => { while (el.parentElement && isInline(el)) el = el.parentElement; return el; };
  const name = (el) => {
    const parts = [];
    for (let e = el, k = 0; e && e !== document.body && k < 3; e = e.parentElement, k++) {
      const t = e.tagName.toLowerCase();
      if (e.id && e.id !== "app") { parts.unshift(t + "#" + e.id); break; }
      const c = typeof e.className === "string" ? e.className.trim().split(/\s+/)[0] : "";
      parts.unshift(c ? t + "." + c : t);
    }
    return parts.join(">");
  };
  const snip = (t) => t.replace(/\s+/g, " ").trim().slice(0, 30);
  const zhSeg = typeof Intl !== "undefined" && Intl.Segmenter ? new Intl.Segmenter("zh-Hans", { granularity: "word" }) : null;
  let seq = 0;
  const res = [];
  const add = (type, el, text, detail) => {
    if (!el.dataset.wc) el.dataset.wc = opt.tag + "-" + seq++;
    res.push({ type, id: name(el) + ' "' + snip(text) + '"', detail: detail || "", wc: el.dataset.wc });
  };
  const visible = (el) => !el.checkVisibility || el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true, opacityProperty: true, visibilityProperty: true });
  const hasBoundary = (e) => {
    const s = getComputedStyle(e);
    return (s.backgroundColor !== "rgba(0, 0, 0, 0)" && s.backgroundColor !== "transparent") || s.backgroundImage !== "none" ||
      parseFloat(s.borderLeftWidth) > 0 || parseFloat(s.borderRightWidth) > 0;
  };
  const scope = opt.root ? document.querySelector(opt.root) : document.body;
  if (!scope) return { res, units: 0 };

  const units = new Map();
  const tw = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
  for (let n; (n = tw.nextNode()); ) {
    if (!/\S/.test(n.data)) continue;
    const p = n.parentElement;
    if (!p || p.closest(SKIP)) continue;
    const u = unitOf(p);
    let a = units.get(u);
    if (!a) units.set(u, (a = []));
    a.push(n);
  }

  const boxes = [];
  for (const [u, nodes] of units) {
    if (!visible(u)) continue;
    const cs = getComputedStyle(u), box = u.getBoundingClientRect();
    if (box.width < 1 || box.height < 1) continue;
    const fs = parseFloat(cs.fontSize), lh = cs.lineHeight === "normal" ? fs * 1.2 : parseFloat(cs.lineHeight);
    const frags = [];
    for (const n of nodes) {
      const r = document.createRange();
      r.selectNodeContents(n);
      for (const q of r.getClientRects()) if (q.width > 0.5 && q.height > 0.5) frags.push(q);
    }
    if (!frags.length) continue;
    const text = nodes.map((n) => n.data).join("").replace(/\s+/g, " ").trim();
    const L = Math.min(...frags.map((q) => q.left)), R = Math.max(...frags.map((q) => q.right));
    const T = Math.min(...frags.map((q) => q.top)), B = Math.max(...frags.map((q) => q.bottom));
    boxes.push({ u, L, R, T, B, text });

    // rows of text
    const gap = Math.max(3, Math.min(lh, fs * 1.3) * 0.5);
    const centers = frags.map((q) => (q.top + q.bottom) / 2).sort((a, b) => a - b);
    const rows = [];
    for (const c of centers) if (!rows.length || c - rows[rows.length - 1] > gap) rows.push(c);
    const brs = Array.from(u.querySelectorAll("br")).filter((b) => unitOf(b.parentElement) === u || b.parentElement === u).length;
    // whole-card links (programme, tutor, journal cards and the like) are containers, not buttons: their text is judged as text
    const CARD = "a.prog,a.post,a.person,a.ally,a.extra,a.j-feat,a.rel__card,.mini a,.pager a,.al-tiles a";
    const ctl = u.closest(CONTROL);
    const isControl = !!ctl && !(ctl.matches(CARD) && !u.closest(".more"));
    const bare = text.replace(/\s/g, "");
    const hanN = (text.match(new RegExp(HAN.source, "g")) || []).length;
    const words = text.split(/\s+/).filter((w) => /[A-Za-z]/.test(w)).length;
    const short = hanN ? bare.length <= (isControl ? 20 : 12) : words <= (isControl ? 7 : 4) && text.length <= (isControl ? 48 : 32);
    const heading = u.matches(HEAD) || /^H[1-6]$/.test(u.tagName) || fs >= 18;
    const caps = cs.textTransform === "uppercase" || parseFloat(cs.letterSpacing) >= fs * 0.05;
    const value = /\d/.test(text) && text.length <= 32;
    const sentence = u.closest(".check,.radio");
    const kind = short && u.matches(LABEL) ? "label" : heading ? "head" : short && !sentence && (isControl || caps || value) ? "label" : "text";

    if (rows.length > brs + 1) {
      if (kind === "label" && !u.closest(ALLOW)) add("WRAP", u, text, rows.length + " lines" + (isControl ? " (control)" : ""));
      // characters → rows
      const chars = [];
      if (text.length <= 1500) {
        nodes.forEach((n, ni) => {
          if (ni > 0) {
            const g = document.createRange();
            g.setStartAfter(nodes[ni - 1]);
            g.setEndBefore(n);
            if (g.cloneContents().querySelector("br")) chars.push({ sp: 1 });
          }
          const d = n.data;
          for (let i = 0; i < d.length; i++) {
            if (/\s/.test(d[i])) { if (chars.length && !chars[chars.length - 1].sp) chars.push({ sp: 1 }); continue; }
            const r = document.createRange();
            r.setStart(n, i);
            r.setEnd(n, i + 1);
            const q = r.getClientRects()[0];
            if (!q || q.width === 0) continue;
            const c = (q.top + q.bottom) / 2;
            let ri = 0, dd = Infinity;
            for (let k = 0; k < rows.length; k++) { const x = Math.abs(rows[k] - c); if (x < dd) { dd = x; ri = k; } }
            chars.push({ ch: d[i], row: ri, l: q.left, r: q.right });
          }
        });
      }
      // split words / numbers
      let prev = null;
      for (let k = 0; k < chars.length; k++) {
        const e = chars[k];
        if (e.sp) { prev = null; continue; }
        if (prev && e.row !== prev.row) {
          const a = prev.ch, b = e.ch;
          const cut = (WORD.test(a) && WORD.test(b)) || (/[-–\/:.+]/.test(a) && /[0-9]/.test(b) && k > 1 && /[0-9]/.test(chars[k - 2].ch || ""));
          if (cut) {
            const ctx = chars.slice(Math.max(0, k - 10), k + 10).map((x, j) => (x.sp ? " " : (Math.max(0, k - 10) + j === k ? "|" : "") + x.ch)).join("");
            add("SPLIT", u, text, ctx.trim());
          }
        }
        prev = e;
      }
      // orphans
      if (kind !== "label" && chars.length) {
        const last = rows.length - 1;
        let lastText = "", on = false;
        for (const e of chars) {
          if (e.sp) { if (on) lastText += " "; continue; }
          if (e.row === last) { on = true; lastText += e.ch; }
        }
        lastText = lastText.trim();
        const core = lastText.replace(PUNCT_G, "");
        const widthOf = (k) => { const cs2 = chars.filter((e) => !e.sp && e.row === k); return cs2.length ? Math.max(...cs2.map((e) => e.r)) - Math.min(...cs2.map((e) => e.l)) : 0; };
        const maxW = Math.max(...rows.map((_, k) => widthOf(k)));
        const hanDom = hanN * 2 >= bare.replace(PUNCT_G, "").length;
        let orphan = false;
        const tight = heading || (hanDom ? bare.length <= 40 : words <= 12);
        // Chinese: one character alone on the last line (孤字); display titles also avoid two
        if (hanDom) orphan = core.length > 0 && core.length <= (fs >= 28 ? 2 : 1) && !/[A-Za-z0-9]{3,}/.test(core);
        else orphan = !/\s/.test(lastText) && widthOf(last) < (tight ? 0.4 : 0.22) * maxW;
        if (orphan) add(tight ? "ORPHAN-H" : "ORPHAN-P", u, text, "last line: " + lastText);
        // a Chinese word cut across lines in a heading or short statement (创作|者)
        if (zhSeg && hanDom && heading && fs >= 20) {
          const str = chars.map((e) => (e.sp ? " " : e.ch)).join("");
          const starts = new Set();
          for (const g of zhSeg.segment(str)) starts.add(g.index);
          for (let k = 1; k < chars.length; k++) {
            const a = chars[k - 1], b = chars[k];
            if (!a.sp && !b.sp && a.row !== b.row && HAN.test(a.ch) && HAN.test(b.ch) && !starts.has(k)) {
              add("SPLIT-ZH", u, text, str.slice(Math.max(0, k - 6), k) + "|" + str.slice(k, k + 6));
            }
          }
        }
        // 避头尾: no line starts with closing punctuation or ends with opening punctuation
        let pv = null;
        for (const c of chars) {
          if (c.sp) continue;
          if (pv && c.row !== pv.row && (/[，。、：；！？）」』》】…,.;:!?)·]/.test(c.ch) || /[（「『《【(]/.test(pv.ch))) add("KINSOKU", u, text, pv.ch + "|" + c.ch);
          pv = c;
        }
        if (heading && fs >= 28 && rows.length >= 3 && (hanDom ? bare.length <= rows.length * 3 : rows.length >= words)) add("STACK", u, text, rows.length + " lines");
      }
    }

    // overflow
    const tol = Math.max(1.5, fs * 0.12);
    let scroller = null;
    for (let e = u; e && e !== document.body; e = e.parentElement) {
      const o = getComputedStyle(e).overflowX;
      if (o === "auto" || o === "scroll") { scroller = e; break; }
    }
    if (!scroller) {
      if (cs.overflowX === "visible" && (R > box.right + tol || L < box.left - tol)) add("OVER", u, text, `text ${L | 0}–${R | 0} box ${box.left | 0}–${box.right | 0}`);
      if (R > vw + 1 || L < -1) add("OFFSCREEN", u, text, `text ${L | 0}–${R | 0} of ${vw}`);
      for (let e = u.parentElement; e && e !== document.body; e = e.parentElement) {
        const o = getComputedStyle(e).overflowX;
        if (o === "hidden" || o === "clip") {
          const b = e.getBoundingClientRect();
          if (R > b.right + 1 || L < b.left - 1) add("CLIP", u, text, "by " + name(e));
          break;
        }
      }
      for (let e = u.parentElement; e && e !== document.body; e = e.parentElement) {
        if (hasBoundary(e)) {
          const b = e.getBoundingClientRect();
          if (b.width < vw - 2 && (R > b.right + 1 || L < b.left - 1)) add("SPILL", u, text, "out of " + name(e) + ` text ${L | 0}–${R | 0} card ${b.left | 0}–${b.right | 0}`);
          break;
        }
      }
    }
    if (cs.textOverflow === "ellipsis" && u.scrollWidth > u.clientWidth + 1) add("TRUNC", u, text);
  }

  // positioned text on top of other text
  const muted = (el) => { for (let e = el, k = 0; e && k < 6; e = e.parentElement, k++) if (getComputedStyle(e).filter !== "none") return true; return false; };
  const posOf = (el) => { for (let e = el, k = 0; e && k < 4; e = e.parentElement, k++) { const p = getComputedStyle(e).position; if (p === "absolute") return e; } return null; };
  for (const a of boxes) {
    const pa = posOf(a.u);
    if (!pa) continue;
    for (const b of boxes) {
      if (b === a || a.u.contains(b.u) || b.u.contains(a.u) || (pa && pa.contains(b.u)) || muted(b.u)) continue;
      if (a.L < b.R - 1 && b.L < a.R - 1 && a.T < b.B - 1 && b.T < a.B - 1) add("OVERLAP", a.u, a.text, "with " + name(b.u) + ' "' + snip(b.text) + '"');
    }
  }

  // form fields
  const cv = document.createElement("canvas").getContext("2d");
  for (const f of scope.querySelectorAll("select, input[placeholder], textarea[placeholder]")) {
    if (!visible(f) || !f.getBoundingClientRect().width) continue;
    const s = getComputedStyle(f);
    let t;
    if (f.tagName === "SELECT") t = f.options[f.selectedIndex] ? f.options[f.selectedIndex].text : "";
    else { if (f.value) continue; t = f.placeholder; }
    cv.font = `${s.fontStyle} ${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;
    const w = cv.measureText(t).width + (parseFloat(s.letterSpacing) || 0) * t.length;
    const avail = f.clientWidth - parseFloat(s.paddingLeft) - parseFloat(s.paddingRight);
    if (w > avail + 1) add(f.tagName === "SELECT" ? "SELECT" : "PLACEHOLDER", f, t, `${Math.round(w)} > ${Math.round(avail)}`);
  }
  return { res, units: units.size, scrollW: document.documentElement.scrollWidth, vw };
}

/* content stress: put every possible string into one element and audit just that element */
function stress(opt) {
  const out = [];
  const lang = document.documentElement.lang.indexOf("zh") === 0 ? "zh" : "en";
  const tr = (v) => (v == null ? "" : typeof v === "string" ? v : v[lang] != null ? v[lang] : v.zh);
  const L = window.LAB;
  const other = (v) => (lang === "zh" ? v.en : v.zh);
  const sets = {
    ".r-hero__title": Object.values(L.archetypes).map(tr),
    ".r-hero__en": Object.values(L.archetypes).map(other),
    ".r-hero__tags span:nth-child(3)": Object.values(L.modes).map((m) => tr(m) + (lang === "zh" ? "型" : "")),
    ".r-hero__dm": L.dayMasters.map((d) => (lang === "zh" ? "日主 · 辛金 · " : "Day Master · 辛金 · ") + tr(d.img) + " — " + tr(d.d)),
    ".tcode__name": Object.values(L.types).map((t) => tr(t.name)),
    ".dm__img": L.dayMasters.map((d) => tr(d.img)),
    ".mentor__name": Object.values(L.mentors).map(tr),
    ".country h3": Object.values(L.countries).map(tr),
    ".school__name": L.schools.map((s) => tr(s.name)),
    ".bi__s--l": L.items.map((i) => tr(i.a)),
    ".bi__s--r": L.items.map((i) => tr(i.b)),
    ".lk__s": L.resilience.map((i) => tr(i.t))
  };
  for (const sel of Object.keys(sets)) {
    const el = document.querySelector(sel);
    if (!el) continue;
    const orig = el.textContent;
    const seen = new Set();
    for (const s of sets[sel]) {
      if (seen.has(s)) continue;
      seen.add(s);
      el.textContent = s;
      el.removeAttribute("data-wc");
      const tag = "s" + Math.random().toString(36).slice(2, 7);
      el.dataset.stress = tag;
      const r = window.__audit({ root: '[data-stress="' + tag + '"]', tag });
      r.res.forEach((x) => out.push(Object.assign(x, { id: "[stress " + sel + "] " + x.id })));
      if (sel === ".r-hero__title" || sel === ".r-hero__en") {
        // the whole hero column must still fit
        const c = el.closest(".r-hero__text").getBoundingClientRect();
        if (c.right > document.documentElement.clientWidth + 1) out.push({ type: "OFFSCREEN", id: "[stress " + sel + '] hero column with "' + s + '"', detail: "" });
      }
    }
    el.textContent = orig;
    delete el.dataset.stress;
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* page states                                                         */
/* ------------------------------------------------------------------ */
const KEY = "ag-lab-v1";
const NOANIM = "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}.reveal{opacity:1!important;transform:none!important}.loading__list li{opacity:1!important}";
const DEMO_BIRTH = { calendar: "solar", year: 1998, month: 7, day: 3, hour: 9, minute: 30, unknownTime: false, placeMode: "coords", city: null, lat: "22.5431", lon: "114.0579", tzAuto: "Asia/Shanghai", tz: null, tzManual: false, xjTime: false, solarTime: "true", ziRule: "23" };
const CITY = {
  urumqi: ["乌鲁木齐", "Ürümqi", "新疆", "CN", 43.801, 87.6005, "Asia/Urumqi", 4054000, "Xinjiang"],
  long: ["Universitäts- und Hansestadt Greifswald", "Universitäts- und Hansestadt Greifswald", "Mecklenburg-Vorpommern", "DE", 54.0891, 13.4024, "Europe/Berlin", 52731]
};
const PROFILE = { level: "MA", disciplines: ["curating", "photo"], stage: 2, timeline: 1, budget: 3, city: "metro", ielts: "6-6.5" };
const EMPTY_PROFILE = { level: null, disciplines: [], stage: null, timeline: null, budget: null, city: null, ielts: null };

function labState(ids, lang, over) {
  const answers = {};
  if (over.answers !== "none") {
    ids.items.forEach((id, i) => { answers[id] = 1 + ((i * 5 + 3) % 7); });
    ids.res.forEach((id, i) => { answers[id] = 1 + ((i * 3 + 1) % 5); });
  }
  return Object.assign({
    step: "intro", lang, birth: Object.assign({}, DEMO_BIRTH), answers, qIndex: 0, quizStartedAt: null, quizMs: 0,
    profile: Object.assign({}, PROFILE), unlocked: false, src: {}, startedAt: 1
  }, over, { answers, birth: Object.assign({}, DEMO_BIRTH, over.birth || {}) });
}

const STATES = [
  { id: "home", url: "index.html", prep: homePrep },
  { id: "home-menu", url: "index.html", maxW: 1080, prep: async (p) => { await homePrep(p); await p.setViewportSize({ width: 390, height: 820 }); await p.click("#burger"); } },
  { id: "home-faq", url: "index.html", prep: async (p) => { await homePrep(p); await p.evaluate(() => document.querySelectorAll("details").forEach((d) => (d.open = true))); } },
  { id: "404", url: "404.html", langs: ["zh"] },
  // subpages (round 3): one of each format, plus every page at the common phone widths via only=
  { id: "journal", url: "journal/index.html" },
  { id: "article-1", url: "journal/curator-day.html" },
  { id: "article-2", url: "journal/work-to-question.html" },
  { id: "article-3", url: "journal/proposal-essentials.html" },
  { id: "article-4", url: "journal/group-project.html" },
  { id: "prog-master", url: "programmes/masterclass.html", prep: async (p) => { await p.evaluate(() => document.querySelectorAll("details").forEach((d) => (d.open = true))); } },
  { id: "prog-studio", url: "programmes/advanced-studio.html" },
  { id: "prog-apply", url: "programmes/applications.html" },
  { id: "prog-summer", url: "programmes/summer-lab.html" },
  { id: "tutor-ld", url: "faculty/ld.html" },
  { id: "tutor-xg", url: "faculty/xg.html" },
  { id: "tutor-sd", url: "faculty/service-design-tutor.html" },
  { id: "tutor-cw", url: "faculty/curating-writing-tutor.html" },
  { id: "tutor-guests", url: "faculty/guest-tutors.html" },
  { id: "alliance", url: "alliance/index.html" },
  { id: "sub-menu", url: "journal/curator-day.html", maxW: 1080, prep: async (p) => { await p.setViewportSize({ width: 390, height: 820 }); await p.click("#burger"); } },
  { id: "privacy", url: "lab/privacy.html", langs: ["zh"] },
  { id: "lab-intro", url: "lab/index.html", storage: null },
  { id: "lab-intro-resume", url: "lab/index.html", storage: { step: "intro" } },
  { id: "lab-birth-empty", url: "lab/index.html", storage: { step: "birth", answers: "none", birth: { year: null, month: null, day: null, hour: null, minute: null, placeMode: "city", lat: "", lon: "", tzAuto: null } } },
  { id: "lab-birth-coords", url: "lab/index.html", storage: { step: "birth", answers: "none" } },
  { id: "lab-birth-urumqi", url: "lab/index.html", storage: { step: "birth", answers: "none", birth: { placeMode: "city", city: CITY.urumqi, lat: "", lon: "", tzAuto: "Asia/Urumqi" } } },
  { id: "lab-birth-longcity", url: "lab/index.html", storage: { step: "birth", answers: "none", birth: { placeMode: "city", city: CITY.long, lat: "", lon: "", tzAuto: "Europe/Berlin" } } },
  { id: "lab-birth-search", url: "lab/index.html", storage: { step: "birth", answers: "none", birth: { placeMode: "city", city: null, lat: "", lon: "", tzAuto: null } },
    prep: async (p, lang) => { await p.fill("#city-q", lang === "zh" ? "长沙" : "Santo Domingo"); await p.waitForTimeout(1800); } },
  { id: "lab-birth-tzedit", url: "lab/index.html", storage: { step: "birth", answers: "none", birth: { placeMode: "city", city: CITY.urumqi, lat: "", lon: "", tzAuto: "Asia/Urumqi" } },
    prep: async (p) => { await p.click("[data-act=tz-edit]"); await p.evaluate(() => document.querySelectorAll("details").forEach((d) => (d.open = true))); } },
  { id: "lab-birth-lunar", url: "lab/index.html", storage: { step: "birth", answers: "none", birth: { calendar: "lunar", month: 5, day: 9, unknownTime: true } } },
  { id: "lab-quiz-bi", url: "lab/index.html", storage: { step: "quiz", answers: "none", qIndex: 5 } },
  { id: "lab-quiz-likert", url: "lab/index.html", storage: { step: "quiz", qIndex: 48 } },
  { id: "lab-profile", url: "lab/index.html", storage: { step: "profile" } },
  { id: "lab-profile-empty", url: "lab/index.html", storage: { step: "profile", profile: EMPTY_PROFILE } },
  { id: "lab-loading", url: "lab/index.html", storage: { step: "loading" }, freeze: true },
  { id: "lab-result", url: "lab/index.html", storage: { step: "result" }, stress: true },
  { id: "lab-result-unlocked", url: "lab/index.html", storage: { step: "result", unlocked: true } },
  { id: "lab-quiz-stress", url: "lab/index.html", storage: { step: "quiz", answers: "none", qIndex: 0 }, stressOnly: true },
  { id: "lab-likert-stress", url: "lab/index.html", storage: { step: "quiz", qIndex: 48 }, stressOnly: true },
  { id: "lab-modal", url: "lab/index.html", storage: { step: "result" }, ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.50",
    prep: async (p) => { await p.waitForTimeout(600); await p.click("[data-act=save-card]"); await p.waitForTimeout(300); } }
];

async function homePrep(p) {
  await p.evaluate(() => document.querySelectorAll("[data-count]").forEach((e) => (e.textContent = e.getAttribute("data-count"))));
}

if (args.pages) {
  // plain pages under <siteDir> (e.g. the builder previews), no language switch
  STATES.length = 0;
  args.pages.split(",").forEach((u) => STATES.push({ id: u, url: u, langs: ["-"] }));
}

/* ------------------------------------------------------------------ */
(async () => {
  await new Promise((r) => srv.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${srv.address().port}/`;
  const browser = ENGINE === "webkit" ? await pw.webkit.launch() : await pw.chromium.launch();
  const issues = new Map();
  let ids = null;
  if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });
  let shotN = 0;

  for (const st of STATES) {
    if (ONLY && !ONLY.includes(st.id)) continue;
    if (st.stressOnly && !args.stress) continue;
    for (const lang of st.langs || LANGS) {
      const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1, userAgent: st.ua });
      // Cloudflare Turnstile (the contact form check) polls forever and is a third-party frame: keep it out of layout checks.
      await ctx.route(/challenges\.cloudflare\.com/, (r) => r.abort());
      const page = await ctx.newPage();
      const errs = [];
      page.on("pageerror", (e) => errs.push(String(e)));
      if (st.storage !== undefined) {
        if (!ids) {
          const p0 = await ctx.newPage();
          await p0.goto(base + "lab/index.html?lang=zh", { waitUntil: "load" });
          ids = await p0.evaluate(() => ({ items: window.LAB.items.map((i) => i.id), res: window.LAB.resilience.map((i) => i.id) }));
          await p0.close();
        }
        const v = st.storage === null ? null : JSON.stringify(labState(ids, lang, st.storage));
        await ctx.addInitScript(([k, val]) => { try { if (val === null) localStorage.removeItem(k); else localStorage.setItem(k, val); } catch (e) {} }, [KEY, v]);
      }
      if (st.freeze) await ctx.addInitScript(() => { const s = window.setTimeout; window.setTimeout = (f, d, ...a) => (d >= 1500 ? 0 : s(f, d, ...a)); });
      const sep = st.url.includes("?") ? "&" : "?";
      await page.goto(base + encodeURI(st.url) + (lang === "-" ? "" : sep + "lang=" + lang), { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.addStyleTag({ content: NOANIM });
      if (SCROLLBAR) await page.addStyleTag({ content: `::-webkit-scrollbar{width:${SCROLLBAR}px;height:${SCROLLBAR}px;background:#ddd}` });
      await page.evaluate(`window.__audit = ${audit.toString()}`);
      if (st.prep) {
        try { await st.prep(page, lang); } catch (err) { console.log(`ERR prep ${st.id} ${lang}: ${String(err).split("\n")[0]}`); await ctx.close(); continue; }
      }
      await page.waitForTimeout(250);

      const widths = WIDTHS.filter((w) => !st.maxW || w <= st.maxW);
      for (const w of widths) {
        await page.setViewportSize({ width: w, height: w < 700 ? 820 : 900 });
        await page.waitForTimeout(80);
        let list = [];
        if (!st.stressOnly) {
          const r = await page.evaluate((tag) => window.__audit({ tag }), "w" + w);
          list = r.res;
          if (r.scrollW > r.vw + 1) list.push({ type: "HSCROLL", id: "page", detail: `${r.scrollW} > ${r.vw}` });
        }
        if (args.stress && (st.stress || st.stressOnly) && [280, 320, 360, 375, 390, 412, 430, 600, 768, 1024, 1280, 1440, 1920].includes(w)) {
          list = list.concat(await page.evaluate(`(${stress.toString()})({})`));
        }
        for (const it of list) {
          const k = [st.id, lang, it.type, it.id].join(" | ");
          let e = issues.get(k);
          if (!e) {
            issues.set(k, (e = { state: st.id, lang, type: it.type, id: it.id, detail: it.detail, widths: [] }));
            if (SHOTS && it.wc && shotN < 400) {
              try {
                const h = await page.$(`[data-wc="${it.wc}"]`);
                const b = h && (await h.boundingBox());
                if (b) {
                  const vp = page.viewportSize();
                  const x = Math.max(0, b.x - 24), y = Math.max(0, b.y - 24);
                  const f = path.join(SHOTS, `${String(++shotN).padStart(3, "0")}-${st.id}-${lang}-${w}-${it.type}.png`);
                  await page.screenshot({ path: f, clip: { x, y, width: Math.min(vp.width - x, b.width + 48), height: Math.min(1400, b.height + 48) }, fullPage: true });
                  e.shot = path.basename(f);
                }
              } catch (err) { /* element gone */ }
            }
          }
          e.widths.push(w);
          if (!e.details) e.details = new Set();
          if (e.details.size < 3) e.details.add(it.detail);
        }
      }
      if (errs.length) console.log(`ERR ${st.id} ${lang}: ${errs.join(" / ")}`);
      await ctx.close();
    }
  }
  await browser.close();
  srv.close();

  const ranges = (ws) => {
    const idx = ws.map((w) => WIDTHS.indexOf(w)).sort((a, b) => a - b);
    const out = [];
    for (let i = 0; i < idx.length; i++) {
      let j = i;
      while (j + 1 < idx.length && idx[j + 1] === idx[j] + 1) j++;
      out.push(i === j ? String(WIDTHS[idx[i]]) : WIDTHS[idx[i]] + "–" + WIDTHS[idx[j]]);
      i = j;
    }
    return out.join(", ");
  };
  const all = [...issues.values()];
  const order = ["HSCROLL", "OFFSCREEN", "CLIP", "SPILL", "OVER", "SPLIT", "SPLIT-ZH", "KINSOKU", "WRAP", "STACK", "SELECT", "PLACEHOLDER", "OVERLAP", "ORPHAN-H", "ORPHAN-P", "TRUNC"];
  all.sort((a, b) => a.state.localeCompare(b.state) || a.lang.localeCompare(b.lang) || order.indexOf(a.type) - order.indexOf(b.type) || a.id.localeCompare(b.id));
  let cur = "";
  for (const e of all) {
    const g = `${e.state} ${e.lang}`;
    if (g !== cur) { console.log(`\n=== ${g}`); cur = g; }
    console.log(`  ${e.type.padEnd(11)} ${e.id}  @ ${ranges(e.widths)}${e.details && [...e.details][0] ? "  — " + [...e.details].join(" ; ") : ""}${e.shot ? "  [" + e.shot + "]" : ""}`);
  }
  const count = {};
  all.forEach((e) => (count[e.type] = (count[e.type] || 0) + 1));
  console.log("\nTOTAL", all.length, JSON.stringify(count), "engine", ENGINE);
  if (args.json) fs.writeFileSync(args.json, JSON.stringify(all.map((e) => Object.assign({}, e, { details: e.details ? [...e.details] : [] })), null, 1));
})().catch((e) => { console.error(e); process.exit(1); });
