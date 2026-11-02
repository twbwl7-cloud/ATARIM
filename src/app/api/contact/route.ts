import { NextResponse } from "next/server";

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

    if (!botConfigured) {
      // Lead accepted, but no bot is wired yet — configure WHATSAPP_BOT_URL in Vercel.
      console.warn(
        "[contact] WHATSAPP_BOT_URL is PLACEHOLDER/missing — WhatsApp not sent. Payload:",
        { name, phone, message },
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
      message,
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
