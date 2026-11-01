export const site = {
  name: "David Tubul",
  nameHe: "דוד טובול",
  tagline: "אתרים שאי אפשר להתעלם מהם",
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
    "היי דוד, ראיתי את אתר התדמית. בא לי לשיחת היכרות קצרה.";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const demoNiches = [
  {
    id: "clinic",
    label: "קליניקה / אסתטיקה",
    hint: "כפתור לתור + גלריה נקייה",
  },
  {
    id: "cakes",
    label: "עוגות / מזון",
    hint: "רואים עוגה ושולחים הזמנה",
  },
  {
    id: "barber",
    label: "מספרה / יופי",
    hint: "קובעים תור בלי טלפון",
  },
  {
    id: "realestate",
    label: "נדל״ן",
    hint: "נכס ברור + פנייה מיידית",
  },
  {
    id: "restaurant",
    label: "מסעדה / בית קפה",
    hint: "תפריט + הזמנת שולחן",
  },
  {
    id: "other",
    label: "משהו אחר",
    hint: "כתבו מה העסק עושה",
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
  accent: "gold" | "cyan" | "ivory";
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
    summary: "גלריה נקייה. כפתור לתור שלא צועק מעל התמונות.",
    stack: ["Next.js", "Tailwind", "Motion"],
    accent: "cyan",
    featured: true,
    liveUrl: "https://tobol.vercel.app",
  },
  {
    id: "cookk",
    title: "Cookk",
    client: "מותג עוגות",
    category: "הזמנות",
    format: "תפריט · הזמנה",
    summary: "רואים עוגה, בוחרים, שולחים הזמנה. בלי שיחת רבע שעה.",
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
    summary: "קובעים תור מהאתר. הטלפון נשאר פנוי לעבודה.",
    stack: ["Next.js", "Three.js"],
    accent: "gold",
    featured: true,
    liveUrl: "https://luxe-barber-v2.vercel.app",
  },
];

/** Exact reviews from user brief — do not rewrite */
export const testimonials = [
  {
    quote:
      "דוד לקח את הקונדיטוריה שלי לעידן אחר. בניית העוגה בתלת-ממד (3D) שהוא פיתח עבורי פשוט השאירה את הלקוחות פעורי פה. זה לא סתם אתר, זו חוויה דיגיטלית שמוכרת. מאז שהאתר באוויר, המיתוג שלנו קפץ רמה וכמות ההזמנות עלתה משמעותית.",
    name: "לאלי",
    role: "Lali Bakery",
    projectId: "lali",
  },
  {
    quote:
      "חיפשתי מישהו שיבין את השפה העיצובית של המותג שלי ולא ייתן לי עוד תבנית משעממת מרובעת. דוד יצר עבורי אתר בוטיק שמשדר יוקרה בכל פיקסל. התשומת לב לפרטים הקטנים, האנימציות החלקות... פשוט רמה של חו\"ל. מומלץ בחום למותגים שלא מתפשרים.",
    name: "יעלי",
    role: "YAELIE",
    projectId: "yaelie",
  },
  {
    quote:
      "הייתי סקפטי לגבי כמה אתר באמת יכול להביא לי לקוחות חדשים למספרה, אבל דוד שינה לי את התפיסה. הוא בנה לי מערכת שמשדרת פרימיום, בדיוק באווירה שיש אצלי בעסק. הלקוחות מתלהבים, קל להם ליצור קשר, והיומן מתמלא הרבה יותר מהר.",
    name: "בעלי המספרה",
    role: "סלון יופי ועיצוב שיער",
    projectId: "salon",
  },
] as const;

export const formats = [
  {
    code: "01",
    title: "אתר תדמית",
    body: "מי אתם, מה עושים, ולמה אצלכם. אחרי זה וואטסאפ או תור.",
    lever: "ברור · עובד",
    accent: "gold" as const,
  },
  {
    code: "02",
    title: "דף נחיתה",
    body: "עמוד אחד לקמפיין. מה מוכרים, למה אתכם, וכפתור שפותח שיחה.",
    lever: "לחיצה → הודעה",
    accent: "cyan" as const,
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
    body: "מספרה, קליניקה, שירות — קובעים תור בלי לרדוף אחרי הטלפון.",
    lever: "שקט לכם · נוח ללקוח",
    accent: "violet" as const,
  },
] as const;

export const elements = [
  {
    code: "01",
    title: "גלילה שנשארת",
    body: "המסך לא קופץ. התוכן זז, המסגרת נעולה.",
    accentWord: "נעולה",
  },
  {
    code: "02",
    title: "עבודות חיות",
    body: "לוחצים ונכנסים לאתר אמיתי — לא לתמונה.",
    accentWord: "אמיתי",
  },
  {
    code: "03",
    title: "כפתור אחד",
    body: "כפתור אחד לפעולה. בלי עשרה שצועקים ביחד.",
    accentWord: "אחד",
  },
  {
    code: "04",
    title: "קודם בטלפון",
    body: "רוב האנשים גולשים מהנייד. האתר חייב לעבוד שם כמו במחשב.",
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
    title: "אתרי תדמית פרימיום",
    body: "בית, עבודות, שירותים, אודות וצור קשר — חלון ראווה דיגיטלי שמביא שיחה, לא עגלה.",
  },
  {
    title: "חוויות תנועה ו-3D",
    body: "גלילה חלקה (Lenis), מסכים שנשארים, ואנימציה שמשרתת את המסר — לא רעש.",
  },
  {
    title: "ממותג עד עלייה לאוויר",
    body: "אפיון, עיצוב, קוד ודומיין שלכם. הקוד אצלכם מהיום הראשון.",
  },
] as const;

/** אתר תדמית — ניווט עמודים אמיתי (לא עוגני משפך) */
export const nav = [
  { href: "/", label: "ראשי" },
  { href: "/work", label: "עבודות" },
  { href: "/services", label: "שירותים" },
  { href: "/about", label: "אודות" },
  { href: "/contact", label: "צור קשר" },
] as const;
