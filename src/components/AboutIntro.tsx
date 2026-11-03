"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { luxSpring } from "@/lib/motion";

/** Script 6 Phase 2 — human expert voice, no AI blacklist openers. */
const ABOUT_BODY =
  "הרושם הראשוני קובע מי נשאר בשוק. הנכס שלכם חייב להיות חד, ברור, ובנוי לסגור שיחה — לא להרשים את התיק של מעצב. אני מחבר ארכיטקטורת המרה לעיצוב יוקרה, בלי קיצורי דרך ובלי תבניות. ממשקים שעוצרים גלילה ומביאים פנייה. החזון שלכם. סטנדרט של סטודיו בוטיק.";

export function AboutIntro() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [28, -28]);

  return (
    <section
      ref={ref}
      id="about-intro"
      className="section-void relative z-10 overflow-hidden border-y border-line px-5 py-8 md:px-8 md:py-12"
    >
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-16 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={luxSpring}
          style={{ y: parallaxY }}
          className="lux-reveal mx-auto shrink-0 will-change-transform"
        >
          {/* shrink-0 + fixed circle sizes — never squeezed on mobile flex/grid */}
          <div className="relative mx-auto flex h-56 w-56 shrink-0 items-center justify-center sm:h-72 sm:w-72 md:h-80 md:w-80">
            <div className="absolute inset-0 rounded-full border border-[#D4AF37]/50 p-[3px]">
              <div className="relative flex h-full w-full shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F3EEE4]">
                <Image
                  src="/brand/dt-leather-circle.png?v=1"
                  alt=""
                  width={640}
                  height={640}
                  sizes="(max-width: 640px) 224px, 320px"
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  aria-hidden
                  quality={100}
                  unoptimized
                />
                {/* Rigid 75% emblem — object-contain on every breakpoint */}
                <Image
                  src="/brand/dt-emblem.png?v=7"
                  alt="David Tubul — סמל המותג"
                  width={480}
                  height={480}
                  sizes="(max-width: 640px) 168px, 240px"
                  className="relative z-[1] h-[75%] w-[75%] shrink-0 object-contain"
                  style={{ objectFit: "contain" }}
                  priority
                  quality={100}
                  unoptimized
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ ...luxSpring, delay: 0.08 }}
          className="lux-reveal text-center md:text-start"
        >
          <p className="text-[11px] font-light tracking-[0.22em] text-gold">
            החזון שלנו
          </p>
          <h2 className="display mt-3 text-3xl font-light tracking-wide text-ink sm:text-4xl md:text-5xl">
            בוטיק. לא פשרות.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[15px] font-light leading-[1.8] tracking-wide text-ink-soft md:mx-0 md:text-lg md:leading-[1.85]">
            {ABOUT_BODY}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
