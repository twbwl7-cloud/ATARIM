export const site = {
  name: "David Tubul",
  nameHe: "דוד טובול",
  tagline: "נכסים דיגיטליים שאי אפשר להתעלם מהם",
  taglineHe: "נכסים דיגיטליים שנבנים מאפס — לא מתבניות",
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
    "היי דוד, מעוניין בפנייה לפרויקט. אשמח לשיחת ייעוץ קצרה.";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const demoNiches = [
  {
    id: "clinic",
    label: "קליניקה / אסתטיקה",
    hint: "ארכיטקטורת המרה · כפתור לתור",
  },
  {
    id: "cakes",
    label: "עוגות / מזון",
    hint: "חוויית מוצר יוקרתית · הזמנה",
  },
  {
    id: "barber",
    label: "מספרה / יופי",
    hint: "תוצאה מדידה · תיאום מראש",
  },
  {
    id: "realestate",
    label: "נדל״ן",
    hint: "נכס ברור · פנייה מיידית",
  },
  {
    id: "restaurant",
    label: "מסעדה / בית קפה",
    hint: "תפריט · הזמנת שולחן",
  },
  {
    id: "other",
    label: "משהו אחר",
    hint: "ספרו מה העסק דורש",
  },
] as const;

export type DemoNicheId = (typeof demoNiches)[number]["id"];

export function freeDemoWhatsAppUrl(nicheLabel: string, note?: string) {
  const detail = note?.trim()
    ? `\n\nמה חשוב בפרויקט:\n${note.trim()}`
    : "";
  return whatsappUrl(
    `היי דוד, פנייה לפרויקט — כיוון ל־${nicheLabel}.${detail}\nמעוניין בשיחת ייעוץ.`,
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
  challenge: string;
  approach: string;
  outcome: string;
  role: string;
};

export const projects: Project[] = [
  {
    id: "lulilac",
    title: "לולילק",
    client: "קליניקת אסתטיקה",
    category: "אתר תדמית מותאם",
    format: "תדמית · המרה",
    summary:
      "ארכיטקטורת המרה לקליניקה — גלריה שקטה, מסלול ברור לתור, בלי רעש שיווקי.",
    stack: ["Next.js", "Tailwind", "Motion"],
    accent: "cyan",
    featured: true,
    liveUrl: "https://tobol.vercel.app",
    challenge:
      "מותג אסתטיקה שדורש נוכחות יוקרתית — לא עוד תבנית מרפאה. הלקוחות מגיעים מהנייד וצריכים לתאם תור בלי שיחת טלפון מיותרת.",
    approach:
      "נכס דיגיטלי מותאם: היררכיה ויזואלית אכזרית, גלריה כהוכחה, וכפתור תור יחיד שמשרת את המסר — לא מתחרה בו.",
    outcome:
      "אתר תדמית חי שמחזיק את רמת הקליניקה וממיר גלישה לפנייה. התוצאה נמדדת בהודעות ובתורים — לא ב״לייקים״.",
    role: "אסטרטגיה · עיצוב · הנדסה",
  },
  {
    id: "cookk",
    title: "Cookk",
    client: "מותג עוגות",
    category: "חוויית מוצר יוקרתית",
    format: "תפריט · הזמנה",
    summary:
      "חוויית אתר יוקרתית למותג מזון — רואים, בוחרים, שולחים הזמנה. בלי חיכוך מיותר.",
    stack: ["Next.js", "Tailwind"],
    accent: "ivory",
    featured: true,
    liveUrl: "https://cookk.vercel.app/",
    challenge:
      "מוצר ויזואלי שחייב למכור מהמסך. תבניות חנות גנריות הורגות את תחושת הבוטיק ושוחקות את המותג.",
    approach:
      "ארכיטקטורת המרה ממוקדת: תפריט חד, מסלול הזמנה קצר, ותנועה שמשרתת תיאבון — לא אנימציה לשם האנימציה.",
    outcome:
      "חוויית הזמנה שמרגישה כמו דלפק יוקרה. הלקוח מסיים פעולה בלי שיחת רבע שעה — וזו תוצאה מדידה.",
    role: "קונספט · חוויית משתמש · בנייה",
  },
  {
    id: "luxe-barber",
    title: "לוקסי",
    client: "מספרה",
    category: "מערכת תיאום פרימיום",
    format: "מספרה · תור",
    summary:
      "מערכת תיאום פרימיום — האתר עובד כמו קבלה דיגיטלית. הטלפון נשאר פנוי לעבודה.",
    stack: ["Next.js", "Three.js"],
    accent: "gold",
    featured: true,
    liveUrl: "https://luxe-barber-v2.vercel.app",
    challenge:
      "יומן מלא בטלפונים. האתר הקודם לא שידר את רמת הסלון ולא סגר תורים לבד.",
    approach:
      "ארכיטקטורת המרה וחוויית תלת־ממד: אווירת פרימיום, מסלול תור אחד, ומיקרו־אינטראקציות שמחזקות אמון.",
    outcome:
      "לקוחות קובעים מהאתר. היומן מתמלא מהר יותר — בלי לרדוף אחרי שיחות שלא נענו.",
    role: "מותג · תנועה · הנדסה",
  },
];

/** Exact reviews from user brief — do not rewrite quotes */
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
    title: "אתר תדמית מותאם",
    body: "נכס תדמית שנבנה מאפס — מי אתם, למה אתם, ואיך פונים. לא תבנית מהמדף.",
    lever: "אמון · פנייה",
    accent: "gold" as const,
  },
  {
    code: "02",
    title: "עמוד נחיתה ממיר",
    body: "עמוד אחד לקמפיין. ארכיטקטורת המרה עם קריאה לפעולה יחידה ומדויקת.",
    lever: "לחיצה → שיחה",
    accent: "cyan" as const,
  },
  {
    code: "03",
    title: "חוויית מוצר",
    body: "תפריט / קטלוג / הזמנה. חוויה יוקרתית בלי עגלה מנופחת כשאין צורך.",
    lever: "ראיתי → הזמנתי",
    accent: "cyan" as const,
  },
  {
    code: "04",
    title: "מערכות תיאום",
    body: "תיאום מראש לקליניקות ומספרות — תוצאה מדידה ביומן, לא ברעש.",
    lever: "שקט · תורים",
    accent: "violet" as const,
  },
] as const;

export const elements = [
  {
    code: "01",
    title: "גלילה שנשארת",
    body: "המסך לא קופץ. התוכן זז, המסגרת נעולה — חוויית סוכנות, לא תבנית.",
    accentWord: "נעולה",
  },
  {
    code: "02",
    title: "סיפורי מקרה חיים",
    body: "נכנסים לאתר אמיתי ולסיפור הפרויקט — לא לגלריית סטוק.",
    accentWord: "אמיתי",
  },
  {
    code: "03",
    title: "כפתור אחד",
    body: "פעולה אחת ברורה. בלי עשר קריאות לפעולה שצועקות ביחד.",
    accentWord: "אחד",
  },
  {
    code: "04",
    title: "הנדסה לנייד קודם",
    body: "רוב ההחלטות קורות בטלפון. הארכיטקטורה מתחילה שם.",
    accentWord: "טלפון",
  },
] as const;

export function caseStudyHref(project: Project | string) {
  const id = typeof project === "string" ? project : project.id;
  return `/work/${id}`;
}

/** Live site URL when available; otherwise case study */
export function projectHref(project: Project) {
  return project.liveUrl ?? caseStudyHref(project);
}

export function projectIsExternal(project: Project) {
  return Boolean(project.liveUrl);
}

export function getProject(id: string) {
  return projects.find((p) => p.id === id);
}

export const services = [
  {
    title: "נכסים דיגיטליים מותאמים",
    body: "אתרי תדמית שנבנים מאפס — אסטרטגיה, עיצוב והנדסה כמקשה אחת. בלי תבניות.",
  },
  {
    title: "חוויות תלת־ממד יוקרתיות",
    body: "תנועה ותלת־ממד שמשרתים את המותג. וואו עם מטרה — לא רעש שמייגע את הנייד.",
  },
  {
    title: "ארכיטקטורת המרה",
    body: "מבנה שמודד פניות, תורים והזמנות. תוצאה מדידה מהיום הראשון באוויר.",
  },
] as const;

export const philosophy = [
  {
    title: "אומנות על פני תבניות",
    body: "כל פיקסל נכתב לפרויקט. תבנית מהמדף לא יכולה לשאת מותג שרוצה לשלוט בשוק שלו.",
  },
  {
    title: "הנדסה כמותג",
    body: "הקוד הוא חלק מהמותג. ביצועים, RTL מדויק, ותנועה שקטה — זה מה שלקוחות מרגישים בלי לדעת למה.",
  },
  {
    title: "שליטה בשוק, לא קישוט",
    body: "האתר לא ״נראה יפה״. הוא נכס שמביא שיחות, תורים והזמנות — או שהוא לא שווה את ההשקעה.",
  },
] as const;

/** Header links (Hebrew only) — ייעוץ is a separate outlined CTA */
export const navLinks = [
  { href: "/", label: "בית" },
  { href: "/work", label: "עבודות" },
  { href: "/about", label: "עליי" },
] as const;

export const consultLink = { href: "/contact", label: "ייעוץ" } as const;

/** Footer + shared nav (includes consultation) */
export const nav = [
  ...navLinks,
  consultLink,
] as const;
