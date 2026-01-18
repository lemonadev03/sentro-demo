"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, MoreVertical, Pencil, Trash2, Eye, UserCircle } from "lucide-react";
import { DataTable, Column, FormModal, DeleteConfirmDialog } from "@/components/crud";
import {
  mockUsers,
  mockStations,
  User,
  UserRole,
  userRoleLabels,
  getStationById,
} from "@/lib/mock-crud-data";

export default function RespondersPage() {
  const router = useRouter();
  const [users, setUsers] = useState(mockUsers.filter((u) => u.role !== "admin"));
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  const columns: Column<User>[] = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      render: (user) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <UserCircle className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-muted-foreground">{user.badgeNumber || user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      sortable: true,
      render: (user) => <span className="badge badge-info">{userRoleLabels[user.role]}</span>,
    },
    {
      key: "rank",
      header: "Rank",
      render: (user) => user.rank || "-",
    },
    {
      key: "stationId",
      header: "Station",
      render: (user) => user.stationId ? getStationById(user.stationId)?.name || "-" : "-",
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (user) => (
        <span className={`badge ${
          user.status === "active" ? "badge-success" :
          user.status === "inactive" ? "badge-neutral" : "badge-danger"
        }`}>
          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
        </span>
      ),
    },
  ];

  const handleCreate = (data: Omit<User, "id" | "createdAt">) => {
    const newUser: User = {
      ...data,
      id: `USR-${String(users.length + 10).padStart(3, "0")}`,
      createdAt: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
    setShowCreateModal(false);
  };

  const handleEdit = (data: Omit<User, "id" | "createdAt">) => {
    if (!editingUser) return;
    setUsers(users.map((u) => u.id === editingUser.id ? { ...u, ...data } : u));
    setEditingUser(null);
  };

  const handleDelete = () => {
    if (!deletingUser) return;
    setUsers(users.filter((u) => u.id !== deletingUser.id));
    setDeletingUser(null);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Responders</h1>
          <p className="page-subtitle">Manage personnel and dispatchers</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="btn btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add Responder
        </button>
      </div>

      <DataTable
        data={users}
        columns={columns}
        keyExtractor={(user) => user.id}
        searchPlaceholder="Search responders..."
        searchKeys={["firstName", "lastName", "email", "badgeNumber"]}
        onRowClick={(user) => router.push(`/dispatch/manage/responders/${user.id}`)}
        emptyState={{
          title: "No responders yet",
          description: "Add your first responder.",
          action: { label: "Add Responder", onClick: () => setShowCreateModal(true) },
        }}
        actions={(user) => (
          <div className="relative">
            <button
              onClick={() => setActionMenuOpen(actionMenuOpen === user.id ? null : user.id)}
              className="btn btn-ghost p-1.5"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            {actionMenuOpen === user.id && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setActionMenuOpen(null)} />
                <div className="absolute right-0 top-full mt-1 z-20 bg-background border border-border rounded-lg shadow-lg py-1 min-w-[140px]">
                  <button
                    onClick={() => { router.push(`/dispatch/manage/responders/${user.id}`); setActionMenuOpen(null); }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" /> View
                  </button>
                  <button
                    onClick={() => { setEditingUser(user); setActionMenuOpen(null); }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
                  >
                    <Pencil className="h-4 w-4" /> Edit
                  </button>
                  <button
                    onClick={() => { setDeletingUser(user); setActionMenuOpen(null); }}
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
        open={showCreateModal || !!editingUser}
        onClose={() => { setShowCreateModal(false); setEditingUser(null); }}
        title={editingUser ? "Edit Responder" : "Add Responder"}
        size="wide"
      >
        <UserForm
          user={editingUser || undefined}
          onSubmit={editingUser ? handleEdit : handleCreate}
          onCancel={() => { setShowCreateModal(false); setEditingUser(null); }}
        />
      </FormModal>

      <DeleteConfirmDialog
        open={!!deletingUser}
        onClose={() => setDeletingUser(null)}
        onConfirm={handleDelete}
        title="Delete Responder"
        itemName={deletingUser ? `${deletingUser.firstName} ${deletingUser.lastName}` : undefined}
      />
    </div>
  );
}

function UserForm({
  user,
  onSubmit,
  onCancel,
}: {
  user?: User;
  onSubmit: (data: Omit<User, "id" | "createdAt">) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    stationId: user?.stationId || "",
    role: user?.role || ("responder" as UserRole),
    rank: user?.rank || "",
    badgeNumber: user?.badgeNumber || "",
    phone: user?.phone || "",
    status: user?.status || "active" as "active" | "inactive" | "suspended",
    isVerified: user?.isVerified ?? false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      stationId: formData.stationId || undefined,
      role: formData.role,
      rank: formData.rank || undefined,
      badgeNumber: formData.badgeNumber || undefined,
      phone: formData.phone || undefined,
      status: formData.status,
      isVerified: formData.isVerified,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-row form-row-2">
        <div className="form-field">
          <label className="form-label">First Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="input form-input w-full"
            required
          />
        </div>
        <div className="form-field">
          <label className="form-label">Last Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="input form-input w-full"
            required
          />
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">Email <span className="text-red-500">*</span></label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="input form-input w-full"
          required
        />
      </div>

      <div className="form-row form-row-2">
        <div className="form-field">
          <label className="form-label">Role <span className="text-red-500">*</span></label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
            className="input form-input w-full"
          >
            {Object.entries(userRoleLabels).filter(([key]) => key !== "admin").map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label className="form-label">Station</label>
          <select
            value={formData.stationId}
            onChange={(e) => setFormData({ ...formData, stationId: e.target.value })}
            className="input form-input w-full"
          >
            <option value="">No station</option>
            {mockStations.filter(s => s.isActive).map((station) => (
              <option key={station.id} value={station.id}>{station.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row form-row-2">
        <div className="form-field">
          <label className="form-label">Rank</label>
          <input
            type="text"
            value={formData.rank}
            onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
            className="input form-input w-full"
            placeholder="e.g., Sergeant"
          />
        </div>
        <div className="form-field">
          <label className="form-label">Badge Number</label>
          <input
            type="text"
            value={formData.badgeNumber}
            onChange={(e) => setFormData({ ...formData, badgeNumber: e.target.value })}
            className="input form-input w-full"
            placeholder="e.g., PO3-1234"
          />
        </div>
      </div>

      <div className="form-row form-row-2">
        <div className="form-field">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="input form-input w-full"
          />
        </div>
        <div className="form-field">
          <label className="form-label">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "inactive" | "suspended" })}
            className="input form-input w-full"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
        <button type="submit" className="btn btn-primary">{user ? "Save Changes" : "Add Responder"}</button>
      </div>
    </form>
  );
}
