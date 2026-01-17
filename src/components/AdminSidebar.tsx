"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsWallet2 } from "react-icons/bs";
import { GrHomeOption, GrTransaction } from "react-icons/gr";
import { IoIosLogOut } from "react-icons/io";
import { IoPeopleSharp, IoMenu, IoClose } from "react-icons/io5";
import { MdStackedLineChart } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false); // sidebar toggle

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-black text-white p-2 rounded-lg shadow-lg border border-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen bg-black text-white p-4 overflow-y-auto transform transition-transform duration-300 z-40 shadow-2xl border-r border-gray-800
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-78 w-4/5`}
      >
        {/* Logo */}
        <div className="sticky top-0 bg-black z-10 pb-4 border-b border-gray-800">
          <Image
            src="/images/logo.png"
            alt="Capital Market Hub"
            width={400}
            height={100}
            priority
            className="p-2 mx-auto w-full max-w-50"
          />
        </div>

        {/* Admin Menu */}
        <div className="pt-4">
          <h3 className="font-semibold text-blue-600 text-sm uppercase tracking-wider mb-4 px-2">
            Admin Panel
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin"
                className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <GrHomeOption className="w-5 h-5" />{" "}
                <span className="text-sm">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                href="/admin/trades"
                className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <MdStackedLineChart className="w-5 h-5" />{" "}
                <span className="text-sm">Trades Management</span>
              </Link>
            </li>

            <li>
              <Link
                href="/admin/payments"
                className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <RiMoneyDollarCircleLine className="w-5 h-5" />{" "}
                <span className="text-sm">Payments Management</span>
              </Link>
            </li>

            <li>
              <Link
                href="/admin/withdrawals"
                className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <BsWallet2 className="w-5 h-5" />{" "}
                <span className="text-sm">Withdrawals Management</span>
              </Link>
            </li>

            <li>
              <Link
                href="/admin/update-balance"
                className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <GrTransaction className="w-5 h-5" />{" "}
                <span className="text-sm">Update User Balance</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Admin Account */}
        <div className="mt-8 pt-4 border-t border-gray-800">
          <h3 className="font-semibold text-blue-600 text-sm uppercase tracking-wider mb-4 px-2">
            Admin Account
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin/logout"
                className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-red-900/20 hover:text-red-400 transition-colors text-red-400"
              >
                <IoIosLogOut className="w-5 h-5" />{" "}
                <span className="text-sm">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
