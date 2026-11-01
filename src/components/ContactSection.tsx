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
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="premium-panel relative overflow-hidden rounded-2xl px-5 py-10 sm:px-6 sm:py-12 md:px-14 md:py-16"
      >
        <div className="relative z-[1] max-w-2xl">
          <p className="text-xs tracking-[0.16em] text-cyan-deep">דברו איתי</p>
          {/* H30 · יצירת קשר */}
          <h2 className="display mt-3 text-3xl text-ink md:text-5xl">
            כתבו מה העסק. עונים באותו יום.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
            וואטסאפ או שיחה קצרה. בלי טופס של עשר שדות ובלי דיוור בלי רשות.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <MagneticButton
              href={whatsappUrl(
                "היי דוד, רוצה דוגמה בחינם לאתר של העסק שלי — בלי התחייבות.",
              )}
              target="_blank"
              rel="noopener noreferrer"
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
          <p className="mt-5 text-[11px] leading-relaxed text-muted">
            שליחת הודעה = הסכמה שנחזור רק על הבקשה. בלי דיוור בלי רשות.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
