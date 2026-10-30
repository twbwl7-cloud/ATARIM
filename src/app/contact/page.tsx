import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "צור קשר",
  description: "דוגמא בחינם או שיחה בוואטסאפ — דוד טובול, 052-318-2032.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-[80svh] items-center pt-20">
      <ContactSection />
    </div>
  );
}
