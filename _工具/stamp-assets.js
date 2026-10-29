/*
 * Adds a content hash to every local script and stylesheet URL in the site's HTML (app.js?v=1a2b3c4d).
 * Cloudflare lets browsers keep .js/.css for hours, so without this a visitor can run an old script
 * against a new page after a deploy. HTML is not browser-cached, so a changed file gets a new URL at once.
 *   node _工具/stamp-assets.js site     (run by `npm run build`; safe to run again)
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SITE = path.resolve(process.argv[2] || 'site');
const hashes = new Map();
function hashOf(file) {
  if (!hashes.has(file)) hashes.set(file, fs.existsSync(file) ? crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0, 8) : null);
  return hashes.get(file);
}
function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? htmlFiles(p) : e.name.endsWith('.html') ? [p] : [];
  });
}

let stamped = 0;
for (const file of htmlFiles(SITE)) {
  const html = fs.readFileSync(file, 'utf8');
  const out = html.replace(/(<(?:script|link)\b[^>]*?\s(?:src|href)=")([^"?#]+\.(?:js|css))(?:\?v=[0-9a-f]+)?(")/g, (all, pre, url, post) => {
    if (/^(?:[a-z]+:)?\/\//i.test(url)) return all; // other sites
    const target = url.startsWith('/') ? path.join(SITE, url) : path.resolve(path.dirname(file), url);
    const h = hashOf(target);
    return h ? pre + url + '?v=' + h + post : all;
  });
  if (out !== html) { fs.writeFileSync(file, out); stamped++; }
}
console.log(`stamped asset URLs in ${stamped} html files`);
