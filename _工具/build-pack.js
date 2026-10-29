/*
 * Builds 平台实施包 from site/: paste-in section code (light + standalone), reference screenshots,
 * image assets for drag-and-drop builders.   node tools/build-pack.js site out/平台实施包
 */
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const SITE = path.resolve(process.argv[2] || 'site'), OUT = path.resolve(process.argv[3] || 'out/平台实施包');
const CODE = path.join(OUT, '01-分区代码'), REF = path.join(OUT, '02-参考截图'), IMG = path.join(OUT, '03-素材图');
[CODE, REF, IMG].forEach(d => fs.mkdirSync(d, { recursive: true }));
const b64 = f => fs.readFileSync(path.join(SITE, 'assets/fonts', f)).toString('base64');
// images (motif SVGs) are embedded, so pasted code never points at files the builder doesn't have
const svgData = f => 'data:image/svg+xml;base64,' + fs.readFileSync(path.join(SITE, 'assets/img', f)).toString('base64');
const embed = html => html.replace(/src="[^"]*assets\/img\/([\w-]+\.svg)"/g, (m, f) => `src="${svgData(f)}"`);
const CSS = fs.readFileSync(path.join(SITE, 'assets/css/style.css'), 'utf8').replace(/url\(\.\.\/img\/([\w-]+\.svg)\)/g, (m, f) => `url("${svgData(f)}")`);
const SECTIONS = [
  ['top', '01-首屏', 'Hero'], ['facts', '02-数字条', 'Facts'], ['alliance', '03-三方合作', 'Alliance'], ['programmes', '04-课程', 'Programmes'],
  ['journey', '05-路径', 'Journey'], ['faculty', '06-导师', 'Faculty'], ['results', '07-成果', 'Results'], ['journal', '08-内容', 'Journal'],
  ['lab', '09-测试入口', 'AG Lab'], ['faq', '10-常见问题', 'FAQ'], ['contact', '11-联系', 'Contact'], ['foot', '12-页脚', 'Footer']];
// subpages (round 3): one standalone code file each, from the rendered pages in site/
const vm = require('vm'); const cx = { window: {} }; vm.createContext(cx);
vm.runInContext(fs.readFileSync(path.join(SITE, 'assets/js/content.js'), 'utf8'), cx);
const SC = cx.window.SITE, zhOf = v => String(v && typeof v === 'object' ? v.zh : v).replace(/\u200b/g, '').replace(/[\\/:*?"<>|？，。、「」：；]/g, '').slice(0, 18);
const SUBPAGES = [];
if (!SC.journal.hidden) { SUBPAGES.push(['journal/index.html', '内容-00-文章列表']); SC.journal.items.forEach((it, i) => it.slug && SUBPAGES.push([`journal/${it.slug}.html`, `内容-0${i + 1}-${zhOf(it.t)}`])); }
if (!SC.programmes.hidden) [...SC.programmes.items, SC.programmes.extra].forEach((it, i) => it && it.slug && SUBPAGES.push([`programmes/${it.slug}.html`, `课程-0${i + 1}-${zhOf(it.name)}`]));
if (!SC.faculty.hidden) SC.faculty.people.forEach(p => p.slug && !p.hidden && SUBPAGES.push([`faculty/${p.slug}.html`, `导师-${/[\u4e00-\u9fff]/.test(zhOf(p.name)) ? zhOf(p.name).split(' ')[0] : p.slug}`]));
if (!SC.alliance.hidden) SUBPAGES.push(['alliance/index.html', '三方合作-详情']);
const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
const EXTRA = `
/* ---- extras for builder pages ---- */
.agx { position: relative; overflow-x: hidden; --f-ui: "AGX Jost", "Helvetica Neue", Arial, var(--cjk); --f-body: "AGX Fira", "Helvetica Neue", Arial, var(--cjk); }
.agx h1, .agx h2, .agx h3, .agx p, .agx ul, .agx ol, .agx li, .agx blockquote, .agx figure, .agx dl, .agx dd { margin: 0; padding: 0; }
.agx h1, .agx h2, .agx h3 { font-size: inherit; font-weight: inherit; line-height: inherit; letter-spacing: normal; text-transform: none; color: inherit; }
.agx ul, .agx ol { list-style: none; }
.agx a:hover { color: inherit; }
.agx > section, .agx > footer { position: relative; }
.agx > section::after, .agx > footer::after { content: ""; position: absolute; top: 0; right: 0; bottom: 0; left: 0; pointer-events: none; z-index: 3; opacity: .09; mix-blend-mode: multiply; background-image: ${NOISE}; background-size: 180px; }
.agx .hero { padding-top: 88px; min-height: clamp(560px, 88vh, 960px); }
.agx .agx-cta { display: grid; gap: 18px; align-content: start; padding: clamp(24px, 3vw, 40px); border: 1.5px solid var(--line-d); border-radius: calc(var(--r) + 6px); }
.agx .agx-cta h3 { font: var(--w-display) clamp(24px, 2.4vw, 34px)/1.1 var(--f-display); text-transform: uppercase; }
.agx .agx-cta p { color: var(--grey-2); }
.agx .agx-cta .btn { justify-self: start; }
.agx .agx-cta .agx-cta__mail { color: var(--grey-2); font-size: 15px; text-decoration: underline; text-underline-offset: 3px; overflow-wrap: anywhere; }
`;
const FONTS_ALL = () => [
  ['AGX Display', 'archivo-black.woff2', '400 900', 'normal'], ['AGX Jost', 'jost.woff2', '300 700', 'normal'],
  ['AGX Fira', 'fira-400.woff2', '400', 'normal'], ['AGX Fira', 'fira-500.woff2', '500', 'normal'], ['AGX Fira', 'fira-700.woff2', '700', 'normal'], ['AGX Fira', 'fira-400i.woff2', '400', 'italic']]
  .map(([fam, f, w, st]) => `@font-face{font-family:"${fam}";src:url(data:font/woff2;base64,${b64(f)}) format("woff2");font-weight:${w};font-style:${st};font-display:swap}`).join('\n');
const FONT_DISPLAY = () => `@font-face{font-family:"AGX Display";src:url(data:font/woff2;base64,${b64('archivo-black.woff2')}) format("woff2");font-weight:400 900;font-display:swap}`;
const FONTS_LINKED = () => [['AGX Display', 'archivo-black.woff2', '400 900', 'normal'], ['AGX Jost', 'jost.woff2', '300 700', 'normal'], ['AGX Fira', 'fira-400.woff2', '400', 'normal'], ['AGX Fira', 'fira-500.woff2', '500', 'normal'], ['AGX Fira', 'fira-700.woff2', '700', 'normal'], ['AGX Fira', 'fira-400i.woff2', '400', 'italic']]
  .map(([fam, f, w, st]) => `@font-face{font-family:"${fam}";src:url(https://你的域名/fonts/${f}) format("woff2");font-weight:${w};font-style:${st};font-display:swap}`).join('\n');

const serve = () => { const http = require('http'); const T = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'application/javascript', '.svg':'image/svg+xml', '.png':'image/png', '.woff2':'font/woff2' };
  return http.createServer((q, r) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; fs.readFile(path.join(SITE, p), (e, d) => { if (e) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': T[path.extname(p)] || 'application/octet-stream' }); r.end(d); }); }); };

// Turns rendered sections into scoped, self-contained code (runs inside the page)
const EXTRACT = ({ CSS, SECTIONS, EXTRA, lang, mode }) => {
    const KF = ['drift1', 'drift2', 'drift3', 'tick', 'marquee', 'spin'];
    const drop = /(^|[\s>+~,(])(\.menu-open|\.nav|\.burger|\.skip|\.grain|\.lang\b|\.noscript|\.js\b|\.reveal|\[data-dark\])/;
    const scopeSel = sel => sel.split(/,(?![^(]*\))/).map(x => x.trim()).filter(x => !drop.test(' ' + x)).map(x => {
      if (x.startsWith('.agx')) return x;
      if (x === ':root' || x === 'html' || x === 'body') return '.agx';
      if (x.startsWith('html[lang="zh-CN"]')) return x.replace('html[lang="zh-CN"]', '.agx[lang="zh-CN"]');
      if (x === '*') return '.agx, .agx *';
      return '.agx ' + x;
    }).join(', ');
    // CSSOM folds top/right/bottom/left back into `inset`, which older in-app browsers ignore: expand it again
    const expandInset = t => t.replace(/(^|;\s*)inset:\s*([^;!]+?)(\s*!important)?\s*;/g, (m, pre, v, imp) => { const a = v.trim().split(/\s+/); const [T, R = T, B = T, L = R] = a; imp = imp || ''; return `${pre}top: ${T}${imp}; right: ${R}${imp}; bottom: ${B}${imp}; left: ${L}${imp};`; });
    const fixDecl = t => { t = expandInset(t); KF.forEach(k => t = t.replace(new RegExp('\\b' + k + '\\b', 'g'), 'agx-' + k)); return t.replace(/"AG Display"/g, '"AGX Display"').replace(/"Jost"/g, '"AGX Jost"').replace(/"Fira Sans"/g, '"AGX Fira"'); };
    const sheet = new CSSStyleSheet(); sheet.replaceSync(CSS + EXTRA);
    // flatten to [{media, sel, decl}] + keyframes
    const items = [], kfs = [];
    const walk = (rules, media) => { for (const r of rules) {
      if (r instanceof CSSStyleRule) { const s = scopeSel(r.selectorText); if (s) items.push({ media, sel: s, raw: r.selectorText, decl: fixDecl(r.style.cssText) }); }
      else if (r instanceof CSSMediaRule) walk(r.cssRules, r.conditionText);
      else if (r instanceof CSSKeyframesRule) kfs.push({ name: r.name, text: fixDecl(r.cssText) });
    } };
    walk(sheet.cssRules, null);
    const print = list => { let o = '', cur; const groups = []; list.forEach(i => { const g = groups.find(g => g.media === i.media && g === groups[groups.length - 1]); if (g) g.list.push(i); else groups.push({ media: i.media, list: [i] }); });
      return groups.map(g => { const body = g.list.map(i => `${i.sel} { ${i.decl} }`).join('\n'); return g.media ? `@media ${g.media} {\n${body}\n}` : body; }).join('\n'); };
    const fullCss = print(items) + '\n' + kfs.map(k => k.text).join('\n');

    // clone a section with inline SVG and namespaced ids
    const inline = root => { root.querySelectorAll('use').forEach(u => { const id = (u.getAttribute('href') || u.getAttribute('xlink:href') || '').slice(1); const sym = document.getElementById(id); if (!sym || sym.tagName.toLowerCase() !== 'symbol') return;
      const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); s.setAttribute('viewBox', sym.getAttribute('viewBox')); ['x', 'y', 'width', 'height'].forEach(a => u.hasAttribute(a) && s.setAttribute(a, u.getAttribute(a))); s.setAttribute('fill', 'currentColor');
      [...sym.childNodes].forEach(c => s.appendChild(c.cloneNode(true))); u.replaceWith(s); });
      root.querySelectorAll('[id]').forEach(e => e.id = 'agx-' + e.id); root.querySelectorAll('[href^="#"]').forEach(a => { const h = a.getAttribute('href'); if (h.length > 1) a.setAttribute('href', '#agx-' + h.slice(1)); });
      // links to other pages of the site → "#链接-programmes/masterclass.html" placeholders (see 00-使用说明.md)
      root.querySelectorAll('a[href]').forEach(a => { const h = a.getAttribute('href'); if (/^(#|mailto:|tel:|https?:)/.test(h)) return;
        const u = new URL(h, location.href), base = new URL('/', location.href); let pth = u.pathname.replace(base.pathname, '') || 'index.html'; if (pth.endsWith('/')) pth += 'index.html';
        a.setAttribute('href', '#链接-' + pth + (u.hash ? u.hash : '')); });
      root.querySelectorAll('.reveal').forEach(e => e.classList.remove('reveal', 'in')); root.querySelectorAll('[style]').forEach(e => e.removeAttribute('style'));
      ['data-count', 'data-t', 'data-dark', 'data-l'].forEach(a => root.querySelectorAll('[' + a + ']').forEach(e => e.removeAttribute(a)));
      root.querySelectorAll('[class=""]').forEach(e => e.removeAttribute('class')); return root; };
    const zh = lang === 'zh';
    const res = {};
    for (const [id] of SECTIONS) {
      // mode 'page': the whole <main> of a subpage becomes one block
      const src = mode === 'page' ? (() => { const d = document.createElement('div'); [...document.getElementById('main').children].forEach(ch => d.appendChild(ch.cloneNode(true))); return d; })() : document.getElementById(id);
      if (!src || src.hidden) continue;
      const c = inline(src.cloneNode(true)); c.id = 'agx-' + id;
      if (id === 'contact') { const f = c.querySelector('form'); const box = document.createElement('div'); box.className = 'agx-cta';
        const mail = window.SITE.meta.email;
        box.innerHTML = `<h3>${zh ? '预约作品集评估' : 'Book a portfolio review'}</h3><p>${zh ? '填一份简短的评估表，我们会在两个工作日内通过微信或邮件联系你。' : 'Fill in a short form and we’ll reply by WeChat or email within two working days.'}</p>` +
          `<!-- 把下一行 href 里的 #替换为表单链接 换成真实表单地址（如腾讯问卷、金数据、问卷星），或删掉这个按钮、改放平台自带的表单模块 -->\n<a class="btn btn--light" href="#替换为表单链接">${zh ? '填写评估表' : 'Open the form'} <i aria-hidden="true">→</i></a>` +
          `<a class="agx-cta__mail" href="mailto:${mail}">${zh ? '或发邮件：' : 'Or email '}${mail}</a>`;
        f.replaceWith(box); const qr = c.querySelector('.qr-ph'); if (qr) qr.insertAdjacentHTML('beforebegin', '<!-- 微信二维码：把下面这个占位 div 换成 <img src="二维码图片地址" alt="微信二维码" width="132" height="132"> -->\n'); }
      const w = document.createElement('div'); w.className = 'agx'; w.setAttribute('lang', zh ? 'zh-CN' : 'en'); w.appendChild(c);
      document.body.appendChild(w);   // attach so selectors can be tested
      const strip = s => s.replace(/::?(hover|focus-visible|focus|checked|active|before|after|selection|-webkit-details-marker|placeholder)\b/g, '').replace(/:not\(\)/g, '');
      const used = items.filter(i => { if (i.sel === '.agx' || /^\.agx(\[lang[^\]]*\])?(,|$)/.test(i.sel)) return true;
        return i.sel.split(/,(?![^(]*\))/).some(s => { s = strip(s.trim()); if (s === '.agx' || s === '.agx *' || s.startsWith('.agx *')) return true; try { return w.matches(s) || !!w.querySelector(s.replace(/^\.agx(\[lang="zh-CN"\])?\s*/, m => m) ); } catch (e) { return false; } }); });
      const usedKf = kfs.filter(k => used.some(i => i.decl.includes(k.name.replace(/^agx-/, 'agx-').replace(/^(?!agx-)/, 'agx-'))));
      res[id] = { html: w.outerHTML, css: print(used) + '\n' + usedKf.map(k => k.text).join('\n') };
      w.remove();
    }
    return { fullCss, res };
};

(async () => {
  const srv = serve(); await new Promise(r => srv.listen(0, r)); const base = `http://localhost:${srv.address().port}/`;
  const browser = await chromium.launch();
  for (const lang of ['zh', 'en']) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(base + '?lang=' + lang, { waitUntil: 'networkidle' }); await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: '*,*::before,*::after{animation-play-state:paused!important;transition:none!important}' });
    await page.evaluate(() => { document.querySelectorAll('.reveal').forEach(e => e.classList.add('in')); document.querySelectorAll('[data-count]').forEach(e => e.textContent = e.getAttribute('data-count')); });
    const out = await page.evaluate(EXTRACT, { CSS, SECTIONS, EXTRA, lang });

    // write snippets
    const dl = path.join(CODE, '轻量版', lang), ds = path.join(CODE, '独立版', lang); [dl, ds].forEach(d => fs.mkdirSync(d, { recursive: true }));
    const L = lang === 'zh' ? 'zh-CN' : 'en';
    fs.writeFileSync(path.join(dl, '00-全局样式.html'), `<!-- 先端艺培 Avantgarde Studio · 全局样式（${lang}）\n  放在网站级的自定义代码里（凡科：设置 › 高级设置 › 网站插件代码；上线了：网站设置里的自定义代码），整个网站只放一次。\n  轻量版的各分区代码都依赖它。 -->\n<style>\n${out.fullCss}\n</style>\n`);
    if (lang === 'zh') {
      fs.writeFileSync(path.join(CODE, '轻量版', '00-字体-内嵌版.html'), `<!-- 品牌英文字体（Archivo Black / Jost / Fira Sans，SIL OFL 可商用），已内嵌，无需外链。\n  和 00-全局样式 一起放在网站级代码里。平台限制代码长度时，改用 00-字体-外链版.html。\n  不放字体也能用：英文会退回系统字体，中文本来就用系统字体。 -->\n<style>\n${FONTS_ALL()}\n</style>\n`);
      fs.writeFileSync(path.join(CODE, '轻量版', '00-字体-外链版.html'), `<!-- 把 site/assets/fonts/ 里这 6 个 woff2 文件上传到你能控制的地址（对象存储、CDN 或网站自己的文件库），\n  再把下面的 https://你的域名/fonts/ 全部换成真实地址。 -->\n<style>\n${FONTS_LINKED()}\n</style>\n`);
    }
    const headL = (n, en) => `<!-- 先端艺培 Avantgarde Studio · ${n}（${en}）· 轻量版\n  用法：新增一个「HTML 代码 / 插件代码 / 自定义代码」模块，整段粘贴。需要网站级已放 00-全局样式.html。\n  模块请设为通栏（全宽）、上下边距 0。 -->\n`;
    const headS = (n, en) => `<!-- 先端艺培 Avantgarde Studio · ${n}（${en}）· 独立版\n  自带样式和标题字体，不依赖其他代码。适合平台把代码放进 iframe 显示的情况（上线了勾选「在iframe中显示」时），\n  或只想单独用这一块时。iframe 模式下请把模块高度设得比内容略高。 -->\n`;
    for (const [id, name, en] of SECTIONS) { const r = out.res[id]; if (!r) continue;
      fs.writeFileSync(path.join(dl, name + '.html'), headL(name, en) + embed(r.html) + '\n');
      fs.writeFileSync(path.join(ds, name + '.html'), headS(name, en) + `<style>\n${FONT_DISPLAY()}\n${r.css}\n</style>\n` + embed(r.html) + '\n'); }
    // preview pages
    const all = SECTIONS.filter(([id]) => out.res[id]);
    fs.writeFileSync(path.join(CODE, `预览-轻量版-${lang}.html`), `<!doctype html><html lang="${L}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>预览 · 轻量版 · ${lang}</title>\n${fs.readFileSync(path.join(CODE, '轻量版', '00-字体-内嵌版.html'), 'utf8')}${fs.readFileSync(path.join(dl, '00-全局样式.html'), 'utf8')}<style>body{margin:0}</style></head><body>\n` + all.map(([id, n]) => fs.readFileSync(path.join(dl, n + '.html'), 'utf8')).join('\n') + '</body></html>');
    fs.writeFileSync(path.join(CODE, `预览-独立版-${lang}.html`), `<!doctype html><html lang="${L}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>预览 · 独立版 · ${lang}</title><style>body{margin:0}</style></head><body>\n` + all.map(([id, n]) => fs.readFileSync(path.join(ds, n + '.html'), 'utf8')).join('\n') + '</body></html>');
    await page.close();
  }
  // ---------- subpages: one standalone file each (paste into a new page on the builder) ----------
  for (const lang of ['zh', 'en']) {
    const dir = path.join(CODE, '子页面', lang); fs.mkdirSync(dir, { recursive: true });
    for (const [file, name] of SUBPAGES) {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(base + file + '?lang=' + lang, { waitUntil: 'networkidle' }); await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('in')));
      const out = await page.evaluate(EXTRACT, { CSS, SECTIONS: [['page', name]], EXTRA, lang, mode: 'page' });
      const r = out.res.page; if (!r) { await page.close(); continue; }
      fs.writeFileSync(path.join(dir, name + '.html'), `<!-- 先端艺培 Avantgarde Studio · 子页面 · ${name}（${lang}）· 独立版\n  网站里对应 site/${file}。用法：在平台里新建一个页面，加一个「HTML 代码 / 插件代码」模块（通栏、上下边距 0），整段粘贴。\n  页头导航和页脚用平台自带的，或在上面放 12-页脚。\n  代码里 href="#链接-…" 是指向网站其他页面的占位，换成平台里对应页面的地址（对照表见 00-使用说明.md）。 -->\n<style>\n${FONT_DISPLAY()}\n${r.css}\n</style>\n` + embed(r.html) + '\n');
      await page.close();
    }
  }
  await browser.close(); srv.close(); console.log('snippets done');
})();
