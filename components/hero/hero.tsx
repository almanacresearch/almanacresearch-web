import { motion } from "motion/react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { colors } from "@/lib/constants/theme";
import { LottieAnimation } from "../ui/lottie-animations";
import { AlmanacaiGmailAccess } from "@/components/ui/almanacai-gmail-access";

export function Hero() {
  return (
    <section
      className={"relative pt-32 pb-20 overflow-hidden"}
      style={{
        background:
          "linear-gradient(135deg, #1c1917 0%, #78350f 50%, #1c1917 100%)",
      }}
    >
      <AnimatedBackground variant="hero" />

      <div className="absolute inset-0 flex items-center justify-center opacity-80 pointer-events-none">
        <div
          className={
            "w-full -translate-y-8 md:-translate-y-16 lg:-translate-y-28"
          }
        >
          <LottieAnimation
            animationPath="/animations/hero-logo.json"
            loop={false}
            autoplay={true}
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
                  fontFamily: "var(--font-inter)",
                }}
              >
                AlmanacAI
              </h1>
              <p
                className="text-base sm:text-lg md:text-xl text-amber-50/80"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Powered Execution
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
            <AlmanacaiGmailAccess variant="dark" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
