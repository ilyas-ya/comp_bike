import { useState, useEffect, useCallback } from "react";
import { Component, ComponentCategory } from "@/types";
import { componentsApi } from "@/lib/api";

export function useComponentSearch(category: ComponentCategory) {
  const [searchTerm, setSearchTerm] = useState("");
  const [components, setComponents] = useState<Component[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Debounced search function
  const searchComponents = useCallback(
    async (term: string) => {
      if (!term.trim() && !hasSearched) {
        // Load initial components for the category
        setIsLoading(true);
        setError(null);

        try {
          const response = await componentsApi.search({
            category,
            limit: 20,
          });
          setComponents(response.data);
          setHasSearched(true);
        } catch (err) {
          setError("Failed to load components. Please try again.");
          console.error("Error loading components:", err);
        } finally {
          setIsLoading(false);
        }
        return;
      }

      if (!term.trim()) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await componentsApi.search({
          category,
          search: term.trim(),
          limit: 20,
        });
        setComponents(response.data);
      } catch (err) {
        setError("Search failed. Please try again.");
        console.error("Error searching components:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [category, hasSearched]
  );

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchComponents(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, searchComponents]);

  // Load initial components when component mounts
  useEffect(() => {
    if (!hasSearched) {
      searchComponents("");
    }
  }, [searchComponents, hasSearched]);

  const retrySearch = () => {
    searchComponents(searchTerm);
  };

  return {
    searchTerm,
    setSearchTerm,
    components,
    isLoading,
    error,
    hasSearched,
    retrySearch,
  };
}
