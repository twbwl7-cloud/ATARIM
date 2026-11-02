"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CtaReassurance } from "@/components/CtaReassurance";
import { LiveAvailability } from "@/components/LiveAvailability";
import { MagneticButton } from "@/components/MagneticButton";
import { PeaceOfMindBadges } from "@/components/PeaceOfMindBadges";
import { SplitTextReveal } from "@/components/SplitTextReveal";
import { TrustBadges } from "@/components/TrustBadges";
import { TrustMetrics } from "@/components/TrustMetrics";
import { whatsappUrl } from "@/lib/site";

const HeroGlass = dynamic(
  () => import("@/components/HeroGlass").then((m) => m.HeroGlass),
  { ssr: false, loading: () => null },
);

const INTRO_MSG =
  "היי דוד, מעוניין בשיחת ייעוץ קצרה. אשמח לבדוק התאמה לפרויקט.";

const EASE = [0.22, 1, 0.36, 1] as const;

const TITLE_LINES = ["נכסים דיגיטליים", "שאי אפשר להתעלם מהם."] as const;

export function Hero() {
  const [reduce, setReduce] = useState(false);
  const introHref = whatsappUrl(INTRO_MSG);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <section className="relative z-10 flex min-h-0 flex-col overflow-hidden bg-[#FAF9F6]">
      {/* Match process-map cream field: gold wash + process-grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.2),transparent_48%),radial-gradient(ellipse_at_15%_70%,rgba(201,162,74,0.12),transparent_46%)]"
      />
      {!reduce ? <HeroGlass /> : null}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_50%_42%,rgba(250,249,246,0.88)_0%,rgba(250,249,246,0.55)_45%,transparent_78%)]"
      />
      <div
        aria-hidden
        className="process-grain pointer-events-none absolute inset-0 z-[3]"
      />

      {/* Guiding thread — desktop + phone */}
      <div
        className="pointer-events-none absolute inset-y-[18%] start-1/2 z-[3] w-px -translate-x-1/2 opacity-50 sm:opacity-65"
        aria-hidden
      >
        <span className="guiding-thread guiding-thread--tall mx-auto" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-5 pb-6 pt-[calc(5.5rem+env(safe-area-inset-top))] text-center sm:px-8 sm:pb-8 md:pb-10">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-4 text-[11px] font-medium tracking-[0.22em] text-[#C5A059] sm:mb-5 sm:text-xs"
        >
          דוד טובול — הנדסת חוויות רשת בהזמנה אישית
        </motion.p>
        <motion.span
          aria-hidden
          initial={reduce ? false : { opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="gold-rule gold-rule--wide mb-5 sm:mb-7"
        />

        <SplitTextReveal
          as="h1"
          delay={0.12}
          text={TITLE_LINES.join(" ")}
          className="display max-w-3xl text-[clamp(2.2rem,6.4vw,4.85rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-[#121212]"
        />

        <motion.span
          aria-hidden
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="gold-rule mt-6 sm:mt-7"
        />

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
          className="mx-auto mt-5 max-w-2xl text-[15px] font-normal leading-[1.85] tracking-wide text-[#5C5C5C] sm:mt-6 sm:text-base md:text-[17px] md:leading-[1.9]"
        >
          לא עוד אתר תדמית גנרי. אנחנו בונים{" "}
          <span className="lux-word">חוויות</span> דיגיטליות אקסקלוסיביות —
          עיצוב <span className="lux-word">בוטיק</span>, ארכיטקטורת המרה וקוד
          מותאם שממיר מבקרים לפנייה. תהליך אישי. סטנדרט של סוכנות עולמית.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.72, ease: EASE }}
          className="mt-8 flex flex-col items-center gap-4 sm:mt-10"
        >
          <LiveAvailability />
          <p className="avail-pulse">
            <span className="avail-pulse__dot" aria-hidden />
            פתוח לפרויקטים חדשים
          </p>

          <div className="flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
            <span className="btn-gold-shell">
              <MagneticButton
                href={introHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold min-h-11 justify-center rounded-full px-9 py-3 text-[14px] font-medium tracking-wide sm:min-h-12 sm:px-11 sm:text-sm"
              >
                לשיחת ייעוץ
              </MagneticButton>
            </span>
            <Link
              href="/work"
              className="btn-ghost inline-flex min-h-11 items-center justify-center rounded-full border-[#C5A059]/40 px-9 py-3 text-[14px] font-medium tracking-wide hover:border-[#C5A059] hover:text-[#C5A059] sm:min-h-12 sm:px-10 sm:text-sm"
            >
              לצפות בעבודות
            </Link>
          </div>

          <CtaReassurance className="mt-1" />
          <PeaceOfMindBadges />
          <TrustBadges />
          <TrustMetrics />
        </motion.div>
      </div>

      <div
        className="relative z-20 mx-auto flex flex-col items-center gap-2 pb-3 pt-1 sm:pb-4"
        aria-hidden
      >
        <span className="text-[10px] font-medium tracking-[0.22em] text-[#5C5C5C]/70">
          גללו
        </span>
        <span className="guiding-thread" />
      </div>
    </section>
  );
}
