import { z } from "zod";

/** Strip control chars, HTML tags, and dangerous URL schemes from free text. */
export function sanitizeText(input: unknown, maxLen = 2000): string {
  let s = String(input ?? "")
    .normalize("NFKC")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/javascript\s*:/gi, "")
    .replace(/data\s*:/gi, "")
    .replace(/vbscript\s*:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim();
  if (s.length > maxLen) s = s.slice(0, maxLen);
  return s;
}

/** Keep digits, spaces, +, -, (), and Hebrew/Latin letters for name-like phone notes. */
export function sanitizePhone(input: unknown): string {
  return sanitizeText(input, 40).replace(/[^\d+\-\s()]/g, "").slice(0, 40);
}

export function sanitizeName(input: unknown): string {
  return sanitizeText(input, 80).replace(/[<>{}[\]\\]/g, "").slice(0, 80);
}

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "missing_name")
    .max(80)
    .transform((v) => sanitizeName(v)),
  phone: z
    .string()
    .trim()
    .min(7, "invalid_phone")
    .max(40)
    .transform((v) => sanitizePhone(v))
    .refine((v) => /\d{7,}/.test(v.replace(/\D/g, "")), "invalid_phone"),
  message: z
    .preprocess(
      (v) => (v == null ? "" : String(v)),
      z.string().trim().max(2000),
    )
    .transform((v) => sanitizeText(v, 2000)),
});

export type ContactPayload = z.infer<typeof contactSchema>;

/** Safe WhatsApp deep-link builder — encodes after sanitization only. */
export function buildSafeWhatsAppUrl(
  phoneE164Digits: string,
  text: string,
): string {
  const digits = phoneE164Digits.replace(/\D/g, "").slice(0, 15);
  const safe = sanitizeText(text, 1500);
  return `https://wa.me/${digits}?text=${encodeURIComponent(safe)}`;
}
