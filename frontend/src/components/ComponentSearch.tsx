"use client";

import { useState, useEffect, useCallback } from "react";
import { Component, ComponentCategory } from "@/types";
import { componentsApi } from "@/lib/api";

interface ComponentSearchProps {
  category: ComponentCategory;
  onComponentSelect: (component: Component) => void;
  onCancel: () => void;
}

export function ComponentSearch({
  category,
  onComponentSelect,
  onCancel,
}: ComponentSearchProps) {
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

  const handleComponentSelect = (component: Component) => {
    onComponentSelect(component);
  };

  const getCategoryDisplayName = (category: ComponentCategory): string => {
    const categoryNames: Record<ComponentCategory, string> = {
      bottom_bracket: "Bottom Bracket",
      cassette_derailleur: "Cassette/Derailleur",
      brake_system: "Brake System",
      wheel_frame: "Wheel/Frame",
      seatpost: "Seatpost",
    };
    return categoryNames[category] || category;
  };

  return (
    <div
      className="space-y-4 animate-fade-in"
      role="search"
      aria-label={`Search for ${getCategoryDisplayName(category)} components`}
    >
      {/* Search Header */}
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-base sm:text-lg font-semibold text-gray-900 truncate flex-1 min-w-0">
          Search {getCategoryDisplayName(category)}
        </h4>
        <button
          onClick={onCancel}
          className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-110 active:scale-95"
          aria-label="Cancel search and close dialog"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <label htmlFor="component-search" className="sr-only">
          Search {getCategoryDisplayName(category)} components
        </label>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400 transition-colors duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          id="component-search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Search ${getCategoryDisplayName(
            category
          ).toLowerCase()}...`}
          className="block w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 shadow-sm transition-all duration-200 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 hover:shadow-md"
          autoFocus
          aria-describedby="search-help"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              onCancel();
            }
          }}
        />
        <div id="search-help" className="sr-only">
          Type to search for components. Use arrow keys to navigate results.
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Searching...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
              <button
                onClick={() => searchComponents(searchTerm)}
                className="mt-2 text-sm text-red-600 hover:text-red-500 underline"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {!isLoading && !error && (
        <div
          className="space-y-3 max-h-80 sm:max-h-96 overflow-y-auto scrollbar-custom"
          role="listbox"
          aria-label="Component search results"
        >
          {components.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {hasSearched ? (
                searchTerm ? (
                  <>
                    <p className="text-base font-medium">
                      No components found for "{searchTerm}"
                    </p>
                    <p className="text-sm mt-2">
                      Try a different search term or check your spelling
                    </p>
                  </>
                ) : (
                  <p className="text-base">
                    No components available in this category
                  </p>
                )
              ) : (
                <p className="text-base">Start typing to search components</p>
              )}
            </div>
          ) : (
            components.map((component, index) => (
              <div
                key={component.id}
                className="group border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md transition-all duration-200 cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
                onClick={() => handleComponentSelect(component)}
                role="option"
                aria-selected="false"
                aria-describedby={`component-${component.id}-description`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleComponentSelect(component);
                  }
                }}
              >
                <div className="flex items-start space-x-4">
                  {/* Component Image */}
                  {component.image ? (
                    <img
                      src={component.image}
                      alt={`${component.brand} ${component.name}`}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow duration-200"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow duration-200">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Component Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div
                        className="flex-1 min-w-0"
                        id={`component-${component.id}-description`}
                      >
                        <h5 className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-900 transition-colors duration-200">
                          {component.brand} {component.name}
                        </h5>
                        {component.model && (
                          <p className="text-sm text-gray-600 truncate mt-1">
                            <span className="font-medium">Model:</span>{" "}
                            {component.model}
                          </p>
                        )}
                        {component.price_range && (
                          <p className="text-sm text-green-600 font-medium mt-1">
                            {component.price_range}
                          </p>
                        )}
                      </div>
                      <button
                        className="self-start px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleComponentSelect(component);
                        }}
                        aria-label={`Select ${component.brand} ${component.name}`}
                      >
                        Select
                      </button>
                    </div>

                    {component.description && (
                      <p className="mt-3 text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {component.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 bg-gray-50 -mx-4 -mb-4 px-4 pb-4 rounded-b-lg">
        <button
          onClick={onCancel}
          className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
