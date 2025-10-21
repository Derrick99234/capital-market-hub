"use client";
import Aside from "@/components/aside";
import CopyTradingDashboard from "@/components/copy-traders";
import CopyTradingCard from "@/components/copy-trading";
import TickerLive from "@/components/live-price";
import Script from "next/script";
import React from "react";

function CopyTrading() {
  return (
    <>
      <Aside />
      <main className="flex flex-col min-h-screen md:ml-[20%] bg-black text-sm p-8 text-white">
        <h2 className="text-2xl font-semibold mb-4">Life Chat</h2>
        <TickerLive />
        <Script id="tawkto" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),
                  s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/68da62a1311aad1952561475/1j6ah2i1m';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </main>
    </>
  );
}

export default CopyTrading;
