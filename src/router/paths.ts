/**
 * Canonical route paths. Never hardcode a path string in a component.
 * See .claude/rules/structure.md.
 */
export const ROUTES = {
  HOME: "/",
  PORTFOLIO: "/portfolio",
  SERVICES: "/services",
  PROCESS: "/process",
  FAQ: "/faq",
  BLOG: "/blog",
  ABOUT: "/about",
  CONTACT: "/contact",
};

/** Legacy paths preserved as permanent redirects so existing links keep working. */
export const ROUTE_ALIASES = [
  { from: "/blogs", to: ROUTES.BLOG },
  { from: "/work", to: ROUTES.PORTFOLIO },
  { from: "/work/*", to: ROUTES.PORTFOLIO },
  { from: "/faqs", to: ROUTES.FAQ },
  { from: "/about-us", to: ROUTES.ABOUT },
];
