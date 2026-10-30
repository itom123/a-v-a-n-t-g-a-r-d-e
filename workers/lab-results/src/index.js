/*
 * AG LAB results Worker
 *   POST /api/lab/lead     the results page's one form (unlock + 1:1 reading): store in D1,
 *                          notify the studio inbox and email the visitor the full report
 *   cron                   delete everything older than 12 months (privacy notice)
 * Requests carry result keys only; every email is written here from the shared lab copy.
 */
import { LAB, renderResultEmail, renderStudioEmail } from "./email.js";

const DAY = 86400000;
const RETAIN_MS = 365 * DAY;
const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]{2,}$/;
const TYPE_RE = /^[EI][SN][TF][JP]$/;

class Bad extends Error { constructor(m, status) { super(m); this.status = status || 400; } }

function json(body, status) {
  return new Response(JSON.stringify(body), { status: status || 200, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });
}
function str(v, max) { return typeof v === "string" ? v.trim().slice(0, max) : ""; }
function int(v, lo, hi) { return Number.isInteger(v) && v >= lo && v <= hi ? v : null; }
function sign(v) { return v == null ? null : int(v, 0, 11) ?? (() => { throw new Bad("sign"); })(); }
function els(v) { return Array.isArray(v) ? [...new Set(v.filter((x) => Number.isInteger(x) && x >= 0 && x <= 4))].slice(0, 5) : []; }
const GEJU = new Set(["正财格", "偏财格", "食神格", "伤官格", "正官格", "七杀格", "正印格", "偏印格", "建禄格", "月刃格", "月劫格"]);

/** Validate the result summary sent by the page; throws on anything unexpected. */
export function cleanResult(r) {
  if (!r || typeof r !== "object") throw new Bad("result");
  if (!TYPE_RE.test(r.type) || !LAB.types[r.type]) throw new Bad("type");
  if (!LAB.archetypes[r.archetype] || r.archetype.slice(1) !== temperament(r.type)) throw new Bad("archetype");
  const element = int(r.element, 0, 4);
  if (element === null || String(element) !== r.archetype[0]) throw new Bad("element");
  const dims = {};
  ["EI", "SN", "TF", "JP"].forEach((d, i) => {
    const p = r.dims && r.dims[d];
    if (!Number.isFinite(p) || p < 0 || p > 100) throw new Bad("dims");
    if ((p >= 50 ? d[0] : d[1]) !== r.type[i] && p !== 50) throw new Bad("dims");
    dims[d] = Math.round(p);
  });
  return {
    mode: r.mode === "self" ? "self" : "test",
    archetype: r.archetype,
    element,
    dayMaster: int(r.dayMaster, 0, 9) ?? 0,
    type: r.type,
    at: r.at === "A" || r.at === "T" ? r.at : null,
    source: ["official", "16p", "other", "self"].includes(r.source) ? r.source : null,
    dims,
    quality: ["high", "medium", "low", "self"].includes(r.quality) ? r.quality : null,
    flags: Array.isArray(r.flags) ? r.flags.filter((f) => typeof f === "string" && f.length < 20).slice(0, 8) : [],
    resilience: int(r.resilience, 0, 100) ?? 50,
    mode5: LAB.modes[r.mode5] ? r.mode5 : "expression",
    sun: sign(r.sun), moon: sign(r.moon), moonAlt: sign(r.moonAlt), rising: sign(r.rising),
    mentor: LAB.mentors[r.mentor] ? r.mentor : null,
    mentor2: LAB.mentors[r.mentor2] ? r.mentor2 : null,
    strength: LAB.strengthLevels[r.strength] ? r.strength : null,
    strongest: int(r.strongest, 0, 4),
    missing: els(r.missing),
    hidden: els(r.hidden),
    use: int(r.use, 0, 4),
    avoid: els(r.avoid),
    geju: GEJU.has(r.geju) ? r.geju : null,
    countries: Array.isArray(r.countries) ? r.countries.filter((c) => typeof c === "string" && LAB.countries[c.split(":")[0]]).slice(0, 3) : [],
    schools: Array.isArray(r.schools) ? r.schools.filter((c) => typeof c === "string" && /^[a-z]+:\d{1,3}$/.test(c)).slice(0, 5) : []
  };
}
function temperament(t) { return t[1] === "N" ? (t[2] === "F" ? "NF" : "NT") : t[3] === "J" ? "SJ" : "SP"; }

function cleanObj(o, maxLen) {
  const s = JSON.stringify(o && typeof o === "object" ? o : {});
  return s.length > maxLen ? "{}" : s;
}

async function limited(env, key) {
  if (!env.LIMIT) return false;
  const { success } = await env.LIMIT.limit({ key });
  return !success;
}

async function insertSubmission(env, id, now, purpose, p, r, answers) {
  await env.DB.prepare(
    `INSERT INTO submissions (id, created_at, purpose, lang, version, mode, type, dims, quality, flags, resilience, element, day_master, archetype, sun, moon, rising, quiz_ms, profile, answers, source)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18, ?19, ?20, ?21)`
  ).bind(
    id, now, purpose, p.lang === "en" ? "en" : "zh", str(p.version, 16), r.mode, r.type + (r.at ? "-" + r.at : ""),
    JSON.stringify(r.dims), r.quality, JSON.stringify(r.flags), r.resilience, r.element, r.dayMaster, r.archetype,
    r.sun, r.moon, r.rising, Number.isFinite(p.quizMs) ? Math.round(p.quizMs) : null,
    cleanObj(p.profile, 600), answers ? JSON.stringify(answers) : null, cleanObj(p.source, 800)
  ).run();
}

// Same senders as the contact-form Worker: visitors hear from hello@ (replies reach a person),
// studio notices come from noreply@.
function notifyFrom(env) { return { email: env.NOTIFY_FROM || env.FROM, name: "Avantgarde Studio" }; }

async function send(env, msg) {
  try {
    const res = await env.EMAIL.send(Object.assign({ from: { email: env.FROM, name: env.FROM_NAME || "AG LAB" }, replyTo: env.STUDIO_TO }, msg));
    return { status: "sent", id: res && res.messageId ? String(res.messageId) : null };
  } catch (e) {
    return { status: "failed: " + String(e && e.message || e).slice(0, 120), id: null };
  }
}

async function handleLead(req, env) {
  const p = await req.json().catch(() => null);
  if (!p) throw new Bad("json");
  if (p.hp) return json({ ok: true });
  const c = p.contact || {}, consent = p.consent || {};
  const name = str(c.name, 60), contact = str(c.contact, 80), email = str(c.email, 120).toLowerCase();
  if (!name || !contact) throw new Bad("contact");
  if (!EMAIL_RE.test(email)) throw new Bad("email"); // required: the full report goes there
  if (consent.privacy !== true || consent.crossBorder !== true) throw new Bad("consent");
  if (c.age === "u14" && consent.guardian !== true) throw new Bad("guardian");
  const ip = req.headers.get("CF-Connecting-IP") || "";
  if (await limited(env, "ip:" + ip)) throw new Bad("rate", 429);

  const r = cleanResult(p.summary);
  const now = Date.now(), id = crypto.randomUUID();
  // Storage problems must never stop the emails: log and carry on.
  const stored = await insertSubmission(env, id, now, "lead", p, r, null).then(() => true, (e) => { console.error("lead insert", e); return false; });
  const chart = consent.chart === true && p.chart ? cleanObj(p.chart, 1200) : null;
  const note = renderStudioEmail({ id }, { lang: p.lang, contact: { name, contact, email, who: str(c.who, 10), age: str(c.age, 10) }, summary: r, profile: p.profile, source: p.source, chart: chart ? JSON.parse(chart) : null }, new Date(now));
  const sent = env.STUDIO_TO ? await send(env, { from: notifyFrom(env), to: env.STUDIO_TO, replyTo: email, subject: note.subject, text: note.text, html: note.html, headers: { "Auto-Submitted": "auto-generated" } }) : { status: "skipped", id: null };

  // The single results-page form: an email address there also gets the full report (≈ twice the web reading).
  let report;
  const max = parseInt(env.MAX_PER_EMAIL_PER_DAY || "3", 10);
  const recent = stored ? await env.DB.prepare("SELECT COUNT(*) AS n FROM contacts WHERE email = ?1 AND created_at > ?2").bind(email, now - DAY).first().catch(() => null) : null;
  if (recent && recent.n >= max) report = { status: "rate-limited", id: null };
  else {
    const mail = renderResultEmail(r, p.lang === "en" ? "en" : "zh", env.SITE || "https://www.a-v-a-n-t-g-a-r-d-e.com", p.profile);
    report = await send(env, { to: email, subject: mail.subject, html: mail.html, text: mail.text, headers: { "Auto-Submitted": "auto-generated" } });
  }
  if (report.status !== "sent") console.error("report email", report.status);
  if (stored) await env.DB.prepare(
    "INSERT INTO contacts (id, submission_id, created_at, purpose, email, name, contact, who, age, consents, extra, email_status, message_id) VALUES (?1, ?2, ?3, 'lead', ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12)"
  ).bind(crypto.randomUUID(), id, now, email || null, name, contact, str(c.who, 10), str(c.age, 10),
    JSON.stringify({ privacy: true, crossBorder: true, guardian: consent.guardian === true, chart: !!chart }), chart,
    `studio: ${sent.status}; report: ${report.status}`, report.id || sent.id).run().catch((e) => console.error("contact insert", e));
  return json({ ok: true, id, reportSent: report.status === "sent" });
}

export async function purgeOld(env, now) {
  const cutoff = (now || Date.now()) - RETAIN_MS;
  await env.DB.batch([
    env.DB.prepare("DELETE FROM contacts WHERE created_at < ?1").bind(cutoff),
    env.DB.prepare("DELETE FROM submissions WHERE created_at < ?1").bind(cutoff)
  ]);
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (req.method !== "POST") return json({ ok: false, error: "method" }, 405);
    const ct = req.headers.get("Content-Type") || "";
    if (!ct.startsWith("application/json")) return json({ ok: false, error: "type" }, 415);
    if (Number(req.headers.get("Content-Length") || 0) > 32768) return json({ ok: false, error: "size" }, 413);
    const origin = req.headers.get("Origin");
    if (origin && env.SITE && origin !== env.SITE && !/^http:\/\/localhost(:\d+)?$/.test(origin)) return json({ ok: false, error: "origin" }, 403);
    try {
      if (url.pathname === "/api/lab/lead") return await handleLead(req, env);
      return json({ ok: false, error: "not found" }, 404);
    } catch (e) {
      if (e instanceof Bad) return json({ ok: false, error: e.message }, e.status);
      console.error(e);
      return json({ ok: false, error: "server" }, 500);
    }
  },
  async scheduled(_event, env, ctx) {
    ctx.waitUntil(purgeOld(env));
  }
};
