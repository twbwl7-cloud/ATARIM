import type { Metadata } from "next";
import { FreeDemo } from "@/components/FreeDemo";
import { NextStepCTA } from "@/components/NextStepCTA";
import { WorkGrid } from "@/components/WorkGrid";
import { WorkWheel } from "@/components/WorkWheel";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Case Studies — Bespoke Digital Assets מאת דוד טובול. לולילק, Cookk, לוקסי.",
};

/** Portfolio gallery → Case Studies → Inquiry */
export default function WorkPage() {
  return (
    <div className="pt-20">
      <div className="mx-auto max-w-3xl px-5 pb-6 pt-10 text-center md:px-8 md:pt-14">
        <p className="text-[11px] font-medium tracking-[0.22em] text-gold uppercase">
          Selected Work
        </p>
        <h1 className="display mt-4 text-3xl font-light text-ink md:text-5xl">
          Case Studies שנמדדים בתוצאה.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-base">
          כל פרויקט הוא Conversion-Driven Architecture חי. נכנסים ל־Case Study —
          ואפשר לבדוק את האתר באוויר.
        </p>
      </div>
      <WorkWheel />
      <WorkGrid
        id="catalog"
        eyebrow="Archive"
        title="כל העבודות · Case Studies"
      />
      <FreeDemo />
      <NextStepCTA
        title="מצאתם כיוון? פותחים Project Inquiry."
        lead="Request a Consultation — נגדיר את ה־Bespoke Digital Asset הבא שלכם."
      />
    </div>
  );
}
