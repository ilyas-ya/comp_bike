import { SelectedComponent } from "@/types";

interface SelectedComponentsListProps {
  selectedComponents: SelectedComponent[];
  onRemoveComponent: (areaId: string) => void;
}

export function SelectedComponentsList({
  selectedComponents,
  onRemoveComponent,
}: SelectedComponentsListProps) {
  if (selectedComponents.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-3 sm:p-4 md:p-6 animate-slide-up">
      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
        <svg
          className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span className="truncate">Selected Components</span>
      </h3>
      <div className="space-y-2 sm:space-y-3">
        {selectedComponents.map((selection, index) => (
          <div
            key={selection.area.id}
            className="group flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 hover:scale-[1.02] focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm sm:text-base text-gray-900 truncate">
                {selection.area.name}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 truncate">
                {selection.component.brand} {selection.component.name}
              </div>
            </div>
            <button
              onClick={() => onRemoveComponent(selection.area.id)}
              className="ml-3 p-1.5 sm:p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 hover:scale-110 active:scale-95 flex-shrink-0"
              aria-label={`Remove ${selection.area.name} component`}
            >
              <svg
                className="h-3 w-3 sm:h-4 sm:w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
