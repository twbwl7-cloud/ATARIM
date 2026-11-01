import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { FreeDemo } from "@/components/FreeDemo";
import { Hero } from "@/components/Hero";
import { ProcessJourney } from "@/components/ProcessJourney";
import { Testimonials } from "@/components/Testimonials";
import { TrustMarquee } from "@/components/TrustMarquee";
import { WhyRare } from "@/components/WhyRare";
import { WorkWheel } from "@/components/WorkWheel";

/**
 * Script 6 Phase 1 page order (sell first):
 * Hook → Trust → Proof (live sites) → Offer → Why → Process → Social → Close
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <WorkWheel />
      <FreeDemo />
      <WhyRare />
      <ProcessJourney />
      <Testimonials />
      <AboutSection />
      <ContactSection />
    </>
  );
}
