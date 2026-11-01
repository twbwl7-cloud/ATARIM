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
 * Light luxury flow:
 * Hero (3D MacBook) → Trust → Work → Offer → Why → Process → Contact → About → Reviews
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
