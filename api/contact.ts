/**
 * Contact form endpoint — Vercel Serverless Function.
 *
 * Requires two environment variables, set in the Vercel dashboard
 * (Project → Settings → Environment Variables). They are never committed:
 *
 *   RESEND_API_KEY   from https://resend.com/api-keys
 *   CONTACT_TO       where enquiries are delivered, e.g. hello@thelazystudio.com
 *
 * Optional:
 *   CONTACT_FROM     defaults to Resend's shared onboarding sender, which works
 *                    immediately but lands in spam more often. Switch it to an
 *                    address on your own verified domain once DNS is set up.
 */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { contactSchema } from "../src/constants/contactSchema";

const escapeHtml = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const row = (label: string, value: string): string =>
  `<tr><td style="padding:6px 16px 6px 0;color:#898989;vertical-align:top;white-space:nowrap">${label}</td>` +
  `<td style="padding:6px 0;color:#111">${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!apiKey || !to) {
    // Configuration problem, not the visitor's fault — log it, stay vague publicly.
    console.error("Contact form misconfigured: RESEND_API_KEY or CONTACT_TO is missing");
    return res.status(500).json({ error: "The contact form is not configured yet." });
  }

  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return res.status(400).json({ error: "Please check the highlighted fields.", fieldErrors });
  }

  const data = parsed.data;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM ?? "The Lazy Studio <onboarding@resend.dev>",
      to: [to],
      replyTo: data.email,
      subject: `New enquiry — ${data.name}${data.company ? ` (${data.company})` : ""}`,
      html: `
        <div style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:15px;line-height:1.6">
          <h2 style="margin:0 0 16px;font-size:18px">New enquiry from the website</h2>
          <table style="border-collapse:collapse">
            ${row("Name", data.name)}
            ${row("Email", data.email)}
            ${data.company ? row("Company", data.company) : ""}
            ${row("Project type", data.projectType)}
            ${data.budget ? row("Budget", data.budget) : ""}
            ${data.timeline ? row("Timeline", data.timeline) : ""}
            ${data.needsBriefHelp ? row("Wants help with the brief", "Yes") : ""}
            ${row("Context", data.message)}
          </table>
        </div>
      `,
    });

    if (error) {
      console.error("Resend rejected the message:", error);
      return res.status(502).json({ error: "We couldn't send your message just now." });
    }

    return res.status(200).json({ ok: true });
  } catch (cause) {
    console.error("Contact form failed:", cause);
    return res.status(500).json({ error: "We couldn't send your message just now." });
  }
}
