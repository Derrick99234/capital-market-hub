"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsWallet2 } from "react-icons/bs";
import { GrHomeOption, GrTransaction } from "react-icons/gr";
import { IoIosLogOut } from "react-icons/io";
import {
  IoPeopleSharp,
  IoMenu,
  IoClose,
} from "react-icons/io5";
import { MdStackedLineChart } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

function AdminSidebar() {
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
          src="/images/logo.png"
          alt="Capital Market Hub"
          width={400}
          height={100}
          priority
          className="sticky top-0 p-2 mb-4 mx-auto bg-gray-800 w-full"
        />

        {/* Admin Menu */}
        <div>
          <h3 className="font-semibold text-gray-600">Admin Panel</h3>
          <ul className="pl-2">
            <li>
              <Link href="/admin" className="flex items-center gap-2 my-4">
                <GrHomeOption /> Dashboard
              </Link>
            </li>

            <li>
              <Link href="/admin" className="flex items-center gap-2 my-4">
                <IoPeopleSharp /> Users Management
              </Link>
            </li>

            <li>
              <Link href="/admin/trades" className="flex items-center gap-2 my-4">
                <MdStackedLineChart /> Trades Management
              </Link>
            </li>

            <li>
              <Link href="/admin/payments" className="flex items-center gap-2 my-4">
                <RiMoneyDollarCircleLine /> Payments Management
              </Link>
            </li>

            <li>
              <Link href="/admin/withdrawals" className="flex items-center gap-2 my-4">
                <BsWallet2 /> Withdrawals Management
              </Link>
            </li>

            <li>
              <Link
                href="/admin/update-balance"
                className="flex items-center gap-2 my-4"
              >
                <GrTransaction /> Update User Balance
              </Link>
            </li>
          </ul>
        </div>

        {/* Admin Account */}
        <div>
          <h3 className="font-semibold text-blue-600">Admin Account</h3>
          <ul className="pl-2 text-lg">
            <li>
              <Link
                href="/admin/logout"
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

export default AdminSidebar;
