/**
 * One schema, used by both the browser form and the /api/contact function,
 * so the client and server can never disagree about what is valid.
 */
import { z } from "zod";
import { VALIDATION_MESSAGES as V } from "./messages";

export const contactSchema = z.object({
  name: z.string().trim().min(1, V.REQUIRED("Name")).max(120, V.TOO_LONG("Name", 120)),
  email: z.email(V.INVALID_EMAIL).max(200, V.TOO_LONG("Email", 200)),
  company: z.string().trim().max(160, V.TOO_LONG("Company", 160)).optional().or(z.literal("")),
  projectType: z.string().trim().min(1, V.REQUIRED("Project type")),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  timeline: z.string().trim().max(80).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, V.MIN_LENGTH("Project context", 10))
    .max(5000, V.TOO_LONG("Project context", 5000)),
  needsBriefHelp: z.boolean().optional(),
});

export type ContactSubmission = z.infer<typeof contactSchema>;
