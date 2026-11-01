import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { FaqSection } from "@/components/FaqSection";
import { FormatsElements } from "@/components/FormatsElements";
import { PageHero } from "@/components/PageHero";
import { ProcessJourney } from "@/components/ProcessJourney";
import { ServicesSection } from "@/components/ServicesSection";

export const metadata: Metadata = {
  title: "שירותים",
  description:
    "אתרי תדמית פרימיום, חוויות תנועה ו-3D, וליווי ממותג עד עלייה לאוויר.",
};

/** תדמית services page — detail + process + FAQ · soft contact (not PPC funnel) */
export default function ServicesPage() {
  return (
    <div className="pt-20">
      <PageHero
        eyebrow="שירותים"
        title="מה בונים יחד — ומה לא."
        lead="אתר תדמית שמציג מי אתם, מה אתם עושים, ולמה לפנות אליכם. המכירה נסגרת בשיחה — לא בעגלה."
      />
      <ServicesSection />
      <FormatsElements />
      <ProcessJourney />
      <FaqSection />
      <ContactSection />
    </div>
  );
}
