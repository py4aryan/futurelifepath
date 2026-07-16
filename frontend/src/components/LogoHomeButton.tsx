import { useNavigate, useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface LogoHomeButtonProps {
  className?: string;
}

export function LogoHomeButton({ className }: LogoHomeButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/dashboard";

  const handleClick = () => {
    if (!isHome) navigate("/");
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleClick}
          className={cn(
            "group flex items-center gap-3 cursor-pointer transition-all duration-200",
            "hover:scale-105 active:scale-95",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl",
            className
          )}
          aria-label="Return to home"
        >
          {/* Celestix star logo */}
          <div className={cn(
            "relative w-9 h-9 rounded-xl flex items-center justify-center",
            "bg-gradient-to-br from-yellow-700/30 to-yellow-600/20",
            "border border-yellow-600/30",
            "transition-all duration-300 ease-out",
            "group-hover:border-yellow-500/60 group-hover:shadow-logo-glow",
            "logo-pulse"
          )}>
            <svg width="20" height="20" viewBox="0 0 100 100" fill="none" className="relative z-10">
              <path
                d="M50 8 L58 40 L92 40 L65 60 L75 92 L50 72 L25 92 L35 60 L8 40 L42 40 Z"
                fill="none"
                stroke="hsl(42, 55%, 65%)"
                strokeWidth="5"
                strokeLinejoin="round"
              />
              <circle cx="50" cy="40" r="5" fill="hsl(42, 55%, 72%)" />
            </svg>
            <div className="absolute inset-0 rounded-xl bg-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Brand name */}
          <span
            className="text-base font-semibold tracking-widest transition-colors duration-200 group-hover:text-primary"
            style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.2em", color: "hsl(42, 45%, 68%)" }}
          >
            CELESTIX
          </span>
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        className="border-yellow-700/30 px-4 py-2"
        style={{ background: "hsl(222, 25%, 11%)" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm" style={{ color: "hsl(42, 45%, 65%)", fontFamily: "'Cinzel', serif", letterSpacing: "0.1em" }}>
            ✦ Return to Home
          </span>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
