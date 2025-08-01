"use client";

import { useState, useEffect } from "react";
import {
  BikeModel,
  BikeConfiguration,
  Component,
  ComponentCategory,
} from "@/types";
import { bikeModelsApi, componentsApi } from "@/lib/api";

interface BikeModelSelectorProps {
  selectedModel?: BikeModel;
  onModelSelect: (model: BikeModel) => void;
  onComponentChange: (
    category: ComponentCategory,
    component: Component | null
  ) => void;
  configuration: BikeConfiguration;
}

export function BikeModelSelector({
  selectedModel,
  onModelSelect,
  onComponentChange,
  configuration,
}: BikeModelSelectorProps) {
  const [bikeModels, setBikeModels] = useState<BikeModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<
    "road" | "mountain" | "gravel" | "hybrid"
  >("road");
  const [editingCategory, setEditingCategory] =
    useState<ComponentCategory | null>(null);
  const [availableComponents, setAvailableComponents] = useState<Component[]>(
    []
  );
  const [componentLoading, setComponentLoading] = useState(false);

  const bikeTypes = [
    {
      key: "road" as const,
      label: "Route",
      icon: "🚴",
      color: "cyberpunk-neon",
    },
    {
      key: "mountain" as const,
      label: "VTT",
      icon: "🚵",
      color: "cyberpunk-accent",
    },
    {
      key: "gravel" as const,
      label: "Gravel",
      icon: "🌄",
      color: "cyberpunk-crimson",
    },
    {
      key: "hybrid" as const,
      label: "Hybride",
      icon: "🚲",
      color: "purple-400",
    },
  ];

  const categories: { key: ComponentCategory; label: string; icon: string }[] =
    [
      { key: "bottom_bracket", label: "Boîtier de pédalier", icon: "⚙️" },
      {
        key: "cassette_derailleur",
        label: "Cassette & Dérailleur",
        icon: "🔧",
      },
      { key: "brake_system", label: "Système de freinage", icon: "🛑" },
      { key: "wheel_frame", label: "Roues & Cadre", icon: "🚴" },
      { key: "seatpost", label: "Tige de selle", icon: "💺" },
      { key: "fork", label: "Fourche", icon: "🔱" },
      { key: "handlebars", label: "Guidon", icon: "🎯" },
      { key: "crankset", label: "Pédalier", icon: "⚡" },
    ];

  useEffect(() => {
    loadBikeModels();
  }, [selectedType]);

  useEffect(() => {
    if (editingCategory) {
      loadComponents(editingCategory);
    }
  }, [editingCategory]);

  const loadBikeModels = async () => {
    setLoading(true);
    try {
      const response = await bikeModelsApi.getModels({ type: selectedType });
      if (response.status === 200) {
        setBikeModels(response.data);
      }
    } catch (error) {
      console.error("Error loading bike models:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadComponents = async (category: ComponentCategory) => {
    setComponentLoading(true);
    try {
      const response = await componentsApi.search({ category, limit: 20 });
      if (response.status === 200) {
        setAvailableComponents(response.data);
      }
    } catch (error) {
      console.error("Error loading components:", error);
    } finally {
      setComponentLoading(false);
    }
  };

  const handleComponentEdit = (category: ComponentCategory) => {
    setEditingCategory(category);
  };

  const handleComponentSelect = (component: Component) => {
    if (editingCategory) {
      onComponentChange(editingCategory, component);
      setEditingCategory(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Bike Type Selector */}
      <div className="bg-cyberpunk-black/60 backdrop-blur-lg rounded-xl border border-cyberpunk-red/30 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Type de vélo</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {bikeTypes.map(({ key, label, icon, color }) => (
            <button
              key={key}
              onClick={() => setSelectedType(key)}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                selectedType === key
                  ? `border-${color} bg-${color}/10 shadow-lg`
                  : "border-white/20 bg-cyberpunk-black/40 hover:border-white/40"
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">{icon}</div>
                <div
                  className={`text-sm font-medium ${
                    selectedType === key ? `text-${color}` : "text-white/80"
                  }`}
                >
                  {label}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bike Models */}
      <div className="bg-cyberpunk-black/60 backdrop-blur-lg rounded-xl border border-cyberpunk-red/30 p-6">
        <h3 className="text-xl font-bold text-white mb-4">
          Modèles disponibles
        </h3>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-cyberpunk-neon border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bikeModels.map((model) => (
              <button
                key={model.id}
                onClick={() => onModelSelect(model)}
                className={`p-4 rounded-lg border-2 text-left transition-all duration-300 ${
                  selectedModel?.id === model.id
                    ? "border-cyberpunk-neon bg-cyberpunk-neon/10 shadow-lg shadow-cyberpunk-neon/20"
                    : "border-white/20 bg-cyberpunk-black/40 hover:border-cyberpunk-accent/50"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyberpunk-red/20 to-cyberpunk-neon/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🚴</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white mb-1">{model.name}</h4>
                    <p className="text-white/60 text-sm mb-2">
                      {model.brand} • {model.year}
                    </p>
                    <p className="text-white/50 text-xs">{model.description}</p>
                    {model.price_range && (
                      <p className="text-cyberpunk-accent text-sm font-medium mt-2">
                        {model.price_range}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Component Modification */}
      {selectedModel && (
        <div className="bg-cyberpunk-black/60 backdrop-blur-lg rounded-xl border border-cyberpunk-red/30 p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            Modifier les composants - {selectedModel.name}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map(({ key, label, icon }) => {
              const component = configuration.components[key];
              return (
                <div
                  key={key}
                  className="p-4 bg-cyberpunk-black/40 rounded-lg border border-cyberpunk-red/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="mr-2">{icon}</span>
                      <span className="text-white font-medium text-sm">
                        {label}
                      </span>
                    </div>
                    <button
                      onClick={() => handleComponentEdit(key)}
                      className="text-cyberpunk-neon hover:text-cyberpunk-accent transition-colors"
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                  </div>

                  {component ? (
                    <div>
                      <p className="text-white text-sm font-medium">
                        {component.name}
                      </p>
                      <p className="text-white/60 text-xs">
                        {component.brand} {component.model}
                      </p>
                      {component.price_range && (
                        <p className="text-cyberpunk-accent text-xs mt-1">
                          {component.price_range}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-white/40 text-sm">
                      Composant non défini
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Component Selection Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-cyberpunk-black/90 backdrop-blur-lg rounded-xl border border-cyberpunk-red/30 p-6 max-w-4xl w-full max-h-[80vh] overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                Choisir un{" "}
                {categories.find((c) => c.key === editingCategory)?.label}
              </h3>
              <button
                onClick={() => setEditingCategory(null)}
                className="text-white/60 hover:text-white transition-colors"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {componentLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-cyberpunk-neon border-t-transparent"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableComponents.map((component) => (
                  <button
                    key={component.id}
                    onClick={() => handleComponentSelect(component)}
                    className="p-4 bg-cyberpunk-black/60 rounded-lg border border-cyberpunk-red/20 hover:border-cyberpunk-neon/50 transition-all duration-300 text-left"
                  >
                    <h4 className="font-bold text-white mb-2">
                      {component.name}
                    </h4>
                    <p className="text-white/60 text-sm mb-2">
                      {component.brand} {component.model}
                    </p>
                    <p className="text-white/50 text-xs mb-3">
                      {component.description}
                    </p>
                    {component.price_range && (
                      <p className="text-cyberpunk-accent text-sm font-medium">
                        {component.price_range}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
