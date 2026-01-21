import { cn } from "@/lib/utils";
import { Check, Lock, Star, Trophy, Zap, Sparkles, Flag, Gift } from "lucide-react";
import { useState, useEffect } from "react";

export interface MountainStage {
  id: string;
  title: string;
  description: string;
  xp: number;
  duration: string;
  category: "skills" | "habits" | "academics" | "mindset";
  status: "completed" | "current" | "locked";
  reward?: string;
}

interface MountainMapProps {
  stages: MountainStage[];
  onStageClick?: (stage: MountainStage) => void;
  onStageComplete?: (stage: MountainStage) => void;
  className?: string;
}

const categoryConfig = {
  skills: { icon: Zap, color: "primary", label: "Skills" },
  habits: { icon: Star, color: "accent", label: "Habits" },
  academics: { icon: Trophy, color: "success", label: "Academics" },
  mindset: { icon: Sparkles, color: "level", label: "Mindset" },
};

export function MountainMap({ stages, onStageClick, onStageComplete, className }: MountainMapProps) {
  const [selectedStage, setSelectedStage] = useState<MountainStage | null>(null);
  const [celebratingStage, setCelebratingStage] = useState<string | null>(null);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);

  const handleStageClick = (stage: MountainStage) => {
    if (stage.status === "locked") return;
    setSelectedStage(stage);
    onStageClick?.(stage);
  };

  const handleComplete = (stage: MountainStage) => {
    setCelebratingStage(stage.id);
    setTimeout(() => {
      setShowUnlockAnimation(true);
      onStageComplete?.(stage);
      setTimeout(() => {
        setCelebratingStage(null);
        setShowUnlockAnimation(false);
      }, 2000);
    }, 1500);
  };

  const completedCount = stages.filter(s => s.status === "completed").length;
  const progressPercent = (completedCount / stages.length) * 100;

  return (
    <div className={cn("relative overflow-hidden rounded-3xl", className)}>
      {/* Animated background */}
      <div className="absolute inset-0 mountain-map-bg" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30 animate-float-particle"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Progress path - glowing line */}
      <div className="absolute left-1/2 top-8 bottom-8 w-1 -translate-x-1/2 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-muted/30" />
        <div 
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-success via-primary to-accent transition-all duration-1000 animate-path-glow"
          style={{ height: `${progressPercent}%` }}
        />
      </div>

      {/* Celebration overlay */}
      {celebratingStage && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm animate-fade-in">
          <div className="text-center space-y-4 animate-victory-popup">
            {/* Confetti burst */}
            <div className="relative">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full animate-confetti-burst"
                  style={{
                    background: i % 3 === 0 ? 'hsl(var(--primary))' : i % 3 === 1 ? 'hsl(var(--accent))' : 'hsl(var(--success))',
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${i * 30}deg)`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-success via-primary to-accent flex items-center justify-center animate-trophy-bounce">
                <Trophy className="w-12 h-12 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold gradient-text">Stage Complete!</h3>
            <p className="text-muted-foreground">+{stages.find(s => s.id === celebratingStage)?.xp} XP earned</p>
            {showUnlockAnimation && (
              <div className="flex items-center justify-center gap-2 text-primary animate-slide-up">
                <Lock className="w-4 h-4" />
                <span className="font-semibold">Next Stage Unlocked!</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stages */}
      <div className="relative py-8 px-4">
        {/* Summit at top */}
        <div className="flex justify-center mb-8">
          <div className="summit-marker">
            <Flag className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Stage nodes - reversed for bottom-to-top climbing */}
        <div className="space-y-6">
          {[...stages].reverse().map((stage, index) => {
            const config = categoryConfig[stage.category];
            const Icon = config.icon;
            const isEven = index % 2 === 0;
            const isSelected = selectedStage?.id === stage.id;
            const isCelebrating = celebratingStage === stage.id;

            return (
              <div
                key={stage.id}
                className={cn(
                  "relative flex items-center gap-4 stage-row",
                  isEven ? "flex-row" : "flex-row-reverse",
                )}
                style={{ animationDelay: `${(stages.length - index) * 100}ms` }}
              >
                {/* Stage node */}
                <div className="flex-shrink-0 z-10 mx-auto">
                  <button
                    onClick={() => handleStageClick(stage)}
                    disabled={stage.status === "locked"}
                    className={cn(
                      "stage-node",
                      stage.status === "completed" && "completed",
                      stage.status === "current" && "current",
                      stage.status === "locked" && "locked",
                      isSelected && "selected",
                      isCelebrating && "celebrating"
                    )}
                  >
                    {stage.status === "completed" ? (
                      <Check className="w-6 h-6" />
                    ) : stage.status === "locked" ? (
                      <Lock className="w-5 h-5" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                    
                    {/* Glow rings for current */}
                    {stage.status === "current" && (
                      <>
                        <div className="absolute inset-0 rounded-full animate-ping-slow bg-primary/30" />
                        <div className="absolute -inset-2 rounded-full border-2 border-primary/20 animate-pulse-ring" />
                      </>
                    )}
                  </button>
                </div>

                {/* Content card */}
                <div
                  className={cn(
                    "flex-1 max-w-xs stage-card",
                    stage.status === "completed" && "completed",
                    stage.status === "current" && "current",
                    stage.status === "locked" && "locked",
                    isSelected && "selected"
                  )}
                  onClick={() => handleStageClick(stage)}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={cn(
                      "stage-category",
                      `category-${config.color}`
                    )}>
                      <Icon className="w-3 h-3" />
                      {config.label}
                    </span>
                    {stage.status !== "locked" && (
                      <span className="xp-badge text-xs px-2 py-0.5 rounded-full">
                        +{stage.xp} XP
                      </span>
                    )}
                  </div>

                  <h4 className="font-semibold text-foreground mb-1">{stage.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{stage.description}</p>

                  <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                    <span>⏱ {stage.duration}</span>
                    {stage.reward && stage.status !== "locked" && (
                      <span className="flex items-center gap-1 text-accent">
                        <Gift className="w-3 h-3" />
                        {stage.reward}
                      </span>
                    )}
                  </div>

                  {stage.status === "current" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleComplete(stage);
                      }}
                      className="mt-3 w-full py-2 rounded-xl bg-gradient-to-r from-primary to-level text-primary-foreground font-semibold text-sm transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                    >
                      Complete Stage
                    </button>
                  )}

                  {stage.status === "completed" && (
                    <div className="mt-3 pt-3 border-t border-success/20">
                      <span className="text-xs font-semibold text-success flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Completed
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Base camp */}
        <div className="flex justify-center mt-8">
          <div className="base-camp-marker">
            <span className="text-xs font-bold">START</span>
          </div>
        </div>
      </div>
    </div>
  );
}
