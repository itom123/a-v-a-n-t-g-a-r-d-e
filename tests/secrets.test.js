/*
 * Secret scan.   node tests/secrets.test.js
 * This repository is public: no API keys, tokens, passwords or private endpoints may be committed.
 * Keys live in Worker secrets (`wrangler secret put`) and GitHub Actions secrets; private service
 * URLs are read from Worker secrets too. Fails if a tracked file looks like it holds one.
 */
"use strict";
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const SKIP = [/^site\/lab\/vendor\//, /^site\/lab\/data\//, /package-lock\.json$/, /\.(png|jpe?g|gif|webp|ico|woff2?|ttf|otf|pdf|zip)$/i, /^tests\/secrets\.test\.js$/];
// Identifiers that are public by design (not secrets): the Cloudflare account ID and the D1 database ID.
const ALLOW = ["424121e0b72c1a32e08729028250a935", "7c77dc9f-ff38-4c79-a900-6fb8f396998d"];
const RULES = [
  ["private key", /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ["OpenAI/Anthropic-style key", /\bsk-(?:ant-)?[A-Za-z0-9_-]{20,}/],
  ["GitHub token", /\b(?:ghp|gho|ghs|github_pat)_[A-Za-z0-9_]{20,}/],
  ["AWS access key", /\bAKIA[0-9A-Z]{16}\b/],
  ["Slack token", /\bxox[abprs]-[A-Za-z0-9-]{10,}/],
  ["Resend key", /\bre_[A-Za-z0-9]{20,}/],
  ["Bearer token", /Bearer\s+[A-Za-z0-9._~+/-]{24,}/],
  ["assigned secret", /(?:api[_-]?key|secret|token|password|passwd)["']?\s*[:=]\s*["'][^"'\s]{16,}["']/i],
  ["long hex string", /\b[a-f0-9]{40,}\b/i],
  ["credentials in URL", /https?:\/\/[^\s/:@]+:[^\s/@]+@/]
];

const files = execSync("git ls-files", { cwd: root, encoding: "utf8" }).split("\n").filter(Boolean)
  .filter((f) => !SKIP.some((re) => re.test(f)));
const hits = [];
for (const f of files) {
  let text;
  try { text = fs.readFileSync(path.join(root, f), "utf8"); } catch (e) { continue; }
  ALLOW.forEach((a) => { text = text.split(a).join(""); });
  text.split("\n").forEach((line, i) => {
    for (const [name, re] of RULES) if (re.test(line)) hits.push(`${f}:${i + 1}  ${name}: ${line.trim().slice(0, 120)}`);
  });
}
if (hits.length) {
  process.stdout.write("Possible secrets in tracked files:\n" + hits.map((h) => "  " + h).join("\n") + "\n");
  process.exit(1);
}
process.stdout.write(`secret scan: ${files.length} files clean\n`);
