import React from "react";

export function SVGFilters() {
  return (
    <defs>
      {/* Gradients */}
      <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1a1a1a" />
        <stop offset="50%" stopColor="#2a2a2a" />
        <stop offset="100%" stopColor="#1a1a1a" />
      </linearGradient>

      <linearGradient id="wheelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0a0a0a" />
        <stop offset="50%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#1a1a1a" />
      </linearGradient>

      <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff0040" />
        <stop offset="50%" stopColor="#ff1744" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>

      <linearGradient id="tooltipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(10, 10, 10, 0.95)" />
        <stop offset="30%" stopColor="rgba(26, 26, 26, 0.9)" />
        <stop offset="70%" stopColor="rgba(42, 42, 42, 0.85)" />
        <stop offset="100%" stopColor="rgba(26, 26, 26, 0.9)" />
      </linearGradient>

      {/* Filters */}
      <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow
          dx="2"
          dy="4"
          stdDeviation="4"
          floodColor="#dc2626"
          floodOpacity="0.4"
        />
      </filter>

      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="intensGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="8" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="tooltipGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
        <feOffset dx="0" dy="2" result="offsetBlur" />
        <feMerge>
          <feMergeNode in="offsetBlur" />
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="textGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}
