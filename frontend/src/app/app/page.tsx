"use client";

import { BikeCompatibilityChecker } from "@/components/BikeCompatibilityChecker";
import Link from "next/link";

export default function AppPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-cyberpunk-black via-cyberpunk-darkgray to-cyberpunk-black relative overflow-hidden">
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
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyberpunk-neon to-cyberpunk-accent bg-clip-text text-transparent">
                Comp.bike
              </h1>
            </Link>

            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="theme-text-secondary theme-accent-hover px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
              >
                Home
              </Link>
              <button className="theme-button-primary">Help</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
        <header className="text-center mb-6 sm:mb-8 lg:mb-12 animate-fade-in">
          {/* Hero section with cyberpunk glassmorphism */}
          <div className="relative bg-cyberpunk-black/60 backdrop-blur-lg rounded-3xl border border-cyberpunk-red/30 shadow-2xl shadow-cyberpunk-neon/10 p-8 sm:p-12 mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-cyberpunk-red/10 to-cyberpunk-neon/10 rounded-3xl"></div>
            <div className="relative z-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                <span className="bg-gradient-to-r from-cyberpunk-neon via-cyberpunk-accent to-cyberpunk-crimson bg-clip-text text-transparent animate-pulse">
                  Comp.bike
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-6">
                Check the compatibility of your bike components with our
                intelligent and interactive system.
              </p>

              {/* Feature badges - Cyberpunk style */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-cyberpunk-red/20 backdrop-blur-sm rounded-full border border-cyberpunk-neon/30 text-cyberpunk-neon">
                  <svg
                    className="h-5 w-5 mr-2"
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
                    Real-time analysis
                  </span>
                </div>
                <div className="inline-flex items-center px-4 py-2 bg-cyberpunk-darkred/20 backdrop-blur-sm rounded-full border border-cyberpunk-accent/30 text-cyberpunk-accent">
                  <svg
                    className="h-5 w-5 mr-2"
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
                    Interactive interface
                  </span>
                </div>
                <div className="inline-flex items-center px-4 py-2 bg-cyberpunk-crimson/20 backdrop-blur-sm rounded-full border border-cyberpunk-red/30 text-cyberpunk-crimson">
                  <svg
                    className="h-5 w-5 mr-2"
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
                  <span className="text-sm font-medium">
                    Extensive component database
                  </span>
                </div>
              </div>

              {/* CTA Button - Cyberpunk style */}
              <div className="flex justify-center">
                <button className="theme-button-primary-lg">
                  Start Compatibility Check
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
                </button>
              </div>
            </div>
          </div>
        </header>

        <BikeCompatibilityChecker />

        {/* Enhanced Footer */}
        <footer className="mt-12 sm:mt-16 lg:mt-20 text-center animate-fade-in">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <p className="text-white/70 text-sm sm:text-base mb-4">
              Click on the bike components to start the compatibility check
            </p>
            <div className="flex justify-center space-x-6 text-white/50">
              <span className="text-xs">Made with ❤️ for cyclists</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
