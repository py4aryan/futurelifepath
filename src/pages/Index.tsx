import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MountainHero } from "@/components/MountainHero";
import {
  Sparkles,
  ArrowRight,
  Play,
  Mountain,
  Zap,
  Trophy,
  Flame,
  Gift,
  CheckCircle2,
  Star,
} from "lucide-react";

const features = [
  {
    icon: Mountain,
    title: "Your Skills Mountain",
    description: "Visualize your journey as a mountain you climb, with each step bringing you closer to your peak.",
  },
  {
    icon: Zap,
    title: "Daily Skills",
    description: "Complete bite-sized daily challenges that build real skills and lasting habits in just 15 minutes.",
  },
  {
    icon: Trophy,
    title: "Earn XP & Level Up",
    description: "Gain experience points, unlock achievements, and watch your progress grow every single day.",
  },
  {
    icon: Gift,
    title: "Unlock Rewards",
    description: "Complete skills to unlock rewards, themes, insights, and special access to keep you motivated.",
  },
];

const testimonials = [
  {
    quote: "I've tried every productivity app. This is the first one that feels like a game I actually want to play.",
    author: "Alex T.",
    role: "Software Developer",
    streak: 47,
  },
  {
    quote: "My 90-day streak changed my life. I learned coding, built a side project, and landed a promotion.",
    author: "Sarah K.",
    role: "Product Manager",
    streak: 90,
  },
  {
    quote: "The daily skills are so well designed. 15 minutes a day and I'm actually seeing real progress.",
    author: "Marcus J.",
    role: "Entrepreneur",
    streak: 63,
  },
];

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Mountain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg">LifePath</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
              <Button variant="default" onClick={() => navigate("/onboarding")}>
                Start Free
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 overflow-hidden">
        {/* Mountain hero background */}
        <MountainHero className="absolute top-16 left-0 right-0" />

        <div className="container mx-auto px-4 relative pt-48 pb-20 md:pt-56 md:pb-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold animate-fade-in">
              <Flame className="w-4 h-4" />
              Turn growth into a game
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight animate-slide-up">
              Turn Your Future Into a{" "}
              <span className="gradient-text">Game You Can Win</span>
            </h1>

            <p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up"
              style={{ animationDelay: "100ms" }}
            >
              AI-powered life paths with daily skills, rewards, and real progress. 
              Climb your personal mountain one skill at a time.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
              style={{ animationDelay: "200ms" }}
            >
              <Button
                variant="hero"
                size="xl"
                onClick={() => navigate("/onboarding")}
                className="gap-2 group"
              >
                Start My Climb
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="heroOutline" size="xl" className="gap-2">
                <Play className="w-5 h-5" />
                See How It Works
              </Button>
            </div>

            {/* Social proof */}
            <div
              className="flex flex-wrap items-center justify-center gap-6 pt-4 animate-fade-in"
              style={{ animationDelay: "300ms" }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-primary border-2 border-background"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">10,000+ climbers</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-xp text-xp" />
                ))}
                <span className="text-muted-foreground ml-1">4.9 rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              How The Game Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Four simple mechanics that make personal growth addictive
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="relative p-6 rounded-2xl bg-card border hover-lift animate-fade-in group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Skills Preview */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-display font-bold">
                  Complete Daily Skills.<br />
                  <span className="gradient-text">Unlock Your Potential.</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Each day brings new skills to complete. Finish them to earn XP, 
                  maintain your streak, and unlock rewards that keep you motivated.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-card border">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">1 Main Skill</p>
                      <p className="text-sm text-muted-foreground">Core skill building (10-15 min)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-card border">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Star className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">1 Habit Builder</p>
                      <p className="text-sm text-muted-foreground">Reinforce daily habits (5 min)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-card border">
                    <div className="w-10 h-10 rounded-lg bg-level/10 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-level" />
                    </div>
                    <div>
                      <p className="font-semibold">1 Bonus Challenge</p>
                      <p className="text-sm text-muted-foreground">Optional extra XP (5-10 min)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-reward opacity-20 rounded-3xl blur-3xl" />
                <div className="relative p-8 rounded-3xl bg-card border shadow-strong">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display font-bold text-xl">Today's Skills</h3>
                    <div className="streak-badge px-3 py-1.5 rounded-full text-sm">
                      <Flame className="w-4 h-4 inline mr-1" />
                      12 days
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-success/10 border border-success/20">
                      <CheckCircle2 className="w-6 h-6 text-success" />
                      <span className="flex-1 line-through text-muted-foreground">Morning Journaling</span>
                      <span className="xp-badge text-xs px-2 py-0.5 rounded-full">+50 XP</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/10 border border-primary/20 animate-glow">
                      <div className="w-6 h-6 rounded-full border-2 border-primary" />
                      <span className="flex-1 font-medium">Deep Work Session</span>
                      <span className="xp-badge text-xs px-2 py-0.5 rounded-full">+100 XP</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border">
                      <div className="w-6 h-6 rounded-full border-2 border-muted-foreground" />
                      <span className="flex-1 text-muted-foreground">Evening Reflection</span>
                      <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">+30 XP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Climbers Who Reached Their Peak
            </h2>
            <p className="text-muted-foreground">Real stories from real climbers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.author}
                className="p-6 rounded-2xl bg-card border hover-lift"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="streak-badge px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    {testimonial.streak} days
                  </div>
                </div>
                <p className="text-foreground mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <MountainHero className="absolute bottom-0 left-0 right-0 opacity-30" animated={false} />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Ready to Start Your Climb?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of climbers who turned their goals into a game.
              Your Skills Mountain awaits.
            </p>
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate("/onboarding")}
              className="gap-2 group"
            >
              Start My Climb — It's Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Mountain className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-semibold">LifePath</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 LifePath. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}