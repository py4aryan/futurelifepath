import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MountainMap, MountainStage } from "@/components/MountainMap";
import { LogoHomeButton } from "@/components/LogoHomeButton";
import { 
  Lock,
  Sparkles,
  Trophy,
  Star
} from "lucide-react";
import { useState } from "react";

const initialStages: MountainStage[] = [
  {
    id: "1",
    title: "Complete Online Leadership Course",
    description: "Take a comprehensive course on engineering leadership fundamentals",
    duration: "Month 1-2",
    xp: 500,
    category: "skills",
    status: "completed",
    reward: "Leadership Badge",
  },
  {
    id: "2",
    title: "Build Daily Reading Habit",
    description: "Read 30 minutes of leadership and management books daily",
    duration: "Month 1-3",
    xp: 300,
    category: "habits",
    status: "completed",
    reward: "Book Worm Title",
  },
  {
    id: "3",
    title: "Lead Your First Project",
    description: "Volunteer to lead a small team project at your current role",
    duration: "Month 3-6",
    xp: 750,
    category: "academics",
    status: "current",
    reward: "Project Leader Badge",
  },
  {
    id: "4",
    title: "Earn Management Certification",
    description: "Complete a recognized management certification program",
    duration: "Month 6-9",
    xp: 1000,
    category: "academics",
    status: "locked",
    reward: "Certified Manager",
  },
  {
    id: "5",
    title: "Develop 1:1 Coaching Skills",
    description: "Practice giving feedback and mentoring junior team members",
    duration: "Month 6-12",
    xp: 600,
    category: "mindset",
    status: "locked",
    reward: "Mentor Badge",
  },
  {
    id: "6",
    title: "Apply for Team Lead Positions",
    description: "Start applying for engineering manager or team lead roles",
    duration: "Month 12-18",
    xp: 1500,
    category: "skills",
    status: "locked",
    reward: "Career Climber",
  },
];

export default function Roadmap() {
  const navigate = useNavigate();
  const [stages, setStages] = useState<MountainStage[]>(initialStages);

  const handleStageComplete = (completedStage: MountainStage) => {
    setStages(prev => {
      const newStages = [...prev];
      const currentIndex = newStages.findIndex(s => s.id === completedStage.id);
      
      // Mark current as completed
      newStages[currentIndex] = { ...newStages[currentIndex], status: "completed" };
      
      // Unlock next stage if exists
      if (currentIndex + 1 < newStages.length) {
        newStages[currentIndex + 1] = { ...newStages[currentIndex + 1], status: "current" };
      }
      
      return newStages;
    });
  };

  const completedCount = stages.filter(s => s.status === "completed").length;
  const totalXP = stages.filter(s => s.status === "completed").reduce((sum, s) => sum + s.xp, 0);
  const progressPercent = Math.round((completedCount / stages.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 h-16">
            <LogoHomeButton />
            <div className="flex-1 ml-2">
              <h1 className="font-semibold">Software Engineering Lead</h1>
              <p className="text-sm text-muted-foreground">Your Skills Mountain</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-success/10 text-success text-sm font-semibold">
                <Trophy className="w-4 h-4" />
                {completedCount}/{stages.length}
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full xp-badge text-sm">
                <Star className="w-4 h-4" />
                {totalXP} XP
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Progress Overview */}
          <div className="p-6 rounded-2xl bg-gradient-hero border animate-fade-in">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Mountain Progress</p>
                <p className="text-3xl font-bold gradient-text">{progressPercent}%</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-40 h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-success via-primary to-accent rounded-full transition-all duration-1000"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground font-medium">
                  {completedCount} of {stages.length} stages
                </span>
              </div>
            </div>
          </div>

          {/* Mountain Map */}
          <MountainMap 
            stages={stages} 
            onStageComplete={handleStageComplete}
          />

          {/* Unlock CTA */}
          <div className="p-6 rounded-2xl bg-gradient-card border border-primary/20 text-center space-y-4 animate-fade-in">
            <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Unlock Your Complete Mountain</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Get access to all stages, resources, and personalized guidance
              </p>
            </div>
            <Button variant="hero" onClick={() => navigate("/pricing")}>
              <Sparkles className="w-4 h-4" />
              Unlock Full Access
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
