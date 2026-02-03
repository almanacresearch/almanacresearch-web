// Components
import { Nav } from "@/components/nav/nav";
import { HomeClient } from "./_components/home-client";
import { AnnouncementBanner } from "@/components/ui/announcement-banner";

// Constants
import { colors } from "@/lib/constants/theme";

const ANNOUNCEMENT_MESSAGE =
  "We're completing final compliance and verification checks before launching our MVP. This helps ensure a safe and reliable experience for everyone. We'll share the new launch date shortly.";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: colors.background.offWhite,
        color: colors.stone[800],
      }}
    >
      {/* Announcement Banner - at top, scrolls with content */}
      <AnnouncementBanner message={ANNOUNCEMENT_MESSAGE} />

      {/* Navigation */}
      <Nav />

      {/* Client Content with animations */}
      <HomeClient />
    </div>
  );
}
