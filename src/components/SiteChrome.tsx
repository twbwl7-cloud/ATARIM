"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { AmbientGlow } from "@/components/AmbientGlow";
import { Curtain } from "@/components/Curtain";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PremiumCursor } from "@/components/PremiumCursor";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

/** Portfolio chrome stays off demo landings so each /demo/* feels like its own site. */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDemo = pathname?.startsWith("/demo");

  if (isDemo) {
    return <>{children}</>;
  }

  return (
    <>
      <AmbientGlow />
      <PremiumCursor />
      <Curtain />
      <Header />
      <main className="relative z-[1] flex-1">{children}</main>
      <div className="relative z-[1]">
        <Footer />
      </div>
      <WhatsAppFloat />
    </>
  );
}
