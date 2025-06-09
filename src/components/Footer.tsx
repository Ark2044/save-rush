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
    <footer className="bg-gradient-to-br from-gray-50 to-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Enhanced Top row with features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="flex flex-col items-center text-center group">
            <div className="bg-gradient-to-br from-[#F3F0FF] to-[#E8E2FF] p-4 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md">
              <FiClock className="h-6 w-6 text-[#6B46C1]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">
              10 Minute Delivery
            </h3>
            <p className="text-sm text-gray-500">
              Get your groceries in minutes
            </p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="bg-gradient-to-br from-[#F3F0FF] to-[#E8E2FF] p-4 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md">
              <FiCheckCircle className="h-6 w-6 text-[#6B46C1]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">
              Best Prices & Offers
            </h3>
            <p className="text-sm text-gray-500">
              Cheaper than your local store
            </p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="bg-gradient-to-br from-[#F3F0FF] to-[#E8E2FF] p-4 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md">
              <FiCreditCard className="h-6 w-6 text-[#6B46C1]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">Easy Returns</h3>
            <p className="text-sm text-gray-500">Hassle-free returns policy</p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="bg-gradient-to-br from-[#F3F0FF] to-[#E8E2FF] p-4 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md">
              <FiLifeBuoy className="h-6 w-6 text-[#6B46C1]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">24/7 Support</h3>
            <p className="text-sm text-gray-500">Customer support all day</p>
          </div>
        </div>

        {/* Enhanced Main footer links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10 pb-10 border-b border-gray-100">
          <div>
            <h4 className="text-[#6B46C1] font-black text-xl mb-4 hover:scale-105 transition-transform cursor-pointer">SAVE RUSH</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-all hover:translate-x-1"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-all hover:translate-x-1"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-all hover:translate-x-1"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/partner"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-all hover:translate-x-1"
                >
                  Partner with Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">
              Shop by Category
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/category/fruits-vegetables"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-all hover:translate-x-1"
                >
                  Fruits & Vegetables
                </Link>
              </li>
              <li>
                <Link
                  href="/category/dairy-breakfast"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-all hover:translate-x-1"
                >
                  Dairy & Breakfast
                </Link>
              </li>
              <li>
                <Link
                  href="/category/snacks-beverages"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-all hover:translate-x-1"
                >
                  Snacks & Beverages
                </Link>
              </li>
              <li>
                <Link
                  href="/category/staples"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-all hover:translate-x-1"
                >
                  Staples & Cooking Essentials
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/offers"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-all hover:translate-x-1"
                >
                  Offers & Deals
                </Link>
              </li>
              <li>
                <Link
                  href="/coupons"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-all hover:translate-x-1"
                >
                  Coupons
                </Link>
              </li>
              <li>
                <Link
                  href="/account/orders"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-all hover:translate-x-1"
                >
                  My Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/track"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-all hover:translate-x-1"
                >
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Help & Support</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/help"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-all hover:translate-x-1"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-all hover:translate-x-1"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-all hover:translate-x-1"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-all hover:translate-x-1"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Download App</h4>
            <p className="text-sm text-gray-500 mb-4">
              Get the SaveRush app for faster ordering and tracking
            </p>

            <div className="flex flex-col gap-2">
              <Link
                href="#"
                className="flex items-center border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 hover:border-purple-300 transition-all hover:scale-105 shadow-sm"
              >
                <FaGooglePlay className="text-black mr-3" size={24} />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">GET IT ON</span>
                  <span className="font-medium">Google Play</span>
                </div>
              </Link>

              <Link
                href="#"
                className="flex items-center border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 hover:border-purple-300 transition-all hover:scale-105 shadow-sm"
              >
                <FaApple className="text-black mr-3" size={24} />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">DOWNLOAD ON THE</span>
                  <span className="font-medium">App Store</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom row with social icons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-gray-500 hover:text-[#6B46C1] transition-all hover:scale-110"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-[#6B46C1] transition-all hover:scale-110"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-[#6B46C1] transition-all hover:scale-110"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-[#6B46C1] transition-all hover:scale-110"
            >
              <FaYoutube size={24} />
            </a>
          </div>

          <div className="text-sm text-gray-500">
            &copy; {currentYear} SaveRush. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">We accept</div>
            <div className="flex gap-2">
              <div className="h-8 w-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow"></div>
              <div className="h-8 w-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow"></div>
              <div className="h-8 w-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow"></div>
              <div className="h-8 w-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
