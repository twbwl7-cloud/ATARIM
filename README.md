# דוד טובול — פורטפוליו פרימיום

אתר קטלוג / תיק עבודות בעברית (RTL) לפיתוח חוויות אינטראקטיביות ופלטפורמות פרימיום.

## סטאק

- **Next.js** (App Router) + **Tailwind CSS**
- **React Three Fiber** / Three.js — Hero תלת־ממדי
- **Framer Motion** + **Lenis** — גלילה נעוצה, מגנטיות, word-ignite
- Mobile-first · Hebrew RTL · CTA לוואטסאפ

מבוסס על חבילת ה־playbooks ב־`doks/` (פסיכולוגיה P*, אנימציות A*, סקריפט דימו).

## הרצה

```bash
npm install
cp .env.example .env.local   # ועדכנו מספר וואטסאפ
npm run dev
```

פתחו [http://127.0.0.1:43128](http://127.0.0.1:43128).

## מבנה

| נתיב | תוכן |
|------|------|
| `/` | Hero 3D, failed-before strike, עמודי תווך נעוצים, תהליך מלאכה, גריד עבודות |
| `/demo/[slug]` | דימו חי לכל פרויקט (POC בלי שרת, noindex) |
| `/portfolio` | קטלוג כרטיסים מלא |
| `/about` | גישה טכנולוגית ועיצובית |
| `/contact` | CTA לוואטסאפ |

לחיצה על כרטיס עבודה פותחת דימו חי ב־`/demo/<id>` (למשל `/demo/lulilac`).

עדכנו `NEXT_PUBLIC_WHATSAPP_NUMBER` ב־`.env.local`.
