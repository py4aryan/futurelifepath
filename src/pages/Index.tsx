import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Target, 
  Brain, 
  Map as MapIcon,
  TrendingUp,
  CheckCircle2
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Define Your Goals",
    description: "Share your aspirations, interests, and current situation with our intelligent system.",
  },
  {
    icon: Brain,
    title: "AI Simulation",
    description: "Our AI analyzes thousands of paths and simulates multiple future scenarios for you.",
  },
  {
    icon: MapIcon,
    title: "Get Your Roadmap",
    description: "Receive a personalized, step-by-step plan optimized for your unique profile.",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "Follow your roadmap, mark milestones, and watch your future unfold.",
  },
];

const testimonials = [
  {
    quote: "This app gave me the clarity I needed. I went from feeling lost to having a concrete 2-year plan.",
    author: "Sarah K.",
    role: "Product Designer",
  },
  {
    quote: "The AI recommended a path I never considered. Now I'm 6 months in and couldn't be happier.",
    author: "Michael R.",
    role: "Career Changer",
  },
  {
    quote: "Finally, an app that doesn't just tell you to 'follow your passion' but gives you actual steps.",
    author: "Priya M.",
    role: "Graduate Student",
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
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">LifePath AI</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
              <Button variant="default" onClick={() => navigate("/onboarding")}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-path opacity-50 blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in"
            >
              <Sparkles className="w-4 h-4" />
              AI-Powered Life Planning
            </div>
            
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-slide-up"
            >
              Stop Guessing Your Future.{" "}
              <span className="gradient-text">Optimize It.</span>
            </h1>
            
            <p 
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up"
              style={{ animationDelay: "100ms" }}
            >
              AI-powered life planning for careers, education, skills, and habits. 
              Discover your optimal path and get a personalized roadmap to achieve it.
            </p>
            
            <div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
              style={{ animationDelay: "200ms" }}
            >
              <Button 
                variant="hero" 
                size="xl" 
                onClick={() => navigate("/onboarding")}
                className="gap-2"
              >
                Start My Path
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                variant="heroOutline" 
                size="xl"
                className="gap-2"
              >
                <Play className="w-5 h-5" />
                See How It Works
              </Button>
            </div>

            <p 
              className="text-sm text-muted-foreground animate-fade-in"
              style={{ animationDelay: "300ms" }}
            >
              Join 10,000+ people who optimized their futures
            </p>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute left-10 top-1/3 w-20 h-20 rounded-2xl bg-gradient-card border shadow-medium animate-float opacity-80 hidden lg:block" />
        <div className="absolute right-10 top-1/2 w-16 h-16 rounded-full bg-gradient-card border shadow-medium animate-float opacity-80 hidden lg:block" style={{ animationDelay: "1s" }} />
        <div className="absolute left-1/4 bottom-20 w-12 h-12 rounded-lg bg-gradient-card border shadow-medium animate-float opacity-80 hidden lg:block" style={{ animationDelay: "2s" }} />
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Four simple steps to transform uncertainty into a clear action plan
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="relative p-6 rounded-2xl bg-card border hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">What People Are Saying</h2>
            <p className="text-muted-foreground">
              Join thousands who've found clarity
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.author}
                className="p-6 rounded-2xl bg-card border hover-lift"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <CheckCircle2 key={i} className="w-4 h-4 text-accent fill-accent" />
                  ))}
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
      <section className="py-20 md:py-32 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Optimize Your Future?
            </h2>
            <p className="text-lg text-muted-foreground">
              Take the first step towards clarity. It only takes 5 minutes.
            </p>
            <Button 
              variant="hero" 
              size="xl" 
              onClick={() => navigate("/onboarding")}
              className="gap-2"
            >
              Start My Path — It's Free
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="font-medium">LifePath AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 LifePath AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
