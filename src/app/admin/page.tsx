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

  useEffect(() => {
    fetch("/api/user")
      .then((r) => r.json())
      .then((d) => {
        setUsers(d.users || []);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

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
