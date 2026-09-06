"use client";

import Aside from "@/components/aside";
import TickerLive from "@/components/live-price";
import PackageCard from "@/components/package-card";
import { useUser } from "@/context/user-context";
import React from "react";

const UNIFIED_PLANS = [
  {
    id: "BRONZE" as const,
    name: "Bronze Plan",
    minDeposit: "$3,000",
    maxDeposit: "$10,000",
    duration: "3 Weeks",
    leverage: "1:500",
    spreads: "3.3 Pips",
  },
  {
    id: "SILVER" as const,
    name: "Silver Plan",
    minDeposit: "$10,000",
    maxDeposit: "$50,000",
    duration: "4-6 Weeks",
    leverage: "1:1,000",
    spreads: "2.5 Pips",
    isFeatured: true,
  },
  {
    id: "GOLD" as const,
    name: "Gold Plan",
    minDeposit: "$50,000",
    maxDeposit: "Unlimited",
    duration: "9 Weeks",
    leverage: "1:3,000",
    spreads: "1.5 Pips",
  },
];

function Packages() {
  const { user } = useUser();

  return (
    <>
      <Aside />
      <main className="flex flex-col md:flex-row min-h-screen md:ml-[20%] bg-black p-4 sm:p-8">
        <div className="w-full space-y-8 min-h-screen text-white">
          <TickerLive />

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">Investment Plans</h1>
            <p className="text-gray-400 text-sm max-w-xl">
              Choose the plan that suits your investment strategy. Each tier offers unique leverage, spread benefits, and dedicated account support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch pt-2">
            {UNIFIED_PLANS.map((plan) => (
              <PackageCard
                key={plan.id}
                id={plan.id}
                name={plan.name}
                minDeposit={plan.minDeposit}
                maxDeposit={plan.maxDeposit}
                duration={plan.duration}
                leverage={plan.leverage}
                spreads={plan.spreads}
                isFeatured={plan.isFeatured}
                isCurrent={user?.plan?.tier === plan.id}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Packages;
