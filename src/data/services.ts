/**
 * Service offerings, add-ons, audiences, and packages.
 *
 * Site content - see .claude/rules/structure.md.
 * Content is data, never JSX. Do not add markup to these strings.
 */

import type { Service, ServicePackage, ServicePageService, TitledItem } from "@/@types";

export const services: readonly Service[] = [
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

export const servicePageServices: readonly ServicePageService[] = [
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

export const supportAddOns: readonly string[] = [
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

export const serviceAudiences: readonly TitledItem[] = [
  {
    title: "Local businesses",
    description:
      "Modern websites, clearer service pages, trust signals, and enquiry paths that make the business feel current.",
  },
  {
    title: "Startup founders",
    description:
      "Launch pages, MVP interfaces, pitch-ready product flows, and quick AI prototypes without heavy agency drag.",
  },
  {
    title: "SaaS teams",
    description:
      "UX audits, redesigns, front-end support, design systems, and product screens that reduce friction.",
  },
  {
    title: "Growing businesses",
    description:
      "A reliable digital partner for websites, product improvements, campaigns, automation, and ongoing optimization.",
  },
];

export const servicePackages: readonly ServicePackage[] = [
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
    includes: [
      "Priority backlog",
      "Design/dev updates",
      "AI workflow support",
      "Performance review",
    ],
  },
];
