"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { barangays } from "@/lib/monitoring-data";
import RecipientList from "@/components/monitoring/RecipientList";
import { ArrowLeft, Send, Bell, MessageSquare, Mail } from "lucide-react";

export default function ComposePage() {
  const router = useRouter();
  const [selectedBarangays, setSelectedBarangays] = useState<string[]>([]);
  const [channels, setChannels] = useState({
    push: true,
    sms: true,
    email: false,
  });

  // Load selected barangays from session storage
  useEffect(() => {
    const stored = sessionStorage.getItem("alertBarangays");
    if (stored) {
      setSelectedBarangays(JSON.parse(stored));
    } else {
      // Default selection
      setSelectedBarangays(["san-roque", "riverside", "malanday"]);
    }
  }, []);

  // Get selected barangay details
  const selectedDetails = useMemo(() => {
    return barangays.filter((b) => selectedBarangays.includes(b.id));
  }, [selectedBarangays]);

  const totalResidents = selectedDetails.reduce(
    (sum, b) => sum + b.residents,
    0
  );

  const handleToggle = (id: string) => {
    setSelectedBarangays((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleChannelToggle = (channel: keyof typeof channels) => {
    setChannels((prev) => ({ ...prev, [channel]: !prev[channel] }));
  };

  const handleSend = () => {
    // Store data for confirmation page
    sessionStorage.setItem(
      "alertSent",
      JSON.stringify({
        barangays: selectedDetails.map((b) => b.name),
        residents: totalResidents,
        channels: Object.entries(channels)
          .filter(([, enabled]) => enabled)
          .map(([name]) => name),
      })
    );
    router.push("/monitoring/sent");
  };

  // Generate alert message
  const alertMessage = useMemo(() => {
    const barangayNames = selectedDetails.map((b) => b.name).join(", ");
    const centers = selectedDetails.map((b) => `• ${b.evacuationCenter}`).join("\n");

    return `FLOOD WARNING — ${barangayNames}

Water levels have reached critical threshold. Evacuate to higher ground immediately.

Evacuation Centers:
${centers}

For assistance call: 911 or 8888

— City Disaster Risk Reduction Office`;
  }, [selectedDetails]);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card px-4 py-4">
        <div className="mx-auto flex max-w-3xl items-center gap-4">
          <Link
            href="/monitoring"
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold">Send Emergency Alert</h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl p-4 space-y-6">
        {/* Recipients */}
        <RecipientList
          recipients={barangays}
          selected={selectedBarangays}
          onToggle={handleToggle}
        />

        {/* Alert Message */}
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Alert Message
          </h3>
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-700 mb-2">
              FLOOD WARNING — {selectedDetails.map((b) => b.name).join(", ") || "No barangays selected"}
            </p>
            <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans">
              {alertMessage}
            </pre>
          </div>
        </div>

        {/* Send Via */}
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Send Via
          </h3>
          <div className="space-y-2">
            <label
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all",
                channels.push
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-slate-300"
              )}
            >
              <input
                type="checkbox"
                checked={channels.push}
                onChange={() => handleChannelToggle("push")}
                className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Push notification (Sentro app)</span>
            </label>

            <label
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all",
                channels.sms
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-slate-300"
              )}
            >
              <input
                type="checkbox"
                checked={channels.sms}
                onChange={() => handleChannelToggle("sms")}
                className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">SMS (registered numbers)</span>
            </label>

            <label
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all",
                channels.email
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-slate-300"
              )}
            >
              <input
                type="checkbox"
                checked={channels.email}
                onChange={() => handleChannelToggle("email")}
                className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Email</span>
            </label>
          </div>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={selectedBarangays.length === 0}
          className={cn(
            "w-full flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold text-white transition-all",
            selectedBarangays.length > 0
              ? "bg-red-600 hover:bg-red-700 active:scale-[0.99]"
              : "cursor-not-allowed bg-slate-300"
          )}
        >
          <Send className="h-5 w-5" />
          Send Alert to {totalResidents.toLocaleString()} Residents
        </button>
      </main>
    </div>
  );
}
