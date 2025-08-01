import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

export interface StatusConfig {
  icon: typeof CheckCircle;
  color: string;
  glowClass: string;
  containerClass: string;
  pulseClass: string;
  label: string;
  confidenceColor: string;
  glowColor: string;
}

export const getStatusConfig = (status: string): StatusConfig => {
  switch (status) {
    case "compatible":
      return {
        icon: CheckCircle,
        color: "text-cyberpunk-red",
        glowClass: "cyberpunk-glow-red",
        containerClass: "glassmorphism-cyberpunk border-cyberpunk-red/30",
        pulseClass: "status-compatible",
        label: "Compatible",
        confidenceColor: "from-cyberpunk-red to-cyberpunk-bloodred",
        glowColor: "rgba(220, 38, 38, 0.6)",
      };
    case "conditional":
      return {
        icon: AlertTriangle,
        color: "text-cyberpunk-accent",
        glowClass: "cyberpunk-glow-accent",
        containerClass: "glassmorphism-cyberpunk border-cyberpunk-accent/30",
        pulseClass: "status-conditional",
        label: "Conditional",
        confidenceColor: "from-cyberpunk-accent to-cyberpunk-crimson",
        glowColor: "rgba(255, 23, 68, 0.6)",
      };
    case "incompatible":
      return {
        icon: XCircle,
        color: "text-cyberpunk-darkred",
        glowClass: "cyberpunk-glow-subtle",
        containerClass: "glassmorphism-medium border-cyberpunk-darkred/30",
        pulseClass: "status-incompatible",
        label: "Incompatible",
        confidenceColor: "from-cyberpunk-darkred to-red-900",
        glowColor: "rgba(153, 27, 27, 0.6)",
      };
    default:
      return {
        icon: AlertTriangle,
        color: "text-cyberpunk-gray",
        glowClass: "cyberpunk-glow-subtle",
        containerClass: "glassmorphism-light border-cyberpunk-gray/30",
        pulseClass: "",
        label: "Unknown",
        confidenceColor: "from-cyberpunk-gray to-cyberpunk-darkgray",
        glowColor: "rgba(42, 42, 42, 0.6)",
      };
  }
};
