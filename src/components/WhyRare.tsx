"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const POINTS = [
  {
    title: "אומנות על פני תבניות",
    body: "כל נכס נכתב מאפס. תבנית מהמדף לא נושאת מותג שרוצה לשלוט בקטגוריה שלו.",
  },
  {
    title: "ארכיטקטורת המרה",
    body: "המבנה משרת פנייה אחת ברורה — שיחה, תור או הזמנה. תוצאה מדידה, לא קישוט.",
  },
  {
    title: "חוויות תלת־ממד יוקרתיות",
    body: "תנועה ותלת־ממד כשהם משרתים את המותג. וואו עם מטרה — בלי רעש שמייגע את הנייד.",
  },
  {
    title: "הנדסה כמותג",
    body: "הקוד, הדומיין והביצועים שלכם. נכס דיגיטלי שנשאר אצלכם — לא נעול אצלנו.",
  },
] as const;

export function WhyRare() {
  return (
    <section className="section-void relative z-10 overflow-hidden border-y border-line px-5 py-24 md:px-8 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.06),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-5xl">
        <p className="text-[11px] font-light tracking-[0.22em] text-gold">
          למה הסטודיו הזה
        </p>
        <h2 className="display mt-4 max-w-2xl text-3xl font-light tracking-wide text-ink md:text-5xl">
          לא בונים אתרים. בונים נכסים דיגיטליים ששולטים בשוק.
        </h2>
        <p className="mt-5 max-w-xl text-sm font-light leading-relaxed tracking-wide text-muted md:text-base">
          סטודיו יוקרה נמדד במה שהוא מסרב לעשות — לא רק במה שהוא מוכר.
        </p>

        <ul className="mt-14 grid gap-10 sm:mt-16 sm:grid-cols-2 sm:gap-x-14 sm:gap-y-12">
          {POINTS.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                delay: i * 0.08,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border-t border-white/10 pt-6"
            >
              <span
                aria-hidden
                className="mb-4 block h-px w-10 bg-gradient-to-l from-gold to-transparent"
              />
              <h3 className="display text-xl font-light tracking-wide text-ink md:text-2xl">
                {p.title}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed tracking-wide text-muted md:text-[15px]">
                {p.body}
              </p>
            </motion.li>
          ))}
        </ul>

        <div className="mt-16 flex flex-wrap items-center gap-6">
          <Link
            href="/work"
            className="btn-gold rounded-md px-8 py-3.5 text-sm font-light transition-all duration-500 ease-in-out"
          >
            לכל העבודות
          </Link>
          <Link
            href="/about"
            className="text-sm font-light tracking-wide text-muted transition-colors duration-500 ease-in-out hover:text-gold"
          >
            לפילוסופיה ←
          </Link>
        </div>
      </div>
    </section>
  );
}
