import StatusBadge, { StatusBadgeValue } from "@/components/StatusBadge";
import { cn } from "@/lib/utils";

type ResponderCardProps = {
  name: string;
  lead: string;
  role: string;
  status?: StatusBadgeValue;
  eta?: string;
  distance?: string;
  contact?: string;
  vehicle?: string;
  className?: string;
};

export default function ResponderCard({
  name,
  lead,
  role,
  status,
  eta,
  distance,
  contact,
  vehicle,
  className,
}: ResponderCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-4 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{lead}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
        {status && <StatusBadge status={status} />}
      </div>
      {eta && (
        <div className="mt-4 rounded-xl border border-border bg-muted/40 p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Estimated arrival
          </p>
          <p className="mt-1 text-3xl font-bold text-foreground">{eta}</p>
        </div>
      )}
      <div className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
        {distance && (
          <div>
            <span className="font-semibold text-foreground">Distance</span>{" "}
            {distance}
          </div>
        )}
        {vehicle && (
          <div>
            <span className="font-semibold text-foreground">Vehicle</span>{" "}
            {vehicle}
          </div>
        )}
        {contact && (
          <div>
            <span className="font-semibold text-foreground">Contact</span>{" "}
            {contact}
          </div>
        )}
      </div>
    </div>
  );
}
