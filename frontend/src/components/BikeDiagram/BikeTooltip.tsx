import React from "react";
import { SelectedComponent } from "@/types";
import { BIKE_COMPONENT_AREAS } from "./constants";

interface BikeTooltipProps {
  hoveredArea: string | null;
  selectedComponents: SelectedComponent[];
  getCompatibilityStatus: (areaId: string) => string | undefined;
}

export function BikeTooltip({
  hoveredArea,
  selectedComponents,
  getCompatibilityStatus,
}: BikeTooltipProps) {
  if (!hoveredArea) return null;

  const area = BIKE_COMPONENT_AREAS.find((a) => a.id === hoveredArea);
  if (!area) return null;

  const selectedComponent = selectedComponents.find(
    (sc) => sc.area.id === area.id
  );
  const compatibilityStatus = getCompatibilityStatus(area.id);

  const tooltipText = selectedComponent
    ? `${area.name}: ${selectedComponent.component.brand} ${selectedComponent.component.name}`
    : `Click to select ${area.name}`;

  const statusText = compatibilityStatus ? ` (${compatibilityStatus})` : "";
  const fullTooltipText = tooltipText + statusText;

  const tooltipX = area.coordinates.x + area.coordinates.width / 2;
  const tooltipY = area.coordinates.y - 15;
  const tooltipWidth = Math.max(fullTooltipText.length * 7, 140);
  const tooltipHeight = 32;

  // Get status color for tooltip border
  const getStatusColor = () => {
    switch (compatibilityStatus) {
      case "compatible":
        return "#22c55e"; // green
      case "conditional":
        return "#fbbf24"; // yellow
      case "incompatible":
        return "#ef4444"; // red
      case "selected":
        return "#ff1744";
      default:
        return "#ff0040";
    }
  };

  return (
    <g className="tooltip-group">
      {/* Tooltip background */}
      <rect
        x={tooltipX - tooltipWidth / 2}
        y={tooltipY - tooltipHeight}
        width={tooltipWidth}
        height={tooltipHeight}
        fill="url(#tooltipGradient)"
        stroke={getStatusColor()}
        strokeWidth="1.5"
        rx="8"
        filter="url(#tooltipGlow)"
        style={{
          animation: "tooltip-appear 0.2s ease-out forwards",
        }}
      />

      {/* Tooltip arrow */}
      <polygon
        points={`${tooltipX - 6},${tooltipY - 2} ${tooltipX},${tooltipY + 4} ${
          tooltipX + 6
        },${tooltipY - 2}`}
        fill="url(#tooltipGradient)"
        stroke={getStatusColor()}
        strokeWidth="1"
        filter="url(#tooltipGlow)"
      />

      {/* Main tooltip text */}
      <text
        x={tooltipX}
        y={tooltipY - tooltipHeight / 2 + 2}
        textAnchor="middle"
        className="text-sm font-semibold"
        fill="#ffffff"
        filter="url(#textGlow)"
      >
        {tooltipText}
      </text>

      {/* Status indicator text */}
      {statusText && (
        <text
          x={tooltipX}
          y={tooltipY - tooltipHeight / 2 + 18}
          textAnchor="middle"
          className="text-xs font-medium"
          fill={getStatusColor()}
          filter="url(#textGlow)"
        >
          {statusText}
        </text>
      )}
    </g>
  );
}
