"use client";
import Aside from "@/components/aside";
import TickerLive from "@/components/live-price";
import DataTable from "@/components/Table";
import Image from "next/image";
import React, { useState } from "react";

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

  const address = [
    {
      wallet: "bc1qw2ysdld5l0l82mu6euzlekhvlv5qhw9j6r85fm",
      name: "btc",
      image: "/images/btc-acct.jpg",
    },
    {
      wallet: "0x4477CD5bDB3165CB3BfE44aE6F1d1a40eCD9cCC8",
      name: "usdt-eth",
      image: "/images/usdt_eth-acct.jpg",
    },
    {
      wallet: "TXKo3hggzadyNq4vhpMbq4DfmCFQPMKMo8",
      name: "usdt-trc",
      image: "/images/usdt_trc-acct.jpg",
    },
    {
      wallet: "0x4477CD5bDB3165CB3BfE44aE6F1d1a40eCD9cCC8",
      name: "eth",
      image: "/images/eth-acct.jpg",
    },
  ];

  const [selectedAddress, setSelectedAddress] = useState("btc");

  const currentAddress = address.find((item) => item.name === selectedAddress);
  return (
    <>
      <Aside />
      <main className="flex flex-col md:flex-row min-h-screen md:ml-[20%] bg-black p-8">
        <div className="w-full space-y-6 min-h-screen text-white">
          <TickerLive />
          <div className="flex justify-center flex-col items-center space-y-4">
            <select
              name="funding-account"
              id=""
              value={selectedAddress}
              className="w-full py-2 px-4 rounded-md bg-black/70 border"
              onChange={(e) => setSelectedAddress(e.target.value)}
            >
              <option value="usdt-eth">USDT (ETH)</option>
              <option value="usdt-trc">USDT (TRC20)</option>
              <option value="eth">ETH</option>
              <option value="btc">BTC</option>
            </select>
            <input
              type="text"
              className="w-full py-2 px-4 border outline-none bg-black/90"
              placeholder="Amount"
            />
            <p className="text-sm font-semibold">
              KINDLY MAKE DEPOSIT TO THE FOLLOWING DETAILS BELOW ONLY
            </p>
            <Image
              src={currentAddress?.image || ""}
              width={300}
              height={300}
              alt="wallet image"
            />
            {/* <p className="text-sm font-semibold">
              Amount: $67788 ( 67788 Ethereum )
            </p> */}
            <hr />
            <p className="text-sm font-semibold">
              Wallet Address: {currentAddress?.wallet}
            </p>
            <button className="bg-lime-400 py-2 px-5 mt-4 cursor-pointer">
              Deposit
            </button>
            <hr />
            <DataTable data={commodities} columns={columns} />
          </div>
        </div>
      </main>
    </>
  );
}

export default AccountFunding;
