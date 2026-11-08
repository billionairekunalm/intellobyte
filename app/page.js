import Nav from "@/components/Nav";
import JsonLd from "@/components/JsonLd";
import { Hero, Marquee, About, Services, Works, Process, Benefits, Features, Tools, Team, Testimonial, FaqSection, Contact, Footer } from "@/components/Sections";
import { faqPage } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Works />
        <Process />
        <Benefits />
        <Features />
        <Tools />
        <Team />
        <Testimonial />
        <FaqSection />
        <Contact />
      </main>
      <Footer />
      <JsonLd data={faqPage} />
    </>
  );
}
