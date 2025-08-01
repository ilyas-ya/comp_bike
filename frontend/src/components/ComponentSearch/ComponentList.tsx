import { Component } from "@/types";
import { ComponentCard } from "./ComponentCard";
import { EmptyState } from "./EmptyState";

interface ComponentListProps {
  components: Component[];
  hasSearched: boolean;
  searchTerm: string;
  onComponentSelect: (component: Component) => void;
}

export function ComponentList({
  components,
  hasSearched,
  searchTerm,
  onComponentSelect,
}: ComponentListProps) {
  return (
    <div
      className="space-y-3 max-h-80 sm:max-h-96 overflow-y-auto scrollbar-custom"
      role="listbox"
      aria-label="Component search results"
    >
      {components.length === 0 ? (
        <EmptyState hasSearched={hasSearched} searchTerm={searchTerm} />
      ) : (
        components.map((component) => (
          <ComponentCard
            key={component.id}
            component={component}
            onSelect={onComponentSelect}
          />
        ))
      )}
    </div>
  );
}
