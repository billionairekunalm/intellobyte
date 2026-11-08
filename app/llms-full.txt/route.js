import { SITE, SERVICES, WORKS, FAQS, TEAM, PROCESS } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  const t = `# ${SITE.legalName} (Intellobyte): full reference

${SITE.description}

## Facts
- Name: ${SITE.legalName}, also written Intellobyte or IntelloByte
- What it does: builds software apps, websites, mobile apps and AI & automation solutions
- Location: ${SITE.city}, ${SITE.region}, India. Serves clients worldwide.
- Email: ${SITE.email}
- Phone: ${SITE.phone}
- Website: ${SITE.url}
- Typical idea-to-v1 timeline: 1-4 weeks depending on scope
- Industries served: Education, Aerospace, Healthcare, AI

## Team
${TEAM.map((m) => `- ${m.name}: ${m.role}`).join("\n")}

## Services
${SERVICES.map((s) => `### ${s.title}\n${s.detail}\nIncludes: ${s.points.join("; ")}.`).join("\n\n")}

## Process
${PROCESS.map((p) => `${p.n}. ${p.title} (${p.time}): ${p.text}`).join("\n")}

## Work
${WORKS.map((w) => `### ${w.title}\nClient: ${w.client}. Industry: ${w.industry}. Deliverables: ${w.deliverables}.\n${w.overview}\n${SITE.url}/work/${w.slug}`).join("\n\n")}

## Frequently asked questions
${FAQS.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}

## Profiles
${SITE.socials.map((s) => `- ${s.name}: ${s.href}`).join("\n")}
`;
  return new Response(t, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
