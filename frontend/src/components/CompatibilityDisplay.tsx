"use client";

import { CompatibilityResult, Component } from "@/types";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { useAnimationOptimization } from "@/hooks/useResponsive";

interface CompatibilityDisplayProps {
  result: CompatibilityResult;
  components: [Component, Component];
}

export function CompatibilityDisplay({
  result,
  components,
}: CompatibilityDisplayProps) {
  const [componentA, componentB] = components;

  // Responsive optimization hook
  const { shouldUseAnimation, getOptimizedStyle } = useAnimationOptimization();

  // Cyberpunk status indicator configuration
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "compatible":
        return {
          icon: CheckCircle,
          color: "text-cyberpunk-red",
          glowClass: "cyberpunk-glow-red",
          containerClass: "glassmorphism-cyberpunk border-cyberpunk-red/30",
          pulseClass: "status-compatible",
          label: "Compatible",
          confidenceColor: "from-cyberpunk-red to-cyberpunk-bloodred",
          glowColor: "rgba(220, 38, 38, 0.6)",
        };
      case "conditional":
        return {
          icon: AlertTriangle,
          color: "text-cyberpunk-accent",
          glowClass: "cyberpunk-glow-accent",
          containerClass: "glassmorphism-cyberpunk border-cyberpunk-accent/30",
          pulseClass: "status-conditional",
          label: "Conditional",
          confidenceColor: "from-cyberpunk-accent to-cyberpunk-crimson",
          glowColor: "rgba(255, 23, 68, 0.6)",
        };
      case "incompatible":
        return {
          icon: XCircle,
          color: "text-cyberpunk-darkred",
          glowClass: "cyberpunk-glow-subtle",
          containerClass: "glassmorphism-medium border-cyberpunk-darkred/30",
          pulseClass: "status-incompatible",
          label: "Incompatible",
          confidenceColor: "from-cyberpunk-darkred to-red-900",
          glowColor: "rgba(153, 27, 27, 0.6)",
        };
      default:
        return {
          icon: AlertTriangle,
          color: "text-cyberpunk-gray",
          glowClass: "cyberpunk-glow-subtle",
          containerClass: "glassmorphism-light border-cyberpunk-gray/30",
          pulseClass: "",
          label: "Unknown",
          confidenceColor: "from-cyberpunk-gray to-cyberpunk-darkgray",
          glowColor: "rgba(42, 42, 42, 0.6)",
        };
    }
  };

  const statusConfig = getStatusConfig(result.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div
      className={`${statusConfig.containerClass} ${statusConfig.pulseClass} rounded-xl p-3 sm:p-4 md:p-6 cyberpunk-transition-normal animate-slide-up cyberpunk-interactive-debounced cyberpunk-focus-enhanced responsive-compatibility-card`}
      role="region"
      aria-label={`Compatibility result: ${statusConfig.label}`}
      tabIndex={0}
      style={{
        boxShadow: `0 8px 24px rgba(0, 0, 0, 0.4), 0 0 16px ${statusConfig.glowColor}`,
      }}
    >
      {/* Header with components and status */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <div className="text-sm sm:text-base font-semibold theme-text-primary mb-2 leading-tight">
            <span className="block sm:inline cyberpunk-glow-subtle">
              {componentA.brand} {componentA.name}
            </span>
            <span className="theme-text-muted mx-2 hidden sm:inline">+</span>
            <span className="block sm:inline mt-1 sm:mt-0 cyberpunk-glow-subtle">
              {componentB.brand} {componentB.name}
            </span>
          </div>
          <div className="text-xs theme-text-tertiary capitalize">
            {componentA.category.replace("_", " ")} &{" "}
            {componentB.category.replace("_", " ")}
          </div>
        </div>

        <div
          className={`flex items-center gap-2 ${statusConfig.color} ${statusConfig.glowClass} flex-shrink-0 cyberpunk-transition-fast`}
        >
          <StatusIcon
            className="h-5 w-5 sm:h-6 sm:w-6 cyberpunk-gpu-filter"
            aria-hidden="true"
            style={{
              filter: `drop-shadow(0 0 6px ${statusConfig.glowColor})`,
            }}
          />
          <span className="font-bold text-sm sm:text-base cyberpunk-gpu-opacity">
            {statusConfig.label}
          </span>
        </div>
      </div>

      {/* Confidence indicator */}
      {result.confidence !== undefined && (
        <div className="mb-4 p-3 glassmorphism-light rounded-lg border border-cyberpunk-red/20 cyberpunk-transition-normal">
          <div className="flex items-center justify-between text-sm theme-text-secondary mb-2">
            <span className="font-medium cyberpunk-glow-subtle">
              Confidence Level
            </span>
            <span className="font-semibold theme-text-primary cyberpunk-glow-subtle">
              {Math.round(result.confidence * 100)}%
            </span>
          </div>
          <div className="w-full bg-cyberpunk-darkgray/50 rounded-full h-3 shadow-inner border border-cyberpunk-red/10 overflow-hidden">
            <div
              className={`h-3 rounded-full cyberpunk-transition-gpu-smooth cyberpunk-gpu-accelerated bg-gradient-to-r ${statusConfig.confidenceColor} relative`}
              style={getOptimizedStyle({
                width: `${result.confidence * 100}%`,
                boxShadow: `0 0 8px ${statusConfig.glowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
                animation:
                  result.confidence >= 0.8 && shouldUseAnimation("glow")
                    ? "cyberpunk-glow-breathing 3s ease-in-out infinite"
                    : "none",
              })}
              role="progressbar"
              aria-valuenow={Math.round(result.confidence * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Confidence level: ${Math.round(
                result.confidence * 100
              )} percent`}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"
                style={{
                  animation: "data-stream 2s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Detailed explanation */}
      <div className="mb-4 p-3 glassmorphism-light rounded-lg border border-cyberpunk-red/20 cyberpunk-transition-normal">
        <h4 className="text-sm font-semibold theme-text-primary mb-3 flex items-center gap-2 cyberpunk-glow-subtle">
          <svg
            className="h-4 w-4 text-cyberpunk-neon cyberpunk-glow-neon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            style={{
              filter: "drop-shadow(0 0 4px rgba(255, 0, 64, 0.6))",
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Explanation
        </h4>
        <p className="text-sm theme-text-secondary leading-relaxed">
          {result.explanation}
        </p>
      </div>

      {/* Required adapters section */}
      {result.required_adapters && result.required_adapters.length > 0 && (
        <div className="mb-4 p-3 glassmorphism-light rounded-lg border border-cyberpunk-accent/30 cyberpunk-transition-normal">
          <h4 className="text-sm font-semibold theme-text-primary mb-3 flex items-center gap-2 cyberpunk-glow-accent">
            <AlertTriangle
              className="h-4 w-4 text-cyberpunk-accent cyberpunk-glow-accent"
              aria-hidden="true"
              style={{
                filter: "drop-shadow(0 0 4px rgba(255, 23, 68, 0.6))",
              }}
            />
            Required Adapters
          </h4>
          <div className="space-y-3">
            {result.required_adapters.map((adapter, index) => (
              <div
                key={adapter.id || index}
                className="glassmorphism-medium rounded-lg p-4 border border-cyberpunk-red/20 cyberpunk-interactive cyberpunk-transition-normal"
                style={{
                  boxShadow:
                    "0 4px 16px rgba(0, 0, 0, 0.3), 0 0 8px rgba(220, 38, 38, 0.2)",
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm theme-text-primary mb-1 cyberpunk-glow-subtle">
                      {adapter.brand} {adapter.name}
                    </div>
                    <p className="text-sm theme-text-secondary leading-relaxed mb-2">
                      {adapter.description}
                    </p>
                    {adapter.price_range && (
                      <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium glassmorphism-light border border-cyberpunk-red/30 theme-text-primary">
                        <span className="cyberpunk-glow-subtle">
                          Price: {adapter.price_range}
                        </span>
                      </div>
                    )}
                  </div>
                  {adapter.image && (
                    <img
                      src={adapter.image}
                      alt={`${adapter.brand} ${adapter.name} adapter`}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-cyberpunk-red/30 flex-shrink-0 cyberpunk-transition-fast"
                      style={{
                        boxShadow:
                          "0 2px 8px rgba(0, 0, 0, 0.4), 0 0 4px rgba(220, 38, 38, 0.3)",
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alternative suggestions section */}
      {result.alternative_suggestions &&
        result.alternative_suggestions.length > 0 && (
          <div className="mb-4 p-3 glassmorphism-light rounded-lg border border-cyberpunk-red/30 cyberpunk-transition-normal">
            <h4 className="text-sm font-semibold theme-text-primary mb-3 flex items-center gap-2 cyberpunk-glow-red">
              <CheckCircle
                className="h-4 w-4 text-cyberpunk-red cyberpunk-glow-red"
                aria-hidden="true"
                style={{
                  filter: "drop-shadow(0 0 4px rgba(220, 38, 38, 0.6))",
                }}
              />
              Alternative Suggestions
            </h4>
            <div className="space-y-3">
              {result.alternative_suggestions.map((suggestion, index) => (
                <div
                  key={suggestion.id || index}
                  className="glassmorphism-medium rounded-lg p-4 border border-cyberpunk-red/20 cyberpunk-interactive cyberpunk-transition-normal"
                  style={{
                    boxShadow:
                      "0 4px 16px rgba(0, 0, 0, 0.3), 0 0 8px rgba(220, 38, 38, 0.2)",
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm theme-text-primary mb-1 cyberpunk-glow-subtle">
                        {suggestion.brand} {suggestion.name}
                      </div>
                      {suggestion.description && (
                        <p className="text-sm theme-text-secondary leading-relaxed mb-2">
                          {suggestion.description}
                        </p>
                      )}
                      {suggestion.price_range && (
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium glassmorphism-light border border-cyberpunk-red/30 theme-text-primary">
                          <span className="cyberpunk-glow-subtle">
                            Price: {suggestion.price_range}
                          </span>
                        </div>
                      )}
                    </div>
                    {suggestion.image && (
                      <img
                        src={suggestion.image}
                        alt={`${suggestion.brand} ${suggestion.name} alternative`}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-cyberpunk-red/30 flex-shrink-0 cyberpunk-transition-fast"
                        style={{
                          boxShadow:
                            "0 2px 8px rgba(0, 0, 0, 0.4), 0 0 4px rgba(220, 38, 38, 0.3)",
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Processing time (for debugging/transparency) */}
      {result.processing_time_ms && (
        <div className="text-xs theme-text-muted text-right cyberpunk-glow-subtle">
          Processed in {result.processing_time_ms}ms
        </div>
      )}
    </div>
  );
}
