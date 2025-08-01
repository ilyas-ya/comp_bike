"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-cyberpunk-black/95 backdrop-blur-xl border-b border-cyberpunk-red/40 shadow-lg shadow-cyberpunk-red/10"
          : "bg-cyberpunk-black/80 backdrop-blur-lg border-b border-cyberpunk-red/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link
                href="/landing"
                className="flex items-center space-x-2 group"
              >
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
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-1">
              <Link
                href="/landing#features"
                className="relative px-4 py-2 rounded-lg text-sm font-medium text-white/90 hover:text-white transition-all duration-300 group"
              >
                Features
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-cyberpunk-neon to-cyberpunk-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link
                href="/landing#how-it-works"
                className="relative px-4 py-2 rounded-lg text-sm font-medium text-white/90 hover:text-white transition-all duration-300 group"
              >
                How it works
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-cyberpunk-neon to-cyberpunk-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link
                href="/about"
                className="relative px-4 py-2 rounded-lg text-sm font-medium text-white/90 hover:text-white transition-all duration-300 group"
              >
                About
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-cyberpunk-neon to-cyberpunk-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link
                href="/landing#pricing"
                className="relative px-4 py-2 rounded-lg text-sm font-medium text-white/90 hover:text-white transition-all duration-300 group"
              >
                Pricing
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-cyberpunk-neon to-cyberpunk-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link
                href="/contact"
                className="relative px-4 py-2 rounded-lg text-sm font-medium text-white/90 hover:text-white transition-all duration-300 group"
              >
                Contact
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-cyberpunk-neon to-cyberpunk-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <div className="ml-6 flex items-center space-x-3">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white border border-white/20 rounded-lg hover:border-cyberpunk-accent/50 transition-all duration-300"
                >
                  Sign In
                </Link>
                <Link
                  href="/app"
                  className="px-6 py-2 bg-gradient-to-r from-cyberpunk-neon to-cyberpunk-accent text-white font-medium rounded-lg hover:from-cyberpunk-accent hover:to-cyberpunk-crimson transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyberpunk-red/25"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 text-white/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyberpunk-accent/50 rounded-lg transition-all duration-300"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                <span
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with enhanced animation */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-cyberpunk-black/95 backdrop-blur-xl border-t border-cyberpunk-red/40">
          <div className="px-4 py-6 space-y-4">
            <Link
              href="/landing#features"
              className="block px-4 py-3 text-white/90 hover:text-white hover:bg-cyberpunk-red/10 rounded-lg transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/landing#how-it-works"
              className="block px-4 py-3 text-white/90 hover:text-white hover:bg-cyberpunk-red/10 rounded-lg transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              How it works
            </Link>
            <Link
              href="/about"
              className="block px-4 py-3 text-white/90 hover:text-white hover:bg-cyberpunk-red/10 rounded-lg transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/landing#pricing"
              className="block px-4 py-3 text-white/90 hover:text-white hover:bg-cyberpunk-red/10 rounded-lg transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-3 text-white/90 hover:text-white hover:bg-cyberpunk-red/10 rounded-lg transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="border-t border-cyberpunk-red/30 pt-4 space-y-3">
              <Link
                href="/auth/login"
                className="block w-full px-4 py-3 text-center text-white/90 border border-white/20 rounded-lg hover:border-cyberpunk-accent/50 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/app"
                className="block w-full px-4 py-3 text-center bg-gradient-to-r from-cyberpunk-neon to-cyberpunk-accent text-white font-medium rounded-lg hover:from-cyberpunk-accent hover:to-cyberpunk-crimson transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
