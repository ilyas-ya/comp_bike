export function AnimatedBackground() {
  return (
    <div className="absolute inset-0">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-cyberpunk-neon rounded-full mix-blend-screen filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-cyberpunk-accent rounded-full mix-blend-screen filter blur-xl opacity-25 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyberpunk-crimson rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Additional cyberpunk grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(220, 38, 38, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(220, 38, 38, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>
    </div>
  );
}
