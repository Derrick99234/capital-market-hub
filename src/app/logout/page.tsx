"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    // Clear tokens from storage
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    // Redirect to login page
    router.push("/login");
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <p className="text-gray-700 text-lg">Logging you out...</p>
    </main>
  );
}
