"use client";
import Image from "next/image";
import Link from "next/link";
import { FaGooglePlay, FaApple } from "react-icons/fa";

export default function AppDownloadBanner() {
  return (
    <section className="py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left side content */}
            <div className="p-6 md:p-10 flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
                Download the SaveRush App
              </h2>
              <p className="text-gray-600 mb-6 max-w-lg">
                Get groceries delivered in minutes! Enjoy exclusive app-only
                deals, faster checkout, and real-time order tracking.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-2">Get it on</span>
                  <Link
                    href="#"
                    className="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                  >
                    <div className="mr-3">
                      <FaGooglePlay size={24} />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-xs">GET IT ON</span>
                      <span className="text-xl font-medium leading-tight">
                        Google Play
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-2">
                    Download on the
                  </span>
                  <Link
                    href="#"
                    className="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                  >
                    <div className="mr-3">
                      <FaApple size={24} />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-xs">DOWNLOAD ON THE</span>
                      <span className="text-xl font-medium leading-tight">
                        App Store
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right side image */}
            <div className="hidden md:block md:w-1/3 self-end">
              <div className="relative h-72 w-full">
                <Image
                  src="/images/download-app.png"
                  alt="SaveRush Mobile App"
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "/images/login.png";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
