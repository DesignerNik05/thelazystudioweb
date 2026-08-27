/** Brand-level constants. One source for anything that names the studio. */
export const SITE = {
  NAME: "The Lazy Studio",
  TAGLINE: "AI-first design and development collective",
  EMAIL: "hello@thelazystudio.com",
  /** Set to the production origin once the domain is attached — used for canonical + OG URLs. */
  URL: "https://thelazystudio.com",
  /** Absolute URL required — unfurlers do not resolve relative paths. */
  OG_IMAGE: "https://thelazystudio.com/assets/og-cover.png",
} as const;
