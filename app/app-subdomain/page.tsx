"use client";

import { AnimatedBackground } from "@/components/ui/client-components";
import { BackLink } from "@/components/ui/back-link";
import { motion } from "motion/react";
import { colors, gradients } from "@/lib/constants/theme";

const mainUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.almanacresearch.com";

export default function AppSubdomainHome() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: colors.background.offWhite }}
    >
      {/* Animated background */}
      <AnimatedBackground />

      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-6xl lg:text-8xl mb-8"
              style={{
                color: colors.primary.darkBrown,
                lineHeight: "1.2",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 2.0 }}
            >
              AlmanacAI
            </motion.h1>

            <motion.p
              className="text-3xl lg:text-4xl"
              style={{
                background: gradients.hero,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1.5 }}
            >
              Coming Soon
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 pb-8">
        <BackLink href={mainUrl} />
      </div>
    </div>
  );
}
