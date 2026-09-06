"use client";

import Aside from "@/components/aside";
import TickerLive from "@/components/live-price";
import { useUser } from "@/context/user-context";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { FiAlertCircle, FiCheckCircle, FiClock, FiShield, FiArrowRight } from "react-icons/fi";

const PLAN_OPTIONS = [
  {
    tier: "BRONZE" as const,
    name: "Bronze Plan",
    min: 3000,
    max: 10000,
    minDisplay: "$3,000",
    maxDisplay: "$10,000",
    duration: "3 Weeks",
    leverage: "1:500",
    spreads: "3.3 Pips",
    description: "Standard trading package designed for beginner and intermediate investors.",
  },
  {
    tier: "SILVER" as const,
    name: "Silver Plan",
    min: 10000,
    max: 50000,
    minDisplay: "$10,000",
    maxDisplay: "$50,000",
    duration: "4-6 Weeks",
    leverage: "1:1,000",
    spreads: "2.5 Pips",
    description: "Our most popular package with enhanced leverage and tighter spreads.",
  },
  {
    tier: "GOLD" as const,
    name: "Gold Plan",
    min: 50000,
    max: Infinity,
    minDisplay: "$50,000",
    maxDisplay: "Unlimited",
    duration: "9 Weeks",
    leverage: "1:3,000",
    spreads: "1.5 Pips",
    description: "Institutional-grade execution, maximum leverage, and VIP account management.",
  },
];

function UpgradePackageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useUser();

  const planParam = searchParams.get("plan")?.toUpperCase();
  const initialTier =
    planParam === "GOLD" ? "GOLD" : planParam === "SILVER" ? "SILVER" : "BRONZE";

  const [selectedTier, setSelectedTier] = useState<"BRONZE" | "SILVER" | "GOLD">(
    initialTier
  );
  const [amount, setAmount] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [recentUpgradePayment, setRecentUpgradePayment] = useState<any | null>(null);
  const [fetchingHistory, setFetchingHistory] = useState<boolean>(true);

  // Fetch recent payments to check for pending, rejected, or approved upgrade requests
  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        const res = await fetch("/api/payments/user");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.payments) && data.payments.length > 0) {
            // Strictly check the very latest transaction
            const lastPayment = data.payments[0];
            setRecentUpgradePayment(lastPayment);
          }
        }
      } catch (err) {
        console.error("Failed to fetch user payments in upgrade page:", err);
      } finally {
        setFetchingHistory(false);
      }
    };
    fetchUserHistory();
  }, []);

  // Update selected plan if URL param changes
  useEffect(() => {
    if (planParam && (planParam === "BRONZE" || planParam === "SILVER" || planParam === "GOLD")) {
      setSelectedTier(planParam as any);
    }
  }, [planParam]);

  const activePlanConfig =
    PLAN_OPTIONS.find((p) => p.tier === selectedTier) || PLAN_OPTIONS[0];

  // Set default amount when plan changes if empty or below min
  useEffect(() => {
    if (!amount || Number(amount) < activePlanConfig.min) {
      setAmount(String(activePlanConfig.min));
    }
  }, [selectedTier, activePlanConfig.min]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setErrorMessage("Please enter a valid investment amount.");
      return;
    }

    if (numAmount < activePlanConfig.min) {
      setErrorMessage(
        `Minimum investment for ${activePlanConfig.name} is ${activePlanConfig.minDisplay}.`
      );
      return;
    }

    if (activePlanConfig.max !== Infinity && numAmount > activePlanConfig.max) {
      setErrorMessage(
        `Maximum investment for ${activePlanConfig.name} is ${activePlanConfig.maxDisplay}.`
      );
      return;
    }

    // Direct redirection to Account Funding with prefilled plan and amount.
    // The plan will officially activate only after deposit is made and approved by admin.
    router.push(
      `/dashboard/account-funding?plan=${selectedTier}&amount=${numAmount}`
    );
  };

  return (
    <div className="w-full space-y-6 min-h-screen text-white">
      <TickerLive />

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Upgrade Account Plan</h1>
        <p className="text-gray-400 text-sm mt-1">
          Select your desired investment tier and deposit amount to initiate your upgrade.
        </p>
      </div>

      <hr className="border-gray-800" />

      {/* Current Active Plan Notice */}
      {user && (
        <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-400">
              Current Active Class
            </span>
            <div className="text-lg font-bold text-lime-400">
              ${(user.plan?.amount ?? 250).toLocaleString()} {user.plan?.name || "Trial Plan"}
            </div>
          </div>
          <span className="text-xs px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full font-medium">
            Active Status: {user.plan?.status || "Active"}
          </span>
        </div>
      )}

      {/* Pending Upgrade Status Banner (Only shown if last transaction is PENDING) */}
      {!fetchingHistory && recentUpgradePayment && recentUpgradePayment.status === "pending" && (
        <div className="rounded-2xl p-5 border shadow-lg bg-amber-950/40 border-amber-500/50 text-amber-100 transition-all">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2 font-bold text-base">
              <FiClock className="text-amber-400 text-lg" />
              <span className="text-amber-300">
                Plan Upgrade Request: Pending Approval
              </span>
            </div>
            <span className="text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider border bg-amber-500/20 text-amber-300 border-amber-500/40">
              Status: Pending
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            You previously submitted a deposit of{" "}
            <strong className="text-white">
              ${Number(recentUpgradePayment.amount).toLocaleString()}
            </strong>{" "}
            for the{" "}
            <strong className="text-white">
              {recentUpgradePayment.planName ||
                (recentUpgradePayment.amount >= 50000
                  ? "Gold Plan"
                  : recentUpgradePayment.amount >= 10000
                  ? "Silver Plan"
                  : "Bronze Plan")}
            </strong>
            . This request is currently awaiting administrative approval. Once confirmed, your account class will automatically update.
          </p>

          <div className="pt-3 flex items-center gap-3">
            <Link
              href="/dashboard/account-funding#deposit-history"
              className="inline-flex items-center gap-1.5 text-xs font-semibold py-2 px-3.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 transition"
            >
              View Deposit History Table <FiArrowRight />
            </Link>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="bg-red-950/50 border border-red-500/50 text-red-200 p-4 rounded-xl flex items-center gap-3">
          <FiAlertCircle className="text-red-400 text-xl flex-shrink-0" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Upgrade Form */}
      <form
        onSubmit={handleSubmit}
        className="py-6 px-6 border border-gray-800 bg-gray-900/60 max-w-3xl rounded-2xl space-y-6 shadow-xl"
      >
        <div>
          <label className="text-gray-300 text-sm font-medium block mb-2">
            1. Select Plan Tier
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PLAN_OPTIONS.map((plan) => {
              const isSelected = selectedTier === plan.tier;
              return (
                <button
                  type="button"
                  key={plan.tier}
                  onClick={() => setSelectedTier(plan.tier)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "bg-lime-400/10 border-lime-400 text-white shadow-md shadow-lime-400/10"
                      : "bg-gray-800/60 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-base text-white">
                      {plan.name}
                    </span>
                    <span
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? "border-lime-400 bg-lime-400"
                          : "border-gray-500"
                      }`}
                    />
                  </div>
                  <p className="text-xs text-lime-400 font-semibold mb-1">
                    {plan.minDisplay} – {plan.maxDisplay}
                  </p>
                  <p className="text-xs text-gray-400">
                    {plan.duration} • {plan.leverage}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Plan Details */}
        <div className="bg-gray-800/40 border border-gray-800 p-4 rounded-xl space-y-2 text-xs text-gray-300">
          <div className="flex items-center gap-2 text-lime-400 font-semibold">
            <FiShield /> {activePlanConfig.name} Benefits
          </div>
          <p className="text-gray-400">{activePlanConfig.description}</p>
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-800/80">
            <div>
              <span className="text-gray-500 block">Duration</span>
              <span className="font-medium text-white">
                {activePlanConfig.duration}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block">Leverage</span>
              <span className="font-medium text-white">
                {activePlanConfig.leverage}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block">Spreads</span>
              <span className="font-medium text-white">
                {activePlanConfig.spreads}
              </span>
            </div>
          </div>
        </div>

        {/* Amount Input */}
        <div>
          <label htmlFor="plan-amount" className="text-gray-300 text-sm font-medium block mb-2">
            2. Investment Amount (USD)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
              $
            </span>
            <input
              id="plan-amount"
              type="number"
              min={activePlanConfig.min}
              max={activePlanConfig.max === Infinity ? undefined : activePlanConfig.max}
              step="100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white pl-8 pr-4 py-3 rounded-xl outline-none focus:border-lime-400 transition"
              placeholder={`Enter amount (min ${activePlanConfig.minDisplay})`}
              required
            />
          </div>
          <p className="text-xs text-gray-400 mt-1.5">
            Allowed range for {activePlanConfig.name}:{" "}
            <span className="text-lime-400 font-medium">
              {activePlanConfig.minDisplay} – {activePlanConfig.maxDisplay}
            </span>
          </p>
        </div>

        {/* Optional Notes */}
        <div>
          <label htmlFor="notes" className="text-gray-300 text-sm font-medium block mb-2">
            3. Notes or Instructions (Optional)
          </label>
          <input
            id="notes"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Special trading requests or instructions..."
            className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-xl outline-none focus:border-lime-400 transition text-sm"
          />
        </div>

        {/* Upgrade Process Notice */}
        <div className="p-3.5 bg-blue-950/30 border border-blue-500/30 rounded-xl text-xs text-blue-200">
          💡 Next step: You will be redirected to Account Funding to make your deposit of{" "}
          <strong className="text-white">
            ${Number(amount || activePlanConfig.min).toLocaleString()}
          </strong>
          . Your account class will be upgraded once the payment is confirmed and approved by administration.
        </div>

        {/* Submit */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
          <button
            type="submit"
            className="w-full sm:w-auto bg-lime-400 hover:bg-lime-300 text-black font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl cursor-pointer transition shadow-md shadow-lime-400/20 flex items-center justify-center gap-2"
          >
            Proceed to Account Funding (${Number(amount || activePlanConfig.min).toLocaleString()})
            <FiArrowRight />
          </button>
          <Link
            href="/dashboard/packages"
            className="text-xs text-gray-400 hover:text-white underline"
          >
            Compare all plans
          </Link>
        </div>
      </form>
    </div>
  );
}

function UpgradePackage() {
  return (
    <>
      <Aside />
      <main className="flex flex-col md:flex-row min-h-screen md:ml-[20%] bg-black p-4 sm:p-8">
        <Suspense
          fallback={
            <div className="p-8 text-gray-400">Loading plan upgrade form...</div>
          }
        >
          <UpgradePackageContent />
        </Suspense>
      </main>
    </>
  );
}

export default UpgradePackage;
