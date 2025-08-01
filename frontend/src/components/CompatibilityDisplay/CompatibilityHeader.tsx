import { Component } from "@/types";
import { StatusConfig } from "./statusConfig";

interface HeaderProps {
  componentA: Component;
  componentB: Component;
  statusConfig: StatusConfig;
}

export function CompatibilityHeader({
  componentA,
  componentB,
  statusConfig,
}: HeaderProps) {
  const StatusIcon = statusConfig.icon;

  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
      <div className="flex-1 min-w-0">
        <div className="text-sm sm:text-base font-semibold theme-text-primary mb-2 leading-tight">
          <span className="block sm:inline cyberpunk-glow-subtle">
            {componentA.brand} {componentA.name}
          </span>
          <span className="theme-text-muted mx-2 hidden sm:inline">+</span>
          <span className="block sm:inline mt-1 sm:mt-0 cyberpunk-glow-subtle">
            {componentB.brand} {componentB.name}
          </span>
        </div>
        <div className="text-xs theme-text-tertiary capitalize">
          {componentA.category.replace("_", " ")} &{" "}
          {componentB.category.replace("_", " ")}
        </div>
      </div>

      <div
        className={`flex items-center gap-2 ${statusConfig.color} ${statusConfig.glowClass} flex-shrink-0 cyberpunk-transition-fast`}
      >
        <StatusIcon
          className="h-5 w-5 sm:h-6 sm:w-6 cyberpunk-gpu-filter"
          aria-hidden="true"
          style={{
            filter: `drop-shadow(0 0 6px ${statusConfig.glowColor})`,
          }}
        />
        <span className="font-bold text-sm sm:text-base cyberpunk-gpu-opacity">
          {statusConfig.label}
        </span>
      </div>
    </div>
  );
}
