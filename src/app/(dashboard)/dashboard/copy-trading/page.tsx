"use client";
import Aside from "@/components/aside";
import CopyTradingDashboard from "@/components/copy-traders";
import CopyTradingCard from "@/components/copy-trading";
import TickerLive from "@/components/live-price";
import React, { useState } from "react";

const TRADERS = [
  { name: "Alexander Wright", followers: "142K", roi: "84%", trades: "420" },
  { name: "Elena Rostova", followers: "98K", roi: "91%", trades: "312" },
  { name: "Marcus Vance", followers: "175K", roi: "78%", trades: "580" },
  { name: "Sophia Chen", followers: "120K", roi: "88%", trades: "295" },
  { name: "Lucas Silva", followers: "86K", roi: "76%", trades: "240" },
  { name: "Sarah Jenkins", followers: "164K", roi: "82%", trades: "465" },
  { name: "Mateo Rossi", followers: "112K", roi: "85%", trades: "350" },
  { name: "Chloe Dupont", followers: "95K", roi: "89%", trades: "275" },
];

function CopyTrading() {
  const [showCopyTraders, setShowCopyTraders] = useState(false);
  const [selectedTrader, setSelectedTrader] = useState<string | null>(null);

  const handleSelectTrader = (name: string) => {
    setSelectedTrader(name);
    setShowCopyTraders(true);
  };

  return (
    <>
      <Aside />
      <main className="flex flex-col min-h-screen md:ml-[20%] bg-black text-sm p-8 text-white">
        <h2 className="text-2xl font-semibold mb-4">Copy Trading</h2>
        <TickerLive />
        {showCopyTraders ? (
          <CopyTradingDashboard
            traderName={selectedTrader || undefined}
            onBack={() => setShowCopyTraders(false)}
          />
        ) : (
          <div className="w-full gap-8 text-white flex flex-wrap mt-6">
            {TRADERS.map((trader) => (
              <CopyTradingCard
                key={trader.name}
                name={trader.name}
                followers={trader.followers}
                roi={trader.roi}
                trades={trader.trades}
                onClick={() => handleSelectTrader(trader.name)}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default CopyTrading;
