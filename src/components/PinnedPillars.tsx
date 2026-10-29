"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

/**
 * Pinned scroll section — page stays, pillars reveal on scrub.
 * From doks: Portfolio pillars · Framer useScroll sticky wrapper.
 * Psychology: specificity + craft authority (P* craft/authority, no fake urgency).
 */
const PILLARS = [
  {
    n: "01",
    word: "חזון",
    from: "above" as const,
    italic: false,
    outline: false,
  },
  {
    n: "02",
    word: "מלאכה",
    from: "start" as const,
    italic: false,
    outline: false,
  },
  {
    n: "03",
    word: "פרטים",
    from: "end" as const,
    italic: true,
    outline: false,
  },
  {
    n: "04",
    word: "קצב",
    from: "below-start" as const,
    italic: false,
    outline: false,
  },
  {
    n: "05",
    word: "נוכחות",
    from: "below-end" as const,
    italic: false,
    outline: true,
  },
];

function usePillarMotion(progress: MotionValue<number>, i: number) {
  const start = 0.05 + i * 0.15;
  const end = start + 0.14;
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [i % 2 === 0 ? -36 : 36, 0]);
  const x = useTransform(
    progress,
    [start, end],
    [i === 1 ? 40 : i === 2 ? -40 : i === 3 ? 28 : i === 4 ? -28 : 0, 0],
  );
  const ghostY = useTransform(progress, [start, 1], [0, i % 2 === 0 ? -18 : 18]);
  return { opacity, y, x, ghostY };
}

function Pillar({
  pillar,
  progress,
  index,
  className,
}: {
  pillar: (typeof PILLARS)[number];
  progress: MotionValue<number>;
  index: number;
  className: string;
}) {
  const { opacity, y, x, ghostY } = usePillarMotion(progress, index);
  return (
    <motion.div style={{ opacity, y, x }} className={`absolute ${className}`}>
      <motion.span
        style={{ y: ghostY }}
        aria-hidden
        className={`pointer-events-none absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[clamp(120px,18vw,280px)] font-black leading-none text-white/[0.045] ${
          pillar.italic ? "italic" : ""
        }`}
      >
        {pillar.n}
      </motion.span>
      <div className="relative z-10 text-center">
        <p className="mb-2 text-[11px] tracking-[0.28em] text-white/40">
          עמוד תווך · {pillar.n}
        </p>
        <p
          className={`text-[clamp(40px,5.5vw,88px)] font-semibold leading-none text-ivory ${
            pillar.italic ? "italic" : ""
          } ${
            pillar.outline
              ? "text-transparent [-webkit-text-stroke:1px_rgba(243,238,230,0.85)]"
              : ""
          }`}
        >
          {pillar.word}
        </p>
      </div>
    </motion.div>
  );
}

export function PinnedPillars() {
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start start", "end end"],
  });

  const headlineScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.02, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08, 0.2], [1, 0.4, 0]);

  return (
    <section
      ref={wrap}
      className="relative z-10 h-[320vh] bg-[#050506] md:h-[300vh]"
      aria-label="עמודי תווך"
    >
      {/* Mobile: simple stack (no pin) */}
      <div className="space-y-10 px-5 py-20 md:hidden">
        <div className="mb-12 text-center">
          <p className="text-xs tracking-[0.28em] text-sky-300/80">המערכת</p>
          <h2 className="display mt-3 text-3xl text-ivory">
            חלל שקט.{" "}
            <span className="bg-gradient-to-l from-sky-300 via-gold to-pink bg-clip-text text-transparent">
              נוכחות קטלנית.
            </span>
          </h2>
          <p className="mt-3 text-sm text-white/50">
            חמש מילים שמחזיקות כל פרויקט שאני בונה ללקוח.
          </p>
        </div>
        {PILLARS.map((p) => (
          <motion.div
            key={p.n}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-10 text-center"
          >
            <span className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-black text-white/[0.04]">
              {p.n}
            </span>
            <p className="relative text-4xl font-semibold text-ivory">{p.word}</p>
          </motion.div>
        ))}
      </div>

      {/* Desktop: pinned scrub */}
      <div className="sticky top-0 hidden h-screen overflow-hidden md:block">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(125,211,252,0.07),transparent_55%)]" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center justify-center px-8">
          <motion.div style={{ scale: headlineScale }} className="relative z-20 max-w-lg text-center">
            <p className="text-xs tracking-[0.32em] text-sky-300/85">המערכת</p>
            <h2 className="display mt-3 text-[clamp(28px,3.5vw,52px)] leading-[1.1] text-ivory">
              חלל שקט.{" "}
              <span className="bg-gradient-to-l from-sky-300 via-[#c9a962] to-[#f0c6cf] bg-clip-text text-transparent">
                נוכחות קטלנית.
              </span>
            </h2>
            <p className="mt-4 text-sm text-white/50 md:text-base">
              בזמן שגוללים — המסך נשאר. רק העקרונות נכנסים לחלל.
            </p>
          </motion.div>

          <Pillar
            pillar={PILLARS[0]}
            progress={scrollYProgress}
            index={0}
            className="top-[9%] start-1/2 -translate-x-1/2"
          />
          <Pillar
            pillar={PILLARS[1]}
            progress={scrollYProgress}
            index={1}
            className="top-1/2 start-[6%] -translate-y-1/2"
          />
          <Pillar
            pillar={PILLARS[2]}
            progress={scrollYProgress}
            index={2}
            className="top-1/2 end-[6%] -translate-y-1/2"
          />
          <Pillar
            pillar={PILLARS[3]}
            progress={scrollYProgress}
            index={3}
            className="bottom-[10%] start-[14%]"
          />
          <Pillar
            pillar={PILLARS[4]}
            progress={scrollYProgress}
            index={4}
            className="bottom-[10%] end-[14%]"
          />

          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-8 start-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-white/40"
          >
            <span>גללו כדי ללמוד עוד</span>
            <span className="flex h-10 w-10 animate-bounce items-center justify-center rounded-full border border-white/20 text-sm">
              ↓
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
