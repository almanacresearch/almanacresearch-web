"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";
import { gradients, shadows } from "@/lib/constants/theme";
import { scaleOnHover } from "@/lib/constants/animations";

interface GlassCardProps {
  children?: ReactNode;
  placeholder?: string;
  className?: string;
}

export function GlassCard({ children, placeholder, className = "" }: GlassCardProps) {
  return (
    <motion.div
      className={`max-w-md mx-auto h-64 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden group ${className}`}
      {...scaleOnHover}
      style={{
        background: gradients.glass,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        boxShadow: shadows.glass,
      }}
    >
      {/* Glass reflection layers */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: gradients.glassReflection,
        }}
      ></div>

      {/* Shimmer effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: gradients.glassShimmer,
          backgroundSize: "200% 100%",
          animation: "shimmer 3s infinite",
        }}
      ></div>

      {/* Floating orbs */}
      <div
        className="absolute top-10 right-10 w-16 h-16 rounded-full opacity-30 blur-xl"
        style={{
          background: gradients.radialGold,
        }}
      ></div>
      <div
        className="absolute bottom-10 left-10 w-12 h-12 rounded-full opacity-20 blur-lg"
        style={{
          background: gradients.radialBrown,
        }}
      ></div>

      {/* Border gradient */}
      <div
        className="absolute inset-0 rounded-[2.5rem] opacity-50"
        style={{
          background: gradients.glassBorder,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          padding: "1px",
        }}
      ></div>

      {/* Content */}
      {children ? (
        <div className="relative z-10">{children}</div>
      ) : (
        <p className="text-stone-400 text-center px-8 relative z-10">
          {placeholder || "[Graphic Placeholder]"}
        </p>
      )}
    </motion.div>
  );
}
