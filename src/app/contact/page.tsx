import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "צור קשר",
  description: "שיחה בוואטסאפ לקבלת הצעת מחיר על פלטפורמה פרימיום או חוויה 3D.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-[80svh] items-center pt-20">
      <ContactSection />
    </div>
  );
}
