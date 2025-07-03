"use client";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/context/SearchContext";
import { useAuth } from "@/context/AuthContext";
import { FiUser, FiTrendingUp, FiChevronRight } from "react-icons/fi";
import Link from "next/link";

export default function PersonalizedRecommendations() {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isGuest } = useAuth();

  // Sample recommended products data - in a real app, this would come from the API based on user history
  const sampleRecommendations: Product[] = [
    {
      id: "rec1",
      name: "Organic Avocado",
      description: "Fresh ripe avocados (per piece)",
      basePrice: 79,
      discountedPrice: 59,
      imageUrl: "/assets/images/products/milk.png",
      category: "Fruits & Vegetables",
      subCategory: "Fresh Fruits",
      inStock: true,
    },
    {
      id: "rec2",
      name: "Brown Eggs (6 pcs)",
      description: "Farm fresh brown eggs",
      basePrice: 72,
      imageUrl: "/assets/images/products/eggs.png",
      category: "Dairy & Breakfast",
      subCategory: "Eggs",
      inStock: true,
    },
    {
      id: "rec3",
      name: "Whole Grain Bread",
      description: "Freshly baked whole grain bread (400g)",
      basePrice: 45,
      discountedPrice: 40,
      imageUrl: "/assets/images/products/milk.png",
      category: "Bakery",
      subCategory: "Bread",
      inStock: true,
    },
    {
      id: "rec4",
      name: "Fresh Greek Yogurt",
      description: "Creamy Greek yogurt (500g)",
      basePrice: 120,
      discountedPrice: 99,
      imageUrl: "/assets/images/products/milk.png",
      category: "Dairy & Breakfast",
      subCategory: "Yogurt",
      inStock: true,
    },
    {
      id: "rec5",
      name: "Green Tea (25 bags)",
      description: "Premium green tea bags",
      basePrice: 180,
      imageUrl: "/assets/images/products/milk.png",
      category: "Beverages",
      subCategory: "Tea & Coffee",
      inStock: true,
    },
  ];

  // Simulating API fetch with useEffect
  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call based on user's history
        // const response = await inventoryService.getRecommendedItems();
        // setRecommendations(response);

        // For now, using sample data
        setTimeout(() => {
          setRecommendations(sampleRecommendations);
          setLoading(false);
        }, 500); // Simulate network delay
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user?.uid]);

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
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-3 shadow-sm animate-pulse"
                >
                  <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-32 rounded-lg mb-2"></div>
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

  if (recommendations.length === 0) {
    return null; // Don't show the section if there are no recommendations
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {user ? "Recommended for You" : "Trending Products"}
          </h2>
          <p className="text-gray-600">
            {user
              ? "Based on your shopping history"
              : "Popular items right now"}
          </p>
        </div>

        <Link
          href="/recommendations"
          className="text-sm text-[#6B46C1] hover:text-[#542bc9] font-medium flex items-center group"
        >
          View All
          <FiChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {recommendations.map((product, index) => (
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
  );
}
