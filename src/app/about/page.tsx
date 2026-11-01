import type { Metadata } from "next";
import { AboutIntro } from "@/components/AboutIntro";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "עליי",
  description:
    "דוד טובול — הנדסת ממשקים, אתרי פרימיום וחוויות 3D. 100% קוד נקי.",
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
