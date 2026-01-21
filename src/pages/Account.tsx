import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Mountain, User, Mail, Crown, Flame, Trophy, Lock, Unlock,
  Settings, Bell, Smartphone, LogOut, ChevronRight, Edit3,
  CreditCard, Shield, Star, Zap, Target, Award, X, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const Account = () => {
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [appLockEnabled, setAppLockEnabled] = useState(true);

  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "",
    plan: "premium" as "free" | "regular" | "premium",
    level: 12,
    xp: 2450,
    xpToNext: 3000,
    streak: 7,
    mountainProgress: 42,
    joinedDays: 28,
  };

  const lockedApps = [
    { name: "Instagram", icon: "📸", locked: true, unlockTime: "Complete 2 more skills" },
    { name: "TikTok", icon: "🎵", locked: true, unlockTime: "Complete 1 more skill" },
    { name: "YouTube", icon: "▶️", locked: false, unlockTime: "Unlocked for 2 hours" },
    { name: "Twitter", icon: "🐦", locked: false, unlockTime: "Unlocked for 1 hour" },
  ];

  const planConfig = {
    free: { label: "Free Trial", color: "bg-muted", textColor: "text-muted-foreground", icon: Star },
    regular: { label: "Regular", color: "bg-primary", textColor: "text-primary-foreground", icon: Zap },
    premium: { label: "Premium", color: "bg-gradient-to-r from-amber-500 to-orange-500", textColor: "text-white", icon: Crown },
  };

  const currentPlan = planConfig[user.plan];
  const PlanIcon = currentPlan.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/10 to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-lg font-bold text-foreground">Account</h1>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
        {/* Profile Card */}
        <div className="account-card p-6 animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="w-20 h-20 border-4 border-primary/20 shadow-lg">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-level text-white text-2xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Edit3 className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
              <p className="text-muted-foreground flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {user.email}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${currentPlan.color} ${currentPlan.textColor}`}>
                  <PlanIcon className="w-4 h-4" />
                  {currentPlan.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  Member for {user.joinedDays} days
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="account-card p-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-xp" />
            Your Progress
          </h3>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* Level */}
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-level/10 to-level/5 border border-level/20">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-level to-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">{user.level}</span>
              </div>
              <p className="text-sm font-medium text-foreground">Level</p>
              <p className="text-xs text-muted-foreground">Explorer</p>
            </div>
            
            {/* Streak */}
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-streak/10 to-streak/5 border border-streak/20">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-streak to-accent flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium text-foreground">{user.streak} Days</p>
              <p className="text-xs text-muted-foreground">Streak 🔥</p>
            </div>
            
            {/* XP */}
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-xp/10 to-xp/5 border border-xp/20">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-xp to-amber-400 flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium text-foreground">{user.xp.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total XP</p>
            </div>
          </div>

          {/* Mountain Progress */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-mountain-base/10 via-mountain-mid/10 to-mountain-peak/10 border border-mountain-mid/20">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-2 font-medium text-foreground">
                <Mountain className="w-5 h-5 text-mountain-mid" />
                Skills Mountain
              </span>
              <span className="text-sm font-bold text-primary">{user.mountainProgress}%</span>
            </div>
            <Progress value={user.mountainProgress} className="h-3 bg-muted" />
            <p className="text-xs text-muted-foreground mt-2">
              Keep climbing! You're {100 - user.mountainProgress}% away from the summit.
            </p>
          </div>
        </div>

        {/* Locked Apps Overview */}
        <div className="account-card p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-accent" />
            App Access
          </h3>
          
          <div className="space-y-3">
            {lockedApps.map((app, index) => (
              <div 
                key={app.name}
                className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                  app.locked 
                    ? "bg-muted/50 border border-border/50" 
                    : "bg-success/10 border border-success/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{app.icon}</span>
                  <div>
                    <p className="font-medium text-foreground">{app.name}</p>
                    <p className={`text-xs ${app.locked ? "text-muted-foreground" : "text-success"}`}>
                      {app.unlockTime}
                    </p>
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  app.locked 
                    ? "bg-muted text-muted-foreground" 
                    : "bg-success/20 text-success"
                }`}>
                  {app.locked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="account-card overflow-hidden animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <h3 className="text-lg font-bold text-foreground p-6 pb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-muted-foreground" />
            Settings
          </h3>
          
          <div className="divide-y divide-border/50">
            {/* Edit Profile */}
            <button className="account-setting-item group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">Edit Profile</p>
                  <p className="text-sm text-muted-foreground">Update your name and avatar</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>

            {/* Manage Subscription */}
            <Link to="/pricing" className="account-setting-item group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <CreditCard className="w-5 h-5 text-accent" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">Manage Subscription</p>
                  <p className="text-sm text-muted-foreground">View plans and billing</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </Link>

            {/* Notifications */}
            <div className="account-setting-item">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-level/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-level" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">Notifications</p>
                  <p className="text-sm text-muted-foreground">Daily reminders and updates</p>
                </div>
              </div>
              <Switch 
                checked={notificationsEnabled} 
                onCheckedChange={setNotificationsEnabled}
              />
            </div>

            {/* App Lock Settings */}
            <div className="account-setting-item">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-streak/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-streak" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">App Lock</p>
                  <p className="text-sm text-muted-foreground">Lock distracting apps</p>
                </div>
              </div>
              <Switch 
                checked={appLockEnabled} 
                onCheckedChange={setAppLockEnabled}
              />
            </div>

            {/* Log Out */}
            <button 
              onClick={() => navigate("/auth")}
              className="account-setting-item group text-destructive hover:bg-destructive/5"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
                  <LogOut className="w-5 h-5 text-destructive" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Log Out</p>
                  <p className="text-sm text-muted-foreground">Sign out of your account</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 opacity-0" />
            </button>
          </div>
        </div>

        {/* Upgrade CTA for non-premium users */}
        {user.plan !== "premium" && (
          <Link to="/pricing" className="block">
            <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r from-primary via-level to-accent animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="relative flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Upgrade to Premium</h3>
                  <p className="text-white/80 text-sm">Unlock your full potential with all features</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* App Version */}
        <p className="text-center text-xs text-muted-foreground pb-8">
          AI Life-Path Optimizer v1.0.0
        </p>
      </main>
    </div>
  );
};

export default Account;
