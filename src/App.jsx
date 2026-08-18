import { useEffect, useRef, useState } from "react";

const services = [
  {
    title: "UI/UX Design",
    label: "Interfaces humans actually enjoy.",
    description:
      "User flows, wireframes, product screens, prototypes, UX audits, and design systems for websites, SaaS, and mobile products.",
    tags: ["UX Strategy", "Product UI", "Design Systems"],
  },
  {
    title: "Digital Experiences",
    label: "Digital / Web",
    description: "Every interaction shapes perception.",
    tags: [
      "Website Strategy",
      "Website Design",
      "Landing Pages",
      "Marketing Funnels",
      "Email Marketing",
      "Digital Campaigns",
      "Social Media Strategy",
      "Social Branding & Templates",
      "Interactive Experiences",
      "Intranet & Portal Design",
      "SEO Content Planning",
      "Analytics & Optimization",
    ],
  },
  {
    title: "Digital Marketing",
    label: "Growth support without the noise.",
    description:
      "SEO foundations, social media creatives, campaign design, paid ad assets, content systems, and performance-minded launch support.",
    tags: ["SEO", "SMO", "Campaigns"],
  },
  {
    title: "AI Products & Workflows",
    label: "AI that does something useful.",
    description:
      "Assistants, workflow automation, AI-enabled websites, internal tools, integrations, and rapid prototypes shaped around real business outcomes.",
    tags: ["AI Tools", "Automation", "Rapid Prototypes"],
  },
  {
    title: "Branding & Identity",
    label: "A sharper visual foundation.",
    description:
      "Logo direction, visual identity, typography, color systems, brand assets, and lightweight guidelines for digital-first brands.",
    tags: ["Identity", "Brand Systems", "Visual Direction"],
  },
  {
    title: "Growth Support",
    label: "Marketing that supports the work.",
    description:
      "SEO foundations, social creatives, campaign design, paid ad assets, content systems, and performance-minded launch support.",
    tags: ["SEO", "Social Design", "Campaigns"],
  },
];

const projects = [
  {
    title: "SaaS dashboard redesign",
    category: "UI/UX Design",
    type: "Concept project",
    description:
      "A cleaner product interface for teams that need faster decisions, sharper flows, and a design system that can actually scale.",
    tags: ["UX Audit", "Product UI", "Design System"],
    visual: "dashboard",
    stats: ["42 screens", "SaaS UI"],
  },
  {
    title: "Local business website",
    category: "Website Design & Development",
    type: "Concept project",
    description:
      "A premium web presence for a growing local brand, built around clear services, stronger trust, and easier enquiries.",
    tags: ["Website", "Responsive", "SEO Base"],
    visual: "website",
  },
  {
    title: "AI workflow console",
    category: "AI Products & Workflows",
    type: "Concept project",
    description:
      "An internal assistant experience for turning scattered tasks into useful, repeatable business workflows.",
    tags: ["AI Assistant", "Automation", "Ops"],
    visual: "ai",
  },
  {
    title: "Launch campaign system",
    category: "Digital Marketing",
    type: "Concept project",
    description:
      "A compact campaign kit that connects landing pages, social creatives, search basics, and performance tracking.",
    tags: ["Campaigns", "Social", "Tracking"],
    visual: "campaign",
  },
];

const portfolioFilters = ["All", "UI/UX", "Websites", "AI Workflows", "Branding", "Marketing"];

const portfolioProjects = [
  {
    title: "SaaS dashboard redesign",
    category: "UI/UX",
    service: "UI/UX Design",
    type: "Concept project",
    description:
      "A cleaner product interface for teams that need faster decisions, sharper flows, and a design system that can actually scale.",
    tags: ["UX Audit", "Product UI", "Design System"],
    visual: "dashboard",
    href: "/portfolio/saas-dashboard-redesign",
    stats: ["42 screens", "SaaS UI"],
    featured: true,
  },
  {
    title: "Local business website",
    category: "Websites",
    service: "Website Design & Development",
    type: "Concept project",
    description:
      "A premium web presence for a growing local brand, built around clear services, stronger trust, and easier enquiries.",
    tags: ["Website", "Responsive", "SEO Base"],
    visual: "website",
    href: "/portfolio/local-business-website",
    stats: ["7 pages", "Lead-ready"],
  },
  {
    title: "AI workflow console",
    category: "AI Workflows",
    service: "AI Products & Workflows",
    type: "Concept project",
    description:
      "An internal assistant experience for turning scattered tasks into useful, repeatable business workflows.",
    tags: ["AI Assistant", "Automation", "Ops"],
    visual: "ai",
    href: "/portfolio/ai-workflow-console",
    stats: ["3 workflows", "Ops UI"],
  },
  {
    title: "Launch campaign system",
    category: "Marketing",
    service: "Digital Marketing Support",
    type: "Concept project",
    description:
      "A compact campaign kit that connects landing pages, social creatives, search basics, and performance tracking.",
    tags: ["Campaigns", "Social", "Tracking"],
    visual: "campaign",
    href: "/portfolio/launch-campaign-system",
    stats: ["Campaign kit", "Assets"],
  },
  {
    title: "Startup landing page",
    category: "Websites",
    service: "Website Design & Development",
    type: "Concept project",
    description:
      "A focused launch page for a new product offer, designed to explain quickly, build trust, and move visitors toward enquiry.",
    tags: ["Landing Page", "Copy Flow", "Conversion"],
    visual: "website",
    href: "/portfolio/startup-landing-page",
    stats: ["1 page", "Launch"],
  },
  {
    title: "Brand identity system",
    category: "Branding",
    service: "Branding & Identity",
    type: "Concept project",
    description:
      "A lean visual identity system with flexible typography, color, and digital assets for a product-led business.",
    tags: ["Identity", "Guidelines", "Digital Assets"],
    visual: "campaign",
    href: "/portfolio/brand-identity-system",
    stats: ["Brand kit", "Digital"],
  },
  {
    title: "UX audit and redesign",
    category: "UI/UX",
    service: "UI/UX Design",
    type: "Concept project",
    description:
      "A friction-focused audit and redesign path for finding unclear flows, weak hierarchy, and the small decisions that slow users down.",
    tags: ["UX Audit", "Redesign", "User Flows"],
    visual: "dashboard",
    href: "/portfolio/ux-audit-redesign",
    stats: ["Audit", "Redesign"],
  },
  {
    title: "AI-enabled service website",
    category: "AI Workflows",
    service: "AI Products & Workflows",
    type: "Concept project",
    description:
      "A service website concept with useful AI-assisted intake, cleaner lead qualification, and a calmer path from question to action.",
    tags: ["AI Intake", "Website", "Automation"],
    visual: "ai",
    href: "/portfolio/ai-enabled-service-website",
    stats: ["AI intake", "Website"],
  },
];

const testimonials = [
  {
    quote:
      "The Lazy Studio made the whole thing feel lighter. Strategy was clear, the screens were sharp, and the final website felt premium without months of noise.",
    name: "SaaS founder",
    role: "Product redesign",
    initials: "SF",
  },
  {
    quote:
      "They understood what we needed fast: a website that looked serious, explained the offer clearly, and helped customers take the next step.",
    name: "Local business owner",
    role: "Website build",
    initials: "LB",
  },
  {
    quote:
      "The AI workflow ideas were actually useful. Not gimmicks, not demos for the sake of it, just smart systems that saved our team time.",
    name: "Operations lead",
    role: "AI workflow",
    initials: "OL",
  },
  {
    quote:
      "The design direction finally made our product feel as good as the thing we had built. Cleaner, calmer, and much easier to explain.",
    name: "Startup team",
    role: "UI/UX design",
    initials: "ST",
  },
  {
    quote:
      "Fast, thoughtful, and weirdly calm. The work moved quickly, but nothing felt rushed. That balance is rare.",
    name: "Growth partner",
    role: "Launch support",
    initials: "GP",
  },
];

const logoMarks = [
  { name: "Northline", mark: "N", shape: "pill", tone: "red" },
  { name: "Flowbase", mark: "F", shape: "square", tone: "muted" },
  { name: "Kairo", mark: "K", shape: "pill", tone: "white" },
  { name: "Monora", mark: "M", shape: "square", tone: "muted" },
  { name: "Luma Labs", mark: "L", shape: "pill", tone: "red" },
  { name: "Vertex", mark: "V", shape: "square", tone: "white" },
];

const blogPosts = [
  {
    title: "Why your website should do less, better",
    date: "July 13, 2026",
    datetime: "2026-07-13",
    excerpt:
      "The strongest websites do not shout at visitors. They guide the right people toward the right action with less friction.",
    image: "/assets/lazy-studio-hero.png",
    alt: "Cinematic red and blue lit creative technologist in a dark studio",
    category: "Website Strategy",
    author: "The Lazy Studio",
    comments: "0",
    featured: true,
  },
  {
    title: "A useful UX audit before the redesign sprint",
    date: "June 28, 2026",
    datetime: "2026-06-28",
    excerpt:
      "Before changing the visuals, find the leaks: unclear flows, weak hierarchy, missing trust, and decisions that make users work too hard.",
    image: "/assets/marquee-consultant.png",
    alt: "Creative consultant reviewing digital campaign work",
    category: "UI/UX Design",
    author: "The Lazy Studio",
    comments: "0",
  },
  {
    title: "AI workflows that are actually worth building",
    date: "June 10, 2026",
    datetime: "2026-06-10",
    excerpt:
      "Good AI systems remove repetitive work, clarify decisions, and give teams time back. The trick is starting with the workflow, not the tool.",
    image: "/assets/marquee-strategist.png",
    alt: "Creative strategist in a neon-lit studio",
    category: "AI Workflows",
    author: "The Lazy Studio",
    comments: "0",
  },
  {
    title: "How to plan a homepage that actually converts",
    date: "May 21, 2026",
    datetime: "2026-05-21",
    excerpt:
      "A useful homepage makes the offer obvious, earns trust quickly, and gives visitors one clean next step instead of twelve competing choices.",
    image: "/assets/marquee-consultant.png",
    alt: "Creative consultant in a modern campaign workspace",
    category: "Website Design",
    author: "The Lazy Studio",
    comments: "0",
  },
  {
    title: "What small businesses should fix before ads",
    date: "April 18, 2026",
    datetime: "2026-04-18",
    excerpt:
      "Paid traffic works better when the basics are tight: message clarity, loading speed, mobile layouts, trust signals, and a landing page that knows its job.",
    image: "/assets/lazy-studio-hero.png",
    alt: "Cinematic red and blue lit creative technologist in a dark studio",
    category: "Digital Marketing",
    author: "The Lazy Studio",
    comments: "0",
  },
  {
    title: "Design systems for teams that move fast",
    date: "March 30, 2026",
    datetime: "2026-03-30",
    excerpt:
      "A lean design system keeps teams consistent without slowing them down. Start with the decisions people repeat every week.",
    image: "/assets/marquee-strategist.png",
    alt: "Creative strategist in a neon-lit studio",
    category: "Design Systems",
    author: "The Lazy Studio",
    comments: "0",
  },
];

const blogCategories = [
  { name: "UI/UX Design", count: 3 },
  { name: "Website Design", count: 4 },
  { name: "AI Workflows", count: 2 },
  { name: "Digital Marketing", count: 2 },
  { name: "Design Systems", count: 1 },
];

const blogTags = [
  "Agency",
  "AI",
  "Branding",
  "Design",
  "Marketing",
  "Product",
  "SEO",
  "Startup",
  "Websites",
];

const faqItems = [
  {
    question: "What kind of projects do you take on?",
    answer:
      "We focus on UI/UX design, websites, SaaS interfaces, AI-powered workflows, and digital systems for local businesses, startups, and growing teams.",
  },
  {
    question: "Can you design and build the full website?",
    answer:
      "Yes. We can handle strategy, interface design, responsive development, launch support, and post-launch maintenance so the whole web presence stays coherent.",
  },
  {
    question: "How do you use AI in the process?",
    answer:
      "AI helps us move faster through research, prototyping, automation, content structure, and workflow ideas. The taste, decisions, and final craft stay human.",
  },
  {
    question: "Do you also handle marketing, SEO, and ads?",
    answer:
      "Yes, as supporting services. We can help with SEO foundations, campaign creatives, social content, paid ad assets, and performance tracking around the core website or product work.",
  },
];

const servicePageServices = [
  {
    title: "UI/UX Design",
    kicker: "Primary Focus",
    line: "Interfaces humans actually enjoy.",
    description:
      "UX strategy, user flows, wireframes, interface design, prototypes, product redesigns, SaaS screens, mobile apps, design systems, and UX audits.",
    tags: ["UX Strategy", "Wireframes", "SaaS UI", "Design Systems"],
    href: "/services/ui-ux-design",
    tone: "red",
  },
  {
    title: "Website Design & Development",
    kicker: "Primary Focus",
    line: "Your whole web presence. Done.",
    description:
      "Website strategy, design, responsive front-end development, landing pages, business websites, startup websites, redesigns, WordPress support, and maintenance.",
    tags: ["Website Design", "Front-end", "WordPress", "Maintenance"],
    href: "/services/website-design-development",
    tone: "white",
  },
  {
    title: "AI Products & Workflows",
    kicker: "Primary Focus",
    line: "AI that does something useful.",
    description:
      "AI-enabled websites, assistants, internal tools, workflow automation, useful integrations, product experiences, and rapid AI prototypes shaped around real outcomes.",
    tags: ["AI Assistants", "Automation", "Internal Tools", "Prototypes"],
    href: "/services/ai-products-workflows",
    tone: "dark",
  },
  {
    title: "Branding & Identity",
    kicker: "Supporting Service",
    line: "A sharper visual foundation.",
    description:
      "Logo direction, visual identity, typography, color systems, digital brand assets, and lightweight guidelines that help the website and product feel coherent.",
    tags: ["Identity", "Brand Systems", "Visual Direction"],
    href: "/services/branding-identity",
    tone: "dark",
  },
  {
    title: "Digital Marketing Support",
    kicker: "Add-on Service",
    line: "Growth support without the noise.",
    description:
      "SEO foundations, SMO, social media design, campaign creatives, paid ad assets, content design, and performance tracking around the core digital product.",
    tags: ["SEO", "SMO", "Campaigns", "Ads"],
    href: "/services/digital-marketing",
    tone: "dark",
  },
  {
    title: "Care & Optimization",
    kicker: "Ongoing Support",
    line: "Keep the machine clean.",
    description:
      "Website maintenance, performance checks, content updates, conversion improvements, analytics review, and small design/dev improvements after launch.",
    tags: ["Maintenance", "Performance", "Analytics"],
    href: "/services/maintenance-optimization",
    tone: "dark",
  },
];

const supportAddOns = [
  "SEO foundations",
  "SMO",
  "Social media design",
  "Social media management",
  "Paid ad creatives",
  "Campaign assets",
  "Content design",
  "Performance tracking",
  "Website maintenance",
];

const serviceAudiences = [
  {
    title: "Local businesses",
    description: "Modern websites, clearer service pages, trust signals, and enquiry paths that make the business feel current.",
  },
  {
    title: "Startup founders",
    description: "Launch pages, MVP interfaces, pitch-ready product flows, and quick AI prototypes without heavy agency drag.",
  },
  {
    title: "SaaS teams",
    description: "UX audits, redesigns, front-end support, design systems, and product screens that reduce friction.",
  },
  {
    title: "Growing businesses",
    description: "A reliable digital partner for websites, product improvements, campaigns, automation, and ongoing optimization.",
  },
];

const servicePackages = [
  {
    name: "Launch Sprint",
    bestFor: "Landing pages, early websites, and focused MVP moments.",
    price: "Project-based",
    includes: ["Strategy workshop", "Page design", "Responsive build", "Launch checklist"],
  },
  {
    name: "Product Studio",
    bestFor: "SaaS UI, app screens, redesigns, and design systems.",
    price: "Sprint-based",
    includes: ["UX audit", "Flows and wireframes", "High-fidelity UI", "Developer-ready handoff"],
  },
  {
    name: "Studio Partner",
    bestFor: "Ongoing design, web, AI workflow, and campaign support.",
    price: "Monthly support",
    includes: ["Priority backlog", "Design/dev updates", "AI workflow support", "Performance review"],
  },
];

const servicesPageFaqs = [
  {
    question: "Can you handle design and development together?",
    answer: "Yes. The strongest fit is when we can shape the strategy, design the experience, and build the responsive front-end or website as one connected system.",
  },
  {
    question: "Do you create individual service packages?",
    answer: "Yes. We can scope a focused sprint, a full project, or monthly support depending on whether you need a launch, redesign, product work, or ongoing improvements.",
  },
  {
    question: "Where do marketing and SEO fit?",
    answer: "They support the core design and website work. We can help with SEO foundations, social assets, campaigns, and paid ad creatives when they help the experience perform better.",
  },
  {
    question: "Do you build AI tools from scratch?",
    answer: "We start with the workflow and outcome first. Then we prototype the simplest useful AI system, assistant, integration, or internal tool needed to make the work easier.",
  },
];

const processPrinciples = [
  {
    title: "Clarity first",
    description: "We find the real problem, the useful outcome, and the cleanest path before pixels or code start moving.",
  },
  {
    title: "Craft always",
    description: "Lean does not mean lazy work. It means fewer distractions around the thinking, design, and build quality.",
  },
  {
    title: "AI where useful",
    description: "AI supports research, prototypes, workflows, and QA. Taste, direction, and final decisions stay human.",
  },
];

const processSteps = [
  {
    title: "Diagnose",
    label: "Find the real job",
    description:
      "We understand the business, audience, offer, goals, constraints, and the places where the current experience is doing too much or too little.",
    deliverables: ["Goals", "Users", "Constraints"],
  },
  {
    title: "Map",
    label: "Shape the path",
    description:
      "We define structure, user journeys, content flow, page hierarchy, conversion paths, and the decisions the product or website needs to make clear.",
    deliverables: ["Sitemap", "Flows", "Content logic"],
  },
  {
    title: "Design",
    label: "Make it feel obvious",
    description:
      "We create wireframes, UI direction, responsive layouts, interaction logic, and design system foundations where the project needs them.",
    deliverables: ["Wireframes", "UI screens", "Prototype"],
  },
  {
    title: "Build",
    label: "Turn it into the thing",
    description:
      "We develop the responsive front-end or website structure with performance, accessibility, clean implementation, and SEO basics in mind.",
    deliverables: ["Responsive build", "CMS-ready structure", "SEO base"],
  },
  {
    title: "Enhance",
    label: "Add the useful intelligence",
    description:
      "We add AI workflows, automations, integrations, analytics, campaign assets, or support systems only where they improve the outcome.",
    deliverables: ["AI workflows", "Automation", "Tracking"],
  },
  {
    title: "Launch & Improve",
    label: "Ship, check, refine",
    description:
      "We run QA, mobile checks, speed reviews, metadata, launch support, tracking checks, and practical improvements after the work goes live.",
    deliverables: ["QA", "Launch", "Iteration"],
  },
];

const aiWorkflowItems = [
  "Research and synthesis",
  "Rapid prototype exploration",
  "Content structure support",
  "Code assistance and QA",
  "Workflow mapping",
  "Automation planning",
];

const collaborationItems = [
  {
    title: "Clear scope",
    description: "You know what is being made, why it matters, and what decisions are needed next.",
  },
  {
    title: "Fast feedback loops",
    description: "Reviews stay focused so momentum does not get buried under performative process.",
  },
  {
    title: "Async-friendly updates",
    description: "Progress stays visible without needing a meeting for every tiny movement.",
  },
  {
    title: "Focused reviews",
    description: "We ask for feedback at the moments where it improves the work, not just fills the calendar.",
  },
  {
    title: "No busywork",
    description: "The process exists to protect the outcome, not to make the project look more complicated.",
  },
];

const processDeliverables = [
  {
    title: "Website projects",
    items: ["Strategy", "Sitemap", "Page design", "Responsive build", "SEO basics", "Launch support"],
  },
  {
    title: "UI/UX projects",
    items: ["UX audit", "User flows", "Wireframes", "UI screens", "Prototype", "Design system direction"],
  },
  {
    title: "AI workflow projects",
    items: ["Workflow map", "Prototype", "Integration plan", "Automation logic", "Internal tool UI", "QA notes"],
  },
  {
    title: "Ongoing support",
    items: ["Maintenance", "Improvements", "Campaign creatives", "Reporting", "Optimization", "Small builds"],
  },
];

const processInputs = [
  "Brand assets",
  "Current website or product access",
  "Business goals",
  "Reference sites or products",
  "Content direction",
  "Decision maker",
  "Launch timeline",
];

const processPageFaqs = [
  {
    question: "How long does a typical project take?",
    answer: "Focused landing pages can move quickly. Full websites, product redesigns, and AI workflows depend on scope, but we keep timelines clear before the work starts.",
  },
  {
    question: "Can we start if content is not ready?",
    answer: "Yes. We can begin with structure, messaging direction, wireframes, and content planning so the page has a clear job before final copy lands.",
  },
  {
    question: "Do you work with existing brands?",
    answer: "Yes. We can work inside an existing identity, tighten it for digital, or recommend a lean visual refresh if the brand is holding the interface back.",
  },
  {
    question: "Where does AI fit into the process?",
    answer: "AI helps us explore, prototype, organize, automate, and test faster. It does not replace taste, strategy, or the final craft decisions.",
  },
  {
    question: "What happens after launch?",
    answer: "We can support maintenance, analytics review, iteration, campaign assets, performance improvements, and small design or development updates.",
  },
];

const aboutStats = [
  {
    value: "AI-first",
    label: "Workflow",
    description: "Modern tools help us move faster through research, structure, prototypes, build support, and QA.",
  },
  {
    value: "Human",
    label: "Craft",
    description: "Taste, strategy, writing, hierarchy, interaction, and final decisions stay firmly human-led.",
  },
  {
    value: "Less",
    label: "Overhead",
    description: "Fewer unnecessary layers, clearer communication, and more attention on the work people actually use.",
  },
];

const aboutBeliefs = [
  {
    title: "Design should make decisions easier.",
    description: "Good interfaces reduce guessing. They guide people, clarify next steps, and make the important parts feel obvious.",
  },
  {
    title: "Websites should earn attention quickly.",
    description: "A strong site explains the offer, builds trust, and gives visitors a clean path without making them work for it.",
  },
  {
    title: "AI should be useful, not decorative.",
    description: "We use AI to support real workflows, better prototypes, smarter operations, and faster learning.",
  },
  {
    title: "Premium does not need to feel corporate.",
    description: "The studio can be sharp, calm, technical, and a little rebellious without becoming cold or bloated.",
  },
];

const aboutRoles = [
  "UX strategy",
  "Interface design",
  "Website design",
  "Front-end development",
  "AI workflow design",
  "Brand systems",
  "Campaign support",
  "SEO foundations",
];

const aboutClientTypes = [
  {
    title: "Local businesses",
    description: "For teams that need a modern, trustworthy website without the agency-sized maze.",
  },
  {
    title: "Startup founders",
    description: "For founders who need a launch page, MVP interface, or product story that gets clear fast.",
  },
  {
    title: "SaaS teams",
    description: "For product teams that need cleaner flows, sharper UI, and front-end support that respects the system.",
  },
  {
    title: "Growing brands",
    description: "For businesses that need a reliable digital partner across design, websites, AI workflows, and support.",
  },
];

const contactProjectTypes = [
  "UI/UX Design",
  "Website Design & Development",
  "AI Products & Workflows",
  "Branding",
  "Digital Marketing Support",
  "Maintenance / Ongoing Support",
];

const contactDetails = [
  {
    label: "Email",
    value: "hello@thelazystudio.com",
    href: "mailto:hello@thelazystudio.com",
  },
  {
    label: "Best fit",
    value: "Interfaces, websites, AI workflows, and useful digital systems.",
  },
  {
    label: "Response",
    value: "Usually within 1-2 business days.",
  },
];

const contactSteps = [
  {
    title: "Send the context",
    description: "Share the goal, the rough edges, the timeline, and anything already in motion.",
  },
  {
    title: "We review the fit",
    description: "We look for the cleanest scope, likely risks, and where the work can make the most difference.",
  },
  {
    title: "You get the next move",
    description: "We suggest a focused sprint, full project, or support path without making the brief heavier.",
  },
];

const initialContactForm = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  timeline: "",
  message: "",
  needsBriefHelp: false,
};

const faqPageCategories = ["All", "Services", "Process", "Pricing", "AI Workflow", "Websites", "Support"];

const featuredFaqs = [
  {
    question: "What kind of projects do you take on?",
    answer:
      "We focus on UI/UX design, website design and development, SaaS interfaces, AI-powered workflows, branding support, and digital systems for local businesses, startups, and growing teams.",
  },
  {
    question: "Can you design and build the full website?",
    answer:
      "Yes. We can handle strategy, page structure, interface design, responsive development, launch support, and post-launch care so the whole web presence stays coherent.",
  },
  {
    question: "How do you use AI in the process?",
    answer:
      "AI helps with research, synthesis, prototyping, code support, workflow mapping, QA, and automation planning. The final direction, taste, and decisions stay human.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "Pricing depends on scope, speed, complexity, and ongoing support needs. We can shape a focused sprint, a full project, or a monthly studio partnership around the job.",
  },
];

const faqPageGroups = [
  {
    category: "Services",
    title: "Services FAQs",
    description: "What we do, what we pair together, and where supporting services fit.",
    items: [
      {
        question: "What services does The Lazy Studio offer?",
        answer:
          "The primary services are UI/UX design, website design and development, digital product design, and AI-powered products or workflows. Branding, marketing, SEO, SMO, ads, and maintenance support those core offers.",
      },
      {
        question: "Do you do UI/UX design and website development together?",
        answer:
          "Yes. That is often the strongest fit: we shape the experience, design the interface, and build the responsive website as one connected system.",
      },
      {
        question: "Do you work on SaaS and app interfaces?",
        answer:
          "Yes. We can help with UX audits, user flows, wireframes, product screens, prototypes, design systems, and front-end-ready UI direction.",
      },
      {
        question: "Do you offer branding?",
        answer:
          "Yes, as a supporting service. We can create or refine visual identity, typography, color, digital assets, and lightweight guidelines when the product or website needs a stronger foundation.",
      },
      {
        question: "Do you handle marketing, SEO, SMO, or paid ads?",
        answer:
          "Yes, but as support around the core digital experience. We can help with SEO foundations, campaign creatives, social content, paid ad assets, and performance tracking.",
      },
    ],
  },
  {
    category: "Process",
    title: "Process FAQs",
    description: "How projects move from messy brief to useful launch.",
    items: [
      {
        question: "What does the process look like?",
        answer:
          "We diagnose the problem, map the structure, design the experience, build the responsive system, enhance where AI is useful, then launch and improve.",
      },
      {
        question: "How long does a typical project take?",
        answer:
          "Focused landing pages can move quickly. Full websites, product redesigns, and AI workflows depend on scope, but we define timing before work begins.",
      },
      {
        question: "Can we start if our content is not ready?",
        answer:
          "Yes. We can begin with strategy, page structure, wireframes, and content direction so the project has a clear shape before final copy lands.",
      },
      {
        question: "How do feedback and approvals work?",
        answer:
          "We keep reviews focused and decision-based. You get clear checkpoints, direct context, and fewer vague rounds of feedback.",
      },
      {
        question: "Do you work async or through calls?",
        answer:
          "Both. Calls are useful for strategy and key decisions. Async updates keep the work moving without adding meetings just to look busy.",
      },
    ],
  },
  {
    category: "Pricing",
    title: "Pricing & Packages FAQs",
    description: "How scope, retainers, and smaller starts can work.",
    items: [
      {
        question: "Do you have fixed packages?",
        answer:
          "We use clear entry points like launch sprints, product design sprints, and monthly support. The final scope is shaped around the actual job.",
      },
      {
        question: "Can we start with a smaller project?",
        answer:
          "Yes. A smaller launch page, UX audit, redesign sprint, or AI workflow prototype can be a smart way to begin.",
      },
      {
        question: "Do you offer monthly support?",
        answer:
          "Yes. Monthly support can include maintenance, design updates, website improvements, AI workflow support, campaign assets, and performance review.",
      },
      {
        question: "What affects project pricing?",
        answer:
          "Scope, number of pages or screens, content needs, CMS complexity, custom development, AI integrations, timeline, and post-launch support all affect pricing.",
      },
      {
        question: "Do you work with startups and small businesses?",
        answer:
          "Yes. The site and process are built to feel approachable for smaller businesses while still being premium enough for serious startups and SaaS teams.",
      },
    ],
  },
  {
    category: "AI Workflow",
    title: "AI Workflow FAQs",
    description: "What AI-first means when outcomes matter more than tools.",
    items: [
      {
        question: "What does AI-first mean?",
        answer:
          "It means we use AI where it makes the work faster, clearer, or more useful. We start with the workflow and desired outcome, not a tool demo.",
      },
      {
        question: "Do you use AI to replace human design work?",
        answer:
          "No. AI assists research, exploration, automation, and QA. Human strategy, taste, judgment, and craft lead the work.",
      },
      {
        question: "Can you build AI assistants or internal tools?",
        answer:
          "Yes. We can design and prototype AI assistants, internal tools, intake systems, workflow interfaces, and useful automations.",
      },
      {
        question: "Can you automate parts of our business workflow?",
        answer:
          "Yes. We map the current workflow first, then identify where automation can remove repetitive work, clarify decisions, or reduce manual handoffs.",
      },
      {
        question: "Which AI tools do you use?",
        answer:
          "Tools may include ChatGPT, Claude, Gemini, Codex, Cursor, Figma AI tools, and automation platforms, but we present them as means to an outcome, not separate services.",
      },
    ],
  },
  {
    category: "Websites",
    title: "Website & Technical FAQs",
    description: "Build platforms, responsive behavior, SEO, CMS, forms, and performance.",
    items: [
      {
        question: "What platforms do you build with?",
        answer:
          "We recommend the stack based on performance, SEO, maintainability, CMS needs, animation requirements, accessibility, and how easy the site needs to be to update.",
      },
      {
        question: "Can you build WordPress websites?",
        answer:
          "Yes. WordPress can be a good fit when the content team needs familiar editing workflows, blog management, or plugin-based functionality.",
      },
      {
        question: "Do you handle responsive design?",
        answer:
          "Yes. Responsive behavior is part of the work, not an extra. We design and test layouts for desktop, tablet, and mobile.",
      },
      {
        question: "Do you help with SEO setup?",
        answer:
          "Yes. We can handle SEO foundations such as structure, metadata, headings, performance basics, indexable pages, and content direction.",
      },
      {
        question: "Can you connect analytics, forms, CMS, or automations?",
        answer:
          "Yes. We can connect contact forms, analytics, CMS content, integrations, and automations when the project calls for it.",
      },
    ],
  },
  {
    category: "Support",
    title: "Support & Launch FAQs",
    description: "What happens after launch and how long-term support works.",
    items: [
      {
        question: "What happens after launch?",
        answer:
          "We can support QA fixes, analytics checks, content updates, performance improvements, maintenance, and practical iterations after the site goes live.",
      },
      {
        question: "Do you provide maintenance?",
        answer:
          "Yes. Maintenance can cover technical updates, small design changes, content support, performance checks, and ongoing improvements.",
      },
      {
        question: "Can you improve an existing website?",
        answer:
          "Yes. We can audit, redesign, rebuild, or improve specific sections depending on what is slowing the website down.",
      },
      {
        question: "Can you redesign without rebuilding everything?",
        answer:
          "Sometimes. If the current foundation is strong enough, we can improve structure, hierarchy, content, and key pages without a full rebuild.",
      },
      {
        question: "Can you work as a long-term digital partner?",
        answer:
          "Yes. That is a strong fit for growing businesses that need ongoing design, web, AI workflow, campaign, and optimization support.",
      },
    ],
  },
];

function SiteHeader({ activePage = "home" }) {
  const isHome = activePage === "home";
  const isServices = activePage === "services";
  const isPortfolio = activePage === "portfolio";
  const isProcess = activePage === "process";
  const isFaq = activePage === "faq";
  const isAbout = activePage === "about";
  const isContact = activePage === "contact";
  const contactHref = isContact ? "#contact-form" : "/contact";

  return (
    <header className="header">
      <a className="wordmark" href="/" aria-label="The Lazy Studio home">
        The Lazy Studio
      </a>

      <nav className="nav" aria-label="Primary navigation">
        <a href={isHome ? "#home" : "/"} className={isHome ? "nav__link nav__link--active" : "nav__link"}>
          Home
        </a>
        <a href="/portfolio" className={isPortfolio ? "nav__link nav__link--active" : "nav__link"}>
          Portfolio
        </a>
        <a href={isHome ? "#services" : "/services"} className={isServices ? "nav__link nav__link--active" : "nav__link"}>
          Services
        </a>
        <a href="/process" className={isProcess ? "nav__link nav__link--active" : "nav__link"}>
          Process
        </a>
        <a href="/faq" className={isFaq ? "nav__link nav__link--active" : "nav__link"}>
          FAQs
        </a>
        <a href="/blog" className={activePage === "blog" ? "nav__link nav__link--active" : "nav__link"}>
          Blog
        </a>
        <a href="/about" className={isAbout ? "nav__link nav__link--active" : "nav__link"}>
          About
        </a>
        <a href={contactHref} className={isContact ? "nav__link nav__link--active" : "nav__link"}>
          Contact
        </a>
      </nav>

      <a className="header__cta" href={contactHref}>
        Start a project
      </a>
    </header>
  );
}

function SiteFooter({ page = "home" }) {
  return (
    <section className="contact-video-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-video__smoke" aria-hidden="true" />
      <div className="contact-video__grid" aria-hidden="true" />

      <div className="contact-video__inner">
        <aside className="contact-video__brand" aria-label="The Lazy Studio footer mark">
          <div className="contact-video__badge">
            <svg viewBox="0 0 220 220" aria-hidden="true">
              <defs>
                <path
                  id={`footer-badge-path-${page}`}
                  d="M110 18a92 92 0 1 1 0 184a92 92 0 1 1 0-184"
                />
              </defs>
              <text>
                <textPath href={`#footer-badge-path-${page}`} startOffset="0%">
                  THE LAZY STUDIO • AI FIRST COLLECTIVE •
                </textPath>
              </text>
            </svg>
            <span>TLS</span>
          </div>
          <small>© All Rights Reserved 2026</small>
        </aside>

        <div className="contact-video__main">
          <div className="contact-video__contact">
            <p>Contact us</p>
            <a href={page === "contact" ? "#contact-form" : "/contact#contact-form"}>Book a call</a>
            <a href="mailto:hello@thelazystudio.com">hello@thelazystudio.com</a>
          </div>

          <form className="newsletter-form" aria-label="Newsletter signup">
            <label htmlFor={`newsletter-email-${page}`}>Newsletter</label>
            <p>Useful notes on design, websites, AI workflows, and working less loudly.</p>
            <div>
              <input id={`newsletter-email-${page}`} type="email" placeholder="Email address" />
              <button type="button">Subscribe</button>
            </div>
          </form>

          <h2 id="contact-title">
            Say Hello<span aria-hidden="true">!</span>
          </h2>
        </div>

        <nav className="contact-video__links" aria-label="Footer navigation">
          <a href={page === "home" ? "#home" : "/"}>Home</a>
          <a href="/portfolio">Portfolio</a>
          <a href="/blog">Blogs</a>
          <a href="/about">About us</a>
          <a href={page === "contact" ? "#contact-form" : "/contact"}>Contact</a>
        </nav>
      </div>
    </section>
  );
}

function ProjectVisual({ visual, className = "" }) {
  return (
    <div className={`${className} project-visual project-visual--${visual}`} aria-hidden="true">
      <span className="project-visual__glow" />
      <span className="project-visual__panel project-visual__panel--wide" />
      <span className="project-visual__panel project-visual__panel--chart" />
      <span className="project-visual__panel project-visual__panel--side" />
      <span className="project-visual__line project-visual__line--one" />
      <span className="project-visual__line project-visual__line--two" />
      <span className="project-visual__dot" />
    </div>
  );
}

function AboutPage() {
  return (
    <main className="site-shell about-page">
      <section className="about-page-hero" aria-labelledby="about-page-title">
        <SiteHeader activePage="about" />
        <img
          className="about-page-hero__image"
          src="/assets/lazy-studio-hero.png"
          alt="Cinematic red and blue lit creative technologist in a dark studio"
        />
        <div className="about-page-hero__shade" />
        <p className="about-page-hero__ghost" aria-hidden="true">
          About
        </p>
        <div className="about-page-hero__content">
          <p className="section-kicker">
            <span />
            About us
          </p>
          <h1 id="about-page-title">A smarter kind of studio.</h1>
          <p>
            The Lazy Studio is an AI-first boutique design and development
            collective for useful interfaces, sharp websites, and cleaner
            digital workflows.
          </p>
        </div>
      </section>

      <section className="about-breadcrumb-section" aria-label="Breadcrumb">
        <div className="about-breadcrumb-section__inner">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <span>About</span>
          </nav>
        </div>
      </section>

      <section className="about-story-section" aria-labelledby="about-story-title">
        <div className="about-story-section__inner">
          <aside className="about-story-intro">
            <p className="section-kicker">
              <span />
              The idea
            </p>
            <h2 id="about-story-title">We are lazy. Our work is not.</h2>
            <p>
              The studio exists for businesses that want the quality of a sharp
              agency without the theatre around it. Less noise, cleaner thinking,
              better execution.
            </p>
          </aside>

          <div className="about-story-panel">
            <blockquote>
              We combine strategy, design, development, and modern AI workflows
              to help teams make digital work that feels premium, useful, and
              easier to move forward.
            </blockquote>

            <div className="about-stat-grid">
              {aboutStats.map((stat) => (
                <article key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                  <p>{stat.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-beliefs-section" aria-labelledby="about-beliefs-title">
        <div className="about-beliefs-section__inner">
          <div className="about-section-heading">
            <p className="section-kicker">
              <span />
              What we believe
            </p>
            <h2 id="about-beliefs-title">Good digital work should feel obvious after it is done.</h2>
          </div>

          <div className="about-beliefs-grid">
            {aboutBeliefs.map((belief, index) => (
              <article key={belief.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{belief.title}</h3>
                <p>{belief.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-collective-section" aria-labelledby="about-collective-title">
        <div className="about-collective-section__inner">
          <figure className="about-collective-visual">
            <img
              src="/assets/marquee-consultant.png"
              alt="Creative strategist in a dark studio workspace"
            />
            <figcaption>
              <span>Collective mode</span>
              <strong>Strategy, design, code, AI, and launch support under one calm roof.</strong>
            </figcaption>
          </figure>

          <div className="about-collective-copy">
            <p className="section-kicker">
              <span />
              Collective, not solo act
            </p>
            <h2 id="about-collective-title">Built like a compact studio. Run like a focused product team.</h2>
            <p>
              The Lazy Studio brings together the skills most digital projects
              actually need: UX, interface design, websites, front-end thinking,
              AI workflow design, visual systems, and launch support.
            </p>
            <div className="about-role-cloud">
              {aboutRoles.map((role) => (
                <span key={role}>{role}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-clients-section" aria-labelledby="about-clients-title">
        <div className="about-clients-section__inner">
          <div className="about-section-heading">
            <p className="section-kicker">
              <span />
              Who we help
            </p>
            <h2 id="about-clients-title">Approachable for small teams. Polished enough for serious ones.</h2>
          </div>

          <div className="about-clients-grid">
            {aboutClientTypes.map((client) => (
              <article key={client.title}>
                <h3>{client.title}</h3>
                <p>{client.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-final-cta about-final-cta" aria-labelledby="about-final-title">
        <div className="services-final-cta__inner">
          <p className="section-kicker">
            <span />
            Work less. Mean more.
          </p>
          <h2 id="about-final-title">Have something worth making simpler?</h2>
          <p>
            Bring the goal, the rough edges, and the messy context. We will help
            shape it into a sharper interface, website, workflow, or launch system.
          </p>
          <div>
            <a className="button button--primary" href="#contact">
              Start a project
            </a>
            <a className="button button--secondary" href="/services">
              View services
            </a>
          </div>
        </div>
      </section>

      <SiteFooter page="about" />
    </main>
  );
}

function ContactPage() {
  const [formData, setFormData] = useState(initialContactForm);
  const [formStatus, setFormStatus] = useState("idle");
  const isSending = formStatus === "sending";

  const updateField = (event) => {
    const { checked, name, type, value } = event.target;

    if (formStatus === "sent") {
      setFormStatus("idle");
    }

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const chooseProjectType = (projectType) => {
    if (formStatus === "sent") {
      setFormStatus("idle");
    }

    setFormData((current) => ({
      ...current,
      projectType,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormStatus("sending");

    window.setTimeout(() => {
      setFormStatus("sent");
      setFormData({ ...initialContactForm });
    }, 650);
  };

  return (
    <main className="site-shell contact-page">
      <section className="contact-page-hero" aria-labelledby="contact-page-title">
        <SiteHeader activePage="contact" />
        <img
          className="contact-page-hero__image"
          src="/assets/lazy-studio-hero.png"
          alt="Cinematic red and blue lit creative technologist in a dark studio"
        />
        <div className="contact-page-hero__shade" />
        <p className="contact-page-hero__ghost" aria-hidden="true">
          Contact
        </p>
        <div className="contact-page-hero__content">
          <p className="section-kicker">
            <span />
            Contact
          </p>
          <h1 id="contact-page-title">Let’s make the work lighter.</h1>
          <p>
            Send the brief, the idea, the rough notes, or the thing that feels
            too tangled. We will help shape the cleanest next move.
          </p>
        </div>
      </section>

      <section className="contact-breadcrumb-section" aria-label="Breadcrumb">
        <div className="contact-breadcrumb-section__inner">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <span>Contact</span>
          </nav>
        </div>
      </section>

      <section className="contact-main-section" id="contact-form" aria-labelledby="contact-form-title">
        <div className="contact-main-section__inner">
          <aside className="contact-intro-panel">
            <p className="section-kicker">
              <span />
              Start here
            </p>
            <h2 id="contact-form-title">Bring the messy context.</h2>
            <p>
              You do not need a perfect brief. Tell us what you are trying to
              launch, fix, redesign, automate, or finally make easier to explain.
            </p>

            <div className="contact-detail-list">
              {contactDetails.map((detail) => (
                <article key={detail.label}>
                  <span>{detail.label}</span>
                  {detail.href ? (
                    <a href={detail.href}>{detail.value}</a>
                  ) : (
                    <strong>{detail.value}</strong>
                  )}
                </article>
              ))}
            </div>

            <div className="contact-fit-card">
              <span>Good fit if</span>
              <p>
                You need UI/UX, a website, product design, useful AI workflows,
                or a calmer digital partner around the work.
              </p>
            </div>
          </aside>

          <div className="contact-form-card">
            <div className="contact-form-card__heading">
              <h2>Tell us what you need.</h2>
              <p>Pick a direction, add the useful details, and keep it human.</p>
            </div>

            <div className="contact-project-chips" aria-label="Project type shortcuts">
              {contactProjectTypes.map((projectType) => (
                <button
                  type="button"
                  className={formData.projectType === projectType ? "is-selected" : ""}
                  aria-pressed={formData.projectType === projectType}
                  onClick={() => chooseProjectType(projectType)}
                  key={projectType}
                >
                  {projectType}
                </button>
              ))}
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form__row">
                <label>
                  <span>Name</span>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={updateField}
                    placeholder="Your name"
                    required
                  />
                </label>
                <label>
                  <span>Email</span>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={updateField}
                    placeholder="you@company.com"
                    required
                  />
                </label>
              </div>

              <label>
                <span>Company / brand</span>
                <input
                  name="company"
                  value={formData.company}
                  onChange={updateField}
                  placeholder="The name on the door, or the one in progress"
                />
              </label>

              <div className="contact-form__row">
                <label>
                  <span>Project type</span>
                  <select name="projectType" value={formData.projectType} onChange={updateField} required>
                    <option value="">Choose one</option>
                    {contactProjectTypes.map((projectType) => (
                      <option value={projectType} key={projectType}>
                        {projectType}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Budget range</span>
                  <select name="budget" value={formData.budget} onChange={updateField}>
                    <option value="">Not sure yet</option>
                    <option value="Starter">Starter project</option>
                    <option value="Focused sprint">Focused sprint</option>
                    <option value="Full build">Full website / product build</option>
                    <option value="Monthly support">Monthly support</option>
                  </select>
                </label>
              </div>

              <label>
                <span>Timeline</span>
                <select name="timeline" value={formData.timeline} onChange={updateField}>
                  <option value="">Flexible</option>
                  <option value="Soon">Soon, but sane</option>
                  <option value="4-8 weeks">4-8 weeks</option>
                  <option value="This quarter">This quarter</option>
                  <option value="Ongoing">Ongoing support</option>
                </select>
              </label>

              <label>
                <span>Project context</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={updateField}
                  placeholder="What are you trying to make, fix, launch, or simplify?"
                  rows="7"
                  required
                />
              </label>

              <label className="contact-form__checkbox">
                <input
                  name="needsBriefHelp"
                  type="checkbox"
                  checked={formData.needsBriefHelp}
                  onChange={updateField}
                />
                <span>I am not sure yet. Help me shape the brief.</span>
              </label>

              <div className="contact-form__footer">
                <button className="button button--primary" type="submit" disabled={isSending}>
                  {isSending ? "Sending..." : "Send enquiry"}
                </button>
                <p aria-live="polite">
                  {formStatus === "sent"
                    ? "Thanks. The frontend success state is working. Next step: connect this form to email."
                    : "No pressure, no pitch theatre. Just enough context to start properly."}
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="contact-steps-section" aria-labelledby="contact-steps-title">
        <div className="contact-steps-section__inner">
          <div className="contact-section-heading">
            <p className="section-kicker">
              <span />
              What happens next
            </p>
            <h2 id="contact-steps-title">Three moves. No dramatic intake ritual.</h2>
          </div>

          <div className="contact-steps-grid">
            {contactSteps.map((step, index) => (
              <article key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter page="contact" />
    </main>
  );
}

function HomePage() {
  const carouselRef = useRef(null);
  const marqueeRef = useRef(null);
  const dragState = useRef({ isDragging: false, startX: 0, scrollLeft: 0, didDrag: false });
  const virtualIndexRef = useRef(3);
  const normalizeTimer = useRef(null);
  const animationFrame = useRef(null);
  const pauseAutoUntil = useRef(0);
  const [activeService, setActiveService] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const loopedServices = [
    ...services.slice(-3),
    ...services,
    ...services.slice(0, 3),
  ];

  useEffect(() => {
    if (!window.location.hash) {
      return;
    }

    window.requestAnimationFrame(() => {
      document.querySelector(window.location.hash)?.scrollIntoView();
    });
  }, []);

  const getCarouselStep = () => {
    const carousel = carouselRef.current;
    const card = carousel?.querySelector(".service-card");

    if (!carousel || !card) {
      return null;
    }

    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap || "0");
    return card.offsetWidth + gap;
  };

  const getRealIndex = (virtualIndex) =>
    ((virtualIndex - 3) % services.length + services.length) % services.length;

  const normalizeLoopPosition = () => {
    const carousel = carouselRef.current;
    const step = getCarouselStep();

    if (!carousel || !step) {
      return;
    }

    let virtualIndex = virtualIndexRef.current;

    if (virtualIndex >= services.length + 3) {
      virtualIndex -= services.length;
    }

    if (virtualIndex < 3) {
      virtualIndex += services.length;
    }

    if (virtualIndex !== virtualIndexRef.current) {
      virtualIndexRef.current = virtualIndex;
      carousel.scrollTo({ left: virtualIndex * step, behavior: "auto" });
    }
  };

  const animateCarouselTo = (targetLeft, duration = 3600) => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    window.cancelAnimationFrame(animationFrame.current);
    const startLeft = carousel.scrollLeft;
    const distance = targetLeft - startLeft;
    const startTime = performance.now();
    const originalSnap = carousel.style.scrollSnapType;
    carousel.style.scrollSnapType = "none";

    const easeInOutCubic = (progress) =>
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    const tick = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      carousel.scrollLeft = startLeft + distance * easeInOutCubic(progress);

      if (progress < 1) {
        animationFrame.current = window.requestAnimationFrame(tick);
        return;
      }

      carousel.style.scrollSnapType = originalSnap;
    };

    animationFrame.current = window.requestAnimationFrame(tick);
  };

  const scrollToVirtualService = (virtualIndex, behavior = "smooth") => {
    const carousel = carouselRef.current;
    const step = getCarouselStep();

    if (!carousel || !step) {
      return;
    }

    window.clearTimeout(normalizeTimer.current);
    virtualIndexRef.current = virtualIndex;
    setActiveService(getRealIndex(virtualIndex));

    if (behavior === "smooth") {
      animateCarouselTo(virtualIndex * step);
    } else {
      carousel.scrollTo({ left: virtualIndex * step, behavior: "auto" });
    }

    normalizeTimer.current = window.setTimeout(normalizeLoopPosition, behavior === "smooth" ? 3700 : 0);
  };

  const scrollToService = (index) => {
    pauseAutoUntil.current = Date.now() + 6000;
    const realIndex = ((index % services.length) + services.length) % services.length;
    scrollToVirtualService(realIndex + 3);
  };

  useEffect(() => {
    const initializeCarousel = () => {
      const step = getCarouselStep();

      if (step && carouselRef.current) {
        carouselRef.current.scrollLeft = virtualIndexRef.current * step;
      }
    };

    window.requestAnimationFrame(initializeCarousel);
    window.addEventListener("resize", initializeCarousel);

    return () => window.removeEventListener("resize", initializeCarousel);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (Date.now() < pauseAutoUntil.current || dragState.current.isDragging) {
        return;
      }

      scrollToVirtualService(virtualIndexRef.current + 1);
    }, 11800);

    return () => {
      window.clearInterval(interval);
      window.cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  const handlePointerDown = (event) => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    dragState.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: carousel.scrollLeft,
      didDrag: false,
    };
    pauseAutoUntil.current = Date.now() + 7000;
    window.cancelAnimationFrame(animationFrame.current);
    carousel.style.scrollSnapType = "none";
    carousel.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const carousel = carouselRef.current;

    if (!carousel || !dragState.current.isDragging) {
      return;
    }

    const delta = event.clientX - dragState.current.startX;
    dragState.current.didDrag = Math.abs(delta) > 4;
    carousel.scrollLeft = dragState.current.scrollLeft - delta;
  };

  const handlePointerUp = (event) => {
    const carousel = carouselRef.current;
    const card = carousel?.querySelector(".service-card");

    if (!carousel || !card) {
      return;
    }

    dragState.current.isDragging = false;
    carousel.style.scrollSnapType = "";
    carousel.releasePointerCapture?.(event.pointerId);
    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap || "0");
    const index = Math.round(carousel.scrollLeft / (card.offsetWidth + gap));
    pauseAutoUntil.current = Date.now() + 7000;
    scrollToVirtualService(index);
  };

  useEffect(() => {
    const section = marqueeRef.current;

    if (!section) {
      return undefined;
    }

    let frame = 0;

    const updateMarquee = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const total = rect.height + viewport;
      const progress = Math.min(Math.max((viewport - rect.top) / total, 0), 1);
      section.style.setProperty("--marquee-progress", progress.toFixed(4));
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateMarquee);
    };

    updateMarquee();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <main className="site-shell">
      <section className="hero" id="home" aria-label="The Lazy Studio homepage hero">
        <img
          className="hero__image"
          src="/assets/lazy-studio-hero.png"
          alt="A cinematic red and blue lit creative technologist in a dark studio"
        />
        <div className="hero__shade" />
        <div className="hero__red-glow" />

        <SiteHeader activePage="home" />

        <div className="hero__content">
          <p className="hero__eyebrow">AI-first design and development collective</p>
          <h1>
            Work less.
            <span>Mean more.</span>
          </h1>
          <p className="hero__copy">
            Premium UI/UX, websites, digital products, and useful AI workflows.
            Human-crafted work with less unnecessary overhead.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#contact">
              Start a project
            </a>
            <a className="button button--secondary" href="/portfolio">
              See portfolio
            </a>
          </div>
        </div>

        <p className="hero__giant" aria-hidden="true">
          Lazy
        </p>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title">
        <div className="about-section__inner">
          <aside className="about-intro">
            <p className="section-kicker">
              <span />
              Who we are?
            </p>
            <blockquote>
              <strong>The Lazy Studio</strong> was built on a simple belief:
              digital work should feel sharper, smarter, and lighter to make.
              We blend strategy, design, development, and AI-assisted workflows
              to help brands move with more clarity and less clutter.
            </blockquote>
            <div className="studio-signature" aria-label="The Lazy Studio creative collective">
              <div className="studio-signature__mark">TLS</div>
              <div>
                <p>The Lazy Studio</p>
                <span>AI-first creative collective</span>
              </div>
            </div>
          </aside>

          <div className="about-divider" aria-hidden="true" />

          <div className="about-main">
            <h2 id="about-title">Useful interfaces. Sharp websites. AI that works.</h2>
            <a className="about-cta" href="#contact">
              Let's get started <span className="link-arrow" aria-hidden="true" />
            </a>

            <div className="about-cards">
              <article className="about-card">
                <span className="about-card__number">01</span>
                <h3>The studio story</h3>
                <p>
                  We are lazy about the right things: bloated process,
                  unnecessary meetings, and work that does not move the brand
                  forward. The craft stays awake.
                </p>
              </article>
              <article className="about-card">
                <span className="about-card__number">02</span>
                <h3>The target goal</h3>
                <p>
                  To help local businesses, startups, and SaaS teams ship
                  digital experiences that feel premium, perform clearly, and
                  make AI genuinely useful.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section" id="services" aria-labelledby="services-title">
        <div className="services-section__inner">
          <div className="services-heading">
            <p className="section-kicker">
              <span />
              Our Services
            </p>
            <h2 id="services-title">Design, build, and smarter workflows. Without the theatre.</h2>
            <p>
              We lead with product design and websites, then use AI where it
              actually improves speed, clarity, or operations.
            </p>
          </div>

          <div className="services-carousel-wrap">
            <div
              className="services-carousel"
              ref={carouselRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {loopedServices.map((service, index) => {
                const realIndex = getRealIndex(index);

                return (
                <article className="service-card service-card--slide" key={`${service.title}-${index}`}>
                <span className="service-card__number">{String(realIndex + 1).padStart(2, "0")}</span>
                <p className="service-card__label">{service.label}</p>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-card__tags" aria-label={`${service.title} includes`}>
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
              );
            })}
            </div>

            <div className="services-controls" aria-label="Services carousel controls">
              <button
                type="button"
                aria-label="Previous service"
                onClick={() => {
                  pauseAutoUntil.current = Date.now() + 9000;
                  scrollToVirtualService(virtualIndexRef.current - 1);
                }}
              >
                ←
              </button>
              <div className="services-progress" aria-hidden="true">
                {services.map((service, index) => (
                  <span
                    className={index === activeService ? "is-active" : ""}
                    key={service.title}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next service"
                onClick={() => {
                  pauseAutoUntil.current = Date.now() + 9000;
                  scrollToVirtualService(virtualIndexRef.current + 1);
                }}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="creativity-section" id="process" aria-labelledby="creativity-title">
        <div className="creativity-dots" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="orb-scene" aria-hidden="true">
          <div className="orb-ring orb-ring--back" />
          <div className="orb-core" />
          <div className="orb-ring orb-ring--front" />
          <div className="orb-moon" />
        </div>
        <div className="creativity-content">
          <h2 id="creativity-title">Effortless creativity for meaningful work.</h2>
          <p>
            We remove the heavy process, keep the thinking sharp, and use AI
            where it helps ideas move from brief to launch with less drag.
          </p>
          <a href="#contact">Start with a smarter workflow</a>
        </div>
      </section>

      <section className="scroll-marquee-section" id="motion" ref={marqueeRef} aria-label="The Lazy Studio capabilities in motion">
        <div className="scroll-marquee scroll-marquee--top">
          <span>Crafting sharp websites</span>
          <img src="/assets/marquee-strategist.png" alt="Creative strategist in a neon-lit studio" />
          <span>and digital systems</span>
          <img src="/assets/marquee-consultant.png" alt="Creative consultant in a modern campaign workspace" />
          <span>that feel effortless</span>
        </div>
        <div className="scroll-marquee scroll-marquee--bottom">
          <span>Designing the best interfaces</span>
          <img src="/assets/marquee-consultant.png" alt="" aria-hidden="true" />
          <span>for brands that move</span>
          <img src="/assets/marquee-strategist.png" alt="" aria-hidden="true" />
          <span>without the noise</span>
        </div>
      </section>

      <section className="projects-section" id="work" aria-labelledby="projects-title">
        <p className="projects-section__ghost" aria-hidden="true">
          Work
        </p>
        <div className="projects-section__inner">
          <div className="projects-heading">
            <p className="section-kicker">
              <span />
              Projects
            </p>
            <div>
              <h2 id="projects-title">Selected digital work, minus the filler.</h2>
              <p>
                A look at the kind of interfaces, websites, and AI-powered
                systems The Lazy Studio is built to craft.
              </p>
            </div>
            <a className="projects-heading__cta" href="#contact">
              Start yours <span className="link-arrow" aria-hidden="true" />
            </a>
          </div>

          <div className="projects-grid">
            <article className="project-card project-card--featured">
              <div className="project-card__visual project-visual project-visual--dashboard" aria-hidden="true">
                <span className="project-visual__glow" />
                <span className="project-visual__panel project-visual__panel--wide" />
                <span className="project-visual__panel project-visual__panel--chart" />
                <span className="project-visual__panel project-visual__panel--side" />
                <span className="project-visual__line project-visual__line--one" />
                <span className="project-visual__line project-visual__line--two" />
                <span className="project-visual__dot" />
              </div>
              <div className="project-card__content">
                <div className="project-card__meta">
                  <span>{projects[0].category}</span>
                  <span>{projects[0].type}</span>
                </div>
                <h3>{projects[0].title}</h3>
                <p>{projects[0].description}</p>
                <div className="project-card__tags">
                  {projects[0].tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="project-card__stats" aria-label="Project highlights">
                  {projects[0].stats.map((stat) => (
                    <strong key={stat}>{stat}</strong>
                  ))}
                </div>
              </div>
            </article>

            <div className="projects-stack">
              {projects.slice(1).map((project, index) => (
                <article className="project-card project-card--compact" key={project.title}>
                  <div className={`project-card__visual project-visual project-visual--${project.visual}`} aria-hidden="true">
                    <span className="project-visual__glow" />
                    <span className="project-visual__panel project-visual__panel--wide" />
                    <span className="project-visual__panel project-visual__panel--chart" />
                    <span className="project-visual__panel project-visual__panel--side" />
                    <span className="project-visual__line project-visual__line--one" />
                    <span className="project-visual__line project-visual__line--two" />
                    <span className="project-visual__dot" />
                  </div>
                  <div className="project-card__content">
                    <div className="project-card__meta">
                      <span>{project.category}</span>
                      <span>{project.type}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-card__tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <span className="project-card__number" aria-hidden="true">
                    {String(index + 2).padStart(2, "0")}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section" id="faqs" aria-labelledby="faq-title">
        <p className="faq-section__ghost" aria-hidden="true">
          FAQ
        </p>
        <div className="faq-section__inner">
          <aside className="faq-visual" aria-label="Frequently asked questions introduction">
            <p className="section-kicker">
              <span />
              FAQs
            </p>
            <h2 id="faq-title">Questions before we get pleasantly productive.</h2>
            <p>
              A few quick answers about working with The Lazy Studio, what we
              build, and where AI actually fits.
            </p>
            <img
              src="/assets/faq-liquid-blob.png"
              alt="Glossy black abstract liquid form"
              className="faq-visual__blob"
            />
          </aside>

          <div className="faq-list">
            {faqItems.map((item, index) => {
              const isOpen = activeFaq === index;
              const answerId = `faq-answer-${index}`;

              return (
                <article className={isOpen ? "faq-item is-open" : "faq-item"} key={item.question}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                  >
                    <span className="faq-item__index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="faq-item__question">{item.question}</span>
                    <span className="faq-item__toggle" aria-hidden="true" />
                  </button>
                  <div className="faq-item__answer" id={answerId} aria-hidden={!isOpen}>
                    <p>{item.answer}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="testimonials-section" id="testimonials" aria-labelledby="testimonials-title">
        <div className="testimonials-heading">
          <p className="testimonials-kicker">
            <span />
            What clients say about us?
          </p>
          <h2 id="testimonials-title">
            We’re here for the teams who want sharper work with less drag.
          </h2>
        </div>

        <div className="testimonials-carousel" aria-label="Client testimonials carousel">
          <div className="testimonials-track">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <article
                className="testimonial-card"
                aria-hidden={index >= testimonials.length}
                key={`${testimonial.name}-${index}`}
              >
                <p>{testimonial.quote}</p>
                <div className="testimonial-author">
                  <span className="testimonial-author__avatar">{testimonial.initials}</span>
                  <span>
                    <strong>{testimonial.name}</strong>
                    <small>{testimonial.role}</small>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="blog-section" id="blog" aria-labelledby="blog-title">
        <div className="blog-section__inner">
          <div className="blog-heading">
            <h2 id="blog-title">Latest Blogs</h2>
            <a className="blog-heading__cta" href="/blog">
              More blogs <span className="link-arrow" aria-hidden="true" />
            </a>
          </div>

          <div className="blog-grid">
            {blogPosts.slice(0, 3).map((post) => (
              <article
                className={post.featured ? "blog-card blog-card--featured" : "blog-card"}
                key={post.title}
              >
                <div className="blog-card__media">
                  <img src={post.image} alt={post.alt} />
                </div>
                <div className="blog-card__content">
                  <time dateTime={post.datetime}>{post.date}</time>
                  <h3>{post.title}</h3>
                  {!post.featured && <p>{post.excerpt}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="logos-section" aria-label="Selected brand marks carousel">
        <div className="logos-track">
          {[...logoMarks, ...logoMarks].map((logo, index) => (
            <div
              className={`logo-card logo-card--${logo.shape} logo-card--${logo.tone}`}
              aria-hidden={index >= logoMarks.length}
              key={`${logo.name}-${index}`}
            >
              <span className="logo-card__mark">{logo.mark}</span>
              <span className="logo-card__name">{logo.name}</span>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter page="home" />
    </main>
  );
}

function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const featuredProject = portfolioProjects.find((project) => project.featured) ?? portfolioProjects[0];
  const filteredProjects = portfolioProjects.filter((project) => {
    const matchesFilter = activeFilter === "All" || project.category === activeFilter;

    return !project.featured && matchesFilter;
  });

  return (
    <main className="site-shell portfolio-page">
      <section className="portfolio-page-hero" aria-labelledby="portfolio-page-title">
        <SiteHeader activePage="portfolio" />
        <img
          className="portfolio-page-hero__image"
          src="/assets/lazy-studio-hero.png"
          alt="Cinematic red and blue lit creative technologist in a dark studio"
        />
        <div className="portfolio-page-hero__shade" />
        <p className="portfolio-page-hero__ghost" aria-hidden="true">
          Portfolio
        </p>
        <div className="portfolio-page-hero__content">
          <p className="section-kicker">
            <span />
            Portfolio
          </p>
          <h1 id="portfolio-page-title">Selected work, minus the filler.</h1>
          <p>
            Interfaces, websites, AI workflows, and digital systems shaped for
            clarity, usefulness, and a little less noise.
          </p>
        </div>
      </section>

      <section className="portfolio-breadcrumb-section" aria-label="Breadcrumb">
        <div className="portfolio-breadcrumb-section__inner">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <span>Portfolio</span>
          </nav>
        </div>
      </section>

      <section className="portfolio-featured-section" aria-labelledby="portfolio-featured-title">
        <div className="portfolio-featured-section__inner">
          <div className="portfolio-featured-heading">
            <p className="section-kicker">
              <span />
              Featured project
            </p>
            <h2 id="portfolio-featured-title">A closer look at the kind of digital work we make.</h2>
          </div>

          <article className="portfolio-feature-card">
            <ProjectVisual visual={featuredProject.visual} className="portfolio-feature-card__visual" />
            <div className="portfolio-feature-card__content">
              <div className="portfolio-card__meta">
                <span>{featuredProject.service}</span>
                <span>{featuredProject.type}</span>
              </div>
              <h3>{featuredProject.title}</h3>
              <p>{featuredProject.description}</p>
              <div className="portfolio-card__tags">
                {featuredProject.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="portfolio-card__stats">
                {featuredProject.stats.map((stat) => (
                  <strong key={stat}>{stat}</strong>
                ))}
              </div>
              <a href={featuredProject.href}>
                View case study <span className="link-arrow" aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="portfolio-grid-section" aria-labelledby="portfolio-grid-title">
        <div className="portfolio-grid-section__inner">
          <div className="portfolio-grid-heading">
            <div>
              <p className="section-kicker">
                <span />
                Project archive
              </p>
              <h2 id="portfolio-grid-title">Browse by the kind of problem being solved.</h2>
            </div>
            <div className="portfolio-filter-row" aria-label="Portfolio filters">
              {portfolioFilters.map((filter) => (
                <button
                  type="button"
                  className={activeFilter === filter ? "is-active" : ""}
                  onClick={() => setActiveFilter(filter)}
                  key={filter}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="portfolio-project-grid">
            {filteredProjects.map((project, index) => (
              <article className="portfolio-project-card" key={project.title}>
                <ProjectVisual visual={project.visual} className="portfolio-project-card__visual" />
                <div className="portfolio-project-card__content">
                  <div className="portfolio-card__meta">
                    <span>{project.service}</span>
                    <span>{project.type}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="portfolio-card__tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <a href={project.href}>
                    View case study <span className="link-arrow" aria-hidden="true" />
                  </a>
                </div>
                <span className="portfolio-project-card__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio-note-section" aria-label="Concept project note">
        <div className="portfolio-note-section__inner">
          <strong>Concept projects, clearly labelled.</strong>
          <p>
            Some projects are concept builds created to show how we think,
            design, and solve. Real client work will be added as the studio grows.
          </p>
        </div>
      </section>

      <section className="portfolio-capabilities-section" aria-labelledby="portfolio-capabilities-title">
        <div className="portfolio-capabilities-section__inner">
          <div className="portfolio-capabilities-heading">
            <p className="section-kicker">
              <span />
              Capabilities in the work
            </p>
            <h2 id="portfolio-capabilities-title">The portfolio points back to the real offer.</h2>
          </div>
          <div className="portfolio-capabilities-grid">
            {servicePageServices.slice(0, 5).map((service) => (
              <a href={service.href} key={service.title}>
                <span>{service.kicker}</span>
                <strong>{service.title}</strong>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="services-final-cta portfolio-final-cta" aria-labelledby="portfolio-final-title">
        <div className="services-final-cta__inner">
          <p className="section-kicker">
            <span />
            Start here
          </p>
          <h2 id="portfolio-final-title">Have something worth making simpler?</h2>
          <p>
            Bring the messy brief. We will help turn it into a sharper interface,
            website, workflow, or launch system.
          </p>
          <div>
            <a className="button button--primary" href="#contact">
              Start a project
            </a>
            <a className="button button--secondary" href="/services">
              View services
            </a>
          </div>
        </div>
      </section>

      <SiteFooter page="portfolio" />
    </main>
  );
}

function ServicesPage() {
  return (
    <main className="site-shell services-page">
      <section className="services-page-hero" aria-labelledby="services-page-title">
        <SiteHeader activePage="services" />
        <img
          className="services-page-hero__image"
          src="/assets/lazy-studio-hero.png"
          alt="Cinematic red and blue lit creative technologist in a dark studio"
        />
        <div className="services-page-hero__shade" />
        <p className="services-page-hero__ghost" aria-hidden="true">
          Services
        </p>
        <div className="services-page-hero__content">
          <p className="section-kicker">
            <span />
            Services
          </p>
          <h1 id="services-page-title">Services that do the useful parts well.</h1>
          <p>
            UI/UX design, sharp websites, digital product systems, and AI-powered
            workflows for teams that want better digital work with less drag.
          </p>
        </div>
      </section>

      <section className="services-breadcrumb-section" aria-label="Breadcrumb">
        <div className="services-breadcrumb-section__inner">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <span>Services</span>
          </nav>
        </div>
      </section>

      <section className="services-overview" aria-labelledby="services-overview-title">
        <div className="services-overview__inner">
          <div className="services-overview__heading">
            <p className="section-kicker">
              <span />
              What we do
            </p>
            <h2 id="services-overview-title">Design and development first. Smart support around it.</h2>
            <p>
              The core offer is simple: make the interface better, make the
              website stronger, and use AI where it actually improves the work.
            </p>
          </div>

          <div className="service-page-grid">
            {servicePageServices.map((service, index) => (
              <article
                className={`service-page-card service-page-card--${service.tone}`}
                id={service.href.split("/").pop()}
                key={service.title}
              >
                <div className="service-page-card__top">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <small>{service.kicker}</small>
                </div>
                <h3>{service.title}</h3>
                <strong>{service.line}</strong>
                <p>{service.description}</p>
                <div className="service-page-card__tags">
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <a href={service.href}>
                  Explore service <span className="link-arrow" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-breakdown" aria-labelledby="service-breakdown-title">
        <div className="service-breakdown__inner">
          <aside className="service-breakdown__intro">
            <p className="section-kicker">
              <span />
              Service architecture
            </p>
            <h2 id="service-breakdown-title">A clean stack for serious digital work.</h2>
            <p>
              We keep the primary work in focus and place branding, marketing,
              SEO, ads, and maintenance where they belong: supporting the thing
              people actually use.
            </p>
          </aside>

          <div className="service-breakdown__list">
            {servicePageServices.slice(0, 3).map((service, index) => (
              <article className="service-breakdown-row" key={service.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <a href={service.href} aria-label={`Open ${service.title}`}>
                  <span className="link-arrow" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="addons-section" aria-labelledby="addons-title">
        <div className="addons-section__inner">
          <div>
            <p className="section-kicker">
              <span />
              Add-ons
            </p>
            <h2 id="addons-title">Marketing support, but not the main character.</h2>
          </div>
          <div className="addons-cloud">
            {supportAddOns.map((addon) => (
              <span key={addon}>{addon}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="audience-section" aria-labelledby="audience-title">
        <div className="audience-section__inner">
          <div className="audience-section__heading">
            <p className="section-kicker">
              <span />
              Who it helps
            </p>
            <h2 id="audience-title">Built for businesses that need clarity, not theatre.</h2>
          </div>
          <div className="audience-grid">
            {serviceAudiences.map((audience) => (
              <article key={audience.title}>
                <h3>{audience.title}</h3>
                <p>{audience.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="packages-section" id="packages" aria-labelledby="packages-title">
        <div className="packages-section__inner">
          <div className="packages-heading">
            <p className="section-kicker">
              <span />
              Packages
            </p>
            <h2 id="packages-title">Engagements shaped around the job.</h2>
            <p>
              Pricing depends on scope, but the entry points stay clear:
              launch something, improve a product, or keep a smart studio in
              your corner.
            </p>
          </div>

          <div className="packages-grid">
            {servicePackages.map((pack, index) => (
              <article className={index === 1 ? "package-card package-card--featured" : "package-card"} key={pack.name}>
                <span className="package-card__number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{pack.name}</h3>
                <strong>{pack.price}</strong>
                <p>{pack.bestFor}</p>
                <ul>
                  {pack.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a href="#contact">
                  Discuss package <span className="link-arrow" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-process" aria-labelledby="service-process-title">
        <div className="service-process__inner">
          <p className="section-kicker">
            <span />
            Process preview
          </p>
          <h2 id="service-process-title">Understand. Design. Build. Improve.</h2>
          <div className="service-process__steps">
            {["Understand", "Design", "Build", "Improve"].map((step, index) => (
              <article key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-faq" aria-labelledby="services-faq-title">
        <div className="services-faq__inner">
          <div className="services-faq__heading">
            <p className="section-kicker">
              <span />
              FAQs
            </p>
            <h2 id="services-faq-title">A few service questions, answered cleanly.</h2>
          </div>
          <div className="services-faq__list">
            {servicesPageFaqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="services-final-cta" aria-labelledby="services-final-title">
        <div className="services-final-cta__inner">
          <p className="section-kicker">
            <span />
            Start here
          </p>
          <h2 id="services-final-title">Need the useful parts handled?</h2>
          <p>
            Tell us what you are trying to launch, fix, or simplify. We will
            help shape the cleanest next move.
          </p>
          <div>
            <a className="button button--primary" href="#contact">
              Start a project
            </a>
            <a className="button button--secondary" href="/portfolio">
              See portfolio
            </a>
          </div>
        </div>
      </section>

      <SiteFooter page="services" />
    </main>
  );
}

function ProcessPage() {
  return (
    <main className="site-shell process-page">
      <section className="process-page-hero" aria-labelledby="process-page-title">
        <SiteHeader activePage="process" />
        <img
          className="process-page-hero__image"
          src="/assets/lazy-studio-hero.png"
          alt="Cinematic red and blue lit creative technologist in a dark studio"
        />
        <div className="process-page-hero__shade" />
        <p className="process-page-hero__ghost" aria-hidden="true">
          Process
        </p>
        <div className="process-page-hero__content">
          <p className="section-kicker">
            <span />
            Process
          </p>
          <h1 id="process-page-title">Less process. Better progress.</h1>
          <p>
            A lean, AI-first way to move from messy brief to useful interface,
            sharp website, smarter workflow, and cleaner launch.
          </p>
        </div>
      </section>

      <section className="process-breadcrumb-section" aria-label="Breadcrumb">
        <div className="process-breadcrumb-section__inner">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <span>Process</span>
          </nav>
        </div>
      </section>

      <section className="process-philosophy" aria-labelledby="process-philosophy-title">
        <div className="process-philosophy__inner">
          <div className="process-section-heading">
            <p className="section-kicker">
              <span />
              Philosophy
            </p>
            <h2 id="process-philosophy-title">We remove the extra, not the thinking.</h2>
            <p>
              The Lazy Studio keeps collaboration light and decisions sharp.
              Fewer handoffs, clearer checkpoints, and enough structure to make
              the work feel calm instead of chaotic.
            </p>
          </div>

          <div className="process-principles-grid">
            {processPrinciples.map((principle, index) => (
              <article key={principle.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="process-timeline-section" aria-labelledby="process-timeline-title">
        <div className="process-timeline-section__inner">
          <aside className="process-timeline-intro">
            <p className="section-kicker">
              <span />
              Timeline
            </p>
            <h2 id="process-timeline-title">Six moves. No theatre.</h2>
            <p>
              Every project is different, but the rhythm stays simple: understand
              the problem, shape the path, make the thing, and improve it with
              useful intelligence.
            </p>
          </aside>

          <div className="process-timeline-list">
            {processSteps.map((step, index) => (
              <article key={step.title}>
                <span className="process-timeline-list__number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <small>{step.label}</small>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <div className="process-chip-row">
                    {step.deliverables.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="process-ai-section" aria-labelledby="process-ai-title">
        <div className="process-ai-section__inner">
          <div>
            <p className="section-kicker">
              <span />
              AI-first workflow
            </p>
            <h2 id="process-ai-title">AI assists. Humans decide.</h2>
          </div>
          <div className="process-ai-panel">
            <p>
              We use AI to move faster through the boring, repetitive, or
              exploratory parts of the work. The final direction still comes
              from strategy, taste, and what the user actually needs.
            </p>
            <div className="process-ai-grid">
              {aiWorkflowItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="process-collaboration-section" aria-labelledby="process-collaboration-title">
        <div className="process-collaboration-section__inner">
          <div className="process-section-heading">
            <p className="section-kicker">
              <span />
              Collaboration
            </p>
            <h2 id="process-collaboration-title">How the work should feel.</h2>
            <p>
              Approachable for small businesses, serious enough for startups,
              and clear enough that nobody has to pretend complexity is progress.
            </p>
          </div>

          <div className="process-collaboration-grid">
            {collaborationItems.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="process-deliverables-section" aria-labelledby="process-deliverables-title">
        <div className="process-deliverables-section__inner">
          <div className="process-section-heading">
            <p className="section-kicker">
              <span />
              What you get
            </p>
            <h2 id="process-deliverables-title">Useful outputs, grouped by the job.</h2>
          </div>

          <div className="process-deliverables-grid">
            {processDeliverables.map((group) => (
              <article key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="process-inputs-section" aria-labelledby="process-inputs-title">
        <div className="process-inputs-section__inner">
          <div>
            <p className="section-kicker">
              <span />
              What we need
            </p>
            <h2 id="process-inputs-title">No 90-page brief required.</h2>
            <p>
              A clear conversation is a good start. These details simply help us
              move faster once the project begins.
            </p>
          </div>
          <div className="process-inputs-list">
            {processInputs.map((input) => (
              <span key={input}>{input}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="services-faq process-faq-section" aria-labelledby="process-faq-title">
        <div className="services-faq__inner">
          <div className="services-faq__heading">
            <p className="section-kicker">
              <span />
              FAQs
            </p>
            <h2 id="process-faq-title">Process questions, answered without ceremony.</h2>
          </div>
          <div className="services-faq__list">
            {processPageFaqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="services-final-cta process-final-cta" aria-labelledby="process-final-title">
        <div className="services-final-cta__inner">
          <p className="section-kicker">
            <span />
            Start here
          </p>
          <h2 id="process-final-title">Ready to make the work lighter?</h2>
          <p>
            Bring the goal, the constraints, and the messy parts. We will help
            shape the cleanest route from idea to launch.
          </p>
          <div>
            <a className="button button--primary" href="#contact">
              Start a project
            </a>
            <a className="button button--secondary" href="/services">
              View services
            </a>
          </div>
        </div>
      </section>

      <SiteFooter page="process" />
    </main>
  );
}

function FAQPageAccordionItem({ item, itemKey, index, openQuestion, setOpenQuestion }) {
  const isOpen = openQuestion === itemKey;
  const answerId = `faq-page-answer-${itemKey}`;

  return (
    <article className={isOpen ? "faq-page-item is-open" : "faq-page-item"}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={answerId}
        onClick={() => setOpenQuestion(isOpen ? null : itemKey)}
      >
        <span className="faq-page-item__index">{String(index + 1).padStart(2, "0")}</span>
        <span className="faq-page-item__question">{item.question}</span>
        <span className="faq-page-item__toggle" aria-hidden="true" />
      </button>
      <div className="faq-page-item__answer" id={answerId} aria-hidden={!isOpen}>
        <p>{item.answer}</p>
      </div>
    </article>
  );
}

function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openQuestion, setOpenQuestion] = useState("featured-0");
  const visibleGroups = activeCategory === "All"
    ? faqPageGroups
    : faqPageGroups.filter((group) => group.category === activeCategory);

  return (
    <main className="site-shell faq-page">
      <section className="faq-page-hero" aria-labelledby="faq-page-title">
        <SiteHeader activePage="faq" />
        <img
          className="faq-page-hero__image"
          src="/assets/lazy-studio-hero.png"
          alt="Cinematic red and blue lit creative technologist in a dark studio"
        />
        <div className="faq-page-hero__shade" />
        <p className="faq-page-hero__ghost" aria-hidden="true">
          FAQs
        </p>
        <div className="faq-page-hero__content">
          <p className="section-kicker">
            <span />
            FAQs
          </p>
          <h1 id="faq-page-title">Questions, minus the runaround.</h1>
          <p>
            Clear answers about services, process, pricing, AI workflows,
            websites, launch support, and working with The Lazy Studio.
          </p>
        </div>
      </section>

      <section className="faq-breadcrumb-section" aria-label="Breadcrumb">
        <div className="faq-breadcrumb-section__inner">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <span>FAQs</span>
          </nav>
        </div>
      </section>

      <section className="faq-category-section" aria-labelledby="faq-category-title">
        <div className="faq-category-section__inner">
          <div className="faq-page-heading">
            <p className="section-kicker">
              <span />
              Find your answer
            </p>
            <h2 id="faq-category-title">Pick the thing you are wondering about.</h2>
          </div>

          <div className="faq-category-row" aria-label="FAQ categories">
            {faqPageCategories.map((category) => (
              <button
                type="button"
                className={activeCategory === category ? "is-active" : ""}
                aria-pressed={activeCategory === category}
                onClick={() => {
                  const nextGroup = category === "All" ? faqPageGroups[0] : faqPageGroups.find((group) => group.category === category);

                  setActiveCategory(category);
                  setOpenQuestion(nextGroup ? `${nextGroup.category}-0` : null);
                  window.requestAnimationFrame(() => {
                    document.getElementById("faq-groups")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  });
                }}
                key={category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-featured-section" aria-labelledby="faq-featured-title">
        <div className="faq-featured-section__inner">
          <aside className="faq-featured-intro">
            <p className="section-kicker">
              <span />
              Start here
            </p>
            <h2 id="faq-featured-title">The questions most people ask first.</h2>
            <p>
              If you only skim one section, make it this one. It covers the
              shape of the studio, what we make, how AI fits, and how pricing starts.
            </p>
          </aside>

          <div className="faq-page-list">
            {featuredFaqs.map((item, index) => (
              <FAQPageAccordionItem
                item={item}
                itemKey={`featured-${index}`}
                index={index}
                openQuestion={openQuestion}
                setOpenQuestion={setOpenQuestion}
                key={item.question}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="faq-groups-section" id="faq-groups" aria-labelledby="faq-groups-title">
        <div className="faq-groups-section__inner">
          <div className="faq-page-heading">
            <p className="section-kicker">
              <span />
              Details
            </p>
            <h2 id="faq-groups-title">More answers, grouped by topic.</h2>
          </div>

          <div className="faq-group-stack">
            {visibleGroups.map((group) => (
              <section className="faq-group" aria-labelledby={`faq-group-${group.category}`} key={group.category}>
                <div className="faq-group__intro">
                  <span>{group.category}</span>
                  <h3 id={`faq-group-${group.category}`}>{group.title}</h3>
                  <p>{group.description}</p>
                </div>
                <div className="faq-page-list">
                  {group.items.map((item, index) => (
                    <FAQPageAccordionItem
                      item={item}
                      itemKey={`${group.category}-${index}`}
                      index={index}
                      openQuestion={openQuestion}
                      setOpenQuestion={setOpenQuestion}
                      key={item.question}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="services-final-cta faq-final-cta" aria-labelledby="faq-final-title">
        <div className="services-final-cta__inner">
          <p className="section-kicker">
            <span />
            Still curious?
          </p>
          <h2 id="faq-final-title">Still got questions? Good.</h2>
          <p>
            Send the messy context. We will help you find the clean next step,
            even if the first step is just making sense of the brief.
          </p>
          <div>
            <a className="button button--primary" href="#contact">
              Start a project
            </a>
            <a className="button button--secondary" href="/services">
              View services
            </a>
          </div>
        </div>
      </section>

      <SiteFooter page="faq" />
    </main>
  );
}

function BlogListingPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const searchable = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();

    return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
  });

  return (
    <main className="site-shell blog-listing-page">
      <section className="blog-listing-hero" aria-labelledby="blog-listing-title">
        <SiteHeader activePage="blog" />
        <img
          className="blog-listing-hero__image"
          src="/assets/lazy-studio-hero.png"
          alt="Cinematic red and blue lit creative technologist in a dark studio"
        />
        <div className="blog-listing-hero__shade" />
        <div className="blog-listing-hero__content">
          <p className="section-kicker">
            <span />
            Insights
          </p>
          <h1 id="blog-listing-title">Blog</h1>
          <p>
            Notes on sharper websites, better interfaces, useful AI workflows,
            and quieter ways to make digital work mean more.
          </p>
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <span>Blog</span>
          </nav>
        </div>
      </section>

      <section className="blog-listing-section" id="blog-list" aria-label="Blog listing">
        <div className="blog-listing-section__inner">
          <div className="blog-listing-layout">
            <div className="blog-listing-feed">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <article className="listing-post-card" key={post.title}>
                    <a className="listing-post-card__media" href="/blog" aria-label={post.title}>
                      <img src={post.image} alt={post.alt} />
                    </a>
                    <div className="listing-post-card__content">
                      <div className="listing-post-card__meta">
                        <time dateTime={post.datetime}>{post.date}</time>
                        <span>By {post.author}</span>
                        <span>Comments({post.comments})</span>
                      </div>
                      <h2>{post.title}</h2>
                      <p>{post.excerpt}</p>
                      <a className="listing-post-card__link" href="/blog">
                        Read more <span className="link-arrow" aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                ))
              ) : (
                <div className="blog-empty-state">
                  <h2>No quiet wisdom found.</h2>
                  <p>Try another search or reset the category filter.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setActiveCategory("All");
                    }}
                  >
                    Reset filters
                  </button>
                </div>
              )}

              <nav className="blog-pagination" aria-label="Blog pagination">
                <a className="is-active" href="/blog" aria-label="Page 1">
                  1
                </a>
                <a href="/blog" aria-label="Page 2">
                  2
                </a>
                <a href="/blog" aria-label="Next page">
                  &raquo;
                </a>
              </nav>
            </div>

            <aside className="blog-sidebar" aria-label="Blog sidebar">
              <form
                className="blog-sidebar-card blog-search"
                onSubmit={(event) => event.preventDefault()}
              >
                <label htmlFor="blog-search">Search</label>
                <div>
                  <input
                    id="blog-search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search..."
                  />
                  <button type="submit" aria-label="Search posts">
                    Search
                  </button>
                </div>
              </form>

              <div className="blog-sidebar-card">
                <h2>Recent posts</h2>
                <div className="recent-posts">
                  {blogPosts.slice(0, 3).map((post) => (
                    <a className="recent-post" href="/blog" key={post.title}>
                      <img src={post.image} alt="" aria-hidden="true" />
                      <span>
                        <small>{post.date}</small>
                        <strong>{post.title}</strong>
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="blog-sidebar-card">
                <h2>Category</h2>
                <div className="category-list">
                  <button
                    type="button"
                    className={activeCategory === "All" ? "is-active" : ""}
                    onClick={() => setActiveCategory("All")}
                  >
                    <span>All posts</span>
                    <strong>{blogPosts.length}</strong>
                  </button>
                  {blogCategories.map((category) => (
                    <button
                      type="button"
                      className={activeCategory === category.name ? "is-active" : ""}
                      onClick={() => setActiveCategory(category.name)}
                      key={category.name}
                    >
                      <span>{category.name}</span>
                      <strong>{category.count}</strong>
                    </button>
                  ))}
                </div>
              </div>

              <div className="blog-sidebar-card">
                <h2>Popular tags</h2>
                <div className="tag-cloud">
                  {blogTags.map((tag) => (
                    <a href="/blog" key={tag}>
                      {tag}
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <SiteFooter page="blog" />
    </main>
  );
}

export function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";

  if (pathname === "/blog" || pathname === "/blogs") {
    return <BlogListingPage />;
  }

  if (pathname === "/portfolio" || pathname === "/work" || pathname.startsWith("/portfolio/") || pathname.startsWith("/work/")) {
    return <PortfolioPage />;
  }

  if (pathname === "/process") {
    return <ProcessPage />;
  }

  if (pathname === "/faq" || pathname === "/faqs") {
    return <FAQPage />;
  }

  if (pathname === "/about" || pathname === "/about-us") {
    return <AboutPage />;
  }

  if (pathname === "/contact") {
    return <ContactPage />;
  }

  if (pathname === "/services" || pathname.startsWith("/services/")) {
    return <ServicesPage />;
  }

  return <HomePage />;
}
