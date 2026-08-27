/**
 * Shared types — content shapes and cross-page component props.
 * See .claude/rules/typescript.md. Never declare an interface inline in a component.
 *
 * The value sets below are derived from the real content in `src/data/`. Because every
 * data module is written `as const satisfies readonly T[]`, a typo in a category name
 * is a compile error rather than a filter that silently returns nothing.
 */

import type { AnchorHTMLAttributes, ReactNode } from "react";

/* ------------------------------------------------------------------ *
 * Value sets
 * ------------------------------------------------------------------ */

/** Which abstract artwork `<ProjectVisual>` renders. */
export type ProjectVisualKind = "dashboard" | "website" | "ai" | "campaign";

/** Portfolio filter categories. `portfolioFilters` is "All" plus these. */
export type PortfolioCategory = "UI/UX" | "Websites" | "AI Workflows" | "Branding" | "Marketing";
export type PortfolioFilter = "All" | PortfolioCategory;

/** FAQ grouping categories. `faqPageCategories` is "All" plus these. */
export type FaqCategory =
  "Services" | "Process" | "Pricing" | "AI Workflow" | "Websites" | "Support";
export type FaqFilter = "All" | FaqCategory;

export type ServiceTone = "red" | "white" | "dark";
export type LogoShape = "pill" | "square";
export type LogoTone = "red" | "muted" | "white";

/** Route keys, used to mark the active nav item. */
export type PageKey =
  "home" | "portfolio" | "services" | "process" | "faq" | "blog" | "about" | "contact";

/* ------------------------------------------------------------------ *
 * Content shapes
 * ------------------------------------------------------------------ */

export interface Service {
  title: string;
  label: string;
  description: string;
  tags: readonly string[];
}

export interface ServicePageService {
  title: string;
  kicker: string;
  line: string;
  description: string;
  tags: readonly string[];
  href: string;
  tone: ServiceTone;
}

export interface ServicePackage {
  name: string;
  bestFor: string;
  price: string;
  includes: readonly string[];
}

export interface TitledItem {
  title: string;
  description: string;
}

/** Home-page project teaser. `stats` is absent on all but the featured entry. */
export interface Project {
  title: string;
  category: string;
  type: string;
  description: string;
  tags: readonly string[];
  visual: ProjectVisualKind;
  stats?: readonly string[];
}

/** Portfolio-page project. Always linkable and always has stats. */
export interface PortfolioProject {
  title: string;
  category: PortfolioCategory;
  service: string;
  type: string;
  description: string;
  tags: readonly string[];
  visual: ProjectVisualKind;
  href: string;
  stats: readonly string[];
  featured?: boolean;
}

export interface BlogPost {
  title: string;
  date: string;
  /** ISO 8601 — the machine-readable counterpart to `date`. */
  datetime: string;
  excerpt: string;
  image: string;
  alt: string;
  category: string;
  author: string;
  /** Display string, e.g. "04" — not a number. */
  comments: string;
  featured?: boolean;
}

export interface BlogCategory {
  name: string;
  count: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGroup {
  category: FaqCategory;
  title: string;
  description: string;
  items: readonly FaqItem[];
}

export interface ProcessStep {
  title: string;
  label: string;
  description: string;
  deliverables: readonly string[];
}

export interface ProcessDeliverable {
  title: string;
  items: readonly string[];
}

export interface AboutStat {
  value: string;
  label: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export interface LogoMark {
  name: string;
  mark: string;
  shape: LogoShape;
  tone: LogoTone;
}

/** `href` is only present on the entries that are actionable (e.g. mailto:). */
export interface ContactDetail {
  label: string;
  value: string;
  href?: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  needsBriefHelp: boolean;
}

/* ------------------------------------------------------------------ *
 * Component props
 * ------------------------------------------------------------------ */

export interface SiteHeaderProps {
  /** "none" marks no nav item active (used by the 404 page). */
  activePage?: PageKey | "none";
}

export interface SiteFooterProps {
  page?: PageKey | "not-found";
}

export interface ProjectVisualProps {
  visual: ProjectVisualKind;
  className?: string;
}

export interface SmartLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href?: string;
  children?: ReactNode;
}

export interface FaqAccordionItemProps {
  item: FaqItem;
  itemKey: string;
  index: number;
  openQuestion: string | null;
  setOpenQuestion: (key: string | null) => void;
}
