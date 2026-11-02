"use client";

import { motion } from "framer-motion";

/**
 * Compact honesty story — content-height only, no sticky multi-vh traps.
 */
const LINES = [
  { plain: "אתר שנראה כמו ", accent: "כולם" },
  { plain: "אתר יפה שלא מביא ", accent: "הודעה" },
  { plain: "אנימציה כבדה שנתקעת ב", accent: "טלפון" },
  { plain: "עוד הבטחה של ״וואו״ בלי ", accent: "תוצאה" },
] as const;

export function PinnedStory() {
  return (
    <section
      className="relative z-10 bg-paper/70 px-5 py-8 md:px-8 md:py-12"
      aria-label="מה כבר ניסיתם"
    >
      <div className="relative mx-auto max-w-3xl">
        <p className="text-xs tracking-[0.28em] text-gold">בואו נהיה כנים</p>
        <h2 className="display mt-3 max-w-3xl text-3xl text-ink md:text-4xl">
          מה כבר ניסיתם — ולמה זה{" "}
          <span className="ink-gold">לא עבד</span>?
        </h2>

        <ul className="mt-8 space-y-3 sm:mt-10">
          {LINES.map((line, i) => (
            <motion.li
              key={line.accent}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border-t border-line pt-3 text-lg text-ink-soft sm:text-xl md:text-2xl"
            >
              {line.plain}
              <span className="ink-gold">{line.accent}</span>
            </motion.li>
          ))}
        </ul>

        <div className="mt-10 max-w-xl">
          <p className="text-sm leading-relaxed text-muted sm:text-base">
            אני לא מוכר באנר. בונים דף שמביא{" "}
            <span className="ink-gold">הודעה</span> — ואז הוואטסאפ כבר קל יותר.
          </p>
          <a
            href="/contact"
            className="btn-gold mt-6 inline-flex rounded-md px-6 py-3 text-sm"
          >
            לשיחת היכרות
          </a>
        </div>
      </div>
    </section>
  );
}
