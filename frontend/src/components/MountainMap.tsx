import { cn } from "@/lib/utils";
import { Check, Lock, Star, Trophy, Zap, Sparkles, Flag, Gift, Mountain, User } from "lucide-react";
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

// Calculate curved path positions for winding mountain trail
const getPathPosition = (index: number, total: number) => {
  const progress = index / (total - 1);
  // Create a more dramatic S-curve that wraps around the mountain
  const amplitude = 28 + Math.sin(progress * Math.PI) * 8; // Wider curves in middle
  const xOffset = Math.sin(progress * Math.PI * 2.5) * amplitude;
  const baseX = 50 + xOffset;
  return {
    x: baseX,
    y: 88 - (progress * 78), // Bottom to top with margin
  };
};

export function MountainMap({ stages, onStageClick, onStageComplete, className }: MountainMapProps) {
  const [selectedStage, setSelectedStage] = useState<MountainStage | null>(null);
  const [celebratingStage, setCelebratingStage] = useState<string | null>(null);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [avatarPosition, setAvatarPosition] = useState({ x: 50, y: 88 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);

  // Track scroll for parallax
  useEffect(() => {
    const handleScroll = () => {
      if (mapRef.current) {
        const rect = mapRef.current.getBoundingClientRect();
        const scrolled = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
        setScrollProgress(scrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Find current stage and set avatar position
  useEffect(() => {
    const currentIndex = stages.findIndex(s => s.status === "current");
    const completedCount = stages.filter(s => s.status === "completed").length;
    
    if (currentIndex >= 0) {
      const pos = getPathPosition(currentIndex, stages.length);
      setAvatarPosition(pos);
    } else if (completedCount === stages.length) {
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
  const progressPercent = completedCount / stages.length;

  // Generate smooth bezier path
  const generatePath = () => {
    const points = stages.map((_, i) => getPathPosition(i, stages.length));
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const midY = (prev.y + curr.y) / 2;
      path += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
    }
    
    return path;
  };

  return (
    <div 
      ref={mapRef} 
      className={cn("relative overflow-hidden rounded-3xl min-h-[800px]", className)}
    >
      {/* === DEEP 3D ENVIRONMENT === */}
      
      {/* Layer 0: Deep Sky Gradient */}
      <div className="absolute inset-0 mountain-3d-sky" />
      
      {/* Layer 1: Far distant peaks (slowest parallax) */}
      <div 
        className="absolute inset-0 mountain-layer-far pointer-events-none"
        style={{ transform: `translateY(${scrollProgress * 20}px)` }}
      >
        <svg className="absolute bottom-[55%] w-full h-64 opacity-15" viewBox="0 0 200 60" preserveAspectRatio="none">
          <defs>
            <linearGradient id="farPeakGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary) / 0.3)" />
              <stop offset="100%" stopColor="hsl(var(--primary) / 0.1)" />
            </linearGradient>
          </defs>
          <path d="M0,60 L20,25 L35,45 L50,15 L65,35 L80,10 L95,30 L110,20 L130,40 L150,8 L170,35 L185,25 L200,45 L200,60 Z" 
                fill="url(#farPeakGrad)" />
        </svg>
      </div>

      {/* Layer 2: Mid distant peaks */}
      <div 
        className="absolute inset-0 mountain-layer-mid pointer-events-none"
        style={{ transform: `translateY(${scrollProgress * 35}px)` }}
      >
        <svg className="absolute bottom-[40%] w-full h-56 opacity-25" viewBox="0 0 200 50" preserveAspectRatio="none">
          <defs>
            <linearGradient id="midPeakGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--muted-foreground) / 0.4)" />
              <stop offset="100%" stopColor="hsl(var(--muted) / 0.3)" />
            </linearGradient>
          </defs>
          <path d="M0,50 L15,30 L30,42 L45,18 L60,35 L80,12 L100,28 L120,8 L140,32 L160,15 L180,38 L200,22 L200,50 Z" 
                fill="url(#midPeakGrad)" />
          {/* Snow caps */}
          <path d="M45,18 L50,22 L40,22 Z" fill="hsl(0 0% 100% / 0.4)" />
          <path d="M80,12 L87,18 L73,18 Z" fill="hsl(0 0% 100% / 0.5)" />
          <path d="M120,8 L128,15 L112,15 Z" fill="hsl(0 0% 100% / 0.6)" />
        </svg>
      </div>

      {/* Atmospheric fog layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-0 right-0 h-24 fog-layer-1" />
        <div className="absolute top-[35%] left-0 right-0 h-32 fog-layer-2" />
        <div className="absolute top-[60%] left-0 right-0 h-20 fog-layer-3" />
      </div>

      {/* Floating clouds with different depths */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`cloud-${i}`}
          className="absolute cloud-3d"
          style={{
            left: `${-15 + (i * 18) % 100}%`,
            top: `${5 + (i * 7) % 35}%`,
            animationDelay: `${i * 3}s`,
            animationDuration: `${35 + i * 8}s`,
            opacity: 0.15 + (i % 3) * 0.08,
            transform: `scale(${0.8 + (i % 3) * 0.3})`,
          }}
        >
          <div className="cloud-shape">
            <div className="w-20 h-8 bg-white rounded-full blur-sm" />
            <div className="absolute top-1 left-4 w-14 h-6 bg-white rounded-full blur-sm" />
            <div className="absolute top-2 left-8 w-10 h-5 bg-white rounded-full blur-sm" />
          </div>
        </div>
      ))}

      {/* Layer 3: Near peaks / cliffs on sides */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translateY(${scrollProgress * 50}px)` }}
      >
        {/* Left cliff face */}
        <svg className="absolute left-0 bottom-[25%] w-32 h-80 opacity-40" viewBox="0 0 50 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="leftCliff" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--muted))" />
              <stop offset="100%" stopColor="hsl(var(--mountain-base))" />
            </linearGradient>
          </defs>
          <path d="M0,100 L0,40 L15,30 L25,55 L35,25 L50,45 L50,100 Z" fill="url(#leftCliff)" />
        </svg>
        
        {/* Right cliff face */}
        <svg className="absolute right-0 bottom-[30%] w-28 h-72 opacity-35" viewBox="0 0 50 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="rightCliff" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--muted))" />
              <stop offset="100%" stopColor="hsl(var(--mountain-base))" />
            </linearGradient>
          </defs>
          <path d="M50,100 L50,35 L35,28 L25,50 L15,22 L0,48 L0,100 Z" fill="url(#rightCliff)" />
        </svg>
      </div>

      {/* Foreground decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Trees on left */}
        {[...Array(4)].map((_, i) => (
          <div 
            key={`tree-l-${i}`}
            className="absolute tree-3d"
            style={{ 
              left: `${3 + i * 4}%`, 
              bottom: `${15 + i * 12}%`,
              transform: `scale(${0.6 + i * 0.15})`,
              opacity: 0.5 - i * 0.08,
            }}
          >
            <div className="relative">
              <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[22px] border-l-transparent border-r-transparent border-b-[hsl(var(--success))]" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[18px] border-l-transparent border-r-transparent border-b-[hsl(var(--success))] opacity-90" />
              <div className="w-2 h-3 bg-[hsl(var(--muted-foreground)/0.4)] mx-auto" />
            </div>
          </div>
        ))}
        
        {/* Trees on right */}
        {[...Array(3)].map((_, i) => (
          <div 
            key={`tree-r-${i}`}
            className="absolute tree-3d"
            style={{ 
              right: `${4 + i * 5}%`, 
              bottom: `${20 + i * 15}%`,
              transform: `scale(${0.7 + i * 0.12})`,
              opacity: 0.45 - i * 0.1,
            }}
          >
            <div className="relative">
              <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[18px] border-l-transparent border-r-transparent border-b-[hsl(var(--success))]" />
              <div className="w-1.5 h-2.5 bg-[hsl(var(--muted-foreground)/0.3)] mx-auto" />
            </div>
          </div>
        ))}

        {/* Rocks / boulders */}
        <div className="absolute left-[8%] bottom-[28%] w-8 h-5 rounded-[40%] bg-gradient-to-b from-muted-foreground/30 to-muted/50 opacity-60" />
        <div className="absolute right-[12%] bottom-[45%] w-6 h-4 rounded-[50%] bg-gradient-to-b from-muted-foreground/25 to-muted/40 opacity-50" />
        <div className="absolute left-[15%] bottom-[55%] w-5 h-3 rounded-[45%] bg-gradient-to-b from-muted-foreground/20 to-muted/30 opacity-40" />
      </div>

      {/* === WINDING PATH SVG === */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="pathGradient3D" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--success))" />
            <stop offset="40%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
          <filter id="pathGlow">
            <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Shadow path */}
        <path
          d={generatePath()}
          fill="none"
          stroke="hsl(0 0% 0% / 0.2)"
          strokeWidth="2"
          strokeLinecap="round"
          transform="translate(0.5, 0.5)"
        />
        
        {/* Background path (unlit) */}
        <path
          d={generatePath()}
          fill="none"
          stroke="hsl(var(--muted) / 0.5)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="3 3"
        />
        
        {/* Lit progress path */}
        <path
          d={generatePath()}
          fill="none"
          stroke="url(#pathGradient3D)"
          strokeWidth="1.8"
          strokeLinecap="round"
          filter="url(#pathGlow)"
          className="path-lit-stroke"
          style={{
            strokeDasharray: '1000',
            strokeDashoffset: 1000 - (progressPercent * 1000),
          }}
        />
      </svg>

      {/* === SUMMIT MARKER === */}
      <div 
        className="absolute z-20 summit-3d"
        style={{ left: '50%', top: '4%', transform: 'translateX(-50%)' }}
      >
        <div className="relative">
          {/* Outer glow rings */}
          <div className="absolute -inset-8 rounded-full summit-outer-glow" />
          <div className="absolute -inset-4 rounded-full summit-inner-glow" />
          
          {/* Summit badge */}
          <div className="w-16 h-16 rounded-full summit-badge flex items-center justify-center">
            <Flag className="w-7 h-7 text-white drop-shadow-md" />
          </div>
          
          {/* Label */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm border border-accent/30">
            <span className="text-xs font-bold text-accent whitespace-nowrap">
              🏔️ SUMMIT
            </span>
          </div>
        </div>
      </div>

      {/* === CLIMBER AVATAR === */}
      <div 
        className="absolute z-30 climber-3d"
        style={{ 
          left: `${avatarPosition.x}%`, 
          top: `${avatarPosition.y}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <div className="relative">
          {/* Ground shadow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-8 h-2 bg-black/20 rounded-full blur-sm" />
          
          {/* Glow effect */}
          <div className="absolute -inset-3 rounded-full climber-glow" />
          
          {/* Avatar body */}
          <div className="w-12 h-12 rounded-full climber-body flex items-center justify-center climber-idle">
            <User className="w-6 h-6 text-white" />
          </div>
          
          {/* Flag indicator */}
          <div className="absolute -top-2 -right-1 w-4 h-4 rounded-full bg-success flex items-center justify-center border-2 border-white shadow-md">
            <Flag className="w-2 h-2 text-white" />
          </div>
        </div>
      </div>

      {/* === STAGE NODES === */}
      {stages.map((stage, index) => {
        const pos = getPathPosition(index, stages.length);
        const config = categoryConfig[stage.category];
        const Icon = config.icon;
        const isSelected = selectedStage?.id === stage.id;
        const isCelebrating = celebratingStage === stage.id;

        return (
          <div
            key={stage.id}
            className="absolute z-10 stage-3d-container"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${index * 100}ms`,
            }}
          >
            {/* Stage node button */}
            <button
              onClick={() => handleStageClick(stage)}
              disabled={stage.status === "locked"}
              className={cn(
                "stage-node-3d",
                stage.status === "completed" && "completed",
                stage.status === "current" && "current",
                stage.status === "locked" && "locked",
                isCelebrating && "celebrating"
              )}
            >
              {/* Inner content */}
              <div className="relative z-10">
                {stage.status === "completed" ? (
                  <Check className="w-5 h-5 text-white drop-shadow" />
                ) : stage.status === "locked" ? (
                  <Lock className="w-4 h-4" />
                ) : (
                  <span className="text-white font-bold text-sm drop-shadow">{index + 1}</span>
                )}
              </div>
              
              {/* Sparkles for completed */}
              {stage.status === "completed" && (
                <>
                  {[...Array(4)].map((_, i) => (
                    <Sparkles
                      key={i}
                      className="absolute w-3 h-3 text-yellow-300/80 sparkle-orbit"
                      style={{
                        animationDelay: `${i * 0.5}s`,
                      }}
                    />
                  ))}
                </>
              )}
              
              {/* Pulse rings for current */}
              {stage.status === "current" && (
                <>
                  <div className="absolute inset-0 rounded-full current-ring-1" />
                  <div className="absolute -inset-2 rounded-full current-ring-2" />
                  <div className="absolute -inset-4 rounded-full current-ring-3" />
                </>
              )}

              {/* Fog overlay for locked */}
              {stage.status === "locked" && (
                <div className="absolute inset-0 rounded-full locked-fog" />
              )}
            </button>

            {/* Category label */}
            <div 
              className={cn(
                "absolute -bottom-5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-bold whitespace-nowrap",
                stage.status === "completed" && "bg-success/20 text-success",
                stage.status === "current" && "bg-primary/20 text-primary",
                stage.status === "locked" && "bg-muted/80 text-muted-foreground/60"
              )}
            >
              {config.label}
            </div>
          </div>
        );
      })}

      {/* === SELECTED STAGE POPUP === */}
      {selectedStage && (
        <div 
          className="absolute z-40 popup-3d"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="w-80 p-6 rounded-3xl popup-card">
            <div className="flex items-start justify-between gap-2 mb-4">
              <span className={cn(
                "px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5",
                `bg-${categoryConfig[selectedStage.category].color}/20 text-${categoryConfig[selectedStage.category].color}`
              )}>
                {(() => {
                  const IconComponent = categoryConfig[selectedStage.category].icon;
                  return <IconComponent className="w-3.5 h-3.5" />;
                })()}
                {categoryConfig[selectedStage.category].label}
              </span>
              <span className="xp-badge text-xs px-3 py-1.5 rounded-full">
                +{selectedStage.xp} XP
              </span>
            </div>

            <h4 className="font-bold text-xl text-foreground mb-2">{selectedStage.title}</h4>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{selectedStage.description}</p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5 py-3 px-4 rounded-xl bg-muted/30">
              <span className="flex items-center gap-1.5">
                <span className="text-base">⏱</span>
                {selectedStage.duration}
              </span>
              {selectedStage.reward && (
                <span className="flex items-center gap-1.5 text-accent">
                  <Gift className="w-3.5 h-3.5" />
                  {selectedStage.reward}
                </span>
              )}
            </div>

            {selectedStage.status === "current" && (
              <button
                onClick={() => handleComplete(selectedStage)}
                className="w-full py-4 rounded-2xl complete-btn font-bold text-sm"
              >
                <span className="flex items-center justify-center gap-2">
                  <Mountain className="w-5 h-5" />
                  Complete This Stage
                </span>
              </button>
            )}

            {selectedStage.status === "completed" && (
              <div className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-success/10 text-success">
                <Check className="w-5 h-5" />
                <span className="font-bold">Stage Conquered!</span>
              </div>
            )}

            <button
              onClick={() => setSelectedStage(null)}
              className="mt-3 w-full py-3 rounded-xl text-muted-foreground text-sm font-medium hover:bg-muted/50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* === CELEBRATION OVERLAY === */}
      {celebratingStage && (
        <div className="absolute inset-0 z-50 flex items-center justify-center celebration-overlay">
          <div className="text-center space-y-6">
            {/* Confetti burst */}
            <div className="relative">
              {[...Array(24)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full confetti-piece"
                  style={{
                    background: ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--success))', 'hsl(var(--level))', 'hsl(50 100% 50%)'][i % 5],
                    left: '50%',
                    top: '50%',
                    animationDelay: `${i * 0.04}s`,
                  }}
                />
              ))}
              <div className="w-32 h-32 rounded-full trophy-container flex items-center justify-center">
                <Trophy className="w-16 h-16 text-white drop-shadow-lg" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-4xl font-bold celebration-text">Stage Complete!</h3>
              <p className="text-xl text-muted-foreground">
                +{stages.find(s => s.id === celebratingStage)?.xp} XP earned
              </p>
            </div>
            
            {showUnlockAnimation && (
              <div className="unlock-notification">
                <div className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-card/90 backdrop-blur-md border border-primary/30">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-bold text-lg text-primary">Next Stage Unlocked!</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* === BASE CAMP MARKER === */}
      <div 
        className="absolute z-20"
        style={{ left: '50%', bottom: '3%', transform: 'translateX(-50%)' }}
      >
        <div className="px-5 py-2.5 rounded-full base-camp-badge">
          <span className="text-sm font-bold flex items-center gap-2">
            <span className="text-lg">🏕️</span>
            Base Camp
          </span>
        </div>
      </div>
    </div>
  );
}
