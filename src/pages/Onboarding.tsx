import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressSteps } from "@/components/ProgressSteps";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

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
    // Simulate AI analysis
    setTimeout(() => {
      navigate("/dashboard");
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

  if (isAnalyzing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="relative">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-primary animate-pulse-glow flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-primary-foreground animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Analyzing Your Future</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Our AI is simulating multiple life paths based on your profile...
            </p>
          </div>
          <div className="flex justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-primary animate-bounce"
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
          "px-4 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200",
          selected
            ? "bg-primary text-primary-foreground border-primary shadow-soft"
            : "bg-card border-border hover:border-primary/50 hover:bg-primary/5"
        )}
      >
        {children}
      </button>
    );

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">What are your life goals?</h2>
              <p className="text-muted-foreground">Select all that resonate with you</p>
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
          <div className="space-y-4 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">What interests you?</h2>
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
          <div className="space-y-4 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">What are your strengths?</h2>
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
          <div className="space-y-4 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">What are your challenges?</h2>
              <p className="text-muted-foreground">Identifying areas for growth</p>
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
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Your current situation</h2>
              <p className="text-muted-foreground">Help us understand where you are now</p>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm font-medium text-center">Where are you in life?</p>
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
              <p className="text-sm font-medium text-center">What do you struggle with?</p>
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
        {/* Progress */}
        <ProgressSteps
          currentStep={currentStep}
          totalSteps={5}
          labels={stepLabels}
        />

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
                {currentStep === 5 ? "Analyze My Future" : "Continue"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Your data is private and used only to generate personalized recommendations.
        </p>
      </div>
    </div>
  );
}
