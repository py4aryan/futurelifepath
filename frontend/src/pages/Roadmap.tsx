import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MountainMap, MountainStage } from "@/components/MountainMap";
import { LogoHomeButton } from "@/components/LogoHomeButton";
import { Lock, Sparkles, Trophy, Star } from "lucide-react";
import { roadmapsAPI } from "@/lib/api";

export default function Roadmap() {
  const navigate = useNavigate();
  const [stages, setStages] = useState<MountainStage[]>([]);
  const [roadmapId, setRoadmapId] = useState<string | null>(null);
  const [roadmapTitle, setRoadmapTitle] = useState("Your Skills Mountain");
  const [loading, setLoading] = useState(true);

  // ── Load active roadmap on mount ──────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        const data = await roadmapsAPI.getActive();
        if (data.roadmap) {
          setRoadmapId(data.roadmap._id);
          setRoadmapTitle(data.roadmap.title);
          setStages(
            data.roadmap.stages.map((s: any) => ({
              id: s._id,
              title: s.title,
              description: s.description,
              duration: s.duration,
              xp: s.xp,
              category: s.category,
              status: s.status,
              reward: s.reward,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to load roadmap:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ── Complete a stage ──────────────────────────────────────────────────────
  const handleStageComplete = async (completedStage: MountainStage) => {
    if (!roadmapId) return;
    try {
      const data = await roadmapsAPI.completeStage(roadmapId, completedStage.id);
      setStages(
        data.roadmap.stages.map((s: any) => ({
          id: s._id,
          title: s.title,
          description: s.description,
          duration: s.duration,
          xp: s.xp,
          category: s.category,
          status: s.status,
          reward: s.reward,
        }))
      );
    } catch (err) {
      console.error("Failed to complete stage:", err);
    }
  };

  const completedCount = stages.filter((s) => s.status === "completed").length;
  const totalXP = stages
    .filter((s) => s.status === "completed")
    .reduce((sum, s) => sum + s.xp, 0);
  const progressPercent =
    stages.length > 0 ? Math.round((completedCount / stages.length) * 100) : 0;

  // ── Loading state ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
          <p className="text-muted-foreground">Loading your mountain...</p>
        </div>
      </div>
    );
  }

  // ── No roadmap yet ────────────────────────────────────────────────────────
  if (!roadmapId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 max-w-sm mx-auto px-4">
          <div className="text-5xl">🏔️</div>
          <h2 className="text-xl font-display font-bold">No Roadmap Yet</h2>
          <p className="text-muted-foreground text-sm">
            Complete onboarding to generate your personalized Skills Mountain.
          </p>
          <Button variant="hero" onClick={() => navigate("/onboarding")}>
            <Sparkles className="w-4 h-4" />
            Build My Mountain
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 h-16">
            <LogoHomeButton />
            <div className="flex-1 ml-2">
              <h1 className="font-semibold">{roadmapTitle}</h1>
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
          <MountainMap stages={stages} onStageComplete={handleStageComplete} />

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