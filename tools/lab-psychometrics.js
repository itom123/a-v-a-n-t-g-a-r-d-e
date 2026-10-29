/*
 * AG LAB item analysis: reliability per scale from the anonymous answers people agreed to share.
 *
 *   npx wrangler d1 execute ag-lab --remote --json \
 *     --command "SELECT type, quality, answers FROM submissions WHERE answers IS NOT NULL" > lab-answers.json
 *   node tools/lab-psychometrics.js lab-answers.json
 *
 * Prints, for each preference pair, each facet and the resilience scale: n, Cronbach's alpha and the
 * corrected item–total correlation of every item (low or negative values point to items worth
 * rewriting), plus the type distribution and how many answer sets failed the quality checks.
 * Keep the export file off GitHub: it is participant data.
 */
"use strict";
const fs = require("fs");
const path = require("path");

global.window = {};
require(path.join(__dirname, "..", "site", "lab", "js", "lab-content.js"));
require(path.join(__dirname, "..", "site", "lab", "js", "lab-items.js"));
const LAB = global.window.LAB;

const file = process.argv[2];
if (!file) { console.error("usage: node tools/lab-psychometrics.js lab-answers.json"); process.exit(1); }
const raw = JSON.parse(fs.readFileSync(file, "utf8"));
const rows = (Array.isArray(raw) ? raw.flatMap((r) => r.results || [r]) : raw.results || []);
const sets = rows.map((r) => ({ type: r.type, quality: r.quality, a: Object.fromEntries(JSON.parse(r.answers || "[]")) }));

function mean(xs) { return xs.reduce((s, x) => s + x, 0) / xs.length; }
function variance(xs) { const m = mean(xs); return xs.reduce((s, x) => s + (x - m) * (x - m), 0) / (xs.length - 1); }
function corr(xs, ys) {
  const mx = mean(xs), my = mean(ys);
  let sxy = 0, sxx = 0, syy = 0;
  xs.forEach((x, i) => { sxy += (x - mx) * (ys[i] - my); sxx += (x - mx) ** 2; syy += (ys[i] - my) ** 2; });
  return sxx && syy ? sxy / Math.sqrt(sxx * syy) : NaN;
}

/** items: [{id, key}] keyed so higher = the scale's pole; uses complete cases only. */
function analyse(name, items) {
  const data = sets.filter((s) => items.every((it) => s.a[it.id] >= 1)).map((s) => items.map((it) => (it.key < 0 ? 8 - s.a[it.id] : s.a[it.id])));
  const n = data.length, k = items.length;
  if (n < 10) { console.log(`${name.padEnd(22)} n=${n} (need at least 10)`); return; }
  const cols = items.map((_, j) => data.map((row) => row[j]));
  const totals = data.map((row) => row.reduce((s, x) => s + x, 0));
  const alpha = (k / (k - 1)) * (1 - cols.reduce((s, c) => s + variance(c), 0) / variance(totals));
  console.log(`${name.padEnd(22)} n=${n}  k=${k}  alpha=${alpha.toFixed(2)}`);
  items.forEach((it, j) => {
    const rest = data.map((row, i) => totals[i] - row[j]);
    console.log(`   ${it.id.padEnd(6)} r(item, rest)=${corr(cols[j], rest).toFixed(2)}  mean=${mean(cols[j]).toFixed(2)}`);
  });
}

console.log(`AG LAB item analysis · ${sets.length} answer sets\n`);
["EI", "SN", "TF", "JP"].forEach((d) => analyse(d, LAB.items.filter((x) => x.d === d)));
console.log("");
Object.keys(LAB.facets).forEach((f) => analyse("facet " + f, LAB.items.filter((x) => x.f === f)));
console.log("");
analyse("resilience", LAB.resilience);

const types = {};
sets.forEach((s) => { const t = String(s.type || "").slice(0, 4); types[t] = (types[t] || 0) + 1; });
console.log("\nTypes: " + Object.keys(types).sort((a, b) => types[b] - types[a]).map((t) => `${t} ${types[t]}`).join(" · "));
const q = {};
sets.forEach((s) => { q[s.quality] = (q[s.quality] || 0) + 1; });
console.log("Answer quality: " + JSON.stringify(q));
