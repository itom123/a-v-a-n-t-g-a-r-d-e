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
function body(extra) {
  return Object.assign({
    lang: "zh", version: "2.0.0", hp: "", email: "Student@Example.com",
    consent: { store: true, age: true, research: true, contact: false },
    turnstile: "", source: { utm_source: "xhs" }, profile: { level: "MA" }, quizMs: 420000,
    result: RESULT, answers: [["ei1", 6], ["sn2", 3], ["nope", 4]]
  }, extra || {});
}
function req(path, payload, headers) {
  return new Request("https://www.a-v-a-n-t-g-a-r-d-e.com" + path, {
    method: "POST", body: JSON.stringify(payload),
    headers: Object.assign({ "Content-Type": "application/json", Origin: "https://www.a-v-a-n-t-g-a-r-d-e.com", "CF-Connecting-IP": "1.2.3.4" }, headers || {})
  });
}

await test("results: stores, keeps only known answers, emails the visitor", async () => {
  const { env, rows, sent } = makeEnv();
  const r = await worker.fetch(req("/api/lab/results", body()), env);
  assert.strictEqual(r.status, 200, await r.clone().text());
  assert.strictEqual(rows.submissions.length, 1);
  const answers = JSON.parse(rows.submissions[0][19]);
  assert.deepStrictEqual(answers, [["ei1", 6], ["sn2", 3]]);
  assert.strictEqual(rows.contacts[0][3], "student@example.com");
  assert.strictEqual(sent.length, 1);
  assert.strictEqual(sent[0].to, "student@example.com");
  assert.ok(/夜航档案家/.test(sent[0].subject) && /INFJ/.test(sent[0].subject), sent[0].subject);
  assert.ok(sent[0].html.indexOf("巨蟹座") > 0 && sent[0].text.indexOf("天秤座") > 0, "signs in the email");
  assert.strictEqual(sent[0].from.email, "hello@a-v-a-n-t-g-a-r-d-e.com", "visitor emails come from hello@, as on the contact form");
});
await test("results: answers dropped without research consent; studio told when asked", async () => {
  const { env, rows, sent } = makeEnv();
  const r = await worker.fetch(req("/api/lab/results", body({ consent: { store: true, age: true, research: false, contact: true } })), env);
  assert.strictEqual(r.status, 200);
  assert.strictEqual(rows.submissions[0][19], null);
  assert.strictEqual(sent.length, 2);
  assert.strictEqual(sent[1].to, "hello@a-v-a-n-t-g-a-r-d-e.com");
});
await test("results: rejects missing consent, bad email, tampered result, other origins", async () => {
  const { env, sent } = makeEnv();
  assert.strictEqual((await worker.fetch(req("/api/lab/results", body({ consent: { store: true } })), env)).status, 400);
  assert.strictEqual((await worker.fetch(req("/api/lab/results", body({ email: "a@b" })), env)).status, 400);
  assert.strictEqual((await worker.fetch(req("/api/lab/results", body({ result: Object.assign({}, RESULT, { type: "<b>" }) })), env)).status, 400);
  assert.strictEqual((await worker.fetch(req("/api/lab/results", body({ result: Object.assign({}, RESULT, { archetype: "4NT" }) })), env)).status, 400);
  assert.strictEqual((await worker.fetch(req("/api/lab/results", body({ result: Object.assign({}, RESULT, { sun: 12 }) })), env)).status, 400);
  assert.strictEqual((await worker.fetch(req("/api/lab/results", body(), { Origin: "https://evil.example" }), env)).status, 403);
  assert.strictEqual(sent.length, 0);
});
await test("results: honeypot pretends success and stores nothing", async () => {
  const { env, rows, sent } = makeEnv();
  const r = await worker.fetch(req("/api/lab/results", body({ hp: "spam" })), env);
  assert.strictEqual(r.status, 200);
  assert.strictEqual(rows.submissions.length + sent.length, 0);
});
await test("results: rate limits per IP and per email", async () => {
  const a = makeEnv({ limited: true });
  assert.strictEqual((await worker.fetch(req("/api/lab/results", body()), a.env)).status, 429);
  const b = makeEnv();
  for (let i = 0; i < 3; i++) assert.strictEqual((await worker.fetch(req("/api/lab/results", body()), b.env)).status, 200);
  assert.strictEqual((await worker.fetch(req("/api/lab/results", body()), b.env)).status, 429);
});
await test("results: a failed send is recorded and reported", async () => {
  const { env, rows } = makeEnv({ failSend: true });
  const r = await worker.fetch(req("/api/lab/results", body()), env);
  assert.strictEqual(r.status, 502);
  assert.ok(/^failed/.test(rows.contacts[0][5]));
});
await test("lead: stores contact and notifies the studio", async () => {
  const { env, rows, sent } = makeEnv();
  const lead = {
    lang: "en", version: "2.0.0", hp: "", source: {}, profile: { level: "BA" },
    contact: { name: "Li", contact: "wx123", email: "", who: "student", age: "18+" },
    consent: { privacy: true, crossBorder: true, guardian: false, chart: false },
    summary: Object.assign({}, RESULT, { mode: "self", at: "T", quality: "self", source: "16p" })
  };
  const r = await worker.fetch(req("/api/lab/lead", lead), env);
  assert.strictEqual(r.status, 200, await r.clone().text());
  assert.strictEqual(rows.contacts[0][4], "Li");
  assert.ok(/wx123/.test(sent[0].text) && sent[0].to === "hello@a-v-a-n-t-g-a-r-d-e.com");
  const minor = Object.assign({}, lead, { contact: Object.assign({}, lead.contact, { age: "u14" }) });
  assert.strictEqual((await worker.fetch(req("/api/lab/lead", minor), env)).status, 400, "under 14 needs a guardian");
});
await test("only POST + JSON", async () => {
  const { env } = makeEnv();
  assert.strictEqual((await worker.fetch(new Request("https://x/api/lab/results"), env)).status, 405);
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
      ["lockup-light.png", "lockup-ink.png", "wechat-qr.png", "border-radius:18px 18px 0 0", "#0e0f0e", "XG"].forEach((k) => assert.ok(m.html.indexOf(k) > 0, k));
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
