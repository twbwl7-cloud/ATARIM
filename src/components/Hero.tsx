"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import { whatsappUrl } from "@/lib/site";

const HeroScene = dynamic(
  () => import("@/components/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null },
);

/**
 * Script 6 Phase 1 — hero sells, does not decorate.
 * H1 ≤8 words · one primary CTA · micro-trust · proof anchor.
 */
function PlungeStage({
  progress,
  reduce,
}: {
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const intensityRaw = useTransform(progress, [0.08, 0.9], [0, 1]);
  const intensity = useSpring(intensityRaw, {
    stiffness: 55,
    damping: 32,
    mass: 0.55,
  });

  const textOpacity = useTransform(progress, [0, 0.14, 0.32], [1, 0.75, 0]);
  const textY = useTransform(progress, [0, 0.32], [0, -22]);
  const hintOpacity = useTransform(progress, [0, 0.1, 0.24], [1, 0.45, 0]);
  const veilOpacity = useTransform(progress, [0.7, 0.92, 1], [0, 0.5, 1]);

  const demoHref = whatsappUrl(
    "היי דוד, רוצה דוגמה בחינם לאתר של העסק שלי — בלי התחייבות.",
  );

  return (
    <div className="relative h-screen overflow-hidden bg-sky">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_50%_8%,rgba(94,235,245,0.5),transparent_46%),radial-gradient(ellipse_at_82%_58%,rgba(24,196,224,0.2),transparent_44%)]"
      />
      <HeroScene intensity={reduce ? intensityRaw : intensity} />

      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-end px-5 pb-[15vh] text-center sm:pb-[11vh] md:pb-[8vh]"
      >
        {/* Brand signal — not competing with the offer */}
        <div className="mb-4 flex items-center gap-2.5">
          <span className="relative h-10 w-10 sm:h-11 sm:w-11">
            <Image
              src="/brand/emblem.png"
              alt=""
              fill
              priority
              unoptimized
              className="object-contain"
            />
          </span>
          <p className="text-[11px] font-semibold tracking-[0.18em] text-ink-soft uppercase sm:text-xs">
            דוד טובול
          </p>
        </div>

        {/* H1 — 6 words · bleeding pain → result */}
        <h1 className="display max-w-3xl text-[clamp(1.65rem,5.8vw,3.15rem)] leading-[1.12] text-ink">
          אתר שמביא{" "}
          <span className="ink-cyan">הודעות</span>
          {" — "}
          לא רק יופי
        </h1>

        {/* Sub — 14 words · offer + proof without repeating H1 */}
        <p className="mt-3 max-w-md text-[13px] leading-relaxed text-ink-soft sm:mt-4 sm:text-[15px]">
          דוגמה בחינם לעסק שלכם. שלושה אתרים חיים למטה. בלי התחייבות.
        </p>

        <div className="pointer-events-auto mt-6 flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:items-center">
          <MagneticButton
            href={demoHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold justify-center rounded-md px-8 py-3.5 text-sm sm:px-10"
          >
            לקבלת דוגמה בחינם בוואטסאפ
          </MagneticButton>
          <a
            href="#work"
            className="text-sm text-ink-faint underline-offset-4 transition hover:text-cyan-deep hover:underline"
          >
            לראות אתרים חיים ↓
          </a>
        </div>

        {/* Micro-trust — concrete, not fluff */}
        <p className="pointer-events-none mt-4 max-w-sm text-[11px] leading-relaxed text-muted sm:text-xs">
          3 אתרים באוויר · בלי כרטיס אשראי ·{" "}
          <span className="ink-gold" dir="ltr">
            052-318-2032
          </span>
        </p>
      </motion.div>

      <motion.p
        style={{ opacity: hintOpacity }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 pb-[env(safe-area-inset-bottom)] text-[11px] tracking-[0.24em] text-muted sm:bottom-9"
      >
        גללו להוכחה
      </motion.p>

      <motion.div
        aria-hidden
        style={{ opacity: veilOpacity }}
        className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_50%,rgba(94,235,245,0.3)_0%,rgba(197,238,248,0.94)_50%,#c5eef8_78%)]"
      />
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const demoHref = whatsappUrl(
    "היי דוד, רוצה דוגמה בחינם לאתר של העסק שלי — בלי התחייבות.",
  );

  if (reduce) {
    return (
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center bg-sky px-5 pt-24 text-center">
        <p className="text-[11px] tracking-[0.18em] text-ink-soft uppercase">דוד טובול</p>
        <h1 className="display mt-3 max-w-xl text-3xl text-ink md:text-5xl">
          אתר שמביא <span className="ink-cyan">הודעות</span> — לא רק יופי
        </h1>
        <a href={demoHref} className="btn-gold mt-8 rounded-md px-7 py-3.5 text-sm">
          לקבלת דוגמה בחינם בוואטסאפ
        </a>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[200vh] bg-sky sm:h-[220vh] md:h-[230vh]">
      <div className="sticky top-0 h-screen">
        <PlungeStage progress={scrollYProgress} reduce={false} />
      </div>
    </section>
  );
}
