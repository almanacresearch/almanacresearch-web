"use client";

import { motion } from "motion/react";
import { Check, X, Sparkles, Building2, User } from "lucide-react";
import { BackLink } from "@/components/ui/back-link";
import { colors, gradients } from "@/lib/constants/theme";
import {
  fadeIn,
  fadeInUp,
  fadeInUpViewportOnce,
} from "@/lib/constants/animations";

const plans = [
  {
    name: "Personal",
    icon: User,
    price_anually: "$7",
    price_monthly: "$10",
    period: "per month",
    description: "Connect upto 5 applications for personal use",
    features: [
      { text: "Add upto 5 applications", included: true },
      { text: "One account per application", included: true },
      { text: "Manually create and add tasks", included: true },
      { text: "Seamless experience across devices", included: true },
      { text: "Email support", included: true },
      { text: "Monitor Dashboard", included: true },
      { text: "AI assistant", included: false },
      { text: "Summarized description", included: false },
    ],
    cta: "Get Started",
    highlighted: false,
    gradient: `linear-gradient(135deg, ${colors.primary.lightBrown} 0%, ${colors.primary.mediumBrown} 100%)`,
  },
  {
    name: "Individual",
    icon: Sparkles,
    price_anually: "$12",
    price_monthly: "$15",
    period: "per month",
    description: "For users who want the full AlmanacAI experience",
    features: [
      { text: "Unlimited applications", included: true },
      { text: "3 accounts per application", included: true },
      { text: "AI assisted task creation", included: true },
      { text: "Seamless experience across devices", included: true },
      { text: "Email support", included: true },
      { text: "Monitor Dashboard", included: true },
      { text: "Custom AI training", included: false },
      { text: "Dedicated account manager", included: false },
    ],
    cta: "Start Free Trial",
    highlighted: true,
    gradient: gradients.hero,
  },
  {
    name: "Enterprise",
    icon: Building2,
    price_anually: "Custom",
    period: "Contact Us",
    description: "Tailored solutions for teams and organizations",
    features: [
      { text: "Everything in Individual", included: true },
      { text: "Unlimited team members", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Custom AI training", included: true },
      { text: "Analytics Dashboard", included: true },
      { text: "Advanced security & compliance", included: true },
      { text: "SSO & SAML", included: true },
      { text: "SLA guarantee", included: true },
      { text: "On-premise deployment option", included: true },
    ],
    cta: "Contact Sales",
    highlighted: false,
    gradient: `linear-gradient(135deg, ${colors.primary.mediumBrown} 0%, ${colors.primary.darkBrown} 100%)`,
  },
];

export function PricingClient() {
  return (
    <>
      {/* Header Section */}
      <section
        data-navbar-theme="light"
        className="pt-32 pb-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.p
            className="text-sm tracking-[0.3em] mb-4 uppercase"
            style={{ color: colors.primary.mediumBrown }}
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.1 }}
          >
            ALMANAC RESEARCH
          </motion.p>

          <motion.h1
            className="text-5xl lg:text-7xl mb-6"
            style={{ color: colors.primary.darkBrown }}
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            Simple, Transparent Pricing
          </motion.h1>

          <motion.p
            className="text-xl lg:text-2xl max-w-3xl mx-auto"
            style={{ color: colors.stone[600] }}
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.3 }}
          >
            Choose the plan that's right for you. All plans include a 30-day
            free trial.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section data-navbar-theme="light" className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.name}
                  {...fadeInUp}
                  transition={{
                    ...fadeInUp.transition,
                    delay: 0.4 + index * 0.1,
                  }}
                  className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                    plan.highlighted
                      ? "shadow-2xl"
                      : "shadow-lg hover:shadow-xl"
                  }`}
                  style={{
                    backgroundColor: plan.highlighted
                      ? "#fff"
                      : colors.background.cream,
                    border: plan.highlighted
                      ? `2px solid ${colors.primary.gold}`
                      : `1px solid ${colors.stone[400]}`,
                  }}
                >
                  {plan.highlighted && (
                    <div
                      className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-sm tracking-wide"
                      style={{
                        background: plan.gradient,
                        color: colors.background.white,
                      }}
                    >
                      MOST POPULAR
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{
                      background: plan.gradient,
                    }}
                  >
                    <Icon
                      className="w-7 h-7"
                      style={{ color: colors.background.white }}
                    />
                  </div>

                  {/* Plan Name */}
                  <h3
                    className="text-3xl mb-2"
                    style={{ color: colors.primary.darkBrown }}
                  >
                    {plan.name}
                  </h3>

                  {/* Description */}
                  <p
                    className="mb-6 min-h-[3rem]"
                    style={{ color: colors.stone[600] }}
                  >
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-5xl"
                        style={{ color: colors.primary.darkBrown }}
                      >
                        {plan.price_anually}
                      </span>
                      {plan.period && (
                        <span style={{ color: colors.stone[600] }}>
                          {plan.period}
                        </span>
                      )}
                    </div>
                    {plan.price_monthly && (
                      <div className="mt-3 space-y-1">
                        <p
                          className="text-xs"
                          style={{ color: colors.stone[700] }}
                        >
                          {plan.price_anually}/month, billed annually
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: colors.stone[600] }}
                        >
                          {plan.price_monthly} when billed monthly
                        </p>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    className="w-full py-4 rounded-xl mb-8 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    style={{
                      background: plan.highlighted
                        ? plan.gradient
                        : "transparent",
                      color: plan.highlighted
                        ? colors.background.white
                        : colors.primary.darkBrown,
                      border: plan.highlighted
                        ? "none"
                        : `2px solid ${colors.primary.gold}`,
                    }}
                  >
                    {plan.cta}
                  </button>

                  {/* Features */}
                  <div className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{
                              backgroundColor: plan.highlighted
                                ? colors.primary.gold
                                : colors.primary.mediumBrown,
                            }}
                          >
                            <Check
                              className="w-3 h-3"
                              style={{ color: colors.background.white }}
                            />
                          </div>
                        ) : (
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{
                              backgroundColor: colors.stone[500],
                            }}
                          >
                            <X
                              className="w-3 h-3"
                              style={{ color: colors.stone[700] }}
                            />
                          </div>
                        )}
                        <span
                          style={{
                            color: feature.included
                              ? colors.stone[700]
                              : colors.stone[400],
                          }}
                        >
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Questions About Pricing */}
      <section
        data-navbar-theme="dark"
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: colors.primary.darkBrown }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...fadeInUpViewportOnce}
            className="flex flex-col items-center justify-center gap-6 text-center"
          >
            <h3
              className="text-2xl lg:text-3xl"
              style={{ color: colors.background.white }}
            >
              Questions about pricing?
            </h3>
            <button
              className="px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                backgroundColor: colors.primary.gold,
                color: colors.primary.darkBrown,
              }}
            >
              Contact Sales
            </button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section data-navbar-theme="light" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUpViewportOnce}>
            <h2
              className="text-4xl lg:text-5xl mb-6"
              style={{ color: colors.primary.darkBrown }}
            >
              Ready to get started?
            </h2>
            <p className="text-xl mb-10" style={{ color: colors.stone[600] }}>
              Join thousands of users who are enhancing their capabilities with
              AlmanacAI.
            </p>
            <button
              className="px-10 py-5 rounded-xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                background: gradients.hero,
                color: colors.background.white,
              }}
            >
              Start Your Free Trial
            </button>
          </motion.div>
        </div>
      </section>
      <BackLink />
    </>
  );
}
