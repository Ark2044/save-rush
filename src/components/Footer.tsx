import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  FiClock, 
  FiCheckCircle, 
  FiCreditCard, 
  FiLifeBuoy
} from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaGooglePlay, FaApple } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="theme-gradient text-white relative overflow-hidden">
      <div className="container-responsive max-w-7xl mx-auto py-6 sm:py-8 md:py-10 relative z-10">
        {/* Responsive decorative elements */}
        <div className="absolute -right-4 sm:-right-8 -top-4 sm:-top-8 w-20 h-20 sm:w-32 sm:h-32 bg-white opacity-5 rounded-full"></div>
        <div className="absolute left-1/4 -bottom-3 sm:-bottom-6 w-14 h-14 sm:w-20 sm:h-20 bg-purple-400 opacity-10 rounded-full"></div>
        
        {/* Enhanced Top row with features - Responsive grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-10">
          <div className="flex flex-col items-center text-center group">
            <div className="bg-gradient-to-br from-white/20 to-white/10 p-2 xs:p-3 sm:p-4 rounded-full mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md backdrop-blur-sm">
              <FiClock className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-[#9BF00B]" />
            </div>
            <h3 className="font-semibold text-white mb-1 group-hover:text-[#9BF00B] transition-colors text-xs xs:text-sm sm:text-base">
              <span className="hidden xs:inline">10 Minute Delivery</span>
              <span className="xs:hidden">Fast Delivery</span>
            </h3>
            <p className="text-xs sm:text-sm text-purple-100 leading-tight">
              <span className="hidden sm:inline">Get your groceries in minutes</span>
              <span className="sm:hidden">Quick delivery</span>
            </p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="bg-gradient-to-br from-white/20 to-white/10 p-2 xs:p-3 sm:p-4 rounded-full mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md backdrop-blur-sm">
              <FiCheckCircle className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-[#9BF00B]" />
            </div>
            <h3 className="font-semibold text-white mb-1 group-hover:text-[#9BF00B] transition-colors text-xs xs:text-sm sm:text-base">
              <span className="hidden xs:inline">Best Prices & Offers</span>
              <span className="xs:hidden">Best Prices</span>
            </h3>
            <p className="text-xs sm:text-sm text-purple-100 leading-tight">
              <span className="hidden sm:inline">Cheaper than your local store</span>
              <span className="sm:hidden">Great deals</span>
            </p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="bg-gradient-to-br from-white/20 to-white/10 p-2 xs:p-3 sm:p-4 rounded-full mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md backdrop-blur-sm">
              <FiCreditCard className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-[#9BF00B]" />
            </div>
            <h3 className="font-semibold text-white mb-1 group-hover:text-[#9BF00B] transition-colors text-xs xs:text-sm sm:text-base">Easy Returns</h3>
            <p className="text-xs sm:text-sm text-purple-100 leading-tight">
              <span className="hidden sm:inline">Hassle-free returns policy</span>
              <span className="sm:hidden">Easy returns</span>
            </p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="bg-gradient-to-br from-white/20 to-white/10 p-2 xs:p-3 sm:p-4 rounded-full mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md backdrop-blur-sm">
              <FiLifeBuoy className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-[#9BF00B]" />
            </div>
            <h3 className="font-semibold text-white mb-1 group-hover:text-[#9BF00B] transition-colors text-xs xs:text-sm sm:text-base">24/7 Support</h3>
            <p className="text-xs sm:text-sm text-purple-100 leading-tight">
              <span className="hidden sm:inline">Customer support all day</span>
              <span className="sm:hidden">Always here</span>
            </p>
          </div>
        </div>

        {/* Enhanced Main footer links - Responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-10 pb-6 sm:pb-8 md:pb-10 border-b border-white/20">
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-[#9BF00B] font-black text-base sm:text-lg md:text-xl mb-3 sm:mb-4 hover:scale-105 transition-transform cursor-pointer brandname">SAVE RUSH</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-purple-100 hover:text-[#9BF00B] text-xs sm:text-sm transition-all hover:translate-x-1"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-purple-100 hover:text-[#9BF00B] text-xs sm:text-sm transition-all hover:translate-x-1"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-purple-100 hover:text-[#9BF00B] text-xs sm:text-sm transition-all hover:translate-x-1"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/partner"
                  className="text-purple-100 hover:text-[#9BF00B] text-xs sm:text-sm transition-all hover:translate-x-1"
                >
                  Partner with Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">
              Shop by Category
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/category/fruits-vegetables"
                  className="text-purple-100 hover:text-[#9BF00B] text-xs sm:text-sm transition-all hover:translate-x-1"
                >
                  <span className="hidden sm:inline">Fruits & Vegetables</span>
                  <span className="sm:hidden">Fruits & Veggies</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/category/dairy-breakfast"
                  className="text-purple-100 hover:text-[#9BF00B] text-xs sm:text-sm transition-all hover:translate-x-1"
                >
                  <span className="hidden sm:inline">Dairy & Breakfast</span>
                  <span className="sm:hidden">Dairy</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/category/snacks-beverages"
                  className="text-purple-100 hover:text-[#9BF00B] text-xs sm:text-sm transition-all hover:translate-x-1"
                >
                  <span className="hidden sm:inline">Snacks & Beverages</span>
                  <span className="sm:hidden">Snacks</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/category/staples"
                  className="text-purple-100 hover:text-[#9BF00B] text-xs sm:text-sm transition-all hover:translate-x-1"
                >
                  <span className="hidden sm:inline">Staples & Cooking Essentials</span>
                  <span className="sm:hidden">Staples</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/offers"
                  className="text-purple-100 hover:text-[#9BF00B] text-xs sm:text-sm transition-all hover:translate-x-1"
                >
                  <span className="hidden sm:inline">Offers & Deals</span>
                  <span className="sm:hidden">Offers</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/coupons"
                  className="text-purple-100 hover:text-[#9BF00B] text-xs sm:text-sm transition-all hover:translate-x-1"
                >
                  Coupons
                </Link>
              </li>
              <li>
                <Link
                  href="/account/orders"
                  className="text-purple-100 hover:text-[#9BF00B] text-xs sm:text-sm transition-all hover:translate-x-1"
                >
                  My Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/track"
                  className="text-purple-100 hover:text-[#9BF00B] text-xs sm:text-sm transition-all hover:translate-x-1"
                >
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Help & Support</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/help"
                  className="text-purple-100 hover:text-[#9BF00B] text-xs sm:text-sm transition-all hover:translate-x-1"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-purple-100 hover:text-[#9BF00B] text-xs sm:text-sm transition-all hover:translate-x-1"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-purple-100 hover:text-[#9BF00B] text-xs sm:text-sm transition-all hover:translate-x-1"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-purple-100 hover:text-[#9BF00B] text-xs sm:text-sm transition-all hover:translate-x-1"
                >
                  <span className="hidden sm:inline">Terms & Conditions</span>
                  <span className="sm:hidden">Terms</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Download App</h4>
            <p className="text-xs sm:text-sm text-purple-100 mb-3 sm:mb-4">
              <span className="hidden sm:inline">Get the SaveRush app for faster ordering and tracking</span>
              <span className="sm:hidden">Get our mobile app</span>
            </p>

            <div className="flex flex-col gap-2">
              <Link
                href="#"
                className="flex items-center border border-white/30 rounded-lg px-2 sm:px-3 py-2 hover:bg-white/10 hover:border-[#9BF00B] transition-all hover:scale-105 shadow-sm backdrop-blur-sm btn-touch"
              >
                <FaGooglePlay className="text-white mr-2 sm:mr-3" size={20} />
                <div className="flex flex-col">
                  <span className="text-xs text-purple-100">GET IT ON</span>
                  <span className="font-medium text-white text-xs sm:text-sm">Google Play</span>
                </div>
              </Link>

              <Link
                href="#"
                className="flex items-center border border-white/30 rounded-lg px-2 sm:px-3 py-2 hover:bg-white/10 hover:border-[#9BF00B] transition-all hover:scale-105 shadow-sm backdrop-blur-sm btn-touch"
              >
                <FaApple className="text-white mr-2 sm:mr-3" size={20} />
                <div className="flex flex-col">
                  <span className="text-xs text-purple-100">DOWNLOAD ON THE</span>
                  <span className="font-medium text-white text-xs sm:text-sm">App Store</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom row - Responsive layout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4">
            <a
              href="#"
              className="text-purple-100 hover:text-[#9BF00B] transition-all hover:scale-110 btn-touch"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="#"
              className="text-purple-100 hover:text-[#9BF00B] transition-all hover:scale-110 btn-touch"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              className="text-purple-100 hover:text-[#9BF00B] transition-all hover:scale-110 btn-touch"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="text-purple-100 hover:text-[#9BF00B] transition-all hover:scale-110 btn-touch"
            >
              <FaYoutube size={20} />
            </a>
          </div>

          <div className="text-xs sm:text-sm text-purple-100 text-center sm:text-left order-last sm:order-none">
            &copy; {currentYear} SaveRush. All rights reserved.
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-4">
            <div className="text-xs sm:text-sm text-purple-100">We accept</div>
            <div className="flex gap-1 sm:gap-2">
              <div className="h-6 w-8 sm:h-8 sm:w-12 bg-white/20 rounded-md shadow-sm hover:shadow-md transition-shadow backdrop-blur-sm"></div>
              <div className="h-6 w-8 sm:h-8 sm:w-12 bg-white/20 rounded-md shadow-sm hover:shadow-md transition-shadow backdrop-blur-sm"></div>
              <div className="h-6 w-8 sm:h-8 sm:w-12 bg-white/20 rounded-md shadow-sm hover:shadow-md transition-shadow backdrop-blur-sm"></div>
              <div className="h-6 w-8 sm:h-8 sm:w-12 bg-white/20 rounded-md shadow-sm hover:shadow-md transition-shadow backdrop-blur-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
