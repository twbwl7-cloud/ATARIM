import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { FailedBefore } from "@/components/FailedBefore";
import { FormatsElements } from "@/components/FormatsElements";
import { Hero } from "@/components/Hero";
import { PinnedPillars } from "@/components/PinnedPillars";
import { ScrollStory } from "@/components/ScrollStory";
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
      <FormatsElements />
      <WorkGrid title="שלושה אתרים חיים" />
      <AboutSection />
      <ContactSection />
    </>
  );
}
