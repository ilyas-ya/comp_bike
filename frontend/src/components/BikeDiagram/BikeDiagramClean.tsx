"use client";

import { useState, useCallback, useEffect } from "react";
import "./BikeDiagram.css";
import {
  BikeComponentArea,
  SelectedComponent,
  CompatibilityResult,
} from "@/types";
import {
  useHoverDebounce,
  useDebounce,
  useAnimationState,
} from "@/hooks/useDebounce";
import { useResponsiveClasses } from "@/hooks/useResponsive";

import { BikeSVGClean } from "./BikeSVGClean";
import Bike3DView from "./Bike3DView";
import { ComponentLegend } from "./ComponentLegend";
import { BIKE_COMPONENT_AREAS } from "./constants";

interface BikeDiagramCleanProps {
  selectedComponents: SelectedComponent[];
  onComponentClick: (area: BikeComponentArea) => void;
  compatibilityResults: CompatibilityResult[];
}

export function BikeDiagramClean({
  selectedComponents,
  onComponentClick,
  compatibilityResults,
}: BikeDiagramCleanProps) {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const [clickedArea, setClickedArea] = useState<string | null>(null);
  const [isInteractionActive, setIsInteractionActive] =
    useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");

  // Responsive optimization hooks
  const { getContainerClass } = useResponsiveClasses();

  // Animation state management
  const { requestAnimationFrame, cancelAnimation } = useAnimationState();

  // Debounced click handler
  const [debouncedClick, cancelClick, isClickActive] = useDebounce(
    useCallback(
      (area: BikeComponentArea) => {
        setClickedArea(area.id);
        requestAnimationFrame(() => {
          onComponentClick(area);
          setTimeout(() => setClickedArea(null), 300);
        });
      },
      [onComponentClick, requestAnimationFrame]
    ),
    150
  );

  // Enhanced hover handling
  const {
    handleMouseEnter: debouncedMouseEnter,
    handleMouseLeave: debouncedMouseLeave,
    cleanup: cleanupHover,
  } = useHoverDebounce(
    useCallback((areaId: string) => {
      setHoveredArea(areaId);
      setIsInteractionActive(true);
    }, []),
    useCallback(() => {
      setHoveredArea(null);
      setIsInteractionActive(false);
    }, []),
    50,
    100
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelClick();
      cleanupHover();
      cancelAnimation();
    };
  }, [cancelClick, cleanupHover, cancelAnimation]);

  // Get compatibility status for a specific area
  const getCompatibilityStatus = (areaId: string) => {
    const selectedComponent = selectedComponents.find(
      (sc) => sc.area.id === areaId
    );
    if (!selectedComponent) return undefined;

    if (compatibilityResults.length > 0) {
      const relevantResults = compatibilityResults.filter(() => true);
      if (relevantResults.some((r) => r.status === "incompatible"))
        return "incompatible";
      if (relevantResults.some((r) => r.status === "conditional"))
        return "conditional";
      if (relevantResults.some((r) => r.status === "compatible"))
        return "compatible";
    }

    return "selected";
  };

  const handleAreaClick = (area: BikeComponentArea) => {
    debouncedClick(area);
  };

  const handleMouseEnter = (areaId: string) => {
    debouncedMouseEnter(areaId);
  };

  const handleMouseLeave = () => {
    debouncedMouseLeave();
  };

  return (
    <div className="relative group">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-red-800/10 to-red-700/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

      <div className={getContainerClass()}>
        {/* Header avec toggle 2D/3D */}
        <div className="flex justify-between items-center mb-4 relative z-10">
          <h3 className="text-xl font-bold text-white flex items-center">
            <span className="text-red-400 mr-2">🚴‍♂️</span>
            Bike Component Diagram
          </h3>

          <div className="flex bg-gray-800/80 rounded-lg p-1 backdrop-blur-sm">
            <button
              onClick={() => setViewMode("2d")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                viewMode === "2d"
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              📐 2D View
            </button>
            <button
              onClick={() => setViewMode("3d")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                viewMode === "3d"
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              🚀 3D View
            </button>
          </div>
        </div>

        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600 via-red-500 to-red-400 animate-pulse"></div>
        </div>

        {/* Vue conditionnelle */}
        <div className="relative z-10">
          {viewMode === "2d" ? (
            <BikeSVGClean
              selectedComponents={selectedComponents}
              hoveredArea={hoveredArea}
              clickedArea={clickedArea}
              isClickActive={isClickActive}
              compatibilityResults={compatibilityResults}
              getCompatibilityStatus={getCompatibilityStatus}
              onAreaClick={handleAreaClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          ) : (
            <Bike3DView
              selectedComponents={selectedComponents}
              onComponentClick={handleAreaClick}
            />
          )}
        </div>
      </div>

      <ComponentLegend />
    </div>
  );
}

// Export des constantes pour la compatibilité
export { BIKE_COMPONENT_AREAS };

// Export du composant par défaut
export default BikeDiagramClean;
