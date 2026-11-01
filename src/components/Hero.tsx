"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import { site, whatsappUrl } from "@/lib/site";

const HeroScene = dynamic(
  () => import("@/components/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null },
);

/** Light luxury hero · MacBook present · no sticky scrub */
const CONSULT_MSG =
  "היי דוד, בא לי לשיחת ייעוץ בוואטסאפ על אתר לעסק שלי.";

const EASE = [0.16, 1, 0.3, 1] as const;

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 20, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.85, delay, ease: EASE },
});

export function Hero() {
  const [reduce, setReduce] = useState(false);
  const intensity = useMotionValue(0.35);
  const consultHref = whatsappUrl(CONSULT_MSG);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-sky">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(94,235,245,0.45),transparent_48%),radial-gradient(ellipse_at_10%_60%,rgba(255,182,193,0.18),transparent_46%),radial-gradient(ellipse_at_50%_100%,rgba(24,196,224,0.2),transparent_50%)]"
      />
      <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply" aria-hidden />

      {/* MacBook — lower band, floating, NOT scroll-scrubbed */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[42%] z-[1] sm:top-[40%] md:top-[36%]">
          <motion.div
            initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.35, ease: EASE }}
            className="hero-laptop-stage relative h-full w-full"
          >
            <div className="hero-laptop-shadow !bg-[radial-gradient(ellipse_at_center,rgba(10,22,40,0.28)_0%,transparent_70%)]" />
            <HeroScene intensity={intensity} theme="day" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-[18%] bottom-[3%] h-[14%] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(24,196,224,0.2)_0%,transparent_70%)] blur-md"
            />
          </motion.div>
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-sky via-sky/80 to-transparent"
          />
        </div>
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-5 pb-8 pt-[calc(5rem+env(safe-area-inset-top))] text-center sm:px-8">
        <motion.p
          {...(reduce ? {} : reveal(0.05))}
          className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-deep sm:text-sm"
        >
          David Web Design &amp; Development
        </motion.p>

        <motion.h1
          {...(reduce ? {} : reveal(0.14))}
          className="display mt-3 max-w-2xl text-[clamp(1.65rem,5vw,3.2rem)] leading-[1.14] tracking-[-0.02em] text-ink"
        >
          חוויות דיגיטליות שאי אפשר{" "}
          <span className="hero-accent-text">להתעלם</span> מהן.
        </motion.h1>

        <motion.div
          {...(reduce ? {} : reveal(0.28))}
          className="mt-7 flex w-full max-w-sm flex-col items-stretch gap-2.5 sm:max-w-none sm:items-center sm:gap-3"
        >
          <MagneticButton
            href={consultHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold min-h-12 justify-center rounded-md px-8 py-3.5 text-[15px] sm:px-10 sm:text-sm"
          >
            לשיחת ייעוץ בוואטסאפ
          </MagneticButton>
          <a
            href="#work"
            className="group relative inline-flex justify-center text-sm text-muted transition hover:text-cyan-deep"
          >
            לראות עבודות חיות
            <span className="absolute inset-x-0 -bottom-0.5 mx-auto h-px w-0 bg-cyan-deep transition-all duration-300 group-hover:w-full" />
          </a>
        </motion.div>

        <motion.p
          {...(reduce ? {} : reveal(0.38))}
          className="mt-4 text-[11px] text-muted sm:text-xs"
        >
          <bdi className="text-cyan-deep" dir="ltr">
            {site.phoneDisplay}
          </bdi>
        </motion.p>
      </div>
    </section>
  );
}
