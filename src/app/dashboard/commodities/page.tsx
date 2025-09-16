import Aside from "@/components/aside";
import DataTable from "@/components/Table";
import Image from "next/image";
import React from "react";

function Commodities() {
  const commodities = [
    {
      id: 1,
      name: "Gold",
      image: "/images/btc.png",
      symbol: "GOLD",
      price: 16.464,
    },
    {
      id: 2,
      name: "Silver",
      image: "/images/etc.png",
      symbol: "SILV",
      price: 12.23,
    },
  ];
  const columns = [
    { key: "id", label: "S/N" },
    { key: "name", label: "Commodity Name" },
    {
      key: "image",
      label: "Image",
      render: (item: any) =>
        item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            width={24}
            height={24}
            className="mx-auto"
          />
        ) : (
          "-"
        ),
    },
    { key: "symbol", label: "Symbol" },
    {
      key: "price",
      label: "Price",
      render: (item: any) => `$${item.price}`,
    },
    {
      key: "action",
      label: "Action",
      render: (item: any) => (
        <button
          // onClick={() => alert(`Viewing ${item.name}`)}
          className="bg-lime-400 text-black px-4 py-1 rounded hover:bg-lime-500 transition"
        >
          View
        </button>
      ),
    },
  ];
  return (
    <>
      <Aside />
      <main className="flex min-h-screen max-w-4/5 ml-auto p-8 bg-black">
        <DataTable data={commodities} columns={columns} />
      </main>
    </>
  );
}

export default Commodities;
