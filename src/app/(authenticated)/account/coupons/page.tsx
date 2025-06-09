"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function Coupons() {
  const { user } = useAuth();
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching coupons
    setTimeout(() => {
      setCoupons([
        {
          id: "SAVE10",
          code: "SAVE10",
          discount: "10% OFF",
          minAmount: 500,
          validUntil: "2025-06-30",
          description: "10% off on all grocery items",
        },
        {
          id: "FRESH50",
          code: "FRESH50",
          discount: "₹50 OFF",
          minAmount: 200,
          validUntil: "2025-06-15",
          description: "₹50 off on fresh vegetables",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto p-4 md:p-6 mb-20">
      <div className="flex items-center mb-6">
        <Link href="/account" className="text-[#6B46C1] mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold">My Coupons</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <svg
            className="animate-spin h-8 w-8 text-[#6B46C1]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold mb-2">Apply Coupon</h2>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#6B46C1]"
                />
                <button className="bg-[#6B46C1] text-white px-4 py-2 rounded-r-lg">
                  Apply
                </button>
              </div>
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-3">Available Coupons</h2>
          <div className="grid gap-4">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="border rounded-lg p-4 bg-white shadow-sm"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <div className="bg-[#F0EAFA] text-[#6B46C1] font-bold p-2 rounded mr-3">
                      {coupon.discount}
                    </div>
                    <div>
                      <h3 className="font-semibold">{coupon.code}</h3>
                      <p className="text-sm text-gray-500">
                        Min order: ₹{coupon.minAmount}
                      </p>
                    </div>
                  </div>
                  <button className="text-[#6B46C1] font-medium bg-[#F0EAFA] px-3 py-1 rounded-md">
                    Apply
                  </button>
                </div>
                <p className="text-sm text-gray-600">{coupon.description}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Valid until {new Date(coupon.validUntil).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
