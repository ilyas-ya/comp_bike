import React from "react";

export function BikeWheelsClean() {
  // Fonction pour créer des rayons réalistes avec pattern croisé
  const createRealisticSpokes = (
    centerX: number,
    centerY: number,
    radius: number
  ) => {
    const spokeCount = 24; // Plus réaliste
    const spokes = [];

    for (let i = 0; i < spokeCount; i++) {
      const angle = ((i * 360) / spokeCount) * (Math.PI / 180);
      const innerRadius = 12;
      const outerRadius = radius - 3;

      spokes.push(
        <line
          key={i}
          x1={centerX + Math.cos(angle) * innerRadius}
          y1={centerY + Math.sin(angle) * innerRadius}
          x2={centerX + Math.cos(angle) * outerRadius}
          y2={centerY + Math.sin(angle) * outerRadius}
          stroke="#333"
          strokeWidth="0.8"
          opacity="0.9"
        />
      );
    }
    return spokes;
  };

  return (
    <g filter="url(#dropShadow)">
      {/* Roue avant - design propre et réaliste */}
      <g>
        {/* Pneu externe */}
        <circle
          cx="150"
          cy="280"
          r="38"
          stroke="#1a1a1a"
          strokeWidth="8"
          fill="none"
        />

        {/* Flanc du pneu */}
        <circle
          cx="150"
          cy="280"
          r="34"
          stroke="#2a2a2a"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />

        {/* Jante - aluminium réaliste */}
        <circle
          cx="150"
          cy="280"
          r="30"
          stroke="#c0c0c0"
          strokeWidth="4"
          fill="none"
        />

        {/* Surface de freinage */}
        <circle
          cx="150"
          cy="280"
          r="28"
          stroke="#e0e0e0"
          strokeWidth="1"
          fill="none"
          opacity="0.7"
        />

        {/* Moyeu */}
        <circle
          cx="150"
          cy="280"
          r="12"
          fill="#1a1a1a"
          stroke="#dc2626"
          strokeWidth="2"
        />

        {/* Logo moyeu */}
        <circle
          cx="150"
          cy="280"
          r="8"
          fill="none"
          stroke="#666"
          strokeWidth="1"
          opacity="0.6"
        />

        {/* Rayons réalistes */}
        {createRealisticSpokes(150, 280, 30)}

        {/* Valve */}
        <rect x="148" y="242" width="4" height="10" rx="1" fill="#333" />

        {/* Bouchon de valve */}
        <circle cx="150" cy="244" r="1.5" fill="#666" />
      </g>

      {/* Roue arrière - identique mais avec cassette */}
      <g>
        {/* Pneu externe */}
        <circle
          cx="530"
          cy="280"
          r="38"
          stroke="#1a1a1a"
          strokeWidth="8"
          fill="none"
        />

        {/* Flanc du pneu */}
        <circle
          cx="530"
          cy="280"
          r="34"
          stroke="#2a2a2a"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />

        {/* Jante - aluminium réaliste */}
        <circle
          cx="530"
          cy="280"
          r="30"
          stroke="#c0c0c0"
          strokeWidth="4"
          fill="none"
        />

        {/* Surface de freinage */}
        <circle
          cx="530"
          cy="280"
          r="28"
          stroke="#e0e0e0"
          strokeWidth="1"
          fill="none"
          opacity="0.7"
        />

        {/* Moyeu */}
        <circle
          cx="530"
          cy="280"
          r="12"
          fill="#1a1a1a"
          stroke="#dc2626"
          strokeWidth="2"
        />

        {/* Cassette (pignons) - très réaliste */}
        <g>
          {[16, 18, 20, 22, 24, 26, 28].map((radius, i) => (
            <g key={i}>
              <circle
                cx="530"
                cy="280"
                r={radius}
                stroke="#444"
                strokeWidth="2"
                fill="none"
                opacity="0.8"
              />
              {/* Dents des pignons */}
              {Array.from({ length: Math.floor(radius * 1.5) }, (_, j) => {
                const angle =
                  ((j * 360) / Math.floor(radius * 1.5)) * (Math.PI / 180);
                const x1 = 530 + Math.cos(angle) * (radius - 1);
                const y1 = 280 + Math.sin(angle) * (radius - 1);
                const x2 = 530 + Math.cos(angle) * (radius + 1);
                const y2 = 280 + Math.sin(angle) * (radius + 1);

                return (
                  <line
                    key={j}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#555"
                    strokeWidth="0.5"
                    opacity="0.6"
                  />
                );
              })}
            </g>
          ))}
        </g>

        {/* Rayons réalistes */}
        {createRealisticSpokes(530, 280, 30)}

        {/* Valve */}
        <rect x="528" y="242" width="4" height="10" rx="1" fill="#333" />

        {/* Bouchon de valve */}
        <circle cx="530" cy="244" r="1.5" fill="#666" />
      </g>

      {/* Chaîne réaliste */}
      <g>
        {/* Chaîne principale */}
        <path
          d="M 400 275 Q 450 278 520 282"
          stroke="#444"
          strokeWidth="3"
          fill="none"
          strokeDasharray="2,1"
          opacity="0.9"
        />

        {/* Maillons de chaîne détaillés */}
        {Array.from({ length: 15 }, (_, i) => {
          const x = 400 + i * 8;
          const y = 275 + i * 0.5;
          return (
            <rect
              key={i}
              x={x}
              y={y - 1}
              width="3"
              height="2"
              rx="0.5"
              fill="#333"
              opacity="0.8"
            />
          );
        })}
      </g>
    </g>
  );
}
