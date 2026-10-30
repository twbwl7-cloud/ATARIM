export const site = {
  name: "David Tubul",
  nameHe: "דוד טובול",
  tagline: "אתרים שסוגרים תורים — לא עוד דף יפה",
  short: "David Tubul",
  whatsapp:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ||
    "972523182032",
  phoneDisplay: "052-318-2032",
  email: "hello@tobol.dev",
  university: "האוניברסיטה הפתוחה",
  focus: "מדעי המחשב",
} as const;

export function whatsappUrl(message?: string) {
  const text =
    message ??
    "היי דוד, ראיתי את האתר. אשמח לדבר על אתר לעסק שלי.";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const demoNiches = [
  {
    id: "clinic",
    label: "קליניקה / אסתטיקה",
    hint: "שקט, אמון, כפתור לתור",
  },
  {
    id: "cakes",
    label: "עוגות / מזון",
    hint: "תיאבון + הזמנה בלי בלבול",
  },
  {
    id: "barber",
    label: "מספרה / יופי",
    hint: "תיאום מראש, בלי רעש",
  },
  {
    id: "realestate",
    label: "נדל״ן",
    hint: "נכס ברור, פנייה מיידית",
  },
  {
    id: "restaurant",
    label: "מסעדה / בית קפה",
    hint: "תפריט + הזמנת מקום",
  },
  {
    id: "other",
    label: "משהו אחר",
    hint: "תכתבו מה העסק",
  },
] as const;

export type DemoNicheId = (typeof demoNiches)[number]["id"];

export function freeDemoWhatsAppUrl(nicheLabel: string, note?: string) {
  const detail = note?.trim()
    ? `\n\nמה חשוב לי לראות:\n${note.trim()}`
    : "";
  return whatsappUrl(
    `היי דוד, רוצה דוגמא בחינם לסגנון: ${nicheLabel}.${detail}\nבלי התחייבות.`,
  );
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
  liveUrl?: string;
  format?: string;
};

export const projects: Project[] = [
  {
    id: "lulilac",
    title: "לולילק",
    client: "קליניקת אסתטיקה",
    category: "אתר תדמית",
    format: "תדמית · תור",
    summary: "שקט, גלריות נקיות, כפתור לתור בלי רעש מסביב.",
    stack: ["Next.js", "Tailwind", "Motion"],
    accent: "pink",
    featured: true,
    liveUrl: "https://tobol.vercel.app",
  },
  {
    id: "cookk",
    title: "Cookk",
    client: "מותג עוגות",
    category: "הזמנות",
    format: "מסחר · תפריט",
    summary: "רואים את העוגה, בוחרים, שולחים הזמנה. בלי סיבובים.",
    stack: ["Next.js", "Tailwind"],
    accent: "ivory",
    featured: true,
    liveUrl: "https://cookk.vercel.app/",
  },
  {
    id: "luxe-barber",
    title: "לוקסי",
    client: "מספרה",
    category: "תיאום מראש",
    format: "מספרה · תור",
    summary: "נוכחות חדה. לוחצים — קובעים תור. בלי טלפונים מיותרים.",
    stack: ["Next.js", "Three.js"],
    accent: "gold",
    featured: true,
    liveUrl: "https://luxe-barber-v2.vercel.app",
  },
];

/** Client notes from live projects — specific, no fake “100%” tags (book P37) */
export const testimonials = [
  {
    quote:
      "לפני זה האתר נראה כמו עוד קליניקה. עכשיו אנשים כותבים בוואטסאפ בלי שנרדוף אחריהם.",
    name: "צוות לולילק",
    role: "קליניקת אסתטיקה",
    projectId: "lulilac",
  },
  {
    quote:
      "הזמנות מגיעות מסודרות. הלקוחות רואים את העוגות ומבינים מה להזמין — בלי שיחות של רבע שעה.",
    name: "Cookk",
    role: "מותג עוגות",
    projectId: "cookk",
  },
  {
    quote:
      "הטלפון פחות עמוס. מי שרוצה תור — נכנס לאתר וקובע. זה מה שרצינו ממספרה בתיאום.",
    name: "לוקסי",
    role: "מספרה",
    projectId: "luxe-barber",
  },
] as const;

export const formats = [
  {
    code: "01",
    title: "אתר תדמית",
    body: "מסך אחד שמסביר מי אתם, ואז כפתור לתור או לוואטסאפ.",
    lever: "העיצוב הוא ההוכחה",
  },
  {
    code: "02",
    title: "תפריט והזמנה",
    body: "רואים, בוחרים, שולחים. בלי עגלה מסובכת אם לא צריך.",
    lever: "תיאבון → פעולה",
  },
  {
    code: "03",
    title: "תיאום מראש",
    body: "מספרה / קליניקה / שירות — קובעים תור בלי טלפון רצוף.",
    lever: "שקט = סמכות",
  },
  {
    code: "04",
    title: "דוגמא לפני תשלום",
    body: "רואים כיוון אמיתי לעסק שלכם. ממשיכים רק אם זה מדויק.",
    lever: "רואים עבודה",
  },
] as const;

export const elements = [
  {
    code: "01",
    title: "גלילה שנשארת",
    body: "המסך לא קופץ. הסיפור נכנס לאט.",
  },
  {
    code: "02",
    title: "עבודות חיות",
    body: "לוחצים ונכנסים לאתר אמיתי — לא לצילום מסך.",
  },
  {
    code: "03",
    title: "כפתור אחד ברור",
    body: "זהב לפעולה. בלי עשרה כפתורים שמתחרים.",
  },
  {
    code: "04",
    title: "מובייל קודם",
    body: "רוב הלקוחות בטלפון. האתר חייב לעבוד שם כמו במחשב.",
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
    title: "אתר תדמית שמביא פניות",
    body: "לא גלריה יפה בלי כפתור. מסלול ברור לוואטסאפ או לתור.",
  },
  {
    title: "הזמנות ומכירה קצרה",
    body: "תפריט, בחירה, שליחה — בלי לסבך את מי שרק רוצה להזמין.",
  },
  {
    title: "מספרות וקליניקות",
    body: "תיאום מראש, שקט, אמון. האתר עושה את העבודה הכבדה.",
  },
] as const;

export const nav = [
  { href: "/", label: "בית" },
  { href: "/#work", label: "עבודות" },
  { href: "/#free-demo", label: "דוגמא בחינם" },
  { href: "/#reviews", label: "חוות דעת" },
  { href: "/about", label: "אודות" },
  { href: "/#contact", label: "צור קשר" },
] as const;
