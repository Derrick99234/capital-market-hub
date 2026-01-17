// app/admin/users/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, AlertCircle, Users, TrendingUp, DollarSign, Clock } from "lucide-react";

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
      setUsers(data.users || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[400px] space-y-4">
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
      <div className="p-4 flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="text-gray-400 text-center">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">All Users</h1>
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
                  Balance: ${u.balance.totalBalance.toFixed(2)} {u.currency}
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
                    ${u.balance.totalBalance.toFixed(2)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">Deposits</div>
                  <div className="text-sm sm:text-base font-semibold text-blue-400">
                    ${u.balance.depositBalance.toFixed(2)}
                  </div>
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
