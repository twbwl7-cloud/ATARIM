import Link from "next/link";
import { ContactSection } from "@/components/ContactSection";
import { Hero } from "@/components/Hero";
import { PinnedPillars } from "@/components/PinnedPillars";
import { ScrollStory } from "@/components/ScrollStory";
import { ServicesSection } from "@/components/ServicesSection";
import { Testimonials } from "@/components/Testimonials";
import { TrustMarquee } from "@/components/TrustMarquee";
import { WorkWheel } from "@/components/WorkWheel";

/**
 * אתר תדמית יוקרתי — דף הבית כקומפוזיציית מותג.
 * לא דף נחיתה / לא משפך AIDA / לא sticky CTA.
 * סדר תדמית (Google + doks): Hero → Proof → Work → Approach → Story → Services → Reviews → Soft contact
 * עמודים: /work · /services · /about · /contact
 * Book: P16 proof · P17 specificity · P18 real reviews · A05 pinned · A10 marquee · Lenis
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <WorkWheel />
      <div className="relative z-10 mx-auto flex max-w-7xl justify-center px-5 pb-10 md:px-8 md:pb-14">
        <Link
          href="/work"
          className="cursor-magnet text-sm font-medium tracking-[0.08em] text-gold transition hover:text-gold-bright"
        >
          לכל תיק העבודות ←
        </Link>
      </div>
      <PinnedPillars />
      <ScrollStory />
      <ServicesSection />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 pb-6 md:px-8">
        <Link
          href="/services"
          className="cursor-magnet text-sm font-medium tracking-[0.08em] text-gold transition hover:text-gold-bright"
        >
          לפירוט השירותים ←
        </Link>
        <Link
          href="/about"
          className="cursor-magnet text-sm font-medium tracking-[0.08em] text-muted transition hover:text-gold"
        >
          מי אני ←
        </Link>
      </div>
      <Testimonials />
      <ContactSection />
    </>
  );
}
