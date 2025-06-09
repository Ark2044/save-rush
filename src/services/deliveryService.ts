"use client";

import apiClient from "@/lib/apiClient";

/**
 * Delivery Service - handles all delivery-related API operations
 */
const deliveryService = {
  /**
   * Check if delivery is available for a location
   */
  checkAvailability: async (pincode: string) => {
    return apiClient.get(`/delivery/check-availability?pincode=${pincode}`);
  },

  /**
   * Get estimated delivery time for a location
   */
  getEstimatedDeliveryTime: async (address: string) => {
    return apiClient.post("/delivery/estimate-time", { address });
  },

  /**
   * Get delivery fee for a location
   */
  getDeliveryFee: async (addressData: { pincode: string; city?: string }) => {
    return apiClient.post("/delivery/calculate-fee", addressData);
  },
};

export default deliveryService;
