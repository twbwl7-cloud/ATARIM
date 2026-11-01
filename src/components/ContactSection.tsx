"use client";

import { motion } from "framer-motion";
import { site, whatsappUrl } from "@/lib/site";
import { MagneticButton } from "@/components/MagneticButton";

/** Soft brand close — שיחת היכרות */
export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-10 mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="premium-panel relative overflow-hidden rounded-2xl px-6 py-12 sm:px-10 sm:py-14 md:px-16 md:py-20"
      >
        <div className="relative z-[1] max-w-2xl">
          <p className="text-[11px] font-medium tracking-[0.22em] text-gold uppercase">
            צור קשר
          </p>
          <h2 className="display mt-4 text-3xl font-light text-ink md:text-5xl">
            בואו נכיר. עונים באותו יום.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
            וואטסאפ, שיחה קצרה, או מייל. בלי טופס של עשר שדות ובלי דיוור בלי רשות.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <MagneticButton
              href={whatsappUrl(
                "היי דוד, ראיתי את אתר התדמית. בא לי לשיחת היכרות קצרה.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold justify-center rounded-md px-8 py-3.5 text-sm"
            >
              לשיחת היכרות בוואטסאפ
            </MagneticButton>
            <a
              href={`tel:+${site.whatsapp}`}
              className="btn-ghost rounded-md px-8 py-3.5 text-center text-sm"
              dir="ltr"
            >
              {site.phoneDisplay}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="btn-ghost rounded-md px-8 py-3.5 text-center text-sm"
            >
              {site.email}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
