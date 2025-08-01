/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],

  // Performance optimizations
  experimental: {
    // optimizeCss: true, // Temporarily disabled due to critters dependency issue
    optimizePackageImports: ["@react-three/fiber", "@react-three/drei"],
  },

  images: {
    domains: ["localhost", "127.0.0.1"],
    formats: ["image/webp", "image/avif"],
  },

  webpack: (config, { dev, isServer }) => {
    // Performance optimizations
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "react/jsx-runtime.js": "preact/compat/jsx-runtime",
      };
    }

    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });

    // Optimize chunks
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
          three: {
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            name: "three",
            chunks: "all",
            priority: 10,
          },
        },
      },
    };

    return config;
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"
        }/:path*`,
      },
    ];
  },

  // Enable compression
  compress: true,

  // Reduce build output
  output: "standalone",
};

module.exports = nextConfig;
