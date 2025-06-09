"use client";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { FiClock, FiPlus } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

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
  const [quantity, setQuantity] = useState(0);

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
      setQuantity(prev => prev + 1);
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
      className="bg-white rounded-lg sm:rounded-xl p-2 xs:p-3 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group border border-gray-100 hover:border-purple-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image - Responsive sizing */}
      <div className="relative mb-2 aspect-square overflow-hidden rounded-md sm:rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={imgError ? fallbackImage : imageUrl}
          alt={name}
          fill
          className="object-contain p-1 sm:p-2 transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 475px) 150px, (max-width: 640px) 200px, (max-width: 768px) 250px, 300px"
          onError={() => setImgError(true)}
        />
        {discount > 0 && (
          <div className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md shadow-sm">
            {discount}% OFF
          </div>
        )}
        {!inStock && (
          <div className="absolute inset-0 bg-white/90 flex items-center justify-center backdrop-blur-sm">
            <span className="text-red-500 font-medium text-xs sm:text-sm bg-white px-2 sm:px-3 py-1 rounded-full shadow-md">
              Out of Stock
            </span>
          </div>
        )}
        {deliveryTime && inStock && (
          <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 bg-white/90 backdrop-blur-sm text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-gray-700 shadow-sm border">
            <FiClock className="h-2.5 w-2.5 sm:h-3 sm:w-3 inline mr-1" />
            <span className="hidden xs:inline">{deliveryTime}</span>
            <span className="xs:hidden">{deliveryTime.split(' ')[0]}m</span>
          </div>
        )}
      </div>

      {/* Product Info - Responsive typography */}
      <div className="flex-grow flex flex-col">
        <div className="text-xs text-gray-500 mb-1 font-medium">{weight}</div>
        <h3
          className="font-medium text-gray-900 text-xs xs:text-sm mb-1 sm:mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors leading-tight"
          title={name}
        >
          {name}
        </h3>

        {/* Price and Add Button - Responsive layout */}
        <div className="mt-auto flex items-center justify-between gap-1 sm:gap-2">
          <div className="flex flex-col xs:flex-row xs:items-center xs:gap-1">
            <span className="font-bold text-xs xs:text-sm text-gray-900">
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
            className={`px-2 xs:px-3 py-1 xs:py-1.5 text-xs font-medium rounded-md sm:rounded-lg transition-all duration-300 flex items-center justify-center min-w-[50px] xs:min-w-[60px] transform hover:scale-105 btn-touch ${
              !inStock
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : isAdding
                ? "bg-green-100 text-green-800 scale-105"
                : "bg-gradient-to-r from-[#9BF00B] to-[#8AE00A] text-black hover:from-[#8AE00A] hover:to-[#7BD009] shadow-sm hover:shadow-md"
            }`}
          >
            {isAdding ? (
              <span className="flex items-center gap-1">
                <AiOutlineLoading3Quarters className="animate-spin h-2.5 w-2.5 xs:h-3 xs:w-3 text-green-800" />
                <span className="hidden xs:inline">Adding</span>
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <FiPlus className="h-2.5 w-2.5 xs:h-3 xs:w-3" />
                <span className="hidden xs:inline">ADD</span>
                <span className="xs:hidden">+</span>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
