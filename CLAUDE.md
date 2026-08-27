# The Lazy Studio — Claude Code Guide

## Project Overview

Marketing site for **The Lazy Studio**, an AI-first design and development collective. 8 public
content pages, one audience (prospective clients), **no auth, no roles, no server data**. All content
is authored in-repo as typed constants — there is no CMS and no backend.

**Target stack:** React 19 · TypeScript · Vite · shadcn/ui · Tailwind CSS v4 · React Router v6

> This is the house stack (React + shadcn/ui + Tailwind). Two rows of the standard table are
> deliberately **omitted** for this project — see _Stack deviations_ below.

### Migration status — read this first

Migration is **in progress**. Everything except Tailwind is done. Current state:

| Area          | Today                                                                              | Target                  | Status                     |
| ------------- | ---------------------------------------------------------------------------------- | ----------------------- | -------------------------- |
| Tooling       | ESLint 9, Prettier, Vitest, `tsc --noEmit`                                         | same                    | **done**                   |
| Design tokens | 19 tokens in `src/styles.css` `:root`                                              | tokens in `globals.css` | **done** (tokenised)       |
| Typeface      | self-hosted Inter Variable (`@fontsource-variable/inter`)                          | same                    | **done**                   |
| Content       | `src/data/` — 8 typed modules, 33 exports                                          | same                    | **done**                   |
| Language      | **TypeScript (strict)** — `strict`, `noUncheckedIndexedAccess`, no `allowJs`       | same                    | **done**                   |
| Structure     | `src/pages/` (8 pages) + `src/components/` + `src/router/`; `App.tsx` now 12 lines | same                    | **done**                   |
| Routing       | React Router v7, code-split, legacy aliases + real 404                             | same                    | **done**                   |
| Styling       | `src/styles.css`, tokenised                                                        | Tailwind v4             | **not started** — see note |

> **On Tailwind:** the stylesheet is now tokenised, which delivers most of the maintainability win.
> Converting 8,700 lines of art-directed CSS (marquees, glows, ghost type, fluid `clamp()` ramps)
> into utilities is a large rewrite with real regression risk and little functional gain. Recommend
> adopting Tailwind for _new_ work and for components as they are extracted, rather than a big-bang
> rewrite. Confirm with the team before starting.

> **Stack notes:** ESLint is pinned to **9** because `eslint-plugin-react` does not yet support 10.
> `react-router-dom` resolved to **v7**, the direct successor to v6 with an identical
> `<Routes>`/`<Route>` API for our usage.

**Do not describe this repo as already conforming.** When you touch a file, move it toward the
target; don't rewrite untouched areas opportunistically.

---

## Commands

```bash
npm run dev            # vite --host 127.0.0.1
npm run build          # vite build   (target: tsc -b && vite build)
npm run preview        # vite preview --host 127.0.0.1
```

Not yet configured — add as part of the migration: `typecheck`, `lint`, `format`, `test`.

Run the dev server yourself and verify in the in-app browser. Don't hand the user start
instructions for something you can run. (See also `AGENTS.md` for prototype-workflow notes.)

---

## Tech Stack — Approved Libraries Only

| Purpose         | Library                                                | Notes                                                       |
| --------------- | ------------------------------------------------------ | ----------------------------------------------------------- |
| UI components   | **shadcn/ui**                                          | ONLY UI library — no MUI, Ant, Chakra, Mantine              |
| Styling         | **Tailwind CSS v4**                                    | Utility classes + a thin custom layer for cinematic effects |
| Forms           | **React Hook Form + Zod**                              | Contact form and newsletter only                            |
| Routing         | React Router v7, code-split, legacy aliases + real 404 | same                                                        | **done** |
| Icons           | **Lucide React**                                       | Ships with shadcn/ui                                        |
| Toasts          | **Sonner**                                             | Via shadcn/ui `<Sonner>`                                    |
| Dates           | **date-fns**                                           | Blog post dates. Never moment.js                            |
| Class utilities | **clsx + tailwind-merge + cva**                        | Required by shadcn/ui internals                             |

Adding any library not in this table requires team approval first.

### Stack deviations — and why

- **No Redux Toolkit.** The standard stack uses it for auth + global UI state. This site has neither:
  no login, no session, no cross-page state. Every interactive piece (carousel index, accordion open
  item, portfolio filter, contact form) is local `useState`. Reach for Redux only if real global
  state appears — do not add it "to match the template."
- **No TanStack Table.** There are no data tables anywhere on the site.
- **No multi-role architecture.** Single audience, no `roles/` split, no `ProtectedRoute`,
  no permissions map. The whole multi-role section of the house guide does not apply here.
- **`src/pages/` replaces `src/modules/`.** The house `modules/<feature>/` layout assumes an API
  layer (`service/api.ts`, DTO↔ViewModel mappers). A content site has no DTOs — content _is_ the
  source data. See `.claude/rules/structure.md` for the mapping.

---

## Core conventions (apply everywhere)

1. **Components are arrow functions.** `const Hero = (props: HeroProps) => { ... }` — never
   `function Hero()`. Let TypeScript infer the return; never annotate `: JSX.Element`.
   → `.claude/rules/components.md`
2. **One reusable component per file.** Anything used in more than one place gets its own file.
   → `.claude/rules/components.md`
3. **All interfaces live in a `@types/` folder** — never inline in a component file.
   → `.claude/rules/typescript.md`
4. **Reusable pure functions live in `helpers/`** — no JSX, no side effects.
   → `.claude/rules/structure.md`
5. **All site copy lives in `src/data/` or `src/constants/`** — never hardcoded in JSX.
   This site is 90% content; that content is data, not markup. → `.claude/rules/constants.md`
6. **Common UI is wrapped, not rebuilt** — thin wrappers over shadcn/ui in `src/components/common/`.
   → `.claude/rules/components.md`
7. **All routes live under `src/router/`** — never define routes inside page components.
   → `.claude/rules/structure.md`
8. **Design tokens are the source of truth** — the palette, type ramp, spacing, and radius are
   defined once in `src/globals.css`. Never write a raw hex in a component.
   → `.claude/rules/design.md`
9. **Every page is composed of named sections**, not one long JSX block.
   → `.claude/rules/structure.md`

---

## Site map

Eight routes. Each is a page folder under `src/pages/`.

| Route                  | Page         | Notes                                                                                           |
| ---------------------- | ------------ | ----------------------------------------------------------------------------------------------- |
| `/`                    | Home         | Hero, About, Services carousel, Process, Marquee, Work, FAQ, Testimonials, Blog, Logos, Contact |
| `/portfolio` (`/work`) | Portfolio    | Filterable project grid — 6 filter categories                                                   |
| `/services`            | Services     | Service detail, add-ons, audiences, packages, FAQ                                               |
| `/process`             | Process      | Principles, numbered steps, AI workflow, collaboration, deliverables                            |
| `/faq` (`/faqs`)       | FAQ          | Featured questions + 7 grouped categories                                                       |
| `/blog` (`/blogs`)     | Blog listing | Posts, categories, tags, sidebar, search                                                        |
| `/about` (`/about-us`) | About        | Stats, story, beliefs, roles, client types                                                      |
| `/contact`             | Contact      | Project-type picker, contact form, contact details, steps                                       |
| `*`                    | **NotFound** | Does not exist yet — currently falls through to Home. Must be added.                            |

---

## Source Layout (target)

```
src/
├── pages/             # One folder per route — page shell + its sections
├── components/
│   ├── ui/            # shadcn/ui generated files — NEVER hand-edit
│   ├── common/        # Shared wrappers (SectionKicker, LinkArrow, AppButton, FormInput)
│   └── layouts/       # SiteShell, SiteHeader, SiteFooter
├── data/              # ALL site content, typed (services, projects, faqs, posts, packages…)
├── @types/            # Shared interfaces — content shapes + shared props
├── constants/         # Messages, routes, nav config, non-content constants
├── helpers/           # Pure business/formatting functions
├── hooks/             # Shared custom hooks (useCarousel, useMarquee, useReducedMotion)
├── router/            # All React Router v6 route definitions
├── config/
│   └── environment.ts # All env var access (NEVER import.meta.env elsewhere)
├── utils/             # Infrastructure (logger, storage) — not business helpers
└── globals.css        # Design tokens + Tailwind layers
```

> **`helpers/` vs `utils/`:** `utils/` is infrastructure you rarely touch. `helpers/` is
> business/formatting logic you write and reuse (`formatPostDate`, `slugify`). New reusable pure
> functions go in `helpers/`.

> **`data/` vs `constants/`:** `data/` is _site content_ a copywriter would edit (service
> descriptions, FAQ answers, blog posts). `constants/` is _system strings_ a developer owns
> (validation messages, route paths, toast copy).

---

## Path Aliases

Use `@/` for `src/`. Never use relative `../../` paths that cross folder boundaries.

```ts
// correct
import { services } from "@/data/services";
import { Button } from "@/components/ui/button";

// wrong
import { services } from "../../data/services";
```

---

## Deployment — GoDaddy cPanel

The site is hosted on **GoDaddy Web Hosting Economy** (shared Apache/cPanel) at
**thelazystudio.com**. It is a static build: there is **no Node runtime on the server**, so no
serverless functions, no SSR, and no API routes. Anything needing a backend must go to a
third-party endpoint.

```bash
npm run release        # build + zip to release/thelazystudio-NNN.zip
```

Then in cPanel: File Manager → `public_html` → remove the previous build → upload the zip →
right-click → Extract. Turn on **Show Hidden Files** and confirm `.htaccess` landed — without it
every client-side route returns an Apache 404.

### `public/.htaccess` is load-bearing

Vite copies it into `dist/` on every build. It does four things, and the order matters:

1. Forces HTTPS (before the SPA rule, or the redirect loses the path)
2. Strips `www.` so the domain has one canonical address
3. Serves `index.html` for any path that is not a real file — this is what makes React Router work
4. Sets cache headers: `index.html` never cached, fingerprinted JS/CSS cached for a year

Never cache `index.html`. Visitors would keep old asset hashes and never see a deploy.

### Contact form

There is no server to post to, so the form submits to a third-party endpoint set at **build time**:

```
VITE_CONTACT_ENDPOINT     Formspree or Web3Forms URL
VITE_CONTACT_ACCESS_KEY   Web3Forms only; blank for Formspree
```

Put these in `.env.production.local` **before** running `npm run release` — `VITE_*` values are
inlined into the bundle at build time, not read at runtime. Rebuilding is required to change them.

They are public by design (visible in any submitted request), which is why a form backend is
appropriate and a private API key is not. Never put a secret in a `VITE_*` variable.

Until `VITE_CONTACT_ENDPOINT` is set, the form shows an honest error with a mailto fallback and
keeps what the visitor typed. It must never claim success for a message it did not send.

## Known issues to fix

Ordered by severity. Fix these as you touch the surrounding code.

1. **The contact form has no delivery endpoint yet.** Create a Formspree or Web3Forms account, put
   the URL in `VITE_CONTACT_ENDPOINT`, and rebuild. Until then it fails honestly — see Deployment.
2. **No Open Graph image.** `summary_large_image` is declared with no image, so link previews fall
   back to a plain card. Needs a 1200x630 PNG at `public/assets/og-cover.png`, an `og:image` tag in
   `index.html`, and the absolute URL in `SITE`.
3. **Per-route link previews need prerendering.** `useDocumentMeta` sets titles and OG tags at
   runtime, which Google executes but Slack/WhatsApp/iMessage do not — they read the static tags in
   `index.html`. Every route currently unfurls with the homepage's title. A prerender step
   (`vite-plugin-ssr`, `vite-plugin-prerender`) would fix this properly.
4. **5.4 MB of unoptimized PNGs**, none lazy-loaded. Convert to WebP/AVIF, lazy-load below the fold.
5. **Mobile nav is a horizontal scroll strip** where later links sit off-screen with no affordance.
   Replace with a proper menu (shadcn `<Sheet>`).
6. **`HomePage` still holds ~10 sections inline** (~700 lines). Split into `pages/home/sections/`;
   it is the only file left that breaks the ~150-line section guideline.
7. **The contact form is not on React Hook Form.** It validates with the shared Zod schema but still
   uses `useState` fields and shows one error at a time rather than inline per-field errors.
   Converting it to RHF (per `.claude/rules/components.md`) would give per-field messages.
8. **One `react-hooks/exhaustive-deps` warning** in `HomePage` — resolve when the carousel logic is
   extracted into a `useCarousel` hook.
9. **`blogPosts` contains the category `"Website Strategy"`, which is missing from `blogCategories`** —
   that post can never be reached by the category filter. A content fix, not a code fix.

### Fixed during the migration

- ~~Routes 404 on a static host~~ — `vercel.json` + `public/_redirects` added.
- ~~Navigation does a full page reload~~ — React Router + `<Link>`/`<SmartLink>`; verified client-side.
- ~~No 404 page~~ — `src/pages/not-found/` now serves unknown paths.
- ~~Inter declared but never loaded~~ — self-hosted variable font.
- ~~`.npmrc` hardcodes a machine-specific cache path~~ — removed.
- ~~393 hardcoded hex values~~ — 520 literals replaced by 19 tokens.
- ~~Plain JS with no type safety~~ — full TypeScript; `npm run build` typechecks before bundling.
- ~~`<title>` was "Prototype" on every page~~ — per-route metadata in `src/constants/seo.ts`.
- ~~No favicon~~ — `public/favicon.svg`.
- ~~The contact form faked success~~ — real endpoint; failures now say so and keep the text.

## Path-Scoped Rules

- @.claude/rules/structure.md — pages, sections, data layer, helpers, barrels, routing
- @.claude/rules/components.md — arrow-function components, shadcn/ui usage, common wrappers, form pattern
- @.claude/rules/design.md — the real token values, type ramp, spacing, motion, required states
- @.claude/rules/typescript.md — type safety, content interfaces, Zod conventions
- @.claude/rules/constants.md — content data vs system constants, messages, nav config
