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

הטופס שולח ל־`POST /api/contact` (Zod + honeypot + rate-limit) — **בלי הפניה לוואטסאפ**:

1. **מייל RTL** → `Twbwl7@gmail.com` (+ `CONTACT_TO_EMAIL`) דרך Resend, עם קובץ **CSV לאקסל** מצורף (נפתח באקסל כטבלה מסודרת)
2. **Google Sheets** (אופציונלי) → שורה מצטברת (`GOOGLE_SHEETS_WEBHOOK_URL` + `scripts/google-sheets-leads.gs`)
3. **וואטסאפ בוט** (אופציונלי בלבד, בצד שרת) → `WHATSAPP_BOT_URL`

| משתנה | ציבורי? | חובה | תיאור |
|---|---|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | כן | כן | `972523182032` |
| `CONTACT_TO_EMAIL` | לא | מומלץ | ברירת מחדל `Twbwl7@gmail.com` |
| `RESEND_API_KEY` | לא | **כן למייל** | מפתח מ־https://resend.com/api-keys |
| `CONTACT_FROM_EMAIL` | לא | לא | שולח מאומת ב־Resend |
| `GOOGLE_SHEETS_WEBHOOK_URL` | לא | לא | Apps Script Web App — ראו `scripts/google-sheets-leads.gs` |
| `WHATSAPP_BOT_URL` | לא | לא | Make / Zapier / CallMeBot |

הגדירו את אותם משתנים גם ב־**Vercel → Project → Settings → Environment Variables** (Production), ואז Redeploy.

## וואטסאפ / מייל גלויים באתר

- טלפון: `052-318-2032`
- מייל: `Twbwl7@gmail.com`
