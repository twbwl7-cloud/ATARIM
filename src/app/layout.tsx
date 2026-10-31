import type { Metadata } from "next";
import { Rubik, Secular_One } from "next/font/google";
import { LenisProvider } from "@/components/LenisProvider";
import { SiteChrome } from "@/components/SiteChrome";
import { site } from "@/lib/site";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
});

const secular = Secular_One({
  variable: "--font-secular",
  subsets: ["hebrew", "latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description:
    "דוד טובול — אתר שמביא הודעות בוואטסאפ. רואים דוגמה בחינם לפני שמשלמים.",
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
      className={`${rubik.variable} ${secular.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-[#061018] font-sans text-ivory">
        <LenisProvider>
          <div className="noise" aria-hidden />
          <SiteChrome>{children}</SiteChrome>
        </LenisProvider>
      </body>
    </html>
  );
}
