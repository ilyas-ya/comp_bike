import React from "react";

export function ComponentLegend() {
  const legendItems = [
    {
      label: "Unselected",
      color: "rgba(42, 42, 42, 0.6)",
      borderColor: "rgba(220, 38, 38, 0.6)",
    },
    {
      label: "Selected",
      color: "rgba(255, 0, 64, 0.4)",
      borderColor: "#ff1744",
    },
    {
      label: "Compatible",
      color: "rgba(34, 197, 94, 0.4)",
      borderColor: "#22c55e",
    },
    {
      label: "Conditional",
      color: "rgba(251, 191, 36, 0.4)",
      borderColor: "#fbbf24",
    },
    {
      label: "Incompatible",
      color: "rgba(239, 68, 68, 0.4)",
      borderColor: "#ef4444",
    },
  ];

  return (
    <div
      className="mt-6 p-4 bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-xl border border-red-500/30 backdrop-blur-sm"
      role="region"
      aria-label="Component status legend"
    >
      {/* Legend header */}
      <div className="mb-3">
        <h4 className="text-lg font-bold text-white mb-2 flex items-center">
          <span className="text-red-400 mr-2">⚡</span>
          Status Legend
        </h4>
        <div className="h-px bg-gradient-to-r from-red-500 to-transparent"></div>
      </div>

      {/* Legend items */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {legendItems.map((item, index) => (
          <div
            key={item.label}
            className="flex items-center space-x-2 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-200"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Status indicator */}
            <div
              className="w-4 h-4 rounded border-2 flex-shrink-0"
              style={{
                backgroundColor: item.color,
                borderColor: item.borderColor,
                boxShadow: `0 0 8px ${item.borderColor}40`,
              }}
              aria-hidden="true"
            >
              <div
                className="w-full h-full rounded-sm"
                style={{
                  background: `linear-gradient(45deg, ${item.color}, ${item.borderColor}20)`,
                }}
              ></div>
            </div>

            {/* Label */}
            <span className="text-sm font-medium text-gray-200 select-none">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="mt-4 text-xs text-gray-400 text-center">
        Click on bike components to select them and check compatibility
      </div>
    </div>
  );
}
