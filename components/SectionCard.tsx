import { cn } from "@/lib/utils";

type SectionCardProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

export default function SectionCard({
  title,
  description,
  action,
  className,
  children,
}: SectionCardProps) {
  return (
    <section
      className={cn(
        "flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm",
        className
      )}
    >
      {(title || description || action) && (
        <div className={cn("flex flex-wrap items-center justify-between gap-3", children ? "mb-6" : "")}>
          <div>
            {title && <h2 className="text-lg font-semibold">{title}</h2>}
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {action}
        </div>
      )}
      {children && <div className="flex-1 min-h-0">{children}</div>}
    </section>
  );
}
