import { ComponentSearch } from "../ComponentSearch";
import { BikeComponentArea, Component } from "@/types";

interface ComponentSearchSectionProps {
  activeArea: BikeComponentArea | null;
  onComponentSelect: (component: Component) => void;
  onCancel: () => void;
}

export function ComponentSearchSection({
  activeArea,
  onComponentSelect,
  onCancel,
}: ComponentSearchSectionProps) {
  if (!activeArea) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-3 sm:p-4 md:p-6 animate-slide-up">
      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
        <svg
          className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0"
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
        <span className="truncate">Select {activeArea.name}</span>
      </h3>
      <ComponentSearch
        category={activeArea.category}
        onComponentSelect={onComponentSelect}
        onCancel={onCancel}
      />
    </div>
  );
}
