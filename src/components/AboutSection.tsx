"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-16 md:px-8 md:py-28"
    >
      <div>
        <p className="text-xs tracking-[0.24em] text-pink">אודות</p>
        <h2 className="display mt-3 text-3xl text-ivory md:text-5xl">
          יופי שמחזיק על ארכיטקטורה חכמה
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 text-base leading-relaxed text-muted md:text-lg"
        >
          אני סטודנט למדעי המחשב ב{site.university} עם מיקוד ב
          {site.focus}. משלב Back-end חזק ב-Node.js ו-Java עם Front-end מתקדם
          ב-Next.js ו-Tailwind — כדי ליצור פרויקטים שלא רק נראים מדהים, אלא
          בנויים על בסיס טכנולוגי יציב וחכם.
        </motion.p>
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
          ההתמחות שלי: מותגי יוקרה שצריכים נוכחות דיגיטלית מדויקת — מקליניקות
          כמו &quot;לולילק&quot;, דרך עוגות בוטיק, ועד מספרות כמו &quot;לוקסי&quot;.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="premium-panel relative overflow-hidden rounded-[1.5rem] p-7 md:p-9"
      >
        <div className="absolute -start-10 -top-10 h-40 w-40 rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute -bottom-12 -end-8 h-44 w-44 rounded-full bg-pink/12 blur-3xl" />
        <ul className="relative space-y-5 text-sm md:text-base">
          {[
            ["Front-end", "Next.js · Tailwind · R3F · Motion"],
            ["Back-end", "Node.js · Java · APIs יציבים"],
            ["חוויה", "3D · מיתוג יוקרה · E-commerce"],
            ["גישה", "Mobile-first · RTL · ביצועים"],
          ].map(([label, value]) => (
            <li
              key={label}
              className="flex items-start justify-between gap-4 border-b border-line/45 pb-4 last:border-0 last:pb-0"
            >
              <span className="text-gold">{label}</span>
              <span className="text-end text-ivory/90">{value}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
