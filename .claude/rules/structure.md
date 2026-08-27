# Structure Rules — pages, sections, data, routing

Running example: the **portfolio** page, which renders a filterable grid from `portfolioProjects`.

## Why this differs from the house `modules/` layout

The standard guide organises by feature module with a `service/` layer (`api.ts` + DTO↔ViewModel
`mapper.ts`). **This site has no API and no DTOs** — content is authored in-repo, so the "service"
layer collapses to a typed `src/data/` folder. Everything else carries over.

| House convention               | Here                            | Why                                            |
| ------------------------------ | ------------------------------- | ---------------------------------------------- |
| `src/modules/<feature>/`       | `src/pages/<route>/`            | Units are routes, not features                 |
| `service/api.ts` + `mapper.ts` | `src/data/<topic>.ts`           | Content is the source; nothing to fetch or map |
| `components/roles/<role>/`     | —                               | No roles                                       |
| `@types/index.ts` per module   | `src/@types/` shared + per-page | Content shapes are cross-page                  |

---

## Every route is a folder under `src/pages/`

```
src/pages/<route>/
├── <Name>Page.tsx      # Page shell — composes sections inside a layout. No content, no logic.
├── sections/           # One file per section of that page
│   ├── HeroSection.tsx
│   ├── ServicesSection.tsx
│   └── index.ts        # barrel
├── @types/index.ts     # Props interfaces used only by this page (optional)
├── helpers/index.ts    # Pure helpers used only by this page (optional)
└── index.ts            # Public API — exports the page component only
```

Concretely, for the home page (currently lines 1548–2216 of `App.jsx`):

```
src/pages/home/
├── HomePage.tsx
├── sections/
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── ServicesCarouselSection.tsx
│   ├── ProcessSection.tsx
│   ├── MarqueeSection.tsx
│   ├── WorkSection.tsx
│   ├── FaqSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── BlogSection.tsx
│   ├── LogosSection.tsx
│   └── index.ts
└── index.ts
```

**A page component composes; it does not render content.** If `HomePage.tsx` contains a heading
string or a `.map()` over content, that belongs in a section.

```tsx
// src/pages/home/HomePage.tsx — this is the whole file
import { SiteShell } from "@/components/layouts";
import {
  HeroSection,
  AboutSection,
  ServicesCarouselSection,
  ProcessSection,
  MarqueeSection,
  WorkSection,
  FaqSection,
  TestimonialsSection,
  BlogSection,
  LogosSection,
} from "./sections";

const HomePage = () => {
  return (
    <SiteShell activePage="home">
      <HeroSection />
      <AboutSection />
      <ServicesCarouselSection />
      <ProcessSection />
      <MarqueeSection />
      <WorkSection />
      <FaqSection />
      <TestimonialsSection />
      <BlogSection />
      <LogosSection />
    </SiteShell>
  );
};

export { HomePage };
```

### Section size limit

If a section file passes **~150 lines**, extract its repeating unit into a component in
`src/components/common/` (if reused) or a local `components/` folder (if not).

> For scale: the current `App.jsx` is **3,299 lines** holding all 8 pages, all 30 content arrays,
> and every interactive component. The target above is roughly 60 files of 40–150 lines each.

---

## All content lives in `src/data/`

There are **30 content arrays** in the codebase today, all currently at the top of `App.jsx`
(lines 3–982). Each becomes a typed module:

```
src/data/
├── services.ts          # services, servicePageServices, supportAddOns, serviceAudiences, servicePackages
├── projects.ts          # projects, portfolioProjects, portfolioFilters
├── process.ts           # processPrinciples, processSteps, processDeliverables, processInputs,
│                        # aiWorkflowItems, collaborationItems
├── about.ts             # aboutStats, aboutBeliefs, aboutRoles, aboutClientTypes
├── blog.ts              # blogPosts, blogCategories, blogTags
├── faqs.ts              # faqItems, featuredFaqs, faqPageGroups, faqPageCategories,
│                        # servicesPageFaqs, processPageFaqs
├── testimonials.ts      # testimonials, logoMarks
├── contact.ts           # contactProjectTypes, contactDetails, contactSteps
└── index.ts             # barrel
```

Every export is typed against an interface in `src/@types/` and frozen with `as const satisfies`:

```ts
// src/data/services.ts
import type { Service } from "@/@types";

export const services = [
  {
    label: "Digital / Web",
    title: "Digital Experiences",
    description: "Every interaction shapes perception.",
    tags: ["Website Strategy", "Website Design", "Landing Pages"],
  },
] as const satisfies readonly Service[];
```

Rules:

- **Content is data, never JSX.** No `<strong>` or `<br />` inside a content string. If copy needs
  emphasis, model it as a field (`{ text, emphasis }`), not markup.
- **No content in a component file.** A section reads from `@/data/*`; it never declares its own array.
- **One topic per file.** If a file passes ~200 lines, split by page (`faqs/home.ts`, `faqs/services.ts`).

---

## Four layers — strictly separated

- **Pages** (`pages/`): compose sections inside a layout. No content, no data logic.
- **Sections** (`pages/*/sections/`): JSX + local interaction state. Read content from `@/data/`.
- **Data** (`data/`): typed content constants. No JSX, no functions, no imports beyond types.
- **Helpers** (`helpers/`): pure functions. No JSX, no React, no side effects, no network.

---

## Helpers — page-scoped vs shared

Reusable pure functions live in a `helpers/` folder, never loose in a component file.

```ts
// src/helpers/content.ts — used by more than one page
import type { BlogPost } from "@/@types";

export const formatPostDate = (isoDate: string): string =>
  new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const filterByCategory = <T extends { category: string }>(
  items: readonly T[],
  category: string,
): readonly T[] =>
  category === "All" ? items : items.filter((item) => item.category === category);
```

Page-only helpers stay in `src/pages/<route>/helpers/`. Promote to `src/helpers/` the moment a
second page needs one. (`src/utils/` is reserved for infrastructure — logger, storage — not
business helpers.)

---

## Custom hooks

Interaction logic that repeats belongs in `src/hooks/`, not copy-pasted into sections. The current
code has three such patterns worth extracting:

```
src/hooks/
├── useCarousel.ts        # index, next/prev, drag-to-scroll, auto-advance with pause-on-interact
├── useMarquee.ts         # scroll-linked marquee progress, pause on hover / reduced motion
├── useReducedMotion.ts   # matchMedia('(prefers-reduced-motion: reduce)')
└── index.ts
```

The existing `pauseAutoUntil` ref pattern (pause auto-advance 6–9s after any user interaction) is
good behaviour — preserve it when extracting `useCarousel`.

---

## Barrel index pattern

Each folder has its own `index.ts`:

```ts
// src/pages/home/sections/index.ts
export { HeroSection } from "./HeroSection";
export { AboutSection } from "./AboutSection";

// src/pages/home/index.ts — public API: the page only
export { HomePage } from "./HomePage";

// src/data/index.ts
export * from "./services";
export * from "./projects";
```

Never export a page's internal sections from its `index.ts`. If another page needs a section, it
isn't a section — it's a common component.

---

# Routing

## All routes live under `src/router/`

A component may navigate (`useNavigate`) and read params (`useParams`), but the route table lives
only in the router.

```
src/router/
├── index.tsx       # RouterProvider + root layout
├── routes.tsx      # The route table (path → element)
└── paths.ts        # Route path constants
```

## Route paths come from constants — never hardcode

```ts
// src/router/paths.ts
export const ROUTES = {
  HOME: "/",
  PORTFOLIO: "/portfolio",
  SERVICES: "/services",
  PROCESS: "/process",
  FAQ: "/faq",
  BLOG: "/blog",
  ABOUT: "/about",
  CONTACT: "/contact",
} as const;
```

```tsx
// wrong
<Route path="/portfolio" element={<PortfolioPage />} />
// correct
<Route path={ROUTES.PORTFOLIO} element={<PortfolioPage />} />
```

## Legacy path aliases must be preserved

The current router accepts alternate paths. Keep them as redirects so existing links don't break:

| Canonical    | Also accepts                       |
| ------------ | ---------------------------------- |
| `/portfolio` | `/work`, `/portfolio/*`, `/work/*` |
| `/faq`       | `/faqs`                            |
| `/blog`      | `/blogs`                           |
| `/about`     | `/about-us`                        |

```tsx
<Route path="/work" element={<Navigate to={ROUTES.PORTFOLIO} replace />} />
```

## A real 404 route is required

The current router falls through to the home page for **any** unknown path — returning a 200 with
duplicate content. Add an explicit catch-all:

```tsx
<Route path="*" element={<NotFoundPage />} />
```

## Lazy-load page components

Route-level pages are code-split with `React.lazy` — the one place a default export is allowed.

```tsx
import { lazy, Suspense } from "react";
const PortfolioPage = lazy(() => import("@/pages/portfolio"));

<Suspense fallback={<PageSkeleton />}>
  <PortfolioPage />
</Suspense>;
```

## Static hosting requires an SPA rewrite

Client-side routing 404s on a static host without a rewrite rule. This is currently missing and is
a shipping blocker. Add whichever matches the host:

```json
// vercel.json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

```
# public/_redirects  (Netlify)
/*  /index.html  200
```
