"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Calendar, Clock, Users, MapPin, ChevronRight } from "lucide-react";
import {
  mockSchedules,
  mockUsers,
  shiftTypeLabels,
  scheduleStatusLabels,
  getTeamById,
  getStationById,
  ScheduleStatus,
} from "@/lib/mock-crud-data";

// Simulate current logged-in responder
const currentUserId = "USR-001";
const currentUser = mockUsers.find((u) => u.id === currentUserId)!;

export default function ResponderSchedulePage() {
  const [selectedWeekOffset, setSelectedWeekOffset] = useState(0);

  // Get schedules for current user
  const mySchedules = mockSchedules.filter((s) => s.userId === currentUserId);

  // Get current week dates
  const getWeekDates = () => {
    const today = new Date();
    today.setDate(today.getDate() + selectedWeekOffset * 7);
    const start = new Date(today);
    start.setDate(start.getDate() - start.getDay());
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();

  const getScheduleForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return mySchedules.find((s) => s.startTime.split("T")[0] === dateStr);
  };

  const upcomingSchedules = mySchedules
    .filter((s) => new Date(s.startTime) >= new Date() && s.status !== "cancelled")
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .slice(0, 5);

  const statusBadgeClass = (status: ScheduleStatus) => {
    switch (status) {
      case "active": return "badge-success";
      case "scheduled": return "badge-info";
      case "completed": return "badge-neutral";
      case "cancelled": return "badge-danger";
      default: return "badge-neutral";
    }
  };

  const station = currentUser.stationId ? getStationById(currentUser.stationId) : null;

  return (
    <div className="page">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/responder"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="page-title flex items-center gap-2">
          <Calendar className="h-6 w-6" />
          My Schedule
        </h1>
        <p className="page-subtitle">
          {currentUser.firstName} {currentUser.lastName} &bull; {currentUser.rank || currentUser.role}
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Station</p>
              <p className="font-medium">{station?.name || "Unassigned"}</p>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Clock className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Upcoming Shifts</p>
              <p className="font-medium">{upcomingSchedules.length} scheduled</p>
            </div>
          </div>
        </div>

        <div className="card p-4 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Team</p>
              <p className="font-medium">
                {upcomingSchedules[0]?.teamId
                  ? getTeamById(upcomingSchedules[0].teamId)?.name
                  : "Not assigned"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Week View */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setSelectedWeekOffset(selectedWeekOffset - 1)}
            className="btn btn-ghost p-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h3 className="font-semibold">
            {weekDates[0].toLocaleDateString("en-US", { month: "long", day: "numeric" })} -{" "}
            {weekDates[6].toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </h3>
          <button
            onClick={() => setSelectedWeekOffset(selectedWeekOffset + 1)}
            className="btn btn-ghost p-2"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDates.map((date) => {
            const schedule = getScheduleForDate(date);
            const isToday = date.toDateString() === new Date().toDateString();
            const isPast = date < new Date() && !isToday;

            return (
              <div key={date.toISOString()} className="min-h-[100px]">
                <div
                  className={`text-center py-2 rounded-t-lg ${
                    isToday ? "bg-primary text-white" : isPast ? "bg-muted/50" : "bg-muted"
                  }`}
                >
                  <p className="text-xs font-medium">
                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                  </p>
                  <p className="text-lg font-semibold">{date.getDate()}</p>
                </div>
                <div
                  className={`border border-t-0 border-border rounded-b-lg p-2 h-[80px] ${
                    isPast ? "opacity-50" : ""
                  }`}
                >
                  {schedule ? (
                    <div
                      className={`text-xs p-2 rounded h-full ${
                        schedule.shiftType === "day"
                          ? "bg-blue-100 text-blue-800"
                          : schedule.shiftType === "night"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      <p className="font-semibold">{shiftTypeLabels[schedule.shiftType]}</p>
                      <p className="mt-1">
                        {new Date(schedule.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
                      Off
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Schedules List */}
      <div className="card">
        <h3 className="font-semibold mb-4">Upcoming Shifts</h3>
        {upcomingSchedules.length === 0 ? (
          <p className="text-muted-foreground text-sm">No upcoming shifts scheduled</p>
        ) : (
          <div className="space-y-3">
            {upcomingSchedules.map((schedule) => {
              const team = schedule.teamId ? getTeamById(schedule.teamId) : null;
              return (
                <div
                  key={schedule.id}
                  className="flex items-center gap-4 p-3 rounded-lg border border-border"
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center ${
                      schedule.shiftType === "day"
                        ? "bg-blue-100 text-blue-800"
                        : schedule.shiftType === "night"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    <p className="text-lg font-bold">
                      {new Date(schedule.startTime).getDate()}
                    </p>
                    <p className="text-[10px] uppercase">
                      {new Date(schedule.startTime).toLocaleDateString("en-US", { month: "short" })}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{shiftTypeLabels[schedule.shiftType]}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(schedule.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {new Date(schedule.endTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {team && ` • ${team.name}`}
                    </p>
                  </div>
                  <span className={`badge ${statusBadgeClass(schedule.status)}`}>
                    {scheduleStatusLabels[schedule.status]}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-border">
          <Link href="/responder/request" className="btn btn-secondary w-full sm:w-auto">
            Request Schedule Change
          </Link>
        </div>
      </div>
    </div>
  );
}
