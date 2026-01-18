"use client";

import { useState } from "react";
import { Plus, Calendar, List, ChevronLeft, ChevronRight } from "lucide-react";
import { FormModal } from "@/components/crud";
import {
  mockSchedules,
  mockUsers,
  mockTeams,
  Schedule,
  ShiftType,
  ScheduleStatus,
  shiftTypeLabels,
  scheduleStatusLabels,
  getUserById,
  getTeamById,
} from "@/lib/mock-crud-data";

type ViewMode = "list" | "calendar";

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState(mockSchedules);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleCreate = (data: Omit<Schedule, "id" | "createdAt">) => {
    const newSchedule: Schedule = {
      ...data,
      id: `SCH-${String(schedules.length + 1).padStart(3, "0")}`,
      createdAt: new Date().toISOString(),
    };
    setSchedules([...schedules, newSchedule]);
    setShowCreateModal(false);
  };

  // Get dates for the current week
  const getWeekDates = () => {
    const start = new Date(selectedDate);
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

  const getSchedulesForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return schedules.filter((s) => s.startTime.split("T")[0] === dateStr);
  };

  const statusBadgeClass = (status: ScheduleStatus) => {
    switch (status) {
      case "active": return "badge-success";
      case "scheduled": return "badge-info";
      case "completed": return "badge-neutral";
      case "cancelled": return "badge-danger";
      default: return "badge-neutral";
    }
  };

  const navigateWeek = (direction: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction * 7);
    setSelectedDate(newDate);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Schedules</h1>
          <p className="page-subtitle">Manage shift assignments</p>
        </div>
        <div className="flex gap-2">
          <div className="flex border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 text-sm ${viewMode === "list" ? "bg-primary text-white" : "hover:bg-muted"}`}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`px-3 py-1.5 text-sm ${viewMode === "calendar" ? "bg-primary text-white" : "hover:bg-muted"}`}
            >
              <Calendar className="h-4 w-4" />
            </button>
          </div>
          <button onClick={() => setShowCreateModal(true)} className="btn btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Schedule
          </button>
        </div>
      </div>

      {viewMode === "list" ? (
        <div className="card p-0 overflow-hidden">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Responder</th>
                <th>Team</th>
                <th>Date</th>
                <th>Time</th>
                <th>Shift</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule) => {
                const user = getUserById(schedule.userId);
                const team = schedule.teamId ? getTeamById(schedule.teamId) : null;
                return (
                  <tr key={schedule.id}>
                    <td className="font-medium">
                      {user ? `${user.firstName} ${user.lastName}` : "Unknown"}
                    </td>
                    <td>{team?.name || "-"}</td>
                    <td>{new Date(schedule.startTime).toLocaleDateString()}</td>
                    <td>
                      {new Date(schedule.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                      {new Date(schedule.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </td>
                    <td>{shiftTypeLabels[schedule.shiftType]}</td>
                    <td>
                      <span className={`badge ${statusBadgeClass(schedule.status)}`}>
                        {scheduleStatusLabels[schedule.status]}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => navigateWeek(-1)} className="btn btn-ghost p-2">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h3 className="font-semibold">
              {weekDates[0].toLocaleDateString("en-US", { month: "long", day: "numeric" })} -{" "}
              {weekDates[6].toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </h3>
            <button onClick={() => navigateWeek(1)} className="btn btn-ghost p-2">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {weekDates.map((date) => {
              const daySchedules = getSchedulesForDate(date);
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <div key={date.toISOString()} className="min-h-[120px]">
                  <div className={`text-center py-2 rounded-t-lg ${isToday ? "bg-primary text-white" : "bg-muted"}`}>
                    <p className="text-xs font-medium">
                      {date.toLocaleDateString("en-US", { weekday: "short" })}
                    </p>
                    <p className="text-lg font-semibold">{date.getDate()}</p>
                  </div>
                  <div className="border border-t-0 border-border rounded-b-lg p-1 space-y-1">
                    {daySchedules.slice(0, 3).map((schedule) => {
                      const user = getUserById(schedule.userId);
                      return (
                        <div
                          key={schedule.id}
                          className={`text-xs p-1 rounded ${
                            schedule.shiftType === "day" ? "bg-blue-100 text-blue-800" :
                            schedule.shiftType === "night" ? "bg-purple-100 text-purple-800" :
                            "bg-orange-100 text-orange-800"
                          }`}
                        >
                          <p className="font-medium truncate">{user?.firstName}</p>
                          <p className="opacity-75">{shiftTypeLabels[schedule.shiftType]}</p>
                        </div>
                      );
                    })}
                    {daySchedules.length > 3 && (
                      <p className="text-xs text-muted-foreground text-center">
                        +{daySchedules.length - 3} more
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <FormModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Add Schedule"
        size="wide"
      >
        <ScheduleForm onSubmit={handleCreate} onCancel={() => setShowCreateModal(false)} />
      </FormModal>
    </div>
  );
}

function ScheduleForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: Omit<Schedule, "id" | "createdAt">) => void;
  onCancel: () => void;
}) {
  const responders = mockUsers.filter((u) => u.role === "responder" && u.status === "active");

  const [formData, setFormData] = useState({
    userId: responders[0]?.id || "",
    teamId: "",
    date: new Date().toISOString().split("T")[0],
    startTime: "06:00",
    endTime: "18:00",
    shiftType: "day" as ShiftType,
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const startDateTime = new Date(`${formData.date}T${formData.startTime}:00`);
    const endDateTime = new Date(`${formData.date}T${formData.endTime}:00`);
    if (formData.endTime < formData.startTime) {
      endDateTime.setDate(endDateTime.getDate() + 1);
    }

    onSubmit({
      userId: formData.userId,
      teamId: formData.teamId || undefined,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      shiftType: formData.shiftType,
      status: "scheduled",
      notes: formData.notes || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-field">
        <label className="form-label">Responder <span className="text-red-500">*</span></label>
        <select
          value={formData.userId}
          onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
          className="input form-input w-full"
          required
        >
          {responders.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstName} {user.lastName} ({user.rank || user.role})
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label className="form-label">Team (Optional)</label>
        <select
          value={formData.teamId}
          onChange={(e) => setFormData({ ...formData, teamId: e.target.value })}
          className="input form-input w-full"
        >
          <option value="">No team assignment</option>
          {mockTeams.map((team) => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
      </div>

      <div className="form-row form-row-2">
        <div className="form-field">
          <label className="form-label">Date <span className="text-red-500">*</span></label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="input form-input w-full"
            required
          />
        </div>
        <div className="form-field">
          <label className="form-label">Shift Type</label>
          <select
            value={formData.shiftType}
            onChange={(e) => setFormData({ ...formData, shiftType: e.target.value as ShiftType })}
            className="input form-input w-full"
          >
            {Object.entries(shiftTypeLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row form-row-2">
        <div className="form-field">
          <label className="form-label">Start Time <span className="text-red-500">*</span></label>
          <input
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            className="input form-input w-full"
            required
          />
        </div>
        <div className="form-field">
          <label className="form-label">End Time <span className="text-red-500">*</span></label>
          <input
            type="time"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            className="input form-input w-full"
            required
          />
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="input form-input w-full min-h-[80px] resize-none"
          placeholder="Any additional notes..."
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
        <button type="submit" className="btn btn-primary">Create Schedule</button>
      </div>
    </form>
  );
}
