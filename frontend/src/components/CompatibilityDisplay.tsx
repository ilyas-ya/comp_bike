"use client";

import { CompatibilityResult, Component } from "@/types";
import { useAnimationOptimization } from "@/hooks/useResponsive";
import {
  getStatusConfig,
  CompatibilityHeader,
  ConfidenceIndicator,
  ExplanationSection,
  RequiredAdapters,
  AlternativeSuggestions,
  ProcessingTime,
} from "./CompatibilityDisplay/index";

interface CompatibilityDisplayProps {
  result: CompatibilityResult;
  components: [Component, Component];
}

export function CompatibilityDisplay({
  result,
  components,
}: CompatibilityDisplayProps) {
  const [componentA, componentB] = components;
  const statusConfig = getStatusConfig(result.status);

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
      <CompatibilityHeader
        componentA={componentA}
        componentB={componentB}
        statusConfig={statusConfig}
      />

      {result.confidence !== undefined && (
        <ConfidenceIndicator
          confidence={result.confidence}
          statusConfig={statusConfig}
        />
      )}

      <ExplanationSection explanation={result.explanation} />

      <RequiredAdapters adapters={result.required_adapters || []} />

      <AlternativeSuggestions
        suggestions={result.alternative_suggestions || []}
      />

      <ProcessingTime processingTimeMs={result.processing_time_ms} />
    </div>
  );
}
