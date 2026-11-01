"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Curtain } from "@/components/Curtain";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InteractiveBackground } from "@/components/InteractiveBackground";
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
      {/* Behind everything: orbs + waves + mouse parallax (desktop only) */}
      <InteractiveBackground />
      <Curtain />
      <Header />
      <main className="relative z-[1] flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
