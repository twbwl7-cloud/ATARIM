"use client";

import { motion } from "framer-motion";
import { elements, formats } from "@/lib/site";

export function FormatsElements() {
  return (
    <section
      id="formats"
      className="section-void relative z-10 border-y border-line/30 px-5 py-16 sm:py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl md:mb-14">
          <p className="text-xs tracking-[0.24em] text-gold">מה בונים</p>
          <h2 className="display mt-3 text-3xl text-ivory md:text-5xl">
            ארבעה סוגי אתרים. ארבעה כלים.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
            בוחרים מה מתאים לעסק — ובונים רק מה שמביא פנייה.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="mb-4 text-[11px] tracking-[0.22em] text-pink">
              סוגי אתרים
            </p>
            <ul className="divide-y divide-line/35 border-y border-line/35">
              {formats.map((f, i) => (
                <motion.li
                  key={f.code}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  className="flex gap-4 py-5 md:gap-6 md:py-6"
                >
                  <span className="display pt-0.5 text-sm text-gold/80">{f.code}</span>
                  <div>
                    <h3 className="display text-xl text-ivory md:text-2xl">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
                    <p className="mt-2 text-[11px] tracking-[0.12em] text-platinum/80">
                      {f.lever}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[11px] tracking-[0.22em] text-platinum">
              איך זה מרגיש
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {elements.map((el, i) => (
                <motion.article
                  key={el.code}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ delay: i * 0.03, duration: 0.4 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
                >
                  <p className="text-[11px] tracking-[0.18em] text-gold">{el.code}</p>
                  <h3 className="display mt-2 text-lg text-ivory">{el.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{el.body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
