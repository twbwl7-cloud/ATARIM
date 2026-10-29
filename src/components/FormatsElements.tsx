"use client";

import { motion } from "framer-motion";
import { elements, formats } from "@/lib/site";

/**
 * Formats & Elements catalog — doks prompt-formats + book levers as a craft menu.
 * Not a dashboard: one composition per column, Role→Format clarity.
 */
export function FormatsElements() {
  return (
    <section
      id="formats"
      className="section-void relative z-10 border-y border-line/30 px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="text-xs tracking-[0.24em] text-gold">פורמטים · אלמנטים</p>
          <h2 className="display mt-3 text-3xl text-ivory md:text-5xl">
            שפת העבודה שלי
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
            מהספר ומהפלייבוקס — פורמטים שבונים עסקאות, ואלמנטים שמרגישים יוקרה
            בלי רעש.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="mb-5 text-[11px] tracking-[0.22em] text-pink uppercase">
              Formats
            </p>
            <ul className="space-y-0 divide-y divide-line/35 border-y border-line/35">
              {formats.map((f, i) => (
                <motion.li
                  key={f.code}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="group flex gap-4 py-5 md:gap-6 md:py-6"
                >
                  <span className="display pt-0.5 text-sm text-gold/80 md:text-base">
                    {f.code}
                  </span>
                  <div>
                    <h3 className="display text-xl text-ivory transition group-hover:text-gold-bright md:text-2xl">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {f.body}
                    </p>
                    <p className="mt-2 text-[11px] tracking-[0.14em] text-platinum/80">
                      {f.lever}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-[11px] tracking-[0.22em] text-platinum uppercase">
              Elements
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {elements.map((el, i) => (
                <motion.article
                  key={el.code}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ delay: i * 0.04, duration: 0.45 }}
                  className="premium-panel rounded-2xl p-5"
                >
                  <p className="text-[11px] tracking-[0.18em] text-gold">
                    {el.code}
                  </p>
                  <h3 className="display mt-2 text-lg text-ivory">{el.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {el.body}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
