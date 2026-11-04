import { NextResponse } from "next/server";
import { getServerEnv, isWhatsAppBotConfigured } from "@/lib/env";
import { sendLeadEmail } from "@/lib/mail";
import { sanitizeText } from "@/lib/sanitize";
import { appendLeadToSheet } from "@/lib/sheets";
import { contactSchema } from "@/lib/sanitize";

/**
 * Contact lead intake:
 *  1. Zod + honeypot
 *  2. Email (RTL + CSV Excel attachment)
 *  3. Google Sheets / Excel table row (GOOGLE_SHEETS_WEBHOOK_URL)
 *  4. Optional WhatsApp bot webhook (no client redirect)
 */
export async function POST(request: Request) {
  try {
    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "invalid_json" },
        { status: 400 },
      );
    }

    const body = raw as Record<string, unknown>;

    const honey = String(body.company_website ?? body.website ?? "").trim();
    if (honey) {
      return NextResponse.json({ success: true, delivered: true, bot: true });
    }

    const parsed = contactSchema.safeParse({
      name: body.name,
      phone: body.phone,
      message: body.message,
    });
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "validation_failed" },
        { status: 400 },
      );
    }

    const { name, phone, message } = parsed.data;
    const msg = message || "";
    const lead = { name, phone, message: msg };

    const text = sanitizeText(
      [
        "פנייה חדשה מהאתר של דוד טובול",
        "",
        `שם: ${name}`,
        `טלפון: ${phone}`,
        `על הפרויקט: ${msg || "—"}`,
      ].join("\n"),
      1800,
    );

    const env = getServerEnv();

    const [mail, sheet] = await Promise.all([
      sendLeadEmail(lead),
      appendLeadToSheet(lead),
    ]);

    let whatsappDelivered = false;
    if (isWhatsAppBotConfigured(env.WHATSAPP_BOT_URL)) {
      whatsappDelivered = await sendWhatsAppBot(env.WHATSAPP_BOT_URL!.trim(), {
        text,
        name,
        phone,
        message: msg,
      });
    }

    const delivered = mail.ok || sheet.ok || whatsappDelivered;

    return NextResponse.json({
      success: true,
      delivered,
      channels: {
        email: mail.ok,
        excel: sheet.ok,
        whatsappBot: whatsappDelivered,
      },
      emailTo: mail.to ?? null,
      reasons: {
        email: mail.reason ?? null,
        excel: sheet.reason ?? null,
        whatsappBot: whatsappDelivered
          ? null
          : isWhatsAppBotConfigured(env.WHATSAPP_BOT_URL)
            ? "webhook_failed"
            : "bot_not_configured",
      },
    });
  } catch (err) {
    console.error("[contact] unexpected error", err);
    return NextResponse.json(
      { success: false, error: "server_error" },
      { status: 500 },
    );
  }
}

async function sendWhatsAppBot(
  webhookUrl: string,
  payload: { text: string; name: string; phone: string; message: string },
): Promise<boolean> {
  const encoded = encodeURIComponent(payload.text);
  const isGetTemplate =
    webhookUrl.includes("{text}") || /[?&]text=?$/i.test(webhookUrl);

  if (isGetTemplate) {
    const url = webhookUrl.includes("{text}")
      ? webhookUrl.replaceAll("{text}", encoded)
      : `${webhookUrl}${encoded}`;
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      console.error(
        "[contact] WhatsApp GET failed",
        res.status,
        await res.text().catch(() => ""),
      );
      return false;
    }
    return true;
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      text: payload.text,
      message: payload.text,
      name: payload.name,
      phone: payload.phone,
      body: payload.message,
      source: "david-tubul-site",
    }),
  });

  if (!res.ok) {
    console.error(
      "[contact] WhatsApp POST failed",
      res.status,
      await res.text().catch(() => ""),
    );
    return false;
  }
  return true;
}
