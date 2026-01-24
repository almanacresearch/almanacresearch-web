"use client";

import { motion } from "motion/react";
import { AnimatedBackground } from "@/components/ui/client-components";
import { colors } from "@/lib/constants/theme";
import { BackLink } from "@/components/ui/back-link";
import { fadeInUp, fadeInUpViewportOnce } from "@/lib/constants/animations";

export default function TermsOfService() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing and using AlmanacAI ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms of Service, please do not use the Service. We reserve the right to modify these terms at any time, and such modifications shall be effective immediately upon posting. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms of Service.`,
    },
    {
      title: "2. Description of Service",
      content: `AlmanacAI is an AI-powered tool that helps users manage tasks, organize information, and enhance their workflow ("the Service"). The Service is provided "as is" and Almanac Research reserves the right to modify, suspend, or discontinue the Service at any time without notice.`,
    },
    {
      title: "3. User Accounts",
      content: `To access certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.`,
    },
    {
      title: "4. Acceptable Use",
      content: `You agree not to use the Service to: (a) upload, post, or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable; (b) impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity; (c) upload, post, or transmit any content that infringes any patent, trademark, trade secret, copyright, or other proprietary rights of any party; (d) upload, post, or transmit any unsolicited or unauthorized advertising, promotional materials, junk mail, spam, or chain letters; (e) interfere with or disrupt the Service or servers or networks connected to the Service.`,
    },
    {
      title: "5. Intellectual Property Rights",
      content: `The Service and its original content, features, and functionality are owned by Almanac Research and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our Service or included software, nor may you reverse engineer or attempt to extract the source code of that software.`,
    },
    {
      title: "6. User Content",
      content: `You retain all rights to any content you submit, post, or display on or through the Service. By submitting, posting, or displaying content, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute such content in any and all media or distribution methods. You represent and warrant that you own or have the necessary rights to use and authorize us to use all content that you submit.`,
    },
    {
      title: "7. Privacy and Data Protection",
      content: `Your use of the Service is also governed by our Privacy Policy. We take data protection seriously and comply with applicable data protection laws. We implement appropriate technical and organizational measures to protect your personal data. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.`,
    },
    {
      title: "8. Payment and Billing",
      content: `Certain aspects of the Service may be provided for a fee. You agree to pay all fees or charges to your account based on the fees, charges, and billing terms in effect at the time a fee or charge is due and payable. All fees are non-refundable unless otherwise stated. We reserve the right to change our pricing at any time, with notice for existing subscribers.`,
    },
    {
      title: "9. Third-Party Services",
      content: `The Service may contain links to third-party websites or services that are not owned or controlled by Almanac Research. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that we shall not be responsible or liable for any damage or loss caused by or in connection with the use of any such content, goods, or services.`,
    },
    {
      title: "10. Disclaimers and Limitation of Liability",
      content: `The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. To the fullest extent permitted by law, Almanac Research disclaims all warranties, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event shall Almanac Research be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Service.`,
    },
    {
      title: "11. Indemnification",
      content: `You agree to indemnify, defend, and hold harmless Almanac Research and its officers, directors, employees, agents, and affiliates from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses arising from: (a) your use of and access to the Service; (b) your violation of any term of these Terms of Service; (c) your violation of any third-party right, including without limitation any copyright, property, or privacy right.`,
    },
    {
      title: "12. Termination",
      content: `We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms of Service. Upon termination, your right to use the Service will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.`,
    },
    {
      title: "13. Governing Law",
      content: `These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Almanac Research operates, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.`,
    },
    {
      title: "14. Changes to Terms",
      content: `We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms.`,
    },
  ];

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
              Terms of Service
            </h1>
            <p className="text-xl" style={{ color: colors.stone[800] }}>
              Please read these terms carefully before using AlmanacAI
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
              <p className="text-lg text-stone-700 leading-relaxed">
                These Terms of Service ("Terms") govern your access to and use
                of our services, software, and websites (collectively, the
                "Service"). Please read these Terms carefully before using the
                Service.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-10">
              {sections.map((section, index) => (
                <div key={index}>
                  <h2
                    className="text-2xl lg:text-3xl mb-6"
                    style={{ color: colors.primary.darkBrown }}
                  >
                    {section.title}
                  </h2>
                  <p className="text-stone-700 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Box */}
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
                Questions about our Terms?
              </h3>
              <p className="text-lg text-stone-700 mb-6 leading-relaxed">
                Our legal team is here to help. If you have any questions or
                concerns regarding these Terms of Service, please contact us:
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
