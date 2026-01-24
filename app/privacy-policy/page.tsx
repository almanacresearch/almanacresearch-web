"use client";

import { motion } from "motion/react";
import { AnimatedBackground } from "@/components/ui/client-components";
import { colors } from "@/lib/constants/theme";
import { BackLink } from "@/components/ui/back-link";
import { fadeInUp, fadeInUpViewportOnce } from "@/lib/constants/animations";

export default function PrivacyPolicy() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background.cream }}
    >
      {/* Hero Section */}
      <section
        className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${colors.background.offWhite} 0%, ${colors.background.cream} 100%)`,
        }}
      >
        <AnimatedBackground variant="simple" />
        <div className="max-w-4xl mx-auto">
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <p
              className="text-sm tracking-wider mb-4"
              style={{ color: colors.primary.mediumBrown }}
            >
              ALMANAC RESEARCH
            </p>
            <h1
              className="text-5xl lg:text-6xl mb-6"
              style={{ color: colors.primary.darkBrown }}
            >
              Privacy Policy
            </h1>
            <p className="text-xl" style={{ color: colors.stone[800] }}>
              Your trust matters. Here's how we protect your data.
            </p>
            <p className="text-sm mt-4" style={{ color: colors.stone[700] }}>
              Last Updated: November 27, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div
            className="relative overflow-hidden rounded-3xl p-8 lg:p-12"
            style={{
              background:
                "linear-gradient(135deg, rgba(250, 246, 239, 0.8) 0%, rgba(255, 255, 255, 0.85) 50%, rgba(250, 246, 239, 0.75) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow:
                "0 8px 32px 0 rgba(120, 82, 62, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)",
            }}
          >
            {/* Introduction */}
            <div className="mb-12 pb-12 border-b border-stone-200">
              <p className="text-lg text-stone-700 leading-relaxed mb-4">
                Privacy is one of the core principles at Almanac Research. Our
                privacy protection rules give you peace of mind that your data
                is safe. Our products adhere to the highest standards of data
                protection and user privacy. This Privacy Policy explains how we
                collect, use, and protect your information when you use
                AlmanacAI.
              </p>
              <p className="text-lg text-stone-700 leading-relaxed">
                We are committed to transparency and giving you control over
                your data. Our extensive Monitor Dashboard is a testimony to the
                same. You own your data.
              </p>
            </div>

            {/* Section 1: Information We Collect */}
            <div className="mb-10">
              <h2
                className="text-2xl lg:text-3xl mb-6"
                style={{ color: colors.primary.darkBrown }}
              >
                1. Information We Collect
              </h2>
              <div className="space-y-6 text-stone-700">
                <p className="text-lg leading-relaxed">
                  Almanac Research only requests and processes only the data
                  required to function - with your explicit permission.{" "}
                </p>

                {/* Company-Level Data */}
                <div>
                  <h3 className="text-xl text-stone-900 mb-4">
                    Company-Level Data
                  </h3>
                  <ul className="space-y-2 pl-4">
                    <li className="flex items-start gap-2">
                      <span className="text-stone-400 mt-1">•</span>
                      <span>
                        <strong className="text-stone-900">
                          Email address
                        </strong>{" "}
                        when you register
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-stone-400 mt-1">•</span>
                      <span>
                        <strong className="text-stone-900">
                          IP address & device info
                        </strong>{" "}
                        (for security and fraud prevention)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-stone-400 mt-1">•</span>
                      <span>
                        <strong className="text-stone-900">Cookies</strong>{" "}
                        (essential + minimal analytics only)
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Product-Level Data */}
                <div>
                  <h3 className="text-xl text-stone-900 mb-4">
                    Product-Level Data - AlmanacAI (MVP)
                  </h3>

                  {/* A. Account Information */}
                  <div className="pl-4 space-y-6">
                    <div>
                      <h4 className="text-lg text-stone-900 mb-3">
                        A. Account Information
                      </h4>
                      <ul className="space-y-2 pl-4">
                        <li className="flex items-start gap-2">
                          <span className="text-stone-400 mt-1">•</span>
                          <span>
                            <strong className="text-stone-900">
                              Email address
                            </strong>{" "}
                            (required for login)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-stone-400 mt-1">•</span>
                          <span>
                            <strong className="text-stone-900">
                              Authentication tokens
                            </strong>{" "}
                            (encrypted and never shared)
                          </span>
                        </li>
                      </ul>
                    </div>

                    {/* B. Connected Services */}
                    <div>
                      <h4 className="text-lg text-stone-900 mb-3">
                        B. Connected Services (Gmail)
                      </h4>
                      <p className="mb-3 leading-relaxed">
                        When you connect Gmail using OAuth, AlmanacAI receives{" "}
                        <strong className="text-stone-900">
                          read-only access
                        </strong>{" "}
                        using{" "}
                        <code className="bg-stone-200 px-2 py-1 rounded text-sm">
                          gmail.readonly
                        </code>{" "}
                        scope to your inbox to extract actionable tasks. To do
                        this, AlmanacAI temporarily reads:
                      </p>
                      <ul className="space-y-2 pl-4 mb-4">
                        <li className="flex items-start gap-2">
                          <span className="text-stone-400 mt-1">•</span>
                          <span>Email subject</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-stone-400 mt-1">•</span>
                          <span>Sender & recipient</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-stone-400 mt-1">•</span>
                          <span>Email body</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-stone-400 mt-1">•</span>
                          <span>Timestamps</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-stone-400 mt-1">•</span>
                          <span>Thread metadata</span>
                        </li>
                      </ul>
                      <p className="mb-3 leading-relaxed">
                        We only store extracted, structured task data.
                      </p>
                      <ul className="space-y-2 pl-4 mb-4">
                        <li className="flex items-start gap-2">
                          <span className="text-stone-400 mt-1">•</span>
                          <span>Task description</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-stone-400 mt-1">•</span>
                          <span>Task type/category</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-stone-400 mt-1">•</span>
                          <span>Due date/time</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-stone-400 mt-1">•</span>
                          <span>Gmail message ID (reference only)</span>
                        </li>
                      </ul>
                      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r">
                        <p className="text-stone-900 mb-2">
                          <strong>Gmail API Scope:</strong>{" "}
                          <code className="bg-stone-200 px-2 py-1 rounded text-sm">
                            gmail.readonly
                          </code>
                        </p>
                        <p className="text-sm leading-relaxed">
                          Used only to detect tasks, identify meetings and
                          invites, extract actionable items, and classify
                          email-based work items.{" "}
                          <a
                            href="https://developers.google.com/workspace/gmail/api/auth/scopes"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-900 hover:text-amber-700 underline inline-flex items-center gap-1"
                          >
                            Learn more
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        </p>
                      </div>
                    </div>

                    {/* C. Usage Data */}
                    <div>
                      <h4 className="text-lg text-stone-900 mb-3">
                        C. Usage Data
                      </h4>
                      <ul className="space-y-2 pl-4">
                        <li className="flex items-start gap-2">
                          <span className="text-stone-400 mt-1">•</span>
                          <span>Tasks extracted from your emails</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-stone-400 mt-1">•</span>
                          <span>Tasks you complete or modify</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-stone-400 mt-1">•</span>
                          <span>
                            Basic non-content interaction logs (for performance
                            & debugging)
                          </span>
                        </li>
                      </ul>
                    </div>

                    {/* D. Device Information */}
                    <div>
                      <h4 className="text-lg text-stone-900 mb-3">
                        D. Device Information
                      </h4>
                      <ul className="space-y-2 pl-4 mb-4">
                        <li className="flex items-start gap-2">
                          <span className="text-stone-400 mt-1">•</span>
                          <span>Device type</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-stone-400 mt-1">•</span>
                          <span>Operating system</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-stone-400 mt-1">•</span>
                          <span>Browser type</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-stone-400 mt-1">•</span>
                          <span>IP address</span>
                        </li>
                      </ul>
                      <p className="text-sm leading-relaxed italic">
                        We do not collect keystrokes, screen recordings,
                        clipboard data, browser history, or any unrelated
                        personal data.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Google API Services Disclosure */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r mt-6">
                  <p className="text-stone-900 mb-2">
                    <strong>Google API Services User Data Policy</strong>
                  </p>
                  <p className="text-sm leading-relaxed">
                    AlmanacAI's use and transfer of information received from
                    Google APIs will adhere to the{" "}
                    <a
                      href="https://developers.google.com/terms/api-services-user-data-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-900 hover:text-blue-700 underline inline-flex items-center gap-1"
                    >
                      Google API Services User Data Policy
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                    , including the Limited Use requirements.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: How We Use Your Information */}
            <div className="mb-10">
              <h2
                className="text-2xl lg:text-3xl mb-6"
                style={{ color: colors.primary.darkBrown }}
              >
                2. How We Use Your Information
              </h2>
              <div className="space-y-4 text-stone-700">
                <p>We use your information to:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>
                      <strong className="text-stone-900">
                        Provide AlmanacAI Services:
                      </strong>{" "}
                      Aggregate, organize, and present your tasks from connected
                      applications
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>
                      <strong className="text-stone-900">
                        Personalize Your Experience:
                      </strong>{" "}
                      Learn your patterns and adapt task prioritization to your
                      workflow
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>
                      <strong className="text-stone-900">
                        Improve Our Services:
                      </strong>{" "}
                      Analyze usage patterns to enhance features and performance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>
                      <strong className="text-stone-900">
                        Communicate With You:
                      </strong>{" "}
                      Send service updates, security alerts, and support
                      messages
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>
                      <strong className="text-stone-900">
                        Ensure Security:
                      </strong>{" "}
                      Detect and prevent fraud, abuse, and security issues
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 3: Data Storage & Security */}
            <div className="mb-10">
              <h2
                className="text-2xl lg:text-3xl mb-6"
                style={{ color: colors.primary.darkBrown }}
              >
                3. Data Storage & Security
              </h2>
              <div className="space-y-4 text-stone-700">
                <p>
                  <strong className="text-stone-900">
                    Your data is encrypted both in transit and at rest.
                  </strong>{" "}
                  We use industry-standard encryption protocols and secure
                  infrastructure to protect your information.
                </p>
                <p>
                  <strong className="text-stone-900">Access Control:</strong>{" "}
                  Only authorized personnel with a legitimate business need can
                  access your data, and all access is logged and monitored.
                </p>
                <p>
                  <strong className="text-stone-900">Data Location:</strong>{" "}
                  Your data is stored on secure servers in the United States
                  with regular backups and disaster recovery protocols.
                </p>
                <p>
                  <strong className="text-stone-900">
                    Third-Party Services:
                  </strong>{" "}
                  We integrate with third-party services (Gmail, Outlook, Slack,
                  etc.) using OAuth 2.0 authentication. We never store your
                  passwords for these services.
                </p>
              </div>
            </div>

            {/* Section 4: Data Sharing */}
            <div className="mb-10">
              <h2
                className="text-2xl lg:text-3xl mb-6"
                style={{ color: colors.primary.darkBrown }}
              >
                4. Data Sharing & Disclosure
              </h2>
              <div className="space-y-4 text-stone-700">
                <p>
                  <strong className="text-stone-900">
                    We do not sell your personal information. Period.
                  </strong>
                </p>
                <p>
                  We may share your information only in these limited
                  circumstances:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>
                      <strong className="text-stone-900">
                        With Your Consent:
                      </strong>{" "}
                      When you explicitly authorize us to share information
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>
                      <strong className="text-stone-900">
                        Service Providers:
                      </strong>{" "}
                      Trusted third parties who help us operate AlmanacAI
                      (hosting, analytics, support) under strict confidentiality
                      agreements
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>
                      <strong className="text-stone-900">
                        Legal Requirements:
                      </strong>{" "}
                      When required by law, subpoena, or to protect our rights
                      and safety
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>
                      <strong className="text-stone-900">
                        Business Transfers:
                      </strong>{" "}
                      In connection with a merger, acquisition, or sale of
                      assets (you will be notified)
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 5: Your Rights & Controls */}
            <div className="mb-10">
              <h2
                className="text-2xl lg:text-3xl mb-6"
                style={{ color: colors.primary.darkBrown }}
              >
                5. Your Rights & Controls
              </h2>
              <div className="space-y-4 text-stone-700">
                <p>
                  <strong className="text-stone-900">
                    You have full control over your data:
                  </strong>
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>
                      <strong className="text-stone-900">
                        Access & Export:
                      </strong>{" "}
                      View and download all your data at any time through the
                      Monitor Dashboard
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>
                      <strong className="text-stone-900">Edit & Update:</strong>{" "}
                      Modify your account information and preferences anytime
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>
                      <strong className="text-stone-900">
                        Disconnect Services:
                      </strong>{" "}
                      Revoke access to connected services (Gmail, Slack, etc.)
                      instantly
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>
                      <strong className="text-stone-900">
                        Delete Account:
                      </strong>{" "}
                      Permanently delete your account and all associated data
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>
                      <strong className="text-stone-900">Opt-Out:</strong>{" "}
                      Unsubscribe from marketing communications (you'll still
                      receive essential service emails)
                    </span>
                  </li>
                </ul>
                <p className="mt-4">
                  <strong className="text-stone-900">Monitor Dashboard:</strong>{" "}
                  View exactly what AlmanacAI is tracking and toggle visibility
                  for any data source at any time.
                </p>
              </div>
            </div>

            {/* Section 6: Cookies & Tracking */}
            <div className="mb-10">
              <h2
                className="text-2xl lg:text-3xl mb-6"
                style={{ color: colors.primary.darkBrown }}
              >
                6. Cookies & Tracking Technologies
              </h2>
              <div className="space-y-4 text-stone-700">
                <p>
                  We use cookies and similar technologies to provide and improve
                  AlmanacAI. These include:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>
                      <strong className="text-stone-900">
                        Essential Cookies:
                      </strong>{" "}
                      Required for authentication and core functionality
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>
                      <strong className="text-stone-900">
                        Analytics Cookies:
                      </strong>{" "}
                      Help us understand how you use AlmanacAI to improve the
                      experience
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>
                      <strong className="text-stone-900">
                        Preference Cookies:
                      </strong>{" "}
                      Remember your settings and preferences
                    </span>
                  </li>
                </ul>
                <p className="mt-4">
                  You can control cookies through your browser settings, but
                  some features may not function properly if you disable them.
                </p>
              </div>
            </div>

            {/* Section 7: Data Retention */}
            <div className="mb-10">
              <h2
                className="text-2xl lg:text-3xl mb-6"
                style={{ color: colors.primary.darkBrown }}
              >
                7. Data Retention
              </h2>
              <div className="space-y-4 text-stone-700">
                <p>
                  We retain your information for as long as your account is
                  active or as needed to provide services. When you delete your
                  account:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>
                      Your personal data is{" "}
                      <strong className="text-stone-900">
                        permanently deleted with immediate effect
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>
                      Anonymized usage data may be retained for analytics and
                      service improvement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>
                      Some information may be retained longer to comply with
                      legal obligations
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 8: Children's Privacy */}
            <div className="mb-10">
              <h2
                className="text-2xl lg:text-3xl mb-6"
                style={{ color: colors.primary.darkBrown }}
              >
                8. Children's Privacy
              </h2>
              <div className="space-y-4 text-stone-700">
                <p>
                  AlmanacAI is not intended for users under the age of 13. We do
                  not knowingly collect personal information from children. If
                  you believe we have collected information from a child, please
                  contact us immediately at{" "}
                  <a
                    href="mailto:privacy@almanacresearch.com"
                    className="text-stone-900 underline hover:text-amber-900"
                  >
                    hello@almanacresearch.com
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Section 9: International Users */}
            <div className="mb-10">
              <h2
                className="text-2xl lg:text-3xl mb-6"
                style={{ color: colors.primary.darkBrown }}
              >
                9. International Data Transfers
              </h2>
              <div className="space-y-4 text-stone-700">
                <p>
                  AlmanacAI operates globally. We implement appropriate
                  safeguards to protect your data in accordance with applicable
                  local and international laws.
                </p>
              </div>
            </div>

            {/* Section 10: Changes to This Policy */}
            <div className="mb-12">
              <h2
                className="text-2xl lg:text-3xl mb-6"
                style={{ color: colors.primary.darkBrown }}
              >
                10. Changes to This Privacy Policy
              </h2>
              <div className="space-y-4 text-stone-700">
                <p>
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices or legal requirements. We will notify
                  you of significant changes by:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>
                      Posting the updated policy with a new "Last Updated" date
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>Sending you an email notification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>Displaying a prominent notice in AlmanacAI</span>
                  </li>
                </ul>
                <p className="mt-4">
                  Your continued use of AlmanacAI after changes constitutes
                  acceptance of the updated policy.
                </p>
              </div>
            </div>
          </div>
          <motion.div
            {...fadeInUpViewportOnce}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-16"
          >
            <div
              className="relative overflow-hidden rounded-3xl p-8 lg:p-12"
              style={{
                background: `linear-gradient(135deg, rgba(120, 82, 62, 0.1) 0%, rgba(146, 102, 79, 0.1) 100%)`,
                border: "1px solid rgba(146, 102, 79, 0.2)",
              }}
            >
              <h3
                className="text-2xl lg:text-3xl mb-4"
                style={{ color: colors.primary.darkBrown }}
              >
                Questions About Privacy?
              </h3>
              <p className="text-lg text-stone-700 mb-6 leading-relaxed">
                We're here to help. If you have any questions, concerns, or
                requests regarding this Privacy Policy or your personal data,
                please contact us:
              </p>
              <div className="space-y-3 text-stone-600">
                <p>
                  <strong className="text-stone-900">Email:</strong>{" "}
                  <a
                    href="mailto:hello@almanacresearch.com"
                    className="text-stone-900 underline hover:text-amber-900"
                  >
                    hello@almanacresearch.com
                  </a>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Back to Home Link */}
          <BackLink className="mt-16" />
        </div>
      </section>
    </div>
  );
}
