import "server-only";
import { getServerEnv } from "@/lib/env";
import { sanitizeText } from "@/lib/sanitize";

export type LeadRow = {
  name: string;
  phone: string;
  message: string;
};

/** LRM so Excel / Sheets keep phone digits LTR (Script AppSec note). */
function excelSafePhone(phone: string) {
  const clean = phone.replace(/[^\d+()\-\s]/g, "").trim();
  return `\u200E${clean}`;
}

function israelStamp(d = new Date()) {
  try {
    return new Intl.DateTimeFormat("he-IL", {
      timeZone: "Asia/Jerusalem",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(d);
  } catch {
    return d.toISOString();
  }
}

/** UTF-8 BOM CSV — opens cleanly in Excel with Hebrew headers. */
export function buildLeadCsv(lead: LeadRow): string {
  const stamp = israelStamp();
  const cells = [
    stamp,
    lead.name,
    excelSafePhone(lead.phone),
    lead.message || "—",
    "האתר",
  ].map((c) => {
    const s = String(c).replace(/"/g, '""');
    return `"${s}"`;
  });
  const header = ["תאריך", "שם מלא", "טלפון", "על הפרויקט", "מקור"]
    .map((h) => `"${h}"`)
    .join(",");
  return `\uFEFF${header}\n${cells.join(",")}\n`;
}

/**
 * Append lead as a new row in Google Sheets via Apps Script / Make webhook.
 * Env: GOOGLE_SHEETS_WEBHOOK_URL
 */
export async function appendLeadToSheet(
  lead: LeadRow,
): Promise<{ ok: boolean; reason?: string }> {
  const env = getServerEnv();
  const url = env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();

  if (!url || url === "PLACEHOLDER_URL") {
    return { ok: false, reason: "sheets_not_configured" };
  }

  const payload = {
    timestamp: israelStamp(),
    iso: new Date().toISOString(),
    name: sanitizeText(lead.name, 80),
    phone: excelSafePhone(lead.phone),
    phoneRaw: lead.phone,
    message: sanitizeText(lead.message || "—", 2000),
    source: "david-tubul-site",
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error(
        "[sheets] webhook failed",
        res.status,
        await res.text().catch(() => ""),
      );
      return { ok: false, reason: "sheets_webhook_failed" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[sheets] unexpected", err);
    return { ok: false, reason: "sheets_webhook_failed" };
  }
}
