"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-10 mx-auto grid max-w-7xl gap-12 overflow-hidden px-5 py-24 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-20 md:px-8 md:py-32"
    >
      <div>
        <p className="text-[11px] font-medium tracking-[0.22em] text-gold uppercase">
          אודות
        </p>
        <h2 className="display mt-4 text-3xl font-light text-ink md:text-5xl">
          דוד טובול. בונה אתרי תדמית שמביאים הודעות מלקוחות.
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-base leading-relaxed text-muted md:text-lg"
        >
          לומד {site.focus} ב{site.university}. כותב את הקוד בעצמי — בלי להעביר
          אתכם בין חמישה אנשים ובלי «מישהו מהצוות יחזור אליכם».
        </motion.p>
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
          עובד עם קליניקות, עוגות ומספרות — עסקים שצריכים פניות, לא מצגת. אם זה לא
          עובד בטלפון, זה לא עובד.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="premium-panel relative overflow-hidden rounded-2xl p-7 md:p-9"
      >
        <ul className="relative z-[1] space-y-5 text-sm md:text-base">
          {[
            ["בנייה", "Next.js · Tailwind · Motion"],
            ["שרת", "Node.js · Java · APIs"],
            ["למי", "קליניקות · אוכל · מספרות"],
            ["טלפון", "קודם 390px — אחר כך מסך גדול"],
          ].map(([label, value]) => (
            <li
              key={label}
              className="flex items-start justify-between gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0"
            >
              <span className="font-medium tracking-wide text-ink">{label}</span>
              <span className="text-end text-muted" dir="auto">
                {value}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
