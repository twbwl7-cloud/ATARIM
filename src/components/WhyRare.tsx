"use client";

import { motion } from "framer-motion";

/** P13 labour illusion · objection handling from landing script */
const POINTS = [
  {
    title: (
      <>
        רואים לפני ש<span className="ink-gold">משלמים</span>
      </>
    ),
    body: (
      <>
        מקבלים דוגמה של העמוד שלכם — בחינם. לא מתאים? עוצרים שם. בלי לחץ.
      </>
    ),
  },
  {
    title: (
      <>
        מדברים איתי. <span className="ink-gold">נקודה</span>.
      </>
    ),
    body: (
      <>
        בלי שרשרת אנשים באמצע. אתם כותבים, אני בונה, ואתם מקבלים אתר שעובד.
      </>
    ),
  },
  {
    title: (
      <>
        הקוד והדומיין <span className="ink-gold">שלכם</span>
      </>
    ),
    body: (
      <>
        לא נעולים אצלי. רוצים להמשיך עם מישהו אחר? בבקשה — בלי לבנות מההתחלה.
      </>
    ),
  },
  {
    title: (
      <>
        תנועה רק כשהיא <span className="ink-gold">עוזרת</span>
      </>
    ),
    body: (
      <>
        אנימציה שמביאה הודעה — כן. גימיק שתוקע את הטלפון — לא.
      </>
    ),
  },
] as const;

export function WhyRare() {
  return (
    <section className="section-void relative z-10 overflow-hidden border-y border-line px-5 py-16 sm:py-20 md:px-8 md:py-28">
      <div className="relative mx-auto max-w-5xl">
        <p className="text-xs tracking-[0.22em] text-gold">למה איתי</p>
        <h2 className="display mt-3 max-w-xl text-3xl text-ink md:text-5xl">
          שיחה אחת. בנייה אחת.{" "}
          <span className="ink-gold">בלי תיווך</span>.
        </h2>

        <ul className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-10">
          {POINTS.map((p, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-gold/35 pt-5"
            >
              <h3 className="display text-xl text-ink md:text-2xl">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{p.body}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
