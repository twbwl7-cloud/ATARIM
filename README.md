# דוד טובול — נכסים דיגיטליים יוקרתיים

אתר תדמית RTL ברמת סטודיו יוקרה. Next.js App Router · Heebo + Frank Ruhl Libre · Light Luxury · R3F hero.

## משפך

| עמוד | נתיב | תפקיד |
|---|---|---|
| בית | `/` | הירו קולנועי → שערי ניווט → עבודות → למה → ייעוץ |
| עבודות | `/work` | גלריה + כיוון ויזואלי → סיפורי מקרה |
| סיפור מקרה | `/work/[slug]` | אתגר · גישה · תוצאה → ייעוץ |
| עליי | `/about` | החזון + סטנדרט העבודה → ייעוץ |
| ייעוץ | `/contact` | פנייה לפרויקט · שיחת ייעוץ |

## הרצה

```bash
npm install
cp .env.example .env.local
npm run dev -- --port 43128 --hostname 127.0.0.1
```

[http://127.0.0.1:43128](http://127.0.0.1:43128)

## מפתחות ומייל (לפי הסקריפטים)

הטופס שולח ל־`POST /api/contact` (Zod + honeypot + rate-limit), ואז:

1. **מייל** → `CONTACT_TO_EMAIL` דרך **Resend** (`RESEND_API_KEY`)
2. **וואטסאפ בוט** (אופציונלי) → `WHATSAPP_BOT_URL`
3. **פתיחת wa.me** אצל הלקוח להמשך שיחה

| משתנה | ציבורי? | חובה | תיאור |
|---|---|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | כן | כן | `972523182032` |
| `CONTACT_TO_EMAIL` | לא | מומלץ | ברירת מחדל `Twbwl7@gmail.com` |
| `RESEND_API_KEY` | לא | **כן למייל** | מפתח מ־https://resend.com/api-keys |
| `CONTACT_FROM_EMAIL` | לא | לא | שולח מאומת ב־Resend (אחרי דומיין) |
| `WHATSAPP_BOT_URL` | לא | לא | Make / Zapier / CallMeBot webhook |

הגדירו את אותם משתנים גם ב־**Vercel → Project → Settings → Environment Variables** (Production).

## וואטסאפ / מייל גלויים באתר

- טלפון: `052-318-2032`
- מייל: `Twbwl7@gmail.com`
