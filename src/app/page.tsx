import { AboutIntro } from "@/components/AboutIntro";
import { ContactSection } from "@/components/ContactSection";
import { FreeDemo } from "@/components/FreeDemo";
import { Hero } from "@/components/Hero";
import { ProcessJourney } from "@/components/ProcessJourney";
import { StickyScene } from "@/components/StickyScene";
import { Testimonials } from "@/components/Testimonials";
import { TrustMarquee } from "@/components/TrustMarquee";
import { WhyRare } from "@/components/WhyRare";
import { WorkWheel } from "@/components/WorkWheel";

/**
 * Curtain (logo) → Hero → About → Sticky 3D → Work → Offer → …
 * Testimonials last, directly above Footer (SiteChrome).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutIntro />
      <StickyScene />
      <TrustMarquee />
      <WorkWheel />
      <FreeDemo />
      <WhyRare />
      <ProcessJourney />
      <ContactSection />
      <Testimonials />
    </>
  );
}
