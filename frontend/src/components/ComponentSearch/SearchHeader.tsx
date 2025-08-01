interface SearchHeaderProps {
  categoryDisplayName: string;
  onCancel: () => void;
}

export function SearchHeader({
  categoryDisplayName,
  onCancel,
}: SearchHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h4 className="text-base sm:text-lg font-semibold text-gray-900 truncate flex-1 min-w-0">
        Search {categoryDisplayName}
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
  );
}
