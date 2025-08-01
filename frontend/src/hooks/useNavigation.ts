"use client";

import { useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";

/**
 * Hook pour des transitions de pages optimisées sans rechargement
 */
export function useOptimizedNavigation() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Navigation optimisée avec transition
  const navigateTo = useCallback(
    (path: string) => {
      startTransition(() => {
        // Ajouter une classe pour indiquer la transition
        document.body.classList.add("page-transitioning");

        router.push(path);

        // Retirer la classe après la transition
        setTimeout(() => {
          document.body.classList.remove("page-transitioning");
        }, 300);
      });
    },
    [router]
  );

  // Navigation avec effet de fondu
  const navigateWithFade = useCallback(
    (path: string, delay = 150) => {
      // Effet de fondu sortant
      document.body.style.opacity = "0.7";
      document.body.style.transition = "opacity 150ms ease-out";

      setTimeout(() => {
        startTransition(() => {
          router.push(path);

          // Effet de fondu entrant
          setTimeout(() => {
            document.body.style.opacity = "1";
            document.body.style.transition = "";
          }, 50);
        });
      }, delay);
    },
    [router]
  );

  // Préchargement des routes importantes
  const prefetchRoute = useCallback(
    (path: string) => {
      router.prefetch(path);
    },
    [router]
  );

  return {
    navigateTo,
    navigateWithFade,
    prefetchRoute,
    isPending,
  };
}

/**
 * Hook pour la navigation avec gestion des erreurs
 */
export function useSafeNavigation() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const navigate = useCallback(
    (
      path: string,
      options?: {
        replace?: boolean;
        scroll?: boolean;
        withTransition?: boolean;
      }
    ) => {
      try {
        const {
          replace = false,
          scroll = true,
          withTransition = true,
        } = options || {};

        if (withTransition) {
          startTransition(() => {
            if (replace) {
              router.replace(path, { scroll });
            } else {
              router.push(path, { scroll });
            }
          });
        } else {
          if (replace) {
            router.replace(path, { scroll });
          } else {
            router.push(path, { scroll });
          }
        }
      } catch (error) {
        console.error("Navigation error:", error);
        // Fallback vers navigation classique
        window.location.href = path;
      }
    },
    [router]
  );

  return { navigate, isPending };
}

/**
 * Hook pour détecter le changement de route
 */
export function useRouteChange() {
  const router = useRouter();

  // Fonction pour exécuter du code avant le changement de route
  const beforeRouteChange = useCallback((callback: () => void) => {
    callback();
  }, []);

  // Fonction pour exécuter du code après le changement de route
  const afterRouteChange = useCallback((callback: () => void) => {
    // Utiliser un court délai pour s'assurer que la route a changé
    setTimeout(callback, 100);
  }, []);

  return { beforeRouteChange, afterRouteChange };
}
