import Link from "next/link";
import HeaderBar from "@/components/HeaderBar";
import SectionCard from "@/components/SectionCard";
import { mockIncident } from "@/lib/mock-data";

export default function CitizenDetailsPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-6 py-8">
      <HeaderBar title="Add details" backHref="/citizen/type" />

      <SectionCard title="Location" description="Confirm the incident location.">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-muted/40 px-4 py-3 text-sm">
          <div>
            <p className="font-semibold">{mockIncident.locationLabel}</p>
            <p className="text-muted-foreground">{mockIncident.address}</p>
          </div>
          <button
            type="button"
            className="rounded-full border border-border px-3 py-1 text-xs font-semibold hover:bg-muted"
          >
            Edit
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Photo" description="Add a photo to help responders.">
        <div className="flex items-center gap-4">
          <div className="flex h-24 w-40 items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-xs text-muted-foreground">
            Photo placeholder
          </div>
          <div className="text-sm text-muted-foreground">
            Image upload will be added later.
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Description"
        description="Share what you see and whether anyone needs help."
      >
        <textarea
          defaultValue={mockIncident.description}
          className="min-h-[140px] w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
        />
      </SectionCard>

      <Link
        href="/citizen/confirmation"
        className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
      >
        Submit report
      </Link>
    </main>
  );
}
