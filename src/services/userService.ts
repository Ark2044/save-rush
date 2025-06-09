"use client";

import apiClient from "@/lib/apiClient";
import { graphqlClient } from "@/lib/graphql";

/**
 * User Service - handles all user-related API operations
 */
const userService = {
  /**
   * Get current user profile
   */
  getProfile: async () => {
    return apiClient.get("/users/profile");
  },

  /**
   * Update user profile
   */
  updateUser: async (userData: any) => {
    return apiClient.patch("/users/update", userData);
  },

  /**
   * Delete user account
   */
  deleteUser: async () => {
    return apiClient.delete("/users/delete");
  },

  /**
   * Stream vendor-accepted orders using EventSource API
   * This is useful for real-time order updates
   */
  streamVendorAcceptedOrder: async (onMessage: (data: any) => void) => {
    const token = await apiClient.getAuthToken();

    const eventSource = new EventSource(
      `${apiClient.REST_API_URL}/users/stream-order-requests?token=${encodeURIComponent(token)}`
    );

    eventSource.onmessage = (event) => {
      onMessage(JSON.parse(event.data));
    };

    return () => {
      eventSource.close();
    };
  },
};

export default userService;
