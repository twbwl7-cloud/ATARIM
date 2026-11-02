import { NextResponse } from "next/server";
import { site } from "@/lib/site";

/**
 * Contact → WhatsApp bot relay (+ email backup).
 *
 * Set `WHATSAPP_BOT_URL` in Vercel to the client's real webhook / bot URL.
 * Supports:
 *  - POST JSON webhooks (Make, Zapier, n8n, custom bots)
 *  - GET URLs with `{text}` placeholder or a trailing `text=` / `text` query
 *    (e.g. CallMeBot: https://api.callmebot.com/whatsapp.php?phone=...&apikey=...&text={text})
 *
 * Until the bot URL is set, leads are emailed to `site.email` so nothing is lost.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: unknown;
      phone?: unknown;
      message?: unknown;
    };

    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "missing_fields" },
        { status: 400 },
      );
    }

    const text =
      `✨ ליד חדש מהאתר! ✨\n\n` +
      `שם: ${name}\n` +
      `טלפון: ${phone}\n` +
      `הודעה: ${message || "—"}`;

    const webhookUrl = process.env.WHATSAPP_BOT_URL?.trim();
    const botConfigured =
      Boolean(webhookUrl) && webhookUrl !== "PLACEHOLDER_URL";

    let deliveredWhatsApp = false;
    let deliveredEmail = false;
    const errors: string[] = [];

    if (botConfigured && webhookUrl) {
      try {
        deliveredWhatsApp = await sendWhatsAppBot(webhookUrl, {
          text,
          name,
          phone,
          message,
        });
        if (!deliveredWhatsApp) errors.push("webhook_failed");
      } catch (err) {
        console.error("[contact] WhatsApp bot error", err);
        errors.push("webhook_error");
      }
    } else {
      console.warn(
        "[contact] WHATSAPP_BOT_URL missing/PLACEHOLDER — using email backup. Set the real bot URL in Vercel env.",
      );
    }

    // Email backup so the client always gets the lead (FormSubmit — no API key).
    try {
      deliveredEmail = await sendEmailBackup({ name, phone, message, text });
    } catch (err) {
      console.error("[contact] email backup error", err);
      errors.push("email_error");
    }

    if (!deliveredWhatsApp && !deliveredEmail) {
      return NextResponse.json(
        { success: false, error: "delivery_failed", details: errors },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      delivered: deliveredWhatsApp,
      emailed: deliveredEmail,
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

  // CallMeBot / GET-style bots: URL contains {text} or ends with text= / &text=
  const isGetTemplate =
    webhookUrl.includes("{text}") ||
    /[?&]text=?$/i.test(webhookUrl) ||
    /[?&]text=$/i.test(webhookUrl);

  if (isGetTemplate) {
    const url = webhookUrl.includes("{text}")
      ? webhookUrl.replaceAll("{text}", encoded)
      : `${webhookUrl}${encoded}`;
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      console.error("[contact] WhatsApp GET failed", res.status, await res.text().catch(() => ""));
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
    console.error("[contact] WhatsApp POST failed", res.status, await res.text().catch(() => ""));
    return false;
  }
  return true;
}

async function sendEmailBackup(payload: {
  name: string;
  phone: string;
  message: string;
  text: string;
}): Promise<boolean> {
  const res = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      phone: payload.phone,
      message: payload.message || "—",
      _subject: `ליד חדש מהאתר — ${payload.name}`,
      _template: "table",
      _captcha: "false",
    }),
  });

  if (!res.ok) {
    console.error("[contact] FormSubmit failed", res.status, await res.text().catch(() => ""));
    return false;
  }
  return true;
}
