interface ProcessingTimeProps {
  processingTimeMs?: number;
}

export function ProcessingTime({ processingTimeMs }: ProcessingTimeProps) {
  if (!processingTimeMs) {
    return null;
  }

  return (
    <div className="text-xs theme-text-muted text-right cyberpunk-glow-subtle">
      Processed in {processingTimeMs}ms
    </div>
  );
}
