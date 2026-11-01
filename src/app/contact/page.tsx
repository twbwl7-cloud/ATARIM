import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { ProcessJourney } from "@/components/ProcessJourney";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Project Inquiry",
  description: `Request a Consultation — דוד טובול, ${site.phoneDisplay}.`,
};

/** Exclusive consultation + engagement process */
export default function ContactPage() {
  return (
    <div className="pt-20">
      <div className="mx-auto max-w-3xl px-5 pb-2 pt-10 text-center md:px-8 md:pt-14">
        <p className="text-[11px] font-medium tracking-[0.22em] text-gold uppercase">
          Exclusive Access
        </p>
        <h1 className="display mt-4 text-3xl font-light text-ink md:text-5xl">
          Project Inquiry
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-base">
          לא טופס המוני. שיחת ייעוץ למותגים שמחפשים Measurable ROI ו־High-End
          web experience — לא עוד אתר מהמדף.
        </p>
      </div>
      <ContactSection />
      <ProcessJourney />
    </div>
  );
}
