/**
 * Studio stats, beliefs, roles, and client types.
 *
 * Site content - see .claude/rules/structure.md.
 * Content is data, never JSX. Do not add markup to these strings.
 */

import type { AboutStat, TitledItem } from "@/@types";

export const aboutStats: readonly AboutStat[] = [
  {
    value: "AI-first",
    label: "Workflow",
    description:
      "Modern tools help us move faster through research, structure, prototypes, build support, and QA.",
  },
  {
    value: "Human",
    label: "Craft",
    description:
      "Taste, strategy, writing, hierarchy, interaction, and final decisions stay firmly human-led.",
  },
  {
    value: "Less",
    label: "Overhead",
    description:
      "Fewer unnecessary layers, clearer communication, and more attention on the work people actually use.",
  },
];

export const aboutBeliefs: readonly TitledItem[] = [
  {
    title: "Design should make decisions easier.",
    description:
      "Good interfaces reduce guessing. They guide people, clarify next steps, and make the important parts feel obvious.",
  },
  {
    title: "Websites should earn attention quickly.",
    description:
      "A strong site explains the offer, builds trust, and gives visitors a clean path without making them work for it.",
  },
  {
    title: "AI should be useful, not decorative.",
    description:
      "We use AI to support real workflows, better prototypes, smarter operations, and faster learning.",
  },
  {
    title: "Premium does not need to feel corporate.",
    description:
      "The studio can be sharp, calm, technical, and a little rebellious without becoming cold or bloated.",
  },
];

export const aboutRoles: readonly string[] = [
  "UX strategy",
  "Interface design",
  "Website design",
  "Front-end development",
  "AI workflow design",
  "Brand systems",
  "Campaign support",
  "SEO foundations",
];

export const aboutClientTypes: readonly TitledItem[] = [
  {
    title: "Local businesses",
    description: "For teams that need a modern, trustworthy website without the agency-sized maze.",
  },
  {
    title: "Startup founders",
    description:
      "For founders who need a launch page, MVP interface, or product story that gets clear fast.",
  },
  {
    title: "SaaS teams",
    description:
      "For product teams that need cleaner flows, sharper UI, and front-end support that respects the system.",
  },
  {
    title: "Growing brands",
    description:
      "For businesses that need a reliable digital partner across design, websites, AI workflows, and support.",
  },
];
