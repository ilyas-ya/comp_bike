"use client";

import { useState } from "react";
import {
  CompatibilityResult,
  BikeConfiguration,
  Component,
  ComponentCategory,
} from "@/types";
import { Bike3DModal } from "./Bike3DModal";

interface CompatibilityResultsProps {
  results: CompatibilityResult[];
  configuration?: BikeConfiguration;
  onConfigurationChange?: (
    category: ComponentCategory,
    component: Component | null
  ) => void;
}

export function CompatibilityResults({
  results,
  configuration,
  onConfigurationChange,
}: CompatibilityResultsProps) {
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);
  const getStatusColor = (status: CompatibilityResult["status"]) => {
    switch (status) {
      case "compatible":
        return "text-green-400 border-green-500/30 bg-green-500/10";
      case "conditional":
        return "text-yellow-400 border-yellow-500/30 bg-yellow-500/10";
      case "incompatible":
        return "text-red-400 border-red-500/30 bg-red-500/10";
      default:
        return "text-white/60 border-white/20 bg-white/5";
    }
  };

  const getStatusIcon = (status: CompatibilityResult["status"]) => {
    switch (status) {
      case "compatible":
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "conditional":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      case "incompatible":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusLabel = (status: CompatibilityResult["status"]) => {
    switch (status) {
      case "compatible":
        return "Compatible";
      case "conditional":
        return "Compatible with conditions";
      case "incompatible":
        return "Incompatible";
      default:
        return "Unknown status";
    }
  };

  const getOverallStatus = () => {
    if (results.every((r) => r.status === "compatible")) {
      return {
        status: "compatible" as const,
        message: "Perfect! All components are compatible with each other.",
        color: "text-green-400",
      };
    } else if (results.some((r) => r.status === "incompatible")) {
      return {
        status: "incompatible" as const,
        message: "Warning! Some components are not compatible.",
        color: "text-red-400",
      };
    } else {
      return {
        status: "conditional" as const,
        message: "Compatibility possible with some adjustments.",
        color: "text-yellow-400",
      };
    }
  };

  const overallStatus = getOverallStatus();

  return (
    <div className="bg-cyberpunk-black/60 backdrop-blur-lg rounded-2xl border border-cyberpunk-red/30 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Compatibility Results</h2>
        <div className="flex items-center space-x-2">
          <div
            className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(
              overallStatus.status
            )}`}
          >
            {getStatusIcon(overallStatus.status)}
            <span className="font-medium">
              {getStatusLabel(overallStatus.status)}
            </span>
          </div>
        </div>
      </div>

      {/* Overall Summary */}
      <div
        className={`p-4 rounded-lg border mb-6 ${getStatusColor(
          overallStatus.status
        )}`}
      >
        <div className="flex items-start space-x-3">
          {getStatusIcon(overallStatus.status)}
          <div>
            <h3 className="font-bold mb-2">General Summary</h3>
            <p className="text-sm opacity-90">{overallStatus.message}</p>
          </div>
        </div>
      </div>

      {/* Individual Results */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white mb-4">Component Details</h3>

        {results.map((result, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${getStatusColor(result.status)}`}
          >
            <div className="flex items-start space-x-3">
              {getStatusIcon(result.status)}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold">{getStatusLabel(result.status)}</h4>
                  {result.confidence && (
                    <span className="text-sm opacity-75">
                      Confidence: {Math.round(result.confidence * 100)}%
                    </span>
                  )}
                </div>

                <p className="text-sm opacity-90 mb-3">{result.explanation}</p>

                {/* Required Adapters */}
                {result.required_adapters &&
                  result.required_adapters.length > 0 && (
                    <div className="mb-3">
                      <h5 className="font-medium text-sm mb-2">
                        Required adapters:
                      </h5>
                      <div className="space-y-2">
                        {result.required_adapters.map(
                          (adapter, adapterIndex) => (
                            <div
                              key={adapterIndex}
                              className="flex items-center space-x-2 p-2 bg-white/5 rounded"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                                />
                              </svg>
                              <div>
                                <span className="font-medium">
                                  {adapter.name}
                                </span>
                                <span className="text-xs opacity-75 ml-2">
                                  {adapter.brand} {adapter.model}
                                </span>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* Alternative Suggestions */}
                {result.alternative_suggestions &&
                  result.alternative_suggestions.length > 0 && (
                    <div className="mb-3">
                      <h5 className="font-medium text-sm mb-2">
                        Suggested alternatives:
                      </h5>
                      <div className="space-y-2">
                        {result.alternative_suggestions.map(
                          (suggestion, suggestionIndex) => (
                            <div
                              key={suggestionIndex}
                              className="flex items-center space-x-2 p-2 bg-white/5 rounded"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                />
                              </svg>
                              <div>
                                <span className="font-medium">
                                  {suggestion.name}
                                </span>
                                <span className="text-xs opacity-75 ml-2">
                                  {suggestion.brand} {suggestion.model}
                                </span>
                                {suggestion.price_range && (
                                  <span className="text-xs opacity-75 ml-2">
                                    • {suggestion.price_range}
                                  </span>
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* Processing Time */}
                {result.processing_time_ms && (
                  <div className="text-xs opacity-60">
                    Analyzed in {result.processing_time_ms}ms
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="flex flex-wrap gap-3">
          {/* 3D Modal Button */}
          {configuration && onConfigurationChange && (
            <button
              onClick={() => setIs3DModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyberpunk-neon/20 to-cyberpunk-accent/20 border border-cyberpunk-neon/30 rounded-lg text-cyberpunk-neon hover:from-cyberpunk-neon/30 hover:to-cyberpunk-accent/30 transition-all duration-300"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span>3D Configurator</span>
            </button>
          )}

          <button className="flex items-center space-x-2 px-4 py-2 bg-cyberpunk-neon/20 border border-cyberpunk-neon/30 rounded-lg text-cyberpunk-neon hover:bg-cyberpunk-neon/30 transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span>Copy Report</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2 bg-cyberpunk-accent/20 border border-cyberpunk-accent/30 rounded-lg text-cyberpunk-accent hover:bg-cyberpunk-accent/30 transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Export PDF</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 border border-purple-400/30 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Modal 3D */}
      {configuration && onConfigurationChange && (
        <Bike3DModal
          isOpen={is3DModalOpen}
          onClose={() => setIs3DModalOpen(false)}
          configuration={configuration}
          onComponentChange={onConfigurationChange}
        />
      )}
    </div>
  );
}
