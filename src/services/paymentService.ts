"use client";

import apiClient from "@/lib/apiClient";

/**
 * Payment Service - handles all payment-related API operations
 */
const paymentService = {
  /**
   * Get available payment methods
   */
  getPaymentMethods: async () => {
    return apiClient.get("/payments/methods");
  },

  /**
   * Save a payment method for future use
   */
  savePaymentMethod: async (paymentData: {
    type: "card" | "upi" | "wallet";
    cardNumber?: string;
    expiryDate?: string;
    upiId?: string;
    walletProvider?: string;
    isDefault?: boolean;
  }) => {
    return apiClient.post("/payments/methods", paymentData);
  },

  /**
   * Remove a saved payment method
   */
  removePaymentMethod: async (paymentMethodId: string) => {
    return apiClient.delete(`/payments/methods/${paymentMethodId}`);
  },

  /**
   * Initiate a payment for an order
   */
  initiatePayment: async (paymentData: {
    orderId: string;
    paymentMethod: string;
    amount: number;
  }) => {
    return apiClient.post("/payments/initiate", paymentData);
  },

  /**
   * Verify a payment status
   */
  verifyPayment: async (paymentId: string) => {
    return apiClient.get(`/payments/verify/${paymentId}`);
  },
};

export default paymentService;
