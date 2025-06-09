"use client";

import apiClient from "@/lib/apiClient";

/**
 * Address Service - handles all address-related API operations
 */
const addressService = {
  /**
   * Get all saved addresses for the current user
   */
  getAddresses: async () => {
    return apiClient.get("/address");
  },

  /**
   * Add a new address
   */
  addAddress: async (addressData: {
    type: string;
    address: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    isDefault?: boolean;
  }) => {
    return apiClient.post("/address", addressData);
  },

  /**
   * Update an existing address
   */
  updateAddress: async (
    addressId: string,
    addressData: {
      type?: string;
      address?: string;
      locality?: string;
      city?: string;
      state?: string;
      pincode?: string;
      isDefault?: boolean;
    }
  ) => {
    return apiClient.put(`/address/${addressId}`, addressData);
  },

  /**
   * Delete an address
   */
  deleteAddress: async (addressId: string) => {
    return apiClient.delete(`/address/${addressId}`);
  },

  /**
   * Set an address as default
   */
  setDefaultAddress: async (addressId: string) => {
    return apiClient.put(`/address/${addressId}/default`, {});
  },
};

export default addressService;
