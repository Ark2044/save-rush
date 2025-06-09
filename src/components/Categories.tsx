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
      <section className="py-3 sm:py-4 md:py-6">
        <div className="container-responsive max-w-7xl mx-auto">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Shop by Category</h2>
          <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-3">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex flex-col items-center animate-pulse">
                <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mb-1 sm:mb-2" />
                <div className="h-2 bg-gray-200 rounded w-8 xs:w-10 sm:w-12 mb-1" />
                <div className="h-2 bg-gray-200 rounded w-6 xs:w-8" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-3 sm:py-4 md:py-6">
        <div className="container-responsive max-w-7xl mx-auto">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Shop by Category</h2>
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-4 sm:p-6 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
              <FiAlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
            </div>
            <div className="text-red-500 mb-2 sm:mb-3 font-medium text-sm sm:text-base">{error}</div>
            <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">
              We're having trouble loading the categories right now.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 sm:px-6 py-2 rounded-lg transition-all transform hover:scale-105 shadow-md text-sm sm:text-base btn-touch"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Shop by Category
          </h2>
          <p className="text-gray-600">
            Discover fresh groceries and daily essentials
          </p>
        </div>
        <Link
          href="/categories"
          className="text-sm text-[#6B46C1] hover:text-[#542bc9] font-medium flex items-center group btn-touch"
        >
          View All
          <FiChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Responsive category grid */}
      <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            href={`/category/${category.title
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
            className="flex flex-col items-center transition-all hover:scale-105 group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 relative mb-3 overflow-hidden rounded-full border-2 border-white shadow-lg bg-gradient-to-br from-purple-100 to-indigo-100 group-hover:shadow-xl transition-all duration-300 group-hover:border-[#6B46C1]">
              {category.subCategories &&
              category.subCategories[0]?.items &&
              category.subCategories[0]?.items[0]?.imageUrl ? (
                <Image
                  src={category.subCategories[0].items[0].imageUrl}
                  alt={category.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300 p-1"
                  sizes="80px"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.style.display = "none";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-purple-500 text-lg font-bold">
                    {category.title.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <span className="text-sm font-medium text-center text-gray-800 line-clamp-2 max-w-[80px] group-hover:text-[#6B46C1] transition-colors leading-tight">
              {category.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
