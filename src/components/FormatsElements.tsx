"use client";

import { motion } from "framer-motion";
import { elements, formats } from "@/lib/site";

const ACCENT = {
  gold: {
    num: "text-cyan-bright",
    border: "border-cyan/40 hover:border-cyan/65",
    glow: "group-hover:shadow-[0_0_40px_rgba(62,200,240,0.25)]",
    chip: "bg-cyan/15 text-cyan-bright",
  },
  rose: {
    num: "text-platinum",
    border: "border-white/25 hover:border-cyan/40",
    glow: "group-hover:shadow-[0_0_40px_rgba(212,222,232,0.14)]",
    chip: "bg-white/10 text-platinum",
  },
  cyan: {
    num: "text-cyan-bright",
    border: "border-cyan/40 hover:border-cyan/65",
    glow: "group-hover:shadow-[0_0_40px_rgba(62,200,240,0.25)]",
    chip: "bg-cyan/15 text-cyan-bright",
  },
  violet: {
    num: "text-cyan",
    border: "border-cyan/30 hover:border-cyan/55",
    glow: "group-hover:shadow-[0_0_40px_rgba(26,168,200,0.2)]",
    chip: "bg-cyan/10 text-cyan",
  },
} as const;

export function FormatsElements() {
  return (
    <section
      id="formats"
      className="section-void relative z-10 overflow-hidden border-y border-line/30 px-5 py-16 sm:py-20 md:px-8 md:py-28"
    >
      <div aria-hidden className="aurora" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan/16 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-cyan/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl md:mb-14">
          <p className="text-xs tracking-[0.24em] text-cyan-bright">מה בונים</p>
          <h2 className="display mt-3 text-3xl text-ivory md:text-5xl">
            ארבעה סוגי אתרים.{" "}
            <span className="ink-cyan">ארבעה כלים.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
            בוחרים מה מתאים לעסק — ובונים רק מה שמביא{" "}
            <span className="ink-gold">הודעה</span>.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="mb-4 text-[11px] tracking-[0.22em] text-cyan-bright">
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
                    className={`group relative overflow-hidden rounded-2xl border bg-white/[0.03] p-5 transition duration-300 md:p-6 ${a.border} ${a.glow}`}
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
            <p className="mb-4 text-[11px] tracking-[0.22em] text-cyan-bright">
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
                  <p className="text-[11px] tracking-[0.18em] text-cyan-bright">
                    {el.code}
                  </p>
                  <h3 className="display mt-2 text-lg text-ivory">
                    {el.title.includes(" ") ? (
                      <>
                        {el.title.split(" ").slice(0, -1).join(" ")}{" "}
                        <span className="ink-cyan">
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
