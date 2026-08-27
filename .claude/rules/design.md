# Design System Rules — The Lazy Studio

The design language: a **dark cinematic editorial** look. Near-black ground, one hot brand red,
oversized tight-tracked display type, glass-tinted cards, red atmospheric glows, and ghosted
background words.

> Every value below was extracted from the current `src/styles.css`. These are the site's **real**
> values, not sample defaults.

---

## Source of truth

Tokens are CSS variables defined **once** in `src/globals.css`, consumed via Tailwind classes.
Never hardcode a hex, never redefine a token in a component, never use inline `style={}`.

**Current state:** the stylesheet has **393 hardcoded hex values (33 unique) and 522 `rgba()`
literals** against only **9 `var()` usages**. The brand red `#fb0d1f` is typed out **65 separate
times**. Extracting these tokens is the highest-leverage cleanup in the project — until it is done,
any palette change is a 65-site find-and-replace.

```tsx
// Wrong — hardcoded, bypasses the system
<p className="text-[#898989]">Premium UI/UX</p>
<div style={{ padding: 16 }} />

// Correct — semantic token classes
<p className="text-muted-foreground">Premium UI/UX</p>
<div className="p-4" />
```

---

## Color tokens

This site is **dark-only**. There is no light theme; `:root` _is_ the dark theme. Do not add
`prefers-color-scheme` branches unless a light mode is actually commissioned.

| Token                 | Value     | Role                                         | Uses today |
| --------------------- | --------- | -------------------------------------------- | ---------- |
| `--background`        | `#050505` | Page ground                                  | 102        |
| `--foreground`        | `#ffffff` | Primary text, display type                   | 106        |
| `--primary`           | `#fb0d1f` | Brand red — CTAs, kickers, active nav, glows | 65         |
| `--primary-hover`     | `#d90919` | Primary button hover                         | 1          |
| `--muted-foreground`  | `#898989` | Secondary/body copy                          | 42         |
| `--card`              | `#101010` | Raised card surfaces                         | 19         |
| `--card-alt`          | `#090909` | Alternate/darker card                        | 7          |
| `--subtle-foreground` | `#d8d8d8` | De-emphasised light text                     | 14         |
| `--dim-foreground`    | `#a2a2a2` | Meta text, timestamps                        | 10         |
| `--elevated`          | `#202020` | Hover surfaces, chips                        | 2          |

```css
/* src/globals.css */
:root {
  --background: #050505;
  --foreground: #ffffff;
  --primary: #fb0d1f;
  --primary-hover: #d90919;
  --muted-foreground: #898989;
  --card: #101010;
  --card-alt: #090909;
  --subtle-foreground: #d8d8d8;
  --dim-foreground: #a2a2a2;
  --elevated: #202020;
}
```

The remaining ~23 one-off hexes (`#1a1a1d`, `#12090a`, `#171719`, `#0e0e0f`, …) are near-duplicates
of `--background` / `--card`. **Collapse them into the tokens above** rather than preserving each
shade — they are drift, not intent.

### Alpha tokens

The alpha values cluster into clear tiers. Use the tier, not a new literal.

| Token                | Value                     | Use                               | Uses today   |
| -------------------- | ------------------------- | --------------------------------- | ------------ |
| `--border`           | `rgb(255 255 255 / 0.12)` | Default border                    | 31           |
| `--border-subtle`    | `rgb(255 255 255 / 0.07)` | Quiet dividers                    | 12           |
| `--border-strong`    | `rgb(255 255 255 / 0.20)` | Emphasis, active chips            | 6            |
| `--surface-glass`    | `rgb(255 255 255 / 0.04)` | Glass card tint                   | ~45 combined |
| `--surface-glass-hi` | `rgb(255 255 255 / 0.07)` | Raised glass tint                 | 20           |
| `--primary-tint`     | `rgb(251 13 31 / 0.12)`   | Red wash behind CTAs              | 14           |
| `--primary-glow`     | `rgb(251 13 31 / 0.08)`   | Ambient hero/section glow         | 15           |
| `--scrim`            | `rgb(5 5 5 / 0.92)`       | Image overlay for text legibility | 12           |
| `--scrim-heavy`      | `rgb(5 5 5 / 0.96)`       | Sticky header backdrop            | 17           |

> The glass tints currently span nine near-identical values (`0.022`, `0.025`, `0.035`, `0.04`,
> `0.045`, `0.055`, `0.07`, `0.075`, `0.08`). Snap them to the two tiers above. Nobody can see the
> difference between `0.022` and `0.025`; everybody pays for the inconsistency.

---

## Typography

### The font is not currently loaded — fix before shipping

`font-family` declares `"Inter"`, but there is **no `@font-face`, no `@import`, and no `<link>`**
anywhere in the project. Verified in-browser: `document.fonts` is **empty**. Inter resolves on
designer machines only because it is installed locally. Every other visitor falls back to
`system-ui`, so the site renders in a different typeface than designed.

Fix by self-hosting the variable font (preferred — no third-party request, no layout shift):

```css
@font-face {
  font-family: "Inter";
  src: url("/fonts/InterVariable.woff2") format("woff2-variations");
  font-weight: 100 900; /* variable axis — required, see below */
  font-display: swap;
}
```

Stack: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif`.

### Weights — collapse to five

The stylesheet uses **16 distinct font-weights**, including `260`, `520`, `550`, `560`, `650`,
`720`, `750`, `760`, `780`, `850`. Those non-standard values only render with a **variable** font;
against the system fallback they snap to the nearest static weight, which is why the site looks
subtly different on machines without Inter. Standardise on:

| Token            | Weight | Use                       |
| ---------------- | ------ | ------------------------- |
| `font-normal`    | 400    | Body copy                 |
| `font-medium`    | 500    | Labels, nav, meta         |
| `font-semibold`  | 600    | Card titles, sub-headings |
| `font-bold`      | 700    | Section headings          |
| `font-extrabold` | 800    | Display / hero type       |

### Type ramp

Display sizes are fluid via `clamp()` — keep that, it is doing real work. Use the ramp; never invent
a new `clamp()`.

| Level          | Value                       | Tracking            | Use                                                   |
| -------------- | --------------------------- | ------------------- | ----------------------------------------------------- |
| `text-ghost`   | `clamp(90px, 14vw, 210px)`  | `-0.12em`           | Oversized background word (decorative, `aria-hidden`) |
| `text-display` | `clamp(38px, 3.8vw, 64px)`  | `-0.04em`           | Hero h1                                               |
| `text-h1`      | `clamp(38px, 3.5vw, 62px)`  | `-0.035em`          | Page titles                                           |
| `text-h2`      | `clamp(26px, 2vw, 38px)`    | `-0.03em`           | Section headings                                      |
| `text-h3`      | `clamp(22px, 1.65vw, 30px)` | `-0.025em`          | Card titles                                           |
| `text-lead`    | `clamp(17px, 1.25vw, 22px)` | `-0.01em`           | Section intro copy                                    |
| `text-body`    | `clamp(16px, 1.05vw, 19px)` | `0`                 | Default body                                          |
| `text-sm`      | `15px`                      | `0`                 | Dense body, card copy                                 |
| `text-meta`    | `13px`                      | `0.02em`            | Timestamps, counts                                    |
| `text-kicker`  | `12px`                      | `0.14em`, uppercase | Section kicker label                                  |

Negative tracking is core to the look — display type is tight (`-0.035em` to `-0.06em`), body is
neutral, kickers are wide and uppercase. Don't flatten this to Tailwind defaults.

Headings follow hierarchical order (h1 → h2 → h3). One `<h1>` per page. Never skip a level for
visual size — use the ramp class instead.

---

## Spacing

Tailwind's 4px scale. Never arbitrary pixel values.

| Class             | px       | Use                               |
| ----------------- | -------- | --------------------------------- |
| `gap-2`           | 8        | Tag/chip rows                     |
| `p-4` / `gap-4`   | 16       | Default component padding         |
| `p-6`             | 24       | Card padding                      |
| `p-8`             | 32       | Large card padding                |
| `py-24` / `py-32` | 96 / 128 | Section vertical rhythm (desktop) |
| `py-16`           | 64       | Section vertical rhythm (mobile)  |

Page gutter: `px-6` mobile, `px-10` tablet, `px-16` desktop. Max content width `max-w-[1400px]`,
centred.

---

## Radius & elevation

The site uses **12 different radii**. Collapse to four tokens:

| Token           | Value   | Use                                   | Uses today          |
| --------------- | ------- | ------------------------------------- | ------------------- |
| `rounded-pill`  | `999px` | Buttons, nav links, chips, tags       | 36                  |
| `rounded-full`  | `50%`   | Avatars, orbs, icon buttons           | 32                  |
| `rounded-card`  | `24px`  | Cards, panels, image frames           | 24px+22px+20px = 21 |
| `rounded-panel` | `28px`  | Large panels, hero frames, header bar | 28px+30px+34px = 20 |
| `rounded-sm`    | `5px`   | Inline code, small marks              | 3                   |

The pill radius on buttons and nav is a defining trait of the design — don't substitute `rounded-md`.

Elevation is done with **glow and tint, not drop shadows**. Raised surfaces read as elevated via
`--surface-glass` + `--border`, and focal areas get a `--primary-glow` radial. Reserve
`backdrop-blur` for the sticky header and any overlay panel (2 uses today — keep it rare, it is
expensive).

---

## Named layouts

Page shells live in `src/components/layouts/` and are referenced by name in prompts.

| Layout         | Shape                                                                | Used by                                    |
| -------------- | -------------------------------------------------------------------- | ------------------------------------------ |
| `SiteShell`    | Header + `<main>` + footer/contact band                              | every page (8 uses today as `.site-shell`) |
| `PageHero`     | Full-bleed image + scrim + ghost word + title block                  | every non-home page                        |
| `SectionShell` | Kicker + heading + optional lead + content slot, with section rhythm | every content section                      |

Name the layout in the prompt. Don't let Claude invent page structure ad hoc.

---

## Recurring components — extract these

Measured from the current JSX. These repeat enough to be real components:

| Pattern                           | Uses   | Becomes                                                      |
| --------------------------------- | ------ | ------------------------------------------------------------ |
| `section-kicker`                  | **42** | `<SectionKicker>` — red dot + uppercase label                |
| `button`                          | 26     | `AppButton` (shadcn `<Button>` + `primary`/`ghost` variants) |
| `project-visual__*`               | 33     | `<ProjectVisual>` — the abstract panel/line/glow artwork     |
| `link-arrow`                      | 9      | `<LinkArrow>` — text + `↗`                                   |
| `site-shell`                      | 8      | `SiteShell` layout                                           |
| `project-card` / `portfolio-card` | 12     | `<ProjectCard>` — one component, two variants via `cva`      |
| `services-final-cta`              | 10     | `<FinalCTA>` — repeated closing band                         |
| `blog-sidebar-card`               | 4      | `<SidebarCard>`                                              |
| `scroll-marquee`                  | 4      | `<Marquee>`                                                  |
| `orb-ring`                        | 4      | `<OrbRing>`                                                  |

---

## Motion

`prefers-reduced-motion: reduce` is already handled — **keep it that way**. Every animation added
must be disabled inside that query.

There are 8 `@keyframes` today (marquee scroll, glow pulse, orb rotation). Rules:

- Marquees pause on hover and on `prefers-reduced-motion`.
- Auto-advancing carousels pause on user interaction and resume after a delay (the existing
  `pauseAutoUntil` ref pattern — 6–9s).
- Transitions: `150ms` for hover/color, `300ms` for transform/layout. Never above `500ms` for UI.
- Animate `transform` and `opacity` only. Never animate `width`, `height`, `top`, or `left`.

---

## Responsive

**Desktop-first** — this design is art-directed for wide screens and adapts down. Breakpoints in use:

| Query               | Meaning                                                      |
| ------------------- | ------------------------------------------------------------ |
| `max-width: 1400px` | Large laptop — tighten gutters, scale display type           |
| `max-width: 960px`  | Tablet — stack two-column sections, nav becomes scroll strip |
| `max-width: 640px`  | Mobile — single column, reduced section padding              |

> Only **4 media queries exist across 8,320 CSS lines.** That is far too few for a site this
> art-directed, and it shows: on mobile the hero image is nearly invisible and the nav is a
> horizontally scrolling strip where FAQs/Blog/About/Contact sit off-screen with no scroll
> affordance. **Replace the nav strip with a proper mobile menu** (shadcn `<Sheet>`), and treat
> every new section as needing an explicit mobile pass.

Touch targets ≥ 44×44px. The header CTA already enforces `min-height: 44px` at ≤960px — hold that
line everywhere.

---

## States are explicit

Every interactive element needs its states written or they don't exist:

`default · hover · active · focus · disabled · loading · empty · error · success`

| State    | What it looks like here                                                                  |
| -------- | ---------------------------------------------------------------------------------------- |
| Hover    | Border steps to `--border-strong`; primary buttons to `--primary-hover`                  |
| Focus    | Visible `ring-primary` — **never remove focus outlines**                                 |
| Loading  | Button spinner + disabled; skeleton for async regions                                    |
| Empty    | Centred message + CTA — never a blank region (portfolio filters can return zero results) |
| Error    | Inline message in `--primary` with a retry affordance                                    |
| Success  | Sonner toast — string from `@/constants/messages`                                        |
| Disabled | `opacity-50 pointer-events-none` + `aria-disabled`                                       |

If a prompt doesn't ask for a state, it won't get built. Ask for states up front.

---

## Class composition

- Conditional classes via `cn()` (clsx + tailwind-merge), never string concatenation.
- Multi-variant components use `cva`.
- No `!important`.

```tsx
import { cn } from "@/lib/utils";

<article
  className={cn(
    "rounded-card border border-border p-6",
    featured && "border-primary bg-primary/10",
    className,
  )}
/>;
```

---

## Accessibility — hold the current bar

The existing build gets this right. Don't regress it:

- Every `<img>` has a real `alt`. Decorative layers use `aria-hidden="true"` — including the
  oversized ghost word, glows, and grid overlays.
- Sections use `aria-labelledby` pointing at their heading id.
- Exactly one `<h1>` per page.
- `prefers-reduced-motion` is respected.

Add on top of that: visible focus rings, a skip-to-content link, and `aria-expanded` on the FAQ
accordion and mobile menu.
