import BikeDiagram from "../BikeDiagram";
import {
  SelectedComponent,
  BikeComponentArea,
  CompatibilityResult,
} from "@/types";

interface BikeDiagramSectionProps {
  selectedComponents: SelectedComponent[];
  onComponentClick: (area: BikeComponentArea) => void;
  compatibilityResults: CompatibilityResult[];
}

export function BikeDiagramSection({
  selectedComponents,
  onComponentClick,
  compatibilityResults,
}: BikeDiagramSectionProps) {
  return (
    <div className="xl:col-span-2 order-1">
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-3 sm:p-4 md:p-6 animate-fade-in">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
          <svg
            className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-blue-600 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="truncate">Interactive Bike Diagram</span>
        </h2>
        <BikeDiagram
          selectedComponents={selectedComponents}
          onComponentClick={onComponentClick}
          compatibilityResults={compatibilityResults}
        />
      </div>
    </div>
  );
}
