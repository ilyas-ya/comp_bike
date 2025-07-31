/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cyberpunk color palette - standardized and optimized
        cyberpunk: {
          // Black variations for backgrounds
          black: "#0a0a0a",
          darkgray: "#1a1a1a",
          gray: "#2a2a2a",
          // Red variations for accents and interactions
          red: "#dc2626",
          bloodred: "#b91c1c",
          darkred: "#991b1b",
          crimson: "#ef4444",
          neon: "#ff0040",
          accent: "#ff1744",
        },
        // Semantic color system for better maintainability
        primary: {
          50: "#fef2f2", // Light red tint for backgrounds
          100: "#fee2e2", // Very light red
          200: "#fecaca", // Light red
          300: "#fca5a5", // Medium light red
          400: "#f87171", // Medium red
          500: "#dc2626", // Main red (cyberpunk-red)
          600: "#b91c1c", // Dark red (cyberpunk-bloodred)
          700: "#991b1b", // Darker red (cyberpunk-darkred)
          800: "#7f1d1d", // Very dark red
          900: "#0a0a0a", // Black (cyberpunk-black)
        },
        // Semantic aliases for interface elements
        background: {
          primary: "#0a0a0a", // Main background (cyberpunk-black)
          secondary: "#1a1a1a", // Secondary background (cyberpunk-darkgray)
          tertiary: "#2a2a2a", // Tertiary background (cyberpunk-gray)
        },
        accent: {
          primary: "#dc2626", // Main accent (cyberpunk-red)
          hover: "#ff0040", // Hover state (cyberpunk-neon)
          active: "#ff1744", // Active state (cyberpunk-accent)
          muted: "#b91c1c", // Muted accent (cyberpunk-bloodred)
        },
        text: {
          primary: "#ffffff", // Pure white
          secondary: "rgba(255, 255, 255, 0.9)", // White 90% opacity
          tertiary: "rgba(255, 255, 255, 0.8)", // White 80% opacity
          muted: "rgba(255, 255, 255, 0.7)", // White 70% opacity
        },
        border: {
          primary: "rgba(220, 38, 38, 0.3)", // Red 30% opacity
          secondary: "rgba(220, 38, 38, 0.2)", // Red 20% opacity
          muted: "rgba(255, 255, 255, 0.1)", // White 10% opacity
        },
        // Status colors using red variations only
        status: {
          compatible: {
            50: "#fef2f2",
            500: "#dc2626", // cyberpunk-red
            600: "#b91c1c", // cyberpunk-bloodred
          },
          conditional: {
            50: "#fef2f2",
            500: "#ef4444", // cyberpunk-crimson
            600: "#dc2626", // cyberpunk-red
          },
          incompatible: {
            50: "#fef2f2",
            500: "#991b1b", // cyberpunk-darkred
            600: "#7f1d1d", // Very dark red
          },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        blob: "blob 7s infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        // Cyberpunk-themed scrollbars
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "#dc2626 #1a1a1a", // Red thumb on dark gray track
        },
        ".scrollbar-thin::-webkit-scrollbar": {
          width: "8px",
        },
        ".scrollbar-thin::-webkit-scrollbar-track": {
          background: "#1a1a1a", // cyberpunk-darkgray
          borderRadius: "4px",
        },
        ".scrollbar-thin::-webkit-scrollbar-thumb": {
          background: "#dc2626", // cyberpunk-red
          borderRadius: "4px",
        },
        ".scrollbar-thin::-webkit-scrollbar-thumb:hover": {
          background: "#ff0040", // cyberpunk-neon for hover
        },
        // Theme-specific scrollbar utilities
        ".scrollbar-cyberpunk": {
          scrollbarColor: "#dc2626 #0a0a0a", // Red thumb on black track
        },
        ".scrollbar-cyberpunk::-webkit-scrollbar": {
          width: "8px",
        },
        ".scrollbar-cyberpunk::-webkit-scrollbar-track": {
          background: "#0a0a0a", // cyberpunk-black
          borderRadius: "4px",
        },
        ".scrollbar-cyberpunk::-webkit-scrollbar-thumb": {
          background: "#dc2626", // cyberpunk-red
          borderRadius: "4px",
        },
        ".scrollbar-cyberpunk::-webkit-scrollbar-thumb:hover": {
          background: "#ff0040", // cyberpunk-neon
        },

        // Custom theme utility classes
        // Background utilities - black variations (primary, secondary, tertiary)
        ".theme-bg-primary": {
          backgroundColor: "#0a0a0a", // cyberpunk-black
        },
        ".theme-bg-secondary": {
          backgroundColor: "#1a1a1a", // cyberpunk-darkgray
        },
        ".theme-bg-tertiary": {
          backgroundColor: "#2a2a2a", // cyberpunk-gray
        },
        ".theme-bg-primary-alpha": {
          backgroundColor: "rgba(10, 10, 10, 0.9)", // cyberpunk-black with transparency
        },
        ".theme-bg-secondary-alpha": {
          backgroundColor: "rgba(26, 26, 26, 0.8)", // cyberpunk-darkgray with transparency
        },
        ".theme-bg-tertiary-alpha": {
          backgroundColor: "rgba(42, 42, 42, 0.7)", // cyberpunk-gray with transparency
        },

        // Red accent utilities for hover, active, focus states
        ".theme-accent-hover": {
          color: "#ff0040", // cyberpunk-neon
          transition: "color 0.2s ease-in-out",
        },
        ".theme-accent-hover:hover": {
          color: "#ff1744", // cyberpunk-accent
          textShadow: "0 0 8px rgba(255, 0, 64, 0.5)",
        },
        ".theme-accent-active": {
          color: "#ff1744", // cyberpunk-accent
          textShadow: "0 0 8px rgba(255, 23, 68, 0.6)",
        },
        ".theme-accent-focus": {
          color: "#dc2626", // cyberpunk-red
          outline: "2px solid #ff0040",
          outlineOffset: "2px",
          textShadow: "0 0 6px rgba(220, 38, 38, 0.4)",
        },
        ".theme-bg-accent-hover": {
          backgroundColor: "#ff0040", // cyberpunk-neon
          transition:
            "background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        },
        ".theme-bg-accent-hover:hover": {
          backgroundColor: "#ff1744", // cyberpunk-accent
          boxShadow: "0 0 16px rgba(255, 0, 64, 0.4)",
        },
        ".theme-bg-accent-active": {
          backgroundColor: "#ff1744", // cyberpunk-accent
          boxShadow: "0 0 20px rgba(255, 23, 68, 0.5)",
        },

        // White text utilities with different opacities
        ".theme-text-primary": {
          color: "#ffffff", // Pure white
        },
        ".theme-text-secondary": {
          color: "rgba(255, 255, 255, 0.9)", // White 90% opacity
        },
        ".theme-text-tertiary": {
          color: "rgba(255, 255, 255, 0.8)", // White 80% opacity
        },
        ".theme-text-muted": {
          color: "rgba(255, 255, 255, 0.7)", // White 70% opacity
        },
        ".theme-text-subtle": {
          color: "rgba(255, 255, 255, 0.6)", // White 60% opacity
        },
        ".theme-text-faint": {
          color: "rgba(255, 255, 255, 0.5)", // White 50% opacity
        },

        // Red border utilities with transparency
        ".theme-border-primary": {
          borderColor: "rgba(220, 38, 38, 0.3)", // Red 30% opacity
        },
        ".theme-border-secondary": {
          borderColor: "rgba(220, 38, 38, 0.2)", // Red 20% opacity
        },
        ".theme-border-muted": {
          borderColor: "rgba(220, 38, 38, 0.1)", // Red 10% opacity
        },
        ".theme-border-accent": {
          borderColor: "rgba(255, 0, 64, 0.4)", // Neon red 40% opacity
        },
        ".theme-border-hover": {
          borderColor: "rgba(255, 0, 64, 0.6)", // Neon red 60% opacity
          transition:
            "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        },
        ".theme-border-hover:hover": {
          borderColor: "rgba(255, 23, 68, 0.8)", // Accent red 80% opacity
          boxShadow: "0 0 8px rgba(255, 0, 64, 0.3)",
        },
        ".theme-border-focus": {
          borderColor: "#ff0040", // cyberpunk-neon
          boxShadow: "0 0 0 2px rgba(255, 0, 64, 0.2)",
        },

        // Combined utility classes for common patterns
        ".theme-card": {
          backgroundColor: "rgba(26, 26, 26, 0.8)", // theme-bg-secondary-alpha
          borderColor: "rgba(220, 38, 38, 0.2)", // theme-border-secondary
          color: "#ffffff", // theme-text-primary
          backdropFilter: "blur(8px)",
          transition: "all 0.2s ease-in-out",
        },
        ".theme-card:hover": {
          borderColor: "rgba(255, 0, 64, 0.4)", // theme-border-accent
          boxShadow: "0 4px 16px rgba(220, 38, 38, 0.1)",
        },

        // Comprehensive button system with black/red theme
        // Primary button - solid red gradient with glow effects
        ".theme-button-primary": {
          background: "linear-gradient(135deg, #dc2626 0%, #ff0040 100%)", // Red to neon gradient
          color: "#ffffff",
          border: "1px solid #dc2626",
          borderRadius: "0.5rem",
          padding: "0.5rem 1rem",
          fontWeight: "600",
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          boxShadow: "0 4px 6px rgba(220, 38, 38, 0.25)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        },
        ".theme-button-primary:hover": {
          background: "linear-gradient(135deg, #ff0040 0%, #ff1744 100%)", // Neon to accent gradient
          boxShadow:
            "0 0 20px rgba(255, 0, 64, 0.5), 0 8px 16px rgba(220, 38, 38, 0.3)",
          transform: "translateY(-2px) scale(1.02)",
          borderColor: "#ff0040",
        },
        ".theme-button-primary:active": {
          background: "linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)", // Darker gradient
          transform: "translateY(0) scale(1)",
          boxShadow:
            "0 0 12px rgba(220, 38, 38, 0.4), 0 4px 8px rgba(185, 28, 28, 0.3)",
        },
        ".theme-button-primary:focus": {
          outline: "none",
          boxShadow:
            "0 0 0 3px rgba(255, 0, 64, 0.3), 0 0 20px rgba(255, 0, 64, 0.4)",
        },
        ".theme-button-primary:disabled": {
          background: "linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)", // Very dark red gradient
          color: "rgba(255, 255, 255, 0.5)",
          cursor: "not-allowed",
          transform: "none",
          boxShadow: "none",
        },

        // Secondary button - outline style with red border and transparent background
        ".theme-button-secondary": {
          backgroundColor: "transparent",
          color: "#ffffff",
          border: "2px solid rgba(220, 38, 38, 0.6)",
          borderRadius: "0.5rem",
          padding: "0.5rem 1rem",
          fontWeight: "600",
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backdropFilter: "blur(4px)",
        },
        ".theme-button-secondary:hover": {
          backgroundColor: "rgba(220, 38, 38, 0.15)",
          borderColor: "#ff0040",
          color: "#ff0040",
          boxShadow: "0 0 16px rgba(255, 0, 64, 0.3)",
          transform: "translateY(-1px)",
        },
        ".theme-button-secondary:active": {
          backgroundColor: "rgba(220, 38, 38, 0.25)",
          borderColor: "#dc2626",
          transform: "translateY(0)",
        },
        ".theme-button-secondary:focus": {
          outline: "none",
          boxShadow: "0 0 0 3px rgba(255, 0, 64, 0.3)",
        },
        ".theme-button-secondary:disabled": {
          borderColor: "rgba(153, 27, 27, 0.4)",
          color: "rgba(255, 255, 255, 0.4)",
          cursor: "not-allowed",
          transform: "none",
          boxShadow: "none",
        },

        // Outline button - minimal style with thin red border
        ".theme-button-outline": {
          backgroundColor: "transparent",
          color: "rgba(255, 255, 255, 0.9)",
          border: "1px solid rgba(220, 38, 38, 0.4)",
          borderRadius: "0.5rem",
          padding: "0.5rem 1rem",
          fontWeight: "500",
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(2px)",
        },
        ".theme-button-outline:hover": {
          backgroundColor: "rgba(220, 38, 38, 0.1)",
          borderColor: "rgba(255, 0, 64, 0.6)",
          color: "#ffffff",
          boxShadow: "0 0 8px rgba(255, 0, 64, 0.2)",
        },
        ".theme-button-outline:active": {
          backgroundColor: "rgba(220, 38, 38, 0.2)",
          borderColor: "#dc2626",
        },
        ".theme-button-outline:focus": {
          outline: "none",
          boxShadow: "0 0 0 2px rgba(255, 0, 64, 0.3)",
        },
        ".theme-button-outline:disabled": {
          borderColor: "rgba(153, 27, 27, 0.3)",
          color: "rgba(255, 255, 255, 0.3)",
          cursor: "not-allowed",
        },

        // Ghost button - no border, minimal background on hover
        ".theme-button-ghost": {
          backgroundColor: "transparent",
          color: "rgba(255, 255, 255, 0.8)",
          border: "none",
          borderRadius: "0.5rem",
          padding: "0.5rem 1rem",
          fontWeight: "500",
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        },
        ".theme-button-ghost:hover": {
          backgroundColor: "rgba(220, 38, 38, 0.1)",
          color: "#ff0040",
          boxShadow: "0 0 8px rgba(255, 0, 64, 0.15)",
        },
        ".theme-button-ghost:active": {
          backgroundColor: "rgba(220, 38, 38, 0.2)",
          color: "#dc2626",
        },
        ".theme-button-ghost:focus": {
          outline: "none",
          boxShadow: "0 0 0 2px rgba(255, 0, 64, 0.3)",
        },
        ".theme-button-ghost:disabled": {
          color: "rgba(255, 255, 255, 0.3)",
          cursor: "not-allowed",
        },

        // Large button variants
        ".theme-button-primary-lg": {
          background: "linear-gradient(135deg, #dc2626 0%, #ff0040 100%)",
          color: "#ffffff",
          border: "1px solid #dc2626",
          borderRadius: "0.75rem",
          padding: "0.75rem 2rem",
          fontWeight: "600",
          fontSize: "1rem",
          lineHeight: "1.5rem",
          boxShadow: "0 6px 12px rgba(220, 38, 38, 0.3)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        },
        ".theme-button-primary-lg:hover": {
          background: "linear-gradient(135deg, #ff0040 0%, #ff1744 100%)",
          boxShadow:
            "0 0 24px rgba(255, 0, 64, 0.6), 0 12px 20px rgba(220, 38, 38, 0.4)",
          transform: "translateY(-3px) scale(1.03)",
          borderColor: "#ff0040",
        },
        ".theme-button-primary-lg:active": {
          background: "linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)",
          transform: "translateY(-1px) scale(1.01)",
          boxShadow:
            "0 0 16px rgba(220, 38, 38, 0.5), 0 6px 12px rgba(185, 28, 28, 0.4)",
        },

        // Small button variants
        ".theme-button-primary-sm": {
          background: "linear-gradient(135deg, #dc2626 0%, #ff0040 100%)",
          color: "#ffffff",
          border: "1px solid #dc2626",
          borderRadius: "0.375rem",
          padding: "0.375rem 0.75rem",
          fontWeight: "600",
          fontSize: "0.75rem",
          lineHeight: "1rem",
          boxShadow: "0 2px 4px rgba(220, 38, 38, 0.2)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        },
        ".theme-button-primary-sm:hover": {
          background: "linear-gradient(135deg, #ff0040 0%, #ff1744 100%)",
          boxShadow: "0 0 12px rgba(255, 0, 64, 0.4)",
          transform: "translateY(-1px) scale(1.02)",
        },

        // Icon button variants
        ".theme-button-icon": {
          backgroundColor: "transparent",
          color: "rgba(255, 255, 255, 0.8)",
          border: "none",
          borderRadius: "0.5rem",
          padding: "0.5rem",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        },
        ".theme-button-icon:hover": {
          backgroundColor: "rgba(220, 38, 38, 0.15)",
          color: "#ff0040",
          boxShadow: "0 0 8px rgba(255, 0, 64, 0.2)",
          transform: "scale(1.1)",
        },
        ".theme-button-icon:active": {
          backgroundColor: "rgba(220, 38, 38, 0.25)",
          transform: "scale(1.05)",
        },
        ".theme-input": {
          backgroundColor: "rgba(10, 10, 10, 0.9)", // theme-bg-primary-alpha
          borderColor: "rgba(220, 38, 38, 0.2)", // theme-border-secondary
          color: "#ffffff", // theme-text-primary
          transition: "all 0.2s ease-in-out",
        },
        ".theme-input:focus": {
          borderColor: "#ff0040", // cyberpunk-neon
          boxShadow: "0 0 0 2px rgba(255, 0, 64, 0.2)",
          outline: "none",
        },
        ".theme-input::placeholder": {
          color: "rgba(255, 255, 255, 0.5)", // theme-text-faint
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
