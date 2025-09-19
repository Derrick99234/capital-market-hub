"use client";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEyeOff, FiHome } from "react-icons/fi";
import { BsEye } from "react-icons/bs";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    currency: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleOnchange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError("All required fields must be filled");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Invalid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setServerMessage("");

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      // ✅ Success
      setServerMessage("✅ Registration successful! Redirecting...");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        currency: "",
        password: "",
      });

      // Redirect to login after short delay
      setTimeout(() => router.push("/login"), 1500);
    } catch (error) {
      console.error("Error:", error);
      setError("❌ Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

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
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-3/5 p-8 px-10 text-center max-h-[600px] overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4">Sign up for free!</h1>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          {serverMessage && (
            <p className="text-green-600 text-sm mb-4">{serverMessage}</p>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              className="border-b-[3px] border-gray-700 mt-8 mb-2 p-2 w-full h-16 outline-none"
              placeholder="First Name"
              onChange={handleOnchange}
              required
            />
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              className="border-b-[3px] border-gray-700 mb-2 p-2 w-full h-16 outline-none"
              placeholder="Last Name"
              onChange={handleOnchange}
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              className="border-b-[3px] border-gray-700 mb-2 p-2 w-full h-16 outline-none"
              placeholder="Email Address"
              onChange={handleOnchange}
              required
            />
            <input
              type="number"
              name="phone"
              value={form.phone}
              className="border-b-[3px] border-gray-700 mb-2 p-2 w-full h-16 outline-none"
              placeholder="Phone Number"
              onChange={handleOnchange}
              required
            />
            <select
              name="country"
              value={form.country}
              className="border-b-[3px] border-gray-700 mb-2 p-2 w-full h-16 outline-none"
              required
              onChange={handleOnchange}
            >
              <option value="">Choose country</option>
              <option value="USA">USA</option>
              <option value="CANADA">Canada</option>
              <option value="UK">UK</option>
            </select>
            <select
              name="currency"
              value={form.currency}
              className="border-b-[3px] border-gray-700 mb-2 p-2 w-full h-16 outline-none"
              required
              onChange={handleOnchange}
            >
              <option value="">Choose Currency</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>

            {/* Password with toggle */}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                className="border-b-[3px] border-gray-700 mb-8 mt-2 p-2 w-full h-16 outline-none pr-10"
                placeholder="Password"
                required
                onChange={handleOnchange}
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-900"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <BsEye /> : <FiEyeOff />}
              </span>
            </div>

            <div className="flex items-center gap-2 my-5 text-sm">
              <input type="checkbox" id="remember" required />
              <label htmlFor="remember">
                I agree to the{" "}
                <Link href="/terms-conditions" className="text-blue-600">
                  Terms & Conditions
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-red-600 text-white w-full py-2 rounded cursor-pointer disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
