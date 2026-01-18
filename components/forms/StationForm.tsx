"use client";

import { useState } from "react";
import type { Station, StationType } from "@/lib/mock-crud-data";
import { stationTypeLabels } from "@/lib/mock-crud-data";

interface StationFormProps {
  station?: Station;
  onSubmit: (data: Omit<Station, "id" | "createdAt">) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function StationForm({
  station,
  onSubmit,
  onCancel,
  isLoading = false,
}: StationFormProps) {
  const [formData, setFormData] = useState({
    name: station?.name || "",
    code: station?.code || "",
    type: station?.type || ("mixed" as StationType),
    address: station?.address || "",
    latitude: station?.latitude?.toString() || "",
    longitude: station?.longitude?.toString() || "",
    contactRadio: station?.contactRadio || "",
    contactPhone: station?.contactPhone || "",
    isActive: station?.isActive ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      code: formData.code,
      type: formData.type,
      address: formData.address,
      latitude: formData.latitude ? parseFloat(formData.latitude) : undefined,
      longitude: formData.longitude ? parseFloat(formData.longitude) : undefined,
      contactRadio: formData.contactRadio || undefined,
      contactPhone: formData.contactPhone || undefined,
      isActive: formData.isActive,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-field">
        <label className="form-label">
          Station Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="input form-input w-full"
          placeholder="e.g., Station 3 - Commonwealth"
          required
        />
      </div>

      <div className="form-row form-row-2">
        <div className="form-field">
          <label className="form-label">
            Station Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            className="input form-input w-full"
            placeholder="e.g., QC-STN3"
            required
          />
        </div>

        <div className="form-field">
          <label className="form-label">
            Type <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as StationType })}
            className="input form-input w-full"
            required
          >
            {Object.entries(stationTypeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">Address</label>
        <textarea
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="input form-input w-full min-h-[80px] resize-none"
          placeholder="Full address"
          rows={2}
        />
      </div>

      <div className="form-row form-row-2">
        <div className="form-field">
          <label className="form-label">Latitude</label>
          <input
            type="number"
            step="any"
            value={formData.latitude}
            onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
            className="input form-input w-full"
            placeholder="e.g., 14.6760"
          />
        </div>

        <div className="form-field">
          <label className="form-label">Longitude</label>
          <input
            type="number"
            step="any"
            value={formData.longitude}
            onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
            className="input form-input w-full"
            placeholder="e.g., 121.0437"
          />
        </div>
      </div>

      <div className="form-row form-row-2">
        <div className="form-field">
          <label className="form-label">Radio Channel</label>
          <input
            type="text"
            value={formData.contactRadio}
            onChange={(e) => setFormData({ ...formData, contactRadio: e.target.value })}
            className="input form-input w-full"
            placeholder="e.g., Channel 3A"
          />
        </div>

        <div className="form-field">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            value={formData.contactPhone}
            onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
            className="input form-input w-full"
            placeholder="e.g., +63 2 8123 4567"
          />
        </div>
      </div>

      <div className="form-field">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            className="w-4 h-4 rounded border-border"
          />
          <span className="text-sm">Station is active</span>
        </label>
      </div>

      <div className="form-actions">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className={`btn btn-primary ${isLoading ? "btn-loading" : ""}`}
        >
          {station ? "Save Changes" : "Create Station"}
        </button>
      </div>
    </form>
  );
}
