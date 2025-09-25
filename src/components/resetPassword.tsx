"use client";
export const dynamic = "force-dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { BsEye } from "react-icons/bs";
import { FiEyeOff } from "react-icons/fi";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, email, password }),
    });

    const data = await res.json();
    setMessage(data.message);

    router.push("/login");
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h1 className="text-lg font-bold mb-4">Reset Password</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <input
            type="password"
            placeholder="New password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /> */}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              className="border-b-[3px] border-gray-700 mb-6 sm:mb-8 mt-2 p-2 w-full h-14 sm:h-16 outline-none pr-10"
              placeholder="New Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-900"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <BsEye /> : <FiEyeOff />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer"
          >
            Reset Password
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
      </div>
    </main>
  );
}
