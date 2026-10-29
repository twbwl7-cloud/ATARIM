import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { WorkGrid } from "@/components/WorkGrid";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <WorkGrid limit={6} title="עבודות שמספרות מותג" />
      <AboutSection />
      <ContactSection />
    </>
  );
}
