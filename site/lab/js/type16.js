/*!
 * AG LAB · 16型创作人格 scoring
 *
 * Original item bank (see lab-content.js) built on Jungian type theory:
 * four preference pairs (E/I, S/N, T/F, J/P), each measured by three facets
 * of four bipolar 7-point items, plus an 8-item creative-resilience scale.
 * Pole sides are balanced within every facet so position bias cancels out.
 *
 * Reported like a professional type report: a letter per pair, a percentage,
 * a preference-clarity band, facet results that run against the overall
 * preference, the cognitive-function order, and an answer-quality check.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.AGType16 = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var DIMS = ["EI", "SN", "TF", "JP"];
  var OPP = { S: "N", N: "S", T: "F", F: "T" };
  // Ties go to I, N, F and P, the convention used by type publishers.
  var TIE = { EI: "I", SN: "N", TF: "F", JP: "P" };

  function clarityBand(c) {
    if (c < 0.17) return "slight";
    if (c < 0.5) return "moderate";
    if (c < 0.83) return "clear";
    return "very-clear";
  }

  /**
   * Cognitive-function order (dominant, auxiliary, tertiary, inferior).
   * @param {string} type e.g. "INFJ"
   * @returns {string[]} e.g. ["Ni","Fe","Ti","Se"]
   */
  function stack(type) {
    var E = type[0] === "E", J = type[3] === "J";
    var perceiving = type[1], judging = type[2];
    var outer = J ? judging : perceiving;   // the function shown to the world
    var inner = J ? perceiving : judging;
    var dom = E ? outer + "e" : inner + "i";
    var aux = E ? inner + "i" : outer + "e";
    var tert = OPP[aux[0]] + dom[1];
    var inf = OPP[dom[0]] + (dom[1] === "e" ? "i" : "e");
    return [dom, aux, tert, inf];
  }

  function temperament(type) {
    if (type[1] === "N") return type[2] === "F" ? "NF" : "NT";
    return type[3] === "J" ? "SJ" : "SP";
  }

  /**
   * Score the bipolar items.
   * @param {Array<{id:string,d:string,f:string,swap:boolean}>} items
   * @param {Object<string,number>} answers id → 1..7 (1 = left statement fully)
   * @param {{durationMs?:number}} [meta]
   */
  function scoreType(items, answers, meta) {
    var dims = {}, facets = {};
    DIMS.forEach(function (d) { dims[d] = { sum: 0, n: 0 }; });
    var values = [], left = 0, right = 0, neutral = 0, missing = 0;

    items.forEach(function (it) {
      var v = answers[it.id];
      if (!(v >= 1 && v <= 7)) { missing++; return; }
      values.push(v);
      if (v === 4) neutral++;
      else if (v < 4) left++;
      else right++;
      var s = it.swap ? v - 4 : 4 - v; // + toward the first letter of the pair
      dims[it.d].sum += s;
      dims[it.d].n++;
      if (!facets[it.f]) facets[it.f] = { d: it.d, sum: 0, n: 0 };
      facets[it.f].sum += s;
      facets[it.f].n++;
    });

    var type = "";
    var detail = {};
    DIMS.forEach(function (d) {
      var x = dims[d];
      var max = Math.max(1, x.n * 3);
      var letter = x.sum > 0 ? d[0] : x.sum < 0 ? d[1] : TIE[d];
      var clarity = Math.abs(x.sum) / max;
      type += letter;
      detail[d] = {
        letter: letter,
        sum: x.sum,
        n: x.n,
        pctFirst: Math.round(50 + 50 * x.sum / max),
        clarity: clarity,
        band: clarityBand(clarity)
      };
    });

    // Facets that lean clearly against the overall preference
    var against = [];
    Object.keys(facets).forEach(function (f) {
      var x = facets[f];
      var c = x.sum / Math.max(1, x.n * 3);
      var overallFirst = detail[x.d].letter === x.d[0];
      if ((overallFirst && c <= -0.34) || (!overallFirst && c >= 0.34)) {
        against.push({ facet: f, d: x.d, leans: c > 0 ? x.d[0] : x.d[1], strength: Math.abs(c) });
      }
    });

    // Answer quality
    var flags = [];
    var n = values.length;
    if (n) {
      var counts = {};
      values.forEach(function (v) { counts[v] = (counts[v] || 0) + 1; });
      var top = Math.max.apply(null, Object.keys(counts).map(function (k) { return counts[k]; }));
      if (top / n >= 0.85) flags.push("straight");
      if (neutral / n >= 0.6) flags.push("neutral");
      var polar = left + right;
      if (polar >= 12 && (left / polar >= 0.9 || left / polar <= 0.1)) flags.push("position");
      if (meta && meta.durationMs && meta.durationMs < n * 1800) flags.push("fast");
    }
    if (missing) flags.push("missing");
    var quality = flags.length === 0 ? "high" : flags.length === 1 ? "medium" : "low";

    return {
      type: type,
      dims: detail,
      facets: facets,
      against: against,
      stack: stack(type),
      temperament: temperament(type),
      quality: quality,
      qualityFlags: flags
    };
  }

  /**
   * Creative-resilience scale (5-point agreement, some items reverse-keyed).
   * @param {Array<{id:string,key:number}>} items
   * @param {Object<string,number>} answers id → 1..5
   */
  function scoreResilience(items, answers) {
    var sum = 0, n = 0;
    items.forEach(function (it) {
      var v = answers[it.id];
      if (!(v >= 1 && v <= 5)) return;
      sum += it.key > 0 ? v : 6 - v;
      n++;
    });
    if (!n) return { pct: 50, band: "balanced", n: 0 };
    var pct = Math.round((sum - n) / (4 * n) * 100);
    return { pct: pct, band: pct >= 70 ? "steady" : pct >= 45 ? "balanced" : "sensitive", n: n };
  }

  return {
    DIMS: DIMS,
    scoreType: scoreType,
    scoreResilience: scoreResilience,
    stack: stack,
    temperament: temperament,
    clarityBand: clarityBand
  };
});
