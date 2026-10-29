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

export const demos: DemoContent[] = [
  {
    slug: "lulilac",
    project: projects.find((p) => p.id === "lulilac")!,
    vibe: "שקט · ספא דיגיטלי · תור בלי לחץ",
    heroTitle: "היופי מתחיל בשקט",
    heroSub:
      "לולילק — קליניקת אסתטיקה עם אתר שמרגיש כמו חדר טיפולים: רך, מדויק, ומוביל לתור בלי רעש.",
    cta: "לקביעת תור",
    proofLine: "ניווט רך · גלריות מוצר · מסלול תור ברור",
    pillars: [
      { title: "אווירה", body: "פלטה שקטה, טיפוגרפיה רכה, ומרחב לנשימה בין סקשנים." },
      { title: "אמון", body: "טיפולים מוצגים בבהירות — בלי הבטחות מוגזמות, עם שקיפות." },
      { title: "המרה", body: "CTA אחד ברור לתור, עם שורת הרגעה: בלי ספאם, בלי התחייבות." },
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
    slug: "atelier-3d",
    project: projects.find((p) => p.id === "atelier-3d")!,
    vibe: "מוצר חי · סיבוב · רכישה של יוקרה",
    heroTitle: "תראו את המוצר — לפני שהוא מגיע",
    heroSub:
      "Atelier 3D — חנות פרימיום עם מוצר תלת־ממדי אינטראקטיבי. הלקוח מסובב, מתקרב, ומרגיש חומר.",
    cta: "לסיבוב המוצר",
    proofLine: "WebGL · זום חומרי · קופה מותאמת למותגי יוקרה",
    pillars: [
      { title: "3D", body: "המוצר הוא הגיבור — לא באנר. סיבוב חלק, תאורה דרמטית." },
      { title: "חומר", body: "זום שמגלה מרקם — כדי שהמחיר ירגיש מוצדק." },
      { title: "מסחר", body: "זרימת רכישה קצרה, בלי הפתעות בקופה." },
    ],
    palette: {
      bg: "#0b0b0d",
      ink: "#f3eee6",
      soft: "#9a958c",
      accent: "#c9a962",
      surface: "#141418",
    },
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "cookk",
    project: projects.find((p) => p.id === "cookk")!,
    vibe: "חם · ריח של אפייה · הזמנה מראש",
    heroTitle: "עוגה שנראית כמו אירוע.",
    heroSub:
      "Cookk — מותג עוגות בוטיק עם תפריט עשיר, הזמנות מראש, וויזואל חם שמריח כמו אפייה טרייה.",
    cta: "להזמנה להיום",
    proofLine: "תפריט חי · איסוף / משלוח · חוויית בוטיק",
    pillars: [
      { title: "תיאבון", body: "תמונות גדולות, כותרות קצרות, תחושת טריות בלי סטוק זול." },
      { title: "קצב", body: "הזמנה מראש שמתאימה ללו״ז עמוס — פחות תורים, יותר עוגות." },
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
    slug: "clinic-os",
    project: projects.find((p) => p.id === "clinic-os")!,
    vibe: "יציבות · תורים · שקט תפעולי",
    heroTitle: "הקליניקה רצה. המערכת נושמת בשקט.",
    heroSub:
      "ClinicOS — שכבת שירות לניהול תורים, לקוחות ותוכן. Node.js ו-Java מאחורי ממשק שנראה יוקרתי.",
    cta: "לסיור במערכת",
    proofLine: "תורים · לקוחות · הרשאות · API יציב",
    pillars: [
      { title: "סדר", body: "לוח תורים ברור, סטטוסים, ותזכורות בלי בלגן." },
      { title: "עומק", body: "Back-end שמחזיק עומס — לא רק מסך יפה." },
      { title: "שקט", body: "הצוות עובד. הלקוח לא מרגיש את המערכת — רק את השירות." },
    ],
    palette: {
      bg: "#0d1117",
      ink: "#e6edf3",
      soft: "#8b949e",
      accent: "#3fb950",
      surface: "#161b22",
    },
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "immersive-showroom",
    project: projects.find((p) => p.id === "immersive-showroom")!,
    vibe: "סיור · תאורה · בלי אפליקציה",
    heroTitle: "החנות נפתחת בתוך הדפדפן",
    heroSub:
      "Immersive Showroom — חלל תצוגה עם מצלמה חופשית ותאורה דרמטית. בלי התקנה, בלי חיכוך.",
    cta: "להיכנס לחלל",
    proofLine: "WebGL · מצלמה חופשית · סיור מוצר",
    pillars: [
      { title: "נוכחות", body: "המותג מרגיש פיזי — גם כשהוא דיגיטלי." },
      { title: "שליטה", body: "הגולש מנווט בחלל, לא נגרר בין סליידרים." },
      { title: "קלות", body: "נטען בדפדפן. אין אפליקציה כבדה." },
    ],
    palette: {
      bg: "#09090b",
      ink: "#fafafa",
      soft: "#a1a1aa",
      accent: "#f0c6cf",
      surface: "#18181b",
    },
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "commerce-core",
    project: projects.find((p) => p.id === "commerce-core")!,
    vibe: "קטלוג · קופה · צמיחה",
    heroTitle: "מסחר שנבנה לגדול — בלי להיראות תבנית",
    heroSub:
      "Commerce Core — ארכיטקטורת חנות מותאמת: קטלוג דינמי, קופה חלקה, ואינטגרציות תשלום.",
    cta: "לראות את הזרימה",
    proofLine: "קטלוג · Checkout · Stripe · ביצועים",
    pillars: [
      { title: "מהירות", body: "עמוד מוצר שעולה מהר — כי כל שנייה עולה המרה." },
      { title: "בהירות", body: "מחיר, משלוח, ומלאי — בלי הפתעות בקופה (P17)." },
      { title: "גמישות", body: "מותאם למותג שלך, לא לתבנית גנרית." },
    ],
    palette: {
      bg: "#0a0a0a",
      ink: "#f5f5f5",
      soft: "#a3a3a3",
      accent: "#c9a962",
      surface: "#171717",
    },
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
  },
];

export function getDemo(slug: string) {
  return demos.find((d) => d.slug === slug);
}
