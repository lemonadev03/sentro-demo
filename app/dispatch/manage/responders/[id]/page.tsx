"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Pencil, Trash2, Building2, Mail, Phone, Badge, Calendar } from "lucide-react";
import { DeleteConfirmDialog } from "@/components/crud";
import {
  getUserById,
  getStationById,
  getSchedulesByUser,
  mockTeamMembers,
  getTeamById,
  userRoleLabels,
  shiftTypeLabels,
  scheduleStatusLabels,
} from "@/lib/mock-crud-data";

export default function ResponderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const [user] = useState(() => getUserById(userId));
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (!user) {
    return (
      <div className="page">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Responder not found</h2>
          <Link href="/dispatch/manage/responders" className="btn btn-primary">
            Back to Responders
          </Link>
        </div>
      </div>
    );
  }

  const station = user.stationId ? getStationById(user.stationId) : null;
  const schedules = getSchedulesByUser(user.id);
  const teamMemberships = mockTeamMembers
    .filter((tm) => tm.userId === user.id && tm.isActive)
    .map((tm) => ({ ...tm, team: getTeamById(tm.teamId) }))
    .filter((tm) => tm.team);

  return (
    <div className="page">
      <div className="mb-6">
        <Link
          href="/dispatch/manage/responders"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Responders
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="page-title">{user.firstName} {user.lastName}</h1>
              <span className={`badge ${
                user.status === "active" ? "badge-success" :
                user.status === "inactive" ? "badge-neutral" : "badge-danger"
              }`}>
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </span>
            </div>
            <p className="text-muted-foreground mt-1">
              {userRoleLabels[user.role]} {user.rank && `&bull; ${user.rank}`}
            </p>
          </div>

          <div className="flex gap-2">
            <button className="btn btn-secondary">
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </button>
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="btn btn-ghost text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            {user.phone && (
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
              </div>
            )}

            {user.badgeNumber && (
              <div className="flex items-start gap-3">
                <Badge className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Badge Number</p>
                  <p className="font-medium">{user.badgeNumber}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Station</p>
                <p className="font-medium">{station?.name || "Unassigned"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-4">Team Assignments</h3>
          {teamMemberships.length === 0 ? (
            <p className="text-muted-foreground text-sm">Not assigned to any team</p>
          ) : (
            <div className="space-y-3">
              {teamMemberships.map((membership) => (
                <div
                  key={membership.id}
                  onClick={() => router.push(`/dispatch/manage/teams/${membership.teamId}`)}
                  className="p-3 rounded-lg border border-border hover:bg-muted cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{membership.team?.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{membership.role}</p>
                    </div>
                    {membership.role === "lead" && (
                      <span className="badge badge-info text-xs">Lead</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card lg:col-span-2">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Schedules
          </h3>
          {schedules.length === 0 ? (
            <p className="text-muted-foreground text-sm">No scheduled shifts</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Shift Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.slice(0, 5).map((schedule) => (
                    <tr key={schedule.id}>
                      <td>{new Date(schedule.startTime).toLocaleDateString()}</td>
                      <td>
                        {new Date(schedule.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                        {new Date(schedule.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td>{shiftTypeLabels[schedule.shiftType]}</td>
                      <td>
                        <span className={`badge ${
                          schedule.status === "active" ? "badge-success" :
                          schedule.status === "scheduled" ? "badge-info" :
                          schedule.status === "completed" ? "badge-neutral" : "badge-danger"
                        }`}>
                          {scheduleStatusLabels[schedule.status]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={() => router.push("/dispatch/manage/responders")}
        title="Delete Responder"
        itemName={`${user.firstName} ${user.lastName}`}
      />
    </div>
  );
}
