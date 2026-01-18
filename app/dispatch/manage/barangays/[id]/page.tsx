"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Pencil, Trash2, Users, AlertTriangle, Building } from "lucide-react";
import { FormModal, DeleteConfirmDialog } from "@/components/crud";
import {
  getBarangayById,
  mockStationBarangayCoverage,
  getStationById,
  Barangay,
  RiskLevel,
  riskLevelLabels,
} from "@/lib/mock-crud-data";

export default function BarangayDetailPage() {
  const params = useParams();
  const router = useRouter();
  const barangayId = params.id as string;

  const [barangay, setBarangay] = useState(() => getBarangayById(barangayId));
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (!barangay) {
    return (
      <div className="page">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Barangay not found</h2>
          <Link href="/dispatch/manage/barangays" className="btn btn-primary">
            Back to Barangays
          </Link>
        </div>
      </div>
    );
  }

  const coveringStations = mockStationBarangayCoverage
    .filter((c) => c.barangayId === barangayId)
    .map((c) => ({
      ...c,
      station: getStationById(c.stationId),
    }))
    .filter((c) => c.station);

  const handleEdit = (data: Omit<Barangay, "id" | "createdAt">) => {
    setBarangay({ ...barangay, ...data });
    setShowEditModal(false);
  };

  const handleDelete = () => {
    router.push("/dispatch/manage/barangays");
  };

  return (
    <div className="page">
      <div className="mb-6">
        <Link
          href="/dispatch/manage/barangays"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Barangays
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="page-title">{barangay.name}</h1>
              <span
                className={`badge ${
                  barangay.riskLevel === "critical"
                    ? "badge-danger"
                    : barangay.riskLevel === "warning"
                    ? "badge-warning"
                    : "badge-success"
                }`}
              >
                {riskLevelLabels[barangay.riskLevel]}
              </span>
            </div>
            <p className="text-muted-foreground mt-1">{barangay.code}</p>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setShowEditModal(true)} className="btn btn-secondary">
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
          <h3 className="font-semibold mb-4">Barangay Information</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Population</p>
                <p className="font-medium">{barangay.population.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Risk Level</p>
                <p className="font-medium">{riskLevelLabels[barangay.riskLevel]}</p>
              </div>
            </div>

            {barangay.evacuationCenter && (
              <div className="flex items-start gap-3">
                <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Evacuation Center</p>
                  <p className="font-medium">{barangay.evacuationCenter}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-4">Covering Stations</h3>
          {coveringStations.length === 0 ? (
            <p className="text-muted-foreground text-sm">No stations cover this barangay</p>
          ) : (
            <div className="space-y-3">
              {coveringStations.map((coverage) => (
                <div
                  key={coverage.id}
                  onClick={() => router.push(`/dispatch/manage/stations/${coverage.stationId}`)}
                  className="p-3 rounded-lg border border-border hover:bg-muted cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{coverage.station?.name}</p>
                      <p className="text-xs text-muted-foreground">{coverage.station?.code}</p>
                    </div>
                    {coverage.isPrimary && (
                      <span className="badge badge-info text-xs">Primary</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <FormModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Barangay"
        size="wide"
      >
        <BarangayEditForm
          barangay={barangay}
          onSubmit={handleEdit}
          onCancel={() => setShowEditModal(false)}
        />
      </FormModal>

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Barangay"
        itemName={barangay.name}
      />
    </div>
  );
}

function BarangayEditForm({
  barangay,
  onSubmit,
  onCancel,
}: {
  barangay: Barangay;
  onSubmit: (data: Omit<Barangay, "id" | "createdAt">) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: barangay.name,
    code: barangay.code,
    population: barangay.population.toString(),
    riskLevel: barangay.riskLevel,
    evacuationCenter: barangay.evacuationCenter || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      code: formData.code,
      population: parseInt(formData.population) || 0,
      riskLevel: formData.riskLevel,
      evacuationCenter: formData.evacuationCenter || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-field">
        <label className="form-label">Barangay Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="input form-input w-full"
          required
        />
      </div>

      <div className="form-row form-row-2">
        <div className="form-field">
          <label className="form-label">Code</label>
          <input
            type="text"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            className="input form-input w-full"
            required
          />
        </div>

        <div className="form-field">
          <label className="form-label">Population</label>
          <input
            type="number"
            value={formData.population}
            onChange={(e) => setFormData({ ...formData, population: e.target.value })}
            className="input form-input w-full"
            required
          />
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">Risk Level</label>
        <select
          value={formData.riskLevel}
          onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value as RiskLevel })}
          className="input form-input w-full"
        >
          {Object.entries(riskLevelLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label className="form-label">Evacuation Center</label>
        <input
          type="text"
          value={formData.evacuationCenter}
          onChange={(e) => setFormData({ ...formData, evacuationCenter: e.target.value })}
          className="input form-input w-full"
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </div>
    </form>
  );
}
