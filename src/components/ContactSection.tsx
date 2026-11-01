"use client";

import { motion } from "framer-motion";
import { site, whatsappUrl } from "@/lib/site";
import { MagneticButton } from "@/components/MagneticButton";

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
        className="premium-panel relative overflow-hidden rounded-2xl px-5 py-10 sm:px-6 sm:py-12 md:px-14 md:py-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_90%_10%,rgba(184,137,45,0.12),transparent_50%)]"
        />
        <div className="relative max-w-2xl">
          <p className="text-xs tracking-[0.24em] text-gold">דברו איתי</p>
          <h2 className="display mt-3 text-3xl text-ink md:text-5xl">
            כתבו מה העסק.{" "}
            <span className="ink-gold">נחזור היום</span>.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
            וואטסאפ או טלפון. בלי טופס של עשר שדות ובלי התחייבות.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <MagneticButton
              href="#free-demo"
              className="btn-gold justify-center rounded-md px-7 py-3.5 text-sm"
            >
              לקבלת דוגמה בחינם
            </MagneticButton>
            <MagneticButton
              href={whatsappUrl("היי דוד, בא לי לקבוע שיחה קצרה.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost justify-center rounded-md px-7 py-3.5 text-sm"
            >
              לשיחה בוואטסאפ
            </MagneticButton>
            <a
              href={`tel:+${site.whatsapp}`}
              className="btn-ghost rounded-md px-7 py-3.5 text-center text-sm"
              dir="ltr"
            >
              {site.phoneDisplay}
            </a>
          </div>
          <p className="mt-5 text-[11px] leading-relaxed text-muted/90">
            שליחת הודעה = הסכמה שנחזור אליכם על הבקשה. לא שולחים דיוור בלי רשות.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
