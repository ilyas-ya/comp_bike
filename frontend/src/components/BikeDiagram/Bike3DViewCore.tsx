"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Box, Cylinder, Torus } from "@react-three/drei";
import * as THREE from "three";

// Composant pour un vélo 3D basique mais réaliste
function Bike3DModel({ selectedComponents }: { selectedComponents: any[] }) {
  const bikeRef = useRef<THREE.Group>(null);

  // Animation de rotation douce
  useFrame((state, delta) => {
    if (bikeRef.current) {
      bikeRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={bikeRef} position={[0, 0, 0]}>
      {/* Cadre principal */}
      <group>
        {/* Tube supérieur */}
        <Box
          position={[0, 1, 0]}
          args={[3, 0.1, 0.1]}
          material={new THREE.MeshPhongMaterial({ color: "#2a2a2a" })}
        />

        {/* Tube diagonal */}
        <Box
          position={[-0.5, 0, 0]}
          args={[2, 0.1, 0.1]}
          rotation={[0, 0, -0.6]}
          material={new THREE.MeshPhongMaterial({ color: "#2a2a2a" })}
        />

        {/* Tube de selle */}
        <Box
          position={[1.2, 0.5, 0]}
          args={[0.1, 1, 0.1]}
          material={new THREE.MeshPhongMaterial({ color: "#2a2a2a" })}
        />

        {/* Bases arrière */}
        <Box
          position={[0.6, -0.8, 0]}
          args={[2.4, 0.1, 0.1]}
          material={new THREE.MeshPhongMaterial({ color: "#2a2a2a" })}
        />

        {/* Haubans */}
        <Box
          position={[0.6, 0.2, 0]}
          args={[2.4, 0.1, 0.1]}
          rotation={[0, 0, -0.3]}
          material={new THREE.MeshPhongMaterial({ color: "#2a2a2a" })}
        />

        {/* Fourche */}
        <Box
          position={[-1.8, 0, 0]}
          args={[0.1, 1.5, 0.1]}
          rotation={[0, 0, 0.3]}
          material={new THREE.MeshPhongMaterial({ color: "#2a2a2a" })}
        />
      </group>

      {/* Roues */}
      <group>
        {/* Roue avant */}
        <Torus
          position={[-2.5, -1, 0]}
          args={[0.8, 0.1, 16, 100]}
          material={new THREE.MeshPhongMaterial({ color: "#1a1a1a" })}
        />

        {/* Jante avant */}
        <Torus
          position={[-2.5, -1, 0]}
          args={[0.6, 0.05, 16, 100]}
          material={new THREE.MeshPhongMaterial({ color: "#c0c0c0" })}
        />

        {/* Moyeu avant */}
        <Cylinder
          position={[-2.5, -1, 0]}
          args={[0.1, 0.1, 0.2, 16]}
          rotation={[Math.PI / 2, 0, 0]}
          material={new THREE.MeshPhongMaterial({ color: "#dc2626" })}
        />

        {/* Roue arrière */}
        <Torus
          position={[2, -1, 0]}
          args={[0.8, 0.1, 16, 100]}
          material={new THREE.MeshPhongMaterial({ color: "#1a1a1a" })}
        />

        {/* Jante arrière */}
        <Torus
          position={[2, -1, 0]}
          args={[0.6, 0.05, 16, 100]}
          material={new THREE.MeshPhongMaterial({ color: "#c0c0c0" })}
        />

        {/* Moyeu arrière */}
        <Cylinder
          position={[2, -1, 0]}
          args={[0.1, 0.1, 0.2, 16]}
          rotation={[Math.PI / 2, 0, 0]}
          material={new THREE.MeshPhongMaterial({ color: "#dc2626" })}
        />
      </group>

      {/* Composants */}
      <group>
        {/* Selle */}
        <Box
          position={[1.2, 1.4, 0]}
          args={[0.6, 0.2, 0.3]}
          material={new THREE.MeshPhongMaterial({ color: "#1a1a1a" })}
        />

        {/* Guidon */}
        <Box
          position={[-2, 1.2, 0]}
          args={[0.8, 0.05, 0.05]}
          material={new THREE.MeshPhongMaterial({ color: "#1a1a1a" })}
        />

        {/* Pédales */}
        <Box
          position={[0, -0.8, 0.2]}
          args={[0.3, 0.1, 0.05]}
          material={new THREE.MeshPhongMaterial({ color: "#1a1a1a" })}
        />
        <Box
          position={[0, -0.8, -0.2]}
          args={[0.3, 0.1, 0.05]}
          material={new THREE.MeshPhongMaterial({ color: "#1a1a1a" })}
        />

        {/* Plateau */}
        <Torus
          position={[0, -0.8, 0]}
          args={[0.4, 0.02, 16, 100]}
          material={new THREE.MeshPhongMaterial({ color: "#444" })}
        />
      </group>

      {/* Zones interactives en 3D */}
      {selectedComponents.map((comp, index) => (
        <group key={comp.area.id}>
          {/* Indicateur de sélection 3D */}
          <Torus
            position={getComponentPosition3D(comp.area.id)}
            args={[0.3, 0.05, 8, 16]}
            material={
              new THREE.MeshPhongMaterial({
                color: "#ff0040",
                transparent: true,
                opacity: 0.8,
              })
            }
          />

          {/* Texte informatif */}
          <Text
            position={[
              getComponentPosition3D(comp.area.id)[0],
              getComponentPosition3D(comp.area.id)[1] + 0.5,
              getComponentPosition3D(comp.area.id)[2],
            ]}
            fontSize={0.2}
            color="#ff0040"
            anchorX="center"
            anchorY="middle"
          >
            {comp.area.name}
          </Text>
        </group>
      ))}
    </group>
  );
}

// Fonction pour obtenir la position 3D des composants
function getComponentPosition3D(componentId: string): [number, number, number] {
  const positions: Record<string, [number, number, number]> = {
    "bottom-bracket": [0, -0.8, 0],
    "cassette-derailleur": [2, -0.5, 0],
    "brake-system": [-2, 0.5, 0],
    "wheel-frame": [-2.5, -1, 0],
    seatpost: [1.2, 1, 0],
  };

  return positions[componentId] || [0, 0, 0];
}

interface Bike3DViewProps {
  selectedComponents: any[];
  onComponentClick: (area: any) => void;
}

export function Bike3DView({
  selectedComponents,
  onComponentClick,
}: Bike3DViewProps) {
  const [isRotating, setIsRotating] = useState(true);

  return (
    <div className="w-full h-96 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden relative">
      {/* Contrôles */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className="px-3 py-1 bg-red-600/80 text-white text-sm rounded-lg hover:bg-red-600 transition-colors backdrop-blur-sm"
        >
          {isRotating ? "⏸️ Pause" : "▶️ Rotate"}
        </button>

        <div className="px-3 py-1 bg-black/60 text-white text-sm rounded-lg backdrop-blur-sm">
          🖱️ Drag to rotate • 🖲️ Scroll to zoom
        </div>
      </div>

      {/* Badge 3D */}
      <div className="absolute top-4 right-4 z-10">
        <div className="px-3 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold rounded-lg shadow-lg">
          🚀 3D VIEW
        </div>
      </div>

      {/* Canvas 3D */}
      <Canvas
        camera={{ position: [5, 2, 5], fov: 50 }}
        style={{ background: "transparent" }}
      >
        {/* Éclairage */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />

        {/* Contrôles de caméra */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={isRotating}
          autoRotateSpeed={2}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 6}
          maxDistance={15}
          minDistance={3}
        />

        {/* Modèle 3D du vélo */}
        <Bike3DModel selectedComponents={selectedComponents} />

        {/* Plan de sol pour le contexte */}
        <mesh
          position={[0, -2, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[20, 20]} />
          <meshPhongMaterial color="#1a1a1a" transparent opacity={0.3} />
        </mesh>
      </Canvas>
    </div>
  );
}

export default Bike3DView;
