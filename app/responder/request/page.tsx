"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Send, FileText } from "lucide-react";
import {
  RequestType,
  requestTypeLabels,
  mockUsers,
} from "@/lib/mock-crud-data";

// Simulate current logged-in responder
const currentUserId = "USR-001";
const currentUser = mockUsers.find((u) => u.id === currentUserId)!;

export default function ResponderRequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    requestType: "schedule_change" as RequestType,
    title: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="page">
        <div className="max-w-md mx-auto text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Request Submitted</h1>
          <p className="text-muted-foreground mb-6">
            Your request has been submitted and is pending review by the dispatch team.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/responder/request/history" className="btn btn-secondary">
              View My Requests
            </Link>
            <Link href="/responder" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          <FileText className="h-6 w-6" />
          Submit Request
        </h1>
        <p className="page-subtitle">
          Request updates or changes to your schedule, profile, or equipment
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="card">
            <form onSubmit={handleSubmit} className="form">
              <div className="form-field">
                <label className="form-label">Request Type <span className="text-red-500">*</span></label>
                <select
                  value={formData.requestType}
                  onChange={(e) => setFormData({ ...formData, requestType: e.target.value as RequestType })}
                  className="input form-input w-full"
                  required
                >
                  {Object.entries(requestTypeLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
                <p className="form-helper">
                  {formData.requestType === "schedule_change" && "Request to change or cancel a scheduled shift"}
                  {formData.requestType === "leave" && "Request time off or vacation leave"}
                  {formData.requestType === "swap" && "Request to swap shifts with another responder"}
                  {formData.requestType === "profile_update" && "Request to update your contact information"}
                  {formData.requestType === "equipment" && "Request new equipment or report issues"}
                </p>
              </div>

              <div className="form-field">
                <label className="form-label">Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input form-input w-full"
                  placeholder="Brief summary of your request"
                  required
                />
              </div>

              <div className="form-field">
                <label className="form-label">Description <span className="text-red-500">*</span></label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input form-input w-full min-h-[150px] resize-none"
                  placeholder="Provide details about your request, including any relevant dates or information..."
                  required
                />
              </div>

              <div className="form-actions">
                <Link href="/responder" className="btn btn-secondary">
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-primary ${isSubmitting ? "btn-loading" : ""}`}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="card">
            <h3 className="font-semibold mb-3">Submitting as</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <span className="text-lg font-semibold">
                  {currentUser.firstName[0]}{currentUser.lastName[0]}
                </span>
              </div>
              <div>
                <p className="font-medium">{currentUser.firstName} {currentUser.lastName}</p>
                <p className="text-sm text-muted-foreground">{currentUser.rank || currentUser.role}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-3">Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Be specific about dates and times
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Provide a clear reason for your request
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Submit requests at least 48 hours in advance when possible
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Check your request history for updates
              </li>
            </ul>
          </div>

          <Link
            href="/responder/request/history"
            className="card card-interactive flex items-center justify-between"
          >
            <span className="font-medium">View Request History</span>
            <ChevronLeft className="h-4 w-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
