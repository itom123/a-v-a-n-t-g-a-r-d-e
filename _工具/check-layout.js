// usage: node check.js <siteDir>  -> prints text overflow / misalignment findings per lang/width
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.resolve(process.argv[2]);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'application/javascript', '.svg':'image/svg+xml', '.png':'image/png', '.woff2':'font/woff2' };
const srv = http.createServer((q, r) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; const f = path.join(root, p); fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' }); r.end(d); }); });
const W = (process.env.WIDTHS || '1920,1440,1280,1180,1081,1024,900,768,641,600,414,390,375,360,320').split(',').map(Number);
(async () => {
  await new Promise(r => srv.listen(0, r)); const port = srv.address().port;
  const browser = await chromium.launch();
  for (const lang of ['zh', 'en']) for (const w of W) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } }); await ctx.route(/challenges\.cloudflare\.com/, (r) => r.abort()); const page = await ctx.newPage();
    const errs = []; page.on('pageerror', e => errs.push(String(e)));
    await page.goto(`http://localhost:${port}/${process.env.PAGE||'index.html'}?lang=${lang}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important}.reveal{opacity:1!important;transform:none!important}' });
    await page.evaluate(() => document.querySelectorAll('[data-count]').forEach(e => e.textContent = e.getAttribute('data-count')));
    const out = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth, res = [];
      const nm = el => (el.id ? '#' + el.id : '') + (typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/)[0] : '') + '<' + el.tagName.toLowerCase() + '>' + (el.textContent || '').trim().slice(0, 18);
      const clipAnc = el => { let p = el.parentElement; while (p && p !== document.body) { const o = getComputedStyle(p).overflowX; if (o !== 'visible' || /\b(prog|ally|person|offer|post|qa|field|facts__row|big)\b/.test(p.className)) return p; p = p.parentElement; } return document.documentElement; };
      document.querySelectorAll('main *, header *, footer *').forEach(el => {
        if (el.closest('svg,.marquee,.hero__fog,.foot__giant,.skip')) return;
        const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return;
        const hasText = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()); if (!hasText) return;
        if (el.closest('.nav__links') && !document.body.classList.contains('menu-open') && getComputedStyle(document.querySelector('.nav__links')).display === 'none') return;
        const rg = document.createRange(); rg.selectNodeContents(el); const tr = rg.getBoundingClientRect(); if (!tr.width) return;
        const a = clipAnc(el), ar = a === document.documentElement ? { left: 0, right: vw } : a.getBoundingClientRect();
        const pl = a === document.documentElement ? 0 : parseFloat(getComputedStyle(a).paddingLeft) , pr = a === document.documentElement ? 0 : parseFloat(getComputedStyle(a).paddingRight);
        if (tr.right > ar.right - pr + 1.5 || tr.left < ar.left + pl - 1.5) res.push(`OVER ${nm(el)} text[${tr.left|0},${tr.right|0}] box[${(ar.left+pl)|0},${(ar.right-pr)|0}]`);
        if (tr.right > vw || tr.left < 0) res.push(`OFFSCREEN ${nm(el)}`);
      });
      const c = s => { const e = document.querySelector(s); if (!e) return 'na'; const r = e.getBoundingClientRect(); const rg = document.createRange(); rg.selectNodeContents(e); const t = rg.getBoundingClientRect(); return Math.round((t.left + t.right) / 2 - vw / 2); };
      res.push('centre title ' + c('.hero__en') + ' zh ' + c('.hero__zh') + ' collab ' + c('#collab') + ' kicker ' + c('.hero__kicker') + ' lead ' + c('.hero__lead') + ' quote ' + c('.quote p'));
      return res;
    });
    console.log(`--- ${lang} ${w}`); out.forEach(l => console.log('  ' + l)); errs.forEach(e => console.log('  ERR ' + e));
    await ctx.close();
  }
  await browser.close(); srv.close();
})();
