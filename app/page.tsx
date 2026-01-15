import Link from "next/link";
import SectionCard from "@/components/SectionCard";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-6 py-10">
      <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Sentro</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            A calm, human-centered incident response demo for citizens,
            dispatchers, and responders.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/citizen"
            className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Citizen flow
          </Link>
          <Link
            href="/dispatch"
            className="rounded-full bg-[color:var(--dispatch)] px-5 py-3 text-sm font-semibold text-white hover:bg-[color:var(--dispatch)]/90"
          >
            Dispatch flow
          </Link>
          <Link
            href="/responder"
            className="rounded-full border border-border px-5 py-3 text-sm font-semibold hover:bg-muted"
          >
            Responder flow
          </Link>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard
          title="Citizen"
          description="Report incidents in a few quick steps."
        >
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Guided report flow</li>
            <li>• Tracking updates</li>
            <li>• Post-incident feedback</li>
          </ul>
          <Link
            href="/citizen"
            className="mt-4 inline-flex items-center justify-center rounded-full border border-border px-3 py-1 text-xs font-semibold hover:bg-muted"
          >
            Open citizen demo
          </Link>
        </SectionCard>

        <SectionCard
          title="Dispatch"
          description="Prioritize incidents and dispatch units."
        >
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Live incident queue</li>
            <li>• Recommended units</li>
            <li>• Monitoring dashboard</li>
          </ul>
          <Link
            href="/dispatch"
            className="mt-4 inline-flex items-center justify-center rounded-full border border-border px-3 py-1 text-xs font-semibold hover:bg-muted"
          >
            Open dispatch demo
          </Link>
        </SectionCard>

        <SectionCard
          title="Responder"
          description="Respond to alerts with clear guidance."
        >
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Accept or decline alerts</li>
            <li>• Navigation + ETA</li>
            <li>• Resolution report</li>
          </ul>
          <Link
            href="/responder"
            className="mt-4 inline-flex items-center justify-center rounded-full border border-border px-3 py-1 text-xs font-semibold hover:bg-muted"
          >
            Open responder demo
          </Link>
        </SectionCard>
      </div>
    </main>
  );
}
