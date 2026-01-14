import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DailySkillCard, DailySkill } from "@/components/DailySkillCard";
import { StreakCounter, XPCounter } from "@/components/StreakCounter";
import { RewardCard } from "@/components/RewardCard";
import {
  Home,
  Mountain,
  Map,
  BarChart3,
  User,
  Menu,
  X,
  Gift,
  ChevronRight,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

const initialSkills: DailySkill[] = [
  {
    id: "1",
    title: "Morning Intention Setting",
    description: "Write down your top 3 priorities for today and visualize completing them successfully.",
    type: "habit",
    duration: "5 min",
    xp: 30,
    completed: false,
  },
  {
    id: "2",
    title: "Deep Work Session",
    description: "Focus on your most important task for 25 minutes without distractions. Use the Pomodoro technique.",
    type: "main",
    duration: "25 min",
    xp: 100,
    completed: false,
  },
  {
    id: "3",
    title: "Learn a New Concept",
    description: "Read one article or watch one video about a skill you're developing. Take notes.",
    type: "challenge",
    duration: "15 min",
    xp: 50,
    optional: true,
    completed: false,
  },
];

const navItems = [
  { icon: Home, label: "Today", path: "/dashboard" },
  { icon: Mountain, label: "Mountain", path: "/roadmap" },
  { icon: BarChart3, label: "Progress", path: "/progress" },
  { icon: User, label: "Account", path: "/account" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [skills, setSkills] = useState<DailySkill[]>(initialSkills);
  const [xp, setXp] = useState(420);
  const [streak, setStreak] = useState(12);
  const [showReward, setShowReward] = useState(false);

  const completedCount = skills.filter((s) => s.completed).length;
  const totalRequired = skills.filter((s) => !s.optional).length;
  const allRequiredComplete = skills.filter((s) => !s.optional).every((s) => s.completed);

  const handleComplete = (skill: DailySkill) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === skill.id ? { ...s, completed: true } : s))
    );
    setXp((prev) => prev + skill.xp);

    // Check if all required skills are complete
    const updatedSkills = skills.map((s) =>
      s.id === skill.id ? { ...s, completed: true } : s
    );
    const allDone = updatedSkills.filter((s) => !s.optional).every((s) => s.completed);
    if (allDone) {
      setTimeout(() => setShowReward(true), 600);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Mountain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg">LifePath</span>
            </div>

            {/* Stats */}
            <div className="hidden sm:flex items-center gap-4">
              <StreakCounter days={streak} />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className={cn(
                    "gap-2",
                    item.path === "/dashboard" && "bg-secondary text-secondary-foreground"
                  )}
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background animate-fade-in">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2",
                    item.path === "/dashboard" && "bg-secondary text-secondary-foreground"
                  )}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4 animate-slide-up">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold">
                  Today's Skills
                </h1>
                <p className="text-muted-foreground">
                  Complete your daily skills to keep climbing
                </p>
              </div>
              <div className="sm:hidden">
                <StreakCounter days={streak} />
              </div>
            </div>

            {/* XP Progress */}
            <XPCounter xp={xp} level={7} nextLevelXp={500} />
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border animate-fade-in">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Daily Progress</span>
                <span className="text-sm text-muted-foreground">
                  {completedCount}/{skills.length} completed
                </span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                  style={{ width: `${(completedCount / skills.length) * 100}%` }}
                />
              </div>
            </div>
            {allRequiredComplete && (
              <div className="flex items-center gap-1 text-success font-semibold text-sm animate-bounce-in">
                <Gift className="w-5 h-5" />
                Reward!
              </div>
            )}
          </div>

          {/* Skills List */}
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div
                key={skill.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <DailySkillCard skill={skill} onComplete={handleComplete} />
              </div>
            ))}
          </div>

          {/* Reward card (shown when all required complete) */}
          {showReward && (
            <div className="animate-bounce-in">
              <RewardCard
                title="30 Minutes Screen Time"
                description="You've earned 30 minutes of entertainment time. Use it wisely!"
                unlocked={true}
                type="access"
                onClaim={() => setShowReward(false)}
              />
            </div>
          )}

          {/* Mountain CTA */}
          <button
            onClick={() => navigate("/roadmap")}
            className="w-full p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 flex items-center gap-4 hover:border-primary/40 transition-colors group"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-mountain flex items-center justify-center">
              <Mountain className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold">View Your Skills Mountain</p>
              <p className="text-sm text-muted-foreground">
                See your full journey and upcoming checkpoints
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Future You message */}
          <div className="p-4 rounded-2xl bg-card border text-center animate-fade-in">
            <p className="text-sm text-muted-foreground mb-1">Message from Future You</p>
            <p className="font-medium italic">
              "Every skill you complete today brings you closer to the person you're becoming. Keep climbing!"
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}