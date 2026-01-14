import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, Zap, Star, Trophy, Clock, Gift } from "lucide-react";
import { useState } from "react";

export interface DailySkill {
  id: string;
  title: string;
  description: string;
  type: "main" | "habit" | "challenge";
  duration: string;
  xp: number;
  completed?: boolean;
  optional?: boolean;
}

interface DailySkillCardProps {
  skill: DailySkill;
  onComplete?: (skill: DailySkill) => void;
  className?: string;
}

const typeConfig = {
  main: {
    icon: Zap,
    label: "Main Skill",
    cardClass: "main",
    iconBg: "bg-primary/10 text-primary",
  },
  habit: {
    icon: Star,
    label: "Habit Builder",
    cardClass: "habit",
    iconBg: "bg-accent/10 text-accent",
  },
  challenge: {
    icon: Trophy,
    label: "Bonus Challenge",
    cardClass: "challenge",
    iconBg: "bg-level/10 text-level",
  },
};

export function DailySkillCard({ skill, onComplete, className }: DailySkillCardProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const config = typeConfig[skill.type];
  const Icon = config.icon;

  const handleComplete = () => {
    if (skill.completed) return;
    
    setIsCompleting(true);
    setShowConfetti(true);
    
    setTimeout(() => {
      onComplete?.(skill);
      setIsCompleting(false);
      setTimeout(() => setShowConfetti(false), 1000);
    }, 500);
  };

  return (
    <div
      className={cn(
        "skill-card relative overflow-hidden",
        config.cardClass,
        skill.completed && "opacity-75",
        className
      )}
    >
      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                backgroundColor: ['#FFD700', '#FF6B35', '#8B5CF6', '#22C55E'][i % 4],
                animationDelay: `${i * 50}ms`,
              }}
            />
          ))}
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={cn(
            "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
            config.iconBg,
            skill.completed && "bg-success/10 text-success"
          )}
        >
          {skill.completed ? (
            <Check className="w-6 h-6 animate-bounce-in" />
          ) : (
            <Icon className={cn("w-6 h-6", isCompleting && "animate-wiggle")} />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {config.label}
            </span>
            {skill.optional && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                Optional
              </span>
            )}
          </div>
          
          <h3 className={cn(
            "font-semibold text-lg mb-1",
            skill.completed && "line-through text-muted-foreground"
          )}>
            {skill.title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-3">{skill.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-4 h-4" />
                {skill.duration}
              </span>
              <span className="xp-badge px-2 py-0.5 rounded-full text-xs">
                +{skill.xp} XP
              </span>
            </div>

            {!skill.completed && (
              <Button
                size="sm"
                variant={skill.type === "main" ? "hero" : "outline"}
                onClick={handleComplete}
                disabled={isCompleting}
                className="gap-1.5"
              >
                {isCompleting ? "Completing..." : "Complete"}
                <Check className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Completed overlay */}
      {skill.completed && (
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 text-success font-semibold text-sm bg-success/10 px-2 py-1 rounded-full">
            <Check className="w-4 h-4" />
            Done
          </div>
        </div>
      )}
    </div>
  );
}