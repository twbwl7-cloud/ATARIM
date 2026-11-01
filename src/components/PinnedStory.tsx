"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * A05 pinned scroll story · P07 narrative transport · P05 curiosity gap.
 * Screen stays; lines strike through as you scroll — then the promise lands.
 */
const LINES = [
  { plain: "תבנית שנראית כמו ", accent: "כולם" },
  { plain: "אתר יפה שלא מביא ", accent: "הודעה" },
  { plain: "אנימציה כבדה שנתקעת ב", accent: "טלפון" },
  { plain: "עוד הבטחה של ״וואו״ בלי ", accent: "תוצאה" },
];

export function PinnedStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const reveal = useTransform(scrollYProgress, [0.72, 0.9], [0, 1]);
  const revealY = useTransform(scrollYProgress, [0.72, 0.9], [20, 0]);
  const hint = useTransform(scrollYProgress, [0, 0.1, 0.22], [1, 0.4, 0]);

  return (
    <section
      ref={ref}
      className="relative z-10 h-[240vh] bg-paper sm:h-[260vh]"
      aria-label="מה כבר ניסיתם"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(184,137,45,0.1),transparent_50%)]"
        />
        <div className="relative mx-auto w-full max-w-5xl px-5 sm:px-8">
          <p className="text-xs tracking-[0.28em] text-gold">בואו נהיה כנים</p>
          <h2 className="display mt-3 max-w-3xl text-[clamp(1.6rem,4.5vw,3.2rem)] text-ink">
            מה כבר ניסיתם — ולמה זה{" "}
            <span className="ink-gold">לא עבד</span>?
          </h2>

          <ul className="mt-8 max-w-3xl sm:mt-10">
            {LINES.map((line, i) => {
              const start = 0.12 + i * 0.14;
              const end = start + 0.12;
              return (
                <StrikeLine
                  key={line.accent}
                  plain={line.plain}
                  accent={line.accent}
                  progress={scrollYProgress}
                  start={start}
                  end={end}
                />
              );
            })}
          </ul>

          <motion.div style={{ opacity: reveal, y: revealY }} className="mt-10 max-w-xl">
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              אני לא מוכר באנר. בונים דף שמביא{" "}
              <span className="ink-gold">הודעה</span> — ואז הוואטסאפ כבר קל יותר.
            </p>
            <a
              href="#free-demo"
              className="btn-gold mt-6 inline-flex rounded-md px-6 py-3 text-sm"
            >
              רוצים לראות דוגמה בחינם?
            </a>
          </motion.div>
        </div>

        <motion.p
          style={{ opacity: hint }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.24em] text-muted"
        >
          גללו — המסך נשאר
        </motion.p>
      </div>
    </section>
  );
}

function StrikeLine({
  plain,
  accent,
  progress,
  start,
  end,
}: {
  plain: string;
  accent: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start - 0.06, start, end], [0.28, 1, 1]);
  const scaleX = useTransform(progress, [start, end], [0, 1]);
  const x = useTransform(progress, [start - 0.08, start], [16, 0]);

  return (
    <motion.li
      style={{ opacity, x }}
      className="relative py-2.5 text-lg text-ink-soft sm:py-3 sm:text-xl md:py-4 md:text-3xl"
    >
      <span className="relative inline-block">
        {plain}
        <span className="ink-gold">{accent}</span>
        <motion.span
          aria-hidden
          style={{ scaleX, originX: 1 }}
          className="absolute inset-y-[48%] start-0 end-0 h-[2px] bg-gold"
        />
      </span>
    </motion.li>
  );
}
