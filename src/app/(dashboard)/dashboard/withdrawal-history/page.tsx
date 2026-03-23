"use client";
import Aside from "@/components/aside";
import TickerLive from "@/components/live-price";
import DataTable from "@/components/Table";
import React, { useState } from "react";

function WithdrawalHistory() {
  const [withdrawals, setWithdrawals] = useState<any[]>([]);

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
            address: w.address,
            amount: w.amount,
            status: w.status,
          }))
        : []
    );
  }

  React.useEffect(() => {
    fetchWithdrawals();
  }, []);
  return (
    <>
      <Aside />
      <main className="flex flex-col md:flex-row min-h-screen md:ml-[20%] bg-black p-8">
        <div className="w-full space-y-6 min-h-screen text-white">
          <h2 className="text-2xl font-semibold">Withdrawal History</h2>
          <TickerLive />

          <DataTable
            data={withdrawals}
            columns={[
              { key: "id", label: "S/N" },
              { key: "time", label: "Time" },
              { key: "method", label: "Method" },
              { key: "address", label: "Address" },
              { key: "amount", label: "Amount" },
              { key: "status", label: "Status" },
            ]}
          />
        </div>
      </main>
    </>
  );
}

export default WithdrawalHistory;
