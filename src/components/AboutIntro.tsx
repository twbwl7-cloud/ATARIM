"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Exact user about copy — do not rewrite */
const ABOUT_BODY =
  "היי, אני דוד. בעולם שבו הרושם הראשוני קובע הכל, האתר שלך חייב להיות בלתי נשכח. כסטודנט למדעי המחשב ומפתח אתרי פרימיום, אני מחבר בין ארכיטקטורת קוד חכמה לעיצוב יוקרתי ללא פשרות – וללא תבניות. ההתמחות שלי היא ביצירת חוויות 3D אינטראקטיביות וממשקים שעוצרים את הגלילה. החזון שלך, הסטנדרט שלי. יחד ניצור נכס דיגיטלי שמרגיש, נראה ועובד ברמה הגבוהה ביותר.";

/** About — portrait + exact copy · no duplicate large H2 */
export function AboutIntro() {
  return (
    <section
      id="about"
      className="section-void relative z-10 overflow-hidden border-y border-line px-4 py-14 sm:px-5 sm:py-20 md:px-8 md:py-28"
    >
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-14 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto"
        >
          <div className="relative h-44 w-44 sm:h-64 sm:w-64 md:h-72 md:w-72">
            <div className="absolute inset-0 rounded-full border-[2px] border-[#D4AF37] p-[3px] shadow-[0_12px_40px_rgba(10,22,40,0.14),0_0_0_6px_rgba(212,175,55,0.12)]">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-paper">
                <Image
                  src="/brand/david-portrait.jpg"
                  alt="דוד טובול"
                  fill
                  sizes="(max-width: 640px) 176px, 288px"
                  className="object-cover object-[center_18%]"
                  priority
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, delay: 0.08, ease: EASE }}
          className="text-center md:text-start"
        >
          <p className="text-[10px] font-semibold tracking-[0.18em] text-cyan-deep sm:text-xs">
            עליי
          </p>
          <p className="mx-auto mt-4 max-w-xl text-[14px] leading-[1.75] text-ink-soft sm:mt-5 sm:text-[15px] sm:leading-[1.75] md:mx-0 md:mt-6 md:text-lg md:leading-[1.8]">
            {ABOUT_BODY}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
