import Link from "next/link";
import React from "react";
import { FiCheck } from "react-icons/fi";

export interface PackageCardProps {
  id: "BRONZE" | "SILVER" | "GOLD";
  name: string;
  minDeposit: string;
  maxDeposit: string;
  duration: string;
  leverage: string;
  spreads: string;
  isFeatured?: boolean;
  isCurrent?: boolean;
}

function PackageCard({
  id,
  name,
  minDeposit,
  maxDeposit,
  duration,
  leverage,
  spreads,
  isFeatured = false,
  isCurrent = false,
}: PackageCardProps) {
  const badgeColor =
    id === "GOLD"
      ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
      : id === "SILVER"
      ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
      : "bg-orange-500/20 text-orange-300 border-orange-500/30";

  return (
    <div
      className={`relative w-full max-w-sm flex flex-col justify-between rounded-2xl border transition-all duration-300 ${
        isFeatured
          ? "bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 border-lime-500/60 shadow-xl shadow-lime-500/10 scale-105 z-10"
          : "bg-gray-900/90 border-gray-800 hover:border-gray-700 shadow-lg"
      }`}
    >
      {isFeatured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-lime-400 text-black text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-md">
          Most Popular
        </div>
      )}

      <div>
        {/* Header */}
        <div className="p-6 pb-4 border-b border-gray-800/80 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded border uppercase tracking-wider ${badgeColor}`}
            >
              {id}
            </span>
            {isCurrent && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Active Plan
              </span>
            )}
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
          <p className="text-gray-400 text-xs uppercase tracking-wide">
            Deposit Range
          </p>
          <div className="mt-2 text-2xl font-extrabold text-lime-400">
            {minDeposit} <span className="text-gray-400 text-base font-normal">–</span> {maxDeposit}
          </div>
        </div>

        {/* Feature List */}
        <ul className="p-6 space-y-3.5 text-sm text-gray-300">
          <li className="flex items-center justify-between">
            <span className="text-gray-400">Contract Duration</span>
            <span className="font-semibold text-white">{duration}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-gray-400">Trading Leverage</span>
            <span className="font-semibold text-white">{leverage}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-gray-400">Spreads</span>
            <span className="font-semibold text-white">{spreads}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-gray-400">Risk Management</span>
            <span className="flex items-center gap-1 font-semibold text-emerald-400">
              <FiCheck /> Included
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-gray-400">Dedicated Account Manager</span>
            <span className="flex items-center gap-1 font-semibold text-emerald-400">
              <FiCheck /> Yes
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-gray-400">All Trading Platforms</span>
            <span className="flex items-center gap-1 font-semibold text-emerald-400">
              <FiCheck /> 24/7 Access
            </span>
          </li>
        </ul>
      </div>

      {/* Button Action */}
      <div className="p-6 pt-2 border-t border-gray-800/80">
        <Link
          href={`/dashboard/upgrade-package?plan=${id}`}
          className={`w-full font-semibold uppercase tracking-wider py-3.5 px-4 rounded-xl block text-center transition-all ${
            isCurrent
              ? "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              : isFeatured
              ? "bg-lime-400 text-black hover:bg-lime-300 shadow-md shadow-lime-400/20"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
        >
          {isCurrent ? "Upgrade / Change Limit" : `Upgrade to ${name}`}
        </Link>
      </div>
    </div>
  );
}

export default PackageCard;
