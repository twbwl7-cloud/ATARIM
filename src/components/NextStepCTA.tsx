"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CtaReassurance } from "@/components/CtaReassurance";
import { MagneticButton } from "@/components/MagneticButton";
import { PeaceOfMindBadges } from "@/components/PeaceOfMindBadges";
import { SplitTextReveal } from "@/components/SplitTextReveal";
import { TrustMetrics } from "@/components/TrustMetrics";
import { whatsappUrl } from "@/lib/site";

type Props = {
  eyebrow?: string;
  title?: string;
  lead?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
};

/** מסגרת סיום יוקרתית — כל עמוד מסתיים בייעוץ */
export function NextStepCTA({
  eyebrow = "הצעד הבא",
  title = "מוכנים לפרויקט ברמת סוכנות?",
  lead = "פנייה קצרה. בודקים התאמה, מגדירים כיוון, ורק אז בונים נכס דיגיטלי מותאם.",
  primaryLabel = "שיחת ייעוץ",
  secondaryLabel = "לעמוד הייעוץ",
}: Props) {
  return (
    <section className="relative z-10 border-t border-black/5 px-5 py-8 md:px-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="premium-panel relative mx-auto max-w-5xl overflow-hidden rounded-2xl px-6 py-7 text-center sm:px-10 sm:py-9 md:px-12 md:py-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(197,160,89,0.12),transparent_55%)]"
        />
        <div className="relative z-[1]">
          <p className="text-[11px] font-light tracking-[0.28em] text-gold">
            {eyebrow}
          </p>
          <SplitTextReveal
            as="h2"
            text={title ?? "מוכנים לפרויקט ברמת סוכנות?"}
            className="display mx-auto mt-5 max-w-3xl text-3xl font-light tracking-wide text-ink md:text-5xl"
          />
          <p className="mx-auto mt-6 max-w-xl text-sm font-light leading-relaxed tracking-wide text-muted md:text-base">
            {lead.includes("סוכנות") ? (
              <>
                {lead.slice(0, lead.indexOf("סוכנות"))}
                <span className="lux-word">סוכנות</span>
                {lead.slice(lead.indexOf("סוכנות") + "סוכנות".length)}
              </>
            ) : (
              lead
            )}
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <MagneticButton
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold justify-center rounded-md px-8 py-3.5 text-sm font-light"
            >
              {primaryLabel}
            </MagneticButton>
            <Link
              href="/contact"
              className="btn-ghost rounded-md px-8 py-3.5 text-center text-sm font-light transition-all duration-500 ease-in-out"
            >
              {secondaryLabel}
            </Link>
          </div>
          <div className="mt-5 flex flex-col items-center gap-3">
            <CtaReassurance />
            <PeaceOfMindBadges />
            <TrustMetrics />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
