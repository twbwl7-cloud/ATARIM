import type { Metadata } from "next";
import { AboutIntro } from "@/components/AboutIntro";
import { AboutSection } from "@/components/AboutSection";
import { Testimonials } from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "אודות",
  description:
    "דוד טובול — בונה אתרי תדמית בקוד. סטודנט למדעי המחשב, בלי תבניות.",
};

/** עליי + מה אומרים */
export default function AboutPage() {
  return (
    <div className="pt-20">
      <AboutIntro />
      <AboutSection />
      <Testimonials />
    </div>
  );
}
