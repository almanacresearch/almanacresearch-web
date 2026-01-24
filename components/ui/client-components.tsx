"use client";

import dynamic from "next/dynamic";

export const AnimatedBackground = dynamic(
  () =>
    import("@/components/ui/animated-background").then(
      (mod) => mod.AnimatedBackground
    ),
  { ssr: false }
);
