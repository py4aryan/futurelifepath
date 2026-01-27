import { useNavigate, useLocation } from "react-router-dom";
import { Mountain } from "lucide-react";
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
    if (!isHome) {
      navigate("/");
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleClick}
          className={cn(
            "group flex items-center gap-2 cursor-pointer transition-all duration-200",
            "hover:scale-105 active:scale-95",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl",
            className
          )}
          aria-label="Return to Base Camp"
        >
          {/* Logo Icon */}
          <div className={cn(
            "relative w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center",
            "transition-all duration-300 ease-out",
            "group-hover:shadow-logo-glow group-hover:scale-105",
            "group-active:scale-95 group-active:shadow-none",
            "logo-pulse"
          )}>
            {/* Glow ring on hover */}
            <div className="absolute inset-0 rounded-xl bg-primary/30 opacity-0 group-hover:opacity-100 group-hover:animate-logo-ring transition-opacity duration-300" />
            
            {/* Mountain icon */}
            <Mountain className={cn(
              "w-5 h-5 text-primary-foreground relative z-10",
              "transition-transform duration-300",
              "group-hover:scale-110"
            )} />
            
            {/* Click ripple effect */}
            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-active:opacity-100 group-active:animate-logo-click transition-opacity" />
          </div>

          {/* Text */}
          <span className={cn(
            "font-display font-bold text-lg",
            "transition-all duration-200",
            "group-hover:text-primary"
          )}>
            LifePath
          </span>
        </button>
      </TooltipTrigger>
      <TooltipContent 
        side="bottom" 
        className="bg-card/95 backdrop-blur-sm border-primary/20 px-4 py-2"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">🏕️</span>
          <span className="font-medium">Return to Base Camp</span>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
