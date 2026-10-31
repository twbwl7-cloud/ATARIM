"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-10 mx-auto grid max-w-7xl gap-10 overflow-hidden px-5 py-16 sm:py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-16 md:px-8 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-10 h-56 w-56 rounded-full bg-gold/14 blur-3xl md:right-1/3"
      />
      <div>
        <p className="text-xs tracking-[0.24em] text-pink">עליי</p>
        <h2 className="display mt-3 text-3xl text-ivory md:text-5xl">
          דוד טובול. כותב קוד.{" "}
          <span className="ink-gold">סוגר תורים</span>.
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-5 text-base leading-relaxed text-muted md:mt-6 md:text-lg"
        >
          לומד {site.focus} ב{site.university}. כותב את הקוד בעצמי —{" "}
          <span className="ink-cyan">Next.js</span>, Node,{" "}
          <span className="ink-gold">Three.js</span>. בלי להעביר אתכם בין חמישה
          אנשים.
        </motion.p>
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
          עובד עם עסקים שצריכים{" "}
          <span className="ink-cyan">הודעות</span>: קליניקות כמו לולילק, עוגות כמו
          Cookk, מספרות כמו לוקסי. האתר חייב לעבוד גם בטלפון — שם רוב הלקוחות.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="premium-panel relative overflow-hidden rounded-[1.5rem] p-6 sm:p-7 md:p-9"
      >
        <div className="absolute -start-10 -top-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -bottom-12 -end-8 h-44 w-44 rounded-full bg-gold/12 blur-3xl" />
        <ul className="relative space-y-5 text-sm md:text-base">
          {[
            ["בנייה", "Next.js · Tailwind · Three.js", "ink-cyan"],
            ["שרת", "Node.js · Java · APIs", "ink-gold"],
            ["למי", "קליניקות · אוכל · מספרות", "ink-rose"],
            ["טלפון", "אותו אתר — גם ב־390px", "ink-champagne"],
          ].map(([label, value, ink]) => (
            <li
              key={label}
              className="flex items-start justify-between gap-4 border-b border-line/45 pb-4 last:border-0 last:pb-0"
            >
              <span className={ink}>{label}</span>
              <span className="text-end text-ivory/90" dir="auto">
                {value}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
