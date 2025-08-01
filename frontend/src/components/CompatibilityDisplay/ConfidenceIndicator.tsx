import { useAnimationOptimization } from "@/hooks/useResponsive";
import { StatusConfig } from "./statusConfig";

interface ConfidenceIndicatorProps {
  confidence: number;
  statusConfig: StatusConfig;
}

export function ConfidenceIndicator({
  confidence,
  statusConfig,
}: ConfidenceIndicatorProps) {
  const { shouldUseAnimation, getOptimizedStyle } = useAnimationOptimization();

  return (
    <div className="mb-4 p-3 glassmorphism-light rounded-lg border border-cyberpunk-red/20 cyberpunk-transition-normal">
      <div className="flex items-center justify-between text-sm theme-text-secondary mb-2">
        <span className="font-medium cyberpunk-glow-subtle">
          Confidence Level
        </span>
        <span className="font-semibold theme-text-primary cyberpunk-glow-subtle">
          {Math.round(confidence * 100)}%
        </span>
      </div>
      <div className="w-full bg-cyberpunk-darkgray/50 rounded-full h-3 shadow-inner border border-cyberpunk-red/10 overflow-hidden">
        <div
          className={`h-3 rounded-full cyberpunk-transition-gpu-smooth cyberpunk-gpu-accelerated bg-gradient-to-r ${statusConfig.confidenceColor} relative`}
          style={getOptimizedStyle({
            width: `${confidence * 100}%`,
            boxShadow: `0 0 8px ${statusConfig.glowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
            animation:
              confidence >= 0.8 && shouldUseAnimation("glow")
                ? "cyberpunk-glow-breathing 3s ease-in-out infinite"
                : "none",
          })}
          role="progressbar"
          aria-valuenow={Math.round(confidence * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Confidence level: ${Math.round(
            confidence * 100
          )} percent`}
        >
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"
            style={{
              animation: "data-stream 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
}
