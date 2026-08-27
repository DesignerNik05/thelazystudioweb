/**
 * All user-facing system strings. Never inline these in a component.
 * See .claude/rules/constants.md.
 */
export const VALIDATION_MESSAGES = {
  REQUIRED: (field: string) => `${field} is required`,
  INVALID_EMAIL: "Enter a valid email address",
  MIN_LENGTH: (field: string, n: number) => `${field} must be at least ${n} characters`,
  TOO_LONG: (field: string, n: number) => `${field} must be under ${n} characters`,
} as const;

export const ERROR_MESSAGES = {
  GENERIC: "Something went wrong. Please try again.",
  SUBMIT_FAILED:
    "We couldn't send your message. Please email hello@thelazystudio.com and we'll pick it up there.",
  RATE_LIMITED: "That's a few messages in quick succession — please try again in a minute.",
} as const;

export const SUCCESS_MESSAGES = {
  MESSAGE_SENT: "Thanks — we'll be in touch within one working day.",
} as const;

export const EMPTY_STATES = {
  NO_PROJECTS: "No projects in this category yet.",
  NO_POSTS: "No posts match that search.",
} as const;
