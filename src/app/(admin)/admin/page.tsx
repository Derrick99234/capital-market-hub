// app/admin/users/page.tsx
"use client";
import React, { useEffect, useState } from "react";

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  country?: string;
  currency?: string;
  balance?: number;
  role?: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    // If you want to persist access for this session only
    const access = sessionStorage.getItem("adminUsersAccess");
    if (access === "granted") {
      setAuthorized(true);
    }
  }, []);

  useEffect(() => {
    if (authorized) {
      fetch("/api/user")
        .then((r) => r.json())
        .then((d) => {
          setUsers(d.users || []);
        })
        .catch((e) => console.error(e))
        .finally(() => setLoading(false));
    }
  }, [authorized]);

  const handlePasswordSubmit = () => {
    const correctPassword = "Tru$ted#Gate2025"; // 🔐 change this to your real admin password
    if (password === correctPassword) {
      setAuthorized(true);
      sessionStorage.setItem("adminUsersAccess", "granted");
    } else {
      alert("Incorrect password");
    }
  };

  if (!authorized) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
        <div className="bg-white p-6 rounded w-[360px] text-center">
          <h2 className="text-lg font-semibold mb-3">Enter Admin Password</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border p-2 rounded mb-4"
          />
          <button
            onClick={handlePasswordSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer w-full"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <div className="space-y-3">
        {users && users.length ? (
          users.map((u) => (
            <div
              key={u._id}
              className="p-4 bg-gray-800 text-white rounded flex justify-between"
            >
              <div>
                <div className="font-semibold">
                  {u.firstName} {u.lastName}{" "}
                  <span className="text-sm text-gray-400">({u.role})</span>
                </div>
                <div className="text-sm text-gray-300">
                  {u.email} • {u.phoneNumber || "—"} • {u.country || "—"}
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono">${(u.balance || 0).toFixed(2)}</div>
                <div className="text-sm text-gray-400">
                  {u.currency || "USD"}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No users yet.</p>
        )}
      </div>
    </div>
  );
}
