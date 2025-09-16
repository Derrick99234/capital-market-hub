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

const TickerLive: React.FC = () => {
  const [items, setItems] = useState<TickerItem[]>([]);

  const fetchTopCoins = async () => {
    try {
      const resp = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h"
      );
      const data = await resp.json();

      const newItems: TickerItem[] = data.map((coin: any) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        price: coin.current_price.toFixed(2),
        change: coin.price_change_percentage_24h?.toFixed(2) + "%" || "0%",
        image: coin.image,
      }));

      setItems(newItems);
    } catch (err) {
      console.error("Error fetching top coins:", err);
    }
  };

  useEffect(() => {
    fetchTopCoins();
    const interval = setInterval(fetchTopCoins, 60 * 1000); // refresh every 1 min
    return () => clearInterval(interval);
  }, []);

  if (items.length === 0) {
    return <div className="text-white bg-black p-2">Loading ticker...</div>;
  }

  return (
    <div className="max-w-full bg-[#111] text-white overflow-hidden border-b border-gray-700">
      <motion.div
        className="flex gap-8 whitespace-nowrap py-2"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: items.length * 1,
          ease: "linear",
        }}
      >
        {[...items, ...items].map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex items-center gap-2 min-w-max"
          >
            {item.image && (
              <Image
                src={item.image}
                alt={item.symbol}
                width={20}
                height={20}
                className="w-5 h-5 rounded-full object-cover"
              />
            )}
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
