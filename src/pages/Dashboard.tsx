import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PathCard } from "@/components/PathCard";
import { 
  Home, 
  Route, 
  Map, 
  BarChart3, 
  User, 
  Menu,
  X,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const paths = [
  {
    id: "1",
    title: "Software Engineering Lead",
    description: "Transition into tech leadership with a focus on engineering management",
    difficulty: "Medium" as const,
    timeCommitment: "2-3 years",
    riskLevel: "Low" as const,
    satisfactionScore: 87,
    recommended: true,
  },
  {
    id: "2",
    title: "Startup Founder",
    description: "Launch your own venture in the EdTech space leveraging your expertise",
    difficulty: "Hard" as const,
    timeCommitment: "3-5 years",
    riskLevel: "High" as const,
    satisfactionScore: 92,
  },
  {
    id: "3",
    title: "Product Manager",
    description: "Pivot to product management combining technical and business skills",
    difficulty: "Medium" as const,
    timeCommitment: "1-2 years",
    riskLevel: "Medium" as const,
    satisfactionScore: 78,
  },
  {
    id: "4",
    title: "Technical Consultant",
    description: "Build an independent consulting practice with flexible work",
    difficulty: "Easy" as const,
    timeCommitment: "6-12 months",
    riskLevel: "Low" as const,
    satisfactionScore: 75,
  },
];

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Route, label: "My Paths", path: "/dashboard" },
  { icon: Map, label: "Roadmap", path: "/roadmap" },
  { icon: BarChart3, label: "Progress", path: "/progress" },
  { icon: User, label: "Account", path: "/account" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">LifePath AI</span>
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
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-2 animate-slide-up">
            <h1 className="text-3xl md:text-4xl font-bold">Your Optimized Life Paths</h1>
            <p className="text-muted-foreground text-lg">
              Based on your profile, our AI has simulated these potential futures for you.
            </p>
          </div>

          {/* Paths Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {paths.map((path, index) => (
              <div
                key={path.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PathCard
                  {...path}
                  onClick={() => navigate("/roadmap")}
                />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center pt-4 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <Button variant="hero" size="lg" onClick={() => navigate("/pricing")}>
              <Sparkles className="w-4 h-4" />
              Unlock Full Roadmaps
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              Get detailed step-by-step plans for all paths
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
