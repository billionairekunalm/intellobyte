import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import JsonLd from "@/components/JsonLd";
import { Reveal } from "@/components/Motion";
import { Footer, WorkCard } from "@/components/Sections";
import { WORKS } from "@/lib/content";
import { workSchema, breadcrumbs } from "@/lib/schema";

export const dynamicParams = false;
export const generateStaticParams = () => WORKS.map((w) => ({ slug: w.slug }));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const w = WORKS.find((x) => x.slug === slug);
  if (!w) return {};
  const title = `${w.title}: ${w.industry} website case study`;
  return {
    title, description: w.overview, alternates: { canonical: `/work/${w.slug}` },
    openGraph: { url: `/work/${w.slug}`, title, description: w.overview, ...(w.image ? { images: [{ url: w.image }] } : {}) },
  };
}

export default async function Work({ params }) {
  const { slug } = await params;
  const w = WORKS.find((x) => x.slug === slug);
  if (!w) notFound();
  const others = WORKS.filter((x) => x.slug !== w.slug);
  return (
    <>
      <Nav dark={false} />
      <main id="main">
        <article className="wrap page-h">
          <p className="crumbs"><Link href="/">Home</Link> / <Link href="/#works">Works</Link> / {w.title}</p>
          <Reveal><h1 className="h2">{w.title}</h1></Reveal>
          <p className="lead" style={{ marginTop: 14 }}>{w.summary}</p>
          <div className="work-hero" style={w.image ? undefined : { background: w.gradient, display: "grid", placeItems: "center", color: "#fff", font: "700 clamp(32px,6vw,72px) var(--font-urbanist)" }}>
            {w.image ? <Image src={w.image} alt={`${w.title} website screenshot`} width={1400} height={700} priority sizes="(max-width:1240px) 100vw, 1160px" /> : <span>{w.title}</span>}
          </div>
          <div className="facts">
            <div><small>CLIENT</small>{w.client}</div>
            <div><small>INDUSTRY</small>{w.industry}</div>
            <div><small>DELIVERABLES</small>{w.deliverables}</div>
          </div>
          <h2 style={{ fontSize: 32, margin: "40px 0 12px" }}>Overview</h2>
          <p className="lead" style={{ maxWidth: 760 }}>{w.overview}</p>
        </article>
        <section><div className="wrap">
          <h2 className="h2" style={{ marginBottom: 28 }}>More work</h2>
          <div className="works">{others.map((o, i) => <WorkCard key={o.slug} w={o} i={i} />)}</div>
        </div></section>
        <section><div className="wrap"><div className="cta">
          <h2>Want a result like this?</h2><p>Tell us about your project and we’ll reply with a plan, timeline and cost range.</p>
          <Link href="/#contact" className="btn btn-w">Start a Project</Link>
        </div></div></section>
      </main>
      <Footer />
      <JsonLd data={workSchema(w)} />
      <JsonLd data={breadcrumbs([["Home", "/"], ["Works", "/#works"], [w.title, `/work/${w.slug}`]])} />
    </>
  );
}
