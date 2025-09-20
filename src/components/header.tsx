"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { MdOutlineClose } from "react-icons/md";

function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white w-full border z-50">
      <div className="flex justify-between items-center h-20 px-4 md:px-12">
        {/* Logo */}
        <Image
          src="/images/CapitalMarketHub.png"
          alt="logo"
          width={120}
          height={150}
          priority
        />

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 items-center">
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
              className="bg-red-600 text-white px-6 py-2 rounded-md cursor-pointer"
              onClick={() => router.push("/login")}
            >
              LOGIN
            </button>
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg cursor-pointer">
              REGISTER
            </button>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <MdOutlineClose className="text-2xl" />
          ) : (
            <CiMenuFries className="text-2xl" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div
          className="bg-black/50 fixed top-20 bottom-0 right-0 left-0"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="md:hidden bg-white border-t shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col gap-4 p-4">
              <li>
                <Link href="/" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" onClick={() => setIsOpen(false)}>
                  About
                </Link>
              </li>
              <li>
                <Link href="#features" onClick={() => setIsOpen(false)}>
                  Features
                </Link>
              </li>
              <li>
                <Link href="#investment" onClick={() => setIsOpen(false)}>
                  Investment Plan
                </Link>
              </li>
              <li>
                <Link href="#faq" onClick={() => setIsOpen(false)}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#contact" onClick={() => setIsOpen(false)}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  login
                </Link>
              </li>
              <li>
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  Register
                </Link>
              </li>
            </ul>
            {/* <div className="flex flex-col gap-3 p-4">
            <button
              className="bg-red-600 text-white px-6 py-2 rounded-md cursor-pointer"
              onClick={() => {
                router.push("/login");
                setIsOpen(false);
              }}
            >
              LOGIN
            </button>
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg cursor-pointer">
              REGISTER
            </button>
          </div> */}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
