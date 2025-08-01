import React from "react";

export function BikeFrameClean() {
  return (
    <g filter="url(#dropShadow)">
      {/* Cadre principal ultra-réaliste et propre */}

      {/* Tube supérieur (top tube) - ligne droite propre */}
      <line
        x1="190"
        y1="140"
        x2="350"
        y2="120"
        stroke="#2a2a2a"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Tube diagonal (down tube) - courbe naturelle */}
      <path
        d="M 190 140 Q 280 200 380 270"
        stroke="#2a2a2a"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />

      {/* Tube de selle (seat tube) - vertical réaliste */}
      <line
        x1="350"
        y1="120"
        x2="380"
        y2="270"
        stroke="#2a2a2a"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Bases arrière (chain stays) - horizontales */}
      <line
        x1="380"
        y1="270"
        x2="530"
        y2="280"
        stroke="#2a2a2a"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Haubans (seat stays) - diagonales propres */}
      <line
        x1="350"
        y1="120"
        x2="530"
        y2="280"
        stroke="#2a2a2a"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Tube de direction (head tube) - court et vertical */}
      <line
        x1="190"
        y1="140"
        x2="180"
        y2="180"
        stroke="#2a2a2a"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Fourche avant - réaliste */}
      <path
        d="M 180 180 Q 170 220 150 280"
        stroke="#2a2a2a"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />

      {/* Boîtier de pédalier - renforcé et réaliste */}
      <circle
        cx="380"
        cy="270"
        r="12"
        fill="#1a1a1a"
        stroke="#dc2626"
        strokeWidth="2"
      />

      {/* Détails de finition */}

      {/* Soudures aux jonctions - détails réalistes */}
      <circle
        cx="190"
        cy="140"
        r="6"
        fill="#1a1a1a"
        stroke="#dc2626"
        strokeWidth="1"
      />
      <circle
        cx="350"
        cy="120"
        r="6"
        fill="#1a1a1a"
        stroke="#dc2626"
        strokeWidth="1"
      />
      <circle
        cx="380"
        cy="270"
        r="6"
        fill="#1a1a1a"
        stroke="#dc2626"
        strokeWidth="1"
      />
      <circle
        cx="530"
        cy="280"
        r="6"
        fill="#1a1a1a"
        stroke="#dc2626"
        strokeWidth="1"
      />

      {/* Porte-bidon */}
      <rect
        x="280"
        y="160"
        width="4"
        height="15"
        rx="2"
        fill="#666"
        opacity="0.8"
      />
      <rect
        x="280"
        y="190"
        width="4"
        height="15"
        rx="2"
        fill="#666"
        opacity="0.8"
      />

      {/* Numéro de série réaliste */}
      <text
        x="320"
        y="200"
        fontSize="6"
        fill="#666"
        opacity="0.6"
        fontFamily="monospace"
      >
        CF-2024
      </text>
    </g>
  );
}
