"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, MoreVertical, Pencil, Trash2, Eye, Star } from "lucide-react";
import { DataTable, Column, FormModal, DeleteConfirmDialog } from "@/components/crud";
import {
  mockTeams,
  mockStations,
  mockVehicles,
  Team,
  TeamType,
  TeamStatus,
  teamTypeLabels,
  teamStatusLabels,
  getStationById,
  getTeamMembers,
} from "@/lib/mock-crud-data";

export default function TeamsPage() {
  const router = useRouter();
  const [teams, setTeams] = useState(mockTeams);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [deletingTeam, setDeletingTeam] = useState<Team | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  const statusBadgeClass = (status: TeamStatus) => {
    switch (status) {
      case "available": return "badge-success";
      case "assigned":
      case "enroute": return "badge-warning";
      case "onsite": return "badge-info";
      default: return "badge-neutral";
    }
  };

  const columns: Column<Team>[] = [
    {
      key: "name",
      header: "Team",
      sortable: true,
      render: (team) => (
        <div>
          <p className="font-medium">{team.name}</p>
          <p className="text-xs text-muted-foreground">{team.code}</p>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      sortable: true,
      render: (team) => <span className="badge badge-info">{teamTypeLabels[team.type]}</span>,
    },
    {
      key: "stationId",
      header: "Station",
      render: (team) => getStationById(team.stationId)?.name || "-",
    },
    {
      key: "members",
      header: "Members",
      render: (team) => {
        const members = getTeamMembers(team.id);
        return members.length;
      },
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (team) => (
        <span className={`badge ${statusBadgeClass(team.status)}`}>
          {teamStatusLabels[team.status]}
        </span>
      ),
    },
    {
      key: "rating",
      header: "Rating",
      sortable: true,
      render: (team) => team.rating ? (
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          {team.rating}
        </span>
      ) : "-",
    },
  ];

  const handleCreate = (data: Omit<Team, "id" | "createdAt">) => {
    const newTeam: Team = {
      ...data,
      id: `TEAM-${String(teams.length + 1).padStart(3, "0")}`,
      createdAt: new Date().toISOString(),
    };
    setTeams([...teams, newTeam]);
    setShowCreateModal(false);
  };

  const handleEdit = (data: Omit<Team, "id" | "createdAt">) => {
    if (!editingTeam) return;
    setTeams(teams.map((t) => t.id === editingTeam.id ? { ...t, ...data } : t));
    setEditingTeam(null);
  };

  const handleDelete = () => {
    if (!deletingTeam) return;
    setTeams(teams.filter((t) => t.id !== deletingTeam.id));
    setDeletingTeam(null);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Teams</h1>
          <p className="page-subtitle">Manage response units</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="btn btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Create Team
        </button>
      </div>

      <DataTable
        data={teams}
        columns={columns}
        keyExtractor={(team) => team.id}
        searchPlaceholder="Search teams..."
        searchKeys={["name", "code"]}
        onRowClick={(team) => router.push(`/dispatch/manage/teams/${team.id}`)}
        emptyState={{
          title: "No teams yet",
          description: "Create your first response team.",
          action: { label: "Create Team", onClick: () => setShowCreateModal(true) },
        }}
        actions={(team) => (
          <div className="relative">
            <button
              onClick={() => setActionMenuOpen(actionMenuOpen === team.id ? null : team.id)}
              className="btn btn-ghost p-1.5"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            {actionMenuOpen === team.id && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setActionMenuOpen(null)} />
                <div className="absolute right-0 top-full mt-1 z-20 bg-background border border-border rounded-lg shadow-lg py-1 min-w-[140px]">
                  <button
                    onClick={() => { router.push(`/dispatch/manage/teams/${team.id}`); setActionMenuOpen(null); }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" /> View
                  </button>
                  <button
                    onClick={() => { setEditingTeam(team); setActionMenuOpen(null); }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
                  >
                    <Pencil className="h-4 w-4" /> Edit
                  </button>
                  <button
                    onClick={() => { setDeletingTeam(team); setActionMenuOpen(null); }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2 text-red-600"
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      />

      <FormModal
        open={showCreateModal || !!editingTeam}
        onClose={() => { setShowCreateModal(false); setEditingTeam(null); }}
        title={editingTeam ? "Edit Team" : "Create Team"}
        size="wide"
      >
        <TeamForm
          team={editingTeam || undefined}
          onSubmit={editingTeam ? handleEdit : handleCreate}
          onCancel={() => { setShowCreateModal(false); setEditingTeam(null); }}
        />
      </FormModal>

      <DeleteConfirmDialog
        open={!!deletingTeam}
        onClose={() => setDeletingTeam(null)}
        onConfirm={handleDelete}
        title="Delete Team"
        itemName={deletingTeam?.name}
      />
    </div>
  );
}

function TeamForm({
  team,
  onSubmit,
  onCancel,
}: {
  team?: Team;
  onSubmit: (data: Omit<Team, "id" | "createdAt">) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: team?.name || "",
    code: team?.code || "",
    stationId: team?.stationId || mockStations[0]?.id || "",
    type: team?.type || ("patrol" as TeamType),
    vehicleId: team?.vehicleId || "",
    status: team?.status || ("available" as TeamStatus),
    rating: team?.rating?.toString() || "",
  });

  const availableVehicles = mockVehicles.filter(
    (v) => v.stationId === formData.stationId && v.isActive
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      code: formData.code,
      stationId: formData.stationId,
      type: formData.type,
      vehicleId: formData.vehicleId || undefined,
      status: formData.status,
      rating: formData.rating ? parseFloat(formData.rating) : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-row form-row-2">
        <div className="form-field">
          <label className="form-label">Team Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input form-input w-full"
            placeholder="e.g., Unit 14"
            required
          />
        </div>
        <div className="form-field">
          <label className="form-label">Code <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            className="input form-input w-full"
            placeholder="e.g., U14"
            required
          />
        </div>
      </div>

      <div className="form-row form-row-2">
        <div className="form-field">
          <label className="form-label">Station <span className="text-red-500">*</span></label>
          <select
            value={formData.stationId}
            onChange={(e) => setFormData({ ...formData, stationId: e.target.value, vehicleId: "" })}
            className="input form-input w-full"
            required
          >
            {mockStations.filter(s => s.isActive).map((station) => (
              <option key={station.id} value={station.id}>{station.name}</option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label className="form-label">Type <span className="text-red-500">*</span></label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as TeamType })}
            className="input form-input w-full"
          >
            {Object.entries(teamTypeLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row form-row-2">
        <div className="form-field">
          <label className="form-label">Assigned Vehicle</label>
          <select
            value={formData.vehicleId}
            onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
            className="input form-input w-full"
          >
            <option value="">No vehicle assigned</option>
            {availableVehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label className="form-label">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as TeamStatus })}
            className="input form-input w-full"
          >
            {Object.entries(teamStatusLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
        <button type="submit" className="btn btn-primary">{team ? "Save Changes" : "Create Team"}</button>
      </div>
    </form>
  );
}
