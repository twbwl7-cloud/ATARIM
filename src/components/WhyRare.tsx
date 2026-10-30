"use client";

import { motion } from "framer-motion";

const POINTS = [
  {
    title: "רואים לפני שמשלמים",
    body: "דוגמא של העמוד שלכם — בחינם. אם זה לא מדויק, עוצרים שם. בלי לחץ.",
  },
  {
    title: "שיחה אחת. בנייה אחת.",
    body: "בלי שרשרת מנהלי פרויקטים. אתם מדברים איתי, ומקבלים אתר שעובד.",
  },
  {
    title: "הקוד והדומיין שלכם",
    body: "לא נעולים אצלי. אפשר להמשיך עם מי שתרצו — בלי לבנות מחדש.",
  },
  {
    title: "תנועה רק כשצריך",
    body: "אנימציה שמביאה פנייה — כן. גימיק שמעייף בטלפון — לא.",
  },
] as const;

export function WhyRare() {
  return (
    <section className="relative z-10 border-y border-white/5 bg-[#0a1220] px-5 py-16 sm:py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs tracking-[0.22em] text-gold">למה איתי</p>
        <h2 className="display mt-3 max-w-xl text-3xl text-ivory md:text-5xl">
          מסלול קצר. תוצאה ברורה.
        </h2>

        <ul className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-10">
          {POINTS.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="border-t border-gold/25 pt-5"
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
