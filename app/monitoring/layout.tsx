import { MonitoringProvider } from "@/lib/monitoring-context";

export default function MonitoringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MonitoringProvider>{children}</MonitoringProvider>;
}
