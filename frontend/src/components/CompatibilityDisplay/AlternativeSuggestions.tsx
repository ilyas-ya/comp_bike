import { CheckCircle } from "lucide-react";
import { Component } from "@/types";
import { ItemCard } from "./ItemCard";

interface AlternativeSuggestionsProps {
  suggestions: Component[];
}

export function AlternativeSuggestions({
  suggestions,
}: AlternativeSuggestionsProps) {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 p-3 glassmorphism-light rounded-lg border border-cyberpunk-red/30 cyberpunk-transition-normal">
      <h4 className="text-sm font-semibold theme-text-primary mb-3 flex items-center gap-2 cyberpunk-glow-red">
        <CheckCircle
          className="h-4 w-4 text-cyberpunk-red cyberpunk-glow-red"
          aria-hidden="true"
          style={{
            filter: "drop-shadow(0 0 4px rgba(220, 38, 38, 0.6))",
          }}
        />
        Alternative Suggestions
      </h4>
      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <ItemCard
            key={suggestion.id || index}
            brand={suggestion.brand}
            name={suggestion.name}
            description={suggestion.description}
            priceRange={suggestion.price_range}
            image={suggestion.image}
            altText={`${suggestion.brand} ${suggestion.name} alternative`}
          />
        ))}
      </div>
    </div>
  );
}
