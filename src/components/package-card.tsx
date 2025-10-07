import Link from "next/link";
import React from "react";

function PackageCard({
  spreads,
  leverage,
  price,
  id,
}: {
  spreads: string;
  leverage: string;
  id: string;
  price: string;
}) {
  return (
    <div className="w-72 border border-gray-700 rounded">
      <div className="bg-gray-900 p-4 text-center">
        <h2 className="text-2xl text-gray-400">Basic Plan ({id})</h2>
        <p className="text-lg font-bold">${price}</p>
      </div>
      <ul className=" p-4 space-y-5 my-5">
        <li className="flex justify-between">
          <span>Spreads</span> <span>{spreads} Pips</span>
        </li>
        <li className="flex justify-between">
          <span>Leverage</span> <span>{leverage}</span>
        </li>
        <li className="flex justify-between">
          <span>Live Chat Support</span> <span>Yes</span>
        </li>
        <li className="flex justify-between">
          <span>All Available Platforms</span> <span>Yes</span>
        </li>
      </ul>
      <div className="p-4 border-t border-gray-700">
        <Link
          href={"/dashboard/account-funding"}
          className="w-full bg-lime-400 font-medium uppercase py-4 block text-center"
        >
          Upgrade
        </Link>
      </div>
    </div>
  );
}

export default PackageCard;
