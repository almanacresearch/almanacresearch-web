"use client";

import { motion } from "motion/react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { BackLink } from "@/components/ui/back-link";
import { WriteToUsForm } from "@/components/forms/write-to-us-form";
import { colors, gradients, rgba } from "@/lib/constants/theme";

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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            <motion.p
              className="text-sm tracking-[0.3em] mb-6 uppercase"
              style={{ color: colors.primary.mediumBrown }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              ALMANAC RESEARCH
            </motion.p>
            <motion.h1
              className="text-5xl lg:text-7xl mb-8"
              style={{
                color: colors.primary.darkBrown,
                lineHeight: "1.2",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="space-y-6 text-lg lg:text-xl leading-relaxed"
            style={{ color: colors.stone[700] }}
          >
            <p>
              <span style={{ color: colors.stone[900] }}>Almanac Research</span>{" "}
              is an AI research lab and software development company focused on
              building the next generation of artificial intelligence
              infrastructure.
            </p>
            <p>
              We're a team of researchers, engineers, and designers who believe
              technology should quietly amplify human ability — not demand
              attention, add complexity, or create noise.
            </p>
            <p>
              Grounded in deep research across AI, human productivity, and
              cognitive science, we build systems that blend into your life
              empowering you to do more, learn more and live more.
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
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
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
                      This started with a simple observation: every app wants
                      your attention. Every tool demands your time.
                      <span className="text-white italic"></span>
                    </p>
                    <p>
                      But productivity tools shouldn't right? I realized we were
                      spending more time planning our work than actually doing
                      it. Imagine if planning just... happened. And with the
                      breakthroughs in AI, and the right vision we can make it
                      happen.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 text-lg"
              style={{ color: colors.stone[700] }}
            >
              <p
                className="text-2xl"
                style={{ color: colors.primary.darkBrown }}
              >
                That's AlmanacAI.
              </p>
              <p>
                An{" "}
                <span style={{ color: colors.stone[900] }}>
                  autonomous intelligence layer
                </span>{" "}
                that sits in the background, watching your digital ecosystem,
                learning your patterns, and organizing your chaos into clarity.
              </p>
              <p>
                No more context switching. No more mental overhead. No more "let
                me just organize myself first."
              </p>
              <p className="text-xl italic text-stone-900">
                Just you, doing your best work. AlmanacAI handles the rest.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Principles - Horizontal List */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2
              className="text-4xl lg:text-5xl mb-6"
              style={{ color: colors.primary.darkBrown }}
            >
              What We Stand For
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
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
              <h3 className="text-xl mb-3" style={{ color: colors.stone[900] }}>
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
              <h3 className="text-xl mb-3" style={{ color: colors.stone[900] }}>
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
              <h3 className="text-xl mb-3" style={{ color: colors.stone[900] }}>
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
              <h3 className="text-xl mb-3" style={{ color: colors.stone[900] }}>
                Privacy-by-Design
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: colors.stone[700] }}
              >
                Privacy isn't a setting — it's the architecture.
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
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
              Your insights shape the future of productivity. Tell us what you
              expect, what frustrates you, what you would like AlmanacAI to be.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <WriteToUsForm />
          </motion.div>
        </div>
      </section>

      {/* Contact Section - Simple Email */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
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
