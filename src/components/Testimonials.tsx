"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

function Stars() {
  return (
    <div className="mb-5 flex gap-1" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="h-3 w-3 fill-[#d4af37] opacity-80"
        >
          <path d="M10 1.5l2.35 5.2 5.65.55-4.3 3.75 1.3 5.45L10 13.9 4.99 16.45l1.3-5.45-4.3-3.75 5.65-.55L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

/** Exact copy from user brief */
export function Testimonials() {
  return (
    <section
      id="reviews"
      className="section-void relative z-10 overflow-hidden border-y border-line px-5 py-24 md:px-8 md:py-32"
    >
      <div className="relative mx-auto max-w-6xl">
        <p className="text-center text-[11px] font-medium tracking-[0.22em] text-gold uppercase">
          Client Proof
        </p>
        <h2 className="display mt-4 text-center text-3xl font-light text-ink md:text-4xl">
          Measurable ROI — במילים שלהם
        </h2>

        <ul className="mt-14 grid gap-6 md:mt-16 md:grid-cols-3 md:items-start md:gap-8">
          {testimonials.map((t, i) => (
            <motion.li
              key={t.projectId}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: i * 0.1, duration: 0.75, ease: EASE }}
              className={`premium-panel flex flex-col rounded-2xl p-6 sm:p-7 ${
                i === 1 ? "md:mt-8" : i === 2 ? "md:mt-4" : ""
              }`}
            >
              <div className="relative z-[1]">
                <Stars />
                <p className="text-sm leading-relaxed text-ink-soft md:text-[15px]">
                  “{t.quote}”
                </p>
                <div className="mt-8 border-t border-white/10 pt-5">
                  <p className="text-sm font-medium text-ink">{t.name}</p>
                  <p className="mt-1 text-xs tracking-wide text-gold">{t.role}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
