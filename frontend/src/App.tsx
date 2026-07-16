import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import Progress from "./pages/Progress";
import Pricing from "./pages/Pricing";
import Schedule from "./pages/Schedule";
import Services from "./pages/Services";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import { authAPI } from "@/lib/api";

const queryClient = new QueryClient();

// ── Protected Route ───────────────────────────────────────────────────────────
// Checks if user is logged in before rendering the page.
// Shows nothing while checking, redirects to /auth if not authenticated.
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState<"loading" | "ok" | "unauth">("loading");

  useEffect(() => {
    authAPI.getMe()
      .then(() => setStatus("ok"))
      .catch(() => setStatus("unauth"));
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
      </div>
    );
  }

  if (status === "unauth") {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

// ── App ───────────────────────────────────────────────────────────────────────
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes — accessible without login */}
          <Route path="/"          element={<Index />} />
          <Route path="/auth"      element={<Auth />} />
          <Route path="/pricing"   element={<Pricing />} />
          <Route path="/services"  element={<Services />} />

          {/* Protected routes — redirect to /auth if not logged in */}
          <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
          <Route path="/dashboard"  element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/roadmap"    element={<ProtectedRoute><Roadmap /></ProtectedRoute>} />
          <Route path="/progress"   element={<ProtectedRoute><Progress /></ProtectedRoute>} />
          <Route path="/schedule"   element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
          <Route path="/account"    element={<ProtectedRoute><Account /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;