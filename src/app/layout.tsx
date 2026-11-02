import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Heebo } from "next/font/google";
import { LenisProvider } from "@/components/LenisProvider";
import { SiteChrome } from "@/components/SiteChrome";
import { site } from "@/lib/site";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const frank = Frank_Ruhl_Libre({
  variable: "--font-frank",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://davidwebsitebuilder.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.nameHe} · נכסים דיגיטליים שאי אפשר להתעלם מהם`,
    template: `%s · ${site.nameHe}`,
  },
  description:
    "דוד טובול — חוויות דיגיטליות אקסקלוסיביות. עיצוב בוטיק, ארכיטקטורה חכמה, ותנועה מהפנטת. שיחת ייעוץ ללא התחייבות.",
  keywords: [
    "דוד טובול",
    "אתר תדמית",
    "סטודיו בוטיק",
    "נכס דיגיטלי",
    "עיצוב יוקרה",
    "Next.js",
  ],
  authors: [{ name: site.nameHe }],
  creator: site.nameHe,
  openGraph: {
    title: `${site.nameHe} · סטודיו לחוויות רשת`,
    description:
      "חוויות דיגיטליות אקסקלוסיביות. עיצוב בוטיק בלתי מתפשר — נכסים שנבנים מאפס, לא מתבניות.",
    locale: "he_IL",
    type: "website",
    url: siteUrl,
    siteName: site.nameHe,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.nameHe} · סטודיו לחוויות רשת`,
    description:
      "חוויות דיגיטליות אקסקלוסיביות. עיצוב בוטיק בלתי מתפשר — שיחת ייעוץ.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="he"
      dir="rtl"
      data-scroll-behavior="smooth"
      className={`${heebo.variable} ${frank.variable} h-full antialiased`}
    >
      <body className="relative isolate flex min-h-full flex-col overflow-x-hidden bg-[#FAF9F6] font-sans font-light text-ink">
        <LenisProvider>
          <div className="noise" aria-hidden />
          <SiteChrome>{children}</SiteChrome>
        </LenisProvider>
      </body>
    </html>
  );
}
