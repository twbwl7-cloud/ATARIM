import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Heebo } from "next/font/google";
import { LenisProvider } from "@/components/LenisProvider";
import { SiteChrome } from "@/components/SiteChrome";
import { site } from "@/lib/site";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
});

const frank = Frank_Ruhl_Libre({
  variable: "--font-frank",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description:
    "דוד טובול — אתרים בקוד לעסקים. דוגמה לפני תשלום. לולילק, Cookk, לוקסי.",
  openGraph: {
    title: site.name,
    description: site.tagline,
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${frank.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-sky font-sans text-ink">
        <LenisProvider>
          <div className="noise" aria-hidden />
          <SiteChrome>{children}</SiteChrome>
        </LenisProvider>
      </body>
    </html>
  );
}
