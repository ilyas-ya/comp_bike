import React from "react";
import {
  BikeComponentArea,
  SelectedComponent,
  CompatibilityResult,
} from "@/types";
import { SVGFilters } from "./SVGFilters";
import { BikeFrame } from "./BikeFrame";
import { BikeWheels } from "./BikeWheels";
import { BikeComponents } from "./BikeComponents";
import { InteractiveAreas } from "./InteractiveAreas";
import { BikeTooltip } from "./BikeTooltip";
import { BIKE_COMPONENT_AREAS } from "./constants";

interface BikeSVGProps {
  selectedComponents: SelectedComponent[];
  hoveredArea: string | null;
  clickedArea: string | null;
  isClickActive: boolean;
  compatibilityResults: CompatibilityResult[];
  getCompatibilityStatus: (areaId: string) => string | undefined;
  onAreaClick: (area: BikeComponentArea) => void;
  onMouseEnter: (areaId: string) => void;
  onMouseLeave: () => void;
}

export function BikeSVG({
  selectedComponents,
  hoveredArea,
  clickedArea,
  isClickActive,
  compatibilityResults,
  getCompatibilityStatus,
  onAreaClick,
  onMouseEnter,
  onMouseLeave,
}: BikeSVGProps) {
  return (
    <svg
      viewBox="0 0 700 400"
      className="bike-diagram-svg w-full h-auto relative z-10"
      role="img"
      aria-label="Interactive bike diagram for component selection"
      aria-describedby="bike-diagram-description"
      tabIndex={-1}
    >
      <SVGFilters />

      <title>Interactive Bike Component Diagram</title>
      <desc id="bike-diagram-description">
        Click on highlighted areas to select bike components for compatibility
        checking
      </desc>

      {/* Bike Frame */}
      <BikeFrame />

      {/* Bike Wheels */}
      <BikeWheels />

      {/* Other Bike Components */}
      <BikeComponents />

      {/* Interactive Areas */}
      <InteractiveAreas
        areas={BIKE_COMPONENT_AREAS}
        selectedComponents={selectedComponents}
        hoveredArea={hoveredArea}
        clickedArea={clickedArea}
        isClickActive={isClickActive}
        getCompatibilityStatus={getCompatibilityStatus}
        onAreaClick={onAreaClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />

      {/* Tooltip */}
      <BikeTooltip
        hoveredArea={hoveredArea}
        selectedComponents={selectedComponents}
        getCompatibilityStatus={getCompatibilityStatus}
      />
    </svg>
  );
}
