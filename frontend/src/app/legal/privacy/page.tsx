"use client";

import { Navigation, Footer } from "@/components/landing";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyberpunk-black via-cyberpunk-darkgray to-cyberpunk-black relative overflow-hidden">
      <Navigation />

      <div className="relative z-10 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cyberpunk-black/60 backdrop-blur-lg rounded-2xl border border-cyberpunk-red/30 p-8 sm:p-12">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyberpunk-neon to-cyberpunk-accent bg-clip-text text-transparent">
                  Privacy Policy
                </span>
              </h1>
              <p className="text-white/80 text-lg">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none">
              <div className="space-y-8 text-white/90">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Information We Collect
                  </h2>
                  <p className="mb-4">
                    At Comp.bike, we collect information to provide you with the
                    best bike component compatibility service. We collect the
                    following types of information:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Account Information:</strong> When you create an
                      account, we collect your email address, name, and chosen
                      password.
                    </li>
                    <li>
                      <strong>Component Data:</strong> Information about bike
                      components you search for or add to your builds.
                    </li>
                    <li>
                      <strong>Usage Data:</strong> How you interact with our
                      service, including pages visited and features used.
                    </li>
                    <li>
                      <strong>Technical Data:</strong> IP address, browser type,
                      device information, and other technical identifiers.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    How We Use Your Information
                  </h2>
                  <p className="mb-4">
                    We use the collected information for the following purposes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Provide and maintain our compatibility checking service
                    </li>
                    <li>Improve and personalize your experience</li>
                    <li>Send you service-related notifications and updates</li>
                    <li>Analyze usage patterns to enhance our platform</li>
                    <li>Ensure the security and integrity of our service</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Information Sharing
                  </h2>
                  <p className="mb-4">
                    We do not sell, trade, or otherwise transfer your personal
                    information to third parties, except in the following
                    circumstances:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Service Providers:</strong> Trusted third-party
                      services that help us operate our platform
                    </li>
                    <li>
                      <strong>Legal Requirements:</strong> When required by law
                      or to protect our rights and safety
                    </li>
                    <li>
                      <strong>Business Transfers:</strong> In case of merger,
                      acquisition, or sale of assets
                    </li>
                    <li>
                      <strong>Consent:</strong> With your explicit consent for
                      specific purposes
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Data Security
                  </h2>
                  <p>
                    We implement industry-standard security measures to protect
                    your personal information, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li>Encryption of data in transit and at rest</li>
                    <li>
                      Regular security audits and vulnerability assessments
                    </li>
                    <li>Access controls and authentication measures</li>
                    <li>Secure data centers and infrastructure</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Your Rights
                  </h2>
                  <p className="mb-4">
                    You have the following rights regarding your personal
                    information:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Access:</strong> Request a copy of your personal
                      data
                    </li>
                    <li>
                      <strong>Correction:</strong> Update or correct inaccurate
                      information
                    </li>
                    <li>
                      <strong>Deletion:</strong> Request deletion of your
                      personal data
                    </li>
                    <li>
                      <strong>Portability:</strong> Export your data in a
                      structured format
                    </li>
                    <li>
                      <strong>Objection:</strong> Object to certain processing
                      activities
                    </li>
                    <li>
                      <strong>Restriction:</strong> Request limitation of data
                      processing
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Cookies and Tracking
                  </h2>
                  <p>
                    We use cookies and similar technologies to enhance your
                    browsing experience, analyze site traffic, and personalize
                    content. You can control cookie preferences through your
                    browser settings.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Data Retention
                  </h2>
                  <p>
                    We retain your personal information only as long as
                    necessary to provide our services and comply with legal
                    obligations. Account data is typically retained until you
                    delete your account, after which it may be kept for up to 30
                    days for security purposes.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    International Transfers
                  </h2>
                  <p>
                    Your information may be transferred to and processed in
                    countries other than your country of residence. We ensure
                    appropriate safeguards are in place to protect your data in
                    accordance with applicable privacy laws.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Contact Us
                  </h2>
                  <p>
                    If you have any questions about this Privacy Policy or our
                    data practices, please contact us:
                  </p>
                  <div className="mt-4 p-4 bg-cyberpunk-red/10 border border-cyberpunk-red/30 rounded-lg">
                    <p>
                      <strong>Email:</strong> privacy@comp.bike
                    </p>
                    <p>
                      <strong>Address:</strong> Paris, France
                    </p>
                    <p>
                      <strong>Contact Form:</strong>{" "}
                      <Link
                        href="/contact"
                        className="text-cyberpunk-accent hover:text-cyberpunk-neon"
                      >
                        Available here
                      </Link>
                    </p>
                  </div>
                </section>
              </div>
            </div>

            {/* Back to Home */}
            <div className="mt-12 text-center">
              <Link
                href="/landing"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyberpunk-neon to-cyberpunk-accent text-white font-medium rounded-lg hover:from-cyberpunk-accent hover:to-cyberpunk-crimson transition-all duration-300"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
