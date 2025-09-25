"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include", // 👈 important to include cookies
        });
      } catch (e) {
        console.error("Logout failed", e);
      }

      // Redirect to login
      router.push("/login");
    };

    doLogout();
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <p className="text-gray-700 text-lg">Logging you out...</p>
    </main>
  );
}
