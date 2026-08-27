/**
 * Contact routes, details, and enquiry steps.
 *
 * Site content - see .claude/rules/structure.md.
 * Content is data, never JSX. Do not add markup to these strings.
 */

import type { ContactDetail, ContactFormValues, TitledItem } from "@/@types";

export const contactProjectTypes: readonly string[] = [
  "UI/UX Design",
  "Website Design & Development",
  "AI Products & Workflows",
  "Branding",
  "Digital Marketing Support",
  "Maintenance / Ongoing Support",
];

export const contactDetails: readonly ContactDetail[] = [
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

export const contactSteps: readonly TitledItem[] = [
  {
    title: "Send the context",
    description: "Share the goal, the rough edges, the timeline, and anything already in motion.",
  },
  {
    title: "We review the fit",
    description:
      "We look for the cleanest scope, likely risks, and where the work can make the most difference.",
  },
  {
    title: "You get the next move",
    description:
      "We suggest a focused sprint, full project, or support path without making the brief heavier.",
  },
];

export const initialContactForm: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  timeline: "",
  message: "",
  needsBriefHelp: false,
};
