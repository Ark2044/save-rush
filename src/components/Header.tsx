"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "@/context/LocationContext";
import { useSearch } from "@/context/SearchContext";
import LocationModal from "./LocationModal";
import ScheduleOrderModal from "./ScheduleOrderModal";
import toast from "react-hot-toast";
import { 
  FiClock, 
  FiMapPin, 
  FiChevronDown, 
  FiSearch, 
  FiChevronRight, 
  FiMenu, 
  FiX, 
  FiShoppingCart 
} from 'react-icons/fi';

// Function to calculate estimated delivery time based on location
const calculateDeliveryTime = (
  location: { lat: number; lng: number } | null
): string => {
  if (!location) return "10 mins";

  // Default location (Gateway of India)
  const storeLocation = { lat: 18.9219, lng: 72.8346 };

  // Calculate distance using Haversine formula
  const R = 6371; // Radius of the earth in km
  const dLat = ((location.lat - storeLocation.lat) * Math.PI) / 180;
  const dLon = ((location.lng - storeLocation.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((storeLocation.lat * Math.PI) / 180) *
      Math.cos((location.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km

  // Roughly calculate delivery time (base 10 min + 2 min per km)
  const estimatedTime = Math.round(10 + distance * 2);
  return `${estimatedTime} mins`;
};

interface HeaderProps {
  onOpenCart?: () => void;
}

export default function Header({ onOpenCart }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { totalItems, totalPrice } = useCart();
  const { user, logout } = useAuth();
  const { currentLocation, openLocationModal } = useLocation();
  const { performSearch } = useSearch();
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [scheduledOrder, setScheduledOrder] = useState<{date: string, time: string} | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    if (searchQuery.trim().length < 2) {
      toast.error("Search term must be at least 2 characters");
      return;
    }
    performSearch(searchQuery);
  };

  const handleScheduleOrder = (date: string, time: string) => {
    setScheduledOrder({ date, time });
    toast.success(`Order scheduled for ${new Date(date).toLocaleDateString()} at ${time}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100 safe-area-inset">
      <div className="container-responsive max-w-7xl mx-auto">
        {/* Top bar with delivery info - Enhanced responsive design */}
        <div className="theme-gradient text-white px-2 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-1 sm:gap-2">
            <FiClock className="h-3 w-3 sm:h-4 sm:w-4 animate-pulse" />
            <span className="hidden xs:inline">Delivery in</span>
            <span className="xs:hidden">Delivery</span>
            <span className="font-bold text-[#9BF00B]">
              {calculateDeliveryTime(currentLocation)}
            </span>
          </div>

          <button
            onClick={openLocationModal}
            className="flex items-center gap-1 hover:bg-white/10 px-1 sm:px-2 py-1 rounded-full transition-colors btn-touch"
          >
            <FiMapPin className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="max-w-[100px] sm:max-w-[150px] truncate text-xs sm:text-sm">
              {currentLocation?.address || "Select Location"}
            </span>
            <FiChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>

        {/* Main header - Enhanced responsive layout */}
        <div className="px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo - Responsive sizing */}
          <Link href="/" className="flex items-center group flex-shrink-0">
            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black brandname stroke group-hover:scale-105 transition-transform duration-200">
              SAVE RUSH
            </h1>
          </Link>

          {/* Desktop Search bar with Schedule Order */}
          <div className="flex-1 max-w-2xl mx-2 sm:mx-4 hidden lg:flex items-center gap-2 xl:gap-3">
            <div className="relative flex-1">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search for milk, bananas, bread..."
                className={`w-full px-3 xl:px-4 py-2 xl:py-2.5 pl-10 xl:pl-12 rounded-xl bg-gray-50 text-gray-900 focus:outline-none border-2 transition-all duration-200 text-sm xl:text-base ${
                  searchFocused 
                    ? "border-[#6B46C1] bg-white shadow-lg" 
                    : "border-transparent hover:bg-gray-100"
                }`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <FiSearch className="h-4 w-4 xl:h-5 xl:w-5 text-gray-400 absolute left-3 xl:left-4 top-1/2 -translate-y-1/2" />
              <button
                className="absolute right-2 xl:right-3 top-1/2 -translate-y-1/2 p-1 xl:p-1.5 hover:bg-purple-100 rounded-full cursor-pointer transition-colors"
                onClick={handleSearch}
              >
                <FiChevronRight className="h-3 w-3 xl:h-4 xl:w-4 text-[#6B46C1]" />
              </button>
            </div>

            {/* Schedule Order Button - Desktop */}
            <button
              onClick={() => setScheduleModalOpen(true)}
              className="flex items-center gap-1 xl:gap-2 px-3 xl:px-4 py-2 xl:py-2.5 theme-gradient text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-sm xl:text-base"
            >
              <FiClock className="h-3 w-3 xl:h-4 xl:w-4" />
              <span className="font-medium hidden xl:inline">Schedule</span>
              <span className="font-medium xl:hidden">Sched</span>
            </button>
          </div>

          {/* Tablet Search bar (md to lg) */}
          <div className="flex-1 max-w-md mx-2 hidden md:flex lg:hidden">
            <div className="relative w-full">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-3 py-2 pl-10 rounded-xl bg-gray-50 text-gray-900 focus:outline-none border-2 border-transparent focus:border-[#6B46C1] focus:bg-white transition-all text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <FiSearch className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-gray-700 p-1 btn-touch"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <FiX className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <FiMenu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>

            {/* Profile dropdown - Hidden on mobile */}
            <div className="relative hidden lg:block" ref={dropdownRef}>
              <button
                className="flex items-center gap-1 text-xs xl:text-sm text-gray-700 hover:text-[#6B46C1] transition-colors btn-touch"
                onClick={() => setDropdownOpen((open) => !open)}
              >
                <span className="hidden xl:inline">{user ? "My Account" : "Login / Sign Up"}</span>
                <span className="xl:hidden">{user ? "Account" : "Login"}</span>
                <FiChevronDown className="h-3 w-3 xl:h-4 xl:w-4" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 xl:w-64 bg-white text-gray-800 rounded-2xl shadow-lg z-50 py-4 xl:py-6 px-6 xl:px-8">
                  {user ? (
                    <>
                      <div className="font-bold text-lg xl:text-xl mb-3 xl:mb-4 text-black">
                        My Account
                      </div>
                      <ul className="space-y-3 xl:space-y-4 text-sm xl:text-base">
                        <li>
                          <Link
                            href="/account"
                            className="block hover:text-purple-700 transition-colors"
                            onClick={() => setDropdownOpen(false)}
                          >
                            Account Overview
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/account/orders"
                            className="block hover:text-purple-700 transition-colors"
                            onClick={() => setDropdownOpen(false)}
                          >
                            Orders
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/account/request-product"
                            className="block hover:text-purple-700 transition-colors"
                            onClick={() => setDropdownOpen(false)}
                          >
                            Request New Product
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/account/coupons"
                            className="block hover:text-purple-700 transition-colors"
                            onClick={() => setDropdownOpen(false)}
                          >
                            Coupon Code
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/account/payment-methods"
                            className="block hover:text-purple-700 transition-colors"
                            onClick={() => setDropdownOpen(false)}
                          >
                            Payment Settings
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              logout();
                              setDropdownOpen(false);
                            }}
                            className="block w-full text-left hover:text-purple-700 transition-colors"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <div className="font-bold text-lg xl:text-xl mb-3 xl:mb-4 text-black">
                        Welcome!
                      </div>
                      <div className="mb-3 xl:mb-4 text-xs xl:text-sm">
                        Login to save your cart and checkout faster
                      </div>
                      <Link
                        href="/login"
                        className="block w-full text-center bg-[#6B46C1] text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm xl:text-base"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Login / Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Enhanced Cart button - Responsive sizing */}
            {onOpenCart ? (
              <button
                onClick={onOpenCart}
                className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-[#9BF00B] to-[#8AE00A] text-black px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl hover:from-[#8AE00A] hover:to-[#7BD009] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 btn-touch"
              >
                <div className="relative">
                  <FiShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center animate-pulse">
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-start hidden sm:block">
                  <span className="text-xs sm:text-sm font-medium">
                    {totalItems > 0 ? `${totalItems} items` : "Cart"}
                  </span>
                  <span className="text-xs font-bold">₹{totalPrice}</span>
                </div>
              </button>
            ) : (
              <Link
                href="/cart"
                className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-[#9BF00B] to-[#8AE00A] text-black px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl hover:from-[#8AE00A] hover:to-[#7BD009] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 btn-touch"
              >
                <div className="relative">
                  <FiShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center animate-pulse">
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-start hidden sm:block">
                  <span className="text-xs sm:text-sm font-medium">
                    {totalItems > 0 ? `${totalItems} items` : "Cart"}
                  </span>
                  <span className="text-xs font-bold">₹{totalPrice}</span>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Enhanced Mobile menu */}
        <div
          className={`px-2 sm:px-4 pb-3 transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } lg:hidden`}
        >
          {/* Mobile Search */}
          <div className="relative mb-3">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pl-9 sm:pl-10 rounded-xl bg-gray-50 text-gray-900 focus:outline-none border-2 border-transparent focus:border-purple-400 focus:bg-white transition-all text-sm sm:text-base"
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  handleSearch();
                  setMobileMenuOpen(false);
                }
              }}
            />
            <FiSearch className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 btn-touch"
              onClick={() => {
                if (searchQuery.trim()) {
                  handleSearch();
                  setMobileMenuOpen(false);
                }
              }}
            >
              <FiChevronRight className="h-4 w-4 text-purple-600" />
            </button>
          </div>

          {/* Mobile Schedule Order Button */}
          <button
            onClick={() => {
              setScheduleModalOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-3 theme-gradient text-white rounded-xl hover:shadow-lg transition-all duration-300 mb-3 btn-touch text-sm sm:text-base"
          >
            <FiClock className="h-4 w-4" />
            <span className="font-medium">Schedule Order</span>
          </button>

          {/* Mobile Navigation Links */}
          <ul className="space-y-2 sm:space-y-3">
            {user ? (
              <>
                <li>
                  <Link
                    href="/account"
                    className="block py-2 sm:py-3 px-2 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors text-sm sm:text-base"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href="/account/orders"
                    className="block py-2 sm:py-3 px-2 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors text-sm sm:text-base"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    href="/account/coupons"
                    className="block py-2 sm:py-3 px-2 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors text-sm sm:text-base"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Coupons
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 sm:py-3 px-2 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors text-sm sm:text-base"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="block py-2 sm:py-3 px-2 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors text-sm sm:text-base"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login / Sign Up
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Location Modal */}
      <LocationModal />
      
      {/* Schedule Order Modal */}
      <ScheduleOrderModal
        open={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        onSchedule={handleScheduleOrder}
      />
    </header>
  );
}
