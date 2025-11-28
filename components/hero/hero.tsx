import { motion } from "motion/react";
import { EmailRegistrationForm } from "@/components/forms/email-registration-form";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { colors } from "@/lib/constants/theme";

export function Hero() {
  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #1c1917 0%, #78350f 50%, #1c1917 100%)`,
      }}
    >
      {/* Animated Background - Motion Graphics */}
      <AnimatedBackground variant="hero" />

      {/* Content */}
      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-1 pb-6">
              <p
                className="text-3xl lg:text-4xl font-bold"
                style={{ color: "#d6d3d1" }}
              >
                introducing
              </p>
              <h1
                className="text-6xl lg:text-7xl font-bold"
                style={{ color: colors.background.white }}
              >
                AlmanacAI
              </h1>
              <p className="text-lg lg:text-xl text-amber-50/80">
                It's your Personal Assistant.
              </p>
            </div>

            <p className="text-lg lg:text-xl text-amber-50/80">
              Join the waitlist, launching -<b> March 1, 2026</b>
            </p>
            <p className="text-amber-50/80">
              Be part of the founding cohort shaping AlmanacAI's future with
              <b> premium access</b>, permanently unlocked
            </p>
            <EmailRegistrationForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
