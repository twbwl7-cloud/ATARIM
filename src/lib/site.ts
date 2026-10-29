export const site = {
  name: "דוד טובול",
  tagline: "פיתוח חוויות אינטראקטיביות ופלטפורמות פרימיום",
  short: "דוד טובול",
  /** מספר וואטסאפ בפורמט בינלאומי ללא + או מקפים — עדכנו ב-.env */
  whatsapp:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ||
    "972500000000",
  email: "hello@tobol.dev",
  university: "האוניברסיטה הפתוחה",
  focus: "מדעי המחשב · יישומי מערכות נבונות",
} as const;

export function whatsappUrl(message?: string) {
  const text =
    message ??
    "היי דוד, אשמח לשמוע על פיתוח פלטפורמה פרימיום / חוויה אינטראקטיבית.";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export type Project = {
  id: string;
  title: string;
  client: string;
  category: string;
  summary: string;
  stack: string[];
  accent: "gold" | "pink" | "ivory";
  featured?: boolean;
  /** Live production URL — opens in a new tab instead of /demo/[id] */
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    id: "lulilac",
    title: "לולילק",
    client: "קליניקת אסתטיקה",
    category: "מיתוג יוקרתי · אתר תדמית",
    summary:
      "אתר תדמית שקט ואלגנטי לקליניקת אסתטיקה — ניווט רך, גלריות מוצר ותחושת ספא דיגיטלית שמובילה לתור.",
    stack: ["Next.js", "Tailwind", "Framer Motion"],
    accent: "pink",
    featured: true,
    liveUrl: "https://tobol.vercel.app",
  },
  {
    id: "cookk",
    title: "Cookk",
    client: "מותג עוגות בוטיק",
    category: "עוגות · חוויית הזמנה",
    summary:
      "אתר פרימיום למותג עוגות — תפריט עשיר, הזמנות מראש, וויזואל חם שמריח כמו אפייה טרייה.",
    stack: ["Next.js", "Tailwind", "GSAP"],
    accent: "ivory",
    featured: true,
    liveUrl: "https://cookk.vercel.app/",
  },
  {
    id: "atelier-3d",
    title: "Atelier 3D Store",
    client: "פלטפורמת E-commerce",
    category: "חנויות תלת־ממד · מסחר",
    summary:
      "חנות פרימיום עם מוצר תלת־ממדי אינטראקטיבי, זום חומרי וזרימת רכישה מותאמת למותגי יוקרה.",
    stack: ["Next.js", "Three.js", "Node.js"],
    accent: "gold",
    featured: true,
  },
  {
    id: "clinic-os",
    title: "ClinicOS",
    client: "פלטפורמת קליניקות",
    category: "מערכת · Back-end",
    summary:
      "שכבת שירות יציבה לניהול תורים, לקוחות ותוכן — Node.js ו-Java מאחורי ממשק שמרגיש יוקרתי.",
    stack: ["Node.js", "Java", "PostgreSQL"],
    accent: "gold",
  },
  {
    id: "immersive-showroom",
    title: "Immersive Showroom",
    client: "מותג עיצוב",
    category: "ממשק 3D · WebGL",
    summary:
      "חלל תצוגה בדפדפן: מצלמה חופשית, תאורה דרמטית וסיור מוצר בלי אפליקציה כבדה.",
    stack: ["React Three Fiber", "Drei", "Next.js"],
    accent: "pink",
  },
  {
    id: "commerce-core",
    title: "Commerce Core",
    client: "סטארט־אפ מסחרי",
    category: "E-commerce מתקדם",
    summary:
      "ארכיטקטורת חנות מותאמת אישית — קטלוג דינמי, קופה חלקה ואינטגרציות תשלום למותגים צומחים.",
    stack: ["Next.js", "Node.js", "Stripe"],
    accent: "gold",
  },
];

export function projectHref(project: Project) {
  return project.liveUrl ?? `/demo/${project.id}`;
}

export function projectIsExternal(project: Project) {
  return Boolean(project.liveUrl);
}

export const services = [
  {
    title: "אתרי תדמית וחנויות מותאמות",
    body: "נוכחות מסחרית מדויקת למותג — מהיר, נקי, ומכוון המרה.",
  },
  {
    title: "ממשקי אינטרנט תלת־ממדיים",
    body: "WebGL ו-Three.js שמספרים את המוצר בתנועה, לא רק בתמונה.",
  },
  {
    title: "מיתוג יוקרתי דיגיטלי",
    body: "שפה ויזואלית לקליניקות אסתטיקה, מותגי עוגות וחנויות פרימיום.",
  },
  {
    title: "פלטפורמות פרימיום מבוססות 3D",
    body: "חוויות E-commerce מתקדמות שנבנות על Back-end יציב ו-Front-end חד.",
  },
] as const;

export const nav = [
  { href: "/", label: "בית" },
  { href: "/portfolio", label: "תיק עבודות" },
  { href: "/about", label: "אודות" },
  { href: "/contact", label: "צור קשר" },
] as const;
