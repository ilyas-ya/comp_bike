import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Hook to optimize page transitions and reduce loading times
 */
export function usePageTransitionOptimization() {
  const router = useRouter();

  useEffect(() => {
    // Prefetch common routes on app load
    const prefetchRoutes = ["/landing", "/app"];

    const prefetchWithDelay = () => {
      prefetchRoutes.forEach((route) => {
        setTimeout(() => {
          router.prefetch(route);
        }, 100);
      });
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      window.requestIdleCallback(prefetchWithDelay);
    } else {
      setTimeout(prefetchWithDelay, 1000);
    }
  }, [router]);

  // Function to optimize component mounting during transitions
  const optimizePageTransition = () => {
    // Add loading class to body to disable heavy animations
    document.body.classList.add("page-transition-loading");

    // Remove after a short delay
    setTimeout(() => {
      document.body.classList.remove("page-transition-loading");
    }, 500);
  };

  return { optimizePageTransition };
}

/**
 * Hook to manage component lazy loading and performance
 */
export function useComponentOptimization() {
  useEffect(() => {
    // Reduce animation complexity on lower-end devices
    const reduceComplexAnimations = () => {
      const isLowEndDevice =
        navigator.hardwareConcurrency <= 4 ||
        (navigator as any).deviceMemory <= 4 ||
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      if (isLowEndDevice) {
        document.documentElement.classList.add("low-end-device");
      }
    };

    reduceComplexAnimations();
  }, []);

  // Intersection observer for lazy component loading
  const createObserver = (callback: () => void) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "50px" }
    );

    return observer;
  };

  return { createObserver };
}
