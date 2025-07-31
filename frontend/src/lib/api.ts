// API Mock pour le développement frontend
import {
  Component,
  CompatibilityResult,
  ApiResponse,
  ComponentCategory,
} from "@/types";

// Mock data pour le développement
const mockComponents: Component[] = [
  {
    id: "1",
    name: "BB86 Bottom Bracket",
    brand: "Shimano",
    model: "Ultegra",
    category: "bottom_bracket",
    description: "Boîtier de pédalier haute performance pour vélo de route",
    price_range: "50-80€",
  },
  {
    id: "2",
    name: "11-Speed Cassette",
    brand: "SRAM",
    model: "Force",
    category: "cassette_derailleur",
    description: "Cassette 11 vitesses pour transmission précise",
    price_range: "120-180€",
  },
  {
    id: "3",
    name: "Hydraulic Disc Brake",
    brand: "Shimano",
    model: "105",
    category: "brake_system",
    description: "Freins à disque hydrauliques pour un freinage optimal",
    price_range: "200-300€",
  },
  {
    id: "4",
    name: "Carbon Wheelset",
    brand: "Mavic",
    model: "Cosmic Pro",
    category: "wheel_frame",
    description: "Roues carbone légères et aérodynamiques",
    price_range: "800-1200€",
  },
  {
    id: "5",
    name: "Carbon Seatpost",
    brand: "Fizik",
    model: "Cyrano R1",
    category: "seatpost",
    description: "Tige de selle carbone pour confort et performance",
    price_range: "150-250€",
  },
];

const mockCompatibilityResults: CompatibilityResult[] = [
  {
    status: "compatible",
    confidence: 0.95,
    explanation:
      "Ces composants sont parfaitement compatibles et optimisés pour les performances.",
    processing_time_ms: 150,
  },
  {
    status: "conditional",
    confidence: 0.75,
    explanation: "Compatibilité possible avec un adaptateur spécifique.",
    required_adapters: [mockComponents[0]],
    processing_time_ms: 200,
  },
  {
    status: "incompatible",
    confidence: 0.9,
    explanation:
      "Ces composants ne sont pas compatibles en raison de différences de spécifications.",
    alternative_suggestions: [mockComponents[1]],
    processing_time_ms: 120,
  },
];

// Simulation d'API avec délai
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const componentsApi = {
  async search(params: {
    category?: ComponentCategory;
    search?: string;
    limit?: number;
  }): Promise<ApiResponse<Component[]>> {
    await delay(500); // Simule la latence réseau

    let filteredComponents = mockComponents;

    if (params.category) {
      filteredComponents = filteredComponents.filter(
        (c) => c.category === params.category
      );
    }

    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredComponents = filteredComponents.filter(
        (c) =>
          c.name.toLowerCase().includes(searchLower) ||
          c.brand.toLowerCase().includes(searchLower) ||
          c.model?.toLowerCase().includes(searchLower)
      );
    }

    if (params.limit) {
      filteredComponents = filteredComponents.slice(0, params.limit);
    }

    return {
      data: filteredComponents,
      status: 200,
      message: "Success",
    };
  },
};

export const compatibilityApi = {
  async checkCompatibility(
    componentAId: string,
    componentBId: string
  ): Promise<ApiResponse<CompatibilityResult>> {
    await delay(800); // Simule l'analyse

    // Retourne un résultat aléatoire pour la démo
    const randomResult =
      mockCompatibilityResults[
        Math.floor(Math.random() * mockCompatibilityResults.length)
      ];

    return {
      data: randomResult,
      status: 200,
      message: "Compatibility check completed",
    };
  },
};
