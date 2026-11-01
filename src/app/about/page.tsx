import type { Metadata } from "next";
import { AboutIntro } from "@/components/AboutIntro";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "עליי",
  description:
    "דוד טובול — בונה אתרים בקוד. דוגמה לפני תשלום. לולילק, Cookk, לוקסי.",
};

export default function AboutPage() {
  return (
    <div className="pt-24">
      <AboutIntro />
      <ServicesSection />
      <ContactSection />
    </div>
  );
}
