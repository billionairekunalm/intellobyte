// Installs the "Product Demos" section into the mirrored site. Re-run after mirror.mjs / content.mjs.
// Copies demos/* to site/_fc/ib/ and adds the stylesheet + script to every page (idempotent).
import { cp, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

await cp("demos", "site/_fc/ib", { recursive: true });
const v = Date.now().toString(36);
const tags = `<link rel="stylesheet" href="/_fc/ib/ib-demos.css?v=${v}" data-ib><script defer src="/_fc/ib/ib-demos.js?v=${v}" data-ib></script>`;
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
  const fix = [["AI UX & Product Design", "AI & Automation"], ["AI UX &amp; Product Design", "AI &amp; Automation"], ["`Data Engineering `", "`Web Dev & Business Systems`"]];
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
    old.forEach((id, i) => { t = t.split(`/_fc/images/${id}.svg`).join(`/_fc/ib/svc/svc-${i + 1}.webp`); });
    if (t !== o) { await writeFile(f, t); console.log("services images swapped in", f); }
  }
}
