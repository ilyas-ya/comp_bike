import React from "react";

export function BikeComponents() {
  return (
    <g>
      {/* Guidon amélioré */}
      <g stroke="#dc2626" strokeWidth="4" fill="none" filter="url(#dropShadow)">
        {/* Cintre */}
        <path
          d="M 80 160 Q 115 145 150 160"
          strokeLinecap="round"
          stroke="url(#accentGradient)"
        />

        {/* Potence */}
        <path
          d="M 115 160 L 115 180"
          strokeLinecap="round"
          stroke="#dc2626"
          strokeWidth="6"
        />

        {/* Cocottes de frein */}
        <ellipse
          cx="95"
          cy="165"
          rx="8"
          ry="12"
          fill="#1a1a1a"
          stroke="#ff0040"
          strokeWidth="1"
        />

        <ellipse
          cx="135"
          cy="165"
          rx="8"
          ry="12"
          fill="#1a1a1a"
          stroke="#ff0040"
          strokeWidth="1"
        />

        {/* Câbles de frein */}
        <path
          d="M 95 175 Q 120 190 145 205"
          stroke="#333"
          strokeWidth="2"
          opacity="0.7"
        />
      </g>

      {/* Selle améliorée */}
      <g>
        <ellipse
          cx="320"
          cy="100"
          rx="30"
          ry="12"
          fill="url(#frameGradient)"
          stroke="#ff0040"
          strokeWidth="2"
          filter="url(#dropShadow)"
        />

        {/* Détails de la selle */}
        <ellipse
          cx="320"
          cy="100"
          rx="25"
          ry="8"
          fill="none"
          stroke="#dc2626"
          strokeWidth="1"
          opacity="0.6"
        />

        {/* Rails de selle */}
        <line
          x1="295"
          y1="105"
          x2="345"
          y2="105"
          stroke="#666"
          strokeWidth="2"
        />
      </g>

      {/* Pédales améliorées */}
      <g>
        {/* Pédale gauche */}
        <ellipse
          cx="365"
          cy="275"
          rx="12"
          ry="6"
          fill="#dc2626"
          stroke="#ff1744"
          strokeWidth="2"
          filter="url(#dropShadow)"
        />

        {/* Pédale droite */}
        <ellipse
          cx="395"
          cy="285"
          rx="12"
          ry="6"
          fill="#dc2626"
          stroke="#ff1744"
          strokeWidth="2"
          filter="url(#dropShadow)"
        />

        {/* Manivelles */}
        <line
          x1="380"
          y1="280"
          x2="365"
          y2="275"
          stroke="#333"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <line
          x1="380"
          y1="280"
          x2="395"
          y2="285"
          stroke="#333"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Plateau */}
        <circle
          cx="380"
          cy="280"
          r="25"
          fill="none"
          stroke="#555"
          strokeWidth="2"
          opacity="0.8"
        />

        {/* Dents du plateau */}
        {Array.from({ length: 16 }, (_, i) => {
          const angle = (i * 22.5 * Math.PI) / 180;
          const x1 = 380 + Math.cos(angle) * 22;
          const y1 = 280 + Math.sin(angle) * 22;
          const x2 = 380 + Math.cos(angle) * 25;
          const y2 = 280 + Math.sin(angle) * 25;

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#666"
              strokeWidth="1"
            />
          );
        })}
      </g>

      {/* Dérailleur arrière */}
      <g transform="translate(510, 270)">
        <rect
          x="0"
          y="0"
          width="15"
          height="25"
          rx="3"
          fill="#1a1a1a"
          stroke="#dc2626"
          strokeWidth="1"
        />

        {/* Galets */}
        <circle
          cx="7"
          cy="8"
          r="4"
          fill="#333"
          stroke="#ff0040"
          strokeWidth="1"
        />
        <circle
          cx="7"
          cy="17"
          r="4"
          fill="#333"
          stroke="#ff0040"
          strokeWidth="1"
        />

        {/* Chape */}
        <path
          d="M 7 4 Q 12 8 12 12 Q 12 16 7 21"
          stroke="#dc2626"
          strokeWidth="2"
          fill="none"
        />
      </g>

      {/* Freins */}
      <g>
        {/* Frein avant */}
        <g transform="translate(130, 240)">
          <rect
            x="0"
            y="0"
            width="20"
            height="8"
            rx="2"
            fill="#1a1a1a"
            stroke="#dc2626"
            strokeWidth="1"
          />

          {/* Patins */}
          <rect x="2" y="8" width="4" height="6" fill="#ff0040" />
          <rect x="14" y="8" width="4" height="6" fill="#ff0040" />
        </g>

        {/* Frein arrière */}
        <g transform="translate(510, 250)">
          <rect
            x="0"
            y="0"
            width="20"
            height="8"
            rx="2"
            fill="#1a1a1a"
            stroke="#dc2626"
            strokeWidth="1"
          />

          {/* Patins */}
          <rect x="2" y="8" width="4" height="6" fill="#ff0040" />
          <rect x="14" y="8" width="4" height="6" fill="#ff0040" />
        </g>
      </g>

      {/* Tige de selle */}
      <line
        x1="320"
        y1="112"
        x2="330"
        y2="150"
        stroke="#333"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </g>
  );
}
