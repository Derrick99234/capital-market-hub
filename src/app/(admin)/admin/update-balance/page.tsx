// app/admin/update-balance/page.tsx
"use client";
import React, { useEffect, useState } from "react";

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  balance?: {
    totalBalance: number;
    BTC: number;
    depositBalance: number;
    referralBalance: number;
  };
};

export default function UpdateBalancePage() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<User | null>(null);
  const [balances, setBalances] = useState({
    totalBalance: "",
    BTC: "",
    depositBalance: "",
    referralBalance: "",
  });

  const [saving, setSaving] = useState(false);

  // 🔐 password modal states
  const [authorized, setAuthorized] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");

  // Hardcoded password (you can change this)
  const CORRECT_PASSWORD = "Tru$ted#Gate2025";

  useEffect(() => {
    const access = sessionStorage.getItem("adminUsersAccess");
    if (access === "granted") {
      setAuthorized(true);
    }
    if (!authorized) return;
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        const { users } = await res.json();
        setUsers(users);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [authorized]);

  const handlePasswordSubmit = () => {
    if (adminPassword === CORRECT_PASSWORD) {
      setAuthorized(true);
      sessionStorage.setItem("adminUsersAccess", "granted");
      setError("");
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  const openEdit = (u: User) => {
    setSelected(u);
    setBalances({
      totalBalance: String(u.balance?.totalBalance ?? 0),
      BTC: String(u.balance?.BTC ?? 0),
      depositBalance: String(u.balance?.depositBalance ?? 0),
      referralBalance: String(u.balance?.referralBalance ?? 0),
    });
  };

  const submit = async () => {
    if (!selected) return;
    setSaving(true);

    const payload = {
      userId: selected._id,
      balance: {
        totalBalance: Number(balances.totalBalance),
        BTC: Number(balances.BTC),
        depositBalance: Number(balances.depositBalance),
        referralBalance: Number(balances.referralBalance),
      },
    };

    const res = await fetch("/api/user/update-balance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Update failed");
    } else {
      alert("Balance updated");

      setUsers(
        users?.map((u) =>
          u._id === selected._id ? { ...u, balance: payload.balance } : u,
        ) || null,
      );

      setSelected(null);
    }

    setSaving(false);
  };

  if (!authorized) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
        <div className="bg-white p-6 rounded-md w-[350px] shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-center">
            Admin Authentication
          </h2>
          <p className="text-gray-600 mb-4 text-sm text-center">
            Enter your admin password to continue.
          </p>
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full border p-2 rounded mb-3"
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button
            onClick={handlePasswordSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  if (loading) return <p className="p-6">Loading users...</p>;

  function Input({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
  }) {
    return (
      <div>
        <label className="block text-sm mb-1 font-medium">{label}</label>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
    );
  }
  return (
    <div className="p-6 lg:p-8 md:flex-row min-h-screen md:ml-[20%] max-[500px]:mt-12">
      <h1 className="text-2xl font-bold mb-4">Update User Balance</h1>

      <div className="grid gap-3">
        {users && users.length ? (
          users.map((u) => (
            <div
              key={u._id}
              className="p-3 bg-gray-800 text-white rounded flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">
                  {u.firstName} {u.lastName}
                </div>
                <div className="text-sm text-gray-300">{u.email}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="font-mono">
                  ${(u.balance?.totalBalance || 0).toFixed(2)}
                </div>
                <button
                  onClick={() => openEdit(u)}
                  className="px-3 py-1 bg-yellow-500 text-black rounded"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {/* Edit Modal */}
      {selected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-40">
          <div className="bg-white p-6 rounded w-[440px]">
            <h2 className="text-lg font-semibold mb-4">
              Update Balance - {selected.firstName} {selected.lastName}
            </h2>

            <div className="grid gap-3">
              <Input
                label="Total Balance (USD)"
                value={balances.totalBalance}
                onChange={(v) => setBalances({ ...balances, totalBalance: v })}
              />
              <Input
                label="BTC Balance"
                value={balances.BTC}
                onChange={(v) => setBalances({ ...balances, BTC: v })}
              />
              <Input
                label="Deposit Balance"
                value={balances.depositBalance}
                onChange={(v) =>
                  setBalances({ ...balances, depositBalance: v })
                }
              />
              <Input
                label="Referral Balance"
                value={balances.referralBalance}
                onChange={(v) =>
                  setBalances({ ...balances, referralBalance: v })
                }
              />
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setSelected(null)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={submit}
                className="px-3 py-1 bg-green-600 text-white rounded"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
