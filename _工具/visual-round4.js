/*
 * Round 4 additions to 视觉包 (called from build-visual.js; `node _工具/build-visual.js site 视觉包 round4` runs only this part):
 * the formats the pack was still missing, drawn to match the Figma library「AG VI 视觉识别库」page 07 and 06:
 *   07-视频公众号邮件/  vertical 9:16 video covers, WeChat header / thumbnail / follow-card templates, email header and signature
 *   05-内容封面/        a square WeChat 次条 thumbnail for each journal article
 * Same building blocks as the rest of the pack: logo vectors, fog, grain and the brand corner frame from build-visual.js.
 */
const fs = require('fs'), path = require('path'), vm = require('vm');

module.exports = async function round4(o) {
  const { render, page, svg, frame, fogL, fogD, SITE, OUT, INK, PAPER } = o;
  const IMG = n => 'file://' + path.join(SITE, 'assets/img', n);
  const raw = n => fs.readFileSync(path.join(SITE, 'assets/img', n), 'utf8');
  const vbOf = s => s.match(/viewBox="([^"]+)"/)[1];
  const innerOf = s => s.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  const ARC = raw('ag-arc.svg');
  const arc = (style = '', fill = 'currentColor') => `<svg viewBox="${vbOf(ARC)}" style="${style}" fill="${fill}" xmlns="http://www.w3.org/2000/svg">${innerOf(ARC)}</svg>`;
  const V = path.join(OUT, '07-视频公众号邮件'), J = path.join(OUT, '05-内容封面');
  const EXTRA = `
.card{border-radius:10px;box-shadow:0 14px 28px -14px rgba(14,15,14,.55);overflow:hidden}
.pill{display:inline-block;font:500 30px/1 var(--ui);letter-spacing:.14em;padding:16px 30px;border:1.5px solid rgba(14,15,14,.4);border-radius:99px;background:rgba(244,245,243,.35)}
.qr{display:grid;place-items:center;background:var(--paper);color:var(--ink);font:500 22px/1.3 var(--cjk)}`;
  const P = (w, h, body) => page(w, h, body, EXTRA);
  const series = '<b>系列名</b> Video';
  const TITLE = '标题写在这里<br>最多两行十四字', LEAD = '一句话说明这条视频讲什么';

  // ---------- 9:16 video covers (视频号 / 抖音 / 小红书视频) ----------
  const W = 1080, H = 1920;
  const v1 = txt => `<div class="f bg-fog-l grain" style="--w:${W}px;--h:${H}px">${fogL}${frame('bd', '01', series)}
    ${txt ? `<div style="position:absolute;left:90px;right:90px;top:50%;transform:translateY(calc(-50% - 120px));display:grid;gap:34px;justify-items:center;text-align:center;z-index:4">
      <span class="pill">视频 · 01</span>
      <h1 style="font:700 120px/1.12 var(--cjk);letter-spacing:.02em">${TITLE}</h1>
      <p style="font:800 64px/.92 var(--display)">TITLE IN ENGLISH</p>
      <p style="font:400 36px/1.5 var(--cjk);color:#2a2b2a">${LEAD}</p></div>` : ''}</div>`;
  const v2 = txt => `<div class="f bg-ink grain dark" style="--w:${W}px;--h:${H}px;color:var(--paper)">
    <div style="position:absolute;left:-220px;top:1203px;color:var(--paper)">${svg('ag-mark', 'width:1700px;height:867px')}</div>${frame('bd', '02', series)}
    ${txt ? `<div style="position:absolute;left:72px;right:72px;top:360px;display:grid;gap:36px;z-index:4">
      <h1 style="font:700 120px/1.1 var(--cjk);letter-spacing:.02em">${TITLE}</h1>
      <p style="font:800 64px/.92 var(--display)">TITLE IN ENGLISH</p>
      <p style="font:400 36px/1.5 var(--cjk);color:#bdbebc">${LEAD}</p></div>` : ''}</div>`;
  const v3 = txt => `<div class="f bg-grey grain" style="--w:${W}px;--h:${H}px">
    <img src="${IMG('ag-stack-speck.svg')}" style="position:absolute;left:300px;top:1063px;width:1000px">${frame('bd', '03', series)}
    ${txt ? `<div style="position:absolute;left:72px;right:72px;top:330px;display:grid;gap:32px;z-index:4">
      <p style="font:800 34px/1 var(--display);letter-spacing:.02em">NO. 03</p>
      <h1 style="font:700 116px/1.1 var(--cjk);letter-spacing:.02em">${TITLE}</h1>
      <p style="font:400 36px/1.5 var(--cjk);color:#2a2b2a">${LEAD}</p></div>` : ''}</div>`;
  for (const [n, fn] of [['01-雾状渐变', v1], ['02-墨黑大图形', v2], ['03-颗粒叠层', v3]]) {
    await render(P(W, H, fn(true)), W, H, path.join(V, '竖版视频封面', `竖版封面${n}-1080x1920.png`));
    await render(P(W, H, fn(false)), W, H, path.join(V, '竖版视频封面', '底图', `竖版封面${n}-底图-1080x1920.png`));
  }

  // ---------- WeChat templates ----------
  const brandTR = (col, blend) => `<div style="position:absolute;right:30px;top:26px;font:800 15px/.98 var(--display);text-align:right;color:${col};${blend ? 'mix-blend-mode:difference;' : ''}z-index:5">AVANTGARDE<br>STUDIO</div>`;
  const headFog = txt => `<div class="f bg-fog-l grain" style="--w:900px;--h:383px">${fogL}${brandTR('var(--paper)', true)}
    ${txt ? `<div style="position:absolute;left:170px;width:560px;top:50%;transform:translateY(-50%);display:grid;gap:12px;text-align:center;z-index:4">
      <h1 style="font:700 52px/1.2 var(--cjk)">文章标题写在这里</h1><p style="font:800 24px/1 var(--display)">ARTICLE TITLE IN ENGLISH</p></div>` : ''}</div>`;
  const headInk = txt => `<div class="f bg-ink grain dark" style="--w:900px;--h:383px;color:var(--paper)">
    <div style="position:absolute;left:470px;top:167px">${svg('ag-mark', 'width:560px;height:286px')}</div>
    ${txt ? `<div style="position:absolute;left:56px;width:460px;top:50%;transform:translateY(-50%);display:grid;gap:12px;z-index:4">
      <span style="font:500 17px/1 var(--cjk);letter-spacing:.14em;color:#bdbebc">活动 · 招生通知</span>
      <h1 style="font:700 46px/1.2 var(--cjk)">标题写在这里，<br>最多两行</h1><p style="font:800 22px/1 var(--display)">TITLE IN ENGLISH</p></div>` : ''}</div>`;
  for (const [n, fn] of [['雾状渐变', headFog], ['墨黑图形', headInk]]) {
    await render(P(900, 383, fn(true)), 900, 383, path.join(V, '公众号', `公众号头图-${n}-900x383.png`));
    await render(P(900, 383, fn(false)), 900, 383, path.join(V, '公众号', '底图', `公众号头图-${n}-底图-900x383.png`));
  }
  const thumb = (bg, col, dark) => `<div class="f ${bg} grain ${dark ? 'dark' : ''}" style="--w:400px;--h:400px;display:grid;place-items:center"><div style="color:${col};position:relative;z-index:2">${svg('ag-mark', 'width:240px;height:122px')}</div></div>`;
  for (const [n, bg, col, dark] of [['应用灰', 'bg-grey', INK, false], ['墨黑', 'bg-ink', PAPER, true]]) {
    await render(P(400, 400, thumb(bg, col, dark)), 400, 400, path.join(V, '公众号', `公众号次图-${n}-400x400.png`));
    await render(`<html><body style="margin:0"><img src="file://${path.join(V, '公众号', `公众号次图-${n}-400x400.png`)}" style="width:200px;height:200px;display:block"></body></html>`, 200, 200, path.join(V, '公众号', `公众号次图-${n}-200x200.png`));
  }
  const follow = `<div class="f bg-fog-d grain dark" style="--w:900px;--h:600px;color:var(--paper)"><div style="position:absolute;inset:0;opacity:.5">${fogD}</div>
    <div style="position:absolute;left:70px;top:110px;color:var(--paper);z-index:3">${svg('ag-lockup', 'width:250px;height:161px')}</div>
    <div style="position:absolute;left:70px;top:321px;width:400px;display:grid;gap:16px;z-index:3"><h2 style="font:700 40px/1.2 var(--cjk)">关注先端艺培</h2>
      <p style="font:400 22px/1.6 var(--cjk);color:#bdbebc">伦敦大师课 × 沪苏本地陪跑<br>作品集评估，私信「评估」</p></div>
    <div class="qr" style="position:absolute;left:570px;top:170px;width:260px;height:260px;border-radius:20px;z-index:3">二维码放这里</div></div>`;
  await render(P(900, 600, follow), 900, 600, path.join(V, '公众号', '公众号文末关注卡-900x600.png'));

  // ---------- email ----------
  const eHead = `<div class="f bg-fog-d grain dark" style="--w:1200px;--h:400px;color:var(--paper)"><div style="position:absolute;inset:0;opacity:.5">${fogD}</div>
    <div style="position:absolute;left:80px;top:103px;color:var(--paper);z-index:3">${svg('ag-lockup', 'width:300px;height:194px')}</div>
    <div style="position:absolute;left:480px;top:50%;transform:translateY(-50%);display:grid;gap:14px;z-index:3"><h2 style="font:700 40px/1.2 var(--cjk)">伦敦大师课 × 沪苏本地陪跑</h2>
      <p style="font:italic 400 22px/1.3 var(--body);color:#bdbebc">London masterclasses × support in Shanghai and Suzhou</p></div></div>`;
  await render(P(1200, 400, eHead), 1200, 400, path.join(V, '邮件', '邮件页眉-1200x400.png'));
  // signature logo: AG mark over the wordmark, 2× for sharp screens (shown 100px wide)
  const sig = `<div style="width:200px;display:grid;gap:13px;padding:0;color:${INK}">${svg('ag-mark', 'width:200px;height:102px')}${svg('ag-wordmark', 'width:200px;height:23px')}</div>`;
  await render(P(200, 138, sig), 200, 138, path.join(V, '邮件', '邮件签名-标志-200x138.png'), true);
  fs.copyFileSync(path.join(V, '邮件', '邮件签名-标志-200x138.png'), path.join(SITE, 'assets/img', 'email-signature.png'));

  // ---------- journal: square WeChat 次条 thumbnails ----------
  const ctx = { window: {} }; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(SITE, 'assets/js/content.js'), 'utf8'), ctx);
  const S = ctx.window.SITE;
  const artSvg = (k, i, ink) => { const n = String(i + 1).padStart(2, '0'), num = `<text x="22" y="52" style="font:800 40px var(--display)" fill="currentColor">${n}</text>`;
    if (k === 'arch') return `<svg viewBox="0 0 300 400"><path d="M60 400V190a90 90 0 0 1 180 0v210z" fill="currentColor"/>${num}</svg>`;
    if (k === 'stack') return `<svg viewBox="0 0 300 400">${svg('ag-stack', '', 'currentColor').replace('<svg ', '<svg x="40" y="60" width="220" height="300" ')}${num}</svg>`;
    if (k === 'circle') return `<svg viewBox="0 0 300 400"><circle cx="150" cy="230" r="110" fill="currentColor"/><circle cx="150" cy="230" r="46" fill="${ink ? INK : PAPER}"/>${num}</svg>`;
    let g = ''; for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) g += `<rect x="${40 + c * 76}" y="${110 + r * 70}" width="60" height="54" rx="${(r * 3 + c) % 4 === 0 ? 27 : 6}" fill="currentColor" opacity="${((r + c) % 3) ? 1 : .35}"/>`;
    return `<svg viewBox="0 0 300 400">${g}${num}</svg>`; };
  for (const [i, it] of S.journal.items.entries()) {
    const ink = i % 2 === 1, n = String(i + 1).padStart(2, '0');
    const body = `<div class="f bg-grey grain" style="--w:400px;--h:400px">
      <div class="card" style="position:absolute;left:92px;top:48px;width:216px;height:288px;transform:rotate(3deg);background:${ink ? INK : PAPER};color:${ink ? PAPER : INK}">${artSvg(it.art, i, ink).replace('<svg ', '<svg style="width:100%;height:100%;display:block" ')}
        <div style="position:absolute;left:13px;bottom:9px;width:108px;color:var(--paper);mix-blend-mode:difference;transform:rotate(4deg)">${arc('width:108px;height:auto')}</div></div>
      <div style="position:absolute;right:22px;bottom:22px;color:${INK}">${svg('ag-mark', 'width:56px;height:29px')}</div></div>`;
    const f400 = path.join(J, `内容${n}-${it.slug}-公众号次图-400x400.png`);
    await render(P(400, 400, body), 400, 400, f400);
    await render(`<html><body style="margin:0"><img src="file://${f400}" style="width:200px;height:200px;display:block"></body></html>`, 200, 200, path.join(J, `内容${n}-${it.slug}-公众号次图-200x200.png`));
  }
};
