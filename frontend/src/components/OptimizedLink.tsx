"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOptimizedNavigation } from "@/hooks/useNavigation";
import { useEffect } from "react";

interface OptimizedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  prefetch?: boolean;
  withFade?: boolean;
}

/**
 * Composant Link optimisé pour des transitions fluides
 */
export function OptimizedLink({
  href,
  children,
  className = "",
  onClick,
  prefetch = true,
  withFade = false,
}: OptimizedLinkProps) {
  const pathname = usePathname();
  const { navigateWithFade, prefetchRoute } = useOptimizedNavigation();

  // Précharger la route si elle est importante
  useEffect(() => {
    if (prefetch && href.startsWith("/")) {
      prefetchRoute(href);
    }
  }, [href, prefetch, prefetchRoute]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Exécuter le callback onClick si fourni
    if (onClick) {
      onClick();
    }

    // Ne pas naviguer si on est déjà sur la page
    if (pathname === href) {
      return;
    }

    // Navigation avec ou sans effet de fondu
    if (withFade) {
      navigateWithFade(href);
    } else {
      // Utiliser Link natif pour une navigation instantanée
      window.history.pushState(null, "", href);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  // Pour les liens internes, utiliser notre navigation optimisée
  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        className={className}
        onClick={handleClick}
        prefetch={prefetch}
      >
        {children}
      </Link>
    );
  }

  // Pour les liens externes ou anchors, utiliser un lien normal
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

/**
 * Hook pour créer des liens de navigation optimisés
 */
export function useNavigationLinks() {
  const { navigateTo, isPending } = useOptimizedNavigation();

  const createNavHandler = (path: string) => () => {
    navigateTo(path);
  };

  return { createNavHandler, isPending };
}
