/*
 * Extended graphics from the VI's 周边图形设计 pages, all built from the real logo vectors (nothing redrawn):
 *   ag-arc.svg / ag-arc-s.svg      the wordmark bent onto an arc (100° like the tote bag, 56° like the cups)
 *   pattern-arcs-ink.svg / -paper  a seamless tile of scattered, rotated and mirrored arcs (envelope, cups)
 *   ag-mark-speck.svg / -light     the AG mark with film-grain flecks inside (tote bag, envelope)
 *   ag-stack-speck.svg / -light    the stacked mark with flecks
 *   node _工具/build-motifs.js site
 */
const fs = require('fs'), path = require('path');
const SITE = path.resolve(process.argv[2] || 'site'), IMG = path.join(SITE, 'assets/img');
const INK = '#0e0f0e', PAPER = '#f4f5f3';
const read = n => fs.readFileSync(path.join(IMG, n + '.svg'), 'utf8');
const vbOf = s => s.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
const pathsOf = s => [...s.matchAll(/<path([^>]*?)d="([^"]+)"/g)].map(m => ({ attrs: m[1], d: m[2] }));

/* ---------- arc wordmark ---------- */
const word = read('ag-wordmark'), [vx, vy, vw, vh] = vbOf(word), wpaths = pathsOf(word).map(p => p.d);
const baseline = vy + vh * 0.735;
function bend(sweepDeg) {
  const sweep = sweepDeg * Math.PI / 180, R = vw / sweep, start = Math.PI / 2;   // starts straight below the centre, turns right
  const map = (x, y) => { const a = start - (x - vx) / R, r = R + (y - baseline); return [r * Math.cos(a), r * Math.sin(a)]; };
  let minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9;
  const out = wpaths.map(d => { const tok = d.trim().split(/\s+/); const o = []; let i = 0;
    while (i < tok.length) { const c = tok[i++]; if (/^[Zz]$/.test(c)) { o.push('Z'); continue; }
      const n = c === 'C' ? 3 : 1, pts = [];
      for (let k = 0; k < n; k++) { const [X, Y] = map(+tok[i++], +tok[i++]); minX = Math.min(minX, X); maxX = Math.max(maxX, X); minY = Math.min(minY, Y); maxY = Math.max(maxY, Y); pts.push(X.toFixed(2) + ' ' + Y.toFixed(2)); }
      o.push(c + ' ' + pts.join(' ')); }
    return o.join(' '); });
  const pad = 3, vb = [minX - pad, minY - pad, maxX - minX + 2 * pad, maxY - minY + 2 * pad];
  return { vb, body: out.map(d => `<path d="${d}"/>`).join('') };
}
const arcs = {};
for (const [name, deg] of [['ag-arc', 100], ['ag-arc-s', 56]]) {
  arcs[name] = bend(deg);
  fs.writeFileSync(path.join(IMG, name + '.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${arcs[name].vb.map(v => v.toFixed(2)).join(' ')}" fill="currentColor">${arcs[name].body}</svg>\n`);
}

/* ---------- scattered arc pattern (seamless tile: every arc stays inside its cell) ---------- */
const T = 720, cell = 240, A = arcs['ag-arc-s'], [ax, ay, aw, ah] = A.vb, k = 196 / aw;
// [column, row, rotation, mirrored] — five of nine cells, rotated and mirrored like the VI envelope and cups
const spots = [[0, 0, -18, 0], [2, 0, 150, 1], [1, 1, 64, 0], [0, 2, 205, 1], [2, 2, -104, 0]];
const tile = fill => `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${T} ${T}" width="${T}" height="${T}"><defs><g id="a">${A.body}</g></defs><g fill="${fill}">` +
  spots.map(([c, r, rot, m]) => { const cx = c * cell + cell / 2, cy = r * cell + cell / 2;
    return `<use href="#a" xlink:href="#a" transform="translate(${cx} ${cy}) rotate(${rot}) scale(${m ? -k : k} ${k}) translate(${-(ax + aw / 2)} ${-(ay + ah / 2)})"/>`; }).join('') + `</g></svg>\n`;
fs.writeFileSync(path.join(IMG, 'pattern-arcs-ink.svg'), tile(INK));
fs.writeFileSync(path.join(IMG, 'pattern-arcs-paper.svg'), tile(PAPER));

/* ---------- speckled marks ---------- */
let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const flecks = (n, size) => { let o = ''; for (let i = 0; i < n; i++) { const x = rnd() * size, y = rnd() * size, r = .3 + rnd() * rnd() * rnd() * 2.4, rx = r * (.7 + rnd() * .6);
  o += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${rx.toFixed(2)}" ry="${r.toFixed(2)}" transform="rotate(${(rnd() * 180) | 0} ${x.toFixed(1)} ${y.toFixed(1)})"/>`; } return o; };
const P = 110, FL = flecks(95, P);
for (const [src, out] of [['ag-mark', 'ag-mark-speck'], ['ag-stack', 'ag-stack-speck']]) {
  const s = read(src), vb = s.match(/viewBox="([^"]+)"/)[1];
  const inner = s.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  for (const [suf, body, fleck] of [['', INK, PAPER], ['-light', PAPER, INK]]) {
    fs.writeFileSync(path.join(IMG, out + suf + '.svg'),
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"><defs><pattern id="f" width="${P}" height="${P}" patternUnits="userSpaceOnUse"><g fill="${fleck}">${FL}</g></pattern>` +
      `<clipPath id="c">${inner.replace(/fill="[^"]*"/g, '')}</clipPath></defs><g fill="${body}">${inner.replace(/fill="[^"]*"/g, '')}</g><rect x="0" y="0" width="2000" height="2000" fill="url(#f)" clip-path="url(#c)"/></svg>\n`);
  }
}
console.log('motifs written to', IMG);

/* keep the inline <symbol>s in index.html in step with the files (subpages copy their sprite from index.html) */
const idxFile = path.join(SITE, 'index.html');
let idx = fs.readFileSync(idxFile, 'utf8');
for (const name of ['ag-arc', 'ag-arc-s']) {
  const a = arcs[name], sym = `<symbol id="${name}" viewBox="${a.vb.map(v => v.toFixed(2)).join(' ')}">${a.body}</symbol>`;
  const re = new RegExp(`<symbol id="${name}"[\\s\\S]*?<\\/symbol>`);
  if (re.test(idx)) idx = idx.replace(re, sym);
  else idx = idx.replace(/(<symbol id="ag-lockup"[\s\S]*?<\/symbol>)/, `$1\n${sym}`);
}
fs.writeFileSync(idxFile, idx);
