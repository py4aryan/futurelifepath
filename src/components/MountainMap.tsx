import { cn } from "@/lib/utils";
import { Check, Lock, Star, Trophy, Zap, Sparkles, Flag, Gift, Brain, Dumbbell, BookOpen, Flame, User, X, Play } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

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
  habits: { icon: Flame, color: "accent", label: "Habits" },
  academics: { icon: BookOpen, color: "success", label: "Learning" },
  mindset: { icon: Brain, color: "level", label: "Mindset" },
};

// Zone definitions
const zones = [
  { name: "Base Camp", icon: "🏕️", startLevel: 1, color: "from-emerald-500/20 to-emerald-600/30" },
  { name: "Focus Hills", icon: "🌲", startLevel: 3, color: "from-blue-500/20 to-blue-600/30" },
  { name: "Discipline Ridge", icon: "⛰️", startLevel: 5, color: "from-purple-500/20 to-purple-600/30" },
  { name: "Mastery Summit", icon: "🏔️", startLevel: 7, color: "from-amber-500/20 to-amber-600/30" },
];

const getZoneForLevel = (levelIndex: number) => {
  for (let i = zones.length - 1; i >= 0; i--) {
    if (levelIndex + 1 >= zones[i].startLevel) {
      return zones[i];
    }
  }
  return zones[0];
};

// Calculate curved winding path positions
const getPathPosition = (index: number, total: number) => {
  const progress = index / Math.max(total - 1, 1);
  const amplitude = 30 + Math.sin(progress * Math.PI) * 10;
  const xOffset = Math.sin(progress * Math.PI * 2.5 + 0.5) * amplitude;
  return {
    x: 50 + xOffset,
    y: 85 - (progress * 75),
  };
};

export function MountainMap({ stages, onStageClick, onStageComplete, className }: MountainMapProps) {
  const [selectedStage, setSelectedStage] = useState<MountainStage | null>(null);
  const [celebratingStage, setCelebratingStage] = useState<string | null>(null);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [avatarPosition, setAvatarPosition] = useState({ x: 50, y: 85 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Track scroll for parallax
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const scrolled = container.scrollTop / (container.scrollHeight - container.clientHeight);
      setScrollProgress(Math.max(0, Math.min(1, scrolled)));
    };
    
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Find current stage and set avatar position
  useEffect(() => {
    const currentIndex = stages.findIndex(s => s.status === "current");
    const completedCount = stages.filter(s => s.status === "completed").length;
    
    if (currentIndex >= 0) {
      const pos = getPathPosition(currentIndex, stages.length);
      setAvatarPosition(pos);
    } else if (completedCount === stages.length) {
      setAvatarPosition({ x: 50, y: 8 });
    }
  }, [stages]);

  const handleStageClick = (stage: MountainStage) => {
    if (stage.status === "locked") return;
    setSelectedStage(selectedStage?.id === stage.id ? null : stage);
    onStageClick?.(stage);
  };

  const handleComplete = (stage: MountainStage) => {
    setCelebratingStage(stage.id);
    
    const currentIndex = stages.findIndex(s => s.id === stage.id);
    if (currentIndex + 1 < stages.length) {
      const nextPos = getPathPosition(currentIndex + 1, stages.length);
      setTimeout(() => {
        setAvatarPosition(nextPos);
      }, 1000);
    }
    
    setTimeout(() => {
      setShowUnlockAnimation(true);
      onStageComplete?.(stage);
      setTimeout(() => {
        setCelebratingStage(null);
        setShowUnlockAnimation(false);
        setSelectedStage(null);
      }, 2500);
    }, 1500);
  };

  const completedCount = stages.filter(s => s.status === "completed").length;
  const progressPercent = completedCount / stages.length;

  // Generate smooth bezier path
  const generatePath = () => {
    const points = stages.map((_, i) => getPathPosition(i, stages.length));
    if (points.length === 0) return "";
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const midY = (prev.y + curr.y) / 2;
      path += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
    }
    
    return path;
  };

  // Get zone banner positions
  const zoneBanners = zones.map(zone => {
    const levelIndex = zone.startLevel - 1;
    if (levelIndex >= stages.length) return null;
    const pos = getPathPosition(levelIndex, stages.length);
    return { ...zone, pos };
  }).filter(Boolean);

  return (
    <div ref={mapRef} className={cn("relative overflow-hidden rounded-3xl", className)}>
      {/* Scrollable Map Container */}
      <div 
        ref={contentRef}
        className="relative h-[700px] overflow-y-auto overflow-x-hidden game-map-container"
      >
        <div className="relative min-h-[1000px]">
          {/* === BACKGROUND LAYERS === */}
          
          {/* Sky gradient */}
          <div className="absolute inset-0 game-map-sky" />
          
          {/* Far distant peaks (slowest parallax) */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ transform: `translateY(${scrollProgress * 30}px)` }}
          >
            <svg className="absolute top-[5%] w-full h-48 opacity-20" viewBox="0 0 200 60" preserveAspectRatio="none">
              <path 
                d="M0,60 L15,35 L30,50 L50,20 L70,40 L90,15 L110,35 L130,10 L150,30 L170,18 L190,40 L200,25 L200,60 Z" 
                fill="hsl(var(--muted-foreground) / 0.3)" 
              />
              {/* Snow caps */}
              <path d="M50,20 L55,26 L45,26 Z" fill="hsl(0 0% 100% / 0.6)" />
              <path d="M90,15 L96,22 L84,22 Z" fill="hsl(0 0% 100% / 0.7)" />
              <path d="M130,10 L137,18 L123,18 Z" fill="hsl(0 0% 100% / 0.8)" />
            </svg>
          </div>

          {/* Mid peaks */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ transform: `translateY(${scrollProgress * 50}px)` }}
          >
            <svg className="absolute top-[15%] w-full h-40 opacity-30" viewBox="0 0 200 50" preserveAspectRatio="none">
              <path 
                d="M0,50 L20,30 L40,45 L60,22 L85,38 L105,18 L125,35 L145,12 L165,32 L185,20 L200,38 L200,50 Z" 
                fill="hsl(var(--muted) / 0.5)" 
              />
            </svg>
          </div>

          {/* Floating clouds */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`cloud-${i}`}
              className="absolute game-cloud"
              style={{
                left: `${-10 + (i * 20) % 100}%`,
                top: `${8 + (i * 5) % 25}%`,
                animationDelay: `${i * 4}s`,
                animationDuration: `${40 + i * 10}s`,
                opacity: 0.4 + (i % 3) * 0.15,
                transform: `scale(${0.7 + (i % 3) * 0.4})`,
              }}
            >
              <div className="relative">
                <div className="w-24 h-10 bg-white/80 rounded-full blur-sm" />
                <div className="absolute top-2 left-6 w-16 h-7 bg-white/70 rounded-full blur-sm" />
                <div className="absolute top-1 left-10 w-12 h-6 bg-white/60 rounded-full blur-sm" />
              </div>
            </div>
          ))}

          {/* Foreground trees (left side) */}
          {[...Array(5)].map((_, i) => (
            <div 
              key={`tree-l-${i}`}
              className="absolute pointer-events-none"
              style={{ 
                left: `${2 + i * 3}%`, 
                top: `${75 - i * 12}%`,
                opacity: 0.6 - i * 0.08,
                transform: `scale(${0.6 + i * 0.1})`,
              }}
            >
              <div className="relative w-8">
                <div className="w-0 h-0 border-l-[16px] border-r-[16px] border-b-[28px] border-l-transparent border-r-transparent border-b-emerald-600/80" />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[24px] border-l-transparent border-r-transparent border-b-emerald-700/70" />
                <div className="w-3 h-4 bg-amber-800/60 mx-auto" />
              </div>
            </div>
          ))}

          {/* Foreground trees (right side) */}
          {[...Array(4)].map((_, i) => (
            <div 
              key={`tree-r-${i}`}
              className="absolute pointer-events-none"
              style={{ 
                right: `${3 + i * 4}%`, 
                top: `${70 - i * 14}%`,
                opacity: 0.55 - i * 0.1,
                transform: `scale(${0.7 + i * 0.1})`,
              }}
            >
              <div className="relative w-6">
                <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[22px] border-l-transparent border-r-transparent border-b-emerald-600/70" />
                <div className="w-2 h-3 bg-amber-800/50 mx-auto" />
              </div>
            </div>
          ))}

          {/* Rocks */}
          <div className="absolute left-[6%] top-[60%] w-10 h-6 rounded-[50%] bg-gradient-to-b from-slate-400/40 to-slate-600/30" />
          <div className="absolute right-[8%] top-[45%] w-8 h-5 rounded-[50%] bg-gradient-to-b from-slate-400/35 to-slate-600/25" />
          <div className="absolute left-[12%] top-[35%] w-6 h-4 rounded-[50%] bg-gradient-to-b from-slate-400/30 to-slate-600/20" />

          {/* === PATH SVG === */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="pathGradientGame" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--success))" />
                <stop offset="50%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
              <filter id="pathGlowGame">
                <feGaussianBlur stdDeviation="0.6" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Shadow/depth path */}
            <path
              d={generatePath()}
              fill="none"
              stroke="hsl(0 0% 0% / 0.15)"
              strokeWidth="3"
              strokeLinecap="round"
              transform="translate(0.3, 0.4)"
            />
            
            {/* Unlit/locked path (dashed) */}
            <path
              d={generatePath()}
              fill="none"
              stroke="hsl(var(--muted-foreground) / 0.3)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="4 3"
            />
            
            {/* Lit progress path */}
            <path
              d={generatePath()}
              fill="none"
              stroke="url(#pathGradientGame)"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#pathGlowGame)"
              style={{
                strokeDasharray: '1000',
                strokeDashoffset: 1000 - (progressPercent * 1000),
                transition: 'stroke-dashoffset 1s ease-out',
              }}
            />
          </svg>

          {/* === ZONE BANNERS === */}
          {zoneBanners.map((zone, i) => zone && (
            <div
              key={zone.name}
              className="absolute z-5 pointer-events-none"
              style={{
                left: i % 2 === 0 ? '8%' : 'auto',
                right: i % 2 === 1 ? '8%' : 'auto',
                top: `${zone.pos.y - 3}%`,
              }}
            >
              <div className={cn(
                "px-3 py-1.5 rounded-lg bg-gradient-to-r border border-white/20 backdrop-blur-sm shadow-lg",
                zone.color
              )}>
                <span className="text-xs font-bold text-foreground/90 flex items-center gap-1.5">
                  <span className="text-sm">{zone.icon}</span>
                  {zone.name}
                </span>
              </div>
            </div>
          ))}

          {/* === SUMMIT MARKER === */}
          <div 
            className="absolute z-20"
            style={{ left: '50%', top: '3%', transform: 'translateX(-50%)' }}
          >
            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-amber-400/30 via-yellow-300/40 to-amber-400/30 animate-pulse" />
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 flex items-center justify-center shadow-xl border-4 border-amber-300/50">
                <Trophy className="w-7 h-7 text-amber-900" />
              </div>
              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-card/95 backdrop-blur border border-amber-400/30 shadow-lg">
                <span className="text-[10px] font-bold text-amber-600 whitespace-nowrap">
                  🏔️ SUMMIT
                </span>
              </div>
            </div>
          </div>

          {/* === CLIMBER AVATAR === */}
          <div 
            className="absolute z-30 pointer-events-none"
            style={{ 
              left: `${avatarPosition.x}%`, 
              top: `${avatarPosition.y}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'all 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div className="relative climber-avatar-container">
              {/* Shadow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-10 h-3 bg-black/20 rounded-full blur-sm" />
              
              {/* Glow ring */}
              <div className="absolute -inset-4 rounded-full bg-primary/30 animate-ping opacity-50" />
              
              {/* Avatar */}
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary via-primary to-level flex items-center justify-center border-3 border-white shadow-lg climber-idle">
                <User className="w-5 h-5 text-white" />
              </div>
              
              {/* Flag */}
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-success flex items-center justify-center border-2 border-white shadow">
                <Flag className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
          </div>

          {/* === LEVEL NODES === */}
          {stages.map((stage, index) => {
            const pos = getPathPosition(index, stages.length);
            const config = categoryConfig[stage.category];
            const CategoryIcon = config.icon;
            const isSelected = selectedStage?.id === stage.id;
            const isCelebrating = celebratingStage === stage.id;
            const levelNumber = index + 1;

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
                {/* Level Node Button */}
                <button
                  onClick={() => handleStageClick(stage)}
                  disabled={stage.status === "locked"}
                  className={cn(
                    "game-level-node",
                    stage.status === "completed" && "completed",
                    stage.status === "current" && "current",
                    stage.status === "locked" && "locked",
                    isCelebrating && "celebrating"
                  )}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {/* Inner content */}
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    {stage.status === "completed" ? (
                      <Check className="w-6 h-6 text-white drop-shadow-md" strokeWidth={3} />
                    ) : stage.status === "locked" ? (
                      <Lock className="w-5 h-5 text-muted-foreground/70" />
                    ) : (
                      <>
                        <span className="text-lg font-black text-white drop-shadow-md">{levelNumber}</span>
                        <CategoryIcon className="w-3.5 h-3.5 text-white/80 -mt-0.5" />
                      </>
                    )}
                  </div>
                  
                  {/* Sparkles for completed */}
                  {stage.status === "completed" && (
                    <div className="absolute inset-0">
                      {[...Array(3)].map((_, i) => (
                        <Sparkles
                          key={i}
                          className="absolute w-3 h-3 text-yellow-300 sparkle-float"
                          style={{
                            top: `${-10 + i * 30}%`,
                            left: `${80 + i * 10}%`,
                            animationDelay: `${i * 0.4}s`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Pulse rings for current */}
                  {stage.status === "current" && (
                    <>
                      <div className="absolute inset-0 rounded-full border-2 border-primary/60 current-pulse-ring" style={{ animationDelay: '0s' }} />
                      <div className="absolute -inset-2 rounded-full border-2 border-primary/40 current-pulse-ring" style={{ animationDelay: '0.5s' }} />
                      <div className="absolute -inset-4 rounded-full border border-primary/20 current-pulse-ring" style={{ animationDelay: '1s' }} />
                    </>
                  )}

                  {/* Fog overlay for locked */}
                  {stage.status === "locked" && (
                    <div className="absolute inset-0 rounded-full bg-muted/40 backdrop-blur-[1px]" />
                  )}
                </button>

                {/* XP Badge (for current/completed) */}
                {stage.status !== "locked" && (
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap",
                      stage.status === "completed" ? "bg-success/20 text-success" : "bg-xp/20 text-xp-foreground"
                    )}>
                      +{stage.xp} XP
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {/* === BASE CAMP MARKER === */}
          <div 
            className="absolute z-20"
            style={{ left: '50%', bottom: '3%', transform: 'translateX(-50%)' }}
          >
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/90 to-emerald-600/90 border-2 border-emerald-300/50 shadow-lg">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <span className="text-base">🏕️</span>
                Base Camp
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* === LEVEL CARD MODAL === */}
      {selectedStage && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-[90%] max-w-sm mx-auto game-level-modal animate-scale-in">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  selectedStage.status === "completed" ? "bg-success" : "bg-primary"
                )}>
                  {selectedStage.status === "completed" ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <span className="text-lg font-bold text-white">
                      {stages.findIndex(s => s.id === selectedStage.id) + 1}
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                    {categoryConfig[selectedStage.category].label}
                  </span>
                  <p className="text-sm font-bold text-foreground">Level {stages.findIndex(s => s.id === selectedStage.id) + 1}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStage(null)}
                className="w-8 h-8 rounded-full bg-muted/80 flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">{selectedStage.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedStage.description}</p>
              </div>

              {/* Stats */}
              <div className="flex gap-3">
                <div className="flex-1 p-3 rounded-xl bg-muted/50 text-center">
                  <p className="text-lg font-bold text-foreground">{selectedStage.duration}</p>
                  <p className="text-xs text-muted-foreground">Duration</p>
                </div>
                <div className="flex-1 p-3 rounded-xl bg-xp/10 text-center">
                  <p className="text-lg font-bold text-xp-foreground">+{selectedStage.xp}</p>
                  <p className="text-xs text-muted-foreground">XP Reward</p>
                </div>
              </div>

              {/* Reward preview */}
              {selectedStage.reward && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-accent/10 to-level/10 border border-accent/20">
                  <Gift className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Reward</p>
                    <p className="text-sm font-semibold text-foreground">{selectedStage.reward}</p>
                  </div>
                </div>
              )}

              {/* Action Button */}
              {selectedStage.status === "current" && (
                <Button
                  onClick={() => handleComplete(selectedStage)}
                  className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary via-level to-primary text-white font-bold text-base gap-2 hover:opacity-90 transition-opacity game-start-button"
                >
                  <Play className="w-5 h-5" fill="currentColor" />
                  Start Level
                </Button>
              )}

              {selectedStage.status === "completed" && (
                <div className="flex items-center justify-center gap-2 h-14 rounded-2xl bg-success/10 text-success">
                  <Check className="w-5 h-5" />
                  <span className="font-bold">Level Complete!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* === CELEBRATION OVERLAY === */}
      {celebratingStage && (
        <div className="absolute inset-0 z-50 flex items-center justify-center celebration-overlay-game">
          <div className="text-center space-y-6">
            {/* Confetti burst */}
            <div className="relative w-40 h-40 mx-auto">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full confetti-burst-game"
                  style={{
                    background: ['#22c55e', '#6366f1', '#f59e0b', '#ec4899', '#06b6d4'][i % 5],
                    left: '50%',
                    top: '50%',
                    animationDelay: `${i * 0.03}s`,
                    '--angle': `${(i * 12)}deg`,
                    '--distance': `${80 + (i % 3) * 30}px`,
                  } as React.CSSProperties}
                />
              ))}
              
              {/* Trophy */}
              <div className="absolute inset-0 flex items-center justify-center trophy-bounce-game">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 flex items-center justify-center shadow-2xl border-4 border-amber-300/50">
                  <Trophy className="w-14 h-14 text-amber-900" />
                </div>
              </div>
            </div>
            
            {/* Text */}
            <div className="space-y-2">
              <h3 className="text-4xl font-black text-foreground celebration-text-game">
                LEVEL COMPLETE!
              </h3>
              <p className="text-xl font-semibold text-muted-foreground">
                +{stages.find(s => s.id === celebratingStage)?.xp} XP earned
              </p>
            </div>
            
            {/* Unlock notification */}
            {showUnlockAnimation && (
              <div className="unlock-slide-game">
                <div className="inline-flex items-center gap-3 py-4 px-6 rounded-2xl bg-card/95 backdrop-blur border border-primary/30 shadow-xl">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Star className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-bold text-lg text-primary">Next Level Unlocked!</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
