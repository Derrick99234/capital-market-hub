"use client";
import Aside from "@/components/aside";
import TickerLive from "@/components/live-price";
import DataTable from "@/components/Table";
import { useUser } from "@/context/user-context";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { IoCheckmarkDone } from "react-icons/io5";

function WithdrawMyFunds() {
  const { user, loading } = useUser();
  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [method, setMethod] = useState("bitcoin");
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState("");

  async function fetchWithdrawals() {
    const res = await fetch("/api/withdrawal");
    const data = await res.json();

    setWithdrawals(
      Array.isArray(data.withdrawals)
        ? data.withdrawals.map((w: any, i: number) => ({
            id: i + 1,
            time: new Date(w.createdAt).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            }),
            method: w.method,
            amount: w.amount,
            status: w.status,
          }))
        : []
    );
  }

  React.useEffect(() => {
    fetchWithdrawals();
  }, []);

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();

    if (amount > (user?.balance?.totalBalance ?? 0)) {
      setError({
        status: true,
        message: "Insufficient balance",
      });
      return;
    }

    await fetch("/api/withdrawal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user?._id,
        amount,
        method,
      }),
    });

    await fetchWithdrawals();

    setAmount(0);
    setAddress("");
  };

  if (loading) return <p>Loading...</p>;
  if (!user) redirect("/login");

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
            {error.status && (
              <div className="bg-red-500/30 flex gap-2 p-3 text-red-700 font-semibold">
                <IoCheckmarkDone size={25} />
                <span className="text-red-700 font-semibold">
                  {error.message}
                </span>
              </div>
            )}
            <div className="flex justify-center mt-5">
              <form className="border max-w-xl border-gray-400 flex justify-center flex-col w-full p-6">
                <select
                  name=""
                  required
                  id=""
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="bg-black/10 w-full border outline-none border-gray-400 py-2 px-4 rounded"
                >
                  <option value="bitcoin" className="bg-black">
                    Bitcoin
                  </option>
                  <option value="ethereum" className="bg-black">
                    Ethereum
                  </option>
                  <option value="usdt" className="bg-black">
                    USDT
                  </option>
                  <option value="bitcoin-cash" className="bg-black">
                    Bitcoin Cash
                  </option>
                </select>
                <input
                  type="number"
                  required
                  className="border w-full my-4 border-gray-400 py-2 px-4 rounded"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
                <input
                  required
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border w-full my-4 border-gray-400 py-2 px-4 rounded"
                  placeholder="Wallet Address/Email"
                />
                <button
                  onClick={(e) => handleClick(e)}
                  className="bg-lime-400 px-4 py-2 rounded cursor-pointer"
                >
                  Withdraw
                </button>
              </form>
            </div>
            <DataTable
              data={withdrawals}
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

export default WithdrawMyFunds;
