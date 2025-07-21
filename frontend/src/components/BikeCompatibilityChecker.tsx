"use client";

import { useState } from "react";
import { BikeDiagram } from "./BikeDiagram";
import { ComponentSearch } from "./ComponentSearch";
import { CompatibilityDisplay } from "./CompatibilityDisplay";
import {
  SelectedComponent,
  BikeComponentArea,
  Component,
  CompatibilityResult,
} from "@/types";
import { compatibilityApi } from "@/lib/api";

export function BikeCompatibilityChecker() {
  const [selectedComponents, setSelectedComponents] = useState<
    SelectedComponent[]
  >([]);
  const [activeArea, setActiveArea] = useState<BikeComponentArea | null>(null);
  const [compatibilityResults, setCompatibilityResults] = useState<
    CompatibilityResult[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleComponentAreaClick = (area: BikeComponentArea) => {
    setActiveArea(area);
  };

  const handleComponentSelect = async (component: Component) => {
    if (!activeArea) return;

    const newSelection: SelectedComponent = {
      area: activeArea,
      component,
    };

    const updatedSelections = [
      ...selectedComponents.filter((s) => s.area.id !== activeArea.id),
      newSelection,
    ];

    setSelectedComponents(updatedSelections);
    setActiveArea(null);

    // Check compatibility with other selected components
    if (updatedSelections.length > 1) {
      await checkAllCompatibilities(updatedSelections);
    }
  };

  const checkAllCompatibilities = async (selections: SelectedComponent[]) => {
    setIsLoading(true);
    const results: CompatibilityResult[] = [];

    try {
      // Check compatibility between all pairs
      for (let i = 0; i < selections.length; i++) {
        for (let j = i + 1; j < selections.length; j++) {
          const componentA = selections[i].component;
          const componentB = selections[j].component;

          const response = await compatibilityApi.checkCompatibility(
            componentA.id,
            componentB.id
          );
          results.push(response.data);
        }
      }

      setCompatibilityResults(results);
    } catch (error) {
      console.error("Error checking compatibility:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveComponent = (areaId: string) => {
    const updatedSelections = selectedComponents.filter(
      (s) => s.area.id !== areaId
    );
    setSelectedComponents(updatedSelections);

    if (updatedSelections.length > 1) {
      checkAllCompatibilities(updatedSelections);
    } else {
      setCompatibilityResults([]);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      {/* Bike Diagram */}
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
            onComponentClick={handleComponentAreaClick}
            compatibilityResults={compatibilityResults}
          />
        </div>
      </div>

      {/* Component Search & Results */}
      <div className="space-y-4 sm:space-y-6 order-2">
        {/* Component Search */}
        {activeArea && (
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
              onComponentSelect={handleComponentSelect}
              onCancel={() => setActiveArea(null)}
            />
          </div>
        )}

        {/* Selected Components */}
        {selectedComponents.length > 0 && (
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
                    onClick={() => handleRemoveComponent(selection.area.id)}
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
        )}

        {/* Compatibility Results */}
        {compatibilityResults.length > 0 && (
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
        )}
      </div>
    </div>
  );
}
