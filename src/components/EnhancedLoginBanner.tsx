"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function EnhancedLoginBanner() {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(true);

  if (user || !isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {" "}
          <div className="flex items-center mb-3 md:mb-0">
            <div className="hidden md:block mr-4">
              {" "}
              <div className="w-15 h-15 rounded-full border-2 border-white p-3 bg-white/10 backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-9 h-9 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Unlock Full Benefits!</h3>
              <p className="text-sm text-purple-100">
                Save your cart, track orders, and get exclusive offers
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Link
              href="/login"
              className="px-5 py-2 bg-white text-purple-700 rounded-full font-medium hover:bg-purple-50 transition-colors shadow-md"
            >
              Login / Sign Up
            </Link>
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 text-purple-200 hover:text-white"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-purple-500 opacity-20 rounded-full"></div>
      <div className="absolute left-1/3 -bottom-6 w-16 h-16 bg-indigo-400 opacity-20 rounded-full"></div>
    </div>
  );
}
