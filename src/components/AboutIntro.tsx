"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { luxEase } from "@/lib/motion";

const ABOUT_BODY =
  "בעולם שבו הרושם הראשוני קובע מי שולט בשוק — הנכס הדיגיטלי שלכם חייב להיות בלתי מתפשר. אני מחבר ארכיטקטורת המרה לעיצוב יוקרה, בלי קיצורי דרך ובלי תבניות. ההתמחות: חוויות דיגיטליות אקסקלוסיביות וממשקים שעוצרים גלישה וממירים לפנייה. החזון שלכם. סטנדרט העבודה של סטודיו בוטיק.";

export function AboutIntro() {
  return (
    <section
      id="about-intro"
      className="section-void relative z-10 overflow-hidden border-y border-line px-5 py-8 md:px-8 md:py-12"
    >
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-16 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: luxEase }}
          className="lux-reveal mx-auto"
        >
          <div className="relative grid h-48 w-48 place-items-center sm:h-64 sm:w-64 md:h-72 md:w-72">
            <div className="absolute inset-0 rounded-full border border-[#D4AF37]/50 p-[3px]">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-[#F3EEE4]">
                <Image
                  src="/brand/dt-emblem-circle.png?v=5"
                  alt="David Tubul — סמל המותג"
                  width={640}
                  height={640}
                  sizes="(max-width: 640px) 192px, 288px"
                  className="h-full w-full object-contain"
                  priority
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
          transition={{ duration: 0.75, delay: 0.08, ease: luxEase }}
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
