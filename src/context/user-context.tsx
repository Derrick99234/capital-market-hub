"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
export interface UserPlan {
  name: string;
  tier: "TRIAL" | "BRONZE" | "SILVER" | "GOLD";
  amount: number;
  status: string;
  upgradedAt?: string | Date;
}

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  country?: string;
  currency: string;
  dailyTradeLeft: number;
  balance: {
    totalBalance: number;
    BTC: number;
    depositBalance: number;
    referralBalance: number;
  };
  plan?: UserPlan;
  createdAt: string;
  updatedAt: string;
} | null;

type UserContextType = {
  user: User;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setUser: (user: User) => void;
  refreshUser: () => Promise<void>;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const checkReset = async () => {
    try {
      const res = await fetch("/api/trades/check-reset");
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data.dailyTradeLeft === "number") {
          setUser((prev) =>
            prev ? { ...prev, dailyTradeLeft: data.dailyTradeLeft } : prev
          );
        }
      }
    } catch (e) {
      console.error("Check reset error:", e);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await res.json();
      if (data?.user) {
        setUser(data.user);
        await checkReset();
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = () => {
    setUser(null);
    fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <UserContext.Provider
      value={{ user, loading, setUser, refreshUser: fetchUser, logout, setLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return context;
};
