"use client";

import dynamic from "next/dynamic";
import { ComponentType } from "react";

// Wrapper pour charger les composants 3D seulement côté client
const ClientOnly3D = <P extends object>(Component: ComponentType<P>) => {
  const DynamicComponent = dynamic(() => Promise.resolve(Component), {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64 bg-gray-800 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-2"></div>
          <p className="text-gray-400">Chargement du modèle 3D...</p>
        </div>
      </div>
    ),
  });

  return DynamicComponent;
};

export default ClientOnly3D;
