import React from "react";

export function BikeFrame() {
  return (
    <g
      stroke="url(#frameGradient)"
      strokeWidth="4"
      fill="none"
      filter="url(#dropShadow)"
    >
      {/* Cadre principal amélioré */}

      {/* Triangle principal du cadre - plus réaliste */}
      <path
        d="M 150 280 L 320 110 L 530 150 L 380 280 Z"
        fill="url(#frameGradient)"
        fillOpacity="0.1"
        stroke="url(#accentGradient)"
        strokeWidth="3"
      />

      {/* Tube supérieur (top tube) */}
      <path
        d="M 320 110 Q 380 105 450 115"
        strokeLinecap="round"
        stroke="#dc2626"
        strokeWidth="5"
      />

      {/* Tube diagonal (down tube) */}
      <path
        d="M 150 280 Q 220 200 320 110"
        strokeLinecap="round"
        stroke="#dc2626"
        strokeWidth="5"
      />

      {/* Tube de selle (seat tube) */}
      <path
        d="M 320 110 Q 325 180 330 250 Q 335 270 380 280"
        strokeLinecap="round"
        stroke="url(#accentGradient)"
        strokeWidth="5"
      />

      {/* Bases (chain stays) */}
      <path
        d="M 380 280 Q 450 285 530 290"
        strokeLinecap="round"
        stroke="url(#accentGradient)"
        strokeWidth="4"
      />

      {/* Haubans (seat stays) */}
      <path
        d="M 320 110 Q 420 125 530 150"
        strokeLinecap="round"
        stroke="#dc2626"
        strokeWidth="4"
      />

      {/* Tube de direction (head tube) */}
      <path
        d="M 150 280 Q 130 240 120 200 Q 115 180 115 160"
        strokeLinecap="round"
        stroke="#dc2626"
        strokeWidth="4"
      />

      {/* Fourche (fork) */}
      <path
        d="M 115 160 Q 110 190 105 220 Q 100 250 150 280"
        strokeLinecap="round"
        stroke="#dc2626"
        strokeWidth="4"
      />

      {/* Boîtier de pédalier renforcé */}
      <circle
        cx="380"
        cy="280"
        r="8"
        fill="url(#accentGradient)"
        stroke="#ff1744"
        strokeWidth="2"
      />

      {/* Détails supplémentaires pour plus de réalisme */}

      {/* Câbles */}
      <path
        d="M 200 140 Q 250 130 300 120"
        stroke="#555"
        strokeWidth="1"
        opacity="0.6"
      />

      <path
        d="M 320 110 Q 350 250 380 280"
        stroke="#555"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* Fixations */}
      <circle cx="320" cy="110" r="3" fill="#ff0040" />
      <circle cx="150" cy="280" r="3" fill="#ff0040" />
      <circle cx="530" cy="150" r="3" fill="#ff0040" />
    </g>
  );
}
