"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import { site, whatsappUrl } from "@/lib/site";

/** Minimal luxury hero — headline + CTAs only (user brief) */
const CONSULT_MSG =
  "היי דוד, בא לי לשיחת ייעוץ בוואטסאפ על אתר לעסק שלי.";

const EASE = [0.16, 1, 0.3, 1] as const;

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 22, filter: "blur(12px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.9, delay, ease: EASE },
});

function Atmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="hero-glow hero-glow--a" />
      <div className="hero-glow hero-glow--b" />
      <div className="hero-glow hero-glow--c" />
      <div className="hero-glow hero-glow--pink" />
      <div className="hero-grid" />
      <div className="hero-grain" />
    </div>
  );
}

export function Hero() {
  const [reduce, setReduce] = useState(false);
  const consultHref = whatsappUrl(CONSULT_MSG);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <section className="hero-night relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-[calc(5.5rem+env(safe-area-inset-top))] text-center sm:px-8">
      <Atmosphere />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <motion.p
          {...(reduce ? {} : reveal(0.05))}
          className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-bright sm:text-sm"
        >
          David Web Design &amp; Development
        </motion.p>

        <motion.h1
          {...(reduce ? {} : reveal(0.14))}
          className="display mt-4 text-[clamp(1.7rem,5.4vw,3.35rem)] leading-[1.14] tracking-[-0.02em] text-[var(--hero-fg)]"
        >
          חוויות דיגיטליות שאי אפשר{" "}
          <span className="hero-accent-text">להתעלם</span> מהן.
        </motion.h1>

        <motion.div
          {...(reduce ? {} : reveal(0.32))}
          className="mx-auto mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:items-center sm:gap-3.5"
        >
          <MagneticButton
            href={consultHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hero min-h-12 justify-center rounded-md px-8 py-3.5 text-[15px] sm:px-10 sm:text-sm"
          >
            לשיחת ייעוץ בוואטסאפ
          </MagneticButton>
          <a
            href="#work"
            className="group relative inline-flex justify-center text-sm text-[var(--hero-fg-soft)] transition hover:text-cyan-bright"
          >
            לראות עבודות חיות
            <span className="absolute inset-x-0 -bottom-0.5 mx-auto h-px w-0 bg-cyan-bright transition-all duration-300 group-hover:w-full" />
          </a>
        </motion.div>

        <motion.p
          {...(reduce ? {} : reveal(0.42))}
          className="mt-5 text-[11px] text-[var(--hero-fg-mute)] sm:text-xs"
        >
          <bdi className="text-cyan-bright" dir="ltr">
            {site.phoneDisplay}
          </bdi>
        </motion.p>
      </div>
    </section>
  );
}
