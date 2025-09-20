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
    await fetch("/api/admin/payments/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId }),
    });
    fetchPayments();
  };

  const handleReject = async (paymentId: string) => {
    const reason =
      prompt("Reason for rejection (optional):") || "Rejected by admin";
    await fetch("/api/admin/payments/reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId, reason }),
    });
    fetchPayments();
  };

  if (loading) return <p>Loading payments...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pending Payments</h1>
      {payments && payments.length ? (
        payments.map((p) => {
          const user = typeof p.userId === "string" ? null : p.userId;
          return (
            <div
              key={p._id}
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
                  Amount: ${p.amount.toFixed(2)} {p.currency}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(p._id)}
                  className="px-3 py-1 bg-green-600 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(p._id)}
                  className="px-3 py-1 bg-red-600 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>No pending payments.</p>
      )}
    </div>
  );
}
