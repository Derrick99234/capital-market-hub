"use client";

import React, { useEffect, useState } from "react";

type KYCApplication = {
  _id: string;
  userId:
    | {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
      }
    | string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country: string;
  address: string;
  idDocumentUrl: string;
  selfieUrl: string;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  reviewedAt?: string;
  createdAt: string;
};

const statusStyles: Record<KYCApplication["status"], string> = {
  pending: "border-amber-500/30 bg-amber-500/15 text-amber-300",
  approved: "border-emerald-500/30 bg-emerald-500/15 text-emerald-300",
  rejected: "border-red-500/30 bg-red-500/15 text-red-300",
};

function formatStatus(status: KYCApplication["status"]) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function AdminKYCPage() {
  const [applications, setApplications] = useState<KYCApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | KYCApplication["status"]>("all");

  const fetchApplications = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/kyc");
      const data = await response.json();
      setApplications(data.kycApplications || []);
    } catch (error) {
      console.error("Failed to fetch KYC applications:", error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleApprove = async (kycId: string) => {
    setProcessingId(kycId);

    try {
      const response = await fetch("/api/kyc/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kycId }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to approve KYC");
      }

      await fetchApplications();
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to approve KYC",
      );
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (kycId: string) => {
    const reason =
      prompt("Reason for rejection (optional):") || "Rejected by admin";

    setProcessingId(kycId);

    try {
      const response = await fetch("/api/kyc/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kycId, reason }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to reject KYC");
      }

      await fetchApplications();
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to reject KYC",
      );
    } finally {
      setProcessingId(null);
    }
  };

  const visibleApplications =
    filter === "all"
      ? applications
      : applications.filter((application) => application.status === filter);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 flex flex-col items-center justify-center min-h-100 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="text-gray-400 text-center">Loading KYC applications...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 max-[500px]:mt-12 text-white">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">KYC Management</h1>
          <p className="mt-1 text-sm text-gray-400">
            Review user identity submissions, open uploaded documents, and approve or reject each application.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", "pending", "approved", "rejected"] as const).map(
            (status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilter(status)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  filter === status
                    ? "bg-blue-600 text-white"
                    : "border border-gray-700 bg-gray-900 text-gray-300 hover:bg-gray-800"
                }`}
              >
                {status === "all"
                  ? `All (${applications.length})`
                  : `${formatStatus(status)} (${applications.filter((application) => application.status === status).length})`}
              </button>
            ),
          )}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {visibleApplications.length ? (
          visibleApplications.map((application) => {
            const user =
              typeof application.userId === "string" ? null : application.userId;
            const isProcessing = processingId === application._id;

            return (
              <div
                key={application._id}
                className="rounded-2xl border border-gray-800 bg-gray-900 p-4 sm:p-5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                        User
                      </p>
                      <p className="mt-2 font-semibold">
                        {application.firstName} {application.lastName}
                      </p>
                      <p className="text-sm text-gray-300">
                        {user?.email || application.email}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        Submitted {new Date(application.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                        Contact
                      </p>
                      <p className="mt-2 text-sm text-gray-200">
                        Phone: {application.phoneNumber}
                      </p>
                      <p className="mt-1 text-sm text-gray-200">
                        Country: {application.country}
                      </p>
                      <p className="mt-1 text-sm text-gray-200">
                        Address: {application.address}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                        Review Status
                      </p>
                      <span
                        className={`mt-2 inline-flex rounded-full border px-3 py-1 text-sm ${statusStyles[application.status]}`}
                      >
                        {formatStatus(application.status)}
                      </span>
                      {application.reviewedAt && (
                        <p className="mt-2 text-xs text-gray-400">
                          Reviewed {new Date(application.reviewedAt).toLocaleString()}
                        </p>
                      )}
                      {application.rejectionReason && (
                        <p className="mt-2 text-sm text-red-300">
                          Reason: {application.rejectionReason}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="w-full lg:w-auto lg:min-w-[250px]">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                      <a
                        href={application.idDocumentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl border border-lime-400/30 px-4 py-3 text-center text-sm font-medium text-lime-300 transition hover:bg-lime-500/10"
                      >
                        Open ID Document
                      </a>
                      <a
                        href={application.selfieUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl border border-sky-400/30 px-4 py-3 text-center text-sm font-medium text-sky-300 transition hover:bg-sky-500/10"
                      >
                        Open Selfie
                      </a>
                    </div>

                    <div className="mt-3 flex flex-col gap-2 sm:flex-row lg:flex-col">
                      <button
                        type="button"
                        onClick={() => handleApprove(application._id)}
                        disabled={
                          isProcessing || application.status === "approved"
                        }
                        className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400"
                      >
                        {isProcessing ? "Working..." : "Approve"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReject(application._id)}
                        disabled={
                          isProcessing || application.status === "rejected"
                        }
                        className="rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400"
                      >
                        {isProcessing ? "Working..." : "Reject"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-700 bg-gray-900/60 p-8 text-center text-gray-400">
            No KYC applications found for the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}
