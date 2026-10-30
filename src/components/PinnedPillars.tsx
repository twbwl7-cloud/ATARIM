"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PILLARS = [
  { n: "01", word: "בהירות", line: "מה הלקוח צריך להבין בשנייה הראשונה" },
  { n: "02", word: "מלאכה", line: "כל מסך משרת פנייה — לא קישוט" },
  { n: "03", word: "קצב", line: "גלילה רגועה. בלי רעש בטלפון" },
  { n: "04", word: "אמון", line: "עבודות חיות + חוות דעת אמיתיות" },
  { n: "05", word: "פעולה", line: "כפתור אחד ברור — וואטסאפ או תור" },
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
      className="section-void relative z-10 px-5 py-16 sm:py-20 md:px-8 md:py-28"
      aria-label="עמודי תווך"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-12">
          <div>
            <p className="text-xs tracking-[0.28em] text-platinum">השיטה</p>
            <h2 className="display mt-3 text-3xl text-ivory md:text-5xl">
              חמש מילים שמחזיקות אתר
            </h2>
            <p className="mt-3 max-w-md text-sm text-muted">
              בלי סיסמאות. זה מה שבודקים לפני שמעלים לאוויר.
            </p>
          </div>
          <div className="hidden h-px w-28 overflow-hidden bg-white/10 sm:block md:w-40">
            <motion.div style={{ width: bar }} className="h-full bg-gold" />
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
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-8 text-center sm:px-6 sm:py-10"
            >
              <span className="pointer-events-none absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[5.5rem] font-black text-white/[0.04] sm:text-[7rem]">
                {p.n}
              </span>
              <p className="relative text-[11px] tracking-[0.2em] text-gold">{p.n}</p>
              <p className="relative mt-2 text-3xl font-semibold text-ivory sm:text-4xl">
                {p.word}
              </p>
              <p className="relative mt-3 text-sm text-white/50">{p.line}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
