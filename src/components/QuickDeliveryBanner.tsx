"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useLocation } from "@/context/LocationContext";

export default function QuickDeliveryBanner() {
  const { currentLocation, openLocationModal } = useLocation();
  const [countdown, setCountdown] = useState({ minutes: 10, seconds: 0 });

  // Add a countdown effect for demonstration
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          // Reset when countdown reaches zero
          return { minutes: 10, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-[#6B46C1] to-[#8A63D2] rounded-xl p-6 text-white cursor-pointer relative overflow-hidden group"
          onClick={openLocationModal}
        >
          {/* Decorative elements */}
          <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-40 h-40 bg-white opacity-5 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
          <div className="absolute -left-10 -bottom-10 w-28 h-28 bg-purple-400 opacity-10 rounded-full"></div>

          <div className="flex-1 z-10">
            <div className="inline-block bg-purple-800 text-white text-xs px-3 py-1 rounded-full mb-3 animate-pulse">
              {currentLocation
                ? "Delivering to your area"
                : "Set your location"}
            </div>
            <h2 className="text-xl md:text-3xl font-bold mb-2">
              Ultra-fast Delivery!
            </h2>
            <p className="text-sm md:text-base opacity-90 mb-4 md:mb-0 max-w-xl">
              We deliver groceries, fresh produce, and daily essentials in
              minutes. Just set your location and we&apos;ll rush your order to
              you!
            </p>
          </div>

          <div className="flex flex-col items-center z-10">
            <div className="flex flex-col items-center p-3 md:p-5 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm">
              <div className="text-5xl md:text-6xl font-bold text-[#9BF00B]">
                {`${countdown.minutes}:${countdown.seconds
                  .toString()
                  .padStart(2, "0")}`}
              </div>
              <div className="text-sm md:text-base uppercase tracking-wider font-medium">
                minute delivery
              </div>
            </div>
            <button className="mt-4 bg-white text-[#6B46C1] px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transition-all transform hover:scale-105 hover:shadow-lg flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {currentLocation ? "Change Location" : "Select Location"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
