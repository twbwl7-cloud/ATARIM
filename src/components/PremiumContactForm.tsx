"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

/**
 * Boutique contact strip — dark, underline inputs, Formspree / Web3Forms ready.
 *
 * Connect submissions (no backend needed):
 * 1) Formspree — set NEXT_PUBLIC_FORMSPREE_ENDPOINT to the full action URL
 *    e.g. https://formspree.io/f/xxxxxxxx  (route to Twbwl7@gmail.com in Formspree)
 * 2) Web3Forms — set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to your access key
 *    (configure destination email Twbwl7@gmail.com in the Web3Forms dashboard)
 *
 * Until a key/URL is set, submit shows a local success state for design QA.
 */
type Status = "idle" | "loading" | "ok" | "error";

const FIELD =
  "w-full bg-transparent border-0 border-b border-neutral-700 px-0 py-3 text-sm font-light tracking-wide text-[#F5EFE6] placeholder:text-white/35 focus:border-[#D4AF37] focus:outline-none transition-colors duration-500";

export function PremiumContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };

    if (!payload.name || !payload.phone) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    // Formspree — paste full Action URL in .env as NEXT_PUBLIC_FORMSPREE_ENDPOINT
    const formspree = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    // Web3Forms — paste Access Key in .env as NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    try {
      if (formspree) {
        const res = await fetch(formspree, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data,
        });
        if (!res.ok) throw new Error("formspree");
      } else if (web3Key) {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: web3Key,
            subject: "פנייה חדשה מהאתר — דוד טובול",
            from_name: payload.name,
            ...payload,
          }),
        });
        if (!res.ok) throw new Error("web3forms");
      } else {
        // Local mock — replace with Formspree/Web3Forms env vars above for live delivery
        await new Promise((r) => setTimeout(r, 650));
      }
      form.reset();
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact-form"
      aria-labelledby="contact-form-heading"
      className="relative border-t border-white/10 bg-[#0a0a0b] px-5 py-12 md:px-8 md:py-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(212,175,55,0.08),transparent_55%)]"
      />
      <div className="relative mx-auto grid max-w-5xl gap-10 md:grid-cols-[1fr_1.15fr] md:gap-16 md:items-end">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-medium tracking-[0.28em] text-[#D4AF37]">
            פנייה אישית
          </p>
          <h2
            id="contact-form-heading"
            className="display mt-3 text-3xl font-light tracking-wide text-[#F5EFE6] md:text-4xl"
          >
            בואו נדבר על הפרויקט.
          </h2>
          <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-white/50">
            שלושה שדות. בלי רעש. נחזור אליכם אישית — לא בוט, לא דיוור המוני.
          </p>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-7"
          noValidate
        >
          <label className="block">
            <span className="mb-2 block text-[11px] tracking-[0.18em] text-white/45">
              שם מלא
            </span>
            <input
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="שם מלא"
              className={FIELD}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-[11px] tracking-[0.18em] text-white/45">
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
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-[11px] tracking-[0.18em] text-white/45">
              על הפרויקט
            </span>
            <textarea
              name="message"
              rows={4}
              placeholder="ספר לי קצת על הפרויקט..."
              className={`${FIELD} h-24 resize-none`}
            />
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={status === "loading"}
              className="cursor-magnet inline-flex min-h-11 items-center justify-center border border-white/70 bg-transparent px-10 py-2.5 text-sm font-light tracking-[0.2em] text-[#F5EFE6] transition-all duration-500 hover:bg-white hover:text-black disabled:opacity-50"
            >
              {status === "loading" ? "שולח…" : "שליחה"}
            </button>
            <p
              className="min-h-5 text-[11px] tracking-wide text-white/40"
              role="status"
              aria-live="polite"
            >
              {status === "ok"
                ? "ההודעה התקבלה. נחזור בהקדם."
                : status === "error"
                  ? "חסר שם או טלפון — נסו שוב."
                  : "מענה אישי · ללא התחייבות"}
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
