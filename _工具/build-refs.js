/* Reference screenshots per section + image assets for drag-and-drop builders.  node tools/build-refs.js site out/平台实施包 */
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path'), http = require('http');
const SITE = path.resolve(process.argv[2] || 'site'), OUT = path.resolve(process.argv[3] || 'out/平台实施包');
const REF = path.join(OUT, '02-参考截图'), IMG = path.join(OUT, '03-素材图');
const SECTIONS = [['top', '01-首屏'], ['facts', '02-数字条'], ['alliance', '03-三方合作'], ['programmes', '04-课程'], ['journey', '05-路径'], ['faculty', '06-导师'], ['results', '07-成果'], ['journal', '08-内容'], ['lab', '09-测试入口'], ['faq', '10-常见问题'], ['contact', '11-联系'], ['foot', '12-页脚']];
// one page of each subpage format, full length, phone and desktop
const SUBS = [['journal/index.html', '内容-文章列表'], ['journal/curator-day.html', '内容-文章'], ['programmes/masterclass.html', '课程-国际大师课'], ['programmes/advanced-studio.html', '课程-进阶创作课'],
  ['programmes/applications.html', '课程-申请与衔接'], ['programmes/summer-lab.html', '课程-夏季工作营'], ['faculty/xg.html', '导师-XG'], ['alliance/index.html', '三方合作-详情']];
const T = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'application/javascript', '.svg':'image/svg+xml', '.png':'image/png', '.woff2':'font/woff2' };
const fsx = require('fs');
const srv = http.createServer((q, r) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; fs.readFile(path.join(SITE, p), (e, d) => { if (e) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': T[path.extname(p)] || 'application/octet-stream' }); r.end(d); }); });
const prep = async p => { await p.evaluate(() => document.fonts.ready); await p.addStyleTag({ content: '*,*::before,*::after{animation-play-state:paused!important;transition:none!important}.nav{display:none!important}' });
  await p.evaluate(() => { document.querySelectorAll('.reveal').forEach(e => e.classList.add('in')); document.querySelectorAll('[data-count]').forEach(e => e.textContent = e.getAttribute('data-count')); }); await p.waitForTimeout(300); };
(async () => {
  await new Promise(r => srv.listen(0, r)); const base = `http://localhost:${srv.address().port}/`; const b = await chromium.launch();
  for (const [lang, w, dpr] of [['zh', 1440, 1], ['zh', 390, 2], ['en', 1440, 1]]) {
    const dir = path.join(REF, `${lang}-${w}`); fs.mkdirSync(dir, { recursive: true });
    const p = await b.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: dpr }); await p.goto(base + '?lang=' + lang, { waitUntil: 'networkidle' }); await prep(p);
    for (const [id, name] of SECTIONS) { const el = await p.$('#' + id); if (!el || !(await el.isVisible())) continue; await el.screenshot({ path: path.join(dir, name + '.png') }); }
    await p.close();
  }
  // subpages: full-page references (the nav is hidden; the builder supplies its own)
  for (const [lang, w, dpr, tag] of [['zh', 1440, 1, 'zh-1440'], ['zh', 390, 2, 'zh-390']]) {
    const dir = path.join(REF, '子页面', tag); fs.mkdirSync(dir, { recursive: true });
    for (const [file, name] of SUBS) { if (!fs.existsSync(path.join(SITE, file))) continue;
      const p = await b.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: dpr }); await p.goto(base + file + '?lang=' + lang, { waitUntil: 'networkidle' }); await prep(p);
      await p.addStyleTag({ content: '.dock{display:none!important}' }); await (await p.$('#main')).screenshot({ path: path.join(dir, name + '.jpg'), type: 'jpeg', quality: 82 }); await p.close(); }   // long pages: JPEG keeps the pack small
  }
  fs.mkdirSync(IMG, { recursive: true });
  // hero background without text (desktop + phone)
  for (const [w, h, dpr, name] of [[1920, 1080, 1, '首屏背景-1920x1080.png'], [375, 667, 2, '首屏背景-手机-750x1334.png']]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: dpr }); await p.goto(base + '?lang=zh', { waitUntil: 'networkidle' }); await prep(p);
    await p.addStyleTag({ content: '.hero__center,.corner,.hero__scroll{visibility:hidden!important}.hero{min-height:' + h + 'px!important;height:' + h + 'px}' });
    await p.waitForTimeout(200); await (await p.$('#top')).screenshot({ path: path.join(IMG, name) }); await p.close();
  }
  // illustrations at 2x
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }); await p.goto(base + '?lang=zh', { waitUntil: 'networkidle' }); await prep(p);
  // illustrations: transparent outside the rounded corners, no film grain (add it in the builder if wanted)
  await p.addStyleTag({ content: 'html,body,.sec,.sec--grey,.sec--dark{background:transparent!important}.grain{display:none!important}' });
  const shot = (el, f) => el.screenshot({ path: f, omitBackground: true });
  const arts = await p.$$('.ally__art'); const an = ['三方插图-01-先端艺培.png', '三方插图-02-天际线.png', '三方插图-03-DBRF.png']; for (let i = 0; i < arts.length; i++) await shot(arts[i], path.join(IMG, an[i]));
  const posts = await p.$$('.post__art'); for (let i = 0; i < posts.length; i++) await shot(posts[i], path.join(IMG, `内容封面-0${i + 1}.png`));
  const pics = await p.$$('.person__pic'); const pn = ['导师占位-LD.png', '导师占位-XG.png', '导师占位-客座.png']; for (let i = 0; i < pics.length; i++) await shot(pics[i], path.join(IMG, pn[i]));
  // extended graphics as transparent PNGs (curved wordmark, speckled marks, pattern tiles)
  for (const [f, out, W, bg] of [['ag-arc.svg', '图形-弧形字-黑.png', 900], ['ag-mark-speck.svg', '图形-颗粒AG-黑.png', 1200], ['ag-stack-speck.svg', '图形-颗粒叠层-黑.png', 1000], ['pattern-arcs-ink.svg', '纹样-弧形字散布-黑-720.png', 720], ['pattern-arcs-paper.svg', '纹样-弧形字散布-白-720.png', 720]]) {
    const svgTxt = fsx.readFileSync(path.join(SITE, 'assets/img', f), 'utf8'); const vbx = svgTxt.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number); const H = Math.round(W * vbx[3] / vbx[2]);
    const q = await b.newPage({ viewport: { width: W, height: H } }); await q.setContent(`<html><body style="margin:0;background:transparent"><img src="data:image/svg+xml;base64,${Buffer.from(svgTxt).toString('base64')}" style="width:${W}px;height:${H}px;display:block"></body></html>`);
    await q.waitForTimeout(150); await q.screenshot({ path: path.join(IMG, out), omitBackground: true, clip: { x: 0, y: 0, width: W, height: H } }); await q.close(); }
  // grain tiles (transparent PNG): dark specks for light backgrounds, light specks for dark ones
  for (const [name, v] of [['颗粒纹理-深色颗粒-透明底-512.png', 0], ['颗粒纹理-浅色颗粒-透明底-512.png', 255]]) {
    const data = await p.evaluate(v => { const c = document.createElement('canvas'); c.width = c.height = 512; const x = c.getContext('2d'); const d = x.createImageData(512, 512);
      for (let i = 0; i < d.data.length; i += 4) { d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = Math.random() * 46 | 0; } x.putImageData(d, 0, 0); return c.toDataURL('image/png').split(',')[1]; }, v);
    fs.writeFileSync(path.join(IMG, name), Buffer.from(data, 'base64')); }
  await b.close(); srv.close(); console.log('refs + assets done');
})();
