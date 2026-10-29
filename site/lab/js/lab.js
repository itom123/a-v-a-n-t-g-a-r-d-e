/*!
 * AG LAB · page controller
 * Three steps (birth details → 60 questions, or the visitor's own MBTI →
 * application profile), then the report. Everything is computed in the
 * browser; nothing leaves the page unless the visitor sends one of the forms.
 */
(function () {
  "use strict";

  var L = window.LAB;
  var SITE = window.SITE || { meta: {} };
  var Bazi = window.AGBazi, T16 = window.AGType16, Match = window.AGMatch, Card = window.AGCard, Astro = window.AGAstro, Report = window.AGReport;
  var app = document.getElementById("app");
  var KEY = "ag-lab-v2"; // v2: Likert items and the self-reported type
  var U = L.ui;
  var XJ = { "Asia/Urumqi": 1, "Asia/Kashgar": 1 };
  var SEP = "\u00a0· "; // dot separator: a line may end with it but never start with it
  var MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var LUNAR_M = ["正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "冬月", "腊月"];
  var LUNAR_D = ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"];

  /* ------------------------------------------------------------------ *
   * Utilities
   * ------------------------------------------------------------------ */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    }).replace(/ · /g, SEP);
  }
  function tr(v, vars) {
    var s;
    if (v == null) s = "";
    else if (typeof v === "string" || typeof v === "number") s = String(v);
    else s = v[state.lang] != null ? v[state.lang] : (v.zh != null ? v.zh : "");
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split("{" + k + "}").join(vars[k]); });
    return s;
  }
  function T(v, vars) { return esc(tr(v, vars)); }
  function pad(n) { return String(n).padStart(2, "0"); }
  function range(a, b) { var o = []; for (var i = a; i <= b; i++) o.push(i); return o; }
  function pct(x) { return Math.round(x * 100); }
  function safe(fn, fallback) { try { return fn(); } catch (e) { return fallback; } }
  function fmtOff(min) {
    var s = min >= 0 ? "+" : "−", a = Math.abs(min);
    return s + pad(Math.floor(a / 60)) + ":" + pad(Math.round(a % 60));
  }
  function fmtSigned(min) {
    var r = Math.round(min);
    return (r >= 0 ? "+" : "−") + Math.abs(r) + (state.lang === "zh" ? "\u00a0分钟" : "\u00a0min"); // number stays with its unit
  }
  function fmtWall(w) {
    return w.y + "-" + pad(w.m) + "-" + pad(w.d) + " " + pad(w.h) + ":" + pad(w.mi);
  }
  function fmtUtc(t) {
    var d = new Date(t);
    return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + " " + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes());
  }
  function loadScript(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = function () { res(); };
      s.onerror = function () { rej(new Error("load " + src)); };
      document.head.appendChild(s);
    });
  }

  var store = {
    get: function () { try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { return null; } },
    set: function (v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } },
    clear: function () { try { localStorage.removeItem(KEY); } catch (e) { /* storage unavailable */ } }
  };

  /* ------------------------------------------------------------------ *
   * State
   * ------------------------------------------------------------------ */
  function captureSource() {
    var q = new URLSearchParams(location.search), out = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "src", "from"].forEach(function (k) {
      if (q.get(k)) out[k] = q.get(k).slice(0, 80);
    });
    if (document.referrer) out.referrer = document.referrer.slice(0, 200);
    return out;
  }

  function initialLang() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "zh" || q === "en") return q;
    var saved = store.get();
    if (saved && (saved.lang === "zh" || saved.lang === "en")) return saved.lang;
    return (navigator.language || "zh").toLowerCase().indexOf("zh") === 0 ? "zh" : "en";
  }

  function fresh() {
    return {
      step: "intro",
      lang: initialLang(),
      birth: {
        calendar: "solar", year: null, month: null, day: null, hour: null, minute: null, unknownTime: false,
        placeMode: "city", city: null, lat: "", lon: "", tzAuto: null, tz: null, tzManual: false, xjTime: false,
        solarTime: "true", ziRule: "23"
      },
      mode: "test", // "test": full question bank; "self": the visitor enters their MBTI
      self: { code: "", at: "", source: "16p", sure: { EI: "moderate", SN: "moderate", TF: "moderate", JP: "moderate" }, skippedRes: false },
      answers: {},
      qIndex: 0,
      quizStartedAt: null,
      quizMs: 0,
      profile: { level: null, disciplines: [], stage: null, timeline: null, budget: null, city: null, ielts: null },
      unlocked: false,
      src: captureSource(),
      startedAt: Date.now()
    };
  }

  var saved = store.get();
  var state = saved && saved.birth ? saved : fresh();
  state.lang = initialLang();
  var fromUrl = captureSource();
  if (Object.keys(fromUrl).length) state.src = fromUrl;
  var current = null; // computed report (not persisted)

  var persistTimer = null;
  function persist() {
    clearTimeout(persistTimer);
    persistTimer = setTimeout(function () { store.set(state); }, 150);
  }

  // Question order: the four pairs take turns, attention checks sit at fixed
  // spread-out positions, and the resilience scale comes last.
  var QUIZ = {};
  var CHECK_AT = [11, 24, 37, 46];
  function Q() {
    var m = state.mode === "self" ? "self" : "test";
    if (QUIZ[m]) return QUIZ[m];
    var out = [];
    if (m === "test") {
      var byDim = { EI: [], SN: [], TF: [], JP: [] };
      L.items.forEach(function (it) { byDim[it.d].push(it); });
      for (var i = 0; i < 12; i++) {
        ["EI", "SN", "TF", "JP"].forEach(function (d) { if (byDim[d][i]) out.push({ kind: "type", item: byDim[d][i] }); });
      }
      (L.validity || []).forEach(function (it, k) { out.splice(Math.min(CHECK_AT[k] || out.length, out.length), 0, { kind: "check", item: it }); });
    }
    L.resilience.forEach(function (it) { out.push({ kind: "res", item: it }); });
    return (QUIZ[m] = out);
  }
  function quizDone() { return Q().every(function (q) { return state.answers[q.item.id]; }); }

  /* ------------------------------------------------------------------ *
   * Calendar library
   * ------------------------------------------------------------------ */
  var libOk = false;
  (function initLib() {
    var src = window.AG_LUNAR || window;
    if (src.Solar && src.Lunar) {
      Bazi.init({ Solar: src.Solar, Lunar: src.Lunar, LunarYear: src.LunarYear, LunarMonth: src.LunarMonth });
      libOk = true;
    }
  })();

  /* ------------------------------------------------------------------ *
   * Places, cities and time zones
   * ------------------------------------------------------------------ */
  var cities = null, citiesLoading = null;
  function ensureCities() {
    if (cities) return Promise.resolve(cities);
    if (!citiesLoading) {
      citiesLoading = loadScript("data/cities.js").then(function () {
        cities = window.AG_CITIES || [];
        return cities;
      });
    }
    return citiesLoading;
  }
  function ensureTzLookup() {
    if (typeof window.tzlookup === "function") return Promise.resolve();
    return loadScript("vendor/tz-lookup.js");
  }

  // City record: [name, english, admin, countryCode, lat, lon, tz, population, adminEnglish?]
  function countryName(cc) {
    var m = window.AG_COUNTRY && window.AG_COUNTRY[cc];
    return m ? (state.lang === "zh" ? m[0] : m[1]) : cc;
  }
  function cityLabel(c) {
    var name = state.lang === "zh" ? c[0] : c[1];
    var alt = state.lang === "zh" ? (c[1] !== c[0] ? c[1] : "") : (c[0] !== c[1] ? c[0] : "");
    var adm = state.lang === "zh" ? c[2] : c[8] || c[2];
    return { name: name, alt: alt, where: [adm, countryName(c[3])].filter(Boolean).join(SEP) };
  }

  // "Ürümqi" / "Köln" match "urumqi" / "koln"
  function fold(s) {
    return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’']/g, "");
  }
  var folded = null;
  function searchCities(q) {
    if (!cities) return [];
    q = fold(q.trim()).replace(/[市县区州]$/, "");
    if (!q) return [];
    if (!folded) folded = cities.map(function (c) { return fold(c[1]); });
    var res = [];
    for (var i = 0; i < cities.length; i++) {
      var c = cities[i], n = c[0], e = folded[i], s = 0;
      if (n === q || e === q) s = 4;
      else if (n.indexOf(q) === 0 || e.indexOf(q) === 0) s = 3;
      else if (n.indexOf(q) > 0 || e.indexOf(q) > 0) s = 2;
      else continue;
      res.push([s, c]);
    }
    res.sort(function (a, b) { return b[0] - a[0] || b[1][7] - a[1][7]; });
    return res.slice(0, 8).map(function (r) { return r[1]; });
  }

  function nearestCity(lat, lon) {
    if (!cities) return null;
    var best = null, bd = Infinity, cl = Math.cos(lat * Math.PI / 180);
    for (var i = 0; i < cities.length; i++) {
      var dy = cities[i][4] - lat, dx = (cities[i][5] - lon) * cl, d = dy * dy + dx * dx;
      if (d < bd) { bd = d; best = cities[i]; }
    }
    return best ? { city: best, km: Math.sqrt(bd) * 111.2 } : null;
  }

  /** Parse "22.54, 114.06", "22°32′N 114°03′E", "北纬22.5 东经114.1" … */
  function parseCoords(s) {
    s = String(s || "").replace(/[，；;]/g, ",").replace(/度/g, "°").replace(/分/g, "′").replace(/秒/g, "″")
      .replace(/北纬/g, "N").replace(/南纬/g, "S").replace(/东经/g, "E").replace(/西经/g, "W");
    var re = /([NSEWnsew])?\s*(-?\d+(?:\.\d+)?)\s*°?\s*(?:(\d+(?:\.\d+)?)\s*['′]\s*)?(?:(\d+(?:\.\d+)?)\s*["″]\s*)?([NSEWnsew])?/g;
    var parts = [], m;
    while ((m = re.exec(s)) && parts.length < 2) {
      var v = Math.abs(parseFloat(m[2])) + (m[3] ? parseFloat(m[3]) / 60 : 0) + (m[4] ? parseFloat(m[4]) / 3600 : 0);
      var hemi = (m[1] || m[5] || "").toUpperCase();
      if (m[2].charAt(0) === "-" || hemi === "S" || hemi === "W") v = -v;
      parts.push({ v: v, hemi: hemi });
    }
    if (parts.length < 2) return null;
    var lat = parts[0], lon = parts[1];
    if (lat.hemi && "EW".indexOf(lat.hemi) >= 0) { var t = lat; lat = lon; lon = t; }
    if (Math.abs(lat.v) > 90 || Math.abs(lon.v) > 180) return null;
    return { lat: Math.round(lat.v * 1e5) / 1e5, lon: Math.round(lon.v * 1e5) / 1e5 };
  }

  function placeLat() {
    var b = state.birth;
    return b.placeMode === "city" ? (b.city ? b.city[4] : NaN) : parseFloat(b.lat);
  }
  function placeLon() {
    var b = state.birth;
    return b.placeMode === "city" ? (b.city ? b.city[5] : NaN) : parseFloat(b.lon);
  }
  function autoTz() {
    var b = state.birth;
    return b.placeMode === "city" ? (b.city ? b.city[6] : null) : b.tzAuto;
  }
  function isXinjiangAuto() { return !!XJ[autoTz()]; }
  function effectiveTz() {
    var b = state.birth;
    if (b.tzManual && b.tz) return b.tz;
    var tz = autoTz();
    if (tz && XJ[tz]) tz = b.xjTime ? "Asia/Urumqi" : "Asia/Shanghai";
    return tz;
  }

  function detectTz() {
    var b = state.birth, lat = parseFloat(b.lat), lon = parseFloat(b.lon);
    if (!isFinite(lat) || !isFinite(lon)) { b.tzAuto = null; return Promise.resolve(); }
    return ensureTzLookup().then(function () {
      b.tzAuto = safe(function () { return window.tzlookup(lat, lon); }, null);
    }).catch(function () {
      return ensureCities().then(function () {
        var n = nearestCity(lat, lon);
        b.tzAuto = n ? n.city[6] : null;
      });
    });
  }

  function civilDate() {
    var b = state.birth;
    if (!(b.year && b.month && b.day)) return null;
    if (b.calendar === "lunar") return safe(function () { return Bazi.lunarToSolar(b.year, b.month, b.day); }, null);
    return { y: b.year, m: b.month, d: b.day };
  }

  function tzInfo() {
    var tz = effectiveTz();
    if (!tz) return null;
    var c = civilDate(), b = state.birth;
    if (!c) return { tz: tz, off: null, dst: false };
    return safe(function () {
      var h = b.unknownTime || b.hour == null ? 12 : b.hour;
      var mi = b.unknownTime || b.minute == null ? 0 : b.minute;
      var z = Bazi.wallToUtc(c.y, c.m, c.d, h, mi, tz);
      var std = Math.min(Bazi.offsetAt(tz, Date.UTC(c.y, 0, 1, 12)), Bazi.offsetAt(tz, Date.UTC(c.y, 6, 1, 12)));
      return { tz: tz, off: z.offsetMin, dst: z.offsetMin > std };
    }, { tz: tz, off: null, dst: false });
  }

  function birthInput() {
    var b = state.birth;
    return {
      calendar: b.calendar,
      year: b.year, month: b.month, day: b.day,
      hour: b.unknownTime ? null : b.hour,
      minute: b.unknownTime ? null : b.minute,
      lat: placeLat(), lon: placeLon(), tz: effectiveTz(),
      solarTime: b.solarTime, ziRule: b.ziRule
    };
  }

  function birthReady() {
    var b = state.birth;
    return !!(b.year && b.month && b.day && (b.unknownTime || (b.hour != null && b.minute != null)) &&
      isFinite(placeLat()) && isFinite(placeLon()) && effectiveTz());
  }

  /* ------------------------------------------------------------------ *
   * Shared bits of markup
   * ------------------------------------------------------------------ */
  function stepper(n) {
    var names = [U.birthTitle, state.mode === "self" ? U.selfTitle : U.quizTitle, U.profileTitle];
    return '<ol class="stepper" aria-label="Progress">' + names.map(function (nm, i) {
      var cls = i + 1 < n ? "done" : i + 1 === n ? "on" : "";
      return '<li class="' + cls + '"><b>0' + (i + 1) + "</b><span>" + T(nm) + "</span></li>";
    }).join("") + "</ol>";
  }

  function select(field, opts, value, placeholder, label) {
    return '<label class="sel"><span class="sr">' + esc(label) + '</span><select data-field="' + field + '"' +
      (opts.disabled ? " disabled" : "") + '><option value="">' + esc(placeholder) + "</option>" +
      opts.list.map(function (o) {
        return '<option value="' + o.v + '"' + (String(o.v) === String(value) ? " selected" : "") + ">" + esc(o.label) + "</option>";
      }).join("") + "</select></label>";
  }

  function seg(name, opts, value) {
    return '<div class="seg" role="radiogroup">' + opts.map(function (o) {
      return '<button type="button" role="radio" aria-checked="' + (o.v === value) + '" class="' + (o.v === value ? "on" : "") +
        '" data-seg="' + name + '" data-v="' + o.v + '">' + esc(o.label) + "</button>";
    }).join("") + "</div>";
  }

  function markSprite(cls) {
    return '<svg class="' + cls + '" aria-hidden="true"><use href="#ag-mark"/></svg>';
  }

  /* ------------------------------------------------------------------ *
   * Intro
   * ------------------------------------------------------------------ */
  function renderIntro() {
    var hasProgress = Object.keys(state.answers).length > 0 || state.birth.year;
    app.innerHTML =
      '<section class="intro">' +
        '<div class="fog" aria-hidden="true"><i></i><i></i><i></i></div><div class="arcs" aria-hidden="true"></div>' +
        '<div class="intro__inner">' +
          '<p class="kicker">' + T(U.introKicker) + "</p>" +
          '<h1 class="intro__title">' + T(U.introTitle) + "</h1>" +
          '<p class="intro__lead">' + T(U.introLead) + "</p>" +
          '<ol class="parts">' + U.introParts.map(function (p) {
            return "<li><b>" + p.n + "</b><strong>" + T(p) + "</strong><span>" + T(p.d) + "</span></li>";
          }).join("") + "</ol>" +
          '<div class="intro__cta">' +
            (hasProgress
              ? '<button class="btn-main" data-act="resume">' + T(U.resume) + ' <i aria-hidden="true">→</i></button><button class="btn-ghost" data-act="restart">' + T(U.restart) + "</button>"
              : '<button class="btn-main" data-act="start">' + T(U.start) + ' <i aria-hidden="true">→</i></button>' +
                '<button class="btn-ghost" data-act="start-self">' + T(U.startSelf) + "</button>") +
          "</div>" +
          '<p class="promise"><span aria-hidden="true">●</span> ' + T(U.privacyPromise) + "</p>" +
        "</div>" +
        '<div class="wheel" aria-hidden="true">' +
          '<div class="wheel__ring">' + ["木", "火", "土", "金", "水"].map(function (c, i) {
            return '<span style="--i:' + i + '"><b><i>' + c + "</i></b></span>";
          }).join("") + "</div>" +
          markSprite("wheel__mark") +
        "</div>" +
      "</section>";
  }

  /* ------------------------------------------------------------------ *
   * Step 1 · birth
   * ------------------------------------------------------------------ */
  function renderBirth() {
    app.innerHTML =
      '<section class="step">' + stepper(1) +
        '<header class="step-head"><h1 class="step-title">' + T(U.birthTitle) + '</h1><p class="step-lead">' + T(U.birthLead) + "</p></header>" +
        '<div class="birth">' +
          '<div class="birth__form">' +
            '<div class="block" id="b-date"></div>' +
            '<div class="block" id="b-time"></div>' +
            '<div class="block" id="b-place"></div>' +
            '<details class="adv" id="b-adv"></details>' +
          "</div>" +
          '<aside class="preview" id="b-preview" aria-live="polite"></aside>' +
        "</div>" +
        '<div class="step-nav"><button class="btn-ghost" data-act="to-intro">← ' + T(U.prev) + '</button>' +
        '<button class="btn-main" id="b-next" data-act="birth-next" disabled>' + T(U.next) + ' <i aria-hidden="true">→</i></button></div>' +
      "</section>";
    renderDate();
    renderTime();
    renderPlace();
    renderAdv();
    renderPreview();
  }

  function renderDate() {
    var b = state.birth, zh = state.lang === "zh";
    var thisYear = new Date().getFullYear();
    var years = range(1920, thisYear).reverse().map(function (y) { return { v: y, label: zh ? y + " 年" : String(y) }; });
    var months, days, maxD;
    if (b.calendar === "lunar") {
      var leap = b.year ? safe(function () { return Bazi.leapMonthOf(b.year); }, 0) : 0;
      months = [];
      for (var m = 1; m <= 12; m++) {
        months.push({ v: m, label: zh ? LUNAR_M[m - 1] : "Month " + m + " · " + LUNAR_M[m - 1] });
        if (leap === m) months.push({ v: -m, label: zh ? "闰" + LUNAR_M[m - 1] : "Leap month " + m + " · 闰" + LUNAR_M[m - 1] });
      }
      if (b.month && !months.some(function (o) { return o.v === b.month; })) b.month = null;
      maxD = b.year && b.month ? safe(function () { return Bazi.lunarMonthDays(b.year, b.month); }, 30) || 30 : 30;
      days = range(1, maxD).map(function (d) { return { v: d, label: zh ? LUNAR_D[d - 1] : "Day " + d + " · " + LUNAR_D[d - 1] }; });
    } else {
      months = range(1, 12).map(function (mm) { return { v: mm, label: zh ? mm + " 月" : MONTHS_EN[mm - 1] }; });
      maxD = b.year && b.month ? new Date(Date.UTC(b.year, b.month, 0)).getUTCDate() : 31;
      days = range(1, maxD).map(function (d) { return { v: d, label: zh ? d + " 日" : String(d) }; });
    }
    if (b.day && b.day > maxD) b.day = null;
    $("#b-date").innerHTML =
      '<div class="block__head"><h2>' + T(U.date) + "</h2>" +
        seg("calendar", [{ v: "solar", label: tr(U.solar) }, { v: "lunar", label: tr(U.lunar) }], b.calendar) + "</div>" +
      '<div class="row3' + (b.calendar === "lunar" && !zh ? " row3--long" : "") + '">' +
        select("year", { list: years }, b.year, tr(U.year), tr(U.year)) +
        select("month", { list: months }, b.month, tr(U.month), tr(U.month)) +
        select("day", { list: days }, b.day, tr(U.day), tr(U.day)) +
      "</div>";
  }

  function renderTime() {
    var b = state.birth;
    var hours = range(0, 23).map(function (h) { return { v: h, label: pad(h) }; });
    var mins = range(0, 59).map(function (m) { return { v: m, label: pad(m) }; });
    $("#b-time").innerHTML =
      '<div class="block__head"><h2>' + T(U.time) + "</h2></div>" +
      '<div class="row2">' +
        select("hour", { list: hours, disabled: b.unknownTime }, b.hour, tr(U.hour), tr(U.hour)) +
        select("minute", { list: mins, disabled: b.unknownTime }, b.minute, tr(U.minute), tr(U.minute)) +
      "</div>" +
      '<label class="check"><input type="checkbox" data-field="unknownTime"' + (b.unknownTime ? " checked" : "") + "><span>" + T(U.unknownTime) + "</span></label>";
  }

  function renderPlace() {
    var b = state.birth, html = "";
    html += '<div class="block__head"><h2>' + T(U.place) + "</h2>" +
      seg("placeMode", [{ v: "city", label: tr(U.byCity) }, { v: "coords", label: tr(U.byCoords) }], b.placeMode) + "</div>";
    if (b.placeMode === "city") {
      if (b.city) {
        var l = cityLabel(b.city);
        html += '<div class="picked"><div><b>' + esc(l.name) + "</b>" + (l.alt ? " <span>" + esc(l.alt) + "</span>" : "") +
          "<small>" + esc(l.where) + SEP + coordText(b.city[4], b.city[5]) + '</small></div><button class="link" data-act="city-clear">' + T(U.tzChange) + "</button></div>";
      } else {
        html += '<div class="search"><input id="city-q" type="search" autocomplete="off" placeholder="' + T(U.cityPh) + '" aria-label="' + T(U.byCity) + '">' +
          '<ul id="city-list" class="search__list" role="listbox"></ul></div>';
      }
    } else {
      html += '<div class="row2">' +
        '<label class="inp"><span>' + T(U.lat) + '</span><input data-field="lat" inputmode="decimal" placeholder="22.5431" value="' + esc(b.lat) + '"></label>' +
        '<label class="inp"><span>' + T(U.lon) + '</span><input data-field="lon" inputmode="decimal" placeholder="114.0579" value="' + esc(b.lon) + '"></label>' +
        "</div>" +
        '<label class="inp inp--wide"><span>' + T(U.coordsPaste) + '</span><input id="coords-paste" placeholder="22°32′N 114°03′E"></label>' +
        '<p class="hint">' + T(U.coordsHint) + "</p>" +
        '<p class="hint" id="near-city"></p>';
    }
    html += '<div class="tz" id="tz-line"></div>';
    $("#b-place").innerHTML = html;
    renderTzLine();
    if (b.placeMode === "coords") renderNearCity();
    var q = $("#city-q");
    if (q) {
      q.addEventListener("focus", function () { ensureCities().then(function () { renderCityList(q.value); }); }, { once: true });
      q.addEventListener("input", function () {
        if (!cities) { $("#city-list").innerHTML = '<li class="muted">' + T(U.cityLoading) + "</li>"; ensureCities().then(function () { renderCityList(q.value); }); }
        else renderCityList(q.value);
      });
    }
  }

  function coordText(lat, lon) {
    return Math.abs(lat).toFixed(2) + "°" + (lat >= 0 ? "N" : "S") + " " + Math.abs(lon).toFixed(2) + "°" + (lon >= 0 ? "E" : "W");
  }

  var cityResults = [];
  function renderCityList(q) {
    var list = $("#city-list");
    if (!list) return;
    cityResults = searchCities(q || "");
    if (!q || !q.trim()) { list.innerHTML = ""; return; }
    list.innerHTML = cityResults.length ? cityResults.map(function (c, i) {
      var l = cityLabel(c);
      return '<li role="option"><button type="button" data-act="city-pick" data-i="' + i + '"><b>' + esc(l.name) + "</b>" +
        (l.alt ? " <span>" + esc(l.alt) + "</span>" : "") + "<small>" + esc(l.where) + "</small></button></li>";
    }).join("") : '<li class="muted">' + T(U.cityNone) + "</li>";
  }

  function renderNearCity() {
    var el = $("#near-city"), b = state.birth;
    if (!el) return;
    var lat = parseFloat(b.lat), lon = parseFloat(b.lon);
    if (!isFinite(lat) || !isFinite(lon)) { el.textContent = ""; return; }
    ensureCities().then(function () {
      var n = nearestCity(lat, lon);
      el.textContent = n && n.km < 150 ? tr(U.nearCity, { city: cityLabel(n.city).name + SEP + cityLabel(n.city).where }) : "";
    });
  }

  function renderTzLine() {
    var el = $("#tz-line");
    if (!el) return;
    var info = tzInfo(), b = state.birth;
    if (!info) { el.innerHTML = ""; return; }
    var zones = safe(function () { return Intl.supportedValuesOf("timeZone"); }, null);
    var html = '<div class="tz__row"><span class="tz__k">' + T(U.tzLabel) + '</span><b>' + esc(info.tz) + "</b>" +
      (info.off != null ? "<span>" + T(U.tzOffsetOn, { off: fmtOff(info.off) }) + (info.dst ? T(U.tzDst) : "") + "</span>" : "") +
      "<small>" + (b.tzManual ? T(U.tzManual) : T(U.tzAuto)) + "</small>" +
      '<button class="link" data-act="tz-edit">' + T(U.tzChange) + "</button></div>";
    if (state.tzEditing) {
      html += zones
        ? '<label class="sel"><span class="sr">' + T(U.tzManual) + '</span><select data-field="tz">' +
            zones.map(function (z) { return '<option value="' + z + '"' + (z === info.tz ? " selected" : "") + ">" + z + "</option>"; }).join("") + "</select></label>"
        : '<label class="inp"><span>' + T(U.tzManual) + '</span><input data-field="tz" value="' + esc(info.tz) + '"></label>';
      if (b.tzManual) html += '<button class="link" data-act="tz-auto">' + T(U.tzAuto) + "</button>";
    }
    if (isXinjiangAuto() && !b.tzManual) {
      html += '<label class="check"><input type="checkbox" data-field="xjTime"' + (b.xjTime ? " checked" : "") + "><span>" + T(U.xinjiang) + '</span></label><p class="hint">' + T(U.xinjiangNote) + "</p>";
    }
    el.innerHTML = html;
  }

  function renderAdv() {
    var b = state.birth;
    $("#b-adv").innerHTML = "<summary>" + T(U.advanced) + "</summary>" +
      '<div class="adv__grid"><fieldset><legend>' + T(U.solarTime) + "</legend>" +
      [["true", U.stTrue], ["mean", U.stMean], ["clock", U.stClock]].map(function (o) {
        return '<label class="radio"><input type="radio" name="st" data-field="solarTime" value="' + o[0] + '"' + (b.solarTime === o[0] ? " checked" : "") + "><span>" + T(o[1]) + "</span></label>";
      }).join("") + "</fieldset><fieldset><legend>" + T(U.ziRule) + "</legend>" +
      [["23", U.zi23], ["00", U.zi00]].map(function (o) {
        return '<label class="radio"><input type="radio" name="zi" data-field="ziRule" value="' + o[0] + '"' + (b.ziRule === o[0] ? " checked" : "") + "><span>" + T(o[1]) + "</span></label>";
      }).join("") + "</fieldset></div>";
  }

  function pillarsMini(c) {
    var byPos = {};
    c.pillars.forEach(function (p) { byPos[p.pos] = p; });
    return '<div class="pmini">' + ["year", "month", "day", "hour"].map(function (pos) {
      var p = byPos[pos];
      return '<div class="pmini__col' + (pos === "day" ? " is-dm" : "") + '"><span class="pmini__pos">' + T(U.pos[pos]) + "</span>" +
        (p ? "<b>" + p.ganZh + "</b><b>" + p.zhiZh + '</b><small>' + Bazi.WX[p.ganWx] + Bazi.WX[p.zhiWx] + "</small>" : "<b>?</b><b>?</b><small>—</small>") + "</div>";
    }).join("") + "</div>";
  }

  function renderPreview() {
    var el = $("#b-preview"), next = $("#b-next");
    if (!el) return;
    if (!libOk) { el.innerHTML = '<p class="err">' + T(U.errors.LIB_MISSING) + "</p>"; next.disabled = true; return; }
    if (!birthReady()) {
      var b = state.birth, needPlace = !(isFinite(placeLat()) && isFinite(placeLon()));
      el.innerHTML = '<h3 class="preview__t">' + T(U.preview) + "</h3>" + pillarsMini({ pillars: [] }) +
        '<p class="preview__need">' + (b.year && b.month && b.day && needPlace ? T(U.errors.NO_PLACE) : T(U.previewNeed)) + "</p>";
      next.disabled = true;
      return;
    }
    try {
      var c = Bazi.compute(birthInput());
      var t = c.time, lines = "";
      if (t.solarWall) {
        var hz = Bazi.ZHI[Math.floor((t.solarWall.h + 1) / 2) % 12] + (state.lang === "zh" ? "时" : " hour");
        lines += '<p class="preview__time"><span>' + T(state.birth.solarTime === "clock" ? U.tRecorded : U.previewTrue) + "</span><b>" + fmtWall(t.solarWall) + "</b><em>" + hz + "</em></p>";
        lines += '<p class="preview__sub">UTC' + fmtOff(t.offsetMin) + SEP + T(U.tLon) + "\u00a0" + fmtSigned(t.lonMin - t.offsetMin) +
          (state.birth.solarTime === "true" ? SEP + T(U.tEot) + "\u00a0" + fmtSigned(t.eotMin) : "") + "</p>";
      }
      var flags = c.flags.filter(function (f) { return f.code !== "NO_HOUR"; });
      el.innerHTML = '<h3 class="preview__t">' + T(U.preview) + "</h3>" + pillarsMini(c) + lines +
        flags.map(function (f) { return '<p class="flag">' + T(U.flags[f.code], flagVars(f)) + "</p>"; }).join("");
      next.disabled = false;
    } catch (e) {
      var code = e && e.code ? e.code : "BAD_DATE";
      el.innerHTML = '<h3 class="preview__t">' + T(U.preview) + '</h3><p class="err">' + T(U.errors[code] || U.errors.BAD_DATE) + "</p>";
      next.disabled = true;
    }
  }

  function flagVars(f) {
    return { term: f.term || "", m: f.minutes != null ? f.minutes : "", rule: f.rule ? tr(U.ruleNames[f.rule]) : "" };
  }

  function birthFieldChanged(field, value) {
    var b = state.birth;
    var num = ["year", "month", "day", "hour", "minute"];
    if (num.indexOf(field) >= 0) b[field] = value === "" ? null : parseInt(value, 10);
    else if (field === "unknownTime" || field === "xjTime") b[field] = !!value;
    else b[field] = value;

    if (field === "year" || field === "month" || field === "calendar") renderDate();
    if (field === "unknownTime") renderTime();
    if (field === "lat" || field === "lon") {
      detectTz().then(function () { renderTzLine(); renderPreview(); persist(); });
      renderNearCity();
    }
    if (field === "tz") { b.tzManual = true; b.tz = value; }
    renderTzLine();
    renderPreview();
    persist();
  }

  /* ------------------------------------------------------------------ *
   * Step 2 · questions
   * ------------------------------------------------------------------ */
  var answerLock = false;
  function renderQuiz() {
    var items = Q(), i = Math.min(state.qIndex, items.length - 1), q = items[i], total = items.length;
    if (!state.quizStartedAt) state.quizStartedAt = Date.now();
    var done = items.filter(function (x) { return state.answers[x.item.id]; }).length;
    var sec = q.kind === "res" ? U.sectionRes : U.sectionType;
    var it = q.item, cur = state.answers[it.id];
    var body = '<div class="bi bi--one">' +
      '<p class="bi__s bi__s--one" id="lk-s">' + T(it.t) + "</p>" +
      '<div class="dots" role="radiogroup" aria-labelledby="lk-s">' + range(1, 7).map(function (v) {
        var size = [3, 2, 1, 0, 1, 2, 3][v - 1];
        return '<button type="button" role="radio" aria-checked="' + (cur === v) + '" aria-label="' + T(U.scale7[v - 1]) +
          '" title="' + T(U.scale7[v - 1]) + '" class="dot s' + size + (v < 4 ? " l" : v > 4 ? " r" : " m") + (cur === v ? " on" : "") + '" data-act="answer" data-v="' + v + '"></button>';
      }).join("") + "</div>" +
      '<div class="dots__lbl"><span>' + T(U.disagree) + "</span><span>" + T(U.scale7[3]) + "</span><span>" + T(U.agree) + "</span></div>" +
      "</div>";
    var self = state.mode === "self";
    app.innerHTML =
      '<section class="step step--quiz">' + stepper(2) +
        '<header class="step-head"><h1 class="step-title">' + T(self ? U.sectionRes : U.quizTitle) + '</h1><p class="step-lead">' + T(self ? U.resLead : U.quizLead) + "</p></header>" +
        '<div class="qbar"><span class="qbar__sec">' + T(sec) + '</span><span class="qbar__n">' + T(U.qOf, { n: i + 1, total: total }) + "</span>" +
        '<div class="qbar__track"><i style="width:' + Math.round(done / total * 100) + '%"></i></div></div>' +
        '<div class="qcard" data-kind="' + q.kind + '">' + body + "</div>" +
        '<div class="step-nav"><button class="btn-ghost" data-act="quiz-prev">← ' + T(U.prev) + "</button>" +
        (self ? '<span class="step-nav__pair"><button class="btn-ghost" data-act="self-skip">' + T(U.selfSkip) + "</button>" : "") +
        (state.answers[it.id] ? '<button class="btn-main" data-act="quiz-next">' + T(U.next) + ' <i aria-hidden="true">→</i></button>' : self ? "" : "<span></span>") +
        (self ? "</span>" : "") +
        "</div>" +
      "</section>";
    answerLock = false;
  }

  /* ------------------------------------------------------------------ *
   * Step 2 (alternative) · the visitor's own MBTI
   * ------------------------------------------------------------------ */
  var PAIRS = [["EI", "E", "I"], ["SN", "S", "N"], ["TF", "T", "F"], ["JP", "J", "P"]];
  function selfCode() {
    var c = state.self.code || "";
    return /^[EI][SN][TF][JP]$/.test(c) ? c : null;
  }
  function renderSelf() {
    var sf = state.self, code = sf.code || "____";
    var pairs = PAIRS.map(function (p, i) {
      var cur = code[i] === p[1] || code[i] === p[2] ? code[i] : null;
      return '<div class="selfpair"><div class="seg" role="radiogroup" aria-label="' + p[1] + "/" + p[2] + '">' + [p[1], p[2]].map(function (l) {
          return '<button type="button" role="radio" aria-checked="' + (cur === l) + '" class="' + (cur === l ? "on" : "") + '" data-act="self-letter" data-i="' + i + '" data-v="' + l + '"><b>' + l + "</b> " + T(L.letters[l]) + "</button>";
        }).join("") + "</div>" +
        '<div class="seg seg--sm" role="radiogroup" aria-label="' + T(U.selfSure) + '">' + ["slight", "moderate", "clear"].map(function (k) {
          var on = sf.sure[p[0]] === k;
          return '<button type="button" role="radio" aria-checked="' + on + '" class="' + (on ? "on" : "") + '" data-act="self-sure" data-d="' + p[0] + '" data-v="' + k + '">' + T(U.sureOpts[k]) + "</button>";
        }).join("") + "</div></div>";
    }).join("");
    var ready = !!selfCode();
    app.innerHTML =
      '<section class="step step--self">' + stepper(2) +
        '<header class="step-head"><h1 class="step-title">' + T(U.selfTitle) + '</h1><p class="step-lead">' + T(U.selfLead) + "</p></header>" +
        '<div class="selfbox">' +
          '<label class="inp inp--wide"><span>' + T(U.selfPaste) + '</span><input id="self-paste" autocomplete="off" spellcheck="false" placeholder="INFJ-T" value="' + esc(ready ? sf.code + (sf.at ? "-" + sf.at : "") : "") + '"></label>' +
          '<p class="selfbox__code" aria-live="polite">' + esc(code.replace(/_/g, "·")) + (sf.at ? "<small>-" + esc(sf.at) + "</small>" : "") +
            (ready && L.types[sf.code] ? "<span>" + T(L.types[sf.code].name) + "</span>" : "") + "</p>" +
          '<fieldset class="prof__q"><legend>' + T(U.selfPairs) + " <small>" + T(U.selfSure) + "</small></legend>" + pairs + "</fieldset>" +
          '<fieldset class="prof__q"><legend>' + T(U.selfAT) + '</legend><div class="chips">' + U.atOpts.map(function (o) {
            var on = (sf.at || "") === o.v;
            return '<button type="button" class="chip' + (on ? " on" : "") + '" aria-pressed="' + on + '" data-act="self-at" data-v="' + o.v + '">' + T(o) + "</button>";
          }).join("") + "</div></fieldset>" +
          '<fieldset class="prof__q"><legend>' + T(U.selfSource) + '</legend><div class="chips">' + U.sourceOpts.map(function (o) {
            var on = sf.source === o.v;
            return '<button type="button" class="chip' + (on ? " on" : "") + '" aria-pressed="' + on + '" data-act="self-source" data-v="' + o.v + '">' + T(o) + "</button>";
          }).join("") + "</div></fieldset>" +
        "</div>" +
        '<div class="step-nav"><button class="btn-ghost" data-act="to-birth">← ' + T(U.prev) + "</button>" +
          '<span class="step-nav__pair"><button class="btn-ghost" data-act="self-skip"' + (ready ? "" : " disabled") + ">" + T(U.selfSkip) + "</button>" +
          '<button class="btn-main" data-act="self-next"' + (ready ? "" : " disabled") + ">" + T(U.selfNext) + ' <i aria-hidden="true">→</i></button></span></div>' +
      "</section>";
  }
  function setSelfLetter(i, l) {
    var c = (state.self.code || "____").split("");
    while (c.length < 4) c.push("_");
    c[i] = l;
    state.self.code = c.join("");
    persist();
    renderSelf();
  }

  function answer(v) {
    if (answerLock) return;
    var q = Q()[state.qIndex];
    state.answers[q.item.id] = v;
    answerLock = true;
    persist();
    $$(".qcard [data-act=answer]").forEach(function (b) { b.classList.toggle("on", +b.getAttribute("data-v") === v); });
    setTimeout(afterAnswer, 170);
  }

  // After an answer: the next unanswered question (looking ahead first), or finish
  function afterAnswer() {
    var items = Q(), i = state.qIndex;
    var ahead = items.findIndex(function (q, k) { return k > i && !state.answers[q.item.id]; });
    if (ahead < 0) ahead = items.findIndex(function (q) { return !state.answers[q.item.id]; });
    if (ahead < 0) { finishQuiz(); return; }
    if (ahead === i + 1) { quizNext(); return; }
    state.qIndex = ahead;
    persist();
    renderQuiz();
  }

  function quizNext() {
    var items = Q();
    if (state.qIndex < items.length - 1) {
      state.qIndex++;
      persist();
      renderQuiz();
      return;
    }
    var firstMissing = items.findIndex(function (q) { return !state.answers[q.item.id]; });
    if (firstMissing >= 0) { state.qIndex = firstMissing; renderQuiz(); return; }
    finishQuiz();
  }

  function finishQuiz() {
    state.quizMs = Date.now() - (state.quizStartedAt || Date.now());
    state.self.skippedRes = false;
    go("profile");
  }

  /* ------------------------------------------------------------------ *
   * Step 3 · application profile
   * ------------------------------------------------------------------ */
  function profileDone() {
    var p = state.profile;
    return L.profile.every(function (q) {
      if (!q.required) return true;
      var v = p[q.key];
      return q.multi ? v && v.length > 0 : v !== null && v !== undefined;
    });
  }

  function renderProfile() {
    var p = state.profile;
    app.innerHTML =
      '<section class="step">' + stepper(3) +
        '<header class="step-head"><h1 class="step-title">' + T(U.profileTitle) + '</h1><p class="step-lead">' + T(U.profileLead) + "</p></header>" +
        '<div class="prof">' + L.profile.map(function (q) {
          var opts = q.fromDisciplines
            ? Object.keys(L.disciplines).map(function (k) { return { v: k, zh: L.disciplines[k].zh, en: L.disciplines[k].en }; })
            : q.opts;
          var val = p[q.key];
          return '<fieldset class="prof__q"><legend>' + T(q.q) +
            (q.multi ? " <small>" + T(U.pickUpTo, { n: q.multi }) + "</small>" : "") +
            (q.required ? "" : "") + '</legend><div class="chips">' +
            opts.map(function (o) {
              var on = q.multi ? (val || []).indexOf(o.v) >= 0 : val === o.v;
              return '<button type="button" class="chip' + (on ? " on" : "") + '" aria-pressed="' + on + '" data-act="prof" data-q="' + q.key + '" data-v="' + esc(o.v) + '">' + T(o) + "</button>";
            }).join("") + "</div></fieldset>";
        }).join("") + "</div>" +
        '<div class="step-nav"><button class="btn-ghost" data-act="' + (state.mode === "self" && state.self.skippedRes ? "to-self" : "to-quiz") + '">← ' + T(U.prev) + "</button>" +
        '<button class="btn-main" data-act="see-result"' + (profileDone() ? "" : " disabled") + ">" + T(U.seeResult) + ' <i aria-hidden="true">→</i></button></div>' +
      "</section>";
  }

  function profPick(key, raw) {
    var q = L.profile.filter(function (x) { return x.key === key; })[0];
    var opts = q.fromDisciplines ? Object.keys(L.disciplines).map(function (k) { return { v: k }; }) : q.opts;
    var opt = opts.filter(function (o) { return String(o.v) === raw; })[0];
    if (!opt) return;
    var v = opt.v, p = state.profile;
    if (q.multi) {
      var list = (p[key] || []).slice();
      var at = list.indexOf(v);
      if (at >= 0) list.splice(at, 1);
      else { list.push(v); if (list.length > q.multi) list.shift(); }
      p[key] = list;
    } else {
      p[key] = p[key] === v && !q.required ? null : v;
    }
    persist();
    renderProfile();
  }

  /* ------------------------------------------------------------------ *
   * Loading + compute
   * ------------------------------------------------------------------ */
  function computeAll() {
    var chart = Bazi.compute(birthInput());
    var type = state.mode === "self"
      ? T16.fromSelfReport(state.self.code + (state.self.at ? "-" + state.self.at : ""), state.self.sure, state.self.source)
      : T16.scoreType(L.items, state.answers, { durationMs: state.quizMs, validity: L.validity, pairs: L.consistencyPairs });
    if (!type) throw new Error("no type");
    var res = T16.scoreResilience(L.resilience, state.answers, type.at);
    var astro = Astro ? safe(function () { return Astro.signs(chart); }, null) : null;
    var match = Match.run(state.profile, { type: type, resilience: res, chart: chart }, { schools: L.schools });
    var topIds = match.schools.slice(0, 5).map(function (r) { return r.school.id; });
    return {
      chart: chart, type: type, res: res, match: match, astro: astro,
      archetype: L.archetypes[chart.dayMaster.wx + type.temperament],
      topMode: chart.modes.order[0],
      tutors: Match.tutorsFor(match.mentors[0].key, L.tutors, topIds)
    };
  }

  function renderLoading() {
    app.innerHTML = '<section class="loading"><div class="loading__inner">' + markSprite("loading__mark") +
      '<ol class="loading__list">' + U.loading.map(function (l, i) { return '<li style="--d:' + i * 320 + 'ms">' + T(l) + "</li>"; }).join("") + "</ol></div></section>";
    var err = null;
    try { current = computeAll(); } catch (e) { err = e; }
    setTimeout(function () {
      if (err) { state.step = "birth"; render(); return; }
      state.step = "result";
      persist();
      render();
      window.scrollTo(0, 0);
    }, U.loading.length * 320 + 500);
  }

  /* ------------------------------------------------------------------ *
   * Result
   * ------------------------------------------------------------------ */
  function shareUrl() {
    if (L.meta.shareUrl) return L.meta.shareUrl;
    var d = SITE.meta && SITE.meta.domain;
    if (d && d.indexOf("example.com") < 0) return d.replace(/\/$/, "") + "/lab/";
    return location.origin && location.origin !== "null" ? location.origin + location.pathname : "";
  }

  function bar(label, value, max, extra) {
    var w = Math.max(2, Math.round(value / max * 100));
    return '<div class="bar"><span class="bar__l">' + label + '</span><span class="bar__t"><i style="width:' + w + '%"></i></span><span class="bar__v">' + (extra || "") + "</span></div>";
  }

  function renderResult() {
    if (!current) { try { current = computeAll(); } catch (e) { state.step = "birth"; render(); return; } }
    var c = current, ch = c.chart, ty = c.type;
    var el = ch.dayMaster.wx, a = c.archetype, tinfo = L.types[ty.type];
    var dmInfo = L.dayMasters[ch.dayMaster.gan];
    var mode = L.modes[c.topMode];

    app.innerHTML =
      '<article class="report">' +
        '<header class="r-hero">' +
          '<div class="fog fog--dark" aria-hidden="true"><i></i><i></i><i></i></div>' +
          '<div class="r-hero__text">' +
            '<p class="kicker kicker--light">' + T(U.yourPersona) + "</p>" +
            '<h1 class="r-hero__title">' + T(a) + "</h1>" +
            '<p class="r-hero__en">' + esc(state.lang === "zh" ? a.en : a.zh) + "</p>" +
            '<p class="r-hero__tags"><span>' + esc(tr(L.wx[el])) + "</span><span>" + ty.type + "</span>" +
              (c.astro ? "<span>" + esc(signName(c.astro.sun)) + "</span>" : "") +
              "<span>" + T(mode) + (state.lang === "zh" ? "型" : "") + "</span></p>" +
            '<p class="r-hero__d">' + T(a.d) + " " + T(tinfo.line) + "</p>" +
            '<p class="r-hero__dm">' + T(U.dayMaster) + SEP + "<b>" + ch.dayMaster.zh + Bazi.WX[el] + "</b>" + SEP + T(dmInfo.img) + " — " + T(dmInfo.d) + "</p>" +
            '<div class="r-hero__cta"><button class="btn-main btn-main--light" data-act="save-card">' + T(U.saveCard) + '</button>' +
            '<button class="btn-ghost btn-ghost--light" data-act="copy-link">' + T(U.copyLink) + "</button>" +
            '<button class="btn-ghost btn-ghost--light" data-act="retake">' + T(U.retake) + "</button></div>" +
          "</div>" +
          '<figure class="r-hero__card"><canvas id="card" width="1080" height="1440" aria-label="' + T(U.saveCard) + '"></canvas></figure>' +
        "</header>" +
        '<nav class="r-tabs" aria-label="Sections">' + U.tabs.filter(function (tb) {
          return !(tb.id === "who" && !(c.astro && L.zodiac)) && !(tb.id === "paths" && !(L.careers && L.careers[ty.type]));
        }).map(function (tb) { return '<a href="#' + tb.id + '">' + T(tb) + "</a>"; }).join("") + "</nav>" +
        sectionWho() + sectionReport() + sectionWuxing() + sectionChart() + sectionType() + sectionPaths() + sectionMatch() + sectionMethod() +
      "</article>";

    drawCard();
  }

  function tab(id) { return U.tabs.filter(function (t) { return t.id === id; })[0]; }
  function signName(i) { var z = L.zodiac && L.zodiac[i]; return z ? tr(z.name) : ""; }
  function signGlyph(i) { var z = L.zodiac && L.zodiac[i]; return z ? z.glyph : ""; }

  function sectionWho() {
    var a = current.astro, ty = current.type, W = U.who;
    if (!a || !L.zodiac) return "";
    var sun = L.zodiac[a.sun], moon = L.zodiac[a.moon];
    var el = Astro.elementOf(a.sun), mod = Astro.modalityOf(a.sun);
    function sign(role, idx, alt, roleLine, text) {
      var z = L.zodiac[idx];
      return '<div class="r-card sign"><p class="sign__k">' + T(role) + SEP + T(roleLine) + "</p>" +
        '<p class="sign__n"><span aria-hidden="true">' + z.glyph + "</span>" + T(z.name) +
        (alt != null ? " <small>" + T(W.or) + " " + T(L.zodiac[alt].name) + "</small>" : "") + "</p>" +
        "<p>" + T(text) + (alt != null ? " " + T(L.zodiac[alt][role === W.moon ? "moon" : "sun"]) : "") + "</p></div>";
    }
    var notes = [];
    if (a.sunCusp) notes.push(T(W.cusp));
    if (current.chart.input.hour == null) notes.push(T(W.noTime));
    else if (a.rising == null) notes.push(T(W.polar));
    var rising = a.rising != null
      ? sign(W.rising, a.rising, null, W.risingRole, L.zodiac[a.rising].rising)
      : "";
    return '<section class="r-sec" id="who"><div class="r-wrap">' +
      '<h2 class="r-h">' + T(tab("who")) + "</h2>" +
      '<div class="r-card r-card--dark r-card--wide who">' +
        '<p class="who__signs">' + [[W.sun, a.sun], [W.moon, a.moon], [W.rising, a.rising]].filter(function (x) { return x[1] != null; }).map(function (x) {
          return "<span><small>" + T(x[0]) + "</small> " + signGlyph(x[1]) + " " + esc(signName(x[1])) + "</span>";
        }).join("") + "<span><small>MBTI</small> " + ty.type + "</span></p>" +
        "<p><b>" + T(W.blend) + "</b>" + SEP + T(L.signTemperament[el][ty.temperament]) + "</p>" +
        "<p><b>" + T(W.rhythm) + "</b>" + SEP + T(L.modalityJP[mod][ty.type[3]]) + "</p>" +
        "<p><b>" + T(W.eastWest) + "</b>" + SEP + T(L.eastWest[current.chart.dayMaster.wx][el]) + "</p>" +
      "</div>" +
      '<div class="r-grid r-grid--3">' +
        sign(W.sun, a.sun, null, W.sunRole, sun.sun) +
        sign(W.moon, a.moon, a.moonAlt, W.moonRole, moon.moon) +
        rising +
      "</div>" +
      (notes.length ? '<p class="r-note">' + notes.join(" ") + "</p>" : "") +
      '<p class="r-note">' + T(W.note) + "</p>" +
      "</div></section>";
  }

  function sectionPaths() {
    var ty = current.type, c = L.careers && L.careers[ty.type], P = U.paths;
    if (!c) return "";
    return '<section class="r-sec r-sec--grey" id="paths"><div class="r-wrap">' +
      '<h2 class="r-h">' + T(P.title) + "</h2>" +
      '<p class="r-lead">' + T(P.lead) + "</p>" +
      '<ol class="paths">' + c.paths.map(function (p, i) {
        return '<li class="r-card' + (i === 0 ? " r-card--dark" : "") + '"><b class="paths__n">0' + (i + 1) + "</b><h3>" + T(p.name) + "</h3><p>" + T(p.d) + "</p></li>";
      }).join("") + "</ol>" +
      '<div class="r-grid">' +
        '<div class="r-card"><h3 class="r-h3">' + T(P.research) + "</h3><p>" + T(c.research) + "</p>" +
          '<p class="r-note"><b>' + T(P.element) + "</b>" + SEP + T(L.elementFlavour[current.chart.dayMaster.wx]) + "</p></div>" +
        '<div class="r-card"><h3 class="r-h3">' + T(P.allies) + '</h3><ul class="allies">' + c.allies.map(function (al) {
          return "<li><b>" + al.type + "</b> <span>" + T(L.types[al.type] ? L.types[al.type].name : "") + "</span><small>" + T(al.why) + "</small></li>";
        }).join("") + "</ul></div>" +
        '<div class="r-card"><h3 class="r-h3">' + T(P.habit) + "</h3><p>" + T(c.habit) + "</p></div>" +
      "</div></div></section>";
  }

  /* ---------- long-form report (lab-report-*.js via report.js) ---------- */
  function reportInput() {
    var c = current, ch = c.chart, a = c.astro, e = ch.elements;
    var strongest = e.pct.indexOf(Math.max.apply(null, e.pct));
    return {
      type: c.type.type, self: !!c.type.self,
      dims: Object.keys(c.type.dims).reduce(function (o, k) { o[k] = c.type.dims[k].pctFirst; return o; }, {}),
      element: ch.dayMaster.wx, dayMaster: ch.dayMaster.gan,
      strength: ch.strength.level, strongest: strongest,
      missing: e.missing.slice(), hidden: e.missing.filter(function (m) { return e.hidden[m] > 0; }),
      use: ch.yongShen.use, avoid: ch.yongShen.avoid.slice(), geju: ch.geJu.name,
      sun: a ? a.sun : null, moon: a ? a.moon : null, rising: a ? a.rising : null,
      resilience: c.res.pct, mode5: c.topMode, mentor: c.match.mentors[0].key,
      country: c.match.countries[0] ? c.match.countries[0].country : null,
      country2: c.match.countries[1] ? c.match.countries[1].country : null,
      mentor2: c.match.mentors[1] ? c.match.mentors[1].key : null,
      timeline: state.profile.timeline, stage: state.profile.stage
    };
  }
  function composeReport() {
    if (!Report || !L.typeDeep) return null;
    if (!current.report || current.report.lang !== state.lang) {
      current.report = safe(function () { var r = Report.compose(reportInput(), L, state.lang); r.lang = state.lang; return r; }, null);
    }
    return current.report;
  }
  function sectionReport() {
    var rep = composeReport();
    if (!rep) return "";
    return '<section class="r-sec" id="report"><div class="r-wrap r-wrap--narrow">' +
      '<h2 class="r-h">' + T(tab("report")) + "</h2>" +
      '<div class="report-doc">' + rep.page.map(function (sec) {
        return '<section class="report-doc__sec"><h3>' + esc(sec.title) + "</h3>" + sec.items.map(function (it) {
          return (it.k ? '<p class="report-doc__k">' + esc(it.k) + "</p>" : "") + "<p>" + esc(it.p) + "</p>";
        }).join("") + "</section>";
      }).join("") +
      "</div></div></section>";
  }

  function sectionWuxing() {
    var ch = current.chart, e = ch.elements, el = ch.dayMaster.wx;
    var maxPct = Math.max.apply(null, e.pct);
    var missing = e.missing.map(function (m) {
      var hidden = e.hidden[m] > 0;
      return T(U.missing, { el: tr(L.wx[m]) }) + (hidden ? T(U.missingHidden, { el: tr(L.wx[m]) }) : "");
    });
    var modes = current.chart.modes;
    var ls = current.match.learningStyle;
    return '<section class="r-sec" id="wuxing"><div class="r-wrap">' +
      '<h2 class="r-h">' + T(tab("wuxing")) + "</h2>" +
      '<div class="r-grid">' +
        '<div class="r-card r-card--dark dm">' +
          '<span class="dm__char">' + ch.dayMaster.zh + "</span>" +
          '<div><p class="dm__k">' + T(U.dayMaster) + SEP + esc(tr(L.wx[el])) + "</p>" +
          '<p class="dm__img">' + T(L.dayMasters[ch.dayMaster.gan].img) + "</p>" +
          '<p class="dm__key">' + T(L.wx[el].key) + "</p><p>" + T(L.wx[el].d) + "</p></div>" +
        "</div>" +
        '<div class="r-card">' +
          '<h3 class="r-h3">' + T(U.elementBalance) + ' <small>' + T(U.seasonLabel) + SEP + esc(tr(L.wx[ch.season.element])) + (ch.season.tuWang ? "（" + T(U.tuWang) + "）" : "") + "</small></h3>" +
          e.pct.map(function (p, i) {
            return bar(esc(tr(L.wx[i])), p, maxPct, pct(p) + '% <em class="st">' + T(L.seasonStatus[e.status[i]]) + "</em>");
          }).join("") +
          '<p class="r-note">' + T(U.elementCount) + "：" + e.count.map(function (n, i) { return esc(tr(L.wx[i])) + n; }).join(SEP) + "</p>" +
          '<p class="r-note">' + (missing.length ? missing.join("；") : T(U.none)) + "</p>" +
        "</div>" +
        '<div class="r-card">' +
          '<h3 class="r-h3">' + T(U.creativeModes) + "</h3>" +
          modes.order.map(function (k) {
            var m = L.modes[k];
            return bar(T(m) + " <small>" + m.god + "</small>", modes.share[k], modes.share[modes.order[0]], pct(modes.share[k]) + "%");
          }).join("") +
          '<p class="r-note"><b>' + T(L.modes[modes.order[0]]) + "</b>" + SEP + T(L.modes[modes.order[0]].d) + "</p>" +
        "</div>" +
        '<div class="r-card">' +
          '<h3 class="r-h3">' + T(U.learning) + "</h3>" +
          ["research", "making", "industry"].map(function (k) { return bar(T(U.learningKeys[k]), ls[k], 1, pct(ls[k])); }).join("") +
        "</div>" +
      "</div></div></section>";
  }

  function sectionChart() {
    var ch = current.chart, t = ch.time, st = ch.strength, ys = ch.yongShen;
    var cols = ch.pillars;
    function row(key, fn) {
      return "<tr><th>" + T(U.rows[key]) + "</th>" + cols.map(function (p) { return "<td>" + fn(p) + "</td>"; }).join("") + "</tr>";
    }
    var table = '<div class="ptable-wrap"><table class="ptable"><thead><tr><th></th>' +
      cols.map(function (p) { return "<th>" + T(U.pos[p.pos]) + "</th>"; }).join("") + "</tr></thead><tbody>" +
      row("shishen", function (p) { return esc(p.ganShiShen); }) +
      row("gan", function (p) { return '<b class="big">' + p.ganZh + "</b><small>" + Bazi.WX[p.ganWx] + "</small>"; }) +
      row("zhi", function (p) { return '<b class="big">' + p.zhiZh + "</b><small>" + Bazi.WX[p.zhiWx] + "</small>"; }) +
      row("hide", function (p) { return p.hide.map(function (h) { return h.zh + "<small>" + h.shiShen + "</small>"; }).join("<br>"); }) +
      row("nayin", function (p) { return esc(p.naYin); }) +
      row("dishi", function (p) { return esc(p.diShi); }) +
      row("zizuo", function (p) { return esc(p.ziZuo); }) +
      row("kong", function (p) { return p.xunKong.join(""); }) +
      "</tbody></table></div>";

    var tz = ch.input.tz;
    var timeRows = [
      [U.tRecorded, ch.input.hour != null ? fmtWall({ y: ch.input.civil.y, m: ch.input.civil.m, d: ch.input.civil.d, h: ch.input.hour, mi: ch.input.minute }) : ch.input.civil.y + "-" + pad(ch.input.civil.m) + "-" + pad(ch.input.civil.d)],
      [U.tZone, tz + " · UTC" + fmtOff(t.offsetMin)],
      [U.tUtc, fmtUtc(t.utc)]
    ];
    if (t.solarWall) {
      if (ch.input.solarTime !== "clock") timeRows.push([U.tLon, fmtSigned(t.lonMin - t.offsetMin) + " (" + ch.input.lon.toFixed(2) + "°)"]);
      if (ch.input.solarTime === "true") timeRows.push([U.tEot, fmtSigned(t.eotMin)]);
      timeRows.push([U.tSolar, fmtWall(t.solarWall)]);
    }
    timeRows.push([U.tJie, tr(U.tJieFmt, { a: t.prevJie.name, b: t.nextJie.name })]);

    var ratio = st.ratio;
    var rel = ch.relations;
    var flags = ch.flags;
    return '<section class="r-sec r-sec--grey" id="chart"><div class="r-wrap">' +
      '<h2 class="r-h">' + T(tab("chart")) + "</h2>" +
      '<div class="r-card r-card--flush">' + table + "</div>" +
      '<div class="r-grid">' +
        '<div class="r-card"><h3 class="r-h3">' + T(U.timeTitle) + '</h3><dl class="kv">' +
          timeRows.map(function (r) { return "<dt>" + T(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd>"; }).join("") + "</dl></div>" +
        '<div class="r-card"><h3 class="r-h3">' + T(U.strengthTitle) + "</h3>" +
          '<div class="balance"><span>' + T(U.support) + " " + pct(ratio) + '%</span><span class="balance__t"><i style="width:' + pct(ratio) + '%"></i><em></em></span><span>' + T(U.oppose) + " " + (100 - pct(ratio)) + "%</span></div>" +
          '<p class="level">' + T(L.strengthLevels[st.level]) + "</p>" +
          '<p class="chips chips--static">' +
            ['deLing', 'deDi', 'deShi'].map(function (k) { return '<span class="chip' + (st[k] ? " on" : "") + '">' + (st[k] ? "✓ " : "✕ ") + T(U[k]) + "</span>"; }).join("") + "</p>" +
          '<dl class="kv"><dt>' + T(U.geju) + "</dt><dd>" + esc(ch.geJu.name) + "<small>" + esc(ch.geJu.basis) + "</small></dd>" +
          "<dt>" + T(U.taiyuan) + "</dt><dd>" + esc(ch.taiYuan) + "</dd></dl>" +
        "</div>" +
        '<div class="r-card"><h3 class="r-h3">' + T(U.yong) + SEP + T(U.xi) + SEP + T(U.ji) + "</h3>" +
          '<p class="yong"><span class="chip on">' + T(U.yong) + " " + esc(tr(L.wx[ys.use])) + '</span><span class="chip on">' + T(U.xi) + " " + esc(tr(L.wx[ys.fav])) + "</span>" +
          ys.avoid.map(function (x) { return '<span class="chip">' + T(U.ji) + " " + esc(tr(L.wx[x])) + "</span>"; }).join("") + "</p>" +
          '<p class="r-note">' + T(L.yongWhy[ys.why]) + "</p>" +
          (ys.tiaoHou !== null ? '<p class="r-note"><b>' + T(U.tiaohou) + "</b>" + SEP + T(L.tiaoHou[ys.tiaoHou]) + (ys.tiaoHouConflict ? " " + T(L.tiaoHouConflict) : "") + "</p>" : "") +
        "</div>" +
        '<div class="r-card"><h3 class="r-h3">' + T(U.relations) + "</h3>" +
          (rel.length ? '<ul class="rel">' + rel.map(function (r) { return "<li><b>" + esc(r.kind) + "</b> " + (r.where ? "<small>" + esc(r.where) + "</small> " : "") + esc(r.text) + "</li>"; }).join("") + "</ul>" : '<p class="r-note">' + T(U.noRelations) + "</p>") +
        "</div>" +
        (flags.length ? '<div class="r-card r-card--wide"><h3 class="r-h3">' + T(U.notes) + "</h3>" +
          flags.map(function (f) { return '<p class="flag">' + T(U.flags[f.code], flagVars(f)) + "</p>"; }).join("") + "</div>" : "") +
      "</div></div></section>";
  }

  function sectionType() {
    var ty = current.type, info = L.types[ty.type], res = current.res;
    var dims = [["EI", "E", "I"], ["SN", "S", "N"], ["TF", "T", "F"], ["JP", "J", "P"]];
    return '<section class="r-sec" id="type"><div class="r-wrap">' +
      '<h2 class="r-h">' + T(tab("type")) + "</h2>" +
      '<div class="r-grid">' +
        '<div class="r-card r-card--dark tcode"><p class="tcode__code">' + ty.type + '</p><p class="tcode__name">' + T(info.name) + "</p><p>" + T(info.line) + "</p></div>" +
        '<div class="r-card"><h3 class="r-h3">' + T(U.typeTitle) + "</h3>" +
          (ty.self ? '<p class="r-note"><b>' + T(U.selfReported) + "</b>" + SEP + T(U.selfReportedNote) + "</p>" : "") +
          dims.map(function (d) {
            var x = ty.dims[d[0]], first = x.pctFirst, win = x.letter;
            return '<div class="dim"><span class="dim__a' + (win === d[1] ? " on" : "") + '">' + d[1] + " <small>" + T(L.letters[d[1]]) + " " + first + "%</small></span>" +
              '<span class="dim__t"><i style="left:' + (100 - first) + '%"></i></span>' +
              '<span class="dim__b' + (win === d[2] ? " on" : "") + '"><small>' + (100 - first) + "% " + T(L.letters[d[2]]) + "</small> " + d[2] + "</span>" +
              '<em class="dim__c">' + T(U.clarity) + SEP + T(U.bands[x.band]) + "</em></div>";
          }).join("") +
          ty.against.map(function (g) {
            return '<p class="r-note">' + T(U.against, { facet: tr(L.facets[g.facet]), letter: g.leans + SEP + tr(L.letters[g.leans]) }) + "</p>";
          }).join("") +
        "</div>" +
        '<div class="r-card"><h3 class="r-h3">' + T(U.functions) + '</h3><ol class="fn">' +
          ty.stack.map(function (f, i) { var fn = L.fn[f]; return "<li><b>" + f + "</b><span>" + T(U.fnRoles[i]) + SEP + T(fn) + "</span><small>" + T(fn.d) + "</small></li>"; }).join("") + "</ol></div>" +
        '<div class="r-card"><dl class="kv kv--stack"><dt>' + T(U.strengths) + "</dt><dd>" + T(info.strengths) + "</dd><dt>" + T(U.edge) + "</dt><dd>" + T(info.edge) + "</dd><dt>" + T(U.env) + "</dt><dd>" + T(info.env) + "</dd></dl></div>" +
        '<div class="r-card"><h3 class="r-h3">' + T(U.resilience) + "</h3>" + bar("", res.pct, 100, res.pct + "/100") +
          '<p class="r-note">' + T(U.resBands[res.band]) + "</p>" +
          (res.estimated ? '<p class="r-note">' + T(U.resEstimated) + "</p>" : "") +
          (ty.self ? "" : '<p class="r-note"><b>' + T(U.quality) + SEP + T(U.qualityLevels[ty.quality]) + "</b>" +
          ty.qualityFlags.map(function (f) { return "<br>· " + T(U.qualityFlags[f]); }).join("") + "</p>") + "</div>" +
      "</div></div></section>";
  }

  function schoolCard(r, i, locked) {
    var s = r.school, reasons = reasonsFor(r).slice(0, 3);
    return '<li class="school' + (locked ? " is-locked" : "") + '"' + (locked ? ' aria-hidden="true"' : "") + ">" +
      '<div class="school__top"><span class="school__rank">' + T(U.ranks[i] || U.ranks[4]) + '</span><span class="school__score">' + T(U.matchScore) + " <b>" + r.score + "</b></span></div>" +
      '<h4 class="school__name">' + T(s.name) + "</h4>" +
      '<p class="school__meta">' + T(s.city) + SEP + T(L.countries[s.country]) + "</p>" +
      '<p class="school__note">' + T(s.note) + "</p>" +
      '<ul class="school__why">' + reasons.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></li>";
  }

  function reasonsFor(r) {
    var f = r.factors, R = U.reasons, out = [];
    var dName = r.discKey ? tr(L.disciplines[r.discKey]) : "";
    if (dName && f.disc === 1) out.push([f.disc * 0.34, tr(R.discStrong, { d: dName })]);
    else if (dName && f.disc > 0) out.push([f.disc * 0.3, tr(R.discOffered, { d: dName })]);
    if (f.style >= 0.72) {
      var s = r.school.style, top = ["research", "making", "industry"].sort(function (a, b) { return s[b] - s[a]; })[0];
      out.push([f.style * 0.22, tr(R.style, { s: tr(U.learningKeys[top]) })]);
    }
    if (f.budget === 1 && state.profile.budget) out.push([0.16, tr(R.budgetOk)]);
    else if (f.budget > 0 && f.budget < 1) out.push([0.08, tr(R.budgetStretch)]);
    if (f.city === 1) out.push([0.14, tr(R.city)]);
    if (f.fang === 1) out.push([0.05, tr(R.fang)]);
    return out.sort(function (a, b) { return b[0] - a[0]; }).map(function (x) { return x[1]; });
  }

  function sectionMatch() {
    var m = current.match, top = m.mentors[0], second = m.mentors[1];
    var schools = m.schools.slice(0, 5);
    var countries = m.countries.map(function (c, i) {
      var info = L.countries[c.country];
      return '<div class="r-card country' + (i === 0 ? " r-card--dark" : "") + '"><div class="country__top"><h3>' + T(info) + '</h3><span class="country__score">' + c.score + "</span></div>" +
        "<p>" + T(info.d) + "</p>" +
        '<p class="country__schools">' + c.top.map(function (r) { return T(r.school.name); }).join(SEP) + "</p>" +
        (c.fang > 0 ? '<p class="country__fang"><em>' + T(U.fangTag) + "</em> " + T(L.fang[c.country]) + "</p>" : "") + "</div>";
    }).join("");
    var tutors = current.tutors;
    var mentor = '<div class="r-card r-card--wide mentor"><p class="kicker">' + T(U.mentorTitle) + "</p>" +
      '<h3 class="mentor__name">' + T(L.mentors[top.key]) + "</h3><p>" + T(L.mentors[top.key].d) + "</p>" +
      '<p class="r-note">+ ' + T(L.mentors[second.key]) + "</p>" +
      (tutors.length ? '<p class="mentor__tutors"><small>' + T(U.tutorsLabel) + "</small> " + tutors.map(function (t) { return "<b>" + T(t.name) + "</b> <span>" + T(t.note) + "</span>"; }).join(SEP) + "</p>" : "") +
      "</div>";
    var list = schools.length
      ? '<ol class="schools">' + schools.map(function (r, i) { return schoolCard(r, i, !state.unlocked && i > 0); }).join("") + "</ol>"
      : '<p class="r-note">' + T(U.noSchools) + "</p>";
    return '<section class="r-sec" id="match"><div class="r-wrap">' +
      '<h2 class="r-h">' + T(U.matchTitle) + "</h2>" +
      '<h3 class="r-sub">' + T(U.countriesTitle) + '</h3><div class="r-grid r-grid--3">' + countries + "</div>" +
      '<div class="r-grid">' + mentor + "</div>" +
      '<h3 class="r-sub">' + T(U.schoolsTitle) + "</h3>" +
      '<div class="schools-wrap' + (state.unlocked ? "" : " locked") + '">' + list +
        (state.unlocked || schools.length < 2 ? "" : '<div class="lock"><p>' + T(U.locked) + '</p><a class="btn-main" href="#lead">' + T(U.submit) + "</a></div>") +
      "</div>" +
      (state.unlocked ? '<p class="ok">' + T(U.unlockedMsg) + (state.reportSent ? " " + T(U.reportMail.sent) : state.reportSent === false ? " " + T(U.reportMail.notSent) : "") + "</p>" : leadForm()) +
      "</div></section>";
  }

  function leadForm() {
    var who = U.whoOpts.map(function (o, i) { return '<label class="radio"><input type="radio" name="who" value="' + o.v + '"' + (i === 0 ? " checked" : "") + "><span>" + T(o) + "</span></label>"; }).join("");
    var ages = U.ageOpts.map(function (o) { return '<label class="radio"><input type="radio" name="age" value="' + o.v + '"' + (o.v === "18+" ? " checked" : "") + "><span>" + T(o) + "</span></label>"; }).join("");
    return '<form class="lead r-card r-card--dark" id="lead" novalidate>' +
      '<h3 class="lead__t">' + T(U.leadTitle) + "</h3><p>" + T(U.leadLead) + "</p>" +
      (function () {
        var rep = composeReport();
        return rep ? '<p class="lead__k">' + T(U.reportMail.inEmail) + '</p><ul class="lead__list">' + rep.email.map(function (s) { return "<li>" + esc(s.title) + "</li>"; }).join("") + "</ul>" : "";
      })() +
      '<div class="lead__grid">' +
        '<label class="inp inp--dark"><span>' + T(U.fName) + '</span><input name="name" autocomplete="name" required></label>' +
        '<label class="inp inp--dark"><span>' + T(U.fContact) + '</span><input name="contact" autocomplete="tel" required></label>' +
        '<label class="inp inp--dark"><span>' + T(U.fEmail) + '</span><input name="email" type="email" autocomplete="email" required></label>' +
      "</div>" +
      '<input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<fieldset class="lead__f"><legend>' + T(U.fWho) + "</legend>" + who + "</fieldset>" +
      '<fieldset class="lead__f"><legend>' + T(U.fAge) + "</legend>" + ages + "</fieldset>" +
      '<p class="hint hint--dark" id="minor-note" hidden>' + T(U.cMinorNote) + "</p>" +
      '<label class="check check--dark"><input type="checkbox" name="cPrivacy"><span>' + T(U.cPrivacy).replace(T(U.privacyLink), '<a href="privacy.html" target="_blank" rel="noopener">' + T(U.privacyLink) + "</a>") + "</span></label>" +
      '<label class="check check--dark"><input type="checkbox" name="cCross"><span>' + T(U.cCross) + "</span></label>" +
      '<label class="check check--dark" id="guardian-row" hidden><input type="checkbox" name="cGuardian"><span>' + T(U.cGuardian) + "</span></label>" +
      '<label class="check check--dark"><input type="checkbox" name="cChart"><span>' + T(U.cChart) + "</span></label>" +
      '<button class="btn-main btn-main--light" type="submit">' + T(U.submit) + ' <i aria-hidden="true">→</i></button>' +
      '<p class="lead__msg" id="lead-msg" role="status"></p>' +
      "</form>";
  }

  function sectionMethod() {
    function list(a) { return "<ul>" + a.map(function (x) { return "<li>" + T(x) + "</li>"; }).join("") + "</ul>"; }
    return '<section class="r-sec r-sec--grey" id="method"><div class="r-wrap r-wrap--narrow">' +
      '<details class="method"><summary>' + T(U.methodTitle) + "</summary>" +
        "<h4>" + T(tab("chart")) + "</h4>" + list(L.method.bazi) +
        "<h4>" + T(tab("type")) + "</h4>" + list(L.method.type) +
        "<h4>" + T(tab("match")) + "</h4>" + list(L.method.match) +
      "</details>" +
      '<p class="disclaimer">' + T(U.disclaimer) + "</p>" +
      '<div class="r-end"><button class="btn-ghost" data-act="retake">' + T(U.retake) + "</button></div>" +
      "</div></section>";
  }

  /* ---------- share card ---------- */
  var cardBlob = null, cardUrl = "";
  function cardData() {
    var c = current, ch = c.chart;
    return {
      lang: state.lang,
      archetype: c.archetype,
      element: L.wx[ch.dayMaster.wx],
      elementIdx: ch.dayMaster.wx,
      dayMaster: ch.dayMaster.zh,
      dmImage: L.dayMasters[ch.dayMaster.gan].img,
      type: c.type.type,
      typeName: L.types[c.type.type].name,
      mode: L.modes[c.topMode],
      signs: c.astro && L.zodiac ? [["sun", c.astro.sun], ["moon", c.astro.moon], ["rising", c.astro.rising]].filter(function (x) { return x[1] != null; }).map(function (x) {
        return { role: U.who[x[0]], name: L.zodiac[x[1]].name };
      }) : [],
      pillars: ["year", "month", "day", "hour"].map(function (pos) {
        var p = ch.pillars.filter(function (x) { return x.pos === pos; })[0];
        return p ? { gan: p.ganZh, zhi: p.zhiZh } : null;
      }),
      pct: ch.elements.pct,
      wxNames: L.wx,
      url: shareUrl(),
      labels: { brand: U.brand, lab: U.labName, persona: U.yourPersona, scan: { zh: "扫码测测你是哪一种创作者", en: "Scan to find your creative persona" }, note: { zh: "五行 × 16 型创作人格 · 仅供自我探索", en: "Five elements × 16 types · for self-reflection" } }
    };
  }

  function drawCard() {
    var canvas = $("#card");
    if (!canvas || !Card) return;
    Card.draw(canvas, cardData()).then(function () {
      cardUrl = canvas.toDataURL("image/png");
      canvas.toBlob(function (b) { cardBlob = b; }, "image/png");
    }).catch(function () { /* card is optional */ });
  }

  function saveCard() {
    if (!cardUrl) return;
    var inApp = /MicroMessenger|Weibo|QQ\/|xhsdiscover|aweme/i.test(navigator.userAgent);
    var ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (inApp || ios) {
      var m = document.createElement("div");
      m.className = "modal";
      m.innerHTML = '<div class="modal__box"><img src="' + cardUrl + '" alt=""><p>' +
        esc(state.lang === "zh" ? "长按图片保存到相册" : "Press and hold the image to save it") +
        '</p><button class="btn-main" data-act="close-modal">OK</button></div>';
      document.body.appendChild(m);
      return;
    }
    var a = document.createElement("a");
    a.href = cardBlob ? URL.createObjectURL(cardBlob) : cardUrl;
    a.download = "AG-LAB-" + current.type.type + ".png";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function copyLink(btn) {
    var url = shareUrl() || location.href;
    var done = function () { btn.textContent = tr(U.copied); setTimeout(function () { btn.textContent = tr(U.copyLink); }, 1600); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, done);
    else {
      var ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (e) { /* ignore */ }
      ta.remove();
      done();
    }
  }

  /* ---------- result summary sent with the lead form (keys only) ---------- */
  function resultSummary() {
    var c = current, ch = c.chart, a = c.astro, ri = reportInput();
    return {
      mode: state.mode,
      archetype: ch.dayMaster.wx + c.type.temperament,
      element: ch.dayMaster.wx,
      dayMaster: ch.dayMaster.gan,
      type: c.type.type,
      at: c.type.at || null,
      source: c.type.self ? c.type.source : null,
      dims: Object.keys(c.type.dims).reduce(function (o, k) { o[k] = c.type.dims[k].pctFirst; return o; }, {}),
      quality: c.type.quality,
      flags: c.type.qualityFlags,
      resilience: c.res.pct,
      mode5: c.topMode,
      sun: a ? a.sun : null, moon: a ? a.moon : null, moonAlt: a ? a.moonAlt : null, rising: a ? a.rising : null,
      mentor: c.match.mentors[0].key,
      countries: c.match.countries.map(function (x) { return x.country + ":" + x.score; }),
      schools: c.match.schools.slice(0, 5).map(function (r) { return r.school.id + ":" + r.score; }),
      strength: ri.strength, strongest: ri.strongest, missing: ri.missing, hidden: ri.hidden,
      use: ri.use, avoid: ri.avoid, geju: ri.geju, mentor2: ri.mentor2
    };
  }

  /* ---------- lead ---------- */
  function leadPayload(form) {
    var fd = new FormData(form), c = current, ch = c.chart;
    var includeChart = !!fd.get("cChart");
    var b = state.birth;
    var placeName = b.placeMode === "city" && b.city ? cityLabel(b.city).name + " · " + cityLabel(b.city).where : "";
    return {
      campaign: L.meta.campaign,
      version: L.meta.version,
      lang: state.lang,
      submittedAt: new Date().toISOString(),
      source: state.src || {},
      hp: String(fd.get("website") || ""),
      contact: {
        name: String(fd.get("name") || "").trim().slice(0, 60),
        contact: String(fd.get("contact") || "").trim().slice(0, 80),
        email: String(fd.get("email") || "").trim().slice(0, 120),
        who: fd.get("who"),
        age: fd.get("age")
      },
      consent: { privacy: !!fd.get("cPrivacy"), crossBorder: !!fd.get("cCross"), guardian: !!fd.get("cGuardian"), chart: includeChart },
      profile: state.profile,
      summary: resultSummary(),
      result: {
        archetype: c.archetype.zh + " / " + c.archetype.en,
        element: L.wx[ch.dayMaster.wx].zh,
        dayMaster: ch.dayMaster.zh,
        type: c.type.type,
        typeClarity: Object.keys(c.type.dims).map(function (k) { return k + ":" + c.type.dims[k].pctFirst; }).join(" "),
        resilience: c.res.pct,
        mode: c.topMode,
        mentor: c.match.mentors[0].key,
        countries: c.match.countries.map(function (x) { return x.country + ":" + x.score; }),
        schools: c.match.schools.slice(0, 5).map(function (r) { return r.school.id + ":" + r.score; })
      },
      chart: includeChart ? {
        calendar: b.calendar,
        date: ch.input.civil.y + "-" + pad(ch.input.civil.m) + "-" + pad(ch.input.civil.d),
        time: ch.input.hour != null ? pad(ch.input.hour) + ":" + pad(ch.input.minute) : null,
        place: placeName,
        lat: ch.input.lat, lon: ch.input.lon, tz: ch.input.tz,
        pillars: ch.pillars.map(function (p) { return p.ganZh + p.zhiZh; }).join(" "),
        strength: ch.strength.level, geJu: ch.geJu.name,
        use: L.wx[ch.yongShen.use].zh, fav: L.wx[ch.yongShen.fav].zh
      } : null
    };
  }

  function submitLead(form) {
    var fd = new FormData(form), msg = $("#lead-msg");
    var minor = fd.get("age") === "u14";
    var email = String(fd.get("email") || "").trim();
    var ok = String(fd.get("name") || "").trim() && String(fd.get("contact") || "").trim() && email &&
      fd.get("cPrivacy") && fd.get("cCross") && (!minor || fd.get("cGuardian"));
    if (!ok) { msg.textContent = tr(U.errRequired); return; }
    if (!/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]{2,}$/.test(email)) { msg.textContent = tr(U.errEmail); return; }
    var payload = leadPayload(form);
    var btn = form.querySelector("button[type=submit]");
    var unlock = function () { state.unlocked = true; persist(); rerenderMatch(); };
    if (L.meta.leadEndpoint) {
      btn.disabled = true;
      msg.textContent = tr(U.sending);
      fetch(L.meta.leadEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
        .then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          return r.json().catch(function () { return {}; }).then(function (d) { state.reportSent = !!(d && d.reportSent); unlock(); });
        })
        .catch(function () { btn.disabled = false; mailLead(payload, msg, unlock); }); // endpoint down: fall back to the visitor's email app
      return;
    }
    mailLead(payload, msg, unlock);
  }

  function mailLead(payload, msg, unlock) {
    var email = (SITE.meta && SITE.meta.email) || "";
    var lines = [
      "AG LAB · " + payload.result.archetype + " · " + payload.result.type,
      "Name: " + payload.contact.name, "Contact: " + payload.contact.contact, "Email: " + payload.contact.email,
      "Who: " + payload.contact.who + " · Age: " + payload.contact.age,
      "Profile: " + JSON.stringify(payload.profile),
      "Countries: " + payload.result.countries.join(", "),
      "Schools: " + payload.result.schools.join(", "),
      payload.chart ? "Chart: " + JSON.stringify(payload.chart) : "Chart: (not shared)",
      "Source: " + JSON.stringify(payload.source)
    ];
    if (email) location.href = "mailto:" + email + "?subject=" + encodeURIComponent("AG LAB · " + payload.contact.name) + "&body=" + encodeURIComponent(lines.join("\n"));
    msg.textContent = tr(U.mailFallback);
    unlock();
  }

  function rerenderMatch() {
    var sec = $("#match");
    if (!sec) return;
    var tmp = document.createElement("div");
    tmp.innerHTML = sectionMatch();
    sec.replaceWith(tmp.firstChild);
  }

  /* ------------------------------------------------------------------ *
   * Navigation and events
   * ------------------------------------------------------------------ */
  function go(step) {
    state.step = step;
    persist();
    render();
    window.scrollTo(0, 0);
  }

  function render() {
    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
    renderChrome();
    if (state.step === "birth") renderBirth();
    else if (state.step === "quiz") renderQuiz();
    else if (state.step === "self") renderSelf();
    else if (state.step === "profile") renderProfile();
    else if (state.step === "loading") renderLoading();
    else if (state.step === "result") renderResult();
    else renderIntro();
  }

  function renderChrome() {
    $$("[data-t]").forEach(function (n) {
      var path = n.getAttribute("data-t").split(".");
      var v = path.reduce(function (o, k) { return o && o[k]; }, L);
      n.textContent = tr(v);
    });
    $$("#langBtn [data-l]").forEach(function (n) { n.classList.toggle("on", n.getAttribute("data-l") === state.lang); });
    document.title = tr(U.labName) + " · " + tr(U.brand);
  }

  app.addEventListener("click", function (e) {
    var el = e.target.closest("[data-act],[data-seg]");
    if (!el || !app.contains(el)) return;
    var act = el.getAttribute("data-act");
    if (el.hasAttribute("data-seg")) {
      var name = el.getAttribute("data-seg"), v = el.getAttribute("data-v");
      if (name === "calendar") { state.birth.calendar = v; state.birth.month = null; state.birth.day = null; renderDate(); renderTzLine(); renderPreview(); persist(); return; }
      if (name === "placeMode") { state.birth.placeMode = v; state.tzEditing = false; renderPlace(); renderPreview(); persist(); return; }
    }
    switch (act) {
      case "start": state.mode = "test"; state.startedAt = Date.now(); go("birth"); break;
      case "start-self": state.mode = "self"; state.startedAt = Date.now(); go("birth"); break;
      case "resume":
        if (!(state.birth.year && birthReady())) go("birth");
        else if (state.mode === "self") go(selfCode() && (quizDone() || state.self.skippedRes) ? "profile" : "self");
        else go(quizDone() ? "profile" : Object.keys(state.answers).length ? "quiz" : "birth");
        break;
      case "restart": case "retake":
        if (act === "retake" && !window.confirm(tr(U.retakeConfirm))) break;
        store.clear();
        state = fresh();
        current = null;
        go("birth");
        break;
      case "to-intro": go("intro"); break;
      case "birth-next": if (birthReady()) go(state.mode === "self" ? "self" : "quiz"); break;
      case "to-birth": go("birth"); break;
      case "to-self": go("self"); break;
      case "self-letter": setSelfLetter(+el.getAttribute("data-i"), el.getAttribute("data-v")); break;
      case "self-sure": state.self.sure[el.getAttribute("data-d")] = el.getAttribute("data-v"); persist(); renderSelf(); break;
      case "self-at": state.self.at = el.getAttribute("data-v"); persist(); renderSelf(); break;
      case "self-source": state.self.source = el.getAttribute("data-v"); persist(); renderSelf(); break;
      case "self-next": if (selfCode()) { state.qIndex = 0; state.quizStartedAt = null; go("quiz"); } break;
      case "self-skip": if (selfCode()) { state.self.skippedRes = true; go("profile"); } break;
      case "city-pick":
        var c = cityResults[+el.getAttribute("data-i")];
        if (c) { state.birth.city = c; state.birth.tzManual = false; state.tzEditing = false; renderPlace(); renderPreview(); persist(); }
        break;
      case "city-clear": state.birth.city = null; renderPlace(); renderPreview(); persist(); setTimeout(function () { var q = $("#city-q"); if (q) q.focus(); }, 0); break;
      case "tz-edit": state.tzEditing = !state.tzEditing; renderTzLine(); break;
      case "tz-auto": state.birth.tzManual = false; state.tzEditing = false; renderTzLine(); renderPreview(); persist(); break;
      case "answer": answer(+el.getAttribute("data-v")); break;
      case "quiz-prev":
        if (state.qIndex > 0) { state.qIndex--; persist(); renderQuiz(); } else go(state.mode === "self" ? "self" : "birth");
        break;
      case "quiz-next": quizNext(); break;
      case "to-quiz": state.qIndex = Q().length - 1; go("quiz"); break;
      case "prof": profPick(el.getAttribute("data-q"), el.getAttribute("data-v")); break;
      case "see-result": if (profileDone()) { current = null; go("loading"); } break;
      case "save-card": saveCard(); break;
      case "copy-link": copyLink(el); break;
      default: break;
    }
  });

  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-act=close-modal]");
    if (el) { var m = el.closest(".modal"); if (m) m.remove(); }
  });

  app.addEventListener("change", function (e) {
    var el = e.target;
    var f = el.getAttribute("data-field");
    if (f) {
      if (el.type === "checkbox") birthFieldChanged(f, el.checked);
      else if (el.type === "radio") { if (el.checked) birthFieldChanged(f, el.value); }
      else birthFieldChanged(f, el.value);
      return;
    }
    if (el.name === "age" || el.name === "who") {
      var form = el.form, minor = form.querySelector("input[name=age]:checked").value === "u14";
      $("#guardian-row").hidden = !minor;
      $("#minor-note").hidden = !minor;
    }
  });

  app.addEventListener("input", function (e) {
    if (e.target.id === "self-paste") {
      var pc = T16.parseCode(e.target.value);
      if (pc) {
        state.self.code = pc.type;
        if (pc.at) state.self.at = pc.at;
        persist();
        renderSelf();
        var inp = $("#self-paste");
        if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
      }
      return;
    }
    if (e.target.id === "coords-paste") {
      var p = parseCoords(e.target.value);
      if (p) {
        state.birth.lat = String(p.lat);
        state.birth.lon = String(p.lon);
        $$("input[data-field=lat]")[0].value = state.birth.lat;
        $$("input[data-field=lon]")[0].value = state.birth.lon;
        detectTz().then(function () { renderTzLine(); renderPreview(); persist(); });
        renderNearCity();
      }
    }
  });

  app.addEventListener("submit", function (e) {
    if (e.target.id === "lead") { e.preventDefault(); submitLead(e.target); }
  });

  document.addEventListener("keydown", function (e) {
    if (state.step !== "quiz" || e.metaKey || e.ctrlKey || e.altKey) return;
    var q = Q()[state.qIndex];
    var max = 7;
    var n = parseInt(e.key, 10);
    if (n >= 1 && n <= max) { e.preventDefault(); answer(n); }
    if (e.key === "ArrowLeft" && state.qIndex > 0) { state.qIndex--; renderQuiz(); }
    if (e.key === "ArrowRight" && state.answers[q.item.id]) quizNext();
  });

  var langBtn = document.getElementById("langBtn");
  if (langBtn) langBtn.addEventListener("click", function () {
    state.lang = state.lang === "zh" ? "en" : "zh";
    persist();
    var u = new URL(location.href);
    u.searchParams.set("lang", state.lang);
    history.replaceState(null, "", u);
    render();
  });

  /* ---------- grain ---------- */
  (function grain() {
    var g = document.getElementById("grain");
    if (!g) return;
    try {
      var c = document.createElement("canvas"), n = 180;
      c.width = c.height = n;
      var x = c.getContext("2d"), d = x.createImageData(n, n);
      for (var i = 0; i < d.data.length; i += 4) { var v = Math.random() * 255 | 0; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
      x.putImageData(d, 0, 0);
      g.style.backgroundImage = "url(" + c.toDataURL() + ")";
    } catch (e) { /* decorative only */ }
  })();

  /* ---------- demo mode for previews and QA: ?demo=birth|quiz|profile|result ---------- */
  (function demo() {
    var d = new URLSearchParams(location.search).get("demo");
    if (!d) return;
    var s = fresh();
    s.lang = state.lang;
    s.birth = Object.assign(s.birth, { year: 1998, month: 7, day: 3, hour: 9, minute: 30, placeMode: "coords", lat: "22.5431", lon: "114.0579", tzAuto: "Asia/Shanghai" });
    var seed = 7;
    var rnd = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    if (d === "self" || d === "self-result") {
      s.mode = "self";
      s.self.code = "ENFP";
      s.self.at = "T";
    }
    state = s;
    Q().forEach(function (q) { s.answers[q.item.id] = 1 + Math.floor(rnd() * 7); });
    s.qIndex = d === "quiz" ? 5 : Q().length - 1;
    s.profile = { level: "MA", disciplines: ["curating", "photo"], stage: 2, timeline: 1, budget: 3, city: "metro", ielts: "6-6.5" };
    s.step = d === "result" || d === "self-result" ? "result" : d === "profile" ? "profile" : d === "quiz" ? "quiz" : d === "self" ? "self" : "birth";
    if (d === "quiz") { s.answers = {}; }
    state = s;
  })();

  render();
})();
