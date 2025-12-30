import { colors } from "@/lib/constants/theme";

interface AlmanacaiGmailAccessProps {
  variant?: "dark" | "light";
  className?: string;
}

export function AlmanacaiGmailAccess({
  variant = "dark",
  className = "",
}: AlmanacaiGmailAccessProps) {
  const isDark = variant === "dark";

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      {/* Change it when going live */}
      <p
        className="text-lg sm:text-xl md:text-2xl"
        style={{
          color: isDark ? colors.stone[200] : colors.primary.darkBrown,
        }}
      >
        AlmanacAI Gmail - Launching <b>January 4, 2026</b>
      </p>
      <p
        className="text-sm sm:text-base"
        style={{
          color: isDark ? "rgba(255, 250, 240, 0.8)" : colors.stone[700],
        }}
      >
        Declutter your Gmail.
      </p>
    </div>
  );
}
