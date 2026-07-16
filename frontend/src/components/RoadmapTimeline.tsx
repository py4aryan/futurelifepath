import { cn } from "@/lib/utils";
import { Check, Lock } from "lucide-react";

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: "skill" | "habit" | "academic" | "milestone";
  completed?: boolean;
  locked?: boolean;
}

interface RoadmapTimelineProps {
  items: TimelineItem[];
  className?: string;
}

const categoryColors = {
  skill: "bg-primary/10 text-primary border-primary/20",
  habit: "bg-accent/10 text-accent border-accent/20",
  academic: "bg-success/10 text-success border-success/20",
  milestone: "bg-warning/10 text-warning border-warning/20",
};

const categoryLabels = {
  skill: "Skill",
  habit: "Habit",
  academic: "Academic",
  milestone: "Milestone",
};

export function RoadmapTimeline({ items, className }: RoadmapTimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 path-line opacity-30" />

      <div className="space-y-6">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "relative pl-16 animate-fade-in",
              item.locked && "opacity-60"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Node */}
            <div
              className={cn(
                "absolute left-4 w-5 h-5 rounded-full border-2 flex items-center justify-center",
                item.completed
                  ? "bg-success border-success text-success-foreground"
                  : item.locked
                  ? "bg-muted border-muted-foreground"
                  : "bg-card border-primary"
              )}
            >
              {item.completed && <Check className="w-3 h-3" />}
              {item.locked && <Lock className="w-3 h-3" />}
            </div>

            {/* Content */}
            <div
              className={cn(
                "p-4 rounded-lg border bg-card/50 backdrop-blur-sm",
                item.locked && "border-dashed"
              )}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full border",
                        categoryColors[item.category]
                      )}
                    >
                      {categoryLabels[item.category]}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.duration}
                    </span>
                  </div>
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </div>
                {item.completed && (
                  <div className="flex items-center gap-1 text-success text-sm font-medium">
                    <Check className="w-4 h-4" />
                    Done
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
