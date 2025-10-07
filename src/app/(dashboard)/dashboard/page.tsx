"use client";
import Aside from "@/components/aside";
import TickerLive from "@/components/live-price";
import { useUser } from "@/context/user-context";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { IoCheckmarkDone } from "react-icons/io5";

function Dashboard() {
  const [selectedAmountLevel, setSelectedAmountLevel] = useState(100);
  const { user, loading } = useUser();
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  if (loading) return <p>Loading...</p>;
  if (!user) redirect("/login");

  const handleClick = async () => {
    if (user.balance < 1) {
      setError({
        status: true,
        message:
          "Warning! Your account balance is low. Please deposit and try the trade again",
      });
    } else {
      setError({
        status: true,
        message: "Warning! Something went wrong please try again",
      });
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: makes the scroll smooth
    });
  };

  return (
    <>
      <Aside />
      <main className="flex flex-col md:flex-row min-h-screen md:ml-[20%] bg-black">
        <div className="w-full space-y-6 p-4 md:p-8 text-white">
          <TickerLive />

          {/* Top Navbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-900 p-4 gap-3 rounded-lg">
            <h1 className="text-lg sm:text-xl font-semibold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm">
                {user.firstName + " " + user.lastName}
              </span>
              <button className="px-3 py-1 border border-gray-700 rounded-lg hover:bg-gray-800 text-sm sm:text-base">
                + Add Task
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-gray-900 p-4 rounded-lg text-center">
              <h2 className="text-xs sm:text-sm text-gray-400">
                Total Balance USD
              </h2>
              <p className="text-base sm:text-lg font-bold">$0.00</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg text-center">
              <h2 className="text-xs sm:text-sm text-gray-400">BTC Balance</h2>
              <p className="text-base sm:text-lg font-bold">0.00000000</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg text-center">
              <h2 className="text-xs sm:text-sm text-gray-400">
                Deposited Amount
              </h2>
              <p className="text-base sm:text-lg font-bold">$0.00</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg text-center">
              <h2 className="text-xs sm:text-sm text-gray-400">
                Referral Bonus
              </h2>
              <p className="text-base sm:text-lg font-bold">$0.00</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg text-center">
              <h2 className="text-xs sm:text-sm text-gray-400">
                Daily Trades Left
              </h2>
              <p className="text-base sm:text-lg font-bold">6</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg text-center">
              <h2 className="text-xs sm:text-sm text-gray-400">
                Account Class
              </h2>
              <p className="text-base sm:text-lg font-bold">$250 Trial Plan</p>
            </div>
          </div>

          {error.status && (
            <div className="bg-red-500/30 flex gap-2 p-3 text-red-700 font-semibold">
              <IoCheckmarkDone size={25} />
              <span className="text-red-700 font-semibold">
                {error.message}
              </span>
            </div>
          )}

          {/* Trading Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart Placeholder */}
            <div className="bg-gray-900 p-4 rounded-lg">
              <h2 className="text-sm text-gray-400 mb-2">USDCAD Chart</h2>
              <div className="h-[20rem] sm:h-[30rem] lg:h-[35rem] bg-gray-800 rounded-lg">
                <iframe
                  src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_advanced&symbol=OANDA:USDCAD&interval=1&theme=dark&style=1&toolbarbg=f1f3f6&studies=MACD%40tv-basicstudies%2CBollingerBands%40tv-basicstudies%2CMoneyFlowIndex%40tv-basicstudies&hide_side_toolbar=false&withdateranges=true&allow_symbol_change=true"
                  className="h-full w-full rounded"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Trade Form */}
            <div className="bg-gray-900 p-4 sm:p-6 rounded-lg space-y-4 text-white">
              <h2 className="text-lg font-semibold">
                Balance -{" "}
                <span className="text-green-500">
                  ${user.balance.toFixed(2)}
                </span>
              </h2>

              {/* Asset Class */}
              <div>
                <label className="block text-sm mb-1">Asset Class</label>
                <select className="w-full p-2 bg-gray-800 rounded">
                  <option value="">Select Asset Class</option>
                  <option value="Forex">Forex</option>
                  <option value="Crypto">Crypto</option>
                  <option value="Stocks">Stocks</option>
                </select>
              </div>

              {/* Asset Ticker */}
              <div>
                <label className="block text-sm mb-1">Asset Ticker</label>
                <select className="w-full p-2 bg-gray-800 rounded">
                  <option value="">Select Asset Ticker</option>
                  <option value="USDCAD">USDCAD</option>
                  <option value="BTCUSD">BTCUSD</option>
                  <option value="AAPL">AAPL</option>
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm mb-1">Amount</label>
                <input
                  type="number"
                  placeholder="Enter Amount in USD"
                  className="w-full p-2 bg-gray-800 rounded"
                />
              </div>

              {/* Amount Level */}
              <div>
                <label className="block text-sm mb-2">Amount Level</label>
                <div className="flex flex-wrap gap-2">
                  {[100, 75, 50, 25].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      className={`px-3 sm:px-4 py-2 rounded font-bold ${
                        selectedAmountLevel === lvl
                          ? "bg-green-400 text-black"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                      onClick={() => setSelectedAmountLevel(lvl)}
                    >
                      {lvl}%
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Trade Assistant */}
              <div>
                <label className="block text-sm mb-2">AI Trade Assistant</label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" /> Take Profit
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" /> Stop Loss
                  </label>
                </div>
              </div>

              {/* Time Allocated */}
              <div>
                <label className="block text-sm mb-1">Time Allocated</label>
                <select className="w-full p-2 bg-gray-800 rounded">
                  <option value="5 min">5 min</option>
                  <option value="15 min">15 min</option>
                  <option value="1 hr">1 hr</option>
                  <option value="1 day">1 day</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-bold cursor-pointer"
                  onClick={handleClick}
                >
                  BUY
                </button>
                <button
                  type="button"
                  className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-bold cursor-pointer"
                  onClick={handleClick}
                >
                  SELL
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
