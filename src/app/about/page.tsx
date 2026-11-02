import type { Metadata } from "next";
import { AboutIntro } from "@/components/AboutIntro";
import { AboutSection } from "@/components/AboutSection";
import { NextStepCTA } from "@/components/NextStepCTA";
import { Testimonials } from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "עליי",
  description:
    "אומנות על פני תבניות — פילוסופיית הסטודיו של דוד טובול. נכסים דיגיטליים מותאמים.",
};

/** פילוסופיה + הוכחה → ייעוץ */
export default function AboutPage() {
  return (
    <div className="pt-24">
      <div className="mx-auto max-w-3xl px-5 pb-4 pt-10 text-center md:px-8 md:pt-14">
        <p className="text-[11px] font-light tracking-[0.22em] text-gold">
          החזון שלנו
        </p>
        <h1 className="display mt-4 text-3xl font-light tracking-wide text-ink md:text-5xl">
          מלאכה. לא פשרות. שליטה בשוק.
        </h1>
      </div>
      <AboutIntro />
      <AboutSection />
      <Testimonials />
      <NextStepCTA
        title="אם הפילוסופיה מדברת אליכם — בואו נדבר."
        lead="עובדים רק עם מותגים שמוכנים לסטנדרט של נכס דיגיטלי שנבנה מאפס."
      />
    </div>
  );
}
