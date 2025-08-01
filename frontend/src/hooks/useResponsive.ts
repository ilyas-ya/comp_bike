import { useState, useEffect, useCallback } from "react";

export interface DeviceCapabilities {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isHighDPI: boolean;
  isLowEndDevice: boolean;
  isTouchDevice: boolean;
  prefersReducedMotion: boolean;
  screenWidth: number;
  screenHeight: number;
  devicePixelRatio: number;
}

export interface ResponsiveConfig {
  enableAnimations: boolean;
  glowIntensity: "low" | "medium" | "high";
  blurIntensity: "low" | "medium" | "high";
  animationDuration: "fast" | "normal" | "slow";
  enableComplexEffects: boolean;
  optimizeForTouch: boolean;
}

/**
 * Custom hook for responsive design and device capability detection
 * Optimizes performance based on device capabilities and user preferences
 */
export function useResponsive(): {
  capabilities: DeviceCapabilities;
  config: ResponsiveConfig;
  breakpoint: "mobile" | "tablet" | "desktop" | "ultrawide";
} {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isHighDPI: false,
    isLowEndDevice: false,
    isTouchDevice: false,
    prefersReducedMotion: false,
    screenWidth: 1024,
    screenHeight: 768,
    devicePixelRatio: 1,
  });

  const detectCapabilities = useCallback((): DeviceCapabilities => {
    if (typeof window === "undefined") {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isHighDPI: false,
        isLowEndDevice: false,
        isTouchDevice: false,
        prefersReducedMotion: false,
        screenWidth: 1024,
        screenHeight: 768,
        devicePixelRatio: 1,
      };
    }

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const devicePixelRatio = window.devicePixelRatio || 1;

    // Breakpoint detection
    const isMobile = screenWidth <= 640;
    const isTablet = screenWidth > 640 && screenWidth <= 1024;
    const isDesktop = screenWidth > 1024;

    // High DPI detection
    const isHighDPI = devicePixelRatio >= 1.5;

    // Low-end device detection (heuristic based on screen size and DPI)
    const isLowEndDevice =
      (isMobile && devicePixelRatio <= 1.5) ||
      (screenWidth <= 768 && devicePixelRatio <= 1.5);

    // Touch device detection
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore - legacy support
      navigator.msMaxTouchPoints > 0;

    // Reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    return {
      isMobile,
      isTablet,
      isDesktop,
      isHighDPI,
      isLowEndDevice,
      isTouchDevice,
      prefersReducedMotion,
      screenWidth,
      screenHeight,
      devicePixelRatio,
    };
  }, []);

  const getResponsiveConfig = useCallback(
    (caps: DeviceCapabilities): ResponsiveConfig => {
      // Disable animations for reduced motion preference
      if (caps.prefersReducedMotion) {
        return {
          enableAnimations: false,
          glowIntensity: "low",
          blurIntensity: "low",
          animationDuration: "fast",
          enableComplexEffects: false,
          optimizeForTouch: caps.isTouchDevice,
        };
      }

      // Low-end device optimizations
      if (caps.isLowEndDevice) {
        return {
          enableAnimations: true,
          glowIntensity: "low",
          blurIntensity: "low",
          animationDuration: "slow",
          enableComplexEffects: false,
          optimizeForTouch: caps.isTouchDevice,
        };
      }

      // Mobile optimizations
      if (caps.isMobile) {
        return {
          enableAnimations: true,
          glowIntensity: "medium",
          blurIntensity: "low",
          animationDuration: "normal",
          enableComplexEffects: false,
          optimizeForTouch: true,
        };
      }

      // Tablet optimizations
      if (caps.isTablet) {
        return {
          enableAnimations: true,
          glowIntensity: "medium",
          blurIntensity: "medium",
          animationDuration: "normal",
          enableComplexEffects: true,
          optimizeForTouch: caps.isTouchDevice,
        };
      }

      // Desktop with high DPI - full effects
      if (caps.isDesktop && caps.isHighDPI) {
        return {
          enableAnimations: true,
          glowIntensity: "high",
          blurIntensity: "high",
          animationDuration: "fast",
          enableComplexEffects: true,
          optimizeForTouch: caps.isTouchDevice,
        };
      }

      // Standard desktop
      return {
        enableAnimations: true,
        glowIntensity: "medium",
        blurIntensity: "medium",
        animationDuration: "normal",
        enableComplexEffects: true,
        optimizeForTouch: caps.isTouchDevice,
      };
    },
    []
  );

  const getBreakpoint = useCallback(
    (
      caps: DeviceCapabilities
    ): "mobile" | "tablet" | "desktop" | "ultrawide" => {
      if (caps.screenWidth <= 640) return "mobile";
      if (caps.screenWidth <= 1024) return "tablet";
      if (caps.screenWidth <= 1440) return "desktop";
      return "ultrawide";
    },
    []
  );

  useEffect(() => {
    const updateCapabilities = () => {
      const newCapabilities = detectCapabilities();
      setCapabilities(newCapabilities);
    };

    // Initial detection
    updateCapabilities();

    // Listen for resize events
    const handleResize = () => {
      updateCapabilities();
    };

    // Listen for orientation changes on mobile
    const handleOrientationChange = () => {
      // Delay to allow for orientation change to complete
      setTimeout(updateCapabilities, 100);
    };

    // Listen for media query changes
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const handleReducedMotionChange = () => {
      updateCapabilities();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientationChange);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
      reducedMotionQuery.removeEventListener(
        "change",
        handleReducedMotionChange
      );
    };
  }, [detectCapabilities]);

  const config = getResponsiveConfig(capabilities);
  const breakpoint = getBreakpoint(capabilities);

  return {
    capabilities,
    config,
    breakpoint,
  };
}

/**
 * Hook for getting responsive CSS classes based on device capabilities
 */
export function useResponsiveClasses() {
  const { capabilities, config, breakpoint } = useResponsive();

  const getGlowClass = useCallback(
    (baseClass: string) => {
      if (!config.enableAnimations) return `${baseClass}-static`;

      switch (config.glowIntensity) {
        case "low":
          return `${baseClass}-subtle`;
        case "high":
          return `${baseClass}-intense`;
        default:
          return baseClass;
      }
    },
    [config]
  );

  const getTransitionClass = useCallback(() => {
    if (!config.enableAnimations) return "";

    switch (config.animationDuration) {
      case "fast":
        return "cyberpunk-transition-gpu-fast";
      case "slow":
        return "cyberpunk-transition-gpu-smooth";
      default:
        return "cyberpunk-transition-gpu-normal";
    }
  }, [config]);

  const getInteractiveClass = useCallback(() => {
    if (config.optimizeForTouch) {
      return "cyberpunk-interactive-touch";
    }
    return config.enableAnimations
      ? "cyberpunk-interactive-debounced"
      : "cyberpunk-interactive-static";
  }, [config]);

  const getContainerClass = useCallback(() => {
    const baseClasses = ["bike-diagram-container"];

    if (breakpoint === "mobile") {
      baseClasses.push("bike-diagram-mobile");
    } else if (breakpoint === "tablet") {
      baseClasses.push("bike-diagram-tablet");
    } else if (breakpoint === "ultrawide") {
      baseClasses.push("bike-diagram-ultrawide");
    }

    if (capabilities.isLowEndDevice) {
      baseClasses.push("bike-diagram-low-performance");
    }

    return baseClasses.join(" ");
  }, [breakpoint, capabilities]);

  return {
    capabilities,
    config,
    breakpoint,
    getGlowClass,
    getTransitionClass,
    getInteractiveClass,
    getContainerClass,
  };
}

/**
 * Hook for optimizing animation performance based on device capabilities
 */
export function useAnimationOptimization() {
  const { config, capabilities } = useResponsive();

  const shouldUseAnimation = useCallback(
    (animationType: "glow" | "pulse" | "transition" | "complex") => {
      if (!config.enableAnimations) return false;

      switch (animationType) {
        case "complex":
          return config.enableComplexEffects;
        case "glow":
        case "pulse":
          return !capabilities.isLowEndDevice;
        case "transition":
          return true;
        default:
          return true;
      }
    },
    [config, capabilities]
  );

  const getAnimationDuration = useCallback(
    (baseMs: number) => {
      if (!config.enableAnimations) return 0;

      switch (config.animationDuration) {
        case "fast":
          return Math.max(baseMs * 0.7, 100);
        case "slow":
          return baseMs * 1.5;
        default:
          return baseMs;
      }
    },
    [config]
  );

  const getOptimizedStyle = useCallback(
    (baseStyle: React.CSSProperties) => {
      const optimizedStyle = { ...baseStyle };

      // Reduce blur effects on low-end devices
      if (capabilities.isLowEndDevice && optimizedStyle.backdropFilter) {
        optimizedStyle.backdropFilter = optimizedStyle.backdropFilter.replace(
          /blur\(\d+px\)/,
          "blur(2px)"
        );
      }

      // Simplify box shadows on mobile
      if (capabilities.isMobile && optimizedStyle.boxShadow) {
        optimizedStyle.boxShadow = optimizedStyle.boxShadow.split(",")[0]; // Keep only first shadow
      }

      return optimizedStyle;
    },
    [capabilities]
  );

  return {
    shouldUseAnimation,
    getAnimationDuration,
    getOptimizedStyle,
    config,
    capabilities,
  };
}
