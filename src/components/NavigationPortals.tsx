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
    lead: "פרויקטים חיים שנבנו מאפס — לא מתבניות.",
    span: "md:col-span-7 md:row-span-2 md:min-h-[28rem]",
    gradient:
      "radial-gradient(ellipse at 70% 20%, rgba(212,175,55,0.22), transparent 45%), linear-gradient(160deg, #121216 0%, #050507 55%, #0a0c14 100%)",
    pattern:
      "repeating-linear-gradient(-32deg, transparent, transparent 18px, rgba(255,255,255,0.015) 18px, rgba(255,255,255,0.015) 19px)",
  },
  {
    href: "/about",
    eyebrow: "החזון שלנו",
    title: "פילוסופיה",
    lead: "אומנות על פני תבניות. דיוק על פני רעש.",
    span: "md:col-span-5 md:min-h-[13.5rem]",
    gradient:
      "radial-gradient(ellipse at 30% 80%, rgba(30,58,95,0.35), transparent 50%), linear-gradient(145deg, #0c0e14 0%, #050507 100%)",
    pattern:
      "repeating-linear-gradient(24deg, transparent, transparent 22px, rgba(212,175,55,0.03) 22px, rgba(212,175,55,0.03) 23px)",
  },
  {
    href: "/contact",
    eyebrow: "התחלת פרויקט",
    title: "ייעוץ",
    lead: "שיחה קצרה. בדיקת התאמה. כיוון ברור.",
    span: "md:col-span-5 md:min-h-[13.5rem]",
    gradient:
      "radial-gradient(ellipse at 80% 30%, rgba(212,175,55,0.16), transparent 48%), linear-gradient(200deg, #101018 0%, #050507 70%)",
    pattern:
      "repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(255,255,255,0.02) 28px, rgba(255,255,255,0.02) 29px)",
  },
] as const;

export function NavigationPortals() {
  return (
    <section
      aria-labelledby="portals-heading"
      className="relative z-10 border-t border-white/[0.06] bg-[#050507] px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-10 max-w-xl md:mb-14"
        >
          <p className="text-[11px] font-light tracking-[0.24em] text-gold">
            ניווט
          </p>
          <h2
            id="portals-heading"
            className="display mt-3 text-3xl font-light tracking-wide text-ink md:text-4xl"
          >
            לאן ממשיכים מכאן
          </h2>
          <p className="mt-3 text-sm font-light leading-relaxed tracking-wide text-muted md:text-[15px]">
            שלושה שערים — עבודות, חזון, וייעוץ. בחרו את המסלול שלכם.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {portals.map((portal, index) => (
            <Link
              key={portal.href}
              href={portal.href}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 ${portal.span} min-h-[16rem]`}
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
                className={`absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent ${TRANS} group-hover:from-black/60`}
              />

              <span
                className={`relative z-[1] flex h-full flex-col justify-end p-6 sm:p-8 ${TRANS} group-hover:-translate-y-1`}
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
                  <span className="text-[11px] font-light tracking-[0.2em] text-gold">
                    {portal.eyebrow}
                  </span>
                  <span className="display mt-2 block text-2xl font-light tracking-wide text-ink sm:text-3xl md:text-[2rem]">
                    {portal.title}
                  </span>
                  <span className="mt-2 block max-w-sm text-sm font-light leading-relaxed tracking-wide text-muted">
                    {portal.lead}
                  </span>
                  <span
                    className={`mt-5 inline-flex items-center gap-2 text-xs font-light tracking-wide text-ink/80 ${TRANS} group-hover:text-gold`}
                  >
                    כניסה
                    <span aria-hidden className="text-gold">
                      ←
                    </span>
                  </span>
                </motion.span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
