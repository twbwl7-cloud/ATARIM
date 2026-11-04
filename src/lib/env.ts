import "server-only";
import { z } from "zod";

/**
 * Server env — Script 6 / landing AppSec:
 * secrets never on NEXT_PUBLIC_*; validated at call time.
 */
const serverEnvSchema = z.object({
  CONTACT_TO_EMAIL: z
    .string()
    .email()
    .default("Twbwl7@gmail.com"),
  CONTACT_FROM_EMAIL: z
    .string()
    .email()
    .optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  WHATSAPP_BOT_URL: z.string().optional(),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function getServerEnv(): ServerEnv {
  const parsed = serverEnvSchema.safeParse({
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL || "Twbwl7@gmail.com",
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL || undefined,
    RESEND_API_KEY: process.env.RESEND_API_KEY || undefined,
    WHATSAPP_BOT_URL: process.env.WHATSAPP_BOT_URL || undefined,
    NEXT_PUBLIC_WHATSAPP_NUMBER:
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || undefined,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
  });

  if (!parsed.success) {
    console.error("[env] invalid server env", parsed.error.flatten());
    return {
      CONTACT_TO_EMAIL: "Twbwl7@gmail.com",
      CONTACT_FROM_EMAIL: undefined,
      RESEND_API_KEY: undefined,
      WHATSAPP_BOT_URL: undefined,
      NEXT_PUBLIC_WHATSAPP_NUMBER: undefined,
      NEXT_PUBLIC_SITE_URL: undefined,
    };
  }
  return parsed.data;
}

export function isWhatsAppBotConfigured(url?: string) {
  const u = (url ?? process.env.WHATSAPP_BOT_URL)?.trim();
  return Boolean(u) && u !== "PLACEHOLDER_URL";
}
