/* Intellobyte "Product Demos" section: replaces the template Testimonials block.
   Three chapters (Software -> Apps -> Websites). The panel pins while the visitor scrolls down and
   each chapter's cards travel right -> left. Edit CHAPTERS to change content; paste YouTube links
   into the `yt` fields (full URL or just the video id). */
(() => {
  const CHAPTERS = [
    {
      key: "software", label: "Software", blurb: "Business software, dashboards and automation built around your real workflow.",
      items: [
        { title: "Live Trading Competition Platform", desc: "100+ traders, real-time leaderboard and live trading.", tags: ["Real-Time", "FinTech"], yt: "https://youtu.be/CrX_5GviXnE", img: "assets/software-trading-v2.webp" }, // PASTE YOUTUBE LINK in yt
        { title: "Investmore", desc: "Stock market class management platform.", tags: ["EdTech", "Management"], yt: "https://youtu.be/LGE78i4-H9g" },
        { title: "CBCTOne", desc: "DICOM file sharing and viewer platform for dental and medical imaging.", tags: ["Healthcare", "DICOM"], yt: "https://youtu.be/S1Dv728jDqg", img: "assets/software-cbctone.webp" },
        { title: "CBCT Center Software", desc: "Run every imaging center from one screen: dentist app, technician, radiologist and admin dashboards.", tags: ["Healthcare","Management"], yt: "https://youtu.be/FmbRBXW3XlE", img: "assets/software-cbct-center-v2.webp" },
      ],
    },
    {
      key: "apps", label: "Apps", blurb: "Mobile and web apps with interfaces people understand at a glance.",
      items: [
        { title: "Hello Sakhee", desc: "The app every woman needs: wellness, health, mindfulness and learning.", tags: ["Mobile App", "Women's Wellness"], yt: "https://youtube.com/shorts/RU4QYq7uXDQ", img: "assets/work-sakhee.webp" },
        { title: "Everlush", desc: "Poultry trading app: book live birds and eggs from farms at today's rate.", tags: ["Mobile App", "Marketplace"], yt: "https://youtu.be/Xe-s9ysFaYo" },
      ],
    },
    {
      key: "websites", label: "Websites", blurb: "Fast, modern websites we designed and shipped for clients across industries.",
      items: [
        { title: "Gargee's Dormitory", desc: "AC & Non-AC dormitory in CBD Belapur, Navi Mumbai: 3D hero, WhatsApp booking.", tags: ["Hospitality", "Navi Mumbai"], yt: "", url: "https://www.gargeesdorms.com", img: "assets/web-gargees-v2.webp" },
        { title: "Vishwaharsh Ayurved", desc: "Ayurvedic clinic website in Chinchwad, Pune with online consultation booking.", tags: ["Healthcare", "Ayurveda"], yt: "", url: "https://www.vishwaharshayurved.com", img: "assets/web-vishwaharsh-v3.webp" },
        { title: "DYP Incubation Centre", desc: "Platform for an incubator and education program.", tags: ["Education"], yt: "", url: "https://www.dypdsif.org", img: "assets/web-dyp-v2.webp" },
        { title: "RamaAstra", desc: "Website for an aerospace venture.", tags: ["Aerospace"], yt: "", url: "https://www.ramaastra.com", img: "assets/web-ramaastra-v2.webp" },
        { title: "Imaging Dental Solutions", desc: "Website for a diagnostic imaging network offering CBCT and OPG scans across Pune.", tags: ["Healthcare","Dental"], yt: "", url: "https://imagingdentalsolutions.com", img: "assets/web-imagingdental.webp" },
        { title: "Chhaya Clinic & Dental Care", desc: "Website for a dental clinic in Katraj, Pune with online appointment booking.", tags: ["Healthcare","Dental"], yt: "", url: "https://www.chhayaclinicanddentalcare.com", img: "assets/web-chhaya.webp" },
      ],
    },
    {
      key: "international", label: "International Projects", blurb: "Products we built for clients and users outside India.",
      items: [
        { title: "Heimstadt", desc: "Germany: premium housing platform to search rentals by city and move-in dates, with wishlist and landlord listings.", tags: ["Germany","Real Estate"], yt: "", url: "https://www.heimstadt.com", img: "assets/web-heimstadt.webp" },
        { title: "GDM Construction & Roofing", desc: "South Africa: website for a Johannesburg construction, renovation and roofing company with quote and WhatsApp enquiries.", tags: ["South Africa","Construction"], yt: "", url: "https://www.gdmconstruction.co.za", img: "assets/web-gdm.webp" },
      ],
    },
  ];

  const BASE = (document.currentScript && document.currentScript.src.replace(/[^/]*$/, "")) || "/_fc/ib/";
  const ICONS = {
    software: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 20 8 32l14 12M42 20l14 12-14 12M37 14 27 50"/></svg>',
    apps: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="19" y="6" width="26" height="52" rx="6"/><path d="M28 12h8M29 51h6"/></svg>',
    websites: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="11" width="52" height="42" rx="6"/><path d="M6 23h52M14 17h.01M20 17h.01M26 17h.01"/></svg>',
  };
  const PLAY = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z"/></svg>';

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ytId = (v) => { const m = String(v || "").match(/(?:youtu\.be\/|v=|embed\/|shorts\/|^)([\w-]{11})(?:[?&#/]|$)/); return m ? m[1] : ""; };
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const easeIn = (t) => t * t * t;
  const ARROW = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>';
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");

  function card(ch, it, i) {
    const id = ytId(it.yt);
    const bg = it.img ? `<img class="ibd-img" loading="lazy" alt="" src="${BASE}${esc(it.img)}">`
      : id ? `<img class="ibd-img" loading="lazy" alt="" src="https://i.ytimg.com/vi/${id}/maxresdefault.jpg" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${id}/mqdefault.jpg'">`
      : it.img ? `<img class="ibd-img" loading="lazy" alt="" src="${BASE}${esc(it.img)}">` : "";
    const soon = id ? "" : it.url ? '<span class="ibd-soon">Live website</span>' : '<span class="ibd-soon">Demo coming soon</span>';
    const attrs = id ? `data-yt="${id}"${/shorts\//.test(it.yt) ? ' data-short="1"' : ""} aria-label="Play demo: ${esc(it.title)}"`
      : it.url ? `data-url="${esc(it.url)}" aria-label="Open website: ${esc(it.title)}"`
      : `aria-disabled="true" aria-label="${esc(it.title)} (demo coming soon)"`;
    return `<li class="ibd-card" data-k="${ch.key}" style="--i:${i}">
      <button type="button" class="ibd-btn" ${attrs}>
        <span class="ibd-poster">
          <span class="ibd-glyph" aria-hidden="true">${ICONS[ch.key]}</span>
          <span class="ibd-num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
          ${bg}${soon}
          <span class="ibd-play" aria-hidden="true">${it.url && !id ? ARROW : PLAY}</span>
        </span>
        <span class="ibd-meta">
          <span class="ibd-tags">${it.tags.map((t) => `<i>${esc(t)}</i>`).join("")}</span>
          <strong>${esc(it.title)}</strong>
          <span class="ibd-desc">${esc(it.desc)}</span>
        </span>
      </button></li>`;
  }

  function build() {
    const s = document.createElement("section");
    s.id = "ib-demos";
    s.setAttribute("aria-label", "Portfolio: software, apps and websites");
    s.innerHTML = `
      <div class="ibd-pin">
        <div class="ibd-glow" aria-hidden="true"></div><div class="ibd-grid" aria-hidden="true"></div>
        <div class="ibd-top">
          <div><span class="ibd-pill"><i></i>Portfolio</span><h2 class="ibd-h">See what we build</h2></div>
          <nav class="ibd-tabs" aria-label="Demo categories">${CHAPTERS.map((c, i) => `<button type="button" data-i="${i}"><b>0${i + 1}</b>${c.label}</button>`).join("")}</nav>
        </div>
        <div class="ibd-stage">
          ${CHAPTERS.map((c, i) => `
          <div class="ibd-ch" data-i="${i}">
            <div class="ibd-chead"><span class="ibd-big" aria-hidden="true">0${i + 1}</span><div><h3>${c.label}</h3><p>${esc(c.blurb)}</p></div>
              <div class="ibd-nav"><button type="button" class="ibd-arr" data-d="-1" aria-label="Previous ${c.label} demos">&#8592;</button><button type="button" class="ibd-arr" data-d="1" aria-label="Next ${c.label} demos">&#8594;</button></div></div>
            <ul class="ibd-track" tabindex="0" aria-label="${c.label} demos, scroll sideways">${c.items.map((it, j) => card(c, it, j)).join("")}</ul>
            <div class="ibd-prog" aria-hidden="true"><i></i></div>
          </div>`).join("")}
        </div>
        <div class="ibd-foot"><span class="ibd-count"><b>01</b> / 03</span><span class="ibd-bar"><i></i></span><span class="ibd-hint"></span></div>
      </div>`;
    return s;
  }

  // ---- lightbox -------------------------------------------------------------------------
  let lastFocus = null;
  function openVideo(id, btn, short) {
    lastFocus = btn;
    const o = document.createElement("div");
    o.className = "ibd-lb"; o.setAttribute("role", "dialog"); o.setAttribute("aria-modal", "true"); o.setAttribute("aria-label", "Demo video");
    o.innerHTML = `<button type="button" class="ibd-x" aria-label="Close video">&times;</button>
      <div class="ibd-frame${short ? " short" : ""}"><iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1" title="Demo video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`;
    const close = () => { o.remove(); document.removeEventListener("keydown", key, true); document.documentElement.style.overflow = ""; lastFocus && lastFocus.focus && lastFocus.focus(); };
    const key = (e) => { if (e.key === "Escape") close(); if (e.key === "Tab") { e.preventDefault(); o.querySelector(".ibd-x").focus(); } };
    o.addEventListener("click", (e) => { if (e.target === o || e.target.closest(".ibd-x")) close(); });
    document.addEventListener("keydown", key, true);
    document.documentElement.style.overflow = "hidden";
    document.body.appendChild(o);
    requestAnimationFrame(() => { o.classList.add("on"); o.querySelector(".ibd-x").focus(); });
  }

  // ---- scroll choreography --------------------------------------------------------------
  const E = 0.1; // share of each chapter spent sliding in / out
  let raf = 0, ibdVisible = true;
  function update() {
    raf = 0;
    const s = document.getElementById("ib-demos");
    if (!s || !ibdVisible) return; // off-screen: skip the layout reads (they were forced on every scroll tick, e.g. while the services accordion scrolls)
    if (s.classList.contains("ibd-static")) { // highlight the tab of the chapter nearest the viewport middle
      let best = 0, bd = 1e9;
      s.querySelectorAll(".ibd-ch").forEach((ch, i) => { const r = ch.getBoundingClientRect(), d = Math.abs(r.top + r.height / 2 - innerHeight / 2); if (d < bd) { bd = d; best = i; } });
      s.dataset.active = best;
      s.querySelectorAll(".ibd-tabs button").forEach((b, i) => b.classList.toggle("on", i === best));
      return;
    }
    const r = s.getBoundingClientRect(), total = r.height - innerHeight;
    if (r.bottom < -200 || r.top > innerHeight + 200) return;
    const p = clamp(-r.top / total, 0, 1), c = p * 3, idx = Math.min(2, Math.floor(c)), q = c - idx;
    const stage = s.querySelector(".ibd-stage"), vw = stage.clientWidth, pad = clamp(vw * 0.05, 18, 72);
    s.dataset.active = idx;
    s.style.setProperty("--p", p.toFixed(4));
    s.querySelector(".ibd-bar i").style.transform = `scaleX(${p})`;
    s.querySelector(".ibd-count b").textContent = "0" + (idx + 1);
    s.querySelector(".ibd-hint").style.opacity = p < 0.02 ? 1 : 0;
    s.querySelectorAll(".ibd-tabs button").forEach((b, i) => b.classList.toggle("on", i === idx));
    s.querySelectorAll(".ibd-ch").forEach((ch, i) => {
      const track = ch.querySelector(".ibd-track");
      if (i !== idx) { ch.style.visibility = "hidden"; ch.style.opacity = 0; return; }
      ch.style.visibility = "visible";
      const w = track.scrollWidth, end = Math.min(pad, vw - w - pad);
      let x, o = 1;
      if (q < E && i > 0) { const u = easeOut(q / E); x = lerp(vw, pad, u); o = u; }
      else if (q > 1 - E && i < 2) { const u = easeIn((q - (1 - E)) / E); x = end - u * vw * 0.9; o = 1 - u; }
      else { const a = i > 0 ? E : 0, b = i < 2 ? 1 - E : 1; x = lerp(pad, end, clamp((q - a) / (b - a), 0, 1)); }
      ch.style.opacity = o;
      track.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
      track.querySelectorAll(".ibd-card").forEach((cd) => {
        const cx = x + cd.offsetLeft + cd.offsetWidth / 2, d = clamp((cx - vw / 2) / (vw / 2), -1.4, 1.4), a = Math.min(1, Math.abs(d));
        cd.style.transform = `perspective(900px) rotateY(${(-d * 9).toFixed(2)}deg) scale(${(1 - 0.07 * a).toFixed(3)})`;
        cd.style.setProperty("--px", `${(-d * 26).toFixed(1)}px`);
      });
    });
  }
  const tick = () => { if (!raf) raf = requestAnimationFrame(update); };

  function size() {
    const s = document.getElementById("ib-demos");
    if (!s) return;
    s.classList.add("ibd-static"); // normal page scroll; each row scrolls sideways by swipe, drag or arrows
    s.style.height = "auto";
    s.querySelectorAll(".ibd-track").forEach(sync);
  }

  function sync(tr) {
    const ch = tr.closest(".ibd-ch"), max = tr.scrollWidth - tr.clientWidth;
    ch.querySelector('[data-d="-1"]').disabled = tr.scrollLeft < 4;
    ch.querySelector('[data-d="1"]').disabled = tr.scrollLeft > max - 4;
    ch.querySelector(".ibd-prog i").style.transform = `scaleX(${max > 0 ? (0.18 + 0.82 * tr.scrollLeft / max).toFixed(3) : 1})`;
    ch.classList.toggle("ibd-fit", max <= 4 && tr.clientWidth > 0);
  }

  function init(s) {
    const io = "IntersectionObserver" in window && new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.25 });
    s.querySelectorAll(".ibd-track").forEach((tr) => {
      io ? io.observe(tr) : tr.classList.add("in");
      setTimeout(() => tr.classList.add("in"), 4000); // never leave cards hidden if the observer is late
      tr.addEventListener("scroll", () => sync(tr), { passive: true });
      let down = false, sx = 0, sl = 0, moved = false;
      tr.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") return; down = true; moved = false; sx = e.clientX; sl = tr.scrollLeft; });
      addEventListener("pointermove", (e) => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 5) { moved = true; tr.classList.add("drag"); } if (moved) tr.scrollLeft = sl - dx; });
      addEventListener("pointerup", () => { if (!down) return; down = false; tr.classList.remove("drag"); if (moved) setTimeout(() => (moved = false), 0); });
      tr.addEventListener("click", (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); } }, true);
    });
    s.addEventListener("pointermove", (e) => { // premium 3D tilt + light follow, mouse only
      if (e.pointerType !== "mouse" || reduce.matches) return;
      const b = e.target.closest(".ibd-btn"); if (!b || b.closest(".drag")) return;
      const r = b.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      b.style.setProperty("--rx", ((0.5 - y) * 7).toFixed(2) + "deg"); b.style.setProperty("--ry", ((x - 0.5) * 9).toFixed(2) + "deg");
      b.style.setProperty("--mx", (x * 100).toFixed(1) + "%"); b.style.setProperty("--my", (y * 100).toFixed(1) + "%");
    });
    s.addEventListener("pointerout", (e) => { const b = e.target.closest(".ibd-btn"); if (b && !b.contains(e.relatedTarget)) { b.style.setProperty("--rx", "0deg"); b.style.setProperty("--ry", "0deg"); } });
    s.addEventListener("click", (e) => {
      const a = e.target.closest(".ibd-arr");
      if (a) { const tr = a.closest(".ibd-ch").querySelector(".ibd-track"), w = tr.querySelector(".ibd-card").offsetWidth + 20; return tr.scrollBy({ left: +a.dataset.d * w * 1.5, behavior: "smooth" }); }
    });
    s.addEventListener("click", (e) => {
      const b = e.target.closest(".ibd-btn");
      if (b && b.dataset.url) return window.open(b.dataset.url, "_blank", "noopener");
      if (b && b.dataset.yt) return openVideo(b.dataset.yt, b, b.dataset.short);
      const t = e.target.closest(".ibd-tabs button");
      if (t) {
        const i = +t.dataset.i, top = s.getBoundingClientRect().top + scrollY, total = s.offsetHeight - innerHeight;
        if (s.classList.contains("ibd-static")) { // scroll the window only: scrollIntoView also scrolls the clipped .ibd-pin and strands its header
          const ch = s.querySelectorAll(".ibd-ch")[i]; s.querySelector(".ibd-pin").scrollTop = 0;
          scrollTo({ top: ch.getBoundingClientRect().top + scrollY - 110, behavior: "smooth" });
        }
        else scrollTo({ top: top + total * ((i + (i ? 0.16 : 0.04)) / 3), behavior: "smooth" });
      }
    });
    size();
    if ("IntersectionObserver" in window) new IntersectionObserver((es) => { ibdVisible = es[0].isIntersecting; if (ibdVisible) tick(); }, { rootMargin: "150px" }).observe(s);
  }

  // ---- mount: insert after the template Testimonials block, survive Framer client navigation --
  // Featured project: show CBCT Center Software (template CMS card is patched in place; survives re-renders)
  const FEAT = { img: "/_fc/ib/assets/software-cbct-center-v2.webp", yt: "FmbRBXW3XlE",
    text: { "DYP Incubation Centre": "CBCT Center Software", "A platform built for an incubator and education program.": "Run every imaging center from one screen: dentist app, technician, radiologist and admin dashboards.", "Website, UI/UX, Development": "Software, Dashboards, Mobile App", "Education": "Healthcare" } };
  function patchFeatured(f) {
    const a = f.querySelector("a.framer-13tcklb");
    if (!a) return;
    a.setAttribute("data-ib-feat", "");
    const w = document.createTreeWalker(a, NodeFilter.SHOW_TEXT);
    for (let n; (n = w.nextNode());) { const v = FEAT.text[n.nodeValue.trim()]; if (v) n.nodeValue = v; }
    a.querySelectorAll("img").forEach((i) => { if (/0VrElWZWccBOKLdWFuKOXTqIki0/.test(i.src) && !i.src.includes("/ib/")) { i.removeAttribute("srcset"); i.src = FEAT.img; } });
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest("a[data-ib-feat]");
    if (!a) return;
    e.preventDefault(); e.stopPropagation();
    openVideo(FEAT.yt, a, false);
  }, true);
  // Founders card: replaces the template quote with a "Founders" label and both photos, each with its name beside it
  const FOUNDERS = [{ name: "Kunal Manjare", role: "CEO", img: null }, { name: "Pranav Patil", role: "CTO", img: "/_fc/ib/assets/pranav-founder-v5.webp" }];
  function patchQuote() {
    const k = [...document.querySelectorAll("p")].find((p) => p.textContent.trim() === "Kunal Manjare");
    const card = k && k.closest('[data-framer-name="TrustMetrics Block"]');
    if (!card || card.hasAttribute("data-ib-quote")) return;
    const im = card.querySelector(".framer-1rvd1ad img");
    if (!im) return;
    FOUNDERS[0].img = im.currentSrc || im.src;
    card.setAttribute("data-ib-quote", ""); card.classList.add("ibf-host");
    const el = document.createElement("div");
    el.className = "ibf";
    el.innerHTML = `<span class="ibf-tag">Founders</span><div class="ibf-row">${FOUNDERS.map((f) => `<figure class="ibf-p"><img src="${f.img}" alt="${f.name}" loading="lazy"><figcaption><b>${f.name}</b><small>${f.role}</small></figcaption></figure>`).join("")}</div>`;
    card.appendChild(el);
  }

  function dedupePills() { // tablet/mobile variants render some pills twice
    document.querySelectorAll('[data-framer-name="Key Points"]').forEach((kp) => {
      const seen = new Set();
      [...kp.querySelectorAll('[data-framer-name^="key pt"]')].forEach((e) => { const v = e.textContent.trim(); if (!v) return; if (seen.has(v)) e.style.display = "none"; else seen.add(v); });
    });
  }
  // Services accordion: animate the real card height (Framer's own layout animation was removed in inject-demos.mjs)
  (function accordion() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const SEL = '[class*="framer-rmIXD"][data-framer-name]';
    let snap = new Map();
    const take = () => { snap = new Map([...document.querySelectorAll(SEL)].map((c) => [c, c.getBoundingClientRect().height])); };
    const mob = matchMedia("(max-width: 809px)");
    let anchor = null;
    document.addEventListener("pointerdown", (e) => { const c = e.target.closest && e.target.closest(SEL); if (c) { take(); anchor = { c, top: c.getBoundingClientRect().top }; } }, true);
    // phones: keep the tapped card under the finger while the open card above it collapses (no page jump)
    const hold = (ms) => { if (!mob.matches || !anchor) return; const { c, top } = anchor, t0 = performance.now(); const f = () => { const d = c.getBoundingClientRect().top - top; if (Math.abs(d) > 0.5) scrollBy({ top: d, behavior: "instant" }); if (performance.now() - t0 < ms) requestAnimationFrame(f); }; f(); };
    new MutationObserver((ms) => {
      if (!snap.size) return;
      const ch = new Set(ms.map((m) => m.target).filter((n) => n.matches && n.matches(SEL)));
      if (!ch.size) return;
      dedupePills(); // before measuring, or the card is measured taller than it ends up and snaps at the end
      const before = snap; snap = new Map();
      ch.forEach((c) => {
        const h0 = before.get(c), h1 = c.getBoundingClientRect().height;
        if (h0 == null || Math.abs(h0 - h1) < 2) return;
        c.classList.add("ibacc");
        const a = c.animate([{ height: h0 + "px" }, { height: h1 + "px" }], { duration: mob.matches ? 480 : h1 > h0 ? 780 : 520, easing: "cubic-bezier(.32,.72,0,1)" });
        hold(mob.matches ? 520 : 0);
        if (mob.matches) { document.documentElement.classList.add("ib-anim"); clearTimeout(window.__iba); window.__iba = setTimeout(() => document.documentElement.classList.remove("ib-anim"), 560); }
        a.onfinish = a.oncancel = () => c.classList.remove("ibacc");
        if (h1 > h0) [...c.children].forEach((k) => k.animate([{ opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "none" }], { duration: mob.matches ? 380 : 560, delay: mob.matches ? 90 : 170, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" }));
      });
    }).observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ["data-framer-name"] });
  })();


  // Team-card socials: Framer's icons are plain divs with no links, so wire them up here
  // per icon slot: [url, label, glyph to draw instead of the template's GitHub icon (optional)]
  const SOC = {
    "Kunal Manjare": [["https://x.com/kunalair2", "X"], ["https://www.linkedin.com/in/billionaire-kunal-manjare/", "LinkedIn"], ["https://www.instagram.com/billionairekunalmanjare/", "Instagram", "ig"]],
    "Pranav Patil": [["https://x.com/everydaypranav", "X"], ["https://www.linkedin.com/in/thecuriouspranav/", "LinkedIn"], ["https://www.instagram.com/thecuriouspranav/", "Instagram", "ig"]],
    "Shinjini Mondal": [["https://www.linkedin.com/in/shinjini-mondal-3a2a89281/", "LinkedIn"], ["https://x.com/Shinjini_M12", "X", "x"]],
  };
  const GLYPH = {
    ig: '<g fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></g>',
    x: '<path fill="#fff" d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.16h1.7L7.4 4.74H5.58l11.09 14.42Z"/>',
  };
  function patchSocials() {
    document.querySelectorAll("p.framer-text").forEach((n) => {
      const name = n.children.length === 0 && SOC[n.textContent.trim()];
      if (!name || n.closest(".ibf") || n.hasAttribute("data-ib-soc") || !n.getBoundingClientRect().width) return;
      let a = n, icons = [];
      for (let i = 0; i < 12 && a && !icons.length; i++) { a = a.parentElement; icons = a ? [...a.querySelectorAll('[data-framer-name="Icon Large"]')] : []; if (icons.length > 3) return; }
      if (!icons.length) return;
      n.setAttribute("data-ib-soc", "");
      icons.forEach((ic, i) => {
        const hit = ic.closest('[class*="-container"]') || ic, e = name[i];
        if (!e) { hit.style.visibility = "hidden"; hit.style.pointerEvents = "none"; return; } // keep the slot: display:none lets the photo grow over the name
        if (e[2]) { const sv = ic.querySelector("svg"); if (sv) sv.innerHTML = GLYPH[e[2]]; }
        hit.style.cursor = "pointer"; hit.setAttribute("role", "link"); hit.tabIndex = 0; hit.setAttribute("aria-label", e[1]);
        hit.onclick = () => window.open(e[0], "_blank", "noopener");
        hit.onkeydown = (ev) => { if (ev.key === "Enter") hit.onclick(); };
      });
    });
  }


  // "Trusted by" strip: replace Framer's placeholder logos with client logos (pre-greyed in assets)
  const LOGOS = [["imaging", .99], ["investmore", 1.59], ["vishwaharsh", .95], ["everlush", 1.12], ["ramaastra", 1.17], ["dyp2", 1], ["heimstadt", 1.5], ["gdm", 1], ["gargees", 2.07]];
  function patchLogos() {
    document.querySelectorAll(".framer-662aja:not([data-ib-logos])").forEach((w) => {
      w.setAttribute("data-ib-logos", "");
      const li = LOGOS.map(([n, r]) => `<li><img src="${BASE}assets/logo-${n}.webp" alt="" style="height:${r < 1.3 ? 46 : r < 1.8 ? 40 : 34}px"></li>`).join("");
      const box = document.createElement("div");
      box.className = "ibl";
      box.setAttribute("aria-label", "Brands we have worked with");
      box.innerHTML = `<ul>${li}${li}</ul>`;
      w.appendChild(box);
    });
  }


  // "Awards" strip: placeholder logos/awards -> real client work (rows link to the live sites)
  const WORK = [
    ["o-ramaastra", "Aerospace Venture Website", "RamaAstra (Aerospace)", "https://www.ramaastra.com"],
    ["o-dyp", "Incubation & Education Platform", "DYP Incubation (Education)", "https://www.dypdsif.org"],
    ["w-heimstadt", "Premium Housing Platform", "Heimstadt (Real Estate)", "https://www.heimstadt.com"],
    ["o-gdm", "Construction & Roofing Website", "GDM Construction (S. Africa)", "https://www.gdmconstruction.co.za"],
  ];
  function patchWork() {
    document.querySelectorAll('[data-framer-name="Awards"]').forEach((sec) => {
      const rows = [...sec.querySelectorAll("a[href*='awwwards']")];
      rows.forEach((a, i) => {
        const w = WORK[i % WORK.length], ps = a.querySelectorAll("p.framer-text"), im = a.querySelector("img");
        if (!im || ps.length < 3) return;
        ps[0].textContent = w[1]; ps[1].textContent = w[2];
        im.removeAttribute("srcset"); im.src = `${BASE}assets/logo-${w[0]}.webp`;
        im.style.cssText = "height:56px;width:190px;object-fit:contain;object-position:left center;margin:-13px 0;filter:none;opacity:1";
        a.href = w[3]; a.target = "_blank"; a.rel = "noopener";
      });
    });
  }


  // Team: small rounded-square photos of the wider team under the leadership cards
  function patchTeam() {
    document.querySelectorAll('[data-framer-name="Cards Container"]').forEach((c) => {
      const n = c.nextElementSibling;
      if (n && n.classList.contains("ibt")) return;
      const t = c.querySelector("p.framer-text");
      const el = document.createElement("div");
      el.className = "ibt";
      if (t) el.style.color = getComputedStyle(t).color;
      el.innerHTML = `<div class="ibt-row">${[1, 2, 3, 4].map((i) => `<img style="--i:${i - 1}" src="${BASE}assets/team-v2-${i}.webp" alt="Intellobyte team member" width="64" height="64">`).join("")}<span class="ibt-n" style="--i:4" aria-label="12 plus"><b>12</b><i>+</i></span></div><p>12+ people team</p>`;
      c.insertAdjacentElement("afterend", el);
      // on scroll-in: circles slide out from the first one, left to right, then the 12+ counts up
      const b = el.querySelector(".ibt-n b");
      if (reduce.matches || !("IntersectionObserver" in window)) { el.classList.add("ibt-go"); return; }
      b.textContent = "0";
      const io = new IntersectionObserver((es) => {
        if (!es[0].isIntersecting) return;
        io.disconnect();
        el.classList.add("ibt-go");
        setTimeout(() => {
          const t0 = performance.now();
          (function f(t) { const k = Math.min(1, (t - t0) / 1100); b.textContent = Math.round(12 * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); })(t0);
          setTimeout(() => { b.textContent = "12"; }, 1300); // in case frames are throttled
        }, 750);
      }, { threshold: 0.6 });
      io.observe(el);
    });
  }

  // A WebGL canvas whose context the phone dropped is painted as an opaque light slab, hiding the CSS fallback
  // behind it (contact background). Hide lost canvases; show them again if the browser restores the context.
  document.addEventListener("webglcontextlost", (e) => { if (e.target.style) e.target.style.visibility = "hidden"; }, true);
  document.addEventListener("webglcontextrestored", (e) => { if (e.target.style) e.target.style.visibility = ""; }, true);


  // Process (phones): the cards are a native swipe scroller now, so the arrow buttons scroll it instead of Framer's slider
  document.addEventListener("click", (e) => {
    if (!matchMedia("(max-width: 809px)").matches) return;
    const nav = e.target.closest && e.target.closest(".framer-1tflpem .framer-5y3nqz");
    if (!nav) return;
    const btns = [...nav.children], i = btns.findIndex((b) => b.contains(e.target));
    const sc = document.querySelector(".framer-1tflpem .framer-1un4fms"), card = sc && sc.querySelector(".framer-WK4dm");
    if (i < 0 || !card) return;
    e.stopPropagation(); e.preventDefault();
    const step = card.getBoundingClientRect().width + 14, at = Math.round(sc.scrollLeft / step); // always land exactly on the neighbouring card
    sc.scrollTo({ left: Math.max(0, (at + (i === 0 ? -1 : 1))) * step, behavior: "smooth" });
  }, true);

  function mount() {
    const t = document.querySelector('[data-framer-name="Testimonials"]');
    const f = document.querySelector('[data-framer-name="Featured Works"]');
    if (f) patchFeatured(f);
    dedupePills();
    patchQuote();
    patchSocials();
    patchLogos();
    patchWork();
    patchTeam();
    if (!t || !f) return;
    if (!t.hasAttribute("data-ib-hidden")) t.setAttribute("data-ib-hidden", ""); // React may re-render the block
    if (document.getElementById("ib-demos")) return;
    const s = build();
    f.insertAdjacentElement("afterend", s); // right after the single featured project
    init(s);
  }
  let mq = 0;
  new MutationObserver(() => { if (!mq) mq = setTimeout(() => { mq = 0; (window.requestIdleCallback || setTimeout)(mount); }, 350); }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-framer-name"] });
  setInterval(mount, 2000); // safety net: Framer hydrates after this script runs
  addEventListener("scroll", tick, { passive: true });
  addEventListener("resize", size);
  addEventListener("load", size);
  reduce.addEventListener && reduce.addEventListener("change", size);
  mount();
})();

// Navbar fix: Services opened a separate page, Contact / Start a Project linked to "./" (a reload).
// Send them to the home-page sections instead.
(function () {
  const go = (id) => {
    const el = document.getElementById(id);
    if (!el) return false;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    try { history.replaceState(null, "", "/#" + id); } catch (_) {}
    return true;
  };
  window.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest("a");
    if (!a) return;
    const txt = (a.textContent || "").trim().toLowerCase();
    const h = a.getAttribute("href") || "";
    let id = "";
    if (/^(contact|contact us|start a project)$/.test(txt) && /^\.\/?$/.test(h)) id = "contact";
    else if (txt === "services" && /^\.\/services/.test(h)) id = "services";
    if (id && go(id)) { e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation(); }
  }, true);
})();

// UI sounds v2: a small generative sound design, all synthesized with Web Audio (no audio files).
// Everything is tuned to D-major pentatonic so consecutive clicks form a melody; sounds are panned to where they
// happen and sent through a soft generated reverb. Nothing plays until the visitor's first tap/click/key (browser
// rule). Floating toggle bottom-left mutes; the choice is remembered.
(function () {
  const KEY = "ib-sound";
  let on = true;
  try { on = localStorage.getItem(KEY) !== "off"; } catch (_) {}
  const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
  const SCALE = [293.66, 329.63, 369.99, 440, 493.88]; // D E F# A B
  const note = (i) => SCALE[((i % 5) + 5) % 5] * Math.pow(2, Math.floor(i / 5)); // i=0 -> D4, 5 -> D5 ...
  let ac, out, wet, noise, step = 7, lastScrollY = scrollY, dir = 1;

  function ctx() {
    if (!ac) {
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
      ac = new AC();
      const comp = ac.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 4; comp.connect(ac.destination);
      out = ac.createGain(); out.gain.value = 0.85; out.connect(comp);
      // generated stereo reverb tail (1.6 s)
      const len = Math.floor(ac.sampleRate * 1.6), ir = ac.createBuffer(2, len, ac.sampleRate);
      for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let k = 0; k < len; k++) d[k] = (Math.random() * 2 - 1) * Math.pow(1 - k / len, 3.2); }
      const conv = ac.createConvolver(); conv.buffer = ir;
      wet = ac.createGain(); wet.gain.value = 0.32; wet.connect(conv).connect(comp);
      noise = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
      const d = noise.getChannelData(0); for (let k = 0; k < d.length; k++) d[k] = Math.random() * 2 - 1;
    }
    if (ac.state === "suspended") ac.resume();
    return ac;
  }
  const ready = () => on && ac && ac.state === "running";
  const panOf = (x) => Math.max(-0.7, Math.min(0.7, (x / innerWidth) * 2 - 1)) * 0.8;

  // one output bus per sound: pan -> dry + reverb send
  function bus(pan, send) {
    const g = ac.createGain(), p = ac.createStereoPanner ? ac.createStereoPanner() : null;
    if (p) { p.pan.value = pan || 0; g.connect(p); p.connect(out); } else g.connect(out);
    if (send) { const s = ac.createGain(); s.gain.value = send; g.connect(s).connect(wet); }
    return g;
  }
  // FM bell / marimba voice
  function bell(f, t, o) {
    o = o || {};
    const dur = o.dur || 0.9, vol = o.vol || 0.07, b = bus(o.pan, o.send == null ? 0.6 : o.send);
    const c = ac.createOscillator(), m = ac.createOscillator(), mg = ac.createGain(), g = ac.createGain();
    c.frequency.value = f; m.frequency.value = f * (o.ratio || 3.5);
    mg.gain.setValueAtTime(f * (o.index || 2.2), t); mg.gain.exponentialRampToValueAtTime(f * 0.05, t + dur * 0.5);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    m.connect(mg).connect(c.frequency); c.connect(g).connect(b);
    c.start(t); m.start(t); c.stop(t + dur + 0.05); m.stop(t + dur + 0.05);
  }
  function tone(f, t, dur, vol, type, pan, send, glideTo) {
    const o = ac.createOscillator(), g = ac.createGain(), b = bus(pan, send || 0);
    o.type = type || "sine"; o.frequency.setValueAtTime(f, t); if (glideTo) o.frequency.exponentialRampToValueAtTime(glideTo, t + dur);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(b); o.start(t); o.stop(t + dur + 0.05);
  }
  function swoosh(t, k, from, to, f0, f1, dur) {
    const src = ac.createBufferSource(); src.buffer = noise;
    const bp = ac.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = 1.4;
    bp.frequency.setValueAtTime(f0, t); bp.frequency.exponentialRampToValueAtTime(f1, t + dur * 0.55); bp.frequency.exponentialRampToValueAtTime(f0 * 1.5, t + dur);
    const g = ac.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.12 * k, t + dur * 0.35); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    let tail = g;
    if (ac.createStereoPanner) { const p = ac.createStereoPanner(); p.pan.setValueAtTime(from, t); p.pan.linearRampToValueAtTime(to, t + dur); g.connect(p); tail = p; }
    tail.connect(out); const s = ac.createGain(); s.gain.value = 0.25; tail.connect(s).connect(wet);
    src.connect(bp).connect(g); src.start(t, Math.random() * 0.4); src.stop(t + dur + 0.05);
  }

  const S = {
    tick(pan) { tone(3200, ac.currentTime, 0.03, 0.012, "triangle", pan); },
    harp(i, pan) { bell(note(10 + i), ac.currentTime, { vol: 0.03, dur: 0.5, index: 0.8, ratio: 2, pan, send: 0.5 }); },
    click(pan) { // generative melody: random walk on the pentatonic scale
      step += [-2, -1, 1, 1, 2][Math.floor(Math.random() * 5)]; if (step < 5) step = 7; if (step > 13) step = 10;
      bell(note(step), ac.currentTime, { pan }); },
    sparkle(pan) { const t = ac.currentTime; [10, 12, 13, 15].forEach((n, k) => bell(note(n), t + k * 0.06, { vol: 0.05, dur: 0.8, pan })); },
    whoosh(k, pan) { const t = ac.currentTime; swoosh(t, k || 1, -(pan || 0.6), pan || 0.6, dir > 0 ? 300 : 2200, dir > 0 ? 2600 : 400, 0.5); },
    tap() { tone(1800 + Math.random() * 500, ac.currentTime, 0.025, 0.012, "triangle", (Math.random() - 0.5) * 0.4); },
    success() { const t = ac.currentTime; [5, 7, 8, 10, 12].forEach((n, k) => bell(note(n), t + k * 0.08, { vol: 0.06, dur: 1.2 })); },
    jingle() { const t = ac.currentTime; [5, 7, 8, 10].forEach((n, k) => bell(note(n), t + k * 0.09, { vol: 0.055, dur: 1 })); },
    // section signatures
    services() { const t = ac.currentTime; swoosh(t, 0.7, -0.6, 0.6, 300, 2400, 0.5); bell(note(10), t + 0.25, { vol: 0.04 }); },
    portfolio() { const t = ac.currentTime; swoosh(t, 0.9, 0.7, -0.7, 2400, 250, 0.7);
      tone(110, t + 0.25, 0.9, 0.16, "sine", 0, 0.2, 42);   // sub drop
      [15, 17, 18].forEach((n, k) => bell(note(n), t + 0.3 + k * 0.07, { vol: 0.025, dur: 1.2, send: 0.9 })); },
    process() { const t = ac.currentTime; [7, 8, 10].forEach((n, k) => bell(note(n), t + k * 0.14, { vol: 0.05, pan: -0.5 + k * 0.5 })); },
    team() { const t = ac.currentTime; [0, 1, 2, 3].forEach((k) => tone(420 + k * 120, t + 0.15 + k * 0.11, 0.12, 0.05, "sine", -0.6 + k * 0.4, 0.3, 900 + k * 200)); },
    stats() { const t = ac.currentTime; let tt = 0; for (let k = 0; k < 12; k++) { tt += 0.03 + k * k * 0.0016; tone(2600, t + tt, 0.02, 0.012, "square", 0); } bell(note(12), t + tt + 0.05, { vol: 0.045 }); },
    awards() { const t = ac.currentTime; [5, 8, 10, 12].forEach((n) => bell(note(n), t, { vol: 0.03, dur: 1.6, ratio: 2.76, index: 1.4 })); },
    contact() { const t = ac.currentTime; [0, 2, 3, 5].forEach((n, k) => tone(note(n) / 2, t + k * 0.04, 1.6, 0.03, "triangle", -0.4 + k * 0.27, 0.8)); },
  };
  const play = (n, ...a) => { if (ready()) { try { S[n](...a); } catch (_) {} } };
  const buzz = (ms) => { if (on && !fine && navigator.vibrate) try { navigator.vibrate(ms); } catch (_) {} };

  const unlock = () => { if (on) ctx(); };
  addEventListener("pointerdown", unlock, { capture: true, passive: true });
  addEventListener("keydown", unlock, { capture: true });

  // clicks
  const CTA = /^(start a project|contact us|contact|send|submit|explore services|let'?s talk|get started)/i;
  addEventListener("click", (e) => {
    const t = e.target; if (!t.closest || t.closest("#ib-snd")) return;
    const pan = panOf(e.clientX || innerWidth / 2);
    if (t.closest(".ibd-tabs button,.ibd-btn,.framer-5y3nqz,[data-framer-name*='Arrow']")) { buzz(8); return play("whoosh", 0.8, pan || 0.6); }
    if (t.closest(".ibd-ch [data-d]")) return; // portfolio arrows: the slide itself whooshes (below)
    const el = t.closest("a,button,[role=button]"); if (!el) return;
    buzz(6);
    if (el.matches("button[type=submit]")) return play("success");
    play(CTA.test((el.textContent || "").trim()) ? "sparkle" : "click", pan);
  }, true);

  // hover: nav items play harp notes by position, other controls a soft tick
  if (fine) {
    let cur = null, last = 0;
    addEventListener("pointerover", (e) => {
      const el = e.target.closest && e.target.closest("a,button,[role=button]");
      if (!el || el === cur || el.id === "ib-snd") return; cur = el;
      const now = performance.now(); if (now - last < 60) return; last = now;
      const r = el.getBoundingClientRect(), pan = panOf(r.left + r.width / 2);
      if (r.top < 120 && r.height < 80) { const nav = [...document.querySelectorAll("a")].filter((a) => { const q = a.getBoundingClientRect(); return q.top < 120 && q.height < 80 && q.width > 0; }); return play("harp", Math.max(0, nav.indexOf(el)), pan); }
      play("tick", pan);
    }, { passive: true });
    addEventListener("pointerout", (e) => { if (cur && !cur.contains(e.relatedTarget)) cur = null; }, { passive: true });
  }

  // typing in the contact form
  let lastTap = 0;
  addEventListener("keydown", (e) => {
    if (!e.target.matches || !e.target.matches("input,textarea") || e.key.length > 1 && e.key !== "Backspace") return;
    const now = performance.now(); if (now - lastTap < 35) return; lastTap = now; play("tap");
  }, true);

  // section signatures, the first time each one scrolls into view
  let userScrolled = false, lastSig = 0;
  addEventListener("scroll", () => { userScrolled = true; const y = scrollY; if (Math.abs(y - lastScrollY) > 4) dir = y > lastScrollY ? 1 : -1; lastScrollY = y; }, { passive: true });
  const SIG = [["#about", "whoosh"], ["#services", "services"], ["#works", "whoosh"], ["#ib-demos", "portfolio"], [".framer-1tflpem", "process"],
    ['[data-framer-name="Team Members"]', "team"], ['[data-framer-name="Statistics"]', "stats"], ['[data-framer-name="Awards"]', "awards"], ["#contact", "contact"]];
  const seen = new WeakSet();
  const io = new IntersectionObserver((es) => es.forEach((en) => {
    if (!en.isIntersecting || seen.has(en.target) || !userScrolled) return;
    seen.add(en.target);
    const now = performance.now(); if (now - lastSig < 550) return; lastSig = now;
    play(en.target.dataset.ibSnd, 0.55);
  }), { threshold: 0.2 });
  const watch = () => SIG.forEach(([sel, n]) => { const el = document.querySelector(sel); if (el && !el.dataset.ibSnd) { el.dataset.ibSnd = n; io.observe(el); } });
  setInterval(watch, 2000); watch();

  // portfolio sliding: whoosh when a row starts to slide (drag, swipe, arrows or the pinned scroll), and again for
  // every further card if it keeps going; a row is "at rest" again after 220 ms without movement
  const slid = new WeakMap(); let lastSlide = 0;
  function slideCheck() {
    if (!ready()) return;
    document.querySelectorAll("#ib-demos .ibd-track").forEach((tr) => {
      const m = /translate3d\((-?[\d.]+)px/.exec(tr.style.transform || ""), pos = tr.scrollLeft - (m ? +m[1] : 0);
      let st = slid.get(tr); if (!st) slid.set(tr, (st = { rest: 0, fired: null, t: 0 })); // every row starts at 0
      clearTimeout(st.t); st.t = setTimeout(() => { st.rest = pos; st.fired = null; }, 220);
      const card = tr.querySelector(".ibd-card"), w = card ? card.offsetWidth : 300;
      const ref = st.fired == null ? st.rest : st.fired, d = pos - ref;
      if (Math.abs(d) < (st.fired == null ? 40 : w)) return;
      st.fired = pos;
      const now = performance.now(); if (now - lastSlide < 260) return; lastSlide = now;
      const k = d > 0 ? 1 : -1;
      swoosh(ac.currentTime, 0.75, -0.6 * k, 0.6 * k, k > 0 ? 350 : 2000, k > 0 ? 2400 : 450, 0.42);
    });
  }
  addEventListener("scroll", slideCheck, { passive: true, capture: true }); // capture also catches the rows' own sideways scroll

  // floating toggle + one-time hint
  const b = document.createElement("button");
  b.id = "ib-snd"; b.type = "button";
  b.innerHTML = '<span></span><span></span><span></span><span></span><i>Sound on &middot; tap to mute</i>';
  const sync = () => { b.classList.toggle("off", !on); b.setAttribute("aria-label", on ? "Mute site sounds" : "Turn on site sounds"); b.title = on ? "Sound on" : "Sound off"; };
  b.addEventListener("click", () => {
    on = !on; try { localStorage.setItem(KEY, on ? "on" : "off"); } catch (_) {}
    b.classList.remove("hint"); sync(); if (on) { ctx(); setTimeout(() => play("jingle"), 30); }
  });
  sync();
  const add = () => document.body && !document.getElementById("ib-snd") && document.body.appendChild(b);
  add(); addEventListener("DOMContentLoaded", add); setInterval(add, 3000);
  try { if (!localStorage.getItem(KEY + "-hint") && on) { localStorage.setItem(KEY + "-hint", 1); setTimeout(() => b.classList.add("hint"), 2500); setTimeout(() => b.classList.remove("hint"), 7500); } } catch (_) {}
})();
