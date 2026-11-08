"use client";
import { useState } from "react";
import { Collapse } from "./Motion";
import { SITE, SERVICES } from "@/lib/content";

export function ServicesAccordion() {
  const [open, setOpen] = useState(0);
  const active = SERVICES[open];
  return (
    <div className="svc">
      <div className="acc">
        {SERVICES.map((s, i) => (
          <div key={s.slug} className={`acc-i ${open === i ? "open" : ""}`}>
            <h3 style={{ font: "inherit" }}>
              <button aria-expanded={open === i} aria-controls={`svc-${i}`} onClick={() => setOpen(open === i ? -1 : i)}
                onMouseEnter={() => window.matchMedia("(hover:hover)").matches && setOpen(i)}>
                <span>{s.title}</span><span className="num">({String(i + 1).padStart(2, "0")})</span>
              </button>
            </h3>
            <Collapse open={open === i}>
              <div className="acc-b" id={`svc-${i}`}>
                <p>{s.blurb}</p>
                <ul>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            </Collapse>
          </div>
        ))}
      </div>
      <div className="svc-media" aria-hidden="true">
        <span className="big">{String((open < 0 ? 0 : open) + 1).padStart(2, "0")}</span>
        <p>{(active ?? SERVICES[0]).title}</p>
      </div>
    </div>
  );
}

export function Faq({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq">
      {items.map((f, i) => (
        <div key={f.q} className={`faq-i ${open === i ? "open" : ""}`}>
          <h3 style={{ font: "inherit" }}>
            <button aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
              {f.q}<span className="pm" aria-hidden="true">+</span>
            </button>
          </h3>
          <Collapse open={open === i}><p className="faq-a" id={`faq-${i}`}>{f.a}</p></Collapse>
        </div>
      ))}
    </div>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  // No backend: the form composes an email to info@intellobyte.com in the visitor's mail app.
  function submit(e) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget));
    const body = `Name: ${d.name}\nEmail: ${d.email}\nInterested in: ${d.topic}\n\n${d.message || ""}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("Project enquiry from " + d.name)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }
  return (
    <form className="card" onSubmit={submit}>
      <label>Your Name<input name="name" required autoComplete="name" placeholder="Jane Doe" /></label>
      <label>Email<input name="email" type="email" required autoComplete="email" placeholder="you@company.com" /></label>
      <label>You are interested in
        <select name="topic" defaultValue="Custom Software">
          <option>Custom Software</option><option>Web Development</option><option>UI/UX & Mobile Apps</option><option>AI & Automation</option>
        </select>
      </label>
      <label>More About The Project<textarea name="message" placeholder="Tell us what you want to build" /></label>
      <button className="btn btn-p" type="submit">Submit Message</button>
      <p className="note" role="status">{sent ? "Your email app should open with the message ready to send. Prefer to write directly? " : "This opens your email app with your message ready to send to "}<a href={`mailto:${SITE.email}`}><u>{SITE.email}</u></a>.</p>
    </form>
  );
}
