"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
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
  },
  {
    id: "t2",
    name: "Rahul Verma",
    avatar: "/assets/images/avatars/avatar-2.jpg",
    rating: 5,
    comment:
      "I love the quality of fresh produce they deliver. Everything arrives fresh and the prices are very reasonable. Their 10-minute delivery promise is no joke!",
    date: "1 week ago",
  },
  {
    id: "t3",
    name: "Ananya Patel",
    avatar: "/assets/images/avatars/avatar-3.jpg",
    rating: 4,
    comment:
      "Great selection of products and excellent customer service. Whenever there's been an issue, their team has resolved it quickly. Highly recommend!",
    date: "2 weeks ago",
  },
  {
    id: "t4",
    name: "Vikram Singh",
    avatar: "/assets/images/avatars/avatar-4.jpg",
    rating: 5,
    comment:
      "The daily deals are amazing! I've saved so much money since I started using Save Rush. The Make Your Meal feature is also very innovative!",
    date: "3 weeks ago",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Save Rush for their
            daily grocery needs
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                    <div className="flex items-center mb-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-purple-100">
                        {testimonial.avatar ? (
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-purple-200 flex items-center justify-center">
                            <span className="text-xl font-medium text-purple-700">
                              {testimonial.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {testimonial.name}
                        </h3>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill={
                                i < testimonial.rating ? "#FBBF24" : "#E5E7EB"
                              }
                              className="w-4 h-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ))}
                          <span className="text-xs text-gray-500 ml-2">
                            {testimonial.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">
                      "{testimonial.comment}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 mx-1 rounded-full ${
                  index === activeIndex ? "bg-purple-600" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
