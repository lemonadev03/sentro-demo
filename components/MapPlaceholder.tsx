import { cn } from "@/lib/utils";

type MapPlaceholderProps = {
  src: string;
  alt: string;
  label: string;
  className?: string;
};

export default function MapPlaceholder({
  src,
  alt,
  label,
  className,
}: MapPlaceholderProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-muted/40",
        className
      )}
    >
      <div className="relative flex min-h-[220px] flex-col justify-between bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 p-6 text-sm text-muted-foreground">
        <div className="rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground">
          {label}
        </div>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Map placeholder
          </p>
          <p className="font-semibold text-foreground">{alt}</p>
          <p className="text-xs text-muted-foreground">{src}</p>
        </div>
      </div>
    </div>
  );
}
