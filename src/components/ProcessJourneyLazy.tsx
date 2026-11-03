"use client";

import dynamic from "next/dynamic";

/** Heavy sticky scroll map — load only when the contact page mounts. */
export const ProcessJourneyLazy = dynamic(
  () =>
    import("@/components/ProcessJourney").then((m) => m.ProcessJourney),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[50vh] w-full" aria-hidden />
    ),
  },
);
