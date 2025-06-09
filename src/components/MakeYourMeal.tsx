"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { graphqlClient } from "@/lib/graphql";
import { useCart } from "@/context/CartContext";

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
    image: "/meals/pizza.png",
    href: "/make-meal/pizza",
  },
  {
    id: "2",
    name: "Burger",
    image: "/meals/burger.png",
    href: "/make-meal/burger",
  },
  {
    id: "3",
    name: "Pasta",
    image: "/meals/pasta.png",
    href: "/make-meal/pasta",
  },
  {
    id: "4",
    name: "Sandwich",
    image: "/meals/sandwich.png",
    href: "/make-meal/sandwich",
  },
];

const pizzaIngredients: Ingredient[] = [
  {
    id: "1",
    name: "Amul Cheese",
    image: "/ingredients/amul-cheese.png",
    weight: "60g",
    price: 56,
  },
  {
    id: "2",
    name: "Pizza Sauce",
    image: "/ingredients/pizza-sauce.png",
    weight: "250g",
    price: 130,
  },
  {
    id: "3",
    name: "Pizza Base",
    image: "/ingredients/pizza-base.png",
    weight: "200g",
    price: 40,
  },
  {
    id: "4",
    name: "Cheese",
    image: "/ingredients/cheese.png",
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
      <section className="py-4 md:py-8">
        <div className="max-w-7xl mx-auto border border-gray-200 rounded-lg shadow-md px-4 md:px-6 py-4">
          <h2 className="text-xl font-semibold mb-4 md:mb-6 text-gray-800 text-center md:text-left">
            Make your meal
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center p-4 rounded-lg bg-gray-100 animate-pulse"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-4 md:py-8">
        <div className="max-w-7xl mx-auto border border-gray-200 rounded-lg shadow-md px-4 md:px-6 py-4">
          <h2 className="text-xl font-semibold mb-4 md:mb-6 text-gray-800 text-center md:text-left">
            Make your meal
          </h2>
          <div className="text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 md:py-10 bg-gradient-to-r from-purple-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Build Your Own Meal
            </h2>
            <p className="text-gray-600 max-w-xl">
              Choose from fresh ingredients to create your perfect meal. We'll
              deliver everything you need!
            </p>
          </div>

          <div className="mt-4 md:mt-0 overflow-x-auto scrollbar-hide py-2">
            <div className="flex gap-2">
              {mealCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${
                    selectedCategory === category.name
                      ? "bg-purple-600 text-white shadow-md"
                      : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
                  } transition-all`}
                >
                  <Image
                    src={category.image}
                    width={20}
                    height={20}
                    alt={category.name}
                    className="object-contain"
                  />
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {pizzaIngredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full transform hover:scale-105"
              >
                <div className="p-3 flex-grow flex flex-col">
                  <div className="relative h-24 mb-3 bg-gray-50 rounded-lg overflow-hidden">
                    {" "}
                    <Image
                      src={ingredient.image}
                      alt={ingredient.name}
                      fill
                      sizes="(max-width: 768px) 40vw, 20vw"
                      className="object-contain p-2"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBWMTMwTTcwIDEwMEgxMzAiIHN0cm9rZT0iI0Q5REREOCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHN2Zz4=";
                      }}
                    />
                  </div>

                  <h3
                    className="font-medium text-gray-900 text-sm mb-1"
                    title={ingredient.name}
                  >
                    {ingredient.name}
                  </h3>

                  <div className="text-xs text-gray-500 mb-3">
                    {ingredient.weight}
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-bold text-sm">
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
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transition-all"
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/make-meal"
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg font-medium"
            >
              Explore All Recipes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
