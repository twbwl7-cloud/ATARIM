import { NextResponse } from "next/server";

/**
 * Contact → WhatsApp bot relay.
 *
 * The webhook URL stays server-side only (`WHATSAPP_BOT_URL`).
 * Replace PLACEHOLDER_URL in `.env` / Vercel env with the client's real
 * WhatsApp bot / automation webhook endpoint.
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

    // Client replaces PLACEHOLDER_URL with their real bot/webhook URL.
    if (!webhookUrl || webhookUrl === "PLACEHOLDER_URL") {
      console.warn(
        "[contact] WHATSAPP_BOT_URL is missing or still PLACEHOLDER_URL — set the client's webhook in env.",
      );
      return NextResponse.json({ success: true, delivered: false });
    }

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        text,
        name,
        phone,
        message,
        source: "david-tubul-site",
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[contact] WhatsApp bot webhook failed", res.status, detail);
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
