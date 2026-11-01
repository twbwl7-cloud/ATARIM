import type { Metadata } from "next";
import { FreeDemo } from "@/components/FreeDemo";
import { WorkGrid } from "@/components/WorkGrid";
import { WorkWheel } from "@/components/WorkWheel";

export const metadata: Metadata = {
  title: "עבודות",
  description:
    "תיק עבודות — אתרי תדמית חיים מאת דוד טובול. לולילק, Cookk, לוקסי.",
};

/** Full portfolio gallery + Free Demo */
export default function WorkPage() {
  return (
    <div className="pt-20">
      <WorkWheel />
      <WorkGrid
        id="catalog"
        eyebrow="קטלוג"
        title="כל העבודות במבט אחד"
      />
      <FreeDemo />
    </div>
  );
}
