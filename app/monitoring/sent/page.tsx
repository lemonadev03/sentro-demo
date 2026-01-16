"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Check, Users, MapPin, Radio, Clock } from "lucide-react";

type AlertData = {
  barangays: string[];
  residents: number;
  channels: string[];
};

export default function SentPage() {
  const [alertData, setAlertData] = useState<AlertData | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("alertSent");
    if (stored) {
      setAlertData(JSON.parse(stored));
    }
  }, []);

  // Format channel names
  const formatChannel = (channel: string) => {
    switch (channel) {
      case "push":
        return "Push notification";
      case "sms":
        return "SMS";
      case "email":
        return "Email";
      default:
        return channel;
    }
  };

  // Get current time
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-14 w-14 text-emerald-600" />
          </div>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Alert Sent Successfully
          </h1>
          <p className="mt-2 text-muted-foreground">
            Emergency notifications have been dispatched
          </p>
        </div>

        {/* Summary Card */}
        <div className="rounded-xl border border-border bg-card p-6 text-left">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
            Summary
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Sent to</p>
                <p className="font-semibold">
                  {alertData?.residents?.toLocaleString() || "7,370"} residents
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Barangays</p>
                <p className="font-semibold">
                  {alertData?.barangays?.join(", ") ||
                    "San Roque, Santa Ana, Malanday"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Radio className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Channels</p>
                <p className="font-semibold">
                  {alertData?.channels?.map(formatChannel).join(", ") ||
                    "Push notification, SMS"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="font-semibold">{currentTime}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Confirmations */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-left">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600">
                <Check className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium text-emerald-900">
                MDRRMO has been notified
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600">
                <Check className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium text-emerald-900">
                Rescue units have been alerted
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600">
                <Check className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium text-emerald-900">
                Evacuation centers activated
              </span>
            </div>
          </div>
        </div>

        {/* Return Button */}
        <Link
          href="/monitoring"
          className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-card px-6 py-4 font-semibold text-foreground hover:bg-muted transition-colors"
          onClick={() => {
            // Clear the sent alert data so they can send again
            sessionStorage.removeItem("alertSent");
          }}
        >
          Return to Monitoring
        </Link>
      </div>
    </div>
  );
}
