import type { Metadata, Viewport } from "next";
import { Frank_Ruhl_Libre, Heebo } from "next/font/google";
import { LenisProvider } from "@/components/LenisProvider";
import { SiteChrome } from "@/components/SiteChrome";
import { site } from "@/lib/site";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

const frank = Frank_Ruhl_Libre({
  variable: "--font-frank",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  preload: true,
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://davidwebsitebuilder.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#FAF9F6",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.nameHe} · נכסים דיגיטליים שאי אפשר להתעלם מהם`,
    template: `%s · ${site.nameHe}`,
  },
  description:
    "דוד טובול — אתרי תדמית בוטיק שנבנים מאפס. עיצוב חד, ארכיטקטורת המרה, ושיחת ייעוץ בלי התחייבות.",
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
    title: `${site.nameHe} · סטודיו בוטיק`,
    description:
      "אתרים שנבנים מאפס — לא מתבניות. עיצוב בוטיק וארכיטקטורת המרה.",
    locale: "he_IL",
    type: "website",
    url: siteUrl,
    siteName: site.nameHe,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.nameHe} · סטודיו בוטיק`,
    description: "אתרים שנבנים מאפס — לא מתבניות. שיחת ייעוץ בלי התחייבות.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "format-detection": "telephone=no",
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
      <head>
        <link
          rel="preload"
          as="image"
          href="/brand/david-tubul-logo-horizontal.png?v=7"
          type="image/png"
        />
      </head>
      <body className="relative isolate flex min-h-full flex-col overflow-x-clip bg-[#FAF9F6] font-sans font-light text-[#121212] antialiased">
        <LenisProvider>
          <div className="noise" aria-hidden />
          <SiteChrome>{children}</SiteChrome>
        </LenisProvider>
      </body>
    </html>
  );
}
