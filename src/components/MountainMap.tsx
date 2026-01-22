import { cn } from "@/lib/utils";
import { Check, Lock, Star, Trophy, Zap, Sparkles, Flag, Gift, Mountain } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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

// Calculate curved path positions for Candy Crush style layout
const getPathPosition = (index: number, total: number) => {
  const progress = index / (total - 1);
  // Create a winding S-curve path
  const xOffset = Math.sin(progress * Math.PI * 2) * 30; // Side-to-side motion
  const baseX = 50 + xOffset; // Center with offset
  return {
    x: baseX,
    y: 100 - (progress * 85) - 8, // Bottom to top
  };
};

export function MountainMap({ stages, onStageClick, onStageComplete, className }: MountainMapProps) {
  const [selectedStage, setSelectedStage] = useState<MountainStage | null>(null);
  const [celebratingStage, setCelebratingStage] = useState<string | null>(null);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [avatarPosition, setAvatarPosition] = useState({ x: 50, y: 92 });
  const mapRef = useRef<HTMLDivElement>(null);

  // Find current stage index and set avatar position
  useEffect(() => {
    const currentIndex = stages.findIndex(s => s.status === "current");
    const completedCount = stages.filter(s => s.status === "completed").length;
    
    if (currentIndex >= 0) {
      const pos = getPathPosition(currentIndex, stages.length);
      setAvatarPosition(pos);
    } else if (completedCount === stages.length) {
      // All completed - avatar at summit
      setAvatarPosition({ x: 50, y: 5 });
    }
  }, [stages]);

  const handleStageClick = (stage: MountainStage) => {
    if (stage.status === "locked") return;
    setSelectedStage(selectedStage?.id === stage.id ? null : stage);
    onStageClick?.(stage);
  };

  const handleComplete = (stage: MountainStage) => {
    setCelebratingStage(stage.id);
    
    // Animate avatar moving up
    const currentIndex = stages.findIndex(s => s.id === stage.id);
    if (currentIndex + 1 < stages.length) {
      const nextPos = getPathPosition(currentIndex + 1, stages.length);
      setTimeout(() => {
        setAvatarPosition(nextPos);
      }, 800);
    }
    
    setTimeout(() => {
      setShowUnlockAnimation(true);
      onStageComplete?.(stage);
      setTimeout(() => {
        setCelebratingStage(null);
        setShowUnlockAnimation(false);
        setSelectedStage(null);
      }, 2000);
    }, 1500);
  };

  const completedCount = stages.filter(s => s.status === "completed").length;

  // Generate SVG path for the winding trail
  const generatePath = () => {
    const points = stages.map((_, i) => getPathPosition(i, stages.length));
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cp1x = prev.x;
      const cp1y = prev.y - 5;
      const cp2x = curr.x;
      const cp2y = curr.y + 5;
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
    }
    
    return path;
  };

  return (
    <div ref={mapRef} className={cn("relative overflow-hidden rounded-3xl min-h-[700px]", className)}>
      {/* Layered parallax background */}
      <div className="absolute inset-0 mountain-parallax-bg">
        {/* Sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--primary)/0.1)] via-background to-background" />
        
        {/* Distant mountains - parallax layer 1 */}
        <div className="absolute inset-0 mountain-layer-1">
          <svg className="absolute bottom-[60%] w-full h-40 opacity-20" viewBox="0 0 100 30" preserveAspectRatio="none">
            <path d="M0,30 L15,10 L30,25 L45,5 L60,20 L75,8 L90,22 L100,15 L100,30 Z" 
                  fill="hsl(var(--primary)/0.3)" />
          </svg>
        </div>
        
        {/* Mid mountains - parallax layer 2 */}
        <div className="absolute inset-0 mountain-layer-2">
          <svg className="absolute bottom-[40%] w-full h-48 opacity-30" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path d="M0,40 L10,20 L25,35 L40,10 L55,30 L70,15 L85,28 L100,8 L100,40 Z" 
                  fill="hsl(var(--muted))" />
          </svg>
        </div>
        
        {/* Floating clouds */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute cloud-float"
            style={{
              left: `${5 + i * 20}%`,
              top: `${5 + (i % 3) * 15}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${20 + i * 5}s`,
            }}
          >
            <div className="w-16 h-6 bg-white/10 rounded-full blur-sm" />
            <div className="absolute top-1 left-3 w-10 h-4 bg-white/10 rounded-full blur-sm" />
          </div>
        ))}

        {/* Decorative trees/rocks on sides */}
        <div className="absolute left-4 bottom-[20%] w-8 h-12 opacity-30">
          <div className="w-0 h-0 border-l-[16px] border-r-[16px] border-b-[30px] border-l-transparent border-r-transparent border-b-[hsl(var(--success))]" />
          <div className="w-2 h-4 bg-[hsl(var(--muted-foreground)/0.5)] mx-auto" />
        </div>
        <div className="absolute right-6 bottom-[35%] w-6 h-10 opacity-25">
          <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[24px] border-l-transparent border-r-transparent border-b-[hsl(var(--success))]" />
        </div>
        <div className="absolute left-8 bottom-[55%] w-5 h-8 opacity-20">
          <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-l-transparent border-r-transparent border-b-[hsl(var(--success))]" />
        </div>
      </div>

      {/* Winding path SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Background path (unlit) */}
        <path
          d={generatePath()}
          fill="none"
          stroke="hsl(var(--muted)/0.4)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="2 2"
        />
        {/* Lit path (progress) */}
        <path
          d={generatePath()}
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="path-lit-stroke"
          style={{
            strokeDasharray: '1000',
            strokeDashoffset: 1000 - (completedCount / stages.length) * 1000,
          }}
        />
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--success))" />
            <stop offset="50%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
      </svg>

      {/* Summit marker */}
      <div 
        className="absolute z-20 summit-marker-enhanced"
        style={{ left: '50%', top: '3%', transform: 'translateX(-50%)' }}
      >
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-accent/20 animate-summit-pulse" />
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent via-primary to-success flex items-center justify-center shadow-lg">
            <Flag className="w-6 h-6 text-white" />
          </div>
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-accent whitespace-nowrap">
            SUMMIT
          </span>
        </div>
      </div>

      {/* Climber avatar */}
      <div 
        className="absolute z-30 climber-avatar"
        style={{ 
          left: `${avatarPosition.x}%`, 
          top: `${avatarPosition.y}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <div className="relative">
          {/* Glow ring */}
          <div className="absolute -inset-2 rounded-full bg-primary/30 animate-avatar-glow" />
          {/* Avatar body */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-level border-2 border-white shadow-lg flex items-center justify-center climber-idle">
            <Mountain className="w-5 h-5 text-white" />
          </div>
          {/* Direction indicator */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-primary" />
        </div>
      </div>

      {/* Stage nodes */}
      {stages.map((stage, index) => {
        const pos = getPathPosition(index, stages.length);
        const config = categoryConfig[stage.category];
        const Icon = config.icon;
        const isSelected = selectedStage?.id === stage.id;
        const isCelebrating = celebratingStage === stage.id;
        const isAccessible = stage.status !== "locked" || 
          (index > 0 && stages[index - 1]?.status === "current"); // Next 1 stage preview

        return (
          <div
            key={stage.id}
            className="absolute z-10"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Stage node button */}
            <button
              onClick={() => handleStageClick(stage)}
              disabled={stage.status === "locked"}
              className={cn(
                "stage-node-candy",
                stage.status === "completed" && "completed",
                stage.status === "current" && "current",
                stage.status === "locked" && "locked",
                isCelebrating && "celebrating"
              )}
            >
              {stage.status === "completed" ? (
                <Check className="w-5 h-5 text-white" />
              ) : stage.status === "locked" ? (
                <Lock className="w-4 h-4" />
              ) : (
                <span className="text-white font-bold text-sm">{index + 1}</span>
              )}
              
              {/* Sparkle effects for completed */}
              {stage.status === "completed" && (
                <div className="absolute -inset-1 rounded-full">
                  {[...Array(3)].map((_, i) => (
                    <Sparkles
                      key={i}
                      className="absolute w-3 h-3 text-success/60 animate-sparkle-float"
                      style={{
                        top: `${-10 + i * 10}%`,
                        left: `${80 + i * 10}%`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    />
                  ))}
                </div>
              )}
              
              {/* Pulse rings for current */}
              {stage.status === "current" && (
                <>
                  <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping-slow" />
                  <div className="absolute -inset-3 rounded-full border-2 border-primary/30 animate-pulse-ring" />
                </>
              )}

              {/* Fog overlay for locked */}
              {stage.status === "locked" && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-muted/80 to-muted/40 backdrop-blur-[1px]" />
              )}
            </button>

            {/* Category indicator */}
            <div 
              className={cn(
                "absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap",
                stage.status === "completed" && "bg-success/20 text-success",
                stage.status === "current" && "bg-primary/20 text-primary",
                stage.status === "locked" && "bg-muted text-muted-foreground"
              )}
            >
              <Icon className="w-2.5 h-2.5 inline mr-0.5" />
              {config.label}
            </div>
          </div>
        );
      })}

      {/* Selected stage popup card */}
      {selectedStage && (
        <div 
          className="absolute z-40 stage-popup-card animate-scale-in"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="w-72 p-5 rounded-2xl bg-card/95 backdrop-blur-xl border shadow-2xl">
            <div className="flex items-start justify-between gap-2 mb-3">
              <span className={cn(
                "px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1",
                `bg-${categoryConfig[selectedStage.category].color}/20 text-${categoryConfig[selectedStage.category].color}`
              )}>
                {(() => {
                  const Icon = categoryConfig[selectedStage.category].icon;
                  return <Icon className="w-3 h-3" />;
                })()}
                {categoryConfig[selectedStage.category].label}
              </span>
              <span className="xp-badge text-xs px-2 py-1 rounded-full">
                +{selectedStage.xp} XP
              </span>
            </div>

            <h4 className="font-bold text-lg text-foreground mb-2">{selectedStage.title}</h4>
            <p className="text-sm text-muted-foreground mb-3">{selectedStage.description}</p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
              <span>⏱ {selectedStage.duration}</span>
              {selectedStage.reward && (
                <span className="flex items-center gap-1 text-accent">
                  <Gift className="w-3 h-3" />
                  {selectedStage.reward}
                </span>
              )}
            </div>

            {selectedStage.status === "current" && (
              <button
                onClick={() => handleComplete(selectedStage)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary via-level to-accent text-primary-foreground font-semibold text-sm transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] animate-gradient-shift bg-[length:200%_100%]"
              >
                🏔️ Complete This Stage
              </button>
            )}

            {selectedStage.status === "completed" && (
              <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-success/10 text-success">
                <Check className="w-4 h-4" />
                <span className="font-semibold text-sm">Stage Conquered!</span>
              </div>
            )}

            <button
              onClick={() => setSelectedStage(null)}
              className="mt-3 w-full py-2 rounded-lg text-muted-foreground text-sm hover:bg-muted transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Celebration overlay */}
      {celebratingStage && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-md animate-fade-in">
          <div className="text-center space-y-4">
            {/* Confetti burst */}
            <div className="relative">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full animate-confetti-burst-enhanced"
                  style={{
                    background: i % 4 === 0 ? 'hsl(var(--primary))' : 
                               i % 4 === 1 ? 'hsl(var(--accent))' : 
                               i % 4 === 2 ? 'hsl(var(--success))' : 'hsl(var(--level))',
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${i * 18}deg)`,
                    animationDelay: `${i * 0.03}s`,
                  }}
                />
              ))}
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-success via-primary to-accent flex items-center justify-center animate-trophy-bounce shadow-2xl">
                <Trophy className="w-14 h-14 text-white drop-shadow-lg" />
              </div>
            </div>
            <h3 className="text-3xl font-bold gradient-text animate-victory-text">Stage Complete!</h3>
            <p className="text-lg text-muted-foreground">
              +{stages.find(s => s.id === celebratingStage)?.xp} XP earned
            </p>
            {showUnlockAnimation && (
              <div className="flex items-center justify-center gap-2 text-primary animate-slide-up pt-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <span className="font-bold text-lg">Next Stage Unlocked!</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Base camp marker */}
      <div 
        className="absolute z-20"
        style={{ left: '50%', bottom: '2%', transform: 'translateX(-50%)' }}
      >
        <div className="flex flex-col items-center">
          <div className="w-16 h-8 rounded-lg bg-gradient-to-r from-muted to-muted/80 border flex items-center justify-center shadow-md">
            <span className="text-xs font-bold text-muted-foreground">BASE CAMP</span>
          </div>
          <div className="w-0.5 h-4 bg-muted" />
        </div>
      </div>
    </div>
  );
}
