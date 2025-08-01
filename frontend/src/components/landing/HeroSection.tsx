import Link from "next/link";

export function HeroSection() {
  return (
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
  );
}
