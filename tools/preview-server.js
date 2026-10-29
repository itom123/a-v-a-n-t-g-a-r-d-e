/*
 * Local preview of site/ with the same rules as the live server (server/ecs/caddy/agstudio.caddy):
 * addresses without .html, folder redirects, the 404 page, hidden files blocked.
 * No dependencies.   npm run preview   (or: node tools/preview-server.js site 8088)
 * Only this computer can open it (127.0.0.1). Nothing is cached, so a reload always shows the latest files.
 */
"use strict";
const http = require("http"), fs = require("fs"), path = require("path");

const ROOT = path.resolve(process.argv[2] || "site");
const PORT = Number(process.argv[3] || process.env.PORT || 8088);
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".webp": "image/webp", ".ico": "image/x-icon", ".woff2": "font/woff2", ".woff": "font/woff",
  ".txt": "text/plain; charset=utf-8", ".xml": "application/xml; charset=utf-8", ".webmanifest": "application/manifest+json"
};

const isFile = (p) => { try { return fs.statSync(p).isFile(); } catch (e) { return false; } };
const isDir = (p) => { try { return fs.statSync(p).isDirectory(); } catch (e) { return false; } };

function send(res, code, file, head) {
  const type = TYPES[path.extname(file).toLowerCase()] || "application/octet-stream";
  res.writeHead(code, { "Content-Type": type, "Cache-Control": "no-cache", "X-Content-Type-Options": "nosniff" });
  if (head) return res.end();
  fs.createReadStream(file).pipe(res);
}

function notFound(res, head) {
  const page = path.join(ROOT, "404.html");
  if (isFile(page)) return send(res, 404, page, head);
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("404");
}

http.createServer((req, res) => {
  const head = req.method === "HEAD";
  if (req.method !== "GET" && !head) {
    res.writeHead(405, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ ok: false, error: "preview: read-only (the lead function runs only on the servers)" }));
  }
  let rel;
  try { rel = decodeURIComponent(new URL(req.url, "http://x").pathname); } catch (e) { return notFound(res, head); }
  // Hidden files and folders (.DS_Store, .git ...) and anything outside site/ answer 404.
  if (rel.split("/").some((seg) => seg.startsWith("."))) return notFound(res, head);
  const target = path.join(ROOT, rel);
  if (target !== ROOT && !target.startsWith(ROOT + path.sep)) return notFound(res, head);

  if (rel.endsWith("/")) {
    const index = path.join(target, "index.html");
    return isFile(index) ? send(res, 200, index, head) : notFound(res, head);
  }
  if (isFile(target)) return send(res, 200, target, head);
  if (isDir(target)) {                                  // /journal -> /journal/
    const q = req.url.indexOf("?") >= 0 ? req.url.slice(req.url.indexOf("?")) : "";
    res.writeHead(308, { Location: encodeURI(rel) + "/" + q });
    return res.end();
  }
  if (isFile(target + ".html")) return send(res, 200, target + ".html", head);  // clean URLs
  return notFound(res, head);
}).listen(PORT, "127.0.0.1", () => {
  console.log(`AG Studio preview: http://localhost:${PORT}/   (serving ${ROOT}; Ctrl+C to stop)`);
});
