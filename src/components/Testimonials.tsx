"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiMessageSquare,
} from "react-icons/fi";

interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  location?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Priya Sharma",
    avatar: "/assets/images/avatars/avatar-1.jpg",
    rating: 5,
    comment:
      "Save Rush has completely changed how I shop for groceries. The delivery is incredibly fast, and the app is easy to use. I'm never going back to regular grocery shopping!",
    date: "2 days ago",
    location: "Mumbai",
  },
  {
    id: "t2",
    name: "Rahul Verma",
    avatar: "/assets/images/avatars/avatar-2.jpg",
    rating: 5,
    comment:
      "I love the quality of fresh produce they deliver. Everything arrives fresh and the prices are very reasonable. Their 10-minute delivery promise is no joke!",
    date: "1 week ago",
    location: "Delhi",
  },
  {
    id: "t3",
    name: "Ananya Patel",
    avatar: "/assets/images/avatars/avatar-3.jpg",
    rating: 4,
    comment:
      "Great selection of products and excellent customer service. Whenever there's been an issue, their team has resolved it quickly. Highly recommend!",
    date: "2 weeks ago",
    location: "Bangalore",
  },
  {
    id: "t4",
    name: "Vikram Singh",
    avatar: "/assets/images/avatars/avatar-4.jpg",
    rating: 5,
    comment:
      "The daily deals are amazing! I've saved so much money since I started using Save Rush. The Make Your Meal feature is also very innovative!",
    date: "3 weeks ago",
    location: "Pune",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate testimonials with reduced frequency
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 10000); // Changed from 5000 to 10000 (10 seconds)

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <FiMessageSquare className="w-4 h-4" />
          Customer Reviews
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust Save Rush for their
          daily grocery needs
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Navigation buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-purple-600 transition-colors group"
        >
          <FiChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-purple-600 transition-colors group"
        >
          <FiChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>

        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-purple-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-3 border-purple-200 flex-shrink-0">
                      {testimonial.avatar ? (
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            target.nextElementSibling?.classList.remove(
                              "hidden"
                            );
                          }}
                        />
                      ) : null}
                      <div className="w-full h-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
                        <span className="text-xl font-bold text-white">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {testimonial.name}
                      </h3>
                      {testimonial.location && (
                        <p className="text-gray-500 text-sm mb-2">
                          {testimonial.location}
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={`w-4 h-4 ${
                                i < testimonial.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          {testimonial.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <FiMessageSquare className="absolute -top-2 -left-2 w-8 h-8 text-purple-200" />
                    <p className="text-gray-700 italic text-lg leading-relaxed pl-6">
                      {testimonial.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setActiveIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-purple-600 scale-125"
                  : "bg-gray-300 hover:bg-purple-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
