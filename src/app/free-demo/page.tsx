import type { Metadata } from "next";
import { FreeDemo } from "@/components/FreeDemo";

export const metadata: Metadata = {
  title: "דוגמה בחינם | דוד טובול",
  description:
    "בחרו סוג עסק וקבלו דוגמה בחינם לאתר שאתם רוצים — בלי התחייבות.",
};

export default function FreeDemoPage() {
  return (
    <main className="pt-24">
      <FreeDemo />
    </main>
  );
}
