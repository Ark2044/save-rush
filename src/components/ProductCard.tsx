"use client";
import Image from "next/image";
import { useState, memo } from "react";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { FiClock, FiPlus } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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

function ProductCard({
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
      setQuantity((prev) => prev + 1);
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
      className="bg-white rounded-lg sm:rounded-xl p-2 xs:p-3 sm:p-4 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group border border-gray-100 hover:border-purple-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image - Enhanced responsive sizing */}
      <div className="relative mb-2 sm:mb-3 aspect-square overflow-hidden rounded-md sm:rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={imgError ? fallbackImage : imageUrl}
          alt={name}
          fill
          className="object-contain p-1 xs:p-2 sm:p-3 transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 375px) 120px, (max-width: 475px) 140px, (max-width: 640px) 180px, (max-width: 768px) 220px, (max-width: 1024px) 250px, 280px"
          onError={() => setImgError(true)}
        />
        {discount > 0 && (
          <div className="absolute top-1 xs:top-1.5 sm:top-2 left-1 xs:left-1.5 sm:left-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-1 xs:px-1.5 sm:px-2 py-0.5 xs:py-1 rounded-md shadow-sm">
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
      </div>

      {/* Product Info - Enhanced responsive layout */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Product name - Responsive text sizing */}
          <h3 className="font-medium text-gray-800 mb-1 xs:mb-1.5 sm:mb-2 line-clamp-2 text-xs xs:text-sm sm:text-base leading-tight group-hover:text-purple-700 transition-colors">
            {name}
          </h3>

          {/* Description - Show only on larger screens */}
          {description && (
            <p className="text-xs sm:text-sm text-gray-500 mb-1 xs:mb-1.5 sm:mb-2 line-clamp-1 hidden xs:block">
              {description}
            </p>
          )}

          {/* Weight and delivery info - Responsive layout */}
          <div className="flex items-center justify-between mb-1 xs:mb-1.5 sm:mb-2">
            <span className="text-xs sm:text-sm text-gray-500 font-medium">
              {weight}
            </span>
            <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
              <FiClock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span className="hidden xs:inline">{deliveryTime}</span>
              <span className="xs:hidden">Fast</span>
            </div>
          </div>
        </div>

        {/* Price and add to cart - Enhanced responsive design */}
        <div className="flex items-center justify-between gap-1 xs:gap-2">
          <div className="flex flex-col xs:flex-row xs:items-center xs:gap-1 sm:gap-2">
            {discountedPrice ? (
              <>
                <span className="text-sm xs:text-base sm:text-lg font-bold text-gray-900">
                  ₹{discountedPrice}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 line-through">
                  ₹{basePrice}
                </span>
              </>
            ) : (
              <span className="text-sm xs:text-base sm:text-lg font-bold text-gray-900">
                ₹{basePrice}
              </span>
            )}
          </div>

          {/* Add to cart button - Enhanced responsive design */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding || !inStock}
            className={`
              flex items-center justify-center 
              w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 
              rounded-lg sm:rounded-xl 
              font-medium text-white transition-all duration-300 
              shadow-md hover:shadow-lg transform hover:scale-105
              min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0
              ${
                !inStock
                  ? "bg-gray-300 cursor-not-allowed"
                  : isAdding
                  ? "bg-green-500 scale-110"
                  : "bg-gradient-to-r from-[#6B46C1] to-[#8B5CF6] hover:from-[#553C9A] hover:to-[#7C3AED]"
              }
            `}
          >
            {isAdding ? (
              <AiOutlineLoading3Quarters className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 animate-spin" />
            ) : (
              <FiPlus className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
            )}
          </button>
        </div>

        {/* Quantity indicator - Only show when items are in cart */}
        {quantity > 0 && (
          <div className="mt-1 xs:mt-1.5 sm:mt-2 text-center">
            <span className="text-xs sm:text-sm text-green-600 font-medium bg-green-50 px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full">
              {quantity} in cart
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// Export memoized component for better performance
export default memo(ProductCard, (prevProps, nextProps) => {
  // Only re-render if essential props have changed
  return (
    prevProps.id === nextProps.id &&
    prevProps.name === nextProps.name &&
    prevProps.basePrice === nextProps.basePrice &&
    prevProps.discountedPrice === nextProps.discountedPrice &&
    prevProps.imageUrl === nextProps.imageUrl &&
    prevProps.inStock === nextProps.inStock
  );
});
