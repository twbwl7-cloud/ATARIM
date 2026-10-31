import type { Metadata } from "next";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "עליי",
  description:
    "דוד טובול — בונה אתרים שמביאים הודעות. מדעי המחשב, קוד עצמי, דוגמה בחינם.",
};

export default function AboutPage() {
  return (
    <div className="pt-24">
      <AboutSection />
      <ServicesSection />
      <ContactSection />
    </div>
  );
}
