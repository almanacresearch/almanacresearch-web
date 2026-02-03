"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { colors } from "@/lib/constants/theme";

interface AnnouncementBannerProps {
  message: string;
}

export function AnnouncementBanner({ message }: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const bannerRef = useRef<HTMLDivElement>(null);

  // Set CSS variable for navbar position based on banner height (only when mounted/resized, not on scroll)
  useEffect(() => {
    const updateBannerHeight = () => {
      if (bannerRef.current && isVisible) {
        const height = bannerRef.current.offsetHeight;
        document.documentElement.style.setProperty(
          "--announcement-banner-height",
          `${height}px`,
        );
      } else {
        document.documentElement.style.setProperty(
          "--announcement-banner-height",
          "0px",
        );
      }
    };

    updateBannerHeight();
    window.addEventListener("resize", updateBannerHeight);

    return () => {
      window.removeEventListener("resize", updateBannerHeight);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={bannerRef}
      className="w-full py-2 px-4 text-center text-xs flex items-center justify-center fixed top-0 left-0 right-0 z-[60]"
      style={{
        backgroundColor: colors.stone[800],
        color: colors.background.offWhite,
      }}
    >
      <p className="max-w-4xl mx-auto px-8">{message}</p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
        aria-label="Close announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
}
