"use client";

import { motion } from "framer-motion";
import { site, whatsappUrl } from "@/lib/site";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:py-20 md:px-8 md:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="premium-panel relative overflow-hidden rounded-[1.5rem] px-5 py-10 sm:rounded-[1.85rem] sm:px-6 sm:py-12 md:px-14 md:py-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_90%_10%,rgba(232,184,196,0.14),transparent_50%),radial-gradient(500px_circle_at_10%_90%,rgba(212,175,103,0.1),transparent_45%)]" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-l from-transparent via-gold/55 to-transparent"
        />
        <div className="relative max-w-2xl">
          <p className="text-xs tracking-[0.24em] text-gold">צור קשר</p>
          <h2 className="display mt-3 text-3xl text-ivory md:text-5xl">
            דוגמא בחינם — או שיחה קצרה
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
            כתבו מה העסק. תקבלו תשובה בוואטסאפ. בלי טופס ארוך ובלי התחייבות.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#free-demo"
              className="btn-gold rounded-full px-7 py-3.5 text-center text-sm"
            >
              דוגמא בחינם
            </a>
            <a
              href={whatsappUrl("היי דוד, אשמח לקבוע שיחה קצרה.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost rounded-full px-7 py-3.5 text-center text-sm"
            >
              וואטסאפ
            </a>
            <a
              href={`tel:+${site.whatsapp}`}
              className="btn-ghost rounded-full px-7 py-3.5 text-center text-sm"
              dir="ltr"
            >
              {site.phoneDisplay}
            </a>
          </div>
          <p className="mt-5 text-[11px] leading-relaxed text-muted/80">
            שליחת הודעה מהווה הסכמה ליצירת קשר חוזר בנוגע לבקשה שלכם. לא שולחים
            דיוור בלי רשות מפורשת.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
