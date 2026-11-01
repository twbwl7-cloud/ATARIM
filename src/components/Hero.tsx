"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import { site, whatsappUrl } from "@/lib/site";

const HeroScene = dynamic(
  () => import("@/components/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null },
);

/**
 * Luxury hero — brand + MacBook only.
 * No spinning orb / glass rectangle behind the title.
 */
const INTRO_MSG = "היי דוד, ראיתי את אתר התדמית. בא לי לשיחת היכרות קצרה.";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [reduce, setReduce] = useState(false);
  const introHref = whatsappUrl(INTRO_MSG);

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

  const intensityRaw = useTransform(scrollYProgress, [0.06, 0.88], [0, 1]);
  const intensity = useSpring(intensityRaw, {
    stiffness: 40,
    damping: 32,
    mass: 0.65,
  });

  const copyOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.18, 0.26],
    [1, 1, 0.2, 0],
  );
  const copyY = useTransform(scrollYProgress, [0, 0.28], [0, -20]);
  const hintOpacity = useTransform(
    scrollYProgress,
    [0.04, 0.1, 0.2],
    [0, 1, 0],
  );
  const veilOpacity = useTransform(scrollYProgress, [0.78, 0.96], [0, 1]);
  // Gentle, stable scale — no float bounce
  const laptopScale = useTransform(scrollYProgress, [0, 0.55, 0.92], [1, 1.04, 1.22]);

  if (reduce) {
    return (
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-16 pt-[calc(5rem+env(safe-area-inset-top))] text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
          {site.nameHe}
        </p>
        <h1 className="display mt-3 text-[clamp(1.65rem,5vw,3.2rem)] text-ink">
          אתרים שאי אפשר <span className="hero-accent-text">להתעלם</span> מהם
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted">
          סטודיו לבניית אתרי תדמית בקוד — בלי תבניות, עם עבודות חיות למטה.
        </p>
        <div className="mt-7 flex flex-col items-center gap-3">
          <Link href="/work" className="btn-gold rounded-md px-8 py-3.5 text-sm">
            לתיק העבודות
          </Link>
          <MagneticButton
            href={introHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost rounded-md px-8 py-3 text-sm"
          >
            לשיחת היכרות
          </MagneticButton>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative z-10 h-[260vh] sm:h-[280vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.1),transparent_42%),radial-gradient(ellipse_at_50%_70%,rgba(24,196,224,0.06),transparent_50%)]"
        />
        <div
          className="hero-grain pointer-events-none absolute inset-0 opacity-[0.04]"
          aria-hidden
        />

        {/* Stable MacBook — no CSS float, no spinning orb */}
        <motion.div
          style={{ scale: laptopScale }}
          className="pointer-events-none absolute inset-x-0 bottom-0 top-[20%] z-[2] sm:top-[18%] md:top-[16%]"
        >
          <div className="hero-laptop-stage relative h-full w-full">
            <div className="hero-laptop-shadow !bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.62)_0%,transparent_72%)]" />
            <div className="hero-laptop-zoom pointer-events-auto absolute inset-0 overflow-hidden">
              <div className="hero-laptop-media relative h-full w-full">
                <HeroScene intensity={intensity} theme="night" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: copyOpacity, y: copyY }}
          className="pointer-events-none relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-5 pt-[calc(5.25rem+env(safe-area-inset-top))] text-center sm:px-8"
        >
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE }}
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold sm:text-sm"
          >
            {site.nameHe}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.08, ease: EASE }}
            className="display mt-3 max-w-2xl text-[clamp(1.75rem,5.2vw,3.35rem)] leading-[1.12] tracking-[-0.02em] text-ink"
          >
            אתרים שאי אפשר{" "}
            <span className="hero-accent-text">להתעלם</span> מהם
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.14, ease: EASE }}
            className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-[15px]"
          >
            סטודיו לאתרי תדמית בקוד — מלאכה, בהירות, ואתרים חיים שאפשר לבדוק
            עכשיו.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="mt-5 flex w-full max-w-sm flex-col items-stretch gap-2.5 sm:mt-7 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-3"
          >
            <Link
              href="/work"
              className="pointer-events-auto btn-gold inline-flex min-h-11 items-center justify-center rounded-md px-7 py-3 text-[14px] sm:min-h-12 sm:px-10 sm:py-3.5 sm:text-sm"
            >
              לתיק העבודות
            </Link>
            <MagneticButton
              href={introHref}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto btn-ghost min-h-11 justify-center rounded-md px-7 py-3 text-[14px] sm:min-h-12 sm:px-8 sm:text-sm"
            >
              לשיחת היכרות
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.p
          style={{ opacity: hintOpacity }}
          className="hero-caption pointer-events-none absolute inset-x-0 bottom-8 z-20 text-center text-[11px] tracking-[0.14em]"
        >
          גללו — נכנסים למסך
        </motion.p>

        <motion.div
          aria-hidden
          style={{ opacity: veilOpacity }}
          className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(ellipse_at_50%_45%,#161821_0%,#0a0b10_55%,#050507_100%)]"
        />
      </div>
    </section>
  );
}
