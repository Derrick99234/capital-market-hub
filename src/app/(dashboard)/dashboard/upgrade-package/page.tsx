import Aside from "@/components/aside";
import TickerLive from "@/components/live-price";
import Link from "next/link";
import React from "react";

function UpgradePackage() {
  return (
    <>
      <Aside />
      <main className="flex flex-col md:flex-row min-h-screen md:ml-[20%] bg-black p-8">
        <div className="w-full space-y-6 min-h-screen text-white">
          <h2 className="text-2xl font-semibold">Withdrawal</h2>
          <hr />
          <p>Upgrade Account</p>
          <form className="py-6 px-4 border border-gray-400 max-w-2xl rounded">
            <p className="mb-4">
              Use This Form Below To inititate Your Upgrade.
            </p>
            <label htmlFor="package-plan" className="text-gray-400">
              Package Plan
            </label>
            <select
              name=""
              id=""
              className="w-full my-3 py-2.5 outline-none px-4 bg-gray-600"
            >
              <option value="account-tier-1">Account Tier 1</option>
              <option value="account-tier-2">Account Tier 2</option>
              <option value="account-tier-3">Account Tier 3</option>
              <option value="account-tier-4">Account Tier 4</option>
              <option value="account-tier-5">Account Tier 5</option>
              <option value="account-tier-6">Account Tier 6</option>
            </select>
            <label htmlFor="package-plan" className="text-gray-400">
              Add Comment
            </label>
            <input
              type="text"
              className="h-16 border border-gray-400 w-full px-4 py-2 rounded mt-2 outline-none"
            />
            <Link
              href={"/dashboard/account-funding"}
              className="bg-lime-400 px-4 py-2 rounded cursor-pointer mt-5 inline-block"
            >
              Submit
            </Link>
          </form>
        </div>
        ;
      </main>
    </>
  );
}

export default UpgradePackage;
