"use client";

import { Component, ComponentCategory } from "@/types";
import {
  SearchHeader,
  SearchInput,
  LoadingState,
  ErrorState,
  ComponentList,
  ActionButtons,
  useComponentSearch,
  getCategoryDisplayName,
} from "./ComponentSearch/index";

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
  const {
    searchTerm,
    setSearchTerm,
    components,
    isLoading,
    error,
    hasSearched,
    retrySearch,
  } = useComponentSearch(category);

  const categoryDisplayName = getCategoryDisplayName(category);

  return (
    <div
      className="space-y-4 animate-fade-in"
      role="search"
      aria-label={`Search for ${categoryDisplayName} components`}
    >
      <SearchHeader
        categoryDisplayName={categoryDisplayName}
        onCancel={onCancel}
      />

      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryDisplayName={categoryDisplayName}
        onCancel={onCancel}
      />

      {isLoading && <LoadingState />}

      {error && <ErrorState error={error} onRetry={retrySearch} />}

      {!isLoading && !error && (
        <ComponentList
          components={components}
          hasSearched={hasSearched}
          searchTerm={searchTerm}
          onComponentSelect={onComponentSelect}
        />
      )}

      <ActionButtons onCancel={onCancel} />
    </div>
  );
}
