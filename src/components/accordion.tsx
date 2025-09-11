"use client";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface AccordionItem {
  question: string;
  answer: string;
}

export default function Accordion({
  accordionList,
}: {
  accordionList: AccordionItem[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {accordionList.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex justify-between items-center px-5 py-4 text-left text-lg font-medium text-gray-800 hover:bg-blue-50 transition"
          >
            <span>{item.question}</span>
            <FaChevronDown
              className={`transform transition-transform duration-300 ${
                activeIndex === index ? "rotate-180 text-blue-600" : ""
              }`}
            />
          </button>
          <div
            className={`px-5 pb-4 text-gray-600 text-base text-left leading-relaxed transition-all duration-300 ease-in-out ${
              activeIndex === index
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            {item.answer}
          </div>
        </div>
      ))}
    </div>
  );
}
