"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useLocation } from "@/context/LocationContext";
import { FiClock, FiChevronLeft, FiChevronRight, FiMapPin } from 'react-icons/fi';

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
  const [isPaused, setIsPaused] = useState(false);

  // Auto slide change with pause on hover
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Enhanced Main carousel */}
          <div 
            className="w-full md:w-3/4 relative h-48 md:h-64 rounded-xl overflow-hidden group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="absolute inset-0 transition-all duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
                display: "flex",
                width: `${slides.length * 100}%`,
              }}
            >
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`w-full h-full flex-shrink-0 flex items-center justify-between p-6 md:p-8 bg-gradient-to-r ${slide.backgroundColor} relative overflow-hidden`}
                >
                  {/* Decorative elements */}
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-white opacity-10 rounded-full"></div>
                  <div className="absolute left-1/3 -bottom-6 w-20 h-20 bg-white opacity-5 rounded-full"></div>
                  
                  <div className="text-white max-w-xs z-10">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg">
                      {slide.title}
                    </h2>
                    <p className="opacity-90 md:text-lg mb-4 drop-shadow-sm">{slide.subtitle}</p>
                    <button
                      className={`px-6 py-2.5 rounded-full text-sm md:text-base font-medium transition-all shadow-lg text-white ${slide.buttonColor} transform hover:scale-105 hover:shadow-xl`}
                    >
                      {slide.buttonText}
                    </button>
                  </div>

                  <div className="relative h-40 w-40 md:h-48 md:w-48 hidden md:block">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-contain drop-shadow-lg"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100"
            >
              <FiChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100"
            >
              <FiChevronRight className="h-5 w-5" />
            </button>

            {/* Enhanced Carousel controls */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? "bg-white w-8 shadow-lg" 
                      : "bg-white/50 w-2 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Enhanced Delivery time card */}
          <div
            className="w-full md:w-1/4 flex flex-col justify-between bg-gradient-to-br from-[#6B46C1] to-[#8B5CF6] text-white rounded-xl p-4 md:p-6 cursor-pointer hover:from-[#5D3EA9] hover:to-[#7C3AED] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 relative overflow-hidden"
            onClick={openLocationModal}
          >
            {/* Decorative elements */}
            <div className="absolute -right-6 -top-6 w-20 h-20 bg-white opacity-10 rounded-full"></div>
            <div className="absolute left-2 -bottom-4 w-12 h-12 bg-purple-400 opacity-20 rounded-full"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <FiClock className="h-5 w-5 text-[#9BF00B]" />
                <h3 className="text-lg font-bold">Delivery in</h3>
              </div>
              <div className="text-4xl font-bold mb-3 text-[#9BF00B] drop-shadow-lg">{timeLeft}</div>
              <p className="text-sm opacity-90 line-clamp-2">
                {currentLocation?.address || "Select your delivery location"}
              </p>
            </div>

            <div className="flex items-center mt-4 relative z-10">
              <span className="text-[#9BF00B] font-medium text-sm">
                Change Location
              </span>
              <FiChevronRight className="h-4 w-4 ml-1 text-[#9BF00B] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
