import type { Metadata } from "next";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "אודות",
  description:
    "דוד טובול — סטודנט למדעי המחשב שמשלב Back-end יציב עם Front-end פרימיום ו-3D.",
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
