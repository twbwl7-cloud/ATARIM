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

const HeroScene = dynamic(
  () => import("@/components/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null },
);

/**
 * Restored plunge hero — logo orb + MacBook (demo signature).
 * Palette: logo תכלת · P01 brand-first · A05 pinned scroll.
 */
function PlungeStage({
  progress,
  reduce,
}: {
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const intensityRaw = useTransform(progress, [0.06, 0.88], [0, 1]);
  const intensity = useSpring(intensityRaw, {
    stiffness: 55,
    damping: 32,
    mass: 0.55,
  });

  const textOpacity = useTransform(progress, [0, 0.12, 0.28], [1, 0.8, 0]);
  const textY = useTransform(progress, [0, 0.3], [0, -28]);
  const hintOpacity = useTransform(progress, [0, 0.1, 0.22], [1, 0.5, 0]);
  const veilOpacity = useTransform(progress, [0.72, 0.9, 1], [0, 0.55, 1]);
  const logoScale = useTransform(progress, [0, 0.35], [1, 0.82]);
  const logoY = useTransform(progress, [0, 0.4], [0, -30]);

  return (
    <div className="relative h-screen overflow-hidden bg-sky">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_50%_0%,rgba(94,235,245,0.55),transparent_48%),radial-gradient(ellipse_at_80%_55%,rgba(24,196,224,0.22),transparent_45%),radial-gradient(ellipse_at_15%_80%,rgba(201,162,74,0.12),transparent_42%)]"
      />
      <HeroScene intensity={reduce ? intensityRaw : intensity} />

      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-end px-5 pb-[16vh] text-center sm:pb-[11vh] md:pb-[8vh]"
      >
        <motion.div
          style={{ scale: logoScale, y: logoY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-3 h-20 w-20 sm:mb-4 sm:h-24 sm:w-24 md:h-28 md:w-28"
        >
          <Image
            src="/brand/emblem.png"
            alt=""
            fill
            priority
            unoptimized
            className="object-contain drop-shadow-[0_12px_28px_rgba(24,196,224,0.45)]"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="display text-[clamp(2.2rem,7vw,4.2rem)] text-ink"
        >
          דוד טובול
        </motion.p>

        {/* Script 6 · ≤8 words */}
        <h1 className="display mt-2 max-w-2xl text-[clamp(1.2rem,3.6vw,1.85rem)] leading-[1.2] text-ink-soft">
          לקוחות כותבים{" "}
          <span className="ink-cyan">קודם</span>
          {" — "}
          אתם עונים אחר כך
        </h1>

        <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-muted sm:mt-4 sm:text-sm">
          דוגמה של העמוד שלכם בחינם. לפני שקל אחד.
        </p>

        <div className="pointer-events-auto mt-5 flex w-full max-w-md flex-col items-stretch gap-2.5 sm:mt-6 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
          <MagneticButton
            href="#free-demo"
            className="btn-gold justify-center rounded-md px-7 py-3.5 text-sm"
          >
            לקבלת דוגמה בחינם
          </MagneticButton>
          <MagneticButton
            href="#work"
            className="btn-ghost justify-center rounded-md px-7 py-3.5 text-sm"
          >
            לפתיחת אתרים חיים
          </MagneticButton>
        </div>

        <p className="pointer-events-none mt-4 text-[11px] text-muted">
          בלי התחייבות · עונים בוואטסאפ ·{" "}
          <span className="ink-gold" dir="ltr">
            052-318-2032
          </span>
        </p>
      </motion.div>

      <motion.p
        style={{ opacity: hintOpacity }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 pb-[env(safe-area-inset-bottom)] text-[11px] tracking-[0.28em] text-muted sm:bottom-10"
      >
        גללו להיכנס
      </motion.p>

      <motion.div
        aria-hidden
        style={{ opacity: veilOpacity }}
        className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_50%,rgba(94,235,245,0.35)_0%,rgba(197,238,248,0.92)_48%,#c5eef8_75%)]"
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

  if (reduce) {
    return (
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center bg-sky px-5 pt-24 text-center">
        <div className="relative mb-4 h-24 w-24">
          <Image src="/brand/emblem.png" alt="" fill unoptimized className="object-contain" />
        </div>
        <p className="display text-4xl text-ink md:text-5xl">דוד טובול</p>
        <h1 className="display mt-4 text-2xl text-ink-soft md:text-3xl">
          לקוחות כותבים <span className="ink-cyan">קודם</span>
        </h1>
        <a href="#free-demo" className="btn-gold mt-8 rounded-md px-7 py-3.5 text-sm">
          לקבלת דוגמה בחינם
        </a>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[240vh] bg-sky sm:h-[260vh] md:h-[280vh]">
      <div className="sticky top-0 h-screen">
        <PlungeStage progress={scrollYProgress} reduce={false} />
      </div>
    </section>
  );
}
