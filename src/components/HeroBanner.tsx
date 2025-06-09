"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useLocation } from "@/context/LocationContext";
import { FiClock, FiChevronLeft, FiChevronRight, FiMapPin } from 'react-icons/fi';
import ScheduleOrderModal from "./ScheduleOrderModal";
import toast from "react-hot-toast";

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
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

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

  const handleScheduleOrder = (date: string, time: string) => {
    toast.success(`Order scheduled for ${new Date(date).toLocaleDateString()} at ${time}`);
  };

  return (
    <section className="py-2 sm:py-4 md:py-6">
      <div className="container-responsive max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
          {/* Enhanced Main carousel - Responsive height and layout */}
          <div 
            className="w-full lg:w-3/4 relative h-40 xs:h-48 sm:h-56 md:h-64 lg:h-72 rounded-lg sm:rounded-xl overflow-hidden group"
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
                  className={`w-full h-full flex-shrink-0 flex items-center justify-between p-3 xs:p-4 sm:p-6 md:p-8 bg-gradient-to-r ${slide.backgroundColor} relative overflow-hidden`}
                >
                  {/* Responsive decorative elements */}
                  <div className="absolute -right-4 sm:-right-8 -top-4 sm:-top-8 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white opacity-10 rounded-full"></div>
                  <div className="absolute left-1/4 sm:left-1/3 -bottom-3 sm:-bottom-6 w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white opacity-5 rounded-full"></div>
                  
                  <div className="text-white max-w-[60%] sm:max-w-xs z-10">
                    <h2 className="text-sm xs:text-base sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 drop-shadow-lg leading-tight">
                      {slide.title}
                    </h2>
                    <p className="opacity-90 text-xs xs:text-sm sm:text-base md:text-lg mb-2 sm:mb-4 drop-shadow-sm line-clamp-2">
                      {slide.subtitle}
                    </p>
                    <button
                      className={`px-3 xs:px-4 sm:px-6 py-1.5 xs:py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-base font-medium transition-all shadow-lg text-white ${slide.buttonColor} transform hover:scale-105 hover:shadow-xl btn-touch`}
                    >
                      {slide.buttonText}
                    </button>
                  </div>

                  {/* Responsive product image */}
                  <div className="relative h-24 w-24 xs:h-32 xs:w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 hidden xs:block">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-contain drop-shadow-lg"
                      sizes="(max-width: 475px) 128px, (max-width: 640px) 160px, (max-width: 768px) 192px, 192px"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Responsive navigation arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100 btn-touch"
            >
              <FiChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100 btn-touch"
            >
              <FiChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Enhanced Carousel controls - Responsive positioning */}
            <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 flex justify-center gap-1 sm:gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 btn-touch ${
                    index === currentSlide 
                      ? "bg-white w-6 sm:w-8 shadow-lg" 
                      : "bg-white/50 w-1.5 sm:w-2 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Enhanced Delivery time card - Responsive design */}
          <div className="w-full lg:w-1/4 flex flex-col justify-between theme-gradient text-white rounded-lg sm:rounded-xl p-3 xs:p-4 sm:p-6 relative overflow-hidden transition-all duration-300">
            {/* Responsive decorative elements */}
            <div className="absolute -right-3 sm:-right-6 -top-3 sm:-top-6 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white opacity-10 rounded-full"></div>
            <div className="absolute left-1 sm:left-2 -bottom-2 sm:-bottom-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-purple-400 opacity-20 rounded-full"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                <FiClock className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 text-[#9BF00B]" />
                <h3 className="text-sm xs:text-base sm:text-lg font-bold">Delivery in</h3>
              </div>
              <div className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-2 sm:mb-3 text-[#9BF00B] drop-shadow-lg">{timeLeft}</div>
              <p className="text-xs xs:text-sm opacity-90 line-clamp-2 mb-3 sm:mb-4">
                {currentLocation?.address || "Select your delivery location"}
              </p>
              
              {/* Responsive action buttons */}
              <div className="flex flex-col gap-1.5 sm:gap-2">
                <button
                  onClick={openLocationModal}
                  className="flex items-center justify-center gap-1 sm:gap-2 bg-white/20 backdrop-blur-sm text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-white/30 transition-all text-xs sm:text-sm font-medium btn-touch"
                >
                  <FiMapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">Change Location</span>
                  <span className="xs:hidden">Location</span>
                </button>
                
                <button
                  onClick={() => setScheduleModalOpen(true)}
                  className="flex items-center justify-center gap-1 sm:gap-2 bg-[#9BF00B] text-black px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-[#8AE00A] transition-all text-xs sm:text-sm font-medium btn-touch"
                >
                  <FiClock className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">Schedule Order</span>
                  <span className="xs:hidden">Schedule</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Order Modal */}
      <ScheduleOrderModal
        open={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        onSchedule={handleScheduleOrder}
      />
    </section>
  );
}
