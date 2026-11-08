import Link from "next/link";
import Nav from "@/components/Nav";
import JsonLd from "@/components/JsonLd";
import { Reveal } from "@/components/Motion";
import { Footer, Process, Head } from "@/components/Sections";
import { SERVICES } from "@/lib/content";
import { servicesPage, breadcrumbs } from "@/lib/schema";

export const metadata = {
  title: "Software, Web & App Development Services",
  description: "Custom software, web development, UI/UX and mobile apps, and AI & automation from Intellobyte in Pune, India. Fast, secure and built around your business.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services", title: "Intellobyte Services: Software, Web, Mobile and AI", description: "Custom software, web development, UI/UX and mobile apps, and AI & automation." },
};

export default function Services() {
  return (
    <>
      <Nav dark={false} />
      <main id="main">
        <div className="wrap page-h">
          <p className="crumbs"><Link href="/">Home</Link> / Services</p>
          <Head h="h1" tag="Services" title="End-to-End Tech Solutions" text="Strategy, design and engineering under one roof. Intellobyte builds the software, websites, apps and automation your business needs." />
        </div>
        <div className="wrap">
          {SERVICES.map((s) => (
            <Reveal key={s.slug} className="svc-row" id={s.slug}>
              <div><h2>{s.title}</h2></div>
              <div><p className="lead">{s.detail}</p><ul>{s.points.map((p) => <li key={p}>{p}</li>)}</ul></div>
            </Reveal>
          ))}
        </div>
        <Process />
        <section><div className="wrap"><Reveal className="cta">
          <h2>Have a project in mind?</h2><p>Tell us what you want to build and we’ll reply with a plan, timeline and cost range.</p>
          <Link href="/#contact" className="btn btn-w">Start a Project</Link>
        </Reveal></div></section>
      </main>
      <Footer />
      <JsonLd data={servicesPage} />
      <JsonLd data={breadcrumbs([["Home", "/"], ["Services", "/services"]])} />
    </>
  );
}
