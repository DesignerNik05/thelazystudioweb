# TypeScript Rules — The Lazy Studio

> **Status:** the repo is currently plain JS/JSX with no `tsconfig.json`. These rules apply as files
> are migrated. Migrate _after_ `App.jsx` is split into pages/sections — converting one 3,299-line
> file is painful; converting sixty small ones is routine.

Running example: the **project** content shape used by the home and portfolio pages.

## No `any`

Use `unknown` and narrow it.

```ts
// Wrong
const parse = (data: any) => { ... };

// Correct
const parse = (data: unknown): ContactResponse => {
  if (!isContactResponse(data)) throw new Error('Invalid response');
  return data;
};
```

## All interfaces in `@types/`

Content shapes are shared across pages, so they live in `src/@types/index.ts`. Props used by exactly
one page may live in that page's `@types/index.ts`. Never inline in a component file.

```ts
// Wrong — inline in ProjectCard.tsx
interface Props {
  project: { title: string; tags: string[] };
}

// Correct — in src/@types/index.ts
export interface ProjectCardProps {
  project: Project;
}
```

## Content interfaces

**All content shapes live in `src/@types/index.ts`.** They were derived from the real data in
`src/data/`, not hand-written — read that file rather than trusting an example here.

A few shapes are easy to guess wrong, so note them:

```ts
export interface BlogPost {
  date: string; // display string, e.g. "Aug 18, 2026"
  datetime: string; // ISO 8601 — the machine-readable counterpart
  comments: string; // a display string like "04", NOT a number
  featured?: boolean;
}

export interface Project {
  stats?: readonly string[]; // flat strings, and absent on all but the featured entry
  visual: ProjectVisualKind;
}

export interface ContactDetail {
  href?: string; // only the actionable rows (e.g. mailto:) have one
}
```

Two rules that matter for content:

- **Array fields are `readonly`.** Content is never mutated at runtime.
- **Optional means optional.** `featured`, `href`, and `stats` genuinely aren't on every item;
  typing them as required forces fake values into the data.

## Data modules are annotated, not `as const satisfies`

Write the interface as an explicit annotation:

```ts
import type { Service } from "@/@types";

export const services: readonly Service[] = [
  {
    label: "Digital / Web",
    title: "Digital Experiences",
    description: "…",
    tags: ["Website Strategy"],
  },
];
```

```ts
// Wrong — `as` silently accepts a malformed object
export const services = [ ... ] as Service[];
```

> **Why not `as const satisfies readonly Service[]`?** It was tried and reverted. It preserves the
> literal type of every entry, so a field that is optional on the interface but absent from one entry
> becomes a union that consumers cannot read: `contactDetails[n].href` errors with
> _"Property 'href' does not exist on type ..."_. The explicit annotation gives **identical**
> type-safety — a mistyped `category` is still a compile error, because the literal must be
> assignable to the union — with none of that friction. Reach for `as const` only when you actually
> need to _derive_ a type from the values.

The union types (`PortfolioCategory`, `FaqCategory`, `ProjectVisualKind`, …) are declared in
`@types/index.ts` and are what make a typo fail to compile:

```ts
export type PortfolioCategory = "UI/UX" | "Websites" | "AI Workflows" | "Branding" | "Marketing";
export type PortfolioFilter = "All" | PortfolioCategory;
```

Because `portfolioProjects` is `readonly PortfolioProject[]` and `portfolioFilters` is
`readonly PortfolioFilter[]`, the filter list and the data can no longer drift apart silently.

## Explicit return types on exported functions — except components

Exported helpers get explicit return types. Component arrow functions do **not** — TypeScript infers
the JSX return and the annotation is noise.

```ts
// Correct — helper: explicit
export const formatPostDate = (isoDate: string): string => { ... };

// Correct — component: no annotation
const ProjectCard = ({ project }: ProjectCardProps) => { ... };

// Wrong — exported helper relying on inference
export const formatPostDate = (isoDate: string) => { ... };
```

Internal (non-exported) helpers may rely on inference when the return type is obvious.

## Zod schema is the source of truth for form types

Derive form types from the schema — never define them twice. Validation strings come from constants.

```ts
import { VALIDATION_MESSAGES as V } from "@/constants/messages";

const contactSchema = z.object({
  name: z.string().min(1, V.REQUIRED("Name")),
  email: z.string().email(V.INVALID_EMAIL),
  message: z.string().min(10, V.MIN_LENGTH("Message", 10)),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// Wrong — duplicate type definition
interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}
```

## Enum-like constants use `as const` — never the `enum` keyword

The `enum` keyword emits runtime code.

```ts
// Correct
export const PROJECT_CATEGORY = {
  ALL: "All",
  UI_UX: "UI/UX",
  WEBSITES: "Websites",
  AI_WORKFLOWS: "AI Workflows",
  BRANDING: "Branding",
  MARKETING: "Marketing",
} as const;
export type ProjectCategory = (typeof PROJECT_CATEGORY)[keyof typeof PROJECT_CATEGORY];

// Wrong
enum ProjectCategory {
  UI_UX,
  WEBSITES,
}
```

This matters here: the portfolio filter list and each project's `category` field must agree. Typing
`category` as `ProjectCategory` makes a typo in the data a compile error instead of a filter that
silently returns nothing.

## Discriminated unions for multi-state UI

```ts
// Correct — used by the contact form
type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

// Wrong — boolean soup
interface State {
  isSending: boolean;
  isSent: boolean;
  error: string | null;
}
```

## No non-null assertions, no `as` casting on external data

```ts
// Wrong
const el = document.getElementById("root")!;
const body = response as ContactResponse;

// Correct
const el = document.getElementById("root");
if (!el) throw new Error("Root element not found");

const body = parseContactResponse(await response.json()); // validates, throws if invalid
```

## Typing DOM refs

The carousel and marquee code uses refs heavily. Type them properly rather than reaching for `any`.

```ts
const trackRef = useRef<HTMLDivElement>(null);
const pauseAutoUntil = useRef<number>(0);

// Guard before use — refs are null on first render
const scrollBy = (amount: number): void => {
  trackRef.current?.scrollBy({ left: amount, behavior: "smooth" });
};
```

## Recommended `tsconfig.json` strictness

```jsonc
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true, // array access returns T | undefined — catches carousel index bugs
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "verbatimModuleSyntax": true, // enforces `import type`
    "paths": { "@/*": ["./src/*"] },
  },
}
```
