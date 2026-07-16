import { cn } from "@/lib/utils";
import { Flag, Mountain, Sparkles } from "lucide-react";

interface MountainHeroProps {
  className?: string;
  animated?: boolean;
}

export function MountainHero({ className, animated = true }: MountainHeroProps) {
  return (
    <div className={cn("relative w-full h-80 overflow-hidden", className)}>
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100 via-sky-200 to-transparent" />
      
      {/* Animated clouds */}
      {animated && (
        <>
          <div className="absolute top-8 left-[10%] w-20 h-8 bg-white/60 rounded-full blur-sm animate-float" style={{ animationDelay: "0s" }} />
          <div className="absolute top-12 right-[15%] w-16 h-6 bg-white/50 rounded-full blur-sm animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-6 left-[40%] w-12 h-4 bg-white/40 rounded-full blur-sm animate-float" style={{ animationDelay: "4s" }} />
        </>
      )}
      
      {/* Mountain SVG */}
      <svg
        viewBox="0 0 400 200"
        className="absolute bottom-0 w-full h-auto"
        preserveAspectRatio="xMidYMax slice"
      >
        {/* Background mountains */}
        <path
          d="M0 200 L60 100 L100 140 L160 60 L220 120 L280 40 L340 100 L400 60 L400 200 Z"
          className="fill-mountain-mid/50"
        />
        
        {/* Main mountain */}
        <path
          d="M100 200 L200 40 L300 200 Z"
          className="fill-mountain-base"
        />
        
        {/* Snow cap */}
        <path
          d="M175 80 L200 40 L225 80 L210 75 L200 85 L190 75 Z"
          className="fill-mountain-peak"
        />
        
        {/* Path up the mountain */}
        <path
          d="M150 200 Q160 170 180 150 Q200 130 190 100 Q185 80 200 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="8 4"
          className="text-primary/60"
        />
        
        {/* Checkpoints */}
        <circle cx="155" cy="185" r="6" className="fill-success" />
        <circle cx="175" cy="155" r="6" className="fill-success" />
        <circle cx="190" cy="120" r="6" className="fill-primary animate-pulse" />
        <circle cx="185" cy="85" r="4" className="fill-muted" />
        
        {/* Flag at summit */}
        <g transform="translate(195, 35)">
          <line x1="0" y1="0" x2="0" y2="15" stroke="currentColor" strokeWidth="2" className="text-accent" />
          <path d="M0 0 L12 4 L0 8 Z" className="fill-accent" />
        </g>
      </svg>

      {/* Sparkle effects */}
      {animated && (
        <>
          <Sparkles className="absolute top-16 right-[25%] w-5 h-5 text-xp animate-pulse-slow" />
          <Sparkles className="absolute top-24 left-[30%] w-4 h-4 text-accent animate-pulse-slow" style={{ animationDelay: "1s" }} />
        </>
      )}

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}