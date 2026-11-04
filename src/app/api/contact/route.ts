import { NextResponse } from "next/server";
import { getServerEnv, isWhatsAppBotConfigured } from "@/lib/env";
import { sendLeadEmail } from "@/lib/mail";
import {
  buildSafeWhatsAppUrl,
  contactSchema,
  sanitizeText,
} from "@/lib/sanitize";

/**
 * Contact lead intake (Script 6 / landing):
 *  1. Zod + sanitize
 *  2. Honeypot reject
 *  3. Email to CONTACT_TO_EMAIL via Resend
 *  4. Optional WhatsApp bot webhook (WHATSAPP_BOT_URL)
 *  5. Return safe wa.me deep-link for client handoff
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

    // Honeypot — bots fill hidden fields; humans never see company_website
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

    const text = sanitizeText(
      `ליד חדש מהאתר\n\nשם: ${name}\nטלפון: ${phone}\nהודעה: ${msg || "—"}`,
      1800,
    );

    const env = getServerEnv();
    const mail = await sendLeadEmail({ name, phone, message: msg });

    let whatsappDelivered = false;
    if (isWhatsAppBotConfigured(env.WHATSAPP_BOT_URL)) {
      whatsappDelivered = await sendWhatsAppBot(env.WHATSAPP_BOT_URL!.trim(), {
        text,
        name,
        phone,
        message: msg,
      });
    }

    const waDigits =
      env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "972523182032";
    const clientWhatsApp = buildSafeWhatsAppUrl(
      waDigits,
      [
        "פנייה חדשה מהאתר:",
        `שם: ${name}`,
        `טלפון: ${phone}`,
        msg ? `על הפרויקט: ${msg}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    );

    const anyDelivered = mail.ok || whatsappDelivered;

    return NextResponse.json({
      success: true,
      delivered: anyDelivered,
      channels: {
        email: mail.ok,
        whatsappBot: whatsappDelivered,
      },
      reasons: {
        email: mail.reason ?? null,
        whatsappBot: whatsappDelivered
          ? null
          : isWhatsAppBotConfigured(env.WHATSAPP_BOT_URL)
            ? "webhook_failed"
            : "bot_not_configured",
      },
      whatsappUrl: clientWhatsApp,
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
