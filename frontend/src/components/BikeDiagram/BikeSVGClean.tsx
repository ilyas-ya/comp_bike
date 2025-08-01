import React from "react";
import {
  BikeComponentArea,
  SelectedComponent,
  CompatibilityResult,
} from "@/types";
import { SVGFilters } from "./SVGFilters";
import { BikeFrameClean } from "./BikeFrameClean";
import { BikeWheelsClean } from "./BikeWheelsClean";
import { BikeComponentsClean } from "./BikeComponentsClean";
import { InteractiveAreas } from "./InteractiveAreas";
import { BikeTooltip } from "./BikeTooltip";
import { BIKE_COMPONENT_AREAS } from "./constants";

interface BikeSVGCleanProps {
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

export function BikeSVGClean({
  selectedComponents,
  hoveredArea,
  clickedArea,
  isClickActive,
  compatibilityResults,
  getCompatibilityStatus,
  onAreaClick,
  onMouseEnter,
  onMouseLeave,
}: BikeSVGCleanProps) {
  return (
    <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
      <svg
        viewBox="0 0 700 400"
        className="bike-diagram-svg w-full h-auto relative z-10"
        role="img"
        aria-label="Interactive bike diagram for component selection - Clean Design"
        aria-describedby="bike-diagram-description"
        tabIndex={-1}
      >
        <SVGFilters />

        <title>Interactive Bike Component Diagram - Clean Design</title>
        <desc id="bike-diagram-description">
          Professional bike diagram with realistic proportions and clean design.
          Click on highlighted areas to select bike components for compatibility
          checking.
        </desc>

        {/* Background grid pour plus de professionnalisme */}
        <defs>
          <pattern
            id="grid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="#333"
              strokeWidth="0.5"
              opacity="0.1"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Bike Frame Clean */}
        <BikeFrameClean />

        {/* Bike Wheels Clean */}
        <BikeWheelsClean />

        {/* Other Bike Components Clean */}
        <BikeComponentsClean />

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

        {/* Branding/watermark discret */}
        <text
          x="680"
          y="390"
          fontSize="8"
          fill="#666"
          opacity="0.5"
          textAnchor="end"
          fontFamily="monospace"
        >
          BikeCompatibility Pro
        </text>
      </svg>
    </div>
  );
}
