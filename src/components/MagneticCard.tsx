"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import type { Project } from "@/lib/site";
import { whatsappUrl } from "@/lib/site";

const accents = {
  gold: "from-gold/25 via-transparent to-transparent",
  pink: "from-pink/20 via-transparent to-transparent",
  ivory: "from-ivory/15 via-transparent to-transparent",
} as const;

type Props = {
  project: Project;
  index?: number;
};

export function MagneticCard({ project, index = 0 }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(40);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, rgba(201,169,98,0.18), transparent 55%)`;

  function onMove(e: MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.08);
    y.set(dy * 0.08);
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
    glowX.set(50);
    glowY.set(40);
  }

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay: index * 0.06 }}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative overflow-hidden rounded-[1.35rem] border border-line bg-elevated/70 p-6 md:p-7"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accents[project.accent]} opacity-70`}
      />

      <div className="relative z-10 flex h-full min-h-[240px] flex-col justify-between gap-6">
        <div>
          <div className="flex items-start justify-between gap-3">
            <p className="text-[11px] tracking-[0.18em] text-gold uppercase">
              {project.category}
            </p>
            <span className="rounded-full border border-line px-2.5 py-1 text-[10px] text-muted">
              {project.client}
            </span>
          </div>
          <h3 className="display mt-4 text-2xl text-ivory md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted md:text-[15px]">
            {project.summary}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line/80 bg-rich-black/40 px-2.5 py-1 text-[11px] text-ivory/80"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-line/50 pt-4">
            <span className="text-xs text-muted transition group-hover:text-pink">
              ריחוף חושף פרטים · מוכן לשיחה
            </span>
            <a
              href={whatsappUrl(
                `היי דוד, התעניינתי בפרויקט בסגנון "${project.title}". אשמח להצעת מחיר.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-gold opacity-0 transition group-hover:opacity-100 hover:bg-gold hover:text-rich-black"
            >
              לשיחה
            </a>
          </div>
        </div>
      </div>

      {/* faux short “preview reel” strip on hover */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-right scale-x-0 bg-gradient-to-l from-gold via-pink to-transparent transition duration-500 group-hover:scale-x-100" />
    </motion.article>
  );
}
