"use client";

import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";

const HeroScene = dynamic(
  () => import("@/components/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null },
);

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
  const veilOpacity = useTransform(progress, [0.72, 0.9, 1], [0, 0.5, 1]);

  return (
    <div className="relative h-screen overflow-hidden bg-[#061018]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_30%_20%,rgba(240,208,120,0.18),transparent_45%),radial-gradient(ellipse_at_80%_60%,rgba(62,220,200,0.2),transparent_50%),radial-gradient(ellipse_at_50%_90%,rgba(245,208,220,0.1),transparent_40%)]"
      />
      <HeroScene intensity={reduce ? intensityRaw : intensity} />

      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-end px-5 pb-[18vh] text-center sm:pb-[12vh] md:pb-[9vh]"
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-3 text-[11px] tracking-[0.22em] text-cyan-bright"
        >
          דוד טובול · בונה אתרים
        </motion.p>
        <h1 className="display max-w-3xl text-[clamp(1.75rem,6.4vw,3.5rem)] leading-[1.12] text-ivory">
          האתר שלכם צריך להביא{" "}
          <span className="ink-gold">הודעות</span>.
          <br />
          לא רק להיראות{" "}
          <span className="ink-rose">יפה</span>.
        </h1>
        <p className="mt-3 max-w-md text-[13px] leading-relaxed text-muted sm:mt-4 sm:text-sm md:text-base">
          רואים <span className="ink-cyan">דוגמה בחינם</span> לפני שמשלמים.
          גללו — ונכנסים פנימה.
        </p>
        <div className="pointer-events-auto mt-5 flex w-full max-w-md flex-col items-stretch gap-2.5 sm:mt-6 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
          <a
            href="#free-demo"
            className="btn-gold rounded-full px-6 py-3.5 text-center text-sm sm:px-7"
          >
            רוצה דוגמה בחינם
          </a>
          <a
            href="#work"
            className="btn-ghost rounded-full px-6 py-3.5 text-center text-sm"
          >
            תראה לי אתרים חיים
          </a>
        </div>
        <p className="pointer-events-none mt-4 text-[11px] tracking-[0.04em] text-platinum/85">
          בלי התחייבות · עונים בוואטסאפ ·{" "}
          <span className="ink-gold" dir="ltr">
            052-318-2032
          </span>
        </p>
      </motion.div>

      <motion.p
        style={{ opacity: hintOpacity }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 pb-[env(safe-area-inset-bottom)] text-[11px] tracking-[0.28em] text-muted sm:bottom-10 md:bottom-12"
      >
        גללו להיכנס
      </motion.p>

      <motion.div
        aria-hidden
        style={{ opacity: veilOpacity }}
        className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_50%,rgba(40,180,170,0.28)_0%,rgba(6,16,24,0.95)_42%,#061018_70%)]"
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
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center bg-[#061018] px-5 pt-24 text-center">
        <h1 className="display text-4xl text-ivory md:text-5xl">
          האתר שלכם צריך להביא <span className="ink-gold">הודעות</span>.
          <br />
          לא רק להיראות <span className="ink-rose">יפה</span>.
        </h1>
        <a href="#free-demo" className="btn-gold mt-8 rounded-full px-7 py-3.5 text-sm">
          רוצה דוגמה בחינם
        </a>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[240vh] bg-[#061018] sm:h-[260vh] md:h-[280vh]">
      <div className="sticky top-0 h-screen">
        <PlungeStage progress={scrollYProgress} reduce={false} />
      </div>
    </section>
  );
}
