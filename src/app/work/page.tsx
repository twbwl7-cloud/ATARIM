import type { Metadata } from "next";
import { FreeDemo } from "@/components/FreeDemo";
import { NextStepCTA } from "@/components/NextStepCTA";
import { WorkGrid } from "@/components/WorkGrid";
import { WorkWheel } from "@/components/WorkWheel";

export const metadata: Metadata = {
  title: "עבודות",
  description:
    "סיפורי מקרה — נכסים דיגיטליים מאת דוד טובול. לולילק, Cookk, לוקסי.",
};

/** גלריית עבודות → סיפורי מקרה → ייעוץ */
export default function WorkPage() {
  return (
    <div className="pt-24">
      <div className="mx-auto max-w-3xl px-5 pb-6 pt-10 text-center md:px-8 md:pt-14">
        <p className="text-[11px] font-light tracking-[0.22em] text-gold">
          תיק עבודות
        </p>
        <h1 className="display mt-4 text-3xl font-light tracking-wide text-ink md:text-5xl">
          סיפורי מקרה שנמדדים בתוצאה.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-relaxed tracking-wide text-muted md:text-base">
          כל פרויקט הוא ארכיטקטורת המרה חיה. נכנסים לסיפור המקרה — ואפשר לבדוק
          את האתר באוויר.
        </p>
      </div>
      <WorkWheel />
      <WorkGrid
        id="catalog"
        eyebrow="ארכיון"
        title="כל העבודות · סיפורי מקרה"
      />
      <FreeDemo />
      <NextStepCTA
        title="מצאתם כיוון? פותחים פנייה."
        lead="שיחת ייעוץ — נגדיר יחד את הנכס הדיגיטלי הבא שלכם."
      />
    </div>
  );
}
