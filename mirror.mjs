// Mirrors intellobyte-v1.framer.website + every framerusercontent.com asset into ./site
// Usage: node mirror.mjs   then   node serve.mjs
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const ORIGIN = "https://intellobyte-v1.framer.website";
const CDN = "https://framerusercontent.com";
const OUT = "site";
const TEXT = /\.(mjs|js|css|json|html|svg)$/;
const seen = new Set();
const queue = [];

const cdnRe = /https:\/\/(?:framerusercontent\.com|framer\.com\/edit)[^"'`\s)\\,]*/g;
const LOCAL = "http://localhost:3000/_fc/";
const rewrite = (s) => s.replaceAll(CDN + "/", LOCAL);

async function save(path, buf) {
  const f = join(OUT, path);
  await mkdir(dirname(f), { recursive: true });
  await writeFile(f, buf);
}

async function pullCdn(url) {
  url = url.replace(/[?#].*$/, "");
  if (seen.has(url) || !url.startsWith(CDN + "/")) return;
  seen.add(url);
  const r = await fetch(url);
  if (!r.ok) return console.warn("skip", r.status, url);
  const rel = "_fc/" + url.slice(CDN.length + 1);
  if (TEXT.test(url)) {
    const t = await r.text();
    for (const m of t.match(cdnRe) ?? []) queue.push(m);
    if (url.includes("/modules/")) for (const c of t.match(/[\w-]+-chunk-[\w-]+\.framercms/g) ?? []) queue.push(CDN + "/cms/" + url.slice((CDN + "/modules/").length).replace(/[^/]+$/, "") + c);
    // relative imports inside modules resolve against the file itself, so just rewrite absolute URLs
    await save(rel, rewrite(t));
  } else await save(rel, Buffer.from(await r.arrayBuffer()));
  console.log("ok", rel);
}

const pages = ["/", "/services", "/work/support-copilot", "/work/underwriting-risk-copilot",
  "/work/clinical-note-summarizer", "/work/catalog-intelligence-engine"];
for (const p of pages) {
  const r = await fetch(ORIGIN + p);
  if (!r.ok) { console.warn("page", r.status, p); continue; }
  const html = await r.text();
  for (const m of html.match(cdnRe) ?? []) queue.push(m);
  await save(p === "/" ? "index.html" : join(p, "index.html"), rewrite(html));
}
// images also appear with query strings (?width=..) — fetched without them, served by extension-less match in serve.mjs
while (queue.length) await Promise.all(queue.splice(0, 8).map((u) => pullCdn(u).catch((e) => console.warn("err", u, e.message))));
console.log("done,", seen.size, "files");
