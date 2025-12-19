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

  if (loading) return <p>Loading withdrawals...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Withdrawals</h1>
      {Withdrawal && Withdrawal.length ? (
        Withdrawal.map((w) => {
          const user = typeof w.userId === "string" ? null : w.userId;
          return (
            <div
              key={w._id}
              className="p-4 bg-gray-800 text-white rounded mb-3 flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">
                  {user ? `${user.firstName} ${user.lastName}` : "User"}
                </div>
                <div className="text-sm text-gray-300">
                  {user?.email || "-"}
                </div>
                <div className="text-sm text-gray-200 mt-1">
                  Amount: ${w.amount.toFixed(2)} {w.currency}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePending(w._id)}
                  className={`px-3 py-1 border border-yellow-600 rounded ${
                    w.status === "pending"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => handleApprove(w._id)}
                  className={`px-3 py-1 border border-green-600 rounded ${
                    w.status === "approved"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(w._id)}
                  className={`px-3 py-1 border border-red-600 rounded ${
                    w.status === "rejected"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>No withdrawals.</p>
      )}
    </div>
  );
}
