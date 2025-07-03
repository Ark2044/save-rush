"use client";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/context/SearchContext";
import { FiClock, FiTrash2 } from "react-icons/fi";

export default function RecentlyViewed() {
  const [viewedItems, setViewedItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Sample recently viewed products data - in a real app, this would come from localStorage or API
  const sampleViewedItems: Product[] = [
    {
      id: "recent1",
      name: "Tropicana Orange Juice",
      description: "100% Pure Orange Juice (1L)",
      basePrice: 110,
      discountedPrice: 99,
      imageUrl: "/assets/images/products/milk.png",
      category: "Beverages",
      subCategory: "Juices",
      inStock: true,
    },
    {
      id: "recent2",
      name: "Britannia Good Day Cookies",
      description: "Cashew cookies (200g)",
      basePrice: 40,
      imageUrl: "/assets/images/products/cookies.png",
      category: "Snacks",
      subCategory: "Biscuits & Cookies",
      inStock: true,
    },
    {
      id: "recent3",
      name: "Surf Excel Detergent",
      description: "Liquid detergent (1L)",
      basePrice: 210,
      discountedPrice: 189,
      imageUrl: "/assets/images/products/milk.png",
      category: "Household",
      subCategory: "Laundry",
      inStock: true,
    },
    {
      id: "recent4",
      name: "Colgate Toothpaste",
      description: "Strong Mint (150g)",
      basePrice: 90,
      discountedPrice: 75,
      imageUrl: "/assets/images/products/milk.png",
      category: "Personal Care",
      subCategory: "Oral Care",
      inStock: true,
    },
  ];

  // Simulating getting recently viewed items from localStorage
  useEffect(() => {
    const fetchRecentItems = async () => {
      setLoading(true);
      try {
        // In a real app, this would come from localStorage or an API call
        // const recentItems = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        // setViewedItems(recentItems);

        // For now, using sample data
        setTimeout(() => {
          setViewedItems(sampleViewedItems);
          setLoading(false);
        }, 500); // Simulate delay
      } catch (error) {
        console.error("Failed to fetch recently viewed items:", error);
        setLoading(false);
      }
    };

    fetchRecentItems();
  }, []);

  const clearHistory = () => {
    setViewedItems([]);
    // In a real app: localStorage.removeItem('recentlyViewed');
  };

  if (loading) {
    return (
      <section className="py-4 md:py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="theme-gradient-card rounded-xl shadow-lg p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-3 shadow-sm animate-pulse"
                >
                  <div className="bg-gray-200 h-32 rounded-lg mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/4 mt-4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (viewedItems.length === 0) {
    return null; // Don't show the section if there are no recently viewed items
  }

  return (
    <section className="py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="theme-gradient-card rounded-xl shadow-lg p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                <FiClock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  Recently Viewed
                </h2>
                <p className="text-gray-600 text-sm">
                  Items you've looked at recently
                </p>
              </div>
            </div>
            <button
              onClick={clearHistory}
              className="text-red-600 text-sm font-medium hover:text-red-800 flex items-center gap-1 transition-colors group"
            >
              <FiTrash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Clear History
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 overflow-x-auto pb-2">
            {viewedItems.map((product, index) => (
              <div
                key={product.id}
                style={{ animationDelay: `${index * 100}ms` }}
                className="animate-fade-in"
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  basePrice={product.basePrice}
                  discountedPrice={product.discountedPrice}
                  imageUrl={product.imageUrl}
                  inStock={product.inStock}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
