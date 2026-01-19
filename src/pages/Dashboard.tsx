import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DailySkillCard, DailySkill } from "@/components/DailySkillCard";
import { StreakCounter, XPCounter } from "@/components/StreakCounter";
import { RewardCard } from "@/components/RewardCard";
import { CustomSkillModal } from "@/components/CustomSkillModal";
import {
  Home,
  Mountain,
  Calendar,
  BarChart3,
  User,
  Menu,
  X,
  Gift,
  ChevronRight,
  Plus,
  Sparkles,
  
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
  { icon: Calendar, label: "Schedule", path: "/schedule" },
  { icon: BarChart3, label: "Progress", path: "/progress" },
  { icon: User, label: "Account", path: "/account" },
];

const funMessages = [
  "You're crushing it! 💪",
  "Keep climbing! 🏔️",
  "You're on fire! 🔥",
  "Unstoppable! 🚀",
  "Legend in the making! ⭐",
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [skills, setSkills] = useState<DailySkill[]>(initialSkills);
  const [xp, setXp] = useState(420);
  const [streak, setStreak] = useState(12);
  const [showReward, setShowReward] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [celebrateMessage, setCelebrateMessage] = useState<string | null>(null);

  const completedCount = skills.filter((s) => s.completed).length;
  const totalRequired = skills.filter((s) => !s.optional).length;
  const allRequiredComplete = skills.filter((s) => !s.optional).every((s) => s.completed);

  const handleComplete = (skill: DailySkill) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === skill.id ? { ...s, completed: true } : s))
    );
    setXp((prev) => prev + skill.xp);

    // Show fun message
    const randomMessage = funMessages[Math.floor(Math.random() * funMessages.length)];
    setCelebrateMessage(randomMessage);
    setTimeout(() => setCelebrateMessage(null), 2000);

    // Check if all required skills are complete
    const updatedSkills = skills.map((s) =>
      s.id === skill.id ? { ...s, completed: true } : s
    );
    const allDone = updatedSkills.filter((s) => !s.optional).every((s) => s.completed);
    if (allDone) {
      setTimeout(() => setShowReward(true), 600);
    }
  };

  const handleAddCustomSkill = (newSkill: {
    title: string;
    description: string;
    type: "main" | "habit" | "challenge";
    duration: string;
    xp: number;
  }) => {
    const skill: DailySkill = {
      id: `custom-${Date.now()}`,
      ...newSkill,
      completed: false,
      optional: true,
    };
    setSkills((prev) => [...prev, skill]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Celebration Overlay */}
      {celebrateMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="text-4xl font-display font-bold text-primary animate-bounce-in bg-card/90 backdrop-blur px-8 py-4 rounded-2xl shadow-lg border-2 border-primary/30">
            {celebrateMessage}
          </div>
        </div>
      )}

      {/* Custom Skill Modal */}
      <CustomSkillModal
        isOpen={showCustomModal}
        onClose={() => setShowCustomModal(false)}
        onAdd={handleAddCustomSkill}
      />

      {/* Top Navigation */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center animate-pulse-slow">
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
          {/* Header with Fun Emoji */}
          <div className="space-y-4 animate-slide-up">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold flex items-center gap-2">
                  Today's Skills <span className="text-3xl animate-float">🎯</span>
                </h1>
                <p className="text-muted-foreground">
                  Complete your skills to keep the streak alive!
                </p>
              </div>
              <div className="sm:hidden">
                <StreakCounter days={streak} />
              </div>
            </div>

            {/* XP Progress */}
            <XPCounter xp={xp} level={7} nextLevelXp={500} />
          </div>

          {/* Progress indicator with Emoji */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 border-2 border-primary/20 animate-fade-in">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold flex items-center gap-2">
                  Daily Progress 
                  {completedCount === skills.length && <span className="animate-bounce">🎉</span>}
                </span>
                <span className="text-sm text-muted-foreground">
                  {completedCount}/{skills.length} completed
                </span>
              </div>
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-primary rounded-full transition-all duration-500 relative"
                  style={{ width: `${(completedCount / skills.length) * 100}%` }}
                >
                  {completedCount > 0 && (
                    <span className="absolute right-1 top-1/2 -translate-y-1/2 text-xs">✨</span>
                  )}
                </div>
              </div>
            </div>
            {allRequiredComplete && (
              <div className="flex items-center gap-1 text-success font-semibold text-sm animate-bounce-in">
                <Gift className="w-5 h-5" />
                Reward!
              </div>
            )}
          </div>

          {/* Add Custom Skill Button */}
          <Button
            variant="outline"
            className="w-full border-dashed border-2 gap-2 py-6 hover:bg-primary/5 hover:border-primary transition-all"
            onClick={() => setShowCustomModal(true)}
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">Add Custom Skill</span>
            <span className="text-muted-foreground text-sm ml-2">Create your own challenge!</span>
          </Button>

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
                title="30 Minutes Screen Time 📱"
                description="You've earned 30 minutes of entertainment time. You deserve it!"
                unlocked={true}
                type="access"
                onClaim={() => setShowReward(false)}
              />
            </div>
          )}

          {/* Mountain CTA with more playful design */}
          <button
            onClick={() => navigate("/roadmap")}
            className="w-full p-5 rounded-3xl bg-gradient-to-r from-mountain-base/20 via-mountain-mid/20 to-primary/20 border-2 border-mountain-mid/30 flex items-center gap-4 hover:border-primary/50 transition-all group hover-lift"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-mountain flex items-center justify-center text-3xl">
              🏔️
            </div>
            <div className="flex-1 text-left">
              <p className="font-display font-bold text-lg">View Your Skills Mountain</p>
              <p className="text-sm text-muted-foreground">
                See your journey & unlock new checkpoints!
              </p>
            </div>
            <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Quick Schedule Peek */}
          <button
            onClick={() => navigate("/schedule")}
            className="w-full p-4 rounded-2xl bg-card border flex items-center gap-4 hover:border-primary/50 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-2xl">
              📅
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold">Schedule & Calendar</p>
              <p className="text-sm text-muted-foreground">Plan upcoming skills</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Future You message with fun styling */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-level/10 to-primary/10 border-2 border-level/20 text-center animate-fade-in">
            <span className="text-3xl mb-2 block">🔮</span>
            <p className="text-sm text-muted-foreground mb-1">Message from Future You</p>
            <p className="font-medium italic text-lg">
              "Every skill you complete today brings you closer to the person you're becoming. Keep climbing!"
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
