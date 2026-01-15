import { cn } from "@/lib/utils";

type TimelineStep = {
  key: string;
  label: string;
  description?: string;
  time?: string;
};

type TimelineStepperProps = {
  steps: TimelineStep[];
  currentKey: string;
  className?: string;
};

export default function TimelineStepper({
  steps,
  currentKey,
  className,
}: TimelineStepperProps) {
  const currentIndex = steps.findIndex((step) => step.key === currentKey);

  return (
    <div className={cn("space-y-4", className)}>
      {steps.map((step, index) => {
        const isActive = index === currentIndex;
        const isComplete = index < currentIndex;

        return (
          <div key={step.key} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold",
                  isComplete && "border-success bg-[color:var(--success)] text-white",
                  isActive && "border-primary bg-primary text-primary-foreground",
                  !isActive &&
                    !isComplete &&
                    "border-border bg-background text-muted-foreground"
                )}
              >
                {index + 1}
              </span>
              {index < steps.length - 1 && (
                <span
                  className={cn(
                    "mt-1 h-full w-px flex-1",
                    isComplete ? "bg-[color:var(--success)]" : "bg-border"
                  )}
                />
              )}
            </div>
            <div className="pt-1">
              <p
                className={cn(
                  "text-sm font-semibold",
                  isActive && "text-foreground",
                  !isActive && "text-muted-foreground"
                )}
              >
                {step.label}
              </p>
              {step.description && (
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              )}
              {step.time && (
                <p className="text-xs text-muted-foreground">{step.time}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
