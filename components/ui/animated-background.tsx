"use client";

import { motion } from "motion/react";
import { gradients } from "@/lib/constants/theme";

type AnimatedBackgroundVariant = "hero" | "simple" | "none";

interface AnimatedBackgroundProps {
  variant?: AnimatedBackgroundVariant;
}

export function AnimatedBackground({
  variant = "simple",
}: AnimatedBackgroundProps) {
  if (variant === "none") return null;

  // Simple variant - static blur orbs with pulse animation
  if (variant === "simple") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{
            background: gradients.radialGoldFade,
            animationDuration: "4s",
          }}
        ></div>
        <div
          className="absolute bottom-40 right-20 w-80 h-80 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{
            background: gradients.radialBrownFade,
            animationDuration: "6s",
          }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full opacity-10 blur-2xl animate-pulse"
          style={{
            background: gradients.radialLightBrown,
            animationDuration: "5s",
          }}
        ></div>
      </div>
    );
  }

  // Hero variant - animated shapes, circles, rectangles, particles
  if (variant === "hero") {
    const shapes = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 120 + 80,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      duration: Math.random() * 25 + 15,
      delay: Math.random() * 5,
    }));

    return (
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Circles */}
        {shapes.slice(0, 6).map((shape) => (
          <motion.div
            key={`circle-${shape.id}`}
            className="absolute rounded-full bg-gradient-to-br from-amber-700/10 to-amber-800/10 backdrop-blur-sm"
            style={{
              width: shape.size,
              height: shape.size,
              left: `${shape.initialX}%`,
              top: `${shape.initialY}%`,
            }}
            animate={{
              x: [0, 80, -80, 0],
              y: [0, -80, 80, 0],
              scale: [1, 1.3, 0.9, 1],
              rotate: [0, 120, 240, 360],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shape.delay,
            }}
          />
        ))}

        {/* Animated Rectangles */}
        {shapes.slice(6, 11).map((shape) => (
          <motion.div
            key={`rect-${shape.id}`}
            className="absolute bg-gradient-to-br from-yellow-700/8 to-amber-600/8 backdrop-blur-sm rounded-xl"
            style={{
              width: shape.size * 1.2,
              height: shape.size * 0.8,
              left: `${shape.initialX}%`,
              top: `${shape.initialY}%`,
            }}
            animate={{
              x: [0, -60, 60, 0],
              y: [0, 60, -60, 0],
              rotate: [0, 45, -45, 0],
              scale: [1, 0.85, 1.15, 1],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shape.delay,
            }}
          />
        ))}

        {/* Floating Particles */}
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-amber-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -600],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 via-transparent to-amber-900/10" />
      </div>
    );
  }

  return null;
}
