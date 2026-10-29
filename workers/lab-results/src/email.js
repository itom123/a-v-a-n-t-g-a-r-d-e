/*
 * Results email, built on the server from result keys only (never from page HTML), with the
 * same copy as the lab page (site/lab/js/*) and the studio's email template (./template.js).
 * Layout: the facts, the email-only sections (about twice the page's report), then the report
 * the visitor saw on the page, a 1:1 call to action and the WeCom card.
 */
import LAB from "../../../site/lab/js/lab-content.js";
import "../../../site/lab/js/lab-items.js";
import "../../../site/lab/js/lab-reading.js";
import "../../../site/lab/js/lab-report-type.js";
import "../../../site/lab/js/lab-report-chart.js";
import "../../../site/lab/js/lab-report-portfolio.js";
import "../../../site/lab/js/lab-report-plan.js";
import Report from "../../../site/lab/js/report.js";
import { SITE_URL, C, FONT, escapeHtml as esc, emailShell, heading, para, label, detailRows, button, steps, quote, wechat } from "./template.js";

export { LAB, Report };

function T(lang) {
  return (v) => (v == null ? "" : typeof v === "string" || typeof v === "number" ? String(v) : v[lang] != null ? v[lang] : v.zh || "");
}

const COPY = {
  zh: {
    kicker: "AG LAB · 创作人格报告",
    hello: "你好！这是你在 AG LAB 创作人格实验室的完整报告。",
    facts: "你的结果",
    rows: { persona: "创作人格", type: "16 型人格", self: "（自填）", dm: "日主", sun: "太阳", moon: "月亮", rising: "上升", res: "创作韧性", mode: "创作方式" },
    extra: "这封邮件独有的部分：命盘细读、卡住时的办法、作品集与三个定制项目、12 个月计划、crit 与面试指南，以及匹配背后的理由。结果页上的报告附在最后，方便你一并保存。",
    onlyEmail: "邮件独享",
    fromPage: "结果页上的报告",
    cta: "想把这份报告落到你的申请上？导师可以结合你的作品，给你 1 对 1 解读。",
    ctaBtn: "预约 1 对 1 解读",
    lab: "回到 AG LAB，或把测试分享给朋友",
    wechat: "也可以扫码添加企业微信",
    wechatWho: "XG · 先端艺培学术主理",
    small: "你收到这封邮件，是因为你在 AG LAB 测试页请我们把结果发给你。结果会保存最长 12 个月；想提前删除，直接回复这封邮件即可。本报告仅供自我探索与娱乐，不构成任何预测，也不能预测录取结果。",
    preheader: (p, ty) => `${p} · ${ty}：你的完整创作人格报告、作品集项目与 12 个月计划。`,
    subject: (p, ty) => `你的 AG LAB 创作人格报告：${p} · ${ty}｜先端艺培`
  },
  en: {
    kicker: "AG LAB · Persona report",
    hello: "Hello! Here is your full report from the AG LAB Creative Persona Lab.",
    facts: "Your results",
    rows: { persona: "Creative persona", type: "16-type", self: " (self-reported)", dm: "Day Master", sun: "Sun", moon: "Moon", rising: "Rising", res: "Creative resilience", mode: "How you create" },
    extra: "Only in this email: a deeper chart reading, what to do when you’re stuck, your portfolio and three projects made for you, a 12-month plan, a crit and interview guide, and why your matches fit. The report you saw on the page is at the end, so you have it all in one place.",
    onlyEmail: "Only in this email",
    fromPage: "The report from the page",
    cta: "Want to turn this into an application plan? A tutor can read it with your work in a 1:1 session.",
    ctaBtn: "Book a 1:1 reading",
    lab: "Back to AG LAB, or share the test with a friend",
    wechat: "Prefer WeChat? Scan to add us on WeCom",
    wechatWho: "XG · Academic lead, Avantgarde Studio",
    small: "You’re getting this because you asked for your results on the AG LAB page. We keep them for up to 12 months; reply to this email to have them deleted sooner. This report is for self-reflection and fun; it makes no predictions and cannot predict admission.",
    preheader: (p, ty) => `${p} · ${ty}: your full creative persona report, portfolio projects and 12-month plan.`,
    subject: (p, ty) => `Your AG LAB persona report: ${p} · ${ty} | Avantgarde Studio`
  }
};

/** Section title inside the card (between the template's h1 and its labels). */
function h2(text) {
  return '<h2 style="margin:36px 0 14px;padding-top:24px;border-top:1px solid ' + C.line + ';font:800 20px/1.3 ' + FONT + ';color:' + C.ink + ';">' + esc(text) + "</h2>";
}
function section(s) {
  if (s.numbered) return h2(s.title) + steps(s.items.map((i) => [i.k, esc(i.p)]));
  return h2(s.title) + s.items.map((i) => (i.k ? label(i.k) : "") + para(esc(i.p))).join("");
}
function sectionText(s) {
  return ["", "== " + s.title + " ==", ...s.items.map((i) => (i.k ? i.k + "\n" : "") + i.p)].join("\n");
}

/** Report input for the composer, from the validated result and profile. */
export function reportInput(r, profile) {
  return Object.assign({}, r, {
    self: r.mode === "self",
    country: (r.countries[0] || "").split(":")[0] || null,
    timeline: profile && Number.isInteger(profile.timeline) && profile.timeline >= 0 && profile.timeline <= 2 ? profile.timeline : 1,
    stage: profile && Number.isInteger(profile.stage) && profile.stage >= 0 && profile.stage <= 3 ? profile.stage : null
  });
}

/** @returns {{subject:string, html:string, text:string, sections:{page:Array, email:Array}}} */
export function renderResultEmail(r, lang, site, profile) {
  const t = T(lang), W = COPY[lang], U = LAB.ui;
  const arche = LAB.archetypes[r.archetype], type = LAB.types[r.type];
  const persona = t(arche), typeCode = r.type + (r.at ? "-" + r.at : "");
  const rep = Report.compose(reportInput(r, profile), LAB, lang);
  const sign = (i) => (i == null ? null : LAB.zodiac[i].glyph + " " + t(LAB.zodiac[i].name));
  const rows = [
    [W.rows.persona, esc(persona) + ' <span style="color:' + C.mid + ';font-weight:400;">' + esc(lang === "zh" ? arche.en : arche.zh) + "</span>"],
    [W.rows.type, esc(typeCode + " · " + t(type.name) + (r.mode === "self" ? W.rows.self : ""))],
    [W.rows.dm, esc("甲乙丙丁戊己庚辛壬癸"[r.dayMaster] + "木火土金水"[r.element] + " · " + t(LAB.dayMasters[r.dayMaster].img))],
    [W.rows.sun, r.sun == null ? null : esc(sign(r.sun))],
    [W.rows.moon, r.moon == null ? null : esc(sign(r.moon) + (r.moonAlt != null ? " / " + sign(r.moonAlt) : ""))],
    [W.rows.rising, r.rising == null ? null : esc(sign(r.rising))],
    [W.rows.res, esc(r.resilience + "/100 · " + t(U.resBands[Report.resBand(r.resilience)]).split(/[：:]/)[0])],
    [W.rows.mode, esc(t(LAB.modes[r.mode5]))]
  ].filter(([, v]) => v); // values are HTML, already escaped
  const base = (site || SITE_URL).replace(/\/$/, "");
  const labUrl = `${base}/lab/?lang=${lang}&src=email`;
  const bookUrl = `${base}/?lang=${lang}#contact`;

  const body =
    heading(persona + " · " + typeCode) +
    para(esc(W.hello)) +
    para(esc(t(arche.d) + " " + t(type.line)), "color:" + C.mid + ";") +
    label(W.facts) + detailRows(rows) +
    label(W.onlyEmail) + quote(esc(W.extra)) +
    rep.email.map(section).join("") +
    h2(W.fromPage) +
    rep.page.map(section).join("").replace(/<h2 style="margin:36px 0 14px;/g, '<h2 style="margin:28px 0 12px;') +
    '<div style="margin:36px 0 0;padding-top:28px;border-top:1px solid ' + C.line + ';">' + para(esc(W.cta), "font-weight:600;") + "</div>" +
    button(bookUrl, W.ctaBtn) +
    para('<a href="' + esc(labUrl) + '" style="color:' + C.ink + ';">' + esc(W.lab) + "</a>", "margin:16px 0 0;font-size:14px;") +
    wechat(W.wechat, W.wechatWho) +
    para(esc(W.small), "margin:24px 0 0;font-size:12px;line-height:1.6;color:" + C.mid + ";");

  const text = [
    W.hello, "",
    `${persona} · ${typeCode}`, `${t(arche.d)} ${t(type.line)}`, "",
    ...rows.map(([k, v]) => `${k}: ${String(v).replace(/<[^>]+>/g, "").replace(/&#39;/g, "'").replace(/&amp;/g, "&")}`),
    "", W.extra,
    ...rep.email.map(sectionText),
    "", "== " + W.fromPage + " ==",
    ...rep.page.map(sectionText),
    "", `${W.cta} ${W.ctaBtn}: ${bookUrl}`, `${W.lab}: ${labUrl}`,
    "", W.small
  ].join("\n");

  return {
    subject: W.subject(persona, typeCode),
    html: emailShell({ lang, preheader: W.preheader(persona, typeCode), kicker: W.kicker, body }),
    text,
    sections: rep
  };
}

/** Plain-text note to the studio inbox for a lead or a "please contact me". */
export function renderStudioEmail(kind, row, payload) {
  const r = payload.result || payload.summary || {};
  const persona = LAB.archetypes[r.archetype] ? `${LAB.archetypes[r.archetype].zh} / ${LAB.archetypes[r.archetype].en}` : "";
  const sign = (i) => (i == null || !LAB.zodiac[i] ? "—" : LAB.zodiac[i].name.zh);
  const lines = [
    `AG LAB · ${kind === "lead" ? "新登记 New lead" : "邮件结果 + 请联系 Results + contact me"}`,
    `ID: ${row.id}`,
    `Persona: ${persona} · ${r.type || ""}${r.at ? "-" + r.at : ""} (${r.mode === "self" ? "self-reported" : "tested"})`,
    `Sun/Moon/Rising: ${sign(r.sun)} / ${sign(r.moon)} / ${sign(r.rising)}`,
    `Resilience: ${r.resilience} · Quality: ${r.quality}`,
    `Countries: ${(r.countries || []).join(", ")}`,
    `Schools: ${(r.schools || []).join(", ")}`,
    `Profile: ${JSON.stringify(payload.profile || {})}`,
    `Source: ${JSON.stringify(payload.source || {})}`
  ];
  if (kind === "lead") {
    const c = payload.contact || {};
    lines.splice(2, 0, `Name: ${c.name}`, `Contact: ${c.contact}`, `Email: ${c.email || "—"}`, `Who: ${c.who} · Age: ${c.age}`);
    lines.push(payload.chart ? `Chart: ${JSON.stringify(payload.chart)}` : "Chart: (not shared)");
  } else {
    lines.splice(2, 0, `Email: ${payload.email}`);
  }
  return { subject: `AG LAB · ${kind === "lead" ? (payload.contact || {}).name : payload.email}`, text: lines.join("\n") };
}
