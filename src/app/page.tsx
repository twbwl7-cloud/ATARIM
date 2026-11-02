import { Hero } from "@/components/Hero";
import { NavigationPortals } from "@/components/NavigationPortals";
import { NextStepCTA } from "@/components/NextStepCTA";
import { WhyRare } from "@/components/WhyRare";
import { WorkWheel } from "@/components/WorkWheel";

/**
 * דף הבית: הירו קולנועי → שערי ניווט → עבודות נבחרות → למה → ייעוץ
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <NavigationPortals />
      <WorkWheel />
      <WhyRare />
      <NextStepCTA
        eyebrow="הצעד הבא"
        title="ראיתם את הסטנדרט. הצעד הבא — שיחת ייעוץ."
        lead="נבדוק אם העסק שלכם מתאים לנכס דיגיטלי ברמת סוכנות — שנבנה מאפס, במיוחד בשבילכם."
        primaryLabel="שיחת ייעוץ בוואטסאפ"
        secondaryLabel="לעמוד הייעוץ"
      />
    </>
  );
}
