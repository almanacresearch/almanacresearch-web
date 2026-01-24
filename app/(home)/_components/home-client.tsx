"use client";

// External libraries
import { motion } from "motion/react";
import { Brain, Zap, Lock, Monitor, Smartphone, Tablet } from "lucide-react";

// Components
import { Hero } from "@/components/hero/hero";
import { Footer } from "@/components/footer/footer";
import { AnimatedBackground } from "@/components/ui/client-components";
import { AlmanacaiMailAccess } from "@/components/ui/almanacai-mail-access";
import { LottieAnimation } from "@/components/ui/lottie-animations";

// Constants
import { colors, gradients } from "@/lib/constants/theme";
import {
  fadeInUpViewport,
  fadeInUpDelayed,
  fadeInLeft,
  fadeInRight,
} from "@/lib/constants/animations";

export function HomeClient() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Introduction Section */}
      <section
        data-navbar-theme="light"
        id="features"
        className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: colors.background.cream }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            {...fadeInUpViewport}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Quote */}
            <div className="mb-12 relative">
              <div
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-10"
                style={{ color: colors.primary.mediumBrown }}
              >
                <svg
                  width="80"
                  height="60"
                  viewBox="0 0 80 60"
                  fill="currentColor"
                >
                  <path d="M0 30C0 13.4315 13.4315 0 30 0C46.5685 0 60 13.4315 60 30V60H30C13.4315 60 0 46.5685 0 30Z" />
                </svg>
              </div>
              <p
                className="text-2xl lg:text-3xl italic relative z-10"
                style={{ color: colors.primary.darkBrown, lineHeight: "1.6" }}
              >
                "Time spent planning is time stolen from doing."
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center mb-12">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-stone-400 to-transparent"></div>
              <div
                className="mx-4 w-2 h-2 rounded-full"
                style={{ backgroundColor: colors.primary.lightBrown }}
              ></div>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-stone-400 to-transparent"></div>
            </div>

            {/* Main Description */}
            <motion.div {...fadeInUpDelayed} className="space-y-6">
              <h2
                className="text-3xl lg:text-4xl mb-8"
                style={{ color: colors.stone[800] }}
              >
                AlmanacAI is the{" "}
                <span style={{ color: colors.primary.mediumBrown }}>
                  autonomous layer of intelligence
                </span>{" "}
                that sits on top of your digital environment.
              </h2>

              <p
                className="text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed"
                style={{ color: colors.stone[700] }}
              >
                It works in the background, observing, aggregating and
                organizing signals across your tools, turning them into{" "}
                <span style={{ color: colors.stone[800] }}>clear actions</span>.
              </p>

              <p
                className="text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed"
                style={{ color: colors.stone[700] }}
              >
                It becomes invisible infrastructure for execution, quietly
                supporting{" "}
                <span style={{ color: colors.stone[800] }}>
                  a high-performance life
                </span>
                .
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        data-navbar-theme="light"
        className="py-24 relative overflow-hidden"
        style={{
          background: gradients.background,
        }}
      >
        <AnimatedBackground variant="simple" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Feature 1 - AlmanacAI thinks so you don't have to */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-32">
            <motion.div {...fadeInLeft} className="order-2 lg:order-1">
              <div className="px-2 sm:px-4 md:px-6 lg:px-8">
                <div className="flex items-start gap-3 mb-4">
                  <Brain
                    className="w-8 h-8 mt-1 flex-shrink-0"
                    style={{ color: colors.primary.mediumBrown }}
                  />
                  <h3
                    className="text-3xl lg:text-4xl"
                    style={{ color: colors.stone[800] }}
                  >
                    It thinks so you don't have to
                  </h3>
                </div>
                <div
                  className="space-y-4 text-lg leading-relaxed sm:pl-11"
                  style={{ color: colors.stone[700] }}
                >
                  <p>
                    You don't start your day by planning. AlmanacAI{" "}
                    <span style={{ color: colors.stone[800] }}>
                      does it for you.
                    </span>{" "}
                    It organizes your day around what matters to you.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              {...fadeInRight}
              className="order-1 lg:order-2 flex justify-center"
            >
              <LottieAnimation
                animationPath="/animations/feature1.json"
                className="w-full md:max-w-sm lg:max-w-lg h-auto"
                loop={false}
              />
            </motion.div>
          </div>

          {/* Feature 2 - Automatically captures every task */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-32">
            <motion.div {...fadeInLeft} className="flex justify-center">
              <LottieAnimation
                animationPath="/animations/feature2.json"
                className="w-full md:max-w-sm lg:max-w-lg h-auto"
                loop={true}
              />
            </motion.div>
            <motion.div {...fadeInRight}>
              <div className="px-2 sm:px-4 md:px-6 lg:px-8">
                <div className="flex items-start gap-3 mb-4">
                  <Zap
                    className="w-8 h-8 mt-1 flex-shrink-0"
                    style={{ color: colors.primary.mediumBrown }}
                  />
                  <h3
                    className="text-3xl lg:text-4xl"
                    style={{ color: colors.stone[800] }}
                  >
                    Automatically captures tasks
                  </h3>
                </div>
                <div
                  className="space-y-4 text-lg leading-relaxed sm:pl-11"
                  style={{ color: colors.stone[700] }}
                >
                  <p>
                    Emails, messages, meetings, and reminders,{" "}
                    <span style={{ color: colors.stone[800] }}>
                      all captured automatically.
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Feature 3 - Real-time dynamic updates */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-32">
            <motion.div {...fadeInLeft} className="order-2 lg:order-1">
              <div className="px-2 sm:px-4 md:px-6 lg:px-8">
                <div className="flex items-start gap-3 mb-4">
                  <motion.svg
                    className="w-8 h-8 mt-1 flex-shrink-0"
                    style={{ color: colors.primary.mediumBrown }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </motion.svg>
                  <h3
                    className="text-3xl lg:text-4xl"
                    style={{ color: colors.stone[800] }}
                  >
                    Real-time, self updating
                  </h3>
                </div>
                <div
                  className="space-y-4 text-lg leading-relaxed sm:pl-11"
                  style={{ color: colors.stone[700] }}
                >
                  <p>
                    Plans change,{" "}
                    <span style={{ color: colors.stone[800] }}>
                      AlmanacAI keeps up.
                    </span>{" "}
                    New meetings, delays, or reschedules automatically updated.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              {...fadeInRight}
              className="order-1 lg:order-2 flex justify-center"
            >
              <LottieAnimation
                animationPath="/animations/feature3.json"
                className="w-full md:max-w-sm lg:max-w-lg h-auto"
                loop={false}
              />
            </motion.div>
          </div>

          {/* Feature 4 - Learns your patterns */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-32">
            <motion.div {...fadeInLeft}>
              <LottieAnimation
                animationPath="/animations/feature4.json"
                className="w-full md:max-w-sm lg:max-w-lg h-auto"
                loop={false}
              />
            </motion.div>
            <motion.div {...fadeInRight}>
              <div className="px-2 sm:px-4 md:px-6 lg:px-8">
                <div className="flex items-start gap-3 mb-4">
                  <motion.svg
                    className="w-8 h-8 mt-1 flex-shrink-0"
                    style={{ color: colors.primary.mediumBrown }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </motion.svg>
                  <h3
                    className="text-3xl lg:text-4xl"
                    style={{ color: colors.stone[800] }}
                  >
                    Learns your patterns. Adapts to your rhythm.
                  </h3>
                </div>
                <div
                  className="space-y-4 text-lg leading-relaxed sm:pl-11"
                  style={{ color: colors.stone[700] }}
                >
                  <p>
                    AlmanacAI improves with you. It learns how you communicate,
                    your priorities, the way you function -{" "}
                    <span style={{ color: colors.stone[800] }}>
                      continuously refining itself.
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Feature 5 - Transparent. Private. Yours. */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...fadeInLeft} className="order-2 lg:order-1">
              <div className="px-2 sm:px-4 md:px-6 lg:px-8">
                <div className="flex items-start gap-3 mb-4">
                  <Lock
                    className="w-8 h-8 mt-1 flex-shrink-0"
                    style={{ color: colors.primary.mediumBrown }}
                  />
                  <h3
                    className="text-3xl lg:text-4xl"
                    style={{ color: colors.stone[800] }}
                  >
                    Transparent. Private. Yours.
                  </h3>
                </div>
                <div
                  className="space-y-4 text-lg leading-relaxed sm:pl-11"
                  style={{ color: colors.stone[700] }}
                >
                  <p>
                    The{" "}
                    <span style={{ color: colors.stone[800] }}>
                      Monitor Dashboard
                    </span>{" "}
                    shows exactly what AlmanacAI observes, so you decide what it
                    can access. Your data follows your order.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              {...fadeInRight}
              className="order-1 lg:order-2 flex justify-center"
            >
              <LottieAnimation
                animationPath="/animations/feature5.json"
                className="w-full md:max-w-sm lg:max-w-lg h-auto"
                loop={false}
              />
            </motion.div>
          </div>

          {/* Multi-device icons */}
          <div className="flex items-center justify-center gap-4 mt-8 mb-16">
            <Monitor
              className="w-8 h-8"
              style={{ color: colors.primary.mediumBrown }}
            />
            <Tablet
              className="w-7 h-7"
              style={{ color: colors.primary.mediumBrown }}
            />
            <Smartphone
              className="w-6 h-6"
              style={{ color: colors.primary.mediumBrown }}
            />
          </div>

          {/* CTA Section */}
          <motion.div
            {...fadeInUpViewport}
            className="text-center pt-8 border-t border-stone-200"
          >
            <h3
              className="text-2xl lg:text-3xl mb-6 pb-8"
              style={{ color: colors.primary.darkBrown }}
            >
              <i>And yet, it's simply a to-do list</i>. 😉
            </h3>

            <AlmanacaiMailAccess variant="light" />
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section
        data-navbar-theme="light"
        id="about"
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: colors.background.offWhite }}
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl mb-8"
            style={{ color: colors.primary.mediumBrown }}
          >
            Almanac Research
          </h2>

          <div
            className="space-y-6 text-lg leading-relaxed"
            style={{ color: colors.stone[700] }}
          >
            <p>
              Almanac Research is building{" "}
              <span style={{ color: colors.primary.mediumBrown }}>
                Digital Ambient Intelligence -
              </span>{" "}
              AI systems that operate quietly in the background.
            </p>

            <p>
              This will represent the next phase of Human-AI collaboration:
              technology that quietly amplifies human ability by reducing
              cognitive load.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
