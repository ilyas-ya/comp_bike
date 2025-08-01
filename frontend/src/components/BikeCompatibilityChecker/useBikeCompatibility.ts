import { useState } from "react";
import {
  SelectedComponent,
  BikeComponentArea,
  Component,
  CompatibilityResult,
} from "@/types";
import { compatibilityApi } from "@/lib/api";

export function useBikeCompatibility() {
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

  return {
    selectedComponents,
    activeArea,
    compatibilityResults,
    isLoading,
    handleComponentAreaClick,
    handleComponentSelect,
    handleRemoveComponent,
    setActiveArea,
  };
}
