"use client";

import { motion } from "framer-motion";
import { site, whatsappUrl } from "@/lib/site";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-10 mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[1.75rem] border border-line bg-gradient-to-br from-elevated via-rich-black to-soft px-6 py-12 md:px-14 md:py-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_circle_at_90%_10%,rgba(240,198,207,0.12),transparent_50%)]" />
        <div className="relative max-w-2xl">
          <p className="text-xs tracking-[0.22em] text-gold">צור קשר</p>
          <h2 className="display mt-3 text-3xl text-ivory md:text-5xl">
            בואו נפתח שיחה קצרה — ונבנה משהו שלא שוכחים
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
            הפעולה הכי מדויקת: הודעת וואטסאפ. תקבלו חזרה מהירה עם כיוון ראשוני
            והצעת מחיר מותאמת.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-rich-black transition hover:bg-gold-bright"
            >
              שלחו הודעה בוואטסאפ
            </a>
            <a
              href={`mailto:${site.email}`}
              className="rounded-full border border-line px-6 py-3.5 text-sm text-ivory hover:border-gold/40"
            >
              {site.email}
            </a>
          </div>
          <p className="mt-6 text-xs text-muted">
            עדכנו את המספר ב־
            <code className="mx-1 text-gold">NEXT_PUBLIC_WHATSAPP_NUMBER</code>
            בקובץ <code className="text-gold">.env.local</code>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
