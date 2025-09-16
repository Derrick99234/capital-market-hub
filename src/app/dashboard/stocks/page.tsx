import Aside from "@/components/aside";
import TickerLive from "@/components/live-price";
import Image from "next/image";
import React from "react";

function Stocks() {
  return (
    <>
      <Aside />
      <main className="flex min-h-screen max-w-4/5 ml-auto p-8 bg-black">
        <div className="text-white w-full">
          <h2 className="text-3xl font-semibold">Stocks</h2>
          <TickerLive />
          <p>You can buy or sell any stocks of your choice here.</p>
          <div className="flex gap-4 flex-wrap mt-8 w-full">
            <div className="border border-gray-500 w-[17rem] p-8 flex flex-col items-center gap-2 bg-gray-900">
              <Image
                src="/images/neo.png"
                alt="stocks"
                width={80}
                height={40}
                className="rounded"
              />
              <h2 className="font-bold text-3xl">Apple</h2>
            </div>
            <div className="border border-gray-500 w-[17rem] p-8 flex flex-col items-center gap-2 bg-gray-900">
              <Image
                src="/images/neo.png"
                alt="stocks"
                width={80}
                height={40}
                className="rounded"
              />
              <h2 className="font-bold text-3xl">MicroSoft</h2>
            </div>
            <div className="border border-gray-500 w-[17rem] p-8 flex flex-col items-center gap-2 bg-gray-900">
              <Image
                src="/images/neo.png"
                alt="stocks"
                width={80}
                height={40}
                className="rounded"
              />
              <h2 className="font-bold text-3xl">Alibab</h2>
            </div>
            <div className="border border-gray-500 w-[17rem] p-8 flex flex-col items-center gap-2 bg-gray-900">
              <Image
                src="/images/neo.png"
                alt="stocks"
                width={80}
                height={40}
                className="rounded"
              />
              <h2 className="font-bold text-3xl">Google</h2>
            </div>
            <div className="border border-gray-500 w-[17rem] p-8 flex flex-col items-center gap-2 bg-gray-900">
              <Image
                src="/images/neo.png"
                alt="stocks"
                width={80}
                height={40}
                className="rounded"
              />
              <h2 className="font-bold text-3xl">Amazon</h2>
            </div>
            <div className="border border-gray-500 w-[17rem] p-8 flex flex-col items-center gap-2 bg-gray-900">
              <Image
                src="/images/neo.png"
                alt="stocks"
                width={80}
                height={40}
                className="rounded"
              />
              <h2 className="font-bold text-3xl">Tesla</h2>
            </div>
            <div className="border border-gray-500 w-[17rem] p-8 flex flex-col items-center gap-2 bg-gray-900">
              <Image
                src="/images/neo.png"
                alt="stocks"
                width={80}
                height={40}
                className="rounded"
              />
              <h2 className="font-bold text-3xl">NetApp</h2>
            </div>
            <div className="border border-gray-500 w-[17rem] p-8 flex flex-col items-center gap-2 bg-gray-900">
              <Image
                src="/images/neo.png"
                alt="stocks"
                width={80}
                height={40}
                className="rounded"
              />
              <h2 className="font-bold text-3xl">AppFolio</h2>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Stocks;
