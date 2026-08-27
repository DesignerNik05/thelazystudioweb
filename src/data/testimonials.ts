/**
 * Client testimonials and logo marks.
 *
 * Site content - see .claude/rules/structure.md.
 * Content is data, never JSX. Do not add markup to these strings.
 */

import type { LogoMark, Testimonial } from "@/@types";

export const testimonials: readonly Testimonial[] = [
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

export const logoMarks: readonly LogoMark[] = [
  { name: "Northline", mark: "N", shape: "pill", tone: "red" },
  { name: "Flowbase", mark: "F", shape: "square", tone: "muted" },
  { name: "Kairo", mark: "K", shape: "pill", tone: "white" },
  { name: "Monora", mark: "M", shape: "square", tone: "muted" },
  { name: "Luma Labs", mark: "L", shape: "pill", tone: "red" },
  { name: "Vertex", mark: "V", shape: "square", tone: "white" },
];
