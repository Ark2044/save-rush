"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface Deal {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  expiresIn: number; // hours remaining
  tag?: string;
}

// Sample deals data
const dealsData: Deal[] = [
  {
    id: "deal1",
    title: "Fortune Sunlite Refined Sunflower Oil",
    description: "1 L",
    imageUrl: "/assets/images/products/sunflower-oil.png",
    originalPrice: 199,
    discountedPrice: 149,
    discountPercentage: 25,
    expiresIn: 6,
    tag: "BEST SELLER",
  },
  {
    id: "deal2",
    title: "Tata Premium Toor Dal",
    description: "1 kg",
    imageUrl: "/assets/images/products/toor-dal.png",
    originalPrice: 180,
    discountedPrice: 135,
    discountPercentage: 25,
    expiresIn: 12,
  },
  {
    id: "deal3",
    title: "Amul Pure Milk",
    description: "500 ml",
    imageUrl: "/assets/images/products/milk.png",
    originalPrice: 30,
    discountedPrice: 25,
    discountPercentage: 17,
    expiresIn: 4,
    tag: "HOT DEAL",
  },
  {
    id: "deal4",
    title: "Fresh Onions",
    description: "1 kg",
    imageUrl: "/assets/images/ingredients/onion.png",
    originalPrice: 40,
    discountedPrice: 30,
    discountPercentage: 25,
    expiresIn: 8,
  },
  {
    id: "deal5",
    title: "Britannia Good Day Cookies",
    description: "200 g",
    imageUrl: "/assets/images/products/cookies.png",
    originalPrice: 40,
    discountedPrice: 32,
    discountPercentage: 20,
    expiresIn: 10,
  },
];

export default function DailyDeals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [timeLeft, setTimeLeft] = useState<Record<string, string>>({});

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setDeals(dealsData);
      setLoading(false);
    }, 800);
  }, []);

  // Handle countdown timer for each deal
  useEffect(() => {
    if (deals.length === 0) return;

    // Initialize time left for each deal
    const initialTimeLeft: Record<string, string> = {};
    deals.forEach((deal) => {
      const hours = deal.expiresIn;
      const minutes = Math.floor(Math.random() * 60);
      initialTimeLeft[deal.id] = `${hours}h ${minutes}m`;
    });

    setTimeLeft(initialTimeLeft);

    // Update countdown every minute
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const updated = { ...prev };

        Object.keys(updated).forEach((dealId) => {
          const [hours, minutes] = updated[dealId]
            .split("h ")
            .map((part) => parseInt(part.replace(/[^0-9]/g, "")));

          let newMinutes = minutes - 1;
          let newHours = hours;

          if (newMinutes < 0) {
            newMinutes = 59;
            newHours -= 1;
          }

          if (newHours < 0) {
            newHours = 0;
            newMinutes = 0;
          }

          updated[dealId] = `${newHours}h ${newMinutes}m`;
        });

        return updated;
      });
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [deals]);

  const handleAddToCart = async (deal: Deal) => {
    try {
      await addToCart({
        id: deal.id,
        name: deal.title,
        imageUrl: deal.imageUrl || "/assets/images/products/default.png",
        basePrice: deal.discountedPrice,
      });
      // Success toast is handled in the cart context
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Error toast is handled in the cart context
    }
  };

  if (loading) {
    return (
      <section className="py-4 md:py-8">
        <div className="max-w-7xl mx-auto border border-gray-200 rounded-lg shadow-md px-4 md:px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Daily Deals</h2>
            <div className="flex items-center gap-2 bg-gray-200 animate-pulse h-6 w-20 rounded"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col animate-pulse bg-white rounded-xl p-3 shadow-sm h-64"
              >
                <div className="bg-gray-200 rounded-lg h-36 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4 md:py-8">
      <div className="max-w-7xl mx-auto border border-gray-200 rounded-lg shadow-md px-4 md:px-6 py-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Daily Deals</h2>

          <Link
            href="/deals"
            className="text-sm text-[#6B46C1] hover:text-[#5D3EA9] font-medium flex items-center"
          >
            View All Deals
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
            >
              {/* Timer */}
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-1 bg-[#FFE9E9] text-[#FF4D4F] text-xs px-2 py-1 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Ends in {timeLeft[deal.id] || `${deal.expiresIn}h`}
                  </span>
                </div>

                {deal.tag && (
                  <div className="text-xs font-bold text-[#6B46C1]">
                    {deal.tag}
                  </div>
                )}
              </div>

              {/* Product Image */}
              <div className="relative mb-2 aspect-square overflow-hidden rounded-lg bg-[#F7F7F7]">
                <Image
                  src={deal.imageUrl || "/assets/images/products/default.png"}
                  alt={deal.title}
                  fill
                  sizes="(max-width: 768px) 40vw, 20vw"
                  className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "/assets/images/products/default.png";
                  }}
                />

                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                  {deal.discountPercentage}% OFF
                </div>
              </div>

              {/* Product Info */}
              <div className="flex-grow flex flex-col">
                <div className="text-xs text-gray-500 mb-1">
                  {deal.description}
                </div>
                <h3
                  className="font-medium text-gray-900 text-sm mb-1 line-clamp-2"
                  title={deal.title}
                >
                  {deal.title}
                </h3>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-sm">
                      ₹{deal.discountedPrice}
                    </span>
                    <span className="text-gray-500 text-xs line-through">
                      ₹{deal.originalPrice}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(deal)}
                    className="px-3 py-1 text-xs font-medium rounded-lg bg-[#9BF00B] text-black hover:bg-[#8AE00A] transition-colors"
                  >
                    ADD
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
