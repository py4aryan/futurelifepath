import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  Flame, 
  Trophy, 
  Star,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { format, isSameDay, addDays, subDays } from "date-fns";
import { cn } from "@/lib/utils";

interface ScheduledSkill {
  id: string;
  title: string;
  time: string;
  completed: boolean;
  type: "main" | "habit" | "challenge";
}

interface ScheduleCalendarProps {
  className?: string;
}

const mockSchedule: Record<string, ScheduledSkill[]> = {
  [format(new Date(), "yyyy-MM-dd")]: [
    { id: "1", title: "Morning Meditation", time: "7:00 AM", completed: true, type: "habit" },
    { id: "2", title: "Deep Work Session", time: "9:00 AM", completed: false, type: "main" },
    { id: "3", title: "Learn New Concept", time: "2:00 PM", completed: false, type: "challenge" },
    { id: "4", title: "Evening Journaling", time: "8:00 PM", completed: false, type: "habit" },
  ],
  [format(addDays(new Date(), 1), "yyyy-MM-dd")]: [
    { id: "5", title: "Workout Routine", time: "6:30 AM", completed: false, type: "main" },
    { id: "6", title: "Reading Session", time: "10:00 AM", completed: false, type: "habit" },
    { id: "7", title: "Skill Practice", time: "3:00 PM", completed: false, type: "challenge" },
  ],
};

// Mock data for streaks
const completedDays = [
  subDays(new Date(), 1),
  subDays(new Date(), 2),
  subDays(new Date(), 3),
  subDays(new Date(), 5),
  subDays(new Date(), 6),
  subDays(new Date(), 7),
];

export function ScheduleCalendar({ className }: ScheduleCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"calendar" | "schedule">("schedule");

  const dateKey = format(selectedDate, "yyyy-MM-dd");
  const daySkills = mockSchedule[dateKey] || [];
  const isToday = isSameDay(selectedDate, new Date());

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "main": return <Sparkles className="w-4 h-4 text-primary" />;
      case "habit": return <Star className="w-4 h-4 text-accent" />;
      case "challenge": return <Trophy className="w-4 h-4 text-level" />;
      default: return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "main": return "border-primary/30 bg-primary/5";
      case "habit": return "border-accent/30 bg-accent/5";
      case "challenge": return "border-level/30 bg-level/5";
      default: return "";
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-lg">Schedule</h3>
        <div className="flex items-center gap-1 p-1 rounded-xl bg-muted">
          <button
            onClick={() => setViewMode("schedule")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
              viewMode === "schedule" ? "bg-background shadow-sm" : "text-muted-foreground"
            )}
          >
            📅 Schedule
          </button>
          <button
            onClick={() => setViewMode("calendar")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
              viewMode === "calendar" ? "bg-background shadow-sm" : "text-muted-foreground"
            )}
          >
            🗓️ Calendar
          </button>
        </div>
      </div>

      {viewMode === "calendar" ? (
        <div className="p-4 rounded-2xl bg-card border">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="pointer-events-auto"
            modifiers={{
              completed: completedDays,
            }}
            modifiersStyles={{
              completed: {
                backgroundColor: "hsl(var(--success) / 0.2)",
                color: "hsl(var(--success))",
                fontWeight: "bold",
              },
            }}
          />
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-success/20" /> Completed
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-primary" /> Today
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Date Navigation */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-card border">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSelectedDate(subDays(selectedDate, 1))}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="text-center">
              <p className="font-display font-bold">
                {isToday ? "Today" : format(selectedDate, "EEEE")}
              </p>
              <p className="text-sm text-muted-foreground">
                {format(selectedDate, "MMMM d, yyyy")}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSelectedDate(addDays(selectedDate, 1))}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Day's Skills */}
          <div className="space-y-3">
            {daySkills.length > 0 ? (
              daySkills.map((skill, index) => (
                <div
                  key={skill.id}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-xl border-2 transition-all animate-slide-up",
                    getTypeColor(skill.type),
                    skill.completed && "opacity-60"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {skill.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  ) : (
                    getTypeIcon(skill.type)
                  )}
                  <div className="flex-1">
                    <p className={cn("font-medium", skill.completed && "line-through")}>
                      {skill.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{skill.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-4xl mb-2">🏖️</p>
                <p>No skills scheduled for this day</p>
              </div>
            )}
          </div>

          {/* Streak Indicator */}
          {isToday && (
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-streak/10 to-accent/10 border border-streak/20">
              <Flame className="w-5 h-5 text-streak" />
              <span className="font-semibold text-streak">12 Day Streak!</span>
              <span className="text-sm text-muted-foreground">Keep going! 🔥</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
