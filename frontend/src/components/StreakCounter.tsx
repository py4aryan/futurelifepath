import { cn } from "@/lib/utils";
import { Flame, TrendingUp } from "lucide-react";

interface StreakCounterProps {
  days: number;
  isActive?: boolean;
  className?: string;
}

export function StreakCounter({ days, isActive = true, className }: StreakCounterProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-300",
        isActive 
          ? "streak-badge"
          : "bg-muted text-muted-foreground",
        className
      )}
    >
      <Flame className={cn(
        "w-5 h-5",
        isActive && "animate-wiggle"
      )} />
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-none">{days}</span>
        <span className="text-[10px] opacity-80">day streak</span>
      </div>
    </div>
  );
}

interface XPCounterProps {
  xp: number;
  level: number;
  nextLevelXp: number;
  className?: string;
}

export function XPCounter({ xp, level, nextLevelXp, className }: XPCounterProps) {
  const progress = (xp / nextLevelXp) * 100;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Level badge */}
      <div className="level-badge w-10 h-10 rounded-xl flex items-center justify-center text-sm">
        {level}
      </div>

      {/* XP progress */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-semibold">{xp} XP</span>
          <span className="text-xs text-muted-foreground">{nextLevelXp} to next level</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-xp rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

interface StatsBadgeProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  variant?: "default" | "xp" | "streak" | "level";
  className?: string;
}

export function StatsBadge({ label, value, icon, variant = "default", className }: StatsBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-xl",
        variant === "default" && "bg-card border",
        variant === "xp" && "xp-badge",
        variant === "streak" && "streak-badge",
        variant === "level" && "level-badge",
        className
      )}
    >
      {icon}
      <div className="flex flex-col">
        <span className="text-xs opacity-70">{label}</span>
        <span className="font-bold leading-none">{value}</span>
      </div>
    </div>
  );
}