"use client";

import { motion } from "framer-motion";
import { site, whatsappUrl } from "@/lib/site";
import { MagneticButton } from "@/components/MagneticButton";

/** פנייה בלעדית — מסגרת ייעוץ, לא טופס המוני */
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
        className="premium-panel relative overflow-hidden rounded-2xl px-6 py-14 sm:px-10 sm:py-16 md:px-16 md:py-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(212,175,55,0.08),transparent_50%)]"
        />
        <div className="relative z-[1] max-w-2xl">
          <p className="text-[11px] font-light tracking-[0.22em] text-gold">
            פנייה לפרויקט
          </p>
          <h2 className="display mt-4 text-3xl font-light tracking-wide text-ink md:text-5xl">
            שיחת ייעוץ
          </h2>
          <p className="mt-5 text-sm font-light leading-relaxed tracking-wide text-muted md:text-base">
            עובדים עם מספר מוגבל של מותגים בכל רבעון. שיחת ייעוץ קצרה — בודקים
            התאמה, מגדירים ארכיטקטורת המרה, ורק אז בונים. זו לא ״השארת פרטים״.
            זו הזמנה לעבוד ברמה של סטודיו יוקרה.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <MagneticButton
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold justify-center rounded-md px-8 py-3.5 text-sm font-light"
            >
              פתיחת פנייה בוואטסאפ
            </MagneticButton>
            <a
              href={`tel:+${site.whatsapp}`}
              className="btn-ghost rounded-md px-8 py-3.5 text-center text-sm font-light"
              dir="ltr"
            >
              {site.phoneDisplay}
            </a>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("פנייה לפרויקט — דוד טובול")}`}
              className="btn-ghost rounded-md px-8 py-3.5 text-center text-sm font-light"
            >
              {site.email}
            </a>
          </div>
          <p className="mt-6 text-[11px] font-light tracking-wide text-muted">
            מענה באותו יום עסקים · בלי דיוור בלי רשות · בלי לחץ מכירה
          </p>
        </div>
      </motion.div>
    </section>
  );
}
