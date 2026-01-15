import Link from "next/link";
import HeaderBar from "@/components/HeaderBar";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import { mockIncident } from "@/lib/mock-data";

export default function CitizenConfirmationPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-6 py-8">
      <HeaderBar title="Report received" backHref="/citizen/details" />

      <SectionCard
        title="You are all set"
        description="Dispatch has been notified and is reviewing your report."
      >
        <div className="space-y-3 text-sm">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status="pending" />
            <span className="text-muted-foreground">
              Report ID: {mockIncident.id}
            </span>
          </div>
          <p className="text-muted-foreground">
            We will send you updates as soon as a responder is assigned.
          </p>
        </div>
      </SectionCard>

      <Link
        href="/citizen/tracking?status=pending"
        className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
      >
        Track response
      </Link>
    </main>
  );
}
