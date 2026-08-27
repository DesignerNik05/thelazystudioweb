/**
 * Blog posts, categories, and tags.
 *
 * Site content - see .claude/rules/structure.md.
 * Content is data, never JSX. Do not add markup to these strings.
 */

import type { BlogCategory, BlogPost } from "@/@types";

export const blogPosts: readonly BlogPost[] = [
  {
    title: "Why your website should do less, better",
    date: "July 13, 2026",
    datetime: "2026-07-13",
    excerpt:
      "The strongest websites do not shout at visitors. They guide the right people toward the right action with less friction.",
    image: "/assets/lazy-studio-hero.png",
    alt: "Cinematic red and blue lit creative technologist in a dark studio",
    category: "Website Strategy",
    author: "The Lazy Studio",
    comments: "0",
    featured: true,
  },
  {
    title: "A useful UX audit before the redesign sprint",
    date: "June 28, 2026",
    datetime: "2026-06-28",
    excerpt:
      "Before changing the visuals, find the leaks: unclear flows, weak hierarchy, missing trust, and decisions that make users work too hard.",
    image: "/assets/marquee-consultant.png",
    alt: "Creative consultant reviewing digital campaign work",
    category: "UI/UX Design",
    author: "The Lazy Studio",
    comments: "0",
  },
  {
    title: "AI workflows that are actually worth building",
    date: "June 10, 2026",
    datetime: "2026-06-10",
    excerpt:
      "Good AI systems remove repetitive work, clarify decisions, and give teams time back. The trick is starting with the workflow, not the tool.",
    image: "/assets/marquee-strategist.png",
    alt: "Creative strategist in a neon-lit studio",
    category: "AI Workflows",
    author: "The Lazy Studio",
    comments: "0",
  },
  {
    title: "How to plan a homepage that actually converts",
    date: "May 21, 2026",
    datetime: "2026-05-21",
    excerpt:
      "A useful homepage makes the offer obvious, earns trust quickly, and gives visitors one clean next step instead of twelve competing choices.",
    image: "/assets/marquee-consultant.png",
    alt: "Creative consultant in a modern campaign workspace",
    category: "Website Design",
    author: "The Lazy Studio",
    comments: "0",
  },
  {
    title: "What small businesses should fix before ads",
    date: "April 18, 2026",
    datetime: "2026-04-18",
    excerpt:
      "Paid traffic works better when the basics are tight: message clarity, loading speed, mobile layouts, trust signals, and a landing page that knows its job.",
    image: "/assets/lazy-studio-hero.png",
    alt: "Cinematic red and blue lit creative technologist in a dark studio",
    category: "Digital Marketing",
    author: "The Lazy Studio",
    comments: "0",
  },
  {
    title: "Design systems for teams that move fast",
    date: "March 30, 2026",
    datetime: "2026-03-30",
    excerpt:
      "A lean design system keeps teams consistent without slowing them down. Start with the decisions people repeat every week.",
    image: "/assets/marquee-strategist.png",
    alt: "Creative strategist in a neon-lit studio",
    category: "Design Systems",
    author: "The Lazy Studio",
    comments: "0",
  },
];

export const blogCategories: readonly BlogCategory[] = [
  { name: "UI/UX Design", count: 3 },
  { name: "Website Design", count: 4 },
  { name: "AI Workflows", count: 2 },
  { name: "Digital Marketing", count: 2 },
  { name: "Design Systems", count: 1 },
];

export const blogTags: readonly string[] = [
  "Agency",
  "AI",
  "Branding",
  "Design",
  "Marketing",
  "Product",
  "SEO",
  "Startup",
  "Websites",
];
