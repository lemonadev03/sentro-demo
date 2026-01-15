"use client";

import { useState } from "react";
import Link from "next/link";
import HeaderBar from "@/components/HeaderBar";
import SectionCard from "@/components/SectionCard";
import TimelineStepper from "@/components/TimelineStepper";

const steps = [
  { key: "pending", label: "Report received" },
  { key: "assigned", label: "Responder assigned" },
  { key: "enroute", label: "Responder en route" },
  { key: "resolved", label: "Resolved" },
];

export default function CitizenResolvedPage() {
  const [rating, setRating] = useState(4);

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-6 py-8">
      <HeaderBar title="Share feedback" backHref="/citizen/tracking?status=resolved" />

      <SectionCard
        title="Response complete"
        description="Let us know how the response went so we can keep improving."
      >
        <TimelineStepper steps={steps} currentKey="resolved" />
      </SectionCard>

      <SectionCard title="Rate the experience">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl ${
                star <= rating ? "text-yellow-500" : "text-muted-foreground"
              }`}
            >
              ★
            </button>
          ))}
        </div>
        <textarea
          placeholder="Optional: Share any details about your experience."
          className="mt-4 min-h-[140px] w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
        />
      </SectionCard>

      <Link
        href="/citizen"
        className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
      >
        Done
      </Link>
    </main>
  );
}
