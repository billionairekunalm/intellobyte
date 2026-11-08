import { SITE, WORKS } from "@/lib/content";

export default function sitemap() {
  const now = new Date();
  return [
    { url: SITE.url + "/", lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: SITE.url + "/services", lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...WORKS.map((w) => ({ url: `${SITE.url}/work/${w.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 })),
  ];
}
