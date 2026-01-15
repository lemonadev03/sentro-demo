import Link from "next/link";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import { mockIncident } from "@/lib/mock-data";

export default function CitizenHomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-8">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">Sentro</span>
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">
            Citizen
          </span>
        </div>
        <Link
          href="/citizen/tracking"
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
        >
          Track report
        </Link>
      </header>

      <SectionCard
        title="Report an incident"
        description="Start a report in under a minute. Share location, photo, and details."
        action={
          <Link
            href="/citizen/type"
            className="rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
          >
            File a Report
          </Link>
        }
      >
      </SectionCard>

      <SectionCard
        title="My reports"
        description="Recent incident reports submitted from this device."
      >
        <div className="rounded-2xl border border-border bg-background p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">
                {mockIncident.id}
              </p>
              <p className="text-base font-semibold">{mockIncident.title}</p>
              <p className="text-sm text-muted-foreground">
                {mockIncident.locationLabel}
              </p>
            </div>
            <StatusBadge status="pending" />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <span className="text-muted-foreground">
              Reported {mockIncident.reportedAt}
            </span>
            <Link
              href="/citizen/tracking?status=pending"
              className="rounded-full border border-border px-3 py-1 text-xs font-semibold hover:bg-muted"
            >
              View status
            </Link>
          </div>
        </div>
      </SectionCard>
    </main>
  );
}
