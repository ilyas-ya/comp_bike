"use client";

import { useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyberpunk-black via-cyberpunk-darkgray to-cyberpunk-black relative overflow-hidden">
      {/* Animated background elements - Cyberpunk style */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-cyberpunk-neon rounded-full mix-blend-screen filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyberpunk-accent rounded-full mix-blend-screen filter blur-xl opacity-25 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyberpunk-crimson rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* Additional cyberpunk grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(220, 38, 38, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(220, 38, 38, 0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-cyberpunk-black/80 backdrop-blur-lg border-b border-cyberpunk-red/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyberpunk-neon to-cyberpunk-accent bg-clip-text text-transparent">
                  Comp.bike
                </h1>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#features"
                  className="theme-text-secondary theme-accent-hover px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="theme-text-secondary theme-accent-hover px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                >
                  How it works
                </a>
                <a
                  href="#pricing"
                  className="theme-text-secondary theme-accent-hover px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                >
                  Pricing
                </a>
                <Link href="/app" className="theme-button-primary">
                  Try now
                </Link>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="theme-text-secondary theme-accent-hover p-2 transition-all duration-300"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden theme-bg-secondary-alpha backdrop-blur-lg border-t theme-border-primary">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#features"
                className="theme-text-secondary theme-accent-hover block px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="theme-text-secondary theme-accent-hover block px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
              >
                How it works
              </a>
              <a
                href="#pricing"
                className="theme-text-secondary theme-accent-hover block px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
              >
                Pricing
              </a>
              <Link href="/app" className="theme-button-primary block">
                Try now
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative bg-cyberpunk-black/60 backdrop-blur-lg rounded-3xl border border-cyberpunk-red/30 shadow-2xl shadow-cyberpunk-neon/10 p-8 sm:p-12 mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-cyberpunk-red/10 to-cyberpunk-neon/10 rounded-3xl"></div>
            <div className="relative z-10">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-cyberpunk-neon via-cyberpunk-accent to-cyberpunk-crimson bg-clip-text text-transparent">
                  Check compatibility
                </span>
                <br />
                <span className="text-white">of your bike components</span>
              </h1>

              <p className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
                Our intelligent system analyzes compatibility between your bike
                components in real-time. Avoid costly mistakes and optimize your
                performance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link href="/app" className="theme-button-primary-lg">
                  Start for free
                  <svg
                    className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>

                <button className="theme-button-secondary px-8 py-4 text-lg">
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10v4a2 2 0 002 2h2a2 2 0 002-2v-4M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1"
                    />
                  </svg>
                  Watch demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-2">
                    10K+
                  </div>
                  <div className="text-white/80">Components analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">
                    99.9%
                  </div>
                  <div className="text-white/80">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-purple-400 mb-2">
                    5K+
                  </div>
                  <div className="text-white/80">Satisfied users</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 py-20 bg-white/5 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Advanced Features
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Discover all the tools you need to optimize your bike
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="h-6 w-6 text-white"
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
              <h3 className="text-xl font-semibold text-white mb-4">
                Real-time Analysis
              </h3>
              <p className="text-white/80">
                Instant compatibility verification between your components with
                accurate and detailed results.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="h-6 w-6 text-white"
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
              <h3 className="text-xl font-semibold text-white mb-4">
                Intuitive Interface
              </h3>
              <p className="text-white/80">
                Interactive bike diagram to easily select your components and
                visualize results.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Comprehensive Database
              </h3>
              <p className="text-white/80">
                Over 10,000 referenced components with detailed and updated
                technical specifications.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Smart Alerts
              </h3>
              <p className="text-white/80">
                Automatic notifications for incompatibilities and suggestions
                for optimal alternatives.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Detailed Reports
              </h3>
              <p className="text-white/80">
                Comprehensive analyses with personalized recommendations to
                optimize your bike's performance.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Expert Support
              </h3>
              <p className="text-white/80">
                Team of professional mechanics available to advise you and
                answer your questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How it works
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Three simple steps to check the compatibility of your components
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Select your components
              </h3>
              <p className="text-white/80">
                Click on the interactive bike diagram to select the components
                you want to check.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Automatic Analysis
              </h3>
              <p className="text-white/80">
                Our system instantly analyzes the compatibility between your
                selected components.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Detailed Results
              </h3>
              <p className="text-white/80">
                Get clear results with recommendations to optimize your
                configuration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="relative z-10 py-20 bg-white/5 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Simple and transparent pricing
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Free</h3>
                <div className="text-4xl font-bold text-cyan-400 mb-2">€0</div>
                <div className="text-white/80 mb-8">per month</div>

                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center text-white/80">
                    <svg
                      className="h-5 w-5 text-green-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    5 checks per day
                  </li>
                  <li className="flex items-center text-white/80">
                    <svg
                      className="h-5 w-5 text-green-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Standard database
                  </li>
                  <li className="flex items-center text-white/80">
                    <svg
                      className="h-5 w-5 text-green-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Community support
                  </li>
                </ul>

                <Link
                  href="/app"
                  className="w-full inline-flex justify-center items-center px-6 py-3 border border-white/20 rounded-lg text-white font-medium hover:bg-white/10 transition-all duration-300"
                >
                  Start for free
                </Link>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-lg rounded-2xl border-2 border-cyan-400/50 p-8 relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Popular
                </span>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Pro</h3>
                <div className="text-4xl font-bold text-cyan-400 mb-2">19€</div>
                <div className="text-white/80 mb-8">per month</div>

                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center text-white/80">
                    <svg
                      className="h-5 w-5 text-green-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Unlimited checks
                  </li>
                  <li className="flex items-center text-white/80">
                    <svg
                      className="h-5 w-5 text-green-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Complete database
                  </li>
                  <li className="flex items-center text-white/80">
                    <svg
                      className="h-5 w-5 text-green-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Detailed reports
                  </li>
                  <li className="flex items-center text-white/80">
                    <svg
                      className="h-5 w-5 text-green-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Priority support
                  </li>
                </ul>
                <Link
                  href="/app"
                  className="w-full inline-flex justify-center items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-medium hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
                >
                  Try Pro
                </Link>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Enterprise
                </h3>
                <div className="text-4xl font-bold text-purple-400 mb-2">
                  Custom
                </div>
                <div className="text-white/80 mb-8">contact us</div>

                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center text-white/80">
                    <svg
                      className="h-5 w-5 text-green-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Dedicated API
                  </li>
                  <li className="flex items-center text-white/80">
                    <svg
                      className="h-5 w-5 text-green-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Custom integration
                  </li>
                  <li className="flex items-center text-white/80">
                    <svg
                      className="h-5 w-5 text-green-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    24/7 Dedicated support
                  </li>
                  <li className="flex items-center text-white/80">
                    <svg
                      className="h-5 w-5 text-green-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Team training
                  </li>
                </ul>

                <button className="w-full inline-flex justify-center items-center px-6 py-3 border border-white/20 rounded-lg text-white font-medium hover:bg-white/10 transition-all duration-300">
                  Contact us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to optimize your bike?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of cyclists who trust Comp.bike Pro for their
              compatibility checks.
            </p>
            <Link
              href="/app"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center">
                Start now
                <svg
                  className="ml-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white/5 backdrop-blur-sm border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
                Comp.bike
              </h3>
              <p className="text-white/80 mb-6 max-w-md">
                The reference solution for checking the compatibility of your
                bike components. Accurate, fast and reliable.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Produit</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Fonctionnality
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    price
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    API
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Statuts
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © 2024 BikeCheck Pro. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a
                href="#"
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
