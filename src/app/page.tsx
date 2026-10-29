import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { CraftProcess } from "@/components/CraftProcess";
import { FailedBefore } from "@/components/FailedBefore";
import { Hero } from "@/components/Hero";
import { PinnedPillars } from "@/components/PinnedPillars";
import { ScrollStory } from "@/components/ScrollStory";
import { ServicesSection } from "@/components/ServicesSection";
import { WorkGrid } from "@/components/WorkGrid";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FailedBefore />
      <div id="pillars">
        <PinnedPillars />
      </div>
      <ScrollStory />
      <CraftProcess />
      <ServicesSection />
      <WorkGrid limit={6} title="עבודות שמספרות מותג" />
      <AboutSection />
      <ContactSection />
    </>
  );
}
