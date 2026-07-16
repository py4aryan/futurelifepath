import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { XPCounter, StatsBadge } from "@/components/StreakCounter";
import { LogoHomeButton } from "@/components/LogoHomeButton";
import {
  Home, Mountain, BarChart3, User,
  Flame, Trophy, Zap, Target, TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { progressAPI } from "@/lib/api";

const navItems = [
  { icon: Home,     label: "Today",    path: "/dashboard" },
  { icon: Mountain, label: "Mountain", path: "/roadmap"   },
  { icon: BarChart3,label: "Progress", path: "/progress"  },
  { icon: User,     label: "Account",  path: "/account"   },
];

// Map icon string names from the backend to real Lucide components
const iconMap: Record<string, React.ElementType> = {
  Mountain, Flame, Zap, Trophy,
  Award: Trophy,  // fallback
  Star: Zap,      // fallback
  Target,
};

export default function Progress() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [weeklyData, setWeeklyData]   = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [stats, setStats] = useState({
    streak: 0,
    totalXP: 0,
    level: 1,
    xpToNextLevel: 1000,
    totalSkillsCompleted: 0,
    weeklyCompletionRate: 0,
  });

  // ── Load summary + achievements on mount ─────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        const [summaryData, achieveData] = await Promise.all([
          progressAPI.getSummary(),
          progressAPI.getAchievements(),
        ]);

        const s = summaryData.summary;
        setStats({
          streak:                s.streak,
          totalXP:               s.totalXP,
          level:                 s.level,
          xpToNextLevel:         s.xpToNextLevel,
          totalSkillsCompleted:  s.totalSkillsCompleted,
          weeklyCompletionRate:  s.weeklyCompletionRate,
        });
        setWeeklyData(s.weeklyData);
        setAchievements(achieveData.achievements);
      } catch (err) {
        console.error("Failed to load progress:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ── Loading state ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
          <p className="text-muted-foreground">Loading your progress...</p>
        </div>
      </div>
    );
  }

  // XP within the current level (resets each level)
  const xpInCurrentLevel = stats.totalXP % stats.xpToNextLevel;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <LogoHomeButton />
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className={cn("gap-2", item.path === "/progress" && "bg-secondary text-secondary-foreground")}
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-2xl mx-auto space-y-8">

          {/* Title */}
          <div className="animate-slide-up">
            <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">Your Progress</h1>
            <p className="text-muted-foreground">Track your climb to the summit</p>
          </div>

          {/* Stats badges — all real data */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
            <StatsBadge
              label="Current Streak"
              value={`${stats.streak} days`}
              icon={<Flame className="w-5 h-5" />}
              variant="streak"
            />
            <StatsBadge
              label="Total XP"
              value={stats.totalXP.toLocaleString()}
              icon={<Zap className="w-5 h-5" />}
              variant="xp"
            />
            <StatsBadge
              label="Level"
              value={String(stats.level)}
              icon={<Trophy className="w-5 h-5" />}
              variant="level"
            />
            <StatsBadge
              label="Skills Done"
              value={String(stats.totalSkillsCompleted)}
              icon={<Target className="w-5 h-5" />}
            />
          </div>

          {/* XP Progress bar */}
          <div className="p-4 rounded-2xl bg-card border">
            <XPCounter
              xp={xpInCurrentLevel}
              level={stats.level}
              nextLevelXp={stats.xpToNextLevel}
            />
          </div>

          {/* Weekly chart */}
          <div className="p-4 rounded-2xl bg-card border space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold">This Week</h3>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-success" />
                {stats.weeklyCompletionRate}% completion
              </span>
            </div>
            <div className="flex gap-2">
              {weeklyData.map((d) => (
                <div key={d.day} className="flex-1 text-center">
                  <div className="h-20 bg-muted rounded-lg overflow-hidden flex flex-col-reverse">
                    <div
                      className="bg-gradient-primary transition-all duration-500"
                      style={{ height: `${d.total > 0 ? (d.completed / d.total) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 block">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements — dynamically unlocked from backend */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold">Achievements</h3>
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((a) => {
                const IconComponent = iconMap[a.icon] ?? Trophy;
                return (
                  <div
                    key={a.id}
                    className={cn(
                      "p-4 rounded-xl border flex items-center gap-3",
                      a.unlocked ? "bg-card" : "bg-muted/50 opacity-60"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      a.unlocked ? "bg-gradient-xp" : "bg-muted"
                    )}>
                      <IconComponent className={cn(
                        "w-5 h-5",
                        a.unlocked ? "text-xp-foreground" : "text-muted-foreground"
                      )} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{a.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}