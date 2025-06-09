"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "@/context/LocationContext";
import { useSearch } from "@/context/SearchContext";
import LocationModal from "./LocationModal";
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

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Top bar with delivery info */}
        <div className="bg-gradient-to-r from-[#6B46C1] to-[#8B5CF6] text-white px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <FiClock className="h-3 w-3 animate-pulse" />
            <span>Delivery in</span>
            <span className="font-bold text-[#9BF00B]">
              {calculateDeliveryTime(currentLocation)}
            </span>
          </div>

          <button
            onClick={openLocationModal}
            className="flex items-center gap-1 text-xs hover:bg-white/10 px-2 py-1 rounded-full transition-colors"
          >
            <FiMapPin className="h-3 w-3" />
            <span className="max-w-[150px] truncate">
              {currentLocation?.address || "Select Location"}
            </span>
            <FiChevronDown className="h-3 w-3" />
          </button>
        </div>

        {/* Main header */}
        <div className="px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black brandname stroke group-hover:scale-105 transition-transform duration-200">
              SAVE RUSH
            </h1>
          </Link>

          {/* Enhanced Search bar */}
          <div className="flex-1 max-w-2xl mx-4 hidden md:block">
            <div className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search for milk, bananas, bread..."
                className={`w-full px-4 py-2.5 pl-12 rounded-xl bg-gray-50 text-gray-900 focus:outline-none border-2 transition-all duration-200 ${
                  searchFocused 
                    ? "border-purple-400 bg-white shadow-lg" 
                    : "border-transparent hover:bg-gray-100"
                }`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <FiSearch className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-purple-100 rounded-full cursor-pointer transition-colors"
                onClick={handleSearch}
              >
                <FiChevronRight className="h-4 w-4 text-purple-600" />
              </button>
            </div>
          </div>

          {/* Profile and Cart */}
          <div className="flex items-center gap-4">
            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-gray-700 p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>

            {/* Profile dropdown */}
            <div className="relative hidden md:block" ref={dropdownRef}>
              <button
                className="flex items-center gap-1 text-sm text-gray-700 hover:text-[#6B46C1] transition-colors"
                onClick={() => setDropdownOpen((open) => !open)}
              >
                <span>{user ? "My Account" : "Login / Sign Up"}</span>
                <FiChevronDown className="h-4 w-4" />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-2xl shadow-lg z-50 py-6 px-8"
                  style={{ minWidth: "260px" }}
                >
                  {user ? (
                    <>
                      <div className="font-bold text-xl mb-4 text-black">
                        My Account
                      </div>
                      <ul className="space-y-4">
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
                      <div className="font-bold text-xl mb-4 text-black">
                        Welcome!
                      </div>
                      <div className="mb-4 text-sm">
                        Login to save your cart and checkout faster
                      </div>
                      <Link
                        href="/login"
                        className="block w-full text-center bg-[#6B46C1] text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Login / Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Enhanced Cart button */}
            {onOpenCart ? (
              <button
                onClick={onOpenCart}
                className="flex items-center gap-3 bg-gradient-to-r from-[#9BF00B] to-[#8AE00A] text-black px-4 py-2.5 rounded-xl hover:from-[#8AE00A] hover:to-[#7BD009] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <div className="relative">
                  <FiShoppingCart className="h-6 w-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {totalItems}
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">
                    {totalItems > 0 ? `${totalItems} items` : "Cart"}
                  </span>
                  <span className="text-xs font-bold">₹{totalPrice}</span>
                </div>
              </button>
            ) : (
              <Link
                href="/cart"
                className="flex items-center gap-3 bg-gradient-to-r from-[#9BF00B] to-[#8AE00A] text-black px-4 py-2.5 rounded-xl hover:from-[#8AE00A] hover:to-[#7BD009] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <div className="relative">
                  <FiShoppingCart className="h-6 w-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {totalItems}
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">
                    {totalItems > 0 ? `${totalItems} items` : "Cart"}
                  </span>
                  <span className="text-xs font-bold">₹{totalPrice}</span>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Enhanced Mobile search bar and menu */}
        <div
          className={`px-4 pb-3 ${
            mobileMenuOpen ? "block" : "hidden"
          } md:hidden`}
        >
          <div className="relative mb-3">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for milk, bananas, bread..."
              className="w-full px-4 py-2.5 pl-10 rounded-xl bg-gray-50 text-gray-900 focus:outline-none border-2 border-transparent focus:border-purple-400 focus:bg-white transition-all"
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  handleSearch();
                  setMobileMenuOpen(false);
                }
              }}
            />
            <FiSearch className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
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

          <ul className="space-y-3">
            {user ? (
              <>
                <li>
                  <Link
                    href="/account"
                    className="block py-2 hover:text-purple-700 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href="/account/orders"
                    className="block py-2 hover:text-purple-700 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    href="/account/coupons"
                    className="block py-2 hover:text-purple-700 transition-colors"
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
                    className="block w-full text-left py-2 hover:text-purple-700 transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="block py-2 hover:text-purple-700 transition-colors"
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
    </header>
  );
}
