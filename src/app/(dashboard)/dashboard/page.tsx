"use client";
import Aside from "@/components/aside";
import TickerLive from "@/components/live-price";
import DataTable from "@/components/Table";
import { useUser } from "@/context/user-context";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoCheckmarkDone } from "react-icons/io5";

function Dashboard() {
  const [selectedAmountLevel, setSelectedAmountLevel] = useState(100);
  const [amount, setAmount] = useState("");
  const { user, loading } = useUser();
  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const noTradesLeft = (user?.dailyTradeLeft ?? 0) <= 0;
  const [assetClass, setAssetClass] = useState("");
  const [assetTicker, setAssetTicker] = useState("");

  const [duration, setDuration] = useState("5 min");
  // const [tradeType, setTradeType] = useState<"BUY" | "SELL" | "">("");

  const assetTickers: Record<string, string[]> = {
    Forex: [
      "EUR/USD",
      "GBP/USD",
      "USD/JPY",
      "AUD/USD",
      "USD/CAD",
      "USD/CNY",
      "USD/CHF",
      "EUR/GBP",
      "USD/HKD",
      "USD/KRW",
      "NZD/USD",
    ],
    Crypto: [
      "BTC/USDT",
      "SOL/USDT",
      "ETH/USDT",
      "LTC/USDT",
      "XRP/USDT",
      "BTC/BUSD",
      "MATIC/USDT",
      "ADA/USDT",
      "FIL/USDT",
      "ATOM/USDT",
      "BCH/BTC",
      "NEO/USDT",
      "WAVES/USDT",
      "XRP/BTC",
      "ENJ/USDT",
      "BNB/USDT",
      "BNB/BTC",
      "XLM/BTC",
      "ETH/BCH",
      "ETH/DOGE",
      "ETH/ADA",
      "AAVE/BTC",
      "APE/BTC",
    ],
    Stocks: ["S&P500", "SPY", "AAPL"],
  };

  const [trades, setTrades] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchTrades = async () => {
      try {
        const res = await fetch(`/api/trades/user?userId=${user._id}`);
        const data = await res.json();
        setTrades(
          Array.isArray(data)
            ? data.map((w: any, i: number) => ({
              id: i + 1,
              type: w.type,
              "asset-class": w.assetClass,
              "asset-ticker": w.assetTicker,
              "trade-amount": `$${w.tradeAmount.toFixed(2)}`,
              durations: w.duration,
              "profit-loss": `$${w.profitLoss.toFixed(2)}`,
              status: w.status,
            }))
            : [],
        );
      } catch (err) {
        console.error("Failed to fetch trades");
      }
    };

    fetchTrades();
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (!user) redirect("/login");

  const handleSubmitTrade = async (type: "BUY" | "SELL") => {
    // setTradeType(type);

    // Basic validation
    if (!assetClass || !assetTicker) {
      setError({
        status: true,
        message: "Please select asset class and ticker",
      });
      return;
    }

    if (user.balance?.totalBalance < 1) {
      setError({
        status: true,
        message:
          "Warning! Your account balance is low. Please deposit and try again",
      });
      return;
    }

    // ✅ Calculate trade amount HERE
    // const tradeAmount = (selectedAmountLevel / 100) * user.balance.totalBalance;

    // ✅ Payload matching your DB table
    const tradePayload = {
      type, // BUY or SELL
      assetClass,
      userId: user._id,
      assetTicker,
      tradeAmount: amount,
      duration,
      profitLoss: 0, // default (calculated later)
      status: "PENDING", // default
    };

    // Send to backend
    try {
      const res = await fetch("/api/trades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tradePayload),
      });

      if (!res.ok) {
        throw new Error("Trade submission failed");
      }

      // Success handling
      setError({
        status: true,
        message: "Trade submitted successfully, Please refresh the page.",
      });
    } catch (err) {
      setError({
        status: true,
        message: "Something went wrong. Please try again",
      });
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
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
              <p className="text-base sm:text-lg font-bold">
                ${user.balance?.totalBalance.toFixed(2)}
              </p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg text-center">
              <h2 className="text-xs sm:text-sm text-gray-400">BTC Balance</h2>
              <p className="text-base sm:text-lg font-bold">
                ${user.balance?.BTC.toFixed(8)}
              </p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg text-center">
              <h2 className="text-xs sm:text-sm text-gray-400">
                Deposited Amount
              </h2>
              <p className="text-base sm:text-lg font-bold">
                ${user.balance?.depositBalance.toFixed(2)}
              </p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg text-center">
              <h2 className="text-xs sm:text-sm text-gray-400">
                Referral Bonus
              </h2>
              <p className="text-base sm:text-lg font-bold">
                ${user.balance?.referralBalance.toFixed(2)}
              </p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg text-center">
              <h2 className="text-xs sm:text-sm text-gray-400">
                Daily Trades Left
              </h2>
              <p className="text-base sm:text-lg font-bold">
                {user?.dailyTradeLeft}
              </p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg text-center">
              <h2 className="text-xs sm:text-sm text-gray-400">
                Account Class
              </h2>
              <p className="text-base sm:text-lg font-bold">$250 Trial Plan</p>
            </div>
          </div>

          {error.status && (
            <div className="bg-slate-300/30 flex gap-2 p-3 text-white font-semibold">
              <IoCheckmarkDone size={25} />
              <span className="text-white font-semibold">{error.message}</span>
            </div>
          )}

          {/* Trading Section */}
          <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-4">
            {/* Chart Placeholder */}
            <div className="bg-gray-900 rounded-lg">
              <div className="h-80 sm:h-120 lg:h-168 bg-gray-800 rounded-lg">
                <iframe
                  src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_advanced&symbol=OANDA:USDCAD&interval=1&theme=dark&style=1&toolbarbg=f1f3f6&studies=MACD%40tv-basicstudies%2CBollingerBands%40tv-basicstudies%2CMoneyFlowIndex%40tv-basicstudies&hide_side_toolbar=false&withdateranges=true&allow_symbol_change=true&hotlist=true&calendar=1&news=1&details=1&hideideas=false&show_popup_button=true&popup_width=1000&popup_height=650&locale=en&utm_source=www.example.com&utm_medium=widget_new&utm_campaign=chart&utm_term=OANDA%3AUSDCAD"
                  className="h-full w-full rounded"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Trade Form */}
            <div className="bg-gray-900 p-2 sm:p-4 rounded-lg space-y-4 text-white">
              <h2 className="text-lg font-semibold">
                Balance -{" "}
                <span className="text-green-500">
                  ${user.balance?.totalBalance.toFixed(2)}
                </span>
              </h2>

              {/* Asset Class */}
              <div className="space-y-4">
                {/* Asset Class */}
                <div>
                  <label className="block text-sm mb-1">Asset Class</label>
                  <select
                    className="w-full p-2 bg-gray-800 rounded"
                    value={assetClass}
                    onChange={(e) => {
                      setAssetClass(e.target.value);
                      setAssetTicker(""); // reset ticker when class changes
                    }}
                  >
                    <option value="">Select Asset Class</option>
                    <option value="Forex">Forex</option>
                    <option value="Crypto">Crypto</option>
                    <option value="Stocks">Stocks</option>
                  </select>
                </div>

                {/* Asset Ticker */}
                <div>
                  <label className="block text-sm mb-1">Asset Ticker</label>
                  <select
                    className="w-full p-2 bg-gray-800 rounded"
                    value={assetTicker}
                    onChange={(e) => setAssetTicker(e.target.value)}
                    disabled={!assetClass}
                  >
                    <option value="">Select Asset Ticker</option>
                    {assetClass &&
                      assetTickers[assetClass]?.map((ticker) => (
                        <option key={ticker} value={ticker}>
                          {ticker}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm mb-1">Amount</label>
                <input
                  type="number"
                  placeholder="Enter Amount in USD"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setSelectedAmountLevel(0);
                  }}
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
                      className={`px-3 sm:px-4 py-2 rounded font-bold ${selectedAmountLevel === lvl
                          ? "bg-green-400 text-black"
                          : "bg-gray-700 hover:bg-gray-600"
                        }`}
                      onClick={() => {
                        setSelectedAmountLevel(lvl);
                        const tradeAmount =
                          (lvl / 100) * user.balance?.totalBalance;
                        setAmount(tradeAmount.toFixed(2));
                      }}
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
                <select
                  className="w-full p-2 bg-gray-800 rounded"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option value="5 min">5 min</option>
                  <option value="15 min">15 min</option>
                  <option value="1 hr">1 hr</option>
                  <option value="2 hr">2 hr</option>
                  <option value="3 hr">3 hr</option>
                  <option value="4 hr">4 hr</option>
                  <option value="5 hr">5 hr</option>
                  <option value="1 day">1 day</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  disabled={noTradesLeft}
                  className={`flex-1 px-4 py-2 rounded font-bold cursor-pointer
    ${noTradesLeft
                      ? "bg-gray-600 cursor-not-allowed opacity-60"
                      : "bg-green-600 hover:bg-green-700"
                    }`}
                  onClick={() => handleSubmitTrade("BUY")}
                >
                  BUY
                </button>

                <button
                  type="button"
                  disabled={noTradesLeft}
                  className={`flex-1 px-4 py-2 rounded font-bold cursor-pointer
    ${noTradesLeft
                      ? "bg-gray-600 cursor-not-allowed opacity-60"
                      : "bg-red-600 hover:bg-red-700"
                    }`}
                  onClick={() => handleSubmitTrade("SELL")}
                >
                  SELL
                </button>
              </div>
              {noTradesLeft && (
                <p className="text-sm text-red-400 font-semibold">
                  Daily trade limit reached. Try again tomorrow.
                </p>
              )}
            </div>
          </div>
          <DataTable
            data={trades}
            columns={[
              { key: "id", label: "S/N" },
              { key: "type", label: "Type" },
              { key: "asset-class", label: "Asset Class" },
              { key: "asset-ticker", label: "Asset Ticker" },
              { key: "trade-amount", label: "Trade Amount" },
              { key: "durations", label: "Duration" },
              { key: "profit-loss", label: "Profit/Loss" },
              { key: "status", label: "Status" },
            ]}
          />
        </div>
      </main>
    </>
  );
}

export default Dashboard;
