import Link from "next/link";
import HeaderBar from "@/components/HeaderBar";
import SectionCard from "@/components/SectionCard";
import { mockIncident } from "@/lib/mock-data";

export default function ResponderReportPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-8">
      <HeaderBar title="Resolution report" backHref="/responder/onsite" />

      <SectionCard
        title="Incident summary"
        description={`${mockIncident.title} • ${mockIncident.locationLabel}`}
      >
        <textarea
          defaultValue="Two vehicles involved. Minor injuries, scene secured. Tow requested."
          className="min-h-[140px] w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
        />
      </SectionCard>

      <SectionCard title="Follow-up actions">
        <textarea
          defaultValue="Issued incident number to drivers. Cleared roadway. Medical unit completed assessment."
          className="min-h-[140px] w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
        />
      </SectionCard>

      <Link
        href="/responder/complete"
        className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--success)] px-4 py-3 text-sm font-semibold text-white hover:bg-[color:var(--success)]/90"
      >
        Submit report
      </Link>
    </main>
  );
}
