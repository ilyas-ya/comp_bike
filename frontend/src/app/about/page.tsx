"use client";

import { Navigation, Footer } from "@/components/landing";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyberpunk-black via-cyberpunk-darkgray to-cyberpunk-black relative overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyberpunk-neon via-cyberpunk-accent to-cyberpunk-crimson bg-clip-text text-transparent">
                About Comp.bike
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              We're revolutionizing how cyclists check component compatibility
              with cutting-edge technology and comprehensive databases.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-white/80 mb-6 leading-relaxed">
                Every cyclist deserves to build their perfect bike without the
                frustration of incompatible components. We created Comp.bike to
                eliminate guesswork and provide instant, accurate compatibility
                checks.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Whether you're a professional mechanic, enthusiast builder, or
                weekend rider, our platform helps you make informed decisions
                and avoid costly mistakes.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-cyberpunk-red/20 to-cyberpunk-neon/20 p-8 rounded-2xl border border-cyberpunk-red/30">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyberpunk-neon mb-2">
                      10K+
                    </div>
                    <div className="text-white/80">Components</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyberpunk-accent mb-2">
                      99.9%
                    </div>
                    <div className="text-white/80">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyberpunk-crimson mb-2">
                      5K+
                    </div>
                    <div className="text-white/80">Happy Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      24/7
                    </div>
                    <div className="text-white/80">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              A passionate group of cyclists, engineers, and designers dedicated
              to improving the cycling experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-cyberpunk-black/60 backdrop-blur-lg rounded-xl border border-cyberpunk-red/30 p-6 hover:border-cyberpunk-accent/50 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-cyberpunk-neon to-cyberpunk-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-2">
                Alex Martin
              </h3>
              <p className="text-cyberpunk-accent text-center mb-3">
                Lead Engineer
              </p>
              <p className="text-white/80 text-center text-sm">
                Former bike mechanic turned software engineer. Passionate about
                precision and performance.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-cyberpunk-black/60 backdrop-blur-lg rounded-xl border border-cyberpunk-red/30 p-6 hover:border-cyberpunk-accent/50 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-2">
                Sarah Chen
              </h3>
              <p className="text-blue-400 text-center mb-3">UX Designer</p>
              <p className="text-white/80 text-center text-sm">
                Obsessed with creating intuitive experiences that make complex
                tasks simple.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-cyberpunk-black/60 backdrop-blur-lg rounded-xl border border-cyberpunk-red/30 p-6 hover:border-cyberpunk-accent/50 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-2">
                Mike Rodriguez
              </h3>
              <p className="text-green-400 text-center mb-3">Data Specialist</p>
              <p className="text-white/80 text-center text-sm">
                Cycling data enthusiast ensuring our database stays accurate and
                comprehensive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyberpunk-neon to-cyberpunk-accent rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Precision</h3>
              <p className="text-white/80">
                Every compatibility check is backed by accurate data and
                thorough testing.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Innovation</h3>
              <p className="text-white/80">
                We continuously improve our technology to serve cyclists better.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Community</h3>
              <p className="text-white/80">
                Built by cyclists, for cyclists. Your feedback drives our
                development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-cyberpunk-black/60 backdrop-blur-lg rounded-3xl border border-cyberpunk-red/30 p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Build Your Perfect Bike?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Join thousands of cyclists who trust Comp.bike for their component
              compatibility needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/app"
                className="px-8 py-4 bg-gradient-to-r from-cyberpunk-neon to-cyberpunk-accent text-white font-medium rounded-lg hover:from-cyberpunk-accent hover:to-cyberpunk-crimson transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyberpunk-red/25"
              >
                Start Checking Compatibility
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border border-white/20 text-white font-medium rounded-lg hover:border-cyberpunk-accent/50 hover:bg-cyberpunk-red/10 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
