"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const ABOUT_BODY =
  "בעולם שבו הרושם הראשוני קובע מי שולט בשוק, הנכס הדיגיטלי שלכם חייב להיות בלתי מתפשר. אני מחבר ארכיטקטורת קוד מדויקת לעיצוב יוקרה — בלי תבניות, בלי קיצורי דרך. ההתמחות: חוויות תלת־ממד יוקרתיות וממשקים שעוצרים גלישה וממירים לפנייה. החזון שלכם. הסטנדרט של סטודיו יוקרה.";

export function AboutIntro() {
  return (
    <section
      id="about-intro"
      className="section-void relative z-10 overflow-hidden border-y border-line px-5 py-24 md:px-8 md:py-32"
    >
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-16 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto"
        >
          <div className="relative h-48 w-48 sm:h-64 sm:w-64 md:h-72 md:w-72">
            <div className="absolute inset-0 rounded-full border border-[#D4AF37]/50 p-[3px]">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-paper">
                <Image
                  src="/brand/david-portrait.jpg"
                  alt="דוד טובול"
                  fill
                  sizes="(max-width: 640px) 192px, 288px"
                  className="object-cover object-[center_18%]"
                  priority
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
          className="text-center md:text-start"
        >
          <p className="text-[11px] font-light tracking-[0.22em] text-gold">
            החזון שלנו
          </p>
          <h2 className="display mt-3 text-3xl font-light tracking-wide text-ink sm:text-4xl md:text-5xl">
            אומנות. לא תבניות.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[15px] font-light leading-[1.8] tracking-wide text-ink-soft md:mx-0 md:text-lg md:leading-[1.85]">
            {ABOUT_BODY}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
