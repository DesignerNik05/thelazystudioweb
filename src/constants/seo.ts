/**
 * Per-route metadata. Every route needs a title and description.
 * See .claude/rules/constants.md — metadata is config, not markup.
 */
import { ROUTES } from "@/router/paths";
import { SITE } from "./site";

export interface RouteMeta {
  title: string;
  description: string;
}

export const SEO: Record<string, RouteMeta> = {
  [ROUTES.HOME]: {
    title: `${SITE.NAME} — AI-First Design & Development Collective`,
    description:
      "Premium UI/UX, websites, digital products, and useful AI workflows. Human-crafted work with less unnecessary overhead.",
  },
  [ROUTES.PORTFOLIO]: {
    title: `Portfolio — ${SITE.NAME}`,
    description: "Selected work across UI/UX, websites, AI workflows, branding, and marketing.",
  },
  [ROUTES.SERVICES]: {
    title: `Services — ${SITE.NAME}`,
    description:
      "Product design, websites, AI products and workflows, branding, and digital marketing support.",
  },
  [ROUTES.PROCESS]: {
    title: `Process — ${SITE.NAME}`,
    description:
      "How we work: fewer meetings, clearer decisions, and AI used where it actually improves speed or quality.",
  },
  [ROUTES.FAQ]: {
    title: `FAQs — ${SITE.NAME}`,
    description:
      "Answers on services, process, pricing, AI workflows, websites, and ongoing support.",
  },
  [ROUTES.BLOG]: {
    title: `Blog — ${SITE.NAME}`,
    description: "Notes on design, websites, and AI workflows from The Lazy Studio.",
  },
  [ROUTES.ABOUT]: {
    title: `About — ${SITE.NAME}`,
    description:
      "A small AI-first collective building useful interfaces, sharp websites, and AI that works.",
  },
  [ROUTES.CONTACT]: {
    title: `Contact — ${SITE.NAME}`,
    description:
      "Tell us what you are trying to make, fix, launch, or simplify. We reply within one working day.",
  },
};

export const NOT_FOUND_META: RouteMeta = {
  title: `Page not found — ${SITE.NAME}`,
  description: "That page doesn't exist — but the good stuff is one click away.",
};
