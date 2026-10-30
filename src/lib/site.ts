export const site = {
  name: "David Tubul",
  nameHe: "דוד טובול",
  tagline: "Web Development & Digital Experience",
  short: "David Tubul",
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
  format?: string;
};

/** Live portfolio only — real sites clients can open */
export const projects: Project[] = [
  {
    id: "lulilac",
    title: "לולילק",
    client: "קליניקת אסתטיקה",
    category: "מיתוג יוקרתי · אתר תדמית",
    format: "פורמט תדמית · ספא דיגיטלי",
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
    format: "פורמט מסחר · תיאבון ויזואלי",
    summary:
      "אתר פרימיום למותג עוגות — תפריט עשיר, הזמנות מראש, וויזואל חם שמריח כמו אפייה טרייה.",
    stack: ["Next.js", "Tailwind", "GSAP"],
    accent: "ivory",
    featured: true,
    liveUrl: "https://cookk.vercel.app/",
  },
  {
    id: "luxe-barber",
    title: "לוקסי",
    client: "מספרה בתיאום מראש",
    category: "מספרה יוקרה · תור",
    format: "פורמט מספרה · תיאום מראש",
    summary:
      "חוויית מספרה פרימיום — שקט, סכין, זהב. אתר תלת־ממדי שמוביל לתור בלי רעש ובלי תורים מיותרים.",
    stack: ["React Three Fiber", "Next.js", "Motion"],
    accent: "gold",
    featured: true,
    liveUrl: "https://luxe-barber-v2.vercel.app",
  },
];

/** Craft vocabulary — formats & elements from doks (playbooks + book) */
export const formats = [
  {
    code: "F01",
    title: "אתר תדמית יוקרתי",
    body: "Hero אחד · מותג ראשון · מסלול ברור לתור / וואטסאפ.",
    lever: "P16 · ההוכחה היא העיצוב",
  },
  {
    code: "F02",
    title: "מסחר חושי",
    body: "תיאבון ויזואלי, תפריט חי, הזמנה מראש בלי חיכוך.",
    lever: "P07 · סיפור שמעביר",
  },
  {
    code: "F03",
    title: "מספרה בתיאום",
    body: "נוכחות קטלנית, 3D, תור מראש — בלי לוח עמוס.",
    lever: "P15 · סמכות",
  },
  {
    code: "F04",
    title: "דימו מכירתי",
    body: "POC חי בלי שרת — בפגישה רואים מוצר, לא מצגת.",
    lever: "P13 · רואים עבודה",
  },
] as const;

export const elements = [
  {
    code: "E01",
    title: "גלילה נעוצה",
    body: "המסך נשאר. העקרונות נכנסים לחלל.",
  },
  {
    code: "E02",
    title: "גלגל עבודות",
    body: "המסך נשאר — שלושה אתרים חיים מסתובבים בגלילה.",
  },
  {
    code: "E03",
    title: "כרטיס חי",
    body: "לחיצה על הכרטיס הקדמי פותחת את האתר בפרודקשן.",
  },
  {
    code: "E04",
    title: "מילה שנדלקת",
    body: "Word-ignite על גלילה — רגע אחד בלתי נשכח.",
  },
  {
    code: "E05",
    title: "Failed-before",
    body: "מה שניסו ולא עבד — נחשף ומסומן.",
  },
  {
    code: "E06",
    title: "CTA יחיד",
    body: "צבע אחד לפעולה. אפס רעש.",
  },
] as const;

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
    body: "WebGL ו-Three.js שמספרים את המוצר בתנועה — גם למספרות יוקרה.",
  },
  {
    title: "מיתוג יוקרתי דיגיטלי",
    body: "שפה לקליניקות, עוגות בוטיק ומספרות בתיאום מראש.",
  },
  {
    title: "פלטפורמות פרימיום מבוססות 3D",
    body: "חוויות שנבנות על Back-end יציב ו-Front-end חד.",
  },
] as const;

export const nav = [
  { href: "/", label: "בית" },
  { href: "/portfolio", label: "תיק עבודות" },
  { href: "/about", label: "אודות" },
  { href: "/contact", label: "צור קשר" },
] as const;
