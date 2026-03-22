"use client";

import Aside from "@/components/aside";
import TickerLive from "@/components/live-price";
import { useUser } from "@/context/user-context";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

type KYCStatus = "pending" | "approved" | "rejected";

type KYCRecord = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country: string;
  address: string;
  idDocumentUrl: string;
  selfieUrl: string;
  status: KYCStatus;
  rejectionReason?: string;
  reviewedAt?: string;
  createdAt: string;
};

type KYCFormState = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country: string;
  address: string;
};

const emptyForm: KYCFormState = {
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  country: "",
  address: "",
};

const statusStyles: Record<KYCStatus, string> = {
  pending: "bg-amber-500/15 text-amber-300 border border-amber-400/30",
  approved: "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30",
  rejected: "bg-red-500/15 text-red-300 border border-red-400/30",
};

function formatStatus(status: KYCStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function ProfilePage() {
  const { user, loading } = useUser();

  const [kycForm, setKycForm] = useState<KYCFormState>(emptyForm);
  const [kycRecord, setKycRecord] = useState<KYCRecord | null>(null);
  const [kycLoading, setKycLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    setKycForm({
      email: user.email ?? "",
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      phoneNumber: user.phoneNumber ?? "",
      country: user.country ?? "",
      address: "",
    });
  }, [user]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchKYC = async () => {
      setKycLoading(true);

      try {
        const response = await fetch("/api/kyc/user");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to load KYC details");
        }

        const nextKYC = data.kyc as KYCRecord | null;
        setKycRecord(nextKYC);

        if (nextKYC) {
          setKycForm({
            email: nextKYC.email ?? user.email ?? "",
            firstName: nextKYC.firstName ?? user.firstName ?? "",
            lastName: nextKYC.lastName ?? user.lastName ?? "",
            phoneNumber: nextKYC.phoneNumber ?? user.phoneNumber ?? "",
            country: nextKYC.country ?? user.country ?? "",
            address: nextKYC.address ?? "",
          });
        }
      } catch (error) {
        setFeedback({
          type: "error",
          message:
            error instanceof Error
              ? error.message
              : "Unable to load KYC information.",
        });
      } finally {
        setKycLoading(false);
      }
    };

    fetchKYC();
  }, [user]);

  if (loading) {
    return <p className="p-6 text-white">Loading...</p>;
  }

  if (!user) {
    redirect("/login");
  }

  const identityStatus = kycRecord?.status ?? "not-submitted";
  const isPending = kycRecord?.status === "pending";
  const isApproved = kycRecord?.status === "approved";
  const canSubmit = !isPending && !isApproved;
  const initials =
    `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase();

  const handleChange = (field: keyof KYCFormState, value: string) => {
    setKycForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    if (!idDocument || !selfie) {
      setFeedback({
        type: "error",
        message: "Please upload both your ID document and a selfie.",
      });
      return;
    }

    setSubmitting(true);
    setFeedback({ type: null, message: "" });

    try {
      const formData = new FormData();
      formData.append("email", kycForm.email.trim());
      formData.append("firstName", kycForm.firstName.trim());
      formData.append("lastName", kycForm.lastName.trim());
      formData.append("phoneNumber", kycForm.phoneNumber.trim());
      formData.append("country", kycForm.country.trim());
      formData.append("address", kycForm.address.trim());
      formData.append("idDocument", idDocument);
      formData.append("selfie", selfie);

      const response = await fetch("/api/kyc", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit KYC application");
      }

      setKycRecord(data.kyc as KYCRecord);
      setIdDocument(null);
      setSelfie(null);
      setFeedback({
        type: "success",
        message:
          "Your KYC information has been submitted successfully and is now under review.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to submit KYC application.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Aside />
      <main className="min-h-screen bg-black md:ml-[20%]">
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 p-4 pt-16 text-white md:p-8 md:pt-8">
          <TickerLive />

          <section className="overflow-hidden rounded-3xl border border-white/10 bg-gray-900">
            <div className="relative h-44 w-full sm:h-56">
              <Image
                src="https://cdn.pixabay.com/photo/2022/12/26/11/37/bitcoin-7678816_1280.jpg"
                alt="Capital Market Hub profile banner"
                fill
                className="object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
            </div>

            <div className="relative -mt-12 flex flex-col gap-4 px-4 pb-6 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-lime-300/30 bg-lime-400 text-2xl font-bold text-black shadow-lg shadow-lime-400/20">
                    {initials || "U"}
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold sm:text-3xl">
                      {user.firstName} {user.lastName}
                    </h1>
                    <p className="text-sm text-gray-300">{user.email}</p>
                    <p className="mt-1 text-sm text-gray-400">
                      Manage your account details and identity verification in one place.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                    Identity Status
                  </p>
                  {identityStatus === "not-submitted" ? (
                    <span className="mt-2 inline-flex rounded-full border border-gray-600 bg-gray-800 px-3 py-1 text-sm text-gray-200">
                      Not Submitted
                    </span>
                  ) : (
                    <span
                      className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm ${statusStyles[identityStatus]}`}
                    >
                      {formatStatus(identityStatus)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>

          {feedback.type && (
            <div
              className={`rounded-2xl border px-4 py-3 text-sm ${
                feedback.type === "success"
                  ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
                  : "border-red-400/30 bg-red-500/10 text-red-200"
              }`}
            >
              {feedback.message}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-3xl border border-white/10 bg-gray-900 p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">User Information</h2>
                  <p className="mt-1 text-sm text-gray-400">
                    Your current account details and verification summary.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                    Full Name
                  </p>
                  <p className="mt-2 text-base font-medium">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                    Email
                  </p>
                  <p className="mt-2 break-words text-base font-medium">{user.email}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                    Phone Number
                  </p>
                  <p className="mt-2 text-base font-medium">
                    {user.phoneNumber || "Not added yet"}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                    Country
                  </p>
                  <p className="mt-2 text-base font-medium">
                    {user.country || "Not added yet"}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                    Total Balance
                  </p>
                  <p className="mt-2 text-base font-medium">
                    ${user.balance?.totalBalance.toFixed(2)}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                    KYC Review
                  </p>
                  <p className="mt-2 text-base font-medium">
                    {kycRecord
                      ? `Submitted on ${new Date(kycRecord.createdAt).toLocaleDateString()}`
                      : "No KYC application submitted yet"}
                  </p>
                </div>
              </div>

              {kycRecord && (
                <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
                  <h3 className="text-sm font-semibold text-white">Latest KYC Record</h3>
                  <div className="mt-3 space-y-2 text-sm text-gray-300">
                    <p>
                      Status:{" "}
                      <span className="font-medium text-white">
                        {formatStatus(kycRecord.status)}
                      </span>
                    </p>
                    <p>
                      Address:{" "}
                      <span className="font-medium text-white">{kycRecord.address}</span>
                    </p>
                    {kycRecord.reviewedAt && (
                      <p>
                        Reviewed:{" "}
                        <span className="font-medium text-white">
                          {new Date(kycRecord.reviewedAt).toLocaleString()}
                        </span>
                      </p>
                    )}
                    {kycRecord.rejectionReason && (
                      <p className="text-red-300">
                        Rejection reason: {kycRecord.rejectionReason}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm">
                    <a
                      href={kycRecord.idDocumentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-lime-300/30 px-4 py-2 text-lime-300 transition hover:bg-lime-400/10"
                    >
                      View ID Document
                    </a>
                    <a
                      href={kycRecord.selfieUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-sky-300/30 px-4 py-2 text-sky-300 transition hover:bg-sky-400/10"
                    >
                      View Selfie
                    </a>
                  </div>
                </div>
              )}
            </section>

            <section className="rounded-3xl border border-white/10 bg-gray-900 p-5 sm:p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">KYC Verification</h2>
                  <p className="mt-1 text-sm text-gray-400">
                    Submit your legal identity details for account verification.
                  </p>
                </div>
                {identityStatus !== "not-submitted" && kycRecord && (
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm ${statusStyles[kycRecord.status]}`}
                  >
                    {formatStatus(kycRecord.status)}
                  </span>
                )}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-gray-300">
                {kycLoading ? (
                  <p>Loading your KYC status...</p>
                ) : isApproved ? (
                  <p>Your identity has already been verified. Your submitted record is shown on this page for reference.</p>
                ) : isPending ? (
                  <p>Your KYC application is currently under review. You can view the submitted documents on the left while the admin team processes it.</p>
                ) : kycRecord?.status === "rejected" ? (
                  <p>Previous submission was rejected. Update the details below and upload fresh documents to resubmit your KYC.</p>
                ) : (
                  <p>Complete the form below and upload a government-issued ID plus a selfie to verify your account.</p>
                )}
              </div>

              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-gray-300">Email</label>
                    <input
                      type="email"
                      value={kycForm.email}
                      onChange={(event) => handleChange("email", event.target.value)}
                      disabled={!canSubmit}
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-lime-300/40 disabled:cursor-not-allowed disabled:opacity-60"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-gray-300">Phone Number</label>
                    <input
                      type="text"
                      value={kycForm.phoneNumber}
                      onChange={(event) =>
                        handleChange("phoneNumber", event.target.value)
                      }
                      disabled={!canSubmit}
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-lime-300/40 disabled:cursor-not-allowed disabled:opacity-60"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-gray-300">First Name</label>
                    <input
                      type="text"
                      value={kycForm.firstName}
                      onChange={(event) =>
                        handleChange("firstName", event.target.value)
                      }
                      disabled={!canSubmit}
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-lime-300/40 disabled:cursor-not-allowed disabled:opacity-60"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-gray-300">Last Name</label>
                    <input
                      type="text"
                      value={kycForm.lastName}
                      onChange={(event) =>
                        handleChange("lastName", event.target.value)
                      }
                      disabled={!canSubmit}
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-lime-300/40 disabled:cursor-not-allowed disabled:opacity-60"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-gray-300">Country</label>
                    <input
                      type="text"
                      value={kycForm.country}
                      onChange={(event) => handleChange("country", event.target.value)}
                      disabled={!canSubmit}
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-lime-300/40 disabled:cursor-not-allowed disabled:opacity-60"
                      placeholder="Enter your country"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-gray-300">Home Address</label>
                    <input
                      type="text"
                      value={kycForm.address}
                      onChange={(event) => handleChange("address", event.target.value)}
                      disabled={!canSubmit}
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-lime-300/40 disabled:cursor-not-allowed disabled:opacity-60"
                      placeholder="Enter your home address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-dashed border-white/15 bg-black/30 p-4">
                    <label className="mb-2 block text-sm font-medium text-white">
                      ID Document
                    </label>
                    <p className="mb-3 text-xs text-gray-400">
                      Accepted: JPG, PNG, WebP, or PDF. Max size 5MB.
                    </p>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp,.pdf"
                      disabled={!canSubmit}
                      onChange={(event) =>
                        setIdDocument(event.target.files?.[0] ?? null)
                      }
                      className="block w-full text-sm text-gray-300 file:mr-4 file:rounded-full file:border-0 file:bg-lime-400 file:px-4 file:py-2 file:font-semibold file:text-black hover:file:bg-lime-300 disabled:cursor-not-allowed"
                    />
                    <p className="mt-3 text-xs text-gray-400">
                      {idDocument ? idDocument.name : "No file selected"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-dashed border-white/15 bg-black/30 p-4">
                    <label className="mb-2 block text-sm font-medium text-white">
                      Selfie Photo
                    </label>
                    <p className="mb-3 text-xs text-gray-400">
                      Accepted: JPG, PNG, or WebP. Max size 5MB.
                    </p>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp"
                      disabled={!canSubmit}
                      onChange={(event) => setSelfie(event.target.files?.[0] ?? null)}
                      className="block w-full text-sm text-gray-300 file:mr-4 file:rounded-full file:border-0 file:bg-sky-400 file:px-4 file:py-2 file:font-semibold file:text-black hover:file:bg-sky-300 disabled:cursor-not-allowed"
                    />
                    <p className="mt-3 text-xs text-gray-400">
                      {selfie ? selfie.name : "No file selected"}
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit || submitting || kycLoading}
                  className="w-full rounded-2xl bg-lime-400 px-4 py-3 font-semibold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-300"
                >
                  {submitting
                    ? "Submitting KYC..."
                    : kycRecord?.status === "rejected"
                      ? "Resubmit KYC"
                      : "Submit KYC"}
                </button>
              </form>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProfilePage;
