#!/usr/bin/env node
/*
 * Copies the three browser libraries from .cache/pkg (see fetch-data.sh) into
 * site/lab/vendor/ and writes their licences next to them.
 *   node tools/vendor.js
 */
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const pkg = path.join(root, ".cache", "pkg");
const out = path.join(root, "site", "lab", "vendor");

function findPkg(prefix) {
  const d = fs.readdirSync(pkg).find((n) => n.startsWith(prefix) && !n.endsWith(".tgz"));
  if (!d) throw new Error("missing " + prefix + " in .cache/pkg; run tools/fetch-data.sh");
  return path.join(pkg, d, "package");
}

// [package dir prefix, file inside package, vendored name, licence]
const LIBS = [
  ["lunar-javascript-", "lunar.js", "lunar.js", "MIT"],
  ["photostructure-tz-lookup-", "tz.js", "tz-lookup.js", "CC0-1.0"],
  ["qrcode-generator-", "dist/qrcode.js", "qrcode.js", "MIT"]
];

fs.mkdirSync(out, { recursive: true });
const notes = ["Third-party libraries in this folder. Unmodified copies from npm.", ""];

for (const [prefix, file, name, licence] of LIBS) {
  const dir = findPkg(prefix);
  const meta = JSON.parse(fs.readFileSync(path.join(dir, "package.json"), "utf8"));
  if (meta.license !== licence) throw new Error(meta.name + " licence is " + meta.license + ", expected " + licence);
  fs.copyFileSync(path.join(dir, file), path.join(out, name));

  notes.push("=".repeat(72), name + "  ←  " + meta.name + "@" + meta.version + "  (" + meta.license + ")", "=".repeat(72));
  const lic = path.join(dir, "LICENSE");
  if (fs.existsSync(lic)) notes.push(fs.readFileSync(lic, "utf8").trim());
  else notes.push("No LICENSE file in the package; the licence notice is in the header of " + name + ".");
  notes.push("");
  console.log("vendored", name, "from", meta.name + "@" + meta.version);
}

fs.writeFileSync(path.join(out, "LICENSES.txt"), notes.join("\n"));
