"use client";

import { motion } from "motion/react";
import { AnimatedBackground } from "@/components/ui/client-components";
import { BackLink } from "@/components/ui/back-link";
import { WriteToUsForm } from "@/components/forms/write-to-us-form";
import { colors, gradients, rgba } from "@/lib/constants/theme";
import {
  fadeInHero,
  fadeIn,
  fadeInUpViewportOnce,
  fadeInLeftViewportOnce,
  fadeInRightViewportOnce,
} from "@/lib/constants/animations";

export default function AboutUs() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background.offWhite }}
    >
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <AnimatedBackground variant="simple" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div {...fadeInHero} className="text-center">
            <motion.p
              className="text-sm tracking-[0.3em] mb-6 uppercase"
              style={{ color: colors.primary.mediumBrown }}
              {...fadeIn}
            >
              ALMANAC RESEARCH
            </motion.p>
            <motion.h1
              className="text-5xl lg:text-7xl mb-8"
              style={{
                color: colors.primary.darkBrown,
                lineHeight: "1.2",
              }}
              {...fadeInHero}
              transition={{ ...fadeInHero.transition, delay: 0.2 }}
            >
              Building the AI Infrastructure
              <br />
              <span
                style={{
                  background: gradients.hero,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                of Future
              </span>
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* About Almanac Research */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            {...fadeInUpViewportOnce}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2
              className="text-4xl lg:text-5xl mb-8"
              style={{ color: colors.primary.darkBrown }}
            >
              Who We Are
            </h2>
          </motion.div>

          <motion.div
            {...fadeInUpViewportOnce}
            transition={{ duration: 1, delay: 0.6 }}
            className="space-y-6 text-lg lg:text-xl leading-relaxed"
            style={{ color: colors.stone[700] }}
          >
            <p>
              <span style={{ color: colors.stone[800] }}>Almanac Research</span>{" "}
              is an AI research lab and software development company focused on
              building the next generation of artificial intelligence
              infrastructure.
            </p>
            <p>
              We're a team of researchers, engineers, and designers who believe
              technology should quietly amplify human ability - not demand
              attention, add complexity, or create noise.
            </p>
            <p>
              Grounded in deep research across AI, human behavior, and cognitive
              science, we build systems that blend into your life empowering you
              to do more, learn more and live more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About AlmanacAI Product */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: colors.background.cream }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInLeftViewportOnce} className="relative">
              <div
                className="relative overflow-hidden rounded-3xl p-10 lg:p-12"
                style={{
                  background: `linear-gradient(135deg, ${rgba(colors.primary.darkBrown, 0.9)} 0%, ${rgba(colors.primary.mediumBrown, 0.95)} 100%)`,
                  boxShadow: `0 20px 60px ${rgba(colors.primary.darkBrown, 0.3)}`,
                }}
              >
                <div className="relative z-10">
                  <h2
                    className="text-4xl lg:text-5xl mb-6 italic"
                    style={{ color: colors.background.cream }}
                  >
                    Story
                  </h2>
                  <div
                    className="space-y-4 text-lg italic"
                    style={{
                      color: `rgba(250, 249, 247, 0.9)`,
                    }}
                  >
                    <p>
                      Cal Newport emphasizes in <b>Deep Work</b>, meaningful
                      work requires uninterrupted focus. He explains, every time
                      we switch between tasks, our brain pays a “switching
                      cost.”
                    </p>
                    <p>
                      Focus needs clarity. And clarity comes when you know what
                      matters.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              {...fadeInRightViewportOnce}
              className="space-y-6 text-lg"
              style={{ color: colors.stone[700] }}
            >
              <p
                className="text-2xl"
                style={{ color: colors.primary.darkBrown }}
              >
                AlmanacAI
              </p>
              <p>
                An{" "}
                <span style={{ color: colors.stone[800] }}>
                  autonomous intelligence layer
                </span>{" "}
                that sits in the background. You don't plan - You do the work.
                And while you are doing your most meaningful work, it quietly
                brings together everything important and organizes them in one
                place.
              </p>
              <p>
                It provides clarity in chaos, structure in ambiguity, and focus
                in distraction.
              </p>
              <p>Just you, doing your best work. AlmanacAI handles the rest.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Principles - Horizontal List */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUpViewportOnce} className="text-center mb-20">
            <h2
              className="text-4xl lg:text-5xl mb-6"
              style={{ color: colors.primary.darkBrown }}
            >
              What We Stand For
            </h2>
          </motion.div>

          <motion.div
            {...fadeInUpViewportOnce}
            transition={{ ...fadeInUpViewportOnce.transition, delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-12"
          >
            {/* Principle 1 */}
            <div>
              <div
                className="mb-4"
                style={{
                  width: "4px",
                  height: "40px",
                  background: gradients.divider.toBottom,
                }}
              ></div>
              <h3 className="text-xl mb-3" style={{ color: colors.stone[800] }}>
                Complete Transparency
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: colors.stone[700] }}
              >
                You know and decide what you allow access to.
              </p>
            </div>

            {/* Principle 2 */}
            <div>
              <div
                className="mb-4"
                style={{
                  width: "4px",
                  height: "40px",
                  background: gradients.divider.toBottomAlt1,
                }}
              ></div>
              <h3 className="text-xl mb-3" style={{ color: colors.stone[800] }}>
                Customer First
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: colors.stone[700] }}
              >
                Every design decision starts with: "Does this make your life
                easier?"
              </p>
            </div>

            {/* Principle 3 */}
            <div>
              <div
                className="mb-4"
                style={{
                  width: "4px",
                  height: "40px",
                  background: gradients.divider.toBottomAlt2,
                }}
              ></div>
              <h3 className="text-xl mb-3" style={{ color: colors.stone[800] }}>
                Highest Quality
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: colors.stone[700] }}
              >
                Innovation guided by deep research, not trends.
              </p>
            </div>

            {/* Principle 4 */}
            <div>
              <div
                className="mb-4"
                style={{
                  width: "4px",
                  height: "40px",
                  background: gradients.divider.toBottomAlt3,
                }}
              ></div>
              <h3 className="text-xl mb-3" style={{ color: colors.stone[800] }}>
                Privacy-by-Design
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: colors.stone[700] }}
              >
                Privacy isn't a setting, it's the architecture.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Help Us Build - Interactive Section */}
      <section
        id="help-us-build"
        className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute top-0 right-0 w-96 h-96"
            style={{
              background: gradients.radialGoldFade,
              filter: "blur(80px)",
            }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div {...fadeInUpViewportOnce} className="text-center mb-12">
            <h2
              className="text-4xl lg:text-6xl mb-6"
              style={{ color: colors.primary.darkBrown }}
            >
              Help Us Build
              <br />
              <span
                style={{
                  background: gradients.heroAlt,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                AlmanacAI
              </span>
            </h2>
            <p
              className="text-xl max-w-2xl mx-auto"
              style={{ color: colors.stone[600] }}
            >
              Your insights shape the future of AlmanacAI. Tell us what you
              expect, what frustrates you, what you would like AlmanacAI to be.
            </p>
          </motion.div>

          <motion.div
            {...fadeInUpViewportOnce}
            transition={{ ...fadeInUpViewportOnce.transition, delay: 0.2 }}
          >
            <WriteToUsForm />
          </motion.div>
        </div>
      </section>

      {/* Contact Section - Simple Email */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUpViewportOnce} className="text-center">
            <h2
              className="text-4xl lg:text-5xl mb-8"
              style={{ color: colors.primary.darkBrown }}
            >
              Get in Touch
            </h2>
            <motion.a
              href="mailto:hello@almanacresearch.com"
              className="inline-block text-2xl lg:text-3xl transition-all hover:scale-105"
              style={{
                background: gradients.hero,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              whileHover={{ y: -2 }}
            >
              hello@almanacresearch.com
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Back to Home */}
      <BackLink />
    </div>
  );
}
