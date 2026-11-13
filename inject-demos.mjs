// Installs the "Product Demos" section into the mirrored site. Re-run after mirror.mjs / content.mjs.
// Copies demos/* to site/_fc/ib/ and adds the stylesheet + script to every page (idempotent).
import { cp, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

await cp("demos", "site/_fc/ib", { recursive: true });
const v = Date.now().toString(36);
const tags = `<link rel="stylesheet" href="/_fc/ib/ib-demos.css?v=${v}" data-ib><script defer src="/_fc/ib/ib-demos.js?v=${v}" data-ib></script>`;
const icons = `<link rel="icon" href="/favicon.ico" sizes="48x48"><link rel="icon" type="image/png" href="/_fc/ib/icon-48.png" sizes="48x48"><link rel="icon" type="image/png" href="/_fc/ib/icon-192.png" sizes="192x192"><link rel="apple-touch-icon" href="/_fc/ib/apple-touch-icon.png">`;
let n = 0;
async function* walk(d) {
  for (const e of await readdir(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) { if (e.name !== "_fc") yield* walk(p); } else if (e.name === "index.html") yield p;
  }
}
for await (const f of walk("site")) {
  let t = await readFile(f, "utf8");
  t = t.replace(/<link[^>]*data-ib>|<script[^>]*data-ib><\/script>/g, "").replace("</head>", tags + "</head>");
  // site icons: replace the template favicon (what Google shows next to the result) with the company logo
  t = t.replace(/<link[^>]*rel="(?:shortcut )?icon"[^>]*>|<link[^>]*rel="apple-touch-icon"[^>]*>/g, "").replace("</head>", icons + "</head>");
  // below-the-fold images: don't fetch/decode until needed (first 6 stay eager for the hero)
  let k = 0;
  t = t.replace(/<img(?![^>]*loading=)/g, (m) => (++k > 6 ? '<img loading="lazy" decoding="async"' : m));
  await writeFile(f, t); n++;
}
console.log("demo section installed in", n, "pages");

// Smoother Services accordion open/close: slower, expo-out easing (was a 0.4s ease-in-out tween). Idempotent.
{
  const f = "site/_fc/sites/2cxUvBJ9WdQpnSb5BsB7VL/wKdCdYdBgWSD0ogMJUdHCpg5x9_02irOBfc0F__PCCU.Ncr1Zlls.mjs";
  let t = await readFile(f, "utf8");
  const a = "Bi={delay:0,duration:.4,ease:[.44,0,.56,1],type:`tween`}", b = "Bi={delay:0,duration:.85,ease:[.16,1,.3,1],type:`tween`}";
  if (t.includes(a)) { await writeFile(f, t.replace(a, b)); console.log("services accordion easing patched"); }
}

// Leftover template service titles in variant overrides -> real ones. Idempotent.
{
  const fix = [["AI UX & Product Design", "AI & Automation"], ["AI UX &amp; Product Design", "AI &amp; Automation"], ["UI/UX &amp; Mobile Apps", "iOS &amp; Android Apps"], ["UI/UX & Mobile Apps", "iOS & Android Apps"], ["`Data Engineering `", "`Web Dev & Business Systems`"]];
  async function* all(d) { for (const e of await readdir(d, { withFileTypes: true })) { const q = join(d, e.name); if (e.isDirectory()) yield* all(q); else if (/\.(html|mjs)$/.test(e.name)) yield q; } }
  for await (const f of all("site")) {
    let t = await readFile(f, "utf8"), o = t;
    for (const [a, b] of fix) t = t.split(a).join(b);
    if (t !== o) { await writeFile(f, t); console.log("fixed service titles in", f); }
  }
}

// Services section: swap the four template images (one per service, in order) for Intellobyte's. Idempotent.
{
  const old = ["N7WdKszYpXppuGfH2FoUpbIP2tw", "tgFn5KOHxuVzRnxxY5K6e8rrbc", "VNUMGxu8bHPlCHeUaFBUKKuh2OQ", "LQzz6Xgeq2bSRwjEyr5inS0xDw4"];
  async function* all(d) { for (const e of await readdir(d, { withFileTypes: true })) { const q = join(d, e.name); if (e.isDirectory()) yield* all(q); else if (/\.(html|mjs)$/.test(e.name)) yield q; } }
  for await (const f of all("site")) {
    let t = await readFile(f, "utf8"), o = t;
    old.forEach((id, i) => { t = t.split(`/_fc/images/${id}.svg`).join(`/_fc/ib/svc/svc-${i + 1}c.webp`); t = t.split(`/_fc/ib/svc/svc-${i + 1}${i === 2 || i === 0 ? "b" : ""}.webp`).join(`/_fc/ib/svc/svc-${i + 1}c.webp`).split("/_fc/ib/svc/svc-2.webp").join("/_fc/ib/svc/svc-2c.webp").split("/_fc/ib/svc/svc-4.webp").join("/_fc/ib/svc/svc-4c.webp"); });
    if (t !== o) { await writeFile(f, t); console.log("services images swapped in", f); }
  }
}

// Services accordion: drop Framer's layout projection (layoutId literals / layoutDependency:B) from the open/close card component.
// It faked the height change with scale transforms that squashed the text; ib-demos.js animates real height instead. Idempotent.
{
  const dir = "site/_fc/sites/2cxUvBJ9WdQpnSb5BsB7VL";
  const p = join(dir, (await readdir(dir)).find((n) => /^wKdCdYdBgWSD0ogMJUdHCpg5x9_02irOBfc0F__PCCU\..*\.mjs$/.test(n)));
  const t = await readFile(p, "utf8");
  const a = t.indexOf('Wi={"Mobile Closed"'), b = t.indexOf("displayName", a);
  if (a > 0 && b > a) {
    const seg = t.slice(a, b);
    const out = seg.replace(/layoutId:`[^`]*`,/g, "").replace(/layoutDependency:B,/g, "");
    if (out !== seg) { await writeFile(p, t.slice(0, a) + out + t.slice(b)); console.log("services accordion: layout projection removed"); }
  }
}
// Same for the service key-point pills component (its own layout projection squashed the pill text).
{
  const p = "site/_fc/sites/2cxUvBJ9WdQpnSb5BsB7VL/Z8MROexOS.DEdA3vUx.mjs";
  const t = await readFile(p, "utf8");
  const out = t.replace(/layoutId:`[^`]*`,/g, "").replace(/layoutDependency:[A-Za-z_$],/g, "");
  if (out !== t) { await writeFile(p, out); console.log("service pills: layout projection removed"); }
}
