/*
 * AG LAB engine tests.   node tests/engine.test.js
 *
 * 1. Reference charts and boundaries (立春, 节, 子时, JDN day cycle)
 * 2. Random cross-check of all four pillars and the per-pillar tables
 *    (十神, 藏干, 纳音, 星运, 旬空) against lunar-javascript's EightChar
 * 3. Time zones (historic DST, gaps, overlaps), equation of time, true solar time
 * 4. 农历 input with leap months
 * 5. Analysis sanity and strength distribution
 * 6. 16-type scoring, the self-reported type, reading copy and matching
 * 7. Star signs: Sun vs solar terms, Moon vs new moons, Rising geometry
 * 8. Long-form report: every copy block present, minimum reading length on the page and by email
 */
"use strict";

const assert = require("assert");
const path = require("path");
const root = path.join(__dirname, "..", "site", "lab");
const lunar = require(path.join(root, "vendor", "lunar.js"));
const Bazi = require(path.join(root, "js", "bazi.js"));
const T16 = require(path.join(root, "js", "type16.js"));
const Match = require(path.join(root, "js", "match.js"));

Bazi.init({ Solar: lunar.Solar, Lunar: lunar.Lunar, LunarYear: lunar.LunarYear, LunarMonth: lunar.LunarMonth });

let passed = 0, failed = 0;
function test(name, fn) {
  try { fn(); passed++; }
  catch (e) { failed++; process.stdout.write("✗ " + name + "\n   " + (e && e.message) + "\n"); }
}

const BJ = { lat: 39.9042, lon: 116.4074, tz: "Asia/Shanghai" };
function chart(o) {
  return Bazi.compute(Object.assign({ calendar: "solar", solarTime: "clock", ziRule: "23" }, BJ, o));
}
function pillars(c) { return c.pillars.map((p) => p.ganZh + p.zhiZh).join(" "); }

/* ---------------- 1. references ---------------- */
test("2000-01-01 00:00 Beijing = 己卯 丙子 戊午 壬子", () => {
  assert.strictEqual(pillars(chart({ year: 2000, month: 1, day: 1, hour: 0, minute: 0 })), "己卯 丙子 戊午 壬子");
});
test("1949-10-01 15:00 Beijing = 己丑 癸酉 甲子 壬申 (甲子日, 申时)", () => {
  assert.strictEqual(pillars(chart({ year: 1949, month: 10, day: 1, hour: 15, minute: 0 })), "己丑 癸酉 甲子 壬申");
});
test("JDN day cycle: 1949-10-01 is 甲子, 2000-01-01 is 戊午", () => {
  assert.strictEqual((Bazi.jdn(1949, 10, 1) + 49) % 60, 0);
  assert.strictEqual((Bazi.jdn(2000, 1, 1) + 49) % 60, 54);
});

function jieInstant(year, name) {
  const table = lunar.Solar.fromYmd(year, 6, 1).getLunar().getJieQiTable();
  const s = table[name];
  return Date.UTC(s.getYear(), s.getMonth() - 1, s.getDay(), s.getHour(), s.getMinute(), s.getSecond()) - 8 * 3600000;
}
function bjWall(t) {
  const d = new Date(t + 8 * 3600000);
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate(), hour: d.getUTCHours(), minute: d.getUTCMinutes() };
}

test("立春 2024 is near 2024-02-04 16:27 Beijing", () => {
  const t = jieInstant(2024, "立春");
  const expected = Date.UTC(2024, 1, 4, 16, 27) - 8 * 3600000;
  assert.ok(Math.abs(t - expected) <= 2 * 60000, "got " + new Date(t).toISOString());
});
test("立春 2025 is near 2025-02-03 22:10 Beijing", () => {
  const t = jieInstant(2025, "立春");
  const expected = Date.UTC(2025, 1, 3, 22, 10) - 8 * 3600000;
  assert.ok(Math.abs(t - expected) <= 2 * 60000, "got " + new Date(t).toISOString());
});
test("year and month flip exactly at 立春 2024", () => {
  const t = jieInstant(2024, "立春");
  const before = chart(bjWall(t - 2 * 60000)), after = chart(bjWall(t + 2 * 60000));
  assert.strictEqual(before.pillars[0].ganZh + before.pillars[0].zhiZh, "癸卯");
  assert.strictEqual(before.pillars[1].ganZh + before.pillars[1].zhiZh, "乙丑");
  assert.strictEqual(after.pillars[0].ganZh + after.pillars[0].zhiZh, "甲辰");
  assert.strictEqual(after.pillars[1].ganZh + after.pillars[1].zhiZh, "丙寅");
});
test("month flips exactly at 惊蛰 2024", () => {
  const t = jieInstant(2024, "惊蛰");
  const before = chart(bjWall(t - 2 * 60000)), after = chart(bjWall(t + 2 * 60000));
  assert.strictEqual(before.pillars[1].zhiZh, "寅");
  assert.strictEqual(after.pillars[1].zhiZh, "卯");
});
test("子时 rule 23: 2000-01-01 23:30 → 己未日 甲子时", () => {
  const c = chart({ year: 2000, month: 1, day: 1, hour: 23, minute: 30, ziRule: "23" });
  assert.strictEqual(c.pillars[2].ganZh + c.pillars[2].zhiZh, "己未");
  assert.strictEqual(c.pillars[3].ganZh + c.pillars[3].zhiZh, "甲子");
});
test("子时 rule 00: 2000-01-01 23:30 → 戊午日 甲子时", () => {
  const c = chart({ year: 2000, month: 1, day: 1, hour: 23, minute: 30, ziRule: "00" });
  assert.strictEqual(c.pillars[2].ganZh + c.pillars[2].zhiZh, "戊午");
  assert.strictEqual(c.pillars[3].ganZh + c.pillars[3].zhiZh, "甲子");
});
test("unknown hour gives three pillars and a NO_HOUR flag", () => {
  const c = chart({ year: 2000, month: 1, day: 1, hour: null, minute: null });
  assert.strictEqual(c.pillars.length, 3);
  assert.ok(c.flags.some((f) => f.code === "NO_HOUR"));
});

/* ---------------- 2. random cross-check against lunar-javascript ---------------- */
let seed = 20260928;
function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
const N = 4000;
const mismatches = [];
for (let i = 0; i < N; i++) {
  const t = Date.UTC(1902, 0, 1) + Math.floor(rnd() * (Date.UTC(2098, 0, 1) - Date.UTC(1902, 0, 1)));
  const w = bjWall(t);
  const rule = rnd() < 0.5 ? "23" : "00";
  // Beijing clock time with no solar correction is exactly what lunar-javascript computes
  const c = Bazi.compute({ calendar: "solar", year: w.year, month: w.month, day: w.day, hour: w.hour, minute: w.minute, lat: 39.9, lon: 116.4, tz: "Etc/GMT-8", solarTime: "clock", ziRule: rule });
  const ec = lunar.Solar.fromYmdHms(w.year, w.month, w.day, w.hour, w.minute, 0).getLunar().getEightChar();
  ec.setSect(rule === "23" ? 1 : 2);
  const mine = c.pillars.map((p) => p.ganZh + p.zhiZh);
  const theirs = [ec.getYear(), ec.getMonth(), ec.getDay(), ec.getTime()];
  const P = ["Year", "Month", "Day", "Time"];
  let bad = mine.join(" ") !== theirs.join(" ");
  const detail = [];
  if (!bad) {
    c.pillars.forEach((p, k) => {
      const K = P[k];
      if (k !== 2 && ec["get" + K + "ShiShenGan"]() !== p.ganShiShen) detail.push(K + " 十神 " + ec["get" + K + "ShiShenGan"]() + "≠" + p.ganShiShen);
      const hide = ec["get" + K + "HideGan"]().join("");
      if (hide !== p.hide.map((h) => h.zh).join("")) detail.push(K + " 藏干 " + hide + "≠" + p.hide.map((h) => h.zh).join(""));
      const zs = ec["get" + K + "ShiShenZhi"]().join("");
      if (zs !== p.hide.map((h) => h.shiShen).join("")) detail.push(K + " 支十神 " + zs + "≠" + p.hide.map((h) => h.shiShen).join(""));
      if (ec["get" + K + "NaYin"]() !== p.naYin) detail.push(K + " 纳音 " + ec["get" + K + "NaYin"]() + "≠" + p.naYin);
      if (ec["get" + K + "DiShi"]() !== p.diShi) detail.push(K + " 星运 " + ec["get" + K + "DiShi"]() + "≠" + p.diShi);
      if (ec["get" + K + "XunKong"]() !== p.xunKong.join("")) detail.push(K + " 空亡 " + ec["get" + K + "XunKong"]() + "≠" + p.xunKong.join(""));
    });
    if (detail.length) bad = true;
  }
  if (bad && mismatches.length < 12) mismatches.push(w.year + "-" + w.month + "-" + w.day + " " + w.hour + ":" + w.minute + " rule " + rule + "  mine " + mine.join(" ") + "  lib " + theirs.join(" ") + " " + detail.join("; "));
  else if (bad) mismatches.push("…");
}
test("random " + N + " datetimes: pillars and tables match lunar-javascript", () => {
  assert.strictEqual(mismatches.length, 0, mismatches.length + " mismatches\n   " + mismatches.slice(0, 12).join("\n   "));
});

/* ---------------- 3. time zones and solar time ---------------- */
test("China DST 1988: Asia/Shanghai is UTC+9 on 1988-07-01", () => {
  assert.strictEqual(Bazi.offsetAt("Asia/Shanghai", Date.UTC(1988, 6, 1, 4)), 540);
  assert.strictEqual(Bazi.offsetAt("Asia/Shanghai", Date.UTC(1995, 6, 1, 4)), 480);
});
test("UK BST: London +60 in July, 0 in January", () => {
  assert.strictEqual(Bazi.offsetAt("Europe/London", Date.UTC(2020, 6, 1, 12)), 60);
  assert.strictEqual(Bazi.offsetAt("Europe/London", Date.UTC(2020, 0, 1, 12)), 0);
});
test("DST gap and overlap are detected (London 2021)", () => {
  const gap = Bazi.wallToUtc(2021, 3, 28, 1, 30, "Europe/London");
  assert.strictEqual(gap.status, "gap");
  const over = Bazi.wallToUtc(2021, 10, 31, 1, 30, "Europe/London");
  assert.strictEqual(over.status, "overlap");
  assert.strictEqual(over.offsetMin, 60);
});
test("1988 Beijing summer birth uses the DST offset", () => {
  const c = chart({ year: 1988, month: 7, day: 1, hour: 12, minute: 0 });
  assert.strictEqual(c.time.offsetMin, 540);
  assert.strictEqual(new Date(c.time.utc).toISOString().slice(0, 16), "1988-07-01T03:00");
});
test("equation of time: Feb ≈ −14.2, Nov ≈ +16.4, mid-April ≈ 0, late July ≈ −6.5", () => {
  const e = (m, d) => Bazi.equationOfTime(Date.UTC(2024, m - 1, d, 12));
  assert.ok(Math.abs(e(2, 11) + 14.2) < 0.6, "Feb " + e(2, 11));
  assert.ok(Math.abs(e(11, 3) - 16.4) < 0.6, "Nov " + e(11, 3));
  assert.ok(Math.abs(e(4, 15)) < 1, "Apr " + e(4, 15));
  assert.ok(Math.abs(e(7, 26) + 6.5) < 0.7, "Jul " + e(7, 26));
});
test("true solar time in Urumqi (Beijing clock 10:00) is about 07:52 → 辰时", () => {
  const c = Bazi.compute({ calendar: "solar", year: 2000, month: 6, day: 1, hour: 10, minute: 0, lat: 43.825, lon: 87.617, tz: "Asia/Shanghai", solarTime: "true", ziRule: "23" });
  const w = c.time.solarWall;
  const mins = w.h * 60 + w.mi;
  assert.ok(Math.abs(mins - (7 * 60 + 52)) <= 4, "got " + w.h + ":" + w.mi);
  assert.strictEqual(c.pillars[3].zhiZh, "辰");
});
test("true solar time can move the day: Urumqi 00:30 Beijing → previous day's 亥时", () => {
  const c = Bazi.compute({ calendar: "solar", year: 2000, month: 6, day: 2, hour: 0, minute: 30, lat: 43.825, lon: 87.617, tz: "Asia/Shanghai", solarTime: "true", ziRule: "23" });
  assert.strictEqual(c.time.solarWall.d, 1);
  assert.strictEqual(c.pillars[3].zhiZh, "亥");
});
test("London birth: 2001-03-10 14:00 GMT uses longitude −0.13°", () => {
  const c = Bazi.compute({ calendar: "solar", year: 2001, month: 3, day: 10, hour: 14, minute: 0, lat: 51.507, lon: -0.128, tz: "Europe/London", solarTime: "true", ziRule: "23" });
  assert.strictEqual(c.time.offsetMin, 0);
  assert.strictEqual(c.pillars[3].zhiZh, "未");
});

/* ---------------- 4. 农历 input ---------------- */
test("leap months: 2020 闰四月, 2023 闰二月, 2021 none", () => {
  assert.strictEqual(Bazi.leapMonthOf(2020), 4);
  assert.strictEqual(Bazi.leapMonthOf(2023), 2);
  assert.strictEqual(Bazi.leapMonthOf(2021), 0);
});
test("农历 2020 闰四月初一 = 2020-05-23; 2023 闰二月初一 = 2023-03-22", () => {
  assert.deepStrictEqual(Bazi.lunarToSolar(2020, -4, 1), { y: 2020, m: 5, d: 23 });
  assert.deepStrictEqual(Bazi.lunarToSolar(2023, -2, 1), { y: 2023, m: 3, d: 22 });
});
test("农历 validation: no 闰五月 in 2021; 30th of a 29-day month rejected", () => {
  assert.throws(() => Bazi.lunarToSolar(2021, -5, 1), (e) => e.code === "NO_LEAP_MONTH");
  let found = false;
  for (let m = 1; m <= 12 && !found; m++) {
    if (Bazi.lunarMonthDays(2021, m) === 29) {
      found = true;
      assert.throws(() => Bazi.lunarToSolar(2021, m, 30), (e) => e.code === "BAD_LUNAR_DAY");
    }
  }
  assert.ok(found);
});

/* ---------------- 5. analysis sanity + distribution ---------------- */
const levels = {}, specials = {}, geju = {}, why = {};
seed = 42;
for (let i = 0; i < 3000; i++) {
  const t = Date.UTC(1950, 0, 1) + Math.floor(rnd() * (Date.UTC(2015, 0, 1) - Date.UTC(1950, 0, 1)));
  const w = bjWall(t);
  const c = Bazi.compute({ calendar: "solar", year: w.year, month: w.month, day: w.day, hour: w.hour, minute: w.minute, lat: 31.23, lon: 121.47, tz: "Asia/Shanghai", solarTime: "true", ziRule: "23" });
  levels[c.strength.level] = (levels[c.strength.level] || 0) + 1;
  if (c.strength.special) specials[c.strength.special] = (specials[c.strength.special] || 0) + 1;
  geju[c.geJu.name] = (geju[c.geJu.name] || 0) + 1;
  why[c.yongShen.why] = (why[c.yongShen.why] || 0) + 1;
  const sumPct = c.elements.pct.reduce((a, b) => a + b, 0);
  if (Math.abs(sumPct - 1) > 1e-9) throw new Error("element pct does not sum to 1");
  if (c.yongShen.use === c.yongShen.fav) throw new Error("use == fav");
}
test("strength levels are spread sensibly (no level above 60% of charts)", () => {
  const total = Object.values(levels).reduce((a, b) => a + b, 0);
  Object.keys(levels).forEach((k) => assert.ok(levels[k] / total < 0.6, k + " " + levels[k]));
  const strongShare = ((levels.strong || 0) + (levels["slightly-strong"] || 0) + (levels["extreme-strong"] || 0)) / total;
  assert.ok(strongShare > 0.25 && strongShare < 0.75, "strong share " + strongShare.toFixed(2));
});

/* ---------------- 6. 16-type + matching ---------------- */
global.window = {};
require(path.join(root, "js", "lab-content.js"));
require(path.join(root, "js", "lab-items.js"));
require(path.join(root, "js", "lab-reading.js"));
const LAB = global.window.LAB;
const Astro = require(path.join(root, "js", "astro.js"));
const TYPES = ["ISTJ", "ISFJ", "INFJ", "INTJ", "ISTP", "ISFP", "INFP", "INTP", "ESTP", "ESFP", "ENFP", "ENTP", "ESTJ", "ESFJ", "ENFJ", "ENTJ"];

test("item bank: 48 Likert items, 4 per facet keyed 2 + 2, 8 resilience, 4 validity, 6 pairs", () => {
  assert.strictEqual(LAB.items.length, 48);
  const facets = {};
  LAB.items.forEach((x) => {
    assert.ok(x.key === 1 || x.key === -1, x.id + " key");
    assert.ok(x.t && x.t.zh && x.t.en, x.id + " text");
    assert.ok(LAB.facets[x.f], x.id + " facet");
    facets[x.f] = facets[x.f] || { d: x.d, plus: 0, minus: 0 };
    assert.strictEqual(facets[x.f].d, x.d, x.f + " stays in one pair");
    facets[x.f][x.key > 0 ? "plus" : "minus"]++;
  });
  assert.strictEqual(Object.keys(facets).length, 12);
  Object.keys(facets).forEach((f) => assert.deepStrictEqual([facets[f].plus, facets[f].minus], [2, 2], f));
  assert.strictEqual(LAB.resilience.length, 8);
  assert.strictEqual(LAB.resilience.filter((x) => x.key > 0).length, 4);
  assert.strictEqual(LAB.validity.length, 4);
  LAB.validity.forEach((v) => assert.ok(v.kind === "instructed" ? v.want >= 1 && v.want <= 7 : v.kind === "infrequency", v.id));
  const byId = {};
  LAB.items.forEach((x) => { byId[x.id] = x; });
  assert.strictEqual(LAB.consistencyPairs.length, 6);
  LAB.consistencyPairs.forEach((p) => assert.ok(byId[p[0]] && byId[p[1]] && byId[p[0]].d === byId[p[1]].d, p.join("/")));
  const ids = new Set(LAB.items.concat(LAB.resilience, LAB.validity).map((x) => x.id));
  assert.strictEqual(ids.size, 60, "unique ids");
});
function answersFor(pref) {
  // pref: e.g. "INFJ" → strongly agree with every item pointing that way, strongly disagree otherwise
  const a = {};
  LAB.items.forEach((it) => {
    const wantFirst = pref.indexOf(it.d[0]) >= 0;
    a[it.id] = (it.key > 0) === wantFirst ? 7 : 1;
  });
  LAB.validity.forEach((v) => { a[v.id] = v.kind === "instructed" ? v.want : 1; });
  return a;
}
const META = { validity: LAB.validity, pairs: LAB.consistencyPairs };
test("scoring recovers every one of the 16 types from consistent answers, with high quality", () => {
  TYPES.forEach((ty) => {
    const r = T16.scoreType(LAB.items, answersFor(ty), META);
    assert.strictEqual(r.type, ty);
    Object.keys(r.dims).forEach((d) => assert.strictEqual(r.dims[d].band, "very-clear"));
    assert.deepStrictEqual(r.qualityFlags, [], ty + " flags");
    assert.ok(LAB.types[ty], "description for " + ty);
  });
});
test("all-neutral answers tie to INFP and are flagged", () => {
  const a = {};
  LAB.items.forEach((it) => { a[it.id] = 4; });
  const r = T16.scoreType(LAB.items, a);
  assert.strictEqual(r.type, "INFP");
  assert.ok(r.qualityFlags.indexOf("neutral") >= 0);
});
test("agreeing with everything cancels out and is flagged as acquiescence", () => {
  const a = {};
  LAB.items.forEach((it) => { a[it.id] = it.id.length % 2 ? 6 : 7; }); // not perfectly straight
  const r = T16.scoreType(LAB.items, a, META);
  Object.keys(r.dims).forEach((d) => assert.ok(Math.abs(r.dims[d].pctFirst - 50) <= 10, d));
  assert.ok(r.qualityFlags.indexOf("acquiescence") >= 0, r.qualityFlags.join());
});
test("failed attention items and contradictory pairs are flagged", () => {
  const a = answersFor("ENTJ");
  a.v1 = 1; // asked to choose Agree
  a.v2 = 7; // agreed with an impossible statement
  LAB.consistencyPairs.forEach((p) => { a[p[1]] = 8 - a[p[1]]; });
  const r = T16.scoreType(LAB.items, a, META);
  assert.ok(r.qualityFlags.indexOf("attention") >= 0);
  assert.strictEqual(r.indices.attentionFailed, 2);
  assert.ok(r.qualityFlags.indexOf("inconsistent") >= 0);
  assert.strictEqual(r.quality, "low");
});
test("self-reported type: parse, stack, clarity from how sure", () => {
  assert.deepStrictEqual(T16.parseCode("I'm an infj-t"), { type: "INFJ", at: "T" });
  assert.deepStrictEqual(T16.parseCode("ENTP (A)"), { type: "ENTP", at: "A" });
  assert.strictEqual(T16.parseCode("XYZW"), null);
  const r = T16.fromSelfReport("INFJ-T", { EI: "clear", JP: "slight" }, "16p");
  assert.strictEqual(r.type, "INFJ");
  assert.strictEqual(r.temperament, "NF");
  assert.deepStrictEqual(r.stack, ["Ni", "Fe", "Ti", "Se"]);
  assert.strictEqual(r.dims.EI.letter, "I");
  assert.ok(r.dims.EI.pctFirst < 20 && r.dims.JP.pctFirst > 50 && r.dims.JP.band === "slight");
  assert.strictEqual(r.quality, "self");
  assert.strictEqual(T16.scoreResilience(LAB.resilience, {}, "A").estimated, true);
});
test("function stacks", () => {
  assert.deepStrictEqual(T16.stack("INFJ"), ["Ni", "Fe", "Ti", "Se"]);
  assert.deepStrictEqual(T16.stack("ENTP"), ["Ne", "Ti", "Fe", "Si"]);
  assert.deepStrictEqual(T16.stack("ISTJ"), ["Si", "Te", "Fi", "Ne"]);
  assert.deepStrictEqual(T16.stack("ESFP"), ["Se", "Fi", "Te", "Ni"]);
});
test("resilience scale: best answers 100, worst 0", () => {
  const best = {}, worst = {};
  LAB.resilience.forEach((it) => { best[it.id] = it.key > 0 ? 7 : 1; worst[it.id] = it.key > 0 ? 1 : 7; });
  assert.strictEqual(T16.scoreResilience(LAB.resilience, best).pct, 100);
  assert.strictEqual(T16.scoreResilience(LAB.resilience, worst).pct, 0);
});
test("every archetype key (element × temperament) exists", () => {
  [0, 1, 2, 3, 4].forEach((e) => ["NF", "NT", "SJ", "SP"].forEach((t) => assert.ok(LAB.archetypes[e + t], e + t)));
});
test("reading copy: paths for all 16 types, 12 signs, every blend line in both languages", () => {
  const both = (o, k) => assert.ok(o && o.zh && o.en, k);
  TYPES.forEach((ty) => {
    const c = LAB.careers[ty];
    assert.strictEqual(c.paths.length, 3, ty);
    c.paths.forEach((p, i) => { both(p.name, ty + i); both(p.d, ty + i); });
    both(c.research, ty); both(c.habit, ty);
    c.allies.forEach((a) => { assert.ok(LAB.types[a.type] && a.type !== ty, ty + " ally"); both(a.why, ty); });
  });
  assert.strictEqual(LAB.zodiac.length, 12);
  LAB.zodiac.forEach((z, i) => {
    assert.strictEqual(z.key, Astro.KEYS[i]);
    assert.strictEqual(z.element, Astro.elementOf(i));
    assert.strictEqual(z.modality, Astro.modalityOf(i));
    ["name", "sun", "moon", "rising"].forEach((k) => both(z[k], z.key + k));
  });
  Astro.ELEMENT.forEach((e) => ["NF", "NT", "SJ", "SP"].forEach((t) => both(LAB.signTemperament[e][t], e + t)));
  Astro.MODALITY.forEach((m) => ["J", "P"].forEach((j) => both(LAB.modalityJP[m][j], m + j)));
  [0, 1, 2, 3, 4].forEach((w) => { both(LAB.elementFlavour[w], "flavour" + w); Astro.ELEMENT.forEach((e) => both(LAB.eastWest[w][e], w + e)); });
});
test("matching: level and subject filters, budget effect, conflict filter", () => {
  const type = T16.scoreType(LAB.items, answersFor("INFJ"));
  const res = T16.scoreResilience(LAB.resilience, {});
  const c = chart({ year: 2005, month: 5, day: 20, hour: 10, minute: 0 });
  const run = (profile) => Match.run(profile, { type, resilience: res, chart: c }, { schools: LAB.schools });
  const fd = run({ level: "FD", disciplines: ["fine"], stage: 1, timeline: 1, budget: 4, city: "any" });
  assert.ok(fd.schools.length > 0);
  fd.schools.forEach((r) => assert.ok(r.school.levels.indexOf("FD") >= 0 && (r.school.disc.fine || 0) > 0));
  const ma = run({ level: "MA", disciplines: ["curating"], stage: 2, timeline: 1, budget: 1, city: "near" });
  assert.ok(ma.schools.length > 0);
  assert.ok(["HK", "SG"].indexOf(ma.schools[0].school.country) >= 0, "near + low budget favours HK/SG, got " + ma.schools[0].school.id);
  const ids = ["rca", "csm"];
  assert.strictEqual(Match.tutorsFor("critical", LAB.tutors, ids).length, 0, "tutor hidden when their schools are recommended");
  assert.strictEqual(Match.tutorsFor("critical", LAB.tutors, ["gsa"]).length, 1, "shown otherwise; disabled tutors stay hidden");
  ma.schools.forEach((r) => assert.ok(r.score >= 0 && r.score <= 100));
});

/* ---------------- 7. star signs ---------------- */
const TERM_NAMES = ["冬至", "小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪"];
function angle(a, b) { const d = Math.abs(a - b) % 360; return Math.min(d, 360 - d); }
test("Sun longitude hits every solar term 1950–2040 within 0.02° (立春 = 315°)", () => {
  let worst = 0;
  for (let y = 1950; y <= 2040; y++) {
    const tb = lunar.Solar.fromYmd(y, 6, 1).getLunar().getJieQiTable();
    Object.keys(tb).forEach((k) => {
      const i = TERM_NAMES.indexOf(k);
      if (i < 0) return;
      worst = Math.max(worst, angle(Astro.sunLongitude(jieInstant(y, k)), (270 + 15 * i) % 360));
    });
  }
  assert.ok(worst < 0.02, "worst " + worst);
});
test("Moon longitude: Meeus example 47.a and every lunar new moon 1950–2040", () => {
  assert.ok(angle(Astro.moonLongitude(Date.UTC(1992, 3, 12) - 59000), 133.162655) < 0.02);
  for (let y = 1950; y < 2040; y++) {
    for (let m = 1; m <= 12; m++) {
      const s = lunar.Lunar.fromYmd(y, m, 1).getSolar();
      const t0 = Date.UTC(s.getYear(), s.getMonth() - 1, s.getDay()) - 8 * 3600000;
      const el = (t) => ((Astro.moonLongitude(t) - Astro.sunLongitude(t) + 540) % 360) - 180;
      assert.ok(el(t0) <= 0.3 && el(t0 + 86400000) >= -0.3, "new moon on 初一 " + y + "-" + m);
    }
  }
});
test("Rising: the ascendant sits on the eastern horizon", () => {
  let seed = 11;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (let i = 0; i < 500; i++) {
    const t = Date.UTC(1940, 0, 1) + rnd() * 3.4e12, lat = -64 + rnd() * 128, lon = -180 + rnd() * 360;
    const asc = Astro.ascendant(t, lat, lon) * Math.PI / 180, e = Astro.obliquity(t) * Math.PI / 180;
    const ra = Math.atan2(Math.sin(asc) * Math.cos(e), Math.cos(asc)), dec = Math.asin(Math.sin(e) * Math.sin(asc));
    const H = Astro.lst(t, lon) * Math.PI / 180 - ra, p = lat * Math.PI / 180;
    const alt = Math.asin(Math.sin(p) * Math.sin(dec) + Math.cos(p) * Math.cos(dec) * Math.cos(H));
    assert.ok(Math.abs(alt) < 1e-6 && Math.sin(H) < 0, "lat " + lat);
  }
  assert.strictEqual(Astro.ascendant(Date.now(), 70, 20), null, "polar");
});
test("signs(): known date, unknown time and cusp handling", () => {
  const c = chart({ year: 2000, month: 1, day: 1, hour: 12, minute: 0 });
  const s = Astro.signs(c);
  assert.strictEqual(Astro.KEYS[s.sun], "capricorn");
  assert.ok(s.rising != null);
  const n = Astro.signs(chart({ year: 2000, month: 1, day: 1, hour: null, minute: null }));
  assert.strictEqual(n.rising, null);
  assert.strictEqual(Astro.KEYS[n.sun], "capricorn");
  // 2024 spring equinox: 2024-03-20 11:06 Beijing → cusp of Pisces/Aries
  const eq = Astro.signs(chart({ year: 2024, month: 3, day: 20, hour: null, minute: null }));
  assert.ok(eq.sunCusp);
});

/* ---------------- 8. long-form report ---------------- */
["lab-report-type.js", "lab-report-chart.js", "lab-report-portfolio.js", "lab-report-plan.js"].forEach((f) => require(path.join(root, "js", f)));
const Report = require(path.join(root, "js", "report.js"));
const GEJU = ["正财格", "偏财格", "食神格", "伤官格", "正官格", "七杀格", "正印格", "偏印格", "建禄格", "月刃格", "月劫格"];
const MIN = { page: { en: 1000, zh: 2000 }, email: { en: 2000, zh: 4000 } }; // ≈ 2 A4 pages on the page, ≈ 4 more by email
function sampleReport(rnd) {
  const r = sampleReport0(rnd);
  const cs = ["UK", "HK", "SG"].filter((c) => c !== r.country), ms = Object.keys(LAB.mentors).filter((m) => m !== r.mentor);
  r.country2 = cs[Math.floor(rnd() * cs.length)];
  r.mentor2 = ms[Math.floor(rnd() * ms.length)];
  return r;
}
function sampleReport0(rnd) {
  const ty = TYPES[Math.floor(rnd() * 16)], gan = Math.floor(rnd() * 10), pick = (a) => a[Math.floor(rnd() * a.length)];
  const missing = [0, 1, 2, 3, 4].filter(() => rnd() < 0.2).slice(0, 2);
  return {
    type: ty, self: rnd() < 0.3,
    dims: { EI: ty[0] === "E" ? 51 + Math.floor(rnd() * 49) : Math.floor(rnd() * 50), SN: ty[1] === "S" ? 51 + Math.floor(rnd() * 49) : Math.floor(rnd() * 50), TF: ty[2] === "T" ? 51 + Math.floor(rnd() * 49) : Math.floor(rnd() * 50), JP: ty[3] === "J" ? 51 + Math.floor(rnd() * 49) : Math.floor(rnd() * 50) },
    element: Math.floor(gan / 2), dayMaster: gan, strength: pick(Object.keys(LAB.strengthLevels)), strongest: Math.floor(rnd() * 5),
    missing, hidden: missing.filter(() => rnd() < 0.5), use: Math.floor(rnd() * 5), avoid: [Math.floor(rnd() * 5)], geju: pick(GEJU),
    sun: Math.floor(rnd() * 12), moon: Math.floor(rnd() * 12), rising: rnd() < 0.3 ? null : Math.floor(rnd() * 12),
    resilience: Math.floor(rnd() * 101), mode5: pick(Object.keys(LAB.modes)), mentor: pick(Object.keys(LAB.mentors)),
    country: pick(["UK", "HK", "SG"]), country2: null, mentor2: null, // filled below: real results always rank all countries and mentor styles timeline: Math.floor(rnd() * 3), stage: Math.floor(rnd() * 4)
  };
}
test("report copy: every block exists in both languages", () => {
  const leaves = (o, at) => {
    if (o && typeof o === "object" && "zh" in o && "en" in o) { assert.ok(o.zh && o.en, at); return; }
    if (o && typeof o === "object") Object.keys(o).forEach((k) => leaves(o[k], at + "." + k));
    else assert.fail("unexpected leaf at " + at);
  };
  ["typeDeep", "dimNarrative", "functionsDeep", "pathsDeep", "dayMasterDeep", "strengthDeep", "elementBalance", "zodiacDeep", "resilienceDeep",
   "yongDeep", "gejuDeep", "elementPractice", "zodiacEmail", "projects", "portfolioShape", "critGuide", "interviewGuide", "plan12", "planTweaks", "matchDeep"]
    .forEach((k) => { assert.ok(LAB[k], k); leaves(LAB[k], k); });
  TYPES.forEach((ty) => assert.strictEqual(LAB.pathsDeep[ty].length, LAB.careers[ty].paths.length, ty));
  GEJU.forEach((g) => assert.ok(LAB.gejuDeep[g], g));
});
const lens = { page: { en: [], zh: [] }, email: { en: [], zh: [] } };
test("report length: ≥ 2 A4 pages before the email form, ≥ 4 more by email, for 300 random results", () => {
  let seed = 101;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (let i = 0; i < 300; i++) {
    const r = sampleReport(rnd);
    ["en", "zh"].forEach((lang) => {
      const rep = Report.compose(r, LAB, lang);
      const all = JSON.stringify(rep);
      assert.ok(!/undefined|\[object|NaN/.test(all), "gap in " + r.type + " " + lang);
      const p = Report.length(rep.page, lang), e = Report.length(rep.email, lang);
      lens.page[lang].push(p); lens.email[lang].push(e);
      assert.ok(p >= MIN.page[lang], `page ${lang} ${p} < ${MIN.page[lang]} for ${r.type}`);
      assert.ok(e >= MIN.email[lang], `email ${lang} ${e} < ${MIN.email[lang]} for ${r.type}`);
    });
  }
});
const lo = (a) => a.length ? Math.min(...a) : 0;
process.stdout.write(`Report length (min): page en ${lo(lens.page.en)} words, zh ${lo(lens.page.zh)} chars; email-only en ${lo(lens.email.en)} words, zh ${lo(lens.email.zh)} chars\n`);

process.stdout.write("\nStrength levels: " + JSON.stringify(levels) + "\nSpecial: " + JSON.stringify(specials) + "\n格局: " + JSON.stringify(geju) + "\n喜用 basis: " + JSON.stringify(why) + "\n");
process.stdout.write("\n" + passed + " passed, " + failed + " failed\n");
process.exit(failed ? 1 : 0);
