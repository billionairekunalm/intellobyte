import Link from "next/link";
import Image from "next/image";
import { Reveal, Counter } from "./Motion";
import { ServicesAccordion, Faq, ContactForm } from "./Interactive";
import { SITE, WORKS, PROCESS, BENEFITS, FEATURES, TOOLS, STACK, TEAM, TESTIMONIAL, FAQS } from "@/lib/content";

export const Head = ({ tag, title, text, center, h = "h2" }) => {
  const H = h;
  return (
    <Reveal className={`head ${center ? "c" : ""}`}>
      {tag && <span className="pill"><i />{tag}</span>}
      <H className="h2">{title}</H>
      {text && <p className="lead">{text}</p>}
    </Reveal>
  );
};

export function Hero() {
  const f = [["react", "f1"], ["python", "f2"], ["git", "f3"], ["sql", "f4"], ["js", "f5"]];
  return (
    <section className="hero" aria-label="Intro">
      <Image className="hero-bg" src="/img/hero.webp" alt="" fill priority sizes="100vw" />
      {f.map(([n, c]) => <Image key={n} className={`float ${c}`} src={`/img/${n}.webp`} alt="" width={84} height={84} />)}
      <div className="hero-c">
        <Reveal y={16}><span className="pill"><i />Intellobyte Tech Solution</span></Reveal>
        <Reveal delay={0.1} as="h1">Your Technology Growth Partner</Reveal>
        <Reveal delay={0.2} as="p">We build software apps and websites that industry needs, from discovery to deployment, engineered around your business.</Reveal>
        <Reveal delay={0.3} className="hero-btns">
          <Link href="/services" className="btn btn-w">Explore Services</Link>
          <Link href="/#contact" className="btn btn-p">Contact Us</Link>
        </Reveal>
      </div>
      <div className="scroll" aria-hidden="true">Scroll for more</div>
    </section>
  );
}

export function Marquee() {
  const row = [...STACK, ...STACK];
  return (
    <div className="marq" aria-label="Technologies we work with"><div className="marq-t" aria-hidden="true">{row.map((s, i) => <span key={i}>{s}</span>)}</div>
      <p className="sr" style={{ position: "absolute", left: -9999 }}>{STACK.join(", ")}</p></div>
  );
}

export function About() {
  return (
    <section id="about"><div className="wrap">
      <div className="about">
        <Reveal className="card">
          <span className="pill"><i />About Us</span>
          <h2 className="h2" style={{ marginTop: 18 }}>Engineering Software That Industry Needs</h2>
          <p className="lead">Intellobyte Tech Solution is a software and web development company in Pune, India. We build software apps and websites for brands across industries, from idea to production, fast.</p>
          <div className="meta">
            <span className="pill live"><i />Available for Projects Worldwide</span>
            <span className="pill">Based in {SITE.city}, India</span>
          </div>
          <Link href="/#contact" className="btn btn-p">Start a Project</Link>
          <div className="stats">
            <div><b><Counter to={50} suffix="+" /></b><small>Brands served</small></div>
            <div><b>4</b><small>Industries</small></div>
            <div><b>1-4 wk</b><small>Idea to v1</small></div>
          </div>
        </Reveal>
        <Reveal className="quote" delay={0.12}>
          <div className="stat" aria-hidden="true"><Counter to={50} suffix="+" /></div>
          <Image className="ph" src="/img/ceo-card.webp" alt="Kunal Manjare, CEO of Intellobyte" width={150} height={234} />
          <q>We make good projects in efficient prices.</q>
          <p className="who"><b>Kunal Manjare</b> · CEO</p>
        </Reveal>
      </div>
    </div></section>
  );
}

export function Services() {
  return (
    <section id="services"><div className="wrap">
      <Head tag="Services" title="End-to-End Tech Solutions" text="Strategy, design and engineering under one roof, building software that industry actually needs." />
      <ServicesAccordion />
      <Reveal style={{ marginTop: 28 }}><Link href="/services" className="btn btn-w">All services</Link></Reveal>
    </div></section>
  );
}

export function WorkCard({ w, i = 0 }) {
  return (
    <Reveal delay={i * 0.05}>
      <Link href={`/work/${w.slug}`} className="work" aria-label={`${w.title} case study`}>
        <div className={`work-img ${w.image ? "" : "g"}`} style={w.image ? undefined : { background: w.gradient }}>
          {w.image ? <Image src={w.image} alt={`${w.title} website screenshot`} width={1400} height={700} sizes="(max-width:900px) 100vw, 1160px" /> : <span>{w.title}</span>}
        </div>
        <div className="work-m">
          <h3>{w.title}</h3>
          <div><small>DESCRIPTION</small>{w.summary}</div>
          <div><small>DELIVERABLES</small>{w.deliverables}</div>
          <div><small>INDUSTRY</small>{w.industry}</div>
        </div>
      </Link>
    </Reveal>
  );
}

export function Works() {
  return (
    <section id="works"><div className="wrap">
      <Head tag="Featured Works" title="Featured Works" text="Websites and platforms we have designed and built for clients across education, aerospace, healthcare and AI." />
      <div className="works">{WORKS.map((w, i) => <WorkCard key={w.slug} w={w} i={i} />)}</div>
    </div></section>
  );
}

export function Process() {
  return (
    <section id="process"><div className="wrap">
      <Head tag="Process" title="From Idea to Production" />
      <div className="proc">
        {PROCESS.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.1} className="step">
            <div className="n" aria-hidden="true">{p.n}</div><em>{p.time.toUpperCase()}</em>
            <h3 style={{ fontSize: 26 }}>{p.title}</h3><p>{p.text}</p>
          </Reveal>
        ))}
      </div>
    </div></section>
  );
}

export function Benefits() {
  return (
    <section><div className="wrap">
      <Head tag="Benefits" title="Why Choose Us" />
      <div className="grid4">
        {BENEFITS.map((b, i) => (
          <Reveal key={b.title} delay={i * 0.07} className="card ben"><span className="tag">{b.tag}</span><h3>{b.title}</h3><p>{b.text}</p></Reveal>
        ))}
      </div>
    </div></section>
  );
}

export function Features() {
  return (
    <section><div className="wrap">
      <Head tag="Features" title="All Features in One" />
      <div className="grid3">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title + i} delay={(i % 3) * 0.07} className="card feat"><div className="ico" aria-hidden="true">{i + 1}</div><h3>{f.title}</h3><p>{f.text}</p></Reveal>
        ))}
      </div>
    </div></section>
  );
}

export function Tools() {
  return (
    <section><div className="wrap"><div className="tools">
      <Reveal>
        <span className="pill"><i />Tools</span>
        <h2 className="h2" style={{ margin: "16px 0" }}>We work with powerful dev tools</h2>
        <p className="lead">We design, build, and optimize modern web experiences with scalable architecture, responsive interfaces, and secure technologies, so your website is fast, reliable, and built to perform.</p>
        <div className="chips">{STACK.map((s) => <span key={s}>{s}</span>)}</div>
        <Link href="/#contact" className="btn btn-p">Get Started</Link>
      </Reveal>
      <div className="orb">{TOOLS.map((t, i) => <Reveal key={t.name} delay={i * 0.08} y={20}><div><Image src={t.img} alt={t.name} width={52} height={52} /></div></Reveal>)}</div>
    </div></div></section>
  );
}

export function Team() {
  return (
    <section id="team"><div className="wrap">
      <Head tag="Team Members" title="The Squad Shipping Your Product" />
      <div className="team">
        {TEAM.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.07} className={`tm ${m.big ? "" : "small"}`}>
            <Image src={m.img} alt={`${m.name}, ${m.role} at Intellobyte`} width={336} height={336} sizes="(max-width:560px) 90vw, 560px" />
            <div><h3>{m.name}</h3><p>{m.role}</p></div>
          </Reveal>
        ))}
      </div>
    </div></section>
  );
}

export function Testimonial() {
  return (
    <section><div className="wrap">
      <Reveal className="testi">
        <span className="pill" style={{ color: "#09090b" }}><i />Testimonials</span>
        <blockquote>{TESTIMONIAL.quote}</blockquote>
        <p><b>{TESTIMONIAL.name}</b><br /><span style={{ opacity: 0.65 }}>{TESTIMONIAL.role}</span></p>
      </Reveal>
    </div></section>
  );
}

export function FaqSection() {
  return (
    <section id="faq"><div className="wrap">
      <Head center tag="FAQs" title="Frequently Asked Questions" />
      <Faq items={FAQS} />
    </div></section>
  );
}

export function Contact() {
  return (
    <section id="contact"><div className="wrap">
      <Head tag="Contact" title="Let’s Build Intelligent Things" />
      <div className="contact">
        <Reveal className="cinfo card">
          <div><small>E-mail address</small><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
          <div><small>Phone number</small><a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a></div>
          <div><small>Location</small><span style={{ font: "600 22px var(--font-urbanist)" }}>{SITE.city}, India</span></div>
          <div><small>Social</small><span className="chips" style={{ margin: 0 }}>{SITE.socials.map((s) => <a key={s.name} href={s.href} target="_blank" rel="noopener me" style={{ font: "500 14px var(--font-inter)", background: "#f4f4f5", borderRadius: 999, padding: "6px 14px" }}>{s.name}</a>)}</span></div>
        </Reveal>
        <Reveal delay={0.1}><ContactForm /></Reveal>
      </div>
    </div></section>
  );
}

export function Footer() {
  return (
    <footer className="foot"><div className="wrap">
      <div className="foot-g">
        <div><div className="logo"><Image src="/img/logo-white.png" alt="" width={30} height={30} />Intellobyte</div>
          <p style={{ opacity: 0.7, marginTop: 12, maxWidth: 340 }}>Intellobyte Tech Solution builds software apps and websites that industry needs. Pune, India.</p></div>
        <div><h4>Pages</h4><ul><li><Link href="/#about">About</Link></li><li><Link href="/services">Services</Link></li><li><Link href="/#works">Works</Link></li><li><Link href="/#faq">FAQ</Link></li></ul></div>
        <div><h4>Connect</h4><ul>{SITE.socials.map((s) => <li key={s.name}><a href={s.href} target="_blank" rel="noopener me">{s.name}</a></li>)}<li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li></ul></div>
      </div>
      <div className="foot-big" aria-hidden="true">INTELLOBYTE</div>
      <div className="foot-b"><span>© {new Date().getFullYear()} Intellobyte. All Rights Reserved.</span><span>Pune, India</span></div>
    </div></footer>
  );
}
