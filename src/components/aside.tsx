"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsWallet2 } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { CiVideoOn } from "react-icons/ci";
import { FiPackage } from "react-icons/fi";
import { GrHomeOption, GrTransaction } from "react-icons/gr";
import { IoIosLogOut } from "react-icons/io";
import {
  IoCartOutline,
  IoPeopleSharp,
  IoSettingsOutline,
  IoChevronDown,
  IoChevronForward,
  IoMenu,
  IoClose,
} from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";
import { MdStackedLineChart } from "react-icons/md";

function Aside() {
  const [openTradeOptions, setOpenTradeOptions] = useState(false);
  const [openTransactions, setOpenTransactions] = useState(false);
  const [openPackages, setOpenPackages] = useState(false);
  const [openTradingTools, setOpenTradingTools] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // sidebar toggle

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-black text-white p-2 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen bg-black text-white p-4 overflow-y-auto transform transition-transform duration-300 z-40 
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-1/5 w-4/5`}
      >
        {/* Logo */}
        <Image
          src="/images/CapitalMarketHub.png"
          alt="Capital Market Hub"
          width={400}
          height={100}
          priority
          className="sticky top-0 p-2 mb-4 mx-auto bg-gray-800 w-full"
        />

        {/* Main Menu */}
        <div>
          <h3 className="font-semibold text-blue-600">Capital Market Hub</h3>
          <ul className="pl-2 text-lg">
            <li>
              <Link href="/dashboard" className="flex items-center gap-2 my-4">
                <GrHomeOption /> Dashboard
              </Link>
            </li>

            {/* Trade Options with Submenu */}
            <li>
              <button
                onClick={() => setOpenTradeOptions(!openTradeOptions)}
                className="flex items-center justify-between w-full my-4"
              >
                <span className="flex items-center gap-2">
                  <MdStackedLineChart /> Trade Options
                </span>
                {openTradeOptions ? <IoChevronDown /> : <IoChevronForward />}
              </button>
              {openTradeOptions && (
                <ul className="ml-8 mt-2 space-y-2 text-base text-gray-300">
                  <li>
                    <Link href="/dashboard">- Trading Dashboard</Link>
                  </li>
                  <li>
                    <Link href="/dashboard/stocks">
                      - Stock Trading Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/commodities">
                      - Commodity Trading Dashboard
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link
                href="/dashboard/copy-trading"
                className="flex items-center gap-2 my-4"
              >
                <IoPeopleSharp /> Copy Trading
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-2 my-4">
                <BsWallet2 /> My Wallet
              </Link>
            </li>

            {/* Transactions with Submenu */}
            <li>
              <button
                onClick={() => setOpenTransactions(!openTransactions)}
                className="flex items-center justify-between w-full my-4"
              >
                <span className="flex items-center gap-2">
                  <GrTransaction /> Transactions
                </span>
                {openTransactions ? <IoChevronDown /> : <IoChevronForward />}
              </button>
              {openTransactions && (
                <ul className="ml-8 mt-2 space-y-2 text-base text-gray-300">
                  <li>
                    <Link href="/dashboard/account-funding">
                      - Account Funding
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/withdraw-my-funds">
                      - Withdraw My Fund
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/withdrawal-history">
                      - Withdrawal History
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link
                href="/dashboard/buy-crypto"
                className="flex items-center gap-2 my-4"
              >
                <IoCartOutline /> Buy crypto
              </Link>
            </li>

            {/* Packages with Submenu */}
            <li>
              <button
                onClick={() => setOpenPackages(!openPackages)}
                className="flex items-center justify-between w-full my-4"
              >
                <span className="flex items-center gap-2">
                  <FiPackage /> Packages
                </span>
                {openPackages ? <IoChevronDown /> : <IoChevronForward />}
              </button>
              {openPackages && (
                <ul className="ml-8 mt-2 space-y-2 text-base text-gray-300">
                  <li>
                    <Link href="/dashboard/packages">- Package</Link>
                  </li>
                  <li>
                    <Link href="/dashboard/upgrade-package">
                      - Upgrade Package
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Trading Tools with Submenu */}
            <li>
              <button
                onClick={() => setOpenTradingTools(!openTradingTools)}
                className="flex items-center justify-between w-full my-4"
              >
                <span className="flex items-center gap-2">
                  <IoSettingsOutline /> Trading Tools
                </span>
                {openTradingTools ? <IoChevronDown /> : <IoChevronForward />}
              </button>
              {openTradingTools && (
                <ul className="ml-8 mt-2 space-y-2 text-base text-gray-300">
                  <li>
                    <Link href="/dashboard/copy-trading">- Copy Trading</Link>
                  </li>
                  <li>
                    <Link href="#">- Bot Trading</Link>
                  </li>
                  <li>
                    <Link href="#">- Subscribed Bot</Link>
                  </li>
                  <li>
                    <Link href="#">- Trading Signals</Link>
                  </li>
                  <li>
                    <Link href="#">- Subscribed Signals</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="font-semibold text-blue-600">Support Features</h3>
          <ul className="pl-2 text-lg">
            <li>
              <Link
                href="/dashboard/educational-support"
                className="flex items-center gap-2 my-4"
              >
                <CiVideoOn /> Educational Support
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/live-chat"
                className="flex items-center gap-2 my-4"
              >
                <LuMessageCircleMore /> Live Chat
              </Link>
            </li>
          </ul>
        </div>

        {/* Account Profile */}
        <div>
          <h3 className="font-semibold text-blue-600">Account Profile</h3>
          <ul className="pl-2 text-lg">
            <li>
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-2 my-4"
              >
                <CgProfile /> Account Profile
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/logout"
                className="flex items-center gap-2 my-4"
              >
                <IoIosLogOut /> Logout
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Aside;
