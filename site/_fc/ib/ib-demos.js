/* Intellobyte "Product Demos" section: replaces the template Testimonials block.
   Three chapters (Software -> Apps -> Websites). The panel pins while the visitor scrolls down and
   each chapter's cards travel right -> left. Edit CHAPTERS to change content; paste YouTube links
   into the `yt` fields (full URL or just the video id). */
(() => {
  const CHAPTERS = [
    {
      key: "software", label: "Software", blurb: "Business software, dashboards and automation built around your real workflow.",
      items: [
        { title: "Live Trading Competition Platform", desc: "100+ traders, real-time leaderboard and live trading.", tags: ["Real-Time", "FinTech"], yt: "https://youtu.be/CrX_5GviXnE" }, // PASTE YOUTUBE LINK in yt
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
  let raf = 0;
  function update() {
    raf = 0;
    const s = document.getElementById("ib-demos");
    if (!s) return;
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
        if (s.classList.contains("ibd-static")) s.querySelectorAll(".ibd-ch")[i].scrollIntoView({ behavior: "smooth", block: "start" });
        else scrollTo({ top: top + total * ((i + (i ? 0.16 : 0.04)) / 3), behavior: "smooth" });
      }
    });
    size();
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
  const FOUNDERS = [{ name: "Kunal Manjare", role: "CEO", img: null }, { name: "Pranav Patil", role: "CTO", img: "/_fc/ib/assets/pranav-founder-v4.webp" }];
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

  // Services accordion: animate the real card height (Framer's own layout animation was removed in inject-demos.mjs)
  (function accordion() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const SEL = '[class*="framer-rmIXD"][data-framer-name]';
    let snap = new Map();
    const take = () => { snap = new Map([...document.querySelectorAll(SEL)].map((c) => [c, c.getBoundingClientRect().height])); };
    document.addEventListener("pointerdown", (e) => { if (e.target.closest && e.target.closest(SEL)) take(); }, true);
    new MutationObserver((ms) => {
      if (!snap.size) return;
      const ch = new Set(ms.map((m) => m.target).filter((n) => n.matches && n.matches(SEL)));
      if (!ch.size) return;
      const before = snap; snap = new Map();
      ch.forEach((c) => {
        const h0 = before.get(c), h1 = c.getBoundingClientRect().height;
        if (h0 == null || Math.abs(h0 - h1) < 2) return;
        c.classList.add("ibacc");
        const a = c.animate([{ height: h0 + "px" }, { height: h1 + "px" }], { duration: h1 > h0 ? 780 : 520, easing: "cubic-bezier(.22,1,.36,1)" });
        a.onfinish = a.oncancel = () => c.classList.remove("ibacc");
        if (h1 > h0) [...c.children].forEach((k) => k.animate([{ opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "none" }], { duration: 560, delay: 170, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" }));
      });
    }).observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ["data-framer-name"] });
  })();

  function mount() {
    const t = document.querySelector('[data-framer-name="Testimonials"]');
    const f = document.querySelector('[data-framer-name="Featured Works"]');
    if (f) patchFeatured(f);
    document.querySelectorAll('[data-framer-name="Key Points"]').forEach((kp) => { // tablet/mobile variants render some pills twice
      const seen = new Set();
      [...kp.querySelectorAll('[data-framer-name^="key pt"]')].forEach((e) => { const v = e.textContent.trim(); if (!v) return; if (seen.has(v)) e.style.display = "none"; else seen.add(v); });
    });
    patchQuote();
    if (!t || !f) return;
    if (!t.hasAttribute("data-ib-hidden")) t.setAttribute("data-ib-hidden", ""); // React may re-render the block
    if (document.getElementById("ib-demos")) return;
    const s = build();
    f.insertAdjacentElement("afterend", s); // right after the single featured project
    init(s);
  }
  let mq = 0;
  new MutationObserver(() => { if (!mq) mq = requestAnimationFrame(() => { mq = 0; mount(); }); }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-framer-name"] });
  setInterval(mount, 600); // safety net: Framer hydrates after this script runs
  addEventListener("scroll", tick, { passive: true });
  addEventListener("resize", size);
  addEventListener("load", size);
  reduce.addEventListener && reduce.addEventListener("change", size);
  mount();
})();
