"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { graphqlClient } from "@/lib/graphql";
import { useCart } from "@/context/CartContext";
import { FiPlus } from "react-icons/fi";

interface MealCategory {
  id: string;
  name: string;
  image: string;
  href: string;
}

interface Ingredient {
  id: string;
  name: string;
  image: string;
  weight: string;
  price: number;
}

const mealCategories: MealCategory[] = [
  {
    id: "1",
    name: "Pizza",
    image: "/assets/images/meal_options/pizza.png",
    href: "/make-meal/pizza",
  },
  {
    id: "2",
    name: "Burger",
    image: "/assets/images/meal_options/burger.png",
    href: "/make-meal/burger",
  },
  {
    id: "3",
    name: "Pasta",
    image: "/assets/images/meal_options/pasta.png",
    href: "/make-meal/pasta",
  },
  {
    id: "4",
    name: "Sandwich",
    image: "/assets/images/meal_options/pizza.png",
    href: "/make-meal/sandwich",
  },
];

const pizzaIngredients: Ingredient[] = [
  {
    id: "1",
    name: "Amul Cheese",
    image: "/assets/images/ingredients/cheese.png",
    weight: "60g",
    price: 56,
  },
  {
    id: "2",
    name: "Pizza Sauce",
    image: "/assets/images/ingredients/sauce.png",
    weight: "250g",
    price: 130,
  },
  {
    id: "3",
    name: "Pizza Base",
    image: "/assets/images/ingredients/base.png",
    weight: "200g",
    price: 40,
  },
  {
    id: "4",
    name: "Cheese",
    image: "/assets/images/ingredients/cheese.png",
    weight: "200g",
    price: 40,
  },
];

export default function MakeYourMeal() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("Pizza");
  if (loading) {
    return (
      <section className="py-3 sm:py-4 md:py-6 lg:py-8">
        <div className="container-responsive max-w-8xl mx-auto border border-gray-200 rounded-lg sm:rounded-xl shadow-md px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          <h2 className="heading-responsive mb-3 sm:mb-4 md:mb-6 text-gray-800 text-center md:text-left">
            Make your meal
          </h2>
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2 xs:gap-3 sm:gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center p-2 xs:p-3 sm:p-4 rounded-lg bg-gray-100 animate-pulse"
              >
                <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gray-200 rounded-full mb-1 sm:mb-2" />
                <div className="h-3 xs:h-4 bg-gray-200 rounded w-16 xs:w-20 sm:w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section className="py-3 sm:py-4 md:py-6 lg:py-8">
        <div className="container-responsive max-w-8xl mx-auto border border-gray-200 rounded-lg sm:rounded-xl shadow-md px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          <h2 className="heading-responsive mb-3 sm:mb-4 md:mb-6 text-gray-800 text-center md:text-left">
            Make your meal
          </h2>
          <div className="text-center text-red-500 text-sm sm:text-base">
            {error}
          </div>
        </div>
      </section>
    );
  }
  return (
    <div>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-3 sm:mb-4 md:mb-6 gap-3 sm:gap-4">
        <div className="flex-1">
          <h2 className="heading-responsive text-gray-800 mb-1 sm:mb-2">
            Build Your Own Meal
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl line-clamp-2">
            Choose from fresh ingredients to create your perfect meal. We'll
            deliver everything you need!
          </p>
        </div>

        {/* Enhanced responsive category selector */}
        <div className="w-full lg:w-auto lg:mt-0 overflow-x-auto scrollbar-hide py-1 sm:py-2">
          <div className="flex gap-1 xs:gap-2 min-w-max lg:min-w-0">
            {mealCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`whitespace-nowrap px-3 xs:px-4 sm:px-5 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-medium flex items-center gap-1 xs:gap-2 transition-all btn-touch ${
                  selectedCategory === category.name
                    ? "bg-gradient-to-r from-[#6B46C1] to-[#8B5CF6] text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
                }`}
              >
                <div className="w-4 h-4 xs:w-5 xs:h-5 relative flex-shrink-0">
                  <Image
                    src={category.image}
                    fill
                    alt={category.name}
                    className="object-contain"
                    sizes="20px"
                  />
                </div>
                <span className="hidden xs:inline">{category.name}</span>
                <span className="xs:hidden">{category.name.slice(0, 3)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced responsive ingredients grid */}
      <div className="bg-gray-50 p-3 xs:p-4 sm:p-6 rounded-lg sm:rounded-xl">
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 xs:gap-3 sm:gap-4">
          {pizzaIngredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="bg-white border border-gray-100 rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full transform hover:scale-105 group"
            >
              <div className="p-2 xs:p-3 sm:p-3 flex-grow flex flex-col">
                {/* Responsive ingredient image */}
                <div className="relative h-16 xs:h-20 sm:h-24 mb-2 xs:mb-3 bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src={ingredient.image}
                    alt={ingredient.name}
                    fill
                    sizes="(max-width: 475px) 25vw, (max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 16vw"
                    className="object-contain p-1 xs:p-2 group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBWMTMwTTcwIDEwMEgxMzAiIHN0cm9rZT0iI0Q5REREOCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHN2Zz4=";
                    }}
                  />
                </div>

                {/* Responsive ingredient details */}
                <h3
                  className="font-medium text-gray-900 text-xs xs:text-sm mb-1 line-clamp-2 group-hover:text-purple-700 transition-colors"
                  title={ingredient.name}
                >
                  {ingredient.name}
                </h3>

                <div className="text-xs text-gray-500 mb-2 xs:mb-3">
                  {ingredient.weight}
                </div>

                {/* Responsive price and add button */}
                <div className="mt-auto flex items-center justify-between gap-1 xs:gap-2">
                  <span className="font-bold text-xs xs:text-sm">
                    ₹{ingredient.price}
                  </span>

                  <button
                    onClick={async () => {
                      try {
                        await addToCart({
                          id: ingredient.id,
                          name: ingredient.name,
                          imageUrl: ingredient.image,
                          basePrice: ingredient.price,
                        });
                        // Success toast is handled in cart context
                      } catch (error) {
                        console.error("Error adding to cart:", error);
                        // Error toast is handled in cart context
                      }
                    }}
                    className="px-2 xs:px-3 py-1 xs:py-1.5 text-xs font-medium rounded-md xs:rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center gap-1 btn-touch min-w-[44px] min-h-[44px] xs:min-w-0 xs:min-h-0 justify-center"
                  >
                    <FiPlus className="h-3 w-3" />
                    <span className="hidden xs:inline">ADD</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Responsive explore button */}
        <div className="mt-4 xs:mt-6 sm:mt-8 text-center">
          <Link
            href="/make-meal"
            className="inline-block px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 bg-gradient-to-r from-[#6B46C1] to-[#8B5CF6] text-white rounded-full hover:shadow-lg transition-all shadow-md font-medium text-sm xs:text-base btn-touch"
          >
            <span className="hidden sm:inline">Explore All Recipes</span>
            <span className="sm:hidden">More Recipes</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
