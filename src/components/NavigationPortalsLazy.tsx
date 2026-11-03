"use client";

import dynamic from "next/dynamic";

/** Portals pull Three.js scenes — defer the chunk past first paint. */
export const NavigationPortalsLazy = dynamic(
  () =>
    import("@/components/NavigationPortals").then((m) => m.NavigationPortals),
  {
    ssr: true,
    loading: () => <div className="min-h-[22rem] w-full" aria-hidden />,
  },
);
