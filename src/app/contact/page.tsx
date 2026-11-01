import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { ProcessJourney } from "@/components/ProcessJourney";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "צור קשר",
  description: `שיחת היכרות בוואטסאפ או בטלפון — דוד טובול, ${site.phoneDisplay}.`,
};

/** דברו איתי + תהליך 5 שלבים */
export default function ContactPage() {
  return (
    <div className="pt-20">
      <ContactSection />
      <ProcessJourney />
    </div>
  );
}
