"use client";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import AnimatedContent from "./AnimatedContent";

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
        <AnimatedContent
          key={index}
          distance={100}
          direction="vertical"
          reverse={false}
          duration={1}
          ease="power3.out"
          initialOpacity={0.7}
          animateOpacity
          scale={1.05}
          threshold={0.05}
          delay={0.2 * index}
        >
          <div className="overflow-hidden shadow-sm">
            <button
              onClick={() => toggle(index)}
              className={`${
                activeIndex === index ? "bg-gray-600" : ""
              } w-full flex justify-between items-center px-5 py-4 text-left text-lg font-medium text-white bg-gray-900 hover:bg-gray-900 transition`}
            >
              <span>{item.question}</span>
              <FaChevronDown
                className={`transform transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180 text-blue-600" : ""
                }`}
              />
            </button>

            <div
              className={`text-white text-base text-left leading-relaxed transition-all duration-300 ease-in-out ${
                activeIndex === index
                  ? "max-h-96 opacity-100 px-5 py-4"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              {item.answer}
            </div>
          </div>
        </AnimatedContent>
      ))}
    </div>
  );
}
