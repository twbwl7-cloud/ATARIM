"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  caseStudyHref,
  projects,
  type Project,
} from "@/lib/site";

type Props = {
  items?: Project[];
  title?: string;
  eyebrow?: string;
  id?: string;
  limit?: number;
};

/** שורות עבודות ממוספרות → סיפורי מקרה */
export function WorkGrid({
  items = projects,
  title = "עבודות נבחרות",
  eyebrow = "תיק עבודות",
  id = "work",
  limit,
}: Props) {
  const list = typeof limit === "number" ? items.slice(0, limit) : items;

  return (
    <section id={id} className="section-void relative z-10 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-5xl">
        <p className="text-[11px] font-light tracking-[0.22em] text-gold">
          {eyebrow}
        </p>
        <h2 className="display mt-4 text-3xl font-light tracking-wide text-ink md:text-5xl">
          {title}
        </h2>
        <p className="mt-5 max-w-2xl text-sm font-light leading-relaxed tracking-wide text-muted md:text-base">
          כל פרויקט הוא נכס דיגיטלי מותאם. נכנסים לסיפור המקרה — ואפשר גם לבדוק
          את האתר החי.
        </p>

        <ul className="mt-14 divide-y divide-black/5 border-y border-black/5">
          {list.map((project, i) => {
            const href = caseStudyHref(project);
            const n = String(i + 1).padStart(2, "0");
            return (
              <motion.li
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: i * 0.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={href}
                  className="group flex flex-col gap-3 py-8 transition-all duration-500 ease-in-out md:flex-row md:items-center md:justify-between md:gap-8 md:py-10"
                >
                  <div className="flex min-w-0 flex-1 gap-4 md:gap-6">
                    <span className="display pt-1 text-sm text-gold/80">{n}</span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-light tracking-wide text-muted">
                        {project.format ?? project.category}
                      </p>
                      <h3 className="display mt-1 text-2xl font-light tracking-wide text-ink transition-colors duration-500 group-hover:text-gold md:text-3xl">
                        {project.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm font-light leading-relaxed tracking-wide text-muted">
                        {project.summary}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 self-start text-sm font-light tracking-wide text-gold md:self-center">
                    סיפור מקרה ←
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
