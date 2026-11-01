"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

function Stars() {
  return (
    <div className="mb-4 flex gap-1" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="h-3.5 w-3.5 fill-[#e0c06a] opacity-90"
        >
          <path d="M10 1.5l2.35 5.2 5.65.55-4.3 3.75 1.3 5.45L10 13.9 4.99 16.45l1.3-5.45-4.3-3.75 5.65-.55L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

/** Exact reviews from user brief — glass cards on night void */
export function Testimonials() {
  return (
    <section
      id="reviews"
      className="reviews-night relative z-10 overflow-hidden border-y border-white/5 px-5 py-16 sm:py-20 md:px-8 md:py-28"
    >
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute -left-[10%] top-[20%] h-[42vw] max-h-[420px] w-[48vw] max-w-[520px] rounded-[48%_52%_40%_60%/55%_40%_60%_45%] bg-[radial-gradient(ellipse_at_40%_40%,rgba(255,182,193,0.35),transparent_70%)] opacity-70 mix-blend-screen blur-[48px]"
        style={{ animation: "hero-breathe-b 15s cubic-bezier(0.22,1,0.36,1) infinite" }}
      />
      <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        <h2 className="display text-center text-3xl font-bold text-white md:text-4xl">
          מה אומרים מי שכבר עשו את הצעד
        </h2>

        <ul className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-3 md:items-start">
          {testimonials.map((t, i) => (
            <motion.li
              key={t.projectId}
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                delay: i * 0.15,
                duration: 0.7,
                ease: EASE,
              }}
              className={`review-glass flex flex-col rounded-2xl p-5 sm:p-6 ${
                i === 1 ? "md:mt-8" : i === 2 ? "md:mt-4" : ""
              }`}
            >
              <Stars />
              <p className="text-sm leading-relaxed text-white/80 md:text-[15px]">
                “{t.quote}”
              </p>
              <div className="mt-auto border-t border-white/10 pt-5">
                <p className="text-sm font-bold text-white">{t.name}</p>
                <p className="mt-1 text-xs text-cyan-bright/70">{t.role}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
