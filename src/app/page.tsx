import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { FailedBefore } from "@/components/FailedBefore";
import { FormatsElements } from "@/components/FormatsElements";
import { Hero } from "@/components/Hero";
import { PinnedPillars } from "@/components/PinnedPillars";
import { ProcessJourney } from "@/components/ProcessJourney";
import { ScrollStory } from "@/components/ScrollStory";
import { WhyRare } from "@/components/WhyRare";
import { WorkWheel } from "@/components/WorkWheel";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WorkWheel />
      <WhyRare />
      <ProcessJourney />
      <FailedBefore />
      <div id="pillars">
        <PinnedPillars />
      </div>
      <ScrollStory />
      <FormatsElements />
      <AboutSection />
      <ContactSection />
    </>
  );
}
