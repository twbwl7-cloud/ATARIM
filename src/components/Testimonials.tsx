"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/site";

/** P37 — recommendations before hard sell. Specific notes, no fake stars/100%. */
export function Testimonials() {
  return (
    <section
      id="reviews"
      className="relative z-10 border-y border-white/5 bg-[#0a1220] px-5 py-16 sm:py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.22em] text-gold">חוות דעת</p>
        <h2 className="display mt-3 max-w-xl text-3xl text-ivory md:text-5xl">
          מה אומרים אחרי שהאתר עלה
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted md:text-base">
          לא סיסמאות. שלושה עסקים חיים — ומה השתנה אצלם ביום־יום.
        </p>

        <ul className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.li
              key={t.projectId}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex flex-col border-t border-gold/30 pt-5 sm:pt-6"
            >
              <p className="text-sm leading-relaxed text-ivory/90 md:text-[15px]">
                “{t.quote}”
              </p>
              <div className="mt-auto pt-6">
                <p className="text-sm font-medium text-gold">{t.name}</p>
                <p className="mt-1 text-xs text-muted">{t.role}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
