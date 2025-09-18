import Aside from "@/components/aside";
import ExchangeCard from "@/components/exchange-card";
import TickerLive from "@/components/live-price";

export default function BuyCryptoPage() {
  return (
    <>
      <Aside />
      <main className="flex min-h-screen max-w-4/5 ml-auto p-8 bg-black">
        <div className="w-full space-y-6 min-h-screen text-white">
          <h2 className="text-2xl font-semibold">Withdrawal</h2>
          <TickerLive />
          <div className="p-6">
            <ExchangeCard
              logo="/images/neo.png"
              title="Coinmama"
              features={["Buy crypto instantly"]}
              minPurchase="$10"
              maxDeposit="$1,000"
              rating={5}
              buttonLink="/buy/coinmama"
            />

            <ExchangeCard
              logo="/images/etc.png"
              title="Abra"
              features={["Buy crypto instantly"]}
              minPurchase="$10"
              maxDeposit="$1,000"
              rating={4}
              buttonLink="/buy/abra"
            />

            <ExchangeCard
              logo="/images/btc.png"
              title="Changelly"
              features={["Buy crypto instantly"]}
              minPurchase="$10"
              maxDeposit="$1,000"
              rating={5}
              buttonLink="/buy/changelly"
            />
          </div>
        </div>
      </main>
    </>
  );
}
