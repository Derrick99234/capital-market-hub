import Aside from "@/components/aside";
import TickerLive from "@/components/live-price";
import DataTable from "@/components/Table";
import Image from "next/image";
import React from "react";

function AccountFunding() {
  const commodities = [
    {
      id: 1,
      name: "Gold",
      image: "/images/btc.png",
      symbol: "GOLD",
      price: 16.464,
    },
    {
      id: 2,
      name: "Silver",
      image: "/images/etc.png",
      symbol: "SILV",
      price: 12.23,
    },
  ];
  const columns = [
    { key: "id", label: "S/N" },
    { key: "name", label: "Commodity Name" },
    {
      key: "image",
      label: "Image",
      render: (item: any) =>
        item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            width={24}
            height={24}
            className="mx-auto"
          />
        ) : (
          "-"
        ),
    },
    { key: "symbol", label: "Symbol" },
    {
      key: "price",
      label: "Price",
      render: (item: any) => `$${item.price}`,
    },
    {
      key: "action",
      label: "Action",
      render: (item: any) => (
        <button
          // onClick={() => alert(`Viewing ${item.name}`)}
          className="bg-lime-400 text-black px-4 py-1 rounded hover:bg-lime-500 transition"
        >
          View
        </button>
      ),
    },
  ];
  return (
    <>
      <Aside />
      <main className="flex min-h-screen max-w-4/5 ml-auto p-8 bg-black">
        <div className="w-full space-y-6 min-h-screen text-white">
          <TickerLive />
          <div className="flex justify-center flex-col items-center space-y-4">
            <button className="bg-lime-400 py-2 px-5">Cancel Txn</button>
            <p className="text-sm font-semibold">
              KINDLY MAKE DEPOSIT TO THE FOLLOWING DETAILS BELOW ONLY
            </p>
            <Image
              src="/images/log.png"
              width={300}
              height={300}
              alt="wallet image"
            />
            <p className="text-sm font-semibold">
              Amount: $67788 ( 67788 Ethereum )
            </p>
            <hr />
            <p className="text-sm font-semibold">
              Wallet Address: 0xEeD06ef23009A270779EdB36106EBDfF11d12903
            </p>
            <hr />
            <DataTable data={commodities} columns={columns} />
          </div>
        </div>
      </main>
    </>
  );
}

export default AccountFunding;
