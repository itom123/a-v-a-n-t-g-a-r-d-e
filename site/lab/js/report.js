/*!
 * AG LAB · long-form report composer
 *
 * Turns result keys into titled sections of prose, from the copy in
 * lab-report-*.js. The page shows `page`; the email adds `email` (and repeats
 * `page`). Shared by the browser and workers/lab-results, so both say the same.
 *
 * Input (all keys, no free text):
 *   type "INFJ", dims {EI: pctFirst…}, self (bool), element 0–4, dayMaster 0–9,
 *   strength "weak"…, strongest 0–4, missing [0–4], hidden [0–4],
 *   use 0–4, avoid [0–4], geju "正官格", sun/moon/rising 0–11|null,
 *   resilience 0–100, mode5 "research", mentor "critical", country "UK",
 *   timeline 0–2, stage 0–3
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.AGReport = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var DIMS = [["EI", "E", "I"], ["SN", "S", "N"], ["TF", "T", "F"], ["JP", "J", "P"]];
  var OPP = { S: "N", N: "S", T: "F", F: "T" };

  function temperament(t) { return t[1] === "N" ? (t[2] === "F" ? "NF" : "NT") : t[3] === "J" ? "SJ" : "SP"; }
  function stack(t) {
    var E = t[0] === "E", J = t[3] === "J";
    var outer = J ? t[2] : t[1], inner = J ? t[1] : t[2];
    var dom = E ? outer + "e" : inner + "i", aux = E ? inner + "i" : outer + "e";
    return [dom, aux, OPP[aux[0]] + dom[1], OPP[dom[0]] + (dom[1] === "e" ? "i" : "e")];
  }
  function band(pctFirst) {
    var c = Math.abs(pctFirst - 50) / 50;
    return c < 0.17 ? "slight" : c < 0.5 ? "moderate" : c < 0.83 ? "clear" : "very-clear";
  }
  function resBand(p) { return p >= 70 ? "steady" : p >= 45 ? "balanced" : "sensitive"; }

  // Section and sentence frames (the blocks themselves live in lab-report-*.js)
  var W = {
    portrait: { zh: "你的创作画像", en: "Your portrait as a maker" },
    prefs: { zh: "四个维度，逐一细读", en: "Your four preferences, in depth" },
    mind: { zh: "你的思维是怎样运转的", en: "How your mind works" },
    pressure: { zh: "压力之下，与成长的方向", en: "Under pressure, and where you grow" },
    chart: { zh: "日主与五行", en: "Your Day Master and the five elements" },
    signs: { zh: "太阳、月亮与上升", en: "Sun, Moon and Rising" },
    paths: { zh: "三条创作路径，展开来看", en: "Your three paths, in depth" },
    chartDeep: { zh: "命盘再细读：格局与喜忌", en: "Your chart, read more deeply" },
    stuck: { zh: "卡住的时候", en: "When you get stuck" },
    portfolio: { zh: "你的作品集该是什么样", en: "What your portfolio should look like" },
    projects: { zh: "三个为你定制的作品集项目", en: "Three portfolio projects made for you" },
    plan: { zh: "接下来的 12 个月", en: "Your next 12 months" },
    crit: { zh: "在 crit 现场", en: "In the crit room" },
    interview: { zh: "面试与作品集面谈", en: "Interviews and portfolio reviews" },
    matches: { zh: "为什么是这些匹配", en: "Why these matches" },
    quarters: [{ zh: "第 1–3 个月", en: "Months 1–3" }, { zh: "第 4–6 个月", en: "Months 4–6" }, { zh: "第 7–9 个月", en: "Months 7–9" }, { zh: "第 10–12 个月", en: "Months 10–12" }],
    dimLead: { zh: "{pair}：你偏向「{letter}」，倾向{band}。", en: "{pair}: you lean towards {letter}, and the preference is {band}." },
    bands: { slight: { zh: "轻微", en: "slight" }, moderate: { zh: "中等", en: "moderate" }, clear: { zh: "清晰", en: "clear" }, "very-clear": { zh: "非常清晰", en: "very clear" } },
    selfNote: { zh: "（按你填写的类型与确定程度）", en: " (from the type you entered and how sure you are)" },
    dom: { zh: "主导功能 {fn}", en: "Dominant function: {fn}" },
    aux: { zh: "辅助功能 {fn}", en: "Auxiliary function: {fn}" },
    sun: { zh: "太阳{sign}", en: "Sun in {sign}" },
    moon: { zh: "月亮{sign}", en: "Moon in {sign}" },
    rising: { zh: "上升{sign}", en: "{sign} Rising" },
    noRising: { zh: "没有出生时间，所以这里不解读上升星座。", en: "Without a birth time there is no Rising sign to read here." },
    block: { zh: "常见的卡点", en: "Where you tend to stall" },
    remedy: { zh: "怎么重新动起来", en: "How to get moving again" },
    ritual: { zh: "一个小仪式", en: "A small ritual" },
    impression: { zh: "你给人的印象", en: "How you come across" },
    blindSpots: { zh: "容易忽略的地方", en: "What you may miss" },
    practise: { zh: "可以练习的三件事", en: "Three things to practise" },
    before: { zh: "面谈之前", en: "Before" },
    during: { zh: "面谈之中", en: "In the room" },
    questions: { zh: "可能被问到的问题", en: "Questions to rehearse" },
    useEl: { zh: "你的喜用：{el}", en: "Your favourable element: {el}" },
    avoidEl: { zh: "需要留意：{el}", en: "Keep in check: {el}" },
    practice: { zh: "适合你的材料与节奏", en: "Materials and rhythms that suit you" },
    pattern: { zh: "格局：{g}", en: "Pattern: {g}" },
    tweaks: { zh: "按你的情况微调", en: "Adjusted to you" },
    country: { zh: "学习环境", en: "Where to study" },
    mentor: { zh: "导师风格", en: "Mentor style" },
    mode: { zh: "你的创作方式", en: "How you create" }
  };

  function make(L, lang) {
    function t(v, vars) {
      var s = v == null ? "" : typeof v === "string" ? v : v[lang] != null ? v[lang] : v.zh || "";
      if (vars) Object.keys(vars).forEach(function (k) { s = s.split("{" + k + "}").join(vars[k]); });
      return s;
    }
    function el(i) { return t(L.wx[i]); }
    function sign(i) { return t(L.zodiac[i].name); }
    return { t: t, el: el, sign: sign };
  }

  /**
   * @returns {{page: Array<{id:string,title:string,items:Array<{k?:string,p:string}>}>, email: Array<…>}}
   * Each item is a paragraph, optionally with a short lead-in `k` (a label).
   */
  function compose(r, L, lang) {
    var h = make(L, lang), t = h.t;
    var ty = r.type, temp = temperament(ty), st = stack(ty);
    var deep = L.typeDeep[ty], careers = L.careers[ty];
    function P(p, k) { return { k: k ? t(k) : "", p: typeof p === "string" ? p : t(p) }; }

    var page = [];
    page.push({ id: "portrait", title: t(W.portrait), items: [P(deep.portrait), P(deep.thinking)] });
    page.push({
      id: "prefs", title: t(W.prefs),
      items: DIMS.map(function (d) {
        var p = r.dims[d[0]], first = p >= 50, letter = first ? d[1] : d[2];
        var b = band(p);
        var lead = t(W.dimLead, { pair: d[1] + "/" + d[2], letter: letter + " " + t(L.letters[letter]), band: t(W.bands[b]) }) + (r.self ? t(W.selfNote) : "");
        return { k: lead, p: t(L.dimNarrative[d[0]][letter][b]) };
      })
    });
    page.push({
      id: "mind", title: t(W.mind),
      items: [
        P(L.functionsDeep[st[0]].dominant, t(W.dom, { fn: st[0] + " " + t(L.fn[st[0]]) })),
        P(L.functionsDeep[st[1]].auxiliary, t(W.aux, { fn: st[1] + " " + t(L.fn[st[1]]) })),
        P(deep.others)
      ]
    });
    page.push({ id: "pressure", title: t(W.pressure), items: [P(deep.pressure), P(L.resilienceDeep[resBand(r.resilience)]), P(deep.growth)] });
    var dmLabel = "甲乙丙丁戊己庚辛壬癸"[r.dayMaster] + "木火土金水"[r.element] + " · " + t(L.dayMasters[r.dayMaster].img);
    var chartItems = [P(L.dayMasterDeep[r.dayMaster], dmLabel)];
    if (L.strengthDeep[r.strength]) chartItems.push(P(L.strengthDeep[r.strength], L.strengthLevels[r.strength]));
    if (r.strongest != null) chartItems.push(P(L.elementBalance[r.strongest].strong, h.el(r.strongest)));
    (r.missing || []).slice(0, 2).forEach(function (m) {
      var hidden = (r.hidden || []).indexOf(m) >= 0;
      chartItems.push(P(L.elementBalance[m][hidden ? "hidden" : "missing"], h.el(m)));
    });
    page.push({ id: "chart", title: t(W.chart), items: chartItems });
    if (r.sun != null) {
      var signs = [P(L.zodiacDeep[r.sun].sun, t(W.sun, { sign: h.sign(r.sun) }))];
      if (r.moon != null) signs.push(P(L.zodiacDeep[r.moon].moon, t(W.moon, { sign: h.sign(r.moon) })));
      if (r.rising != null) signs.push(P(L.zodiacDeep[r.rising].rising, t(W.rising, { sign: h.sign(r.rising) })));
      else signs.push(P(W.noRising));
      page.push({ id: "signs", title: t(W.signs), items: signs });
    }
    page.push({
      id: "paths", title: t(W.paths),
      items: careers.paths.map(function (p, i) { return P(L.pathsDeep[ty][i], "0" + (i + 1) + " · " + t(p.name)); })
    });

    var email = [];
    var chartDeep = [];
    if (r.geju && L.gejuDeep[r.geju]) chartDeep.push(P(L.gejuDeep[r.geju], t(W.pattern, { g: r.geju })));
    if (r.use != null) chartDeep.push(P(L.yongDeep[r.use].use, t(W.useEl, { el: h.el(r.use) })));
    if (r.avoid && r.avoid.length) chartDeep.push(P(L.yongDeep[r.avoid[0]].avoid, t(W.avoidEl, { el: h.el(r.avoid[0]) })));
    chartDeep.push(P(L.elementPractice[r.element], W.practice));
    email.push({ id: "chartDeep", title: t(W.chartDeep), items: chartDeep });
    if (r.sun != null) {
      var z = L.zodiacEmail[r.sun];
      email.push({ id: "stuck", title: t(W.stuck), items: [P(z.block, W.block), P(z.remedy, W.remedy), P(z.ritual, W.ritual)] });
    }
    email.push({ id: "portfolio", title: t(W.portfolio), items: [P(L.portfolioShape[ty])] });
    email.push({
      id: "projects", title: t(W.projects), numbered: true,
      items: L.projects[temp][r.element].map(function (pr) { return P(pr.brief, pr.title); })
    });
    var plan = L.plan12[temp][r.timeline != null ? r.timeline : 1];
    var tw = L.planTweaks;
    email.push({
      id: "plan", title: t(W.plan), numbered: true,
      items: plan.map(function (q, i) { return P(q.d, t(W.quarters[i]) + " · " + t(q.title)); })
    });
    email.push({
      id: "tweaks", title: t(W.tweaks),
      items: [P(tw.resilience[resBand(r.resilience)]), P(tw.jp[ty[3]])].concat(r.stage != null && tw.stage[r.stage] ? [P(tw.stage[r.stage])] : [])
    });
    var cg = L.critGuide[ty];
    email.push({
      id: "crit", title: t(W.crit),
      items: [P(cg.impression, W.impression), P(cg.blindSpots, W.blindSpots)].concat(cg.practise.map(function (x, i) { return P(x, i === 0 ? W.practise : ""); }))
    });
    var ig = L.interviewGuide[temp];
    email.push({
      id: "interview", title: t(W.interview),
      items: [P(ig.before, W.before), P(ig.during, W.during)].concat(ig.questions.map(function (x, i) { return P(x, i === 0 ? W.questions : ""); }))
    });
    var md = L.matchDeep, matches = [];
    if (r.country && md.country[r.country]) matches.push(P(md.country[r.country], t(W.country) + " · " + t(L.countries[r.country])));
    if (r.mentor && md.mentor[r.mentor]) matches.push(P(md.mentor[r.mentor], t(W.mentor) + " · " + t(L.mentors[r.mentor])));
    if (r.mode5 && md.mode[r.mode5]) matches.push(P(md.mode[r.mode5], t(W.mode) + " · " + t(L.modes[r.mode5])));
    if (matches.length) email.push({ id: "matches", title: t(W.matches), items: matches });

    return { page: page, email: email };
  }

  /** Reading length: English words, or Chinese characters (Han + full-width punctuation). */
  function length(sections, lang) {
    var text = sections.map(function (s) { return s.title + " " + s.items.map(function (i) { return i.k + " " + i.p; }).join(" "); }).join(" ");
    if (lang === "zh") return (text.match(/[^\x00-\x7f\s]/g) || []).length;
    return text.split(/\s+/).filter(Boolean).length;
  }

  return { compose: compose, length: length, temperament: temperament, stack: stack, band: band, resBand: resBand, W: W };
});
