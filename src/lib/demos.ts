import { projects, type Project } from "@/lib/site";

export type DemoContent = {
  slug: string;
  project: Project;
  vibe: string;
  heroTitle: string;
  heroSub: string;
  cta: string;
  proofLine: string;
  pillars: { title: string; body: string }[];
  palette: {
    bg: string;
    ink: string;
    soft: string;
    accent: string;
    surface: string;
  };
  image: string;
};

/** Fallback demo shells — live projects open external URLs from the cards */
export const demos: DemoContent[] = [
  {
    slug: "lulilac",
    project: projects.find((p) => p.id === "lulilac")!,
    vibe: "שקט · רך · תור בלי לחץ",
    heroTitle: "היופי מתחיל בשקט",
    heroSub:
      "לולילק — קליניקת אסתטיקה עם אתר שמרגיש כמו חדר טיפולים: רך, ברור, ומוביל לתור בלי רעש.",
    cta: "לקביעת תור",
    proofLine: "ניווט רך · גלריות · כפתור לתור",
    pillars: [
      { title: "אווירה", body: "צבעים שקטים, אותיות רכות, ומקום לנשום בין סקשנים." },
      { title: "אמון", body: "טיפולים מוצגים בבהירות — בלי הבטחות מוגזמות." },
      { title: "תור", body: "כפתור אחד ברור לתור." },
    ],
    palette: {
      bg: "#f7f2f4",
      ink: "#2a1f24",
      soft: "#6e5a62",
      accent: "#c48b9f",
      surface: "#ffffff",
    },
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "cookk",
    project: projects.find((p) => p.id === "cookk")!,
    vibe: "חם · ריח של אפייה · הזמנה מראש",
    heroTitle: "עוגה שנראית כמו אירוע",
    heroSub:
      "Cookk — מותג עוגות עם תפריט ברור, הזמנות מראש, ותמונות שעושות חשק.",
    cta: "להזמנה להיום",
    proofLine: "תפריט · איסוף / משלוח · בוטיק",
    pillars: [
      { title: "תיאבון", body: "תמונות גדולות, כותרות קצרות." },
      { title: "קצב", body: "הזמנה מראש ליום עמוס." },
      { title: "מותג", body: "חם ומדויק — בוטיק, לא רשת." },
    ],
    palette: {
      bg: "#1a120e",
      ink: "#f6efe6",
      soft: "#b9a99a",
      accent: "#d4a574",
      surface: "#241a14",
    },
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "luxe-barber",
    project: projects.find((p) => p.id === "luxe-barber")!,
    vibe: "סכין · זהב · תור מראש",
    heroTitle: "התור מתחיל בשקט",
    heroSub:
      "לוקסי — מספרה בתיאום מראש. מראה חד, תלת־ממד, וכפתור ברור לכיסא.",
    cta: "לקביעת תור",
    proofLine: "תלת־ממד · תיאום מראש · מותג יוקרה",
    pillars: [
      { title: "נוכחות", body: "המותג מרגיש כמו חדר סגור — לא כמו תור ברחוב." },
      { title: "דיוק", body: "סכין, זהב, שקט — בלי באנרים צועקים." },
      { title: "תור", body: "רק בתיאום. הכבוד מתחיל בלוח השעות." },
    ],
    palette: {
      bg: "#0a0908",
      ink: "#f3eee6",
      soft: "#9a958c",
      accent: "#c9a15b",
      surface: "#141210",
    },
    image:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1600&q=80",
  },
];

export function getDemo(slug: string) {
  return demos.find((d) => d.slug === slug);
}
