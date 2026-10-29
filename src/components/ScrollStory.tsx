"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/** Word-ignite on scroll — doks A* / P07 story transport: one scrub highlight only */
const LINE =
  "לקוחות לא זוכרים תבנית. הם זוכרים רגע — כשהמסך שותק והמותג מרגיש בלתי נמנע.";

export function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 40%"],
  });
  const words = LINE.split(" ");
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      className="relative z-10 border-y border-white/5 bg-[#070708] px-5 py-28 md:px-8 md:py-40"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <p className="text-xs tracking-[0.28em] text-gold">למה זה חשוב</p>
          <div className="h-px w-24 overflow-hidden bg-white/10 md:w-40">
            <motion.div style={{ width: bar }} className="h-full bg-gradient-to-l from-gold to-pink" />
          </div>
        </div>
        <p className="display flex flex-wrap gap-x-3 gap-y-2 text-2xl leading-snug text-ivory md:text-4xl md:leading-[1.35]">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={`${word}-${i}`} progress={scrollYProgress} start={start} end={end}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  start,
  end,
}: {
  children: string;
  progress: import("framer-motion").MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.14, 1]);
  const y = useTransform(progress, [start, end], [10, 0]);
  const color = useTransform(
    progress,
    [start, end],
    ["rgba(154,149,140,0.55)", "rgba(243,238,230,1)"],
  );
  return (
    <motion.span style={{ opacity, y, color }} className="inline-block">
      {children}
    </motion.span>
  );
}
