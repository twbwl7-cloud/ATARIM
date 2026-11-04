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

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Israel-local Hebrew datetime for the inbox. */
function formatIsraelTime(d = new Date()) {
  try {
    return new Intl.DateTimeFormat("he-IL", {
      timeZone: "Asia/Jerusalem",
      dateStyle: "full",
      timeStyle: "short",
    }).format(d);
  } catch {
    return d.toISOString();
  }
}

/** Normalize IL phone → digits for wa.me */
function toWaDigits(phone: string) {
  let d = phone.replace(/\D/g, "");
  if (d.startsWith("0")) d = `972${d.slice(1)}`;
  else if (!d.startsWith("972") && d.length === 9) d = `972${d}`;
  return d.slice(0, 15);
}

/** Build a clean RTL Hebrew lead email (HTML + plain text). */
export function buildLeadEmailContent(lead: LeadMail) {
  const name = lead.name.trim();
  const phone = lead.phone.trim();
  const message = (lead.message || "").trim() || "—";
  const when = formatIsraelTime();

  const subject = headerSafe(`פנייה חדשה מהאתר · ${name}`);

  // Plain text — RTL marks help Gmail/Outlook Hebrew rendering
  const bodyText = [
    "\u200Fפנייה חדשה מהאתר של דוד טובול",
    "",
    `\u200Fשם: ${name}`,
    `\u200Fטלפון: \u200E${phone}\u200F`,
    `\u200Fעל הפרויקט:`,
    `\u200F${message}`,
    "",
    `\u200Fהתקבל: ${when}`,
  ].join("\n");

  const bodyHtml = `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f3efe6;direction:rtl;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" dir="rtl" style="direction:rtl;background:#f3efe6;">
    <tr>
      <td align="center" style="padding:28px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" dir="rtl" style="direction:rtl;max-width:560px;background:#faf9f6;border:1px solid rgba(197,160,89,0.35);border-radius:16px;">
          <tr>
            <td style="padding:22px 24px 10px;text-align:right;direction:rtl;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;">
              <p style="margin:0;font-size:11px;letter-spacing:0.18em;color:#c5a059;">דוד טובול · פנייה חדשה</p>
              <h1 style="margin:10px 0 0;font-size:22px;font-weight:600;line-height:1.35;color:#121212;">התקבלה פנייה מהאתר</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 24px 4px;text-align:right;direction:rtl;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" dir="rtl" style="direction:rtl;border-top:1px solid rgba(197,160,89,0.28);">
                <tr>
                  <td style="padding:16px 0 8px;font-family:Arial,sans-serif;font-size:13px;color:#5c5c5c;text-align:right;">שם מלא</td>
                </tr>
                <tr>
                  <td style="padding:0 0 14px;font-family:Arial,sans-serif;font-size:17px;font-weight:600;color:#121212;text-align:right;direction:rtl;">${escapeHtml(name)}</td>
                </tr>
                <tr>
                  <td style="padding:0 0 8px;font-family:Arial,sans-serif;font-size:13px;color:#5c5c5c;text-align:right;">טלפון / וואטסאפ</td>
                </tr>
                <tr>
                  <td style="padding:0 0 14px;font-family:Arial,sans-serif;font-size:17px;font-weight:600;color:#121212;text-align:right;">
                    <a href="tel:${escapeHtml(phone.replace(/\s/g, ""))}" dir="ltr" style="color:#121212;text-decoration:none;unicode-bidi:isolate;">${escapeHtml(phone)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 8px;font-family:Arial,sans-serif;font-size:13px;color:#5c5c5c;text-align:right;">על הפרויקט</td>
                </tr>
                <tr>
                  <td style="padding:12px 14px;font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:#2a2a2a;text-align:right;direction:rtl;background:#fff;border:1px solid rgba(18,18,18,0.08);border-radius:10px;">
                    ${escapeHtml(message).replace(/\n/g, "<br/>")}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 24px 22px;text-align:right;direction:rtl;font-family:Arial,sans-serif;">
              <p style="margin:0 0 14px;font-size:12px;color:#8a8a8a;">התקבל: ${escapeHtml(when)}</p>
              <a href="https://wa.me/${toWaDigits(phone)}?text=${encodeURIComponent(`היי ${name}, קיבלתי את הפנייה מהאתר. נדבר?`)}"
                 style="display:inline-block;padding:11px 18px;border-radius:999px;background:#121212;color:#faf9f6;font-size:13px;font-weight:500;text-decoration:none;border:1px solid #c5a059;">
                פתיחת שיחה בוואטסאפ
              </a>
            </td>
          </tr>
        </table>
        <p style="margin:14px 0 0;font-family:Arial,sans-serif;font-size:11px;color:#9a9a9a;text-align:center;direction:rtl;">
          נשלח אוטומטית מאתר דוד טובול
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, bodyText, bodyHtml };
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
    console.warn("[mail] RESEND_API_KEY missing — lead email not sent.", {
      name: lead.name,
      phone: lead.phone,
    });
    return { ok: false, reason: "mail_not_configured" };
  }

  const to = env.CONTACT_TO_EMAIL;
  const from =
    env.CONTACT_FROM_EMAIL?.trim() ||
    "דוד טובול · האתר <onboarding@resend.dev>";

  const { subject, bodyText, bodyHtml } = buildLeadEmailContent(lead);

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject,
      text: bodyText,
      html: bodyHtml,
      headers: {
        "X-Entity-Ref-ID": `lead-${Date.now()}`,
      },
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
