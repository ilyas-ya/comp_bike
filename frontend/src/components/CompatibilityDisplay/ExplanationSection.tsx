interface ExplanationSectionProps {
  explanation: string;
}

export function ExplanationSection({ explanation }: ExplanationSectionProps) {
  return (
    <div className="mb-4 p-3 glassmorphism-light rounded-lg border border-cyberpunk-red/20 cyberpunk-transition-normal">
      <h4 className="text-sm font-semibold theme-text-primary mb-3 flex items-center gap-2 cyberpunk-glow-subtle">
        <svg
          className="h-4 w-4 text-cyberpunk-neon cyberpunk-glow-neon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          style={{
            filter: "drop-shadow(0 0 4px rgba(255, 0, 64, 0.6))",
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Explanation
      </h4>
      <p className="text-sm theme-text-secondary leading-relaxed">
        {explanation}
      </p>
    </div>
  );
}
