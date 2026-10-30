import type { Metadata } from "next";
import { FreeDemo } from "@/components/FreeDemo";

export const metadata: Metadata = {
  title: "דוגמא בחינם | דוד טובול",
  description:
    "בחרו נישה וקבלו דוגמא בחינם לאתר שאתם רוצים — בלי התחייבות ולפני פרויקט מלא.",
};

export default function FreeDemoPage() {
  return (
    <main className="pt-24">
      <FreeDemo />
    </main>
  );
}
