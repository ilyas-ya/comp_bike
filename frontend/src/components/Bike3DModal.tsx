"use client";

import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
import { Group, Vector3 } from "three";
import { BikeConfiguration, Component, ComponentCategory } from "@/types";
import { componentsApi } from "@/lib/api";

interface Bike3DModalProps {
  isOpen: boolean;
  onClose: () => void;
  configuration: BikeConfiguration;
  onComponentChange: (
    category: ComponentCategory,
    component: Component | null
  ) => void;
}

// Component for each bike part
interface BikePartProps {
  position: [number, number, number];
  category: ComponentCategory;
  label: string;
  isSelected: boolean;
  onClick: () => void;
  component?: Component | null;
}

function BikePart({
  position,
  category,
  label,
  isSelected,
  onClick,
  component,
}: BikePartProps) {
  const meshRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      if (hovered || isSelected) {
        meshRef.current.scale.lerp(new Vector3(1.1, 1.1, 1.1), 0.1);
      } else {
        meshRef.current.scale.lerp(new Vector3(1, 1, 1), 0.1);
      }
    }
  });

  const getColor = () => {
    if (isSelected) return "#ff0040"; // cyberpunk-neon
    if (hovered) return "#ff1744"; // cyberpunk-accent
    if (component) return "#00ff88"; // green if component selected
    return "#888888"; // default gray
  };

  const getGeometry = () => {
    switch (category) {
      case "bottom_bracket":
        return <cylinderGeometry args={[0.15, 0.15, 0.2, 8]} />;
      case "cassette_derailleur":
        return <cylinderGeometry args={[0.25, 0.25, 0.1, 12]} />;
      case "brake_system":
        return <boxGeometry args={[0.2, 0.1, 0.3]} />;
      case "wheel_frame":
        return <torusGeometry args={[0.4, 0.05, 16, 32]} />;
      case "seatpost":
        return <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />;
      case "fork":
        return <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />;
      case "handlebars":
        return <boxGeometry args={[0.8, 0.05, 0.05]} />;
      case "crankset":
        return <cylinderGeometry args={[0.2, 0.2, 0.05, 6]} />;
      default:
        return <boxGeometry args={[0.2, 0.2, 0.2]} />;
    }
  };

  return (
    <group
      ref={meshRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh>
        {getGeometry()}
        <meshStandardMaterial
          color={getColor()}
          metalness={0.7}
          roughness={0.3}
          emissive={isSelected ? "#ff0040" : "#000000"}
          emissiveIntensity={isSelected ? 0.2 : 0}
        />
      </mesh>

      {/* Label */}
      {(hovered || isSelected) && (
        <Html distanceFactor={10}>
          <div className="bg-cyberpunk-black/90 backdrop-blur-sm border border-cyberpunk-red/30 rounded-lg p-2 pointer-events-none">
            <div className="text-white text-sm font-medium">{label}</div>
            {component && (
              <div className="text-cyberpunk-neon text-xs">
                {component.brand} {component.model}
              </div>
            )}
            {!component && (
              <div className="text-white/60 text-xs">Click to modify</div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

// Main bike frame
function BikeFrame() {
  return (
    <group>
      {/* Tube principal */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Seat tube */}
      <mesh position={[0.3, 0.2, 0]} rotation={[0, 0, Math.PI / 3]}>
        <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Head tube */}
      <mesh position={[-0.4, 0.1, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 8]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Rear base */}
      <mesh position={[0.6, -0.3, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Bike3DScene({
  configuration,
  onComponentChange,
  selectedCategory,
  onCategorySelect,
}: {
  configuration: BikeConfiguration;
  onComponentChange: (
    category: ComponentCategory,
    component: Component | null
  ) => void;
  selectedCategory: ComponentCategory | null;
  onCategorySelect: (category: ComponentCategory | null) => void;
}) {
  const bikeComponents = [
    {
      category: "bottom_bracket" as ComponentCategory,
      label: "Bottom Bracket",
      position: [0, -0.2, 0] as [number, number, number],
    },
    {
      category: "wheel_frame" as ComponentCategory,
      label: "Front Wheel",
      position: [-0.7, -0.4, 0] as [number, number, number],
    },
    {
      category: "wheel_frame" as ComponentCategory,
      label: "Rear Wheel",
      position: [0.8, -0.4, 0] as [number, number, number],
    },
    {
      category: "cassette_derailleur" as ComponentCategory,
      label: "Cassette",
      position: [0.8, -0.2, 0.3] as [number, number, number],
    },
    {
      category: "brake_system" as ComponentCategory,
      label: "Front Brake",
      position: [-0.7, -0.2, 0] as [number, number, number],
    },
    {
      category: "seatpost" as ComponentCategory,
      label: "Seatpost",
      position: [0.5, 0.4, 0] as [number, number, number],
    },
    {
      category: "fork" as ComponentCategory,
      label: "Fork",
      position: [-0.6, 0.2, 0] as [number, number, number],
    },
    {
      category: "handlebars" as ComponentCategory,
      label: "Handlebars",
      position: [-0.7, 0.5, 0] as [number, number, number],
    },
    {
      category: "crankset" as ComponentCategory,
      label: "Crankset",
      position: [0, -0.4, 0] as [number, number, number],
    },
  ];

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />

      <BikeFrame />

      {bikeComponents.map((part, index) => (
        <BikePart
          key={`${part.category}-${index}`}
          position={part.position}
          category={part.category}
          label={part.label}
          isSelected={selectedCategory === part.category}
          onClick={() => onCategorySelect(part.category)}
          component={configuration.components[part.category]}
        />
      ))}

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxDistance={5}
        minDistance={1}
      />
    </>
  );
}

export function Bike3DModal({
  isOpen,
  onClose,
  configuration,
  onComponentChange,
}: Bike3DModalProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<ComponentCategory | null>(null);
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

  const handleComponentSelect = (component: Component) => {
    if (selectedCategory) {
      onComponentChange(selectedCategory, component);
      setSelectedCategory(null);
    }
  };

  const handleCategorySelect = (category: ComponentCategory | null) => {
    setSelectedCategory(category);
    setSearchQuery("");
  };

  const getCategoryLabel = (category: ComponentCategory) => {
    const labels = {
      bottom_bracket: "Bottom Bracket",
      cassette_derailleur: "Cassette & Derailleur",
      brake_system: "Brake System",
      wheel_frame: "Wheels & Frame",
      seatpost: "Seatpost",
      fork: "Fork",
      handlebars: "Handlebars",
      crankset: "Crankset",
    };
    return labels[category] || category;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-cyberpunk-black/95 backdrop-blur-lg rounded-2xl border border-cyberpunk-red/30 w-full max-w-7xl h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-cyberpunk-red/30">
          <div>
            <h2 className="text-2xl font-bold text-white">3D Configurator</h2>
            <p className="text-white/60 text-sm">
              Click on a bike component to modify it
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-white/80 text-sm">Current Configuration</div>
              <div className="text-cyberpunk-neon text-sm font-medium">
                {Object.values(configuration.components).filter(Boolean).length}{" "}
                / 8 components
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors p-2"
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
        </div>

        <div className="flex h-full">
          {/* 3D Viewer */}
          <div className="flex-1 relative">
            <Canvas
              camera={{ position: [2, 1, 2], fov: 75 }}
              style={{
                background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
              }}
            >
              <Bike3DScene
                configuration={configuration}
                onComponentChange={onComponentChange}
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
              />
            </Canvas>

            {/* Instructions overlay */}
            <div className="absolute top-4 left-4 bg-cyberpunk-black/80 backdrop-blur-sm rounded-lg border border-cyberpunk-red/30 p-4 max-w-sm">
              <h3 className="text-white font-bold mb-2">🖱️ Controls</h3>
              <div className="text-white/70 text-sm space-y-1">
                <div>
                  • <span className="text-cyberpunk-neon">Left click</span>:
                  Select a component
                </div>
                <div>
                  • <span className="text-cyberpunk-accent">Mouse wheel</span>:
                  Zoom
                </div>
                <div>
                  • <span className="text-cyberpunk-crimson">Drag</span>: Rotate
                  view
                </div>
              </div>
            </div>

            {/* Status indicator */}
            {selectedCategory && (
              <div className="absolute bottom-4 left-4 bg-cyberpunk-neon/20 backdrop-blur-sm rounded-lg border border-cyberpunk-neon/30 p-3">
                <div className="text-cyberpunk-neon font-medium">
                  {getCategoryLabel(selectedCategory)} selected
                </div>
                <div className="text-white/70 text-sm">
                  Choose a component from the right panel
                </div>
              </div>
            )}
          </div>

          {/* Selection Panel */}
          <div className="w-96 border-l border-cyberpunk-red/30 bg-cyberpunk-black/60 flex flex-col">
            {selectedCategory ? (
              // Component selection
              <div className="flex-1 flex flex-col">
                <div className="p-6 border-b border-cyberpunk-red/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">
                      {getCategoryLabel(selectedCategory)}
                    </h3>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="text-white/60 hover:text-white transition-colors"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Search */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-4 py-2 bg-cyberpunk-black/60 border border-cyberpunk-red/30 rounded-lg text-white placeholder-white/50 text-sm focus:outline-none focus:border-cyberpunk-neon transition-colors"
                    />
                    <svg
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50"
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

                {/* Current component */}
                {configuration.components[selectedCategory] && (
                  <div className="p-4 border-b border-cyberpunk-red/20 bg-cyberpunk-accent/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">
                          {configuration.components[selectedCategory]!.name}
                        </div>
                        <div className="text-white/60 text-sm">
                          {configuration.components[selectedCategory]!.brand}{" "}
                          {configuration.components[selectedCategory]!.model}
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          onComponentChange(selectedCategory, null)
                        }
                        className="text-red-400 hover:text-red-300 transition-colors"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* Components list */}
                <div className="flex-1 overflow-auto p-4">
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-cyberpunk-neon border-t-transparent"></div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {availableComponents.map((component) => {
                        const isSelected =
                          configuration.components[selectedCategory]?.id ===
                          component.id;

                        return (
                          <button
                            key={component.id}
                            onClick={() => handleComponentSelect(component)}
                            disabled={isSelected}
                            className={`w-full p-3 rounded-lg border text-left transition-all duration-300 ${
                              isSelected
                                ? "border-cyberpunk-accent bg-cyberpunk-accent/20 cursor-default"
                                : "border-cyberpunk-red/20 bg-cyberpunk-black/40 hover:border-cyberpunk-neon/50"
                            }`}
                          >
                            <div className="flex items-start justify-between mb-1">
                              <div className="font-medium text-white text-sm">
                                {component.name}
                              </div>
                              {isSelected && (
                                <svg
                                  className="w-4 h-4 text-cyberpunk-accent flex-shrink-0"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              )}
                            </div>

                            <div className="text-white/60 text-xs mb-2">
                              {component.brand} {component.model}
                            </div>

                            {component.price_range && (
                              <div className="text-cyberpunk-accent text-xs font-medium">
                                {component.price_range}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Instructions
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="text-center">
                  <div className="text-6xl mb-4">🚴‍♂️</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Select a component
                  </h3>
                  <p className="text-white/60 text-sm">
                    Click on any part of the bike to start customizing your
                    configuration
                  </p>

                  <div className="mt-6 p-4 bg-cyberpunk-red/10 rounded-lg border border-cyberpunk-red/30">
                    <div className="text-cyberpunk-neon text-sm font-medium mb-2">
                      💡 Tip
                    </div>
                    <div className="text-white/70 text-xs">
                      Components in green are already configured. Click on them
                      to modify or replace.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
