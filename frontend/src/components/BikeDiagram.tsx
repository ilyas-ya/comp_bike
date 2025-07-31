<<<<<<< HEAD
"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  BikeComponentArea,
  SelectedComponent,
  CompatibilityResult,
  ComponentCategory,
} from "@/types";
import {
  useHoverDebounce,
  useDebounce,
  useAnimationState,
} from "@/hooks/useDebounce";
import {
  useResponsiveClasses,
  useAnimationOptimization,
} from "@/hooks/useResponsive";

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
=======
'use client'

import { useState } from 'react'
import { BikeComponentArea, SelectedComponent, CompatibilityResult } from '@/types'

// Placeholder bike component areas for initial setup
const initialComponentAreas: BikeComponentArea[] = [
  {
    id: 'bottom-bracket',
    name: 'Bottom Bracket & Crankset',
    coordinates: { x: 50, y: 60, width: 20, height: 10 },
    category: 'bottom_bracket',
    isSelected: false,
  },
  {
    id: 'cassette-derailleur',
    name: 'Cassette & Derailleur',
    coordinates: { x: 70, y: 50, width: 15, height: 10 },
    category: 'cassette_derailleur',
    isSelected: false,
  },
  {
    id: 'brake-system',
    name: 'Brake System',
    coordinates: { x: 30, y: 30, width: 10, height: 10 },
    category: 'brake_system',
    isSelected: false,
  },
  {
    id: 'wheel-frame',
    name: 'Wheel & Frame Interface',
    coordinates: { x: 50, y: 40, width: 20, height: 20 },
    category: 'wheel_frame',
    isSelected: false,
  },
  {
    id: 'seatpost',
    name: 'Seatpost',
    coordinates: { x: 50, y: 20, width: 5, height: 15 },
    category: 'seatpost',
    isSelected: false,
  },
]

interface BikeDiagramProps {
  selectedComponents: SelectedComponent[]
  onComponentClick: (area: BikeComponentArea) => void
  compatibilityResults?: CompatibilityResult[]
>>>>>>> 1476c9d15336575ae3e3b1d628e5fb14f05c5ff7
}

export function BikeDiagram({
  selectedComponents,
  onComponentClick,
<<<<<<< HEAD
  compatibilityResults,
}: BikeDiagramProps) {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const [clickedArea, setClickedArea] = useState<string | null>(null);
  const [isInteractionActive, setIsInteractionActive] =
    useState<boolean>(false);

  // Responsive optimization hooks
  const {
    getGlowClass,
    getTransitionClass,
    getInteractiveClass,
    getContainerClass,
    capabilities,
    config,
  } = useResponsiveClasses();

  const { shouldUseAnimation, getAnimationDuration, getOptimizedStyle } =
    useAnimationOptimization();

  // Animation state management
  const { requestAnimationFrame, cancelAnimation } = useAnimationState();

  // Debounced click handler to prevent rapid clicking issues
  const [debouncedClick, cancelClick, isClickActive] = useDebounce(
    useCallback(
      (area: BikeComponentArea) => {
        // Add visual feedback for click
        setClickedArea(area.id);

        // Use requestAnimationFrame for smooth interaction
        requestAnimationFrame(() => {
          onComponentClick(area);

          // Clear click state after animation
          setTimeout(() => {
            setClickedArea(null);
          }, 300);
        });
      },
      [onComponentClick, requestAnimationFrame]
    ),
    150 // 150ms debounce delay
  );

  // Enhanced hover handling with debouncing
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
    50, // 50ms hover delay
    100 // 100ms leave delay
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

  // Get cyberpunk fill color based on selection and compatibility status
  const getFillColor = (area: BikeComponentArea) => {
    const isSelected = selectedComponents.some((sc) => sc.area.id === area.id);
    const compatibilityStatus = getCompatibilityStatus(area.id);
    const isHovered = hoveredArea === area.id;

    if (isHovered && !isSelected) {
      return "rgba(220, 38, 38, 0.2)"; // cyberpunk-red hover
    }

    if (!isSelected) {
      return "rgba(42, 42, 42, 0.8)"; // cyberpunk-darkgray for unselected
    }

    switch (compatibilityStatus) {
      case "compatible":
        return "rgba(220, 38, 38, 0.25)"; // cyberpunk-red compatible
      case "conditional":
        return "rgba(239, 68, 68, 0.25)"; // cyberpunk-red conditional
      case "incompatible":
        return "rgba(153, 27, 27, 0.25)"; // cyberpunk-darkred incompatible
      case "selected":
        return "rgba(255, 0, 64, 0.3)"; // cyberpunk-neon selected
      default:
        return "rgba(42, 42, 42, 0.8)"; // cyberpunk-darkgray
    }
  };

  // Get cyberpunk stroke color for better visibility
  const getStrokeColor = (area: BikeComponentArea) => {
    const isSelected = selectedComponents.some((sc) => sc.area.id === area.id);
    const compatibilityStatus = getCompatibilityStatus(area.id);
    const isHovered = hoveredArea === area.id;

    if (isHovered && !isSelected) {
      return "#ff0040"; // cyberpunk-neon hover
    }

    if (!isSelected) {
      return "rgba(220, 38, 38, 0.6)"; // cyberpunk-red muted
    }

    switch (compatibilityStatus) {
      case "compatible":
        return "#dc2626"; // cyberpunk-red
      case "conditional":
        return "#ef4444"; // cyberpunk-red lighter
      case "incompatible":
        return "#991b1b"; // cyberpunk-darkred
      case "selected":
        return "#ff1744"; // cyberpunk-accent
      default:
        return "rgba(220, 38, 38, 0.6)"; // cyberpunk-red muted
    }
  };

  // Get enhanced cyberpunk CSS classes for area styling with performance optimizations
  const getAreaClasses = (area: BikeComponentArea) => {
    const isSelected = selectedComponents.some((sc) => sc.area.id === area.id);
    const compatibilityStatus = getCompatibilityStatus(area.id);
    const isHovered = hoveredArea === area.id;
    const isClicked = clickedArea === area.id;

    // Use responsive transition and interactive classes
    let classes = `${getTransitionClass()} ${getInteractiveClass()} cyberpunk-gpu-accelerated cyberpunk-focus-enhanced`;

    // Add debounce active state for visual feedback
    if (isClickActive || isClicked) {
      classes += " cyberpunk-debounce-active";
    }

    if (isHovered && !isSelected) {
      const hoverGlowClass = getGlowClass("cyberpunk-glow-hover");
      classes += ` bike-area-hover-enhanced ${hoverGlowClass}`;
    } else if (isSelected) {
      switch (compatibilityStatus) {
        case "compatible":
          const compatibleGlowClass = shouldUseAnimation("glow")
            ? getGlowClass("cyberpunk-glow-breathing")
            : getGlowClass("cyberpunk-glow-static");
          classes += ` bike-area-compatible-enhanced ${compatibleGlowClass}`;
          break;
        case "conditional":
          const conditionalGlowClass = shouldUseAnimation("glow")
            ? getGlowClass("cyberpunk-glow-breathing")
            : getGlowClass("cyberpunk-glow-static");
          classes += ` bike-area-conditional-enhanced ${conditionalGlowClass}`;
          break;
        case "incompatible":
          classes += " bike-area-incompatible-enhanced";
          break;
        default:
          const selectedGlowClass = shouldUseAnimation("pulse")
            ? getGlowClass("cyberpunk-glow-selected")
            : getGlowClass("cyberpunk-glow-static");
          classes += ` bike-area-selected-enhanced ${selectedGlowClass}`;
      }
    } else {
      classes += " bike-area-base";
    }

    return classes;
  };

  // Enhanced click handler with debouncing and animation feedback
  const handleAreaClick = (area: BikeComponentArea) => {
    // Use the debounced click handler for performance
    debouncedClick(area);
  };

  // Enhanced mouse handlers with debouncing
  const handleMouseEnter = (areaId: string) => {
    debouncedMouseEnter(areaId);
  };

  const handleMouseLeave = () => {
    debouncedMouseLeave();
  };

  return (
    <div className="relative group">
      {/* Cyberpunk background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-red-800/10 to-red-700/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

      <div className={getContainerClass()}>
        {/* Cyberpunk animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600 via-red-500 to-red-400 animate-pulse"></div>
        </div>

        <svg
          viewBox="0 0 700 400"
          className="bike-diagram-svg w-full h-auto relative z-10"
          role="img"
          aria-label="Interactive bike diagram for component selection"
          aria-describedby="bike-diagram-description"
          tabIndex={-1}
        >
          <defs>
            {/* Cyberpunk gradients */}
            <linearGradient
              id="cyberpunkFrameGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#0a0a0a" />
              <stop offset="50%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#2a2a2a" />
            </linearGradient>

            <linearGradient
              id="cyberpunkWheelGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#0a0a0a" />
              <stop offset="50%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#1a1a1a" />
            </linearGradient>

            <linearGradient
              id="cyberpunkAccentGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ff0040" />
              <stop offset="50%" stopColor="#ff1744" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>

            {/* Enhanced drop shadow filter */}
            <filter
              id="cyberpunkDropShadow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feDropShadow
                dx="2"
                dy="4"
                stdDeviation="4"
                floodColor="#dc2626"
                floodOpacity="0.4"
              />
            </filter>

            {/* Cyberpunk glow effect */}
            <filter
              id="cyberpunkGlow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Intense glow for selected elements */}
            <filter
              id="cyberpunkIntenseGlow"
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
            >
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Enhanced tooltip glassmorphism gradient */}
            <linearGradient
              id="cyberpunkTooltipGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(10, 10, 10, 0.95)" />
              <stop offset="30%" stopColor="rgba(26, 26, 26, 0.9)" />
              <stop offset="70%" stopColor="rgba(42, 42, 42, 0.85)" />
              <stop offset="100%" stopColor="rgba(26, 26, 26, 0.9)" />
            </linearGradient>

            {/* Enhanced tooltip glow filter */}
            <filter
              id="cyberpunkTooltipGlow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feOffset dx="0" dy="2" result="offsetBlur" />
              <feMerge>
                <feMergeNode in="offsetBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Text glow filter for better readability */}
            <filter
              id="cyberpunkTextGlow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
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

          {/* Cyberpunk Bike Frame */}
          <g
            stroke="url(#cyberpunkFrameGradient)"
            strokeWidth="4"
            fill="none"
            filter="url(#cyberpunkDropShadow)"
          >
            {/* Main triangle frame with curves */}
            <path
              d="M 350 250 Q 250 150 250 120 Q 250 100 270 100 L 500 100 Q 520 100 520 120 Q 520 140 500 150 L 380 240 Z"
              fill="url(#cyberpunkFrameGradient)"
              fillOpacity="0.2"
            />

            {/* Seat tube with curve */}
            <path
              d="M 350 250 Q 340 200 330 150 Q 325 120 320 100"
              strokeLinecap="round"
              stroke="url(#cyberpunkAccentGradient)"
            />

            {/* Chain stays */}
            <path
              d="M 350 250 Q 400 260 450 270 Q 500 275 540 280"
              strokeLinecap="round"
              stroke="url(#cyberpunkAccentGradient)"
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

          {/* Cyberpunk Wheels with spokes */}
          <g filter="url(#cyberpunkDropShadow)">
            {/* Front wheel */}
            <circle
              cx="180"
              cy="280"
              r="35"
              stroke="url(#cyberpunkWheelGradient)"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="180"
              cy="280"
              r="25"
              stroke="#dc2626"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
            <circle
              cx="180"
              cy="280"
              r="15"
              stroke="#ff0040"
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
                stroke="#dc2626"
                strokeWidth="1"
                opacity="0.7"
              />
            ))}

            {/* Rear wheel */}
            <circle
              cx="540"
              cy="280"
              r="35"
              stroke="url(#cyberpunkWheelGradient)"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="540"
              cy="280"
              r="25"
              stroke="#dc2626"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
            <circle
              cx="540"
              cy="280"
              r="15"
              stroke="#ff0040"
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
                stroke="#dc2626"
                strokeWidth="1"
                opacity="0.7"
              />
            ))}
          </g>

          {/* Cyberpunk Handlebars */}
          <g
            stroke="#dc2626"
            strokeWidth="3"
            fill="none"
            filter="url(#cyberpunkDropShadow)"
          >
            <path d="M 200 140 Q 220 130 240 140" strokeLinecap="round" />
            <line x1="220" y1="135" x2="220" y2="160" strokeLinecap="round" />
          </g>

          {/* Cyberpunk Seat */}
          <ellipse
            cx="320"
            cy="95"
            rx="25"
            ry="8"
            fill="url(#cyberpunkFrameGradient)"
            stroke="#ff0040"
            strokeWidth="1"
            filter="url(#cyberpunkDropShadow)"
          />

          {/* Cyberpunk Pedals */}
          <ellipse
            cx="340"
            cy="265"
            rx="8"
            ry="4"
            fill="#dc2626"
            stroke="#ff1744"
            strokeWidth="1"
            filter="url(#cyberpunkDropShadow)"
          />
          <ellipse
            cx="360"
            cy="265"
            rx="8"
            ry="4"
            fill="#dc2626"
            stroke="#ff1744"
            strokeWidth="1"
            filter="url(#cyberpunkDropShadow)"
          />

          {/* Component Areas */}
          {BIKE_COMPONENT_AREAS.map((area) => (
            <g key={area.id}>
              {/* Click ripple effect background */}
              {clickedArea === area.id && (
                <circle
                  cx={area.coordinates.x + area.coordinates.width / 2}
                  cy={area.coordinates.y + area.coordinates.height / 2}
                  r="0"
                  fill="rgba(255, 0, 64, 0.4)"
                  className="cyberpunk-gpu-accelerated"
                  style={{
                    animation:
                      "cyberpunk-selection-ripple 0.6s ease-out forwards",
                  }}
                />
              )}

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
                className={`cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${getAreaClasses(
                  area
                )} ${clickedArea === area.id ? "active" : ""}`}
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
                    ? "#ffffff"
                    : "#dc2626"
                }
              >
                {area.name.split("/")[0]}{" "}
                {/* Show first part of name if it contains '/' */}
              </text>
            </g>
          ))}

          {/* Enhanced Cyberpunk Tooltip with Glassmorphism */}
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
                const compatibilityStatus = getCompatibilityStatus(area.id);

                const tooltipText = selectedComponent
                  ? `${area.name}: ${selectedComponent.component.brand} ${selectedComponent.component.name}`
                  : `Click to select ${area.name}`;

                const statusText = compatibilityStatus
                  ? ` (${compatibilityStatus})`
                  : "";

                const fullTooltipText = tooltipText + statusText;
                const tooltipX =
                  area.coordinates.x + area.coordinates.width / 2;
                const tooltipY = area.coordinates.y - 15;
                const tooltipWidth = Math.max(
                  fullTooltipText.length * 6.5,
                  120
                );
                const tooltipHeight = 28;

                // Get status color for tooltip border
                const getStatusColor = () => {
                  switch (compatibilityStatus) {
                    case "compatible":
                      return "#dc2626";
                    case "conditional":
                      return "#ef4444";
                    case "incompatible":
                      return "#991b1b";
                    case "selected":
                      return "#ff1744";
                    default:
                      return "#ff0040";
                  }
                };

                return (
                  <g className="cyberpunk-tooltip-group">
                    {/* Glassmorphism background with animated appearance */}
                    <rect
                      x={tooltipX - tooltipWidth / 2}
                      y={tooltipY - tooltipHeight}
                      width={tooltipWidth}
                      height={tooltipHeight}
                      fill="url(#cyberpunkTooltipGradient)"
                      stroke={getStatusColor()}
                      strokeWidth="1.5"
                      rx="6"
                      className="cyberpunk-tooltip-bg"
                      filter="url(#cyberpunkTooltipGlow)"
                      style={{
                        animation:
                          "cyberpunk-tooltip-appear 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
                        transformOrigin: `${tooltipX}px ${
                          tooltipY - tooltipHeight / 2
                        }px`,
                      }}
                    />

                    {/* Tooltip arrow with glassmorphism */}
                    <polygon
                      points={`${tooltipX - 6},${tooltipY - 2} ${tooltipX},${
                        tooltipY + 4
                      } ${tooltipX + 6},${tooltipY - 2}`}
                      fill="url(#cyberpunkTooltipGradient)"
                      stroke={getStatusColor()}
                      strokeWidth="1"
                      className="cyberpunk-tooltip-arrow"
                      filter="url(#cyberpunkTooltipGlow)"
                      style={{
                        animation:
                          "cyberpunk-tooltip-appear 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards",
                        opacity: 0,
                      }}
                    />

                    {/* Main tooltip text */}
                    <text
                      x={tooltipX}
                      y={tooltipY - tooltipHeight / 2 + 2}
                      textAnchor="middle"
                      className="text-xs font-semibold cyberpunk-tooltip-text"
                      fill="#ffffff"
                      filter="url(#cyberpunkTextGlow)"
                      style={{
                        animation:
                          "cyberpunk-tooltip-text-appear 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.15s forwards",
                        opacity: 0,
                      }}
                    >
                      {tooltipText}
                    </text>

                    {/* Status indicator text */}
                    {statusText && (
                      <text
                        x={tooltipX}
                        y={tooltipY - tooltipHeight / 2 + 14}
                        textAnchor="middle"
                        className="text-xs font-medium cyberpunk-tooltip-status"
                        fill={getStatusColor()}
                        filter="url(#cyberpunkTextGlow)"
                        style={{
                          animation:
                            "cyberpunk-tooltip-text-appear 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards",
                          opacity: 0,
                        }}
                      >
                        {statusText}
                      </text>
                    )}

                    {/* Animated glow effect */}
                    <rect
                      x={tooltipX - tooltipWidth / 2}
                      y={tooltipY - tooltipHeight}
                      width={tooltipWidth}
                      height={tooltipHeight}
                      fill="none"
                      stroke={getStatusColor()}
                      strokeWidth="0.5"
                      rx="6"
                      className="cyberpunk-tooltip-glow-ring"
                      style={{
                        animation:
                          "cyberpunk-tooltip-glow-pulse 2s ease-in-out infinite 0.3s",
                        opacity: 0.6,
                      }}
                    />
                  </g>
                );
              })()}
            </g>
          )}
        </svg>
      </div>

      {/* Enhanced Cyberpunk Legend with Glassmorphism */}
      <div
        className="cyberpunk-legend-enhanced"
        role="region"
        aria-label="Component status legend"
      >
        {/* Legend header with cyberpunk styling */}
        <div className="cyberpunk-legend-header">
          <h4 className="cyberpunk-legend-title">
            <span className="cyberpunk-legend-title-text">Status Legend</span>
            <div className="cyberpunk-legend-title-glow"></div>
          </h4>
          <div className="cyberpunk-legend-divider"></div>
        </div>

        {/* Legend items with enhanced styling and animations */}
        <div className="cyberpunk-legend-grid">
          <div
            className="cyberpunk-legend-item-enhanced"
            style={{ animationDelay: "0.1s" }}
          >
            <div
              className="cyberpunk-legend-indicator-enhanced unselected"
              aria-hidden="true"
            >
              <div className="cyberpunk-legend-indicator-core"></div>
              <div className="cyberpunk-legend-indicator-glow"></div>
            </div>
            <span className="cyberpunk-legend-text">Unselected</span>
            <div className="cyberpunk-legend-item-bg"></div>
          </div>

          <div
            className="cyberpunk-legend-item-enhanced"
            style={{ animationDelay: "0.2s" }}
          >
            <div
              className="cyberpunk-legend-indicator-enhanced selected"
              aria-hidden="true"
            >
              <div className="cyberpunk-legend-indicator-core"></div>
              <div className="cyberpunk-legend-indicator-glow"></div>
            </div>
            <span className="cyberpunk-legend-text">Selected</span>
            <div className="cyberpunk-legend-item-bg"></div>
          </div>

          <div
            className="cyberpunk-legend-item-enhanced"
            style={{ animationDelay: "0.3s" }}
          >
            <div
              className="cyberpunk-legend-indicator-enhanced compatible"
              aria-hidden="true"
            >
              <div className="cyberpunk-legend-indicator-core"></div>
              <div className="cyberpunk-legend-indicator-glow"></div>
            </div>
            <span className="cyberpunk-legend-text">Compatible</span>
            <div className="cyberpunk-legend-item-bg"></div>
          </div>

          <div
            className="cyberpunk-legend-item-enhanced"
            style={{ animationDelay: "0.4s" }}
          >
            <div
              className="cyberpunk-legend-indicator-enhanced conditional"
              aria-hidden="true"
            >
              <div className="cyberpunk-legend-indicator-core"></div>
              <div className="cyberpunk-legend-indicator-glow"></div>
            </div>
            <span className="cyberpunk-legend-text">Conditional</span>
            <div className="cyberpunk-legend-item-bg"></div>
          </div>

          <div
            className="cyberpunk-legend-item-enhanced"
            style={{ animationDelay: "0.5s" }}
          >
            <div
              className="cyberpunk-legend-indicator-enhanced incompatible"
              aria-hidden="true"
            >
              <div className="cyberpunk-legend-indicator-core"></div>
              <div className="cyberpunk-legend-indicator-glow"></div>
            </div>
            <span className="cyberpunk-legend-text">Incompatible</span>
            <div className="cyberpunk-legend-item-bg"></div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="cyberpunk-legend-bg-effects">
          <div className="cyberpunk-legend-scan-line"></div>
          <div className="cyberpunk-legend-data-stream"></div>
        </div>
      </div>
    </div>
  );
}
=======
  compatibilityResults = [],
}: BikeDiagramProps) {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null)
  
  // Update component areas with selection status
  const componentAreas = initialComponentAreas.map(area => {
    const isSelected = selectedComponents.some(s => s.area.id === area.id)
    
    // Find compatibility status if available
    let compatibilityStatus = undefined
    if (isSelected && selectedComponents.length > 1) {
      // This is a simplified approach - in a real app, you'd need more complex logic
      // to determine the overall compatibility status of a component
      const relatedResults = compatibilityResults.filter(result => 
        selectedComponents.some(s => s.area.id === area.id && 
          (s.component.id === result.components?.[0]?.id || 
           s.component.id === result.components?.[1]?.id))
      )
      
      if (relatedResults.length > 0) {
        // Use the worst compatibility status
        if (relatedResults.some(r => r.status === 'incompatible')) {
          compatibilityStatus = 'incompatible'
        } else if (relatedResults.some(r => r.status === 'conditional')) {
          compatibilityStatus = 'conditional'
        } else {
          compatibilityStatus = 'compatible'
        }
      }
    }
    
    return {
      ...area,
      isSelected,
      compatibilityStatus,
    }
  })
  
  // Get color for component area based on selection and compatibility
  const getAreaColor = (area: BikeComponentArea) => {
    if (!area.isSelected) {
      return hoveredArea === area.id ? 'rgba(59, 130, 246, 0.5)' : 'rgba(209, 213, 219, 0.5)'
    }
    
    if (area.compatibilityStatus === 'compatible') {
      return 'rgba(34, 197, 94, 0.7)'
    } else if (area.compatibilityStatus === 'conditional') {
      return 'rgba(245, 158, 11, 0.7)'
    } else if (area.compatibilityStatus === 'incompatible') {
      return 'rgba(239, 68, 68, 0.7)'
    }
    
    return 'rgba(59, 130, 246, 0.7)'
  }

  return (
    <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-lg border border-gray-300">
      {/* Placeholder for bike diagram - in a real app, use an SVG or Canvas */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-gray-400 text-center">
          <p className="text-lg">Bike Diagram Placeholder</p>
          <p className="text-sm">Click on a component area below</p>
        </div>
      </div>
      
      {/* Component areas */}
      {componentAreas.map(area => (
        <div
          key={area.id}
          className="absolute cursor-pointer transition-colors duration-200 rounded-md border border-gray-400"
          style={{
            left: `${area.coordinates.x}%`,
            top: `${area.coordinates.y}%`,
            width: `${area.coordinates.width}%`,
            height: `${area.coordinates.height}%`,
            backgroundColor: getAreaColor(area),
          }}
          onClick={() => onComponentClick(area)}
          onMouseEnter={() => setHoveredArea(area.id)}
          onMouseLeave={() => setHoveredArea(null)}
        >
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-md">
            {area.name}
          </div>
        </div>
      ))}
      
      {/* Legend */}
      <div className="absolute bottom-2 right-2 bg-white p-2 rounded-md shadow-md text-xs">
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 bg-green-500 mr-1 rounded-sm"></div>
          <span>Compatible</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 bg-yellow-500 mr-1 rounded-sm"></div>
          <span>Conditional</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 mr-1 rounded-sm"></div>
          <span>Incompatible</span>
        </div>
      </div>
    </div>
  )
}
>>>>>>> 1476c9d15336575ae3e3b1d628e5fb14f05c5ff7
