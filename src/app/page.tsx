import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { FreeDemo } from "@/components/FreeDemo";
import { Hero } from "@/components/Hero";
import { PinnedStory } from "@/components/PinnedStory";
import { ProcessJourney } from "@/components/ProcessJourney";
import { Testimonials } from "@/components/Testimonials";
import { TrustMarquee } from "@/components/TrustMarquee";
import { WhyRare } from "@/components/WhyRare";
import { WorkWheel } from "@/components/WorkWheel";

/**
 * AIDA + book scroll story (P07) + demo curtain/motion + landing sticky CTA.
 * Levers: P01 first look · P05 curiosity · P14 proof · A05 pinned · A10 marquee
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <WorkWheel />
      <PinnedStory />
      <WhyRare />
      <ProcessJourney />
      <FreeDemo />
      <Testimonials />
      <AboutSection />
      <ContactSection />
    </>
  );
}
