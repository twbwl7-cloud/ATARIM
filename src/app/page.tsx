import Link from "next/link";
import { Hero } from "@/components/Hero";
import { NextStepCTA } from "@/components/NextStepCTA";
import { WhyRare } from "@/components/WhyRare";
import { WorkWheel } from "@/components/WorkWheel";

/**
 * Agency home funnel: Hero → Selected Work preview → Why → Next Step → Contact
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <WorkWheel />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 pb-6 pt-2 md:px-8 md:pb-10">
        <Link
          href="/work"
          className="btn-gold rounded-md px-10 py-3.5 text-sm transition-all duration-500 ease-in-out"
        >
          לכל Selected Work + Case Studies
        </Link>
        <p className="max-w-md text-center text-sm text-muted">
          מ־Hero לעבודות. משם ל־Case Study. משם לייעוץ.
        </p>
      </div>
      <WhyRare />
      <NextStepCTA
        title="ראיתם את הסטנדרט. הצעד הבא — שיחת ייעוץ."
        lead="Request a Consultation. נבדוק אם העסק שלכם מתאים ל־Bespoke Digital Asset ברמת סוכנות."
      />
    </>
  );
}
