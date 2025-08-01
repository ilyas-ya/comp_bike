interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryDisplayName: string;
  onCancel: () => void;
}

export function SearchInput({
  searchTerm,
  setSearchTerm,
  categoryDisplayName,
  onCancel,
}: SearchInputProps) {
  return (
    <div className="relative">
      <label htmlFor="component-search" className="sr-only">
        Search {categoryDisplayName} components
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
        placeholder={`Search ${categoryDisplayName.toLowerCase()}...`}
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
  );
}
