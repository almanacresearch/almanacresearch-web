"use client";

import { useState, FormEvent, SetStateAction } from "react";
import { Hero } from "@/components/hero/hero";
import { Nav } from "@/components/nav/nav";
import { Footer } from "@/components/footer/footer";
import { motion } from "motion/react";
import { Brain, Zap, Lock } from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value.trim();

    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch("/api/join-beta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Something went wrong");
      }

      const data = await res.json();

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting email:", error);
      alert("Failed to submit email. Please try again after some time.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900">
      {/* Navigation */}
      <Nav />

      {/* Hero Section */}
      <Hero />

      {/* Introduction Section */}
      <section
        id="features"
        className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#f5ede1" }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Quote */}
            <div className="mb-12 relative">
              <div
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-10"
                style={{ color: "#92664F" }}
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
                style={{ color: "#78523E", lineHeight: "1.6" }}
              >
                "Time spent planning for the task is time stolen from doing the
                task."
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center mb-12">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-stone-400 to-transparent"></div>
              <div
                className="mx-4 w-2 h-2 rounded-full"
                style={{ backgroundColor: "#A0725D" }}
              ></div>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-stone-400 to-transparent"></div>
            </div>

            {/* Main Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h2
                className="text-3xl lg:text-4xl mb-8"
                style={{ color: "#57534e" }}
              >
                AlmanacAI is the{" "}
                <span style={{ color: "#92664F" }}>
                  autonomous layer of productivity
                </span>{" "}
                that sits on top of every application you use.
              </h2>

              <p className="text-lg lg:text-xl text-stone-700 max-w-4xl mx-auto leading-relaxed">
                It becomes the{" "}
                <span className="text-stone-900">
                  invisible infrastructure of a high-performance life
                </span>
                , the background intelligence behind every great performer.
              </p>

              <p className="text-lg lg:text-xl text-stone-700 max-w-4xl mx-auto leading-relaxed">
                AlmanacAI silently observes, aggregates, and organizes signals
                from across your digital environment, and presents them as{" "}
                <span className="text-stone-900">clean, actionable tasks</span>.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #faf8f5 0%, #ffffff 50%, #f5ede1 100%)",
        }}
      >
        {/* Ambient background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
            style={{
              background:
                "radial-gradient(circle, #C4A57B 0%, transparent 70%)",
              animationDuration: "4s",
            }}
          ></div>
          <div
            className="absolute bottom-40 right-20 w-80 h-80 rounded-full opacity-20 blur-3xl animate-pulse"
            style={{
              background:
                "radial-gradient(circle, #92664F 0%, transparent 70%)",
              animationDuration: "6s",
            }}
          ></div>
          <div
            className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full opacity-10 blur-2xl animate-pulse"
            style={{
              background:
                "radial-gradient(circle, #A0725D 0%, transparent 70%)",
              animationDuration: "5s",
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Feature 1 - AlmanacAI thinks so you don't have to */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="flex items-start gap-3 mb-4">
                <Brain className="w-8 h-8 mt-1" style={{ color: "#92664F" }} />
                <h3
                  className="text-3xl lg:text-4xl"
                  style={{ color: "#57534e" }}
                >
                  AlmanacAI thinks so you don't have to
                </h3>
              </div>
              <div className="space-y-4 text-lg text-stone-600 leading-relaxed">
                <p>
                  You don't have to build a to-do list. You don't have to open 6
                  apps to know what's next.
                </p>
                <p>
                  AlmanacAI quietly works in the background — observing your
                  digital workspace and building your entire day for you,
                  automatically.
                </p>
                <p>
                  It connects with your{" "}
                  <span className="text-stone-900">
                    Outlook, Gmail, Slack, Calendar, Zoom, Teams
                  </span>{" "}
                  — everything. Every meeting, email, message, and reminder is
                  transformed into one clear, living plan.
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
              {/* Liquid Glass Card */}
              <motion.div
                className="max-w-md mx-auto h-64 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(245, 237, 225, 0.5) 0%, rgba(250, 246, 239, 0.6) 50%, rgba(245, 237, 225, 0.4) 100%)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  boxShadow:
                    "0 8px 32px 0 rgba(120, 82, 62, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 0 rgba(146, 102, 79, 0.1)",
                }}
              >
                {/* Glass reflection layers */}
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, transparent 50%, rgba(196, 165, 123, 0.2) 100%)",
                  }}
                ></div>

                {/* Shimmer effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background:
                      "linear-gradient(110deg, transparent 25%, rgba(255, 255, 255, 0.5) 50%, transparent 75%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 3s infinite",
                  }}
                ></div>

                {/* Floating orbs */}
                <div
                  className="absolute top-10 right-10 w-16 h-16 rounded-full opacity-30 blur-xl"
                  style={{
                    background: "radial-gradient(circle, #C4A57B, transparent)",
                  }}
                ></div>
                <div
                  className="absolute bottom-10 left-10 w-12 h-12 rounded-full opacity-20 blur-lg"
                  style={{
                    background: "radial-gradient(circle, #92664F, transparent)",
                  }}
                ></div>

                {/* Border gradient */}
                <div
                  className="absolute inset-0 rounded-[2.5rem] opacity-50"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(255, 255, 255, 0.8), transparent 30%, transparent 70%, rgba(146, 102, 79, 0.3))",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    padding: "1px",
                  }}
                ></div>

                <p className="text-stone-400 text-center px-8 relative z-10">
                  [Graphic Placeholder: Dashboard showing unified task view from
                  multiple apps]
                </p>
              </motion.div>
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
              {/* Liquid Glass Card */}
              <motion.div
                className="max-w-md mx-auto h-64 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(245, 237, 225, 0.5) 0%, rgba(250, 246, 239, 0.6) 50%, rgba(245, 237, 225, 0.4) 100%)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  boxShadow:
                    "0 8px 32px 0 rgba(120, 82, 62, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 0 rgba(146, 102, 79, 0.1)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, transparent 50%, rgba(196, 165, 123, 0.2) 100%)",
                  }}
                ></div>

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background:
                      "linear-gradient(110deg, transparent 25%, rgba(255, 255, 255, 0.5) 50%, transparent 75%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 3s infinite",
                  }}
                ></div>

                <div
                  className="absolute top-10 right-10 w-16 h-16 rounded-full opacity-30 blur-xl"
                  style={{
                    background: "radial-gradient(circle, #C4A57B, transparent)",
                  }}
                ></div>
                <div
                  className="absolute bottom-10 left-10 w-12 h-12 rounded-full opacity-20 blur-lg"
                  style={{
                    background: "radial-gradient(circle, #92664F, transparent)",
                  }}
                ></div>

                <div
                  className="absolute inset-0 rounded-[2.5rem] opacity-50"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(255, 255, 255, 0.8), transparent 30%, transparent 70%, rgba(146, 102, 79, 0.3))",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    padding: "1px",
                  }}
                ></div>

                <p className="text-stone-400 text-center px-8 relative z-10">
                  [Animation Placeholder: Real-time task extraction from email,
                  Slack, meeting]
                </p>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-start gap-3 mb-4">
                <Zap className="w-8 h-8 mt-1" style={{ color: "#92664F" }} />
                <h3
                  className="text-3xl lg:text-4xl"
                  style={{ color: "#57534e" }}
                >
                  Automatically captures every task
                </h3>
              </div>
              <div className="space-y-4 text-lg text-stone-600 leading-relaxed">
                <p>New email? New Slack DM? Meeting invite?</p>
                <p>
                  AlmanacAI reads between the lines and instantly creates
                  actionable to-dos —
                  <span className="text-stone-900">
                    {" "}
                    "Follow up with Sarah," "Review proposal at 4 PM," "Pay
                    subscription renewal," "Call Mom."
                  </span>
                </p>
                <p>
                  You'll never forget, miss, or overlook anything again —
                  because AlmanacAI sees it the moment it appears.
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
                  style={{ color: "#92664F" }}
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
                  style={{ color: "#57534e" }}
                >
                  Real-time dynamic updates
                </h3>
              </div>
              <div className="space-y-4 text-lg text-stone-600 leading-relaxed">
                <p>Your plans change — AlmanacAI keeps up.</p>
                <p>
                  If a new meeting appears, a message gets delayed, or you
                  reschedule something, your to-do list updates instantly across
                  every device.
                </p>
                <p>
                  No manual edits. No mental juggling. Just{" "}
                  <span className="text-stone-900">
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
              {/* Liquid Glass Card */}
              <motion.div
                className="max-w-md mx-auto h-64 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(245, 237, 225, 0.5) 0%, rgba(250, 246, 239, 0.6) 50%, rgba(245, 237, 225, 0.4) 100%)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  boxShadow:
                    "0 8px 32px 0 rgba(120, 82, 62, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 0 rgba(146, 102, 79, 0.1)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, transparent 50%, rgba(196, 165, 123, 0.2) 100%)",
                  }}
                ></div>

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background:
                      "linear-gradient(110deg, transparent 25%, rgba(255, 255, 255, 0.5) 50%, transparent 75%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 3s infinite",
                  }}
                ></div>

                <div
                  className="absolute top-10 right-10 w-16 h-16 rounded-full opacity-30 blur-xl"
                  style={{
                    background: "radial-gradient(circle, #C4A57B, transparent)",
                  }}
                ></div>
                <div
                  className="absolute bottom-10 left-10 w-12 h-12 rounded-full opacity-20 blur-lg"
                  style={{
                    background: "radial-gradient(circle, #92664F, transparent)",
                  }}
                ></div>

                <div
                  className="absolute inset-0 rounded-[2.5rem] opacity-50"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(255, 255, 255, 0.8), transparent 30%, transparent 70%, rgba(146, 102, 79, 0.3))",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    padding: "1px",
                  }}
                ></div>

                <p className="text-stone-400 text-center px-8 relative z-10">
                  [Animation Placeholder: Live sync across devices with task
                  updates]
                </p>
              </motion.div>
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
              {/* Liquid Glass Card */}
              <motion.div
                className="max-w-md mx-auto h-64 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(245, 237, 225, 0.5) 0%, rgba(250, 246, 239, 0.6) 50%, rgba(245, 237, 225, 0.4) 100%)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  boxShadow:
                    "0 8px 32px 0 rgba(120, 82, 62, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 0 rgba(146, 102, 79, 0.1)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, transparent 50%, rgba(196, 165, 123, 0.2) 100%)",
                  }}
                ></div>

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background:
                      "linear-gradient(110deg, transparent 25%, rgba(255, 255, 255, 0.5) 50%, transparent 75%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 3s infinite",
                  }}
                ></div>

                <div
                  className="absolute top-10 right-10 w-16 h-16 rounded-full opacity-30 blur-xl"
                  style={{
                    background: "radial-gradient(circle, #C4A57B, transparent)",
                  }}
                ></div>
                <div
                  className="absolute bottom-10 left-10 w-12 h-12 rounded-full opacity-20 blur-lg"
                  style={{
                    background: "radial-gradient(circle, #92664F, transparent)",
                  }}
                ></div>

                <div
                  className="absolute inset-0 rounded-[2.5rem] opacity-50"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(255, 255, 255, 0.8), transparent 30%, transparent 70%, rgba(146, 102, 79, 0.3))",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    padding: "1px",
                  }}
                ></div>

                <p className="text-stone-400 text-center px-8 relative z-10">
                  [Graphic Placeholder: AI learning patterns, adaptive task
                  scheduling]
                </p>
              </motion.div>
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
                  style={{ color: "#92664F" }}
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
                  style={{ color: "#57534e" }}
                >
                  Learns your patterns. Adapts to your rhythm.
                </h3>
              </div>
              <div className="space-y-4 text-lg text-stone-600 leading-relaxed">
                <p>The more you use it, the smarter it becomes.</p>
                <p>
                  AlmanacAI observes your habits — like when you check investing
                  apps, reply to messages, or prefer deep work — and reorders
                  your tasks to match your natural flow.
                </p>
                <p>
                  It evolves with you.{" "}
                  <span className="text-stone-900">
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
                <Lock className="w-8 h-8 mt-1" style={{ color: "#92664F" }} />
                <h3
                  className="text-3xl lg:text-4xl"
                  style={{ color: "#57534e" }}
                >
                  Transparent. Private. Yours.
                </h3>
              </div>
              <div className="space-y-4 text-lg text-stone-600 leading-relaxed">
                <p>You stay in control. Always.</p>
                <p>
                  The <span className="text-stone-900">Monitor Dashboard</span>{" "}
                  shows exactly what AlmanacAI is tracking — from emails to
                  meetings — and lets you toggle visibility for anything.
                </p>
                <p>
                  Your data, your rules. AlmanacAI works{" "}
                  <span className="text-stone-900">for you, not on you</span>.
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
              {/* Liquid Glass Card */}
              <motion.div
                className="max-w-md mx-auto h-64 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(245, 237, 225, 0.5) 0%, rgba(250, 246, 239, 0.6) 50%, rgba(245, 237, 225, 0.4) 100%)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  boxShadow:
                    "0 8px 32px 0 rgba(120, 82, 62, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 0 rgba(146, 102, 79, 0.1)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, transparent 50%, rgba(196, 165, 123, 0.2) 100%)",
                  }}
                ></div>

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background:
                      "linear-gradient(110deg, transparent 25%, rgba(255, 255, 255, 0.5) 50%, transparent 75%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 3s infinite",
                  }}
                ></div>

                <div
                  className="absolute top-10 right-10 w-16 h-16 rounded-full opacity-30 blur-xl"
                  style={{
                    background: "radial-gradient(circle, #C4A57B, transparent)",
                  }}
                ></div>
                <div
                  className="absolute bottom-10 left-10 w-12 h-12 rounded-full opacity-20 blur-lg"
                  style={{
                    background: "radial-gradient(circle, #92664F, transparent)",
                  }}
                ></div>

                <div
                  className="absolute inset-0 rounded-[2.5rem] opacity-50"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(255, 255, 255, 0.8), transparent 30%, transparent 70%, rgba(146, 102, 79, 0.3))",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    padding: "1px",
                  }}
                ></div>

                <p className="text-stone-400 text-center px-8 relative z-10">
                  [Graphic Placeholder: Monitor Dashboard with privacy controls]
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* CTA Section */}
          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="text-center mt-32 pt-16 border-t border-stone-200"
            >
              <h3
                className="text-2xl lg:text-3xl mb-6"
                style={{ color: "#78523E" }}
              >
                <i>And yet, it's simply a to-do list</i>. 😉
              </h3>

              <div className="max-w-xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e: {
                        target: { value: SetStateAction<string> };
                      }) => setEmail(e.target.value)}
                      className="w-full sm:flex-1 h-14 px-6 rounded-4xl border-2 transition-all duration-300 outline-none focus:ring-2 focus:ring-offset-2"
                      style={{
                        backgroundColor: "rgba(245, 245, 244, 0.95)",
                        borderColor: "#A0725D",
                        color: "#57534e",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                      required
                    />
                    <button
                      type="submit"
                      className="rounded-4xl px-10 h-14 whitespace-nowrap transition-all duration-300 border-2 border-stone-200/20 hover:scale-105"
                      style={{
                        background:
                          "linear-gradient(135deg, #78523E 0%, #92664F 50%, #A0725D 100%)",
                        boxShadow:
                          "0 6px 24px rgba(120, 82, 62, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                        color: "#FAF9F7",
                      }}
                    >
                      Join the Beta
                    </button>
                  </div>
                </form>
              </div>
              <div className="mt-4">
                <a
                  href="#enterprise"
                  className="inline-flex items-center transition-colors group"
                  style={{ color: "#E57373" }}
                >
                  <span className="hover:underline">
                    Enterprise? Register here →
                  </span>
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="pt-10 text-center font-semibold tracking-wide"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h3 className="text-3xl sm:text-4xl bg-gradient-to-r from-green-900 via-amber-800 to-lime-900 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(45,35,20,0.5)]">
                Thank you for registering!
              </h3>
              <p className="mt-2 text-lg sm:text-xl text-[#2e3b2f]">
                🚀 AlmanacAI Beta launching <b>March 1, 2026</b>
              </p>
              <p className="mt-3 text-lg sm:text-xl text-[#3b2f2a]">
                Please check your inbox and confirm your email and be among the
                first to experience a new phase of intelligent productivity.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#faf6ef]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl mb-8" style={{ color: "#92664F" }}>
            Almanac Research
          </h2>

          <div className="space-y-6 text-lg text-stone-700 leading-relaxed">
            <p>
              Almanac Research is redefining how humans and AI collaborate in
              what we call{" "}
              <i style={{ color: "#92664F" }}>
                "The next phase of Human-AI collaboration"
              </i>
              .
            </p>

            <p>
              Our mission is to build world's best products through sheer
              innovation and become the most trusted AI company.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
