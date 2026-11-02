"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SplitTextReveal } from "@/components/SplitTextReveal";

const POINTS = [
  {
    title: "בוטיק על פני המוני",
    body: "כל נכס נכתב מאפס. תבנית מדף לא בונה מותג שרוצה להוביל את הקטגוריה שלו.",
  },
  {
    title: "ארכיטקטורת המרה",
    body: "המבנה משרת פעולה אחת ברורה — שיחה, תור או הזמנה. תוצאה מדידה, לא קישוט.",
  },
  {
    title: "תנועה עם מטרה",
    body: "עומק ואנימציה רק כשהם משרתים את המותג. וואו שנשאר בזיכרון — בלי להאט את הנייד.",
  },
  {
    title: "בעלות מלאה",
    body: "הדומיין, הקוד והביצועים — שלכם. הנכס נשאר אצלכם, לא נעול אצל ספק.",
  },
] as const;

export function WhyRare() {
  return (
    <section className="section-void relative z-10 overflow-hidden border-y border-line px-5 py-5 md:px-8 md:py-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(ellipse_at_50%_0%,rgba(197,160,89,0.08),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-5xl">
        <p className="text-[11px] font-light tracking-[0.22em] text-gold">
          עקרונות מובילים
        </p>
        <SplitTextReveal
          as="h2"
          text="לא בונים עוד אתר. בונים נכסים דיגיטליים ששולטים בשוק."
          className="display mt-3 max-w-2xl text-3xl font-light tracking-wide text-ink md:text-4xl"
        />
        <p className="mt-4 max-w-xl text-sm font-light leading-relaxed tracking-wide text-muted md:text-base">
          סטודיו <span className="lux-word">יוקרה</span> נמדד במה שהוא מסרב
          לעשות — לא רק במה שהוא מוכר. כאן כל שורה מכוונת לפנייה.
        </p>

        <ul className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-10">
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
              className="border-t border-black/5 pt-6"
            >
              <span
                aria-hidden
                className="mb-4 block h-px w-10 bg-gradient-to-l from-gold to-transparent"
              />
              <h3 className="display text-xl font-light tracking-wide text-ink md:text-2xl">
                {p.title.startsWith("בוטיק") ? (
                  <>
                    <span className="lux-word">בוטיק</span>
                    {p.title.slice("בוטיק".length)}
                  </>
                ) : (
                  p.title
                )}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed tracking-wide text-muted md:text-[15px]">
                {p.body.includes("תוצאה") ? (
                  <>
                    {p.body.split("תוצאה")[0]}
                    <span className="lux-word">תוצאה</span>
                    {p.body.split("תוצאה")[1]}
                  </>
                ) : (
                  p.body
                )}
              </p>
            </motion.li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-5 md:mt-12">
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
            לסטנדרט העבודה ←
          </Link>
        </div>
      </div>
    </section>
  );
}
