"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";

/**
 * Bright hero — brand-first (P01), curiosity gap (P05), Script 6 ≤8 words.
 * Signature moment: pinned daylight plunge — page stays, light + words move (A05).
 */
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

  const raw = useSpring(scrollYProgress, { stiffness: 60, damping: 28, mass: 0.4 });
  const brandY = useTransform(raw, [0, 0.45], [0, -40]);
  const brandScale = useTransform(raw, [0, 0.5], [1, 0.92]);
  const copyOpacity = useTransform(raw, [0, 0.18, 0.42], [1, 0.85, 0]);
  const copyY = useTransform(raw, [0, 0.4], [0, -24]);
  const orbScale = useTransform(raw, [0, 0.7], [1, 1.55]);
  const orbOpacity = useTransform(raw, [0.55, 0.9], [1, 0]);
  const veil = useTransform(raw, [0.7, 1], [0, 1]);
  const hintOpacity = useTransform(raw, [0, 0.12, 0.28], [1, 0.5, 0]);

  if (reduce) {
    return (
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center bg-day px-5 pt-24 text-center">
        <p className="display text-5xl text-ink md:text-6xl">דוד טובול</p>
        <h1 className="display mt-4 max-w-xl text-2xl text-ink-soft md:text-3xl">
          לקוחות כותבים <span className="ink-gold">קודם</span>
        </h1>
        <a href="#free-demo" className="btn-gold mt-8 rounded-md px-7 py-3.5 text-sm">
          לקבלת דוגמה בחינם
        </a>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[220vh] bg-day sm:h-[240vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* Daylight atmosphere — real light, not neon AI glow */}
        <motion.div
          aria-hidden
          style={{ scale: orbScale, opacity: orbOpacity }}
          className="pointer-events-none absolute left-1/2 top-[28%] h-[min(70vw,520px)] w-[min(70vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(240,226,196,0.85)_0%,rgba(184,137,45,0.22)_38%,transparent_68%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(61,107,122,0.1),transparent_45%),radial-gradient(ellipse_at_15%_75%,rgba(232,196,184,0.18),transparent_42%)]"
        />

        <motion.div
          style={{ opacity: copyOpacity, y: copyY }}
          className="relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col items-center justify-center px-5 pb-16 pt-24 text-center"
        >
          <motion.p
            style={{ y: brandY, scale: brandScale }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="display text-[clamp(2.6rem,9vw,5.5rem)] text-ink"
          >
            דוד טובול
          </motion.p>

          {/* Script 6 · H1 ≤ 8 words · benefit-first */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.75 }}
            className="display mt-4 max-w-2xl text-[clamp(1.25rem,3.8vw,2rem)] text-ink-soft"
          >
            לקוחות כותבים{" "}
            <span className="ink-gold">קודם</span>
            {" — "}
            אתם עונים אחר כך
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.6 }}
            className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base"
          >
            רואים דוגמה של העמוד שלכם בחינם. לפני שקל אחד.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.55 }}
            className="mt-7 flex w-full max-w-md flex-col gap-2.5 sm:max-w-none sm:flex-row sm:justify-center sm:gap-3"
          >
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
          </motion.div>

          <p className="mt-5 text-[11px] text-muted">
            בלי התחייבות · עונים בוואטסאפ ·{" "}
            <span className="ink-gold" dir="ltr">
              052-318-2032
            </span>
          </p>
        </motion.div>

        <motion.p
          style={{ opacity: hintOpacity }}
          className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-[11px] tracking-[0.28em] text-muted"
        >
          גללו — המסך נשאר
        </motion.p>

        <motion.div
          aria-hidden
          style={{ opacity: veil }}
          className="pointer-events-none absolute inset-0 z-20 bg-day"
        />
      </div>
    </section>
  );
}
