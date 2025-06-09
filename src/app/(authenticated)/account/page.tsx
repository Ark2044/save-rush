"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function Account() {
  const { user, logout } = useAuth();
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      // Set user details
      setPhoneNumber(user.phoneNumber || "");
      setEmail(user.email || "");
      setUserName(user.displayName || "User");
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      const loadingToast = toast.loading("Logging out...");
      await logout();
      // AuthContext will handle the toast success message and redirect
      toast.dismiss(loadingToast);
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Account Summary */}
      <div className="bg-white p-5 rounded-lg shadow-sm border md:hidden">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-gray-100 h-14 w-14 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold">{userName}</h2>
            <p className="text-gray-600">{phoneNumber}</p>
            {email && <p className="text-gray-600 text-sm">{email}</p>}
          </div>
        </div>
        <div className="flex gap-3">
          <Link
            href="/account/edit"
            className="text-[#6B46C1] text-sm hover:underline"
          >
            Edit Profile
          </Link>
          <button
            onClick={handleLogout}
            className="text-red-500 text-sm hover:underline"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white p-5 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Link href="/account/orders" className="text-sm text-[#6B46C1]">
              View All
            </Link>
          </div>
          <div className="text-center py-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-gray-300 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <p className="text-gray-500 mb-3">No recent orders</p>
            <Link
              href="/"
              className="text-[#6B46C1] font-medium hover:underline"
            >
              Start Shopping
            </Link>
          </div>
        </div>

        {/* Saved Addresses */}
        <div className="bg-white p-5 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Saved Addresses</h2>
            <Link href="/account/addresses" className="text-sm text-[#6B46C1]">
              View All
            </Link>
          </div>
          <div className="text-center py-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-gray-300 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-gray-500 mb-3">No saved addresses</p>
            <Link
              href="/account/addresses"
              className="text-[#6B46C1] font-medium hover:underline"
            >
              Add Address
            </Link>
          </div>
        </div>

        {/* Available Coupons */}
        <div className="bg-white p-5 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Available Coupons</h2>
            <Link href="/account/coupons" className="text-sm text-[#6B46C1]">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-dashed rounded-lg bg-gray-50">
              <div className="flex items-center">
                <div className="bg-[#F0EAFA] text-[#6B46C1] font-bold p-2 rounded mr-3">
                  10% OFF
                </div>
                <div>
                  <h3 className="font-medium">SAVE10</h3>
                  <p className="text-xs text-gray-500">On orders above ₹500</p>
                </div>
              </div>
              <button className="text-[#6B46C1] text-sm font-medium">
                Apply
              </button>
            </div>
            <div className="flex items-center justify-between p-3 border border-dashed rounded-lg bg-gray-50">
              <div className="flex items-center">
                <div className="bg-[#F0EAFA] text-[#6B46C1] font-bold p-2 rounded mr-3">
                  ₹50 OFF
                </div>
                <div>
                  <h3 className="font-medium">FRESH50</h3>
                  <p className="text-xs text-gray-500">On fresh vegetables</p>
                </div>
              </div>
              <button className="text-[#6B46C1] text-sm font-medium">
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white p-5 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Payment Methods</h2>
            <Link
              href="/account/payment-methods"
              className="text-sm text-[#6B46C1]"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">UPI</h3>
                  <p className="text-xs text-gray-500">
                    Default payment method
                  </p>
                </div>
              </div>
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            </div>
            <Link
              href="/account/payment-methods"
              className="block text-center text-[#6B46C1] text-sm font-medium pt-2"
            >
              + Add New Method
            </Link>
          </div>
        </div>
      </div>

      {/* Logout button */}
      <div className="hidden md:block">
        <button
          onClick={handleLogout}
          className="bg-white border border-red-500 text-red-500 w-full py-2 rounded-lg hover:bg-red-50 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
