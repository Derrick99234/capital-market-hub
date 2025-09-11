import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiHome } from "react-icons/fi";

function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex bg-white max-w-3xl w-full shadow-lg rounded-lg">
        <div className="w-2/5 bg-gray-900">
          <Image
            src="/images/CapitalMarketHub.png"
            alt="login"
            width={400}
            height={400}
            priority
          />
          <div className="flex flex-col gap-4 px-8">
            <button className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer flex items-center gap-2 justify-center">
              <FiHome /> Back to home page
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
              Register
            </button>
          </div>
        </div>
        <div className="w-3/5 p-8 px-10 text-center">
          <h1 className="text-2xl font-bold mb-4">Login to your account</h1>
          <p className="text-center">
            Don’t have an account?{" "}
            <Link href="/register" className="text-blue-600">
              Sign Up Free
            </Link>
          </p>
          <form>
            <input
              type="email"
              id="email"
              className="border-b-[3px] border-gray-700 mt-8 p-2 w-full h-16 outline-none"
              placeholder="Email Address"
              required
            />
            <input
              type="password"
              id="password"
              className="border-b-[3px] border-gray-700 mb-8 mt-2 p-2 w-full h-16 outline-none"
              placeholder="Password"
              required
            />
            <div className="flex justify-between my-5">
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
            <button
              type="submit"
              className="bg-red-600 text-white w-full py-2 rounded cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;
