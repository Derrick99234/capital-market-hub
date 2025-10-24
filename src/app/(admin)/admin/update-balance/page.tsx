// app/admin/update-balance/page.tsx
"use client";
import React, { useEffect, useState } from "react";

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  balance?: number;
};

export default function UpdateBalancePage() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<User | null>(null);
  const [amount, setAmount] = useState("");
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
    setAmount(u.balance?.toString() || "");
  };

  const submit = async () => {
    if (!selected) return;
    setSaving(true);
    const res = await fetch("/api/user/update-balance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: selected._id, amount: Number(amount) }),
    });
    const data = await res.json();
    if (!res.ok) alert(data.error || "Update failed");
    else {
      alert("Balance updated");
      setUsers(
        (prev) =>
          prev?.map((u) =>
            u._id === selected._id ? { ...u, balance: Number(amount) } : u
          ) || null
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

  return (
    <div className="p-6">
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
                <div className="font-mono">${(u.balance || 0).toFixed(2)}</div>
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
          <div className="bg-white p-6 rounded w-[420px]">
            <h2 className="text-lg font-semibold mb-3">
              Update Balance for {selected.firstName} {selected.lastName}
            </h2>
            <div className="mb-3">
              <label className="block text-sm mb-1">Amount (USD)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelected(null)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={submit}
                className="px-3 py-1 bg-green-600 text-white rounded cursor-pointer"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
