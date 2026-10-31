# דוד טובול — פורטפוליו

אתר תיק עבודות בעברית (RTL) לבניית אתרים לעסקים. דיבור ישיר, דוגמה בחינם, כניסה לאתרים חיים.

## סטאק

- **Next.js** (App Router) + **Tailwind CSS**
- **React Three Fiber** — Hero MacBook
- **Framer Motion** + **Lenis** — גלילה נעוצה
- Mobile-first · Hebrew RTL · CTA לוואטסאפ

מבוסס על חבילת ה־playbooks ב־`doks/` (פסיכולוגיה, אנימציות, סקריפט דימו, סקריפט 6 — טיהור AI).

## הרצה

```bash
npm install
cp .env.example .env.local   # ועדכנו מספר וואטסאפ
npm run dev -- --port 43128 --hostname 127.0.0.1
```

פתחו [http://127.0.0.1:43128](http://127.0.0.1:43128).

## מבנה

| נתיב | תוכן |
|------|------|
| `/` | Hero, עבודות במסגרות מכשיר (מובייל↔מובייל, מחשב↔מחשב), תהליך, דוגמה בחינם |
| `public/work/mobile/` | צילומי מסך לטלפון |
| `public/work/desktop/` | צילומי מסך למחשב |
| `/demo/[slug]` | דימו חי (POC בלי שרת) |
| `/about` | עליי |
| `/contact` | יצירת קשר |

עדכנו `NEXT_PUBLIC_WHATSAPP_NUMBER` ב־`.env.local` (ברירת מחדל: 052-318-2032).
