import { SITE, SERVICES, TEAM, WORKS, FAQS, url } from "./content";

const orgId = url("/#organization");

export const organization = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": orgId,
      name: SITE.name,
      legalName: SITE.legalName,
      alternateName: ["Intellobyte Tech Solution", "IntelloByte"],
      url: url("/"),
      logo: { "@type": "ImageObject", url: url("/img/logo.png"), width: 256, height: 256 },
      image: url("/img/og.png"),
      description: SITE.description,
      slogan: "We build software apps and websites that industry needs",
      email: SITE.email,
      telephone: SITE.phoneRaw,
      address: { "@type": "PostalAddress", addressLocality: SITE.city, addressRegion: SITE.region, addressCountry: SITE.country },
      areaServed: "Worldwide",
      priceRange: "$$",
      sameAs: SITE.socials.map((s) => s.href),
      founder: { "@type": "Person", name: "Kunal Manjare", jobTitle: "CEO" },
      employee: TEAM.map((m) => ({ "@type": "Person", name: m.name, jobTitle: m.role })),
      knowsAbout: ["Custom software development", "Web development", "Next.js", "React", "UI/UX design", "Mobile app development", "AI automation", "Chatbots", "Workflow automation"],
      contactPoint: { "@type": "ContactPoint", contactType: "sales", email: SITE.email, telephone: SITE.phoneRaw, availableLanguage: ["English", "Hindi"] },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Software and web development services",
        itemListElement: SERVICES.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.blurb, url: url("/services#" + s.slug) } })),
      },
    },
    {
      "@type": "WebSite",
      "@id": url("/#website"),
      url: url("/"),
      name: SITE.name,
      description: SITE.description,
      publisher: { "@id": orgId },
      inLanguage: "en",
    },
  ],
};

export const faqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export const servicesPage = {
  "@context": "https://schema.org",
  "@graph": SERVICES.map((s) => ({
    "@type": "Service",
    "@id": url("/services#" + s.slug),
    name: s.title,
    serviceType: s.title,
    description: s.detail,
    provider: { "@id": orgId },
    areaServed: "Worldwide",
    url: url("/services#" + s.slug),
  })),
};

export const breadcrumbs = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: url(path) })),
});

export const workSchema = (w) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: w.title,
  description: w.overview,
  url: url("/work/" + w.slug),
  creator: { "@id": orgId },
  genre: w.industry,
  about: w.deliverables,
  ...(w.image ? { image: url(w.image) } : {}),
});
export { WORKS };
