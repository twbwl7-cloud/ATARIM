"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PILLARS = [
  {
    n: "01",
    word: "בהירות",
    ink: "ink-gold" as const,
    line: (
      <>
        מה הלקוח צריך להבין ב<span className="ink-cyan">שנייה</span> הראשונה
      </>
    ),
  },
  {
    n: "02",
    word: "מלאכה",
    ink: "ink-rose" as const,
    line: (
      <>
        כל מסך משרת <span className="ink-gold">פנייה</span> — לא קישוט
      </>
    ),
  },
  {
    n: "03",
    word: "קצב",
    ink: "ink-cyan" as const,
    line: (
      <>
        גלילה רגועה. בלי <span className="ink-rose">רעש</span> בטלפון
      </>
    ),
  },
  {
    n: "04",
    word: "אמון",
    ink: "ink-champagne" as const,
    line: (
      <>
        עבודות חיות + חוות דעת <span className="ink-cyan">אמיתיות</span>
      </>
    ),
  },
  {
    n: "05",
    word: "פעולה",
    ink: "ink-gold" as const,
    line: (
      <>
        כפתור אחד ברור — וואטסאפ או <span className="ink-gold">תור</span>
      </>
    ),
  },
] as const;

/** Clean stack on all sizes — no broken dual layout */
export function PinnedPillars() {
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start 80%", "end 40%"],
  });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={wrap}
      id="pillars"
      className="section-void relative z-10 overflow-hidden px-5 py-16 sm:py-20 md:px-8 md:py-28"
      aria-label="עמודי תווך"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 top-20 h-64 w-64 rounded-full bg-violet/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 bottom-10 h-56 w-56 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-12">
          <div>
            <p className="text-xs tracking-[0.28em] text-platinum">השיטה</p>
            <h2 className="display mt-3 text-3xl text-ivory md:text-5xl">
              חמש מילים שמחזיקות{" "}
              <span className="ink-gold">אתר</span>
            </h2>
            <p className="mt-3 max-w-md text-sm text-muted">
              בלי סיסמאות. זה מה שבודקים לפני שמעלים ל
              <span className="ink-cyan">אוויר</span>.
            </p>
          </div>
          <div className="hidden h-px w-28 overflow-hidden bg-white/10 sm:block md:w-40">
            <motion.div
              style={{ width: bar }}
              className="h-full bg-gradient-to-l from-gold via-cyan to-pink"
            />
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.li
              key={p.n}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="premium-panel relative overflow-hidden rounded-2xl px-5 py-8 text-center sm:px-6 sm:py-10"
            >
              <span className="pointer-events-none absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[5.5rem] font-black text-white/[0.04] sm:text-[7rem]">
                {p.n}
              </span>
              <p className={`relative text-[11px] tracking-[0.2em] ${p.ink}`}>
                {p.n}
              </p>
              <p className={`relative mt-2 text-3xl font-semibold sm:text-4xl ${p.ink}`}>
                {p.word}
              </p>
              <p className="relative mt-3 text-sm text-white/55">{p.line}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
