"use client";

import { motion } from "framer-motion";

const POINTS = [
  {
    title: "רואים לפני שמשלמים",
    body: "הדמיה של העמוד שלכם — בחינם. ממשיכים רק כשזה מרגיש כמו העסק שלכם.",
  },
  {
    title: "בלי תבנית, בלי מנהל פרויקטים",
    body: "שיחה אחת איתי. בנייה אחת. אין שרשרת טלפונים שמתגלגלת באמצע.",
  },
  {
    title: "הנכס שלכם",
    body: "דומיין, קוד ותוכן על שמכם. אפשר להמשיך עם מפתח אחר בלי לבנות מחדש.",
  },
  {
    title: "תנועה שמוכרת",
    body: "גלילה נעוצה, גלגל עבודות, כניסה ל־3D — רק כשזה מחזק את העסקה, לא כגימיק.",
  },
] as const;

export function WhyRare() {
  return (
    <section className="relative z-10 border-y border-white/5 bg-[#0a1220] px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs tracking-[0.22em] text-gold">למה זה נדיר</p>
        <h2 className="display mt-3 max-w-xl text-3xl text-ivory md:text-5xl">
          לא עוד סוכנות. מסלול אחד ברור.
        </h2>

        <ul className="mt-12 grid gap-10 sm:grid-cols-2">
          {POINTS.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
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
