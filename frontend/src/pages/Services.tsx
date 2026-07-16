import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ServiceCard";
import {
  ArrowLeft,
  Mountain,
  Brain,
  Target,
  Sparkles,
  Users,
  BookOpen,
  Zap,
  Heart,
  Briefcase,
  GraduationCap,
} from "lucide-react";

const services = [
  {
    icon: Mountain,
    emoji: "🏔️",
    title: "Skills Mountain",
    description: "Your gamified journey to skill mastery",
    features: [
      "Personalized skill paths",
      "Daily micro-challenges",
      "XP & level progression",
      "Visual mountain climbing",
    ],
    color: "primary" as const,
    popular: true,
  },
  {
    icon: Brain,
    emoji: "🧠",
    title: "AI Life Coach",
    description: "24/7 personalized guidance and support",
    features: [
      "Smart recommendations",
      "Adaptive difficulty",
      "Weekly insights",
      "Goal optimization",
    ],
    color: "level" as const,
  },
  {
    icon: Target,
    emoji: "🎯",
    title: "Goal Tracking",
    description: "Set, track, and achieve your life goals",
    features: [
      "SMART goal framework",
      "Progress visualization",
      "Milestone celebrations",
      "Accountability partner",
    ],
    color: "accent" as const,
  },
  {
    icon: Heart,
    emoji: "💪",
    title: "Habit Builder",
    description: "Build lasting habits that stick",
    features: [
      "Habit stacking",
      "Streak tracking",
      "Trigger reminders",
      "Science-backed methods",
    ],
    color: "streak" as const,
  },
  {
    icon: Briefcase,
    emoji: "💼",
    title: "Career Optimizer",
    description: "Navigate your professional growth",
    features: [
      "Career path mapping",
      "Skill gap analysis",
      "Interview prep",
      "Networking strategies",
    ],
    color: "success" as const,
  },
  {
    icon: GraduationCap,
    emoji: "📚",
    title: "Learning Paths",
    description: "Curated courses and resources",
    features: [
      "Curated content",
      "Learning streaks",
      "Knowledge checks",
      "Certificate tracking",
    ],
    color: "primary" as const,
  },
];

export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 h-16">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <span className="font-semibold">Our Services</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Everything You Need
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold">
              Services That Transform<br />
              <span className="gradient-text">Your Life Journey</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From daily skills to long-term career planning, we've got every tool you need to optimize your life.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ServiceCard
                  {...service}
                  ctaText="Explore"
                  onCta={() => navigate("/onboarding")}
                />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center p-8 rounded-3xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 animate-fade-in">
            <h2 className="text-2xl font-display font-bold mb-2">
              Ready to Start Your Journey? 🚀
            </h2>
            <p className="text-muted-foreground mb-6">
              Try all services free for 7 days. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button variant="hero" size="lg" onClick={() => navigate("/onboarding")}>
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/pricing")}>
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
