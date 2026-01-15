import Link from "next/link";
import HeaderBar from "@/components/HeaderBar";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import { mockIncident } from "@/lib/mock-data";

export default function ResponderOnsitePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-8">
      <HeaderBar title="On scene" backHref="/responder/navigate" />

      <SectionCard
        title={mockIncident.title}
        description={mockIncident.locationLabel}
        action={<StatusBadge status="enroute" />}
      >
        <p className="text-sm text-muted-foreground">
          Confirm the situation and provide immediate care if needed.
        </p>
      </SectionCard>

      <SectionCard title="On-site checklist">
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Verify scene safety and traffic control.</li>
          <li>• Check for injuries and request medical support.</li>
          <li>• Collect photos and witness details.</li>
        </ul>
      </SectionCard>

      <Link
        href="/responder/report"
        className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--dispatch)] px-4 py-3 text-sm font-semibold text-white hover:bg-[color:var(--dispatch)]/90"
      >
        Complete report
      </Link>
    </main>
  );
}
