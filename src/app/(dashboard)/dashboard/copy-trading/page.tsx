"use client";
import Aside from "@/components/aside";
import CopyTradingDashboard from "@/components/copy-traders";
import CopyTradingCard from "@/components/copy-trading";
import TickerLive from "@/components/live-price";
import React from "react";

function CopyTrading() {
  const [showCopyTraders, setShowCopyTraders] = React.useState(false);

  return (
    <>
      <Aside />
      <main className="flex flex-col min-h-screen md:ml-[20%] bg-black text-sm p-8 text-white">
        <h2 className="text-2xl font-semibold mb-4">Copy Trader</h2>
        <TickerLive />
        {showCopyTraders ? (
          <CopyTradingDashboard />
        ) : (
          <div className="w-full gap-8 text-white flex flex-wrap mt-4">
            <CopyTradingCard onClick={() => setShowCopyTraders(true)} />
            <CopyTradingCard onClick={() => setShowCopyTraders(true)} />
            <CopyTradingCard onClick={() => setShowCopyTraders(true)} />
            <CopyTradingCard onClick={() => setShowCopyTraders(true)} />
            <CopyTradingCard onClick={() => setShowCopyTraders(true)} />
            <CopyTradingCard onClick={() => setShowCopyTraders(true)} />
          </div>
        )}
      </main>
    </>
  );
}

export default CopyTrading;
