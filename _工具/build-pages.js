/*
 * Writes the subpage files (journal, articles, programmes, tutors, alliance) from content.js + content-pages.js,
 * then fills each with its rendered Chinese copy (for Baidu, WeChat previews and no-JavaScript visitors) and
 * refreshes sitemap.xml. The pages still render live from content*.js when they load.
 *   node _工具/build-pages.js site          (Node 18+, `npm i playwright`)
 * Run it after adding, renaming or hiding an article, programme or tutor, or after editing their text.
 */
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path'), vm = require('vm');
const SITE = path.resolve(process.argv[2] || 'site');
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(SITE, 'assets/js/content.js'), 'utf8'), ctx);
vm.runInContext(fs.readFileSync(path.join(SITE, 'assets/js/content-pages.js'), 'utf8'), ctx);
const S = ctx.window.SITE, P = ctx.window.PAGES;
const zh = v => { const x = (v && typeof v === 'object' && !Array.isArray(v) ? v.zh : v) || ''; return typeof x === 'string' ? x.replace(/\u200b/g, '') : x; };
const index = fs.readFileSync(path.join(SITE, 'index.html'), 'utf8');
const sprite = index.match(/<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" style="display:none"[\s\S]*?<\/svg>/)[0];
const domain = (S.meta.domain || '').replace(/\/$/, '');

const pages = [];
if (!S.journal.hidden) {
  pages.push({ file: 'journal/index.html', spec: 'journal', title: zh(S.journal.title), desc: zh(P.journal.lead) });
  S.journal.items.forEach(it => it.slug && P.articles[it.slug] && pages.push({ file: `journal/${it.slug}.html`, spec: 'article:' + it.slug, title: zh(it.t), desc: zh(P.articles[it.slug].lead) }));
}
if (!S.programmes.hidden) [...S.programmes.items, S.programmes.extra].forEach(it => it && it.slug && P.programmes[it.slug] &&
  pages.push({ file: `programmes/${it.slug}.html`, spec: 'programme:' + it.slug, title: zh(it.name), desc: zh(P.programmes[it.slug].tagline) }));
// A hidden tutor (no written consent yet) keeps the page file so old links still work, but nothing about the
// person goes into it: not the title, description or share preview, which crawlers and WeChat read.
if (!S.faculty.hidden) S.faculty.people.forEach(p => p.slug && P.people[p.slug] &&
  pages.push(p.hidden
    ? { file: `faculty/${p.slug}.html`, spec: 'person:' + p.slug, title: '暂未公开', desc: '暂未公开', hidden: true }
    : { file: `faculty/${p.slug}.html`, spec: 'person:' + p.slug, title: zh(p.name), desc: zh(P.people[p.slug].bio)[0] || '' }));
if (!S.alliance.hidden) pages.push({ file: 'alliance/index.html', spec: 'alliance', title: zh(S.alliance.title), desc: zh(P.alliance.lead) });

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fullTitle = pg => pg.hidden ? `${pg.title} · Avantgarde Studio` : `${pg.title} · 先端艺培 Avantgarde Studio`;
const shell = pg => `<!doctype html>
<html lang="zh-CN"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="renderer" content="webkit">
<meta name="format-detection" content="telephone=no,email=no,address=no">
<script>document.documentElement.className += " js";</script>
<title>${esc(fullTitle(pg))}</title>
<meta name="description" content="${esc(pg.desc)}">
${pg.hidden ? '<meta name="robots" content="noindex">\n' : ''}<meta name="theme-color" content="#0e0f0e">
<meta property="og:type" content="${pg.spec.startsWith('article') ? 'article' : 'website'}">
<meta property="og:title" content="${esc(fullTitle(pg))}">
<meta property="og:description" content="${esc(pg.desc)}">
<meta property="og:image" content="${domain ? domain + '/' : '../'}assets/img/og.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="../favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="../assets/img/icon-512.png">
<link rel="preload" href="../assets/fonts/archivo-black.woff2" as="font" type="font/woff2" crossorigin="">
<link rel="stylesheet" href="../assets/css/style.css">
</head>
<body class="sub" data-page="${pg.spec}" data-root="../">
${sprite}
<div class="grain" id="grain" aria-hidden="true"></div>
<a class="skip" href="#main">跳到正文 / Skip to content</a>
<header class="nav" id="nav"></header>
<main id="main"></main>
<footer class="foot" id="foot" data-dark=""></footer>
<div class="dock" id="dock"></div>
<noscript><p class="noscript">语言切换需要开启 JavaScript。Language switch needs JavaScript.</p></noscript>
<script src="../assets/js/content.js"></script>
<script src="../assets/js/content-pages.js"></script>
<script src="../assets/js/page.js"></script>
</body></html>
`;

(async () => {
  for (const pg of pages) { fs.mkdirSync(path.dirname(path.join(SITE, pg.file)), { recursive: true }); fs.writeFileSync(path.join(SITE, pg.file), shell(pg)); }
  const b = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {}); const p = await b.newPage({ viewport: { width: 1440, height: 900 }, locale: 'zh-CN' });
  for (const pg of pages) {
    const file = path.join(SITE, pg.file);
    await p.goto('file://' + file + '?lang=zh', { waitUntil: 'load' }); await p.waitForTimeout(250);
    const html = await p.evaluate(keepTitle => {
      const d = document;
      // page.js retitles a hidden page while rendering; put the neutral title back
      if (keepTitle) d.title = keepTitle;
      d.documentElement.classList.remove('js'); if (!d.documentElement.className) d.documentElement.removeAttribute('class');
      d.querySelectorAll('.reveal.in').forEach(e => e.classList.remove('in'));
      const g = d.getElementById('grain'); if (g) g.removeAttribute('style');
      d.getElementById('nav').className = 'nav'; d.getElementById('dock').className = 'dock';
      d.body.classList.remove('menu-open');
      return '<!doctype html>\n' + d.documentElement.outerHTML + '\n';
    }, pg.hidden ? fullTitle(pg) : null);
    // an empty style="" that Chrome may write back on the grain layer means nothing; keep output stable
    fs.writeFileSync(file, html.replace(/ style=""/g, ''));
  }
  await b.close();
  // sitemap: home + every public subpage, both languages
  const urls = [''].concat(pages.filter(x => !x.hidden).map(x => x.file.replace(/index\.html$/, '')));
  fs.writeFileSync(path.join(SITE, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    urls.map(u => `  <url>\n    <loc>${domain}/${u}</loc>\n    <xhtml:link rel="alternate" hreflang="zh-CN" href="${domain}/${u}?lang=zh"/>\n    <xhtml:link rel="alternate" hreflang="en" href="${domain}/${u}?lang=en"/>\n    <changefreq>monthly</changefreq>\n  </url>`).join('\n') + '\n</urlset>\n');
  console.log('pages:', pages.map(x => x.file).join(', '));
})();
