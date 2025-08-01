import { CompatibilityDisplay } from "../CompatibilityDisplay";
import { CompatibilityResult, SelectedComponent } from "@/types";

interface CompatibilityResultsSectionProps {
  compatibilityResults: CompatibilityResult[];
  selectedComponents: SelectedComponent[];
  isLoading: boolean;
}

export function CompatibilityResultsSection({
  compatibilityResults,
  selectedComponents,
  isLoading,
}: CompatibilityResultsSectionProps) {
  if (compatibilityResults.length === 0 && !isLoading) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-3 sm:p-4 md:p-6 animate-slide-up">
      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
        <svg
          className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <span className="truncate">Compatibility Results</span>
      </h3>
      {isLoading ? (
        <div className="text-center py-6 sm:py-8">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 font-medium">
            Checking compatibility...
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            This may take a few seconds
          </p>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {compatibilityResults.map((result, index) => (
            <div
              key={index}
              style={{ animationDelay: `${index * 150}ms` }}
              className="animate-slide-up"
            >
              <CompatibilityDisplay
                result={result}
                components={[
                  selectedComponents[
                    Math.floor(index / (selectedComponents.length - 1))
                  ].component,
                  selectedComponents[
                    (index % (selectedComponents.length - 1)) + 1
                  ].component,
                ]}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
