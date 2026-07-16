import { cn } from "@/lib/utils";
import { Gift, Lock, Sparkles, Clock, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RewardCardProps {
  title: string;
  description: string;
  unlocked?: boolean;
  type: "access" | "badge" | "insight" | "theme";
  progress?: number;
  onClaim?: () => void;
  className?: string;
}

const typeConfig = {
  access: {
    icon: Clock,
    color: "text-accent",
    bg: "bg-gradient-accent",
  },
  badge: {
    icon: Trophy,
    color: "text-xp",
    bg: "bg-gradient-xp",
  },
  insight: {
    icon: Star,
    color: "text-level",
    bg: "bg-gradient-level",
  },
  theme: {
    icon: Sparkles,
    color: "text-primary",
    bg: "bg-gradient-primary",
  },
};

export function RewardCard({
  title,
  description,
  unlocked = false,
  type,
  progress = 0,
  onClaim,
  className,
}: RewardCardProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border-2 p-4 transition-all duration-300",
        unlocked
          ? "bg-card border-success/30 shadow-medium"
          : "bg-card/50 border-muted backdrop-blur-sm",
        className
      )}
    >
      {/* Glow effect when unlocked */}
      {unlocked && (
        <div className="absolute inset-0 bg-gradient-reward opacity-10 animate-pulse-slow" />
      )}

      <div className="relative flex items-start gap-4">
        {/* Icon */}
        <div
          className={cn(
            "flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300",
            unlocked ? config.bg : "bg-muted"
          )}
        >
          {unlocked ? (
            <Gift className="w-7 h-7 text-white animate-bounce-in" />
          ) : (
            <Lock className="w-6 h-6 text-muted-foreground" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Icon className={cn("w-4 h-4", unlocked ? config.color : "text-muted-foreground")} />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide capitalize">
              {type} Reward
            </span>
          </div>

          <h3 className={cn("font-semibold mb-1", !unlocked && "text-muted-foreground")}>
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>

          {!unlocked && progress > 0 && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold">{progress}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {unlocked && onClaim && (
            <Button size="sm" className="gap-1.5 mt-2" onClick={onClaim}>
              <Gift className="w-4 h-4" />
              Claim Reward
            </Button>
          )}
        </div>
      </div>

      {/* Locked overlay */}
      {!unlocked && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 pointer-events-none" />
      )}
    </div>
  );
}