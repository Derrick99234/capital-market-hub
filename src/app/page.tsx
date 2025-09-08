import Header from "@/components/header";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-blue-900 h-screen pt-30">
        <section className="flex items-center justify-center h-full gap-4">
          <div className="max-w-2xl">
            <h1 className="text-white text-6xl font-bold">
              Multi-regulated Global Forex and Shares Broker
            </h1>
            <p className="text-white text-lg max-w-2xl mt-8 mb-4">
              Regulated Trading & Investment platform for cryptocurrencies,
              Stocks, CFD that standarizes data & operations with blockchain
              technology. We provide user-friendly, efficient and secure trading
              & investment solutions utilizing blockchain technology.
            </p>
            <button className="bg-red-600 text-white px-12 py-4 rounded-lg">
              Get Started
            </button>
          </div>{" "}
          <div className="max-w-2xl">
            <Image
              src="/images/hero-image.png"
              alt="Hero Image"
              width={800}
              height={400}
              priority
            />
          </div>
        </section>
      </main>
    </>
  );
}
