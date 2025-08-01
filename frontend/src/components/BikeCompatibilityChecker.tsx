"use client";

import {
  useBikeCompatibility,
  BikeDiagramSection,
  ComponentSearchSection,
  SelectedComponentsList,
  CompatibilityResultsSection,
} from "./BikeCompatibilityChecker/index";

export function BikeCompatibilityChecker() {
  const {
    selectedComponents,
    activeArea,
    compatibilityResults,
    isLoading,
    handleComponentAreaClick,
    handleComponentSelect,
    handleRemoveComponent,
    setActiveArea,
  } = useBikeCompatibility();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      <BikeDiagramSection
        selectedComponents={selectedComponents}
        onComponentClick={handleComponentAreaClick}
        compatibilityResults={compatibilityResults}
      />

      <div className="space-y-4 sm:space-y-6 order-2">
        <ComponentSearchSection
          activeArea={activeArea}
          onComponentSelect={handleComponentSelect}
          onCancel={() => setActiveArea(null)}
        />

        <SelectedComponentsList
          selectedComponents={selectedComponents}
          onRemoveComponent={handleRemoveComponent}
        />

        <CompatibilityResultsSection
          compatibilityResults={compatibilityResults}
          selectedComponents={selectedComponents}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
