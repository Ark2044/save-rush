"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { graphqlClient, GET_CATEGORIES } from "@/lib/graphql";
import { inventoryService } from "@/services";
import toast from "react-hot-toast";
import { FiAlertTriangle, FiChevronRight } from 'react-icons/fi';

interface Item {
  id: string;
  name: string;
  imageUrl: string;
  basePrice: number;
}

interface SubCategory {
  id: string;
  title: string;
  items: Item[];
}

interface Category {
  id: string;
  title: string;
  subCategories: SubCategory[];
}

interface CategoriesResponse {
  categories: Category[];
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Try to get recommended items first (if API is working)
        try {
          const recommendedItems = await inventoryService.getRecommendedItems();
          console.log(
            "Recommended items loaded:",
            recommendedItems?.length || 0
          );
          // You can use the recommended items here if needed
        } catch (recError) {
          console.warn(
            "Could not fetch recommended items, using fallback data",
            recError
          );
        }

        // Fetch categories using inventoryService which handles both GraphQL and REST fallback
        const categoriesData = await inventoryService.getCategories();
        if (categoriesData) {
          setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        } else {
          throw new Error("No categories data returned");
        }
      } catch (err) {
        setError("Failed to fetch categories");
        console.error("Error fetching categories:", err);
        // Show more specific error message if available
        if (err instanceof Error) {
          toast.error(`Failed to load categories: ${err.message}`);
        } else {
          toast.error("Failed to load categories. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-4 md:py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-semibold mb-4">Shop by Category</h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex flex-col items-center animate-pulse">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mb-2" />
                <div className="h-2 bg-gray-200 rounded w-12 mb-1" />
                <div className="h-2 bg-gray-200 rounded w-8" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-4 md:py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-semibold mb-4">Shop by Category</h2>
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <FiAlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <div className="text-red-500 mb-3 font-medium">{error}</div>
            <p className="text-gray-600 mb-4">
              We're having trouble loading the categories right now.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg transition-all transform hover:scale-105 shadow-md"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              Shop by Category
            </h2>
            <p className="text-gray-600 text-sm">
              Discover fresh groceries and daily essentials
            </p>
          </div>
          <Link
            href="/categories"
            className="text-sm text-purple-600 hover:text-purple-800 font-medium flex items-center group"
          >
            View All
            <FiChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 min-w-max md:min-w-0">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/category/${category.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="flex flex-col items-center transition-all hover:scale-105 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 relative mb-3 overflow-hidden rounded-full border-2 border-white shadow-lg bg-gradient-to-br from-purple-50 to-indigo-50 group-hover:shadow-xl transition-all duration-300 group-hover:border-purple-200">
                  {category.subCategories &&
                  category.subCategories[0]?.items &&
                  category.subCategories[0]?.items[0]?.imageUrl ? (
                    <Image
                      src={category.subCategories[0].items[0].imageUrl}
                      alt={category.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300 p-1"
                      sizes="(max-width: 768px) 64px, 80px"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.style.display = "none";
                        // Create a fallback element
                        const fallback = document.createElement("div");
                        fallback.className =
                          "w-full h-full bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center";
                        fallback.innerHTML = `<span class="text-purple-500 text-lg font-bold">${category.title.charAt(
                          0
                        )}</span>`;
                        target.parentNode?.appendChild(fallback);
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-500 text-lg font-bold">
                        {category.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-xs md:text-sm font-medium text-center text-gray-800 line-clamp-2 max-w-[80px] group-hover:text-purple-700 transition-colors">
                  {category.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
