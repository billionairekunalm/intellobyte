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
        { title: "Software Demo 03", desc: "Dashboards and reporting.", tags: ["Business Systems"], yt: "" },
      ],
    },
    {
      key: "apps", label: "Apps", blurb: "Mobile and web apps with interfaces people understand at a glance.",
      items: [
        { title: "Everlush", desc: "Poultry trading app: book live birds and eggs from farms at today's rate.", tags: ["Mobile App", "Marketplace"], yt: "https://youtu.be/Xe-s9ysFaYo" },
        { title: "App Demo 02", desc: "UI/UX and prototype tour.", tags: ["UI/UX"], yt: "" },
        { title: "App Demo 03", desc: "Cross-platform app demo.", tags: ["iOS & Android"], yt: "" },
      ],
    },
    {
      key: "websites", label: "Websites", blurb: "Fast, modern websites we designed and shipped for clients across industries.",
      items: [
        { title: "DYP Incubation Centre", desc: "Platform for an incubator and education program.", tags: ["Education"], yt: "", img: "assets/work-dyp.webp" },
        { title: "RamaAstra", desc: "Website for an aerospace venture.", tags: ["Aerospace"], yt: "", img: "assets/work-ramaastra.webp" },
        { title: "Chhaya Dental Care", desc: "Healthcare website for a dental clinic.", tags: ["Healthcare"], yt: "" },
        { title: "Elviko AI", desc: "Website for an AI company.", tags: ["AI"], yt: "" },
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
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");

  function card(ch, it, i) {
    const id = ytId(it.yt);
    const bg = id ? `<img class="ibd-img" loading="lazy" alt="" src="https://i.ytimg.com/vi/${id}/hqdefault.jpg">`
      : it.img ? `<img class="ibd-img" loading="lazy" alt="" src="${BASE}${esc(it.img)}">` : "";
    const soon = id ? "" : '<span class="ibd-soon">Demo coming soon</span>';
    return `<li class="ibd-card" data-k="${ch.key}">
      <button type="button" class="ibd-btn" ${id ? `data-yt="${id}"` : 'aria-disabled="true"'} aria-label="${id ? "Play demo: " : ""}${esc(it.title)}${id ? "" : " (demo coming soon)"}">
        <span class="ibd-poster">
          <span class="ibd-glyph" aria-hidden="true">${ICONS[ch.key]}</span>
          <span class="ibd-num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
          ${bg}${soon}
          <span class="ibd-play" aria-hidden="true">${PLAY}</span>
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
    s.setAttribute("aria-label", "Product demos: software, apps and websites");
    s.innerHTML = `
      <div class="ibd-pin">
        <div class="ibd-glow" aria-hidden="true"></div><div class="ibd-grid" aria-hidden="true"></div>
        <div class="ibd-top">
          <div><span class="ibd-pill"><i></i>Product Demos</span><h2 class="ibd-h">See what we build</h2></div>
          <nav class="ibd-tabs" aria-label="Demo categories">${CHAPTERS.map((c, i) => `<button type="button" data-i="${i}"><b>0${i + 1}</b>${c.label}</button>`).join("")}</nav>
        </div>
        <div class="ibd-stage">
          ${CHAPTERS.map((c, i) => `
          <div class="ibd-ch" data-i="${i}">
            <div class="ibd-chead"><span class="ibd-big" aria-hidden="true">0${i + 1}</span><div><h3>${c.label}</h3><p>${esc(c.blurb)}</p></div></div>
            <ul class="ibd-track">${c.items.map((it, j) => card(c, it, j)).join("")}</ul>
          </div>`).join("")}
        </div>
        <div class="ibd-foot"><span class="ibd-count"><b>01</b> / 03</span><span class="ibd-bar"><i></i></span><span class="ibd-hint">Scroll</span></div>
      </div>`;
    return s;
  }

  // ---- lightbox -------------------------------------------------------------------------
  let lastFocus = null;
  function openVideo(id, btn) {
    lastFocus = btn;
    const o = document.createElement("div");
    o.className = "ibd-lb"; o.setAttribute("role", "dialog"); o.setAttribute("aria-modal", "true"); o.setAttribute("aria-label", "Demo video");
    o.innerHTML = `<button type="button" class="ibd-x" aria-label="Close video">&times;</button>
      <div class="ibd-frame"><iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1" title="Demo video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`;
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
    if (!s || s.classList.contains("ibd-static")) return;
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
    const small = innerWidth < 700;
    s.classList.toggle("ibd-static", reduce.matches);
    s.style.height = reduce.matches ? "auto" : Math.round(innerHeight * (small ? 4.4 : 4.8)) + "px";
    tick();
  }

  function init(s) {
    s.addEventListener("click", (e) => {
      const b = e.target.closest(".ibd-btn");
      if (b && b.dataset.yt) return openVideo(b.dataset.yt, b);
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
  function mount() {
    const t = document.querySelector('[data-framer-name="Testimonials"]');
    const f = document.querySelector('[data-framer-name="Featured Works"]');
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
  reduce.addEventListener && reduce.addEventListener("change", size);
  mount();
})();
