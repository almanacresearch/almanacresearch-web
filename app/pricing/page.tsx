// Components
import { Nav } from "@/components/nav/nav";
import { PricingClient } from "./_components/pricing-client";

// Constants
import { colors } from "@/lib/constants/theme";

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
