// Mock API for frontend development
import {
  Component,
  CompatibilityResult,
  ApiResponse,
  ComponentCategory,
  BikeModel,
  BikeConfiguration,
} from "@/types";

// Mock data for complete bike models
const mockBikeModels: BikeModel[] = [
  {
    id: "specialized-tarmac-sl7",
    name: "Specialized Tarmac SL7",
    brand: "Specialized",
    type: "road",
    year: 2024,
    image: "/bikes/tarmac-sl7.jpg",
    description: "High-performance carbon road bike",
    price_range: "3000-8000€",
    default_components: {
      bottom_bracket: "bb1",
      cassette_derailleur: "cas1",
      brake_system: "brake1",
      wheel_frame: "wheel1",
      seatpost: "seat1",
      fork: "fork1",
      handlebars: "handle1",
      crankset: "crank1",
    },
  },
  {
    id: "trek-emonda-slr",
    name: "Trek Émonda SLR",
    brand: "Trek",
    type: "road",
    year: 2024,
    image: "/bikes/emonda-slr.jpg",
    description: "Ultra-light road bike for climbing",
    price_range: "4000-10000€",
    default_components: {
      bottom_bracket: "bb2",
      cassette_derailleur: "cas2",
      brake_system: "brake2",
      wheel_frame: "wheel2",
      seatpost: "seat2",
      fork: "fork2",
      handlebars: "handle2",
      crankset: "crank2",
    },
  },
  {
    id: "canyon-aeroad-cf",
    name: "Canyon Aeroad CF",
    brand: "Canyon",
    type: "road",
    year: 2024,
    image: "/bikes/aeroad-cf.jpg",
    description: "Aerodynamic bike for speed",
    price_range: "2500-7500€",
    default_components: {
      bottom_bracket: "bb3",
      cassette_derailleur: "cas1",
      brake_system: "brake3",
      wheel_frame: "wheel3",
      seatpost: "seat3",
      fork: "fork3",
      handlebars: "handle3",
      crankset: "crank3",
    },
  },
  {
    id: "scott-spark-rc",
    name: "Scott Spark RC",
    brand: "Scott",
    type: "mountain",
    year: 2024,
    image: "/bikes/spark-rc.jpg",
    description: "High-performance full-suspension XC MTB",
    price_range: "3500-9000€",
    default_components: {
      bottom_bracket: "bb4",
      cassette_derailleur: "cas3",
      brake_system: "brake4",
      wheel_frame: "wheel4",
      seatpost: "seat4",
      fork: "fork4",
      handlebars: "handle4",
      crankset: "crank4",
    },
  },
];

// Mock data for development - extended components
const mockComponents: Component[] = [
  // Bottom Brackets
  {
    id: "bb1",
    name: "BB86 Bottom Bracket",
    brand: "Shimano",
    model: "Ultegra",
    category: "bottom_bracket",
    description: "High-performance bottom bracket for road bikes",
    price_range: "50-80€",
    specifications: {
      standard: "BB86",
      threading: "Press-fit",
      material: "Aluminum",
    },
  },
  {
    id: "bb2",
    name: "BB90 Bottom Bracket",
    brand: "Trek",
    model: "Domane",
    category: "bottom_bracket",
    description: "Trek integrated bottom bracket",
    price_range: "40-70€",
    specifications: {
      standard: "BB90",
      threading: "Press-fit",
      material: "Composite",
    },
  },
  {
    id: "bb3",
    name: "BSA 68mm Bottom Bracket",
    brand: "SRAM",
    model: "DUB",
    category: "bottom_bracket",
    description: "Standard threaded bottom bracket",
    price_range: "60-90€",
    specifications: {
      standard: "BSA",
      threading: "Threaded",
      material: "Steel",
    },
  },
  {
    id: "bb4",
    name: "BB92 Bottom Bracket",
    brand: "Scott",
    model: "TwinLoc",
    category: "bottom_bracket",
    description: "MTB press-fit bottom bracket",
    price_range: "55-85€",
    specifications: {
      standard: "BB92",
      threading: "Press-fit",
      material: "Aluminum",
    },
  },

  // Cassettes & Derailleurs
  {
    id: "cas1",
    name: "11-Speed Cassette",
    brand: "Shimano",
    model: "Ultegra R8000",
    category: "cassette_derailleur",
    description: "11-speed cassette for precise shifting",
    price_range: "120-180€",
    specifications: {
      speeds: 11,
      range: "11-28T",
      compatibility: "Shimano HG",
    },
  },
  {
    id: "cas2",
    name: "12-Speed Cassette",
    brand: "SRAM",
    model: "Force AXS",
    category: "cassette_derailleur",
    description: "Electronic 12-speed cassette",
    price_range: "200-350€",
    specifications: { speeds: 12, range: "10-33T", compatibility: "SRAM XDR" },
  },
  {
    id: "cas3",
    name: "12-Speed MTB Cassette",
    brand: "SRAM",
    model: "Eagle GX",
    category: "cassette_derailleur",
    description: "MTB 12-speed wide-range cassette",
    price_range: "150-250€",
    specifications: { speeds: 12, range: "10-52T", compatibility: "SRAM XD" },
  },

  // Brakes
  {
    id: "brake1",
    name: "Hydraulic Disc Brake",
    brand: "Shimano",
    model: "Ultegra R8070",
    category: "brake_system",
    description: "Hydraulic disc brakes for optimal braking",
    price_range: "200-300€",
    specifications: {
      type: "Hydraulic Disc",
      rotor_size: "160mm",
      material: "Carbon/Aluminum",
    },
  },
  {
    id: "brake2",
    name: "Rim Brake Caliper",
    brand: "Shimano",
    model: "Dura-Ace R9100",
    category: "brake_system",
    description: "High-performance rim brake calipers",
    price_range: "150-250€",
    specifications: {
      type: "Rim Brake",
      reach: "47-57mm",
      material: "Aluminum",
    },
  },
  {
    id: "brake3",
    name: "Flat Mount Disc Brake",
    brand: "SRAM",
    model: "Force AXS",
    category: "brake_system",
    description: "Aerodynamic flat mount disc brakes",
    price_range: "250-400€",
    specifications: {
      type: "Hydraulic Disc",
      rotor_size: "160mm",
      mount: "Flat Mount",
    },
  },
  {
    id: "brake4",
    name: "MTB Disc Brake",
    brand: "SRAM",
    model: "Guide RSC",
    category: "brake_system",
    description: "High-power 4-piston MTB brakes",
    price_range: "180-280€",
    specifications: { type: "Hydraulic Disc", rotor_size: "180mm", pistons: 4 },
  },

  // Wheels & Frames
  {
    id: "wheel1",
    name: "Carbon Wheelset",
    brand: "Specialized",
    model: "Roval CLX 50",
    category: "wheel_frame",
    description: "Lightweight and aerodynamic carbon wheels",
    price_range: "800-1200€",
    specifications: {
      material: "Carbon",
      rim_depth: "50mm",
      hub_standard: "Centerlock",
    },
  },
  {
    id: "wheel2",
    name: "Aluminum Wheelset",
    brand: "Trek",
    model: "Bontrager Paradigm",
    category: "wheel_frame",
    description: "Versatile aluminum wheels",
    price_range: "400-600€",
    specifications: {
      material: "Aluminum",
      rim_depth: "30mm",
      hub_standard: "6-bolt",
    },
  },
  {
    id: "wheel3",
    name: "Aero Carbon Wheelset",
    brand: "Canyon",
    model: "Aeroad CF",
    category: "wheel_frame",
    description: "Deep aerodynamic carbon wheels",
    price_range: "1000-1500€",
    specifications: {
      material: "Carbon",
      rim_depth: "64mm",
      hub_standard: "Centerlock",
    },
  },
  {
    id: "wheel4",
    name: "MTB Carbon Wheelset",
    brand: "Scott",
    model: "Syncros Revelstoke",
    category: "wheel_frame",
    description: "Robust carbon MTB wheels",
    price_range: "700-1100€",
    specifications: {
      material: "Carbon",
      rim_width: "30mm",
      hub_standard: "6-bolt",
    },
  },

  // Seatposts
  {
    id: "seat1",
    name: "Carbon Seatpost",
    brand: "Specialized",
    model: "S-Works",
    category: "seatpost",
    description: "Ultra-lightweight carbon seatpost",
    price_range: "200-350€",
    specifications: { material: "Carbon", diameter: "27.2mm", offset: "20mm" },
  },
  {
    id: "seat2",
    name: "Aluminum Seatpost",
    brand: "Trek",
    model: "Bontrager Elite",
    category: "seatpost",
    description: "Reliable aluminum seatpost",
    price_range: "80-120€",
    specifications: { material: "Aluminum", diameter: "31.6mm", offset: "0mm" },
  },
  {
    id: "seat3",
    name: "Aero Carbon Seatpost",
    brand: "Canyon",
    model: "VCLS 2.0",
    category: "seatpost",
    description: "Aerodynamic carbon seatpost",
    price_range: "180-280€",
    specifications: { material: "Carbon", diameter: "27.2mm", offset: "15mm" },
  },
  {
    id: "seat4",
    name: "Dropper Seatpost",
    brand: "Scott",
    model: "TwinLoc",
    category: "seatpost",
    description: "MTB dropper seatpost",
    price_range: "300-500€",
    specifications: {
      material: "Aluminum",
      diameter: "30.9mm",
      travel: "150mm",
    },
  },
];
const mockCompatibilityResults: CompatibilityResult[] = [
  {
    status: "compatible",
    confidence: 0.95,
    explanation:
      "These components are perfectly compatible and optimized for performance.",
    processing_time_ms: 150,
  },
  {
    status: "conditional",
    confidence: 0.75,
    explanation: "Compatibility possible with a specific adapter.",
    required_adapters: [mockComponents[0]],
    processing_time_ms: 200,
  },
  {
    status: "incompatible",
    confidence: 0.9,
    explanation:
      "These components are not compatible due to specification differences.",
    alternative_suggestions: [mockComponents[1]],
    processing_time_ms: 120,
  },
];

// API simulation with delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const bikeModelsApi = {
  async getModels(params: {
    type?: "road" | "mountain" | "gravel" | "hybrid";
    brand?: string;
    limit?: number;
  }): Promise<ApiResponse<BikeModel[]>> {
    await delay(400);

    let filteredModels = mockBikeModels;

    if (params.type) {
      filteredModels = filteredModels.filter((m) => m.type === params.type);
    }

    if (params.brand) {
      const brandLower = params.brand.toLowerCase();
      filteredModels = filteredModels.filter((m) =>
        m.brand.toLowerCase().includes(brandLower)
      );
    }

    if (params.limit) {
      filteredModels = filteredModels.slice(0, params.limit);
    }

    return {
      data: filteredModels,
      status: 200,
      message: "Success",
    };
  },

  async getModelById(id: string): Promise<ApiResponse<BikeModel | null>> {
    await delay(300);

    const model = mockBikeModels.find((m) => m.id === id);

    return {
      data: model || null,
      status: model ? 200 : 404,
      message: model ? "Success" : "Model not found",
    };
  },

  async getModelConfiguration(
    modelId: string
  ): Promise<ApiResponse<BikeConfiguration>> {
    await delay(500);

    const model = mockBikeModels.find((m) => m.id === modelId);
    if (!model) {
      return {
        data: {} as BikeConfiguration,
        status: 404,
        message: "Model not found",
      };
    }

    // Construire la configuration avec les composants par défaut
    const components: Record<ComponentCategory, Component | null> = {} as any;

    for (const [category, componentId] of Object.entries(
      model.default_components
    )) {
      const component = mockComponents.find((c) => c.id === componentId);
      components[category as ComponentCategory] = component || null;
    }

    return {
      data: {
        bike_model: model,
        components,
        last_modified: new Date(),
      },
      status: 200,
      message: "Success",
    };
  },
};

export const componentsApi = {
  async search(params: {
    category?: ComponentCategory;
    search?: string;
    limit?: number;
  }): Promise<ApiResponse<Component[]>> {
    await delay(500); // Simulate network latency

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

  async getById(id: string): Promise<ApiResponse<Component | null>> {
    await delay(200);

    const component = mockComponents.find((c) => c.id === id);

    return {
      data: component || null,
      status: component ? 200 : 404,
      message: component ? "Success" : "Component not found",
    };
  },
};

export const compatibilityApi = {
  async checkCompatibility(
    componentAId: string,
    componentBId: string
  ): Promise<ApiResponse<CompatibilityResult>> {
    await delay(800); // Simulate analysis

    // Returns a random result for demo
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

  async checkConfiguration(
    configuration: BikeConfiguration
  ): Promise<ApiResponse<CompatibilityResult[]>> {
    await delay(1200);

    // Simulate checking the entire configuration
    const results: CompatibilityResult[] = [];
    const components = Object.values(configuration.components).filter(
      Boolean
    ) as Component[];

    // Generate results for each component pair
    for (let i = 0; i < components.length - 1; i++) {
      const randomResult =
        mockCompatibilityResults[
          Math.floor(Math.random() * mockCompatibilityResults.length)
        ];
      results.push({
        ...randomResult,
        explanation: `Compatibility between ${components[i].name} and ${
          components[i + 1].name
        }: ${randomResult.explanation}`,
      });
    }

    return {
      data: results,
      status: 200,
      message: "Configuration check completed",
    };
  },
};
