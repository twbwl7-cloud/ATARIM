"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

function Stars() {
  return (
    <div className="mb-4 flex gap-1" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="h-3.5 w-3.5 fill-[#d4af37]"
        >
          <path d="M10 1.5l2.35 5.2 5.65.55-4.3 3.75 1.3 5.45L10 13.9 4.99 16.45l1.3-5.45-4.3-3.75 5.65-.55L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

/** Light premium reviews — exact copy from user brief */
export function Testimonials() {
  return (
    <section
      id="reviews"
      className="section-void relative z-10 overflow-hidden border-y border-line px-5 py-16 sm:py-20 md:px-8 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-10 h-64 w-64 rounded-full bg-[rgba(201,162,74,0.14)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 bottom-8 h-56 w-56 rounded-full bg-[rgba(24,196,224,0.16)] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <h2 className="display text-center text-3xl text-ink md:text-4xl">
          מה כתבו אחרי שהאתר עלה
        </h2>

        <ul className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-3 md:items-start">
          {testimonials.map((t, i) => (
            <motion.li
              key={t.projectId}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: EASE }}
              className={`premium-panel flex flex-col rounded-2xl p-5 sm:p-6 ${
                i === 1 ? "md:mt-6" : i === 2 ? "md:mt-3" : ""
              }`}
            >
              <div className="relative z-[1]">
                <Stars />
                <p className="text-sm leading-relaxed text-ink-soft md:text-[15px]">
                  “{t.quote}”
                </p>
                <div className="mt-6 border-t border-line pt-4">
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="mt-1 text-xs text-gold">{t.role}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
