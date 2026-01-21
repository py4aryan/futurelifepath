import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mountain, Sparkles, ArrowRight, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just navigate to onboarding/dashboard
    navigate(isLogin ? "/dashboard" : "/onboarding");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background flex flex-col">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-level/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <Link to="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-level flex items-center justify-center shadow-lg">
            <Mountain className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl">LifePath</span>
        </Link>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="glass-card p-8 md:p-10 rounded-3xl border border-border/50 relative overflow-hidden">
            {/* Glow effect behind card */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            
            {/* Mountain icon */}
            <div className="relative flex justify-center mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-level to-accent flex items-center justify-center shadow-xl animate-float">
                <Mountain className="w-10 h-10 text-white" />
                <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-xp animate-pulse" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {isLogin ? "Welcome Back, Climber!" : "Begin Your Journey"}
              </h1>
              <p className="text-muted-foreground">
                {isLogin 
                  ? "Your mountain awaits. Let's continue the climb." 
                  : "Join thousands optimizing their life paths."}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2 animate-fade-in">
                  <Label htmlFor="name" className="text-foreground font-medium">Your Name</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-12 h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="text-right">
                  <button type="button" className="text-sm text-primary hover:text-primary/80 transition-colors">
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Primary Auth Button */}
              <button
                type="submit"
                className="auth-button-primary w-full group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 font-bold text-lg">
                  {isLogin ? "Continue My Climb" : "Start My Climb"}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="auth-button-glow" />
              </button>

              {/* Microcopy */}
              <p className="text-center text-sm text-muted-foreground">
                ✨ Your progress starts here.
              </p>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-muted-foreground">or</span>
              </div>
            </div>

            {/* Toggle Auth Mode Button */}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="auth-button-secondary w-full group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
                {isLogin ? (
                  <>
                    <Sparkles className="w-4 h-4" />
                    New here? Start My Climb
                  </>
                ) : (
                  <>
                    <Mountain className="w-4 h-4" />
                    Already climbing? Continue My Climb
                  </>
                )}
              </span>
            </button>

            {/* Terms */}
            <p className="mt-6 text-center text-xs text-muted-foreground">
              By continuing, you agree to our{" "}
              <a href="#" className="text-primary hover:underline">Terms</a>
              {" "}and{" "}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            </p>
          </div>

          {/* Bottom decoration */}
          <div className="mt-8 flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-primary/30"
                style={{ 
                  animationDelay: `${i * 0.2}s`,
                  opacity: 0.3 + (i * 0.15)
                }}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;
