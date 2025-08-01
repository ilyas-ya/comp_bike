"use client";

import { useState, useEffect } from "react";
import { BikeConfiguration, Component, ComponentCategory } from "@/types";
import { componentsApi } from "@/lib/api";

interface ComponentBuilderProps {
  configuration: BikeConfiguration;
  onComponentSelect: (
    category: ComponentCategory,
    component: Component | null
  ) => void;
  categories: { key: ComponentCategory; label: string; icon: string }[];
  selectedCategory: ComponentCategory | null;
  onCategorySelect: (category: ComponentCategory | null) => void;
}

export function ComponentBuilder({
  configuration,
  onComponentSelect,
  categories,
  selectedCategory,
  onCategorySelect,
}: ComponentBuilderProps) {
  const [availableComponents, setAvailableComponents] = useState<Component[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (selectedCategory) {
      loadComponents(selectedCategory);
    }
  }, [selectedCategory, searchQuery]);

  const loadComponents = async (category: ComponentCategory) => {
    setLoading(true);
    try {
      const response = await componentsApi.search({
        category,
        search: searchQuery || undefined,
        limit: 20,
      });
      if (response.status === 200) {
        setAvailableComponents(response.data);
      }
    } catch (error) {
      console.error("Error loading components:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category: ComponentCategory) => {
    if (selectedCategory === category) {
      onCategorySelect(null);
    } else {
      onCategorySelect(category);
      setSearchQuery("");
    }
  };

  const handleComponentSelect = (component: Component) => {
    if (selectedCategory) {
      onComponentSelect(selectedCategory, component);
    }
  };

  const handleRemoveComponent = (category: ComponentCategory) => {
    onComponentSelect(category, null);
  };

  return (
    <div className="space-y-6">
      {/* Category Grid */}
      <div className="bg-cyberpunk-black/60 backdrop-blur-lg rounded-xl border border-cyberpunk-red/30 p-6">
        <h3 className="text-xl font-bold text-white mb-6">
          Choisissez une catégorie de composant
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(({ key, label, icon }) => {
            const component = configuration.components[key];
            const isSelected = selectedCategory === key;
            const hasComponent = !!component;

            return (
              <button
                key={key}
                onClick={() => handleCategoryClick(key)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 relative ${
                  isSelected
                    ? "border-cyberpunk-neon bg-cyberpunk-neon/10 shadow-lg shadow-cyberpunk-neon/20"
                    : hasComponent
                    ? "border-cyberpunk-accent bg-cyberpunk-accent/10"
                    : "border-white/20 bg-cyberpunk-black/40 hover:border-cyberpunk-red/50"
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{icon}</div>
                  <div
                    className={`text-sm font-medium mb-1 ${
                      isSelected
                        ? "text-cyberpunk-neon"
                        : hasComponent
                        ? "text-cyberpunk-accent"
                        : "text-white/80"
                    }`}
                  >
                    {label}
                  </div>

                  {hasComponent && (
                    <div className="text-xs text-white/60 mt-2">
                      <div className="truncate">{component.brand}</div>
                      <div className="truncate font-medium">
                        {component.model}
                      </div>
                    </div>
                  )}
                </div>

                {/* Status indicator */}
                <div
                  className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center ${
                    hasComponent ? "bg-cyberpunk-accent" : "bg-white/20"
                  }`}
                >
                  {hasComponent ? (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <span className="text-white/60 text-xs">+</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Component Selection Panel */}
      {selectedCategory && (
        <div className="bg-cyberpunk-black/60 backdrop-blur-lg rounded-xl border border-cyberpunk-red/30 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">
              {categories.find((c) => c.key === selectedCategory)?.label}
            </h3>
            <button
              onClick={() => onCategorySelect(null)}
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

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un composant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-cyberpunk-black/60 border border-cyberpunk-red/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyberpunk-neon transition-colors"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50"
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
            </div>
          </div>

          {/* Current Component */}
          {configuration.components[selectedCategory] && (
            <div className="mb-6 p-4 bg-cyberpunk-accent/10 rounded-lg border border-cyberpunk-accent/30">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white mb-1">
                    {configuration.components[selectedCategory]!.name}
                  </h4>
                  <p className="text-white/60 text-sm">
                    {configuration.components[selectedCategory]!.brand}{" "}
                    {configuration.components[selectedCategory]!.model}
                  </p>
                  {configuration.components[selectedCategory]!.price_range && (
                    <p className="text-cyberpunk-accent text-sm mt-1">
                      {configuration.components[selectedCategory]!.price_range}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveComponent(selectedCategory)}
                  className="text-white/60 hover:text-red-400 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Available Components */}
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-cyberpunk-neon border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableComponents.map((component) => {
                const isCurrentlySelected =
                  configuration.components[selectedCategory]?.id ===
                  component.id;

                return (
                  <button
                    key={component.id}
                    onClick={() => handleComponentSelect(component)}
                    disabled={isCurrentlySelected}
                    className={`p-4 rounded-lg border-2 text-left transition-all duration-300 ${
                      isCurrentlySelected
                        ? "border-cyberpunk-accent bg-cyberpunk-accent/20 cursor-default"
                        : "border-cyberpunk-red/20 bg-cyberpunk-black/40 hover:border-cyberpunk-neon/50 hover:bg-cyberpunk-neon/5"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-white">{component.name}</h4>
                      {isCurrentlySelected && (
                        <svg
                          className="w-5 h-5 text-cyberpunk-accent flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>

                    <p className="text-white/60 text-sm mb-2">
                      {component.brand} {component.model}
                    </p>

                    {component.description && (
                      <p className="text-white/50 text-xs mb-3 line-clamp-2">
                        {component.description}
                      </p>
                    )}

                    {component.price_range && (
                      <p className="text-cyberpunk-accent text-sm font-medium">
                        {component.price_range}
                      </p>
                    )}

                    {/* Specifications */}
                    {component.specifications &&
                      Object.keys(component.specifications).length > 0 && (
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(component.specifications)
                              .slice(0, 3)
                              .map(([key, value]) => (
                                <span
                                  key={key}
                                  className="px-2 py-1 bg-white/10 rounded text-xs text-white/70"
                                >
                                  {value}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}
                  </button>
                );
              })}
            </div>
          )}

          {availableComponents.length === 0 && !loading && (
            <div className="text-center py-8">
              <p className="text-white/60">Aucun composant trouvé</p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-cyberpunk-neon hover:text-cyberpunk-accent transition-colors mt-2"
                >
                  Effacer la recherche
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
