"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

/**
 * Pinned scroll — page holds, pillars enter the void (A05 scrub).
 * Psychology: specificity + craft authority (P15/P16). No fake urgency.
 */
const PILLARS = [
  {
    n: "01",
    word: "חזון",
    line: "מה הלקוח צריך להרגיש בשנייה הראשונה",
    italic: false,
    outline: false,
  },
  {
    n: "02",
    word: "מלאכה",
    line: "כל פיקסל משרת המרה — לא קישוט",
    italic: false,
    outline: false,
  },
  {
    n: "03",
    word: "פרטים",
    line: "טיפוגרפיה, קצב, ומיקרו־תגובה שמרגישים יוקרה",
    italic: true,
    outline: false,
  },
  {
    n: "04",
    word: "קצב",
    line: "גלילה שננעצת — המסך שותק, הסיפור זז",
    italic: false,
    outline: false,
  },
  {
    n: "05",
    word: "נוכחות",
    line: "המותג מרגיש בלתי נמנע. השיחה נפתחת לבד",
    italic: false,
    outline: true,
  },
];

function usePillarMotion(progress: MotionValue<number>, i: number) {
  const start = 0.06 + i * 0.14;
  const end = start + 0.12;
  const opacity = useTransform(progress, [start, end, Math.min(end + 0.45, 0.98)], [0, 1, 0.85]);
  const y = useTransform(progress, [start, end], [i % 2 === 0 ? -48 : 48, 0]);
  const x = useTransform(
    progress,
    [start, end],
    [i === 1 ? 56 : i === 2 ? -56 : i === 3 ? 36 : i === 4 ? -36 : 0, 0],
  );
  const ghostY = useTransform(progress, [start, 1], [0, i % 2 === 0 ? -28 : 28]);
  const blur = useTransform(progress, [start, end], [8, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  return { opacity, y, x, ghostY, filter };
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
  const { opacity, y, x, ghostY, filter } = usePillarMotion(progress, index);
  return (
    <motion.div style={{ opacity, y, x, filter }} className={`absolute ${className}`}>
      <motion.span
        style={{ y: ghostY }}
        aria-hidden
        className={`pointer-events-none absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[clamp(120px,18vw,280px)] font-black leading-none text-white/[0.045] ${
          pillar.italic ? "italic" : ""
        }`}
      >
        {pillar.n}
      </motion.span>
      <div className="relative z-10 max-w-[220px] text-center">
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
        <p className="mt-3 text-[11px] leading-relaxed text-white/45 md:text-xs">
          {pillar.line}
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

  const headlineScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.04, 0.98]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.35, 0.7], [1, 0.55, 0.25]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08, 0.2], [1, 0.4, 0]);
  const ring = useTransform(scrollYProgress, [0, 1], [0.35, 1]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.15, 0.4, 0.55]);

  return (
    <section
      ref={wrap}
      className="section-void relative z-10 h-[360vh] md:h-[340vh]"
      aria-label="עמודי תווך"
    >
      {/* Mobile: simple stack */}
      <div className="space-y-10 px-5 py-20 md:hidden">
        <div className="mb-12 text-center">
          <p className="text-xs tracking-[0.28em] text-platinum">המערכת</p>
          <h2 className="display mt-3 text-3xl text-ivory">
            חלל שקט.{" "}
            <span className="luxury-gradient-text">נוכחות קטלנית.</span>
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
            <p className="relative mt-3 text-sm text-white/45">{p.line}</p>
          </motion.div>
        ))}
      </div>

      {/* Desktop: pinned scrub */}
      <div className="sticky top-0 hidden h-screen overflow-hidden md:block">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,161,91,0.08),transparent_55%),radial-gradient(ellipse_at_70%_30%,rgba(122,46,58,0.08),transparent_50%)]" />

        {/* Expanding orbital ring — space presence */}
        <motion.div
          aria-hidden
          style={{ scale: ring, opacity: ringOpacity }}
          className="pointer-events-none absolute start-1/2 top-1/2 h-[min(70vw,620px)] w-[min(70vw,620px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-platinum/25"
        />
        <motion.div
          aria-hidden
          style={{ scale: ring, opacity: ringOpacity }}
          className="pointer-events-none absolute start-1/2 top-1/2 h-[min(48vw,420px)] w-[min(48vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/25"
        />

        <div className="relative mx-auto flex h-full max-w-7xl items-center justify-center px-8">
          <motion.div
            style={{ scale: headlineScale, opacity: headlineOpacity }}
            className="relative z-20 max-w-lg text-center"
          >
            <p className="text-xs tracking-[0.32em] text-platinum">המערכת</p>
            <h2 className="display mt-3 text-[clamp(28px,3.5vw,52px)] leading-[1.1] text-ivory">
              חלל שקט.{" "}
              <span className="luxury-gradient-text">נוכחות קטלנית.</span>
            </h2>
            <p className="mt-4 text-sm text-white/50 md:text-base">
              בזמן שגוללים — המסך נשאר. רק העקרונות נכנסים לחלל.
            </p>
          </motion.div>

          <Pillar
            pillar={PILLARS[0]}
            progress={scrollYProgress}
            index={0}
            className="top-[8%] start-1/2 -translate-x-1/2"
          />
          <Pillar
            pillar={PILLARS[1]}
            progress={scrollYProgress}
            index={1}
            className="top-1/2 start-[5%] -translate-y-1/2"
          />
          <Pillar
            pillar={PILLARS[2]}
            progress={scrollYProgress}
            index={2}
            className="top-1/2 end-[5%] -translate-y-1/2"
          />
          <Pillar
            pillar={PILLARS[3]}
            progress={scrollYProgress}
            index={3}
            className="bottom-[9%] start-[12%]"
          />
          <Pillar
            pillar={PILLARS[4]}
            progress={scrollYProgress}
            index={4}
            className="bottom-[9%] end-[12%]"
          />

          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-8 start-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-white/40"
          >
            <span>גללו — אל תזיזו את העיניים מהחלל</span>
            <span className="flex h-10 w-10 animate-bounce items-center justify-center rounded-full border border-white/20 text-sm">
              ↓
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
