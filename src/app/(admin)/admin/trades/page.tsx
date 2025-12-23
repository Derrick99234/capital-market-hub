"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";

// =====================
// Types
// =====================

type Trade = {
  _id: string;
  userId:
    | { _id: string; firstName: string; lastName: string; email: string }
    | string;
  type: "BUY" | "SELL";
  assetClass: string;
  assetTicker: string;
  tradeAmount: number;
  duration: string;
  profitLoss: number;
  status: "PENDING" | "WIN" | "LOSS";
  createdAt: string;
};

// =====================
// Helpers
// =====================

const StatusPill = ({ status }: { status: Trade["status"] }) => {
  const styles: Record<Trade["status"], string> = {
    PENDING: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    WIN: "bg-green-500/15 text-green-400 border-green-500/30",
    LOSS: "bg-red-500/15 text-red-400 border-red-500/30",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const ActionButton = ({
  label,
  onClick,
  disabled,
  variant,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant: "pending" | "approve" | "reject";
}) => {
  const base = "px-3 py-1.5 rounded-lg text-sm font-semibold transition";
  const variants = {
    pending: "border border-yellow-500 text-yellow-400 hover:bg-yellow-500/10",
    approve: "border border-green-500 text-green-400 hover:bg-green-500/10",
    reject: "border border-red-500 text-red-400 hover:bg-red-500/10",
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${
        disabled ? "opacity-40 cursor-not-allowed" : ""
      }`}
    >
      {label}
    </button>
  );
};

// =====================
// Page
// =====================

export default function AdminTradesPage() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTrades = async () => {
    setLoading(true);
    const res = await fetch("/api/trades");
    const data = await res.json();
    setTrades(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  // =====================
  // Actions
  // =====================
  const handleApprove = async (tradeId: string) => {
    if (!confirm("Approve this payment?")) return;
    await fetch("/api/trades/win", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tradeId }),
    });
    fetchTrades();
  };
  const handleReject = async (tradeId: string) => {
    const reason =
      prompt("Reason for rejection (optional):") || "Rejected by admin";
    await fetch("/api/trades/loss", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tradeId, reason }),
    });
    fetchTrades();
  };
  const handlePending = async (tradeId: string) => {
    const reason =
      prompt("Reason for holding payment (optional):") || "Held by admin";
    await fetch("/api/trades/pending", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tradeId, reason }),
    });
    fetchTrades();
  };

  if (loading) {
    return <p className="p-6 text-gray-400">Loading trades...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Trades Management</h1>
        <span className="text-sm text-gray-400">
          Total Trades: {trades.length}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-gray-900 rounded-2xl shadow">
        <table className="min-w-full text-sm text-gray-200">
          <thead className="bg-gray-800 text-gray-400">
            <tr>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Asset</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Duration</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => {
              const user =
                typeof trade.userId === "string" ? null : trade.userId;

              return (
                <tr
                  key={trade._id}
                  className="border-t border-gray-800 hover:bg-gray-800/40"
                >
                  <td className="px-4 py-3">
                    <div className="font-semibold">
                      {user
                        ? `${user.firstName} ${user.lastName}`
                        : "Unknown User"}
                    </div>
                    <div className="text-xs text-gray-400">
                      {user?.email || "-"}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="font-semibold">{trade.assetTicker}</div>
                    <div className="text-xs text-gray-400">
                      {trade.assetClass}
                    </div>
                  </td>

                  <td className="px-4 py-3 font-bold">
                    {trade.type === "BUY" ? (
                      <span className="text-green-400">BUY</span>
                    ) : (
                      <span className="text-red-400">SELL</span>
                    )}
                  </td>

                  <td className="px-4 py-3">${trade.tradeAmount.toFixed(2)}</td>

                  <td className="px-4 py-3">{trade.duration}</td>

                  <td className="px-4 py-3">
                    <StatusPill status={trade.status} />
                  </td>

                  <td className="px-4 py-3 flex justify-end gap-2">
                    <ActionButton
                      label="Pending"
                      variant="pending"
                      disabled={trade.status === "PENDING"}
                      onClick={() => handlePending(trade._id)}
                    />
                    <ActionButton
                      label="Win"
                      variant="approve"
                      disabled={trade.status === "WIN"}
                      onClick={() => handleApprove(trade._id)}
                    />
                    <ActionButton
                      label="Loss"
                      variant="reject"
                      disabled={trade.status === "LOSS"}
                      onClick={() => handleReject(trade._id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
