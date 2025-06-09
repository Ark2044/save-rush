"use client";

import apiClient from "@/lib/apiClient";

/**
 * Order Service - handles all order-related API operations
 */
const orderService = {
  /**
   * Get all orders for the current user
   */
  getOrders: async () => {
    return apiClient.get("/orders");
  },

  /**
   * Get a specific order by ID
   */
  getOrder: async (orderId: string) => {
    return apiClient.get(`/orders/${orderId}`);
  },

  /**
   * Track the status of an order
   */
  trackOrder: async (orderId: string) => {
    return apiClient.get(`/orders/${orderId}/track`);
  },

  /**
   * Cancel an order
   */
  cancelOrder: async (orderId: string, reason?: string) => {
    return apiClient.post(`/orders/${orderId}/cancel`, { reason });
  },
};

export default orderService;
