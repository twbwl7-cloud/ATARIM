export const site = {
  name: "David Tubul",
  nameHe: "דוד טובול",
  tagline: "אתר שמביא הודעות — לא רק לייקים",
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
    "היי דוד, ראיתי את האתר שלך. בא לי לדבר על אתר לעסק שלי.";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const demoNiches = [
  {
    id: "clinic",
    label: "קליניקה / אסתטיקה",
    hint: "שקט, יפה, וכפתור שפותח תור",
  },
  {
    id: "cakes",
    label: "עוגות / מזון",
    hint: "רואים עוגה — שולחים הזמנה",
  },
  {
    id: "barber",
    label: "מספרה / יופי",
    hint: "קובעים תור בלי טלפונים",
  },
  {
    id: "realestate",
    label: "נדל״ן",
    hint: "נכס ברור + כפתור לפנייה",
  },
  {
    id: "restaurant",
    label: "מסעדה / בית קפה",
    hint: "תפריט + הזמנת שולחן",
  },
  {
    id: "other",
    label: "משהו אחר",
    hint: "פשוט כתבו מה העסק",
  },
] as const;

export type DemoNicheId = (typeof demoNiches)[number]["id"];

export function freeDemoWhatsAppUrl(nicheLabel: string, note?: string) {
  const detail = note?.trim()
    ? `\n\nמה חשוב לי לראות:\n${note.trim()}`
    : "";
  return whatsappUrl(
    `היי דוד, רוצה דוגמה בחינם לסגנון: ${nicheLabel}.${detail}\nבלי התחייבות.`,
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
    summary: "נקי, רגוע, וכפתור לתור שלא מתחרה עם רעש.",
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
    format: "תפריט · הזמנה",
    summary: "רואים עוגה, בוחרים, שולחים. בלי סיבובים.",
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
    summary: "לוחצים — קובעים תור. הטלפון נשאר שקט.",
    stack: ["Next.js", "Three.js"],
    accent: "gold",
    featured: true,
    liveUrl: "https://luxe-barber-v2.vercel.app",
  },
];

export const testimonials = [
  {
    quote:
      "לפני זה נראינו כמו עוד קליניקה מהרשימה. עכשיו אנשים כותבים לבד בוואטסאפ.",
    name: "צוות לולילק",
    role: "קליניקת אסתטיקה",
    projectId: "lulilac",
  },
  {
    quote:
      "ההזמנות מגיעות מסודר. רואים עוגה ומבינים מה להזמין — בלי שיחת טלפון של רבע שעה.",
    name: "Cookk",
    role: "מותג עוגות",
    projectId: "cookk",
  },
  {
    quote:
      "פחות טלפונים באמצע היום. מי שרוצה תור פשוט נכנס וקובע. זה מה שרצינו.",
    name: "לוקסי",
    role: "מספרה",
    projectId: "luxe-barber",
  },
] as const;

export const formats = [
  {
    code: "01",
    title: "דף נחיתה",
    body: "עמוד אחד לקמפיין. אומרים מה מוכרים, מראים למה לבחור בכם, ונותנים כפתור שסוגר שיחה.",
    lever: "לחיצה → הודעה",
    accent: "gold" as const,
  },
  {
    code: "02",
    title: "אתר תדמית",
    body: "מי אתם, מה עושים, ולמה אצלכם. ואז וואטסאפ או תור — בלי להתבלבל.",
    lever: "נראה טוב · עובד",
    accent: "rose" as const,
  },
  {
    code: "03",
    title: "תפריט והזמנה",
    body: "רואים, בוחרים, שולחים. בלי עגלה מסובכת אם אין צורך.",
    lever: "ראיתי → הזמנתי",
    accent: "cyan" as const,
  },
  {
    code: "04",
    title: "תיאום מראש",
    body: "מספרה, קליניקה, שירות — קובעים תור בלי לרדוף אחרי הטלפון כל היום.",
    lever: "שקט לכם · נוח ללקוח",
    accent: "violet" as const,
  },
] as const;

export const elements = [
  {
    code: "01",
    title: "גלילה שנשארת",
    body: "המסך לא קופץ. הסיפור נכנס לאט — תוכן זז, מסגרת נעולה.",
    accentWord: "נעולה",
  },
  {
    code: "02",
    title: "עבודות חיות",
    body: "לוחצים ונכנסים לאתר אמיתי — לא רק לתמונה.",
    accentWord: "אמיתי",
  },
  {
    code: "03",
    title: "כפתור אחד ברור",
    body: "זהב לפעולה. בלי עשרה כפתורים שצועקים ביחד.",
    accentWord: "זהב",
  },
  {
    code: "04",
    title: "קודם בטלפון",
    body: "רוב האנשים גולשים מהנייד. האתר חייב להרגיש שם כמו במחשב.",
    accentWord: "נייד",
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
    title: "אתר תדמית שמביא הודעות",
    body: "לא רק תמונות יפות. יש כפתור ברור לוואטסאפ או לתור.",
  },
  {
    title: "הזמנות בלי בלגן",
    body: "תפריט, בחירה, שליחה. מי שרוצה להזמין — מזמין.",
  },
  {
    title: "מספרות וקליניקות",
    body: "תיאום מראש בלי רעש. האתר עושה את השיחה בשבילכם.",
  },
] as const;

export const nav = [
  { href: "/", label: "בית" },
  { href: "/#work", label: "עבודות" },
  { href: "/#free-demo", label: "דוגמה בחינם" },
  { href: "/#reviews", label: "מה אומרים" },
  { href: "/about", label: "עליי" },
  { href: "/#contact", label: "דברו איתי" },
] as const;
