import { Hero } from "@/components/Hero";
import { NavigationPortalsLazy } from "@/components/NavigationPortalsLazy";
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
      <NavigationPortalsLazy />
      <WorkWheel />
      <WhyRare />
      <NextStepCTA
        eyebrow="הצעד הבא"
        title="ראיתם את הסטנדרט. עכשיו — שיחת ייעוץ."
        lead="נבדוק יחד אם העסק שלכם מוכן לנכס דיגיטלי ברמת סוכנות — שנבנה מאפס, במיוחד בשבילכם."
        primaryLabel="שיחת ייעוץ בוואטסאפ"
        secondaryLabel="לעמוד הייעוץ"
      />
    </>
  );
}
