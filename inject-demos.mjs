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
