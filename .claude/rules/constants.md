# Constants & Content Rules — The Lazy Studio

This site is ~90% copy. That copy is **data**, not markup. Nothing user-facing is hardcoded in JSX —
so copy stays consistent, a non-developer can edit it, and i18n stays possible.

## Three homes — content, system strings, config

| Kind               | Location                    | Owner                 | Examples                                                                   |
| ------------------ | --------------------------- | --------------------- | -------------------------------------------------------------------------- |
| **Site content**   | `src/data/`                 | copywriter / designer | Service descriptions, FAQ answers, blog posts, package tiers, testimonials |
| **System strings** | `src/constants/messages.ts` | developer             | Validation errors, toast copy, empty states, form labels                   |
| **Config**         | `src/constants/`            | developer             | Nav items, route paths, social links, SEO metadata                         |

The test: **would a copywriter edit it without opening a component?** If yes it is content →
`src/data/`. If it only appears when something succeeds or fails, it is a system string →
`src/constants/messages.ts`.

Content structure is covered in `.claude/rules/structure.md`; this file covers the rest.

## Shared constants layout

```
src/constants/
├── index.ts        # barrel
├── messages.ts     # ALL validation + error + toast + empty-state strings
├── navigation.ts   # header nav, footer columns, social links
├── seo.ts          # per-route title + description + OG metadata
└── site.ts         # brand name, contact email, availability status
```

## Messages — never inline

```ts
// src/constants/messages.ts
export const VALIDATION_MESSAGES = {
  REQUIRED: (field: string) => `${field} is required`,
  INVALID_EMAIL: "Enter a valid email address",
  MIN_LENGTH: (field: string, n: number) => `${field} must be at least ${n} characters`,
} as const;

export const ERROR_MESSAGES = {
  GENERIC: "Something went wrong. Please try again.",
  SUBMIT_FAILED: "We couldn't send your message. Email us at hello@thelazystudio.com instead.",
  NOT_FOUND: "That page doesn't exist — but the good stuff is one click away.",
} as const;

export const SUCCESS_MESSAGES = {
  MESSAGE_SENT: "Thanks — we'll be in touch within one working day.",
  SUBSCRIBED: "You're on the list.",
} as const;

export const EMPTY_STATES = {
  NO_PROJECTS: "No projects in this category yet.",
  NO_POSTS: "No posts match that search.",
} as const;
```

```ts
// Wrong — inline strings
z.string().min(1, "Name is required");
toast.success("Message sent!");
```

```ts
// Correct
import { VALIDATION_MESSAGES as V, SUCCESS_MESSAGES } from "@/constants/messages";

z.string().min(1, V.REQUIRED("Name"));
toast.success(SUCCESS_MESSAGES.MESSAGE_SENT);
```

`EMPTY_STATES` is not optional decoration: the portfolio filter has 6 categories and the blog has a
search box. Both can return zero results, and both currently render nothing at all.

## Navigation is config, not JSX

`SiteHeader` currently hardcodes 8 `<a>` elements with a repeated active-state ternary each. That is
config:

```ts
// src/constants/navigation.ts
import { ROUTES } from "@/router/paths";

export const PRIMARY_NAV = [
  { label: "Home", href: ROUTES.HOME },
  { label: "Portfolio", href: ROUTES.PORTFOLIO },
  { label: "Services", href: ROUTES.SERVICES },
  { label: "Process", href: ROUTES.PROCESS },
  { label: "FAQs", href: ROUTES.FAQ },
  { label: "Blog", href: ROUTES.BLOG },
  { label: "About", href: ROUTES.ABOUT },
  { label: "Contact", href: ROUTES.CONTACT },
] as const;
```

```tsx
// The header then maps — active state resolved once, by the router
{
  PRIMARY_NAV.map(({ label, href }) => (
    <NavLink
      key={href}
      to={href}
      className={({ isActive }) => cn("nav-link", isActive && "nav-link--active")}
    >
      {label}
    </NavLink>
  ));
}
```

## SEO metadata is per-route config

All 8 pages currently share the `<title>` **"Prototype"**, with no meta description and no OG tags.
Metadata is config, keyed by route:

```ts
// src/constants/seo.ts
export const SEO = {
  [ROUTES.HOME]: {
    title: "The Lazy Studio — AI-First Design & Development Collective",
    description:
      "Premium UI/UX, websites, digital products, and useful AI workflows. Human-crafted work with less unnecessary overhead.",
  },
  [ROUTES.PORTFOLIO]: {
    title: "Portfolio — The Lazy Studio",
    description: "Selected work across UI/UX, websites, AI workflows, branding, and marketing.",
  },
} as const;
```

Every route needs `title`, `description`, and an OG image. A shared `<Seo>` component reads this map.

## Brand and contact details live in one place

`hello@thelazystudio.com` appears in multiple components today. One source:

```ts
// src/constants/site.ts
export const SITE = {
  NAME: "The Lazy Studio",
  TAGLINE: "AI-first design and development collective",
  EMAIL: "hello@thelazystudio.com",
  URL: "https://thelazystudio.com",
} as const;
```

## Enum-like constants use `as const` — never the `enum` keyword

Mirrors `.claude/rules/typescript.md`: `as const` objects with a derived type.

```ts
export const PROJECT_CATEGORY = { ALL: "All", UI_UX: "UI/UX", WEBSITES: "Websites" } as const;
export type ProjectCategory = (typeof PROJECT_CATEGORY)[keyof typeof PROJECT_CATEGORY];
```

Filter lists derive from the same constant that types the data — so a typo can't silently produce an
empty filter:

```ts
export const PORTFOLIO_FILTERS = Object.values(PROJECT_CATEGORY);
```
