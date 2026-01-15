import Link from "next/link";
import HeaderBar from "@/components/HeaderBar";
import MapPlaceholder from "@/components/MapPlaceholder";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import { mockIncident } from "@/lib/mock-data";

export default function ResponderAssignmentPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-8">
      <HeaderBar title="Assignment detail" backHref="/responder" />

      <SectionCard
        title={mockIncident.title}
        description={mockIncident.locationLabel}
        action={<StatusBadge status="assigned" />}
      >
        <p className="text-sm text-muted-foreground">{mockIncident.description}</p>
      </SectionCard>

      <MapPlaceholder
        src="/demo/map-responder.png"
        alt="Responder route"
        label="Route overview"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/responder/navigate"
          className="inline-flex items-center justify-center rounded-full bg-[color:var(--dispatch)] px-4 py-3 text-sm font-semibold text-white hover:bg-[color:var(--dispatch)]/90"
        >
          Start navigation
        </Link>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-border px-4 py-3 text-sm font-semibold hover:bg-muted"
        >
          Mark en route
        </button>
      </div>
    </main>
  );
}
