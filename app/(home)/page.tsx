// Components
import { Nav } from "@/components/nav/nav";
import { HomeClient } from "./_components/home-client";

// Constants
import { colors } from "@/lib/constants/theme";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: colors.background.offWhite,
        color: colors.stone[800],
      }}
    >
      {/* Navigation */}
      <Nav />

      {/* Client Content with animations */}
      <HomeClient />
    </div>
  );
}
