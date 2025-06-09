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
    imageUrl: "/assets/images/products/banana.png",
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
    imageUrl: "/assets/images/categories/personal_care.png",
    category: "Personal Care",
    subCategory: "Bath & Body",
    inStock: true,
  },
  {
    id: "pop6",
    name: "Red Bull (250ml)",
    description: "Energy drink",
    basePrice: 125,
    imageUrl: "/assets/images/products/redbull.png",
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
    imageUrl: "/assets/images/categories/cleaning.png",
    category: "Household",
    subCategory: "Cleaners",
    inStock: true,
  },
  {
    id: "pop8",
    name: "Britannia Bread",
    description: "Whole wheat bread (400g)",
    basePrice: 45,
    imageUrl: "/assets/images/products/bread.png",
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
    imageUrl: "/assets/images/ingredients/tomato.png",
    category: "Fruits & Vegetables",
    subCategory: "Fresh Vegetables",
    inStock: true,
  },
  {
    id: "pop10",
    name: "Maggi Noodles (Pack of 4)",
    description: "2-Minute instant noodles",
    basePrice: 58,
    imageUrl: "/assets/images/categories/snacks.png",
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
      <div className="max-w-7xl mx-auto border border-gray-200 rounded-lg shadow-md px-4 md:px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Popular Products
          </h2>

          <div className="overflow-x-auto py-4 md:py-0">
            <div className="flex gap-2">
              {popularCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
                    selectedCategory === category.id
                      ? "bg-[#6B46C1] text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  } transition-colors`}
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
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
