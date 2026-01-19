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
  Calendar,
  Brain,
  Heart,
  Rocket,
} from "lucide-react";

const features = [
  {
    icon: Mountain,
    emoji: "🏔️",
    title: "Skills Mountain",
    description: "Visualize your journey as a mountain. Each step brings you closer to your peak!",
  },
  {
    icon: Zap,
    emoji: "⚡",
    title: "Daily Skills",
    description: "Complete bite-sized challenges that build real skills in just 15 minutes.",
  },
  {
    icon: Trophy,
    emoji: "🏆",
    title: "XP & Rewards",
    description: "Earn XP, unlock achievements, and get real rewards for your progress!",
  },
  {
    icon: Calendar,
    emoji: "📅",
    title: "Smart Schedule",
    description: "Plan your skills with an intelligent calendar that adapts to your life.",
  },
];

const services = [
  { emoji: "🧠", title: "AI Life Coach", desc: "Personalized guidance" },
  { emoji: "🎯", title: "Goal Tracking", desc: "SMART goal framework" },
  { emoji: "💪", title: "Habit Builder", desc: "Build lasting habits" },
  { emoji: "💼", title: "Career Optimizer", desc: "Professional growth" },
  { emoji: "📚", title: "Learning Paths", desc: "Curated courses" },
  { emoji: "🔮", title: "Future Simulation", desc: "See your potential" },
];

const testimonials = [
  {
    quote: "I've tried every productivity app. This is the first one that feels like a game I actually want to play.",
    author: "Alex T.",
    role: "Software Developer",
    streak: 47,
    avatar: "👨‍💻",
  },
  {
    quote: "My 90-day streak changed my life. I learned coding, built a side project, and landed a promotion.",
    author: "Sarah K.",
    role: "Product Manager",
    streak: 90,
    avatar: "👩‍💼",
  },
  {
    quote: "The daily skills are so well designed. 15 minutes a day and I'm actually seeing real progress.",
    author: "Marcus J.",
    role: "Entrepreneur",
    streak: 63,
    avatar: "🧑‍🚀",
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
              <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center animate-pulse-slow">
                <Mountain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg">LifePath</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate("/services")}>
                Services
              </Button>
              <Button variant="ghost" onClick={() => navigate("/pricing")}>
                Pricing
              </Button>
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="hidden sm:flex" onClick={() => navigate("/dashboard")}>
                Log In
              </Button>
              <Button variant="hero" onClick={() => navigate("/onboarding")}>
                Start Free 🚀
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-sm font-semibold animate-fade-in">
              <span className="text-xl">🎮</span>
              Turn growth into a game you'll love
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
              Climb your personal mountain one skill at a time. 🏔️
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
              style={{ animationDelay: "200ms" }}
            >
              <Button
                variant="hero"
                size="xl"
                onClick={() => navigate("/onboarding")}
                className="gap-2 group text-lg"
              >
                Start My Climb — It's Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="heroOutline" size="xl" className="gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Social proof with fun elements */}
            <div
              className="flex flex-wrap items-center justify-center gap-6 pt-4 animate-fade-in"
              style={{ animationDelay: "300ms" }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["🧑‍💻", "👩‍🎨", "👨‍🔬", "👩‍🚀"].map((emoji, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-background flex items-center justify-center text-lg"
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
                <span className="text-sm font-medium">50,000+ climbers</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-xp text-xp" />
                ))}
                <span className="font-medium ml-1">4.9 rating</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success font-medium text-sm">
                <CheckCircle2 className="w-4 h-4" />
                7-day free trial
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <span className="text-5xl">🎯</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              How The Game Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Four simple mechanics that make personal growth addictive (in a good way!)
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="relative p-6 rounded-3xl bg-card border-2 hover-lift animate-fade-in group hover:border-primary/50 transition-colors"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -top-4 -left-2 w-10 h-10 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center text-lg font-bold shadow-lg">
                  {index + 1}
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 text-4xl group-hover:scale-110 transition-transform">
                  {feature.emoji}
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <span className="text-5xl">🛠️</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Everything You Need
            </h2>
            <p className="text-muted-foreground">
              A complete toolkit for life optimization
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto mb-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="p-4 rounded-2xl bg-card border text-center hover-lift cursor-pointer animate-fade-in group"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => navigate("/services")}
              >
                <span className="text-4xl block mb-2 group-hover:scale-110 transition-transform">{service.emoji}</span>
                <p className="font-semibold text-sm">{service.title}</p>
                <p className="text-xs text-muted-foreground">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" onClick={() => navigate("/services")} className="gap-2">
              Explore All Services
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Daily Skills Preview */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-5xl">⚡</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold">
                  Complete Daily Skills.<br />
                  <span className="gradient-text">Unlock Your Potential.</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Each day brings new skills to complete. Finish them to earn XP, 
                  maintain your streak, and unlock rewards that keep you motivated.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-card border hover:border-primary/50 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">
                      ⚡
                    </div>
                    <div>
                      <p className="font-semibold">1 Main Skill</p>
                      <p className="text-sm text-muted-foreground">Core skill building (10-15 min)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-card border hover:border-accent/50 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-2xl">
                      🔄
                    </div>
                    <div>
                      <p className="font-semibold">1 Habit Builder</p>
                      <p className="text-sm text-muted-foreground">Reinforce daily habits (5 min)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-card border hover:border-level/50 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-level/10 flex items-center justify-center text-2xl">
                      🏆
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
                <div className="relative p-8 rounded-3xl bg-card border-2 shadow-strong">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display font-bold text-xl">Today's Skills ✨</h3>
                    <div className="streak-badge px-3 py-1.5 rounded-full text-sm flex items-center gap-1">
                      <Flame className="w-4 h-4" />
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
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <span className="text-5xl">💬</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Climbers Who Reached Their Peak
            </h2>
            <p className="text-muted-foreground">Real stories from real climbers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.author}
                className="p-6 rounded-3xl bg-card border-2 hover-lift hover:border-primary/30 transition-colors"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div className="streak-badge px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    {testimonial.streak} days
                  </div>
                </div>
                <p className="text-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <span className="text-5xl">💎</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Start free, upgrade when you're ready. No hidden fees, cancel anytime.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="p-6 rounded-2xl bg-card border">
                <p className="font-display font-bold text-xl mb-1">Free</p>
                <p className="text-3xl font-bold mb-4">$0</p>
                <p className="text-sm text-muted-foreground">Perfect for getting started</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  Most Popular
                </div>
                <p className="font-display font-bold text-xl mb-1">Premium</p>
                <p className="text-3xl font-bold mb-4">$12<span className="text-lg font-normal">/mo</span></p>
                <p className="text-sm text-muted-foreground">7-day free trial included</p>
              </div>
              <div className="p-6 rounded-2xl bg-card border">
                <p className="font-display font-bold text-xl mb-1">Lifetime</p>
                <p className="text-3xl font-bold mb-4">$199</p>
                <p className="text-sm text-muted-foreground">One-time, forever access</p>
              </div>
            </div>

            <Button variant="hero" size="lg" onClick={() => navigate("/pricing")} className="gap-2">
              View Full Pricing
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <MountainHero className="absolute bottom-0 left-0 right-0 opacity-30" animated={false} />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <span className="text-6xl animate-float">🚀</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Ready to Start Your Climb?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join 50,000+ climbers who turned their goals into a game.
              Your Skills Mountain awaits. Start free today!
            </p>
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate("/onboarding")}
              className="gap-2 group text-lg"
            >
              Start My Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-sm text-muted-foreground">
              ✨ No credit card required • 7-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Mountain className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-semibold">LifePath</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <button onClick={() => navigate("/services")} className="hover:text-foreground transition-colors">Services</button>
              <button onClick={() => navigate("/pricing")} className="hover:text-foreground transition-colors">Pricing</button>
              <button className="hover:text-foreground transition-colors">Blog</button>
              <button className="hover:text-foreground transition-colors">Support</button>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 LifePath. Made with ❤️ for climbers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}