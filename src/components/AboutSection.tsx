"use client";

import { motion } from "framer-motion";
import { philosophy, site } from "@/lib/site";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-10 mx-auto max-w-7xl overflow-hidden px-5 py-24 md:px-8 md:py-32"
    >
      <div className="grid gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-start md:gap-20">
        <div>
          <p className="text-[11px] font-medium tracking-[0.22em] text-gold uppercase">
            The Studio
          </p>
          <h2 className="display mt-4 text-3xl font-light text-ink md:text-5xl">
            הנדסת חוויות דיגיטליות ששולטות בשוק.
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-base leading-relaxed text-muted md:text-lg"
          >
            {site.focus} · {site.university}. קוד נכתב כאן — בלי ״מישהו מהצוות
            יחזור אליכם״ ובלי שרשרת פרילנסרים שמפרקת את המותג.
          </motion.p>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            עובדים עם מותגים שלא מתפשרים על תבנית. המטרה: Bespoke Digital Asset
            שמביא Measurable ROI — שיחות, תורים, הזמנות.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          {philosophy.map((item) => (
            <div
              key={item.title}
              className="border-t border-white/10 pt-6 first:border-t-0 first:pt-0 md:first:border-t md:first:pt-6"
            >
              <h3 className="display text-xl font-light text-ink md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-[15px]">
                {item.body}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
