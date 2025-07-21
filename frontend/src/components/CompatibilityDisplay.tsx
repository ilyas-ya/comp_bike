"use client";

import { CompatibilityResult, Component } from "@/types";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface CompatibilityDisplayProps {
  result: CompatibilityResult;
  components: [Component, Component];
}

export function CompatibilityDisplay({
  result,
  components,
}: CompatibilityDisplayProps) {
  const [componentA, componentB] = components;

  // Status indicator configuration
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "compatible":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          label: "Compatible",
        };
      case "conditional":
        return {
          icon: AlertTriangle,
          color: "text-orange-600",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
          label: "Conditional",
        };
      case "incompatible":
        return {
          icon: XCircle,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          label: "Incompatible",
        };
      default:
        return {
          icon: AlertTriangle,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          label: "Unknown",
        };
    }
  };

  const statusConfig = getStatusConfig(result.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div
      className={`border rounded-xl p-3 sm:p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300 animate-slide-up ${statusConfig.bgColor} ${statusConfig.borderColor} hover:scale-[1.02] focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500`}
      role="region"
      aria-label={`Compatibility result: ${statusConfig.label}`}
      tabIndex={0}
    >
      {/* Header with components and status */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <div className="text-sm sm:text-base font-semibold text-gray-900 mb-2 leading-tight">
            <span className="block sm:inline">
              {componentA.brand} {componentA.name}
            </span>
            <span className="text-gray-500 mx-2 hidden sm:inline">+</span>
            <span className="block sm:inline mt-1 sm:mt-0">
              {componentB.brand} {componentB.name}
            </span>
          </div>
          <div className="text-xs text-gray-600 capitalize">
            {componentA.category.replace("_", " ")} &{" "}
            {componentB.category.replace("_", " ")}
          </div>
        </div>

        <div
          className={`flex items-center gap-2 ${statusConfig.color} flex-shrink-0`}
        >
          <StatusIcon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          <span className="font-bold text-sm sm:text-base">
            {statusConfig.label}
          </span>
        </div>
      </div>

      {/* Confidence indicator */}
      {result.confidence !== undefined && (
        <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-700 mb-2">
            <span className="font-medium">Confidence Level</span>
            <span className="font-semibold">
              {Math.round(result.confidence * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <div
              className={`h-3 rounded-full transition-all duration-500 ease-out shadow-sm ${
                result.confidence >= 0.8
                  ? "bg-gradient-to-r from-green-400 to-green-500"
                  : result.confidence >= 0.6
                  ? "bg-gradient-to-r from-orange-400 to-orange-500"
                  : "bg-gradient-to-r from-red-400 to-red-500"
              }`}
              style={{ width: `${result.confidence * 100}%` }}
              role="progressbar"
              aria-valuenow={Math.round(result.confidence * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Confidence level: ${Math.round(
                result.confidence * 100
              )} percent`}
            />
          </div>
        </div>
      )}

      {/* Detailed explanation */}
      <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <svg
            className="h-4 w-4 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
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
        <p className="text-sm text-gray-700 leading-relaxed">
          {result.explanation}
        </p>
      </div>

      {/* Required adapters section */}
      {result.required_adapters && result.required_adapters.length > 0 && (
        <div className="mb-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <AlertTriangle
              className="h-4 w-4 text-orange-500"
              aria-hidden="true"
            />
            Required Adapters
          </h4>
          <div className="space-y-3">
            {result.required_adapters.map((adapter, index) => (
              <div
                key={adapter.id || index}
                className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-gray-900 mb-1">
                      {adapter.brand} {adapter.name}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-2">
                      {adapter.description}
                    </p>
                    {adapter.price_range && (
                      <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Price: {adapter.price_range}
                      </div>
                    )}
                  </div>
                  {adapter.image && (
                    <img
                      src={adapter.image}
                      alt={`${adapter.brand} ${adapter.name} adapter`}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shadow-sm flex-shrink-0"
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
          <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle
                className="h-4 w-4 text-green-500"
                aria-hidden="true"
              />
              Alternative Suggestions
            </h4>
            <div className="space-y-3">
              {result.alternative_suggestions.map((suggestion, index) => (
                <div
                  key={suggestion.id || index}
                  className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-gray-900 mb-1">
                        {suggestion.brand} {suggestion.name}
                      </div>
                      {suggestion.description && (
                        <p className="text-sm text-gray-600 leading-relaxed mb-2">
                          {suggestion.description}
                        </p>
                      )}
                      {suggestion.price_range && (
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Price: {suggestion.price_range}
                        </div>
                      )}
                    </div>
                    {suggestion.image && (
                      <img
                        src={suggestion.image}
                        alt={`${suggestion.brand} ${suggestion.name} alternative`}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shadow-sm flex-shrink-0"
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
        <div className="text-xs text-gray-500 text-right">
          Processed in {result.processing_time_ms}ms
        </div>
      )}
    </div>
  );
}
