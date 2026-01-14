import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TrendingUp, Clock, AlertTriangle, Star, ArrowRight } from "lucide-react";

interface PathCardProps {
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  timeCommitment: string;
  riskLevel: "Low" | "Medium" | "High";
  satisfactionScore: number;
  recommended?: boolean;
  onClick?: () => void;
}

const difficultyColors = {
  Easy: "text-success bg-success/10",
  Medium: "text-warning bg-warning/10",
  Hard: "text-destructive bg-destructive/10",
};

const riskColors = {
  Low: "text-success",
  Medium: "text-warning",
  High: "text-destructive",
};

export function PathCard({
  title,
  description,
  difficulty,
  timeCommitment,
  riskLevel,
  satisfactionScore,
  recommended,
  onClick,
}: PathCardProps) {
  return (
    <Card
      variant="path"
      className={cn(
        "relative overflow-hidden cursor-pointer group",
        recommended && "ring-2 ring-primary/30"
      )}
      onClick={onClick}
    >
      {recommended && (
        <div className="absolute top-0 right-0 bg-gradient-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg">
          Recommended
        </div>
      )}

      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <span className="text-lg">{title}</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <div className={cn("p-1.5 rounded-md", difficultyColors[difficulty])}>
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Difficulty</p>
              <p className="text-sm font-medium">{difficulty}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-primary/10 text-primary">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Time</p>
              <p className="text-sm font-medium">{timeCommitment}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-muted">
              <AlertTriangle className={cn("w-4 h-4", riskColors[riskLevel])} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Risk</p>
              <p className={cn("text-sm font-medium", riskColors[riskLevel])}>
                {riskLevel}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-accent/10 text-accent">
              <Star className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Satisfaction</p>
              <p className="text-sm font-medium">{satisfactionScore}%</p>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-between group-hover:bg-primary/5"
        >
          View Roadmap
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
}
