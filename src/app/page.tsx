import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { FreeDemo } from "@/components/FreeDemo";
import { Hero } from "@/components/Hero";
import { ProcessJourney } from "@/components/ProcessJourney";
import { Testimonials } from "@/components/Testimonials";
import { TrustMarquee } from "@/components/TrustMarquee";
import { WhyRare } from "@/components/WhyRare";
import { WorkWheel } from "@/components/WorkWheel";

/** Hook → Social proof → Live work → Offer → Why → Process → Close */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Testimonials />
      <TrustMarquee />
      <WorkWheel />
      <FreeDemo />
      <WhyRare />
      <ProcessJourney />
      <AboutSection />
      <ContactSection />
    </>
  );
}
