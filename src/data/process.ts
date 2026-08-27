/**
 * How the studio works: principles, steps, deliverables, inputs.
 *
 * Site content - see .claude/rules/structure.md.
 * Content is data, never JSX. Do not add markup to these strings.
 */

import type { ProcessDeliverable, ProcessStep, TitledItem } from "@/@types";

export const processPrinciples: readonly TitledItem[] = [
  {
    title: "Clarity first",
    description:
      "We find the real problem, the useful outcome, and the cleanest path before pixels or code start moving.",
  },
  {
    title: "Craft always",
    description:
      "Lean does not mean lazy work. It means fewer distractions around the thinking, design, and build quality.",
  },
  {
    title: "AI where useful",
    description:
      "AI supports research, prototypes, workflows, and QA. Taste, direction, and final decisions stay human.",
  },
];

export const processSteps: readonly ProcessStep[] = [
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

export const aiWorkflowItems: readonly string[] = [
  "Research and synthesis",
  "Rapid prototype exploration",
  "Content structure support",
  "Code assistance and QA",
  "Workflow mapping",
  "Automation planning",
];

export const collaborationItems: readonly TitledItem[] = [
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
    description:
      "We ask for feedback at the moments where it improves the work, not just fills the calendar.",
  },
  {
    title: "No busywork",
    description:
      "The process exists to protect the outcome, not to make the project look more complicated.",
  },
];

export const processDeliverables: readonly ProcessDeliverable[] = [
  {
    title: "Website projects",
    items: [
      "Strategy",
      "Sitemap",
      "Page design",
      "Responsive build",
      "SEO basics",
      "Launch support",
    ],
  },
  {
    title: "UI/UX projects",
    items: [
      "UX audit",
      "User flows",
      "Wireframes",
      "UI screens",
      "Prototype",
      "Design system direction",
    ],
  },
  {
    title: "AI workflow projects",
    items: [
      "Workflow map",
      "Prototype",
      "Integration plan",
      "Automation logic",
      "Internal tool UI",
      "QA notes",
    ],
  },
  {
    title: "Ongoing support",
    items: [
      "Maintenance",
      "Improvements",
      "Campaign creatives",
      "Reporting",
      "Optimization",
      "Small builds",
    ],
  },
];

export const processInputs: readonly string[] = [
  "Brand assets",
  "Current website or product access",
  "Business goals",
  "Reference sites or products",
  "Content direction",
  "Decision maker",
  "Launch timeline",
];
