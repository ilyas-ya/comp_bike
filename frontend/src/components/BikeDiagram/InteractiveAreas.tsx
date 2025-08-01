import React from "react";
import { BikeComponentArea, SelectedComponent } from "@/types";
import {
  useResponsiveClasses,
  useAnimationOptimization,
} from "@/hooks/useResponsive";

interface InteractiveAreasProps {
  areas: BikeComponentArea[];
  selectedComponents: SelectedComponent[];
  hoveredArea: string | null;
  clickedArea: string | null;
  isClickActive: boolean;
  getCompatibilityStatus: (areaId: string) => string | undefined;
  onAreaClick: (area: BikeComponentArea) => void;
  onMouseEnter: (areaId: string) => void;
  onMouseLeave: () => void;
}

export function InteractiveAreas({
  areas,
  selectedComponents,
  hoveredArea,
  clickedArea,
  isClickActive,
  getCompatibilityStatus,
  onAreaClick,
  onMouseEnter,
  onMouseLeave,
}: InteractiveAreasProps) {
  const { getGlowClass, getTransitionClass, getInteractiveClass } =
    useResponsiveClasses();
  const { shouldUseAnimation } = useAnimationOptimization();

  // Get fill color based on selection and compatibility status
  const getFillColor = (area: BikeComponentArea) => {
    const isSelected = selectedComponents.some((sc) => sc.area.id === area.id);
    const compatibilityStatus = getCompatibilityStatus(area.id);
    const isHovered = hoveredArea === area.id;

    if (isHovered && !isSelected) {
      return "rgba(220, 38, 38, 0.3)";
    }

    if (!isSelected) {
      return "rgba(42, 42, 42, 0.6)";
    }

    switch (compatibilityStatus) {
      case "compatible":
        return "rgba(34, 197, 94, 0.4)"; // green
      case "conditional":
        return "rgba(251, 191, 36, 0.4)"; // yellow
      case "incompatible":
        return "rgba(239, 68, 68, 0.4)"; // red
      case "selected":
        return "rgba(255, 0, 64, 0.4)"; // neon
      default:
        return "rgba(42, 42, 42, 0.6)";
    }
  };

  // Get stroke color
  const getStrokeColor = (area: BikeComponentArea) => {
    const isSelected = selectedComponents.some((sc) => sc.area.id === area.id);
    const compatibilityStatus = getCompatibilityStatus(area.id);
    const isHovered = hoveredArea === area.id;

    if (isHovered && !isSelected) {
      return "#ff0040";
    }

    if (!isSelected) {
      return "rgba(220, 38, 38, 0.6)";
    }

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
        return "rgba(220, 38, 38, 0.6)";
    }
  };

  // Get CSS classes for area styling
  const getAreaClasses = (area: BikeComponentArea) => {
    const isSelected = selectedComponents.some((sc) => sc.area.id === area.id);
    const compatibilityStatus = getCompatibilityStatus(area.id);
    const isHovered = hoveredArea === area.id;
    const isClicked = clickedArea === area.id;

    let classes = `${getTransitionClass()} ${getInteractiveClass()} cursor-pointer`;

    if (isClickActive || isClicked) {
      classes += " opacity-80";
    }

    if (isHovered && !isSelected) {
      const hoverGlowClass = getGlowClass("hover-glow");
      classes += ` ${hoverGlowClass}`;
    } else if (isSelected) {
      switch (compatibilityStatus) {
        case "compatible":
          const compatibleGlowClass = shouldUseAnimation("glow")
            ? getGlowClass("compatible-glow")
            : getGlowClass("static-glow");
          classes += ` ${compatibleGlowClass}`;
          break;
        case "conditional":
          const conditionalGlowClass = shouldUseAnimation("glow")
            ? getGlowClass("conditional-glow")
            : getGlowClass("static-glow");
          classes += ` ${conditionalGlowClass}`;
          break;
        case "incompatible":
          classes += " incompatible-area";
          break;
        default:
          const selectedGlowClass = shouldUseAnimation("pulse")
            ? getGlowClass("selected-glow")
            : getGlowClass("static-glow");
          classes += ` ${selectedGlowClass}`;
      }
    }

    return classes;
  };

  return (
    <g>
      {areas.map((area) => (
        <g key={area.id}>
          {/* Click ripple effect */}
          {clickedArea === area.id && (
            <circle
              cx={area.coordinates.x + area.coordinates.width / 2}
              cy={area.coordinates.y + area.coordinates.height / 2}
              r="0"
              fill="rgba(255, 0, 64, 0.6)"
              style={{
                animation: "ripple 0.6s ease-out forwards",
              }}
            />
          )}

          {/* Interactive area */}
          <rect
            x={area.coordinates.x}
            y={area.coordinates.y}
            width={area.coordinates.width}
            height={area.coordinates.height}
            fill={getFillColor(area)}
            stroke={getStrokeColor(area)}
            strokeWidth="2"
            rx="6"
            className={getAreaClasses(area)}
            onClick={() => onAreaClick(area)}
            onMouseEnter={() => onMouseEnter(area.id)}
            onMouseLeave={onMouseLeave}
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
                onAreaClick(area);
              }
            }}
          />

          {/* Area label */}
          <text
            x={area.coordinates.x + area.coordinates.width / 2}
            y={area.coordinates.y + area.coordinates.height / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs font-medium pointer-events-none select-none"
            fill={
              selectedComponents.some((sc) => sc.area.id === area.id)
                ? "#ffffff"
                : "#dc2626"
            }
            filter="url(#textGlow)"
          >
            {area.name.split("/")[0]}
          </text>
        </g>
      ))}
    </g>
  );
}
