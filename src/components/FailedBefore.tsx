"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

/**
 * Failed-before strike (doks P05 curiosity · P07 story · P13 effort).
 * Pinned scrub: each line gets struck as the client “admits” what didn’t work —
 * no fake reviews, only universal failed patterns.
 */
const STRIKES = [
  "תבנית מוכנה שנראית כמו כולם",
  "אתר יפה שלא סוגר שיחה",
  "3D כבד שמרגיש דמו ולא מוצר",
  "עוד סוכנות שמדברת על ״וואו״ בלי הוכחה",
];

function StrikeLine({
  text,
  progress,
  index,
}: {
  text: string;
  progress: MotionValue<number>;
  index: number;
}) {
  const start = 0.12 + index * 0.18;
  const end = start + 0.14;
  const opacity = useTransform(progress, [start - 0.06, start, end], [0.25, 1, 1]);
  const scaleX = useTransform(progress, [start, end], [0, 1]);
  const x = useTransform(progress, [start - 0.08, start], [28, 0]);

  return (
    <motion.li
      style={{ opacity, x }}
      className="relative py-3 text-xl text-ivory/90 md:py-4 md:text-3xl"
    >
      <span className="relative inline-block">
        {text}
        <motion.span
          aria-hidden
          style={{ scaleX, originX: 1 }}
          className="absolute inset-y-[48%] start-0 end-0 h-[2px] bg-gradient-to-l from-gold via-pink to-gold/40"
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
  const revealY = useTransform(scrollYProgress, [0.78, 0.92], [24, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1, 0.22], [1, 0.45, 0]);

  return (
    <section
      ref={wrap}
      className="relative z-10 h-[280vh] bg-[#050506] md:h-[260vh]"
      aria-label="מה כבר ניסיתם"
    >
      {/* Mobile stack */}
      <div className="space-y-8 px-5 py-20 md:hidden">
        <div>
          <p className="text-xs tracking-[0.28em] text-pink">הכאב</p>
          <h2 className="display mt-3 text-3xl text-ivory">
            לפני שסוגרים עסקה —{" "}
            <span className="text-gold">מה כבר ניסיתם?</span>
          </h2>
        </div>
        <ul className="space-y-2">
          {STRIKES.map((line) => (
            <li key={line} className="relative text-lg text-ivory/80 line-through decoration-gold/70">
              {line}
            </li>
          ))}
        </ul>
        <p className="text-sm leading-relaxed text-muted">
          אני לא מוכר עוד באנר. אני בונה חוויה שמכריחה את הלקוח להרגיש שהמותג
          בלתי נמנע — ואז השיחה בוואטסאפ כבר קלה.
        </p>
      </div>

      {/* Desktop pinned scrub */}
      <div className="sticky top-0 hidden h-screen overflow-hidden md:block">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(240,198,207,0.06),transparent_50%)]" />
        <div className="relative mx-auto flex h-full max-w-5xl flex-col justify-center px-8">
          <p className="text-xs tracking-[0.28em] text-pink">הכאב</p>
          <h2 className="display mt-4 max-w-3xl text-[clamp(28px,4vw,52px)] leading-[1.12] text-ivory">
            לפני שסוגרים עסקה —{" "}
            <span className="gold-text">מה כבר ניסיתם?</span>
          </h2>

          <ul className="mt-10 max-w-3xl">
            {STRIKES.map((line, i) => (
              <StrikeLine key={line} text={line} progress={scrollYProgress} index={i} />
            ))}
          </ul>

          <motion.p
            style={{ opacity: reveal, y: revealY }}
            className="mt-10 max-w-xl text-base leading-relaxed text-muted"
          >
            אני לא מוכר עוד באנר. אני בונה חוויה שמכריחה את הלקוח להרגיש שהמותג
            בלתי נמנע — ואז השיחה בוואטסאפ כבר קלה.
          </motion.p>

          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-8 start-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-white/35"
          >
            <span>גללו — המסך נשאר, האמת נחשפת</span>
            <span className="flex h-9 w-9 animate-bounce items-center justify-center rounded-full border border-white/15">
              ↓
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
