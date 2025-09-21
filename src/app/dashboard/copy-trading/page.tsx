import Aside from "@/components/aside";
import CopyTradingCard from "@/components/copy-trading";
import TickerLive from "@/components/live-price";
import React from "react";

function CopyTrading() {
  return (
    <>
      <Aside />
      <main className="flex flex-col md:flex-row min-h-screen md:ml-[20%] bg-black p-8 text-white">
        <h2 className="text-2xl font-semibold mb-4">Copy Trader</h2>
        <TickerLive />
        <div className="w-full gap-8 text-white flex flex-wrap mt-4">
          <CopyTradingCard />
          <CopyTradingCard />
          <CopyTradingCard />
          <CopyTradingCard />
        </div>
      </main>
    </>
  );
}

export default CopyTrading;
