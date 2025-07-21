"use client";

import { useState } from "react";
import {
  BikeComponentArea,
  SelectedComponent,
  CompatibilityResult,
  ComponentCategory,
} from "@/types";

// Define bike component areas with coordinates for SVG interaction
export const BIKE_COMPONENT_AREAS: BikeComponentArea[] = [
  {
    id: "bottom-bracket",
    name: "Bottom Bracket",
    coordinates: { x: 330, y: 240, width: 45, height: 45 },
    category: "bottom_bracket" as ComponentCategory,
    isSelected: false,
  },
  {
    id: "cassette-derailleur",
    name: "Cassette/Derailleur",
    coordinates: { x: 510, y: 250, width: 60, height: 40 },
    category: "cassette_derailleur" as ComponentCategory,
    isSelected: false,
  },
  {
    id: "brake-system",
    name: "Brake System",
    coordinates: { x: 190, y: 130, width: 50, height: 35 },
    category: "brake_system" as ComponentCategory,
    isSelected: false,
  },
  {
    id: "wheel-frame",
    name: "Wheel/Frame",
    coordinates: { x: 150, y: 250, width: 70, height: 70 },
    category: "wheel_frame" as ComponentCategory,
    isSelected: false,
  },
  {
    id: "seatpost",
    name: "Seatpost",
    coordinates: { x: 305, y: 85, width: 30, height: 60 },
    category: "seatpost" as ComponentCategory,
    isSelected: false,
  },
];

interface BikeDiagramProps {
  selectedComponents: SelectedComponent[];
  onComponentClick: (area: BikeComponentArea) => void;
  compatibilityResults: CompatibilityResult[];
}

export function BikeDiagram({
  selectedComponents,
  onComponentClick,
  compatibilityResults,
}: BikeDiagramProps) {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  // Get compatibility status for a specific area
  const getCompatibilityStatus = (areaId: string) => {
    const selectedComponent = selectedComponents.find(
      (sc) => sc.area.id === areaId
    );
    if (!selectedComponent) return undefined;

    // If we have compatibility results, determine the overall status for this component
    if (compatibilityResults.length > 0) {
      const relevantResults = compatibilityResults.filter((result) => {
        // This is a simplified check - in a real implementation you'd need to
        // match results to specific component pairs
        return true;
      });

      if (relevantResults.some((r) => r.status === "incompatible"))
        return "incompatible";
      if (relevantResults.some((r) => r.status === "conditional"))
        return "conditional";
      if (relevantResults.some((r) => r.status === "compatible"))
        return "compatible";
    }

    return "selected";
  };

  // Get fill color based on selection and compatibility status
  const getFillColor = (area: BikeComponentArea) => {
    const isSelected = selectedComponents.some((sc) => sc.area.id === area.id);
    const compatibilityStatus = getCompatibilityStatus(area.id);
    const isHovered = hoveredArea === area.id;

    if (isHovered && !isSelected) {
      return "#e5e7eb"; // gray-200 for hover
    }

    if (!isSelected) {
      return "#f9fafb"; // gray-50 for unselected
    }

    switch (compatibilityStatus) {
      case "compatible":
        return "#10b981"; // green-500
      case "conditional":
        return "#f59e0b"; // amber-500
      case "incompatible":
        return "#ef4444"; // red-500
      case "selected":
        return "#3b82f6"; // blue-500
      default:
        return "#6b7280"; // gray-500
    }
  };

  // Get stroke color for better visibility
  const getStrokeColor = (area: BikeComponentArea) => {
    const isSelected = selectedComponents.some((sc) => sc.area.id === area.id);
    const isHovered = hoveredArea === area.id;

    if (isHovered) {
      return "#374151"; // gray-700
    }

    if (isSelected) {
      return "#1f2937"; // gray-800
    }

    return "#9ca3af"; // gray-400
  };

  const handleAreaClick = (area: BikeComponentArea) => {
    onComponentClick(area);
  };

  const handleMouseEnter = (areaId: string) => {
    setHoveredArea(areaId);
  };

  const handleMouseLeave = () => {
    setHoveredArea(null);
  };

  return (
    <div className="relative group">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-purple-50/50 to-pink-100/50 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

      <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 p-6 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 animate-pulse"></div>
        </div>

        <svg
          viewBox="0 0 700 400"
          className="w-full h-auto max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] relative z-10"
          role="img"
          aria-label="Interactive bike diagram for component selection"
          aria-describedby="bike-diagram-description"
          tabIndex={-1}
        >
          <defs>
            {/* Gradients for modern look */}
            <linearGradient
              id="frameGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#1f2937" />
              <stop offset="50%" stopColor="#374151" />
              <stop offset="100%" stopColor="#4b5563" />
            </linearGradient>

            <linearGradient
              id="wheelGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#111827" />
              <stop offset="100%" stopColor="#374151" />
            </linearGradient>

            {/* Drop shadow filter */}
            <filter
              id="dropShadow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feDropShadow
                dx="2"
                dy="4"
                stdDeviation="3"
                floodColor="#000000"
                floodOpacity="0.3"
              />
            </filter>

            {/* Glow effect */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <title>Interactive Bike Component Diagram</title>
          <desc id="bike-diagram-description">
            Click on highlighted areas to select bike components for
            compatibility checking
          </desc>

          {/* Modern Bike Frame */}
          <g
            stroke="url(#frameGradient)"
            strokeWidth="4"
            fill="none"
            filter="url(#dropShadow)"
          >
            {/* Main triangle frame with curves */}
            <path
              d="M 350 250 Q 250 150 250 120 Q 250 100 270 100 L 500 100 Q 520 100 520 120 Q 520 140 500 150 L 380 240 Z"
              fill="url(#frameGradient)"
              fillOpacity="0.1"
            />

            {/* Seat tube with curve */}
            <path
              d="M 350 250 Q 340 200 330 150 Q 325 120 320 100"
              strokeLinecap="round"
            />

            {/* Chain stays */}
            <path
              d="M 350 250 Q 400 260 450 270 Q 500 275 540 280"
              strokeLinecap="round"
            />

            {/* Seat stays */}
            <path
              d="M 330 100 Q 400 120 480 140 Q 520 150 540 160"
              strokeLinecap="round"
            />

            {/* Head tube */}
            <path d="M 250 120 Q 230 140 220 160" strokeLinecap="round" />

            {/* Fork */}
            <path d="M 220 160 Q 200 200 180 250" strokeLinecap="round" />

            {/* Top tube */}
            <path d="M 270 100 Q 350 95 430 100" strokeLinecap="round" />

            {/* Down tube */}
            <path d="M 250 120 Q 300 180 350 240" strokeLinecap="round" />
          </g>

          {/* Modern Wheels with spokes */}
          <g filter="url(#dropShadow)">
            {/* Front wheel */}
            <circle
              cx="180"
              cy="280"
              r="35"
              stroke="url(#wheelGradient)"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="180"
              cy="280"
              r="25"
              stroke="#374151"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
            <circle
              cx="180"
              cy="280"
              r="15"
              stroke="#4b5563"
              strokeWidth="1"
              fill="none"
              opacity="0.4"
            />
            {/* Spokes */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <line
                key={i}
                x1={180 + Math.cos((angle * Math.PI) / 180) * 15}
                y1={280 + Math.sin((angle * Math.PI) / 180) * 15}
                x2={180 + Math.cos((angle * Math.PI) / 180) * 30}
                y2={280 + Math.sin((angle * Math.PI) / 180) * 30}
                stroke="#6b7280"
                strokeWidth="1"
                opacity="0.7"
              />
            ))}

            {/* Rear wheel */}
            <circle
              cx="540"
              cy="280"
              r="35"
              stroke="url(#wheelGradient)"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="540"
              cy="280"
              r="25"
              stroke="#374151"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
            <circle
              cx="540"
              cy="280"
              r="15"
              stroke="#4b5563"
              strokeWidth="1"
              fill="none"
              opacity="0.4"
            />
            {/* Spokes */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <line
                key={i}
                x1={540 + Math.cos((angle * Math.PI) / 180) * 15}
                y1={280 + Math.sin((angle * Math.PI) / 180) * 15}
                x2={540 + Math.cos((angle * Math.PI) / 180) * 30}
                y2={280 + Math.sin((angle * Math.PI) / 180) * 30}
                stroke="#6b7280"
                strokeWidth="1"
                opacity="0.7"
              />
            ))}
          </g>

          {/* Handlebars */}
          <g
            stroke="#374151"
            strokeWidth="3"
            fill="none"
            filter="url(#dropShadow)"
          >
            <path d="M 200 140 Q 220 130 240 140" strokeLinecap="round" />
            <line x1="220" y1="135" x2="220" y2="160" strokeLinecap="round" />
          </g>

          {/* Seat */}
          <ellipse
            cx="320"
            cy="95"
            rx="25"
            ry="8"
            fill="#374151"
            filter="url(#dropShadow)"
          />

          {/* Pedals */}
          <ellipse
            cx="340"
            cy="265"
            rx="8"
            ry="4"
            fill="#4b5563"
            filter="url(#dropShadow)"
          />
          <ellipse
            cx="360"
            cy="265"
            rx="8"
            ry="4"
            fill="#4b5563"
            filter="url(#dropShadow)"
          />

          {/* Component Areas */}
          {BIKE_COMPONENT_AREAS.map((area) => (
            <g key={area.id}>
              {/* Clickable area */}
              <rect
                x={area.coordinates.x}
                y={area.coordinates.y}
                width={area.coordinates.width}
                height={area.coordinates.height}
                fill={getFillColor(area)}
                stroke={getStrokeColor(area)}
                strokeWidth="2"
                rx="4"
                className="cursor-pointer transition-all duration-300 hover:drop-shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-105 active:scale-95"
                onClick={() => handleAreaClick(area)}
                onMouseEnter={() => handleMouseEnter(area.id)}
                onMouseLeave={handleMouseLeave}
                role="button"
                aria-label={`Select ${area.name} component${
                  selectedComponents.some((sc) => sc.area.id === area.id)
                    ? " (currently selected)"
                    : ""
                }`}
                aria-pressed={selectedComponents.some(
                  (sc) => sc.area.id === area.id
                )}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleAreaClick(area);
                  }
                }}
              />

              {/* Area label */}
              <text
                x={area.coordinates.x + area.coordinates.width / 2}
                y={area.coordinates.y + area.coordinates.height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-medium fill-current pointer-events-none select-none"
                fill={
                  selectedComponents.some((sc) => sc.area.id === area.id)
                    ? "white"
                    : "#374151"
                }
              >
                {area.name.split("/")[0]}{" "}
                {/* Show first part of name if it contains '/' */}
              </text>
            </g>
          ))}

          {/* Tooltip */}
          {hoveredArea && (
            <g>
              {(() => {
                const area = BIKE_COMPONENT_AREAS.find(
                  (a) => a.id === hoveredArea
                );
                if (!area) return null;

                const selectedComponent = selectedComponents.find(
                  (sc) => sc.area.id === area.id
                );
                const tooltipText = selectedComponent
                  ? `${area.name}: ${selectedComponent.component.brand} ${selectedComponent.component.name}`
                  : `Click to select ${area.name}`;

                const tooltipX =
                  area.coordinates.x + area.coordinates.width / 2;
                const tooltipY = area.coordinates.y - 10;

                return (
                  <>
                    <rect
                      x={tooltipX - tooltipText.length * 3}
                      y={tooltipY - 20}
                      width={tooltipText.length * 6}
                      height="20"
                      fill="#1f2937"
                      rx="4"
                      className="opacity-90"
                    />
                    <text
                      x={tooltipX}
                      y={tooltipY - 6}
                      textAnchor="middle"
                      className="text-xs fill-white font-medium"
                    >
                      {tooltipText}
                    </text>
                  </>
                );
              })()}
            </g>
          )}
        </svg>
      </div>

      {/* Legend */}
      <div
        className="mt-4 p-3 bg-white rounded-lg border border-gray-200 shadow-sm"
        role="region"
        aria-label="Component status legend"
      >
        <h4 className="text-sm font-medium text-gray-900 mb-2 sr-only">
          Status Legend
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-sm">
          <div className="flex items-center gap-2 transition-transform duration-150 hover:scale-105">
            <div
              className="w-4 h-4 bg-gray-50 border border-gray-400 rounded shadow-sm"
              aria-hidden="true"
            ></div>
            <span className="text-gray-700">Unselected</span>
          </div>
          <div className="flex items-center gap-2 transition-transform duration-150 hover:scale-105">
            <div
              className="w-4 h-4 bg-blue-500 rounded shadow-sm"
              aria-hidden="true"
            ></div>
            <span className="text-gray-700">Selected</span>
          </div>
          <div className="flex items-center gap-2 transition-transform duration-150 hover:scale-105">
            <div
              className="w-4 h-4 bg-green-500 rounded shadow-sm"
              aria-hidden="true"
            ></div>
            <span className="text-gray-700">Compatible</span>
          </div>
          <div className="flex items-center gap-2 transition-transform duration-150 hover:scale-105">
            <div
              className="w-4 h-4 bg-amber-500 rounded shadow-sm"
              aria-hidden="true"
            ></div>
            <span className="text-gray-700">Conditional</span>
          </div>
          <div className="flex items-center gap-2 transition-transform duration-150 hover:scale-105">
            <div
              className="w-4 h-4 bg-red-500 rounded shadow-sm"
              aria-hidden="true"
            ></div>
            <span className="text-gray-700">Incompatible</span>
          </div>
        </div>
      </div>
    </div>
  );
}
