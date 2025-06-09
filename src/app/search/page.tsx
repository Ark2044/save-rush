"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSearch, Product } from "@/context/SearchContext";
import { useCart } from "@/context/CartContext";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("q") || "";
  const { searchResults, isLoading, error, performSearch } = useSearch();
  const { addToCart } = useCart();
  const [renderedResults, setRenderedResults] = useState<Product[]>([]);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query, performSearch]);

  useEffect(() => {
    setRenderedResults(searchResults);
  }, [searchResults]);

  // Handle add to cart button click
  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      basePrice: product.basePrice,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Search Results for &quot;{query}&quot;
        </h1>
        {isLoading ? (
          <div className="py-10 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#6B46C1] mx-auto mb-4"></div>
            <p className="text-gray-600">Searching for products...</p>
          </div>
        ) : error ? (
          <div className="py-10 text-center text-red-500">{error}</div>
        ) : renderedResults.length === 0 ? (
          <div className="py-10 text-center">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-300 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                No products found
              </h2>
              <p className="text-gray-600 mb-6">
                We couldn't find any products matching &quot;{query}&quot;.
                Please try with different keywords or browse our categories.
              </p>
              <Link
                href="/"
                className="bg-[#6B46C1] text-white px-6 py-2 rounded-lg hover:bg-[#5B3AA7] transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              Found {renderedResults.length} product
              {renderedResults.length !== 1 ? "s" : ""}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {renderedResults.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-4">
                    <div className="relative h-32 mb-3 bg-[#F3F0FF] rounded-lg">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain p-2"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = "/assets/images/meal_options/pizza.png";
                        }}
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                      {product.category} • {product.subCategory}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex flex-col">
                        {product.discountedPrice ? (
                          <>
                            <span className="font-semibold text-gray-900">
                              ₹{product.discountedPrice}
                            </span>
                            <span className="text-xs text-gray-500 line-through">
                              ₹{product.basePrice}
                            </span>
                          </>
                        ) : (
                          <span className="font-semibold text-gray-900">
                            ₹{product.basePrice}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-white border border-gray-300 rounded-lg px-3 py-1 shadow text-gray-800 text-xs font-medium hover:bg-gray-100 cursor-pointer"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}{" "}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function SearchResults() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 pb-10">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Loading search results...
            </h1>
            <div className="py-10 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#6B46C1] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        </div>
      }
    >
      <SearchResultsContent />
    </Suspense>
  );
}
