import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { PageHero } from "@/components/PageHero";
import { WorkGrid } from "@/components/WorkGrid";
import { WorkWheel } from "@/components/WorkWheel";

export const metadata: Metadata = {
  title: "עבודות",
  description:
    "תיק עבודות — אתרי תדמית חיים מאת דוד טובול. לולילק, Cookk, לוקסי.",
};

export default function WorkPage() {
  return (
    <div className="pt-20">
      <PageHero
        eyebrow="עבודות"
        title="אתרים באוויר. תבדקו בעצמכם."
        lead="לא מצגת. לוחצים ונכנסים לאתר אמיתי — קליניקה, עוגות ומספרה שכבר מביאים פניות."
      />
      <WorkWheel />
      <WorkGrid
        id="catalog"
        eyebrow="קטלוג"
        title="כל העבודות במבט אחד"
      />
      <ContactSection />
    </div>
  );
}
