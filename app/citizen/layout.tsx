"use client";

import { MonitoringProvider } from "@/lib/monitoring-context";

export default function CitizenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MonitoringProvider>{children}</MonitoringProvider>;
}
