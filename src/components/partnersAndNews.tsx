"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function PartnersAndNews() {
  const [partnersPage, setPartnersPage] = useState(0);
  const [newsPage, setNewsPage] = useState(0);

  const partners = [
    {
      src: "https://www.capitalex.co/images/partners/a-light.png",
      alt: "Tokenlot",
    },
    {
      src: "https://www.capitalex.co/images/partners/b-light.png",
      alt: "BlockEx",
    },
    {
      src: "https://www.capitalex.co/images/partners/c-light.png",
      alt: "BlockchainIL",
    },
    {
      src: "https://www.capitalex.co/images/partners/d-light.png",
      alt: "Bancor",
    },
    {
      src: "https://www.capitalex.co/images/partners/e-light.png",
      alt: "Stockholm Green Digital Finance",
    },
    {
      src: "https://www.capitalex.co/images/partners/f-light.png",
      alt: "Stockholm Green Digital Finance",
    },
    {
      src: "https://www.capitalex.co/images/partners/b-light.png",
      alt: "BlockEx",
    },
    {
      src: "https://www.capitalex.co/images/partners/a-light.png",
      alt: "Tokenlot",
    },
    {
      src: "https://www.capitalex.co/images/partners/c-light.png",
      alt: "BlockchainIL",
    },
    {
      src: "https://www.capitalex.co/images/partners/a-light.png",
      alt: "Tokenlot",
    },
    {
      src: "https://www.capitalex.co/images/partners/c-light.png",
      alt: "BlockchainIL",
    },
    {
      src: "https://www.capitalex.co/images/partners/d-light.png",
      alt: "Bancor",
    },
    {
      src: "https://www.capitalex.co/images/partners/b-light.png",
      alt: "BlockEx",
    },
    {
      src: "https://www.capitalex.co/images/partners/e-light.png",
      alt: "Stockholm Green Digital Finance",
    },
    {
      src: "https://www.capitalex.co/images/partners/b-light.png",
      alt: "BlockEx",
    },
    {
      src: "https://www.capitalex.co/images/partners/a-light.png",
      alt: "Tokenlot",
    },
    {
      src: "https://www.capitalex.co/images/partners/c-light.png",
      alt: "BlockchainIL",
    },
    {
      src: "https://www.capitalex.co/images/partners/f-light.png",
      alt: "Stockholm Green Digital Finance",
    },
  ];

  const news = [
    {
      title: "Fintech G20 Global Summit 2019",
      location: "New York, United State",
      link: "#",
    },
    {
      title: "Blockchain Global Summit 2019",
      location: "California, United State",
      link: "#",
    },
    {
      title: "Crypto Expo Asia 2020",
      location: "Singapore",
      link: "#",
    },
    {
      title: "Web3 Conference 2020",
      location: "Dubai, UAE",
      link: "#",
    },
  ];

  // pagination logic
  const partnersPerPage = 9;
  const newsPerPage = 3;

  const partnersPages = Math.ceil(partners.length / partnersPerPage);
  const newsPages = Math.ceil(news.length / newsPerPage);

  const currentPartners = partners.slice(
    partnersPage * partnersPerPage,
    (partnersPage + 1) * partnersPerPage
  );

  const currentNews = news.slice(
    newsPage * newsPerPage,
    (newsPage + 1) * newsPerPage
  );

  return (
    <section className="relative py-20 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 px-6">
        {/* Partners Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-10">Our Partners</h2>
          <div className="grid grid-cols-3 gap-8 justify-items-center">
            <AnimatePresence mode="wait">
              {currentPartners.map((partner, idx) => (
                <motion.div
                  key={partner.src + idx + partnersPage} // make key unique per page
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center justify-center rounded-xl p-6 w-40 h-20"
                >
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={120}
                    height={60}
                    className="object-contain"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Arrows */}
          <div className="flex justify-center gap-6 mt-16">
            <button
              onClick={() => setPartnersPage((p) => Math.max(p - 1, 0))}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-500 hover:bg-gray-700 transition"
              disabled={partnersPage === 0}
            >
              ←
            </button>
            <button
              onClick={() =>
                setPartnersPage((p) => Math.min(p + 1, partnersPages - 1))
              }
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-500 hover:bg-gray-700 transition"
              disabled={partnersPage === partnersPages - 1}
            >
              →
            </button>
          </div>
        </div>

        {/* News Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-10">NEWS</h2>
          <AnimatePresence mode="wait">
            <div className="flex flex-col gap-6">
              {currentNews.map((item, idx) => (
                <motion.div
                  key={item.title + idx + newsPage}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="bg-gray-800 p-6 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.location}</p>
                  </div>
                  <a
                    href={item.link}
                    className="text-blue-400 font-medium hover:underline"
                  >
                    Learn More →
                  </a>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {/* Arrows */}
          <div className="flex justify-center gap-6 mt-16">
            <button
              onClick={() => setNewsPage((p) => Math.max(p - 1, 0))}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-500 hover:bg-gray-700 transition"
              disabled={newsPage === 0}
            >
              ←
            </button>
            <button
              onClick={() => setNewsPage((p) => Math.min(p + 1, newsPages - 1))}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-500 hover:bg-gray-700 transition"
              disabled={newsPage === newsPages - 1}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
