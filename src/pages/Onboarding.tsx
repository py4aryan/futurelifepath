import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressSteps } from "@/components/ProgressSteps";
import { MountainHero } from "@/components/MountainHero";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Mountain, Sparkles, Flag } from "lucide-react";

const stepLabels = ["Goals", "Interests", "Strengths", "Challenges", "Situation"];

interface FormData {
  goals: string[];
  interests: string[];
  strengths: string[];
  weaknesses: string[];
  currentSituation: string;
  struggles: string[];
}

const goalOptions = [
  "Career Growth", "Financial Freedom", "Work-Life Balance", "Creative Fulfillment",
  "Leadership", "Learning New Skills", "Starting a Business", "Health & Wellness"
];

const interestOptions = [
  "Technology", "Arts & Design", "Business", "Science", "Writing",
  "Education", "Healthcare", "Sports", "Music", "Travel"
];

const strengthOptions = [
  "Problem Solving", "Communication", "Leadership", "Creativity",
  "Analytical Thinking", "Adaptability", "Time Management", "Teamwork"
];

const weaknessOptions = [
  "Procrastination", "Public Speaking", "Technical Skills", "Patience",
  "Delegation", "Risk-Taking", "Self-Confidence", "Work-Life Balance"
];

const situationOptions = [
  "Student", "Early Career", "Mid-Career", "Career Change",
  "Freelancer", "Entrepreneur", "Returning to Work", "Exploring Options"
];

const struggleOptions = [
  "Unclear Direction", "Lack of Motivation", "Financial Constraints",
  "Time Management", "Skill Gaps", "Imposter Syndrome", "Burnout", "Decision Paralysis"
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    goals: [],
    interests: [],
    strengths: [],
    weaknesses: [],
    currentSituation: "",
    struggles: [],
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showMountainReveal, setShowMountainReveal] = useState(false);

  const toggleSelection = (
    key: keyof Pick<FormData, "goals" | "interests" | "strengths" | "weaknesses" | "struggles">,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsAnalyzing(true);
    // Simulate AI building the mountain
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowMountainReveal(true);
    }, 3000);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.goals.length > 0;
      case 2:
        return formData.interests.length > 0;
      case 3:
        return formData.strengths.length > 0;
      case 4:
        return formData.weaknesses.length > 0;
      case 5:
        return formData.currentSituation !== "" && formData.struggles.length > 0;
      default:
        return false;
    }
  };

  // Mountain reveal screen
  if (showMountainReveal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
        {/* Mountain background */}
        <MountainHero className="absolute inset-0 opacity-40" />
        
        <div className="relative text-center space-y-8 max-w-lg mx-auto animate-fade-in">
          <div className="relative mx-auto">
            <div className="w-28 h-28 mx-auto rounded-full bg-gradient-primary flex items-center justify-center animate-level-up shadow-glow">
              <Mountain className="w-14 h-14 text-primary-foreground" />
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-xp flex items-center justify-center animate-bounce-in shadow-xp">
              <Flag className="w-5 h-5 text-xp-foreground" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Your Skills Mountain is Ready! 🏔️
            </h2>
            <p className="text-lg text-muted-foreground">
              We've built your personalized path to success. 
              Each checkpoint is a skill you'll master on your climb to the summit.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate("/dashboard")}
              className="gap-2 w-full"
            >
              Start My Climb
              <ArrowRight className="w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground">
              Your first daily skills are waiting for you
            </p>
          </div>
        </div>

        {/* Floating celebration elements */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full animate-confetti"
            style={{
              left: `${20 + i * 12}%`,
              top: "40%",
              backgroundColor: ['#FFD700', '#FF6B35', '#8B5CF6', '#22C55E', '#FF6B35', '#8B5CF6'][i],
              animationDelay: `${i * 100}ms`,
            }}
          />
        ))}
      </div>
    );
  }

  // Analyzing screen
  if (isAnalyzing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="relative">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-primary animate-pulse-glow flex items-center justify-center">
              <Mountain className="w-10 h-10 text-primary-foreground animate-float" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-display font-bold">Building Your Mountain</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Our AI is crafting your personalized Skills Mountain based on your unique profile...
            </p>
          </div>
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-gradient-primary animate-bounce"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    const SelectableChip = ({
      selected,
      onClick,
      children,
    }: {
      selected: boolean;
      onClick: () => void;
      children: React.ReactNode;
    }) => (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all duration-200",
          selected
            ? "bg-primary text-primary-foreground border-primary shadow-soft scale-105"
            : "bg-card border-border hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.02]"
        )}
      >
        {children}
      </button>
    );

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-display font-bold">What peaks do you want to reach?</h2>
              <p className="text-muted-foreground">Select the goals that inspire you most</p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {goalOptions.map((goal) => (
                <SelectableChip
                  key={goal}
                  selected={formData.goals.includes(goal)}
                  onClick={() => toggleSelection("goals", goal)}
                >
                  {goal}
                </SelectableChip>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-display font-bold">What drives your curiosity?</h2>
              <p className="text-muted-foreground">Choose areas you're passionate about</p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {interestOptions.map((interest) => (
                <SelectableChip
                  key={interest}
                  selected={formData.interests.includes(interest)}
                  onClick={() => toggleSelection("interests", interest)}
                >
                  {interest}
                </SelectableChip>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-display font-bold">What are your superpowers?</h2>
              <p className="text-muted-foreground">Recognize what makes you unique</p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {strengthOptions.map((strength) => (
                <SelectableChip
                  key={strength}
                  selected={formData.strengths.includes(strength)}
                  onClick={() => toggleSelection("strengths", strength)}
                >
                  {strength}
                </SelectableChip>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-display font-bold">What obstacles slow you down?</h2>
              <p className="text-muted-foreground">We'll build skills to overcome these</p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {weaknessOptions.map((weakness) => (
                <SelectableChip
                  key={weakness}
                  selected={formData.weaknesses.includes(weakness)}
                  onClick={() => toggleSelection("weaknesses", weakness)}
                >
                  {weakness}
                </SelectableChip>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-display font-bold">Where are you on your journey?</h2>
              <p className="text-muted-foreground">Help us understand your starting point</p>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium text-center">Your current situation</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {situationOptions.map((situation) => (
                  <SelectableChip
                    key={situation}
                    selected={formData.currentSituation === situation}
                    onClick={() => setFormData((prev) => ({ ...prev, currentSituation: situation }))}
                  >
                    {situation}
                  </SelectableChip>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium text-center">What's holding you back?</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {struggleOptions.map((struggle) => (
                  <SelectableChip
                    key={struggle}
                    selected={formData.struggles.includes(struggle)}
                    onClick={() => toggleSelection("struggles", struggle)}
                  >
                    {struggle}
                  </SelectableChip>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 animate-fade-in">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Mountain className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl">LifePath</span>
        </div>

        {/* Progress */}
        <ProgressSteps currentStep={currentStep} totalSteps={5} labels={stepLabels} />

        {/* Form Card */}
        <Card variant="glass" className="p-6 md:p-8">
          <CardContent className="p-0 space-y-8">
            {renderStep()}

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                variant="hero"
                onClick={handleNext}
                disabled={!canProceed()}
                className="gap-2"
              >
                {currentStep === 5 ? "Build My Mountain" : "Continue"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Your data is private and used only to personalize your Skills Mountain.
        </p>
      </div>
    </div>
  );
}