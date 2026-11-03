"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { luxEase } from "@/lib/motion";
import { site, whatsappUrl } from "@/lib/site";

/**
 * Boutique contact strip — three fields → WhatsApp (wa.me) with encoded body.
 */
type Status = "idle" | "loading" | "error";

const FIELD =
  "w-full bg-transparent border-0 border-b border-neutral-700 px-0 py-2.5 text-sm font-light tracking-wide text-[#FAF9F6] placeholder:text-white/35 focus:border-[#C5A059] focus:outline-none transition-colors duration-500";

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
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !phone) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    const href = whatsappUrl(buildWhatsAppMessage(name, phone, message));
    window.location.assign(href);
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-28 border-t border-white/5 bg-[#1A1A1A] px-5 py-6 md:px-8 md:py-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(197,160,89,0.1),transparent_55%)]"
      />
      <div className="relative mx-auto max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: luxEase }}
          className="text-center"
        >
          <p className="text-[11px] font-medium tracking-[0.28em] text-[#C5A059]">
            צור קשר
          </p>
          <h2
            id="contact-heading"
            className="display mt-1.5 text-xl font-light tracking-wide text-[#FAF9F6] md:text-2xl"
          >
            בואו נדבר על הפרויקט.
          </h2>
          <p className="mx-auto mt-1.5 max-w-sm text-xs font-light leading-relaxed text-white/45">
            שלושה שדות. בלי רעש. נחזור אליכם אישית.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="lux-link mt-2 inline-block text-xs font-light tracking-wide text-[#C5A059]"
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
          transition={{ duration: 0.75, delay: 0.06, ease: luxEase }}
          className="mt-5 flex flex-col gap-4"
          noValidate
        >
          <label className="block">
            <span className="mb-1.5 block text-[11px] tracking-[0.18em] text-white/45">
              שם מלא
            </span>
            <input
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="שם מלא"
              className={FIELD}
              disabled={status === "loading"}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[11px] tracking-[0.18em] text-white/45">
              טלפון / וואטסאפ
            </span>
            <input
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              placeholder="טלפון / וואטסאפ"
              className={FIELD}
              dir="ltr"
              disabled={status === "loading"}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[11px] tracking-[0.18em] text-white/45">
              על הפרויקט
            </span>
            <textarea
              name="message"
              rows={3}
              placeholder="ספר לי קצת על הפרויקט..."
              className={`${FIELD} h-20 resize-none`}
              disabled={status === "loading"}
            />
          </label>

          <div className="flex flex-col items-center gap-2 pt-1 sm:flex-row sm:justify-between">
            <button
              type="submit"
              disabled={status === "loading"}
              className="lux-cta cursor-magnet inline-flex min-h-10 items-center justify-center border border-[#C5A059]/70 bg-transparent px-8 py-2 text-sm font-light tracking-[0.2em] text-[#FAF9F6] transition-all duration-500 hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-[#121212] disabled:opacity-50"
            >
              {status === "loading" ? "פותח וואטסאפ..." : "שליחה"}
            </button>
            <p
              className="min-h-5 text-[11px] tracking-wide text-white/40"
              role="status"
              aria-live="polite"
            >
              {status === "error"
                ? "לא הצלחנו לשלוח — בדקו את הפרטים ונסו שוב."
                : "מענה אישי · ללא התחייבות"}
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
