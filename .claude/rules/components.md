# Component Rules — The Lazy Studio

Running example: the **portfolio** page — a filter row plus a grid of project cards.

## Components are arrow functions

Every component is a `const` arrow function with a typed props parameter. No `function` keyword.
No return-type annotation — TypeScript infers it.

```tsx
// Correct
const ProjectCard = ({ project }: ProjectCardProps) => {
  return <article className="rounded-card border border-border p-6">...</article>;
};
export { ProjectCard };

// Wrong — function declaration
export function ProjectCard({ project }: ProjectCardProps): JSX.Element { ... }

// Wrong — redundant annotation
const ProjectCard = ({ project }: ProjectCardProps): JSX.Element => { ... };
```

> The current codebase uses `function` declarations throughout (`function HomePage()`,
> `function SiteHeader()`). Convert as you touch them.

Props interfaces live in `@types/index.ts`, never inline — see `.claude/rules/typescript.md`.

## shadcn/ui is the only UI library

Never build a custom Button, Input, Dialog, Accordion, Tabs, Select, Badge, or Carousel that
shadcn/ui already provides. Check first: https://ui.shadcn.com/docs/components

This site's hand-built widgets map onto shadcn primitives:

| Currently hand-built                                              | Use instead                                                    |
| ----------------------------------------------------------------- | -------------------------------------------------------------- |
| FAQ accordion (`FAQPageAccordionItem`, open/close via `useState`) | `<Accordion>` — gets `aria-expanded` and keyboard nav for free |
| Portfolio filter row (6 categories)                               | `<Tabs>` or `<ToggleGroup>`                                    |
| Services carousel (drag + auto-advance)                           | `<Carousel>` + the existing pause-on-interact logic            |
| Contact form inputs                                               | `<Form>` + `<Input>` + `<Textarea>`                            |
| Tag / category chips                                              | `<Badge>`                                                      |
| Mobile nav (currently a scroll strip)                             | `<Sheet>`                                                      |

Genuinely custom, keep hand-built: the marquee, `ProjectVisual` artwork, orb rings, ghost type,
and the glow layers. shadcn has no equivalent and shouldn't.

## Adding shadcn/ui components

Use the CLI — never copy-paste from the docs:

```bash
npx shadcn@latest add button
npx shadcn@latest add accordion
npx shadcn@latest add form
```

Files land in `src/components/ui/`. **Never hand-edit those.** Need a variant? Wrap it.

## Reusable common components — wrap, don't rebuild

shadcn/ui primitives are the base layer. When the same composition appears in two or more places,
wrap it once in `src/components/common/`. Wrappers **compose** shadcn/ui — they never replace it.

```
src/components/common/
├── SectionKicker.tsx   # red dot + uppercase label — 42 uses in the current code
├── AppButton.tsx       # <Button> + primary/ghost variants, pill radius, loading state
├── LinkArrow.tsx       # text + ↗ arrow — 9 uses
├── ProjectCard.tsx     # project/portfolio card — one component, variants via cva
├── ProjectVisual.tsx   # abstract panel/line/glow artwork — 33 uses
├── FinalCTA.tsx        # closing call-to-action band — 10 uses
├── Marquee.tsx         # scrolling marquee strip
├── FormInput.tsx       # <FormField> + <FormItem> + <Input> wired together
└── index.ts            # barrel
```

`SectionKicker` is the clearest example — 42 hand-rolled copies today:

```tsx
// src/components/common/SectionKicker.tsx
import { cn } from "@/lib/utils";
import type { SectionKickerProps } from "@/@types";

const SectionKicker = ({ label, className }: SectionKickerProps) => {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-kicker font-medium uppercase text-primary",
        className,
      )}
    >
      <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
      {label}
    </p>
  );
};

export { SectionKicker };
```

Rule: build a `common/` wrapper when the same composition appears **twice**. A one-off stays in its
section.

## Import from `@/components/ui/`

```tsx
// Correct
import { Button } from "@/components/ui/button";

// Wrong — never import the underlying primitive lib directly in feature code
import * as Accordion from "@radix-ui/react-accordion";
```

## Variants via `cva`, not boolean props

`ProjectCard` renders in two shapes today (`project-card` on home, `portfolio-card` on portfolio).
That is one component with a variant, not two components and not an `isPortfolio` boolean.

```tsx
import { cva, type VariantProps } from "class-variance-authority";

const projectCardVariants = cva(
  "rounded-card border border-border transition-colors duration-150",
  {
    variants: {
      size: {
        compact: "p-6",
        featured: "p-8 md:col-span-2",
      },
    },
    defaultVariants: { size: "compact" },
  },
);
```

## Form pattern — React Hook Form + Zod + shadcn/ui

Validation messages come from constants (`.claude/rules/constants.md`); types derive from the Zod
schema (`.claude/rules/typescript.md`).

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { FormInput, AppButton } from "@/components/common";
import { VALIDATION_MESSAGES as V, SUCCESS_MESSAGES, ERROR_MESSAGES } from "@/constants/messages";

// 1. Schema is the source of truth for types
const contactSchema = z.object({
  name: z.string().min(1, V.REQUIRED("Name")),
  email: z.string().email(V.INVALID_EMAIL),
  company: z.string().optional(),
  projectType: z.string().min(1, V.REQUIRED("Project type")),
  message: z.string().min(10, V.MIN_LENGTH("Message", 10)),
});

// 2. Derive the type — never define it separately
type ContactFormValues = z.infer<typeof contactSchema>;

const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", company: "", projectType: "", message: "" },
  });

  const handleSubmit = async (values: ContactFormValues) => {
    try {
      await submitContactForm(values);
      toast.success(SUCCESS_MESSAGES.MESSAGE_SENT);
      form.reset();
    } catch {
      toast.error(ERROR_MESSAGES.SUBMIT_FAILED);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormInput control={form.control} name="name" label="Name" placeholder="Your name" />
        <FormInput
          control={form.control}
          name="email"
          label="Email"
          placeholder="you@company.com"
        />
        <AppButton type="submit" loading={form.formState.isSubmitting}>
          Send
        </AppButton>
      </form>
    </Form>
  );
};

export { ContactForm };
```

### The form must actually submit

The current contact form is a **stub**: `handleSubmit` runs a 650ms `setTimeout`, then sets status
to `"sent"` and clears the fields. Nothing is transmitted, and the visitor is told their message was
delivered. The blog search does the same (`onSubmit={(e) => e.preventDefault()}`).

Never ship a success state for an action that did not happen. Wire it to a real endpoint (Formspree,
Resend, a serverless function) before the success toast is allowed to fire. Until an endpoint exists,
the button should be disabled with an explanatory note — not a fake confirmation.

## Toasts — Sonner, strings from constants

```tsx
import { toast } from "sonner";
import { SUCCESS_MESSAGES } from "@/constants/messages";

toast.success(SUCCESS_MESSAGES.MESSAGE_SENT);
```

Never `alert()` or a custom toast implementation.

## Images

Every image needs a real `alt`, or `alt=""` plus `aria-hidden="true"` if decorative. The current
build gets this right — hold the line.

```tsx
// Below-the-fold images are lazy; the hero is eager with high priority
<img src="/assets/marquee-strategist.webp" alt="Strategist at work" loading="lazy" decoding="async" />
<img src="/assets/lazy-studio-hero.webp" alt="Creative technologist in a dark studio" fetchPriority="high" />
```

Assets are currently **5.4 MB of unoptimized PNG with zero lazy-loading**. Convert to WebP/AVIF and
lazy-load everything below the fold.

## Styling & design tokens

All visual styling — colors, spacing, type ramp, radius, motion, states — lives in
`.claude/rules/design.md`. In short: Tailwind utility classes only, semantic tokens never raw hex,
conditional classes via `cn()`.

## Component file rules

- One component per file; anything reused gets its own file.
- Arrow functions; no `: JSX.Element`.
- Props interface in `@types/index.ts` — never inline.
- Named exports — except route-level pages loaded via `React.lazy`.
