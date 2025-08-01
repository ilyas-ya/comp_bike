import React from "react";

export function BikeComponentsClean() {
  return (
    <g>
      {/* Guidon drop bar réaliste */}
      <g filter="url(#dropShadow)">
        {/* Cintre principal */}
        <path
          d="M 120 155 Q 150 150 180 155"
          stroke="#1a1a1a"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />

        {/* Drops (partie basse du cintre) */}
        <path
          d="M 130 155 Q 125 165 125 175"
          stroke="#1a1a1a"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />

        <path
          d="M 170 155 Q 175 165 175 175"
          stroke="#1a1a1a"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />

        {/* Potence */}
        <line
          x1="150"
          y1="155"
          x2="180"
          y2="180"
          stroke="#2a2a2a"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Capot de frein/shifter gauche */}
        <ellipse
          cx="135"
          cy="160"
          rx="8"
          ry="15"
          fill="#1a1a1a"
          stroke="#dc2626"
          strokeWidth="1"
          transform="rotate(-10 135 160)"
        />

        {/* Capot de frein/shifter droit */}
        <ellipse
          cx="165"
          cy="160"
          rx="8"
          ry="15"
          fill="#1a1a1a"
          stroke="#dc2626"
          strokeWidth="1"
          transform="rotate(10 165 160)"
        />

        {/* Guidoline (bar tape) */}
        <circle cx="130" cy="155" r="4" fill="#333" opacity="0.8" />
        <circle cx="170" cy="155" r="4" fill="#333" opacity="0.8" />

        {/* Câbles de frein réalistes */}
        <path
          d="M 135 165 Q 150 180 165 195"
          stroke="#333"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />
      </g>

      {/* Selle réaliste */}
      <g filter="url(#dropShadow)">
        <ellipse
          cx="350"
          cy="110"
          rx="35"
          ry="12"
          fill="#1a1a1a"
          stroke="#dc2626"
          strokeWidth="1"
        />

        {/* Détails de la selle */}
        <ellipse
          cx="350"
          cy="110"
          rx="30"
          ry="8"
          fill="none"
          stroke="#333"
          strokeWidth="1"
          opacity="0.6"
        />

        {/* Logo/marque */}
        <text
          x="350"
          y="113"
          fontSize="4"
          fill="#666"
          textAnchor="middle"
          fontFamily="sans-serif"
        >
          SPORT
        </text>

        {/* Rails de selle */}
        <line
          x1="320"
          y1="118"
          x2="380"
          y2="118"
          stroke="#666"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Tige de selle */}
        <line
          x1="350"
          y1="122"
          x2="365"
          y2="260"
          stroke="#2a2a2a"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Collier de serrage */}
        <circle
          cx="365"
          cy="240"
          r="4"
          fill="none"
          stroke="#666"
          strokeWidth="2"
        />
      </g>

      {/* Groupe de transmission réaliste */}
      <g>
        {/* Pédales réalistes */}
        <g filter="url(#dropShadow)">
          {/* Pédale gauche */}
          <rect
            x="355"
            y="272"
            width="18"
            height="8"
            rx="2"
            fill="#1a1a1a"
            stroke="#dc2626"
            strokeWidth="1"
          />

          {/* Pédale droite */}
          <rect
            x="387"
            y="277"
            width="18"
            height="8"
            rx="2"
            fill="#1a1a1a"
            stroke="#dc2626"
            strokeWidth="1"
          />

          {/* Manivelles */}
          <line
            x1="380"
            y1="270"
            x2="364"
            y2="276"
            stroke="#2a2a2a"
            strokeWidth="6"
            strokeLinecap="round"
          />

          <line
            x1="380"
            y1="270"
            x2="396"
            y2="281"
            stroke="#2a2a2a"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Plateau (chainring) - très détaillé */}
          <circle
            cx="380"
            cy="270"
            r="28"
            fill="none"
            stroke="#444"
            strokeWidth="3"
            opacity="0.9"
          />

          {/* Dents du plateau */}
          {Array.from({ length: 50 }, (_, i) => {
            const angle = (i * 7.2 * Math.PI) / 180;
            const x1 = 380 + Math.cos(angle) * 25;
            const y1 = 270 + Math.sin(angle) * 25;
            const x2 = 380 + Math.cos(angle) * 28;
            const y2 = 270 + Math.sin(angle) * 28;

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#555"
                strokeWidth="1"
                opacity="0.7"
              />
            );
          })}

          {/* Logo plateau */}
          <circle
            cx="380"
            cy="270"
            r="15"
            fill="none"
            stroke="#666"
            strokeWidth="1"
            opacity="0.6"
          />
        </g>

        {/* Dérailleur arrière ultra-détaillé */}
        <g transform="translate(515, 265)" filter="url(#dropShadow)">
          {/* Corps principal */}
          <rect
            x="0"
            y="0"
            width="20"
            height="30"
            rx="4"
            fill="#1a1a1a"
            stroke="#dc2626"
            strokeWidth="1"
          />

          {/* Galets (jockey wheels) */}
          <circle
            cx="8"
            cy="10"
            r="6"
            fill="#333"
            stroke="#666"
            strokeWidth="1"
          />
          <circle
            cx="12"
            cy="22"
            r="6"
            fill="#333"
            stroke="#666"
            strokeWidth="1"
          />

          {/* Dents des galets */}
          {[10, 22].map((y, idx) =>
            Array.from({ length: 12 }, (_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const centerX = idx === 0 ? 8 : 12;
              const x1 = centerX + Math.cos(angle) * 4;
              const y1 = y + Math.sin(angle) * 4;
              const x2 = centerX + Math.cos(angle) * 6;
              const y2 = y + Math.sin(angle) * 6;

              return (
                <line
                  key={`${idx}-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#777"
                  strokeWidth="0.5"
                />
              );
            })
          )}

          {/* Chape mobile */}
          <path
            d="M 8 4 Q 15 8 15 15 Q 15 22 12 28"
            stroke="#dc2626"
            strokeWidth="2"
            fill="none"
          />

          {/* Vis de réglage */}
          <circle cx="16" cy="6" r="2" fill="#666" />
          <circle cx="16" cy="26" r="2" fill="#666" />
        </g>
      </g>

      {/* Système de freinage réaliste */}
      <g>
        {/* Étrier de frein avant */}
        <g transform="translate(130, 235)" filter="url(#dropShadow)">
          <rect
            x="0"
            y="0"
            width="25"
            height="12"
            rx="3"
            fill="#1a1a1a"
            stroke="#dc2626"
            strokeWidth="1"
          />

          {/* Patins de frein */}
          <rect x="3" y="12" width="6" height="8" rx="1" fill="#8B4513" />
          <rect x="16" y="12" width="6" height="8" rx="1" fill="#8B4513" />

          {/* Vis de réglage */}
          <circle cx="12" cy="6" r="2" fill="#666" />
        </g>

        {/* Étrier de frein arrière */}
        <g transform="translate(510, 245)" filter="url(#dropShadow)">
          <rect
            x="0"
            y="0"
            width="25"
            height="12"
            rx="3"
            fill="#1a1a1a"
            stroke="#dc2626"
            strokeWidth="1"
          />

          {/* Patins de frein */}
          <rect x="3" y="12" width="6" height="8" rx="1" fill="#8B4513" />
          <rect x="16" y="12" width="6" height="8" rx="1" fill="#8B4513" />

          {/* Vis de réglage */}
          <circle cx="12" cy="6" r="2" fill="#666" />
        </g>
      </g>

      {/* Câblage réaliste */}
      <g stroke="#333" strokeWidth="2" fill="none" opacity="0.7">
        {/* Câbles de frein */}
        <path d="M 135 165 Q 140 200 145 235" />
        <path d="M 165 165 Q 400 180 510 245" />

        {/* Câbles de dérailleur */}
        <path d="M 160 170 Q 300 200 515 265" />

        {/* Gaines */}
        <path d="M 200 180 L 220 185" stroke="#666" strokeWidth="3" />
        <path d="M 300 190 L 320 195" stroke="#666" strokeWidth="3" />
      </g>
    </g>
  );
}
