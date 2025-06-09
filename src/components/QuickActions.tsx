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
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Quick Actions</h2>
        <p className="text-gray-600">Access your most used features instantly</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Cart Quick Action */}
        <Link
          href="/cart"
          className="group relative bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-200 transform hover:scale-105"
          onMouseEnter={() => setHoveredAction("cart")}
          onMouseLeave={() => setHoveredAction(null)}
        >
          <div className="flex items-center justify-between mb-2">
            <div
              className={`w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg ${
                hoveredAction === "cart" ? "scale-110" : ""
              } transition-transform`}
            >
              <FiShoppingCart className="w-5 h-5 text-white" />
            </div>
            {cartItems.length > 0 && (
              <div className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                {cartItems.length}
              </div>
            )}
          </div>
          <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
            Cart
          </h3>
          <p className="text-sm text-gray-500">
            {cartItems.length > 0
              ? `${cartItems.length} items`
              : "Empty cart"}
          </p>
        </Link>

        {/* Location Quick Action */}
        <button
          onClick={openLocationModal}
          className="group relative bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-200 transform hover:scale-105 text-left"
          onMouseEnter={() => setHoveredAction("location")}
          onMouseLeave={() => setHoveredAction(null)}
        >
          <div className="flex items-center justify-between mb-2">
            <div
              className={`w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center shadow-lg ${
                hoveredAction === "location" ? "scale-110" : ""
              } transition-transform`}
            >
              <FiMapPin className="w-5 h-5 text-white" />
            </div>
          </div>
          <h3 className="font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">
            Location
          </h3>
          <p className="text-sm text-gray-500 line-clamp-1">
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
              className="group relative bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-200 transform hover:scale-105"
              onMouseEnter={() => setHoveredAction(action.id)}
              onMouseLeave={() => setHoveredAction(null)}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-r ${
                    action.color
                  } flex items-center justify-center shadow-lg ${
                    hoveredAction === action.id ? "scale-110" : ""
                  } transition-transform`}
                >
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                {isDisabled && (
                  <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                    Login
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                {action.title}
              </h3>
              <p className="text-sm text-gray-500">{action.subtitle}</p>
            </Link>
          );
        })}
      </div>

      {/* Additional Quick Actions Row for larger screens */}
      <div className="hidden md:grid md:grid-cols-4 gap-4 mt-4">
        {quickActionItems.slice(2).map((action) => {
          const IconComponent = action.icon;
          const isDisabled = action.requiresAuth && !user;

          return (
            <Link
              key={action.id}
              href={isDisabled ? "/login" : action.href}
              className="group relative bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-200 transform hover:scale-105"
              onMouseEnter={() => setHoveredAction(action.id)}
              onMouseLeave={() => setHoveredAction(null)}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-r ${
                    action.color
                  } flex items-center justify-center shadow-lg ${
                    hoveredAction === action.id ? "scale-110" : ""
                  } transition-transform`}
                >
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                {isDisabled && (
                  <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                    Login
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                {action.title}
              </h3>
              <p className="text-sm text-gray-500">{action.subtitle}</p>
            </Link>
          );
        })}

        {/* Empty slots for visual balance */}
        <div className="opacity-0"></div>
        <div className="opacity-0"></div>
      </div>
    </div>
  );
}
