import { AboutIntro } from "@/components/AboutIntro";
import { ContactSection } from "@/components/ContactSection";
import { FailedBefore } from "@/components/FailedBefore";
import { FormatsElements } from "@/components/FormatsElements";
import { FreeDemo } from "@/components/FreeDemo";
import { Hero } from "@/components/Hero";
import { PinnedPillars } from "@/components/PinnedPillars";
import { ProcessJourney } from "@/components/ProcessJourney";
import { ScrollStory } from "@/components/ScrollStory";
import { ServicesSection } from "@/components/ServicesSection";
import { Testimonials } from "@/components/Testimonials";
import { TrustMarquee } from "@/components/TrustMarquee";
import { WhyRare } from "@/components/WhyRare";
import { WorkWheel } from "@/components/WorkWheel";

/**
 * אתר תדמית מלא — לא דף נחיתה.
 * Script 6 + Words book + Animations pack:
 * Hero → Trust → Work → FailedBefore → Pillars → ScrollStory →
 * Formats/Elements → Services → Why → Process → Offer → Reviews → About → Contact
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <WorkWheel />
      <FailedBefore />
      <PinnedPillars />
      <ScrollStory />
      <FormatsElements />
      <ServicesSection />
      <WhyRare />
      <ProcessJourney />
      <FreeDemo />
      <Testimonials />
      <AboutIntro />
      <ContactSection />
    </>
  );
}
