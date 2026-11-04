import "server-only";
import { Resend } from "resend";
import { getServerEnv } from "@/lib/env";
import { sanitizeText } from "@/lib/sanitize";

export type LeadMail = {
  name: string;
  phone: string;
  message: string;
};

const OWNER_INBOX = "Twbwl7@gmail.com";

/** Strip CR/LF from header-bound values (header injection). */
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

function formatIsraelTime(d = new Date()) {
  try {
    return new Intl.DateTimeFormat("he-IL", {
      timeZone: "Asia/Jerusalem",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  } catch {
    return d.toISOString();
  }
}

function toWaDigits(phone: string) {
  let d = phone.replace(/\D/g, "");
  if (d.startsWith("0")) d = `972${d.slice(1)}`;
  else if (!d.startsWith("972") && d.length === 9) d = `972${d}`;
  return d.slice(0, 15);
}

/** Recipients: always owner inbox + CONTACT_TO_EMAIL if different. */
export function resolveLeadRecipients(configured?: string): string[] {
  const set = new Set<string>();
  set.add(OWNER_INBOX.toLowerCase());
  const extra = (configured || "").trim().toLowerCase();
  if (extra && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(extra)) set.add(extra);
  return [...set];
}

/** Gmail-safe RTL Hebrew lead email. */
export function buildLeadEmailContent(lead: LeadMail) {
  const name = lead.name.trim();
  const phone = lead.phone.trim();
  const message = (lead.message || "").trim() || "—";
  const when = formatIsraelTime();
  const wa = toWaDigits(phone);
  const waHref = `https://wa.me/${wa}?text=${encodeURIComponent(`היי ${name}, קיבלתי את הפנייה מהאתר. נדבר?`)}`;

  const subject = headerSafe(`פנייה חדשה מהאתר · ${name}`);

  // RLM (\u200F) + LRM (\u200E) keep Gmail plain-text RTL
  const bodyText = [
    "\u200F════════════════════════════════",
    "\u200Fפנייה חדשה מהאתר — דוד טובול",
    "\u200F════════════════════════════════",
    "",
    `\u200Fשם מלא: ${name}`,
    `\u200Fטלפון / וואטסאפ: \u200E${phone}\u200F`,
    "",
    "\u200Fעל הפרויקט:",
    `\u200F${message}`,
    "",
    `\u200Fהתקבל: ${when}`,
    `\u200Fלשיחה: \u200E${waHref}\u200F`,
  ].join("\n");

  // Table + align=right on every cell — Gmail ignores many CSS dir rules
  const bodyHtml = `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(subject)}</title>
</head>
<body dir="rtl" bgcolor="#F3EFE6" style="margin:0;padding:0;background-color:#F3EFE6;direction:rtl !important;text-align:right !important;">
<!--[if mso]><div dir="rtl"><![endif]-->
<table role="presentation" dir="rtl" width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#F3EFE6" style="direction:rtl;width:100%;background-color:#F3EFE6;">
  <tr>
    <td dir="rtl" align="center" style="direction:rtl;text-align:center;padding:28px 12px;">
      <table role="presentation" dir="rtl" width="560" border="0" cellpadding="0" cellspacing="0" bgcolor="#FAF9F6" style="direction:rtl;width:100%;max-width:560px;background-color:#FAF9F6;border:1px solid #E0C992;border-radius:14px;">
        <tr>
          <td dir="rtl" align="right" style="direction:rtl;text-align:right;padding:24px 24px 8px;font-family:Arial,Helvetica,sans-serif;">
            <p dir="rtl" style="margin:0;direction:rtl;text-align:right;font-size:12px;color:#C5A059;letter-spacing:0.12em;">&#x200F;דוד טובול · האתר</p>
            <h1 dir="rtl" style="margin:10px 0 0;direction:rtl;text-align:right;font-size:22px;line-height:1.4;font-weight:700;color:#121212;">&#x200F;התקבלה פנייה חדשה</h1>
          </td>
        </tr>
        <tr>
          <td dir="rtl" align="right" style="direction:rtl;text-align:right;padding:8px 24px 0;">
            <table role="presentation" dir="rtl" width="100%" border="0" cellpadding="0" cellspacing="0" style="direction:rtl;border-top:1px solid #E8D5A3;">
              <tr>
                <td dir="rtl" align="right" style="direction:rtl;text-align:right;padding:16px 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#7A7A7A;">&#x200F;שם מלא</td>
              </tr>
              <tr>
                <td dir="rtl" align="right" style="direction:rtl;text-align:right;padding:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:700;color:#121212;">&#x200F;${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td dir="rtl" align="right" style="direction:rtl;text-align:right;padding:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#7A7A7A;">&#x200F;טלפון / וואטסאפ</td>
              </tr>
              <tr>
                <td dir="rtl" align="right" style="direction:rtl;text-align:right;padding:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:700;color:#121212;">
                  <a href="tel:${escapeHtml(phone.replace(/\s/g, ""))}" dir="ltr" style="color:#121212;text-decoration:none;unicode-bidi:isolate;direction:ltr;">${escapeHtml(phone)}</a>
                </td>
              </tr>
              <tr>
                <td dir="rtl" align="right" style="direction:rtl;text-align:right;padding:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#7A7A7A;">&#x200F;על הפרויקט</td>
              </tr>
              <tr>
                <td dir="rtl" align="right" bgcolor="#FFFFFF" style="direction:rtl;text-align:right;padding:14px 16px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.75;color:#2A2A2A;background-color:#FFFFFF;border:1px solid #EBE6DC;border-radius:10px;">
                  &#x200F;${escapeHtml(message).replace(/\n/g, "<br/>")}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td dir="rtl" align="right" style="direction:rtl;text-align:right;padding:20px 24px 24px;font-family:Arial,Helvetica,sans-serif;">
            <p dir="rtl" style="margin:0 0 16px;direction:rtl;text-align:right;font-size:12px;color:#8A8A8A;">&#x200F;התקבל: ${escapeHtml(when)}</p>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" dir="rtl" style="direction:rtl;">
              <tr>
                <td align="center" bgcolor="#121212" style="border-radius:999px;border:1px solid #C5A059;">
                  <a href="${waHref}" dir="rtl" style="display:inline-block;padding:12px 20px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;color:#FAF9F6;text-decoration:none;direction:rtl;">
                    &#x200F;פתיחת שיחה בוואטסאפ עם הפונה
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <p dir="rtl" style="margin:16px 0 0;direction:rtl;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#9A9A9A;">
        &#x200F;נשלח אוטומטית מכל פנייה באתר · davidwebsitebuilder.vercel.app
      </p>
    </td>
  </tr>
</table>
<!--[if mso]></div><![endif]-->
</body>
</html>`;

  return { subject, bodyText, bodyHtml };
}

/**
 * Send EVERY lead to the owner inbox via Resend.
 */
export async function sendLeadEmail(
  lead: LeadMail,
): Promise<{ ok: boolean; reason?: string; to?: string[] }> {
  const env = getServerEnv();
  const key = env.RESEND_API_KEY?.trim();

  if (!key) {
    console.warn("[mail] RESEND_API_KEY missing — lead email not sent.", {
      name: lead.name,
      phone: lead.phone,
    });
    return { ok: false, reason: "mail_not_configured" };
  }

  const to = resolveLeadRecipients(env.CONTACT_TO_EMAIL);
  // ASCII from-name — Hebrew here breaks some clients / Resend parsing
  const from =
    env.CONTACT_FROM_EMAIL?.trim() ||
    "David Tubul Website <onboarding@resend.dev>";

  const { subject, bodyText, bodyHtml } = buildLeadEmailContent(lead);

  try {
    const resend = new Resend(key);
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      text: bodyText,
      html: bodyHtml,
      tags: [{ name: "type", value: "site-lead" }],
    });

    if (error) {
      console.error("[mail] Resend error", error);
      return { ok: false, reason: "mail_send_failed", to };
    }

    console.info("[mail] lead emailed", { id: data?.id, to });
    return { ok: true, to };
  } catch (err) {
    console.error("[mail] unexpected", err);
    return { ok: false, reason: "mail_send_failed", to };
  }
}
