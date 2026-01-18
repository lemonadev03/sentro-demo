"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Pencil, Trash2, Building2, Car, Star, UserCircle } from "lucide-react";
import { DeleteConfirmDialog } from "@/components/crud";
import {
  getTeamById,
  getStationById,
  getVehicleById,
  getTeamMembers,
  teamTypeLabels,
  teamStatusLabels,
  TeamStatus,
} from "@/lib/mock-crud-data";

export default function TeamDetailPage() {
  const params = useParams();
  const router = useRouter();
  const teamId = params.id as string;

  const [team] = useState(() => getTeamById(teamId));
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (!team) {
    return (
      <div className="page">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Team not found</h2>
          <Link href="/dispatch/manage/teams" className="btn btn-primary">
            Back to Teams
          </Link>
        </div>
      </div>
    );
  }

  const station = getStationById(team.stationId);
  const vehicle = team.vehicleId ? getVehicleById(team.vehicleId) : null;
  const members = getTeamMembers(team.id);

  const statusBadgeClass = (status: TeamStatus) => {
    switch (status) {
      case "available": return "badge-success";
      case "assigned":
      case "enroute": return "badge-warning";
      case "onsite": return "badge-info";
      default: return "badge-neutral";
    }
  };

  return (
    <div className="page">
      <div className="mb-6">
        <Link
          href="/dispatch/manage/teams"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Teams
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="page-title">{team.name}</h1>
              <span className={`badge ${statusBadgeClass(team.status)}`}>
                {teamStatusLabels[team.status]}
              </span>
            </div>
            <p className="text-muted-foreground mt-1">
              {team.code} &bull; {teamTypeLabels[team.type]}
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
          <h3 className="font-semibold mb-4">Team Information</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Station</p>
                <p className="font-medium">{station?.name || "Unassigned"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Car className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Vehicle</p>
                <p className="font-medium">{vehicle?.name || "No vehicle assigned"}</p>
              </div>
            </div>

            {team.rating && (
              <div className="flex items-start gap-3">
                <Star className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="font-medium flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {team.rating} / 5
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-4">Team Members ({members.length})</h3>
          {members.length === 0 ? (
            <p className="text-muted-foreground text-sm">No members assigned to this team</p>
          ) : (
            <div className="space-y-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  onClick={() => router.push(`/dispatch/manage/responders/${member.userId}`)}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <UserCircle className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{member.user.firstName} {member.user.lastName}</p>
                    <p className="text-xs text-muted-foreground capitalize">{member.role}</p>
                  </div>
                  {member.role === "lead" && (
                    <span className="badge badge-info text-xs">Lead</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={() => router.push("/dispatch/manage/teams")}
        title="Delete Team"
        itemName={team.name}
      />
    </div>
  );
}
