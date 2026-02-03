"use client";

import { ArrowRight } from "lucide-react";
import { colors } from "@/lib/constants/theme";
import { signInWithGoogle, useUser } from "@/lib/auth";

const getAppUrl = () => {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.almanacresearch.com";
  const url = new URL(baseUrl);
  url.hostname = `appmvp.${url.hostname.replace(/^www\./, "")}`;
  return url.toString().replace(/\/$/, "");
};

interface AlmanacaiMailAccessProps {
  variant?: "dark" | "light";
  className?: string;
}

export function AlmanacaiMailAccess({
  variant = "dark",
  className = "",
}: AlmanacaiMailAccessProps) {
  const isDark = variant === "dark";
  const appUrl = getAppUrl();
  const { user } = useUser();

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      {/* Change it when going live */}
      <p
        className="text-lg sm:text-xl md:text-2xl"
        style={{
          color: isDark ? colors.stone[200] : colors.primary.darkBrown,
        }}
      >
        AlmanacAI Mail - Launching Soon
      </p>
      <p
        className="text-sm sm:text-base"
        style={{
          color: isDark ? "rgba(255, 250, 240, 0.8)" : colors.stone[700],
        }}
      >
        <a
          href={appUrl}
          className="font-semibold inline-flex items-center gap-1 transition-transform duration-200 hover:scale-105"
          style={{
            color: isDark ? colors.stone[200] : colors.primary.darkBrown,
          }}
        >
          Learn more
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </p>
    </div>
  );
}
