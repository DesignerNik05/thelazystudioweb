/**
 * Frequently asked questions, per page and grouped by category.
 *
 * Site content - see .claude/rules/structure.md.
 * Content is data, never JSX. Do not add markup to these strings.
 */

import type { FaqFilter, FaqGroup, FaqItem } from "@/@types";

export const faqItems: readonly FaqItem[] = [
  {
    question: "What kind of projects do you take on?",
    answer:
      "We focus on UI/UX design, websites, SaaS interfaces, AI-powered workflows, and digital systems for local businesses, startups, and growing teams.",
  },
  {
    question: "Can you design and build the full website?",
    answer:
      "Yes. We can handle strategy, interface design, responsive development, launch support, and post-launch maintenance so the whole web presence stays coherent.",
  },
  {
    question: "How do you use AI in the process?",
    answer:
      "AI helps us move faster through research, prototyping, automation, content structure, and workflow ideas. The taste, decisions, and final craft stay human.",
  },
  {
    question: "Do you also handle marketing, SEO, and ads?",
    answer:
      "Yes, as supporting services. We can help with SEO foundations, campaign creatives, social content, paid ad assets, and performance tracking around the core website or product work.",
  },
];

export const servicesPageFaqs: readonly FaqItem[] = [
  {
    question: "Can you handle design and development together?",
    answer:
      "Yes. The strongest fit is when we can shape the strategy, design the experience, and build the responsive front-end or website as one connected system.",
  },
  {
    question: "Do you create individual service packages?",
    answer:
      "Yes. We can scope a focused sprint, a full project, or monthly support depending on whether you need a launch, redesign, product work, or ongoing improvements.",
  },
  {
    question: "Where do marketing and SEO fit?",
    answer:
      "They support the core design and website work. We can help with SEO foundations, social assets, campaigns, and paid ad creatives when they help the experience perform better.",
  },
  {
    question: "Do you build AI tools from scratch?",
    answer:
      "We start with the workflow and outcome first. Then we prototype the simplest useful AI system, assistant, integration, or internal tool needed to make the work easier.",
  },
];

export const processPageFaqs: readonly FaqItem[] = [
  {
    question: "How long does a typical project take?",
    answer:
      "Focused landing pages can move quickly. Full websites, product redesigns, and AI workflows depend on scope, but we keep timelines clear before the work starts.",
  },
  {
    question: "Can we start if content is not ready?",
    answer:
      "Yes. We can begin with structure, messaging direction, wireframes, and content planning so the page has a clear job before final copy lands.",
  },
  {
    question: "Do you work with existing brands?",
    answer:
      "Yes. We can work inside an existing identity, tighten it for digital, or recommend a lean visual refresh if the brand is holding the interface back.",
  },
  {
    question: "Where does AI fit into the process?",
    answer:
      "AI helps us explore, prototype, organize, automate, and test faster. It does not replace taste, strategy, or the final craft decisions.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We can support maintenance, analytics review, iteration, campaign assets, performance improvements, and small design or development updates.",
  },
];

export const faqPageCategories: readonly FaqFilter[] = [
  "All",
  "Services",
  "Process",
  "Pricing",
  "AI Workflow",
  "Websites",
  "Support",
];

export const featuredFaqs: readonly FaqItem[] = [
  {
    question: "What kind of projects do you take on?",
    answer:
      "We focus on UI/UX design, website design and development, SaaS interfaces, AI-powered workflows, branding support, and digital systems for local businesses, startups, and growing teams.",
  },
  {
    question: "Can you design and build the full website?",
    answer:
      "Yes. We can handle strategy, page structure, interface design, responsive development, launch support, and post-launch care so the whole web presence stays coherent.",
  },
  {
    question: "How do you use AI in the process?",
    answer:
      "AI helps with research, synthesis, prototyping, code support, workflow mapping, QA, and automation planning. The final direction, taste, and decisions stay human.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "Pricing depends on scope, speed, complexity, and ongoing support needs. We can shape a focused sprint, a full project, or a monthly studio partnership around the job.",
  },
];

export const faqPageGroups: readonly FaqGroup[] = [
  {
    category: "Services",
    title: "Services FAQs",
    description: "What we do, what we pair together, and where supporting services fit.",
    items: [
      {
        question: "What services does The Lazy Studio offer?",
        answer:
          "The primary services are UI/UX design, website design and development, digital product design, and AI-powered products or workflows. Branding, marketing, SEO, SMO, ads, and maintenance support those core offers.",
      },
      {
        question: "Do you do UI/UX design and website development together?",
        answer:
          "Yes. That is often the strongest fit: we shape the experience, design the interface, and build the responsive website as one connected system.",
      },
      {
        question: "Do you work on SaaS and app interfaces?",
        answer:
          "Yes. We can help with UX audits, user flows, wireframes, product screens, prototypes, design systems, and front-end-ready UI direction.",
      },
      {
        question: "Do you offer branding?",
        answer:
          "Yes, as a supporting service. We can create or refine visual identity, typography, color, digital assets, and lightweight guidelines when the product or website needs a stronger foundation.",
      },
      {
        question: "Do you handle marketing, SEO, SMO, or paid ads?",
        answer:
          "Yes, but as support around the core digital experience. We can help with SEO foundations, campaign creatives, social content, paid ad assets, and performance tracking.",
      },
    ],
  },
  {
    category: "Process",
    title: "Process FAQs",
    description: "How projects move from messy brief to useful launch.",
    items: [
      {
        question: "What does the process look like?",
        answer:
          "We diagnose the problem, map the structure, design the experience, build the responsive system, enhance where AI is useful, then launch and improve.",
      },
      {
        question: "How long does a typical project take?",
        answer:
          "Focused landing pages can move quickly. Full websites, product redesigns, and AI workflows depend on scope, but we define timing before work begins.",
      },
      {
        question: "Can we start if our content is not ready?",
        answer:
          "Yes. We can begin with strategy, page structure, wireframes, and content direction so the project has a clear shape before final copy lands.",
      },
      {
        question: "How do feedback and approvals work?",
        answer:
          "We keep reviews focused and decision-based. You get clear checkpoints, direct context, and fewer vague rounds of feedback.",
      },
      {
        question: "Do you work async or through calls?",
        answer:
          "Both. Calls are useful for strategy and key decisions. Async updates keep the work moving without adding meetings just to look busy.",
      },
    ],
  },
  {
    category: "Pricing",
    title: "Pricing & Packages FAQs",
    description: "How scope, retainers, and smaller starts can work.",
    items: [
      {
        question: "Do you have fixed packages?",
        answer:
          "We use clear entry points like launch sprints, product design sprints, and monthly support. The final scope is shaped around the actual job.",
      },
      {
        question: "Can we start with a smaller project?",
        answer:
          "Yes. A smaller launch page, UX audit, redesign sprint, or AI workflow prototype can be a smart way to begin.",
      },
      {
        question: "Do you offer monthly support?",
        answer:
          "Yes. Monthly support can include maintenance, design updates, website improvements, AI workflow support, campaign assets, and performance review.",
      },
      {
        question: "What affects project pricing?",
        answer:
          "Scope, number of pages or screens, content needs, CMS complexity, custom development, AI integrations, timeline, and post-launch support all affect pricing.",
      },
      {
        question: "Do you work with startups and small businesses?",
        answer:
          "Yes. The site and process are built to feel approachable for smaller businesses while still being premium enough for serious startups and SaaS teams.",
      },
    ],
  },
  {
    category: "AI Workflow",
    title: "AI Workflow FAQs",
    description: "What AI-first means when outcomes matter more than tools.",
    items: [
      {
        question: "What does AI-first mean?",
        answer:
          "It means we use AI where it makes the work faster, clearer, or more useful. We start with the workflow and desired outcome, not a tool demo.",
      },
      {
        question: "Do you use AI to replace human design work?",
        answer:
          "No. AI assists research, exploration, automation, and QA. Human strategy, taste, judgment, and craft lead the work.",
      },
      {
        question: "Can you build AI assistants or internal tools?",
        answer:
          "Yes. We can design and prototype AI assistants, internal tools, intake systems, workflow interfaces, and useful automations.",
      },
      {
        question: "Can you automate parts of our business workflow?",
        answer:
          "Yes. We map the current workflow first, then identify where automation can remove repetitive work, clarify decisions, or reduce manual handoffs.",
      },
      {
        question: "Which AI tools do you use?",
        answer:
          "Tools may include ChatGPT, Claude, Gemini, Codex, Cursor, Figma AI tools, and automation platforms, but we present them as means to an outcome, not separate services.",
      },
    ],
  },
  {
    category: "Websites",
    title: "Website & Technical FAQs",
    description: "Build platforms, responsive behavior, SEO, CMS, forms, and performance.",
    items: [
      {
        question: "What platforms do you build with?",
        answer:
          "We recommend the stack based on performance, SEO, maintainability, CMS needs, animation requirements, accessibility, and how easy the site needs to be to update.",
      },
      {
        question: "Can you build WordPress websites?",
        answer:
          "Yes. WordPress can be a good fit when the content team needs familiar editing workflows, blog management, or plugin-based functionality.",
      },
      {
        question: "Do you handle responsive design?",
        answer:
          "Yes. Responsive behavior is part of the work, not an extra. We design and test layouts for desktop, tablet, and mobile.",
      },
      {
        question: "Do you help with SEO setup?",
        answer:
          "Yes. We can handle SEO foundations such as structure, metadata, headings, performance basics, indexable pages, and content direction.",
      },
      {
        question: "Can you connect analytics, forms, CMS, or automations?",
        answer:
          "Yes. We can connect contact forms, analytics, CMS content, integrations, and automations when the project calls for it.",
      },
    ],
  },
  {
    category: "Support",
    title: "Support & Launch FAQs",
    description: "What happens after launch and how long-term support works.",
    items: [
      {
        question: "What happens after launch?",
        answer:
          "We can support QA fixes, analytics checks, content updates, performance improvements, maintenance, and practical iterations after the site goes live.",
      },
      {
        question: "Do you provide maintenance?",
        answer:
          "Yes. Maintenance can cover technical updates, small design changes, content support, performance checks, and ongoing improvements.",
      },
      {
        question: "Can you improve an existing website?",
        answer:
          "Yes. We can audit, redesign, rebuild, or improve specific sections depending on what is slowing the website down.",
      },
      {
        question: "Can you redesign without rebuilding everything?",
        answer:
          "Sometimes. If the current foundation is strong enough, we can improve structure, hierarchy, content, and key pages without a full rebuild.",
      },
      {
        question: "Can you work as a long-term digital partner?",
        answer:
          "Yes. That is a strong fit for growing businesses that need ongoing design, web, AI workflow, campaign, and optimization support.",
      },
    ],
  },
];
