import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "צור קשר",
  description: `שיחת היכרות בוואטסאפ או בטלפון — דוד טובול, ${site.phoneDisplay}.`,
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <PageHero
        eyebrow="צור קשר"
        title="בואו נכיר."
        lead="וואטסאפ, טלפון או מייל. עונים באותו יום — בלי טופס של עשר שדות ובלי דיוור בלי רשות."
      />
      <ContactSection />
    </div>
  );
}
