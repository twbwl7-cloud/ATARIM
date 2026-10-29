# דוד טובול — פורטפוליו פרימיום

אתר קטלוג / תיק עבודות בעברית (RTL) לפיתוח חוויות אינטראקטיביות ופלטפורמות פרימיום.

## סטאק

- **Next.js** (App Router) + **Tailwind CSS**
- **React Three Fiber** / Three.js — Hero תלת־ממדי
- **Framer Motion** — אנימציות ומגנטיות בכרטיסים
- Mobile-first · Hebrew RTL · CTA לוואטסאפ

מבוסס על חבילת ה־playbooks ב־`/cursor/stores/user/doks/` (פסיכולוגיה, אנימציות, סקריפט דימו).

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
| `/` | Hero 3D, שירותים, גריד עבודות, אודות, צור קשר |
| `/portfolio` | קטלוג כרטיסים מלא |
| `/about` | גישה טכנולוגית ועיצובית |
| `/contact` | CTA לוואטסאפ |

עדכנו `NEXT_PUBLIC_WHATSAPP_NUMBER` ב־`.env.local`.
