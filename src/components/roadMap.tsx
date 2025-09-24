"use client";
import { useRef } from "react";

export default function Roadmap({ roadmapData }: { roadmapData: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative text-white py-16 mb-40">
      <div className="max-w-5xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">ROADMAP</h2>
        <p className="text-gray-300 max-w-xl mx-auto">
          ICO Crypto is developing a global data-driven platform for the world.
          Powered by blockchain and smart contracts.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative mt-20 max-w-7xl mx-auto">
        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-hidden px-6 scroll-smooth snap-x"
        >
          {roadmapData.map((item, idx) => (
            <div
              key={idx}
              className="text-center relative min-w-[300px] snap-center"
            >
              {/* Quarter */}
              <p
                className={`font-semibold mb-8 ${
                  idx >= 5 ? "text-gray-200" : "text-pink-500"
                }`}
              >
                {item.quarter}
              </p>

              {/* Dot + Line */}
              <div className="relative">
                <div
                  className={`w-full h-1 ${
                    idx >= 5 ? "bg-gray-200" : "bg-pink-600"
                  }`}
                ></div>
                <div
                  className={`w-5 h-5 rounded-full mx-auto mb-6 border-2 ${
                    idx < 5
                      ? "border-white bg-pink-600"
                      : "border-gray-200 bg-gray-700"
                  } absolute left-1/2 -top-2`}
                ></div>
              </div>

              <div className="px-5">
                {/* Period */}
                <h3 className="text-lg font-bold mt-8">{item.period}</h3>

                {/* Description */}
                <p className="text-gray-300 mt-2 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <div className="flex justify-center mt-16 gap-6">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-600 hover:bg-gray-700 transition"
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-600 hover:bg-gray-700 transition"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
