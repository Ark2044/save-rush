"use client";

import apiClient from "@/lib/apiClient";
import { getCookie } from "@/lib/cookies";

/**
 * Cart Service - handles both authenticated and guest cart operations
 */
const cartService = {
  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    return !!getCookie("jwt-token");
  },

  /**
   * Get current user's cart (authenticated backend or guest localStorage)
   */
  getCart: async () => {
    const isAuth = cartService.isAuthenticated();

    if (isAuth) {
      // For authenticated users, always use backend API
      try {
        return await apiClient.get("/cart", true, false); // Don't allow guest fallback
      } catch (error: any) {
        console.error("Error fetching authenticated cart:", error);
        // Return empty cart structure for authenticated users on error
        return {
          cart: {
            items: [],
            totalPrice: 0,
            originalPrice: undefined,
            currentPrice: undefined,
            appliedCoupon: null,
          },
        };
      }
    } else {
      // For guest users, use localStorage
      const localCartService = (await import("./localCartService")).default;
      const localCart = localCartService.getCart();
      return {
        cart: {
          items: localCart.items.map((item: any) => ({
            product: {
              _id: item.id,
              name: item.name,
              imageUrl: item.imageUrl,
              price: item.basePrice,
            },
            quantity: item.quantity,
          })),
          totalPrice: localCart.totalPrice,
        },
      };
    }
  }
  /**
   * Add an item to the cart (authenticated backend or guest localStorage)
   */,
  addItem: async (itemData: {
    itemId: string;
    quantity: number;
    variantId?: string;
  }) => {
    const isAuth = cartService.isAuthenticated();

    if (isAuth) {
      // For authenticated users, use backend API
      const backendData = {
        productId: itemData.itemId,
        quantity: itemData.quantity,
        variantId: itemData.variantId,
      };
      return await apiClient.post("/cart/add", backendData, true, false); // No guest fallback
    } else {
      // For guest users, use localStorage
      const localCartService = (await import("./localCartService")).default;
      return localCartService.addItemWithQuantity({
        id: itemData.itemId,
        quantity: itemData.quantity,
      });
    }
  }
  /**
   * Update an item quantity in the cart (authenticated backend or guest localStorage)
   */,
  updateItem: async (updateData: { itemId: string; quantity: number }) => {
    const isAuth = cartService.isAuthenticated();

    if (isAuth) {
      // For authenticated users, use backend API
      const backendData = {
        productId: updateData.itemId,
        quantity: updateData.quantity,
      };
      return await apiClient.put("/cart/update", backendData, true, false); // No guest fallback
    } else {
      // For guest users, use localStorage
      const localCartService = (await import("./localCartService")).default;
      return localCartService.updateItem(
        updateData.itemId,
        updateData.quantity
      );
    }
  },
  /**
   * Remove an item from the cart (authenticated backend or guest localStorage)
   */
  removeItem: async (itemId: string) => {
    const isAuth = cartService.isAuthenticated();

    if (isAuth) {
      // For authenticated users, use backend API
      return await apiClient.delete(`/cart/remove/${itemId}`, true, false); // No guest fallback
    } else {
      // For guest users, use localStorage
      const localCartService = (await import("./localCartService")).default;
      return localCartService.removeItem(itemId);
    }
  }
  /**
   * Clear the entire cart (authenticated backend or guest localStorage)
   */,
  clearCart: async () => {
    const isAuth = cartService.isAuthenticated();

    if (isAuth) {
      // For authenticated users, use backend API
      return await apiClient.delete("/cart/clear", true, false); // No guest fallback
    } else {
      // For guest users, use localStorage
      const localCartService = (await import("./localCartService")).default;
      return localCartService.clearCart();
    }
  },

  /**
   * Apply a coupon to the cart (authenticated users only)
   */
  applyCoupon: async (couponId: string) => {
    return apiClient.post("/coupons/apply", { couponId }, true);
  },

  /**
   * Remove any applied coupon from the cart (authenticated users only)
   */
  removeCoupon: async () => {
    return apiClient.post("/coupons/apply", { couponId: null }, true);
  },

  /**
   * Create an order from the current cart (authenticated users only)
   */
  checkout: async (checkoutData: {
    deliveryAddress: string;
    paymentMethod: string;
    couponCode?: string;
  }) => {
    // Ensure the correct field name is used for the address
    const backendData = {
      addressId: checkoutData.deliveryAddress,
      paymentMethodId: checkoutData.paymentMethod,
      couponCode: checkoutData.couponCode,
    };
    return apiClient.post("/cart/checkout", backendData);
  },
  /**
   * Migrate guest cart to authenticated user's cart
   */
  migrateGuestCart: async () => {
    try {
      const localCartService = (await import("./localCartService")).default;
      const guestCart = localCartService.getCart();
      if (guestCart.items.length === 0) {
        return; // No items to migrate
      }

      // Add each item from guest cart to backend
      for (const item of guestCart.items) {
        try {
          await cartService.addItem({
            itemId: item.id,
            quantity: item.quantity,
          });
        } catch (error) {
          console.error(`Failed to migrate item ${item.id}:`, error);
          // Continue with other items even if one fails
        }
      }

      // Clear guest cart after successful migration
      localCartService.clearCart();
    } catch (error) {
      console.error("Error migrating guest cart:", error);
      throw error;
    }
  },
};

export default cartService;
