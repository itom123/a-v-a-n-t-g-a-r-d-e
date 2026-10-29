// Flattens site/assets/js/content.js into rows {path, zh, en} for the copy deck.
const fs = require('fs'), vm = require('vm'); const src = fs.readFileSync(process.argv[2], 'utf8');
const ctx = { window: {} }; vm.runInNewContext(src, ctx); const S = ctx.window.SITE; const rows = [];
const SKIP = new Set(['key', 'art', 'dark', 'sample', 'hidden', 'initials', 'photo', 'formEndpoint', 'wechatQr', 'slug', 'link', 'href', 'draft']);
function walk(o, p) {
  if (o == null || typeof o === 'boolean') return;
  if (typeof o === 'string' || typeof o === 'number') { rows.push({ path: p, zh: String(o), en: String(o), same: true }); return; }
  if (Array.isArray(o)) { o.forEach((x, i) => walk(x, `${p}[${i}]`)); return; }
  if ('value' in o && typeof o.value === 'number') rows.push({ path: p + '.value', zh: (o.prefix || '') + o.value + (o.suffix || ''), en: (o.prefix || '') + o.value + (o.suffix || ''), same: true });
  if ('zh' in o && 'en' in o) {
    if (Array.isArray(o.zh)) o.zh.forEach((z, i) => rows.push({ path: `${p}[${i}]`, zh: z, en: o.en[i] || '' }));
    else rows.push({ path: p, zh: o.zh, en: o.en });
  }
  for (const k of Object.keys(o)) { if (k === 'zh' || k === 'en' || SKIP.has(k) || k === 'value' || k === 'suffix' || k === 'prefix') continue; walk(o[k], p ? p + '.' + k : k); }
}
walk(S, '');
// subpage copy (content-pages.js next to content.js); slug lists (related, tutors, leads, faq…) are not copy
const pagesFile = require('path').join(require('path').dirname(process.argv[2]), 'content-pages.js');
if (fs.existsSync(pagesFile)) {
  const c2 = { window: {} }; vm.runInNewContext(fs.readFileSync(pagesFile, 'utf8'), c2); const PG = c2.window.PAGES;
  const n0 = rows.length; walk(PG, 'PAGES');
  for (let i = rows.length - 1; i >= n0; i--) if (/\.(related|tutors|leads|faq|programmes)\[\d+\]$/.test(rows[i].path) || /\.draft$/.test(rows[i].path)) rows.splice(i, 1);
}
fs.writeFileSync(process.argv[3], JSON.stringify(rows, null, 1)); console.log(rows.length, 'rows');
