"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/site";

const ACCENTS = ["ink-gold", "ink-rose", "ink-cyan"] as const;

export function Testimonials() {
  return (
    <section
      id="reviews"
      className="section-rose relative z-10 overflow-hidden border-y border-line/30 px-5 py-16 sm:py-20 md:px-8 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-40 w-[70%] -translate-x-1/2 rounded-full bg-cyan/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.22em] text-pink">מה אומרים</p>
        <h2 className="display mt-3 max-w-xl text-3xl text-ivory md:text-5xl">
          אחרי שהאתר{" "}
          <span className="ink-gold">עלה</span>
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted md:text-base">
          שלושה עסקים <span className="ink-cyan">חיים</span> — ומה השתנה אצלם
          ביום־יום.
        </p>

        <ul className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.li
              key={t.projectId}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="premium-panel flex flex-col rounded-2xl p-5 sm:p-6"
            >
              <p className="text-sm leading-relaxed text-ivory/90 md:text-[15px]">
                “{t.quote}”
              </p>
              <div className="mt-auto pt-6">
                <p className={`text-sm font-medium ${ACCENTS[i % 3]}`}>
                  {t.name}
                </p>
                <p className="mt-1 text-xs text-muted">{t.role}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
