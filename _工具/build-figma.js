/*
 * Builds 视觉包/06-Figma/ag-tokens.json — the design tokens (W3C DTCG format; Tokens Studio and most token tools read it),
 * taken from site/assets/css/style.css. The same values live in the Figma library「AG VI 视觉识别库」as variables and
 * text styles; every token carries its CSS variable and Figma variable name in $extensions so the three stay in step.
 *   node _工具/build-figma.js site 视觉包
 */
const fs = require('fs'), path = require('path'), vm = require('vm');
const SITE = path.resolve(process.argv[2] || 'site'), OUT = path.resolve(process.argv[3] || '视觉包', '06-Figma');
const TOK = OUT; fs.mkdirSync(TOK, { recursive: true });

/* ---------- tokens ---------- */
const css = fs.readFileSync(path.join(SITE, 'assets/css/style.css'), 'utf8');
const root = css.match(/:root\s*\{([\s\S]*?)\}/)[1];
const cssVar = n => { const m = root.match(new RegExp('--' + n + ':\\s*([^;]+);')); if (!m) throw new Error('missing --' + n); return m[1].trim(); };
const COLOURS = [
  ['ink', '墨黑', '主色、文字、深色区块（Logo 定稿）'], ['ink-2', '墨黑 2', '页脚大字、深色层次'], ['ink-3', '墨黑 3', '浅底上的正文、深色卡片'],
  ['paper', '纸白', '页面底色、深色区块上的文字'], ['white', '纯白', '少量高光、卡片'], ['grey', '应用灰', '灰色区块、卡片（VI 应用页灰）'],
  ['grey-2', '浅灰', '深色区块上的说明文字'], ['mid', '中灰', '次要文字、导语'], ['line', '细线', '浅底分隔线（墨黑 16%）'], ['line-d', '细线（深底）', '深底分隔线（纸白 18%）', 'line-dark']];
const toHex = v => { const m = v.match(/rgba?\(([^)]+)\)/); if (!m) return { hex: v.toLowerCase(), a: 1 };
  const [r, g, b, a = 1] = m[1].split(',').map(s => parseFloat(s)); return { hex: '#' + [r, g, b].map(x => Math.round(x).toString(16).padStart(2, '0')).join(''), a: +a }; };
const colour = {}; COLOURS.forEach(([k, zh, use, fk = k]) => { const { hex, a } = toHex(cssVar(k)); colour[fk] = { $type: 'color', $value: a < 1 ? hex + Math.round(a * 255).toString(16).padStart(2, '0') : hex, $description: `${zh} · ${use}`, $extensions: { css: '--' + k, figma: 'colour/' + fk } }; });
colour['fog'] = { $type: 'color', $value: '#d9dad8', $description: '雾底 · 首屏、雾状渐变的底色', $extensions: { css: '#d9dad8（hero 背景）', figma: 'colour/fog' } };
const fam = { display: 'Archivo Black', ui: 'Jost', body: 'Fira Sans', cjk: 'Noto Sans SC' };
const T = (f, w, size, lh, ls = 0, upper = false, d = '') => ({ $type: 'typography', $value: { fontFamily: fam[f], fontWeight: w, fontSize: size + 'px', lineHeight: lh, letterSpacing: ls + '%', ...(upper ? { textCase: 'uppercase' } : {}) }, $description: d });
const tokens = {
  $description: '先端艺培 Avantgarde Studio 设计变量。颜色取自 site/assets/css/style.css（Logo 定稿），字体与字号取自官网和视觉包模板。由 _工具/build-figma.js 生成，请勿手改。Figma 文件：AG VI 视觉识别库',
  colour,
  font: { family: Object.fromEntries(Object.entries(fam).map(([k, v]) => [k, { $type: 'fontFamily', $value: v, $description: { display: '英文标题（VI 的 AVANTGARDE STUDIO 粗黑体）', ui: '界面、按钮、名字、标签（与 Logo 英文同类几何体）', body: '正文（VI 页脚 VI Design / BRAND Design）', cjk: '中文（思源黑体；Figma 里叫 Noto Sans SC）' }[k] }])) },
  typography: {
    web: {
      'hero-en': T('display', 400, 164, .86, -1, true, '首屏英文大标题（手机 41px）'), 'hero-zh': T('cjk', 700, 92, 1, 6, false, '首屏中文名（手机 34px）'),
      'h2-en': T('display', 400, 112, .92, -1.5, true, '区块标题（手机 44px）'), 'h2-zh': T('cjk', 700, 112, 1.08, 2, false, '区块标题（手机 44px）'),
      'page-title-en': T('display', 400, 96, .98, -1, true, '子页面首屏标题（手机 40px）'), 'page-title-zh': T('cjk', 700, 96, 1.12, 2, false, '子页面首屏标题'),
      intro: T('body', 400, 21, 1.5, 0, false, '导语'), body: T('body', 400, 16, 1.6, 0, false, '正文'), 'body-zh': T('cjk', 400, 16, 1.8, 1, false, '中文正文'),
      'card-title': T('ui', 600, 21, 1.15, 0, false, '卡片标题、人名'), label: T('ui', 500, 13, 1, 14, true, '小标签'), button: T('ui', 500, 15, 1, 2, false, '按钮'),
      number: T('display', 400, 104, .9, -2, false, '数字条、成果数字')
    },
    xhs: {
      'cover-zh': T('cjk', 700, 104, 1.12, 2, false, '小红书封面中文标题（1080 宽画布）'), 'cover-en': T('display', 400, 58, .92, 0, true, '封面英文副标题'),
      lead: T('cjk', 400, 32, 1.5, 0, false, '封面一句话'), 'inner-h': T('cjk', 700, 64, 1.15, 0, false, '内页小标题'), 'inner-body': T('cjk', 400, 36, 1.7, 0, false, '内页正文'),
      corner: T('display', 400, 30, .98, 0, true, '左上 AVANTGARDE / STUDIO'), 'page-no': T('display', 400, 44, 1, 0, false, '右上页码'), series: T('body', 400, 26, 1.2, 0, false, '左下系列名'),
      label: T('ui', 500, 28, 1, 14, false, '封面小标签')
    }
  },
  radius: { card: { $type: 'dimension', $value: cssVar('r') }, 'card-lg': { $type: 'dimension', $value: '20px' }, pill: { $type: 'dimension', $value: '99px' } },
  space: { 'gutter-desktop': { $type: 'dimension', $value: '48px' }, 'gutter-phone': { $type: 'dimension', $value: '16px' }, 'section-desktop': { $type: 'dimension', $value: '168px' }, 'section-phone': { $type: 'dimension', $value: '88px' },
    'xhs-margin': { $type: 'dimension', $value: '60px', $description: '小红书四角留白' }, 'xhs-text': { $type: 'dimension', $value: '72px', $description: '小红书正文左右边距' } },
  effect: { grain: { $type: 'number', $value: 0.09, $description: '胶片颗粒：不透明度 9%，正片叠底（深底用滤色 10%）' }, 'fog-blur': { $type: 'dimension', $value: '60px', $description: '雾状渐变：墨黑椭圆 + 模糊' } }
};
fs.writeFileSync(path.join(TOK, 'ag-tokens.json'), JSON.stringify(tokens, null, 2) + '\n');
console.log('tokens:', path.join(TOK, 'ag-tokens.json'));


