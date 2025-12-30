"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { colors } from "@/lib/constants/theme";

interface BackLinkProps {
  href?: string;
  className?: string;
}

export function BackLink({ href = "/", className = "" }: BackLinkProps) {
  const router = useRouter();
  const [isLeaving, setIsLeaving] = useState(false);

  const handleClick = () => {
    setIsLeaving(true);
    setTimeout(() => {
      router.push(href);
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.1 }}
      className={`pb-16 text-center ${className}`}
    >
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-2 transition-all duration-300 group ${
          isLeaving ? "opacity-0 translate-y-2" : ""
        }`}
        style={{ color: colors.primary.mediumBrown }}
      >
        <svg
          className="w-5 h-5 transition-transform group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="group-hover:underline">Back to Home</span>
      </button>
    </motion.div>
  );
}
