"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type TickerItem = {
  id: string;
  name: string;
  symbol: string;
  price: string;
  change: string;
  image?: string;
};

const DEFAULT_COINS: TickerItem[] = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC", price: "89,420.00", change: "+2.45%" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH", price: "2,680.50", change: "+1.82%" },
  { id: "solana", name: "Solana", symbol: "SOL", price: "185.30", change: "+4.15%" },
  { id: "binancecoin", name: "BNB", symbol: "BNB", price: "612.40", change: "+0.95%" },
  { id: "ripple", name: "XRP", symbol: "XRP", price: "2.18", change: "+3.60%" },
  { id: "cardano", name: "Cardano", symbol: "ADA", price: "0.78", change: "+1.20%" },
  { id: "dogecoin", name: "Dogecoin", symbol: "DOGE", price: "0.24", change: "-0.85%" },
  { id: "avalanche-2", name: "Avalanche", symbol: "AVAX", price: "32.50", change: "+2.10%" },
  { id: "chainlink", name: "Chainlink", symbol: "LINK", price: "18.25", change: "+1.55%" },
  { id: "polkadot", name: "Polkadot", symbol: "DOT", price: "7.40", change: "+0.65%" },
];

const TickerLive: React.FC = () => {
  const [items, setItems] = useState<TickerItem[]>(DEFAULT_COINS);

  const fetchTopCoins = async () => {
    try {
      const resp = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h",
        { cache: "no-store" }
      );
      if (!resp.ok) return;

      const data = await resp.json();
      if (Array.isArray(data) && data.length > 0) {
        const newItems: TickerItem[] = data.map((coin: any) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol?.toUpperCase() || "",
          price: typeof coin.current_price === "number" ? coin.current_price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00",
          change:
            typeof coin.price_change_percentage_24h === "number"
              ? (coin.price_change_percentage_24h > 0 ? "+" : "") +
                coin.price_change_percentage_24h.toFixed(2) +
                "%"
              : "0.00%",
          image: coin.image,
        }));
        setItems(newItems);
      }
    } catch {
      // Quietly ignore network failures or rate limits, fallback default coins are already displayed
    }
  };

  useEffect(() => {
    fetchTopCoins();
    const interval = setInterval(fetchTopCoins, 60 * 1000); // refresh every 1 min
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-full bg-[#111] text-white overflow-hidden border-b border-gray-700">
      <motion.div
        className="flex gap-8 whitespace-nowrap py-2"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: items.length * 1.5,
          ease: "linear",
        }}
      >
        {[...items, ...items].map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex items-center gap-2 min-w-max"
          >
            {item.image ? (
              <Image
                src={item.image}
                alt={item.symbol}
                width={20}
                height={20}
                className="w-5 h-5 rounded-full object-cover"
              />
            ) : null}
            <span className="font-semibold">{item.name}</span>
            <span className="text-gray-400">[{item.symbol}]</span>
            <span className="font-bold ml-2">${item.price}</span>
            <span
              className={`ml-2 text-sm ${
                item.change.startsWith("-") ? "text-red-400" : "text-green-400"
              }`}
            >
              {item.change}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TickerLive;
