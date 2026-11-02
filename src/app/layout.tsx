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

export const metadata: Metadata = {
  title: {
    default: `${site.name} · ${site.taglineHe}`,
    template: `%s · ${site.nameHe}`,
  },
  description:
    "דוד טובול — חוויות דיגיטליות אקסקלוסיביות. עיצוב בוטיק, ארכיטקטורה חכמה, ותנועה מהפנטת. שיחת ייעוץ.",
  openGraph: {
    title: site.nameHe,
    description: site.taglineHe,
    locale: "he_IL",
    type: "website",
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
      <body className="relative isolate flex min-h-full flex-col overflow-x-hidden font-sans font-normal text-ink">
        <LenisProvider>
          <div className="noise" aria-hidden />
          <SiteChrome>{children}</SiteChrome>
        </LenisProvider>
      </body>
    </html>
  );
}
