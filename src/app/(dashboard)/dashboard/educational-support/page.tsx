"use client";

import Aside from "@/components/aside";
import TickerLive from "@/components/live-price";
import Image from "next/image";
import React from "react";

// --- MOCK DATA ---
// NOTE: In a real application, you would replace the video URLs with actual YouTube embed links.
const VIDEO_DATA = [
  {
    id: 1,
    title: "Two Millionaire Day Traders Share Their Secrets",
    channel: "Two Millionaire Day ...",
    thumbnailUrl: "https://www.youtube.com/embed/ic0IhIan8Js",
    status: "LIVE",
  },
  {
    id: 2,
    title: "How To Make 1000% PROFIT on CRYPTO in 2023????",
    channel: "DC",
    thumbnailUrl: "https://www.youtube.com/embed/A4CChvt8SrA",
    status: "REMOVED",
  },
  {
    id: 3,
    title: "The Crypto Advantage",
    channel: "The Crypto Advanta...",
    thumbnailUrl: "https://www.youtube.com/embed/fMiPGzf3844",
    status: "LIVE",
  },
  {
    id: 4,
    title: "Meet The $300 Billion Man",
    channel: "Meet The $300 Bill...",
    thumbnailUrl: "https://www.youtube.com/embed/dsl5A6AR1KA",
    status: "LIVE",
  },
  {
    id: 5,
    title: "BEWARE OF THESE SCAM PLATFORMS",
    channel: "Crypto Alerts",
    thumbnailUrl: "https://www.youtube.com/embed/TH2mrjBijfM",
    status: "LIVE",
  },
  {
    id: 6,
    title: "The Moon and Crypto Bernard Wong Partnership Annou...",
    channel: "Crypto Bernard",
    thumbnailUrl: "https://www.youtube.com/embed/tp2tFhYZNxI",
    status: "LIVE",
  },
  {
    id: 7,
    title: "Steve Cohen - America's Most Profitable Day Trader",
    channel: "Steve Cohen",
    thumbnailUrl: "https://www.youtube.com/embed/nJdCqaIIPHQ",
    status: "LIVE",
  },
  {
    id: 8,
    title: "Meet the Bitcoin Billionaire $100,000,000 Car Coll...",
    channel: "Crypto Elite",
    thumbnailUrl: "https://www.youtube.com/embed/-N73oLPdqaE",
    status: "LIVE",
  },
  {
    id: 9,
    title: "Asking Millionaire Traders How They Got Rich From...",
    channel: "Trader Talks",
    thumbnailUrl: "https://www.youtube.com/embed/ZuonlS6lpBg",
    status: "LIVE",
  },
  {
    id: 10,
    title: "MILLIONAIRE Explains HOW TO DAY TRADE For A Living..",
    channel: "Day Trade Coach",
    thumbnailUrl: "https://www.youtube.com/embed/6NFDE1yLgYE",
    status: "LIVE",
  },
  {
    id: 11,
    title: "100 Million Pump and Dump Scheme by Stocks Influen...",
    channel: "Stocks Insider",
    thumbnailUrl: "https://www.youtube.com/embed/XuOnBkNkY_U",
    status: "LIVE",
  },
];

// --- Custom Icons ---
// Play button icon (for overlay)
const PlayIcon = ({ className = "w-12 h-12" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.604 3.113A1.125 1.125 0 019 15.113V8.887c0-.987 1.106-1.55 1.924-1.014l5.604 3.113z"
      clipRule="evenodd"
    />
  </svg>
);

// Warning icon (for removed video)
const WarningIcon = ({ className = "w-10 h-10" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M9.401 3.003c1.155-1.126 3.203-1.126 4.358 0L20.599 10c1.155 1.126 1.155 3.072 0 4.197l-7.245 7.02c-1.155 1.126-3.203 1.126-4.358 0L3.401 14.197c-1.155-1.125-1.155-3.071 0-4.197l7.245-7.02zM12 9a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9.75A.75.75 0 0112 9zm0 6a.75.75 0 100 1.5.75.75 0 000-1.5z"
      clipRule="evenodd"
    />
  </svg>
);

// --- Video Card Component ---
const VideoCard = ({ video }: { video: (typeof VIDEO_DATA)[number] }) => {
  const isRemoved = video.status === "REMOVED";

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-indigo-500/50 transition-shadow duration-300">
      <iframe
        height="200"
        src={video.thumbnailUrl}
        title="Two Millionaire Day Traders Share Their Secrets"
        allowFullScreen
      ></iframe>

      {/* Title and Action */}
      <div className="p-4 flex flex-col items-center text-center">
        <h3 className="text-md font-medium text-gray-100 min-h-[40px] flex items-center justify-center">
          {video.title}
        </h3>

        <button
          onClick={() =>
            window.open(isRemoved ? "#" : video.thumbnailUrl, "_blank")
          }
          className={`mt-3 py-2 px-6 text-sm font-bold rounded-lg transition duration-300 transform w-full max-w-[150px] 
                        ${
                          isRemoved
                            ? "bg-gray-600 cursor-not-allowed opacity-50"
                            : "bg-green-600 hover:bg-green-500 shadow-md shadow-green-600/30 active:scale-[0.98] cursor-pointer"
                        }`}
          disabled={isRemoved}
        >
          {isRemoved ? "UNAVAILABLE" : "VIEW"}
        </button>
      </div>
    </div>
  );
};

// --- Main Gallery Component ---
export default function EducationalVideoGallery() {
  return (
    <>
      <Aside />
      <main className="flex flex-col md:flex-row min-h-screen md:ml-[20%] bg-black">
        <div className="w-full space-y-6 p-4 md:p-8 text-white">
          <TickerLive />
          <div className="min-h-screen text-white p-4 sm:p-10 font-sans">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-100 mb-8 tracking-wider">
                Our Educational Videos
              </h1>

              {/* Video Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {VIDEO_DATA.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
