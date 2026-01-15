import Link from "next/link";
import HeaderBar from "@/components/HeaderBar";

const incidentTypes = [
  { label: "Traffic accident", emoji: "🚗" },
  { label: "Medical emergency", emoji: "🩺" },
  { label: "Fire or smoke", emoji: "🔥" },
  { label: "Suspicious activity", emoji: "👀" },
  { label: "Infrastructure damage", emoji: "🛠️" },
  { label: "Other", emoji: "📝" },
];

export default function CitizenTypePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-6 py-8">
      <HeaderBar title="Select incident type" backHref="/citizen" />

      <div className="grid gap-4 sm:grid-cols-2">
        {incidentTypes.map((type) => (
          <Link
            key={type.label}
            href="/citizen/details"
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left text-sm font-semibold hover:border-foreground/30"
          >
            <span className="text-2xl">{type.emoji}</span>
            <span>{type.label}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
