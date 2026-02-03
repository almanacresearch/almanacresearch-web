"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { AnimatedBackground } from "@/components/ui/client-components";
import { AnnouncementBanner } from "@/components/ui/announcement-banner";
import { BackLink } from "@/components/ui/back-link";
import { UserProfileMenu } from "@/components/ui/user-profile-menu";
import { Button } from "@/components/ui/button";
import { colors, gradients } from "@/lib/constants/theme";
import { signInWithGoogle, useUser } from "@/lib/auth";

const mainUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.almanacresearch.com";

const CHROME_EXTENSION_URL =
  "https://chromewebstore.google.com/detail/kacdknlbcjenabaknpgddhcfbmaokdjo";

const FEATURES = [
  "Know what needs you today. AlmanacAI figures out what's important to you.",
  "Meetings, bills, reminders. All in the right place.",
  "Clean, minimal interface. Everything you need, nothing you don't.",
  "Gets smarter over time. The more you use it, the better it knows you.",
  "Private by design. Your emails stay yours.",
];

export default function AppMvpSubdomainHome() {
  const { user } = useUser();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  const handleDownloadClick = () => {
    window.open(CHROME_EXTENSION_URL, "_blank", "noopener,noreferrer");
    setShowThanks(true);
    setTimeout(() => setShowThanks(false), 5000);
  };

  // CTA component based on user state
  const renderCTA = () => {
    if (!user) {
      return (
        <Button
          onClick={() => signInWithGoogle()}
          className="group px-8 py-4 rounded-lg h-auto transition-all duration-300 flex items-center gap-3 hover:scale-105"
          style={{
            background: gradients.primary,
            color: colors.background.white,
            boxShadow: "0 10px 30px rgba(120, 82, 62, 0.4)",
          }}
        >
          <span className="text-lg">Sign in to get started</span>
        </Button>
      );
    }

    return (
      <div className="flex flex-col items-center gap-3">
        <Button
          onClick={handleDownloadClick}
          className="group px-8 py-4 rounded-lg h-auto transition-all duration-300 flex items-center gap-3 hover:scale-105"
          style={{
            background: gradients.primary,
            color: colors.background.white,
            boxShadow: "0 10px 30px rgba(120, 82, 62, 0.4)",
          }}
        >
          <Download className="w-5 h-5" />
          <span className="text-lg">Download Extension</span>
        </Button>
        <AnimatePresence>
          {showThanks && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-sm font-medium"
              style={{ color: colors.primary.mediumBrown }}
            >
              Thanks for trying AlmanacAI Mail!
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background.offWhite }}
    >
      {/* Announcement Banner */}
      <AnnouncementBanner message="We're completing final compliance and verification checks before launching our MVP. This helps ensure a safe and reliable experience for everyone. We'll share the new launch date shortly." />

      {/* Profile Menu - Top Right */}
      <div
        className="fixed right-6 md:right-10 z-20"
        style={{ top: "calc(var(--announcement-banner-height, 0px) + 12px)" }}
      >
        <UserProfileMenu variant="light" />
      </div>

      {/* Header - ALMANAC RESEARCH */}
      <motion.div
        className="relative z-10 pt-16 pb-2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <p
          className="text-sm tracking-[0.3em] uppercase"
          style={{ color: colors.primary.mediumBrown }}
        >
          ALMANAC RESEARCH
        </p>
      </motion.div>

      {/* Hero Section - Centered */}
      <section className="relative z-10 pt-4 pb-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <motion.h1
            className="text-4xl lg:text-6xl mb-2 text-center"
            style={{ color: colors.primary.darkBrown }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            AlmanacAI Mail
          </motion.h1>

          {/* Launching Soon */}
          <motion.p
            className="text-xl lg:text-2xl mb-6 text-center"
            style={{ color: colors.stone[600] }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Launching Soon
          </motion.p>

          {/* Value Proposition */}
          <motion.p
            className="text-lg lg:text-xl leading-relaxed text-center max-w-3xl mx-auto mb-12"
            style={{ color: colors.stone[700] }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span style={{ color: colors.primary.darkBrown, fontWeight: 600 }}>
              AlmanacAI Mail
            </span>{" "}
            is the invite-only MVP of AlmanacAI, to be released to a small group
            of early users to test how AlmanacAI performs in the real world. You
            can request an invite code at{" "}
            <a
              href="mailto:hello@almanacresearch.com?subject=Request%20for%20Invite%20Code&body=I'd%20like%20to%20try%20AlmanacAI%20Mail."
              className="hover:underline"
              style={{ color: colors.primary.darkBrown }}
            >
              hello@almanacresearch.com
            </a>
            .
          </motion.p>

          {/* Image - Centered */}
          <motion.div
            className="relative mx-auto"
            style={{ aspectRatio: "3288/2313" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {!imageLoaded && (
              <div className="absolute inset-0 rounded-lg shimmer" />
            )}
            <Image
              src="/images/mvp.png"
              alt="AlmanacAI Mail MVP"
              width={3288}
              height={2313}
              className={`w-full h-auto transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              style={{
                filter:
                  "drop-shadow(0 25px 50px rgba(120, 82, 62, 0.25)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15))",
              }}
              onLoad={() => setImageLoaded(true)}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-lg lg:text-xl italic text-center mt-8 tracking-wide font-light"
            style={{ color: colors.primary.darkBrown }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Designed to feel effortless.
          </motion.p>
        </div>
      </section>

      {/* Features Section - Strip Box */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl lg:text-4xl mb-8"
            style={{ color: colors.primary.darkBrown }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Features
          </motion.h2>
          <motion.ul
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {FEATURES.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-lg"
                style={{ color: colors.stone[700] }}
              >
                <span
                  className="mt-2 w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: colors.primary.gold }}
                />
                {feature}
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Technical Documentation */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <AnimatedBackground variant="simple" />
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-3xl lg:text-4xl mb-4"
              style={{ color: colors.primary.darkBrown }}
            >
              Technical Documentation
            </h2>
            <p className="text-lg mb-6" style={{ color: colors.stone[600] }}>
              Curious about how we built this? Dive into our technical docs for
              architecture details, privacy guarantees, and more.
            </p>
            <a
              href="https://docs.almanacresearch.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lg font-medium transition-all duration-200 hover:scale-105"
              style={{ color: colors.primary.darkBrown }}
            >
              Read the docs
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Note */}
      <section
        className="relative z-10 py-16 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: colors.background.cream }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-3xl lg:text-4xl mb-8"
              style={{ color: colors.primary.darkBrown }}
            >
              Note
            </h2>
            <div
              className="space-y-6 text-lg leading-relaxed"
              style={{ color: colors.stone[700] }}
            >
              <p>First versions are often rough. That's intentional.</p>
              <p>
                User-centric tools like Gmail are deeply personal. They differ
                from person to person. Edge cases are inevitable.
              </p>
              <p>
                AlmanacAI, by design, is completely private. That means we can't
                see how it performs unless you tell us. It can improve only
                through real usage and real feedback.
              </p>
              <p style={{ color: colors.primary.darkBrown, fontWeight: 500 }}>
                Your input shapes what this becomes.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          ></motion.div>
        </div>
      </section>

      {/* Back Link */}
      <div className="relative z-10 pb-8">
        <BackLink href={mainUrl} />
      </div>
    </div>
  );
}
