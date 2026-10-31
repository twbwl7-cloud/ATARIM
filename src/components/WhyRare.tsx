"use client";

import { motion } from "framer-motion";

const POINTS = [
  {
    title: (
      <>
        רואים לפני ש<span className="ink-cyan">משלמים</span>
      </>
    ),
    body: (
      <>
        מקבלים דוגמה של העמוד שלכם — <span className="ink-gold">בחינם</span>.
        לא מתאים? עוצרים שם.
      </>
    ),
  },
  {
    title: (
      <>
        מדברים איתי. <span className="ink-rose">נקודה</span>.
      </>
    ),
    body: (
      <>
        בלי שרשרת אנשים באמצע. אתם כותבים, אני בונה, ואתם מקבלים אתר ש{" "}
        <span className="ink-cyan">עובד</span>.
      </>
    ),
  },
  {
    title: (
      <>
        הקוד והדומיין <span className="ink-cyan">שלכם</span>
      </>
    ),
    body: (
      <>
        לא נעולים אצלי. רוצים להמשיך עם מישהו אחר? בבקשה — בלי לבנות{" "}
        <span className="ink-gold">מההתחלה</span>.
      </>
    ),
  },
  {
    title: (
      <>
        תנועה רק כשהיא{" "}
        <span className="ink-cyan">עוזרת</span>
      </>
    ),
    body: (
      <>
        אנימציה שמביאה <span className="ink-gold">הודעה</span> — כן. גימיק שתוקע
        את הטלפון — לא.
      </>
    ),
  },
] as const;

export function WhyRare() {
  return (
    <section className="section-void relative z-10 overflow-hidden border-y border-line/30 px-5 py-16 sm:py-20 md:px-8 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-cyan/16 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-cyan/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl">
        <p className="text-xs tracking-[0.22em] text-gold">למה איתי</p>
        <h2 className="display mt-3 max-w-xl text-3xl text-ivory md:text-5xl">
          שיחה אחת. בנייה אחת.{" "}
          <span className="ink-gold">בלי תיווך</span>.
        </h2>

        <ul className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-10">
          {POINTS.map((p, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="border-t border-gold/30 pt-5"
            >
              <h3 className="display text-xl text-ivory md:text-2xl">{p.title}</h3>
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
