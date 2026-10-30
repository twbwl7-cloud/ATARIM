# דוד טובול — פורטפוליו פרימיום

אתר קטלוג / תיק עבודות בעברית (RTL) לפיתוח חוויות אינטראקטיביות ופלטפורמות פרימיום.

## סטאק

- **Next.js** (App Router) + **Tailwind CSS**
- **React Three Fiber** / Three.js — Hero MacBook Pro (ProledXDR) עם כניסה למסך
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
| `/` | Hero MacBook 3D (plunge למסך), **גלגל עבודות נעוץ** (לולילק · Cookk · לוקסי), תהליך, למה נדיר |
| `public/models/` | שימו כאן `MacbookProProledXDR4K.glb` מה־zip של Sketchfab — ה־Hero מחליף אוטומטית |
| `/demo/[slug]` | דימו חי לכל פרויקט (POC בלי שרת, noindex) |
| `/portfolio` | קטלוג כרטיסים מלא |
| `/about` | גישה טכנולוגית ועיצובית |
| `/contact` | CTA לוואטסאפ |

אחרי ה־Hero: גללו — המסך נשאר והגלגל מסתובב. לחיצה על הכרטיס הקדמי פותחת את האתר החי (Vercel).

עדכנו `NEXT_PUBLIC_WHATSAPP_NUMBER` ב־`.env.local`.
