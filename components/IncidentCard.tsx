import Link from "next/link";
import StatusBadge, { StatusBadgeValue } from "@/components/StatusBadge";
import { cn } from "@/lib/utils";

type IncidentCardProps = {
  id: string;
  title: string;
  type: string;
  location: string;
  time: string;
  status: StatusBadgeValue;
  href: string;
  highlight?: boolean;
  className?: string;
};

export default function IncidentCard({
  id,
  title,
  type,
  location,
  time,
  status,
  href,
  highlight,
  className,
}: IncidentCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "block rounded-2xl border border-border bg-card p-4 transition hover:border-foreground/30 hover:shadow-sm",
        highlight && "border-primary/50 bg-primary/5",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground">{id}</p>
          <h3 className="text-base font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{type}</p>
        </div>
        <StatusBadge status={status} />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span>{location}</span>
        <span>•</span>
        <span>{time}</span>
      </div>
    </Link>
  );
}
