import Image from "next/image";
import Link from "next/link";
import React from "react";
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
} from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";
import { MdStackedLineChart } from "react-icons/md";

function Aside() {
  return (
    <aside className="w-1/5 h-screen bg-black text-white p-4 fixed overflow-y-auto">
      <Image
        src="/images/CapitalMarketHub.png"
        alt="login"
        width={400}
        className="sticky top-0 p-2 mb-4 mx-auto bg-gray-800 w-full"
        height={100}
        priority
      />
      <div>
        <h3 className="font-semibold text-blue-600">Capital Market Hub</h3>
        <ul className="pl-4 clear-start text-lg">
          <li>
            <Link href="/dashboard" className="flex items-center gap-2 my-4">
              <GrHomeOption /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/trade-options"
              className="flex items-center gap-2 my-4"
            >
              <MdStackedLineChart />
              Trade Options
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/copy-trading"
              className="flex items-center gap-2 my-4"
            >
              <IoPeopleSharp />
              Copy Trading
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/my-wallet"
              className="flex items-center gap-2 my-4"
            >
              <BsWallet2 />
              My Wallet
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/copy-trading"
              className="flex items-center gap-2 my-4"
            >
              <GrTransaction />
              Transactions
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/buy-crypto"
              className="flex items-center gap-2 my-4"
            >
              <IoCartOutline />
              Buy crypto
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/packages"
              className="flex items-center gap-2 my-4"
            >
              <FiPackage />
              Packages
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/trading-tools"
              className="flex items-center gap-2 my-4"
            >
              <IoSettingsOutline />
              Trading tools
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-blue-600">Support Features</h3>
        <ul className="pl-4 clear-start text-lg">
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
              <LuMessageCircleMore />
              Live Chat
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-blue-600">Account Profile</h3>
        <ul className="pl-4 clear-start text-lg">
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
              <IoIosLogOut />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Aside;
