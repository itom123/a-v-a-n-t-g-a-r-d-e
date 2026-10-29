/*
 * Round 3 additions to 视觉包 (called from build-visual.js): the extended graphics from the VI's 周边图形设计 pages
 * — curved wordmark, scattered-arc pattern, oval, speckled marks — as logo files, backgrounds, more XHS
 * layouts, ready-made covers for the journal articles, and a one-page guide to the extended system.
 * Everything is built from the logo vectors and _工具/build-motifs.js; nothing is redrawn by hand.
 */
const fs = require('fs'), path = require('path'), vm = require('vm');

module.exports = async function extended(o) {
  const { render, page, svg, frame, fogL, fogD, SITE, OUT, INK, PAPER, GREY } = o;
  const IMG = n => 'file://' + path.join(SITE, 'assets/img', n);
  const raw = n => fs.readFileSync(path.join(SITE, 'assets/img', n), 'utf8');
  const vbOf = s => s.match(/viewBox="([^"]+)"/)[1];
  const innerOf = s => s.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  const ARCS = { big: raw('ag-arc.svg'), small: raw('ag-arc-s.svg') };
  const arc = (k, style = '', fill = 'currentColor') => `<svg viewBox="${vbOf(ARCS[k])}" style="${style}" fill="${fill}" xmlns="http://www.w3.org/2000/svg">${innerOf(ARCS[k])}</svg>`;
  const L = path.join(OUT, '01-Logo'), BG = path.join(OUT, '03-背景与纹理'), X = path.join(OUT, '04-小红书起步模板'), C = path.join(OUT, '02-色彩与字体'), J = path.join(OUT, '05-内容封面');
  const EXTRA = `
.pat{position:absolute;inset:0;background-repeat:repeat;pointer-events:none}
.oval{position:absolute;border-radius:50%}
.outline{color:transparent;-webkit-text-stroke:calc(3px*var(--s)) currentColor}
.chip{display:inline-block;font:500 calc(26px*var(--s))/1 var(--ui);padding:calc(14px*var(--s)) calc(22px*var(--s));border:calc(2px*var(--s)) solid currentColor;border-radius:99px;white-space:nowrap}
.card{background:var(--paper);border-radius:calc(28px*var(--s));box-shadow:0 calc(40px*var(--s)) calc(80px*var(--s)) calc(-40px*var(--s)) rgba(14,15,14,.55);overflow:hidden}`;
  const P = (w, h, body) => page(w, h, body, EXTRA);
  const pat = (tone, size, op) => `<div class="pat" style="background-image:url(${IMG(tone === 'ink' ? 'pattern-arcs-paper.svg' : 'pattern-arcs-ink.svg')});background-size:${size}px;opacity:${op}"></div>`;

  // ---------- 01 Logo: curved wordmark and speckled marks ----------
  const logoFiles = [
    ['AG-弧形字-大弧', ARCS.big, true], ['AG-弧形字-小弧', ARCS.small, true],
    ['AG-颗粒图形', raw('ag-mark-speck.svg'), false, raw('ag-mark-speck-light.svg')], ['AG-颗粒叠层', raw('ag-stack-speck.svg'), false, raw('ag-stack-speck-light.svg')]];
  for (const [name, s, recolour, light] of logoFiles) {
    const black = recolour ? s.replace('fill="currentColor"', `fill="${INK}"`) : s;
    const white = recolour ? s.replace('fill="currentColor"', `fill="${PAPER}"`) : light;
    fs.writeFileSync(path.join(L, 'SVG', `${name}-黑.svg`), black); fs.writeFileSync(path.join(L, 'SVG', `${name}-白.svg`), white);
    const [, , vw, vh] = vbOf(s).split(/\s+/).map(Number);
    for (const W of [2048, 512]) { const H = Math.round(W * vh / vw);
      for (const [tone, file] of [['黑', black], ['白', white]]) {
        const src = 'data:image/svg+xml;base64,' + Buffer.from(file).toString('base64');
        await render(P(W, H, `<img src="${src}" style="width:${W}px;height:${H}px;display:block">`), W, H, path.join(L, `PNG-透明底-${W}`, `${name}-${tone}-${W}w.png`), true);
      } }
  }

  // ---------- 03 backgrounds: scattered arcs ----------
  const sizes = [[1080, 1440, '小红书3比4'], [1080, 1920, '竖版9比16'], [1080, 1080, '方形1比1'], [1920, 1080, '横版16比9'], [900, 383, '公众号封面'], [1242, 1660, '小红书高清3比4']];
  for (const [w, h, tag] of sizes) {
    const s = Math.min(w, h * .75) / 1080, tile = Math.round(620 * s);
    for (const [tone, bg, cls, op] of [['纸白', 'bg-paper', '', .16], ['应用灰', 'bg-grey', '', .16], ['墨黑', 'bg-ink', 'dark', .14]])
      await render(P(w, h, `<div class="f ${bg} grain ${cls}" style="--w:${w}px;--h:${h}px">${pat(bg === 'bg-ink' ? 'ink' : 'paper', tile, op)}</div>`), w, h, path.join(BG, '弧形字散布', `散布-${tone}-${tag}-${w}x${h}.png`));
  }

  // ---------- 04 more XHS layouts ----------
  const W = 1080, H = 1440, S = 'calc(1px*var(--s))';
  const T = { title: '标题写在这里<br>最多两行十四字', en: 'TITLE IN ENGLISH', lead: '一句话说明这篇笔记讲什么', series: '<b>系列名</b> Series' };
  const covD = txt => `<div class="f bg-paper grain" style="--w:${W}px;--h:${H}px">${pat('paper', 620, .2)}${frame('dk', '06', T.series)}
    ${txt ? `<div style="position:absolute;left:90px;right:90px;top:50%;transform:translateY(-50%);z-index:4;background:var(--paper);border-radius:36px;padding:70px 64px;display:grid;gap:30px;justify-items:center;text-align:center;box-shadow:0 0 0 2px var(--ink)">
      <span style="font:500 26px/1 var(--ui);letter-spacing:.14em">小标签 · 06</span>
      <h1 style="font:700 100px/1.14 var(--cjk);letter-spacing:.02em">${T.title}</h1>
      <p style="font:800 54px/.92 var(--display)">${T.en}</p>
      <p style="font:400 30px/1.5 var(--cjk);color:#2a2b2a">${T.lead}</p></div>` : ''}</div>`;
  const covE = txt => `<div class="f bg-ink grain dark" style="--w:${W}px;--h:${H}px;color:var(--paper)">
    <div style="position:absolute;right:0;top:120px;width:700px;height:720px">
      <span class="oval" style="left:70px;top:0;width:470px;height:650px;background:var(--grey);transform:rotate(-14deg)"></span>
      <img src="${IMG('ag-mark-speck.svg')}" style="position:absolute;left:125px;top:215px;width:360px;transform:rotate(-6deg)">
      <div style="position:absolute;right:60px;bottom:0;width:300px;color:var(--paper);mix-blend-mode:difference">${arc('big', 'width:300px;height:auto')}</div></div>
    ${frame('bd', '07', T.series)}
    ${txt ? `<div style="position:absolute;left:72px;right:72px;bottom:160px;display:grid;gap:24px;z-index:4">
      <h1 style="font:700 100px/1.1 var(--cjk);letter-spacing:.02em">${T.title}</h1>
      <p style="font:800 54px/.92 var(--display)">${T.en}</p>
      <p style="font:400 32px/1.5 var(--cjk);color:#bdbebc">${T.lead}</p></div>` : ''}</div>`;
  const covF = txt => `<div class="f bg-grey grain" style="--w:${W}px;--h:${H}px">
    <img src="${IMG('ag-stack-speck.svg')}" style="position:absolute;right:-180px;bottom:-120px;width:900px">${frame('bd', '08', T.series)}
    ${txt ? `<div style="position:absolute;left:72px;right:72px;top:210px;display:grid;gap:30px;z-index:4">
      <p style="font:800 30px/1 var(--display);letter-spacing:.02em">NO. 08</p>
      <h1 style="font:700 108px/1.1 var(--cjk);letter-spacing:.02em">${T.title}</h1>
      <p style="font:400 32px/1.5 var(--cjk);color:#2a2b2a;max-width:15em">${T.lead}</p></div>` : ''}</div>`;
  const innerB = txt => `<div class="f bg-grey grain" style="--w:${W}px;--h:${H}px">${frame('bd', '09', T.series)}
    ${txt ? `<div style="position:absolute;left:60px;right:60px;top:190px;display:grid;gap:22px;z-index:4">
      <h2 style="font:700 72px/1.15 var(--cjk);margin:0 12px 18px">三件事，一页讲清</h2>
      ${['第一件事：一句话讲清楚', '第二件事：配一个具体例子', '第三件事：给出马上能做的一步'].map((x, i) => `<div style="background:${i === 1 ? 'var(--ink)' : 'var(--paper)'};color:${i === 1 ? 'var(--paper)' : 'var(--ink)'};border-radius:30px;padding:40px 44px;display:grid;grid-template-columns:130px 1fr;gap:26px;align-items:center">
        <b class="outline" style="font:800 110px/.8 var(--display);-webkit-text-stroke-color:${i === 1 ? 'var(--paper)' : 'var(--ink)'}">0${i + 1}</b>
        <div style="display:grid;gap:12px"><b style="font:700 44px/1.25 var(--cjk)">${x}</b><span style="font:400 30px/1.5 var(--cjk);opacity:.72">补充说明一行，不超过二十字。</span></div></div>`).join('')}</div>` : ''}</div>`;
  const quote = txt => `<div class="f bg-paper grain" style="--w:${W}px;--h:${H}px">${frame('dk', '10', T.series)}
    <div style="position:absolute;right:70px;bottom:150px;width:250px;color:var(--ink)">${arc('big', 'width:250px;height:auto')}</div>
    ${txt ? `<div style="position:absolute;left:84px;right:84px;top:300px;display:grid;gap:44px;z-index:4">
      <p style="font:800 150px/.6 var(--display)">“</p>
      <h1 style="font:700 86px/1.3 var(--cjk);letter-spacing:.02em">一句值得被记住的话，写在这里，三行以内。</h1>
      <p style="font:italic 400 32px/1.4 var(--body);color:#7d7e7c">Name · role, in Fira Sans italic</p></div>` : ''}</div>`;
  const prog = txt => `<div class="f bg-ink grain dark" style="--w:${W}px;--h:${H}px;color:var(--paper)">${fogD}
    <img src="${IMG('ag-mark-speck-light.svg')}" style="position:absolute;right:-260px;bottom:-150px;width:860px;opacity:.2">${frame('bd', '11', T.series)}
    ${txt ? `<div style="position:absolute;left:72px;right:72px;top:190px;display:grid;gap:26px;z-index:4">
      <b class="outline" style="font:800 360px/.78 var(--display);-webkit-text-stroke-color:var(--paper);margin-left:-14px">01</b>
      <span style="font:500 28px/1 var(--ui);letter-spacing:.14em">DBRF · LONDON</span>
      <h1 style="font:700 112px/1.08 var(--cjk);letter-spacing:.02em">课程名称</h1>
      <p style="font:400 34px/1.5 var(--cjk);color:#bdbebc">一句话说明这门课，最多两行。</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;border-top:2px solid var(--paper);margin-top:26px">${[['形式', '线上为主'], ['人数', '每期 5 席'], ['导师', '伦敦导师'], ['适合', '硕士申请']].map(([k, v], i) => `<div style="padding:26px ${i % 2 ? '0 26px 30px' : '20px 26px 0'};${i % 2 ? 'border-left:1px solid rgba(244,245,243,.2);' : ''}${i > 1 ? 'border-top:1px solid rgba(244,245,243,.2);' : ''}display:grid;gap:10px;align-content:start"><b style="font:500 22px/1 var(--ui);letter-spacing:.14em;opacity:.7">${k}</b><span style="font:600 40px/1.2 var(--cjk)">${v}</span></div>`).join('')}</div></div>` : ''}</div>`;
  const tutor = txt => `<div class="f bg-ink grain dark" style="--w:${W}px;--h:${H}px;color:var(--paper)">${fogD}
    <div style="position:absolute;left:120px;top:170px;width:840px;height:760px">
      <span class="oval" style="left:40px;top:0;width:520px;height:690px;background:var(--grey);transform:rotate(-10deg)"></span>
      <div class="oval" style="right:60px;bottom:40px;width:420px;height:560px;background:radial-gradient(closest-side,#4a4b49,#1b1c1b 70%,#0a0a0a);display:grid;place-items:center;font:800 190px/1 var(--display)">${txt ? 'XG' : ''}</div>
      <div style="position:absolute;left:10px;bottom:30px;width:400px;color:var(--paper);mix-blend-mode:difference">${arc('big', 'width:400px;height:auto')}</div></div>
    ${frame('bd', '12', T.series)}
    ${txt ? `<div style="position:absolute;left:72px;right:72px;bottom:170px;display:grid;gap:22px;z-index:4">
      <h1 style="font:700 100px/1.05 var(--cjk)">导师姓名 <span style="font:800 50px/1 var(--display)">NAME</span></h1>
      <p style="font:400 34px/1.4 var(--cjk);color:#bdbebc">头衔 · 在先端艺培的角色</p>
      <div style="display:flex;gap:14px;flex-wrap:wrap">${['方向一', '方向二', '方向三'].map(x => `<span class="chip" style="font-family:var(--cjk)">${x}</span>`).join('')}</div></div>` : ''}</div>`;
  const more = [['封面D-弧形字散布', covD], ['封面E-椭圆衬底', covE], ['封面F-颗粒叠层', covF], ['内页B-应用灰卡片', innerB], ['引语页-纸白', quote], ['课程卡-墨黑', prog], ['导师卡-墨黑', tutor]];
  for (const [n, fn] of more) {
    await render(P(W, H, fn(true)), W, H, path.join(X, '样张', `${n}-1080x1440.png`));
    await render(P(W, H, fn(false)), W, H, path.join(X, '底图', `${n}-底图-1080x1440.png`));
  }

  // ---------- 05 journal covers, straight from content.js ----------
  const ctx = { window: {} }; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(SITE, 'assets/js/content.js'), 'utf8'), ctx);
  const SITEC = ctx.window.SITE;
  const artSvg = (k, i, ink) => { const n = String(i + 1).padStart(2, '0'), num = `<text x="22" y="52" style="font:800 40px var(--display)" fill="currentColor">${n}</text>`;
    if (k === 'arch') return `<svg viewBox="0 0 300 400"><path d="M60 400V190a90 90 0 0 1 180 0v210z" fill="currentColor"/>${num}</svg>`;
    if (k === 'stack') return `<svg viewBox="0 0 300 400">${svg('ag-stack', '', 'currentColor').replace('<svg ', '<svg x="40" y="60" width="220" height="300" ')}${num}</svg>`;
    if (k === 'circle') return `<svg viewBox="0 0 300 400"><circle cx="150" cy="230" r="110" fill="currentColor"/><circle cx="150" cy="230" r="46" fill="${ink ? INK : PAPER}"/>${num}</svg>`;
    let g = ''; for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) g += `<rect x="${40 + c * 76}" y="${110 + r * 70}" width="60" height="54" rx="${(r * 3 + c) % 4 === 0 ? 27 : 6}" fill="currentColor" opacity="${((r + c) % 3) ? 1 : .35}"/>`;
    return `<svg viewBox="0 0 300 400">${g}${num}</svg>`; };
  const wbr = s => s.replace(/​/g, '<wbr>');
  for (const [i, it] of SITEC.journal.items.entries()) {
    const ink = i % 2 === 1, bgc = ink ? INK : PAPER, fg = ink ? PAPER : INK, n = String(i + 1).padStart(2, '0');
    const card = (w, h, arcW) => `<div class="card" style="position:relative;width:${w}px;height:${h}px;background:${bgc};color:${fg}">${artSvg(it.art, i, ink).replace('<svg ', `<svg style="width:100%;height:100%;display:block" `)}
      <div style="position:absolute;left:6%;bottom:3%;width:${arcW}px;color:var(--paper);mix-blend-mode:difference;transform:rotate(4deg)">${arc('big', `width:${arcW}px;height:auto`)}</div></div>`;
    // XHS cover 3:4
    await render(P(1080, 1440, `<div class="f bg-grey grain" style="--w:1080px;--h:1440px">${frame('bd', n, `<b>${SITEC.journal.title.zh}</b> Journal`)}
      <div style="position:absolute;right:90px;top:170px;transform:rotate(3deg)">${card(460, 613, 230)}</div>
      <div style="position:absolute;left:72px;right:72px;bottom:190px;display:grid;gap:26px;z-index:4">
        <p style="display:flex;gap:18px;align-items:baseline"><b class="outline" style="font:800 110px/.8 var(--display);-webkit-text-stroke-color:var(--ink)">${n}</b><span style="font:500 30px/1 var(--cjk);letter-spacing:.14em">${it.tag.zh}</span></p>
        <h1 style="font:700 96px/1.16 var(--cjk);letter-spacing:.02em;word-break:keep-all">${wbr(it.t.zh)}</h1>
        <p style="font:800 44px/1 var(--display);text-transform:uppercase;max-width:20em;line-height:1.02">${it.t.en}</p></div></div>`), 1080, 1440, path.join(J, `内容${n}-${it.slug}-小红书3比4-1080x1440.png`));
    // WeChat article header 900×383
    await render(P(900, 383, `<div class="f bg-grey grain" style="--w:900px;--h:383px;--s:.36">
      <div style="position:absolute;left:44px;top:34px;transform:rotate(-3deg)">${card(222, 296, 112)}</div>
      <div style="position:absolute;left:320px;right:48px;top:50%;transform:translateY(-50%);display:grid;gap:14px">
        <span style="font:500 17px/1 var(--cjk);letter-spacing:.14em">NO. ${n} · ${it.tag.zh}</span>
        <h1 style="font:700 44px/1.2 var(--cjk);word-break:keep-all">${wbr(it.t.zh)}</h1>
        <p style="font:800 21px/1.05 var(--display);text-transform:uppercase">${it.t.en}</p></div>
      <div style="position:absolute;right:30px;top:26px;font:800 15px/.98 var(--display);text-align:right">AVANTGARDE<br>STUDIO</div></div>`), 900, 383, path.join(J, `内容${n}-${it.slug}-公众号头图-900x383.png`));
  }

  // ---------- 02 guide to the extended graphics ----------
  const tile = (label, note, body, bg = 'var(--grey)', col = 'var(--ink)') => `<div style="display:grid;gap:12px;align-content:start"><div style="position:relative;overflow:hidden;height:220px;border-radius:18px;background:${bg};color:${col};display:grid;place-items:center">${body}</div><b style="font:600 22px/1.2 var(--ui)">${label}</b><span style="font:400 17px/1.45 var(--cjk);color:#555">${note}</span></div>`;
  const guide = `<div class="f bg-paper grain" style="--w:1920px;--h:1080px">${frame('dk', '', '<b>VI</b> <i>Design</i> · 扩展图形')}
    <div style="position:absolute;left:100px;right:100px;top:130px;display:grid;gap:30px">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:40px"><h1 style="font:700 64px/1.1 var(--cjk)">扩展图形：同一套 AG，更多变化</h1>
        <p style="font:400 20px/1.6 var(--cjk);color:#2a2b2a;max-width:36em">全部来自定稿 PDF《周边图形设计》，用 Logo 原始矢量生成。一个画面最多用两种图形；弧形字和散布纹样不要同时做主角。</p></div>
      <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:22px">
        ${tile('弧形字', '英文字体沿弧线弯曲（手提袋）。放在图形或照片边缘，像环绕一样。', arc('big', 'width:150px;height:auto'), 'var(--grey)')}
        ${tile('弧形字散布', '小弧度字旋转、镜像散布（信封、纸杯）。只做底纹，透明度 10–20%。', `<div class="pat" style="background-image:url(${IMG('pattern-arcs-ink.svg')});background-size:260px;opacity:.5"></div>`, 'var(--paper);border:1.5px solid rgba(14,15,14,.16)')}
        ${tile('椭圆衬底', '图形或头像后面垫一个倾斜的椭圆（VI 第 6 页）。', `<span class="oval" style="width:150px;height:200px;background:var(--grey);transform:rotate(-12deg)"></span><img src="${IMG('ag-mark-speck.svg')}" style="position:relative;width:150px">`, 'var(--ink)')}
        ${tile('颗粒图形', 'AG 图形里带胶片颗粒的白点（手提袋、信封）。适合大面积出现。', `<img src="${IMG('ag-mark-speck.svg')}" style="width:200px">`)}
        ${tile('叠层图形', '四层 A 叠放，可裁切出画面。', `<img src="${IMG('ag-stack-speck.svg')}" style="width:150px">`)}
        ${tile('雾状渐变', 'VI 封面的雾，深浅两种。放标题最安全。', `<div class="fog" style="filter:blur(26px)"><i style="width:120%;height:30%;left:-10%;top:34%;opacity:.55;background:var(--ink)"></i><i style="width:80%;height:40%;right:-30%;bottom:-16%;background:var(--ink)"></i></div>`, '#d9dad8')}
      </div>
      <div style="display:flex;gap:14px;align-items:flex-end">${['封面D-弧形字散布', '封面E-椭圆衬底', '封面F-颗粒叠层', '内页B-应用灰卡片', '引语页-纸白', '课程卡-墨黑', '导师卡-墨黑'].map(n => `<img src="file://${path.join(X, '样张', n + '-1080x1440.png')}" style="width:96px;height:128px;border-radius:8px;box-shadow:0 10px 24px -14px rgba(0,0,0,.5)">`).join('')}
        ${SITEC.journal.items.map((it, i) => `<img src="file://${path.join(J, `内容0${i + 1}-${it.slug}-小红书3比4-1080x1440.png`)}" style="width:96px;height:128px;border-radius:8px;box-shadow:0 10px 24px -14px rgba(0,0,0,.5)">`).join('')}
        <span style="font:400 17px/1.45 var(--cjk);color:#555;margin-left:12px;max-width:16em">新版式在 04-小红书起步模板，文章封面在 05-内容封面</span></div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:22px;border-top:3px solid var(--ink);padding-top:26px">
        ${[['文章', '应用灰首屏 + 3:4 封面卡，弧形字压在卡上；正文纸白，引语用应用灰块'], ['课程', '每门课一个底色：大师课墨黑、进阶课应用灰、申请纸白；巨大描边编号 + 颗粒图形'], ['导师', '墨黑首屏，椭圆衬底 + 头像椭圆 + 弧形字环绕'], ['三方合作', '三块插图用 × 相连；三方各占一段，纸白、墨黑、应用灰轮换']].map(([k, v]) => `<div style="display:grid;gap:8px"><b style="font:800 26px/1 var(--display)">${k}</b><span style="font:400 18px/1.5 var(--cjk);color:#2a2b2a">${v}</span></div>`).join('')}
      </div></div></div>`;
  await render(P(1920, 1080, guide), 1920, 1080, path.join(C, '扩展图形规范-1920x1080.png'));
};
