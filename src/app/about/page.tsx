import type { Metadata } from "next";
import { AboutIntro } from "@/components/AboutIntro";
import { AboutSection } from "@/components/AboutSection";
import { NextStepCTA } from "@/components/NextStepCTA";
import { Testimonials } from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "Our Philosophy",
  description:
    "Craftsmanship over templates — פילוסופיית הסטודיו של דוד טובול. Bespoke Digital Assets.",
};

/** Philosophy + proof → Contact */
export default function AboutPage() {
  return (
    <div className="pt-20">
      <div className="mx-auto max-w-3xl px-5 pb-4 pt-10 text-center md:px-8 md:pt-14">
        <p className="text-[11px] font-medium tracking-[0.22em] text-gold uppercase">
          Our Philosophy
        </p>
        <h1 className="display mt-4 text-3xl font-light text-ink md:text-5xl">
          מלאכה. לא תבניות. שליטה בשוק.
        </h1>
      </div>
      <AboutIntro />
      <AboutSection />
      <Testimonials />
      <NextStepCTA
        title="אם הפילוסופיה מדברת אליכם — בואו נדבר."
        lead="Request a Consultation. עובדים רק עם מותגים שמוכנים לסטנדרט של Bespoke Digital Asset."
      />
    </div>
  );
}
