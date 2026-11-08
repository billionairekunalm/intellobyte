// Single source of truth for all site copy + structured data. Edit text here only.
export const SITE = {
  name: "Intellobyte",
  legalName: "Intellobyte Tech Solution",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://intellobyte.com").replace(/\/$/, ""),
  tagline: "Your Technology Growth Partner",
  description:
    "Intellobyte Tech Solution is a software and web development company in Pune, India. We build custom software, websites, mobile apps and AI & automation solutions that industry needs, for clients worldwide.",
  email: "info@intellobyte.com",
  phone: "+91 76665 96339",
  phoneRaw: "+917666596339",
  city: "Pune",
  region: "Maharashtra",
  country: "IN",
  socials: [
    { name: "LinkedIn", href: "https://www.linkedin.com/company/intellobyte" },
    { name: "Instagram", href: "https://www.instagram.com/intellobyte" },
    { name: "YouTube", href: "https://www.youtube.com/@IntelloByte" },
  ],
};

export const NAV = [
  { href: "/#about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/#works", label: "Works" },
  { href: "/#team", label: "Team" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

export const SERVICES = [
  {
    slug: "custom-software",
    title: "Custom Software",
    blurb: "Purpose-built software engineered around your exact business workflow.",
    detail:
      "We turn your process into software that fits it: requirement analysis, system architecture and full-stack development, delivered in iterations with regular demos so you see progress early.",
    points: ["Requirement analysis", "System architecture", "Full-stack development", "Business systems and internal tools"],
  },
  {
    slug: "web-development",
    title: "Web Development",
    blurb: "Fast, secure, search-friendly websites and web apps built on modern stacks.",
    detail:
      "Responsive websites and web applications on React and Next.js, built for speed, accessibility and SEO from day one, with clean code your team can extend.",
    points: ["Business websites and web apps", "React and Next.js builds", "SEO-ready, fast by default", "CMS and integrations"],
  },
  {
    slug: "ui-ux-mobile-apps",
    title: "UI/UX & Mobile Apps",
    blurb: "Interfaces people understand at a glance, on web and mobile.",
    detail:
      "User research, wireframes, clickable prototypes and motion design, followed by mobile and web builds so the final product feels obvious and people enjoy using it.",
    points: ["User research and wireframes", "Clickable prototypes", "Motion and interaction design", "Mobile app development"],
  },
  {
    slug: "ai-automation",
    title: "AI & Automation",
    blurb: "Automate repetitive work and add AI assistants to your product.",
    detail:
      "We automate manual flows such as billing and reports, and add chatbots, assistants and data pipelines to your product, with a clear handoff to your team.",
    points: ["Workflow automation", "Chatbots and AI assistants", "Data pipelines", "CRM, billing and API integrations"],
  },
];

export const WORKS = [
  {
    slug: "dyp-incubation-centre",
    title: "DYP Incubation Centre",
    client: "DYP Dnyansagar Incubation Foundation",
    industry: "Education",
    deliverables: "Website, UI/UX, Development",
    summary: "A platform built for an incubator and education program.",
    overview:
      "Intellobyte designed and built the website for DYP Dnyansagar Incubation Foundation, an incubator that helps teams move from prototype to market. The site presents the incubation program, startup community, campus gallery and the application journey for founders.",
    image: "/img/work-1.webp",
  },
  {
    slug: "ramaastra",
    title: "RamaAstra",
    client: "RamaAstra",
    industry: "Aerospace",
    deliverables: "Website, UI/UX, Development",
    summary: "Website and digital presence built for an aerospace venture.",
    overview:
      "Intellobyte built the website and digital presence for RamaAstra, an aerospace venture. The dark, product-focused design communicates credibility to partners and customers.",
    image: "/img/work-2.webp",
  },
  {
    slug: "chhaya-dental-care",
    title: "Chhaya Dental Care",
    client: "Chhaya Dental Care",
    industry: "Healthcare",
    deliverables: "Website, UI/UX, Development",
    summary: "Healthcare website built for Chhaya Dental Care.",
    overview:
      "Intellobyte built the website for Chhaya Dental Care, a dental clinic, giving patients a clear, fast place to learn about the clinic and get in touch.",
    gradient: "linear-gradient(135deg,#0ea5e9,#6d4aff)",
  },
  {
    slug: "elviko-ai",
    title: "Elviko AI",
    client: "Elviko AI",
    industry: "AI",
    deliverables: "Website, UI/UX, Development",
    summary: "Website built for Elviko AI.",
    overview:
      "Intellobyte built the website for Elviko AI, presenting the company and its AI offering with a modern, fast interface.",
    gradient: "linear-gradient(135deg,#18181b,#6d4aff)",
  },
];

export const PROCESS = [
  { n: "01", title: "Discover & Plan", time: "3-7 days", text: "Align on goals, users and success metrics. Requirement analysis, system architecture, phased roadmap and cost ranges." },
  { n: "02", title: "Design & Build", time: "1-2 weeks", text: "Turn the plan into usable interfaces and working software. Wireframes, clickable prototype and iterative builds with regular demos." },
  { n: "03", title: "Test & Launch", time: "1 week", text: "Prove it works. QA, performance checks, deployment and post-launch support and maintenance." },
];

export const BENEFITS = [
  { title: "Craft-Level Quality", text: "Pixel-perfect builds on modern stacks like React, Next.js and Webflow.", tag: "Quality" },
  { title: "Client-Centric", text: "Your goals are the brief. We build around your outcomes, not around a template.", tag: "Growth" },
  { title: "Secure by Design", text: "Authentication, role-based access and safe data handling built in from day one, not bolted on.", tag: "Security" },
  { title: "Fast Delivery", text: "Tight, reliable timelines without cutting corners, with strategy, design and engineering in one team.", tag: "Speed" },
];

export const FEATURES = [
  { title: "Workflow Automation", text: "Turn repetitive manual tasks into automated flows, from billing to reports, with a clear handoff to your team." },
  { title: "Tested & Reliable", text: "Requirement analysis, QA and testing at every stage keep releases stable and delivery predictable." },
  { title: "AI Integration", text: "Add chatbots, assistants and data pipelines to your product so your team and customers get answers faster." },
  { title: "Human-Centered UI/UX", text: "User research, prototyping and motion design so the product feels obvious and people enjoy using it." },
  { title: "Secure by Design", text: "Role-based access, encryption and audit trails built in, so what we ship is safe and ready for business." },
  { title: "Seamless Integrations", text: "Connect your CRM, billing, inventory and APIs so insights turn into action, without replacing what already works." },
];

export const TOOLS = [
  { name: "React", img: "/img/react.webp" },
  { name: "Python", img: "/img/python.webp" },
  { name: "SQL", img: "/img/sql.webp" },
  { name: "JavaScript", img: "/img/js.webp" },
  { name: "Git", img: "/img/git.webp" },
];
export const STACK = ["React", "Next.js", "Node.js", "Python", "Flutter", "Webflow", "SQL", "Firebase", "Cloud services", "REST APIs"];

export const TEAM = [
  { name: "Kunal Manjare", role: "CEO", img: "/img/ceo.svg", big: true },
  { name: "Pranav Patil", role: "CTO", img: "/img/cto.svg", big: true },
  { name: "Shinjini Mondal", role: "Chief International Relations Officer", img: "/img/shinjini.webp" },
  { name: "Divyanshu Patil", role: "Lead Developer", img: "/img/divyanshu.webp" },
];

export const TESTIMONIAL = {
  quote: "We saw a 2× increase in leads after the campaign.",
  name: "Om Bansod",
  role: "Founder, Yodha Electronics, Delhi",
};

// Written answer-first so search and AI engines can quote them directly.
export const FAQS = [
  { q: "What is Intellobyte?", a: "Intellobyte Tech Solution is a software and web development company based in Pune, India. We build custom software, websites, mobile apps and AI & automation solutions for businesses worldwide." },
  { q: "What services does Intellobyte offer?", a: "Custom software development, web development, UI/UX design and mobile apps, and AI & automation (chatbots, assistants, workflow automation and integrations)." },
  { q: "Where is Intellobyte based?", a: "Intellobyte is based in Pune, Maharashtra, India, and takes on projects from clients worldwide." },
  { q: "What’s the typical timeline from idea to v1?", a: "Typically 1-4 weeks depending on scope and complexity. We move from discovery to deployment with regular check-ins." },
  { q: "What do we need to start?", a: "A clear problem statement, success metrics, access to sample data, and a stakeholder who can make decisions. We’ll run a kickoff workshop to align scope." },
  { q: "Which tech stack do you use?", a: "Modern, scalable stacks like React, Next.js, Node.js, Python, Flutter and cloud services. We choose tools and APIs based on the use case, performance and cost." },
  { q: "Which industries has Intellobyte worked with?", a: "Education, aerospace, healthcare and AI, including DYP Incubation Centre, RamaAstra, Chhaya Dental Care and Elviko AI." },
  { q: "Do you provide post launch support and maintenance?", a: "Yes. Ongoing support and maintenance are available after launch." },
  { q: "How can I contact Intellobyte?", a: `Email ${SITE.email} or call ${SITE.phone}, or send a message through the contact form on the website.` },
];

export const url = (p = "") => SITE.url + p;
