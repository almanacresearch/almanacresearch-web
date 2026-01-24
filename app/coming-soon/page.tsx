"use client";

import { AnimatedBackground } from "@/components/ui/client-components";
import { BackLink } from "@/components/ui/back-link";
import { motion } from "motion/react";
import { colors, gradients } from "@/lib/constants/theme";
import { fadeInHero, fadeIn } from "@/lib/constants/animations";
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
        <motion.div {...fadeInHero}>
          <motion.p
            className="text-sm tracking-[0.3em] mb-6 uppercase"
            style={{ color: colors.primary.mediumBrown }}
            {...fadeIn}
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
            {...fadeInHero}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {title}
          </motion.h1>

          <motion.div {...fadeIn} transition={{ delay: 0.8, duration: 0.8 }}>
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

function LoadingFallback() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: colors.background.offWhite }}
    />
  );
}

export default function ComingSoon() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ComingSoonContent />
    </Suspense>
  );
}
