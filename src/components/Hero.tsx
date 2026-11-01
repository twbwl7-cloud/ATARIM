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
 * Words book · S01 מסך פתיחה
 * H01 התוצאה בלי המחיר · V11 הבנאי · M01 כפתור ראשי · X-filter
 * Landing: Hook → micro-proof → one CTA · mobile-first 375
 */
const DEMO_MSG =
  "היי דוד, רוצה דוגמה בחינם לאתר של העסק שלי. בלי התחייבות.";

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

  const textOpacity = useTransform(progress, [0, 0.12, 0.3], [1, 0.8, 0]);
  const textY = useTransform(progress, [0, 0.3], [0, -18]);
  const hintOpacity = useTransform(progress, [0, 0.08, 0.2], [1, 0.5, 0]);
  const veilOpacity = useTransform(progress, [0.72, 0.92, 1], [0, 0.55, 1]);

  const demoHref = whatsappUrl(DEMO_MSG);

  return (
    <div className="relative h-[100svh] overflow-hidden bg-sky">
      {/* Scene: phone = lower half; desktop = full bleed behind copy */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[40%] z-0 md:inset-0 md:top-0">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(94,235,245,0.45),transparent_48%),radial-gradient(ellipse_at_80%_70%,rgba(24,196,224,0.18),transparent_46%)]"
        />
        <HeroScene intensity={reduce ? intensityRaw : intensity} />
        {/* Soft lift so MacBook does not fight the copy on phone */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-sky to-transparent md:hidden"
        />
      </div>

      {/* Phone: readable band under header. Desktop: lower third over scene */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="pointer-events-none absolute inset-x-0 z-10 px-5 pt-[calc(4.75rem+env(safe-area-inset-top))] text-center sm:px-8 md:inset-0 md:flex md:flex-col md:items-center md:justify-end md:pt-0 md:pb-[min(10vh,5.5rem)]"
      >
        <div className="mx-auto w-full max-w-xl md:max-w-3xl">
          {/* Brand — hero-level signal, not competing with H1 */}
          <div className="mb-3 flex items-center justify-center gap-2.5 sm:mb-4 sm:gap-3">
            <span className="relative h-11 w-11 shrink-0 sm:h-12 sm:w-12 md:h-14 md:w-14">
              <Image
                src="/brand/emblem.png"
                alt=""
                fill
                priority
                unoptimized
                className="object-contain drop-shadow-[0_8px_18px_rgba(10,88,110,0.18)]"
              />
            </span>
            <p className="text-[12px] font-semibold tracking-[0.14em] text-ink-soft sm:text-[13px] sm:tracking-[0.16em]">
              {site.nameHe}
            </p>
          </div>

          {/* H01 · 5 מילים · [תוצאה] בלי [מה שמפחיד] */}
          <h1 className="display text-[clamp(1.7rem,6.2vw,3.35rem)] leading-[1.14] text-ink">
            הודעות מלקוחות
            <br className="sm:hidden" />{" "}
            <span className="ink-cyan">בלי לרדוף אחריהם</span>
          </h1>

          {/* S01 כותרת משנה · ≤20 · מסבירה מה מקבלים */}
          <p className="mx-auto mt-3 max-w-[22rem] text-[13px] leading-relaxed text-ink-soft sm:mt-4 sm:max-w-md sm:text-[15px]">
            מקבלים דוגמה לפי העסק בוואטסאפ. ממשיכים רק אחרי שראיתם.
          </p>

          <div className="pointer-events-auto mx-auto mt-5 flex w-full max-w-sm flex-col items-stretch gap-2.5 sm:mt-6 sm:max-w-none sm:items-center sm:gap-3">
            {/* M01 · פועל + תוצאה */}
            <MagneticButton
              href={demoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold min-h-12 justify-center rounded-md px-7 py-3.5 text-[15px] sm:min-h-0 sm:px-10 sm:text-sm"
            >
              לקבלת דוגמה בוואטסאפ
            </MagneticButton>
            <p className="text-[11px] text-muted sm:text-xs">בלי כרטיס אשראי</p>
            {/* M02 · חלש יותר */}
            <a
              href="#work"
              className="text-sm text-ink-faint underline-offset-4 transition hover:text-cyan-deep hover:underline"
            >
              לראות עבודות חיות
            </a>
          </div>

          {/* שורת הוכחה · ≤8 יחידות · מספרים ב־bdi */}
          <p className="pointer-events-none mx-auto mt-4 max-w-sm text-[11px] leading-relaxed text-muted sm:mt-5 sm:text-xs">
            <bdi>3</bdi> אתרים באוויר ·{" "}
            <bdi className="text-cyan-deep" dir="ltr">
              {site.phoneDisplay}
            </bdi>
          </p>
        </div>
      </motion.div>

      <motion.p
        style={{ opacity: hintOpacity }}
        className="pointer-events-none absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-10 -translate-x-1/2 text-[11px] tracking-[0.12em] text-muted md:bottom-8"
      >
        גללו — יש הוכחה
      </motion.p>

      <motion.div
        aria-hidden
        style={{ opacity: veilOpacity }}
        className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_50%,rgba(94,235,245,0.28)_0%,rgba(197,238,248,0.94)_52%,#c5eef8_78%)]"
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
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center bg-sky px-5 pt-24 text-center">
        <p className="text-[12px] tracking-[0.14em] text-ink-soft">{site.nameHe}</p>
        <h1 className="display mt-3 max-w-xl text-3xl text-ink md:text-5xl">
          הודעות מלקוחות <span className="ink-cyan">בלי לרדוף אחריהם</span>
        </h1>
        <p className="mt-4 max-w-sm text-sm text-ink-soft">
          מקבלים דוגמה לפי העסק בוואטסאפ. ממשיכים רק אחרי שראיתם.
        </p>
        <a
          href={demoHref}
          className="btn-gold mt-8 min-h-12 rounded-md px-7 py-3.5 text-[15px]"
        >
          לקבלת דוגמה בוואטסאפ
        </a>
        <p className="mt-2 text-[11px] text-muted">בלי כרטיס אשראי</p>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative h-[165vh] bg-sky sm:h-[190vh] md:h-[220vh]"
    >
      <div className="sticky top-0 h-[100svh]">
        <PlungeStage progress={scrollYProgress} reduce={false} />
      </div>
    </section>
  );
}
