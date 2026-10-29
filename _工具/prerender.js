/*
 * Writes the rendered Chinese page back into site/index.html, so the full text is in the HTML itself
 * (Baidu and other crawlers, WeChat link previews, and anyone with JavaScript off see the content).
 * The page still renders from content.js when it loads, so edits to content.js show up immediately;
 * run this again after editing content.js to refresh the built-in copy.
 *
 *   node tools/prerender.js site        (needs Node 18+ and `npm i playwright`)
 */
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const dir = path.resolve(process.argv[2] || 'site'), file = path.join(dir, 'index.html');
(async () => {
  const b = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {}); const p = await b.newPage({ viewport: { width: 1440, height: 900 }, locale: 'zh-CN' });
  // start from the template without any previous prerender (sections emptied), so output is stable
  await p.goto('file://' + file + '?lang=zh', { waitUntil: 'load' }); await p.waitForTimeout(600);
  let html = await p.evaluate(() => {
    const d = document;
    d.documentElement.classList.remove('js'); if (!d.documentElement.className) d.documentElement.removeAttribute('class');
    d.querySelectorAll('.reveal.in').forEach(e => e.classList.remove('in'));
    d.querySelectorAll('[data-count]').forEach(e => e.textContent = e.getAttribute('data-count'));
    const g = d.getElementById('grain'); if (g) g.removeAttribute('style');
    d.getElementById('nav').className = 'nav';
    d.body.classList.remove('menu-open'); if (!d.body.className) d.body.removeAttribute('class');
    const lb = d.getElementById('langBtn'); lb && lb.querySelectorAll('.on').forEach(e => e.classList.remove('on'));
    d.querySelector('#langBtn [data-l="zh"]').classList.add('on');
    // Turnstile is live, per visitor: never save its script tag, frame or token into the static page.
    d.querySelectorAll('script[data-ag-turnstile], script[src*="challenges.cloudflare.com"]').forEach(e => e.remove());
    d.querySelectorAll('.cf-turnstile').forEach(e => { e.innerHTML = ''; e.removeAttribute('data-turnstile-rendered'); });
    // blank lines before </body> would otherwise pile up a little more on every run
    while (d.body.lastChild && d.body.lastChild.nodeType === 3 && !d.body.lastChild.textContent.trim()) d.body.lastChild.remove();
    d.body.appendChild(d.createTextNode('\n\n'));
    return '<!doctype html>\n' + d.documentElement.outerHTML + '\n';
  });
  // Chrome sometimes writes back an empty style="" on the grain layer depending on timing;
  // it means nothing, so drop it to keep the output identical from run to run.
  html = html.replace(/ style=""/g, '');
  fs.writeFileSync(file, html); await b.close(); console.log('prerendered', file, html.length, 'bytes');
})();
