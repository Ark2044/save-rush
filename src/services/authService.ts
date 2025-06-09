"use client";

import { REST_API_URL } from "@/lib/graphql";

/**
 * Authentication Service - handles JWT token exchange with backend
 */
const authService = {
  /**
   * Exchange Firebase user data for JWT token from backend
   */
  loginWithFirebase: async (firebaseUser: any) => {
    // Try external backend API first (prioritize real backend over mock)
    try {
      console.log("Attempting login with external backend:", REST_API_URL);
      const response = await fetch(`${REST_API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: firebaseUser.uid,
          username:
            firebaseUser.displayName ||
            firebaseUser.phoneNumber ||
            `user_${firebaseUser.uid}`,
          email: firebaseUser.email || `${firebaseUser.uid}@placeholder.com`,
          phoneNumber: firebaseUser.phoneNumber,
          role: "customer", // Default role
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("External backend login successful:", data);
        return data;
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.warn(
          `External backend login failed: ${response.status} - ${
            errorData.message || "Unknown error"
          }`
        );
      }
    } catch (externalError) {
      console.warn("External backend login error:", externalError);
    }

    // Fall back to local Next.js API if external backend fails
    try {
      const response = await fetch(`${REST_API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: firebaseUser.uid,
          username:
            firebaseUser.displayName ||
            firebaseUser.phoneNumber ||
            `user_${firebaseUser.uid}`,
          email: firebaseUser.email || `${firebaseUser.uid}@placeholder.com`,
          phoneNumber: firebaseUser.phoneNumber,
          role: "customer", // Default role
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.warn(
          `External backend login failed: ${response.status} - ${
            errorData.message || "Unknown error"
          }`
        );
        // Return a fallback response for development/guest mode
        return {
          token: null,
          user: {
            uid: firebaseUser.uid,
            username:
              firebaseUser.displayName ||
              firebaseUser.phoneNumber ||
              `user_${firebaseUser.uid}`,
            email: firebaseUser.email || `${firebaseUser.uid}@placeholder.com`,
            phoneNumber: firebaseUser.phoneNumber,
            role: "customer",
          },
          message: "Using local authentication mode",
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.warn(
        "External backend login error, falling back to local mode:",
        error
      );
      // Return a fallback response instead of throwing
      return {
        token: null,
        user: {
          uid: firebaseUser.uid,
          username:
            firebaseUser.displayName ||
            firebaseUser.phoneNumber ||
            `user_${firebaseUser.uid}`,
          email: firebaseUser.email || `${firebaseUser.uid}@placeholder.com`,
          phoneNumber: firebaseUser.phoneNumber,
          role: "customer",
        },
        message: "Using local authentication mode",
      };
    }
  },

  /**
   * Create or validate a guest session with backend
   */
  createGuestSession: async (guestToken: string) => {
    try {
      // For now, we'll just return the guest token as-is
      // In the future, you might want to validate guest tokens with the backend
      return { token: `guest_${guestToken}`, isGuest: true };
    } catch (error) {
      console.error("Guest session error:", error);
      throw error;
    }
  },
};

export default authService;
