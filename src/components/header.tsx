"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Header() {
  const router = useRouter();

  return (
    <div className="flex justify-around fixed top-0 left-0 right-0 bg-white w-full h-20 border">
      <Image
        src="/images/CapitalMarketHub.png"
        alt="logo"
        width={120}
        height={150}
        priority
      />
      <nav className="flex gap-8 items-center">
        <ul className="flex gap-8 items-center">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="#about">About</Link>
          </li>
          <li>
            <Link href="#features">Features</Link>
          </li>
          <li>
            <Link href="#investment">Investment Plan</Link>
          </li>
          <li>
            <Link href="#faq">FAQ</Link>
          </li>
          <li>
            <Link href="#contact">Contact Us</Link>
          </li>
        </ul>
        <div className="flex gap-4">
          <button
            className="bg-red-600 text-white px-8 py-2 rounded-md cursor-pointer"
            onClick={() => router.push("/login")}
          >
            LOGIN
          </button>
          <button className="bg-red-600 text-white px-8 py-2 rounded-lg cursor-pointer">
            REGISTER
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Header;
