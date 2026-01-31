// app/admin/users/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, Trash2 } from "lucide-react";

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  country?: string;
  currency: string;
  balance: {
    totalBalance: number;
    BTC: number;
    depositBalance: number;
    referralBalance: number;
  };
  dailyTradeLeft: number;
  createdAt: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [resettingTrades, setResettingTrades] = useState<string | null>(null);
  const [tradeLimitInputs, setTradeLimitInputs] = useState<
    Record<string, string>
  >({});
  const [deletingUser, setDeletingUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    try {
      // Check if user is authenticated and is admin
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        if (data.user?.role === "admin") {
          // Also check sessionStorage for additional admin access
          const adminAccess = sessionStorage.getItem("adminUsersAccess");
          if (adminAccess === "granted") {
            setAuthorized(true);
            return;
          }
        }
      }

      // Not authenticated or not admin, redirect to login
      router.push("/admin/login");
    } catch (error) {
      console.error("Auth check error:", error);
      router.push("/admin/login");
    } finally {
      setCheckingAuth(false);
    }
  };

  useEffect(() => {
    if (authorized) {
      fetchUsers();
    }
  }, [authorized]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/user");
      const data = await res.json();
      const nextUsers: User[] = data.users || [];
      setUsers(nextUsers);
      setTradeLimitInputs((prev) => {
        const next: Record<string, string> = { ...prev };
        for (const u of nextUsers) {
          if (next[u._id] === undefined) {
            next[u._id] = String(u.dailyTradeLeft ?? 0);
          }
        }
        return next;
      });
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const setUserTradesLeft = async (userId: string, userEmail: string) => {
    try {
      const rawValue = tradeLimitInputs[userId] ?? "";
      const dailyTradeLeft = Number(rawValue);
      if (!Number.isFinite(dailyTradeLeft) || dailyTradeLeft < 0) {
        alert("Please enter a valid non-negative number for daily trades left");
        return;
      }

      setResettingTrades(userId);

      const res = await fetch(`/api/admin/users/${userId}/reset-trades`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dailyTradeLeft }),
      });

      if (res.ok) {
        await res.json();
        alert(`Successfully set daily trades left for ${userEmail} to ${dailyTradeLeft}`);
        fetchUsers();
      } else {
        const error = await res.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Failed to set user trades left:", error);
      alert("Failed to set user trades left");
    } finally {
      setResettingTrades(null);
    }
  };

  const deleteUser = async (userId: string, userEmail: string) => {
    if (!confirm(`Are you sure you want to delete user ${userEmail}? This action cannot be undone and will delete all their data including trades and withdrawals.`)) {
      return;
    }

    try {
      setDeletingUser(userId);

      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const result = await res.json();
        alert(`Successfully deleted user ${userEmail}`);
        // Refresh users list
        fetchUsers();
      } else {
        const error = await res.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Failed to delete user");
    } finally {
      setDeletingUser(null);
    }
  };

  if (checkingAuth) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-100 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="text-gray-400 text-center">Verifying admin access...</p>
      </div>
    );
  }

  if (!authorized) {
    return null; // Will redirect in checkAdminAuth
  }

  if (loading) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-100 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="text-gray-400 text-center">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-[500px]:mt-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
          All Users
        </h1>
        <span className="text-sm text-gray-400">
          Total Users: {users?.length || 0}
        </span>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {users && users.length ? (
          users.map((u) => (
            <div
              key={u._id}
              className="p-3 sm:p-4 bg-gray-800 text-white rounded-lg shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4"
            >
              <div className="flex-1">
                <div className="font-semibold text-sm sm:text-base">
                  {u.firstName} {u.lastName}
                </div>
                <div className="text-xs sm:text-sm text-gray-300 mt-1">
                  {u.email}
                </div>
                <div className="text-xs sm:text-sm text-gray-200 mt-1">
                  Balance: ${u.balance?.totalBalance.toFixed(2)} {u.currency}
                </div>
                <div className="text-xs sm:text-sm text-gray-200 mt-1">
                  Daily Trades Left: {u.dailyTradeLeft}
                </div>
                {u.phoneNumber && (
                  <div className="text-xs text-gray-400 mt-1">
                    Phone: {u.phoneNumber}
                  </div>
                )}
                {u.country && (
                  <div className="text-xs text-gray-400 mt-1">
                    Country: {u.country}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <div className="text-right">
                  <div className="text-xs text-gray-400">Total Balance</div>
                  <div className="text-sm sm:text-base font-semibold text-green-400">
                    ${u.balance?.totalBalance.toFixed(2)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">Deposits</div>
                  <div className="text-sm sm:text-base font-semibold text-blue-400">
                    ${u.balance?.depositBalance.toFixed(2)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="999"
                    value={tradeLimitInputs[u._id] ?? ""}
                    onChange={(e) =>
                      setTradeLimitInputs((prev) => ({
                        ...prev,
                        [u._id]: e.target.value,
                      }))
                    }
                    className="w-20 px-2 py-1 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none text-xs"
                  />
                  <button
                    onClick={() => setUserTradesLeft(u._id, u.email)}
                    disabled={resettingTrades === u._id}
                    className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white text-xs rounded transition-colors"
                  >
                    {resettingTrades === u._id ? (
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                    ) : (
                      <RefreshCw className="h-3 w-3" />
                    )}
                    Update
                  </button>
                </div>
                <button
                  onClick={() => deleteUser(u._id, u.email)}
                  disabled={deletingUser === u._id}
                  className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white text-xs rounded transition-colors"
                >
                  {deletingUser === u._id ? (
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                  ) : (
                    <Trash2 className="h-3 w-3" />
                  )}
                  Delete
                </button>
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
