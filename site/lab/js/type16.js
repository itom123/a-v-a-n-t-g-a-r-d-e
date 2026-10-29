/*!
 * AG LAB · 16型创作人格 scoring

 * Original item bank (lab-items.js) built on Jungian type theory: four
 * preference pairs (E/I, S/N, T/F, J/P), each measured by three facets of
 * four single-statement items on a 7-point agreement scale. Two items per
 * facet are keyed to each pole, so agreeing with everything cancels out.
 * An 8-item creative-resilience scale and 4 validity items sit alongside.
 *
 * Reported like a professional type report: a letter per pair, a percentage,
 * a preference-clarity band, facets that run against the overall preference,
 * the cognitive-function order, and an answer-quality check (straight-lining,
 * acquiescence, inconsistency on paired items, attention items, speed).
 * Visitors who already know their type can enter it instead (fromSelfReport).
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
   * Score the type items.
   * @param {Array<{id:string,d:string,f:string,key:number}>} items key +1: agreeing points to E/S/T/J
   * @param {Object<string,number>} answers id → 1..7 (1 strongly disagree … 7 strongly agree)
   * @param {{durationMs?:number, validity?:Array, pairs?:Array<string[]>}} [meta]
   */
  function scoreType(items, answers, meta) {
    meta = meta || {};
    var dims = {}, facets = {}, byId = {};
    DIMS.forEach(function (d) { dims[d] = { sum: 0, n: 0 }; });
    var values = [], neutral = 0, missing = 0, raw = 0;

    items.forEach(function (it) {
      byId[it.id] = it;
      var v = answers[it.id];
      if (!(v >= 1 && v <= 7)) { missing++; return; }
      values.push(v);
      raw += v;
      if (v === 4) neutral++;
      var s = (it.key < 0 ? -1 : 1) * (v - 4); // + toward the first letter of the pair
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
    var flags = [], indices = {};
    var n = values.length;
    if (n) {
      var counts = {};
      values.forEach(function (v) { counts[v] = (counts[v] || 0) + 1; });
      var top = Math.max.apply(null, Object.keys(counts).map(function (k) { return counts[k]; }));
      if (top / n >= 0.85) flags.push("straight");
      if (neutral / n >= 0.6) flags.push("neutral");
      // Keying is balanced, so the plain mean of raw answers sits near 4 for anyone who reads the items
      indices.acquiescence = raw / n;
      if (n >= 16 && (indices.acquiescence > 5.5 || indices.acquiescence < 2.5) && flags.indexOf("straight") < 0) flags.push("acquiescence");
      if (meta.durationMs && meta.durationMs < n * 1800) flags.push("fast");
    }
    if (meta.pairs && meta.pairs.length) {
      var gaps = [];
      meta.pairs.forEach(function (p) {
        var a = byId[p[0]], b = byId[p[1]], va = answers[p[0]], vb = answers[p[1]];
        if (!a || !b || !(va >= 1) || !(vb >= 1)) return;
        gaps.push(Math.abs((a.key < 0 ? -1 : 1) * (va - 4) - (b.key < 0 ? -1 : 1) * (vb - 4)));
      });
      if (gaps.length) {
        indices.inconsistency = gaps.reduce(function (x, y) { return x + y; }, 0) / gaps.length;
        if (gaps.length >= 3 && indices.inconsistency >= 3) flags.push("inconsistent");
      }
    }
    if (meta.validity && meta.validity.length) {
      var failed = 0;
      meta.validity.forEach(function (it) {
        var v = answers[it.id];
        if (!(v >= 1 && v <= 7)) return;
        if (it.kind === "instructed" && (it.want >= 4 ? v <= 4 : v >= 4)) failed++;
        if (it.kind === "infrequency" && v >= 6) failed++;
      });
      indices.attentionFailed = failed;
      if (failed) flags.push("attention");
    }
    if (missing) flags.push("missing");
    var weight = flags.length + (flags.indexOf("attention") >= 0 ? 1 : 0);
    var quality = weight === 0 ? "high" : weight === 1 ? "medium" : "low";

    return {
      type: type,
      dims: detail,
      facets: facets,
      against: against,
      stack: stack(type),
      temperament: temperament(type),
      quality: quality,
      qualityFlags: flags,
      indices: indices,
      self: false
    };
  }

  var SURE = { slight: 0.12, moderate: 0.4, clear: 0.7 };

  /** "infj-t", "INFJ (T)", "I'm an ENFP" → { type: "INFJ", at: "T" } or null */
  function parseCode(s) {
    var m = /\b([EI])([SN])([TF])([JP])(?:\s*[-–(]?\s*([AT])\b)?/i.exec(String(s || ""));
    return m ? { type: (m[1] + m[2] + m[3] + m[4]).toUpperCase(), at: m[5] ? m[5].toUpperCase() : null } : null;
  }

  /**
   * A type the visitor already knows, in the same shape as scoreType().
   * @param {string} code e.g. "INFJ" or "INFJ-T"
   * @param {Object<string,string>} [sure] per pair: "slight" | "moderate" | "clear"
   * @param {string} [source] "official" | "16p" | "other" | "self"
   */
  function fromSelfReport(code, sure, source) {
    var p = parseCode(code);
    if (!p) return null;
    sure = sure || {};
    var detail = {};
    DIMS.forEach(function (d, i) {
      var letter = p.type[i], first = letter === d[0];
      var c = SURE[sure[d]] != null ? SURE[sure[d]] : SURE.moderate;
      detail[d] = { letter: letter, sum: null, n: 0, pctFirst: Math.round(first ? 50 + 50 * c : 50 - 50 * c), clarity: c, band: clarityBand(c) };
    });
    return {
      type: p.type,
      at: p.at,
      dims: detail,
      facets: {},
      against: [],
      stack: stack(p.type),
      temperament: temperament(p.type),
      quality: "self",
      qualityFlags: [],
      indices: {},
      self: true,
      source: source || "self"
    };
  }

  /**
   * Creative-resilience scale (7-point agreement, half reverse-keyed).
   * @param {Array<{id:string,key:number}>} items
   * @param {Object<string,number>} answers id → 1..7
   * @param {string} [at] "A" | "T" from a self-reported code, used only when nothing was answered
   */
  function scoreResilience(items, answers, at) {
    var sum = 0, n = 0;
    items.forEach(function (it) {
      var v = answers[it.id];
      if (!(v >= 1 && v <= 7)) return;
      sum += it.key > 0 ? v : 8 - v;
      n++;
    });
    if (!n) {
      var guess = at === "A" ? 68 : at === "T" ? 42 : 50;
      return { pct: guess, band: band(guess), n: 0, estimated: true };
    }
    var pct = Math.round((sum - n) / (6 * n) * 100);
    return { pct: pct, band: band(pct), n: n, estimated: false };
  }
  function band(pct) { return pct >= 70 ? "steady" : pct >= 45 ? "balanced" : "sensitive"; }

  return {
    DIMS: DIMS,
    scoreType: scoreType,
    scoreResilience: scoreResilience,
    fromSelfReport: fromSelfReport,
    parseCode: parseCode,
    stack: stack,
    temperament: temperament,
    clarityBand: clarityBand
  };
});
