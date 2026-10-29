/*
 * Results email, built on the server from result keys only (never from page HTML),
 * using the same copy as the lab page (site/lab/js/lab-content.js, lab-reading.js).
 * Black, white and grey, table-free and inline-styled so it reads in any mail app.
 */
import LAB from "../../../site/lab/js/lab-content.js";
import "../../../site/lab/js/lab-items.js";
import "../../../site/lab/js/lab-reading.js";

export { LAB };

const INK = "#0e0f0e", PAPER = "#f4f5f3", GREY = "#d6d6d5", MID = "#5b5c5a";

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/** Copy for one language. */
function T(lang) {
  return (v) => (v == null ? "" : typeof v === "string" || typeof v === "number" ? String(v) : v[lang] != null ? v[lang] : v.zh || "");
}

/** Everything the email says, as plain data (also used for the text version and tests). */
export function reading(r, lang) {
  const t = T(lang), U = LAB.ui;
  const type = LAB.types[r.type];
  const arche = LAB.archetypes[r.archetype];
  const careers = LAB.careers[r.type];
  const zod = (i) => (i == null ? null : LAB.zodiac[i]);
  const sun = zod(r.sun), moon = zod(r.moon), moonAlt = zod(r.moonAlt), rising = zod(r.rising);
  const temperament = r.archetype.slice(1);
  const out = {
    subject: lang === "zh"
      ? `你的创作人格：${t(arche)} · ${r.type}｜AG LAB`
      : `Your creative persona: ${t(arche)} · ${r.type} | AG LAB`,
    persona: t(arche),
    personaOther: lang === "zh" ? arche.en : arche.zh,
    personaLine: t(arche.d),
    tags: [t(LAB.wx[r.element]), r.type + (r.at ? "-" + r.at : ""), sun ? t(sun.name) : null, t(LAB.modes[r.mode5]) + (lang === "zh" ? "型" : "")].filter(Boolean),
    dayMaster: `${t(U.dayMaster)} · ${LAB.dayMasters[r.dayMaster] ? t(LAB.dayMasters[r.dayMaster].img) : ""}`,
    signs: [],
    blends: [],
    type: { code: r.type, name: t(type.name), line: t(type.line), strengths: t(type.strengths), edge: t(type.edge), env: t(type.env), self: r.mode === "self" },
    dims: ["EI", "SN", "TF", "JP"].map((d) => {
      const p = r.dims[d];
      const first = p >= 50;
      return `${first ? d[0] : d[1]} ${t(LAB.letters[first ? d[0] : d[1]])} ${first ? p : 100 - p}%`;
    }),
    paths: careers ? careers.paths.map((p) => ({ name: t(p.name), d: t(p.d) })) : [],
    research: careers ? t(careers.research) : "",
    allies: careers ? careers.allies.map((a) => `${a.type} ${t(LAB.types[a.type].name)}${lang === "zh" ? "：" : ": "}${t(a.why)}`) : [],
    habit: careers ? t(careers.habit) : "",
    flavour: t(LAB.elementFlavour[r.element]),
    resilience: `${r.resilience}/100 · ${t(U.resBands[r.resilience >= 70 ? "steady" : r.resilience >= 45 ? "balanced" : "sensitive"])}`,
    mentor: LAB.mentors[r.mentor] ? `${t(LAB.mentors[r.mentor])} — ${t(LAB.mentors[r.mentor].d)}` : "",
    countries: (r.countries || []).map((c) => t(LAB.countries[c.split(":")[0]])).filter(Boolean),
    firstSchool: (() => {
      const id = (r.schools || [])[0];
      const s = id && LAB.schools.find((x) => x.id === id.split(":")[0]);
      return s ? `${t(s.name)} · ${t(s.city)}` : "";
    })(),
    disclaimer: t(U.disclaimer)
  };
  if (sun) out.signs.push({ role: t(U.who.sun), sub: t(U.who.sunRole), name: t(sun.name), glyph: sun.glyph, text: t(sun.sun) });
  if (moon) out.signs.push({ role: t(U.who.moon), sub: t(U.who.moonRole), name: t(moon.name) + (moonAlt ? ` ${t(U.who.or)} ${t(moonAlt.name)}` : ""), glyph: moon.glyph, text: t(moon.moon) });
  if (rising) out.signs.push({ role: t(U.who.rising), sub: t(U.who.risingRole), name: t(rising.name), glyph: rising.glyph, text: t(rising.rising) });
  if (sun) {
    const el = sun.element, mod = sun.modality;
    out.blends.push([t(U.who.blend), t(LAB.signTemperament[el][temperament])]);
    out.blends.push([t(U.who.rhythm), t(LAB.modalityJP[mod][r.type[3]])]);
    out.blends.push([t(U.who.eastWest), t(LAB.eastWest[r.element][el])]);
  }
  return out;
}

const L10N = {
  zh: {
    hello: "你好！这是你在 AG LAB 创作人格实验室的测试结果。",
    who: "你是谁", type: "16 型创作人格", paths: "你可能成为的创作者", research: "你的研究方式", allies: "最好的合作伙伴",
    habit: "这周可以试试", flavour: "五行底色", res: "创作韧性", mentor: "适合你的导师风格", match: "初步匹配",
    countries: "国家与地区", school: "最契合的院校", strengths: "创作优势", edge: "可以留意", env: "适合的学习环境",
    self: "（自填类型）", cta: "想要完整院校清单与 1 对 1 解读？", ctaBtn: "回到测试页", retake: "也可以把测试分享给朋友。",
    why: "你收到这封邮件，是因为你在 AG LAB 测试页请我们把结果发给你。结果会保存最长 12 个月；想提前删除，直接回复这封邮件即可。"
  },
  en: {
    hello: "Hello! Here are your results from the AG LAB Creative Persona Lab.",
    who: "Who you are", type: "16-type creative profile", paths: "The maker you might become", research: "How you research", allies: "Your best collaborators",
    habit: "Try this week", flavour: "Your elemental colour", res: "Creative resilience", mentor: "Mentor style for you", match: "First matches",
    countries: "Countries", school: "Best-fit school", strengths: "Strengths in the studio", edge: "Worth working on", env: "Where you learn best",
    self: " (self-reported)", cta: "Want the full school list and a 1:1 reading?", ctaBtn: "Back to the lab", retake: "You can also share the test with a friend.",
    why: "You're getting this because you asked for your results on the AG LAB page. We keep them for up to 12 months; reply to this email to have them deleted sooner."
  }
};

/** @returns {{subject:string, html:string, text:string}} */
export function renderResultEmail(r, lang, site) {
  const R = reading(r, lang), W = L10N[lang];
  const url = `${site.replace(/\/$/, "")}/lab/?lang=${lang}&src=email`;
  const h2 = (s) => `<h2 style="margin:32px 0 10px;font:700 20px/1.25 Arial,Helvetica,sans-serif;color:${INK}">${esc(s)}</h2>`;
  const p = (s, extra) => `<p style="margin:0 0 10px;font:400 15px/1.6 Arial,Helvetica,sans-serif;color:${INK};${extra || ""}">${s}</p>`;
  const card = (inner, dark) => `<div style="margin:0 0 10px;padding:18px 20px;border-radius:16px;${dark ? `background:${INK};color:${PAPER}` : `background:#ffffff;border:1px solid ${GREY}`}">${inner}</div>`;
  const html = `<!doctype html><html lang="${lang === "zh" ? "zh-CN" : "en"}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(R.subject)}</title></head>
<body style="margin:0;padding:0;background:${PAPER}">
<div style="max-width:620px;margin:0 auto;padding:28px 18px 40px">
<p style="margin:0 0 18px;font:700 14px Arial,Helvetica,sans-serif;letter-spacing:.08em;color:${INK}">AG LAB · ${esc(lang === "zh" ? "先端艺培" : "Avantgarde Studio")}</p>
${p(esc(W.hello))}
${card(`<p style="margin:0 0 6px;font:500 13px Arial,Helvetica,sans-serif;color:#c9cac8">${esc(T(lang)(LAB.ui.yourPersona))}</p>
<p style="margin:0;font:800 30px/1.15 Arial,Helvetica,sans-serif;color:${PAPER}">${esc(R.persona)}</p>
<p style="margin:4px 0 12px;font:500 15px Arial,Helvetica,sans-serif;color:#c9cac8">${esc(R.personaOther)}</p>
<p style="margin:0 0 12px;font:400 15px/1.6 Arial,Helvetica,sans-serif;color:${PAPER}">${esc(R.personaLine)} ${esc(R.type.line)}</p>
<p style="margin:0;font:600 13px Arial,Helvetica,sans-serif;color:${PAPER}">${R.tags.map(esc).join(" &nbsp;·&nbsp; ")}</p>`, true)}
${R.signs.length ? h2(W.who) + R.signs.map((s) => card(`<p style="margin:0;font:500 12px Arial,Helvetica,sans-serif;color:${MID}">${esc(s.role)} · ${esc(s.sub)}</p><p style="margin:4px 0 6px;font:800 20px Arial,Helvetica,sans-serif;color:${INK}">${esc(s.glyph)} ${esc(s.name)}</p>${p(esc(s.text), "margin:0")}`)).join("") +
  R.blends.map((b) => p(`<b>${esc(b[0])}</b> · ${esc(b[1])}`)).join("") : ""}
${h2(W.type + (R.type.self ? W.self : ""))}
${p(`<b style="font-size:18px">${esc(R.type.code)} · ${esc(R.type.name)}</b><br><span style="color:${MID}">${R.dims.map(esc).join(" &nbsp;·&nbsp; ")}</span>`)}
${p(`<b>${esc(W.strengths)}</b> · ${esc(R.type.strengths)}`)}
${p(`<b>${esc(W.edge)}</b> · ${esc(R.type.edge)}`)}
${p(`<b>${esc(W.env)}</b> · ${esc(R.type.env)}`)}
${p(`<b>${esc(W.res)}</b> · ${esc(R.resilience)}`)}
${R.paths.length ? h2(W.paths) + R.paths.map((x, i) => card(`<p style="margin:0 0 4px;font:800 17px Arial,Helvetica,sans-serif;color:${i ? INK : PAPER}">0${i + 1} · ${esc(x.name)}</p><p style="margin:0;font:400 15px/1.55 Arial,Helvetica,sans-serif;color:${i ? INK : PAPER}">${esc(x.d)}</p>`, i === 0)).join("") +
  p(`<b>${esc(W.research)}</b> · ${esc(R.research)}`) + p(`<b>${esc(W.flavour)}</b> · ${esc(R.flavour)}`) +
  p(`<b>${esc(W.allies)}</b><br>${R.allies.map(esc).join("<br>")}`) + p(`<b>${esc(W.habit)}</b> · ${esc(R.habit)}`) : ""}
${h2(W.match)}
${R.mentor ? p(`<b>${esc(W.mentor)}</b> · ${esc(R.mentor)}`) : ""}
${R.countries.length ? p(`<b>${esc(W.countries)}</b> · ${R.countries.map(esc).join(" · ")}`) : ""}
${R.firstSchool ? p(`<b>${esc(W.school)}</b> · ${esc(R.firstSchool)}`) : ""}
${card(`<p style="margin:0 0 12px;font:700 16px/1.4 Arial,Helvetica,sans-serif;color:${INK}">${esc(W.cta)}</p><a href="${esc(url)}" style="display:inline-block;padding:12px 22px;border-radius:99px;background:${INK};color:${PAPER};font:600 15px Arial,Helvetica,sans-serif;text-decoration:none">${esc(W.ctaBtn)} →</a><p style="margin:12px 0 0;font:400 13px Arial,Helvetica,sans-serif;color:${MID}">${esc(W.retake)}</p>`)}
<p style="margin:26px 0 8px;font:400 12.5px/1.6 Arial,Helvetica,sans-serif;color:${MID}">${esc(R.disclaimer)}</p>
<p style="margin:0;font:400 12.5px/1.6 Arial,Helvetica,sans-serif;color:${MID}">${esc(W.why)}</p>
</div></body></html>`;

  const lines = [
    W.hello, "",
    `${R.persona} (${R.personaOther})`, `${R.personaLine} ${R.type.line}`, R.tags.join(" · "), ""
  ];
  if (R.signs.length) {
    lines.push(`== ${W.who} ==`);
    R.signs.forEach((s) => lines.push(`${s.role} ${s.name}: ${s.text}`));
    R.blends.forEach((b) => lines.push(`${b[0]}: ${b[1]}`));
    lines.push("");
  }
  lines.push(`== ${W.type}${R.type.self ? W.self : ""} ==`, `${R.type.code} ${R.type.name}`, R.dims.join(" · "),
    `${W.strengths}: ${R.type.strengths}`, `${W.edge}: ${R.type.edge}`, `${W.env}: ${R.type.env}`, `${W.res}: ${R.resilience}`, "");
  if (R.paths.length) {
    lines.push(`== ${W.paths} ==`);
    R.paths.forEach((x, i) => lines.push(`0${i + 1} ${x.name}: ${x.d}`));
    lines.push(`${W.research}: ${R.research}`, `${W.flavour}: ${R.flavour}`, `${W.allies}:`, ...R.allies.map((a) => "- " + a), `${W.habit}: ${R.habit}`, "");
  }
  lines.push(`== ${W.match} ==`);
  if (R.mentor) lines.push(`${W.mentor}: ${R.mentor}`);
  if (R.countries.length) lines.push(`${W.countries}: ${R.countries.join(" · ")}`);
  if (R.firstSchool) lines.push(`${W.school}: ${R.firstSchool}`);
  lines.push("", `${W.cta} ${url}`, "", R.disclaimer, W.why);
  return { subject: R.subject, html, text: lines.join("\n") };
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
