import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Top row with features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="flex flex-col items-center text-center">
            <div className="bg-[#F3F0FF] p-4 rounded-full mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#6B46C1]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">
              10 Minute Delivery
            </h3>
            <p className="text-sm text-gray-500">
              Get your groceries in minutes
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-[#F3F0FF] p-4 rounded-full mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#6B46C1]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Best Prices & Offers
            </h3>
            <p className="text-sm text-gray-500">
              Cheaper than your local store
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-[#F3F0FF] p-4 rounded-full mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#6B46C1]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Easy Returns</h3>
            <p className="text-sm text-gray-500">Hassle-free returns policy</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-[#F3F0FF] p-4 rounded-full mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#6B46C1]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">24/7 Support</h3>
            <p className="text-sm text-gray-500">Customer support all day</p>
          </div>
        </div>

        {/* Main footer links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10 pb-10 border-b border-gray-100">
          <div>
            <h4 className="text-[#6B46C1] font-bold text-xl mb-4">SAVE RUSH</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/partner"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-colors"
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
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-colors"
                >
                  Fruits & Vegetables
                </Link>
              </li>
              <li>
                <Link
                  href="/category/dairy-breakfast"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-colors"
                >
                  Dairy & Breakfast
                </Link>
              </li>
              <li>
                <Link
                  href="/category/snacks-beverages"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-colors"
                >
                  Snacks & Beverages
                </Link>
              </li>
              <li>
                <Link
                  href="/category/staples"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-colors"
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
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-colors"
                >
                  Offers & Deals
                </Link>
              </li>
              <li>
                <Link
                  href="/coupons"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-colors"
                >
                  Coupons
                </Link>
              </li>
              <li>
                <Link
                  href="/account/orders"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-colors"
                >
                  My Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/track"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-colors"
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
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-500 hover:text-[#6B46C1] text-sm transition-colors"
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
                className="flex items-center border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-black mr-3"
                >
                  <path d="M17.9 5c-.7 0-1.7.4-2.8 1-.5.3-1 .6-1.4 1-1-.7-1.9-1-2.7-1-1.3 0-2.2.4-2.7.9C7.4 7.6 7 8.7 7 10.2v.5c0 .7.3 1.4.5 1.8v.1c.5 1.1 1.4 2.3 2.4 3.5.6.7 1.2 1.3 1.9 1.9.2.4.5.8.8 1.2l.1.1.4.4c.2.2.5.2.7 0l.4-.4.1-.1c.3-.4.6-.8.8-1.2.7-.6 1.3-1.2 1.9-1.9 1-1.2 1.9-2.4 2.4-3.5v-.1c.3-.5.5-1.1.5-1.8v-.5c0-1.4-.4-2.5-1.2-3.2-.5-.5-1.4-.9-2.7-.9zm0 1.6c.6 0 1 .1 1.2.3.3.3.5.9.5 1.9v.5c0 .3-.1.6-.2 1-.4.9-1.2 2-2.1 3.1-.6.7-1.2 1.3-1.8 1.9-.2.2-.3.3-.4.5-.1-.1-.2-.3-.4-.5-.6-.5-1.2-1.2-1.8-1.9-.9-1.1-1.7-2.2-2.1-3.1-.1-.4-.2-.7-.2-1v-.5c0-1 .2-1.6.5-1.9.2-.2.6-.3 1.2-.3.5 0 1.1.3 1.8.7l.5.3c.3.2.6.2.9 0l.5-.3c.8-.4 1.3-.7 1.8-.7z" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">GET IT ON</span>
                  <span className="font-medium">Google Play</span>
                </div>
              </Link>

              <Link
                href="#"
                className="flex items-center border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-black mr-3"
                >
                  <path d="M17.2 12c0-1.7.9-3.3 2.3-4.2-.8-1.2-2-2-3.4-2.3-1.4-.3-2.9.1-4.1.7-1.2.6-1.7.6-2.8 0C7.9 5.5 6.4 5.2 5 5.5c-1.4.3-2.6 1.1-3.4 2.3C0 9.5-.3 11.6.3 13.4c.6 1.9 1.7 3.5 3 4.9 1.3 1.4 1.8 1.6 3.1 1.6 1.3 0 1.7-.2 3.1-1.6 1.3-1.4 1.8-1.6 3.1-1.6 1.3 0 1.7.2 3.1 1.6 1.3 1.4 2.4 3 3 4.9.3.7.5 1.4.6 2.1h-4.1v-1.5h-2v-10h4.3c.1-.5-.1-1-.3-1.5-.4-.5-.9-.9-1.4-1.1-.6-.2-1.2-.3-1.8-.2-.6 0-1.2.3-1.7.6-.7.4-1.2 1-1.6 1.7-.3.7-.5 1.5-.5 2.3 0 .8.2 1.6.5 2.3.4.7.9 1.3 1.6 1.7.5.3 1.1.6 1.7.6.6.1 1.2 0 1.8-.2.5-.2 1-.6 1.4-1.1.3-.5.5-1 .3-1.5h-4.3v-2h6.3zm-3.9-7.5c.7-.1 1.5.1 2.2.5.7.4 1.2 1 1.5 1.8-1.2.6-2 1.8-2.2 3.2h-2.3c-.1-1.3-.5-2.5-1.2-3.5.5-.8 1.2-1.6 2-2z" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">DOWNLOAD ON THE</span>
                  <span className="font-medium">App Store</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row with social icons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-gray-500 hover:text-[#6B46C1] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-[#6B46C1] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-[#6B46C1] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-[#6B46C1] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
          </div>

          <div className="text-sm text-gray-500">
            &copy; {currentYear} SaveRush. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">We accept</div>
            <div className="flex gap-2">
              <div className="h-8 w-12 bg-gray-100 rounded-md"></div>
              <div className="h-8 w-12 bg-gray-100 rounded-md"></div>
              <div className="h-8 w-12 bg-gray-100 rounded-md"></div>
              <div className="h-8 w-12 bg-gray-100 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
