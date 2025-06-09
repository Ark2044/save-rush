"use client";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

interface ProductCardProps {
  id: string;
  name: string;
  description?: string;
  basePrice: number;
  discountedPrice?: number;
  imageUrl: string;
  weight?: string;
  deliveryTime?: string;
  inStock?: boolean;
}

export default function ProductCard({
  id,
  name,
  description,
  basePrice,
  discountedPrice,
  imageUrl,
  weight = "1 item",
  deliveryTime = "10 mins",
  inStock = true,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Fallback placeholder image
  const fallbackImage =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBWMTMwTTcwIDEwMEgxMzAiIHN0cm9rZT0iI0Q5REREOCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHN2Zz4=";

  const handleAddToCart = async () => {
    if (!inStock) {
      toast.error("Sorry, this item is out of stock");
      return;
    }

    // Prevent multiple clicks
    if (isAdding) return;

    setIsAdding(true);
    try {
      await addToCart({
        id,
        name,
        imageUrl: imageUrl || "/assets/images/products/milk.png",
        basePrice: discountedPrice || basePrice,
      });

      // Success will be handled by the context
    } catch (error) {
      // Error will be handled by the context
      console.error("Error adding to cart:", error);
    } finally {
      // Schedule the button state to return to normal
      setTimeout(() => {
        setIsAdding(false);
      }, 700); // Added a bit more time for better UX
    }
  };

  const discount =
    basePrice && discountedPrice
      ? Math.round(((basePrice - discountedPrice) / basePrice) * 100)
      : 0;

  return (
    <div
      className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative mb-2 aspect-square overflow-hidden rounded-lg bg-[#F7F7F7]">
        {" "}
        <Image
          src={imgError ? fallbackImage : imageUrl}
          alt={name}
          fill
          className="object-contain p-2 transition-transform duration-300"
          style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
          sizes="(max-width: 768px) 40vw, 20vw"
          onError={() => setImgError(true)}
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            {discount}% OFF
          </div>
        )}
        {!inStock && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <span className="text-red-500 font-medium text-sm">
              Out of Stock
            </span>
          </div>
        )}
        {deliveryTime && (
          <div className="absolute bottom-2 left-2 bg-white text-xs px-2 py-1 rounded-full text-gray-700 shadow-sm">
            {deliveryTime}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-grow flex flex-col">
        <div className="text-xs text-gray-500 mb-1">{weight}</div>
        <h3
          className="font-medium text-gray-900 text-sm mb-1 line-clamp-2"
          title={name}
        >
          {name}
        </h3>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="font-bold text-sm">
              ₹{discountedPrice || basePrice}
            </span>
            {discountedPrice && (
              <span className="text-gray-500 text-xs line-through">
                ₹{basePrice}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!inStock || isAdding}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all duration-300 flex items-center justify-center min-w-[60px] ${
              !inStock
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : isAdding
                ? "bg-green-100 text-green-800"
                : "bg-[#9BF00B] text-black hover:bg-[#8AE00A]"
            }`}
          >
            {isAdding ? (
              <span className="flex items-center gap-1">
                <svg
                  className="animate-spin h-3 w-3 text-green-800"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Adding
              </span>
            ) : (
              "ADD"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
