/**
 * Portfolio projects and their filter categories.
 *
 * Site content - see .claude/rules/structure.md.
 * Content is data, never JSX. Do not add markup to these strings.
 */

import type { PortfolioFilter, PortfolioProject, Project } from "@/@types";

export const projects: readonly Project[] = [
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

export const portfolioFilters: readonly PortfolioFilter[] = [
  "All",
  "UI/UX",
  "Websites",
  "AI Workflows",
  "Branding",
  "Marketing",
];

export const portfolioProjects: readonly PortfolioProject[] = [
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
