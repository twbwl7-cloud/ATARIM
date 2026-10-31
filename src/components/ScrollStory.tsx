"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const LINE =
  "לקוחות לא זוכרים תבנית. הם זוכרים את הרגע שבו לחצו וכתבו לכם.";

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
      className="section-void relative z-10 border-y border-line/30 px-5 py-20 sm:py-28 md:px-8 md:py-36"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between gap-4 sm:mb-8">
          <p className="text-xs tracking-[0.28em] text-cyan-bright">בקצרה</p>
          <div className="h-px w-16 overflow-hidden bg-white/10 sm:w-24 md:w-40">
            <motion.div
              style={{ width: bar }}
              className="h-full bg-gradient-to-l from-cyan via-cyan-bright to-gold"
            />
          </div>
        </div>
        <p className="display flex flex-wrap gap-x-2.5 gap-y-2 text-xl leading-snug text-ivory sm:gap-x-3 sm:text-2xl md:text-4xl md:leading-[1.35]">
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
  const color = useTransform(
    progress,
    [start, end],
    ["rgba(143,163,181,0.55)", "rgba(242,246,250,1)"],
  );
  return (
    <motion.span style={{ opacity, color }} className="inline-block">
      {children}
    </motion.span>
  );
}
