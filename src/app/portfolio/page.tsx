import type { Metadata } from "next";
import { WorkGrid } from "@/components/WorkGrid";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "תיק עבודות",
  description:
    "קטלוג פרויקטים — אתרי תדמית, חנויות 3D ומיתוג יוקרתי מאת דוד טובול.",
};

export default function PortfolioPage() {
  return (
    <div className="pt-24">
      <WorkGrid
        id="catalog"
        eyebrow="קטלוג מלא"
        title="כל העבודות במבט אחד"
      />
      <ContactSection />
    </div>
  );
}
