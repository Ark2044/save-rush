"use client";

import apiClient from "@/lib/apiClient";

/**
 * Coupon Service - handles all coupon-related API operations
 */
const couponService = {
  /**
   * Get all available coupons for the current user
   */
  getCoupons: async () => {
    return apiClient.get("/coupons");
  },

  /**
   * Apply a coupon to the cart
   */
  applyCoupon: async (couponCode: string) => {
    return apiClient.post("/coupons/apply", { couponCode });
  },

  /**
   * Remove an applied coupon from the cart
   */
  removeCoupon: async () => {
    return apiClient.delete("/coupons/remove");
  },

  /**
   * Validate a coupon code
   */
  validateCoupon: async (couponCode: string, cartTotal?: number) => {
    const queryParams = cartTotal ? `?cartTotal=${cartTotal}` : "";
    return apiClient.post(`/coupons/validate${queryParams}`, { couponCode });
  },
};

export default couponService;
