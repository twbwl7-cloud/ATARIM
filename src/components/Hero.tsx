"use client";

import dynamic from "next/dynamic";
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
 * A05 pinned plunge — screen stays, MacBook grows until we enter the display,
 * then the next section opens. Day theme · Script 6 / book copy (no X01–X16).
 */
const CONSULT_MSG =
  "היי דוד, בא לי לשיחת ייעוץ בוואטסאפ על אתר לעסק שלי.";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [reduce, setReduce] = useState(false);
  const consultHref = whatsappUrl(CONSULT_MSG);

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
    stiffness: 52,
    damping: 30,
    mass: 0.5,
  });

  // Fade copy out before the MacBook fills the frame (avoids dark-on-dark)
  const copyOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.18, 0.26],
    [1, 1, 0.2, 0],
  );
  const copyY = useTransform(scrollYProgress, [0, 0.28], [0, -28]);
  const hintOpacity = useTransform(
    scrollYProgress,
    [0.04, 0.1, 0.2],
    [0, 1, 0],
  );
  const veilOpacity = useTransform(scrollYProgress, [0.78, 0.96], [0, 1]);
  const laptopScale = useTransform(scrollYProgress, [0, 0.5, 0.9], [1, 1.08, 1.35]);

  if (reduce) {
    return (
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-sky px-5 pb-16 pt-[calc(5rem+env(safe-area-inset-top))] text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-deep">
          David Web Design &amp; Development
        </p>
        <h1 className="display mt-3 text-[clamp(1.65rem,5vw,3.2rem)] text-ink">
          אתרים שאי אפשר <span className="hero-accent-text">להתעלם</span> מהם.
        </h1>
        <div className="mt-7 flex flex-col items-center gap-3">
          <MagneticButton
            href={consultHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold rounded-md px-8 py-3.5 text-sm"
          >
            לשיחת ייעוץ בוואטסאפ
          </MagneticButton>
          <a href="#work" className="hero-caption">
            לראות עבודות חיות
          </a>
          <p className="hero-caption hero-caption--phone" dir="ltr">
            {site.phoneDisplay}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative z-10 h-[280vh] bg-sky sm:h-[300vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(94,235,245,0.4),transparent_48%),radial-gradient(ellipse_at_10%_55%,rgba(255,182,193,0.14),transparent_46%)]"
        />
        <div
          className="hero-grain pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"
          aria-hidden
        />

        {/* MacBook — pinned, intensity drives plunge into the screen */}
        <motion.div
          style={{ scale: laptopScale }}
          className="pointer-events-none absolute inset-x-0 bottom-0 top-[48%] z-[1] sm:top-[28%] md:top-[18%]"
        >
          <div className="hero-laptop-stage relative h-full w-full">
            <div className="hero-laptop-shadow !bg-[radial-gradient(ellipse_at_center,rgba(10,22,40,0.22)_0%,transparent_70%)]" />
            <HeroScene intensity={intensity} theme="day" />
          </div>
        </motion.div>

        {/* Opening copy — fades as we enter the machine */}
        <motion.div
          style={{ opacity: copyOpacity, y: copyY }}
          className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-5 pt-[calc(4.75rem+env(safe-area-inset-top))] text-center sm:px-8"
        >
          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-deep sm:text-sm"
          >
            David Web Design &amp; Development
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
            className="display mt-3 max-w-2xl text-[clamp(1.65rem,5vw,3.2rem)] leading-[1.14] tracking-[-0.02em] text-ink"
          >
            אתרים שאי אפשר{" "}
            <span className="hero-accent-text">להתעלם</span> מהם.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: EASE }}
            className="mt-5 flex w-full max-w-sm flex-col items-stretch gap-2.5 sm:mt-7 sm:max-w-none sm:items-center sm:gap-3"
          >
            <MagneticButton
              href={consultHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold min-h-11 justify-center rounded-md px-7 py-3 text-[14px] sm:min-h-12 sm:px-10 sm:py-3.5 sm:text-sm"
            >
              לשיחת ייעוץ בוואטסאפ
            </MagneticButton>
            <a href="#work" className="hero-caption group relative inline-flex justify-center">
              לראות עבודות חיות
              <span className="absolute inset-x-0 -bottom-0.5 mx-auto h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
            </a>
          </motion.div>

          <p className="hero-caption hero-caption--phone mt-4">
            <bdi dir="ltr">{site.phoneDisplay}</bdi>
          </p>
        </motion.div>

        <motion.p
          style={{ opacity: hintOpacity }}
          className="hero-caption pointer-events-none absolute inset-x-0 bottom-8 z-20 text-center text-[11px] tracking-[0.14em]"
        >
          גללו — נכנסים למסך
        </motion.p>

        {/* Screen veil — cyan fill as we enter, then Trust opens */}
        <motion.div
          aria-hidden
          style={{ opacity: veilOpacity }}
          className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(ellipse_at_50%_45%,#5eebf5_0%,#c5eef8_55%,#c5eef8_100%)]"
        />
      </div>
    </section>
  );
}
