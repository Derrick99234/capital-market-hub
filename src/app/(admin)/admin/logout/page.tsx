"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Shield, CheckCircle } from "lucide-react";

export default function AdminLogoutPage() {
  const [step, setStep] = useState<"confirm" | "logging-out" | "logged-out">("confirm");
  const router = useRouter();

  const handleLogout = async () => {
    setStep("logging-out");

    try {
      // Clear sessionStorage
      sessionStorage.removeItem("adminUsersAccess");

      // Call logout API to clear JWT token
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      setStep("logged-out");

      // Redirect after showing success message
      setTimeout(() => {
        router.push("/admin/login");
      }, 2000);
    } catch (error) {
      console.error("Logout error:", error);
      // Even if API call fails, clear local session and redirect
      setStep("logged-out");
      setTimeout(() => {
        router.push("/admin/login");
      }, 2000);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (step === "confirm") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
        <div className="max-w-md w-full">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 shadow-2xl text-center">
            <div className="mx-auto h-16 w-16 bg-red-600 rounded-full flex items-center justify-center mb-6">
              <LogOut className="h-8 w-8 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">Logout Confirmation</h2>
            <p className="text-gray-300 mb-8">
              Are you sure you want to logout from the admin panel? You'll need to sign in again to access administrative functions.
            </p>

            <div className="flex gap-4">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === "logging-out") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
        <div className="max-w-md w-full">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 shadow-2xl text-center">
            <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">Logging Out...</h2>
            <p className="text-gray-300">
              Please wait while we securely log you out of the admin panel.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === "logged-out") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
        <div className="max-w-md w-full">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 shadow-2xl text-center">
            <div className="mx-auto h-16 w-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">Logged Out Successfully</h2>
            <p className="text-gray-300 mb-4">
              You have been securely logged out of the admin panel.
            </p>
            <p className="text-sm text-gray-400">
              Redirecting to login page...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}