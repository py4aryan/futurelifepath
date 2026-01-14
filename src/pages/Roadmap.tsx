import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RoadmapTimeline } from "@/components/RoadmapTimeline";
import { 
  ArrowLeft,
  Lock,
  Sparkles
} from "lucide-react";

const roadmapItems = [
  {
    id: "1",
    title: "Complete Online Leadership Course",
    description: "Take a comprehensive course on engineering leadership fundamentals",
    duration: "Month 1-2",
    category: "skill" as const,
    completed: true,
  },
  {
    id: "2",
    title: "Build Daily Reading Habit",
    description: "Read 30 minutes of leadership and management books daily",
    duration: "Month 1-3",
    category: "habit" as const,
    completed: true,
  },
  {
    id: "3",
    title: "Lead Your First Project",
    description: "Volunteer to lead a small team project at your current role",
    duration: "Month 3-6",
    category: "milestone" as const,
    completed: false,
  },
  {
    id: "4",
    title: "Earn Management Certification",
    description: "Complete a recognized management certification program",
    duration: "Month 6-9",
    category: "academic" as const,
    completed: false,
  },
  {
    id: "5",
    title: "Develop 1:1 Coaching Skills",
    description: "Practice giving feedback and mentoring junior team members",
    duration: "Month 6-12",
    category: "skill" as const,
    locked: true,
  },
  {
    id: "6",
    title: "Apply for Team Lead Positions",
    description: "Start applying for engineering manager or team lead roles",
    duration: "Month 12-18",
    category: "milestone" as const,
    locked: true,
  },
];

export default function Roadmap() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 h-16">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-semibold">Software Engineering Lead</h1>
              <p className="text-sm text-muted-foreground">Your personalized roadmap</p>
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
                <p className="text-sm text-muted-foreground">Your Progress</p>
                <p className="text-3xl font-bold">33%</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-gradient-primary rounded-full" />
                </div>
                <span className="text-sm text-muted-foreground">2 of 6 complete</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <RoadmapTimeline items={roadmapItems} />

          {/* Unlock CTA */}
          <div className="p-6 rounded-2xl bg-gradient-card border border-primary/20 text-center space-y-4 animate-fade-in">
            <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Unlock Your Complete Roadmap</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Get access to all steps, resources, and personalized guidance
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
