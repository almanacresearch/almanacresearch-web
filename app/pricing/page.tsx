import type { Metadata } from "next";

// Components
import { Nav } from "@/components/nav/nav";
import { PricingClient } from "./_components/pricing-client";

// Constants
import { colors } from "@/lib/constants/theme";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Explore AlmanacAI pricing plans. Find the right plan for individuals, teams, and enterprises.",
  openGraph: {
    title: "Pricing",
    description:
      "Explore AlmanacAI pricing plans. Find the right plan for individuals, teams, and enterprises.",
  },
};

export default function Pricing() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background.offWhite }}
    >
      {/* Navigation */}
      <Nav />

      <PricingClient />
    </div>
  );
}
