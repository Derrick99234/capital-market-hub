"use client";

import Aside from "@/components/aside";
import TickerLive from "@/components/live-price";
import DataTable from "@/components/Table";
import { useUser } from "@/context/user-context";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";
import { FiCheckCircle, FiClock, FiCopy, FiCheck } from "react-icons/fi";

const PLAN_NAMES: Record<string, string> = {
  BRONZE: "Bronze Plan",
  SILVER: "Silver Plan",
  GOLD: "Gold Plan",
};

interface WalletOption {
  _id: string;
  name: string;
  label: string;
  symbol: string;
  network?: string;
  walletAddress: string;
  qrCodeUrl: string;
  isActive: boolean;
}

// Helper function to fetch user payments
async function fetchPayments() {
  const response = await fetch("/api/payments/user");
  if (!response.ok) {
    throw new Error("Failed to fetch payments");
  }
  return await response.json();
}

function AccountFundingContent() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan")?.toUpperCase();
  const amountParam = searchParams.get("amount");

  const [payments, setPayments] = useState<any[]>([]);
  const [wallets, setWallets] = useState<WalletOption[]>([]);
  const [selectedWalletId, setSelectedWalletId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [depositNotice, setDepositNotice] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const { user } = useUser();

  const [amount, setAmount] = useState<number>(
    amountParam ? Number(amountParam) : 0
  );

  // If amountParam changes, update amount
  useEffect(() => {
    if (amountParam && !isNaN(Number(amountParam))) {
      setAmount(Number(amountParam));
    }
  }, [amountParam]);

  // Load active wallets from database
  useEffect(() => {
    const loadWallets = async () => {
      try {
        const res = await fetch("/api/wallets?active=true");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.wallets) && data.wallets.length > 0) {
            setWallets(data.wallets);
            setSelectedWalletId(data.wallets[0]._id);
          }
        }
      } catch (err) {
        console.error("Failed to load deposit wallets:", err);
      }
    };
    loadWallets();
  }, []);

  const currentWallet =
    wallets.find((item) => item._id === selectedWalletId) ||
    wallets[0] ||
    null;

  const planName = planParam ? PLAN_NAMES[planParam] || `${planParam} Plan` : null;

  const handleCopyAddress = () => {
    if (!currentWallet?.walletAddress) return;
    navigator.clipboard.writeText(currentWallet.walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper function to add a new payment
  async function addPayment(amountVal: number) {
    const response = await fetch("/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountVal,
        userId: user?._id,
        method: currentWallet ? `${currentWallet.symbol}${currentWallet.network ? ` (${currentWallet.network})` : ""}` : "CRYPTO",
        planTier: planParam || undefined,
        planName: planName || undefined,
        note: planName ? `Plan upgrade deposit for ${planName}` : "Account deposit",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit deposit");
    }
    return await response.json();
  }

  // Fetch payments on mount
  const loadPayments = async () => {
    try {
      const data = await fetchPayments();
      setPayments(
        Array.isArray(data.payments)
          ? data.payments.map((payment: any, idx: number) => ({
              id: idx + 1,
              time: new Date(payment.createdAt).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              }),
              method: payment.method?.toUpperCase() || "-",
              amount: `$${payment.amount?.toLocaleString()}`,
              plan: payment.planName || payment.note || "General Deposit",
              note: payment.note || "-",
              status: (
                <span
                  className={`px-2 py-0.5 rounded text-xs font-semibold uppercase ${
                    payment.status === "approved"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : payment.status === "rejected"
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                  }`}
                >
                  {payment.status}
                </span>
              ),
            }))
          : []
      );
    } catch (err) {
      console.error("Failed to load payments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      alert("Please enter a valid deposit amount.");
      return;
    }

    setSubmitting(true);
    setDepositNotice(null);

    try {
      await addPayment(amount);
      await loadPayments();
      setDepositNotice(
        `Deposit request for $${amount.toLocaleString()} ${
          planName ? `(${planName})` : ""
        } submitted successfully! Status is currently Pending. Your funds and plan will be activated once confirmed by administration.`
      );
    } catch (err: any) {
      console.error("Error adding payment:", err);
      alert(err.message || "Failed to submit deposit.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return <div className="text-gray-400 p-8">Loading account...</div>;
  }

  return (
    <div className="w-full space-y-6 min-h-screen text-white">
      <TickerLive />

      {/* Plan Upgrade Intent Banner */}
      {planName && (
        <div className="bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 border border-lime-500/50 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase px-2.5 py-0.5 rounded bg-lime-400/20 text-lime-400 font-bold tracking-wider border border-lime-500/30">
                Plan Upgrade Request
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <FiClock /> Awaiting Deposit & Approval
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              {planName} — ${amount > 0 ? amount.toLocaleString() : "Select Amount"}
            </h2>
            <p className="text-xs text-gray-400 max-w-xl">
              Make your deposit using the wallet details below. Upon administrative approval of this payment, your account class will automatically update to <strong>{planName}</strong> with full trading privileges.
            </p>
          </div>
          <div className="bg-black/60 border border-gray-800 rounded-xl p-3 text-right">
            <span className="text-xs text-gray-500 block">Current Class</span>
            <span className="text-sm font-bold text-gray-300">
              ${(user.plan?.amount ?? 250).toLocaleString()} {user.plan?.name || "Trial Plan"}
            </span>
          </div>
        </div>
      )}

      {/* Submission Success Alert */}
      {depositNotice && (
        <div className="bg-emerald-950/60 border border-emerald-500/60 p-4 rounded-xl flex items-start gap-3 text-emerald-200">
          <FiCheckCircle className="text-2xl text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <strong className="block text-white font-semibold mb-1">
              Deposit Submitted
            </strong>
            {depositNotice}
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto flex justify-center flex-col items-center space-y-5 bg-gray-900/60 border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <h3 className="text-xl font-bold text-center">Deposit Instructions</h3>
        <p className="text-xs text-gray-400 text-center max-w-md">
          Select your deposit cryptocurrency network, transfer funds, and click <strong>Deposit</strong> to notify administration.
        </p>

        {/* Wallet Address Selector */}
        <div className="w-full space-y-1">
          <label className="text-xs font-semibold text-gray-400">
            Payment Cryptocurrency
          </label>
          <select
            name="funding-account"
            value={selectedWalletId}
            className="w-full py-2.5 px-4 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-lime-400"
            onChange={(e) => setSelectedWalletId(e.target.value)}
          >
            {wallets.map((w) => (
              <option key={w._id} value={w._id}>
                {w.label} {w.network ? `(${w.network})` : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Amount Input */}
        <div className="w-full space-y-1">
          <label className="text-xs font-semibold text-gray-400">
            Deposit Amount (USD)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
              $
            </span>
            <input
              type="number"
              name="amount"
              min="1"
              step="any"
              value={amount === 0 ? "" : amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full py-2.5 pl-8 pr-4 border border-gray-700 outline-none bg-gray-800 rounded-xl text-white focus:border-lime-400"
              placeholder="Enter deposit amount"
            />
          </div>
        </div>

        {/* Deposit QR & Address Details */}
        {currentWallet && (
          <div className="w-full border border-gray-800 bg-gray-950/80 rounded-xl p-5 text-center space-y-4">
            <p className="text-xs font-bold text-lime-400 tracking-wider uppercase">
              Send Only {currentWallet.label} To This Address
            </p>

            {/* QR Code */}
            <div className="flex justify-center py-2">
              <div className="relative w-56 h-56 bg-white p-2 rounded-xl shadow-md border border-gray-800">
                <Image
                  src={currentWallet.qrCodeUrl}
                  alt={currentWallet.label}
                  fill
                  className="object-contain rounded-lg p-2"
                  unoptimized={currentWallet.qrCodeUrl.startsWith("http")}
                />
              </div>
            </div>

            {/* Address with 1-Click Copy Button */}
            <div className="space-y-2">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-left">
                <span className="font-mono text-xs text-gray-200 break-all select-all flex-1 py-1 px-2 bg-black/50 rounded">
                  {currentWallet.walletAddress}
                </span>
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="bg-lime-400 hover:bg-lime-300 text-black px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition flex-shrink-0 cursor-pointer shadow-sm shadow-lime-400/20"
                >
                  {copied ? (
                    <>
                      <FiCheck className="text-sm" /> Copied!
                    </>
                  ) : (
                    <>
                      <FiCopy className="text-sm" /> Copy Address
                    </>
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-xs text-lime-400 font-semibold text-center">
                  ✓ Wallet address copied to clipboard!
                </p>
              )}
            </div>
          </div>
        )}

        {/* Deposit Action Button */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-lime-400 hover:bg-lime-300 disabled:opacity-50 text-black font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl cursor-pointer transition shadow-md shadow-lime-400/20"
        >
          {submitting
            ? "Submitting Deposit..."
            : `Deposit $${amount > 0 ? amount.toLocaleString() : "0"}`}
        </button>
      </div>

      {/* Payments History Table */}
      <div id="deposit-history" className="space-y-3 pt-4 scroll-mt-6">
        <h3 className="text-xl font-bold">Deposit History</h3>
        <DataTable
          data={payments}
          columns={[
            { key: "id", label: "S/N" },
            { key: "time", label: "Time" },
            { key: "method", label: "Method" },
            { key: "amount", label: "Amount" },
            { key: "plan", label: "Plan / Purpose" },
            { key: "status", label: "Status" },
            { key: "note", label: "Note" },
          ]}
        />
      </div>
    </div>
  );
}

function AccountFunding() {
  return (
    <>
      <Aside />
      <main className="flex flex-col md:flex-row min-h-screen md:ml-[20%] bg-black p-4 sm:p-8">
        <Suspense
          fallback={
            <div className="p-8 text-gray-400">Loading funding details...</div>
          }
        >
          <AccountFundingContent />
        </Suspense>
      </main>
    </>
  );
}

export default AccountFunding;
