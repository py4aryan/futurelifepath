import { cn } from "@/lib/utils";
import { Check, Lock, Flag, Star, Zap, Trophy, Mountain } from "lucide-react";
import { useState } from "react";

export interface MountainCheckpoint {
  id: string;
  title: string;
  description: string;
  xp: number;
  duration: string;
  category: "skills" | "habits" | "academics" | "mindset";
  status: "completed" | "current" | "locked";
  reward?: string;
}

interface SkillsMountainProps {
  checkpoints: MountainCheckpoint[];
  onCheckpointClick?: (checkpoint: MountainCheckpoint) => void;
  className?: string;
}

const categoryIcons = {
  skills: Zap,
  habits: Star,
  academics: Trophy,
  mindset: Mountain,
};

const categoryColors = {
  skills: "text-primary bg-primary/10 border-primary/20",
  habits: "text-accent bg-accent/10 border-accent/20",
  academics: "text-success bg-success/10 border-success/20",
  mindset: "text-level bg-level/10 border-level/20",
};

export function SkillsMountain({ checkpoints, onCheckpointClick, className }: SkillsMountainProps) {
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<MountainCheckpoint | null>(null);

  const handleClick = (checkpoint: MountainCheckpoint) => {
    setSelectedCheckpoint(checkpoint);
    onCheckpointClick?.(checkpoint);
  };

  return (
    <div className={cn("relative", className)}>
      {/* Mountain background */}
      <div className="absolute inset-0 mountain-gradient rounded-3xl opacity-20" />
      
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-sky rounded-3xl opacity-50" />

      {/* Path line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2">
        <div className="h-full w-full bg-gradient-to-b from-success via-primary to-muted rounded-full opacity-40" />
      </div>

      {/* Checkpoints */}
      <div className="relative py-8 px-4 space-y-4">
        {checkpoints.map((checkpoint, index) => {
          const Icon = categoryIcons[checkpoint.category];
          const isEven = index % 2 === 0;
          const isSelected = selectedCheckpoint?.id === checkpoint.id;

          return (
            <div
              key={checkpoint.id}
              className={cn(
                "relative flex items-center gap-4 animate-climb",
                isEven ? "flex-row" : "flex-row-reverse"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Checkpoint node */}
              <div className="flex-shrink-0 z-10 mx-auto">
                <button
                  onClick={() => handleClick(checkpoint)}
                  disabled={checkpoint.status === "locked"}
                  className={cn(
                    "checkpoint",
                    checkpoint.status === "completed" && "completed",
                    checkpoint.status === "current" && "current",
                    checkpoint.status === "locked" && "locked",
                    isSelected && "ring-4 ring-primary/30"
                  )}
                >
                  {checkpoint.status === "completed" ? (
                    <Check className="w-6 h-6" />
                  ) : checkpoint.status === "locked" ? (
                    <Lock className="w-5 h-5" />
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                </button>
              </div>

              {/* Content card */}
              <div
                className={cn(
                  "flex-1 max-w-xs p-4 rounded-2xl bg-card/90 backdrop-blur-sm border-2 transition-all duration-300 cursor-pointer",
                  checkpoint.status === "completed" && "border-success/30",
                  checkpoint.status === "current" && "border-primary/50 shadow-medium",
                  checkpoint.status === "locked" && "border-muted opacity-60",
                  isSelected && "ring-2 ring-primary/30 shadow-lg"
                )}
                onClick={() => handleClick(checkpoint)}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span
                    className={cn(
                      "text-xs font-semibold px-2.5 py-1 rounded-full border capitalize",
                      categoryColors[checkpoint.category]
                    )}
                  >
                    {checkpoint.category}
                  </span>
                  {checkpoint.status !== "locked" && (
                    <span className="xp-badge text-xs px-2 py-0.5 rounded-full">
                      +{checkpoint.xp} XP
                    </span>
                  )}
                </div>

                <h4 className="font-semibold text-foreground mb-1">{checkpoint.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">{checkpoint.description}</p>

                <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                  <span>⏱ {checkpoint.duration}</span>
                  {checkpoint.reward && checkpoint.status !== "locked" && (
                    <span className="text-accent">🎁 {checkpoint.reward}</span>
                  )}
                </div>

                {checkpoint.status === "current" && (
                  <div className="mt-3 pt-3 border-t">
                    <span className="text-xs font-semibold text-primary flex items-center gap-1">
                      <Flag className="w-3 h-3" />
                      Current objective
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Summit flag */}
        <div className="flex justify-center pt-4">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <div className="w-16 h-16 rounded-full bg-gradient-reward flex items-center justify-center shadow-lg animate-pulse-slow">
              <Flag className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm font-semibold">Summit</span>
          </div>
        </div>
      </div>
    </div>
  );
}