import { AboutIntro } from "@/components/AboutIntro";
import { ContactSection } from "@/components/ContactSection";
import { FreeDemo } from "@/components/FreeDemo";
import { Hero } from "@/components/Hero";
import { ProcessJourney } from "@/components/ProcessJourney";
import { Testimonials } from "@/components/Testimonials";
import { TrustMarquee } from "@/components/TrustMarquee";
import { WhyRare } from "@/components/WhyRare";
import { WorkWheel } from "@/components/WorkWheel";

/**
 * Bright portfolio · Script 6 + book:
 * Hero plunge into MacBook → Trust → Work → Offer → Why → Process map → Contact → About → Reviews
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
      <ContactSection />
      <AboutIntro />
      <Testimonials />
    </>
  );
}
