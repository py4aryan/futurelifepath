import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { XPCounter, StatsBadge } from "@/components/StreakCounter";
import { LogoHomeButton } from "@/components/LogoHomeButton";
import { Home, Mountain, BarChart3, User, Flame, Trophy, Zap, Target, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const weeklyData = [
  { day: "Mon", completed: 3, total: 3 },
  { day: "Tue", completed: 3, total: 3 },
  { day: "Wed", completed: 2, total: 3 },
  { day: "Thu", completed: 3, total: 3 },
  { day: "Fri", completed: 3, total: 3 },
  { day: "Sat", completed: 1, total: 3 },
  { day: "Sun", completed: 0, total: 3 },
];

const achievements = [
  { title: "First Summit", description: "Complete your first checkpoint", unlocked: true, icon: Mountain },
  { title: "Week Warrior", description: "7-day streak", unlocked: true, icon: Flame },
  { title: "Skill Master", description: "Complete 50 skills", unlocked: false, icon: Zap },
  { title: "Peak Performer", description: "Reach level 10", unlocked: false, icon: Trophy },
];

const navItems = [
  { icon: Home, label: "Today", path: "/dashboard" },
  { icon: Mountain, label: "Mountain", path: "/roadmap" },
  { icon: BarChart3, label: "Progress", path: "/progress" },
  { icon: User, label: "Account", path: "/account" },
];

export default function Progress() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <LogoHomeButton />
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Button key={item.label} variant="ghost" className={cn("gap-2", item.path === "/progress" && "bg-secondary text-secondary-foreground")} onClick={() => navigate(item.path)}>
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
          <div className="animate-slide-up">
            <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">Your Progress</h1>
            <p className="text-muted-foreground">Track your climb to the summit</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
            <StatsBadge label="Current Streak" value="12 days" icon={<Flame className="w-5 h-5" />} variant="streak" />
            <StatsBadge label="Total XP" value="2,450" icon={<Zap className="w-5 h-5" />} variant="xp" />
            <StatsBadge label="Level" value="7" icon={<Trophy className="w-5 h-5" />} variant="level" />
            <StatsBadge label="Skills Done" value="34" icon={<Target className="w-5 h-5" />} />
          </div>

          {/* XP Progress */}
          <div className="p-4 rounded-2xl bg-card border">
            <XPCounter xp={420} level={7} nextLevelXp={500} />
          </div>

          {/* Weekly */}
          <div className="p-4 rounded-2xl bg-card border space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold">This Week</h3>
              <span className="text-sm text-muted-foreground flex items-center gap-1"><TrendingUp className="w-4 h-4 text-success" />85% completion</span>
            </div>
            <div className="flex gap-2">
              {weeklyData.map((d) => (
                <div key={d.day} className="flex-1 text-center">
                  <div className="h-20 bg-muted rounded-lg overflow-hidden flex flex-col-reverse">
                    <div className="bg-gradient-primary transition-all" style={{ height: `${(d.completed / d.total) * 100}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 block">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold">Achievements</h3>
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((a) => (
                <div key={a.title} className={cn("p-4 rounded-xl border flex items-center gap-3", a.unlocked ? "bg-card" : "bg-muted/50 opacity-60")}>
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", a.unlocked ? "bg-gradient-xp" : "bg-muted")}>
                    <a.icon className={cn("w-5 h-5", a.unlocked ? "text-xp-foreground" : "text-muted-foreground")} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}