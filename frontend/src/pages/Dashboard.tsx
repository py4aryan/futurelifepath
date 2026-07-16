import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DailySkillCard, DailySkill } from "@/components/DailySkillCard";
import { StreakCounter, XPCounter } from "@/components/StreakCounter";
import { RewardCard } from "@/components/RewardCard";
import { CustomSkillModal } from "@/components/CustomSkillModal";
import { LogoHomeButton } from "@/components/LogoHomeButton";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { skillsAPI, authAPI } from "@/lib/api";

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
  const [skills, setSkills] = useState<DailySkill[]>([]);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [nextLevelXp, setNextLevelXp] = useState(1000);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showReward, setShowReward] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [celebrateMessage, setCelebrateMessage] = useState<string | null>(null);

  // ── Load today's skills + user stats on mount ─────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        const [skillsData, meData] = await Promise.all([
          skillsAPI.getToday(),
          authAPI.getMe(),
        ]);

        setSkills(
          skillsData.skills.map((s: any) => ({
            id: s._id,
            title: s.title,
            description: s.description,
            type: s.type,
            duration: s.duration,
            xp: s.xp,
            completed: s.completed,
            optional: s.optional,
          }))
        );

        const u = meData.user;
        setXp(u.xp);
        setLevel(u.level);
        setNextLevelXp(u.xpToNextLevel);
        setStreak(u.streak);
      } catch (err) {
        console.error("Failed to load dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const completedCount = skills.filter((s) => s.completed).length;
  const allRequiredComplete = skills.filter((s) => !s.optional).every((s) => s.completed);

  // ── Complete a skill ──────────────────────────────────────────────────────
  const handleComplete = async (skill: DailySkill) => {
    try {
      const data = await skillsAPI.complete(skill.id);

      // Update skill list
      setSkills((prev) =>
        prev.map((s) => (s.id === skill.id ? { ...s, completed: true } : s))
      );

      // Update XP and streak from server response
      setXp(data.user.xp);
      setLevel(data.user.level);
      setStreak(data.user.streak);

      // Show fun celebration message
      const randomMessage = funMessages[Math.floor(Math.random() * funMessages.length)];
      setCelebrateMessage(randomMessage);
      setTimeout(() => setCelebrateMessage(null), 2000);

      // Show reward if all required skills are now done
      const updatedSkills = skills.map((s) =>
        s.id === skill.id ? { ...s, completed: true } : s
      );
      const allDone = updatedSkills.filter((s) => !s.optional).every((s) => s.completed);
      if (allDone) setTimeout(() => setShowReward(true), 600);
    } catch (err) {
      console.error("Failed to complete skill:", err);
    }
  };

  // ── Add a custom skill ────────────────────────────────────────────────────
  const handleAddCustomSkill = async (newSkill: {
    title: string;
    description: string;
    type: "main" | "habit" | "challenge";
    duration: string;
    xp: number;
  }) => {
    try {
      const data = await skillsAPI.create({ ...newSkill, optional: true });
      const s = data.skill;
      setSkills((prev) => [
        ...prev,
        {
          id: s._id,
          title: s.title,
          description: s.description,
          type: s.type,
          duration: s.duration,
          xp: s.xp,
          completed: false,
          optional: true,
        },
      ]);
    } catch (err) {
      console.error("Failed to create custom skill:", err);
    }
  };

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
          <p className="text-muted-foreground">Loading your skills...</p>
        </div>
      </div>
    );
  }

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
            <LogoHomeButton />

            {/* Streak stat */}
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

            {/* XP Progress — driven by real user data */}
            <XPCounter xp={xp} level={level} nextLevelXp={nextLevelXp} />
          </div>

          {/* Daily progress bar */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 border-2 border-primary/20 animate-fade-in">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold flex items-center gap-2">
                  Daily Progress
                  {completedCount === skills.length && skills.length > 0 && (
                    <span className="animate-bounce">🎉</span>
                  )}
                </span>
                <span className="text-sm text-muted-foreground">
                  {completedCount}/{skills.length} completed
                </span>
              </div>
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-primary rounded-full transition-all duration-500 relative"
                  style={{ width: `${skills.length > 0 ? (completedCount / skills.length) * 100 : 0}%` }}
                >
                  {completedCount > 0 && (
                    <span className="absolute right-1 top-1/2 -translate-y-1/2 text-xs">✨</span>
                  )}
                </div>
              </div>
            </div>
            {allRequiredComplete && skills.length > 0 && (
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
            {skills.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg font-medium">No skills for today yet 🌅</p>
                <p className="text-sm mt-1">Add a custom skill to get started!</p>
              </div>
            ) : (
              skills.map((skill, index) => (
                <div
                  key={skill.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <DailySkillCard skill={skill} onComplete={handleComplete} />
                </div>
              ))
            )}
          </div>

          {/* Reward card */}
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

          {/* Mountain CTA */}
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

          {/* Future You message */}
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