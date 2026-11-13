import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname } from "node:path";

const T = { ".html": "text/html", ".mjs": "text/javascript", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".webp": "image/webp", ".woff2": "font/woff2", ".mp4": "video/mp4", ".gif": "image/gif", ".ico": "image/x-icon" };

createServer(async (req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  let f = join("site", p);
  try { if ((await stat(f)).isDirectory()) f = join(f, "index.html"); }
  catch { if (!extname(f)) f = join("site", "index.html"); } // SPA fallback
  try {
    const body = await readFile(f); // read first: a missing file must 404, not crash after headers
    res.writeHead(200, { "Content-Type": T[extname(f)] ?? "application/octet-stream" });
    res.end(body);
  } catch { res.writeHead(404).end("not found"); }
}).listen(3000, () => console.log("http://localhost:3000"));
