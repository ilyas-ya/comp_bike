"use client";

import { useEffect } from "react";
import { usePageTransitionOptimization } from "@/hooks/usePerformanceOptimization";

interface PageTemplateProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

/**
 * Template de page avec optimisations de performance automatiques
 */
export function PageTemplate({
  children,
  title = "Comp.bike",
  className = "",
}: PageTemplateProps) {
  const { optimizePageTransition } = usePageTransitionOptimization();

  useEffect(() => {
    // Optimiser lors du montage de la page
    optimizePageTransition();

    // Précharger les routes importantes
    const prefetchRoutes = ["/landing", "/app"];
    prefetchRoutes.forEach((route) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = route;
      document.head.appendChild(link);
    });

    // Nettoyage
    return () => {
      document.body.classList.remove("page-transitioning");
    };
  }, [optimizePageTransition]);

  return <div className={`min-h-screen ${className}`}>{children}</div>;
}

/**
 * HOC pour wrapper automatiquement les pages avec les optimisations
 */
export function withPageOptimizations<T extends object>(
  Component: React.ComponentType<T>
) {
  return function OptimizedPage(props: T) {
    return (
      <PageTemplate>
        <Component {...props} />
      </PageTemplate>
    );
  };
}
