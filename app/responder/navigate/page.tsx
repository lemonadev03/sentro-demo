import Link from "next/link";
import HeaderBar from "@/components/HeaderBar";
import MapPlaceholder from "@/components/MapPlaceholder";
import SectionCard from "@/components/SectionCard";
import { assignedResponder, mockIncident } from "@/lib/mock-data";

export default function ResponderNavigatePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-8">
      <HeaderBar title="Navigation" backHref="/responder/assignment" />

      <SectionCard
        title="Route in progress"
        description={`${mockIncident.locationLabel} • ETA ${assignedResponder.eta}`}
      >
        <div className="flex items-center justify-between rounded-2xl bg-muted/40 px-4 py-3 text-sm">
          <span className="font-semibold">Turn-by-turn guidance</span>
          <span className="text-muted-foreground">2.1 mi remaining</span>
        </div>
      </SectionCard>

      <MapPlaceholder
        src="/demo/map-navigation.png"
        alt="Navigation map"
        label="Navigation view"
      />

      <Link
        href="/responder/onsite"
        className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--success)] px-4 py-3 text-sm font-semibold text-white hover:bg-[color:var(--success)]/90"
      >
        Arrived on scene
      </Link>
    </main>
  );
}
