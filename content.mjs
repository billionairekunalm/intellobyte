// Swaps template copy for Intellobyte's real copy across the mirrored site. Re-run after mirror.mjs.
// Order matters: longer/specific strings first. Strings are matched literally; [re, str] pairs use regex.
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const T = (s) => `(?<=[>\`"'])${s}(?=[<\`"'])`; // whole text node / string literal
const R = [
  ["AgenAI - AI Agency Framer Template", "Intellobyte | Software, Web & App Development"],
  ["A modern Framer template for AI agencies to showcase services, case studies, client results, and expertise with clean design, smooth interactions, and seamless customization.", "Intellobyte Tech Solution builds software apps and websites that industry needs: custom software, UI/UX, AI & automation, web development and business systems."],
  // hero
  ["From discovery to deployment, we plug into your stack to prototype, validate, and launch AI experiences your users actually love.", "We build software apps and websites that industry needs, from discovery to deployment, engineered around your business."],
  ["From discovery to deployment, we plug into your stack to prototype,", "We build software apps and websites that industry needs,"],
  ["validate, and launch AI experiences your users actually love.", "from discovery to deployment, engineered around your business."],
  ["AI-Driven Agency", "Intellobyte Tech Solution"],
  // about
  ["Growth-Centered Approach", "Engineering Software"],
  ["Built for Your Brand", "That Industry Needs"],
  ["Trusted by 120+ clients across 8 industries -", "Trusted by 50+ brands across industries -"],
  ["shipping Projects from idea to production in 1-4 weeks", "shipping software from idea to production, fast"],
  ["120+", "100+"],
  [new RegExp(T("80\\+")), "50+"],
  ["Total Clientele", "Brands Served"],
  ["Products Deployed", "Websites Delivered"],
  // services
  ["We turn ambiguous AI ideas into production features your users trust—combining strategy, design, engineering, and rigorous evaluation.", "Strategy, design and engineering under one roof, building software that industry actually needs."],
  ["Data Engineering (04)", "Web Dev & Business Systems(04)"],
  // work
  ["Web Development for DYP DIF", "DYP Incubation Centre"],
  ["Draft replies and pulls account context; reduced first-response time by 38%.", "A platform built for an incubator and education program."],
  ["Built a triage assistant to summarize claims; cut manual review time by 42%.", "Website and digital presence built for an aerospace venture."],
  ["Clinic-lobby assistant answering pre-visit questions; decreased front-desk calls by 28%.", "Healthcare website built for Chhaya Dental Care."],
  ["Launched a shopping copilot that understands attributes; raised add-to-cart by 12%.", "Website built for Elviko AI."],
  ["AI strategy, AI UX flows, LLM agent, RAG", "Website, UI/UX, Development"],
  ["Use-case mapping, Prompt & UI patterns", "Website, UI/UX, Development"],
  ["Data cleaning & embeddings", "Website, UI/UX, Development"],
  ["Underwriting Risk Copilot (Fintech)", "RamaAstra (Aerospace)"],
  ["Support Copilot (SaaS)", "DYP Incubation (Education)"],
  ["Clinical Note Summarizer (Healthcare)", "Chhaya Dental Care (Healthcare)"],
  ["Clinical Note Summarizer", "Chhaya Dental Care"],
  ["Catalog Intelligence Engine", "Elviko AI"],
  [new RegExp(T("SaaS")), "Education"],
  [new RegExp(T("Fintech")), "Aerospace"],
  [new RegExp(T("Ecommerce/Retail")), "AI"],
  // team
  ["Co-Founder & CEO", "CEO"],
  ["Co- Founder & CTO", "CTO"],
  ["ABC XYZ", "Divyanshu Patil"],
  ["Senior Developer", "Lead Developer"],
  // testimonial
  ["We shipped our first copilot in 7 weeks and cut support tickets by 31%. The eval dashboards made every decision obvious.", "We saw a 2× increase in leads after the campaign."],
  ["Elena Ruiz", "Om Bansod"],
  ["Cantos SaaS’s VP Product", "Founder, Yodha Electronics, Delhi"],
  // contact
  ["mailto:help@youraiagency.@gmail.com", "mailto:info@intellobyte.com"],
  ["mailto:help@+1 (647) 555 0172", "tel:+917666596339"],
  ["hello@youraiagency.com", "info@intellobyte.com"],
  ["+1 (647) 555 0172", "+91 76665 96339"],
  ["Website Design", "Custom Software"],
  ["UI/UX Design", "UI/UX & Mobile Apps"],
  ["Framer Landing Page", "AI & Automation"],
  ["UI/UX & Mobile Apps & Mobile Apps", "UI/UX & Mobile Apps"],
  [new RegExp(T("80")), "50"],
  [new RegExp(T("120")), "100"],
  // benefits
  [new RegExp(T("Accuracy")), "Quality"],
  [new RegExp(T("Safety")), "Security"],
  [new RegExp(T("Latency")), "Speed"],
  [new RegExp(T("ROI")), "Growth"],
  ["Outcome over Output", "Craft-Level Quality"],
  ["We measure what matters - accuracy, latency, safety, and cost - so every sprint ships business value, not just features.", "Pixel-perfect builds on modern stacks like React, Next.js and Webflow."],
  ["Eval-First Reliability", "Client-Centric"],
  ["From day one, we run offline/online evals, canary tests, and tracing. You see how models perform - and why.", "Your goals are the brief. We build around your outcomes, not around a template."],
  ["PII handling, SSO/SAML, RBAC, encryption, and audit trails -built in, not bolted on. Enterprise-ready from the start.", "Authentication, role-based access and safe data handling built in from day one, not bolted on."],
  ["Design-Led AI Experiences", "Fast Delivery"],
  ["We craft prompts, interfaces, and guardrails that feel intuitive - so adoption rises and support tickets fall.", "Tight, reliable timelines without cutting corners, with strategy, design and engineering in one team."],
  // features
  ["Agent-Powered Workflows", "Workflow Automation"],
  ["Turn repetitive tasks into autonomous flows—agents plan, execute, and report with guardrails, audit trails, and clear handoff to humans.", "Turn repetitive manual tasks into automated flows, from billing to reports, with a clear handoff to your team."],
  ["Eval-First Quality", "Tested & Reliable"],
  ["Measure accuracy, latency, safety, and cost from day one. Our evals and dashboards keep models reliable and budgets predictable.", "Requirement analysis, QA and testing at every stage keep releases stable and delivery predictable."],
  ["Private Knowledge RAG", "AI Integration"],
  ["Make your docs, tickets, and wikis instantly useful with retrieval augmented generation—freshness, citations, and explainability built in.", "Add chatbots, assistants and data pipelines to your product so your team and customers get answers faster."],
  ["Human-Centered AI UX", "Human-Centered UI/UX"],
  ["Interfaces, prompts, and error states designed for trust and adoption—so the smart thing is also the obvious thing to do.", "User research, prototyping and motion design so the product feels obvious and people enjoy using it."],
  ["PII handling, SSO/SAML, RBAC, secrets management, and compliance workflows—ship AI that’s safe, auditable, and enterprise-ready.", "Role-based access, encryption and audit trails built in, so what we ship is safe and ready for business."],
  ["Plug into your stack (CRM, helpdesk, ERP, data warehouse) with webhooks and APIs to turn insights into action—fast.", "Connect your CRM, billing, inventory and APIs so insights turn into action, without replacing what already works."],
  ["a modern AI stack—LLMs, vectorsearch, orchestration, and observability—so your features are fast,", "a modern stack—React, Next.js, Flutter, and cloud services—so your product is fast,"],
  ["a modern AI stack—LLMs, vector search, orchestration, and observability—so your features are fast,", "a modern stack—React, Next.js, Flutter, and cloud services—so your product is fast,"],
  ["We design, build, and evaluate with", "We design, build, and ship with"],
  // process
  ["Discover & Scope", "Discover & Plan"],
  ["Align on problems, data reality, and success metrics. Opportunity brief, KPI model, phased roadmap, effort/cost ranges.", "Align on goals, users and success metrics. Requirement analysis, system architecture, phased roadmap and cost ranges."],
  [new RegExp(T("Prototype")), "Design & Build"],
  ["De-risk unknowns and validate value quickly. Clickable UX, tech spike repo, initial eval rubric, demo.", "Turn the plan into usable interfaces and working software. Wireframes, clickable prototype and iterative builds with regular demos."],
  ["Validate & Evals", "Test & Launch"],
  ["Prove accuracy, usability, safety, and cost. Eval dashboard, acceptance thresholds, decision to iterate/ship.", "Prove it works. QA, performance checks, deployment and post-launch support and maintenance."],
  ["1 WEEKS", "1 WEEK"],
  ["Which models/stack do you use?", "Which tech stack do you use?"],
  ["We choose models/APIs based on", "We choose tools and APIs based on"],
  ["Vaibhav Kale", "Divyanshu Patil"],
  [new RegExp(T("COO")), "Lead Developer"],
];

for (const [a, b] of [...R]) if (typeof a === "string" && (a.includes("&") || b.includes("&"))) R.push([a.replaceAll("&", "&amp;"), b.replaceAll("&", "&amp;")]);
const hits = new Map();
async function* walk(d) {
  for (const e of await readdir(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) { if (e.name !== "images" && e.name !== "assets" && e.name !== "cms") yield* walk(p); }
    else if (/\.(html|mjs|js)$/.test(e.name)) yield p;
  }
}
for await (const f of walk("site")) {
  let t = await readFile(f, "utf8"), o = t;
  for (const [a, b] of R) {
    const n = typeof a === "string" ? t.split(a).length - 1 : (t.match(a) ?? []).length;
    if (!n) continue;
    t = typeof a === "string" ? t.replaceAll(a, b) : t.replace(new RegExp(a, "g"), b);
    hits.set(String(a), (hits.get(String(a)) ?? 0) + n);
  }
  if (t !== o) await writeFile(f, t);
}
for (const [a] of R) if (!hits.has(String(a))) console.log("MISS", String(a).slice(0, 70));
console.log("replaced", [...hits.values()].reduce((x, y) => x + y, 0), "occurrences");
