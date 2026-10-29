/* Builds 视觉包: logo exports, avatars, backgrounds, XHS starter templates, brand sheet, video / WeChat / email formats.
   node _工具/build-visual.js site 视觉包            (everything)
   node _工具/build-visual.js site 视觉包 round4     (only the round-4 additions: 07-视频公众号邮件 and the article thumbnails) */
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const SITE = path.resolve(process.argv[2] || 'site'), OUT = path.resolve(process.argv[3] || 'out/视觉包'), TMP = path.resolve('vis');
const F = f => 'file://' + path.join(SITE, 'assets/fonts', f);
const svgFile = n => fs.readFileSync(path.join(SITE, 'assets/img', n + '.svg'), 'utf8');
const inner = s => s.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
const vb = s => s.match(/viewBox="([^"]+)"/)[1];
const LOGO = Object.fromEntries(['ag-mark', 'ag-wordmark', 'ag-lockup', 'ag-stack'].map(n => [n, { vb: vb(svgFile(n)), body: inner(svgFile(n)) }]));
const svg = (n, style = '', fill = 'currentColor') => `<svg viewBox="${LOGO[n].vb}" style="${style}" fill="${fill}" xmlns="http://www.w3.org/2000/svg">${LOGO[n].body}</svg>`;
const INK = '#0e0f0e', PAPER = '#f4f5f3', GREY = '#d6d6d5';
const NOISE = f => `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${f}' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
const BASE = `
@font-face{font-family:"AG Display";src:url(${F('archivo-black.woff2')}) format("woff2");font-weight:400 900}
@font-face{font-family:"Jost";src:url(${F('jost.woff2')}) format("woff2");font-weight:300 700}
@font-face{font-family:"Fira Sans";src:url(${F('fira-400.woff2')}) format("woff2");font-weight:400}
@font-face{font-family:"Fira Sans";src:url(${F('fira-500.woff2')}) format("woff2");font-weight:500}
@font-face{font-family:"Fira Sans";src:url(${F('fira-700.woff2')}) format("woff2");font-weight:700}
@font-face{font-family:"Fira Sans";src:url(${F('fira-400i.woff2')}) format("woff2");font-weight:400;font-style:italic}
:root{--ink:${INK};--paper:${PAPER};--grey:${GREY};--cjk:"Noto Sans CJK SC","Source Han Sans SC","PingFang SC",sans-serif;
 --display:"AG Display",var(--cjk);--ui:"Jost",var(--cjk);--body:"Fira Sans",var(--cjk)}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:transparent}
.f{position:relative;overflow:hidden;width:var(--w);height:var(--h)}
.f svg{display:block}
.grain::after{content:"";position:absolute;inset:0;background-image:${NOISE('.85')};background-size:calc(240px * var(--s) * 1.4);opacity:.16;mix-blend-mode:multiply;pointer-events:none;z-index:9}
.grain.dark::after{mix-blend-mode:screen;opacity:.10}
.fog{position:absolute;inset:-12%;filter:blur(calc(var(--w) * .055))}
.fog i{position:absolute;border-radius:50%}
.bg-fog-l{background:#d9dad8}.bg-fog-l .fog i{background:var(--ink)}
.bg-fog-d{background:var(--ink)}.bg-fog-d .fog i{background:#8a8b89}
.bg-ink{background:var(--ink);color:var(--paper)}.bg-paper{background:var(--paper)}.bg-grey{background:var(--grey)}
/* brand frame, after the VI pages: stacked name top-left, series bottom-left, mark bottom-right */
.tl{position:absolute;left:calc(60px*var(--s));top:calc(54px*var(--s));font:800 calc(30px*var(--s))/.98 var(--display);text-align:right;z-index:5}
.tr{position:absolute;right:calc(60px*var(--s));top:calc(50px*var(--s));font:800 calc(44px*var(--s))/1 var(--display);z-index:5}
.bl{position:absolute;left:calc(60px*var(--s));bottom:calc(52px*var(--s));font:400 calc(26px*var(--s))/1.2 var(--body);z-index:5}
.bl b{font-weight:700}
.br{position:absolute;right:calc(60px*var(--s));bottom:calc(50px*var(--s));width:calc(92px*var(--s));z-index:5}
.lt{color:var(--paper)}.dk{color:var(--ink)}
.bd{color:var(--paper);mix-blend-mode:difference}   /* reads on any background, like the corner labels on the site hero */
`;
const frame = (tone, num = '', series = '') => `<div class="tl ${tone}">AVANTGARDE<br>STUDIO</div>${num ? `<div class="tr ${tone}">${num}</div>` : ''}${series ? `<div class="bl ${tone}">${series}</div>` : ''}<div class="br ${tone}">${svg('ag-mark')}</div>`;
const fogL = `<div class="fog"><i style="width:120%;height:26%;left:-8%;top:34%;opacity:.55"></i><i style="width:90%;height:40%;right:-40%;bottom:-18%;opacity:1"></i><i style="width:84%;height:36%;left:-34%;bottom:-16%;opacity:.95"></i></div>`;
const fogD = `<div class="fog" style="filter:blur(calc(var(--w) * .07))"><i style="width:150%;height:22%;left:-30%;top:20%;opacity:.5;transform:rotate(-7deg)"></i><i style="width:130%;height:17%;left:-6%;top:47%;opacity:.38;transform:rotate(5deg)"></i><i style="width:120%;height:20%;left:-42%;bottom:4%;opacity:.3;transform:rotate(-3deg)"></i></div>`;
// --s scales the brand frame with the canvas; 1 = 1080px wide (landscape canvases scale by height instead)
const page = (w, h, body, extra = '') => `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><style>${BASE}${extra}</style></head><body style="--s:${(Math.min(w, h * 0.75) / 1080).toFixed(4)}"><div class="f" style="--w:${w}px;--h:${h}px">${body}</div></body></html>`;

(async () => {
  fs.mkdirSync(TMP, { recursive: true }); const b = await chromium.launch();
  const render = async (html, w, h, file, transparent = false) => { const tf = path.join(TMP, 'p.html'); fs.writeFileSync(tf, html);
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 }); await p.goto('file://' + tf); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(150);
    fs.mkdirSync(path.dirname(file), { recursive: true }); await p.screenshot({ path: file, omitBackground: transparent, clip: { x: 0, y: 0, width: w, height: h } }); await p.close(); };
  const L = path.join(OUT, '01-Logo'), C = path.join(OUT, '02-色彩与字体'), BG = path.join(OUT, '03-背景与纹理'), X = path.join(OUT, '04-小红书起步模板');
  // round 4 (video, WeChat, email, article thumbnails); `... round4` as the third argument builds only that part
  const R4 = () => require('./visual-round4.js')({ render, page, svg, frame, fogL, fogD, SITE, OUT, INK, PAPER, GREY });
  if (process.argv[4] === 'round4') { await R4(); await b.close(); console.log('round 4 done'); return; }

  // ---------- 01 Logo ----------
  const names = { 'ag-mark': '图形', 'ag-wordmark': '英文字体', 'ag-lockup': '图形文字组合', 'ag-stack': '叠层图形' };
  fs.mkdirSync(path.join(L, 'SVG'), { recursive: true });
  for (const [n, zh] of Object.entries(names)) {
    for (const [tone, col] of [['黑', INK], ['白', PAPER]]) fs.writeFileSync(path.join(L, 'SVG', `AG-${zh}-${tone}.svg`), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${LOGO[n].vb}" fill="${col}">${LOGO[n].body}</svg>\n`);
    const [, , vw, vh] = LOGO[n].vb.split(/\s+/).map(Number);
    for (const W of [2048, 512]) { const H = Math.round(W * vh / vw);
      for (const [tone, col] of [['黑', INK], ['白', PAPER]]) await render(page(W, H, svg(n, `width:${W}px;height:${H}px`, col)), W, H, path.join(L, `PNG-透明底-${W}`, `AG-${zh}-${tone}-${W}w.png`), true); }
  }
  // horizontal lockup for builder headers (mark + wordmark, same spacing as the site nav)
  for (const [tone, col] of [['黑', INK], ['白', PAPER]]) for (const Hh of [96, 240]) { const k = Hh / 27, Ww = Math.round((52 + 12 + 150) * k);
    await render(page(Ww, Hh, `<div style="display:flex;align-items:center;gap:${12 * k}px;height:${Hh}px;color:${col}">${svg('ag-mark', `width:${52 * k}px;height:${27 * k}px`)}${svg('ag-wordmark', `width:${150 * k}px;height:${18 * k}px`)}</div>`), Ww, Hh, path.join(L, '导航横版', `AG-导航横版-${tone}-${Hh}h.png`), true); }
  // avatars: mark sits well inside the circle crop used by XHS, WeChat and Douyin
  const av = (bg, col, extra = '') => page(1080, 1080, `<div class="f ${bg} grain ${bg === 'bg-ink' ? 'dark' : ''}" style="--w:1080px;--h:1080px;display:grid;place-items:center">${extra}<div style="position:relative;z-index:2;color:${col}">${svg('ag-mark', 'width:620px;height:317px')}</div></div>`);
  await render(av('bg-ink', PAPER), 1080, 1080, path.join(L, '头像', '头像-墨黑底-1080.png'));
  await render(av('bg-grey', INK), 1080, 1080, path.join(L, '头像', '头像-应用灰底-1080.png'));
  await render(av('bg-paper', INK), 1080, 1080, path.join(L, '头像', '头像-纸白底-1080.png'));
  await render(av('bg-fog-l', INK, fogL), 1080, 1080, path.join(L, '头像', '头像-雾状渐变-1080.png'));

  // ---------- 03 backgrounds ----------
  const sizes = [[1080, 1440, '小红书3比4'], [1080, 1920, '竖版9比16'], [1080, 1080, '方形1比1'], [1920, 1080, '横版16比9'], [900, 383, '公众号封面'], [1242, 1660, '小红书高清3比4']];
  for (const [w, h, tag] of sizes) {
    await render(page(w, h, `<div class="f bg-fog-l grain" style="--w:${w}px;--h:${h}px">${fogL}</div>`), w, h, path.join(BG, '雾状渐变-浅', `雾-浅-${tag}-${w}x${h}.png`));
    await render(page(w, h, `<div class="f bg-fog-d grain dark" style="--w:${w}px;--h:${h}px">${fogD}</div>`), w, h, path.join(BG, '雾状渐变-深', `雾-深-${tag}-${w}x${h}.png`));
  }
  for (const [w, h, tag] of [[1080, 1440, '小红书3比4'], [1080, 1920, '竖版9比16']]) for (const [tone, col] of [['黑', 'dk'], ['白', 'lt']])
    await render(page(w, h, `<div class="f" style="--w:${w}px;--h:${h}px">${frame(col, '01', '<b>系列名</b> Series')}</div>`), w, h, path.join(X, '透明角标', `角标-${tone}-${tag}-${w}x${h}.png`), true);

  // ---------- 04 XHS starter templates ----------
  const W = 1080, H = 1440;
  const T = {
    title: '标题写在这里<br>最多两行十四字', en: 'TITLE IN ENGLISH', lead: '一句话说明这篇笔记讲什么',
    series: '<b>系列名</b> Series'
  };
  const covA = txt => `<div class="f bg-fog-l grain" style="--w:${W}px;--h:${H}px">${fogL}${frame('bd', '01', T.series)}
    ${txt ? `<div style="position:absolute;inset:0;display:grid;place-items:center;text-align:center;z-index:4"><div style="display:grid;gap:30px;justify-items:center;padding:0 90px">
      <span style="font:500 28px/1 var(--ui);letter-spacing:.14em;padding:14px 26px;border:1.5px solid rgba(14,15,14,.4);border-radius:99px;background:rgba(244,245,243,.35)">小标签 · 01</span>
      <h1 style="font:700 104px/1.12 var(--cjk);letter-spacing:.02em">${T.title}</h1>
      <p style="font:800 58px/.92 var(--display)">${T.en}</p>
      <p style="font:400 32px/1.5 var(--cjk);color:#2a2b2a;max-width:18em">${T.lead}</p></div></div>` : ''}</div>`;
  const covB = txt => `<div class="f bg-ink grain dark" style="--w:${W}px;--h:${H}px;color:var(--paper)">
    <div style="position:absolute;right:-260px;bottom:-150px;width:1500px;opacity:1;color:var(--paper)">${svg('ag-mark', 'width:1500px;height:767px')}</div>${frame('bd', '02', T.series)}
    ${txt ? `<div style="position:absolute;left:72px;right:72px;top:250px;display:grid;gap:34px;z-index:4">
      <h1 style="font:700 112px/1.1 var(--cjk);letter-spacing:.02em">${T.title}</h1>
      <p style="font:800 60px/.92 var(--display)">${T.en}</p>
      <p style="font:400 32px/1.5 var(--cjk);color:#bdbebc">${T.lead}</p></div>` : ''}</div>`;
  const covC = txt => `<div class="f bg-grey grain" style="--w:${W}px;--h:${H}px">
    <div style="position:absolute;right:-70px;top:190px;color:var(--ink)">${svg('ag-stack', 'width:640px;height:626px')}</div>${frame('bd', '03', T.series)}
    ${txt ? `<div style="position:absolute;left:72px;right:72px;bottom:190px;display:grid;gap:28px;z-index:4">
      <p style="font:800 30px/1 var(--display);letter-spacing:.02em">NO. 03</p>
      <h1 style="font:700 108px/1.1 var(--cjk);letter-spacing:.02em">${T.title}</h1>
      <p style="font:400 32px/1.5 var(--cjk);color:#2a2b2a">${T.lead}</p></div>` : ''}</div>`;
  const inner = txt => `<div class="f bg-paper grain" style="--w:${W}px;--h:${H}px">${frame('bd', '04', T.series)}
    ${txt ? `<div style="position:absolute;left:72px;right:72px;top:200px;display:grid;gap:40px;z-index:4">
      <div style="display:flex;align-items:flex-end;gap:28px;border-bottom:3px solid var(--ink);padding-bottom:28px"><span style="font:800 120px/.8 var(--display);color:transparent;-webkit-text-stroke:3px var(--ink)">01</span><h2 style="font:700 64px/1.15 var(--cjk)">小标题写在这里</h2></div>
      <p style="font:400 36px/1.7 var(--cjk);color:#2a2b2a">正文每行不超过二十个字。一页放三到五段，段落之间空一行，读起来不累。</p>
      <ul style="list-style:none;display:grid;gap:0">${['要点一：一句话讲清楚', '要点二：配一个具体例子', '要点三：给出可以马上做的一步'].map((x, i) => `<li style="display:flex;gap:26px;align-items:baseline;padding:26px 0;border-top:1.5px solid rgba(14,15,14,.16);font:500 38px/1.4 var(--cjk)"><b style="font:800 34px/1 var(--display)">0${i + 1}</b>${x}</li>`).join('')}</ul>
      <p style="font:italic 400 28px/1.5 var(--body);color:#7d7e7c">English note in Fira Sans italic, optional.</p></div>` : ''}</div>`;
  const endP = txt => `<div class="f bg-ink grain dark" style="--w:${W}px;--h:${H}px;color:var(--paper)">${fogD}${frame('bd', '05', T.series)}
    ${txt ? `<div style="position:absolute;inset:0;display:grid;place-items:center;text-align:center;z-index:4"><div style="display:grid;gap:44px;justify-items:center">
      ${svg('ag-lockup', 'width:420px;height:271px;color:var(--paper)')}
      <h2 style="font:700 76px/1.2 var(--cjk)">预约一次作品集评估</h2>
      <div style="width:300px;height:300px;border-radius:24px;background:var(--paper);color:var(--ink);display:grid;place-items:center;font:500 28px/1.3 var(--cjk)">二维码放这里</div>
      <p style="font:400 30px/1.5 var(--cjk);color:#bdbebc">关注账号，或私信「评估」</p></div></div>` : ''}</div>`;
  const tpls = [['封面A-雾状渐变', covA], ['封面B-墨黑大图形', covB], ['封面C-应用灰叠层', covC], ['内页-纸白', inner], ['结尾页-墨黑', endP]];
  for (const [n, fn] of tpls) {
    await render(page(W, H, fn(true)), W, H, path.join(X, '样张', `${n}-1080x1440.png`));
    await render(page(W, H, fn(false)), W, H, path.join(X, '底图', `${n}-底图-1080x1440.png`));
  }

  // ---------- 02 brand sheet ----------
  const sw = (hex, name, note, dark) => `<div style="display:grid;gap:10px"><div style="height:150px;border-radius:14px;background:${hex};${hex === PAPER ? 'border:1.5px solid rgba(14,15,14,.16);' : ''}"></div><b style="font:600 22px var(--ui)">${name}</b><span style="font:400 18px/1.4 var(--body);color:#555">${hex.toUpperCase()}<br>${note}</span></div>`;
  const sheet = `<div class="f bg-paper grain" style="--w:1920px;--h:1080px">
   ${frame('dk', '', '<b>VI</b> <i>Design</i> · 视觉规范一页')}
   <div style="position:absolute;left:100px;right:100px;top:150px;display:grid;grid-template-columns:1.1fr 1fr;gap:90px">
    <div style="display:grid;gap:44px;align-content:start">
      <div style="display:flex;gap:56px;align-items:flex-end">${svg('ag-lockup', 'width:300px;height:194px;color:var(--ink)')}<div style="display:grid;gap:8px"><b style="font:700 64px/1 var(--cjk)">先端艺培</b><span style="font:800 44px/.95 var(--display)">AVANTGARDE<br>STUDIO</span></div></div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:22px">${sw(INK, '墨黑', '主色 · 文字 · 深色区块')}${sw(PAPER, '纸白', '底色')}${sw(GREY, '应用灰', '灰色区块 · 卡片')}${sw('#7d7e7c', '中灰', '次要文字')}</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:22px">
        <div style="aspect-ratio:1.4;border-radius:14px;background:var(--grey);display:grid;place-items:center;color:var(--ink)">${svg('ag-mark', 'width:62%;height:auto')}</div>
        <div style="aspect-ratio:1.4;border-radius:14px;background:var(--ink);display:grid;place-items:center;color:var(--paper)">${svg('ag-mark', 'width:62%;height:auto')}</div>
        <div style="aspect-ratio:1.4;border-radius:14px;background:var(--paper);border:1.5px solid rgba(14,15,14,.16);display:grid;place-items:center;color:var(--ink)">${svg('ag-wordmark', 'width:84%;height:auto')}</div>
        <div style="aspect-ratio:1.4;border-radius:14px;background:var(--grey);display:grid;place-items:center;color:var(--ink);overflow:hidden">${svg('ag-stack', 'width:44%;height:auto')}</div></div>
      <p style="font:400 22px/1.6 var(--cjk);color:#2a2b2a;max-width:40em">只用黑、白、灰，不加任何彩色。颗粒质感和雾状渐变来自 VI 封面；AG 图形可以放大、裁切、叠层，但不要拉伸、改色或加描边。</p>
    </div>
    <div style="display:grid;gap:26px;align-content:start">
      <div style="border-top:3px solid var(--ink);padding-top:18px"><span style="font:500 18px var(--ui);letter-spacing:.14em">英文标题 · ARCHIVO BLACK</span><p style="font:800 86px/.95 var(--display)">AVANTGARDE</p></div>
      <div style="border-top:1.5px solid rgba(14,15,14,.2);padding-top:18px"><span style="font:500 18px var(--ui);letter-spacing:.14em">中文标题 · 思源黑体 BOLD</span><p style="font:700 72px/1.1 var(--cjk)">伦敦大师课 × 上海陪跑</p></div>
      <div style="border-top:1.5px solid rgba(14,15,14,.2);padding-top:18px"><span style="font:500 18px var(--ui);letter-spacing:.14em">界面 · JOST 500–600</span><p style="font:600 44px/1.2 var(--ui)">Book a portfolio review</p></div>
      <div style="border-top:1.5px solid rgba(14,15,14,.2);padding-top:18px"><span style="font:500 18px var(--ui);letter-spacing:.14em">正文 · FIRA SANS</span><p style="font:400 30px/1.4 var(--body)">Portfolio and practice development.<br><i>VI Design</i> · <b>BRAND</b> Design</p></div>
    </div></div></div>`;
  await render(page(1920, 1080, sheet), 1920, 1080, path.join(C, '品牌规范一页-1920x1080.png'));
  // round 3: curved wordmark, scattered arcs, oval, speckled marks, more layouts, journal covers
  await require('./visual-extended.js')({ render, page, svg, frame, fogL, fogD, SITE, OUT, INK, PAPER, GREY });
  await R4();
  await b.close(); console.log('visual pack done');
})();
