"use client";

import { motion } from "framer-motion";

/**
 * Words book · V11 הבנאי · H18 מה שלא עושים · L28 להוריד סיכון
 * Exact positioning language — what we refuse, what you get
 */
const POINTS = [
  {
    title: "לא מוכרים לפני שראיתם",
    body: "מקבלים דוגמה של העמוד שלכם קודם. לא מתאים — עוצרים. בלי לחץ ובלי כרטיס אשראי.",
  },
  {
    title: "לא מעבירים בין חמישה אנשים",
    body: "כותבים לי. אני בונה. אתם מקבלים אתר שעובד בטלפון — בלי «מישהו מהצוות יחזור».",
  },
  {
    title: "לא נועלים את הקוד אצלנו",
    body: "הקוד והדומיין שלכם. רוצים לעבור הלאה? לוקחים הכל. בלי לבנות מאפס.",
  },
  {
    title: "לא שמים תנועה בשביל הרעש",
    body: "אנימציה שמביאה הודעה — כן. גימיק שתוקע את האייפון של הלקוחה — לא.",
  },
] as const;

export function WhyRare() {
  return (
    <section className="section-void relative z-10 overflow-hidden border-y border-line px-5 py-16 sm:py-20 md:px-8 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,162,74,0.14),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-5xl">
        <p className="text-xs tracking-[0.16em] text-cyan-deep">למה איתי</p>
        {/* H18 · מה שלא עושים · V11 הבנאי */}
        <h2 className="display mt-3 max-w-2xl text-3xl text-ink md:text-5xl">
          לא בונים תבניות מהמדף. בונים אתר לעסק שלכם.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
          מה שאנחנו מסרבים לעשות אומר יותר מכל סיסמה. ככה עובדים כשרוצים הודעות מהאתר, לא מצגת.
        </p>

        <ul className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-10">
          {POINTS.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                delay: i * 0.05,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border-t border-line pt-5"
            >
              <span
                aria-hidden
                className="mb-3 block h-px w-10 bg-gradient-to-l from-gold to-transparent"
              />
              <h3 className="display text-xl text-ink md:text-2xl">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                {p.body}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
