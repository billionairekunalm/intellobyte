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
  // link-preview card (WhatsApp/LinkedIn/X): brand image + real URL instead of the template's
  t = t.replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1http://localhost:3000/_fc/ib/og-image.png?v=${v}"`)
       .replaceAll("https://intellobyte-v1.framer.website", "https://www.intellobyte.in"); // canonical + og:url -> real domain
  if (!t.includes('og:image:width')) t = t.replace('</head>', '<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:site_name" content="Intellobyte"></head>');
  // featured card linked to leftover template case studies: point it at the section instead (click opens the demo video)
  t = t.replace(/href="\.\/work\/[^"]*"/g, 'href="./#works"');
  { const c = /<link rel="canonical" href="([^"]*)"/.exec(t); if (c) t = t.replace(/(<meta property="og:url" content=")[^"]*"/, `$1${c[1]}"`); } // og:url = canonical
  // undo the repeated lazy attributes an earlier build added (one copy is enough)
  t = t.replace(/(?: loading="lazy" decoding="async"){2,}/g, ' loading="lazy" decoding="async"');
  t = t.replace(/<img loading="lazy" decoding="async"(?=[^>]*\sloading=)/g, "<img"); // tag already had its own
  // stale server HTML still had the template's placeholder team card; the live page renders Divyanshu Patil (match it,
  // so Google sees the real person and React hydrates without a text mismatch)
  t = t.replaceAll(">John Doe<", ">Divyanshu Patil<").replaceAll("k9AWPV5pBPUdxJt7SFCFqvLBGY", "u07YBaHc16abPJ4SfKOSMz3o9Y");
  // below-the-fold images: don't fetch/decode until needed (first 6 stay eager for the hero)
  let k = 0;
  t = t.replace(/<img(?![^>]*\sloading=)/g, (m) => (++k > 6 ? '<img loading="lazy" decoding="async"' : m));
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

// SEO: Framer's runtime also carries the old address as siteCanonicalURL; point it at the real domain. Idempotent.
for (const d of await readdir("site/_fc/sites", { withFileTypes: true })) {
  if (!d.isDirectory()) continue;
  for (const f of await readdir(join("site/_fc/sites", d.name))) {
    if (!f.endsWith(".mjs")) continue;
    const p = join("site/_fc/sites", d.name, f), t = await readFile(p, "utf8");
    if (t.includes("intellobyte-v1.framer.website")) await writeFile(p, t.replaceAll("https://intellobyte-v1.framer.website", "https://www.intellobyte.in"));
  }
}
await writeFile("site/robots.txt", `User-agent: *
Allow: /
Disallow: /work/

Sitemap: https://www.intellobyte.in/sitemap.xml
`);
await writeFile("site/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.intellobyte.in/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://www.intellobyte.in/services</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
</urlset>
`);

// Framer free-plan "Made in Framer" badge module was never mirrored (404 on every load). Serve an empty component
// so the import succeeds and no badge/advert is shown.
for (const d of await readdir("site/_fc/sites", { withFileTypes: true })) {
  if (d.isDirectory()) await writeFile(join("site/_fc/sites", d.name, "PX9hIOIVM.B_-CJP7G.mjs"),
    "// ponytail: stub for Framer's free-plan badge; renders nothing\nexport default function Badge() { return null; }\nexport const __FramerMetadata__ = {};\n");
}

// Content fixes applied to BOTH the server HTML and Framer's client code, so they stay identical (no hydration
// mismatch) and Google reads the same thing visitors see. Idempotent.
{
  const QUOTE_OLD = "We saw a 2× increase in leads after the campaign.";
  const QUOTE_NEW = "From dental clinics to trading floors, our software runs real businesses every day.";
  const CODE = [ // [from, to] in Framer modules
    [QUOTE_OLD, QUOTE_NEW],
    // phone/tablet stats slideshow: template numbers -> the same real numbers desktop shows
    ["UbJWZUv36:`K`,uQJLaiAY3:`OUR GROWTH`,variant:Ks(`bSMvDR3DK`),Waf0ZsqkX:`230`", "UbJWZUv36:`+`,uQJLaiAY3:`Websites Delivered`,variant:Ks(`bSMvDR3DK`),Waf0ZsqkX:`100`"],
    ["UbJWZUv36:`%`,uQJLaiAY3:`UPTIME FOR KEY FLOWS`,variant:Ks(`bSMvDR3DK`),Waf0ZsqkX:`95`", "UbJWZUv36:`+`,uQJLaiAY3:`Brands Served`,variant:Ks(`bSMvDR3DK`),Waf0ZsqkX:`50`"],
    // hidden template "NEW TEMPLATE" button linking to the Framer marketplace
    ["https://www.framer.com/community/marketplace/templates/67833/", "https://www.intellobyte.in/"],
    ["children:`NEW TEMPLATE`", "children:``"],
    ["`Founder, Yodha Electronics, Delhi`", "``"], // template testimonial role (hidden card)
  ];
  const dir = "site/_fc/sites";
  for (const d of await readdir(dir, { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    for (const f of await readdir(join(dir, d.name))) {
      if (!/\.(mjs|json)$/.test(f)) continue;
      const p = join(dir, d.name, f), t0 = await readFile(p, "utf8");
      let t = t0; for (const [a, b] of CODE) t = t.replaceAll(a, b);
      t = t.replaceAll("Founder, Yodha Electronics, Delhi", "").replaceAll("UPTIME FOR KEY FLOWS", "Brands Served").replaceAll("OUR GROWTH", "Websites Delivered"); // search index
      if (t !== t0) await writeFile(p, t);
    }
  }
  // server HTML: each stat label is followed by its number and unit
  const stat = (t, label, num, unit, nLabel, nNum, nUnit) => t.replace(new RegExp(`>${label}<([^]{0,6000}?)>${num}<([^]{0,3000}?)>${unit === "%" ? "%" : unit}<`, "g"),
    (m, a, b) => `>${nLabel}<${a}>${nNum}<${b}>${nUnit}<`);
  for await (const f of walk("site")) {
    const t0 = await readFile(f, "utf8");
    let t = t0.replaceAll(QUOTE_OLD, QUOTE_NEW)
      .replaceAll("https://www.framer.com/community/marketplace/templates/67833/", "https://www.intellobyte.in/")
      .replaceAll(">NEW TEMPLATE<", "><").replaceAll(">Founder, Yodha Electronics, Delhi<", "><");
    t = stat(t, "OUR GROWTH", "230", "K", "Websites Delivered", "100", "+");
    t = stat(t, "UPTIME FOR KEY FLOWS", "95", "%", "Brands Served", "50", "+");
    if (t !== t0) await writeFile(f, t);
  }
}

// ---- SEO + accessibility (server HTML and Framer code changed together, so hydration stays clean). Idempotent. ----
{
  const HOME = { t: "Intellobyte | Web Development & Software Company in Pune",
    d: "Intellobyte is a web development and software company in Pune, India. We build websites, custom software, iOS & Android apps and AI automation for businesses in Pune and worldwide." };
  const SVC = { t: "Web Development, App & Software Services in Pune | Intellobyte",
    d: "Website development, custom software, iOS & Android app development, UI/UX design and AI automation services in Pune by Intellobyte. Get a free quote for your project." };
  const LD = { "@context": "https://schema.org", "@graph": [
    { "@type": "ProfessionalService", "@id": "https://www.intellobyte.in/#org", name: "Intellobyte", alternateName: "Intellobyte Tech Solution",
      description: HOME.d, url: "https://www.intellobyte.in/", logo: "https://www.intellobyte.in/_fc/ib/icon-512.png", image: "https://www.intellobyte.in/_fc/ib/og-image.png",
      telephone: "+91-7666596339", email: "info@intellobyte.com", priceRange: "₹₹",
      address: { "@type": "PostalAddress", addressLocality: "Pune", addressRegion: "Maharashtra", addressCountry: "IN" },
      areaServed: [{ "@type": "City", name: "Pune" }, { "@type": "Country", name: "India" }, "Worldwide"],
      sameAs: ["https://www.linkedin.com/company/intellobyte/", "https://www.instagram.com/intellobyte/"],
      makesOffer: ["Website Development", "Custom Software Development", "iOS & Android App Development", "UI/UX Design", "AI & Automation"]
        .map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n + " in Pune" } })) },
    { "@type": "WebSite", "@id": "https://www.intellobyte.in/#site", url: "https://www.intellobyte.in/", name: "Intellobyte", publisher: { "@id": "https://www.intellobyte.in/#org" } },
  ] };
  // contact form: random Framer field ids -> readable names (they appear as labels in the enquiry emails)
  const FIELDS = { "Interested In": ["L2V3IZbIQ", "ie4L5hiuUL2V3IZbIQ", "jr5AiQ8ubL2V3IZbIQ", "hmun05hPE", "AyC_NLXyLhmun05hPE", "MyG4bTCk_hmun05hPE"],
    "Project Details": ["d4jIeetve", "ie4L5hiuUd4jIeetve", "jr5AiQ8ubd4jIeetve", "T5g3yqIbT", "AyC_NLXyLT5g3yqIbT", "MyG4bTCk_T5g3yqIbT"] };
  // one H1 per page: the hero's second line becomes a <p>, the contact heading an <h2> (same classes, same look)
  const RETAG = [[/^(Partner|Full-Stack AI)$/, "p"], [/^Let.s Build\s+Intelligent Things$/, "h2"]];
  const ALT = [ // section marker in the HTML -> alt text for images inside it
    ['id="home"', "Intellobyte – web development and software company in Pune"],
    ['id="about"', "Intellobyte team building software and websites in Pune"],
    ['id="services"', "Web development, app and software services by Intellobyte, Pune"],
    ['data-framer-name="Featured Works"', "CBCT Center Software built by Intellobyte"],
    ['data-framer-name="Team Members"', "Intellobyte team member"],
    ['data-framer-name="Statistics"', "Intellobyte projects and clients"],
    ['data-framer-name="Awards"', "Client project by Intellobyte"],
    ['id="contact"', "Contact Intellobyte, web development company in Pune"],
  ];
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

  for await (const f of walk("site")) {
    if (f.includes(join("site", "work"))) continue;
    const svc = f.includes(join("site", "services"));
    const M = svc ? SVC : HOME;
    const t0 = await readFile(f, "utf8");
    let t = t0
      .replace(/<title>[^<]*<\/title>/, `<title>${M.t.replace(/&/g, "&amp;")}</title>`)
      .replace(/(<meta (?:name="description"|property="og:description"|name="twitter:description") content=")[^"]*"/g, `$1${esc(M.d)}"`)
      .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*"/g, `$1${esc(M.t)}"`)
      .replace(/<script type="application\/ld\+json" data-ib>[^]*?<\/script>/, "");
    t = t.replace("</head>", `<script type="application/ld+json" data-ib>${JSON.stringify(LD)}</script></head>`);
    // headings
    t = t.replace(/<h1([^>]*)>([^]*?)<\/h1>/g, (m, a, inner) => {
      const txt = inner.replace(/<[^>]+>/g, "").replace(/&[^;]+;/g, "'").trim();
      const r = RETAG.find(([re]) => re.test(txt)); return r ? `<${r[1]}${a}>${inner}</${r[1]}>` : m;
    });
    // form
    t = t.replace(/<input type="(text|email)" name="(Name|Email)"(?! required)/g, '<input type="$1" name="$2" required');
    for (const [nm, ids] of Object.entries(FIELDS)) for (const id of ids) t = t.replaceAll(`name="${id}"`, `name="${nm}"`);
    // alt text for images with none
    const marks = []; for (const [k, alt] of ALT) { let i = -1; while ((i = t.indexOf(k, i + 1)) !== -1) marks.push([i, alt]); }
    marks.sort((a, b) => a[0] - b[0]);
    const mainAt = t.indexOf('id="main"');
    t = t.replace(/<img\b[^>]*>/g, (tag, at) => {
      if (/\salt="[^"]+"/.test(tag) || at < mainAt) return tag;
      let alt = svc ? SVC.t.split(" | ")[0] : HOME.t.split(" | ")[1];
      for (const [p, a] of marks) { if (p < at) alt = a; else break; }
      alt = /logo/i.test(tag) ? "Intellobyte logo" : alt;
      return tag.replace(/\salt(="")?(?=[\s>/])/, "").replace(/^<img/, `<img alt="${esc(alt)}"`);
    });
    if (t !== t0) await writeFile(f, t);
  }

  const dir = "site/_fc/sites";
  for (const d of await readdir(dir, { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    for (const fn of await readdir(join(dir, d.name))) {
      if (!fn.endsWith(".mjs")) continue;
      const p = join(dir, d.name, fn), t0 = await readFile(p, "utf8");
      let t = t0;
      // page metadata Framer applies in the browser: per page title/description
      t = t.replace("description:`Intellobyte Tech Solution builds software apps and websites that industry needs: custom software, UI/UX, AI & automation, web development and business systems.`",
        `description:(typeof location<"u"&&/^\\/services/.test(location.pathname)?${JSON.stringify(SVC.d)}:${JSON.stringify(HOME.d)})`)
        .replace("title:`Intellobyte | Software, Web & App Development`", `title:(typeof location<"u"&&/^\\/services/.test(location.pathname)?${JSON.stringify(SVC.t)}:${JSON.stringify(HOME.t)})`);
      t = t.replace(/`h1`(,\{className:`framer-styles-preset-we9jkf`(?:(?!`h1`)[^]){0,900}?children:`(Partner|Full-Stack AI)`)/g, "`p`$1")
           .replace(/`h1`(,\{className:`framer-styles-preset-we9jkf`(?:(?!`h1`)[^]){0,900}?children:`Let’s Build {2}Intelligent Things`)/g, "`h2`$1");
      t = t.replace("inputName:`Name`,placeholder:`Enter your full name`,type:`text`}", "inputName:`Name`,placeholder:`Enter your full name`,type:`text`,required:!0}")
           .replace("inputName:`Email`,placeholder:`Enter the e-mail`,type:`email`}", "inputName:`Email`,placeholder:`Enter the e-mail`,type:`email`,required:!0}");
      for (const [nm, ids] of Object.entries(FIELDS)) for (const id of ids) t = t.replaceAll("inputName:`" + id + "`", "inputName:`" + nm + "`");
      if (t !== t0) await writeFile(p, t);
    }
  }
}
