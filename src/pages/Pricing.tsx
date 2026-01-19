import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  ArrowLeft,
  Check,
  Sparkles,
  Zap,
  Shield,
  Users,
  Crown,
  Rocket,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with the basics",
    badge: null,
    features: [
      "3 daily skills",
      "Basic mountain view",
      "7-day streak tracking",
      "Community access",
      "Mobile app access",
    ],
    limitations: [
      "Limited AI insights",
      "Basic rewards only",
    ],
    cta: "Start Free",
    variant: "outline" as const,
    popular: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$12",
    period: "/month",
    description: "Unlock your full potential",
    badge: "🔥 Most Popular",
    features: [
      "Unlimited daily skills",
      "Custom skill creation",
      "Full Skills Mountain",
      "Advanced AI coaching",
      "All reward types",
      "Priority support",
      "Weekly progress reports",
      "7-day free trial",
    ],
    limitations: [],
    cta: "Start Free Trial",
    variant: "hero" as const,
    popular: true,
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: "$199",
    period: "one-time",
    description: "Best value forever",
    badge: "💎 Best Value",
    features: [
      "Everything in Premium",
      "1-on-1 coaching session",
      "Exclusive themes & badges",
      "Early access to features",
      "Lifetime updates included",
      "Export all your data",
      "API access",
      "No recurring fees ever",
    ],
    limitations: [],
    cta: "Get Lifetime Access",
    variant: "accent" as const,
    popular: false,
  },
];

const benefits = [
  {
    icon: Zap,
    title: "7-Day Free Trial",
    description: "Try Premium free, cancel anytime",
  },
  {
    icon: Shield,
    title: "Private & Secure",
    description: "Your data is encrypted and safe",
  },
  {
    icon: Users,
    title: "50,000+ Climbers",
    description: "Join a thriving community",
  },
];

const faqs = [
  {
    q: "Can I switch plans later?",
    a: "Yes! Upgrade or downgrade anytime. We'll prorate your balance.",
  },
  {
    q: "What happens after my free trial?",
    a: "You'll be charged the monthly rate unless you cancel. No hidden fees.",
  },
  {
    q: "Is there a student discount?",
    a: "Yes! Students get 50% off Premium. Contact us with your .edu email.",
  },
];

export default function Pricing() {
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
            <span className="font-semibold">Pricing</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-xp/20 to-accent/20 text-foreground text-sm font-medium">
              <Sparkles className="w-4 h-4 text-xp" />
              Start Free, Upgrade When Ready
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold">
              Choose Your <span className="gradient-text">Climbing Gear</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every journey starts somewhere. Pick the plan that matches your ambition.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan, index) => (
              <Card
                key={plan.id}
                variant={plan.popular ? "premium" : "elevated"}
                className={cn(
                  "relative overflow-hidden animate-slide-up",
                  plan.popular && "md:scale-105 z-10 ring-2 ring-primary"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.badge && (
                  <div className={cn(
                    "absolute top-0 left-0 right-0 py-2 text-center text-sm font-bold",
                    plan.popular ? "bg-gradient-primary text-primary-foreground" : "bg-level text-level-foreground"
                  )}>
                    {plan.badge}
                  </div>
                )}
                <CardHeader className={plan.badge ? "pt-14" : ""}>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-success" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.limitations.map((limit) => (
                      <li key={limit} className="flex items-center gap-3 text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                          <span className="text-xs">—</span>
                        </div>
                        <span className="text-sm">{limit}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.variant}
                    className="w-full"
                    size="lg"
                    onClick={() => navigate("/onboarding")}
                  >
                    {plan.cta}
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
                className="flex items-center gap-4 p-4 rounded-2xl bg-card border animate-fade-in"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-center">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-card border animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <p className="font-semibold mb-2">{faq.q}</p>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantee */}
          <div className="text-center p-8 rounded-3xl bg-gradient-to-r from-success/10 to-primary/10 border border-success/20 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/20 mb-4">
              <Shield className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-xl font-display font-bold mb-2">30-Day Money-Back Guarantee</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Not happy? Get a full refund within 30 days. No questions asked. We believe in our product that much.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
