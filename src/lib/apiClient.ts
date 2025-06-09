"use client";

import { REST_API_URL } from "./graphql";
import { getCookie, setCookie } from "./cookies";

/**
 * Get the current authentication token or guest token
 * @param {boolean} allowGuest - Whether to allow guest token as fallback
 */
const getAuthToken = async (allowGuest = true) => {
  // Try to get JWT token from cookies first (for authenticated users)
  const jwtToken = getCookie("jwt-token");
  if (jwtToken) {
    console.log("Using JWT token for API request");
    return jwtToken;
  }

  // If no JWT token and guest mode is allowed
  if (allowGuest) {
    // For guest users, we'll create a temporary guest token
    // Guest operations will be handled locally until user logs in
    const guestToken = getCookie("guest-token");
    if (guestToken) {
      console.log("Guest mode - using guest token");
      return `guest-${guestToken}`;
    } else {
      // Create a new guest token if none exists
      console.log("Creating new guest token");
      const newGuestToken = `guest-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 15)}`;
      setCookie("guest-token", newGuestToken, 60 * 60 * 24 * 7); // 7 days
      console.log("Guest mode - using new guest token");
      return `guest-${newGuestToken}`;
    }
  }

  // No auth or guest token available
  throw new Error("Authentication required");
};

/**
 * Base API client for making authenticated REST API requests
 */
const apiClient = {
  // Make the REST_API_URL accessible from the client
  REST_API_URL,

  // Export the getAuthToken method for use in services
  getAuthToken
  /**
   * Make a GET request to the API
   */,
  async get(endpoint: string, requireAuth = true, allowGuest = true) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (requireAuth) {
      try {
        const token = await getAuthToken(allowGuest);
        headers["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        console.error("Auth token error:", error);
        // If authentication is required but we can't get a token, throw error
        if (!allowGuest) {
          throw new Error("Authentication required");
        }
        // Continue without auth header for guest requests
      }
    }

    try {
      const response = await fetch(`${REST_API_URL}${endpoint}`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        console.error(
          `API error: ${response.status} ${response.statusText} - ${errorText}`
        );
        throw new Error(`API error: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  },
  /**
   * Make a POST request to the API
   */
  async post(
    endpoint: string,
    data: any,
    requireAuth = true,
    allowGuest = true
  ) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (requireAuth) {
      try {
        const token = await getAuthToken(allowGuest);
        headers["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        console.error("Auth token error:", error);
        // If authentication is required but we can't get a token, throw error
        if (!allowGuest) {
          throw new Error("Authentication required");
        }
        // Continue without auth header for guest requests
      }
    }

    try {
      const response = await fetch(`${REST_API_URL}${endpoint}`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        console.error(
          `API error: ${response.status} ${response.statusText} - ${errorText}`
        );
        throw new Error(`API error: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error(`Error posting to ${endpoint}:`, error);
      throw error;
    }
  }
  /**
   * Make a PUT request to the API
   */,
  async put(
    endpoint: string,
    data: any,
    requireAuth = true,
    allowGuest = true
  ) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (requireAuth) {
      try {
        const token = await getAuthToken(allowGuest);
        headers["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        console.error("Auth token error:", error);
        // If authentication is required but we can't get a token, throw error
        if (!allowGuest) {
          throw new Error("Authentication required");
        }
        // Continue without auth header for guest requests
      }
    }

    try {
      const response = await fetch(`${REST_API_URL}${endpoint}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        console.error(
          `API error: ${response.status} ${response.statusText} - ${errorText}`
        );
        throw new Error(`API error: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error(`Error putting to ${endpoint}:`, error);
      throw error;
    }
  }
  /**
   * Make a PATCH request to the API
   */,
  async patch(
    endpoint: string,
    data: any,
    requireAuth = true,
    allowGuest = true
  ) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (requireAuth) {
      try {
        const token = await getAuthToken(allowGuest);
        headers["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        console.error("Auth token error:", error);
        // If authentication is required but we can't get a token, throw error
        if (!allowGuest) {
          throw new Error("Authentication required");
        }
        // Continue without auth header for guest requests
      }
    }

    try {
      const response = await fetch(`${REST_API_URL}${endpoint}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        console.error(
          `API error: ${response.status} ${response.statusText} - ${errorText}`
        );
        throw new Error(`API error: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error(`Error patching ${endpoint}:`, error);
      throw error;
    }
  }
  /**
   * Make a DELETE request to the API
   */,
  async delete(endpoint: string, requireAuth = true, allowGuest = true) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (requireAuth) {
      try {
        const token = await getAuthToken(allowGuest);
        headers["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        console.error("Auth token error:", error);
        // If authentication is required but we can't get a token, throw error
        if (!allowGuest) {
          throw new Error("Authentication required");
        }
        // Continue without auth header for guest requests
      }
    }

    try {
      const response = await fetch(`${REST_API_URL}${endpoint}`, {
        method: "DELETE",
        headers,
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        console.error(
          `API error: ${response.status} ${response.statusText} - ${errorText}`
        );
        throw new Error(`API error: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error(`Error deleting ${endpoint}:`, error);
      throw error;
    }
  },
};

export default apiClient;
