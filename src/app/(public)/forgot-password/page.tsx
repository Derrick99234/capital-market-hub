"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiHome } from "react-icons/fi";
import Image from "next/image";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to send reset email");
        return;
      }

      setMessage("If that email exists, a reset link has been sent. Please check your inbox.");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-12 md:p-24 bg-gray-500">
      <div className="flex flex-col md:flex-row bg-white max-w-4xl w-full shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-2/5 bg-gray-900 flex flex-col items-center justify-center p-6">
          <Image
            src="/images/logo.png"
            alt="Forgot Password"
            width={250}
            height={250}
            priority
            className="mb-6 w-40 h-auto md:w-60"
          />
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer flex items-center gap-2 justify-center"
              onClick={() => router.push("/")}
            >
              <FiHome /> Back to home page
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Back to Login
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-3/5 p-6 sm:p-8 md:px-10 text-center">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">
            Forgot Your Password?
          </h1>
          <p className="text-center text-sm sm:text-base text-gray-600 mb-6">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 text-left">
            <div className="mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-b-[3px] border-gray-700 p-2 w-full h-14 sm:h-16 outline-none"
                placeholder="Email Address"
                required
              />
            </div>

            {error && (
              <p className="text-red-600 text-center mb-4">{error}</p>
            )}

            {message && (
              <p className="text-green-600 text-center mb-4">{message}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-red-600 text-white w-full py-2 rounded cursor-pointer disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/login" className="text-blue-600 text-sm">
              Remember your password? Back to Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}