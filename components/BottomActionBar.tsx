"use client";

import { cn } from "@/lib/utils";

type ActionItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
};

type BottomActionBarProps = {
  items: ActionItem[];
  maxWidthClassName?: string;
  className?: string;
};

export default function BottomActionBar({
  items,
  maxWidthClassName = "max-w-6xl",
  className,
}: BottomActionBarProps) {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[9999] border-t border-border bg-card/95 backdrop-blur-sm px-4 py-2 shadow-lg",
        className
      )}
    >
      <div className={cn("mx-auto flex items-center gap-2", maxWidthClassName)}>
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={item.onClick}
            aria-pressed={item.active ?? false}
            aria-label={item.label}
            disabled={item.disabled}
            className={cn(
              "flex min-h-[44px] flex-1 flex-col items-center gap-1 rounded-lg px-2 py-2 text-[11px] font-semibold transition-colors",
              item.active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted/60",
              item.disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
