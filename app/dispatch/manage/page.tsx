"use client";

import Link from "next/link";
import {
  Building2,
  MapPin,
  Car,
  Users,
  UserCircle,
  Calendar,
  Inbox,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  ClipboardList,
} from "lucide-react";
import {
  mockStations,
  mockBarangays,
  mockVehicles,
  mockTeams,
  mockUsers,
  mockSchedules,
  getPendingRequests,
  getUserById,
  requestTypeLabels,
} from "@/lib/mock-crud-data";

const stats = [
  {
    label: "Stations",
    value: mockStations.filter((s) => s.isActive).length,
    total: mockStations.length,
    icon: Building2,
    href: "/dispatch/manage/stations",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    label: "Barangays",
    value: mockBarangays.length,
    icon: MapPin,
    href: "/dispatch/manage/barangays",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    label: "Vehicles",
    value: mockVehicles.filter((v) => v.status === "available").length,
    total: mockVehicles.length,
    icon: Car,
    href: "/dispatch/manage/vehicles",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    label: "Teams",
    value: mockTeams.filter((t) => t.status === "available").length,
    total: mockTeams.length,
    icon: Users,
    href: "/dispatch/manage/teams",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    label: "Responders",
    value: mockUsers.filter((u) => u.role === "responder" && u.status === "active").length,
    total: mockUsers.filter((u) => u.role === "responder").length,
    icon: UserCircle,
    href: "/dispatch/manage/responders",
    color: "text-cyan-600",
    bgColor: "bg-cyan-100",
  },
  {
    label: "Active Schedules",
    value: mockSchedules.filter((s) => s.status === "active" || s.status === "scheduled").length,
    icon: Calendar,
    href: "/dispatch/manage/schedules",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
];

export default function ManageDashboard() {
  const pendingRequests = getPendingRequests();

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Resource Management</h1>
          <p className="page-subtitle">
            Manage stations, vehicles, teams, and personnel
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="card card-interactive p-4"
            >
              <div className={`${stat.bgColor} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div className="stat-value text-2xl">{stat.value}</div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
                {stat.total !== undefined && (
                  <span className="text-xs ml-1">/ {stat.total}</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending Requests */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h2 className="card-title flex items-center gap-2">
              <Inbox className="h-5 w-5" />
              Pending Requests
              {pendingRequests.length > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {pendingRequests.length}
                </span>
              )}
            </h2>
            <Link
              href="/dispatch/manage/requests"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {pendingRequests.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              <Inbox className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No pending requests</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingRequests.slice(0, 4).map((request) => {
                const requester = getUserById(request.requesterId);
                return (
                  <div
                    key={request.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-warning" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{request.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {requester?.firstName} {requester?.lastName} &bull;{" "}
                        {requestTypeLabels[request.requestType]}
                      </p>
                    </div>
                    <span className="badge badge-warning text-xs">Pending</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Quick Actions
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/dispatch/manage/incident-flows"
              className="p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/50 transition-colors group"
            >
              <ClipboardList className="h-6 w-6 mb-2 text-muted-foreground group-hover:text-primary" />
              <p className="font-medium text-sm">Incident Flows</p>
              <p className="text-xs text-muted-foreground">Build intake protocols</p>
            </Link>

            <Link
              href="/dispatch/manage/stations"
              className="p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/50 transition-colors group"
            >
              <Building2 className="h-6 w-6 mb-2 text-muted-foreground group-hover:text-primary" />
              <p className="font-medium text-sm">Add Station</p>
              <p className="text-xs text-muted-foreground">Create new command center</p>
            </Link>

            <Link
              href="/dispatch/manage/vehicles"
              className="p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/50 transition-colors group"
            >
              <Car className="h-6 w-6 mb-2 text-muted-foreground group-hover:text-primary" />
              <p className="font-medium text-sm">Add Vehicle</p>
              <p className="text-xs text-muted-foreground">Register response vehicle</p>
            </Link>

            <Link
              href="/dispatch/manage/teams"
              className="p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/50 transition-colors group"
            >
              <Users className="h-6 w-6 mb-2 text-muted-foreground group-hover:text-primary" />
              <p className="font-medium text-sm">Create Team</p>
              <p className="text-xs text-muted-foreground">Form response unit</p>
            </Link>

            <Link
              href="/dispatch/manage/schedules"
              className="p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/50 transition-colors group"
            >
              <Calendar className="h-6 w-6 mb-2 text-muted-foreground group-hover:text-primary" />
              <p className="font-medium text-sm">Manage Schedules</p>
              <p className="text-xs text-muted-foreground">Assign shifts</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card mt-6">
        <div className="card-header">
          <h2 className="card-title">Recent Activity</h2>
        </div>
        <div className="space-y-3">
          {[
            { action: "Schedule created", target: "Sgt. Miguel Reyes - Day Shift", time: "2 hours ago" },
            { action: "Vehicle status updated", target: "Ambulance 01 - En Route", time: "3 hours ago" },
            { action: "Team assigned", target: "Unit 14 to Barangay Commonwealth", time: "5 hours ago" },
            { action: "Request approved", target: "Profile update for Paolo Lim", time: "1 day ago" },
            { action: "New responder added", target: "Anna Reyes - EMT-Basic", time: "2 days ago" },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b border-border last:border-0"
            >
              <div>
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.target}</p>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
