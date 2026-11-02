"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

const STRIKES = [
  {
    plain: "אתר שנראה כמו ",
    accent: "כולם",
    ink: "ink-rose" as const,
  },
  {
    plain: "אתר יפה שלא מביא ",
    accent: "הודעה",
    ink: "ink-gold" as const,
  },
  {
    plain: "אנימציה כבדה שנתקעת ב",
    accent: "טלפון",
    ink: "ink-gold" as const,
  },
  {
    plain: "עוד הבטחה של ״וואו״ בלי ",
    accent: "תוצאה",
    ink: "ink-champagne" as const,
  },
];

function StrikeLine({
  plain,
  accent,
  ink,
  progress,
  index,
}: {
  plain: string;
  accent: string;
  ink: string;
  progress: MotionValue<number>;
  index: number;
}) {
  const start = 0.12 + index * 0.18;
  const end = start + 0.14;
  const opacity = useTransform(progress, [start - 0.06, start, end], [0.3, 1, 1]);
  const scaleX = useTransform(progress, [start, end], [0, 1]);
  const x = useTransform(progress, [start - 0.08, start], [16, 0]);

  return (
    <motion.li
      style={{ opacity, x }}
      className="relative py-2.5 text-lg text-ivory/90 sm:py-3 sm:text-xl md:py-4 md:text-3xl"
    >
      <span className="relative inline-block">
        {plain}
        <span className={ink}>{accent}</span>
        <motion.span
          aria-hidden
          style={{ scaleX, originX: 1 }}
          className="absolute inset-y-[48%] start-0 end-0 h-[2px] bg-gradient-to-l from-gold-bright via-gold to-gold/70"
        />
      </span>
    </motion.li>
  );
}

export function FailedBefore() {
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start start", "end end"],
  });

  const reveal = useTransform(scrollYProgress, [0.78, 0.92], [0, 1]);
  const revealY = useTransform(scrollYProgress, [0.78, 0.92], [16, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1, 0.22], [1, 0.45, 0]);

  return (
    <section
      ref={wrap}
      className="section-void relative z-10 h-[220vh] sm:h-[240vh] md:h-[260vh]"
      aria-label="מה כבר ניסיתם"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(196,163,90,0.1),transparent_50%),radial-gradient(ellipse_at_20%_80%,rgba(184,116,92,0.08),transparent_45%)]" />
        <div className="relative mx-auto flex h-full max-w-5xl flex-col justify-center px-5 sm:px-8">
          <p className="text-xs tracking-[0.28em] text-gold">בואו נהיה כנים</p>
          <h2 className="display mt-3 max-w-3xl text-[clamp(1.6rem,4.5vw,3.2rem)] leading-[1.15] text-ivory sm:mt-4">
            מה כבר ניסיתם — ולמה זה{" "}
            <span className="ink-gold">לא עבד</span>?
          </h2>

          <ul className="mt-8 max-w-3xl sm:mt-10">
            {STRIKES.map((line, i) => (
              <StrikeLine
                key={line.accent}
                plain={line.plain}
                accent={line.accent}
                ink={line.ink}
                progress={scrollYProgress}
                index={i}
              />
            ))}
          </ul>

          <motion.p
            style={{ opacity: reveal, y: revealY }}
            className="mt-8 max-w-xl text-sm leading-relaxed text-muted sm:mt-10 sm:text-base"
          >
            אני לא מוכר באנר. בונים דף שמביא{" "}
            <span className="ink-gold">הודעה</span> — ואז הוואטסאפ כבר קל יותר.
          </motion.p>

          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-6 start-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] text-white/35 sm:bottom-8 sm:text-xs"
          >
            <span>גללו — המסך נשאר</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
