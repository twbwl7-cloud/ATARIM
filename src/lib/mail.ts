import "server-only";
import { Resend } from "resend";
import { getServerEnv } from "@/lib/env";
import { sanitizeText } from "@/lib/sanitize";

export type LeadMail = {
  name: string;
  phone: string;
  message: string;
};

/** Strip CR/LF from header-bound values (Script AppSec — header injection). */
function headerSafe(value: string) {
  return sanitizeText(value, 200).replace(/[\r\n]+/g, " ").trim();
}

/**
 * Deliver lead to inbox (Resend).
 * Requires RESEND_API_KEY in env (local + Vercel).
 */
export async function sendLeadEmail(
  lead: LeadMail,
): Promise<{ ok: boolean; reason?: string }> {
  const env = getServerEnv();
  const key = env.RESEND_API_KEY?.trim();

  if (!key) {
    console.warn(
      "[mail] RESEND_API_KEY missing — lead email not sent.",
      { name: lead.name, phone: lead.phone },
    );
    return { ok: false, reason: "mail_not_configured" };
  }

  const to = env.CONTACT_TO_EMAIL;
  const from =
    env.CONTACT_FROM_EMAIL?.trim() ||
    "David Tubul Site <onboarding@resend.dev>";

  const subject = headerSafe(`ליד חדש מהאתר — ${lead.name}`);
  const bodyText = [
    "ליד חדש מהאתר של דוד טובול",
    "",
    `שם: ${lead.name}`,
    `טלפון: ${lead.phone}`,
    `הודעה: ${lead.message || "—"}`,
    "",
    `זמן: ${new Date().toISOString()}`,
  ].join("\n");

  const bodyHtml = `
    <div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.6;color:#121212">
      <h2 style="margin:0 0 12px;font-weight:500">ליד חדש מהאתר</h2>
      <p><strong>שם:</strong> ${escapeHtml(lead.name)}</p>
      <p><strong>טלפון:</strong> <span dir="ltr">${escapeHtml(lead.phone)}</span></p>
      <p><strong>הודעה:</strong><br/>${escapeHtml(lead.message || "—").replace(/\n/g, "<br/>")}</p>
      <p style="color:#888;font-size:12px;margin-top:24px">${new Date().toISOString()}</p>
    </div>
  `;

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: undefined,
      subject,
      text: bodyText,
      html: bodyHtml,
    });

    if (error) {
      console.error("[mail] Resend error", error);
      return { ok: false, reason: "mail_send_failed" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[mail] unexpected", err);
    return { ok: false, reason: "mail_send_failed" };
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
