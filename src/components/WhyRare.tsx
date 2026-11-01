"use client";

import { motion } from "framer-motion";

/** Human-expert voice — Script 6 Phase 2 · no rainbow accent spam */
const POINTS = [
  {
    title: "רואים לפני שמשלמים",
    body: "מקבלים דוגמה של העמוד שלכם בחינם. לא מתאים — עוצרים. בלי מופע מכירות.",
  },
  {
    title: "מדברים איתי. נקודה",
    body: "בלי חמישה אנשי קשר באמצע. אתם כותבים, אני בונה, אתם מקבלים אתר שעובד בטלפון.",
  },
  {
    title: "הקוד והדומיין שלכם",
    body: "לא נעולים אצלי. רוצים לעבור הלאה? לוקחים הכל. בלי לבנות מאפס.",
  },
  {
    title: "תנועה רק כשהיא עוזרת",
    body: "אנימציה שמביאה הודעה — כן. גימיק שתוקע את האייפון של הלקוחה — לא.",
  },
] as const;

export function WhyRare() {
  return (
    <section className="section-void relative z-10 overflow-hidden border-y border-line px-5 py-16 sm:py-20 md:px-8 md:py-28">
      <div className="relative mx-auto max-w-5xl">
        <p className="text-xs tracking-[0.16em] text-cyan-deep">למה איתי</p>
        <h2 className="display mt-3 max-w-xl text-3xl text-ink md:text-5xl">
          שיחה אחת. בנייה אחת. בלי תיווך.
        </h2>

        <ul className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-10">
          {POINTS.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                delay: i * 0.04,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border-t border-line pt-5"
            >
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
