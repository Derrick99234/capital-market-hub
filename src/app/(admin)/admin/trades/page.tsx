"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Clock, DollarSign } from "lucide-react";

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
// Profit/Loss Modal
// =====================

const ProfitLossModal = ({
  isOpen,
  onClose,
  trade,
  type,
  amount,
  setAmount,
  onConfirm,
  processing,
}: {
  isOpen: boolean;
  onClose: () => void;
  trade: Trade | null;
  type: "win" | "loss" | null;
  amount: string;
  setAmount: (amount: string) => void;
  onConfirm: () => void;
  processing: boolean;
}) => {
  if (!isOpen || !trade || !type) return null;

  const user = typeof trade.userId === "string" ? null : trade.userId;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-full ${type === "win" ? "bg-green-500/20" : "bg-red-500/20"}`}>
            <DollarSign className={`w-5 h-5 ${type === "win" ? "text-green-400" : "text-red-400"}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              {type === "win" ? "Record Trade Win" : "Record Trade Loss"}
            </h3>
            <p className="text-sm text-gray-400">Enter the {type === "win" ? "profit" : "loss"} amount</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="text-sm text-gray-400">Trade Details</div>
            <div className="text-sm text-white mt-1">
              <div>User: {user ? `${user.firstName} ${user.lastName}` : "Unknown"}</div>
              <div>Asset: {trade.assetTicker} ({trade.assetClass})</div>
              <div>Trade Amount: ${trade.tradeAmount.toFixed(2)}</div>
              <div>Type: <span className={trade.type === "BUY" ? "text-green-400" : "text-red-400"}>{trade.type}</span></div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              {type === "win" ? "Profit Amount ($)" : "Loss Amount ($)"}
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={processing}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={processing}
              className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={processing || !amount || parseFloat(amount) <= 0}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                type === "win"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              {processing ? "Processing..." : `Confirm ${type === "win" ? "Win" : "Loss"}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// =====================
// Page
// =====================

export default function AdminTradesPage() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  const [modalType, setModalType] = useState<"win" | "loss" | null>(null);
  const [amount, setAmount] = useState("");
  const [processing, setProcessing] = useState(false);

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
  // Modal Handlers
  // =====================
  const openModal = (trade: Trade, type: "win" | "loss") => {
    setSelectedTrade(trade);
    setModalType(type);
    setAmount("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTrade(null);
    setModalType(null);
    setAmount("");
  };

  const handleModalConfirm = async () => {
    if (!selectedTrade || !modalType || !amount || parseFloat(amount) <= 0) return;

    setProcessing(true);
    try {
      const endpoint = modalType === "win" ? "/api/trades/win" : "/api/trades/loss";
      const body = modalType === "win"
        ? { tradeId: selectedTrade._id, profitAmount: parseFloat(amount) }
        : { tradeId: selectedTrade._id, lossAmount: parseFloat(amount) };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to update trade");
      }

      closeModal();
      fetchTrades();
    } catch (error) {
      console.error("Error updating trade:", error);
      alert("Failed to update trade. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  // =====================
  // Actions
  // =====================
  const handleApprove = (trade: Trade) => {
    openModal(trade, "win");
  };

  const handleReject = (trade: Trade) => {
    openModal(trade, "loss");
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
    return <p className="p-4 sm:p-6 text-gray-400 text-center">Loading trades...</p>;
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold">Trades Management</h1>
        <span className="text-sm text-gray-400">
          Total Trades: {trades.length}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-gray-900 rounded-2xl shadow">
        <table className="min-w-full text-xs sm:text-sm text-gray-200">
          <thead className="bg-gray-800 text-gray-400">
            <tr>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">User</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">Asset</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">Type</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">Amount</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left hidden sm:table-cell">Duration</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">Status</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-right">Actions</th>
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
                  <td className="px-2 sm:px-4 py-2 sm:py-3">
                    <div className="font-semibold text-xs sm:text-sm">
                      {user
                        ? `${user.firstName} ${user.lastName}`
                        : "Unknown User"}
                    </div>
                    <div className="text-xs text-gray-400">
                      {user?.email || "-"}
                    </div>
                  </td>

                  <td className="px-2 sm:px-4 py-2 sm:py-3">
                    <div className="font-semibold text-xs sm:text-sm">{trade.assetTicker}</div>
                    <div className="text-xs text-gray-400">
                      {trade.assetClass}
                    </div>
                  </td>

                  <td className="px-2 sm:px-4 py-2 sm:py-3 font-bold text-xs sm:text-sm">
                    {trade.type === "BUY" ? (
                      <span className="text-green-400">BUY</span>
                    ) : (
                      <span className="text-red-400">SELL</span>
                    )}
                  </td>

                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">${trade.tradeAmount.toFixed(2)}</td>

                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm hidden sm:table-cell">{trade.duration}</td>

                  <td className="px-2 sm:px-4 py-2 sm:py-3">
                    <StatusPill status={trade.status} />
                  </td>

                  <td className="px-2 sm:px-4 py-2 sm:py-3 flex justify-end gap-1 sm:gap-2">
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
                       onClick={() => handleApprove(trade)}
                     />
                     <ActionButton
                       label="Loss"
                       variant="reject"
                       disabled={trade.status === "LOSS"}
                       onClick={() => handleReject(trade)}
                     />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ProfitLossModal
        isOpen={modalOpen}
        onClose={closeModal}
        trade={selectedTrade}
        type={modalType}
        amount={amount}
        setAmount={setAmount}
        onConfirm={handleModalConfirm}
        processing={processing}
      />
    </div>
  );
}
