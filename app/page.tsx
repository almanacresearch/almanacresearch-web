"use client";

// External libraries
import { motion } from "motion/react";
import { Brain, Zap, Lock } from "lucide-react";

// Components
import { Nav } from "@/components/nav/nav";
import { Hero } from "@/components/hero/hero";
import { Footer } from "@/components/footer/footer";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { GlassCard } from "@/components/ui/glass-card";
import { AlmanacaiGmailAccess } from "@/components/ui/almanacai-gmail-access";

// Constants
import { colors, gradients } from "@/lib/constants/theme";
import {
  fadeInUpViewport,
  fadeInUpDelayed,
  fadeInLeft,
  fadeInRight,
} from "@/lib/constants/animations";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: colors.background.offWhite,
        color: colors.stone[900],
      }}
    >
      {/* Navigation */}
      <Nav />

      {/* Hero Section */}
      <Hero />

      {/* Introduction Section */}
      <section
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
                style={{ color: colors.stone[900] }}
              >
                AlmanacAI is the{" "}
                <span style={{ color: colors.primary.mediumBrown }}>
                  autonomous layer of intelligence
                </span>{" "}
                that sits on top of every application you use.
              </h2>

              <p
                className="text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed"
                style={{ color: colors.stone[700] }}
              >
                It becomes the{" "}
                <span style={{ color: colors.stone[900] }}>
                  invisible infrastructure of a high-performance life
                </span>
                , the background intelligence behind every great performer.
              </p>

              <p
                className="text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed"
                style={{ color: colors.stone[700] }}
              >
                AlmanacAI observes, aggregates, and organizes signals from
                across your digital environment, and presents them as{" "}
                <span style={{ color: colors.stone[900] }}>
                  clean, actionable tasks
                </span>
                .
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          background: gradients.background,
        }}
      >
        {/* Ambient background elements */}
        <AnimatedBackground variant="simple" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Feature 1 - AlmanacAI thinks so you don't have to */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-32">
            <motion.div {...fadeInLeft} className="order-2 lg:order-1">
              <div className="flex items-start gap-3 mb-4">
                <Brain
                  className="w-8 h-8 mt-1"
                  style={{ color: colors.primary.mediumBrown }}
                />
                <h3
                  className="text-3xl lg:text-4xl"
                  style={{ color: colors.stone[900] }}
                >
                  AlmanacAI thinks so you don't have to
                </h3>
              </div>
              <div
                className="space-y-4 text-md leading-relaxed"
                style={{ color: colors.stone[700] }}
              >
                <p>
                  You don't need to make a to-do list first thing in the
                  morning. AlmanacAI quietly does it for you — reading signals
                  across your tools, it organizes your entire day, all by
                  itself.
                </p>
                <p>
                  It knows whats important to you, what needs to be done, and
                  when.
                </p>
              </div>
            </motion.div>
            <motion.div {...fadeInRight} className="order-1 lg:order-2">
              <GlassCard placeholder="[Graphic Placeholder: Dashboard showing unified task view from multiple apps]" />
            </motion.div>
          </div>

          {/* Feature 2 - Automatically captures every task */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard placeholder="[Animation Placeholder: Real-time task extraction from email, Slack, meeting]" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-start gap-3 mb-4">
                <Zap
                  className="w-8 h-8 mt-1"
                  style={{ color: colors.primary.mediumBrown }}
                />
                <h3
                  className="text-3xl lg:text-4xl"
                  style={{ color: colors.stone[900] }}
                >
                  Automatically captures every task
                </h3>
              </div>
              <div
                className="space-y-4 text-lg leading-relaxed"
                style={{ color: colors.stone[700] }}
              >
                <p>Slack DM? New email?</p>
                <p>
                  It connects with your{" "}
                  <span style={{ color: colors.stone[900] }}>
                    Outlook, Gmail, Slack, Calendar, Zoom, Teams
                  </span>{" "}
                  and brings it all together.
                </p>
                <p>
                  AlmanacAI reads between lines, everything important — meeting,
                  email, message, reminder is transformed into clear actionable
                  to-dos.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Feature 3 - Real-time dynamic updates */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="flex items-start gap-3 mb-4">
                <motion.svg
                  className="w-8 h-8 mt-1"
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
                  style={{ color: colors.stone[900] }}
                >
                  Real-time dynamic updates
                </h3>
              </div>
              <div
                className="space-y-4 text-lg leading-relaxed"
                style={{ color: colors.stone[700] }}
              >
                <p>Plans change? — AlmanacAI keeps up.</p>
                <p>
                  If a new meeting appears, a plan gets delayed, or you
                  reschedule something, it updates itself, instantly.
                </p>
                <p>
                  No manual edits. No mental juggling. Just{" "}
                  <span style={{ color: colors.stone[900] }}>
                    perfect, real-time alignment
                  </span>{" "}
                  with your life.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <GlassCard placeholder="[Animation Placeholder: Live sync across devices with task updates]" />
            </motion.div>
          </div>

          {/* Feature 4 - Learns your patterns */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard placeholder="[Graphic Placeholder: AI learning patterns, adaptive task scheduling]" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-start gap-3 mb-4">
                <motion.svg
                  className="w-8 h-8 mt-1"
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
                  style={{ color: colors.stone[900] }}
                >
                  Learns your patterns. Adapts to your rhythm.
                </h3>
              </div>
              <div
                className="space-y-4 text-lg leading-relaxed"
                style={{ color: colors.stone[700] }}
              >
                <p>The more you use it, the smarter it becomes.</p>
                <p>
                  AlmanacAI learns what's important to you. The way you talk,
                  the things you prioritize, — and creates and orders your tasks
                  a little better each time.
                </p>
                <p>
                  It evolves with you.{" "}
                  <span style={{ color: colors.stone[900] }}>
                    Every day feels smoother than the last.
                  </span>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Feature 5 - Transparent. Private. Yours. */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="flex items-start gap-3 mb-4">
                <Lock
                  className="w-8 h-8 mt-1"
                  style={{ color: colors.primary.mediumBrown }}
                />
                <h3
                  className="text-3xl lg:text-4xl"
                  style={{ color: colors.stone[900] }}
                >
                  Transparent. Private. Yours.
                </h3>
              </div>
              <div
                className="space-y-4 text-lg leading-relaxed"
                style={{ color: colors.stone[700] }}
              >
                <p>Perhaps the most important one. YOU CONTROL. ALWAYS.</p>
                <p>
                  The{" "}
                  <span style={{ color: colors.stone[900] }}>
                    Monitor Dashboard
                  </span>{" "}
                  shows exactly what AlmanacAI is tracking — from emails to DMs
                  — so you decide what you want it to see.
                </p>
                <p>
                  Your data, your rules. AlmanacAI works{" "}
                  <span style={{ color: colors.stone[900] }}>
                    for you, not on you
                  </span>
                  .
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <GlassCard placeholder="[Graphic Placeholder: Monitor Dashboard with privacy controls]" />
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-center mt-32 pt-16 border-t border-stone-200"
          >
            <h3
              className="text-2xl lg:text-3xl mb-6 pb-16"
              style={{ color: colors.primary.darkBrown }}
            >
              <i>And yet, it's simply a to-do list</i>. 😉
            </h3>

            <AlmanacaiGmailAccess variant="light" />
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section
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
              Almanac Research is redefining how humans and AI collaborate with
              its Digital Ambient Intelligence systems in what we call{" "}
              <i style={{ color: colors.primary.mediumBrown }}>
                "The next phase of Human-AI collaboration"
              </i>
              .
            </p>

            <p>
              We are an AI Research Lab focused on deep, fundamental research to
              push the boundaries of AI. We work to build systems that
              meaningfully improve how people live.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
