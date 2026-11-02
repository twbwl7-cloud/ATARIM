"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/lib/site";

/**
 * Boutique contact strip — compact charcoal form.
 * Formspree / Web3Forms ready (Twbwl7@gmail.com in provider dashboard).
 */
type Status = "idle" | "loading" | "ok" | "error";

const FIELD =
  "w-full bg-transparent border-0 border-b border-neutral-700 px-0 py-2.5 text-sm font-light tracking-wide text-[#FAF9F6] placeholder:text-white/35 focus:border-[#C5A059] focus:outline-none transition-colors duration-500";

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

    const formspree = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
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
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3Key,
            subject: "פנייה חדשה מהאתר — דוד טובול",
            from_name: payload.name,
            ...payload,
          }),
        });
        if (!res.ok) throw new Error("web3forms");
      } else {
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
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-28 border-t border-white/5 bg-[#1A1A1A] px-5 py-8 md:px-8 md:py-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(197,160,89,0.1),transparent_55%)]"
      />
      <div className="relative mx-auto max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="text-[11px] font-medium tracking-[0.28em] text-[#C5A059]">
            צור קשר
          </p>
          <h2
            id="contact-heading"
            className="display mt-2 text-2xl font-light tracking-wide text-[#FAF9F6] md:text-3xl"
          >
            בואו נדבר על הפרויקט.
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm font-light leading-relaxed text-white/45">
            שלושה שדות. בלי רעש. נחזור אליכם אישית.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-3 inline-block text-xs font-light tracking-wide text-[#C5A059] transition-colors duration-500 hover:text-[#E0C992]"
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
          transition={{ duration: 0.8, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 flex flex-col gap-5"
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
            />
          </label>

          <div className="flex flex-col items-center gap-2 pt-1 sm:flex-row sm:justify-between">
            <button
              type="submit"
              disabled={status === "loading"}
              className="cursor-magnet inline-flex min-h-10 items-center justify-center border border-[#C5A059]/70 bg-transparent px-8 py-2 text-sm font-light tracking-[0.2em] text-[#FAF9F6] transition-all duration-500 hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-[#121212] disabled:opacity-50"
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
