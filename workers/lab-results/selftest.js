/*
 * Worker self-test with stubbed D1, Email and rate-limit bindings.   node workers/lab-results/selftest.js
 */
import assert from "node:assert";
import { writeFileSync } from "node:fs";
import worker, { cleanResult, purgeOld } from "./src/index.js";
import { renderResultEmail, LAB, Report } from "./src/email.js";

let passed = 0, failed = 0;
async function test(name, fn) {
  try { await fn(); passed++; } catch (e) { failed++; console.log("✗ " + name + "\n   " + (e && e.stack || e)); }
}

function makeEnv(opts = {}) {
  const rows = { submissions: [], contacts: [] }, sent = [];
  const stmt = (sql) => ({
    sql, args: [],
    bind(...a) { this.args = a; return this; },
    async run() {
      if (/^INSERT INTO submissions/.test(sql)) rows.submissions.push(this.args);
      else if (/INSERT INTO contacts/.test(sql)) rows.contacts.push(this.args);
      return { success: true };
    },
    async first() { return { n: rows.contacts.filter((c) => c[3] === this.args[0]).length }; }
  });
  const env = {
    DB: { prepare: stmt, async batch(list) { list.forEach((s) => (s.ran = true)); env.batched = list; return []; } },
    EMAIL: { async send(m) { if (opts.failSend) throw new Error("boom"); sent.push(m); return { messageId: "m" + sent.length }; } },
    LIMIT: { async limit() { return { success: !opts.limited }; } },
    FROM: "hello@a-v-a-n-t-g-a-r-d-e.com", FROM_NAME: "Avantgarde Studio 先端艺培", NOTIFY_FROM: "noreply@a-v-a-n-t-g-a-r-d-e.com", STUDIO_TO: "hello@a-v-a-n-t-g-a-r-d-e.com",
    SITE: "https://www.a-v-a-n-t-g-a-r-d-e.com", MAX_PER_EMAIL_PER_DAY: "3"
  };
  return { env, rows, sent };
}

const RESULT = {
  mode: "test", archetype: "4NF", element: 4, dayMaster: 9, type: "INFJ", at: null, source: null,
  dims: { EI: 30, SN: 22, TF: 35, JP: 60 }, quality: "high", flags: [], resilience: 62, mode5: "research",
  sun: 3, moon: 6, moonAlt: null, rising: 5, mentor: "critical", countries: ["UK:87", "HK:80"], schools: ["gsa:88", "rca:80"],
  strength: "slightly-weak", strongest: 3, missing: [1], hidden: [1], use: 3, avoid: [1], geju: "正印格", mentor2: "dialogue"
};
function lead(extra, contact) {
  return Object.assign({
    lang: "zh", version: "2.0.0", hp: "", source: { utm_source: "xhs" }, profile: { level: "BA" },
    contact: Object.assign({ name: "Li", contact: "wx123", email: "Li@Example.com", who: "student", age: "18+" }, contact || {}),
    consent: { privacy: true, crossBorder: true, guardian: false, chart: false },
    summary: RESULT
  }, extra || {});
}
function req(path, payload, headers) {
  return new Request("https://www.a-v-a-n-t-g-a-r-d-e.com" + path, {
    method: "POST", body: JSON.stringify(payload),
    headers: Object.assign({ "Content-Type": "application/json", Origin: "https://www.a-v-a-n-t-g-a-r-d-e.com", "CF-Connecting-IP": "1.2.3.4" }, headers || {})
  });
}

await test("lead: stores, notifies the studio and emails the visitor the full report", async () => {
  const { env, rows, sent } = makeEnv();
  const r = await worker.fetch(req("/api/lab/lead", lead()), env);
  assert.strictEqual(r.status, 200, await r.clone().text());
  assert.strictEqual((await r.json()).reportSent, true);
  assert.strictEqual(rows.submissions.length, 1);
  assert.strictEqual(rows.contacts[0][4], "Li");
  assert.strictEqual(sent.length, 2, "studio note + report");
  assert.ok(/wx123/.test(sent[0].text) && sent[0].to === "hello@a-v-a-n-t-g-a-r-d-e.com" && sent[0].replyTo === "li@example.com");
  assert.strictEqual(sent[0].from.email, "noreply@a-v-a-n-t-g-a-r-d-e.com");
  const report = sent[1];
  assert.strictEqual(report.to, "li@example.com", "the full report goes to the email left in the form");
  assert.strictEqual(report.from.email, "hello@a-v-a-n-t-g-a-r-d-e.com", "visitor emails come from hello@, as on the contact form");
  assert.strictEqual(report.headers["Auto-Submitted"], "auto-generated");
  assert.ok(report.html.indexOf("badge.png") > 0 && /报告/.test(report.subject));
  assert.ok(report.html.indexOf("巨蟹座") > 0 && report.text.indexOf("天秤座") > 0, "signs in the email");
  assert.ok(report.text.indexOf("1 对 1") > 0 && report.text.indexOf("回复") > 0, "says why it was sent and how to delete");
});
await test("lead: the studio notice is readable (no raw keys or JSON) and in the studio template", async () => {
  const { env, sent } = makeEnv();
  const chart = { calendar: "solar", date: "1998-02-16", time: "14:30", place: "太仓 · 江苏 · CN", lat: 31.4, lon: 121.1, tz: "Asia/Shanghai", pillars: "戊寅 甲寅 甲午 辛未", strength: "slightly-weak", geJu: "建禄格", use: "水", fav: "木" };
  const body = lead({ profile: { level: "MA", disciplines: ["photo"], stage: 3, timeline: 0, budget: 4, city: "metro", ielts: "7+" }, source: { referrer: "https://www.a-v-a-n-t-g-a-r-d-e.com/" }, consent: { privacy: true, crossBorder: true, chart: true }, chart }, { contact: "13915791688" });
  await worker.fetch(req("/api/lab/lead", body), env);
  const note = sent[0];
  for (const s of [note.text, note.html]) {
    assert.ok(!/[{}]"|"[a-z]+":/.test(s), "no JSON");
    ["硕士", "摄影与影像", "基本成型", "今年", "55 万以上", "国际大都会", "7.0 及以上", "英国 87", "格拉斯哥艺术学院", "偏弱", "公历 1998-02-16 14:30", "学生本人", "18 岁及以上", "北京时间"].forEach((k) => assert.ok(s.indexOf(k) >= 0, k));
  }
  assert.ok(note.html.indexOf("badge.png") > 0 && note.html.indexOf('href="tel:13915791688"') > 0 && note.html.indexOf("mailto:li@example.com") > 0);
  assert.ok(/新登记/.test(note.subject) && note.subject.indexOf("Li") > 0);
});
await test("lead: email is required and must look like an address", async () => {
  const { env, sent } = makeEnv();
  assert.strictEqual((await worker.fetch(req("/api/lab/lead", lead(null, { email: "" })), env)).status, 400);
  assert.strictEqual((await worker.fetch(req("/api/lab/lead", lead(null, { email: "a@b" })), env)).status, 400);
  assert.strictEqual(sent.length, 0);
});
await test("lead: rejects missing consent, minors without a guardian, tampered results, other origins", async () => {
  const { env } = makeEnv();
  assert.strictEqual((await worker.fetch(req("/api/lab/lead", lead({ consent: { privacy: true } })), env)).status, 400);
  assert.strictEqual((await worker.fetch(req("/api/lab/lead", lead(null, { age: "u14" })), env)).status, 400, "under 14 needs a guardian");
  assert.strictEqual((await worker.fetch(req("/api/lab/lead", lead({ summary: Object.assign({}, RESULT, { type: "<b>" }) })), env)).status, 400);
  assert.strictEqual((await worker.fetch(req("/api/lab/lead", lead({ summary: Object.assign({}, RESULT, { archetype: "4NT" }) })), env)).status, 400);
  assert.strictEqual((await worker.fetch(req("/api/lab/lead", lead({ summary: Object.assign({}, RESULT, { sun: 12 }) })), env)).status, 400);
  assert.strictEqual((await worker.fetch(req("/api/lab/lead", lead(), { Origin: "https://evil.example" }), env)).status, 403);
});
await test("lead: honeypot pretends success and stores nothing", async () => {
  const { env, rows, sent } = makeEnv();
  const r = await worker.fetch(req("/api/lab/lead", lead({ hp: "spam" })), env);
  assert.strictEqual(r.status, 200);
  assert.strictEqual(rows.submissions.length + sent.length, 0);
});
await test("lead: rate limits per IP; the report per email address", async () => {
  const a = makeEnv({ limited: true });
  assert.strictEqual((await worker.fetch(req("/api/lab/lead", lead()), a.env)).status, 429);
  const b = makeEnv();
  for (let i = 0; i < 3; i++) assert.strictEqual((await (await worker.fetch(req("/api/lab/lead", lead()), b.env)).json()).reportSent, true);
  const r = await worker.fetch(req("/api/lab/lead", lead()), b.env);
  assert.strictEqual(r.status, 200, "the lead still goes through");
  assert.strictEqual((await r.json()).reportSent, false);
});
await test("lead: a failed send is recorded and reported to the page", async () => {
  const { env, rows } = makeEnv({ failSend: true });
  const r = await worker.fetch(req("/api/lab/lead", lead()), env);
  assert.strictEqual(r.status, 200);
  assert.strictEqual((await r.json()).reportSent, false);
  assert.ok(/report: failed/.test(rows.contacts[0][10]));
});
await test("lead: emails still go out when the database is down", async () => {
  const { env, sent } = makeEnv();
  env.DB = { prepare() { return { bind() { return this; }, async run() { throw new Error("no such table"); }, async first() { throw new Error("no such table"); } }; } };
  const r = await worker.fetch(req("/api/lab/lead", lead()), env);
  assert.strictEqual(r.status, 200, await r.clone().text());
  assert.strictEqual((await r.json()).reportSent, true);
  assert.strictEqual(sent.length, 2);
});
await test("only POST + JSON; the old results route is gone", async () => {
  const { env } = makeEnv();
  assert.strictEqual((await worker.fetch(new Request("https://x/api/lab/lead"), env)).status, 405);
  assert.strictEqual((await worker.fetch(req("/api/lab/results", lead()), env)).status, 404);
});
await test("emails: studio template, every type × language, email-only ≥ 4 A4 pages, under 90 KB", async () => {
  const types = Object.keys(LAB.types);
  let maxKb = 0, minEn = Infinity, minZh = Infinity;
  types.forEach((ty, i) => {
    const t = ty[1] === "N" ? (ty[2] === "F" ? "NF" : "NT") : ty[3] === "J" ? "SJ" : "SP";
    const r = cleanResult(Object.assign({}, RESULT, { type: ty, archetype: (i % 5) + t, element: i % 5, dayMaster: (i % 5) * 2 + (i % 2),
      dims: { EI: ty[0] === "E" ? 70 : 30, SN: ty[1] === "S" ? 70 : 30, TF: ty[2] === "T" ? 70 : 30, JP: ty[3] === "J" ? 70 : 30 },
      sun: i % 12, moon: (i + 5) % 12, rising: i % 3 ? (i + 2) % 12 : null, strongest: (i + 1) % 5, missing: [(i + 2) % 5], hidden: [], use: (i + 3) % 5, avoid: [(i + 4) % 5] }));
    ["zh", "en"].forEach((lang) => {
      const m = renderResultEmail(r, lang, "https://www.a-v-a-n-t-g-a-r-d-e.com", { timeline: i % 3, stage: i % 4 });
      const all = m.html + m.text + m.subject;
      assert.ok(!/undefined|\[object|NaN/.test(all), ty + " " + lang);
      // the studio template: ink header with the light lockup, white card, footer lockup, WeCom card with initials only
      ["badge.png", "light only", "wechat-qr.png", "border-radius:18px 18px 0 0", "#0e0f0e", "XG"].forEach((k) => assert.ok(m.html.indexOf(k) > 0, k));
      assert.ok(!/顾向寅|Xiangyin|Gu Xiang/i.test(all), "tutors by initials only");
      const kb = Buffer.byteLength(m.html) / 1024;
      maxKb = Math.max(maxKb, kb);
      assert.ok(kb < 90, `${ty} ${lang} ${kb.toFixed(1)} KB (Gmail clips at 102 KB)`);
      const n = Report.length(m.sections.email, lang);
      if (lang === "en") minEn = Math.min(minEn, n); else minZh = Math.min(minZh, n);
      assert.ok(n >= (lang === "en" ? 2000 : 4000), `${ty} ${lang} email-only ${n}`);
      if (process.env.LAB_EMAIL_SAMPLE && ty === "ENFP") writeFileSync(process.env.LAB_EMAIL_SAMPLE + "-" + lang + ".html", m.html);
    });
  });
  console.log(`   email html max ${maxKb.toFixed(1)} KB; email-only min ${minEn} words / ${minZh} chars`);
});
await test("purge deletes rows older than 12 months", async () => {
  const { env } = makeEnv();
  await purgeOld(env, 1e12);
  assert.strictEqual(env.batched.length, 2);
  assert.strictEqual(env.batched[0].args[0], 1e12 - 365 * 86400000);
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
