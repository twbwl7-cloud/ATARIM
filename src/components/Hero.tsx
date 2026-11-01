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
import { site, whatsappUrl } from "@/lib/site";

const HeroScene = dynamic(
  () => import("@/components/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null },
);

/**
 * Words book · S01 / H01 / V11 / M01
 * Visual: Awwwards dark night + תכלת organic light (anti-AI texture)
 */
const DEMO_MSG =
  "היי דוד, רוצה דוגמה בחינם לאתר של העסק שלי. בלי התחייבות.";

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 22, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.85, delay, ease: EASE },
});

function Atmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="hero-glow hero-glow--a" />
      <div className="hero-glow hero-glow--b" />
      <div className="hero-glow hero-glow--c" />
      <div className="hero-grid" />
      <div className="hero-grain" />
    </div>
  );
}

function PlungeStage({
  progress,
  reduce,
}: {
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const intensityRaw = useTransform(progress, [0.1, 0.92], [0, 1]);
  const intensity = useSpring(intensityRaw, {
    stiffness: 55,
    damping: 32,
    mass: 0.55,
  });

  const textOpacity = useTransform(progress, [0, 0.12, 0.3], [1, 0.78, 0]);
  const textY = useTransform(progress, [0, 0.3], [0, -16]);
  const hintOpacity = useTransform(progress, [0, 0.08, 0.2], [1, 0.45, 0]);
  const veilOpacity = useTransform(progress, [0.7, 0.92, 1], [0, 0.55, 1]);
  const laptopOpacity = useTransform(progress, [0, 0.15, 0.35], [1, 0.85, 0.15]);

  const demoHref = whatsappUrl(DEMO_MSG);

  return (
    <div className="hero-night relative h-[100svh] overflow-hidden">
      <Atmosphere />

      {/* Laptop — lower band, but still inside first viewport on desktop + phone */}
      <motion.div
        style={{ opacity: laptopOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[36%] z-[1] sm:top-[34%] md:top-[30%]"
      >
        <motion.div
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 36, filter: "blur(12px)" },
                animate: { opacity: 1, y: 0, filter: "blur(0px)" },
                transition: { duration: 1.05, delay: 0.55, ease: EASE },
              })}
          className="relative h-full w-full"
        >
          <div className="hero-laptop-stage absolute inset-0">
            <div className="hero-laptop-shadow" />
            <div className="absolute inset-0">
              <HeroScene intensity={reduce ? intensityRaw : intensity} theme="night" />
            </div>
            {/* Cyan floor reflection under machine */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-[18%] bottom-[4%] h-[18%] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(94,235,245,0.22)_0%,transparent_70%)] blur-md mix-blend-screen"
            />
          </div>
        </motion.div>
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--void-night)] via-[rgba(5,10,18,0.65)] to-transparent"
        />
      </motion.div>

      {/* Copy — blur-reveal stagger on sky/void above laptop */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="pointer-events-none absolute inset-x-0 top-0 z-10 px-5 pt-[calc(4.25rem+env(safe-area-inset-top))] text-center sm:px-8 md:pt-[calc(4.75rem+env(safe-area-inset-top))]"
      >
        <div className="mx-auto w-full max-w-xl md:max-w-3xl">
          <motion.div
            {...(reduce ? {} : reveal(0.08))}
            className="mb-2 flex items-center justify-center gap-2 sm:mb-2.5 sm:gap-2.5"
          >
            <span className="relative h-9 w-9 shrink-0 sm:h-11 sm:w-11 md:h-12 md:w-12">
              <Image
                src="/brand/emblem.png"
                alt=""
                fill
                priority
                unoptimized
                className="object-contain drop-shadow-[0_0_24px_rgba(94,235,245,0.35)]"
              />
            </span>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-[var(--hero-fg-soft)] sm:text-[12px]">
              {site.nameHe}
            </p>
          </motion.div>

          <motion.h1
            {...(reduce ? {} : reveal(0.18))}
            className="display text-[clamp(1.55rem,4.8vw,3rem)] leading-[1.12] tracking-[-0.02em] text-[var(--hero-fg)]"
          >
            הודעות מלקוחות{" "}
            <span className="hero-accent-text">בלי לרדוף אחריהם</span>
          </motion.h1>

          <motion.p
            {...(reduce ? {} : reveal(0.32))}
            className="mx-auto mt-2 max-w-[22rem] text-[12px] leading-relaxed text-[var(--hero-fg-soft)] sm:mt-2.5 sm:max-w-md sm:text-[14px]"
          >
            מקבלים דוגמה לפי העסק בוואטסאפ. ממשיכים רק אחרי שראיתם.
          </motion.p>

          <motion.div
            {...(reduce ? {} : reveal(0.44))}
            className="pointer-events-auto mx-auto mt-3 flex w-full max-w-sm flex-col items-stretch gap-1.5 sm:mt-3.5 sm:max-w-none sm:items-center sm:gap-2"
          >
            <MagneticButton
              href={demoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero min-h-12 justify-center rounded-md px-7 py-3.5 text-[15px] sm:min-h-0 sm:px-10 sm:text-sm"
            >
              לקבלת דוגמה בוואטסאפ
            </MagneticButton>
            <p className="text-[11px] text-[var(--hero-fg-mute)] sm:text-xs">
              בלי כרטיס אשראי
            </p>
            <a
              href="#work"
              className="text-sm text-[var(--hero-fg-mute)] underline-offset-4 transition hover:text-cyan-bright hover:underline"
            >
              לראות עבודות חיות
            </a>
          </motion.div>

          <motion.p
            {...(reduce ? {} : reveal(0.54))}
            className="pointer-events-none mx-auto mt-2.5 max-w-sm text-[11px] leading-relaxed text-[var(--hero-fg-mute)] sm:mt-3 sm:text-xs"
          >
            <bdi>3</bdi> אתרים באוויר ·{" "}
            <bdi className="text-cyan-bright" dir="ltr">
              {site.phoneDisplay}
            </bdi>
          </motion.p>
        </div>
      </motion.div>

      <motion.p
        style={{ opacity: hintOpacity }}
        className="pointer-events-none absolute bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-10 -translate-x-1/2 text-[11px] tracking-[0.16em] text-[var(--hero-fg-mute)] md:bottom-6"
      >
        גללו — יש הוכחה
      </motion.p>

      {/* Plunge into day sections */}
      <motion.div
        aria-hidden
        style={{ opacity: veilOpacity }}
        className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_50%,rgba(94,235,245,0.2)_0%,rgba(197,238,248,0.92)_52%,#c5eef8_78%)]"
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

  const demoHref = whatsappUrl(DEMO_MSG);

  if (reduce) {
    return (
      <section className="hero-night relative flex min-h-[100svh] flex-col items-center justify-center px-5 pt-24 text-center">
        <Atmosphere />
        <p className="relative z-10 text-[12px] tracking-[0.2em] text-[var(--hero-fg-soft)]">
          {site.nameHe}
        </p>
        <h1 className="relative z-10 display mt-3 max-w-xl text-3xl text-[var(--hero-fg)] md:text-5xl">
          הודעות מלקוחות <span className="hero-accent-text">בלי לרדוף אחריהם</span>
        </h1>
        <p className="relative z-10 mt-4 max-w-sm text-sm text-[var(--hero-fg-soft)]">
          מקבלים דוגמה לפי העסק בוואטסאפ. ממשיכים רק אחרי שראיתם.
        </p>
        <a
          href={demoHref}
          className="btn-hero relative z-10 mt-8 min-h-12 rounded-md px-7 py-3.5 text-[15px]"
        >
          לקבלת דוגמה בוואטסאפ
        </a>
        <p className="relative z-10 mt-2 text-[11px] text-[var(--hero-fg-mute)]">
          בלי כרטיס אשראי
        </p>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative h-[165vh] bg-[var(--void-night)] sm:h-[190vh] md:h-[220vh]"
    >
      <div className="sticky top-0 h-[100svh]">
        <PlungeStage progress={scrollYProgress} reduce={false} />
      </div>
    </section>
  );
}
