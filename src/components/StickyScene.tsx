"use client";

import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

const HeroScene = dynamic(
  () => import("@/components/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null },
);

/**
 * Sticky 3D MacBook — h-[300vh] scrub via useScroll → intensity
 * A05 / demo script pinned scroll pattern
 */
export function StickyScene() {
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

  const intensityRaw = useTransform(scrollYProgress, [0.05, 0.92], [0, 1]);
  const intensity = useSpring(intensityRaw, {
    stiffness: 48,
    damping: 28,
    mass: 0.55,
  });

  const captionOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.22, 0.85, 1],
    [0, 1, 1, 0.4, 0],
  );
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (reduce) {
    return (
      <section className="reviews-night relative z-10 border-y border-white/5 px-5 py-20 md:px-8">
        <div className="relative mx-auto h-[50vh] max-w-5xl overflow-hidden rounded-2xl">
          <HeroScene intensity={intensityRaw} theme="night" />
        </div>
      </section>
    );
  }

  return (
    <section
      id="scene"
      ref={ref}
      className="relative z-10 h-[300vh] bg-[var(--void-night)]"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="hero-glow hero-glow--a opacity-60" />
          <div className="hero-glow hero-glow--b opacity-50" />
          <div className="hero-grid" />
          <div className="hero-grain" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 pt-20 sm:px-8 sm:pt-24">
          <motion.div style={{ opacity: captionOpacity }} className="shrink-0 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-bright">
              3D · Interactive
            </p>
            <h2 className="display mt-2 text-2xl text-white sm:text-3xl md:text-4xl">
              גללו — המודל זז איתכם
            </h2>
            <div className="mx-auto mt-4 h-px w-40 overflow-hidden bg-white/10 sm:w-56">
              <motion.div
                style={{ width: progressWidth }}
                className="h-full bg-gradient-to-l from-cyan-bright to-[#D4AF37]"
              />
            </div>
          </motion.div>

          <div className="relative mt-4 min-h-0 flex-1">
            <div className="hero-laptop-stage absolute inset-0">
              <div className="hero-laptop-shadow bottom-[6%]" />
              <HeroScene intensity={intensity} theme="night" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-[16%] bottom-[5%] h-[16%] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(94,235,245,0.2)_0%,transparent_70%)] blur-md mix-blend-screen"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
