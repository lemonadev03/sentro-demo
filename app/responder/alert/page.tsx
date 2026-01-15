import Link from "next/link";
import { mockIncident } from "@/lib/mock-data";

export default function ResponderAlertPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
      <div className="w-full rounded-3xl border border-border bg-card p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-[color:var(--dispatch)] px-3 py-1 text-xs font-semibold text-white">
            New alert
          </span>
          <p className="text-xs text-muted-foreground">ETA 6 min</p>
        </div>
        <h1 className="text-2xl font-semibold">{mockIncident.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mockIncident.locationLabel} • {mockIncident.address}
        </p>
        <p className="mt-4 rounded-2xl bg-muted/40 p-4 text-sm">
          {mockIncident.description}
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/responder/assignment"
            className="inline-flex items-center justify-center rounded-full bg-[color:var(--success)] px-4 py-3 text-sm font-semibold text-white hover:bg-[color:var(--success)]/90"
          >
            Accept assignment
          </Link>
          <Link
            href="/responder"
            className="inline-flex items-center justify-center rounded-full border border-border px-4 py-3 text-sm font-semibold hover:bg-muted"
          >
            Decline
          </Link>
        </div>
      </div>
    </main>
  );
}
