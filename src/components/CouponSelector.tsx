"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";

interface CouponSelectorProps {
  onBack: () => void;
  onSelect?: (code: string) => void;
  selectedCoupon?: string | null;
}

// Mock coupon data (in a real app, these would come from an API)
const coupons = [
  {
    id: "1",
    text: "10% Off on Amul Products",
    code: "AMUL10",
    color: "bg-[#F3F0FF]",
    discount: 10,
  },
  {
    id: "2",
    text: "15% Off on First Order",
    code: "NEW15",
    color: "bg-[#F3F0FF]",
    discount: 15,
  },
  {
    id: "3",
    text: "₹50 Off on ₹500+",
    code: "SAVE50",
    color: "bg-[#F6FFED]",
    discount: 50,
  },
  {
    id: "4",
    text: "Free Delivery",
    code: "FREEDEL",
    color: "bg-[#F6FFED]",
    discount: 30,
  },
  {
    id: "5",
    text: "20% Off on Vegetables",
    code: "VEG20",
    color: "bg-[#F3F0FF]",
    discount: 20,
  },
  {
    id: "6",
    text: "5% Off on Groceries",
    code: "GROC5",
    color: "bg-[#F3F0FF]",
    discount: 5,
  },
  {
    id: "7",
    text: "Buy 1 Get 1 Free",
    code: "B1G1",
    color: "bg-[#F6FFED]",
    discount: 50,
  },
  {
    id: "8",
    text: "30% Off on Frozen Food",
    code: "FROZ30",
    color: "bg-[#F6FFED]",
    discount: 30,
  },
];

export default function CouponSelector({
  onBack,
  onSelect,
  selectedCoupon,
}: CouponSelectorProps) {
  const { applyCoupon, appliedCoupon, removeCoupon } = useCart();
  const [applying, setApplying] = useState(false);

  const handleApplyCoupon = async (
    couponId: string,
    code: string,
    text: string
  ) => {
    if (applying) return;

    try {
      setApplying(true);

      // If this coupon is already applied, remove it
      if (appliedCoupon && appliedCoupon.id === couponId) {
        await removeCoupon();
        if (onSelect) onSelect("");
        toast.success(`Coupon ${code} removed`);
      } else {
        // Apply the new coupon
        const success = await applyCoupon(couponId);

        if (success) {
          if (onSelect) onSelect(code);
          toast.success(`Coupon ${code} applied: ${text}`);
        }
      }

      // Return to cart view after applying/removing coupon
      onBack();
    } catch (error) {
      console.error("Error applying coupon:", error);
      toast.error("Failed to apply coupon. Please try again.");
    } finally {
      setApplying(false);
    }
  };

  // Determine which coupon is currently applied (if any)
  const getCurrentlyAppliedCoupon = () => {
    if (!appliedCoupon) return null;
    return appliedCoupon.id;
  };

  return (
    <div className="w-full">
      {/* Header with Back Button */}
      <button
        onClick={onBack}
        className="text-gray-800 text-2xl font-bold focus:outline-none mr-2"
        disabled={applying}
      >
        &lt;
      </button>
      {/* Coupon Banner */}
      <div className="flex justify-center mt-8 mb-6">
        <div className="relative w-full max-w-lg flex flex-col items-center">
          <div className="w-full flex justify-center">
            <div className="bg-[#4B23B8] text-white text-lg font-bold py-3 px-8 rounded-l-[40px] rounded-r-[40px] flex items-center justify-center w-80">
              COUPON CODE
            </div>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="text-center text-[#3B2177] text-xl font-semibold mb-8">
        To get Max Discount & offers on your bag
      </div>
      {/* Coupons Grid */}
      <div className="flex justify-center">
        <div className="bg-white rounded-2xl p-6 shadow-md w-full max-w-md">
          {applying ? (
            <div className="py-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#4B23B8] mx-auto mb-4"></div>
              <p className="text-gray-600">Processing coupon...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              {coupons.map((coupon) => {
                const isApplied =
                  appliedCoupon && appliedCoupon.code === coupon.code;

                return (
                  <div
                    key={coupon.id}
                    className={`border ${
                      isApplied ? "border-green-500" : "border-[#4B23B8]"
                    } 
                    rounded-[16px] h-24 flex flex-col justify-between p-3 
                    ${
                      coupon.color
                    } cursor-pointer hover:shadow-md transition-shadow
                    ${isApplied ? "shadow-md ring-2 ring-green-400" : ""}`}
                    onClick={() =>
                      handleApplyCoupon(coupon.id, coupon.code, coupon.text)
                    }
                  >
                    <div className="flex-1 flex items-center justify-center text-[#3B2177] font-semibold text-base text-center">
                      {coupon.text}
                      {isApplied && (
                        <span className="ml-1 text-green-600">✓</span>
                      )}
                    </div>
                    <div className="flex justify-end items-end">
                      <span className="text-[#3B2177] font-bold text-lg">
                        {coupon.code}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
