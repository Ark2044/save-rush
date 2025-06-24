"use client";
import { useState } from "react";
import Link from "next/link";
import {
  FiShoppingCart,
  FiClock,
  FiMapPin,
  FiGift,
  FiTrendingUp,
  FiHeart,
} from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useLocation } from "@/context/LocationContext";

const quickActionItems = [
  {
    id: "reorder",
    title: "Reorder",
    subtitle: "Previous orders",
    icon: FiClock,
    color: "from-blue-500 to-blue-600",
    href: "/account/orders",
    requiresAuth: true,
  },
  {
    id: "offers",
    title: "Offers",
    subtitle: "Special deals",
    icon: FiGift,
    color: "from-orange-500 to-red-500",
    href: "/offers",
    requiresAuth: false,
  },
  {
    id: "trending",
    title: "Trending",
    subtitle: "Popular now",
    icon: FiTrendingUp,
    color: "from-green-500 to-emerald-600",
    href: "/trending",
    requiresAuth: false,
  },
  {
    id: "wishlist",
    title: "Wishlist",
    subtitle: "Saved items",
    icon: FiHeart,
    color: "from-pink-500 to-rose-600",
    href: "/wishlist",
    requiresAuth: true,
  },
];

export default function QuickActions() {
  const { user } = useAuth();
  const { items: cartItems } = useCart();
  const { currentLocation, openLocationModal } = useLocation();
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  return (
    <div>
      <div className="mb-3 sm:mb-4 md:mb-6">
        <h2 className="heading-responsive text-gray-800 mb-1 sm:mb-2">
          Quick Actions
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-600">
          Access your most used features instantly
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 xs:gap-3 sm:gap-4">
        {/* Cart Quick Action */}
        <Link
          href="/cart"
          className="group relative bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-200 transform hover:scale-105"
          onMouseEnter={() => setHoveredAction("cart")}
          onMouseLeave={() => setHoveredAction(null)}
        >
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg ${
                hoveredAction === "cart" ? "scale-110" : ""
              } transition-transform`}
            >
              <FiShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
            </div>
            {cartItems.length > 0 && (
              <div className="bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex items-center justify-center animate-pulse">
                <span className="text-xs">
                  {cartItems.length > 9 ? "9+" : cartItems.length}
                </span>
              </div>
            )}
          </div>
          <h3 className="font-medium sm:font-semibold text-gray-800 group-hover:text-purple-600 transition-colors text-sm sm:text-base">
            Cart
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">
            {cartItems.length > 0
              ? `${cartItems.length} item${cartItems.length > 1 ? "s" : ""}`
              : "Empty cart"}
          </p>
        </Link>

        {/* Location Quick Action */}
        <button
          onClick={openLocationModal}
          className="group relative bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-200 transform hover:scale-105 text-left btn-touch"
          onMouseEnter={() => setHoveredAction("location")}
          onMouseLeave={() => setHoveredAction(null)}
        >
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center shadow-lg ${
                hoveredAction === "location" ? "scale-110" : ""
              } transition-transform`}
            >
              <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
            </div>
          </div>
          <h3 className="font-medium sm:font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors text-sm sm:text-base">
            Location
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">
            {currentLocation?.address || "Set location"}
          </p>
        </button>

        {/* Dynamic Quick Actions */}
        {quickActionItems.slice(0, 2).map((action) => {
          const IconComponent = action.icon;
          const isDisabled = action.requiresAuth && !user;

          return (
            <Link
              key={action.id}
              href={isDisabled ? "/login" : action.href}
              className="group relative bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-200 transform hover:scale-105 btn-touch"
              onMouseEnter={() => setHoveredAction(action.id)}
              onMouseLeave={() => setHoveredAction(null)}
            >
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r ${
                    action.color
                  } flex items-center justify-center shadow-lg ${
                    hoveredAction === action.id ? "scale-110" : ""
                  } transition-transform`}
                >
                  <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                </div>
                {isDisabled && (
                  <div className="text-xs text-gray-400 bg-gray-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                    <span className="hidden xs:inline">Login</span>
                    <span className="xs:hidden">•</span>
                  </div>
                )}
              </div>
              <h3 className="font-medium sm:font-semibold text-gray-800 group-hover:text-purple-600 transition-colors text-sm sm:text-base">
                {action.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">
                {action.subtitle}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Additional Quick Actions Row for larger screens */}
      <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 mt-3 sm:mt-4">
        {quickActionItems.slice(2).map((action) => {
          const IconComponent = action.icon;
          const isDisabled = action.requiresAuth && !user;

          return (
            <Link
              key={action.id}
              href={isDisabled ? "/login" : action.href}
              className="group relative bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-200 transform hover:scale-105 btn-touch"
              onMouseEnter={() => setHoveredAction(action.id)}
              onMouseLeave={() => setHoveredAction(null)}
            >
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r ${
                    action.color
                  } flex items-center justify-center shadow-lg ${
                    hoveredAction === action.id ? "scale-110" : ""
                  } transition-transform`}
                >
                  <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                </div>
                {isDisabled && (
                  <div className="text-xs text-gray-400 bg-gray-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                    <span className="hidden xs:inline">Login</span>
                    <span className="xs:hidden">•</span>
                  </div>
                )}
              </div>
              <h3 className="font-medium sm:font-semibold text-gray-800 group-hover:text-purple-600 transition-colors text-sm sm:text-base">
                {action.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">
                {action.subtitle}
              </p>
            </Link>
          );
        })}

        {/* Empty slots for visual balance on desktop */}
        <div className="opacity-0 hidden md:block"></div>
      </div>
    </div>
  );
}
