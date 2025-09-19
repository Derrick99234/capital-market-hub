"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsEye } from "react-icons/bs";
import { FiEyeOff, FiHome } from "react-icons/fi";

function Login() {
  const router = useRouter();

  // Form state
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Login failed");
        return;
      }

      router.push("/dashboard"); // cookie is already set
    } catch (error) {
      setServerError("Something went wrong, try again later");
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-500">
      <div className="flex bg-white max-w-3xl w-full shadow-lg rounded-lg">
        {/* Left Section */}
        <div className="w-2/5 bg-gray-900 flex flex-col items-center justify-center">
          <Image
            src="/images/CapitalMarketHub.png"
            alt="login"
            width={300}
            height={300}
            priority
            className="mb-6"
          />
          <div className="flex flex-col gap-4 px-8 w-full">
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer flex items-center gap-2 justify-center"
              onClick={() => router.push("/")}
            >
              <FiHome /> Back to home page
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
              onClick={() => router.push("/register")}
            >
              Register
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-3/5 p-8 px-10 text-center">
          <h1 className="text-2xl font-bold mb-4">Login to your account</h1>
          <p className="text-center">
            Don’t have an account?{" "}
            <Link href="/register" className="text-blue-600">
              Sign Up Free
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="mt-6 text-left">
            <div className="mb-6">
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                className="border-b-[3px] border-gray-700 p-2 w-full h-16 outline-none"
                placeholder="Email Address"
                required
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              {/* <input
                type="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                className="border-b-[3px] border-gray-700 p-2 w-full h-16 outline-none"
                placeholder="Password"
                required
              /> */}
              {/* Password with toggle */}
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={form.password}
                  className="border-b-[3px] border-gray-700 mb-8 mt-2 p-2 w-full h-16 outline-none pr-10"
                  placeholder="Password"
                  required
                  onChange={handleChange}
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-900"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <BsEye /> : <FiEyeOff />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex justify-between my-5 text-sm">
              <div>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember" className="ml-2">
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password" className="text-blue-600">
                Forgot Password?
              </Link>
            </div>

            {serverError && (
              <p className="text-red-600 text-center mb-4">{serverError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-red-600 text-white w-full py-2 rounded cursor-pointer disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;
