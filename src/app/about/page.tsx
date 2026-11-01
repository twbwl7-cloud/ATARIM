import type { Metadata } from "next";
import { AboutIntro } from "@/components/AboutIntro";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { PageHero } from "@/components/PageHero";
import { WhyRare } from "@/components/WhyRare";

export const metadata: Metadata = {
  title: "אודות",
  description:
    "דוד טובול — בונה אתרי תדמית בקוד. סטודנט למדעי המחשב, בלי תבניות.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <PageHero
        eyebrow="אודות"
        title="מי עומד מאחורי האתר."
        lead="בעסקי שירות קונים אדם, לא לוגו. הנה מי אני, איך עובדים, ומה אני מסרב לעשות."
      />
      <AboutIntro />
      <AboutSection />
      <WhyRare />
      <ContactSection />
    </div>
  );
}
