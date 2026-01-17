// app/admin/payments/page.tsx
"use client";
import React, { useEffect, useState } from "react";

type Payment = {
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
  const [payments, setPayments] = useState<Payment[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    setLoading(true);
    const res = await fetch("/api/payments");
    const data = await res.json();
    setPayments(data.payments || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleApprove = async (paymentId: string) => {
    if (!confirm("Approve this payment?")) return;
    await fetch("/api/payments/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId }),
    });
    fetchPayments();
  };

  const handleReject = async (paymentId: string) => {
    const reason =
      prompt("Reason for rejection (optional):") || "Rejected by admin";
    await fetch("/api/payments/reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId, reason }),
    });
    fetchPayments();
  };

  const handlePending = async (paymentId: string) => {
    const reason =
      prompt("Reason for holding payment (optional):") || "Held by admin";
    await fetch("/api/payments/pending", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId, reason }),
    });
    fetchPayments();
  };

  if (loading) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        <p className="text-gray-400 text-center">Loading payments...</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 md:flex-row min-h-screen md:ml-[20%] max-[500px]:mt-12">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
        Payments
      </h1>
      {payments && payments.length ? (
        <div className="space-y-3 sm:space-y-4">
          {payments.map((p) => {
            const user = typeof p.userId === "string" ? null : p.userId;
            return (
              <div
                key={p._id}
                className="p-3 sm:p-4 bg-black text-white rounded-lg shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4"
              >
                <div className="flex-1">
                  <div className="font-semibold text-sm sm:text-base">
                    {user ? `${user.firstName} ${user.lastName}` : "User"}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300 mt-1">
                    {user?.email || "-"}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-200 mt-1">
                    Amount: ${p.amount.toFixed(2)} {p.currency}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Status: <span className="capitalize">{p.status}</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handlePending(p._id)}
                    className={`px-3 py-1.5 text-xs sm:text-sm border border-yellow-600 rounded-md transition-colors ${
                      p.status === "pending"
                        ? "opacity-50 cursor-not-allowed bg-yellow-600/20"
                        : "hover:bg-yellow-600/20"
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleApprove(p._id)}
                    className={`px-3 py-1.5 text-xs sm:text-sm border border-green-600 rounded-md transition-colors ${
                      p.status === "approved"
                        ? "opacity-50 cursor-not-allowed bg-green-600/20"
                        : "hover:bg-green-600/20"
                    }`}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(p._id)}
                    className={`px-3 py-1.5 text-xs sm:text-sm border border-red-600 rounded-md transition-colors ${
                      p.status === "rejected"
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
        <p className="text-center text-gray-400 py-8">No payments found.</p>
      )}
    </div>
  );
}
