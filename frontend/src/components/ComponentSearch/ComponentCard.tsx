import { Component } from "@/types";

interface ComponentCardProps {
  component: Component;
  onSelect: (component: Component) => void;
}

export function ComponentCard({ component, onSelect }: ComponentCardProps) {
  const handleSelect = () => {
    onSelect(component);
  };

  return (
    <div
      className="group border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md transition-all duration-200 cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
      onClick={handleSelect}
      role="option"
      aria-selected="false"
      aria-describedby={`component-${component.id}-description`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSelect();
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
                  <span className="font-medium">Model:</span> {component.model}
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
                handleSelect();
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
  );
}
