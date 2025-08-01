// Types pour l'application BikeCheck Pro

export interface Component {
  id: string;
  name: string;
  brand: string;
  model?: string;
  category: ComponentCategory;
  description?: string;
  image?: string;
  price_range?: string;
  specifications?: Record<string, any>;
}

export type ComponentCategory =
  | "bottom_bracket"
  | "cassette_derailleur"
  | "brake_system"
  | "wheel_frame"
  | "seatpost"
  | "fork"
  | "handlebars"
  | "crankset";

export interface BikeModel {
  id: string;
  name: string;
  brand: string;
  type: "road" | "mountain" | "gravel" | "hybrid";
  year: number;
  image?: string;
  description?: string;
  price_range?: string;
  default_components: Record<ComponentCategory, string>;
}

export interface BikeConfiguration {
  bike_model?: BikeModel;
  components: Record<ComponentCategory, Component | null>;
  last_modified: Date;
}

export interface BikeComponentArea {
  id: string;
  name: string;
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  category: ComponentCategory;
  isSelected: boolean;
}

export interface SelectedComponent {
  area: BikeComponentArea;
  component: Component;
}

export interface CompatibilityResult {
  status: "compatible" | "conditional" | "incompatible";
  confidence?: number;
  explanation: string;
  required_adapters?: Component[];
  alternative_suggestions?: Component[];
  processing_time_ms?: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}
