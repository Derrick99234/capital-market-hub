import React from "react";

interface CopyTradingCardProps {
  name: string;
  followers?: string;
  roi?: string;
  trades?: string | number;
  onClick: () => void;
}

function CopyTradingCard({
  name,
  followers = "108K",
  roi = "80%",
  trades = "305",
  onClick,
}: CopyTradingCardProps) {
  return (
    <div className="flex border w-80 rounded-lg flex-col overflow-hidden h-[15rem] pt-10 bg-gray-800 border-gray-400 items-center gap-6 shadow-md hover:border-lime-400 transition-colors">
      <h2 className="text-2xl text-center font-semibold">{name}</h2>
      <button
        className="px-8 py-2 text-xl rounded-lg bg-lime-400 text-black font-semibold cursor-pointer hover:bg-lime-500 transition-colors"
        onClick={onClick}
      >
        Trade
      </button>
      <div className="w-full border-t border-gray-400 flex justify-evenly">
        <div className="border-r p-2 border-gray-400 text-center flex-1">
          <h2 className="text-2xl">{followers}</h2>
          <span className="text-gray-400 text-xs">Followers</span>
        </div>
        <div className="text-center p-2 flex-1">
          <h2 className="text-2xl text-green-500 font-bold">{roi}</h2>
          <span className="text-gray-400 text-xs">ROI</span>
        </div>
        <div className="text-center border-l p-2 border-gray-400 flex-1">
          <h2 className="text-2xl">{trades}</h2>
          <span className="text-gray-400 text-xs">Total Trades</span>
        </div>
      </div>
    </div>
  );
}

export default CopyTradingCard;
