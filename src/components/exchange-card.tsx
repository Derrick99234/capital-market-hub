"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

interface ExchangeCardProps {
  logo: string;
  title: string;
  features: string[];
  minPurchase: string;
  maxDeposit: string;
  rating: number;
  trusted?: boolean;
  buttonLink?: string;
}

const ExchangeCard: React.FC<ExchangeCardProps> = ({
  logo,
  title,
  features,
  minPurchase,
  maxDeposit,
  rating,
  trusted = true,
  buttonLink = "#",
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#1e1e1e] rounded-lg p-4 mb-4 shadow-md gap-4">
      {/* Logo + Info */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <Image
          src={logo}
          alt={title}
          width={64}
          height={64}
          className="w-16 h-16 object-contain"
        />
        <div>
          <h2 className="font-bold text-white text-lg md:text-xl">
            {title.toUpperCase()}
          </h2>
          <p className="text-gray-300 text-sm md:text-base">
            <span className="font-semibold">Features Include</span>
          </p>
          {features.map((feature, index) => (
            <p key={index} className="text-gray-400 text-sm md:text-base">
              {feature}
            </p>
          ))}
          <p className="text-gray-400 text-sm md:text-base">
            Min Purchase {minPurchase}, Max Deposit {maxDeposit}
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-auto flex flex-col items-start md:items-end">
        <div className="flex items-center text-yellow-400 mb-1">
          {Array.from({ length: rating }).map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
        {trusted && (
          <p className="text-gray-400 text-sm md:text-base">Trusted</p>
        )}

        <a
          href={buttonLink}
          className="mt-2 inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded text-sm md:text-base"
        >
          Buy Now
        </a>
      </div>
    </div>
  );
};

export default ExchangeCard;
