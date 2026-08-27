/**
 * All environment access lives here — never read import.meta.env elsewhere.
 * See CLAUDE.md, Source Layout.
 *
 * VITE_* values are inlined into the client bundle at build time, so they are
 * public. That is fine for a form endpoint URL and its public access key, which
 * are visible in any submitted request anyway. Never put a private API key here.
 */
const read = (value: string | undefined): string => (value ?? "").trim();

export const ENV = {
  /** Form-backend URL (Formspree, Web3Forms, ...). Empty until configured. */
  CONTACT_ENDPOINT: read(import.meta.env.VITE_CONTACT_ENDPOINT),
  /** Public access key, required by Web3Forms. Formspree does not use one. */
  CONTACT_ACCESS_KEY: read(import.meta.env.VITE_CONTACT_ACCESS_KEY),
} as const;

/** The contact form only accepts submissions once a delivery endpoint exists. */
export const isContactConfigured = (): boolean => ENV.CONTACT_ENDPOINT.length > 0;
