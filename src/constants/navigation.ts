/**
 * Primary navigation. Config, not markup — see .claude/rules/constants.md.
 *
 * `homeHash` is used when the visitor is on the home page, so Home and
 * Services scroll to that page's sections instead of navigating.
 * `selfHash` is used when the visitor is already on that item's own page.
 */
import { ROUTES } from "@/router/paths";
import type { PageKey } from "@/@types";

export interface NavItem {
  key: PageKey;
  label: string;
  href: string;
  homeHash?: string;
  selfHash?: string;
}

export const PRIMARY_NAV: readonly NavItem[] = [
  { key: "home", label: "Home", href: ROUTES.HOME, homeHash: "#home" },
  { key: "portfolio", label: "Portfolio", href: ROUTES.PORTFOLIO },
  { key: "services", label: "Services", href: ROUTES.SERVICES, homeHash: "#services" },
  { key: "process", label: "Process", href: ROUTES.PROCESS },
  { key: "faq", label: "FAQs", href: ROUTES.FAQ },
  { key: "blog", label: "Blog", href: ROUTES.BLOG },
  { key: "about", label: "About", href: ROUTES.ABOUT },
  { key: "contact", label: "Contact", href: ROUTES.CONTACT, selfHash: "#contact-form" },
];

/** Where the "Start a project" button points, given the current page. */
export const ctaHref = (activePage: string): string =>
  activePage === "contact" ? "#contact-form" : ROUTES.CONTACT;
