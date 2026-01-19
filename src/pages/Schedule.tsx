import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScheduleCalendar } from "@/components/ScheduleCalendar";
import { StreakCounter } from "@/components/StreakCounter";
import {
  Home,
  Mountain,
  Calendar,
  BarChart3,
  User,
  Menu,
  X,
  Plus,
  Bell,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Today", path: "/dashboard" },
  { icon: Mountain, label: "Mountain", path: "/roadmap" },
  { icon: Calendar, label: "Schedule", path: "/schedule" },
  { icon: BarChart3, label: "Progress", path: "/progress" },
  { icon: User, label: "Account", path: "/account" },
];

const upcomingReminders = [
  { time: "9:00 AM", title: "Deep Work Session", emoji: "⚡" },
  { time: "2:00 PM", title: "Learn New Concept", emoji: "📚" },
  { time: "8:00 PM", title: "Evening Journaling", emoji: "✍️" },
];

export default function Schedule() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Mountain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg">LifePath</span>
            </div>

            <div className="hidden sm:flex items-center gap-4">
              <StreakCounter days={12} />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className={cn(
                    "gap-2",
                    item.path === "/schedule" && "bg-secondary text-secondary-foreground"
                  )}
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              ))}
            </nav>

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

        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background animate-fade-in">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2",
                    item.path === "/schedule" && "bg-secondary text-secondary-foreground"
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
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Calendar */}
            <div className="lg:col-span-2 space-y-6">
              <div className="animate-slide-up">
                <h1 className="text-2xl md:text-3xl font-display font-bold">
                  📅 Your Schedule
                </h1>
                <p className="text-muted-foreground">
                  Plan your skills and track your progress
                </p>
              </div>

              <ScheduleCalendar className="animate-fade-in" />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Reminders */}
              <div className="p-5 rounded-2xl bg-card border animate-slide-up">
                <div className="flex items-center gap-2 mb-4">
                  <Bell className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-bold">Today's Reminders</h3>
                </div>
                <div className="space-y-3">
                  {upcomingReminders.map((reminder, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"
                    >
                      <span className="text-xl">{reminder.emoji}</span>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{reminder.title}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {reminder.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 animate-fade-in">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-success/20 to-success/5 border border-success/30 text-center">
                  <p className="text-3xl font-bold text-success">87%</p>
                  <p className="text-xs text-muted-foreground">Weekly Completion</p>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-xp/20 to-xp/5 border border-xp/30 text-center">
                  <p className="text-3xl font-bold text-xp-foreground">1,420</p>
                  <p className="text-xs text-muted-foreground">XP This Week</p>
                </div>
              </div>

              {/* Add Skill CTA */}
              <Button 
                variant="hero" 
                className="w-full gap-2"
                onClick={() => navigate("/dashboard")}
              >
                <Plus className="w-4 h-4" />
                Add Custom Skill
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
