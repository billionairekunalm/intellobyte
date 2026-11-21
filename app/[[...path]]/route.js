import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";

const TYPES = { ".html": "text/html; charset=utf-8", ".mjs": "text/javascript", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".webp": "image/webp", ".woff2": "font/woff2", ".mp4": "video/mp4", ".gif": "image/gif", ".ico": "image/x-icon", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml" };
const TEXT = new Set([".html", ".mjs", ".js", ".css", ".json"]);
const ROOT = join(process.cwd(), "site");

// The mirrored files hardcode http://localhost:3000 (Framer modules need an absolute base URL);
// swap in the real origin per request so it works on any host.
export async function GET(req, { params }) {
  const { path = [] } = await params;
  const origin = new URL(req.url).origin;
  // leftover Framer-template case-study pages (/work/...): never show them, send visitors home
  if (path[0] === "work") return Response.redirect(origin + "/", 308);
  let f = normalize(join(ROOT, ...path));
  if (!f.startsWith(ROOT)) return new Response("forbidden", { status: 403 });
  try { if ((await stat(f)).isDirectory()) f = join(f, "index.html"); }
  catch { return notFound(); } // unknown address: real 404, not the home page
  try {
    const ext = extname(f), buf = await readFile(f);
    // optimized PNGs are WebP bytes under the old .png name: serve the real type
    const type = ext === ".png" && buf.subarray(8, 12).toString() === "WEBP" ? "image/webp" : (TYPES[ext] ?? "application/octet-stream");
    const body = TEXT.has(ext) ? buf.toString("utf8").replaceAll("http://localhost:3000", origin) : buf;
    return new Response(body, { headers: { "Content-Type": type,
      // every response is edge-cached for the life of a deployment (a new deploy = a new cache)
      "Cache-Control": ext === ".html" || !ext ? "public, max-age=0, must-revalidate, s-maxage=31536000"
        : [".mjs", ".js", ".css", ".json", ".ico"].includes(ext) ? "public, max-age=300, s-maxage=31536000"
        : "public, max-age=31536000, immutable, s-maxage=31536000" } }); // images/fonts: files are renamed when they change
  } catch { return notFound(); }
}

const NOT_FOUND = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Page not found | Intellobyte</title><meta name="robots" content="noindex"><link rel="icon" href="/favicon.ico">
<style>*{box-sizing:border-box}body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;font-family:Urbanist,Inter,system-ui,sans-serif;color:#fff;background:radial-gradient(circle at 20% 15%,#6d4aff 0,#2a1f66 30%,#0b0a12 70%)}
main{max-width:520px;text-align:center}img{width:84px;height:84px;border-radius:22px}h1{font-size:clamp(64px,16vw,120px);margin:18px 0 0;line-height:1;letter-spacing:-.04em}
p{color:#c9c4ef;font-size:18px;line-height:1.5;margin:12px 0 28px}a{display:inline-block;padding:14px 26px;border-radius:999px;background:#6d4aff;color:#fff;text-decoration:none;font-weight:600;margin:4px}a.o{background:transparent;border:1px solid rgba(255,255,255,.3)}</style></head>
<body><main><img src="/_fc/ib/icon-192.png" alt="Intellobyte"><h1>404</h1><p>This page doesn't exist. It may have moved, or the address has a typo.</p>
<a href="/">Back to home</a><a class="o" href="/#contact">Contact us</a></main></body></html>`;
function notFound() {
  return new Response(NOT_FOUND, { status: 404, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600" } });
}
