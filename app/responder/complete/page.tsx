import Link from "next/link";
import SectionCard from "@/components/SectionCard";

export default function ResponderCompletePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-8">
      <SectionCard
        title="Report submitted"
        description="Thank you for closing out the incident."
      >
        <div className="rounded-2xl bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          Dispatch has been notified and the incident was marked as resolved.
        </div>
      </SectionCard>

      <Link
        href="/responder"
        className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--dispatch)] px-4 py-3 text-sm font-semibold text-white hover:bg-[color:var(--dispatch)]/90"
      >
        Back to home
      </Link>
    </main>
  );
}
