"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.25, 1, 0.5, 1] as const;
const TRANS =
  "transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]";

const portals = [
  {
    href: "/work",
    eyebrow: "תיק עבודות",
    title: "נכסים נבחרים",
    lead: "פרויקטים חיים שנבנו מאפס — במיוחד בשבילכם.",
    span: "md:col-span-7 md:row-span-2 md:min-h-[28rem]",
    gradient:
      "radial-gradient(ellipse at 70% 20%, rgba(212,175,55,0.16), transparent 45%), linear-gradient(160deg, #ffffff 0%, #f3f1ed 55%, #efece6 100%)",
    pattern:
      "repeating-linear-gradient(-32deg, transparent, transparent 18px, rgba(18,18,18,0.025) 18px, rgba(18,18,18,0.025) 19px)",
  },
  {
    href: "/about",
    eyebrow: "החזון שלנו",
    title: "פילוסופיה",
    lead: "בוטיק על פני המוני. דיוק על פני רעש.",
    span: "md:col-span-5 md:min-h-[13.5rem]",
    gradient:
      "radial-gradient(ellipse at 30% 80%, rgba(163,138,95,0.14), transparent 50%), linear-gradient(145deg, #f9f8f6 0%, #efece6 100%)",
    pattern:
      "repeating-linear-gradient(24deg, transparent, transparent 22px, rgba(212,175,55,0.05) 22px, rgba(212,175,55,0.05) 23px)",
  },
  {
    href: "/contact",
    eyebrow: "התחלת פרויקט",
    title: "ייעוץ",
    lead: "שיחה קצרה. בדיקת התאמה. כיוון ברור.",
    span: "md:col-span-5 md:min-h-[13.5rem]",
    gradient:
      "radial-gradient(ellipse at 80% 30%, rgba(212,175,55,0.14), transparent 48%), linear-gradient(200deg, #ffffff 0%, #f3f1ed 70%)",
    pattern:
      "repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(18,18,18,0.03) 28px, rgba(18,18,18,0.03) 29px)",
  },
] as const;

export function NavigationPortals() {
  return (
    <section
      aria-labelledby="portals-heading"
      className="relative z-10 border-t border-black/5 bg-transparent px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-10 max-w-xl md:mb-14"
        >
          <p className="text-[11px] font-medium tracking-[0.24em] text-[#A38A5F]">
            ניווט
          </p>
          <h2
            id="portals-heading"
            className="display mt-3 text-3xl font-semibold tracking-wide text-[#121212] md:text-4xl"
          >
            לאן ממשיכים מכאן
          </h2>
          <p className="mt-3 text-sm font-normal leading-relaxed tracking-wide text-[#5C5C5C] md:text-[15px]">
            שלושה שערים — עבודות, חזון, וייעוץ. בחרו את המסלול שלכם.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {portals.map((portal, index) => (
            <div
              key={portal.href}
              className={`gold-border ${portal.span} min-h-[16rem]`}
            >
              <Link
                href={portal.href}
                className="group gold-border__inner relative block h-full min-h-[16rem]"
              >
                <span
                  aria-hidden
                  className={`absolute inset-0 origin-center scale-100 will-change-transform ${TRANS} group-hover:scale-105`}
                  style={{
                    backgroundImage: `${portal.pattern}, ${portal.gradient}`,
                  }}
                />
                <span
                  aria-hidden
                  className={`absolute inset-0 bg-gradient-to-t from-[#F9F8F6]/92 via-[#F9F8F6]/28 to-transparent ${TRANS}`}
                />

                <span
                  className={`relative z-[1] flex h-full min-h-[16rem] flex-col justify-end p-6 sm:p-8 ${TRANS} group-hover:-translate-y-1`}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.7,
                      delay: 0.08 * index,
                      ease: EASE,
                    }}
                    className="block"
                  >
                    <span className="text-[11px] font-medium tracking-[0.2em] text-[#A38A5F]">
                      {portal.eyebrow}
                    </span>
                    <span className="display mt-2 block text-2xl font-semibold tracking-wide text-[#121212] sm:text-3xl md:text-[2rem]">
                      {portal.title}
                    </span>
                    <span className="mt-2 block max-w-sm text-sm font-normal leading-relaxed tracking-wide text-[#5C5C5C]">
                      {portal.lead}
                    </span>
                    <span
                      className={`mt-5 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-[#121212]/80 ${TRANS} group-hover:text-[#A38A5F]`}
                    >
                      כניסה
                      <span aria-hidden className="text-[#D4AF37]">
                        ←
                      </span>
                    </span>
                  </motion.span>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
