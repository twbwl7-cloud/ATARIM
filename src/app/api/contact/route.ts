import { NextResponse } from "next/server";
import { contactSchema, sanitizeText } from "@/lib/sanitize";

/**
 * Contact → WhatsApp bot relay (server-side only).
 *
 * REQUIRED for live WhatsApp delivery:
 *   Set WHATSAPP_BOT_URL in Vercel Environment Variables to the client's
 *   real webhook / bot endpoint (not PLACEHOLDER_URL).
 *
 * Supported URL shapes:
 *  - POST JSON (Make, Zapier, n8n, custom): https://hook.make.com/...
 *  - GET with `{text}` (CallMeBot etc.):
 *      https://api.callmebot.com/whatsapp.php?phone=972523182032&apikey=KEY&text={text}
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

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "validation_failed" },
        { status: 400 },
      );
    }

    const { name, phone, message } = parsed.data;

    const text = sanitizeText(
      `ליד חדש מהאתר\n\nשם: ${name}\nטלפון: ${phone}\nהודעה: ${message || "—"}`,
      1800,
    );

    const webhookUrl = process.env.WHATSAPP_BOT_URL?.trim();
    const botConfigured =
      Boolean(webhookUrl) && webhookUrl !== "PLACEHOLDER_URL";

    if (!botConfigured) {
      console.warn(
        "[contact] WHATSAPP_BOT_URL is PLACEHOLDER/missing — WhatsApp not sent.",
      );
      return NextResponse.json({
        success: true,
        delivered: false,
        reason: "bot_not_configured",
      });
    }

    const delivered = await sendWhatsAppBot(webhookUrl!, {
      text,
      name,
      phone,
      message: message || "",
    });

    if (!delivered) {
      return NextResponse.json(
        { success: false, error: "webhook_failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true, delivered: true });
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
