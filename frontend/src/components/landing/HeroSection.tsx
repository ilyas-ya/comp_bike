import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative z-10 pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-cyberpunk-red/20 text-cyberpunk-neon border border-cyberpunk-red/30">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                New: Real-time compatibility check
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyberpunk-neon via-cyberpunk-accent to-cyberpunk-crimson bg-clip-text text-transparent">
                Perfect
              </span>
              <br />
              <span className="text-white">Bike Builds</span>
              <br />
              <span className="bg-gradient-to-r from-cyberpunk-accent to-cyberpunk-neon bg-clip-text text-transparent">
                Every Time
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
              Stop guessing. Start building with confidence. Our AI-powered
              compatibility system ensures your bike components work perfectly
              together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12">
              <Link
                href="/app"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyberpunk-neon to-cyberpunk-accent text-white font-bold text-lg rounded-xl hover:from-cyberpunk-accent hover:to-cyberpunk-crimson transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyberpunk-red/25"
              >
                Start Checking Now
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

              <button className="group inline-flex items-center px-8 py-4 text-lg font-medium text-white border border-white/20 rounded-xl hover:border-cyberpunk-accent/50 hover:bg-cyberpunk-red/10 transition-all duration-300">
                <svg
                  className="mr-3 h-6 w-6 transition-transform duration-300 group-hover:scale-110"
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
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 text-white/70">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">Free to start</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm">Instant results</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-purple-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L3 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-9-5z" />
                </svg>
                <span className="text-sm">Trusted by 5K+ cyclists</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative lg:order-last">
            <div className="relative bg-cyberpunk-black/60 backdrop-blur-lg rounded-3xl border border-cyberpunk-red/30 shadow-2xl shadow-cyberpunk-neon/10 p-8 overflow-hidden">
              {/* Background decorations */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyberpunk-red/10 via-transparent to-cyberpunk-neon/10"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyberpunk-neon/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyberpunk-accent/20 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                {/* Compatibility Check Simulation */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-cyberpunk-darkgray/50 rounded-lg border border-cyberpunk-red/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-green-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-white text-sm font-medium">
                        Frame: Trek Émonda SL 6
                      </span>
                    </div>
                    <span className="text-green-400 text-xs font-medium">
                      COMPATIBLE
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-cyberpunk-darkgray/50 rounded-lg border border-cyberpunk-red/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-green-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-white text-sm font-medium">
                        Groupset: Shimano 105
                      </span>
                    </div>
                    <span className="text-green-400 text-xs font-medium">
                      COMPATIBLE
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-cyberpunk-darkgray/50 rounded-lg border border-red-500/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-red-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <span className="text-white text-sm font-medium">
                        Wheelset: 650B
                      </span>
                    </div>
                    <span className="text-red-400 text-xs font-medium">
                      INCOMPATIBLE
                    </span>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-cyberpunk-neon/10 to-cyberpunk-accent/10 rounded-lg border border-cyberpunk-accent/30">
                    <h4 className="text-white font-medium mb-2 flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-cyberpunk-accent"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Recommendation
                    </h4>
                    <p className="text-white/80 text-sm">
                      Consider 700C wheelset for optimal compatibility with your
                      frame geometry.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-cyberpunk-neon to-cyberpunk-accent rounded-xl animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl animate-pulse delay-700"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyberpunk-neon to-cyberpunk-accent bg-clip-text text-transparent mb-2">
              10K+
            </div>
            <div className="text-white/80 text-sm sm:text-base">
              Components verified
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              99.9%
            </div>
            <div className="text-white/80 text-sm sm:text-base">
              Accuracy rate
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              5K+
            </div>
            <div className="text-white/80 text-sm sm:text-base">
              Happy cyclists
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
              &lt;1s
            </div>
            <div className="text-white/80 text-sm sm:text-base">Check time</div>
          </div>
        </div>
      </div>
    </section>
  );
}
