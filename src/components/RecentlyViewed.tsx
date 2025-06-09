"use client";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/context/SearchContext";

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
      imageUrl: "/assets/images/products/orange-juice.png",
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
      imageUrl: "/assets/images/products/detergent.png",
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
      imageUrl: "/assets/images/products/toothpaste.png",
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

  if (loading) {
    return (
      <section className="py-4 md:py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recently Viewed</h2>
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
      </section>
    );
  }

  if (viewedItems.length === 0) {
    return null; // Don't show the section if there are no recently viewed items
  }

  return (
    <section className="py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Recently Viewed
          </h2>
          <button className="text-purple-600 text-sm font-medium hover:text-purple-800">
            Clear History
          </button>
        </div>{" "}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 overflow-x-auto pb-2">
          {viewedItems.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              basePrice={product.basePrice}
              discountedPrice={product.discountedPrice}
              imageUrl={product.imageUrl}
              inStock={product.inStock}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
