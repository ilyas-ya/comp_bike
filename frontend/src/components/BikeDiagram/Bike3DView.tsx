"use client";

import React from "react";
import dynamic from "next/dynamic";
import { BikeComponentArea } from "@/types";

// Import dynamique des composants Three.js pour éviter les problèmes SSR
const Bike3DViewCore = dynamic(() => import("./Bike3DViewCore"), {
  ssr: false,
  loading: () => (
    <div className="h-64 sm:h-80 lg:h-96 xl:h-[400px] w-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-slate-700 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-2"></div>
        <p className="text-gray-400 text-sm">Chargement du modèle 3D...</p>
      </div>
    </div>
  ),
});

interface Bike3DViewProps {
  selectedComponents: any[];
  onComponentClick: (area: BikeComponentArea) => void;
}

export default function Bike3DView({
  selectedComponents,
  onComponentClick,
}: Bike3DViewProps) {
  return (
    <div className="h-64 sm:h-80 lg:h-96 xl:h-[400px] w-full">
      <Bike3DViewCore
        selectedComponents={selectedComponents}
        onComponentClick={onComponentClick}
      />
    </div>
  );
}
