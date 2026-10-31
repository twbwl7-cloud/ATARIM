"use client";

import { motion } from "framer-motion";
import { projectHref, projectIsExternal, projects, type Project } from "@/lib/site";

type Props = {
  items?: Project[];
  title?: string;
  eyebrow?: string;
  id?: string;
  limit?: number;
};

/**
 * Numbered work rows — depth-agency style: enter the live site, not a card grid.
 */
export function WorkGrid({
  items = projects,
  title = "עבודות שאפשר להיכנס אליהן",
  eyebrow = "01 · עבודות",
  id = "work",
  limit,
}: Props) {
  const list = typeof limit === "number" ? items.slice(0, limit) : items;

  return (
    <section id={id} className="section-void relative z-10 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs tracking-[0.22em] text-gold">{eyebrow}</p>
        <h2 className="display mt-3 text-3xl text-ivory md:text-5xl">{title}</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          כל אחד נבנה מאפס, בלי תבנית. נכנסים לאתר החי ומנסים בעצמכם.
        </p>

        <ul className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {list.map((project, i) => {
            const href = projectHref(project);
            const external = projectIsExternal(project);
            const n = String(i + 1).padStart(2, "0");
            return (
              <motion.li
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
              >
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group flex flex-col gap-3 py-7 transition md:flex-row md:items-center md:justify-between md:gap-8 md:py-8"
                >
                  <div className="flex min-w-0 flex-1 gap-4 md:gap-6">
                    <span className="display pt-1 text-sm text-gold/80">{n}</span>
                    <div className="min-w-0">
                      <p className="text-[11px] tracking-[0.16em] text-muted">
                        {project.format ?? project.category}
                      </p>
                      <h3 className="display mt-1 text-2xl text-ivory transition group-hover:text-gold-bright md:text-3xl">
                        {project.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                        {project.summary}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 self-start text-sm text-gold transition group-hover:translate-x-[-4px] md:self-center">
                    ← כניסה לאתר
                  </span>
                </a>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
