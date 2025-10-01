import Aside from "@/components/aside";
import TickerLive from "@/components/live-price";
import DataTable from "@/components/Table";
import Image from "next/image";
import React from "react";

function WithdrawMyFunds() {
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
      <main className="flex flex-col md:flex-row min-h-screen md:ml-[20%] bg-black p-8">
        <div className="w-full space-y-6 min-h-screen text-white">
          <h2 className="text-2xl font-semibold">Withdrawal</h2>
          <TickerLive />
          <div className="flex justify-center flex-col space-y-4">
            <p className="text-sm font-semibold">
              Select our convenient methods of making withdrawal from your
              account
            </p>
            <div className="flex justify-center mt-5">
              <form className="border max-w-xl py-2 border-gray-400 flex justify-center flex-col w-full">
                <select name="" id="" className="bg-gray-400 w-full py-2">
                  <option value="bitcoin">Bitcoin</option>
                  <option value="bitcoin">Ethereum</option>
                  <option value="bitcoin">USDT</option>
                  <option value="bitcoin">Bitcoin Cash</option>
                  <option value="bitcoin">Bank</option>
                </select>
                <input
                  type="text"
                  className="border w-full my-4 border-gray-400 py-2 px-4 rounded"
                  placeholder="Enter Amount"
                />
                <input
                  type="text"
                  className="border w-full my-4 border-gray-400 py-2 px-4 rounded"
                  placeholder="Wallet Address/Email"
                />
                <button className="bg-lime-400 px-4 py-2 rounded cursor-pointer">
                  Withdraw
                </button>
              </form>
            </div>
            <DataTable data={commodities} columns={columns} />
          </div>
        </div>
      </main>
    </>
  );
}

export default WithdrawMyFunds;
