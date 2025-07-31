import { useCallback, useRef } from "react";

/**
 * Custom hook for debouncing rapid interactions to improve performance
 * Prevents excessive animation triggers and ensures smooth user experience
 */
export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): [T, () => void, boolean] {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isActiveRef = useRef<boolean>(false);

  const debouncedCallback = useCallback(
    ((...args: Parameters<T>) => {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set active state for visual feedback
      isActiveRef.current = true;

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        callback(...args);
        isActiveRef.current = false;
      }, delay);
    }) as T,
    [callback, delay]
  );

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    isActiveRef.current = false;
  }, []);

  const isActive = isActiveRef.current;

  return [debouncedCallback, cancel, isActive];
}

/**
 * Custom hook for debouncing hover interactions specifically
 * Optimized for bike diagram area interactions
 */
export function useHoverDebounce(
  onHoverStart: (id: string) => void,
  onHoverEnd: () => void,
  hoverDelay: number = 50,
  leaveDelay: number = 150
) {
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentHoveredRef = useRef<string | null>(null);

  const handleMouseEnter = useCallback(
    (id: string) => {
      // Clear any pending leave timeout
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
        leaveTimeoutRef.current = null;
      }

      // If already hovering the same element, do nothing
      if (currentHoveredRef.current === id) {
        return;
      }

      // Clear any pending hover timeout
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }

      // Set new hover timeout
      hoverTimeoutRef.current = setTimeout(() => {
        currentHoveredRef.current = id;
        onHoverStart(id);
      }, hoverDelay);
    },
    [onHoverStart, hoverDelay]
  );

  const handleMouseLeave = useCallback(() => {
    // Clear any pending hover timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // Set leave timeout
    leaveTimeoutRef.current = setTimeout(() => {
      currentHoveredRef.current = null;
      onHoverEnd();
    }, leaveDelay);
  }, [onHoverEnd, leaveDelay]);

  const cleanup = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    currentHoveredRef.current = null;
  }, []);

  return {
    handleMouseEnter,
    handleMouseLeave,
    cleanup,
    currentHovered: currentHoveredRef.current,
  };
}

/**
 * Custom hook for managing animation states with performance optimization
 */
export function useAnimationState() {
  const animationFrameRef = useRef<number | null>(null);
  const isAnimatingRef = useRef<boolean>(false);

  const requestAnimationFrame = useCallback((callback: () => void) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    isAnimatingRef.current = true;
    animationFrameRef.current = window.requestAnimationFrame(() => {
      callback();
      isAnimatingRef.current = false;
    });
  }, []);

  const cancelAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    isAnimatingRef.current = false;
  }, []);

  return {
    requestAnimationFrame,
    cancelAnimation,
    isAnimating: isAnimatingRef.current,
  };
}
