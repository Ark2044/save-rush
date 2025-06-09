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
  const [addingStates, setAddingStates] = useState<Record<string, boolean>>({});

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
    if (addingStates[deal.id]) return; // Prevent multiple clicks
    
    setAddingStates(prev => ({ ...prev, [deal.id]: true }));
    
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
    } finally {
      setTimeout(() => {
        setAddingStates(prev => ({ ...prev, [deal.id]: false }));
      }, 700);
    }
  };

  if (loading) {
    return (
      <section className="py-4 md:py-8">
        <div className="max-w-7xl mx-auto border border-gray-200 rounded-xl shadow-lg px-4 md:px-6 py-4">
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
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg h-36 mb-2"></div>
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
      <div className="max-w-7xl mx-auto border border-gray-200 rounded-xl shadow-lg px-4 md:px-6 py-4 bg-gradient-to-br from-white to-gray-50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Daily Deals</h2>
            <p className="text-gray-600 text-sm">Limited time offers - grab them fast!</p>
          </div>

          <Link
            href="/deals"
            className="text-sm text-[#6B46C1] hover:text-[#5D3EA9] font-medium flex items-center group"
          >
            View All Deals
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
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
          {deals.map((deal, index) => (
            <div
              key={deal.id}
              className="bg-white rounded-xl p-3 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group border border-gray-100 hover:border-purple-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Enhanced Timer */}
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-1 bg-gradient-to-r from-red-50 to-orange-50 text-red-600 text-xs px-2 py-1 rounded-full border border-red-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 animate-pulse"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">
                    {timeLeft[deal.id] || `${deal.expiresIn}h`}
                  </span>
                </div>

                {deal.tag && (
                  <div className="text-xs font-bold text-[#6B46C1] bg-purple-50 px-2 py-1 rounded-full">
                    {deal.tag}
                  </div>
                )}
              </div>

              {/* Enhanced Product Image */}
              <div className="relative mb-2 aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">
                <Image
                  src={deal.imageUrl || "/assets/images/products/default.png"}
                  alt={deal.title}
                  fill
                  sizes="(max-width: 768px) 40vw, 20vw"
                  className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "/assets/images/products/default.png";
                  }}
                />

                <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                  {deal.discountPercentage}% OFF
                </div>
              </div>

              {/* Enhanced Product Info */}
              <div className="flex-grow flex flex-col">
                <div className="text-xs text-gray-500 mb-1 font-medium">
                  {deal.description}
                </div>
                <h3
                  className="font-medium text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-purple-700 transition-colors"
                  title={deal.title}
                >
                  {deal.title}
                </h3>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-sm text-gray-900">
                      ₹{deal.discountedPrice}
                    </span>
                    <span className="text-gray-500 text-xs line-through">
                      ₹{deal.originalPrice}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(deal)}
                    disabled={addingStates[deal.id]}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 flex items-center justify-center min-w-[60px] transform hover:scale-105 ${
                      addingStates[deal.id]
                        ? "bg-green-100 text-green-800 scale-105"
                        : "bg-gradient-to-r from-[#9BF00B] to-[#8AE00A] text-black hover:from-[#8AE00A] hover:to-[#7BD009] shadow-sm hover:shadow-md"
                    }`}
                  >
                    {addingStates[deal.id] ? (
                      <span className="flex items-center gap-1">
                        <svg
                          className="animate-spin h-3 w-3 text-green-800"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Adding
                      </span>
                    ) : (
                      "ADD"
                    )}
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
