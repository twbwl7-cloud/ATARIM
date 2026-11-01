"use client";

import { motion } from "framer-motion";
import { elements, formats } from "@/lib/site";

const ACCENT = {
  gold: {
    num: "text-gold-bright",
    border: "border-gold/35 hover:border-gold/60",
    glow: "",
    chip: "bg-gold/15 text-gold-bright",
  },
  rose: {
    num: "text-gold",
    border: "border-white/10 hover:border-gold/35",
    glow: "",
    chip: "bg-gold/15 text-gold",
  },
  cyan: {
    num: "text-gold-bright",
    border: "border-gold/35 hover:border-gold/60",
    glow: "",
    chip: "bg-gold/15 text-gold-bright",
  },
  violet: {
    num: "text-violet",
    border: "border-white/10 hover:border-gold/35",
    glow: "",
    chip: "bg-violet/15 text-violet",
  },
} as const;

export function FormatsElements() {
  return (
    <section
      id="formats"
      className="section-void relative z-10 overflow-hidden border-y border-line/30 px-5 py-24 md:px-8 md:py-32"
    >
      <div aria-hidden className="aurora" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-gold/16 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl md:mb-14">
          <p className="text-[11px] font-medium tracking-[0.22em] text-gold uppercase">פורמטים</p>
          <h2 className="display mt-4 text-3xl font-light text-ink md:text-5xl">
            תדמית קודם. שאר הפורמטים —{" "}
            <span className="ink-gold">כשצריך</span>.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
            הליבה היא אתר תדמית. דף נחיתה, הזמנה ותור — רק כשהעסק באמת צריך{" "}
            <span className="ink-gold">הודעה</span> מהם.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="mb-4 text-[11px] tracking-[0.22em] text-gold">
              סוגי אתרים
            </p>
            <ul className="grid gap-3 sm:gap-4">
              {formats.map((f, i) => {
                const a = ACCENT[f.accent];
                return (
                  <motion.li
                    key={f.code}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: i * 0.05, duration: 0.45 }}
                    className={`group relative overflow-hidden rounded-2xl border bg-white/[0.03] p-5 transition-all duration-500 ease-in-out md:p-6 ${a.border} ${a.glow}`}
                  >
                    <div className="flex gap-4 md:gap-5">
                      <span className={`display text-2xl md:text-3xl ${a.num}`}>
                        {f.code}
                      </span>
                      <div className="min-w-0">
                        <h3 className="display text-xl text-ivory md:text-2xl">
                          {f.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {f.body}
                        </p>
                        <p
                          className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-[10px] tracking-[0.14em] ${a.chip}`}
                        >
                          {f.lever}
                        </p>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[11px] tracking-[0.22em] text-gold-bright">
              איך זה מרגיש
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {elements.map((el, i) => (
                <motion.article
                  key={el.code}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  className="premium-panel rounded-2xl p-5"
                >
                  <p className="text-[11px] tracking-[0.18em] text-gold-bright">
                    {el.code}
                  </p>
                  <h3 className="display mt-2 text-lg text-ivory">
                    {el.title.includes(" ") ? (
                      <>
                        {el.title.split(" ").slice(0, -1).join(" ")}{" "}
                        <span className="ink-gold">
                          {el.title.split(" ").slice(-1)}
                        </span>
                      </>
                    ) : (
                      el.title
                    )}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {el.body.includes(el.accentWord) ? (
                      <>
                        {el.body.split(el.accentWord)[0]}
                        <span className="ink-gold">{el.accentWord}</span>
                        {el.body
                          .split(el.accentWord)
                          .slice(1)
                          .join(el.accentWord)}
                      </>
                    ) : (
                      el.body
                    )}
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
