// app/admin/payments/page.tsx
"use client";
import React, { useEffect, useState } from "react";

type Withdrawal = {
  _id: string;
  userId:
    | { _id: string; firstName: string; lastName: string; email: string }
    | string;
  amount: number;
  currency: string;
  method?: string;
  status: string;
  createdAt?: string;
};

export default function AdminPaymentsPage() {
  const [Withdrawal, setWithdrawal] = useState<Withdrawal[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWithdwals = async () => {
    setLoading(true);
    const res = await fetch("/api/withdrawal");
    const data = await res.json();
    setWithdrawal(data.withdrawals || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchWithdwals();
  }, []);

  const handleApprove = async (withdrawalID: string) => {
    if (!confirm("Approve this withdrawal?")) return;
    await fetch("/api/withdrawal/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ withdrawalID }),
    });
    fetchWithdwals();
  };

  const handleReject = async (withdrawalID: string) => {
    const reason =
      prompt("Reason for rejection (optional):") || "Rejected by admin";
    await fetch("/api/withdrawal/reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ withdrawalID, reason }),
    });
    fetchWithdwals();
  };

  const handlePending = async (withdrawalID: string) => {
    const reason =
      prompt("Reason for holding payment (optional):") || "Held by admin";
    await fetch("/api/withdrawal/pending", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ withdrawalID, reason }),
    });
    fetchWithdwals();
  };

  if (loading) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
        <p className="text-gray-400 text-center">Loading withdrawals...</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 md:flex-row min-h-screen md:ml-[20%] max-[500px]:mt-12">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
        Withdrawals
      </h1>
      {Withdrawal && Withdrawal.length ? (
        <div className="space-y-3 sm:space-y-4">
          {Withdrawal.map((w) => {
            const user = typeof w.userId === "string" ? null : w.userId;
            return (
              <div
                key={w._id}
                className="p-3 sm:p-4 bg-gray-800 text-white rounded-lg shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4"
              >
                <div className="flex-1">
                  <div className="font-semibold text-sm sm:text-base">
                    {user ? `${user.firstName} ${user.lastName}` : "User"}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300 mt-1">
                    {user?.email || "-"}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-200 mt-1">
                    Amount: ${w.amount.toFixed(2)} {w.currency}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Status: <span className="capitalize">{w.status}</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handlePending(w._id)}
                    className={`px-3 py-1.5 text-xs sm:text-sm border border-yellow-600 rounded-md transition-colors ${
                      w.status === "pending"
                        ? "opacity-50 cursor-not-allowed bg-yellow-600/20"
                        : "hover:bg-yellow-600/20"
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleApprove(w._id)}
                    className={`px-3 py-1.5 text-xs sm:text-sm border border-green-600 rounded-md transition-colors ${
                      w.status === "approved"
                        ? "opacity-50 cursor-not-allowed bg-green-600/20"
                        : "hover:bg-green-600/20"
                    }`}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(w._id)}
                    className={`px-3 py-1.5 text-xs sm:text-sm border border-red-600 rounded-md transition-colors ${
                      w.status === "rejected"
                        ? "opacity-50 cursor-not-allowed bg-red-600/20"
                        : "hover:bg-red-600/20"
                    }`}
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-400 py-8">No withdrawals found.</p>
      )}
    </div>
  );
}
