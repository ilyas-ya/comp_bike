import React from "react";

export function BikeWheels() {
  // Fonction pour créer les rayons d'une roue
  const createSpokes = (centerX: number, centerY: number, radius: number) => {
    const spokeAngles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
    return spokeAngles.map((angle, i) => (
      <line
        key={i}
        x1={centerX + Math.cos((angle * Math.PI) / 180) * 8}
        y1={centerY + Math.sin((angle * Math.PI) / 180) * 8}
        x2={centerX + Math.cos((angle * Math.PI) / 180) * (radius - 5)}
        y2={centerY + Math.sin((angle * Math.PI) / 180) * (radius - 5)}
        stroke="#dc2626"
        strokeWidth="1"
        opacity="0.8"
      />
    ));
  };

  return (
    <g filter="url(#dropShadow)">
      {/* Roue avant */}
      <g>
        {/* Jante externe */}
        <circle
          cx="150"
          cy="280"
          r="40"
          stroke="url(#wheelGradient)"
          strokeWidth="6"
          fill="none"
        />

        {/* Jante interne */}
        <circle
          cx="150"
          cy="280"
          r="35"
          stroke="#dc2626"
          strokeWidth="3"
          fill="none"
          opacity="0.8"
        />

        {/* Moyeu */}
        <circle
          cx="150"
          cy="280"
          r="8"
          fill="url(#accentGradient)"
          stroke="#ff1744"
          strokeWidth="2"
        />

        {/* Rayons */}
        {createSpokes(150, 280, 35)}

        {/* Valve */}
        <rect x="148" y="240" width="4" height="8" fill="#333" rx="1" />

        {/* Détails de la jante */}
        <circle
          cx="150"
          cy="280"
          r="32"
          stroke="#ff0040"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
      </g>

      {/* Roue arrière */}
      <g>
        {/* Jante externe */}
        <circle
          cx="530"
          cy="290"
          r="40"
          stroke="url(#wheelGradient)"
          strokeWidth="6"
          fill="none"
        />

        {/* Jante interne */}
        <circle
          cx="530"
          cy="290"
          r="35"
          stroke="#dc2626"
          strokeWidth="3"
          fill="none"
          opacity="0.8"
        />

        {/* Moyeu */}
        <circle
          cx="530"
          cy="290"
          r="8"
          fill="url(#accentGradient)"
          stroke="#ff1744"
          strokeWidth="2"
        />

        {/* Rayons */}
        {createSpokes(530, 290, 35)}

        {/* Cassette (sur la roue arrière) */}
        <g>
          {[12, 14, 16, 18, 20].map((radius, i) => (
            <circle
              key={i}
              cx="530"
              cy="290"
              r={radius}
              stroke="#666"
              strokeWidth="1.5"
              fill="none"
              opacity="0.7"
            />
          ))}
        </g>

        {/* Valve */}
        <rect x="528" y="250" width="4" height="8" fill="#333" rx="1" />

        {/* Détails de la jante */}
        <circle
          cx="530"
          cy="290"
          r="32"
          stroke="#ff0040"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
      </g>

      {/* Chaîne */}
      <path
        d="M 395 285 Q 450 295 520 295"
        stroke="#444"
        strokeWidth="3"
        fill="none"
        strokeDasharray="2,2"
        opacity="0.8"
      />

      {/* Détails de la chaîne */}
      <path
        d="M 375 275 Q 430 285 510 285"
        stroke="#555"
        strokeWidth="1"
        fill="none"
        strokeDasharray="1,1"
        opacity="0.6"
      />
    </g>
  );
}
