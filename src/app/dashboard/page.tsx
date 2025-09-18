import Aside from "@/components/aside";
import TickerLive from "@/components/live-price";
import React from "react";

function Dashboard() {
  return (
    <>
      <Aside />
      <main className="flex min-h-screen max-w-4/5 ml-auto p-8 bg-black">
        <div className="w-full space-y-6 min-h-screen text-white">
          <TickerLive />
          {/* Top Navbar */}
          <div className="flex justify-between items-center bg-gray-900 p-4">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm">Carlos James</span>
              <button className="px-3 py-1 border border-gray-700 rounded-lg hover:bg-gray-800">
                + Add Task
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-gray-900 p-4 rounded-lg text-center">
              <h2 className="text-sm text-gray-400">Total Balance USD</h2>
              <p className="text-lg font-bold">$0.00</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg text-center">
              <h2 className="text-sm text-gray-400">BTC Balance</h2>
              <p className="text-lg font-bold">0.00000000</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg text-center">
              <h2 className="text-sm text-gray-400">Deposited Amount</h2>
              <p className="text-lg font-bold">$0.00</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg text-center">
              <h2 className="text-sm text-gray-400">Referral Bonus</h2>
              <p className="text-lg font-bold">$0.00</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg text-center">
              <h2 className="text-sm text-gray-400">Daily Trades Left</h2>
              <p className="text-lg font-bold">6</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg text-center">
              <h2 className="text-sm text-gray-400">Account Class</h2>
              <p className="text-lg font-bold">$250 Trial Plan</p>
            </div>
          </div>

          {/* Trading Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart Placeholder */}
            <div className="bg-gray-900 p-4 rounded-lg">
              <h2 className="text-sm text-gray-400 mb-2">USDCAD Chart</h2>
              <div className="h-[35rem] bg-gray-800 rounded-lg">
                <span className="text-gray-500 ">
                  <iframe
                    src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_advanced&symbol=OANDA:USDCAD&interval=1&theme=dark&style=1&toolbarbg=f1f3f6&studies=MACD%40tv-basicstudies%2CBollingerBands%40tv-basicstudies%2CMoneyFlowIndex%40tv-basicstudies&hide_side_toolbar=false&withdateranges=true&allow_symbol_change=true"
                    width="50%"
                    className="h-[35rem] w-full"
                    height="50"
                    allowFullScreen
                  ></iframe>
                </span>
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg space-y-4 text-white">
              <h2 className="text-lg font-semibold">
                Balance - <span className="text-green-500">$100</span>
              </h2>

              {/* Asset Class */}
              <div>
                <label className="block text-sm mb-1">Asset Class</label>
                <select
                  // value={assetClass}
                  // onChange={(e) => setAssetClass(e.target.value)}
                  className="w-full p-2 bg-gray-800 rounded"
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
                  // value={ticker}
                  // onChange={(e) => setTicker(e.target.value)}
                  className="w-full p-2 bg-gray-800 rounded"
                >
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
                  // value={amount}
                  // onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter Amount in USD"
                  className="w-full p-2 bg-gray-800 rounded"
                />
              </div>

              {/* Amount Level */}
              <div>
                <label className="block text-sm mb-2">Amount Level</label>
                <div className="flex gap-2">
                  {[100, 75, 50, 25].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      // onClick={() => {
                      //   setAllocation(lvl);
                      //   setAmount(((balance * lvl) / 100).toFixed(2));
                      // }}
                      className={`px-4 py-2 rounded font-bold ${
                        100 === lvl
                          ? "bg-green-400 text-black"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
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
                    <input
                      type="checkbox"
                      // checked={takeProfit}
                      // onChange={(e) => setTakeProfit(e.target.checked)}
                    />
                    Take Profit
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      // checked={stopLoss}
                      // onChange={(e) => setStopLoss(e.target.checked)}
                    />
                    Stop Loss
                  </label>
                </div>
              </div>

              {/* Time Allocated */}
              <div>
                <label className="block text-sm mb-1">Time Allocated</label>
                <select
                  // value={time}
                  // onChange={(e) => setTime(e.target.value)}
                  className="w-full p-2 bg-gray-800 rounded"
                >
                  <option value="5 min">5 min</option>
                  <option value="15 min">15 min</option>
                  <option value="1 hr">1 hr</option>
                  <option value="1 day">1 day</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  // onClick={() => handleTrade("BUY")}
                  className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-bold"
                >
                  BUY
                </button>
                <button
                  type="button"
                  // onClick={() => handleTrade("SELL")}
                  className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-bold"
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
