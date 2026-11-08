import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";

const TYPES = { ".html": "text/html; charset=utf-8", ".mjs": "text/javascript", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".webp": "image/webp", ".woff2": "font/woff2", ".mp4": "video/mp4", ".gif": "image/gif" };
const TEXT = new Set([".html", ".mjs", ".js", ".css", ".json"]);
const ROOT = join(process.cwd(), "site");

// The mirrored files hardcode http://localhost:3000 (Framer modules need an absolute base URL);
// swap in the real origin per request so it works on any host.
export async function GET(req, { params }) {
  const { path = [] } = await params;
  const origin = new URL(req.url).origin;
  let f = normalize(join(ROOT, ...path));
  if (!f.startsWith(ROOT)) return new Response("forbidden", { status: 403 });
  try { if ((await stat(f)).isDirectory()) f = join(f, "index.html"); }
  catch { if (!extname(f)) f = join(ROOT, "index.html"); } // SPA fallback
  try {
    const ext = extname(f), buf = await readFile(f);
    const body = TEXT.has(ext) ? buf.toString("utf8").replaceAll("http://localhost:3000", origin) : buf;
    return new Response(body, { headers: { "Content-Type": TYPES[ext] ?? "application/octet-stream",
      "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=3600" } });
  } catch { return new Response("not found", { status: 404 }); }
}
