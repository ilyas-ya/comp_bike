import { ComponentCategory } from "@/types";

export const getCategoryDisplayName = (category: ComponentCategory): string => {
  const categoryNames: Record<ComponentCategory, string> = {
    bottom_bracket: "Bottom Bracket",
    cassette_derailleur: "Cassette/Derailleur",
    brake_system: "Brake System",
    wheel_frame: "Wheel/Frame",
    seatpost: "Seatpost",
    fork: "Fork",
    handlebars: "Handlebars",
    crankset: "Crankset",
  };
  return categoryNames[category] || category;
};
