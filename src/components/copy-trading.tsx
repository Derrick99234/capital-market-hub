import React from "react";

function CopyTradingCard() {
  return (
    <div className="flex border w-86 rounded-lg flex-col overflow-hidden h-[15rem] pt-10 bg-gray-800 border-gray-400 items-center gap-6">
      <h2 className="text-2xl text-center">Stephanie Link</h2>
      <button className="px-8 py-2 text-xl rounded-lg bg-lime-400">
        Trade
      </button>
      <div className="w-full border-t border-gray-400 flex justify-evenly">
        <div className="border-r p-2 border-gray-400 text-center">
          <h2 className="text-2xl">108K</h2>
          <span className="text-gray-400">Followers</span>
        </div>
        <div className="text-center p-2">
          <h2 className="text-2xl text-green-600">80%</h2>
          <span className="text-gray-400">Rio</span>
        </div>
        <div className="text-center border-l p-2 border-gray-400">
          <h2 className="text-2xl">305</h2>
          <span className="text-gray-400">Total Trades</span>
        </div>
      </div>
    </div>
  );
}

export default CopyTradingCard;
