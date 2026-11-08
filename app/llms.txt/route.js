import { SITE, SERVICES, WORKS, FAQS } from "@/lib/content";

export const dynamic = "force-static";

// llms.txt: a plain-text, machine-readable summary for AI assistants (llmstxt.org convention).
export function GET() {
  const t = `# ${SITE.name}

> ${SITE.description}

Intellobyte Tech Solution is a software and web development company based in ${SITE.city}, ${SITE.region}, India. It serves clients worldwide. Contact: ${SITE.email}, ${SITE.phone}.

## Services
${SERVICES.map((s) => `- [${s.title}](${SITE.url}/services#${s.slug}): ${s.blurb}`).join("\n")}

## Selected work
${WORKS.map((w) => `- [${w.title}](${SITE.url}/work/${w.slug}): ${w.summary} Industry: ${w.industry}.`).join("\n")}

## Key pages
- [Home](${SITE.url}/): overview, process, team, FAQ and contact
- [Services](${SITE.url}/services): detailed service descriptions
- [Full details for AI assistants](${SITE.url}/llms-full.txt)

## FAQ
${FAQS.map((f) => `- ${f.q} ${f.a}`).join("\n")}

## Social
${SITE.socials.map((s) => `- [${s.name}](${s.href})`).join("\n")}
`;
  return new Response(t, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
