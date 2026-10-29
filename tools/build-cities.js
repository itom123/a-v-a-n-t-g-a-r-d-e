#!/usr/bin/env node
/*
 * Builds site/lab/data/cities.js from the GeoNames files fetched by fetch-data.sh.
 *   node tools/build-cities.js
 *
 * window.AG_CITIES  = [[中文名, English, 省/州(zh), 国家代码, lat, lon, tz, population, admin(en)?], …]
 * window.AG_COUNTRY = {CN: ["中国", "China"], …}
 *
 * CN/HK/MO/TW: every city in cities15000, with Chinese names from the GeoNames
 * alternate-names extracts. Elsewhere: cities of 50k+ people plus capitals and
 * first-level seats, with hand-curated Chinese names for the ones people know.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const FOREIGN_CN = require("./city-names-zh.js");

const root = path.join(__dirname, "..");
const cache = path.join(root, ".cache");
const GREATER_CN = ["CN", "HK", "MO", "TW"];
const FOREIGN_MIN_POP = 50000;

const tsv = (f) => fs.readFileSync(f, "utf8").split("\n").filter((l) => l && l[0] !== "#").map((l) => l.split("\t"));
const HAN = /^[㐀-鿿··]+$/;
const JA_ONLY = /[県広駅沢浜桜円町]/; // Japanese-only kanji that sneak into untagged alternates

const occDir = fs.readdirSync(path.join(cache, "pkg")).find((n) => n.startsWith("opencc-js-") && !n.endsWith(".tgz"));
if (!occDir) throw new Error("opencc-js missing from .cache/pkg; run tools/fetch-data.sh");
const OpenCC = require(path.join(cache, "pkg", occDir, "package", "dist", "umd", "t2cn.js"));
const toSimp = { TW: OpenCC.Converter({ from: "tw", to: "cn" }), HK: OpenCC.Converter({ from: "hk", to: "cn" }) };
toSimp.MO = toSimp.HK;
toSimp.CN = toSimp.HK;
const simp = (s, cc) => (s && toSimp[cc] ? toSimp[cc](s) : s);

/* ---------- Chinese names per geonameid, from the alternate-names extracts ---------- */
// columns: altId, geonameid, lang, name, isPreferred, isShort, isColloquial, isHistoric, from, to
const LANG_RANK = { "zh-CN": 3, "zh-Hans": 3, zh: 2, "zh-SG": 1, "zh-HK": 0, "zh-TW": 0, "zh-Hant": 0 };
const zhBest = new Map();
for (const cc of GREATER_CN) {
  for (const r of tsv(path.join(cache, "alt", cc + ".txt"))) {
    const lang = r[2], name = r[3];
    if (!(lang in LANG_RANK) || r[6] === "1" || r[7] === "1" || r[9] || !HAN.test(name)) continue;
    // preferred > short > simplified tag > shorter name
    const score = (r[4] === "1" ? 400 : 0) + (r[5] === "1" ? 200 : 0) + LANG_RANK[lang] * 20 - name.length;
    const cur = zhBest.get(r[1]);
    if (!cur || score > cur.score) zhBest.set(r[1], { name, score });
  }
}
const zhName = (id) => (zhBest.get(id) || {}).name;

// Last resort: the untagged alternates column in cities15000 (闵行, 慈溪市 …).
// Prefer a name with a Chinese admin suffix, else the first Han-only one.
function zhFromAlternates(list) {
  const han = String(list || "").split(",").filter((s) => HAN.test(s) && s.length >= 2 && !JA_ONLY.test(s));
  return han.find((s) => /[市县区镇]$/.test(s)) || han[0];
}

// Fallback: cities15000 sometimes points at a duplicate record with no
// zh names while the full CN gazetteer has the named one (德阳, 常熟市 …).
// Match on base name (without Shi/Qu/Xian/District…) within 40 km.
// Admin records (class A: 诸城市, 常熟市) carry current names and win over town
// records (class P), whose untagged alternates can be historic (密州 for 诸城).
const baseName = (s) => String(s).toLowerCase().replace(/\b(shi|qu|xian|zhen|city|district|diqu|county)\b/g, "").replace(/[^a-z]/g, "");
const gazByName = new Map();
for (const r of tsv(path.join(cache, "gaz", "CN.txt"))) {
  const admin = r[6] === "A";
  if (!admin && r[6] !== "P") continue;
  const zh = zhName(r[0]) || (admin && zhFromAlternates(r[3]));
  if (!zh) continue;
  const k = baseName(r[2]);
  if (!gazByName.has(k)) gazByName.set(k, []);
  gazByName.get(k).push({ lat: +r[4], lon: +r[5], zh, admin });
}
function zhFromGazetteer(r) {
  let best = null, bd = Infinity;
  for (const g of gazByName.get(baseName(r[2])) || []) {
    const d = Math.hypot(g.lat - r[4], (g.lon - r[5]) * Math.cos(r[4] * Math.PI / 180)) * 111.2;
    const rank = d + (g.admin ? 0 : 1000); // any admin match within 40 km beats a town
    if (d < 40 && rank < bd) { bd = rank; best = g.zh; }
  }
  return best;
}

/* ---------- admin1 names ---------- */
const admin = new Map(); // "CN.30" -> {en, zh}
for (const [code, name, , id] of tsv(path.join(cache, "admin1CodesASCII.txt"))) {
  admin.set(code, { en: name, zh: zhName(id) });
}

/* ---------- countries ---------- */
const dnZh = new Intl.DisplayNames(["zh-Hans"], { type: "region" });
const dnEn = new Intl.DisplayNames(["en"], { type: "region" });
const COUNTRY_OVERRIDE = {
  HK: ["中国香港", "Hong Kong, China"],
  MO: ["中国澳门", "Macao, China"],
  TW: ["中国台湾", "Taiwan, China"]
};
const country = {};
for (const r of tsv(path.join(cache, "countryInfo.txt"))) {
  const cc = r[0];
  country[cc] = COUNTRY_OVERRIDE[cc] || [dnZh.of(cc), dnEn.of(cc)];
}

/* ---------- cities ---------- */
// cities15000 columns: 0 id, 1 name, 2 ascii, 3 alternates, 4 lat, 5 lon, 6 class, 7 code,
// 8 cc, 9 cc2, 10 admin1, 11-13 admin2-4, 14 population, 15 elevation, 16 dem, 17 tz
const rows = [];
const curatedSeen = new Set();
const sorted = tsv(path.join(cache, "cities15000.txt")).sort((a, b) => +b[14] - +a[14]);
for (const r of sorted) {
  const cc = r[8], pop = +r[14] || 0, tz = r[17];
  if (!tz) continue;
  const inCN = GREATER_CN.includes(cc);
  const key = cc + ":" + r[2];
  const curated = !curatedSeen.has(key) && FOREIGN_CN[key];
  if (!inCN && !curated && pop < FOREIGN_MIN_POP && !/^PPL(C|A)$/.test(r[7])) continue;
  if (curated) curatedSeen.add(key);

  const adm = admin.get(cc + "." + r[10]) || {};
  const en = r[1] || r[2]; // real spelling (Ürümqi, Köln); the page folds accents when searching
  let zh = inCN ? simp(zhName(r[0]) || (cc === "CN" && zhFromGazetteer(r)) || zhFromAlternates(r[3]), cc) : curated;
  if (zh && zh.length > 2) zh = zh.replace(/市$|(?<!新)区$/, ""); // 深圳市 → 深圳; keep 沙市, 浦东新区
  // Taiwan's admin1 (台湾省/福建省/台北市…) only adds noise next to 中国台湾
  let admZh = "", admEn = cc === "TW" ? "" : adm.en || "";
  if (inCN && cc !== "TW") {
    admZh = simp(adm.zh || "", cc).replace(/(维吾尔|壮族|回族)?自治区$|特别行政区$|[省市]$/, "");
  }
  if (admZh === zh) admZh = "";
  if (admEn === en) admEn = "";

  const rec = [zh || en, en, admZh || admEn, cc, +(+r[4]).toFixed(4), +(+r[5]).toFixed(4), tz, pop];
  if (admZh && admEn) rec.push(admEn);
  rows.push(rec);
}

const missing = Object.keys(FOREIGN_CN).filter((k) => !curatedSeen.has(k));
if (missing.length) console.warn("curated names with no GeoNames match:", missing.join(", "));

const out = path.join(root, "site", "lab", "data", "cities.js");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out,
  "/* Generated by tools/build-cities.js from GeoNames (CC BY 4.0, geonames.org). Do not edit. */\n" +
  "window.AG_COUNTRY=" + JSON.stringify(country) + ";\n" +
  "window.AG_CITIES=" + JSON.stringify(rows) + ";\n");

const cn = rows.filter((r) => GREATER_CN.includes(r[3]));
console.log("cities:", rows.length, "(greater China " + cn.length + ", with Chinese name " +
  cn.filter((r) => r[0] !== r[1]).length + ")", "size:", (fs.statSync(out).size / 1024).toFixed(0) + " KB");
