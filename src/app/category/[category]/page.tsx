"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GET_SUBCATEGORIES, graphqlClient } from "@/lib/graphql";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const categories = [
  { name: "Milk", image: "/images/milk.png" },
  { name: "Chips", image: "/images/chips.png" },
  { name: "Eggs", image: "/images/eggs.png" },
  { name: "Chocolates", image: "/images/chocolates.png" },
  { name: "Masalas", image: "/images/masalas.png" },
  { name: "Instant", image: "/images/instant.png" },
  { name: "Atta", image: "/images/atta.png" },
];

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

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  // Use React.use for the params Promise and properly type it
  const resolvedParams = React.use(params);
  const { category } = resolvedParams;
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
    string | null
  >(null);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchSubCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await graphqlClient.request<{
          subCategories: SubCategory[];
        }>(GET_SUBCATEGORIES, { categoryTitle: category });
        setSubCategories(data.subCategories);
        // Default to first subcategory if available
        if (data.subCategories.length > 0) {
          setSelectedSubCategoryId(data.subCategories[0].id);
        }
      } catch (err) {
        setError("Failed to fetch subcategories");
        console.error("Error fetching subcategories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubCategories();
  }, [category]);

  const selectedSubCategory = subCategories.find(
    (sc) => sc.id === selectedSubCategoryId
  );
  const handleAddToCart = async (item: Item) => {
    try {
      await addToCart(item);
      // Success toast is already handled in the cart context
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Error toast is already handled in the cart context
    }
  };

  return (
    <main className="flex max-w-7xl mx-auto mt-8 min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 bg-white rounded-xl shadow p-4 flex flex-col gap-2">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : subCategories.length === 0 ? (
          <div>No subcategories found.</div>
        ) : (
          subCategories.map((subCat) => (
            <button
              key={subCat.id}
              onClick={() => setSelectedSubCategoryId(subCat.id)}
              className={`flex items-center gap-3 p-2 rounded-lg border w-full text-left cursor-pointer ${
                selectedSubCategoryId === subCat.id
                  ? "border-[#6B46C1] bg-[#F3F0FF]"
                  : "border-gray-200"
              } hover:bg-gray-100`}
            >
              <span className="font-medium text-gray-800">{subCat.title}</span>
            </button>
          ))
        )}
      </aside>
      {/* Items Grid */}
      <section className="flex-1 ml-8">
        <div className="bg-white rounded-xl shadow p-8">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : !selectedSubCategory ? (
            <div>Select a subcategory to view items.</div>
          ) : selectedSubCategory.items.length === 0 ? (
            <div>No items found in this subcategory.</div>
          ) : (
            <>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                {selectedSubCategory.title}
              </h3>
              <div className="grid grid-cols-4 gap-8">
                {selectedSubCategory.items.map((item) => (
                  <div key={item.id} className="flex flex-col items-center">
                    <div className="w-32 h-32 bg-purple-100 rounded-xl flex items-center justify-center mb-2">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={80}
                        height={80}
                      />
                    </div>
                    <div className="text-center mb-2">
                      <div className="font-semibold text-gray-900 text-sm">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        ₹{item.basePrice}
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-white border border-gray-300 rounded-lg px-4 py-1 shadow text-gray-800 text-xs font-medium hover:bg-gray-100 cursor-pointer"
                    >
                      Add to cart
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
