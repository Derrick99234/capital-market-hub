import Aside from "@/components/aside";
import TickerLive from "@/components/live-price";
import PackageCard from "@/components/package-card";
import React from "react";

function Packages() {
  return (
    <>
      <Aside />
      <main className="flex flex-col md:flex-row min-h-screen md:ml-[20%] bg-black p-8">
        <div className="w-full space-y-6 min-h-screen text-white">
          <TickerLive />
          <div className="flex flex-wrap gap-5 gap-x-8 justify-center md:justify-start">
            <PackageCard id="1" leverage="1:500" price="1,000" spreads="3.3" />
            <PackageCard id="2" leverage="1:700" price="5,000" spreads="3.3" />
            <PackageCard
              id="3"
              leverage="1:1000"
              price="10,000"
              spreads="3.3"
            />
            <PackageCard
              id="4"
              leverage="1:3000"
              price="100,000"
              spreads="3.3"
            />
            <PackageCard
              id="5"
              leverage="1:5000"
              price="1,000,000"
              spreads="3.3"
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default Packages;
