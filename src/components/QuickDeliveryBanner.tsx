"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useLocation } from "@/context/LocationContext";
import { FiZap, FiMapPin, FiClock } from "react-icons/fi";

export default function QuickDeliveryBanner() {
  const { currentLocation, openLocationModal } = useLocation();
  const [countdown, setCountdown] = useState({ minutes: 10, seconds: 0 });

  // Add a countdown effect with reduced frequency
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
    }, 5000); // Update every 5 seconds instead of 1 second
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-[#6B46C1] via-[#8A63D2] to-[#A855F7] rounded-xl p-6 text-white cursor-pointer relative overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]"
          onClick={openLocationModal}
        >
          {/* Enhanced Decorative elements */}
          <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-40 h-40 bg-white opacity-5 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
          <div className="absolute -left-10 -bottom-10 w-28 h-28 bg-purple-400 opacity-10 rounded-full group-hover:scale-125 transition-transform duration-700"></div>
          <div className="absolute right-1/4 -top-6 w-16 h-16 bg-yellow-300 opacity-10 rounded-full animate-pulse"></div>

          <div className="flex-1 z-10">
            <div className="inline-flex items-center gap-2 bg-purple-800 bg-opacity-80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full mb-3 animate-pulse">
              <FiZap className="w-3 h-3" />
              {currentLocation
                ? "Delivering to your area"
                : "Set your location"}
            </div>
            <h2 className="text-xl md:text-3xl font-bold mb-2 drop-shadow-lg flex items-center gap-2">
              <FiZap className="w-6 h-6 md:w-8 md:h-8 text-[#9BF00B]" />
              Ultra-fast Delivery!
            </h2>
            <p className="text-sm md:text-base opacity-90 mb-4 md:mb-0 max-w-xl drop-shadow-sm">
              We deliver groceries, fresh produce, and daily essentials in
              minutes. Just set your location and we'll rush your order to you!
            </p>
          </div>

          <div className="flex flex-col items-center z-10">
            <div className="flex flex-col items-center p-3 md:p-5 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 shadow-lg group-hover:bg-opacity-30 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <FiClock className="w-5 h-5 text-[#9BF00B]" />
                <span className="text-sm font-medium">Delivery in</span>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-[#9BF00B] drop-shadow-lg animate-pulse">
                {`${countdown.minutes}:${countdown.seconds
                  .toString()
                  .padStart(2, "0")}`}
              </div>
              <div className="text-xs md:text-sm uppercase tracking-wider font-medium drop-shadow-sm">
                minutes
              </div>
            </div>
            <button className="mt-4 bg-white text-[#6B46C1] px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transition-all transform hover:scale-105 hover:shadow-lg flex items-center group">
              <FiMapPin className="w-4 h-4 mr-2 group-hover:animate-bounce" />
              {currentLocation ? "Change Location" : "Select Location"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
