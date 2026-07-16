import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: LucideIcon;
  emoji: string;
  title: string;
  description: string;
  features: string[];
  color: "primary" | "accent" | "level" | "success" | "streak";
  ctaText?: string;
  onCta?: () => void;
  popular?: boolean;
}

const colorClasses = {
  primary: "from-primary/20 to-primary/5 border-primary/30 hover:border-primary/50",
  accent: "from-accent/20 to-accent/5 border-accent/30 hover:border-accent/50",
  level: "from-level/20 to-level/5 border-level/30 hover:border-level/50",
  success: "from-success/20 to-success/5 border-success/30 hover:border-success/50",
  streak: "from-streak/20 to-streak/5 border-streak/30 hover:border-streak/50",
};

const iconBgClasses = {
  primary: "bg-primary/20 text-primary",
  accent: "bg-accent/20 text-accent",
  level: "bg-level/20 text-level",
  success: "bg-success/20 text-success",
  streak: "bg-streak/20 text-streak",
};

export function ServiceCard({
  icon: Icon,
  emoji,
  title,
  description,
  features,
  color,
  ctaText = "Learn More",
  onCta,
  popular = false,
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        "relative p-6 rounded-3xl border-2 bg-gradient-to-b transition-all duration-300 hover-lift group",
        colorClasses[color]
      )}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold">
          ⭐ Popular
        </div>
      )}

      <div className="space-y-4">
        {/* Icon */}
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", iconBgClasses[color])}>
          <span className="text-2xl">{emoji}</span>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="font-display font-bold text-xl mb-1">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>

        {/* Features */}
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <span className="text-success">✓</span>
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button 
          variant={popular ? "hero" : "outline"} 
          className="w-full"
          onClick={onCta}
        >
          {ctaText}
        </Button>
      </div>
    </div>
  );
}
