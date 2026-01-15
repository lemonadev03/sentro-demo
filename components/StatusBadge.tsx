import { cn } from "@/lib/utils";

export type StatusBadgeValue =
  | "pending"
  | "assigned"
  | "enroute"
  | "resolved"
  | "major";

const statusStyles: Record<
  StatusBadgeValue,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className: "bg-[color:var(--status-pending)] text-amber-950",
  },
  assigned: {
    label: "Assigned",
    className: "bg-[color:var(--status-assigned)] text-white",
  },
  enroute: {
    label: "En route",
    className: "bg-[color:var(--status-enroute)] text-white",
  },
  resolved: {
    label: "Resolved",
    className: "bg-[color:var(--status-resolved)] text-white",
  },
  major: {
    label: "Major",
    className: "bg-[color:var(--status-major)] text-white",
  },
};

type StatusBadgeProps = {
  status: StatusBadgeValue;
  className?: string;
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const style = statusStyles[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        style.className,
        className
      )}
    >
      {style.label}
    </span>
  );
}
