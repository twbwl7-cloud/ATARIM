"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/** Word-ignite on scroll — doks A* / book: one scrub highlight only */
const LINE =
  "לקוחות לא זוכרים תבנית. הם זוכרים רגע — כשהמסך שותק והמותג מרגיש בלתי נמנע.";

export function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 55%"],
  });
  const words = LINE.split(" ");

  return (
    <section
      ref={ref}
      className="relative z-10 border-y border-white/5 bg-[#070708] px-5 py-28 md:px-8 md:py-36"
    >
      <div className="mx-auto max-w-4xl">
        <p className="mb-8 text-xs tracking-[0.28em] text-gold">למה זה חשוב</p>
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
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  );
}
