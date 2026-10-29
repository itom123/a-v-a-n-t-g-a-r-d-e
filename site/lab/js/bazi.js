/*!
 * AG LAB · 八字 engine
 *
 * Turns a recorded birth moment into the Four Pillars and a structured
 * analysis. Time handling is done the professional way:
 *   1. civil wall time in the birthplace's IANA time zone (historic DST
 *      included, e.g. China 1986–1991, UK BST) → exact UTC instant;
 *   2. year and month pillars from that instant against the exact 节 instants
 *      (year changes at 立春, month at each of the twelve 节);
 *   3. day and hour pillars from true solar time at the birth longitude
 *      (longitude correction + equation of time), with a choice of 子时 rule.
 *
 * Astronomical data (节气 instants) and 农历 conversion come from
 * lunar-javascript (6tail). Every other table and rule is implemented here so
 * it can be tested independently and cross-checked against that library.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.AGBazi = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  /* ------------------------------------------------------------------ *
   * Tables
   * ------------------------------------------------------------------ */
  var GAN = "甲乙丙丁戊己庚辛壬癸".split("");
  var ZHI = "子丑寅卯辰巳午未申酉戌亥".split("");
  var WX = "木火土金水".split("");
  var WX_EN = ["Wood", "Fire", "Earth", "Metal", "Water"];
  var GAN_WX = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4];
  var ZHI_WX = [4, 2, 0, 0, 2, 1, 1, 2, 3, 3, 2, 4];

  // 地支藏干, 本气 first (index into GAN)
  var HIDE = [
    [9], [5, 9, 7], [0, 2, 4], [1], [4, 1, 9], [2, 6, 4],
    [3, 5], [5, 3, 1], [6, 8, 4], [7], [4, 7, 3], [8, 0]
  ];
  // Weight of each hidden stem by count: 本气 / 中气 / 余气
  var HIDE_W = { 1: [1], 2: [0.7, 0.3], 3: [0.6, 0.3, 0.1] };

  var NAYIN = [
    "海中金", "炉中火", "大林木", "路旁土", "剑锋金", "山头火", "涧下水", "城头土", "白蜡金", "杨柳木",
    "泉中水", "屋上土", "霹雳火", "松柏木", "长流水", "沙中金", "山下火", "平地木", "壁上土", "金箔金",
    "覆灯火", "天河水", "大驿土", "钗钏金", "桑柘木", "大溪水", "沙中土", "天上火", "石榴木", "大海水"
  ];

  var CHANG_SHENG = ["长生", "沐浴", "冠带", "临官", "帝旺", "衰", "病", "死", "墓", "绝", "胎", "养"];
  // Branch where each stem's 长生 sits (火土同宫)
  var CS_START = [11, 6, 2, 9, 2, 9, 5, 0, 8, 3];

  // The twelve 节 that open each month, with the month branch they open
  var JIE_BRANCH = {
    "小寒": 1, "立春": 2, "惊蛰": 3, "清明": 4, "立夏": 5, "芒种": 6,
    "小暑": 7, "立秋": 8, "白露": 9, "寒露": 10, "立冬": 11, "大雪": 0
  };
  var SI_LI = { "立春": 1, "立夏": 1, "立秋": 1, "立冬": 1 };
  // lunar-javascript labels the following year's terms with pinyin keys
  var TERM_ALIAS = {
    DA_XUE: "大雪", DONG_ZHI: "冬至", XIAO_HAN: "小寒", DA_HAN: "大寒",
    LI_CHUN: "立春", YU_SHUI: "雨水", JING_ZHE: "惊蛰"
  };

  var POS = ["year", "month", "day", "hour"];
  var POS_ZH = { year: "年", month: "月", day: "日", hour: "时" };

  // Element-strength model (documented in the method notes on the page)
  var STEM_W = 1.0;
  var BRANCH_W = { year: 1.0, month: 3.0, day: 1.5, hour: 1.0 };
  var SEASON_COEF = { "旺": 1.2, "相": 1.1, "休": 1.0, "囚": 0.9, "死": 0.8 };
  var TU_WANG_MS = 18 * 86400000; // 土王用事: the 18 days before each 四立
  var HOUR_MS = 3600000;
  var BJ_OFFSET_MS = 8 * HOUR_MS; // lunar-javascript works in UTC+8

  /* ------------------------------------------------------------------ *
   * Small helpers
   * ------------------------------------------------------------------ */
  function mod(a, n) { return ((a % n) + n) % n; }
  function sum(a) { var s = 0; for (var i = 0; i < a.length; i++) s += a[i]; return s; }
  function rad(d) { return d * Math.PI / 180; }
  function deg(r) { return r * 180 / Math.PI; }

  /** Sexagenary index (0 = 甲子) from stem and branch indices. */
  function sexIdx(g, z) { return mod(6 * g - 5 * z, 60); }

  /** Julian Day Number of a proleptic Gregorian civil date. */
  function jdn(y, m, d) {
    var a = Math.floor((14 - m) / 12);
    var yy = y + 4800 - a;
    var mm = m + 12 * a - 3;
    return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) -
      Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
  }

  /**
   * 十神 of `other` relative to the day master.
   * @param {number} dm stem index of the day master
   * @param {number} other stem index
   * @returns {string}
   */
  function shiShen(dm, other) {
    var rel = mod(GAN_WX[other] - GAN_WX[dm], 5);
    var same = (dm % 2) === (other % 2);
    switch (rel) {
      case 0: return same ? "比肩" : "劫财";
      case 1: return same ? "食神" : "伤官";
      case 2: return same ? "偏财" : "正财";
      case 3: return same ? "七杀" : "正官";
      default: return same ? "偏印" : "正印";
    }
  }

  /** Ten-god family key used by the analysis. */
  function family(dm, other) {
    return ["bijie", "shishang", "cai", "guansha", "yin"][mod(GAN_WX[other] - GAN_WX[dm], 5)];
  }

  function naYin(idx60) { return NAYIN[Math.floor(idx60 / 2)]; }

  /** 十二长生 state of a stem at a branch (阳顺阴逆). */
  function diShi(g, z) {
    var start = CS_START[g];
    var off = g % 2 === 0 ? mod(z - start, 12) : mod(start - z, 12);
    return CHANG_SHENG[off];
  }

  /** 旬空 (the two empty branches of the pillar's decade). */
  function xunKong(idx60) {
    var start = mod(idx60 % 12 - idx60 % 10, 12);
    return [ZHI[(start + 10) % 12], ZHI[(start + 11) % 12]];
  }

  /* ------------------------------------------------------------------ *
   * Time zones (IANA via Intl, so historic DST is included)
   * ------------------------------------------------------------------ */
  var dtfCache = {};
  function dtf(tz) {
    if (!dtfCache[tz]) {
      dtfCache[tz] = new Intl.DateTimeFormat("en-US", {
        timeZone: tz, hourCycle: "h23", year: "numeric", month: "numeric",
        day: "numeric", hour: "numeric", minute: "numeric", second: "numeric"
      });
    }
    return dtfCache[tz];
  }

  /** True if the runtime knows this IANA zone. */
  function isValidZone(tz) {
    try { dtf(tz); return true; } catch (e) { return false; }
  }

  /**
   * Offset (minutes, local − UTC) of zone `tz` at UTC instant `t`.
   * @param {string} tz
   * @param {number} t epoch milliseconds
   * @returns {number}
   */
  function offsetAt(tz, t) {
    var parts = dtf(tz).formatToParts(new Date(t));
    var o = {};
    for (var i = 0; i < parts.length; i++) o[parts[i].type] = parts[i].value;
    var local = Date.UTC(+o.year, +o.month - 1, +o.day, (+o.hour) % 24, +o.minute, +o.second);
    var whole = t - mod(t, 1000);
    return Math.round((local - whole) / 60000);
  }

  /**
   * Civil wall time in zone `tz` → UTC instant. Handles DST gaps (time that
   * never existed) and overlaps (time that happened twice) the same way as
   * Temporal's "compatible" rule: overlaps take the earlier instant, gaps are
   * read with the offset in force before the change.
   * @returns {{utc:number, offsetMin:number, status:"ok"|"gap"|"overlap", altOffsetMin?:number}}
   */
  function wallToUtc(y, m, d, h, mi, tz) {
    var wall = Date.UTC(y, m - 1, d, h, mi);
    var probes = [
      offsetAt(tz, wall - 2 * 86400000), offsetAt(tz, wall), offsetAt(tz, wall + 2 * 86400000)
    ];
    probes.push(offsetAt(tz, wall - probes[1] * 60000));
    var seen = {}, sols = [];
    for (var i = 0; i < probes.length; i++) {
      var o = probes[i];
      if (seen[o]) continue;
      seen[o] = 1;
      var t = wall - o * 60000;
      if (offsetAt(tz, t) === o) sols.push({ t: t, o: o });
    }
    sols.sort(function (a, b) { return a.t - b.t; });
    if (sols.length === 1) return { utc: sols[0].t, offsetMin: sols[0].o, status: "ok" };
    if (sols.length > 1) {
      return { utc: sols[0].t, offsetMin: sols[0].o, status: "overlap", altOffsetMin: sols[1].o };
    }
    var before = probes[0];
    var tg = wall - before * 60000;
    return { utc: tg, offsetMin: before, status: "gap", altOffsetMin: offsetAt(tz, tg) };
  }

  /* ------------------------------------------------------------------ *
   * Solar time
   * ------------------------------------------------------------------ */
  /**
   * Equation of time in minutes (apparent − mean solar time), NOAA/Meeus
   * formulation; accurate to well under a minute for 1900–2100.
   * @param {number} t epoch milliseconds (UTC)
   * @returns {number}
   */
  function equationOfTime(t) {
    var jd = t / 86400000 + 2440587.5;
    var T = (jd - 2451545) / 36525;
    var L0 = mod(280.46646 + T * (36000.76983 + T * 0.0003032), 360);
    var M = 357.52911 + T * (35999.05029 - 0.0001537 * T);
    var e = 0.016708634 - T * (0.000042037 + 0.0000001267 * T);
    var eps0 = 23 + (26 + (21.448 - T * (46.815 + T * (0.00059 - T * 0.001813))) / 60) / 60;
    var eps = eps0 + 0.00256 * Math.cos(rad(125.04 - 1934.136 * T));
    var y = Math.tan(rad(eps) / 2);
    y *= y;
    var l0 = rad(L0), m = rad(M);
    var E = y * Math.sin(2 * l0) - 2 * e * Math.sin(m) + 4 * e * y * Math.sin(m) * Math.cos(2 * l0) -
      0.5 * y * y * Math.sin(4 * l0) - 1.25 * e * e * Math.sin(2 * m);
    return 4 * deg(E);
  }

  function fieldsOf(t) {
    var d = new Date(t);
    return {
      y: d.getUTCFullYear(), m: d.getUTCMonth() + 1, d: d.getUTCDate(),
      h: d.getUTCHours(), mi: d.getUTCMinutes(), s: d.getUTCSeconds()
    };
  }

  /* ------------------------------------------------------------------ *
   * Calendar library adapter (lunar-javascript)
   * ------------------------------------------------------------------ */
  var lib = null;
  var termCache = {};

  /**
   * Provide the lunar-javascript exports ({Solar, Lunar, LunarYear, LunarMonth}).
   * @param {object} l
   */
  function init(l) {
    lib = l;
    termCache = {};
  }

  function need() {
    if (!lib || !lib.Solar || !lib.Lunar) throw bError("LIB_MISSING");
  }

  function bError(code, extra) {
    var e = new Error(code);
    e.code = code;
    if (extra) e.detail = extra;
    return e;
  }

  /** All 节 instants (UTC ms) around a Beijing calendar year, sorted. */
  function jieList(bjYear) {
    if (termCache[bjYear]) return termCache[bjYear];
    var seen = {}, list = [];
    for (var y = bjYear - 1; y <= bjYear + 1; y++) {
      var table = lib.Solar.fromYmd(y, 6, 1).getLunar().getJieQiTable();
      var keys = Object.keys(table);
      for (var i = 0; i < keys.length; i++) {
        var name = TERM_ALIAS[keys[i]] || keys[i];
        if (!(name in JIE_BRANCH)) continue;
        var s = table[keys[i]];
        var t = Date.UTC(s.getYear(), s.getMonth() - 1, s.getDay(), s.getHour(), s.getMinute(), s.getSecond()) - BJ_OFFSET_MS;
        var key = name + "@" + t;
        if (seen[key]) continue;
        seen[key] = 1;
        list.push({ name: name, t: t });
      }
    }
    list.sort(function (a, b) { return a.t - b.t; });
    termCache[bjYear] = list;
    return list;
  }

  /** Solar-term context of a UTC instant. */
  function termContext(t) {
    var bjYear = new Date(t + BJ_OFFSET_MS).getUTCFullYear();
    var list = jieList(bjYear);
    var prev = null, next = null, liChun = null, nextSiLi = null;
    for (var i = 0; i < list.length; i++) {
      var x = list[i];
      if (x.t <= t) {
        prev = x;
        if (x.name === "立春") liChun = x;
      } else {
        if (!next) next = x;
        if (!nextSiLi && SI_LI[x.name]) nextSiLi = x;
        if (next && nextSiLi) break;
      }
    }
    if (!prev || !liChun || !next) throw bError("TERM_RANGE");
    return {
      prev: prev,
      next: next,
      nextSiLi: nextSiLi,
      liChunYear: new Date(liChun.t + BJ_OFFSET_MS).getUTCFullYear()
    };
  }

  /** 农历 date → Gregorian date. `m` is negative for a leap month. */
  function lunarToSolar(y, m, d) {
    need();
    if (!lib.LunarYear || !lib.LunarMonth) throw bError("LIB_MISSING");
    if (m < 0 && lib.LunarYear.fromYear(y).getLeapMonth() !== -m) throw bError("NO_LEAP_MONTH", { year: y, month: -m });
    var lm = lib.LunarMonth.fromYm(y, m);
    if (!lm) throw bError("BAD_LUNAR_MONTH");
    if (d < 1 || d > lm.getDayCount()) throw bError("BAD_LUNAR_DAY", { max: lm.getDayCount() });
    var s = lib.Lunar.fromYmd(y, m, d).getSolar();
    return { y: s.getYear(), m: s.getMonth(), d: s.getDay() };
  }

  /** Leap month of a lunar year (0 if none). */
  function leapMonthOf(y) {
    need();
    return lib.LunarYear.fromYear(y).getLeapMonth();
  }

  /** Day count of a lunar month (`m` negative for leap). */
  function lunarMonthDays(y, m) {
    need();
    var lm = lib.LunarMonth.fromYm(y, m);
    return lm ? lm.getDayCount() : 0;
  }

  function isValidSolarDate(y, m, d) {
    var t = new Date(Date.UTC(y, m - 1, d));
    return t.getUTCFullYear() === y && t.getUTCMonth() === m - 1 && t.getUTCDate() === d;
  }

  /* ------------------------------------------------------------------ *
   * Pillars
   * ------------------------------------------------------------------ */
  function yearPillar(liChunYear) {
    return mod(liChunYear - 4, 60);
  }

  /** Month pillar from the opening 节 and the (立春) year stem — 五虎遁. */
  function monthPillar(jieName, yearIdx) {
    var z = JIE_BRANCH[jieName];
    var first = mod((yearIdx % 10) % 5 * 2 + 2, 10); // stem of the 寅 month
    var g = mod(first + mod(z - 2, 12), 10);
    return sexIdx(g, z);
  }

  /**
   * Day and hour pillars from a (solar-time) wall clock reading.
   * rule "23": the day changes at 23:00 (子初换日, classical).
   * rule "00": the day changes at 00:00; 23:00–24:00 is 夜子时 whose hour stem
   *            follows the next day (早晚子时).
   */
  function dayHourPillars(w, rule, hasHour) {
    var dayIdx = mod(jdn(w.y, w.m, w.d) + 49, 60);
    if (!hasHour) return { day: dayIdx, hour: null, lateZi: false };
    var late = w.h === 23;
    var nextIdx = mod(dayIdx + 1, 60);
    var z = Math.floor((w.h + 1) / 2) % 12;
    var stemDay = late ? nextIdx : dayIdx;
    var g = mod((stemDay % 10) % 5 * 2 + z, 10);
    return { day: late && rule === "23" ? nextIdx : dayIdx, hour: sexIdx(g, z), lateZi: late };
  }

  function pillarInfo(pos, idx, dm) {
    var g = idx % 10, z = idx % 12;
    var hide = HIDE[z];
    return {
      pos: pos,
      idx: idx,
      gan: g,
      zhi: z,
      ganZh: GAN[g],
      zhiZh: ZHI[z],
      ganWx: GAN_WX[g],
      zhiWx: ZHI_WX[z],
      ganShiShen: pos === "day" ? "日主" : shiShen(dm, g),
      hide: hide.map(function (h) { return { gan: h, zh: GAN[h], wx: GAN_WX[h], shiShen: shiShen(dm, h) }; }),
      naYin: naYin(idx),
      diShi: diShi(dm, z),
      ziZuo: diShi(g, z),
      xunKong: xunKong(idx)
    };
  }

  /* ------------------------------------------------------------------ *
   * Analysis
   * ------------------------------------------------------------------ */
  function seasonElement(monthZhi, tuWang) {
    if (tuWang) return 2;
    return [4, 4, 0, 0, 0, 1, 1, 1, 3, 3, 3, 4][monthZhi];
  }

  /** 旺相休囚死 of element `el` in a season ruled by element `season`. */
  function seasonStatus(season, el) {
    if (el === season) return "旺";
    if (el === mod(season + 1, 5)) return "相";
    if (mod(el + 1, 5) === season) return "休";
    if (mod(el + 2, 5) === season) return "囚";
    return "死";
  }

  function elementScores(pillars, season) {
    var raw = [0, 0, 0, 0, 0];
    var noDm = [0, 0, 0, 0, 0]; // without the day master's own stem
    var count = [0, 0, 0, 0, 0];
    var hiddenOnly = [0, 0, 0, 0, 0];
    for (var i = 0; i < pillars.length; i++) {
      var p = pillars[i];
      raw[p.ganWx] += STEM_W;
      if (p.pos !== "day") noDm[p.ganWx] += STEM_W;
      count[p.ganWx]++;
      count[p.zhiWx]++;
      var ws = HIDE_W[p.hide.length];
      for (var k = 0; k < p.hide.length; k++) {
        var v = BRANCH_W[p.pos] * ws[k];
        raw[p.hide[k].wx] += v;
        noDm[p.hide[k].wx] += v;
        hiddenOnly[p.hide[k].wx] += v;
      }
    }
    var status = WX.map(function (_, el) { return seasonStatus(season, el); });
    var adj = raw.map(function (v, el) { return v * SEASON_COEF[status[el]]; });
    var adjNoDm = noDm.map(function (v, el) { return v * SEASON_COEF[status[el]]; });
    var total = sum(adj);
    return {
      raw: raw,
      score: adj,
      scoreNoDm: adjNoDm,
      pct: adj.map(function (v) { return v / total; }),
      count: count,
      hidden: hiddenOnly,
      status: status,
      total: total,
      missing: count.map(function (c, el) { return c === 0 ? el : -1; }).filter(function (el) { return el >= 0; })
    };
  }

  function strengthOf(pillars, dm, el, season) {
    var dmWx = GAN_WX[dm];
    var yinWx = mod(dmWx - 1, 5);
    var support = el.score[dmWx] + el.score[yinWx];
    var ratio = support / el.total;

    var deLing = el.status[dmWx] === "旺" || el.status[dmWx] === "相";

    var root = 0; // 通根: 比劫 among hidden stems, weighted by 本/中/余
    var rootDetail = [];
    for (var i = 0; i < pillars.length; i++) {
      var p = pillars[i];
      var ws = HIDE_W[p.hide.length];
      for (var k = 0; k < p.hide.length; k++) {
        if (p.hide[k].wx === dmWx) {
          root += ws[k] * (p.pos === "month" ? 1.5 : 1);
          rootDetail.push(POS_ZH[p.pos] + "支" + p.zhiZh + (k === 0 ? "（本气）" : "（余气）"));
        }
      }
    }
    var deDi = root >= 0.6;

    var helpers = 0; // 比劫 / 印 among the other stems
    for (var j = 0; j < pillars.length; j++) {
      if (pillars[j].pos === "day") continue;
      var f = family(dm, pillars[j].gan);
      if (f === "bijie" || f === "yin") helpers++;
    }
    var deShi = helpers >= 2;

    var level;
    if (ratio >= 0.8) level = "extreme-strong";
    else if (ratio >= 0.58) level = "strong";
    else if (ratio >= 0.5) level = "slightly-strong";
    else if (ratio >= 0.42) level = "slightly-weak";
    else if (ratio >= 0.2) level = "weak";
    else level = "extreme-weak";

    var special = null;
    if (level === "extreme-strong" && deLing) special = "zhuanwang";
    if (level === "extreme-weak" && root < 0.3 && helpers === 0) special = "cong";

    return {
      support: support,
      oppose: el.total - support,
      ratio: ratio,
      deLing: deLing,
      deDi: deDi,
      deShi: deShi,
      root: root,
      rootDetail: rootDetail,
      helpers: helpers,
      level: level,
      strong: ratio >= 0.5,
      special: special
    };
  }

  /** Ten-god family totals (element scores regrouped relative to the day master). */
  function familyScores(dm, el, withoutDm) {
    var s = withoutDm ? el.scoreNoDm : el.score;
    var dmWx = GAN_WX[dm];
    return {
      bijie: s[dmWx],
      shishang: s[mod(dmWx + 1, 5)],
      cai: s[mod(dmWx + 2, 5)],
      guansha: s[mod(dmWx + 3, 5)],
      yin: s[mod(dmWx + 4, 5)]
    };
  }

  function familyElement(dm, fam) {
    var off = { bijie: 0, shishang: 1, cai: 2, guansha: 3, yin: 4 }[fam];
    return mod(GAN_WX[dm] + off, 5);
  }

  /**
   * 月令格局 by the 子平 rule: the month branch's hidden stem that shows on a
   * heavenly stem sets the pattern (本气 first); otherwise the 本气 itself.
   * 禄 and 刃 in the month give 建禄格 / 月刃格.
   */
  function geJu(pillars, dm) {
    var month = null, stems = [];
    for (var i = 0; i < pillars.length; i++) {
      if (pillars[i].pos === "month") month = pillars[i];
      if (pillars[i].pos !== "day") stems.push(pillars[i].gan);
    }
    var ds = diShi(dm, month.zhi);
    if (ds === "临官") return { name: "建禄格", basis: "月令为日主之禄", stem: month.hide[0].gan };
    if (ds === "帝旺" && dm % 2 === 0) return { name: "月刃格", basis: "月令为日主之阳刃", stem: month.hide[0].gan };
    var pick = null, how = "";
    for (var k = 0; k < month.hide.length; k++) {
      if (stems.indexOf(month.hide[k].gan) >= 0) {
        pick = month.hide[k];
        how = ["本气透出", "中气透出", "余气透出"][k];
        break;
      }
    }
    if (!pick) { pick = month.hide[0]; how = "取月令本气"; }
    var ss = shiShen(dm, pick.gan);
    var name = { "比肩": "月劫格", "劫财": "月劫格", "七杀": "七杀格" }[ss] || (ss + "格");
    return { name: name, basis: "月支" + month.zhiZh + "藏" + pick.zh + "，" + how, stem: pick.gan };
  }

  /** 扶抑 + 调候 favourable-element analysis. */
  function yongShen(dm, el, st, monthZhi) {
    var fam = familyScores(dm, el, true);
    var E = function (f) { return familyElement(dm, f); };
    var use, fav, avoid = [], why;

    if (st.special === "zhuanwang") {
      use = E("bijie"); fav = E("yin"); avoid = [E("guansha"), E("cai")];
      why = "zhuanwang";
    } else if (st.special === "cong") {
      var opp = ["shishang", "cai", "guansha"].sort(function (a, b) { return fam[b] - fam[a]; })[0];
      use = E(opp); fav = E(opp === "guansha" ? "cai" : opp === "cai" ? "shishang" : "cai");
      avoid = [E("yin"), E("bijie")];
      why = "cong";
    } else if (st.strong) {
      if (fam.yin >= fam.bijie) {
        use = E("cai"); fav = E("shishang"); why = "strong-yin";
      } else if (fam.guansha >= 0.06 * el.total) {
        use = E("guansha"); fav = E("cai"); why = "strong-bijie-guan";
      } else {
        use = E("shishang"); fav = E("cai"); why = "strong-bijie-xie";
      }
      avoid = [E("yin"), E("bijie")];
    } else {
      var heavy = ["shishang", "cai", "guansha"].sort(function (a, b) { return fam[b] - fam[a]; })[0];
      if (heavy === "cai") {
        use = E("bijie"); fav = E("yin"); avoid = [E("cai"), E("shishang")]; why = "weak-cai";
      } else if (heavy === "guansha") {
        use = E("yin"); fav = E("bijie"); avoid = [E("guansha"), E("cai")]; why = "weak-guan";
      } else {
        use = E("yin"); fav = E("bijie"); avoid = [E("shishang"), E("cai")]; why = "weak-shishang";
      }
    }

    // 调候: summer charts want Water, winter charts want Fire
    var tiaoHou = null;
    if ((monthZhi === 5 || monthZhi === 6 || monthZhi === 7) && el.pct[4] < 0.15) tiaoHou = 4;
    if ((monthZhi === 11 || monthZhi === 0 || monthZhi === 1) && el.pct[1] < 0.15) tiaoHou = 1;

    return {
      use: use,
      fav: fav,
      avoid: avoid.filter(function (x, i, a) { return a.indexOf(x) === i && x !== use && x !== fav; }),
      tiaoHou: tiaoHou,
      tiaoHouConflict: tiaoHou !== null && avoid.indexOf(tiaoHou) >= 0,
      why: why
    };
  }

  /* ---------- 刑冲合会 ---------- */
  var GAN_HE = { "0-5": "土", "1-6": "金", "2-7": "水", "3-8": "木", "4-9": "火" };
  var GAN_CHONG = { "0-6": 1, "1-7": 1, "2-8": 1, "3-9": 1 };
  var ZHI_LIUHE = { "0-1": "土", "2-11": "木", "3-10": "火", "4-9": "金", "5-8": "水", "6-7": "" };
  var ZHI_HAI = { "0-7": 1, "1-6": 1, "2-5": 1, "3-4": 1, "8-11": 1, "9-10": 1 };
  var SAN_HE = [[8, 0, 4, "水"], [11, 3, 7, "木"], [2, 6, 10, "火"], [5, 9, 1, "金"]];
  var SAN_HUI = [[2, 3, 4, "木"], [5, 6, 7, "火"], [8, 9, 10, "金"], [11, 0, 1, "水"]];
  var XING_GROUPS = [[2, 5, 8, "无恩之刑"], [1, 10, 7, "恃势之刑"]];
  var ZI_XING = { 4: 1, 6: 1, 9: 1, 11: 1 };

  function pairKey(a, b) { return a < b ? a + "-" + b : b + "-" + a; }

  function relations(pillars) {
    var out = [];
    var n = pillars.length;
    for (var i = 0; i < n; i++) {
      for (var j = i + 1; j < n; j++) {
        var A = pillars[i], B = pillars[j];
        var where = POS_ZH[A.pos] + POS_ZH[B.pos];
        var gk = pairKey(A.gan, B.gan);
        if (GAN_HE[gk]) out.push({ kind: "干合", where: where, text: A.ganZh + B.ganZh + "合" + GAN_HE[gk] });
        if (GAN_CHONG[gk]) out.push({ kind: "干冲", where: where, text: A.ganZh + B.ganZh + "相冲" });
        var zk = pairKey(A.zhi, B.zhi);
        if (zk in ZHI_LIUHE) out.push({ kind: "六合", where: where, text: A.zhiZh + B.zhiZh + "合" + ZHI_LIUHE[zk] });
        if (Math.abs(A.zhi - B.zhi) === 6) out.push({ kind: "六冲", where: where, text: A.zhiZh + B.zhiZh + "相冲" });
        if (ZHI_HAI[zk]) out.push({ kind: "相害", where: where, text: A.zhiZh + B.zhiZh + "相害" });
        if ((A.zhi === 0 && B.zhi === 3) || (A.zhi === 3 && B.zhi === 0)) out.push({ kind: "相刑", where: where, text: "子卯相刑（无礼之刑）" });
        if (A.zhi === B.zhi && ZI_XING[A.zhi]) out.push({ kind: "自刑", where: where, text: A.zhiZh + A.zhiZh + "自刑" });
        for (var g = 0; g < XING_GROUPS.length; g++) {
          var grp = XING_GROUPS[g];
          if (A.zhi !== B.zhi && grp.indexOf(A.zhi) >= 0 && grp.indexOf(A.zhi) < 3 && grp.indexOf(B.zhi) >= 0 && grp.indexOf(B.zhi) < 3) {
            out.push({ kind: "相刑", where: where, text: A.zhiZh + B.zhiZh + "相刑（" + grp[3] + "）" });
          }
        }
      }
    }
    var zs = pillars.map(function (p) { return p.zhi; });
    var has = function (z) { return zs.indexOf(z) >= 0; };
    SAN_HE.forEach(function (s) {
      if (has(s[0]) && has(s[1]) && has(s[2])) out.push({ kind: "三合", where: "", text: ZHI[s[0]] + ZHI[s[1]] + ZHI[s[2]] + "三合" + s[3] + "局" });
      else if (has(s[1]) && (has(s[0]) || has(s[2]))) out.push({ kind: "半合", where: "", text: (has(s[0]) ? ZHI[s[0]] + ZHI[s[1]] : ZHI[s[1]] + ZHI[s[2]]) + "半合" + s[3] + "局" });
      else if (has(s[0]) && has(s[2])) out.push({ kind: "拱合", where: "", text: ZHI[s[0]] + ZHI[s[2]] + "拱" + s[3] + "局" });
    });
    SAN_HUI.forEach(function (s) {
      if (has(s[0]) && has(s[1]) && has(s[2])) out.push({ kind: "三会", where: "", text: ZHI[s[0]] + ZHI[s[1]] + ZHI[s[2]] + "三会" + s[3] + "方" });
    });
    return out;
  }

  /** Creative working modes from ten-god families (the day master itself excluded). */
  function modesOf(dm, el) {
    var f = familyScores(dm, el, true);
    var raw = {
      expression: f.shishang, research: f.yin, structure: f.guansha,
      applied: f.cai, collaboration: f.bijie
    };
    var tot = raw.expression + raw.research + raw.structure + raw.applied + raw.collaboration;
    var share = {};
    Object.keys(raw).forEach(function (k) { share[k] = tot ? raw[k] / tot : 0.2; });
    var order = Object.keys(share).sort(function (a, b) { return share[b] - share[a]; });
    return { share: share, order: order };
  }

  /* ------------------------------------------------------------------ *
   * Main entry
   * ------------------------------------------------------------------ */
  /**
   * @typedef {Object} BirthInput
   * @property {"solar"|"lunar"} calendar
   * @property {number} year
   * @property {number} month  1–12; for 农历 a negative value is a leap month
   * @property {number} day
   * @property {?number} hour   null when the birth time is unknown
   * @property {?number} minute
   * @property {number} lat
   * @property {number} lon
   * @property {string} tz      IANA zone the birth time was recorded in
   * @property {"true"|"mean"|"clock"} [solarTime]  default "true"
   * @property {"23"|"00"} [ziRule]  default "23"
   */

  /**
   * Compute a full chart.
   * @param {BirthInput} input
   * @returns {object}
   */
  function compute(input) {
    need();
    var solarTime = input.solarTime || "true";
    var ziRule = input.ziRule || "23";
    var hasHour = input.hour !== null && input.hour !== undefined && input.hour !== "";
    if (!isFinite(input.lat) || !isFinite(input.lon) || Math.abs(input.lat) > 90 || Math.abs(input.lon) > 180) {
      throw bError("BAD_COORDS");
    }
    if (!isValidZone(input.tz)) throw bError("BAD_ZONE", { tz: input.tz });

    var civil;
    if (input.calendar === "lunar") civil = lunarToSolar(+input.year, +input.month, +input.day);
    else {
      civil = { y: +input.year, m: +input.month, d: +input.day };
      if (!isValidSolarDate(civil.y, civil.m, civil.d)) throw bError("BAD_DATE");
    }
    if (civil.y < 1901 || civil.y > 2099) throw bError("YEAR_RANGE");

    var h = hasHour ? +input.hour : 12;
    var mi = hasHour ? +(input.minute || 0) : 0;
    var z = wallToUtc(civil.y, civil.m, civil.d, h, mi, input.tz);
    var utc = z.utc;

    // Year and month: the exact instant against the exact 节 instants
    var tc = termContext(utc);
    var yIdx = yearPillar(tc.liChunYear);
    var mIdx = monthPillar(tc.prev.name, yIdx);

    // Day and hour: solar time at the birth longitude
    var lonMin = input.lon * 4; // minutes east of Greenwich
    var eot = equationOfTime(utc);
    var shiftMin;
    if (!hasHour || solarTime === "clock") shiftMin = z.offsetMin;
    else if (solarTime === "mean") shiftMin = lonMin;
    else shiftMin = lonMin + eot;
    var wall = hasHour ? fieldsOf(utc + shiftMin * 60000) : { y: civil.y, m: civil.m, d: civil.d, h: 12, mi: 0, s: 0 };
    var dh = dayHourPillars(wall, ziRule, hasHour);

    var dm = dh.day % 10;
    var idxs = { year: yIdx, month: mIdx, day: dh.day, hour: dh.hour };
    var pillars = [];
    POS.forEach(function (p) { if (idxs[p] !== null) pillars.push(pillarInfo(p, idxs[p], dm)); });

    // Season (with 土王用事 in the 18 days before each 四立)
    var tuWang = !!(tc.nextSiLi && tc.nextSiLi.t - utc <= TU_WANG_MS && tc.prev.name !== tc.nextSiLi.name);
    var monthZhi = mIdx % 12;
    var season = seasonElement(monthZhi, tuWang);
    var el = elementScores(pillars, season);
    var st = strengthOf(pillars, dm, el, season);
    var modes = modesOf(dm, el);

    // Precision flags
    var flags = [];
    if (hasHour) {
      var nearTerm = Math.min(utc - tc.prev.t, tc.next.t - utc);
      if (nearTerm < 2 * HOUR_MS) {
        flags.push({ code: "NEAR_JIE", term: (utc - tc.prev.t < tc.next.t - utc) ? tc.prev.name : tc.next.name, minutes: Math.round(nearTerm / 60000) });
      }
      var minOfDay = wall.h * 60 + wall.mi;
      var toBoundary = Math.min(mod(minOfDay - 60, 120), 120 - mod(minOfDay - 60, 120));
      if (toBoundary <= 10) flags.push({ code: "NEAR_SHICHEN", minutes: toBoundary });
      if (dh.lateZi) flags.push({ code: "LATE_ZI", rule: ziRule });
    } else {
      var dayStart = wallToUtc(civil.y, civil.m, civil.d, 0, 0, input.tz).utc;
      var dayEnd = dayStart + 86400000;
      var ctxA = termContext(dayStart), ctxB = termContext(dayEnd - 60000);
      if (ctxA.prev.t !== ctxB.prev.t) flags.push({ code: "JIE_DAY_UNKNOWN_HOUR", term: ctxB.prev.name });
      flags.push({ code: "NO_HOUR" });
    }
    if (z.status !== "ok") flags.push({ code: z.status === "gap" ? "DST_GAP" : "DST_OVERLAP" });

    var mp = pillars[1];
    return {
      input: {
        calendar: input.calendar || "solar", civil: civil, hour: hasHour ? h : null, minute: hasHour ? mi : null,
        lat: +input.lat, lon: +input.lon, tz: input.tz, solarTime: solarTime, ziRule: ziRule
      },
      time: {
        utc: utc,
        offsetMin: z.offsetMin,
        dstStatus: z.status,
        lonMin: lonMin,
        eotMin: eot,
        solarShiftMin: hasHour ? shiftMin - z.offsetMin : 0,
        solarWall: hasHour ? wall : null,
        prevJie: { name: tc.prev.name, utc: tc.prev.t },
        nextJie: { name: tc.next.name, utc: tc.next.t },
        liChunYear: tc.liChunYear
      },
      pillars: pillars,
      dayMaster: { gan: dm, zh: GAN[dm], wx: GAN_WX[dm], yang: dm % 2 === 0 },
      taiYuan: GAN[mod(mp.gan + 1, 10)] + ZHI[mod(mp.zhi + 3, 12)],
      season: { element: season, tuWang: tuWang, status: el.status },
      elements: el,
      strength: st,
      geJu: geJu(pillars, dm),
      yongShen: yongShen(dm, el, st, monthZhi),
      relations: relations(pillars),
      modes: modes,
      flags: flags
    };
  }

  return {
    init: init,
    compute: compute,
    // exposed for the UI and for tests
    GAN: GAN, ZHI: ZHI, WX: WX, WX_EN: WX_EN, GAN_WX: GAN_WX, ZHI_WX: ZHI_WX, HIDE: HIDE,
    NAYIN: NAYIN, CHANG_SHENG: CHANG_SHENG,
    shiShen: shiShen, naYin: naYin, diShi: diShi, xunKong: xunKong, sexIdx: sexIdx, jdn: jdn,
    offsetAt: offsetAt, wallToUtc: wallToUtc, isValidZone: isValidZone, equationOfTime: equationOfTime,
    termContext: termContext, lunarToSolar: lunarToSolar, leapMonthOf: leapMonthOf,
    lunarMonthDays: lunarMonthDays, monthPillar: monthPillar, yearPillar: yearPillar,
    dayHourPillars: dayHourPillars, seasonStatus: seasonStatus
  };
});
