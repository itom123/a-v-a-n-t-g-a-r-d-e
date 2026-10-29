/* Avantgarde Studio — subpage renderer (journal, articles, programmes, tutors, alliance).
 * Short text comes from content.js, longer copy from content-pages.js. Each page file says what it is:
 *   <body class="sub" data-page="article:curator-day" data-root="../">
 * Page files are written by _工具/build-pages.js; you normally never edit them by hand. */
(function () {
  "use strict";
  var S = window.SITE, P = window.PAGES || {}, B = document.body;
  var ROOT = B.getAttribute("data-root") || "../";
  var spec = (B.getAttribute("data-page") || "").split(":"), TYPE = spec[0], ID = spec[1] || "";
  var LANGS = ["zh", "en"], UI = S.ui || {};
  function autoLang() { return (navigator.language || "zh").toLowerCase().indexOf("zh") === 0 ? "zh" : "en"; }
  function pickLang() {
    var q = new URLSearchParams(location.search).get("lang");
    if (LANGS.indexOf(q) > -1) return q;
    try { var s = localStorage.getItem("ag-lang"); if (LANGS.indexOf(s) > -1) return s; } catch (e) {}
    return autoLang();
  }
  var lang = pickLang();
  function t(v) {
    if (v == null) return "";
    if (typeof v === "string" || typeof v === "number") return String(v);
    if (Array.isArray(v)) return v;
    return v[lang] != null ? v[lang] : (v.zh != null ? v.zh : "");
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }).replace(/ · /g, "\u00a0· ").replace(/(\d)–(\d)/g, "$1\u2060–\u2060$2"); }  // 4–6 and 2003–2011 never split
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function pad(n) { return String(n).padStart(2, "0"); }
  // a path from the site root ("programmes/x.html", "index.html#contact") → a link from this page, keeping the language
  function link(p) {
    if (/^(https?:|mailto:|tel:)/.test(p)) return p;
    var h = p.indexOf("#"), hash = h > -1 ? p.slice(h) : "", base = h > -1 ? p.slice(0, h) : p;
    return ROOT + base + (lang !== autoLang() ? "?lang=" + lang : "") + hash;
  }
  function hiddenSec(id) { var d = S[id]; return !!(d && d.hidden); }
  function arrow() { return ' <i aria-hidden="true">→</i>'; }
  function more(label, cls) { return '<span class="more' + (cls ? " " + cls : "") + '">' + esc(t(label)) + arrow() + "</span>"; }
  // "Draft copy" notes stay off the public site; add ?drafts=1 to the address to see them while reviewing.
  var SHOW_DRAFTS = /[?&]drafts=1\b/.test(location.search);
  function draft(show) { return show && SHOW_DRAFTS ? '<p class="draft" role="note">' + esc(t(UI.draft)) + "</p>" : ""; }
  function crumbs(list) {
    return '<ol class="crumbs" aria-label="Breadcrumb">' + list.map(function (c) {
      return "<li>" + (c.href ? '<a href="' + esc(link(c.href)) + '">' + esc(t(c.label)) + "</a>" : '<span aria-current="page">' + esc(t(c.label)) + "</span>") + "</li>";
    }).join("") + "</ol>";
  }
  function paras(arr) { return t(arr).map(function (x) { return "<p>" + esc(x) + "</p>"; }).join(""); }
  // <use> draws a symbol from 0,0 at the symbol's own size, so the outer viewBox is "0 0 width height"
  var ARC_VB = (function () { var s = document.getElementById("ag-arc"), v = s ? s.getAttribute("viewBox").split(/\s+/) : [0, 0, 354, 428]; return "0 0 " + v[2] + " " + v[3]; })();
  function arc(cls) { return '<svg class="arc ' + (cls || "") + '" viewBox="' + ARC_VB + '" aria-hidden="true"><use href="#ag-arc"/></svg>'; }
  function mist(dark) { return '<div class="mist' + (dark ? " mist--dark" : "") + '" aria-hidden="true"><i></i><i></i><i></i></div>'; }
  function arcs(light) { return '<div class="arcs' + (light ? " arcs--light" : "") + '" aria-hidden="true"></div>'; }
  function img(name) { return ROOT + "assets/img/" + name; }

  /* ---------- lookups ---------- */
  var ITEMS = S.journal.items;
  function articleIndex(slug) { for (var i = 0; i < ITEMS.length; i++) if (ITEMS[i].slug === slug) return i; return -1; }
  function progBySlug(slug) {
    var list = S.programmes.items;
    for (var i = 0; i < list.length; i++) if (list[i].slug === slug) return { it: list[i], i: i, extra: false };
    if (S.programmes.extra && S.programmes.extra.slug === slug) return { it: S.programmes.extra, i: list.length, extra: true };
    return null;
  }
  function personBySlug(slug) { var l = S.faculty.people; for (var i = 0; i < l.length; i++) if (l[i].slug === slug) return l[i]; return null; }
  function progName(p) { return t(p.it.name); }
  function readMinutes(a) {
    var txt = [t(a.lead)].concat(a.sections.map(function (s) { return t(s.h) + t(s.p).join(""); }), [t(a.pull), t(a.tryThis)]).join(" ");
    return Math.max(2, Math.round(lang === "zh" ? txt.replace(/\s/g, "").length / 420 : txt.split(/\s+/).length / 210));
  }

  /* ---------- journal art (same drawings as the home page cards) ---------- */
  function postArt(k, i) {
    var n = pad(i + 1);
    if (k === "arch") return '<svg viewBox="0 0 300 400"><path d="M60 400V190a90 90 0 0 1 180 0v210z" fill="currentColor"/><text x="22" y="52" class="post__n">' + n + "</text></svg>";
    if (k === "stack") return '<svg viewBox="0 0 300 400"><use href="#ag-stack" x="40" y="60" width="220" height="300"/><text x="22" y="52" class="post__n">' + n + "</text></svg>";
    if (k === "circle") return '<svg viewBox="0 0 300 400"><circle cx="150" cy="230" r="110" fill="currentColor"/><circle cx="150" cy="230" r="46" class="post__hole"/><text x="22" y="52" class="post__n">' + n + "</text></svg>";
    var g = ""; for (var r = 0; r < 4; r++) for (var c = 0; c < 3; c++) g += '<rect x="' + (40 + c * 76) + '" y="' + (110 + r * 70) + '" width="60" height="54" rx="' + ((r * 3 + c) % 4 === 0 ? 27 : 6) + '" fill="currentColor" opacity="' + (((r + c) % 3) ? 1 : .35) + '"/>';
    return '<svg viewBox="0 0 300 400">' + g + '<text x="22" y="52" class="post__n">' + n + "</text></svg>";
  }
  function artBox(it, i, extra) { return '<div class="post__art post__art--' + it.art + " " + (i % 2 ? "is-ink" : "is-paper") + (extra ? " " + extra : "") + '" aria-hidden="true">' + postArt(it.art, i) + "</div>"; }
  // Skyline mark: its card-and-beams logo in ink, fading to the left (same drawing as assets/img/skyline-mark.svg).
  // The mask is inline with its own id each time, because masks inside the hidden sprite don't render.
  var skyN = 0;
  function skyArt() {
    var id = "sky-" + (++skyN);
    return '<svg viewBox="10 -2 130 108"><defs>' +
      '<linearGradient id="' + id + 'g" gradientUnits="userSpaceOnUse" x1="10" x2="114" y1="0" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".45" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff"/></linearGradient>' +
      '<linearGradient id="' + id + 'h" gradientUnits="userSpaceOnUse" x1="70" x2="120" y1="0" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff"/></linearGradient>' +
      '<mask id="' + id + '" maskUnits="userSpaceOnUse" x="0" y="0" width="160" height="120"><rect width="160" height="120" fill="url(#' + id + 'g)"/></mask>' +
      '<mask id="' + id + 'c" maskUnits="userSpaceOnUse" x="0" y="0" width="160" height="120"><rect width="160" height="120" fill="url(#' + id + 'h)"/></mask></defs>' +
      '<g fill="currentColor"><g mask="url(#' + id + ')"><path d="M122 104 44 0 26 18Z" opacity=".2"/><path d="M122 104 26 18 16 42Z" opacity=".34"/><path d="M122 104 16 42 14 68Z" opacity=".5"/><path d="M122 104 14 68 22 92Z" opacity=".66"/><path d="M122 104 22 92 40 104Z" opacity=".82"/></g>' +
      '<path mask="url(#' + id + 'c)" d="M70 32h57a9 9 0 0 1 9 9v54a9 9 0 0 1-9 9H70Z"/></g></svg>';
  }
  function allyArt(k) {
    if (k === "ag") return '<svg viewBox="0 0 400 200"><use href="#ag-mark"/></svg>';
    if (k === "sky") return skyArt();
    return '<svg viewBox="0 0 400 200"><text x="200" y="100" dominant-baseline="central" text-anchor="middle" class="ally__big">DBRF</text></svg>';
  }

  /* ---------- shared blocks ---------- */
  function navCurrent() { return { article: "journal", journal: "journal", programme: "programmes", person: "faculty", alliance: "alliance" }[TYPE]; }
  function renderNav() {
    var cur = navCurrent();
    $("#nav").innerHTML =
      '<a class="nav__brand" href="' + esc(link("index.html")) + '" aria-label="Avantgarde Studio"><svg class="nav__mark"><use href="#ag-mark"/></svg><svg class="nav__word"><use href="#ag-word"/></svg></a>' +
      '<nav class="nav__links" id="navLinks" aria-label="Main">' + S.nav.filter(function (n) { return !hiddenSec(n.id); }).map(function (n) {
        return '<a href="' + esc(link(n.href || "index.html#" + n.id)) + '"' + (n.href ? ' class="nav__ext"' : "") + (n.id === cur ? ' aria-current="true"' : "") + ">" + esc(t(n)) + "</a>";
      }).join("") + '<a class="nav__cta-m" href="' + esc(link("index.html#contact")) + '">' + esc(t(S.cta)) + "</a></nav>" +
      '<div class="nav__tools"><button class="lang" id="langBtn" type="button" aria-label="Switch language"><span data-l="zh"' + (lang === "zh" ? ' class="on"' : "") + '>中</span><i>/</i><span data-l="en"' + (lang === "en" ? ' class="on"' : "") + ">EN</span></button>" +
      '<a class="btn btn--sm" href="' + esc(link("index.html#contact")) + '">' + esc(t(S.cta)) + "</a>" +
      '<button class="burger" id="burger" type="button" aria-label="Menu" aria-expanded="false"><span></span><span></span></button></div>';
  }
  function renderFoot() {
    var ring = "Avantgarde Studio · Skyline · De Beauvoir Forum · ", ringLen = (2 * Math.PI * 78 - 1).toFixed(1);
    var nav = S.nav.filter(function (n) { return !hiddenSec(n.id); });
    $("#foot").innerHTML = '<div class="wrap foot__grid"><div class="foot__brand"><svg class="foot__lockup" role="img" aria-label="Avantgarde Studio"><use href="#ag-lockup"/></svg>' +
      '<p class="foot__collab">× 天际线 Skyline<br>× De Beauvoir Forum</p></div>' +
      '<svg class="ring" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="ringPath" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0"/></defs><text><textPath href="#ringPath" textLength="' + ringLen + '" lengthAdjust="spacing">' + ring + '</textPath></text><use href="#ag-mark" x="62" y="80" width="76" height="40"/></svg>' +
      '<div class="foot__meta"><nav>' + nav.map(function (n) { return '<a href="' + esc(link(n.href || "index.html#" + n.id)) + '">' + esc(t(n)) + "</a>"; }).join("") + "</nav>" +
      "<p>" + esc(t(S.footer.line)) + '</p><p class="foot__small">' + esc(t(S.footer.disclaimer)) + '</p><p class="foot__small">© ' + new Date().getFullYear() + " Avantgarde Studio 先端艺培</p></div></div>" +
      '<div class="foot__giant" aria-hidden="true">AVANTGARDE</div>';
  }
  function ctaBand() {
    var L = S.lab;
    return '<section class="cta-band" data-dark>' + mist(true) + arcs(true) + '<div class="wrap reveal">' +
      "<h2>" + esc(t(S.contact.title)) + "</h2><p>" + esc(t(S.contact.body)) + "</p>" +
      '<div class="sh__cta"><a class="btn btn--light" href="' + esc(link("index.html#contact")) + '">' + esc(t(S.cta)) + arrow() + "</a>" +
      (L && !L.hidden ? '<a class="btn btn--ghost" href="' + esc(link(L.href)) + '">' + esc(t(L.cta)) + " · AG LAB</a>" : "") + "</div></div></section>";
  }
  function faqList(idx) {
    return '<div class="faq">' + idx.map(function (i) { var it = S.faq.items[i]; if (!it) return "";
      return '<details class="qa"><summary>' + esc(t(it.q)) + '<i aria-hidden="true"></i></summary><p>' + esc(t(it.a)) + "</p></details>"; }).join("") + "</div>";
  }
  function progCards(slugs) {
    return '<div class="rel__list">' + slugs.map(function (sl) { var p = progBySlug(sl); if (!p || hiddenSec("programmes")) return "";
      return '<a class="rel__card" href="' + esc(link("programmes/" + sl + ".html")) + '"><b>' + esc(p.extra ? t(UI.comingSoon) : p.it.no) + "</b><strong>" + esc(progName(p)) + "</strong>" + more(UI.viewProgramme) + "</a>"; }).join("") + "</div>";
  }
  function tutorCards(slugs) {
    return '<div class="mini">' + slugs.map(function (sl) { var p = personBySlug(sl); if (!p || p.hidden || hiddenSec("faculty")) return "";
      return '<a href="' + esc(link("faculty/" + sl + ".html")) + '"><span class="mini__pic" aria-hidden="true">' + (p.photo ? '<img src="' + esc(ROOT + p.photo) + '" alt="">' : esc(p.initials)) + "</span>" +
        "<span><strong>" + esc(t(p.name)) + "</strong><small>" + esc(t(p.role)) + "</small>" + more(UI.viewProfile) + "</span></a>"; }).join("") + "</div>";
  }
  function notFound() {
    document.title = "404 · Avantgarde Studio";
    var m = document.createElement("meta"); m.name = "robots"; m.content = "noindex"; document.head.appendChild(m);
    return '<section class="nf"><div class="wrap"><h1 class="sh__title">404</h1><p>' + esc(t(UI.notFound)) + '</p><a class="btn" href="' + esc(link("index.html")) + '">' + esc(t(UI.home)) + arrow() + "</a></div></section>";
  }
  function setMeta(title, desc) {
    title = String(title).replace(/\u200b/g, ""); desc = desc ? String(desc).replace(/\u200b/g, "") : desc;
    document.title = title + " · " + (lang === "zh" ? "先端艺培 Avantgarde Studio" : "Avantgarde Studio");
    var d = $('meta[name="description"]'); if (d && desc) d.setAttribute("content", desc);
    var o = $('meta[property="og:title"]'); if (o) o.setAttribute("content", document.title);
    var od = $('meta[property="og:description"]'); if (od && desc) od.setAttribute("content", desc);
  }

  /* ---------- page types ---------- */
  function pageJournal() {
    if (hiddenSec("journal")) return notFound();
    var J = S.journal, PJ = P.journal || {};
    setMeta(t(J.title), t(PJ.lead));
    var list = ITEMS.map(function (it, i) { return { it: it, i: i, a: (P.articles || {})[it.slug] || {} }; });
    var f = list[0], rest = list.slice(1);
    return '<section class="sh j-hero">' + arcs() + '<div class="wrap"><div class="sh__txt reveal">' +
      crumbs([{ label: UI.home, href: "index.html" }, { label: J.title }]) +
      '<h1 class="sh__title">' + esc(t(J.title)) + '</h1><p class="sh__lead">' + esc(t(PJ.lead)) + "</p>" +
      '<p class="sh__meta"><span>' + esc(t(PJ.author)) + "</span><span>" + esc(t(J.intro)) + "</span></p></div></div></section>" +
      '<section class="j-list"><div class="wrap">' +
      '<a class="j-feat reveal" href="' + esc(link("journal/" + f.it.slug + ".html")) + '">' + artBox(f.it, f.i) +
      '<div class="j-feat__t"><span class="post__tag">' + esc(t(f.it.tag)) + "</span><h2>" + esc(t(f.it.t)) + "</h2><p>" + esc(t(f.a.lead)) + "</p>" + more(UI.readMore) + "</div></a>" +
      '<div class="j-grid">' + rest.map(function (x) {
        return '<a class="post reveal" href="' + esc(link("journal/" + x.it.slug + ".html")) + '">' + artBox(x.it, x.i) +
          '<span class="post__tag">' + esc(t(x.it.tag)) + '</span><h3 class="post__t">' + esc(t(x.it.t)) + "</h3>" + more(UI.readMore) + "</a>";
      }).join("") + "</div></div></section>" + ctaBand();
  }

  function pageArticle() {
    var i = articleIndex(ID), it = ITEMS[i], a = (P.articles || {})[ID];
    if (i < 0 || !a || hiddenSec("journal")) return notFound();
    setMeta(t(it.t), t(a.lead));
    var secs = a.sections, split = Math.min(2, secs.length);
    function secHtml(s, k) { return '<section class="reveal"><span class="prose__n" aria-hidden="true">' + pad(k + 1) + "</span><h2>" + esc(t(s.h)) + "</h2>" + paras(s.p) + "</section>"; }
    var prev = ITEMS[(i - 1 + ITEMS.length) % ITEMS.length], next = ITEMS[(i + 1) % ITEMS.length];
    function pg(x, label) { var k = ITEMS.indexOf(x);
      return '<a href="' + esc(link("journal/" + x.slug + ".html")) + '">' + artBox(x, k) + "<div><span>" + esc(t(label)) + "</span><strong>" + esc(t(x.t)) + "</strong></div></a>"; }
    return '<section class="sh a-hero"><div class="wrap"><div class="sh__grid"><div class="sh__txt reveal">' +
      crumbs([{ label: UI.home, href: "index.html" }, { label: S.journal.title, href: "journal/index.html" }, { label: it.tag }]) +
      '<p class="a-no"><b>' + pad(i + 1) + "</b><span>" + esc(t(it.tag)) + "</span></p>" +
      '<h1 class="sh__title">' + esc(t(it.t)) + '</h1><p class="sh__lead">' + esc(t(a.lead)) + "</p>" +
      '<p class="sh__meta"><span>' + esc(t((P.journal || {}).author)) + "</span><span>" + esc(t(UI.minRead).replace("{n}", readMinutes(a))) + "</span></p>" + draft(a.draft) + "</div>" +
      '<figure class="a-cover' + (i % 2 ? " a-cover--ink" : "") + ' reveal" style="margin:0">' + artBox(it, i) + arc() + "</figure></div></div></section>" +
      '<article class="a-body"><div class="wrap">' +
      '<div class="prose">' + secs.slice(0, split).map(secHtml).join("") + "</div>" +
      (a.pull ? '<blockquote class="pull reveal"><p>' + esc(t(a.pull)) + "</p>" + arc() + "</blockquote>" : "") +
      '<div class="prose">' + secs.slice(split).map(function (s, k) { return secHtml(s, k + split); }).join("") + "</div>" +
      (a.tryThis ? '<aside class="try reveal"><p class="label">' + esc(t(UI.tryThis)) + "</p><p>" + esc(t(a.tryThis)) + '</p><img src="' + img("ag-mark-speck-light.svg") + '" alt="" width="408" height="208"></aside>' : "") +
      '<div class="byline"><span>' + esc(t((P.journal || {}).author)) + "</span><span>" + esc(t(S.journal.intro)) + "</span></div>" +
      (a.related && a.related.length && !hiddenSec("programmes") ? '<div class="rel"><p class="label">' + esc(t(UI.related)) + "</p>" + progCards(a.related) + "</div>" : "") +
      "</div></article>" +
      '<nav class="pager" aria-label="Articles"><div class="wrap"><div class="pager__grid">' + pg(prev, UI.prev) + pg(next, UI.next) + "</div></div></nav>" + ctaBand();
  }

  var PROG_LOOK = {   // tone and artwork per programme; the art files come from _工具/build-motifs.js
    "masterclass": { tone: "ink", art: "ag-mark-speck-light.svg" },
    "advanced-studio": { tone: "grey", art: "ag-stack-speck.svg" },
    "applications": { tone: "paper", art: "ag-mark-speck.svg" },
    "summer-lab": { tone: "paper", art: "ag-arc.svg", fog: true }
  };
  function pageProgramme() {
    var p = progBySlug(ID), d = (P.programmes || {})[ID];
    if (!p || !d || hiddenSec("programmes")) return notFound();
    var it = p.it, look = PROG_LOOK[ID] || { tone: "paper", art: "ag-mark-speck.svg" }, ink = look.tone === "ink";
    setMeta(t(it.name), t(d.tagline));
    var no = p.extra ? "+" : it.no, by = p.extra ? t(it.tag) : it.by;
    var h = '<section class="sh p-hero tone-' + look.tone + (p.extra ? " p-hero--soon" : "") + '"' + (ink ? " data-dark" : "") + ">" +
      (ink ? mist(true) : look.fog ? mist(false) : "") + (look.tone === "paper" && !look.fog ? arcs() : "") +
      '<div class="p-hero__art" aria-hidden="true"><img src="' + img(look.art) + '" alt=""></div>' +
      '<div class="wrap"><div class="sh__txt reveal">' +
      crumbs([{ label: UI.home, href: "index.html" }, { label: S.programmes.title, href: "index.html#programmes" }, { label: it.name }]) +
      '<div class="p-hero__no" aria-hidden="true">' + esc(no) + "</div>" +
      '<p class="p-hero__by">' + esc(by) + '</p><h1 class="sh__title">' + esc(t(it.name)) + '</h1><p class="sh__lead">' + esc(t(d.tagline)) + "</p>" +
      '<div class="sh__cta"><a class="btn' + (ink ? " btn--light" : "") + '" href="' + esc(link("index.html#contact")) + '">' + esc(t(S.cta)) + arrow() + "</a>" +
      (d.faq && d.faq.length ? '<a class="btn btn--ghost" href="#faq">' + esc(t(UI.questions)) + "</a>" : "") + "</div>" + draft(d.draft) + "</div>" +
      '<ul class="p-facts reveal">' + d.facts.map(function (f) { return "<li><b>" + esc(t(f.k)) + "</b><span>" + esc(t(f.v)) + "</span></li>"; }).join("") + "</ul></div></section>";
    var outc = t(d.outcomes);
    h += '<section class="p-sec"><div class="wrap"><div class="p-intro"><div class="p-intro__txt reveal"><p class="label">' + esc(t(UI.about)) + '</p><div style="height:14px"></div>' + paras(d.intro) + "</div>" +
      (outc.length ? '<div class="reveal"><p class="label">' + esc(t(UI.outcomes)) + '</p><div style="height:14px"></div><ul class="outc">' + outc.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" : "") + "</div></div></section>";
    if (d.modules && d.modules.length) h += '<section class="p-sec tone-grey"><div class="wrap"><div class="p-sec__head reveal"><h2>' + esc(t(UI.modules)) + "</h2></div>" +
      '<ol class="mods" style="--cols:' + Math.min(d.modules.length, 5) + '">' + d.modules.map(function (m, k) { return '<li class="reveal" style="--d:' + k * 70 + 'ms"><b aria-hidden="true">' + pad(k + 1) + "</b><h3>" + esc(t(m.t)) + "</h3><p>" + esc(t(m.d)) + "</p></li>"; }).join("") + "</ol></div></section>";
    if (d.join && d.join.length) h += '<section class="p-sec"><div class="wrap"><div class="p-sec__head reveal"><h2>' + esc(t(UI.join)) + "</h2></div>" +
      '<ol class="join">' + d.join.map(function (j, k) { return '<li class="reveal" style="--d:' + k * 70 + 'ms"><i aria-hidden="true"></i><b>' + pad(k + 1) + "</b><h3>" + esc(t(j.t)) + "</h3><p>" + esc(t(j.d)) + "</p></li>"; }).join("") + "</ol></div></section>";
    var tut = (d.tutors || []).filter(function (s) { var x = personBySlug(s); return x && !x.hidden; });
    if (tut.length && !hiddenSec("faculty")) h += '<section class="p-sec tone-ink" data-dark><div class="wrap"><div class="p-sec__head reveal"><h2>' + esc(t(UI.tutors)) + "</h2></div>" + tutorCards(tut) + "</div></section>";
    if (d.faq && d.faq.length) h += '<section class="p-sec" id="faq"><div class="wrap wrap--narrow"><div class="p-sec__head reveal"><h2>' + esc(t(UI.questions)) + "</h2></div>" + faqList(d.faq) + "</div></section>";
    return h + ctaBand();
  }

  // "中文名 English Name" → the Chinese name large, the English name on a smaller line
  function nameHtml(n) { var m = /^([\u3400-\u9fff·]+)\s+(.+)$/.exec(n); return m ? esc(m[1]) + "<small>" + esc(m[2]) + "</small>" : esc(n); }
  function pagePerson() {
    var p = personBySlug(ID), d = (P.people || {})[ID];
    if (!p || !d || p.hidden || hiddenSec("faculty")) return notFound();
    setMeta(t(p.name), t(d.bio)[0]);
    var others = S.faculty.people.filter(function (x) { return x.slug && x.slug !== ID && !x.hidden; }).map(function (x) { return x.slug; });
    var h = '<section class="sh pr-hero tone-ink" data-dark>' + mist(true) + '<div class="wrap"><div class="sh__grid">' +
      '<div class="pr-port reveal" aria-hidden="true"><span class="oval"></span><div class="pr-port__in">' + (p.photo ? '<img src="' + esc(ROOT + p.photo) + '" alt="">' : "<span>" + esc(p.initials) + "</span>") + "</div>" + arc() + "</div>" +
      '<div class="sh__txt reveal">' + crumbs([{ label: UI.home, href: "index.html" }, { label: S.faculty.title, href: "index.html#faculty" }, { label: p.name }]) +
      '<h1 class="sh__title">' + nameHtml(t(p.name)) + '</h1><p class="pr-role">' + esc(t(p.role)) + "</p>" +
      '<ul class="chip-row" aria-label="' + esc(t(UI.focus)) + '">' + t(d.focus).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
      '<div class="sh__cta"><a class="btn btn--light" href="' + esc(link("index.html#contact")) + '">' + esc(t(S.cta)) + arrow() + "</a></div>" + draft(d.draft) + "</div></div></div></section>";
    h += '<section class="p-sec"><div class="wrap"><div class="pr-body"><div class="pr-bio reveal"><p class="label">' + esc(t(UI.bio)) + '</p><div style="height:14px"></div>' + paras(d.bio) + "</div>" +
      '<aside class="pr-side reveal"><div><p class="label">' + esc(t(UI.background)) + '</p><div style="height:14px"></div><ul class="pr-lines">' + t(p.lines).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div></aside></div></div></section>";
    if (d.quote) h += '<section class="motto tone-grey">' + arcs() + '<div class="wrap reveal"><p>' + esc(t(d.quote)) + "</p></div></section>";
    if (d.leads && d.leads.length && !hiddenSec("programmes")) h += '<section class="p-sec"><div class="wrap"><div class="p-sec__head reveal"><h2>' + esc(t(UI.leads)) + "</h2></div>" + progCards(d.leads) + "</div></section>";
    if (others.length) h += '<section class="p-sec tone-ink" data-dark><div class="wrap"><div class="p-sec__head reveal"><h2>' + esc(t(UI.others)) + "</h2></div>" + tutorCards(others) + "</div></section>";
    return h + ctaBand();
  }

  function pageAlliance() {
    if (hiddenSec("alliance")) return notFound();
    var A = S.alliance, PA = P.alliance || {}, parts = PA.partners || {};
    setMeta(t(A.title), t(PA.lead));
    var tones = ["paper", "ink", "grey"];
    var h = '<section class="sh al-hero"><div class="wrap"><div class="sh__txt reveal">' +
      crumbs([{ label: UI.home, href: "index.html" }, { label: A.title }]) +
      '<h1 class="sh__title">' + esc(t(A.title)) + '</h1><p class="sh__lead">' + esc(t(PA.lead)) + "</p>" + draft(PA.draft) + "</div>" +
      '<div class="al-tiles reveal">' + A.items.map(function (it, i) { return (i ? '<span aria-hidden="true">×</span>' : "") + '<a class="ally__art" href="#' + esc(it.slug || it.key) + '" aria-label="' + esc(it.name) + '">' + allyArt(it.key) + "</a>"; }).join("") + "</div></div></section>";
    h += '<section class="p-sec"><div class="wrap"><div class="p-sec__head reveal"><h2>' + esc(t(UI.chain)) + '</h2></div><ol class="chain reveal">' +
      t(PA.chain).map(function (x) { return '<li><i aria-hidden="true"></i><b>' + esc(x) + "</b></li>"; }).join("") + "</ol></div></section>";
    A.items.forEach(function (it, i) {
      var x = parts[it.key] || {}, tone = tones[i % 3];
      h += '<section class="al-part tone-' + tone + '" id="' + esc(it.slug || it.key) + '"' + (tone === "ink" ? " data-dark" : "") + '><div class="wrap"><div class="al-part__grid">' +
        '<div class="ally__art reveal" aria-hidden="true">' + allyArt(it.key) + "</div>" +
        '<div class="al-part__txt reveal"><span class="ally__tag">' + esc(it.tag) + "</span><h2>" + esc(it.name) + "<small>" + esc(it.local + " · " + t(it.role)) + "</small></h2>" +
        "<p>" + esc(t(x.about || it.body)) + "</p>" +
        (x.mottos || (it.motto ? [it.motto] : [])).map(function (m) { return '<p class="ally__motto">' + esc(m) + "</p>"; }).join("") +
        (x.place ? '<p class="al-place">' + (x.site ? '<a href="' + esc(x.site) + '" target="_blank" rel="noopener">' + esc(t(x.place)) + "</a>" : esc(t(x.place))) + "</p>" : "") +
        (x.does ? '<p class="label">' + esc(t(UI.looksAfter)) + '</p><ul class="pr-lines">' + t(x.does).map(function (y) { return "<li>" + esc(y) + "</li>"; }).join("") + "</ul>" : "") +
        (x.how ? '<p class="label">' + esc(t(UI.howTheyWork)) + '</p><ul class="pr-lines">' + t(x.how).map(function (y) { return "<li>" + esc(y) + "</li>"; }).join("") + "</ul>" : "") +
        (x.programmes && !hiddenSec("programmes") ? progCards(x.programmes) : "") + "</div></div>" +
        (x.photos ? '<ul class="al-photos reveal">' + x.photos.map(function (ph) { return '<li><img src="' + esc(ROOT + ph.src) + '" alt="' + esc(t(ph.alt)) + '" loading="lazy" decoding="async"><span>' + esc(t(ph.alt)) + "</span></li>"; }).join("") + "</ul>" : "") +
        "</div></section>";
    });
    return h + ctaBand();
  }

  /* ---------- behaviour ---------- */
  var io;
  function observe() {
    if (io) io.disconnect();
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) { $$(".reveal").forEach(function (el) { el.classList.add("in"); }); return; }
    io = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: 0.12, rootMargin: "0px 0px -4% 0px" });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  }
  function navState() {
    var nav = $("#nav"), y = 38; if (!nav) return;
    nav.classList.toggle("nav--solid", scrollY > 40);
    nav.classList.toggle("nav--dark", $$("[data-dark]").some(function (s) { var r = s.getBoundingClientRect(); return r.top <= y && r.bottom > y; }));
  }
  function dockState() {
    var d = $("#dock"); if (!d) return;
    var end = $(".cta-band") || $("#foot"), past = scrollY > innerHeight * .6, atEnd = end ? end.getBoundingClientRect().top < innerHeight * .95 : false;
    d.classList.toggle("on", past && !atEnd);
  }
  function renderDock() {
    var d = $("#dock"); if (!d) return;
    if (S.meta.dock === false) { d.hidden = true; return; }
    d.innerHTML = '<svg class="dock__mark" aria-hidden="true"><use href="#ag-mark"/></svg><span class="dock__t">' + esc(t(S.hero.kicker)) + '</span><a class="btn btn--light" href="' + esc(link("index.html#contact")) + '">' + esc(t(S.cta)) + "</a>";
  }
  function renderAll() {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    renderNav();
    var fn = { journal: pageJournal, article: pageArticle, programme: pageProgramme, person: pagePerson, alliance: pageAlliance }[TYPE];
    $("#main").innerHTML = fn ? fn() : notFound();
    renderFoot(); renderDock();
    observe(); navState(); dockState(); bind();
  }
  function bind() {
    $("#langBtn").addEventListener("click", function () {
      lang = lang === "zh" ? "en" : "zh";
      try { localStorage.setItem("ag-lang", lang); } catch (e) {}
      var u = new URL(location.href); u.searchParams.set("lang", lang); history.replaceState(null, "", u);
      renderAll(); $$(".reveal").forEach(function (el) { el.classList.add("in"); });
    });
    var burger = $("#burger");
    burger.addEventListener("click", function () { var open = B.classList.toggle("menu-open"); burger.setAttribute("aria-expanded", open); });
    $("#navLinks").addEventListener("click", function (e) { if (e.target.tagName === "A") { B.classList.remove("menu-open"); burger.setAttribute("aria-expanded", "false"); } });
  }
  (function grain() {
    try {
      var c = document.createElement("canvas"), n = 180; c.width = c.height = n;
      var x = c.getContext("2d"), d = x.createImageData(n, n);
      for (var i = 0; i < d.data.length; i += 4) { var v = Math.random() * 255 | 0; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
      x.putImageData(d, 0, 0); $("#grain").style.backgroundImage = "url(" + c.toDataURL() + ")";
    } catch (e) {}
  })();
  renderAll();
  if (location.hash.length > 1) {
    var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) requestAnimationFrame(function () { target.scrollIntoView({ block: "start", behavior: "instant" }); navState(); });
  }
  addEventListener("scroll", function () { navState(); dockState(); }, { passive: true });
  addEventListener("resize", dockState, { passive: true });
})();
