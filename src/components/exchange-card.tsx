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
    <div className="flex justify-between items-center bg-[#1e1e1e] rounded-lg p-4 mb-4 shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <Image src={logo} alt={title} width={80} height={80} />
        <div>
          <h2 className="font-bold text-white">{title.toUpperCase()}</h2>
          <p className="text-gray-300">
            <span className="font-semibold">Features Include</span>
          </p>
          {features.map((feature, index) => (
            <p key={index} className="text-gray-400 text-sm">
              {feature}
            </p>
          ))}
          <p className="text-gray-400 text-sm">
            Min Purchase {minPurchase}, Max Deposit {maxDeposit}
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="text-right">
        <div className="flex items-center justify-end text-yellow-400">
          {Array.from({ length: rating }).map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
        {trusted && <p className="text-gray-400 text-sm">Trusted</p>}

        <a
          href={buttonLink}
          className="mt-2 inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
        >
          Buy Now
        </a>
      </div>
    </div>
  );
};

export default ExchangeCard;
