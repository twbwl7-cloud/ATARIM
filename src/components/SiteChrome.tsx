"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { AmbientGlow } from "@/components/AmbientGlow";
import { Curtain } from "@/components/Curtain";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { WhatsAppReassurance } from "@/components/WhatsAppReassurance";

/** Pointer chrome — desktop only, never block first paint. */
const CustomCursor = dynamic(
  () => import("@/components/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false, loading: () => null },
);

const CardSpotlight = dynamic(
  () => import("@/components/CardSpotlight").then((m) => m.CardSpotlight),
  { ssr: false, loading: () => null },
);

const ScrollProgress = dynamic(
  () => import("@/components/ScrollProgress").then((m) => m.ScrollProgress),
  { ssr: false, loading: () => null },
);

const AccessibilityWidget = dynamic(
  () =>
    import("@/components/AccessibilityWidget").then(
      (m) => m.AccessibilityWidget,
    ),
  { ssr: false, loading: () => null },
);

const LuxuryModeToggle = dynamic(
  () =>
    import("@/components/LuxuryModeToggle").then((m) => m.LuxuryModeToggle),
  { ssr: false, loading: () => null },
);

/** Portfolio chrome stays off demo landings so each /demo/* feels like its own site. */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDemo = pathname?.startsWith("/demo");

  if (isDemo) {
    return <>{children}</>;
  }

  return (
    <>
      <ErrorBoundary fallback={null}>
        <AmbientGlow />
        <CardSpotlight />
        <ScrollProgress />
        <CustomCursor />
      </ErrorBoundary>
      <ErrorBoundary fallback={null}>
        <Curtain />
      </ErrorBoundary>
      <Header />
      <ErrorBoundary>
        <main className="relative z-[1] flex-1">{children}</main>
      </ErrorBoundary>
      <div className="relative z-[1]">
        <Footer />
      </div>
      <WhatsAppFloat />
      <WhatsAppReassurance />
      <ErrorBoundary fallback={null}>
        <AccessibilityWidget />
        <LuxuryModeToggle />
      </ErrorBoundary>
    </>
  );
}
