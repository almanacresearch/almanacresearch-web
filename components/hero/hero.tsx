"use client";

import { motion } from "motion/react";
import { AnimatedBackground } from "@/components/ui/client-components";
import { colors } from "@/lib/constants/theme";
import { LottieAnimation } from "../ui/lottie-animations";
import { AlmanacaiMailAccess } from "@/components/ui/almanacai-mail-access";

export function Hero() {
  return (
    <section
      data-navbar-theme="dark"
      className="relative pb-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #1c1917 0%, #78350f 50%, #1c1917 100%)",
        paddingTop: "calc(var(--announcement-banner-height, 0px) + 128px)",
      }}
    >
      <AnimatedBackground variant="hero" />

      <div className="absolute inset-0 flex items-center justify-center opacity-80 pointer-events-none">
        {/* Mobile animation */}
        <div className={"w-full -translate-y-8 md:hidden scale-150"}>
          <LottieAnimation
            animationPath="/animations/hero-mobile.json"
            loop={false}
            autoplay={true}
            variant="dark"
          />
        </div>
        {/* Desktop animation */}
        <div
          className={
            "w-full -translate-y-8 md:-translate-y-4 lg:-translate-y-8 hidden md:block"
          }
        >
          <LottieAnimation
            animationPath="/animations/hero.json"
            loop={false}
            autoplay={true}
            variant="dark"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <motion.div
            className={
              "text-center space-y-2 sm:space-y-3 mb-24 md:mb-20 lg:mb-16"
            }
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0 }}
          >
            <div className="space-y-1">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                style={{
                  color: colors.background.cream,
                }}
              >
                AlmanacAI
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-amber-50/80">
                {"Powered Execution".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.1,
                      delay: 2.5 + index * 0.1,
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </p>
            </div>
          </motion.div>

          <div
            className={
              "h-32 sm:h-40 md:h-48 lg:h-56 -translate-y-8 md:-translate-y-16 lg:-translate-y-28"
            }
            aria-hidden="true"
          />

          <motion.div
            className={"text-center mt-8"}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <AlmanacaiMailAccess variant="dark" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
