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

  useEffect(() => {
    if (!isVisible) {
      document.documentElement.style.setProperty(
        "--announcement-banner-height",
        "0px",
      );
      return;
    }

    const updateNavPosition = () => {
      if (bannerRef.current) {
        const rect = bannerRef.current.getBoundingClientRect();
        // Banner height visible in viewport
        const visibleHeight = Math.max(0, rect.bottom);
        document.documentElement.style.setProperty(
          "--announcement-banner-height",
          `${visibleHeight}px`,
        );
      }
    };

    updateNavPosition();
    window.addEventListener("scroll", updateNavPosition);
    window.addEventListener("resize", updateNavPosition);

    return () => {
      window.removeEventListener("scroll", updateNavPosition);
      window.removeEventListener("resize", updateNavPosition);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={bannerRef}
      className="w-full py-2 px-4 text-center text-xs flex items-center justify-center relative"
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
