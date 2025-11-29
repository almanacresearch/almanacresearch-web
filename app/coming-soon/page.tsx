"use client";

import { AnimatedBackground } from "@/components/ui/animated-background";
import { BackLink } from "@/components/ui/back-link";
import { motion } from "motion/react";
import { colors, gradients } from "@/lib/constants/theme";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ComingSoonContent() {
  const searchParams = useSearchParams();
  const title = searchParams?.get("title") || "Coming Soon";
  const description =
    searchParams?.get("description") ||
    "We're working on something exciting. Stay tuned!";

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: colors.background.offWhite }}
    >
      {/* Animated background */}
      <AnimatedBackground />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p
            className="text-sm tracking-[0.3em] mb-6 uppercase"
            style={{ color: colors.primary.mediumBrown }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            ALMANAC RESEARCH
          </motion.p>

          <motion.h1
            className="text-6xl lg:text-8xl mb-8"
            style={{
              color: colors.primary.darkBrown,
              lineHeight: "1.2",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <p
              className="text-3xl lg:text-4xl mb-6"
              style={{
                background: gradients.hero,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Coming Soon
            </p>
            <p
              className="text-xl max-w-2xl mx-auto mb-12"
              style={{ color: colors.stone[700] }}
            >
              {description}
            </p>
          </motion.div>

          <BackLink />
        </motion.div>
      </div>
    </div>
  );
}

export default function ComingSoon() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ComingSoonContent />
    </Suspense>
  );
}
