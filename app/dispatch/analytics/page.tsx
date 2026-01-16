"use client";

import { useState } from "react";
import Link from "next/link";
import HeaderBar from "@/components/HeaderBar";
import SectionCard from "@/components/SectionCard";

type Tone = "positive" | "neutral" | "warning";
type TimeRange = "24h" | "7d" | "30d" | "90d" | "ytd";
type StatusKey = "pending" | "enroute" | "onscene" | "resolved";

type RangeMeta = {
  label: string;
  comparison: string;
  volumeUnit: string;
  volumeUnitLabel: string;
  resolvedLabel: string;
};

type RangeSnapshot = {
  totals: {
    incidents: number;
    active: number;
    deployed: number;
    unitsTotal: number;
    avgResponse: number;
    resolutionRate: number;
    queueDepth: number;
  };
  kpiStarts: {
    incidents: number;
    active: number;
    deployed: number;
    avgResponse: number;
    resolutionRate: number;
    queueDepth: number;
  };
  kpiTrends: {
    incidents: string;
    avgResponse: string;
    resolutionRate: string;
  };
  volumeLabels: string[];
  volumeValues: number[];
  statusCounts: number[];
  typeWeights: number[];
  responseTimes: { priority: string; target: number; actual: number }[];
  fleetStatus: { role: string; total: number; available: number; busy: number }[];
};

type KpiData = {
  label: string;
  value: string;
  trend: string | null;
  trendLabel: string;
  tone: Tone;
  spark: number[];
};

type StatusItem = {
  key: StatusKey;
  status: string;
  count: number;
  color: string;
};

type IncidentTypeItem = {
  type: string;
  count: number;
  percentage: number;
  color: string;
};

type ResponseRow = {
  priority: string;
  target: number;
  actual: number;
  met: boolean;
  progress: number;
};

type DrilldownRow = {
  label: string;
  value: string;
  tone?: Tone;
};

type DrilldownPayload = {
  title: string;
  description?: string;
  rows: DrilldownRow[];
};

const toneStyles: Record<Tone, { trendClass: string; spark: string }> = {
  positive: {
    trendClass: "text-emerald-600",
    spark: "var(--civic-success-600)",
  },
  neutral: {
    trendClass: "text-muted-foreground",
    spark: "var(--civic-blue-500)",
  },
  warning: {
    trendClass: "text-amber-600",
    spark: "var(--civic-warning-600)",
  },
};

const timeRanges: { id: TimeRange; label: string }[] = [
  { id: "24h", label: "24h" },
  { id: "7d", label: "7d" },
  { id: "30d", label: "30d" },
  { id: "90d", label: "90d" },
  { id: "ytd", label: "YTD" },
];

const rangeMeta: Record<TimeRange, RangeMeta> = {
  "24h": {
    label: "Last 24 hours",
    comparison: "vs yesterday",
    volumeUnit: "/ hr",
    volumeUnitLabel: "per hr",
    resolvedLabel: "Resolved Today",
  },
  "7d": {
    label: "Last 7 days",
    comparison: "vs last week",
    volumeUnit: "/ day",
    volumeUnitLabel: "per day",
    resolvedLabel: "Resolved (7d)",
  },
  "30d": {
    label: "Last 30 days",
    comparison: "vs last month",
    volumeUnit: "/ wk",
    volumeUnitLabel: "per week",
    resolvedLabel: "Resolved (30d)",
  },
  "90d": {
    label: "Last 90 days",
    comparison: "vs last quarter",
    volumeUnit: "/ wk",
    volumeUnitLabel: "per week",
    resolvedLabel: "Resolved (90d)",
  },
  ytd: {
    label: "Year to date",
    comparison: "vs last year",
    volumeUnit: "/ mo",
    volumeUnitLabel: "per month",
    resolvedLabel: "Resolved (YTD)",
  },
};

const rangeSnapshots: Record<TimeRange, RangeSnapshot> = {
  "24h": {
    totals: {
      incidents: 47,
      active: 8,
      deployed: 12,
      unitsTotal: 27,
      avgResponse: 5.2,
      resolutionRate: 94,
      queueDepth: 4,
    },
    kpiStarts: {
      incidents: 31,
      active: 6,
      deployed: 9,
      avgResponse: 6.2,
      resolutionRate: 88,
      queueDepth: 6,
    },
    kpiTrends: {
      incidents: "+12%",
      avgResponse: "-8%",
      resolutionRate: "+2%",
    },
    volumeLabels: [
      "00:00",
      "02:00",
      "04:00",
      "06:00",
      "08:00",
      "10:00",
      "12:00",
      "14:00",
      "16:00",
      "18:00",
      "20:00",
      "22:00",
    ],
    volumeValues: [6, 5, 7, 10, 12, 9, 11, 14, 13, 15, 9, 7],
    statusCounts: [4, 6, 5, 32],
    typeWeights: [38, 26, 17, 13, 6],
    responseTimes: [
      { priority: "Critical", target: 3, actual: 2.1 },
      { priority: "Major", target: 5, actual: 4.3 },
      { priority: "Moderate", target: 10, actual: 6.8 },
      { priority: "Low", target: 15, actual: 12.4 },
    ],
    fleetStatus: [
      { role: "Traffic", total: 8, available: 6, busy: 2 },
      { role: "Medical/EMS", total: 7, available: 5, busy: 2 },
      { role: "Fire", total: 5, available: 4, busy: 1 },
      { role: "Hazmat", total: 2, available: 2, busy: 0 },
      { role: "Support", total: 5, available: 4, busy: 1 },
    ],
  },
  "7d": {
    totals: {
      incidents: 312,
      active: 14,
      deployed: 18,
      unitsTotal: 27,
      avgResponse: 5.5,
      resolutionRate: 92,
      queueDepth: 9,
    },
    kpiStarts: {
      incidents: 270,
      active: 12,
      deployed: 16,
      avgResponse: 6.2,
      resolutionRate: 90,
      queueDepth: 12,
    },
    kpiTrends: {
      incidents: "+9%",
      avgResponse: "-4%",
      resolutionRate: "+1%",
    },
    volumeLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    volumeValues: [38, 42, 51, 47, 54, 40, 40],
    statusCounts: [18, 24, 21, 249],
    typeWeights: [34, 29, 18, 12, 7],
    responseTimes: [
      { priority: "Critical", target: 3, actual: 2.4 },
      { priority: "Major", target: 5, actual: 4.8 },
      { priority: "Moderate", target: 10, actual: 7.2 },
      { priority: "Low", target: 15, actual: 12.9 },
    ],
    fleetStatus: [
      { role: "Traffic", total: 8, available: 5, busy: 3 },
      { role: "Medical/EMS", total: 7, available: 4, busy: 3 },
      { role: "Fire", total: 5, available: 3, busy: 2 },
      { role: "Hazmat", total: 2, available: 1, busy: 1 },
      { role: "Support", total: 5, available: 3, busy: 2 },
    ],
  },
  "30d": {
    totals: {
      incidents: 1320,
      active: 21,
      deployed: 19,
      unitsTotal: 27,
      avgResponse: 5.8,
      resolutionRate: 91,
      queueDepth: 11,
    },
    kpiStarts: {
      incidents: 1180,
      active: 18,
      deployed: 17,
      avgResponse: 6.4,
      resolutionRate: 89,
      queueDepth: 15,
    },
    kpiTrends: {
      incidents: "+6%",
      avgResponse: "-3%",
      resolutionRate: "+1%",
    },
    volumeLabels: ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5"],
    volumeValues: [260, 285, 310, 290, 175],
    statusCounts: [60, 88, 72, 1100],
    typeWeights: [36, 24, 20, 12, 8],
    responseTimes: [
      { priority: "Critical", target: 3, actual: 2.6 },
      { priority: "Major", target: 5, actual: 5.2 },
      { priority: "Moderate", target: 10, actual: 7.9 },
      { priority: "Low", target: 15, actual: 13.8 },
    ],
    fleetStatus: [
      { role: "Traffic", total: 8, available: 5, busy: 3 },
      { role: "Medical/EMS", total: 7, available: 4, busy: 3 },
      { role: "Fire", total: 5, available: 3, busy: 2 },
      { role: "Hazmat", total: 2, available: 1, busy: 1 },
      { role: "Support", total: 5, available: 3, busy: 2 },
    ],
  },
  "90d": {
    totals: {
      incidents: 3980,
      active: 26,
      deployed: 20,
      unitsTotal: 27,
      avgResponse: 6.1,
      resolutionRate: 90,
      queueDepth: 15,
    },
    kpiStarts: {
      incidents: 3600,
      active: 22,
      deployed: 18,
      avgResponse: 6.6,
      resolutionRate: 88,
      queueDepth: 18,
    },
    kpiTrends: {
      incidents: "+4%",
      avgResponse: "-2%",
      resolutionRate: "+1%",
    },
    volumeLabels: ["Wk 1", "Wk 3", "Wk 5", "Wk 7", "Wk 9", "Wk 11"],
    volumeValues: [940, 1020, 980, 1100, 1060, 880],
    statusCounts: [140, 180, 160, 3500],
    typeWeights: [32, 30, 19, 11, 8],
    responseTimes: [
      { priority: "Critical", target: 3, actual: 2.7 },
      { priority: "Major", target: 5, actual: 5.4 },
      { priority: "Moderate", target: 10, actual: 8.5 },
      { priority: "Low", target: 15, actual: 14.2 },
    ],
    fleetStatus: [
      { role: "Traffic", total: 8, available: 4, busy: 4 },
      { role: "Medical/EMS", total: 7, available: 3, busy: 4 },
      { role: "Fire", total: 5, available: 2, busy: 3 },
      { role: "Hazmat", total: 2, available: 1, busy: 1 },
      { role: "Support", total: 5, available: 2, busy: 3 },
    ],
  },
  ytd: {
    totals: {
      incidents: 14820,
      active: 24,
      deployed: 17,
      unitsTotal: 27,
      avgResponse: 5.9,
      resolutionRate: 92,
      queueDepth: 10,
    },
    kpiStarts: {
      incidents: 13200,
      active: 20,
      deployed: 15,
      avgResponse: 6.5,
      resolutionRate: 90,
      queueDepth: 14,
    },
    kpiTrends: {
      incidents: "+3%",
      avgResponse: "-1%",
      resolutionRate: "+2%",
    },
    volumeLabels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    volumeValues: [1200, 1280, 1320, 1410, 1550, 1620, 1680, 1720, 1580, 1500, 1430, 1360],
    statusCounts: [220, 280, 260, 14060],
    typeWeights: [35, 27, 18, 12, 8],
    responseTimes: [
      { priority: "Critical", target: 3, actual: 2.5 },
      { priority: "Major", target: 5, actual: 5.1 },
      { priority: "Moderate", target: 10, actual: 8.0 },
      { priority: "Low", target: 15, actual: 13.5 },
    ],
    fleetStatus: [
      { role: "Traffic", total: 8, available: 6, busy: 2 },
      { role: "Medical/EMS", total: 7, available: 5, busy: 2 },
      { role: "Fire", total: 5, available: 4, busy: 1 },
      { role: "Hazmat", total: 2, available: 2, busy: 0 },
      { role: "Support", total: 5, available: 4, busy: 1 },
    ],
  },
};

const statusCatalog: { key: StatusKey; label: string; color: string }[] = [
  { key: "pending", label: "Pending Assignment", color: "var(--civic-warning-500)" },
  { key: "enroute", label: "Units En Route", color: "var(--civic-blue-500)" },
  { key: "onscene", label: "On Scene", color: "var(--civic-info-500)" },
  { key: "resolved", label: "Resolved", color: "var(--civic-success-500)" },
];

const incidentTypeCatalog: { type: string; color: string }[] = [
  { type: "Traffic Collision", color: "var(--civic-blue-500)" },
  { type: "Medical Emergency", color: "var(--civic-info-500)" },
  { type: "Fire", color: "var(--civic-warning-500)" },
  { type: "Infrastructure", color: "var(--civic-danger-500)" },
  { type: "Other", color: "var(--civic-slate-400)" },
];

const statusInsights: Record<StatusKey, { dwell: string; focus: string; next: string }> = {
  pending: {
    dwell: "6.4 min",
    focus: "North + Central backlog",
    next: "Dispatch Ops",
  },
  enroute: {
    dwell: "5.1 min travel",
    focus: "EDSA + C5 corridors",
    next: "Traffic Control",
  },
  onscene: {
    dwell: "14 min on scene",
    focus: "Medical + Fire overlap",
    next: "Ops West",
  },
  resolved: {
    dwell: "24 min resolution",
    focus: "Makati CBD",
    next: "Quality Review",
  },
};

const typeInsights: Record<string, { corridor: string; avg: string; peak: string }> = {
  "Traffic Collision": {
    corridor: "EDSA / C5",
    avg: "4.7 min",
    peak: "17:00-19:00",
  },
  "Medical Emergency": {
    corridor: "Roxas Blvd",
    avg: "5.1 min",
    peak: "10:00-12:00",
  },
  Fire: {
    corridor: "Makati CBD",
    avg: "6.3 min",
    peak: "13:00-15:00",
  },
  Infrastructure: {
    corridor: "Ortigas Loop",
    avg: "8.2 min",
    peak: "09:00-11:00",
  },
  Other: {
    corridor: "Mixed zones",
    avg: "7.4 min",
    peak: "16:00-18:00",
  },
};

const responseInsights: Record<string, { percentile: string; compliance: string }> = {
  Critical: { percentile: "3.4 min", compliance: "94%" },
  Major: { percentile: "5.8 min", compliance: "91%" },
  Moderate: { percentile: "9.6 min", compliance: "88%" },
  Low: { percentile: "13.9 min", compliance: "96%" },
};

const recentIncidents = [
  {
    id: "INC-2209",
    type: "Traffic Collision",
    location: "EDSA & Aurora",
    status: "On Scene",
    time: "2m ago",
  },
  {
    id: "INC-2208",
    type: "Fire Alarm",
    location: "Katipunan Ave",
    status: "Resolved",
    time: "5m ago",
  },
  {
    id: "INC-2207",
    type: "Medical Emergency",
    location: "Roxas Blvd",
    status: "Resolved",
    time: "12m ago",
  },
  {
    id: "INC-2206",
    type: "Power Outage",
    location: "Makati CBD",
    status: "Resolved",
    time: "18m ago",
  },
  {
    id: "INC-2205",
    type: "Traffic Accident",
    location: "C5 Northbound",
    status: "Resolved",
    time: "24m ago",
  },
];

type Point = { x: number; y: number };

const formatNumber = (value: number) => value.toLocaleString("en-US");

const buildSparkline = (
  start: number,
  end: number,
  points: number,
  wobble: number,
  decimals: number
) => {
  if (points <= 1) return [Number(end.toFixed(decimals))];
  const step = (end - start) / (points - 1);
  return Array.from({ length: points }, (_, index) => {
    const base = start + step * index;
    const offset =
      index === 0 || index === points - 1
        ? 0
        : Math.sin(index * 1.4) * wobble;
    return Number((base + offset).toFixed(decimals));
  });
};

const makeVolumeSeries = (labels: string[], values: number[]) =>
  labels.map((time, index) => ({ time, value: values[index] ?? 0 }));

const buildKpis = (snapshot: RangeSnapshot, meta: RangeMeta): KpiData[] => {
  const utilization = Math.round(
    (snapshot.totals.deployed / snapshot.totals.unitsTotal) * 100
  );
  const totalWobble = Math.max(1, Math.round(snapshot.totals.incidents * 0.006));

  return [
    {
      label: "Total Incidents",
      value: formatNumber(snapshot.totals.incidents),
      trend: snapshot.kpiTrends.incidents,
      trendLabel: meta.comparison,
      tone: "warning",
      spark: buildSparkline(
        snapshot.kpiStarts.incidents,
        snapshot.totals.incidents,
        7,
        totalWobble,
        0
      ),
    },
    {
      label: "Active Incidents",
      value: formatNumber(snapshot.totals.active),
      trend: null,
      trendLabel: "real-time",
      tone: "neutral",
      spark: buildSparkline(
        snapshot.kpiStarts.active,
        snapshot.totals.active,
        7,
        0.8,
        0
      ),
    },
    {
      label: "Units Deployed",
      value: `${snapshot.totals.deployed}/${snapshot.totals.unitsTotal}`,
      trend: null,
      trendLabel: `${utilization}% utilization`,
      tone: "neutral",
      spark: buildSparkline(
        snapshot.kpiStarts.deployed,
        snapshot.totals.deployed,
        7,
        0.8,
        0
      ),
    },
    {
      label: "Avg Response",
      value: `${snapshot.totals.avgResponse.toFixed(1)} min`,
      trend: snapshot.kpiTrends.avgResponse,
      trendLabel: meta.comparison,
      tone: "positive",
      spark: buildSparkline(
        snapshot.kpiStarts.avgResponse,
        snapshot.totals.avgResponse,
        7,
        0.2,
        1
      ),
    },
    {
      label: "Resolution Rate",
      value: `${snapshot.totals.resolutionRate}%`,
      trend: snapshot.kpiTrends.resolutionRate,
      trendLabel: meta.comparison,
      tone: "positive",
      spark: buildSparkline(
        snapshot.kpiStarts.resolutionRate,
        snapshot.totals.resolutionRate,
        7,
        0.6,
        0
      ),
    },
    {
      label: "Queue Depth",
      value: formatNumber(snapshot.totals.queueDepth),
      trend: null,
      trendLabel: "pending",
      tone: "warning",
      spark: buildSparkline(
        snapshot.kpiStarts.queueDepth,
        snapshot.totals.queueDepth,
        7,
        0.8,
        0
      ),
    },
  ];
};

const buildStatusBreakdown = (
  snapshot: RangeSnapshot,
  meta: RangeMeta
): StatusItem[] =>
  statusCatalog.map((item, index) => ({
    key: item.key,
    status: item.key === "resolved" ? meta.resolvedLabel : item.label,
    count: snapshot.statusCounts[index] ?? 0,
    color: item.color,
  }));

const buildIncidentTypes = (snapshot: RangeSnapshot): IncidentTypeItem[] => {
  let remaining = snapshot.totals.incidents;
  const items = incidentTypeCatalog.map((item, index) => {
    const weight = snapshot.typeWeights[index] ?? 0;
    const count =
      index === incidentTypeCatalog.length - 1
        ? remaining
        : Math.max(1, Math.round((snapshot.totals.incidents * weight) / 100));
    remaining -= count;
    return { ...item, count, percentage: 0 };
  });
  const total = items.reduce((acc, item) => acc + item.count, 0) || 1;
  return items.map((item) => ({
    ...item,
    percentage: Math.round((item.count / total) * 100),
  }));
};

const buildPoints = (data: number[], width: number, height: number): Point[] => {
  if (data.length === 0) return [];
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  return data.map((value, index) => ({
    x: (index / Math.max(data.length - 1, 1)) * width,
    y: height - ((value - min) / range) * height,
  }));
};

const buildLinePaths = (data: number[], width: number, height: number) => {
  const points = buildPoints(data, width, height);
  if (points.length === 0) {
    return { linePath: "", areaPath: "", points };
  }

  const linePath = points
    .map((point, index) =>
      `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
    )
    .join(" ");
  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;
  return { linePath, areaPath, points };
};

const buildConicGradient = (values: number[], colors: string[]) => {
  const total = values.reduce((acc, value) => acc + value, 0) || 1;
  let current = 0;

  return values
    .map((value, index) => {
      const start = current;
      current += (value / total) * 100;
      return `${colors[index]} ${start}% ${current}%`;
    })
    .join(", ");
};

type SparklineProps = {
  data: number[];
  color: string;
};

function Sparkline({ data, color }: SparklineProps) {
  const points = buildPoints(data, 100, 30);
  if (points.length === 0) return null;
  const pointString = points
    .map((point) => `${point.x},${point.y}`)
    .join(" ");
  const lastPoint = points[points.length - 1];

  return (
    <svg viewBox="0 0 100 30" className="h-full w-full" aria-hidden="true">
      <polyline
        points={pointString}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={lastPoint.x} cy={lastPoint.y} r="2" fill={color} />
    </svg>
  );
}

type TooltipBubbleProps = {
  label: string;
  align?: "left" | "center" | "right";
};

function TooltipBubble({ label, align = "right" }: TooltipBubbleProps) {
  const alignClass =
    align === "left"
      ? "left-2"
      : align === "center"
      ? "left-1/2 -translate-x-1/2"
      : "right-2";

  return (
    <span
      className={`pointer-events-none absolute ${alignClass} -top-1 -translate-y-full whitespace-nowrap rounded-md border border-border bg-card px-2 py-1 text-[11px] text-muted-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100`}
    >
      {label}
    </span>
  );
}

export default function GlobalAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("24h");
  const [drilldown, setDrilldown] = useState<DrilldownPayload | null>(null);

  const meta = rangeMeta[timeRange];
  const rangePhrase =
    timeRange === "ytd" ? "year to date" : `the ${meta.label.toLowerCase()}`;
  const snapshot = rangeSnapshots[timeRange];
  const kpiData = buildKpis(snapshot, meta);
  const statusBreakdown = buildStatusBreakdown(snapshot, meta);
  const incidentTypes = buildIncidentTypes(snapshot);
  const incidentVolume = makeVolumeSeries(
    snapshot.volumeLabels,
    snapshot.volumeValues
  );
  const responseTimes = snapshot.responseTimes;
  const fleetStatus = snapshot.fleetStatus;

  const fleetTotals = fleetStatus.reduce(
    (acc, item) => ({
      total: acc.total + item.total,
      available: acc.available + item.available,
      busy: acc.busy + item.busy,
    }),
    { total: 0, available: 0, busy: 0 }
  );

  const incidentTotal = incidentTypes.reduce(
    (acc, item) => acc + item.count,
    0
  );
  const incidentGradient = buildConicGradient(
    incidentTypes.map((item) => item.count),
    incidentTypes.map((item) => item.color)
  );

  const statusMax = Math.max(
    1,
    ...statusBreakdown.map((item) => item.count)
  );
  const statusTotal = statusBreakdown.reduce(
    (acc, item) => acc + item.count,
    0
  );
  const activeTotal = statusBreakdown
    .filter((item) => item.key !== "resolved")
    .reduce((acc, item) => acc + item.count, 0);

  const volumeValues = incidentVolume.map((item) => item.value);
  const volumeStats = {
    current: volumeValues[volumeValues.length - 1] ?? 0,
    peak: Math.max(...volumeValues),
    average: Math.round(
      volumeValues.reduce((acc, value) => acc + value, 0) /
        Math.max(volumeValues.length, 1)
    ),
  };
  const volumeChart = buildLinePaths(volumeValues, 100, 40);
  const volumeLastPoint = volumeChart.points[volumeChart.points.length - 1];
  const volumeLabelStep = incidentVolume.length <= 7 ? 1 : 2;

  const responseRows: ResponseRow[] = responseTimes.map((item) => {
    const progress = Math.min((item.actual / item.target) * 100, 100);
    return {
      ...item,
      met: item.actual <= item.target,
      progress,
    };
  });

  const buildStatusDrilldown = (item: StatusItem): DrilldownPayload => {
    const insight = statusInsights[item.key];
    return {
      title: item.status,
      description: `${meta.label} status detail`,
      rows: [
        { label: "Incidents in range", value: formatNumber(item.count) },
        { label: "Median dwell", value: insight.dwell },
        { label: "Operational focus", value: insight.focus },
        { label: "Next escalation", value: insight.next },
      ],
    };
  };

  const buildTypeDrilldown = (item: IncidentTypeItem): DrilldownPayload => {
    const insight = typeInsights[item.type];
    return {
      title: item.type,
      description: `${meta.label} distribution`,
      rows: [
        { label: "Reports", value: formatNumber(item.count) },
        { label: "Share of total", value: `${item.percentage}%` },
        { label: "Top corridor", value: insight.corridor },
        { label: "Avg response", value: insight.avg },
        { label: "Peak window", value: insight.peak },
      ],
    };
  };

  const buildResponseDrilldown = (item: ResponseRow): DrilldownPayload => {
    const insight = responseInsights[item.priority] ?? {
      percentile: "-",
      compliance: "-",
    };
    return {
      title: `${item.priority} Response`,
      description: `${meta.label} SLA performance`,
      rows: [
        { label: "Target", value: `${item.target} min` },
        {
          label: "Actual",
          value: `${item.actual} min`,
          tone: item.met ? "positive" : "warning",
        },
        { label: "95th percentile", value: insight.percentile },
        { label: "SLA compliance", value: insight.compliance },
      ],
    };
  };

  const buildFleetDrilldown = (item: {
    role: string;
    total: number;
    available: number;
    busy: number;
  }): DrilldownPayload => {
    const utilization = Math.round((item.busy / item.total) * 100);
    const utilizationTone =
      utilization >= 70 ? "warning" : utilization >= 45 ? "neutral" : "positive";
    return {
      title: `${item.role} Units`,
      description: `${meta.label} availability`,
      rows: [
        { label: "Available", value: `${item.available} units` },
        {
          label: "Busy",
          value: `${item.busy} units`,
          tone: item.busy > item.available ? "warning" : undefined,
        },
        {
          label: "Utilization",
          value: `${utilization}%`,
          tone: utilizationTone === "neutral" ? undefined : utilizationTone,
        },
      ],
    };
  };

  const buildVolumeDrilldown = (
    point: { time: string; value: number },
    index: number
  ): DrilldownPayload => {
    const prev = incidentVolume[index - 1]?.value;
    const delta = prev !== undefined ? point.value - prev : 0;
    const deltaLabel =
      prev !== undefined
        ? `${delta >= 0 ? "+" : ""}${delta} vs prior`
        : "Baseline";
    return {
      title: `Volume at ${point.time}`,
      description: `${meta.label} cadence`,
      rows: [
        {
          label: "Reports",
          value: `${formatNumber(point.value)} ${meta.volumeUnitLabel}`,
        },
        {
          label: "Change",
          value: deltaLabel,
          tone: delta > 0 ? "warning" : delta < 0 ? "positive" : undefined,
        },
        { label: "Peak channel", value: "Phone + SMS mix" },
      ],
    };
  };

  return (
    <main className="page mx-auto flex min-h-screen max-w-6xl flex-col gap-6">
      <HeaderBar title="Command Center Analytics" backHref="/dispatch" />
      <p className="-mt-2 text-sm text-muted-foreground px-1">
        System-wide operational metrics and performance overview
      </p>
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground">
            Time range
          </span>
          <div className="inline-flex rounded-full border border-border bg-muted/30 p-1">
            {timeRanges.map((range) => {
              const isActive = range.id === timeRange;
              return (
                <button
                  key={range.id}
                  type="button"
                  onClick={() => setTimeRange(range.id)}
                  aria-pressed={isActive}
                  title={rangeMeta[range.id].label}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {range.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>
            Window:{" "}
            <span className="font-semibold text-foreground">{meta.label}</span>
          </span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span>Updated 2m ago</span>
        </div>
      </div>

      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {kpiData.map((kpi) => {
          const tone = toneStyles[kpi.tone];
          return (
            <div
              key={kpi.label}
              className="rounded-lg border border-border bg-card px-4 py-3"
            >
              <p className="text-xs font-semibold text-muted-foreground truncate">
                {kpi.label}
              </p>
              <div className="mt-2 flex items-end justify-between gap-2">
                <p className="text-2xl font-semibold text-foreground">
                  {kpi.value}
                </p>
                {kpi.trend && (
                  <span className={`text-xs font-semibold ${tone.trendClass}`}>
                    {kpi.trend}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{kpi.trendLabel}</p>
              <div className="mt-2 h-8">
                <Sparkline data={kpi.spark} color={tone.spark} />
              </div>
            </div>
          );
        })}
      </div>

      <SectionCard
        title="Incident Volume"
        description={`Reports in ${rangePhrase}`}
      >
        <div className="rounded-lg border border-border bg-muted/10 p-4">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
            <div>
              Current
              <span className="ml-2 text-sm font-semibold text-foreground">
                {formatNumber(volumeStats.current)} {meta.volumeUnit}
              </span>
            </div>
            <div>
              Peak
              <span className="ml-2 text-sm font-semibold text-foreground">
                {formatNumber(volumeStats.peak)} {meta.volumeUnit}
              </span>
            </div>
            <div>
              Avg
              <span className="ml-2 text-sm font-semibold text-foreground">
                {formatNumber(volumeStats.average)} {meta.volumeUnit}
              </span>
            </div>
          </div>
          <div className="relative mt-4 h-36">
            <svg
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
              className="h-full w-full"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="incidentVolumeFill"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--civic-blue-400)"
                    stopOpacity="0.35"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--civic-blue-400)"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>
              <path d={volumeChart.areaPath} fill="url(#incidentVolumeFill)" />
              <path
                d={volumeChart.linePath}
                fill="none"
                stroke="var(--civic-blue-600)"
                strokeWidth="2"
              />
              {volumeLastPoint && (
                <circle
                  cx={volumeLastPoint.x}
                  cy={volumeLastPoint.y}
                  r="2.5"
                  fill="var(--civic-blue-600)"
                />
              )}
            </svg>
            <div className="absolute inset-0">
              {volumeChart.points.map((point, index) => {
                const datum = incidentVolume[index];
                if (!datum) return null;
                return (
                  <button
                    key={datum.time}
                    type="button"
                    onClick={() =>
                      setDrilldown(buildVolumeDrilldown(datum, index))
                    }
                    aria-label={`Volume at ${datum.time}`}
                    className="group absolute flex h-3 w-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                    style={{
                      left: `${point.x}%`,
                      top: `${(point.y / 40) * 100}%`,
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--civic-blue-600)" }}
                    />
                    <span className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-border bg-card px-2 py-1 text-[11px] text-muted-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                      {datum.time} - {datum.value} reports
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
            {incidentVolume
              .filter((_, index) => index % volumeLabelStep === 0)
              .map((item) => (
                <span key={item.time}>{item.time}</span>
              ))}
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Status Breakdown"
          description={`Distribution across ${rangePhrase}`}
        >
          <div className="space-y-2">
            {statusBreakdown.map((item) => {
              const percentage = statusTotal
                ? Math.round((item.count / statusTotal) * 100)
                : 0;
              return (
                <button
                  key={item.status}
                  type="button"
                  onClick={() => setDrilldown(buildStatusDrilldown(item))}
                  className="group relative w-full rounded-lg px-2 py-2 text-left transition-colors hover:bg-muted/30"
                >
                  <TooltipBubble
                    label={`${formatNumber(item.count)} incidents - ${percentage}%`}
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">
                      {item.status}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {item.count}
                    </span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-muted/40">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${(item.count / statusMax) * 100}%`,
                        background: item.color,
                      }}
                    />
                  </div>
                </button>
              );
            })}
            <div className="rounded-lg border border-border bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
              Active incidents
              <span className="ml-2 font-semibold text-foreground">
                {activeTotal}
              </span>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Incidents by Type"
          description={`Distribution for ${rangePhrase}`}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative h-36 w-36 shrink-0 self-center">
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: `conic-gradient(${incidentGradient})` }}
              />
              <div className="absolute inset-[14px] rounded-full bg-card" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs text-muted-foreground">Total</span>
                <span className="text-xl font-semibold text-foreground">
                  {formatNumber(incidentTotal)}
                </span>
              </div>
            </div>
            <div className="flex-1 space-y-1">
              {incidentTypes.map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setDrilldown(buildTypeDrilldown(item))}
                  className="group relative flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm transition-colors hover:bg-muted/30"
                >
                  <TooltipBubble
                    label={`${formatNumber(item.count)} incidents - ${item.percentage}%`}
                  />
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: item.color }}
                    />
                    <span className="text-foreground">{item.type}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {item.count} - {item.percentage}%
                  </span>
                </button>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Response Time Performance"
          description={`Target vs actual for ${rangePhrase}`}
        >
          <div className="space-y-2">
            {responseRows.map((item) => (
              <button
                key={item.priority}
                type="button"
                onClick={() => setDrilldown(buildResponseDrilldown(item))}
                className="group relative w-full rounded-lg px-2 py-2 text-left transition-colors hover:bg-muted/30"
              >
                <TooltipBubble
                  label={`Target ${item.target} min - Actual ${item.actual} min`}
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">
                    {item.priority}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      item.met ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {item.met ? "On target" : "Over target"}
                  </span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted/40">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${item.progress}%`,
                      background: item.met
                        ? "var(--civic-success-500)"
                        : "var(--civic-danger-500)",
                    }}
                  />
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Target {item.target} min</span>
                  <span>Actual {item.actual} min</span>
                </div>
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Fleet Overview" description="Availability by role">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Available
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Busy
            </span>
          </div>
          <div className="mt-4 space-y-2">
            {fleetStatus.map((item) => {
              const availablePct = (item.available / item.total) * 100;
              const busyPct = (item.busy / item.total) * 100;
              return (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => setDrilldown(buildFleetDrilldown(item))}
                  className="group relative w-full rounded-lg px-2 py-2 text-left transition-colors hover:bg-muted/30"
                >
                  <TooltipBubble
                    label={`${item.available} available - ${item.busy} busy`}
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">
                      {item.role}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.available} avail / {item.total} total
                    </span>
                  </div>
                  <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-muted/40">
                    <div
                      className="h-2"
                      style={{
                        width: `${availablePct}%`,
                        background: "var(--civic-success-500)",
                      }}
                    />
                    <div
                      className="h-2"
                      style={{
                        width: `${busyPct}%`,
                        background: "var(--civic-warning-500)",
                      }}
                    />
                  </div>
                </button>
              );
            })}
            <div className="rounded-lg border border-border bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
              Total fleet
              <span className="ml-2 font-semibold text-foreground">
                {fleetTotals.available} available / {fleetTotals.total}
              </span>
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Recent Incidents"
        description="Latest activity across all categories"
      >
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2 text-left font-semibold">ID</th>
                <th className="px-4 py-2 text-left font-semibold">Type</th>
                <th className="px-4 py-2 text-left font-semibold">Location</th>
                <th className="px-4 py-2 text-left font-semibold">Status</th>
                <th className="px-4 py-2 text-right font-semibold">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentIncidents.map((incident, idx) => (
                <tr
                  key={incident.id}
                  className={
                    idx !== recentIncidents.length - 1
                      ? "border-b border-border"
                      : ""
                  }
                >
                  <td className="px-4 py-2.5 font-mono text-xs font-semibold">
                    {incident.id}
                  </td>
                  <td className="px-4 py-2.5">{incident.type}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    {incident.location}
                  </td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        incident.status === "On Scene"
                          ? "bg-amber-500/20 text-amber-600"
                          : incident.status === "Resolved"
                          ? "bg-emerald-500/20 text-emerald-600"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {incident.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right text-muted-foreground">
                    {incident.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard title="Reports" description="Detailed analytics reports">
        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            href="/dispatch/analytics/incident"
            className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-3 hover:bg-muted/50 transition-colors"
          >
            <div>
              <p className="font-semibold">Incident Report</p>
              <p className="text-xs text-muted-foreground">
                Detailed incident metrics
              </p>
            </div>
            <span className="text-muted-foreground">→</span>
          </Link>
          <div className="flex items-center justify-between rounded-xl border border-dashed border-border bg-muted/10 px-4 py-3 opacity-60">
            <div>
              <p className="font-semibold">Responder Report</p>
              <p className="text-xs text-muted-foreground">Coming soon</p>
            </div>
            <span className="text-muted-foreground">→</span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-dashed border-border bg-muted/10 px-4 py-3 opacity-60">
            <div>
              <p className="font-semibold">Area Report</p>
              <p className="text-xs text-muted-foreground">Coming soon</p>
            </div>
            <span className="text-muted-foreground">→</span>
          </div>
        </div>
      </SectionCard>

      <div className="flex justify-center">
        <Link
          href="/dispatch"
          className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
        >
          Back to Dispatch Home
        </Link>
      </div>

      {drilldown ? (
        <div
          className="modal-overlay z-[10000]"
          role="dialog"
          aria-modal="true"
          aria-label={drilldown.title}
          onClick={() => setDrilldown(null)}
        >
          <div
            className="modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {drilldown.title}
                </h3>
                {drilldown.description ? (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {drilldown.description}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="modal-body space-y-3">
              {drilldown.rows.map((row) => {
                const toneClass = row.tone
                  ? toneStyles[row.tone].trendClass
                  : "text-foreground";
                return (
                  <div
                    key={row.label}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className={`font-semibold ${toneClass}`}>
                      {row.value}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setDrilldown(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
