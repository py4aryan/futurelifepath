import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  ArrowLeft,
  Check,
  Sparkles,
  Zap,
  Shield,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "monthly",
    name: "Monthly",
    price: "$19",
    period: "/month",
    description: "Perfect for exploring your options",
    features: [
      "Unlimited path simulations",
      "Full roadmap access",
      "Progress tracking",
      "Weekly AI insights",
      "Email support",
    ],
    popular: false,
  },
  {
    id: "lifetime",
    name: "Lifetime Access",
    price: "$149",
    period: "one-time",
    description: "Best value for serious optimizers",
    features: [
      "Everything in Monthly",
      "Priority AI processing",
      "1-on-1 coaching session",
      "Community access",
      "Future updates included",
      "Export your data anytime",
    ],
    popular: true,
  },
];

const benefits = [
  {
    icon: Zap,
    title: "AI-Powered Clarity",
    description: "Get data-driven insights about your potential futures",
  },
  {
    icon: Shield,
    title: "Private & Secure",
    description: "Your data is encrypted and never shared with third parties",
  },
  {
    icon: Users,
    title: "Join 10,000+ Users",
    description: "People who took control of their futures",
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 h-16">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <span className="font-semibold">Back</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Limited Time Offer
            </div>
            <h1 className="text-3xl md:text-5xl font-bold">
              Unlock Your Full Personalized<br />Life Roadmap
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stop second-guessing. Get a clear, actionable plan tailored to your unique goals, strengths, and situation.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {plans.map((plan, index) => (
              <Card
                key={plan.id}
                variant={plan.popular ? "premium" : "elevated"}
                className={cn(
                  "relative overflow-hidden animate-slide-up",
                  plan.popular && "scale-[1.02]"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary" />
                )}
                <CardHeader>
                  {plan.popular && (
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                      Most Popular
                    </span>
                  )}
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center">
                          <Check className="w-3 h-3 text-success" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.popular ? "hero" : "outline"}
                    className="w-full"
                    size="lg"
                  >
                    {plan.popular ? "Get Lifetime Access" : "Start Monthly"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="text-center space-y-3 animate-fade-in"
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Guarantee */}
          <div className="text-center p-6 rounded-2xl bg-card border animate-fade-in">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">30-Day Money-Back Guarantee:</strong> If you're not satisfied, we'll refund your purchase. No questions asked.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
