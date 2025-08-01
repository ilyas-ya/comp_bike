import { AlertTriangle } from "lucide-react";
import { Component } from "@/types";
import { ItemCard } from "./ItemCard";

interface RequiredAdaptersProps {
  adapters: Component[];
}

export function RequiredAdapters({ adapters }: RequiredAdaptersProps) {
  if (!adapters || adapters.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 p-3 glassmorphism-light rounded-lg border border-cyberpunk-accent/30 cyberpunk-transition-normal">
      <h4 className="text-sm font-semibold theme-text-primary mb-3 flex items-center gap-2 cyberpunk-glow-accent">
        <AlertTriangle
          className="h-4 w-4 text-cyberpunk-accent cyberpunk-glow-accent"
          aria-hidden="true"
          style={{
            filter: "drop-shadow(0 0 4px rgba(255, 23, 68, 0.6))",
          }}
        />
        Required Adapters
      </h4>
      <div className="space-y-3">
        {adapters.map((adapter, index) => (
          <ItemCard
            key={adapter.id || index}
            brand={adapter.brand}
            name={adapter.name}
            description={adapter.description || ""}
            priceRange={adapter.price_range}
            image={adapter.image}
            altText={`${adapter.brand} ${adapter.name} adapter`}
          />
        ))}
      </div>
    </div>
  );
}
