"use client";
import Aside from "@/components/aside";
import TickerLive from "@/components/live-price";
import DataTable from "@/components/Table";
import { useUser } from "@/context/user-context";
import { set } from "mongoose";
import Image from "next/image";
import React, { useState, useEffect } from "react";

// Helper function to fetch pending payments
async function fetchPayments() {
  const response = await fetch("/api/payments");
  if (!response.ok) {
    throw new Error("Failed to fetch payments");
  }
  return await response.json();
}

function AccountFunding() {
  // State for payments and form data
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { user } = useUser();

  // State for selected address and account types
  const [selectedAddress, setSelectedAddress] = useState("btc");

  const [amount, setAmount] = useState(0);
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

  // Find current wallet address based on selection
  const currentAddress = address.find((item) => item.name === selectedAddress);

  // Helper function to add a new payment
  async function addPayment(amount: number) {
    const response = await fetch("/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        userId: user?._id,
        method: selectedAddress,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add payment");
    }
    return await response.json();
  }
  // Fetch payments on component mount
  useEffect(() => {
    const loadPayments = async () => {
      try {
        const data = await fetchPayments();

        // Assuming data.payments is an array of payment objects
        setPayments(
          Array.isArray(data.payments)
            ? data.payments.map((payment: any, idx: number) => ({
                id: idx + 1,
                time: payment.createdAt,
                status: payment.status,
                userId: payment.userId,
                method: payment.method,
                amount: payment.amount,
              }))
            : []
        );
        setLoading(false);
      } catch (err) {
        console.error("Failed to load payments:", err);
        setLoading(false);
      }
    };

    loadPayments();
  }, []);

  // Handle submitting the new payment form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addPayment(amount);
      const data = await fetchPayments();
      setPayments(
        Array.isArray(data.payments)
          ? data.payments.map((payment: any, idx: number) => ({
              id: idx + 1,
              time: payment.createdAt,
              status: payment.status,
              userId: payment.userId,
              method: payment.method,
              amount: payment.amount,
            }))
          : []
      );
      setAmount(0);
      setSelectedAddress("btc");
    } catch (err) {
      console.error("Error adding payment:", err);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Aside />
      <main className="flex flex-col md:flex-row min-h-screen md:ml-[20%] bg-black p-8">
        <div className="w-full space-y-6 min-h-screen text-white">
          <TickerLive />
          <div className="flex justify-center flex-col items-center space-y-4">
            {/* Wallet Address Selector */}
            <select
              name="funding-account"
              value={selectedAddress}
              className="w-full py-2 px-4 rounded-md bg-black/70 border"
              onChange={(e) => setSelectedAddress(e.target.value)}
            >
              <option value="usdt-eth">USDT (ETH)</option>
              <option value="usdt-trc">USDT (TRC20)</option>
              <option value="eth">ETH</option>
              <option value="btc">BTC</option>
            </select>

            {/* Amount Input */}
            <input
              type="text"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full py-2 px-4 border outline-none bg-black/90"
              placeholder="Amount"
            />

            {/* Deposit Instructions */}
            <p className="text-sm font-semibold">
              KINDLY MAKE DEPOSIT TO THE FOLLOWING DETAILS BELOW ONLY
            </p>
            <Image
              src={currentAddress?.image || ""}
              width={300}
              height={300}
              alt="wallet image"
            />
            <hr />
            <p className="text-sm font-semibold">
              Wallet Address: {currentAddress?.wallet}
            </p>

            {/* Deposit Button */}
            <button
              onClick={handleSubmit}
              className="bg-lime-400 py-2 px-5 mt-4 cursor-pointer"
            >
              Deposit
            </button>

            <hr />
            {/* Payments Data Table */}
            <DataTable
              data={payments}
              columns={[
                { key: "id", label: "S/N" },
                { key: "time", label: "Time" },
                { key: "method", label: "Method" },
                { key: "amount", label: "Amount" },
                { key: "status", label: "Status" },
              ]}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default AccountFunding;
