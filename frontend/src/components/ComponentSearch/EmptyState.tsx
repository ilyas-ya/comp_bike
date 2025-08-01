interface EmptyStateProps {
  hasSearched: boolean;
  searchTerm: string;
}

export function EmptyState({ hasSearched, searchTerm }: EmptyStateProps) {
  return (
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
          <p className="text-base">No components available in this category</p>
        )
      ) : (
        <p className="text-base">Start typing to search components</p>
      )}
    </div>
  );
}
