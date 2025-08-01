"use client";

import { BikeCompatibilityCheckerNew } from "@/components/BikeCompatibilityCheckerNew";
import Link from "next/link";
import { Suspense, useState, useEffect } from "react";
import { ScrollToTop } from "@/components/ScrollToTop";

// Loading component for better UX
function AppLoading() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-cyberpunk-red/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-cyberpunk-neon border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-white/80 text-lg font-medium">
          Initializing Compatibility Checker...
        </p>
        <p className="text-white/60 text-sm mt-2">
          Please wait while we load the component database
        </p>
      </div>
    </div>
  );
}

export default function AppPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-cyberpunk-black via-cyberpunk-darkgray to-cyberpunk-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-cyberpunk-neon rounded-full mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        <div
          className="absolute top-0 -right-4 w-72 h-72 bg-cyberpunk-accent rounded-full mix-blend-screen filter blur-xl opacity-15 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-cyberpunk-crimson rounded-full mix-blend-screen filter blur-xl opacity-10 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Enhanced Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-cyberpunk-black/95 backdrop-blur-xl border-b border-cyberpunk-red/40 shadow-lg shadow-cyberpunk-red/10"
            : "bg-cyberpunk-black/80 backdrop-blur-lg border-b border-cyberpunk-red/30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/landing" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-cyberpunk-neon to-cyberpunk-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L3 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-9-5z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyberpunk-neon to-cyberpunk-accent bg-clip-text text-transparent hover:from-cyberpunk-accent hover:to-cyberpunk-crimson transition-all duration-300">
                Comp.bike
              </h1>
            </Link>

            <div className="flex items-center space-x-4">
              <Link
                href="/landing"
                className="px-4 py-2 text-white/90 hover:text-white border border-white/20 rounded-lg hover:border-cyberpunk-accent/50 transition-all duration-300 flex items-center space-x-2"
              >
                <svg
                  className="w-4 h-4"
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
                <span>Back to Home</span>
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 bg-gradient-to-r from-cyberpunk-neon to-cyberpunk-accent text-white font-medium rounded-lg hover:from-cyberpunk-accent hover:to-cyberpunk-crimson transition-all duration-300"
              >
                Get Help
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Header */}
          <header className="text-center mb-12 animate-fade-in">
            <div className="relative bg-cyberpunk-black/60 backdrop-blur-lg rounded-3xl border border-cyberpunk-red/30 shadow-2xl shadow-cyberpunk-neon/10 p-8 sm:p-12 mb-8 overflow-hidden">
              {/* Background decorations */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyberpunk-red/10 to-cyberpunk-neon/10 rounded-3xl"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyberpunk-neon/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyberpunk-accent/20 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                {/* Status Badge */}
                <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-500/20 text-green-400 border border-green-500/30 mb-6">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  System Online • Database Updated
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-cyberpunk-neon via-cyberpunk-accent to-cyberpunk-crimson bg-clip-text text-transparent">
                    Compatibility Checker
                  </span>
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
                  Interactive bike component compatibility verification system.
                  Click on any component below to start building your perfect
                  bike setup.
                </p>

                {/* Enhanced Feature badges */}
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
                  <div className="inline-flex items-center px-4 py-2 bg-cyberpunk-red/20 backdrop-blur-sm rounded-full border border-cyberpunk-neon/30 text-cyberpunk-neon">
                    <svg
                      className="h-4 w-4 mr-2"
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
                    <span className="text-sm font-medium">
                      Real-time Analysis
                    </span>
                  </div>
                  <div className="inline-flex items-center px-4 py-2 bg-cyberpunk-darkred/20 backdrop-blur-sm rounded-full border border-cyberpunk-accent/30 text-cyberpunk-accent">
                    <svg
                      className="h-4 w-4 mr-2"
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
                    <span className="text-sm font-medium">
                      Interactive Diagram
                    </span>
                  </div>
                  <div className="inline-flex items-center px-4 py-2 bg-cyberpunk-crimson/20 backdrop-blur-sm rounded-full border border-cyberpunk-red/30 text-cyberpunk-crimson">
                    <svg
                      className="h-4 w-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                      />
                    </svg>
                    <span className="text-sm font-medium">10K+ Components</span>
                  </div>
                  <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-400/30 text-purple-400">
                    <svg
                      className="h-4 w-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    <span className="text-sm font-medium">
                      AI Recommendations
                    </span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                  <div className="text-center p-3 bg-cyberpunk-black/40 rounded-lg border border-cyberpunk-red/20">
                    <div className="text-2xl font-bold text-cyberpunk-neon mb-1">
                      99.9%
                    </div>
                    <div className="text-white/70 text-xs">Accuracy</div>
                  </div>
                  <div className="text-center p-3 bg-cyberpunk-black/40 rounded-lg border border-cyberpunk-red/20">
                    <div className="text-2xl font-bold text-cyberpunk-accent mb-1">
                      &lt;1s
                    </div>
                    <div className="text-white/70 text-xs">Check Time</div>
                  </div>
                  <div className="text-center p-3 bg-cyberpunk-black/40 rounded-lg border border-cyberpunk-red/20">
                    <div className="text-2xl font-bold text-blue-400 mb-1">
                      10K+
                    </div>
                    <div className="text-white/70 text-xs">Components</div>
                  </div>
                  <div className="text-center p-3 bg-cyberpunk-black/40 rounded-lg border border-cyberpunk-red/20">
                    <div className="text-2xl font-bold text-green-400 mb-1">
                      5K+
                    </div>
                    <div className="text-white/70 text-xs">Users</div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Compatibility Checker with Enhanced Wrapper */}
          <div className="bg-cyberpunk-black/40 backdrop-blur-lg rounded-2xl border border-cyberpunk-red/30 shadow-xl p-4 sm:p-6 lg:p-8 mb-8">
            <Suspense fallback={<AppLoading />}>
              <BikeCompatibilityCheckerNew />
            </Suspense>
          </div>

          {/* Enhanced Footer */}
          <footer className="text-center animate-fade-in">
            <div className="bg-cyberpunk-black/60 backdrop-blur-lg rounded-2xl border border-cyberpunk-red/30 p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Need Help Getting Started?
              </h3>
              <p className="text-white/70 text-sm sm:text-base mb-6">
                Click on any bike component in the diagram above to begin your
                compatibility check. Our AI will analyze and provide real-time
                feedback.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white/80 hover:text-white border border-white/20 rounded-lg hover:border-cyberpunk-accent/50 transition-all duration-300"
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
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Get Support
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white/80 hover:text-white border border-white/20 rounded-lg hover:border-cyberpunk-accent/50 transition-all duration-300"
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Learn More
                </Link>
              </div>

              <div className="flex justify-center items-center space-x-2 text-white/50 text-xs">
                <span>Powered by</span>
                <svg
                  className="w-4 h-4 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span>and precision engineering</span>
              </div>
            </div>
          </footer>
        </div>
      </div>

      <ScrollToTop />
    </main>
  );
}
