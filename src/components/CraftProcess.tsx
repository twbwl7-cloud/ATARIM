"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

/**
 * Stacking craft process — pinned scrub (A05) + effort illusion (P13) + authority (P15).
 * Cards stack into the viewport while the page background holds.
 */
const STEPS = [
  {
    n: "01",
    title: "מה חסר היום",
    body: "מדברים על מה באמת עוצר הודעות — לא על מה שהמתחרים מעתיקים.",
    lever: "בהירות",
  },
  {
    n: "02",
    title: "רגע שנזכרים",
    body: "דבר אחד שתופס: גלילה שנשארת, מוצר בתלת־ממד, או מילה שנדלקת. בלי רעש.",
    lever: "סקרנות",
  },
  {
    n: "03",
    title: "דוגמה חיה",
    body: "רואים עמוד אמיתי לפני שמשלמים. לא מצגת — משהו שאפשר ללחוץ עליו.",
    lever: "רואים עבודה",
  },
  {
    n: "04",
    title: "עולים וסוגרים",
    body: "כפתור ברור לוואטסאפ, תור או הזמנה. בלי הבטחות באוויר.",
    lever: "פעולה",
  },
];

function StepCard({
  step,
  progress,
  index,
}: {
  step: (typeof STEPS)[number];
  progress: MotionValue<number>;
  index: number;
}) {
  // Keep all keyframe offsets strictly inside [0, 1]
  const start = 0.06 + index * 0.18;
  const mid = Math.min(start + 0.14, 0.92);
  const hold = Math.min(mid + 0.08, 0.98);
  const opacity = useTransform(progress, [start, mid, hold], [0, 1, 1]);
  const y = useTransform(progress, [start, mid], [72 + index * 10, index * 12]);
  const scale = useTransform(progress, [start, mid], [0.94, 1 - index * 0.012]);
  const rotate = useTransform(progress, [start, mid], [index % 2 === 0 ? -2 : 2, 0]);

  return (
    <motion.article
      style={{ opacity, y, scale, rotate, zIndex: index + 1 }}
      className="premium-panel absolute inset-x-0 top-[28%] mx-auto w-full max-w-xl rounded-2xl p-7 backdrop-blur-md md:p-9"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-[11px] tracking-[0.24em] text-gold">
          {step.lever}
        </p>
        <span className="display text-4xl text-white/10 md:text-5xl">{step.n}</span>
      </div>
      <h3 className="display mt-4 text-3xl text-ivory md:text-4xl">{step.title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">{step.body}</p>
    </motion.article>
  );
}

export function CraftProcess() {
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start start", "end end"],
  });

  const rail = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.08, 0.9, 1], [1, 1, 0.5, 0.35]);

  return (
    <section
      ref={wrap}
      className="section-void relative z-10 h-[340vh] md:h-[320vh]"
      aria-label="תהליך העבודה"
    >
      {/* Mobile */}
      <div className="space-y-6 px-5 py-20 md:hidden">
        <div>
          <p className="text-xs tracking-[0.28em] text-gold">המלאכה</p>
          <h2 className="display mt-3 text-3xl text-ivory">איך נבנה אתר שמביא הודעות</h2>
        </div>
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="rounded-2xl border border-line bg-elevated/60 p-6"
          >
            <p className="text-[11px] tracking-[0.2em] text-gold">{s.lever}</p>
            <h3 className="display mt-3 text-2xl text-ivory">
              {s.n} · {s.title}
            </h3>
            <p className="mt-3 text-sm text-muted">{s.body}</p>
          </div>
        ))}
      </div>

      {/* Desktop pinned stack */}
      <div className="sticky top-0 hidden h-screen overflow-hidden md:block">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,161,91,0.08),transparent_55%),radial-gradient(ellipse_at_80%_20%,rgba(122,46,58,0.08),transparent_50%)]" />

        {/* Progress rail */}
        <div className="absolute start-8 top-1/2 h-48 w-px -translate-y-1/2 overflow-hidden bg-white/10 lg:start-12">
          <motion.div
            style={{ scaleY: rail, originY: 0 }}
            className="h-full w-full bg-gradient-to-b from-gold-bright via-cyan to-cyan-deep/60"
          />
        </div>

        <div className="relative mx-auto h-full max-w-5xl px-8">
          <motion.div style={{ opacity: headlineOpacity }} className="absolute top-[12%] start-0 end-0 text-center">
            <p className="text-xs tracking-[0.28em] text-gold">המלאכה</p>
            <h2 className="display mt-3 text-[clamp(28px,3.8vw,48px)] text-ivory">
              ארבעה שלבים.{" "}
              <span className="luxury-gradient-text">בלי קיצורי דרך.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-white/45">
              הגלילה נשארת. הכרטיסים נערמים — כמו תהליך אמיתי.
            </p>
          </motion.div>

          <div className="relative h-full">
            {STEPS.map((step, i) => (
              <StepCard key={step.n} step={step} progress={scrollYProgress} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
