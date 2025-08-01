import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative z-10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyberpunk-red/20 via-cyberpunk-neon/20 to-cyberpunk-accent/20 rounded-3xl"></div>
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyberpunk-neon/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyberpunk-accent/30 rounded-full blur-3xl"></div>

          <div className="relative bg-cyberpunk-black/80 backdrop-blur-xl rounded-3xl border border-cyberpunk-red/40 shadow-2xl shadow-cyberpunk-red/20 p-8 sm:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-white">Ready to Build Your</span>
                  <br />
                  <span className="bg-gradient-to-r from-cyberpunk-neon to-cyberpunk-accent bg-clip-text text-transparent">
                    Dream Bike?
                  </span>
                </h2>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  Join over 5,000 cyclists who trust Comp.bike for perfect
                  component compatibility. Start building with confidence today.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="/app"
                    className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyberpunk-neon to-cyberpunk-accent rounded-xl text-white font-bold text-lg shadow-lg shadow-cyberpunk-red/25 hover:from-cyberpunk-accent hover:to-cyberpunk-crimson transform hover:scale-105 transition-all duration-300"
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

                  <Link
                    href="/contact"
                    className="inline-flex items-center px-8 py-4 border border-white/20 rounded-xl text-white font-medium text-lg hover:border-cyberpunk-accent/50 hover:bg-cyberpunk-red/10 transition-all duration-300"
                  >
                    Get Expert Help
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="mt-8 flex flex-wrap justify-center lg:justify-start items-center gap-6 text-white/60">
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
                      <path d="M12 2L3 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-9-5z" />
                    </svg>
                    <span className="text-sm">Secure & Private</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-purple-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-sm">Instant Results</span>
                  </div>
                </div>
              </div>

              {/* Right Visual */}
              <div className="relative">
                <div className="bg-cyberpunk-darkgray/50 rounded-2xl border border-cyberpunk-red/30 p-6">
                  <div className="space-y-4">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-cyberpunk-black/60 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-cyberpunk-neon mb-1">
                          10K+
                        </div>
                        <div className="text-white/70 text-sm">Components</div>
                      </div>
                      <div className="bg-cyberpunk-black/60 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-cyberpunk-accent mb-1">
                          99.9%
                        </div>
                        <div className="text-white/70 text-sm">Accuracy</div>
                      </div>
                      <div className="bg-cyberpunk-black/60 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-400 mb-1">
                          5K+
                        </div>
                        <div className="text-white/70 text-sm">Users</div>
                      </div>
                      <div className="bg-cyberpunk-black/60 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-400 mb-1">
                          &lt;1s
                        </div>
                        <div className="text-white/70 text-sm">Check Time</div>
                      </div>
                    </div>

                    {/* Feature Highlights */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-cyberpunk-black/40 rounded-lg">
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
                          Real-time compatibility checks
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-cyberpunk-black/40 rounded-lg">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-blue-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-white text-sm font-medium">
                          Interactive bike diagram
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-cyberpunk-black/40 rounded-lg">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-purple-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-white text-sm font-medium">
                          Expert recommendations
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
