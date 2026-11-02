"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import { AmbientGlow } from "@/components/AmbientGlow";
import { CardSpotlight } from "@/components/CardSpotlight";
import { Curtain } from "@/components/Curtain";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LuxuryModeToggle } from "@/components/LuxuryModeToggle";
import { PremiumCursor } from "@/components/PremiumCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { WhatsAppReassurance } from "@/components/WhatsAppReassurance";

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
      <CardSpotlight />
      <ScrollProgress />
      <PremiumCursor />
      <Curtain />
      <Header />
      <main className="relative z-[1] flex-1">{children}</main>
      <div className="relative z-[1]">
        <Footer />
      </div>
      <WhatsAppFloat />
      <WhatsAppReassurance />
      <AccessibilityWidget />
      <LuxuryModeToggle />
    </>
  );
}
