import type { Metadata } from "next";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "אודות",
  description: "דוד טובול — בונה אתרים שמביאים תורים. מדעי המחשב, קוד עצמי, דוגמא בחינם.",
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
