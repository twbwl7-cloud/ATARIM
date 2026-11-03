"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { luxSpring } from "@/lib/motion";
import {
  buildSafeWhatsAppUrl,
  contactSchema,
  sanitizeName,
  sanitizePhone,
  sanitizeText,
} from "@/lib/sanitize";
import { site } from "@/lib/site";

/**
 * Boutique contact strip — three fields → WhatsApp (wa.me) with sanitized body.
 */
type Status = "idle" | "loading" | "error";

const FIELD =
  "w-full bg-transparent border-0 border-b border-[#D4AF37]/25 px-0 py-2.5 text-sm font-light tracking-wide text-[#FAF9F6] placeholder:text-white/35 focus:border-[#D4AF37]/70 focus:outline-none focus-visible:border-[#D4AF37] focus-visible:shadow-[0_1px_0_0_rgba(212,175,55,0.7)] transition-colors duration-500";

function buildWhatsAppMessage(name: string, phone: string, message: string) {
  const lines = [
    "פנייה חדשה מהאתר:",
    `שם: ${name}`,
    `טלפון: ${phone}`,
  ];
  if (message) lines.push(`על הפרויקט: ${message}`);
  return lines.join("\n");
}

export function PremiumContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const candidate = {
      name: sanitizeName(data.get("name")),
      phone: sanitizePhone(data.get("phone")),
      message: sanitizeText(data.get("message"), 2000),
    };

    const parsed = contactSchema.safeParse(candidate);
    if (!parsed.success) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    const { name, phone, message } = parsed.data;
    const href = buildSafeWhatsAppUrl(
      site.whatsapp,
      buildWhatsAppMessage(name, phone, message || ""),
    );
    window.location.assign(href);
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-28 border-t border-[#D4AF37]/30 bg-gradient-to-b from-[#1C1C1C] via-[#121212] to-[#050505] px-5 py-6 md:px-8 md:py-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.14),transparent_52%),radial-gradient(ellipse_at_80%_100%,rgba(197,160,89,0.06),transparent_45%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/45 to-transparent"
      />
      <div className="relative mx-auto max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={luxSpring}
          className="text-center"
        >
          <p className="text-[11px] font-medium tracking-[0.28em] text-[#D4AF37]">
            צור קשר
          </p>
          <h2
            id="contact-heading"
            className="display mt-1.5 text-xl font-light tracking-wide text-[#E8D5A3] md:text-2xl"
          >
            בואו נדבר על הפרויקט.
          </h2>
          <p className="mx-auto mt-1.5 max-w-sm text-xs font-light leading-relaxed text-white/55">
            שלושה שדות. בלי רעש. נחזור אליכם אישית.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="lux-link mt-2 inline-block text-xs font-light tracking-wide text-[#D4AF37] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
            dir="ltr"
          >
            {site.email}
          </a>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ ...luxSpring, delay: 0.06 }}
          className="mt-5 flex flex-col gap-4"
          noValidate
        >
          <label className="block">
            <span className="mb-1.5 block text-[11px] tracking-[0.18em] text-[#D4AF37]/70">
              שם מלא
            </span>
            <input
              name="name"
              type="text"
              required
              maxLength={80}
              autoComplete="name"
              placeholder="שם מלא"
              className={FIELD}
              disabled={status === "loading"}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[11px] tracking-[0.18em] text-[#D4AF37]/70">
              טלפון / וואטסאפ
            </span>
            <input
              name="phone"
              type="tel"
              required
              maxLength={40}
              autoComplete="tel"
              inputMode="tel"
              placeholder="טלפון / וואטסאפ"
              className={FIELD}
              dir="ltr"
              disabled={status === "loading"}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[11px] tracking-[0.18em] text-[#D4AF37]/70">
              על הפרויקט
            </span>
            <textarea
              name="message"
              rows={3}
              maxLength={2000}
              placeholder="ספר לי קצת על הפרויקט..."
              className={`${FIELD} h-20 resize-none`}
              disabled={status === "loading"}
            />
          </label>

          <div className="flex flex-col items-center gap-2 pt-1 sm:flex-row sm:justify-between">
            <button
              type="submit"
              disabled={status === "loading"}
              className="lux-cta cursor-magnet inline-flex min-h-11 min-w-[8.5rem] items-center justify-center border border-[#D4AF37]/70 bg-transparent px-8 py-2.5 text-sm font-light tracking-[0.2em] text-[#FAF9F6] transition-all duration-500 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#121212] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37] disabled:opacity-50"
            >
              {status === "loading" ? "פותח וואטסאפ..." : "שליחה"}
            </button>
            <p
              className="min-h-5 max-w-[16rem] text-center text-[10px] leading-relaxed tracking-wide text-white/40 sm:text-end"
              role="status"
              aria-live="polite"
            >
              {status === "error"
                ? "לא הצלחנו לשלוח — בדקו את הפרטים ונסו שוב."
                : "מענה אישי · ללא התחייבות · ללא דיוור שיווקי ללא הסכמה"}
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
