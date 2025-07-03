"use client";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/context/SearchContext";

// Define categories with emojis
const popularCategories = [
  { id: "all", name: "All", emoji: "🔍" },
  { id: "fruits", name: "Fruits & Vegetables", emoji: "🍎" },
  { id: "dairy", name: "Dairy & Breakfast", emoji: "🥛" },
  { id: "snacks", name: "Snacks", emoji: "🍫" },
  { id: "beverages", name: "Beverages", emoji: "🥤" },
  { id: "household", name: "Household", emoji: "🧹" },
  { id: "personal", name: "Personal Care", emoji: "🧴" },
];

// Sample popular products
const popularProducts: Product[] = [
  {
    id: "pop1",
    name: "Fresh Bananas",
    description: "Organic bananas (5-6 pcs/500g)",
    basePrice: 49,
    discountedPrice: 39,
    imageUrl: "/assets/images/products/milk.png",
    category: "Fruits & Vegetables",
    subCategory: "Fresh Fruits",
    inStock: true,
  },
  {
    id: "pop2",
    name: "Amul Butter (100g)",
    description: "Pasteurized table butter",
    basePrice: 52,
    imageUrl: "/assets/images/ingredients/cheese.png",
    category: "Dairy & Breakfast",
    subCategory: "Butter & Spreads",
    inStock: true,
  },
  {
    id: "pop3",
    name: "Aashirvaad Atta (1kg)",
    description: "Premium whole wheat flour",
    basePrice: 65,
    discountedPrice: 59,
    imageUrl: "/assets/images/login_screen/wheat.png",
    category: "Staples",
    subCategory: "Atta & Flours",
    inStock: true,
  },
  {
    id: "pop4",
    name: "Lays Classic (30g)",
    description: "Classic salted potato chips",
    basePrice: 20,
    imageUrl: "/assets/images/categories/chips_and_namkeen.png",
    category: "Snacks",
    subCategory: "Chips",
    inStock: true,
  },
  {
    id: "pop5",
    name: "Dove Soap (75g)",
    description: "Moisturizing beauty bar",
    basePrice: 45,
    discountedPrice: 40,
    imageUrl: "/assets/images/categories/chips_and_namkeen.png",
    category: "Personal Care",
    subCategory: "Bath & Body",
    inStock: true,
  },
  {
    id: "pop6",
    name: "Red Bull (250ml)",
    description: "Energy drink",
    basePrice: 125,
    imageUrl: "/assets/images/products/milk.png",
    category: "Beverages",
    subCategory: "Energy Drinks",
    inStock: true,
  },
  {
    id: "pop7",
    name: "Lizol Disinfectant (500ml)",
    description: "Surface cleaner, Citrus",
    basePrice: 168,
    discountedPrice: 152,
    imageUrl: "/assets/images/categories/chips_and_namkeen.png",
    category: "Household",
    subCategory: "Cleaners",
    inStock: true,
  },
  {
    id: "pop8",
    name: "Britannia Bread",
    description: "Whole wheat bread (400g)",
    basePrice: 45,
    imageUrl: "/assets/images/products/milk.png",
    category: "Dairy & Breakfast",
    subCategory: "Bread",
    inStock: true,
  },
  {
    id: "pop9",
    name: "Fresh Tomatoes (500g)",
    description: "Farm fresh red tomatoes",
    basePrice: 40,
    discountedPrice: 34,
    imageUrl: "/assets/images/ingredients/onion.png",
    category: "Fruits & Vegetables",
    subCategory: "Fresh Vegetables",
    inStock: true,
  },
  {
    id: "pop10",
    name: "Maggi Noodles (Pack of 4)",
    description: "2-Minute instant noodles",
    basePrice: 58,
    imageUrl: "/assets/images/categories/chips_and_namkeen.png",
    category: "Ready to Cook",
    subCategory: "Instant Noodles",
    inStock: true,
  },
];

export default function PopularProducts() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from API
    setLoading(true);
    setTimeout(() => {
      if (selectedCategory === "all") {
        setFilteredProducts(popularProducts);
      } else {
        setFilteredProducts(
          popularProducts.filter(
            (product) =>
              product.category.toLowerCase().includes(selectedCategory) ||
              product.subCategory.toLowerCase().includes(selectedCategory)
          )
        );
      }
      setLoading(false);
    }, 500);
  }, [selectedCategory]);

  return (
    <section className="py-4 md:py-8">
      <div className="max-w-7xl mx-auto theme-gradient-card rounded-xl shadow-lg px-4 md:px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              Popular Products
            </h2>
            <p className="text-gray-600 text-sm">
              Customer favorites and trending items
            </p>
          </div>

          <div className="overflow-x-auto py-4 md:py-0 scrollbar-hide">
            <div className="flex gap-2 min-w-max">
              {popularCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? "theme-gradient text-white shadow-lg"
                      : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-[#6B46C1]"
                  }`}
                >
                  <span className="mr-1">{category.emoji}</span> {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(10)].map((_, i) => (
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
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">
              No products found in this category.
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Try selecting a different category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                style={{ animationDelay: `${index * 50}ms` }}
                className="animate-fade-in"
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  basePrice={product.basePrice}
                  discountedPrice={product.discountedPrice}
                  imageUrl={product.imageUrl}
                  weight={
                    product.category === "Fruits & Vegetables"
                      ? product.description?.split("(")[1]?.split(")")[0]
                      : product.description
                          ?.match(/\([^)]*\)/)?.[0]
                          ?.replace(/[()]/g, "") || "1 item"
                  }
                  inStock={product.inStock}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
