"use client";

import { useUser } from "@/context/user-context";
import { u } from "framer-motion/client";
import React, { useState } from "react";
import { IoCheckmarkDone } from "react-icons/io5";

// --- Custom Icons (Lucide replacements for single-file mandate) ---

// Wallet Icon
const WalletIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 12V7H4v14h16V12" />
    <path d="M4 7l-1 5l1 5" />
    <path d="M18 12h-2c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h2v-4z" />
    <path d="M17 10h.01" />
    <path d="M22 7l-2-2l-2 2" />
  </svg>
);

// --- Component Mock Data and Definitions ---

const MOCK_TRANSACTIONS = [
  {
    sn: 1,
    trader: "Daily FX",
    volume: 1.5,
    commission: 10,
    profit: 80.0,
    status: "SUCCESS",
    date: "2024-05-20 10:30",
  },
  {
    sn: 2,
    trader: "Alpha Trader",
    volume: 0.8,
    commission: 8,
    profit: -15.5,
    status: "FAILED",
    date: "2024-05-20 09:45",
  },
  {
    sn: 3,
    trader: "Smart Bot",
    volume: 2.1,
    commission: 12,
    profit: 120.75,
    status: "PENDING",
    date: "2024-05-20 08:00",
  },
];

const TradeStatus = ({ status }: { status: string }) => {
  let color = "";
  let text = status;

  switch (status) {
    case "SUCCESS":
      color = "bg-green-600";
      break;
    case "FAILED":
      color = "bg-red-600";
      break;
    case "PENDING":
      color = "bg-yellow-600";
      break;
    default:
      color = "bg-gray-500";
      text = "UNKNOWN";
  }

  return (
    <span
      className={`px-2 py-0.5 text-xs font-semibold rounded-full ${color} text-white whitespace-nowrap`}
    >
      {text}
    </span>
  );
};

// --- Main Dashboard Component ---

export default function CopyTradingDashboard() {
  const initialData = {
    traderName: "Daily FX",
    totalTrades: "4000",
    commission: "50%",
    amount: "9600",
    profitLoss: "80",
  };

  interface Transaction {
    sn: number;
    trader: string;
    volume: number;
    commission: number;
    profit: number;
    status: string;
    date: string;
  }

  const [formData, setFormData] = useState(initialData);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isTrading, setIsTrading] = useState(false);

  const { user } = useUser();

  const [balance, setBalance] = useState(user?.balance.totalBalance || 0.0);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const handleTrade = () => {
    if (isTrading) return;

    if (balance < 1) {
      setError({
        status: true,
        message:
          "Warning! Your account balance is low. Please deposit and try the trade again",
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth", // Optional: makes the scroll smooth
      });

      return;
    }

    setIsTrading(true);
    console.log("Initiating Trade with data:", formData);

    // Simulate a trading process
    setTimeout(() => {
      const newProfit = parseFloat(formData.profitLoss) || 0;
      const newBalance = balance + newProfit;

      // Update state
      setBalance(newBalance);
      setIsTrading(false);

      // Add a new successful transaction
      const newTransaction = {
        sn: transactions.length + 1,
        trader: formData.traderName,
        volume: parseFloat(formData.amount) / 1000, // Mock volume calc
        commission: parseFloat(formData.commission),
        profit: newProfit,
        status: newProfit >= 0 ? "SUCCESS" : "FAILED",
        date: new Date().toISOString().slice(0, 16).replace("T", " "),
      };

      setTransactions((prev) => [newTransaction, ...prev]);
    }, 1500); // 1.5 second trade simulation
  };

  const InputField = ({
    label,
    name,
    value,
    readOnly = false,
  }: {
    label: string;
    name: string;
    value: string;
    readOnly?: boolean;
  }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleInputChange}
        readOnly={readOnly}
        className={`w-full p-2 rounded-lg bg-gray-700 text-gray-100 border ${
          readOnly
            ? "border-gray-600"
            : "border-gray-600 focus:border-indigo-500"
        } focus:ring-1 focus:ring-indigo-500 transition-colors duration-200`}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8 font-sans">
      {error.status && (
        <div className="bg-red-500/30 flex gap-2 p-3 text-red-700 font-semibold my-5">
          <IoCheckmarkDone size={25} />
          <span className="text-red-700 font-semibold">{error.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT PANEL: TRADER PROFILE & ACTION CARD */}
        <div className="lg:col-span-1 bg-gray-800 p-6 rounded-xl shadow-2xl h-fit">
          {/* Balance Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-gray-100">Balance</h2>
            <div className="flex items-center text-xl font-bold text-green-400">
              <WalletIcon className="w-6 h-6 mr-2 text-green-500" />$
              {balance.toFixed(2)}
            </div>
          </div>

          {/* Input Fields */}
          <form>
            <InputField
              label="Trader Name"
              name="traderName"
              value={formData.traderName}
            />
            <InputField
              label="Total Trades"
              name="totalTrades"
              value={formData.totalTrades}
              readOnly
            />
            <InputField
              label="Commission"
              name="commission"
              value={formData.commission}
              readOnly
            />
            <InputField
              label="Amount($)"
              name="amount"
              value={formData.amount}
            />
            <InputField
              label="Profit/Loss($)"
              name="profitLoss"
              value={formData.profitLoss}
            />
          </form>

          {/* Trade Button */}
          <button
            onClick={handleTrade}
            disabled={isTrading}
            className={`w-full py-3 mt-6 font-bold rounded-lg transition duration-300 transform ${
              isTrading
                ? "bg-green-700 cursor-not-allowed opacity-70"
                : "bg-green-600 hover:bg-green-500 shadow-lg shadow-green-600/30 active:scale-[0.98] hover:shadow-green-500/40"
            }`}
          >
            {isTrading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Copying Trade...
              </span>
            ) : (
              "Trade"
            )}
          </button>
        </div>

        {/* RIGHT PANEL: TRANSACTION HISTORY TABLE */}
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-2xl">
          <h2 className="font-semibold mb-6 pb-2 border-b border-gray-700">
            Copy Trading Transactions
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                  <th className="py-3 px-4">S/N</th>
                  <th className="py-3 px-4">Trader Name</th>
                  <th className="py-3 px-4">Volume</th>
                  <th className="py-3 px-4">Commission %</th>
                  <th className="py-3 px-4">Profit/Loss</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {transactions.map((tx) => (
                  <tr
                    key={tx.sn}
                    className={`text-sm ${
                      tx.profit < 0
                        ? "bg-red-900/10"
                        : tx.profit > 0
                        ? "bg-green-900/10"
                        : "hover:bg-gray-700/50"
                    } transition-colors duration-200`}
                  >
                    <td className="py-3 px-4 font-mono text-gray-400">
                      {tx.sn}
                    </td>
                    <td className="py-3 px-4 font-medium text-indigo-400">
                      {tx.trader}
                    </td>
                    <td className="py-3 px-4 text-gray-200 font-mono">
                      {tx.volume.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-gray-200">
                      {tx.commission}%
                    </td>
                    <td
                      className={`py-3 px-4 font-bold ${
                        tx.profit >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {tx.profit >= 0 ? "+" : ""}${tx.profit.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <TradeStatus status={tx.status} />
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-xs whitespace-nowrap">
                      {tx.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {transactions.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No transactions recorded yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
