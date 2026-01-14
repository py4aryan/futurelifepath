import { cn } from "@/lib/utils";

interface ProgressStepsProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export function ProgressSteps({ currentStep, totalSteps, labels }: ProgressStepsProps) {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center gap-2 md:gap-4">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNumber = i + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;
          const isPending = stepNumber > currentStep;

          return (
            <div key={stepNumber} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "progress-step",
                    isCompleted && "completed",
                    isActive && "active",
                    isPending && "pending"
                  )}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-sm font-medium">{stepNumber}</span>
                  )}
                </div>
                {labels && labels[i] && (
                  <span
                    className={cn(
                      "text-xs font-medium hidden md:block",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {labels[i]}
                  </span>
                )}
              </div>
              {stepNumber < totalSteps && (
                <div
                  className={cn(
                    "w-8 md:w-16 h-0.5 mx-2",
                    isCompleted ? "bg-success" : "bg-muted"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
