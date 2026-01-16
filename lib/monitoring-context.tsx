"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type MonitoringState = {
  waterLevel: number;
  setWaterLevel: (level: number) => void;
  bannerDismissed: boolean;
  setBannerDismissed: (dismissed: boolean) => void;
  floatingAlertDismissed: boolean;
  setFloatingAlertDismissed: (dismissed: boolean) => void;
  alertTriggered: boolean;
};

const MonitoringContext = createContext<MonitoringState | null>(null);

export function MonitoringProvider({ children }: { children: ReactNode }) {
  const [waterLevel, setWaterLevel] = useState(1.2);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [floatingAlertDismissed, setFloatingAlertDismissed] = useState(false);

  const alertTriggered = waterLevel > 2.5;

  return (
    <MonitoringContext.Provider
      value={{
        waterLevel,
        setWaterLevel,
        bannerDismissed,
        setBannerDismissed,
        floatingAlertDismissed,
        setFloatingAlertDismissed,
        alertTriggered,
      }}
    >
      {children}
    </MonitoringContext.Provider>
  );
}

export function useMonitoring() {
  const context = useContext(MonitoringContext);
  if (!context) {
    throw new Error("useMonitoring must be used within a MonitoringProvider");
  }
  return context;
}
