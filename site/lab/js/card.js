/*!
 * AG LAB · share card (1080 × 1440, 3:4 for Xiaohongshu / WeChat Moments)
 * Drawn on a canvas in the AG STUDIO visual system: monochrome, film grain,
 * the real AG mark (vector paths from the final logo PDF), heavy grotesk type.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.AGCard = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var W = 1080, H = 1440, M = 72;
  var INK = "#0e0f0e", PAPER = "#f4f5f3", GREY = "#d9dad8", MID = "#7d7e7c";
  var DISPLAY = '"AG Display", "PingFang SC", "Noto Sans SC", "Microsoft YaHei", sans-serif';
  var UI = '"Jost", "PingFang SC", "Noto Sans SC", sans-serif';
  var BODY = '"Fira Sans", "PingFang SC", "Noto Sans SC", sans-serif';
  // AG mark, from the final logo file (viewBox 391.23 490.32 407.94 208.49)
  var MARK = [
    "M 512.02 682.29 L 482.34 682.29 C 480.97 682.29 479.75 683.14 479.28 684.43 L 475.54 694.67 C 475.07 695.96 473.85 696.81 472.48 696.81 L 400.95 696.81 C 396.69 696.81 393.23 693.36 393.23 689.1 L 431.23 508.88 C 431.91 505.09 434.68 501.17 438.94 501.17 L 556.5 500.96 C 560.77 500.96 563.43 504.18 564.22 508.68 L 602.21 689.1 C 602.21 693.36 598.75 696.81 594.49 696.81 L 523.16 696.81 C 521.91 696.81 520.78 696.1 520.23 694.98 L 514.95 684.12 C 514.41 683 513.27 682.29 512.02 682.29 Z",
    "M 762.42 693.8 L 749.72 693.84 C 744.23 693.52 738.89 690.67 737.13 684.84 L 736.29 683.84 C 736.29 683.84 728.97 688.83 718.7 690.67 C 699.18 694.16 690.55 692.8 690.55 692.8 C 634.61 692.8 596.24 647.45 596.24 591.51 C 596.24 537.27 640.2 493.31 694.44 493.31 C 742.27 492.32 797.17 522.69 796.87 595.74 L 796.87 676.89 C 796.87 695.91 781.45 693.8 762.42 693.8 Z"
  ];

  function t(v, lang) {
    if (v == null) return "";
    if (typeof v === "string") return v;
    return v[lang] != null ? v[lang] : v.zh;
  }

  function fontsReady() {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    return Promise.all([
      document.fonts.load('400 120px "AG Display"', "AGDBRF水木火土金"),
      document.fonts.load('600 40px "Jost"', "Avantgarde"),
      document.fonts.load('400 30px "Fira Sans"', "Studio")
    ]).catch(function () { return null; });
  }

  function mark(x, px, py, width, color) {
    var s = width / 407.94;
    x.save();
    x.translate(px, py);
    x.scale(s, s);
    x.translate(-391.23, -490.32);
    x.fillStyle = color;
    MARK.forEach(function (d) { x.fill(new Path2D(d)); });
    x.restore();
  }

  function fog(x) {
    var blobs = [
      [W * 0.2, H * 0.12, 520, "rgba(14,15,14,0.28)"],
      [W * 1.05, H * 0.36, 460, "rgba(14,15,14,0.22)"],
      [W * 0.1, H * 1.02, 620, "rgba(14,15,14,0.55)"]
    ];
    blobs.forEach(function (b) {
      var g = x.createRadialGradient(b[0], b[1], 0, b[0], b[1], b[2]);
      g.addColorStop(0, b[3]);
      g.addColorStop(1, "rgba(14,15,14,0)");
      x.fillStyle = g;
      x.fillRect(0, 0, W, H);
    });
  }

  function grain(x, alpha) {
    var n = 256, c = document.createElement("canvas");
    c.width = c.height = n;
    var g = c.getContext("2d"), d = g.createImageData(n, n);
    for (var i = 0; i < d.data.length; i += 4) {
      var v = Math.random() * 255 | 0;
      d.data[i] = d.data[i + 1] = d.data[i + 2] = v;
      d.data[i + 3] = 255;
    }
    g.putImageData(d, 0, 0);
    x.save();
    x.globalAlpha = alpha;
    x.globalCompositeOperation = "multiply";
    x.fillStyle = x.createPattern(c, "repeat");
    x.fillRect(0, 0, W, H);
    x.restore();
  }

  function roundRect(x, px, py, w, h, r) {
    x.beginPath();
    x.moveTo(px + r, py);
    x.arcTo(px + w, py, px + w, py + h, r);
    x.arcTo(px + w, py + h, px, py + h, r);
    x.arcTo(px, py + h, px, py, r);
    x.arcTo(px, py, px + w, py, r);
    x.closePath();
  }

  function fitText(x, text, font, size, maxW) {
    var s = size;
    x.font = font.replace("{s}", s);
    while (x.measureText(text).width > maxW && s > 20) {
      s -= 4;
      x.font = font.replace("{s}", s);
    }
    return s;
  }

  function pill(x, text, px, py, dark) {
    x.font = "500 30px " + UI;
    var w = x.measureText(text).width + 44;
    roundRect(x, px, py, w, 56, 28);
    if (dark) { x.fillStyle = INK; x.fill(); x.fillStyle = PAPER; }
    else { x.lineWidth = 2.5; x.strokeStyle = INK; x.stroke(); x.fillStyle = INK; }
    x.textBaseline = "middle";
    x.fillText(text, px + 22, py + 29);
    x.textBaseline = "alphabetic";
    return w;
  }

  function qr(x, url, px, py, size) {
    if (!url || typeof window.qrcode !== "function") return false;
    try {
      var q = window.qrcode(0, "M");
      q.addData(url);
      q.make();
      var n = q.getModuleCount(), quiet = 2, cell = size / (n + quiet * 2);
      x.fillStyle = PAPER;
      roundRect(x, px, py, size, size, 16);
      x.fill();
      x.fillStyle = INK;
      for (var r = 0; r < n; r++) {
        for (var c = 0; c < n; c++) {
          if (q.isDark(r, c)) x.fillRect(px + (c + quiet) * cell, py + (r + quiet) * cell, Math.ceil(cell), Math.ceil(cell));
        }
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Draw the card.
   * @param {HTMLCanvasElement} canvas
   * @param {object} d data from the page (see lab.js cardData)
   * @returns {Promise<HTMLCanvasElement>}
   */
  function draw(canvas, d) {
    return fontsReady().then(function () {
      canvas.width = W;
      canvas.height = H;
      var x = canvas.getContext("2d");
      var lang = d.lang;
      x.textBaseline = "alphabetic";

      // background
      x.fillStyle = GREY;
      x.fillRect(0, 0, W, H);
      fog(x);

      // header
      mark(x, M, M, 150, INK);
      x.fillStyle = INK;
      x.font = "600 30px " + UI;
      x.textAlign = "right";
      x.fillText(t(d.labels.lab, lang), W - M, M + 34);
      x.font = "400 26px " + BODY;
      x.fillStyle = "rgba(14,15,14,0.7)";
      x.fillText(t(d.labels.brand, lang), W - M, M + 72);
      x.textAlign = "left";

      // element disc
      var cx = W - M - 190, cy = 430, r = 190;
      x.beginPath();
      x.arc(cx, cy, r, 0, Math.PI * 2);
      x.fillStyle = INK;
      x.fill();
      x.fillStyle = PAPER;
      x.textAlign = "center";
      x.font = "400 230px " + DISPLAY;
      x.fillText(t(d.element, "zh"), cx, cy + 82);
      x.textAlign = "left";

      // persona
      x.fillStyle = "rgba(14,15,14,0.66)";
      x.font = "500 32px " + UI;
      x.fillText(t(d.labels.persona, lang), M, 330);
      x.fillStyle = INK;
      var maxW = cx - r - M - 30;
      fitText(x, t(d.archetype, lang), "400 {s}px " + DISPLAY, lang === "zh" ? 104 : 76, maxW);
      x.fillText(t(d.archetype, lang), M, 440);
      x.font = "500 36px " + UI;
      x.fillStyle = "rgba(14,15,14,0.72)";
      var other = lang === "zh" ? d.archetype.en : d.archetype.zh;
      fitText(x, other, "500 {s}px " + UI, 36, maxW);
      x.fillText(other, M, 500);

      // tags
      var px = M, py = 560;
      px += pill(x, t(d.element, lang) + (lang === "zh" ? " · " + d.dayMaster + "日主" : " · " + d.dayMaster), px, py, true) + 14;
      px += pill(x, d.type, px, py, false) + 14;
      pill(x, t(d.mode, lang) + (lang === "zh" ? "型" : ""), px, py, false);

      // four pillars
      var bx = M, by = 680, bw = W - 2 * M, bh = 340;
      roundRect(x, bx, by, bw, bh, 28);
      x.fillStyle = INK;
      x.fill();
      var labels = lang === "zh" ? ["年柱", "月柱", "日柱", "时柱"] : ["Year", "Month", "Day", "Hour"];
      var colW = bw / 4;
      d.pillars.forEach(function (p, i) {
        var mx = bx + colW * i + colW / 2;
        x.textAlign = "center";
        x.fillStyle = "rgba(244,245,243,0.6)";
        x.font = "500 28px " + UI;
        x.fillText(labels[i], mx, by + 62);
        x.fillStyle = PAPER;
        x.font = "400 108px " + DISPLAY;
        x.fillText(p ? p.gan : "?", mx, by + 186);
        x.fillText(p ? p.zhi : "?", mx, by + 300);
        if (i > 0) {
          x.fillStyle = "rgba(244,245,243,0.16)";
          x.fillRect(bx + colW * i, by + 40, 2, bh - 80);
        }
      });
      x.textAlign = "left";

      // element balance
      var ey = 1080, maxPct = Math.max.apply(null, d.pct);
      d.pct.forEach(function (p, i) {
        var yy = ey + i * 38;
        x.fillStyle = INK;
        x.font = "400 28px " + DISPLAY;
        x.fillText(d.wxNames[i].zh, M, yy + 22);
        x.fillStyle = "rgba(14,15,14,0.12)";
        roundRect(x, M + 52, yy + 4, 560, 20, 10);
        x.fill();
        x.fillStyle = INK;
        roundRect(x, M + 52, yy + 4, Math.max(20, 560 * p / maxPct), 20, 10);
        x.fill();
        x.font = "500 24px " + UI;
        x.fillText(Math.round(p * 100) + "%", M + 630, yy + 22);
      });

      // QR + call to action
      var qs = 200, qx = W - M - qs, qy = 1070;
      var hasQr = qr(x, d.url, qx, qy, qs);
      x.fillStyle = INK;
      x.textAlign = hasQr ? "right" : "left";
      x.font = "600 26px " + UI;
      if (hasQr) x.fillText(t(d.labels.scan, lang), qx + qs, qy + qs + 42);

      // footer
      x.textAlign = "left";
      x.fillStyle = "rgba(14,15,14,0.62)";
      x.font = "400 24px " + BODY;
      x.fillText(t(d.labels.note, lang), M, H - M + 8);

      grain(x, 0.1);
      return canvas;
    });
  }

  return { draw: draw, W: W, H: H };
});
