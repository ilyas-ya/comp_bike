interface ItemCardProps {
  brand: string;
  name: string;
  description?: string;
  priceRange?: string;
  image?: string;
  altText: string;
}

export function ItemCard({
  brand,
  name,
  description,
  priceRange,
  image,
  altText,
}: ItemCardProps) {
  return (
    <div
      className="glassmorphism-medium rounded-lg p-4 border border-cyberpunk-red/20 cyberpunk-interactive cyberpunk-transition-normal"
      style={{
        boxShadow:
          "0 4px 16px rgba(0, 0, 0, 0.3), 0 0 8px rgba(220, 38, 38, 0.2)",
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm theme-text-primary mb-1 cyberpunk-glow-subtle">
            {brand} {name}
          </div>
          {description && (
            <p className="text-sm theme-text-secondary leading-relaxed mb-2">
              {description}
            </p>
          )}
          {priceRange && (
            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium glassmorphism-light border border-cyberpunk-red/30 theme-text-primary">
              <span className="cyberpunk-glow-subtle">Price: {priceRange}</span>
            </div>
          )}
        </div>
        {image && (
          <img
            src={image}
            alt={altText}
            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-cyberpunk-red/30 flex-shrink-0 cyberpunk-transition-fast"
            style={{
              boxShadow:
                "0 2px 8px rgba(0, 0, 0, 0.4), 0 0 4px rgba(220, 38, 38, 0.3)",
            }}
          />
        )}
      </div>
    </div>
  );
}
