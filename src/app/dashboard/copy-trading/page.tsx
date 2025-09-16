import Aside from "@/components/aside";
import CopyTradingCard from "@/components/copy-trading";
import React from "react";

function CopyTrading() {
  return (
    <>
      <Aside />
      <main className="flex min-h-screen max-w-4/5 ml-auto p-8 bg-black">
        <div className="w-full gap-8 text-white flex flex-wrap">
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
