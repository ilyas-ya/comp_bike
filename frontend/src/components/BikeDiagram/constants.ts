import { BikeComponentArea, ComponentCategory } from "@/types";

// Define bike component areas with coordinates for SVG interaction - Updated for new bike design
export const BIKE_COMPONENT_AREAS: BikeComponentArea[] = [
  {
    id: "bottom-bracket",
    name: "Bottom Bracket",
    coordinates: { x: 365, y: 265, width: 30, height: 30 },
    category: "bottom_bracket" as ComponentCategory,
    isSelected: false,
  },
  {
    id: "cassette-derailleur",
    name: "Cassette/Derailleur",
    coordinates: { x: 505, y: 270, width: 50, height: 40 },
    category: "cassette_derailleur" as ComponentCategory,
    isSelected: false,
  },
  {
    id: "brake-system",
    name: "Brake System",
    coordinates: { x: 120, y: 240, width: 40, height: 30 },
    category: "brake_system" as ComponentCategory,
    isSelected: false,
  },
  {
    id: "wheel-frame",
    name: "Wheel/Frame",
    coordinates: { x: 120, y: 250, width: 60, height: 60 },
    category: "wheel_frame" as ComponentCategory,
    isSelected: false,
  },
  {
    id: "seatpost",
    name: "Seatpost",
    coordinates: { x: 305, y: 88, width: 30, height: 24 },
    category: "seatpost" as ComponentCategory,
    isSelected: false,
  },
];
