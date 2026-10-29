/* Avantgarde Studio — renderer. Content lives in content.js. */
(function () {
  "use strict";
  var S = window.SITE;
  var LANGS = ["zh", "en"];
  var lang = pickLang();

  function autoLang() { return (navigator.language || "zh").toLowerCase().indexOf("zh") === 0 ? "zh" : "en"; }
  function pickLang() {
    var q = new URLSearchParams(location.search).get("lang");
    if (LANGS.indexOf(q) > -1) return q;
    try { var s = localStorage.getItem("ag-lang"); if (LANGS.indexOf(s) > -1) return s; } catch (e) {}
    return autoLang();
  }
  // Link to a subpage, keeping the chosen language even where storage is blocked (some in-app browsers)
  function link(p) {
    if (!p || p.charAt(0) === "#") return p;
    var h = p.indexOf("#"), hash = h > -1 ? p.slice(h) : "", base = h > -1 ? p.slice(0, h) : p;
    return base + (lang !== autoLang() ? "?lang=" + lang : "") + hash;
  }
  var UI = S.ui || {};
  function t(v) {
    if (v == null) return "";
    if (typeof v === "string" || typeof v === "number") return String(v);
    if (Array.isArray(v)) return v;
    return v[lang] != null ? v[lang] : (v.zh != null ? v.zh : "");
  }
  function get(path) { return path.split(".").reduce(function (o, k) { return o && o[k]; }, S); }
  // " · " becomes a non-breaking space + dot, so a line may end with the dot but never start with it
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }).replace(/ · /g, "\u00a0· ").replace(/(\d)–(\d)/g, "$1\u2060–\u2060$2"); }  // 4–6 and 2003–2011 never split
  // An email may wrap only after the "@": the hyphenated domain stays on one line.
  function mailLabel(m) { var i = m.indexOf("@"); return i < 0 ? esc(m) : '<span class="nw">' + esc(m.slice(0, i + 1)) + '</span><wbr><span class="nw">' + esc(m.slice(i + 1)) + "</span>"; }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function head(o, dark) {
    return '<header class="sec__head reveal"><h2 class="h2">' + esc(t(o.title)) + '</h2>' +
      (o.intro ? '<p class="sec__intro">' + esc(t(o.intro)) + "</p>" : "") + "</header>";
  }
  // A section (or a person) with `hidden: true` in content.js is left out, together with its menu link.
  function hiddenSec(id) { var d = S[id]; return !!(d && d.hidden); }
  function badge(show) { return show ? '<div class="sample" role="note">' + esc(t(S.meta.sampleBadge)) + "</div>" : ""; }
  function num(f, cls) {
    if (f.text) return '<span class="' + cls + " " + cls + '--t">' + esc(f.text) + "</span>";
    return '<span class="' + cls + '">' + esc(f.prefix || "") + '<b data-count="' + f.value + '">0</b>' + esc(f.suffix || "") + "</span>";
  }

  /* ---------- sections ---------- */
  function renderStatic() {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    $$("[data-t]").forEach(function (el) {
      var k = el.getAttribute("data-t");
      el.textContent = k === "cta" ? t(S.cta) : t(get(k));
    });
    $$("#langBtn [data-l]").forEach(function (el) { el.classList.toggle("on", el.getAttribute("data-l") === lang); });
    S.nav.forEach(function (n) { var el = document.getElementById(n.id); if (el) el.hidden = hiddenSec(n.id); });
    $("#navLinks").innerHTML = S.nav.filter(function (n) { return !hiddenSec(n.id); }).map(function (n) {
      return '<a href="' + esc(n.href ? link(n.href) : "#" + n.id) + '"' + (n.href ? ' class="nav__ext"' : "") + ">" + esc(t(n)) + "</a>";
    }).join("") + '<a class="nav__cta-m" href="#contact">' + esc(t(S.cta)) + "</a>";
    $("#collab").innerHTML = S.brand.partners.map(function (p, i) {
      return (i ? '<li class="collab__x" aria-hidden="true">×</li>' : "") +
        '<li class="collab__p collab__' + p.key + '"><b>' + esc(p.name) + "</b><small>" + esc(p.local) + "</small></li>";
    }).join("");
  }

  function renderFacts() {
    $("#facts").innerHTML = '<ul class="facts__row">' + S.facts.map(function (f) {
      return '<li class="reveal">' + num(f, "facts__n") + '<span class="facts__l">' + esc(t(f.label)) + "</span></li>";
    }).join("") + "</ul>";
  }

  function renderAlliance() {
    if (hiddenSec("alliance")) return;
    var a = S.alliance;
    $("#alliance").innerHTML = '<div class="wrap">' + head(a) + '<div class="alliance">' +
      a.items.map(function (it, i) {
        return '<a class="ally ally--' + it.key + ' reveal" style="--d:' + i * 90 + 'ms" href="' + esc(link("alliance/index.html#" + (it.slug || it.key))) + '">' +
          '<div class="ally__media"><div class="ally__art" aria-hidden="true">' + allyArt(it.key) + "</div>" +
          (i < a.items.length - 1 ? '<span class="ally__join" aria-hidden="true">×</span>' : "") + "</div>" +
          '<span class="ally__tag">' + it.tag + "</span>" +
          '<h3 class="ally__name">' + esc(it.name) + "<small>" + esc(it.local) + "</small></h3>" +
          '<p class="ally__role">' + esc(t(it.role)) + "</p>" +
          '<p class="ally__body">' + esc(t(it.body)) + "</p>" +
          (it.motto ? '<p class="ally__motto">' + esc(it.motto) + "</p>" : "") +
          '<span class="more">' + esc(t(a.more || UI.more)) + ' <i aria-hidden="true">→</i></span>' +
          "</a>" + (i < a.items.length - 1 ? '<span class="ally__x" aria-hidden="true">×</span>' : "");
      }).join("") + "</div></div>";
  }
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

  function renderProgrammes() {
    if (hiddenSec("programmes")) return;
    var p = S.programmes;
    $("#programmes").innerHTML = '<div class="wrap">' + head(p) + '<div class="progs">' +
      p.items.map(function (it, i) {
        var tag = it.slug ? "a" : "article";
        return "<" + tag + ' class="prog' + (it.dark ? " prog--dark" : "") + ' reveal" style="--d:' + i * 90 + 'ms"' + (it.slug ? ' href="' + esc(link("programmes/" + it.slug + ".html")) + '"' : "") + ">" +
          '<div class="prog__top"><span class="prog__no">' + it.no + '</span><span class="prog__by">' + esc(it.by) + "</span></div>" +
          '<h3 class="prog__name">' + esc(t(it.name)) + "</h3>" +
          "<ul>" + t(it.points).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
          '<p class="prog__fit">' + esc(t(it.fit)) + "</p>" +
          (it.slug ? '<span class="more">' + esc(t(UI.viewProgramme)) + ' <i aria-hidden="true">→</i></span>' : "") +
          '<svg class="prog__deco" aria-hidden="true"><use href="#' + (i === 0 ? "ag-g" : i === 1 ? "ag-a" : "ag-mark") + '"/></svg>' +
          "</" + tag + ">";
      }).join("") + "</div>" +
      (p.extra.slug
        ? '<a class="extra reveal" href="' + esc(link("programmes/" + p.extra.slug + ".html")) + '"><span class="extra__tag">' + esc(t(p.extra.tag)) + "</span><h3>" + esc(t(p.extra.name)) + "</h3><p>" + esc(t(p.extra.body)) + '</p><span class="more">' + esc(t(UI.more)) + ' <i aria-hidden="true">→</i></span></a>'
        : '<aside class="extra reveal"><span class="extra__tag">' + esc(t(p.extra.tag)) + "</span><h3>" + esc(t(p.extra.name)) + "</h3><p>" + esc(t(p.extra.body)) + "</p></aside>") +
      "</div>";
  }

  function renderJourney() {
    if (hiddenSec("journey")) return;
    var j = S.journey;
    $("#journey").innerHTML = '<div class="wrap">' + head(j) + '<ol class="journey">' +
      j.steps.map(function (s, i) {
        return '<li class="step reveal" style="--d:' + i * 70 + 'ms"><span class="step__no">' + String(i + 1).padStart(2, "0") +
          '</span><span class="step__dot" aria-hidden="true"></span><h3 class="step__t">' + (s.link ? '<a href="' + esc(link(s.link)) + '">' + esc(t(s)) + "</a>" : esc(t(s))) + '</h3><p class="step__d">' + esc(t(s.d)) + "</p></li>";
      }).join("") + "</ol></div>";
  }

  function renderFaculty() {
    if (hiddenSec("faculty")) return;
    var f = S.faculty;
    $("#faculty").innerHTML = '<div class="wrap">' + head(f) + '<div class="people">' +
      f.people.filter(function (p) { return !p.hidden; }).map(function (p, i) {
        var tag = p.slug ? "a" : "article";
        return "<" + tag + ' class="person reveal" style="--d:' + i * 90 + 'ms"' + (p.slug ? ' href="' + esc(link("faculty/" + p.slug + ".html")) + '"' : "") + ">" +
          (p.photo
            ? '<div class="person__pic"><img src="' + esc(p.photo) + '" alt="' + esc(t(p.name)) + '" loading="lazy"></div>'
            : '<div class="person__pic" aria-hidden="true"><span>' + esc(p.initials) + "</span></div>") +
          '<h3 class="person__name">' + esc(t(p.name)) + "</h3>" +
          '<p class="person__role">' + esc(t(p.role)) + "</p>" +
          '<ul class="person__lines">' + t(p.lines).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
          (p.slug ? '<span class="more">' + esc(t(UI.viewProfile)) + ' <i aria-hidden="true">→</i></span>' : "") + "</" + tag + ">";
      }).join("") + "</div></div>";
  }

  function renderResults() {
    if (hiddenSec("results")) return;
    var r = S.results;
    var cards = r.offers.map(function (o) {
      return '<li class="offer"><span class="offer__y">' + esc(o.year) + '</span><b class="offer__s">' + esc(o.school) + '</b><span class="offer__c">' + esc(o.course) + "</span></li>";
    }).join("");
    $("#results").innerHTML = '<div class="wrap">' + head(r) +
      '<ul class="big">' + r.stats.map(function (s, i) {
        return '<li class="reveal" style="--d:' + i * 90 + 'ms">' + num(s, "big__n") + '<span class="big__l">' + esc(t(s.label)) + "</span></li>";
      }).join("") + "</ul>" + badge(r.sample) + "</div>" +
      '<div class="marquee" aria-label="Offers"><ul class="marquee__track">' + cards + cards + "</ul></div>" +
      (r.quote ? '<div class="wrap"><blockquote class="quote reveal"><p>' + esc(t(r.quote.text)) + "</p><cite>" + esc(t(r.quote.who)) + "</cite>" + badge(r.sample) + "</blockquote></div>" : "");
  }

  function renderJournal() {
    if (hiddenSec("journal")) return;
    var j = S.journal;
    var h = head(j);
    if (j.all) h = h.replace('<header class="sec__head reveal">', '<header class="sec__head sec__head--row reveal"><div>').replace("</header>", '</div><a class="more" href="' + esc(link("journal/index.html")) + '">' + esc(t(j.all)) + ' <i aria-hidden="true">→</i></a></header>');
    $("#journal").innerHTML = '<div class="arcs" aria-hidden="true"></div><div class="wrap">' + h + '<div class="posts">' +
      j.items.map(function (it, i) {
        var tag = it.slug ? "a" : "article";
        return "<" + tag + ' class="post reveal" style="--d:' + i * 80 + 'ms"' + (it.slug ? ' href="' + esc(link("journal/" + it.slug + ".html")) + '"' : "") + '><div class="post__art post__art--' + it.art + '" aria-hidden="true">' + postArt(it.art, i) +
          '</div><span class="post__tag">' + esc(t(it.tag)) + '</span><h3 class="post__t">' + esc(t(it.t)) + "</h3>" +
          (it.slug ? '<span class="more">' + esc(t(UI.readMore)) + ' <i aria-hidden="true">→</i></span>' : "") + "</" + tag + ">";
      }).join("") + "</div></div>";
  }
  function postArt(k, i) {
    var n = String(i + 1).padStart(2, "0");
    if (k === "arch") return '<svg viewBox="0 0 300 400"><path d="M60 400V190a90 90 0 0 1 180 0v210z" fill="currentColor"/><text x="22" y="52" class="post__n">' + n + "</text></svg>";
    if (k === "stack") return '<svg viewBox="0 0 300 400"><use href="#ag-stack" x="40" y="60" width="220" height="300"/><text x="22" y="52" class="post__n">' + n + "</text></svg>";
    if (k === "circle") return '<svg viewBox="0 0 300 400"><circle cx="150" cy="230" r="110" fill="currentColor"/><circle cx="150" cy="230" r="46" class="post__hole"/><text x="22" y="52" class="post__n">' + n + "</text></svg>";
    var g = ""; for (var r = 0; r < 4; r++) for (var c = 0; c < 3; c++) g += '<rect x="' + (40 + c * 76) + '" y="' + (110 + r * 70) + '" width="' + ((r + c) % 3 ? 60 : 60) + '" height="54" rx="' + ((r * 3 + c) % 4 === 0 ? 27 : 6) + '" fill="currentColor" opacity="' + (((r + c) % 3) ? 1 : .35) + '"/>';
    return '<svg viewBox="0 0 300 400">' + g + '<text x="22" y="52" class="post__n">' + n + "</text></svg>";
  }

  function renderLab() {
    var el = document.getElementById("lab"); if (!el) return;
    var L = S.lab; if (!L || L.hidden) { el.hidden = true; return; }
    el.hidden = false;
    el.innerHTML = '<div class="mist mist--dark" aria-hidden="true"><i></i><i></i><i></i></div><div class="arcs arcs--light" aria-hidden="true"></div>' +
      '<div class="wrap"><div class="labband__txt reveal"><p class="labband__k">' + esc(t(L.kicker)) + "</p>" +
      "<h2>" + esc(t(L.title)) + "</h2><p>" + esc(t(L.body)) + "</p>" +
      '<ul class="labband__parts">' + t(L.parts).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
      '<a class="btn btn--light" href="' + esc(link(L.href)) + '">' + esc(t(L.cta)) + ' <i aria-hidden="true">→</i></a></div>' +
      '<div class="labband__art reveal" aria-hidden="true"><span class="oval"></span><img src="assets/img/ag-mark-speck.svg" alt="" width="408" height="208">' +
      '<svg class="arc" viewBox="' + ARC_VB + '"><use href="#ag-arc"/></svg></div></div>';
  }
  // <use> draws a symbol from 0,0 at the symbol's own size, so the outer viewBox is "0 0 width height"
  var ARC_VB = (function () { var s = document.getElementById("ag-arc"), v = s ? s.getAttribute("viewBox").split(/\s+/) : [0, 0, 354, 428]; return "0 0 " + v[2] + " " + v[3]; })();

  function renderDock() {
    var d = document.getElementById("dock"); if (!d) return;
    if (S.meta.dock === false) { d.hidden = true; return; }
    d.innerHTML = '<svg class="dock__mark" aria-hidden="true"><use href="#ag-mark"/></svg><span class="dock__t">' + esc(t(S.hero.kicker)) + '</span><a class="btn btn--light" href="#contact">' + esc(t(S.cta)) + "</a>";
  }
  function dockState() {
    var d = document.getElementById("dock"); if (!d) return;
    var hero = document.getElementById("top"), contact = document.getElementById("contact");
    var past = hero ? hero.getBoundingClientRect().bottom < 80 : scrollY > 400;
    var atForm = contact ? contact.getBoundingClientRect().top < innerHeight * .9 : false;
    d.classList.toggle("on", past && !atForm);
  }

  function renderFaq() {
    if (hiddenSec("faq")) return;
    var f = S.faq;
    $("#faq").innerHTML = '<div class="wrap wrap--narrow">' + head(f) + '<div class="faq">' +
      f.items.map(function (it) {
        return '<details class="qa reveal"><summary>' + esc(t(it.q)) + '<i aria-hidden="true"></i></summary><p>' + esc(t(it.a)) + "</p></details>";
      }).join("") + "</div></div>";
  }

  function renderContact() {
    var c = S.contact, f = c.fields, workerContact = activeContactWorker();
    var turnstile = workerContact
      ? '<div class="form__turnstile cf-turnstile" data-sitekey="' + esc(workerContact.siteKey) + '"></div>'
      : "";
    // WeChat details appear only once a real QR code is set; until then the block shows the email address alone.
    var qr = S.meta.wechatQr ? '<img src="' + esc(S.meta.wechatQr) + '" alt="WeChat QR" width="160" height="160">' : "";
    var wx = S.meta.wechatQr ? "<b>" + esc(t(c.wechat)) + "</b>" + (S.meta.wechatId ? "<span>" + esc("WeChat · " + S.meta.wechatId) + "</span>" : "") : "";
    $("#contact").innerHTML = '<div class="wrap contact__grid">' +
      '<div class="contact__l reveal"><h2 class="h2">' + esc(t(c.title)) + '</h2><p class="sec__intro">' + esc(t(c.body)) + "</p>" +
      '<div class="wechat">' + qr + "<div>" + wx + '<a href="mailto:' + esc(S.meta.email) + '">' + mailLabel(S.meta.email) + "</a></div></div></div>" +
      '<form class="form reveal" id="form" novalidate>' +
      field("name", t(f.name), "text", true) + field("contact", t(f.contact), "text", true) +
      '<fieldset class="chips"><legend>' + esc(t(f.stage)) + "</legend>" + t(f.stages).map(function (s, i) {
        return '<label><input type="radio" name="stage" value="' + esc(s) + '"' + (i === 0 ? " checked" : "") + "><span>" + esc(s) + "</span></label>";
      }).join("") + "</fieldset>" +
      '<label class="field"><span>' + esc(t(f.note)) + '</span><textarea name="note" rows="3"></textarea></label>' +
      '<label class="form__hp" aria-hidden="true">Website<input name="website" type="text" tabindex="-1" autocomplete="off"></label>' +
      turnstile +
      '<button class="btn btn--light" type="submit">' + esc(t(f.send)) + ' <i aria-hidden="true">→</i></button><p class="form__msg" id="formMsg" role="status"></p></form></div>';
    function field(n, l, type, req) {
      return '<label class="field"><span>' + esc(l) + '</span><input name="' + n + '" type="' + type + '"' + (req ? " required" : "") + ' autocomplete="' + (n === "name" ? "name" : "off") + '"></label>';
    }
    $("#form").addEventListener("submit", onSubmit);
    if (workerContact) {
      loadTurnstile(workerContact);
    }
  }

  var turnstileWidgetId = null;

  function activeContactWorker() {
    var endpoint = String(S.meta.formEndpoint || "").trim();
    var siteKey = String(S.meta.turnstileSiteKey || "").trim();
    if (!S.meta.formEnabled || !endpoint || !siteKey) return null;
    try {
      var url = new URL(endpoint);
      if (
        url.protocol !== "https:" ||
        url.hostname !== "email-api.a-v-a-n-t-g-a-r-d-e.com" ||
        url.port ||
        url.username ||
        url.password ||
        url.pathname !== "/v1/contact/avantgarde" ||
        url.search ||
        url.hash
      ) return null;
      return { endpoint: url.href, siteKey: siteKey };
    } catch (e) {
      return null;
    }
  }

  // Renders the Turnstile check into the form. Only live state counts (window.turnstile and a widget held in
  // memory), never markers in the HTML, so a saved or prerendered page cannot leave the form without a check.
  function loadTurnstile(workerContact) {
    function render() {
      var node = $("#form .cf-turnstile");
      if (!node || !window.turnstile || node.agTurnstile) return;
      node.innerHTML = "";
      node.agTurnstile = true;
      turnstileWidgetId = window.turnstile.render(node, {
        sitekey: workerContact.siteKey,
        action: "avantgarde-contact",
        "error-callback": turnstileFailed,
        "unsupported-callback": turnstileFailed
      });
    }
    if (window.turnstile) { render(); return; }
    if (!document.querySelector("script[data-ag-turnstile]")) {
      var script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.dataset.agTurnstile = "true";
      script.onerror = turnstileFailed;
      document.head.appendChild(script);
    }
    var tries = 0;
    (function wait() {
      if (window.turnstile) render();
      else if (++tries < 150) setTimeout(wait, 200);
      else turnstileFailed();
    })();
  }
  // If the check cannot load (blocked network, old browser), say so and point to email and WeChat instead.
  function turnstileFailed() {
    var msg = $("#formMsg");
    if (msg) msg.textContent = t(S.contact.fields.failed);
  }

  function onSubmit(e) {
    e.preventDefault();
    var form = e.target, msg = $("#formMsg"), f = S.contact.fields;
    var ok = true;
    $$("input[required]", form).forEach(function (i) { var bad = !i.value.trim(); i.classList.toggle("bad", bad); if (bad) ok = false; });
    if (!ok) return;
    var data = new FormData(form);
    var workerContact = activeContactWorker();
    if (workerContact) {
      var token = String(data.get("cf-turnstile-response") || "");
      if (!token) { msg.textContent = t(f.verification); return; }
      var submit = form.querySelector('button[type="submit"]');
      if (submit) submit.disabled = true;
      fetch(workerContact.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") || ""),
          contact: String(data.get("contact") || ""),
          stage: String(data.get("stage") || ""),
          note: String(data.get("note") || ""),
          website: String(data.get("website") || ""),
          lang: lang,
          turnstileToken: token
        })
      })
        .then(function (r) {
          if (!r.ok) throw new Error("submission failed");
          return r.json().catch(function () { return {}; });
        })
        .then(function (res) {
          form.reset();
          msg.textContent = t(res && res.acknowledged ? f.okAck : f.ok);
        })
        .catch(function () { msg.textContent = t(f.failed); })
        .then(function () {
          if (turnstileWidgetId !== null && window.turnstile) window.turnstile.reset(turnstileWidgetId);
          if (submit) submit.disabled = false;
        });
      return;
    }
    if (/MicroMessenger/i.test(navigator.userAgent)) { msg.textContent = t(S.meta.wechatQr ? f.wechatHint : f.mailHint) + " " + S.meta.email; return; }
    var body = [t(f.name) + ": " + data.get("name"), t(f.contact) + ": " + data.get("contact"), t(f.stage) + ": " + data.get("stage"), "", data.get("note") || ""].join("\n");
    location.href = "mailto:" + S.meta.email + "?subject=" + encodeURIComponent("Portfolio review · " + data.get("name")) + "&body=" + encodeURIComponent(body);
    msg.textContent = t(f.sent);
  }

  function renderFooter() {
    var ring = "Avantgarde Studio · Skyline · De Beauvoir Forum · ";
    var ringLen = (2 * Math.PI * 78 - 1).toFixed(1);   // text is stretched to exactly one lap, so the end meets the start
    var footNav = S.nav.filter(function (n) { return !hiddenSec(n.id); });
    $("#foot").innerHTML = '<div class="wrap foot__grid">' +
      '<div class="foot__brand"><svg class="foot__lockup" role="img" aria-label="Avantgarde Studio"><use href="#ag-lockup"/></svg>' +
      '<p class="foot__collab">× 天际线 Skyline<br>× De Beauvoir Forum</p></div>' +
      '<svg class="ring" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="ringPath" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0"/></defs><text><textPath href="#ringPath" textLength="' + ringLen + '" lengthAdjust="spacing">' + ring + "</textPath></text><use href=\"#ag-mark\" x=\"62\" y=\"80\" width=\"76\" height=\"40\"/></svg>" +
      '<div class="foot__meta"><nav>' + footNav.map(function (n) { return '<a href="' + esc(n.href ? link(n.href) : "#" + n.id) + '">' + esc(t(n)) + "</a>"; }).join("") + "</nav>" +
      "<p>" + esc(t(S.footer.line)) + '</p><p class="foot__small">' + esc(t(S.footer.disclaimer)) + "</p>" +
      '<p class="foot__small">© ' + new Date().getFullYear() + " Avantgarde Studio 先端艺培</p></div></div>" +
      '<div class="foot__giant" aria-hidden="true">AVANTGARDE</div>';
  }

  /* ---------- behaviour ---------- */
  var io;
  function observe() {
    if (io) io.disconnect();
    var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!("IntersectionObserver" in window) || reduce) {
      $$(".reveal").forEach(function (el) { el.classList.add("in"); });
      $$("[data-count]").forEach(function (el) { el.textContent = el.getAttribute("data-count"); });
      return;
    }
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        $$("[data-count]", en.target).forEach(countUp);
        io.unobserve(en.target);
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  }
  function countUp(el) {
    var end = +el.getAttribute("data-count"), t0 = null, dur = 1400;
    function f(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1), e = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(end * e);
      if (p < 1) requestAnimationFrame(f);
    }
    requestAnimationFrame(f);
  }

  function navState() {
    var nav = $("#nav"), y = 38;
    nav.classList.toggle("nav--solid", scrollY > 40);
    var dark = $$("[data-dark]").some(function (s) { var r = s.getBoundingClientRect(); return r.top <= y && r.bottom > y; });
    nav.classList.toggle("nav--dark", dark);
  }

  function renderAll() {
    renderStatic(); renderFacts(); renderAlliance(); renderProgrammes(); renderJourney();
    renderFaculty(); renderResults(); renderJournal(); renderLab(); renderFaq(); renderContact(); renderFooter(); renderDock();
    observe(); navState(); dockState();
  }

  (function grain() {
    try {
      var c = document.createElement("canvas"), n = 180; c.width = c.height = n;
      var x = c.getContext("2d"), d = x.createImageData(n, n);
      for (var i = 0; i < d.data.length; i += 4) { var v = Math.random() * 255 | 0; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
      x.putImageData(d, 0, 0);
      $("#grain").style.backgroundImage = "url(" + c.toDataURL() + ")";
    } catch (e) {}
  })();

  renderAll();
  // Sections are rendered by JS, so the browser's own jump to #hash happens too early.
  if (location.hash.length > 1) {
    var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) requestAnimationFrame(function () { target.scrollIntoView({ block: "start", behavior: "instant" }); navState(); });
  }
  addEventListener("scroll", function () { navState(); dockState(); }, { passive: true });
  addEventListener("resize", dockState, { passive: true });
  $("#langBtn").addEventListener("click", function () {
    lang = lang === "zh" ? "en" : "zh";
    try { localStorage.setItem("ag-lang", lang); } catch (e) {}
    var u = new URL(location.href); u.searchParams.set("lang", lang); history.replaceState(null, "", u);
    renderAll();
    $$(".reveal").forEach(function (el) { el.classList.add("in"); });
    $$("[data-count]").forEach(function (el) { el.textContent = el.getAttribute("data-count"); });
  });
  var burger = $("#burger");
  burger.addEventListener("click", function () {
    var open = document.body.classList.toggle("menu-open");
    burger.setAttribute("aria-expanded", open);
  });
  $("#navLinks").addEventListener("click", function (e) {
    if (e.target.tagName === "A") { document.body.classList.remove("menu-open"); burger.setAttribute("aria-expanded", "false"); }
  });
})();
