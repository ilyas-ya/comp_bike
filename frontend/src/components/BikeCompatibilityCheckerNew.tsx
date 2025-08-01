"use client";

import { useState, useEffect } from "react";
import {
  BikeModel,
  BikeConfiguration,
  Component,
  ComponentCategory,
} from "@/types";
import { bikeModelsApi, componentsApi, compatibilityApi } from "@/lib/api";
import { BikeModelSelector } from "./compatibility/BikeModelSelector";
import { ComponentBuilder } from "./compatibility/ComponentBuilder";
import { CompatibilityResults } from "./CompatibilityResults";

type BuildMode = "bike" | "component";

export function BikeCompatibilityCheckerNew() {
  const [buildMode, setBuildMode] = useState<BuildMode>("bike");
  const [configuration, setConfiguration] = useState<BikeConfiguration>({
    components: {} as Record<ComponentCategory, Component | null>,
    last_modified: new Date(),
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [compatibilityResults, setCompatibilityResults] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<ComponentCategory | null>(null);

  const categories: { key: ComponentCategory; label: string; icon: string }[] =
    [
      { key: "bottom_bracket", label: "Bottom Bracket", icon: "⚙️" },
      {
        key: "cassette_derailleur",
        label: "Cassette & Derailleur",
        icon: "🔧",
      },
      { key: "brake_system", label: "Brake System", icon: "🛑" },
      { key: "wheel_frame", label: "Wheels & Frame", icon: "🚴" },
      { key: "seatpost", label: "Seatpost", icon: "💺" },
      { key: "fork", label: "Fork", icon: "🔱" },
      { key: "handlebars", label: "Handlebars", icon: "🎯" },
      { key: "crankset", label: "Crankset", icon: "⚡" },
    ];

  const handleBikeModelSelect = async (model: BikeModel) => {
    try {
      const response = await bikeModelsApi.getModelConfiguration(model.id);
      if (response.status === 200) {
        setConfiguration(response.data);
      }
    } catch (error) {
      console.error("Error loading bike configuration:", error);
    }
  };

  const handleComponentSelect = (
    category: ComponentCategory,
    component: Component | null
  ) => {
    setConfiguration((prev) => ({
      ...prev,
      components: {
        ...prev.components,
        [category]: component,
      },
      last_modified: new Date(),
    }));
  };

  const handleAnalyzeCompatibility = async () => {
    setIsAnalyzing(true);
    try {
      const response = await compatibilityApi.checkConfiguration(configuration);
      if (response.status === 200) {
        setCompatibilityResults(response.data);
      }
    } catch (error) {
      console.error("Error analyzing compatibility:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getComponentCount = () => {
    return Object.values(configuration.components).filter(Boolean).length;
  };

  const getTotalComponents = () => {
    return categories.length;
  };

  return (
    <div className="space-y-8">
      {/* Mode Selector */}
      <div className="bg-cyberpunk-black/60 backdrop-blur-lg rounded-2xl border border-cyberpunk-red/30 p-6">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Choose your verification method
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setBuildMode("bike")}
            className={`p-6 rounded-xl border-2 transition-all duration-300 ${
              buildMode === "bike"
                ? "border-cyberpunk-neon bg-cyberpunk-neon/10 shadow-lg shadow-cyberpunk-neon/20"
                : "border-white/20 bg-cyberpunk-black/40 hover:border-cyberpunk-accent/50"
            }`}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">🚴‍♂️</div>
              <h3 className="text-xl font-bold text-white mb-2">Bike Mode</h3>
              <p className="text-white/70 text-sm">
                Select an existing bike model and modify a specific component
              </p>
              <div className="mt-4 inline-flex items-center text-cyberpunk-neon text-sm">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Fast and accurate
              </div>
            </div>
          </button>

          <button
            onClick={() => setBuildMode("component")}
            className={`p-6 rounded-xl border-2 transition-all duration-300 ${
              buildMode === "component"
                ? "border-cyberpunk-accent bg-cyberpunk-accent/10 shadow-lg shadow-cyberpunk-accent/20"
                : "border-white/20 bg-cyberpunk-black/40 hover:border-cyberpunk-neon/50"
            }`}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-bold text-white mb-2">
                Component Mode
              </h3>
              <p className="text-white/70 text-sm">
                Build your bike component by component from scratch
              </p>
              <div className="mt-4 inline-flex items-center text-cyberpunk-accent text-sm">
                <svg
                  className="w-4 h-4 mr-2"
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
                Complete customization
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Configuration Progress */}
      <div className="bg-cyberpunk-black/40 backdrop-blur-lg rounded-xl border border-cyberpunk-red/20 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/80 text-sm font-medium">
            Configuration Progress
          </span>
          <span className="text-cyberpunk-neon text-sm font-bold">
            {getComponentCount()}/{getTotalComponents()} components
          </span>
        </div>
        <div className="w-full bg-cyberpunk-black/60 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-cyberpunk-neon to-cyberpunk-accent h-2 rounded-full transition-all duration-500"
            style={{
              width: `${(getComponentCount() / getTotalComponents()) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Main Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel - Selection */}
        <div className="lg:col-span-2 space-y-6">
          {buildMode === "bike" ? (
            <BikeModelSelector
              selectedModel={configuration.bike_model}
              onModelSelect={handleBikeModelSelect}
              onComponentChange={(
                category: ComponentCategory,
                component: Component | null
              ) => {
                handleComponentSelect(category, component);
              }}
              configuration={configuration}
            />
          ) : (
            <ComponentBuilder
              configuration={configuration}
              onComponentSelect={handleComponentSelect}
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          )}
        </div>

        {/* Right Panel - Summary & Analysis */}
        <div className="space-y-6">
          {/* Configuration Summary */}
          <div className="bg-cyberpunk-black/60 backdrop-blur-lg rounded-xl border border-cyberpunk-red/30 p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-cyberpunk-neon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Current Configuration
            </h3>

            {configuration.bike_model && (
              <div className="mb-4 p-3 bg-cyberpunk-neon/10 rounded-lg border border-cyberpunk-neon/30">
                <p className="text-cyberpunk-neon font-medium">
                  {configuration.bike_model.name}
                </p>
                <p className="text-white/60 text-sm">
                  {configuration.bike_model.brand} •{" "}
                  {configuration.bike_model.year}
                </p>
              </div>
            )}

            <div className="space-y-3">
              {categories.map(({ key, label, icon }) => {
                const component = configuration.components[key];
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between p-2 rounded-lg bg-cyberpunk-black/40"
                  >
                    <div className="flex items-center">
                      <span className="mr-2">{icon}</span>
                      <span className="text-white/80 text-sm">{label}</span>
                    </div>
                    {component ? (
                      <span className="text-cyberpunk-neon text-xs font-medium">
                        {component.brand} {component.model}
                      </span>
                    ) : (
                      <span className="text-white/40 text-xs">Non défini</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyzeCompatibility}
            disabled={getComponentCount() < 2 || isAnalyzing}
            className="w-full py-4 px-6 bg-gradient-to-r from-cyberpunk-neon to-cyberpunk-accent text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-cyberpunk-accent hover:to-cyberpunk-crimson transition-all duration-300 flex items-center justify-center"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Analyze Compatibility
              </>
            )}
          </button>

          {getComponentCount() < 2 && (
            <p className="text-white/60 text-sm text-center">
              Add at least 2 components to analyze compatibility
            </p>
          )}
        </div>
      </div>

      {/* Results */}
      {compatibilityResults.length > 0 && (
        <CompatibilityResults
          results={compatibilityResults}
          configuration={configuration}
          onConfigurationChange={handleComponentSelect}
        />
      )}
    </div>
  );
}
