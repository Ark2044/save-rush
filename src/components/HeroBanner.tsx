"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useLocation } from "@/context/LocationContext";

// Slide data for the carousel
const slides = [
  {
    id: 1,
    title: "Get FREE Delivery on First Order",
    subtitle: "Use code SAVERUSH10",
    image: "/assets/images/products/grocery-bag.png",
    backgroundColor: "from-amber-400 to-yellow-300",
    buttonText: "Claim Now",
    buttonColor: "bg-orange-600 hover:bg-orange-700",
  },
  {
    id: 2,
    title: "Fresh Fruits & Vegetables",
    subtitle: "Farm to doorstep in minutes",
    image: "/assets/images/products/fruits.png",
    backgroundColor: "from-emerald-400 to-green-300",
    buttonText: "Shop Fresh",
    buttonColor: "bg-emerald-700 hover:bg-emerald-800",
  },
  {
    id: 3,
    title: "Daily Essentials at Best Prices",
    subtitle: "Save more on everyday items",
    image: "/assets/images/products/essentials.png",
    backgroundColor: "from-blue-400 to-cyan-300",
    buttonText: "Save Now",
    buttonColor: "bg-blue-700 hover:bg-blue-800",
  },
  {
    id: 4,
    title: "Weekend Special Offers",
    subtitle: "Up to 40% off on selected items",
    image: "/assets/images/products/milk.png",
    backgroundColor: "from-purple-400 to-indigo-300",
    buttonText: "View Offers",
    buttonColor: "bg-indigo-700 hover:bg-indigo-800",
  },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { currentLocation, openLocationModal } = useLocation();
  const [timeLeft, setTimeLeft] = useState("0:00");

  // Auto slide change
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Simulate countdown timer for delivery
  useEffect(() => {
    if (!currentLocation) return;

    // Random time between 8-20 minutes
    const minutes = Math.floor(Math.random() * 12) + 8;
    const seconds = Math.floor(Math.random() * 60);

    let totalSeconds = minutes * 60 + seconds;

    const intervalId = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(intervalId);
        return;
      }

      totalSeconds -= 1;
      const mins = Math.floor(totalSeconds / 60);
      const secs = totalSeconds % 60;

      setTimeLeft(`${mins}:${secs.toString().padStart(2, "0")}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentLocation]);

  return (
    <section className="py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Main carousel */}
          <div className="w-full md:w-3/4 relative h-48 md:h-64 rounded-xl overflow-hidden">
            {" "}
            <div
              className="absolute inset-0 transition-all duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
                display: "flex",
                width: `${slides.length * 100}%`,
              }}
            >
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className={`w-full h-full flex-shrink-0 flex items-center justify-between p-6 md:p-8 bg-gradient-to-r ${slide.backgroundColor}`}
                >
                  <div className="text-white max-w-xs z-10">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 drop-shadow-sm">
                      {slide.title}
                    </h2>
                    <p className="opacity-90 md:text-lg">{slide.subtitle}</p>
                    <button
                      className={`mt-4 px-6 py-2.5 rounded-full text-sm md:text-base font-medium transition-all shadow-md text-white ${slide.buttonColor} transform hover:scale-105`}
                    >
                      {slide.buttonText}
                    </button>
                  </div>

                  <div className="relative h-40 w-40 md:h-48 md:w-48 hidden md:block">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Carousel controls */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-white w-6" : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Delivery time card */}
          <div
            className="w-full md:w-1/4 flex flex-col justify-between bg-[#6B46C1] text-white rounded-xl p-4 md:p-6 cursor-pointer hover:bg-[#5D3EA9] transition-colors"
            onClick={openLocationModal}
          >
            <div>
              <h3 className="text-lg font-bold mb-2">Delivery in</h3>
              <div className="text-3xl font-bold mb-3">{timeLeft}</div>
              <p className="text-sm opacity-90 line-clamp-2">
                {currentLocation?.address || "Select your delivery location"}
              </p>
            </div>

            <div className="flex items-center">
              <span className="text-[#9BF00B] font-medium">
                Change Location
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1 text-[#9BF00B]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
