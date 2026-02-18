interface WaveDividerProps {
  className?: string;
  colors?: [string, string, string];
}

export function WaveDivider({
  className = "h-32 md:h-48",
  colors = ["#065f46", "#064e3b", "#022c22"],
}: WaveDividerProps) {
  return (
    <div
      className={`absolute bottom-0 left-0 w-full z-20 pointer-events-none overflow-hidden leading-none ${className}`}
    >
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill={colors[0]}
          fillOpacity="0.8"
          d="M0,160 C320,100 420,240 740,180 C1060,120 1280,240 1440,200 L1440,320 L0,320 Z"
        />
      </svg>
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill={colors[1]}
          fillOpacity="0.9"
          d="M0,220 C240,180 580,280 840,220 C1100,160 1340,240 1440,220 L1440,320 L0,320 Z"
        />
      </svg>
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill={colors[2]}
          d="M0,280 C400,240 800,320 1440,240 L1440,320 L0,320 Z"
        />
      </svg>
    </div>
  );
}
