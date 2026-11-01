import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { ProcessJourney } from "@/components/ProcessJourney";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "ייעוץ",
  description: `שיחת ייעוץ — דוד טובול, ${site.phoneDisplay}.`,
};

/** ייעוץ בלעדי + תהליך עבודה */
export default function ContactPage() {
  return (
    <div className="pt-24">
      <div className="mx-auto max-w-3xl px-5 pb-2 pt-10 text-center md:px-8 md:pt-14">
        <p className="text-[11px] font-light tracking-[0.22em] text-gold">
          גישה בלעדית
        </p>
        <h1 className="display mt-4 text-3xl font-light tracking-wide text-ink md:text-5xl">
          פנייה לפרויקט
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-relaxed tracking-wide text-muted md:text-base">
          לא טופס המוני. שיחת ייעוץ למותגים שמחפשים תוצאה מדידה וחוויית אתר
          יוקרתית — לא עוד אתר מהמדף.
        </p>
      </div>
      <ContactSection />
      <ProcessJourney />
    </div>
  );
}
