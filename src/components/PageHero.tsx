"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Inner-page brand open — one job, one headline (אתר תדמית IA) */
export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <section className="relative z-10 overflow-hidden px-5 pb-10 pt-8 sm:px-8 sm:pb-14 sm:pt-10 md:pt-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_70%_0%,rgba(212,175,55,0.12),transparent_55%)]"
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold sm:text-xs"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.85, delay: 0.06, ease: EASE }}
          className="display mt-3 text-[clamp(1.75rem,4.5vw,3rem)] leading-[1.15] tracking-[-0.02em] text-ink"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-[15px]"
        >
          {lead}
        </motion.p>
      </div>
    </section>
  );
}
