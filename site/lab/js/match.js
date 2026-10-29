/*!
 * AG LAB · matching
 *
 * Ranks schools, countries and mentor styles for one person.
 * The practical answers (discipline, level, budget, city, readiness) carry
 * most of the weight; personality and the 八字 working modes shape the
 * teaching-style fit and the mentor style; the 五行 direction line is a small,
 * clearly labelled bonus for fun.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.AGMatch = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var W = { disc: 0.34, style: 0.22, budget: 0.16, city: 0.14, ready: 0.08, fang: 0.06 };
  // 五行方位, read from mainland China: 金 west, 水 north/sea, 火 south, 木 east, 土 centre
  var FANG = { UK: [3, 4], HK: [0, 2], SG: [1] };

  function clamp(x) { return Math.max(0, Math.min(1, x)); }

  function prefs(t) {
    var d = t.dims;
    var E = d.EI.pctFirst / 100, S = d.SN.pctFirst / 100, T = d.TF.pctFirst / 100, J = d.JP.pctFirst / 100;
    return { E: E, I: 1 - E, S: S, N: 1 - S, T: T, F: 1 - T, J: J, P: 1 - J };
  }

  function relModes(chart) {
    var s = chart ? chart.modes.share : { expression: 0.2, research: 0.2, structure: 0.2, applied: 0.2, collaboration: 0.2 };
    var max = Math.max(s.expression, s.research, s.structure, s.applied, s.collaboration) || 1;
    return {
      expression: s.expression / max, research: s.research / max, structure: s.structure / max,
      applied: s.applied / max, collaboration: s.collaboration / max
    };
  }

  function norm(v) {
    var max = Math.max(v.research, v.making, v.industry) || 1;
    return { research: v.research / max, making: v.making / max, industry: v.industry / max };
  }

  /** How this person likes to learn: research / making / industry. */
  function learningStyle(t, chart) {
    var p = prefs(t), m = relModes(chart);
    return norm({
      research: 0.40 * p.N + 0.15 * p.I + 0.15 * p.T + 0.30 * m.research,
      making: 0.35 * p.S + 0.25 * p.P + 0.40 * m.expression,
      industry: 0.30 * p.J + 0.25 * p.E + 0.15 * p.T + 0.30 * (m.applied + m.structure) / 2
    });
  }

  function styleFit(u, school) {
    var s = norm(school.style);
    return clamp(1 - (Math.abs(u.research - s.research) + Math.abs(u.making - s.making) + Math.abs(u.industry - s.industry)) / 3);
  }

  function levelOk(level, school) {
    if (!level || level === "any") return true;
    return school.levels.indexOf(level) >= 0;
  }

  function discFit(chosen, school) {
    if (!chosen || !chosen.length) return { v: 0.6, key: null };
    var best = 0, key = chosen[0];
    chosen.forEach(function (k) {
      var s = school.disc[k] || 0;
      if (s > best) { best = s; key = k; }
    });
    return { v: best === 2 ? 1 : best === 1 ? 0.6 : 0, key: key, strength: best };
  }

  function budgetFit(budget, cost) {
    if (!budget) return 0.8;
    var diff = cost - budget;
    return diff <= 0 ? 1 : diff === 1 ? 0.55 : diff === 2 ? 0.2 : 0;
  }

  function cityFit(pref, school) {
    if (!pref || pref === "any") return 0.8;
    if (pref === "near") return school.country === "UK" ? (school.cityType === "metro" ? 0.4 : 0.3) : 1;
    if (pref === "metro") return { metro: 1, mid: 0.6, small: 0.4 }[school.cityType];
    return { metro: 0.6, mid: 1, small: 0.85 }[school.cityType]; // "mid": a smaller culture city
  }

  function readyFit(stage, timeline, selectivity) {
    var prep = (stage || 0) + (timeline || 0);
    var need = selectivity * 1.5;
    return prep >= need - 1 ? 1 : prep >= need - 2 ? 0.7 : 0.4;
  }

  function fangFit(chart, country) {
    if (!chart) return 0;
    var set = FANG[country] || [];
    if (set.indexOf(chart.yongShen.use) >= 0) return 1;
    if (set.indexOf(chart.yongShen.fav) >= 0) return 0.6;
    return 0;
  }

  /**
   * @param {object} profile {level, disciplines[], stage, timeline, budget, city}
   * @param {object} persona {type (scoreType result), resilience, chart|null}
   * @param {object} data {schools[], mentors[], tutors[]}
   */
  function run(profile, persona, data) {
    var u = learningStyle(persona.type, persona.chart);
    var ranked = [];
    data.schools.forEach(function (s) {
      if (!levelOk(profile.level, s)) return;
      var d = discFit(profile.disciplines, s);
      if (d.v === 0) return;
      var f = {
        disc: d.v,
        style: styleFit(u, s),
        budget: budgetFit(profile.budget, s.cost),
        city: cityFit(profile.city, s),
        ready: readyFit(profile.stage, profile.timeline, s.selectivity),
        fang: fangFit(persona.chart, s.country)
      };
      var score = 0;
      Object.keys(W).forEach(function (k) { score += W[k] * f[k]; });
      ranked.push({ school: s, score: Math.round(score * 100), factors: f, discKey: d.key, discStrength: d.strength });
    });
    ranked.sort(function (a, b) { return b.score - a.score || b.factors.disc - a.factors.disc; });

    var countries = ["UK", "HK", "SG"].map(function (c) {
      var list = ranked.filter(function (r) { return r.school.country === c; }).slice(0, 3);
      var avg = list.length ? list.reduce(function (a, r) { return a + r.score; }, 0) / list.length : 0;
      return { country: c, score: Math.round(avg), top: list, fang: fangFit(persona.chart, c) };
    }).filter(function (c) { return c.top.length; }).sort(function (a, b) { return b.score - a.score; });

    return {
      learningStyle: u,
      schools: ranked,
      countries: countries,
      mentors: mentorStyles(persona, data)
    };
  }

  /** Mentor styles, best first, with tutors who teach that way (conflicts removed). */
  function mentorStyles(persona, data, topSchoolIds) {
    var p = prefs(persona.type), m = relModes(persona.chart);
    var res = persona.resilience ? persona.resilience.pct / 100 : 0.5;
    var s = {
      critical: 0.35 * p.N + 0.25 * p.T + 0.20 * p.I + 0.20 * m.research,
      studio: 0.35 * p.S + 0.30 * p.P + 0.35 * m.expression,
      project: 0.30 * p.J + 0.25 * p.T + 0.20 * p.E + 0.25 * (m.applied + m.structure) / 2,
      dialogue: 0.35 * p.F + 0.20 * p.E + 0.20 * m.collaboration + 0.25 * (1 - res)
    };
    return Object.keys(s).sort(function (a, b) { return s[b] - s[a]; }).map(function (k) {
      return { key: k, score: s[k] };
    });
  }

  /**
   * Tutors to show for a mentor style, leaving out anyone who teaches on a
   * programme that is also being recommended (conflict of interest).
   */
  function tutorsFor(styleKey, tutors, recommendedSchoolIds) {
    return (tutors || []).filter(function (t) {
      if (!t.enabled || t.styles.indexOf(styleKey) < 0) return false;
      return !(t.avoidSchools || []).some(function (id) { return recommendedSchoolIds.indexOf(id) >= 0; });
    });
  }

  return { run: run, learningStyle: learningStyle, tutorsFor: tutorsFor, WEIGHTS: W, FANG: FANG };
});
