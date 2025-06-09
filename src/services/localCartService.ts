"use client";

import { getCookie } from "@/lib/cookies";

interface CartItem {
  id: string;
  name: string;
  imageUrl: string;
  basePrice: number;
  quantity: number;
}

interface LocalCart {
  items: CartItem[];
  totalPrice: number;
  updatedAt: string;
}

/**
 * Local Cart Service - handles guest cart operations using localStorage
 */
const localCartService = {
  /**
   * Get the cart key for the current guest
   */
  getCartKey: () => {
    const guestToken = getCookie("guest-token");
    return `guest-cart-${guestToken}`;
  },

  /**
   * Get guest cart from localStorage
   */
  getCart: (): LocalCart => {
    if (typeof window === "undefined") {
      return { items: [], totalPrice: 0, updatedAt: new Date().toISOString() };
    }

    try {
      const cartKey = localCartService.getCartKey();
      const cartData = localStorage.getItem(cartKey);
      if (cartData) {
        return JSON.parse(cartData);
      }
    } catch (error) {
      console.error("Error reading guest cart:", error);
    }

    return { items: [], totalPrice: 0, updatedAt: new Date().toISOString() };
  },

  /**
   * Save cart to localStorage
   */
  saveCart: (cart: LocalCart) => {
    if (typeof window === "undefined") return;

    try {
      const cartKey = localCartService.getCartKey();
      cart.updatedAt = new Date().toISOString();
      localStorage.setItem(cartKey, JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving guest cart:", error);
    }
  },
  /**
   * Add item to guest cart
   */
  addItem: (item: Omit<CartItem, "quantity">) => {
    const cart = localCartService.getCart();
    const existingItemIndex = cart.items.findIndex((i) => i.id === item.id);

    if (existingItemIndex >= 0) {
      // Update existing item
      cart.items[existingItemIndex].quantity += 1;
    } else {
      // Add new item
      cart.items.push({ ...item, quantity: 1 });
    }

    // Recalculate total
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.basePrice * item.quantity,
      0
    );

    localCartService.saveCart(cart);
    return cart;
  },

  /**
   * Add item with specific quantity (for cart service compatibility)
   */
  addItemWithQuantity: (itemData: { id: string; quantity: number }) => {
    const cart = localCartService.getCart();
    const existingItemIndex = cart.items.findIndex((i) => i.id === itemData.id);

    if (existingItemIndex >= 0) {
      // Update existing item
      cart.items[existingItemIndex].quantity += itemData.quantity;
    } else {
      // We need the full item details to add it properly
      // This method should only be called after addItemWithDetails
      console.warn(
        "Trying to add item without details. This should not happen in normal flow."
      );
    }

    // Recalculate total
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.basePrice * item.quantity,
      0
    );

    localCartService.saveCart(cart);
    return { success: true };
  },

  /**
   * Add item with full details (used when we have all product information)
   */
  addItemWithDetails: (item: CartItem) => {
    const cart = localCartService.getCart();
    const existingItemIndex = cart.items.findIndex((i) => i.id === item.id);

    if (existingItemIndex >= 0) {
      // Update existing item
      cart.items[existingItemIndex].quantity += item.quantity;
    } else {
      // Add new item
      cart.items.push({ ...item });
    }

    // Recalculate total
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.basePrice * item.quantity,
      0
    );

    localCartService.saveCart(cart);
    return cart;
  },

  /**
   * Update item quantity in guest cart
   */
  updateItem: (itemId: string, quantity: number) => {
    const cart = localCartService.getCart();
    const itemIndex = cart.items.findIndex((i) => i.id === itemId);

    if (itemIndex >= 0) {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }

      // Recalculate total
      cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.basePrice * item.quantity,
        0
      );

      localCartService.saveCart(cart);
    }

    return cart;
  },

  /**
   * Remove item from guest cart
   */
  removeItem: (itemId: string) => {
    const cart = localCartService.getCart();
    cart.items = cart.items.filter((item) => item.id !== itemId);

    // Recalculate total
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.basePrice * item.quantity,
      0
    );

    localCartService.saveCart(cart);
    return cart;
  },

  /**
   * Clear guest cart
   */
  clearCart: () => {
    const emptyCart = {
      items: [],
      totalPrice: 0,
      updatedAt: new Date().toISOString(),
    };
    localCartService.saveCart(emptyCart);
    return emptyCart;
  },

  /**
   * Migrate guest cart to authenticated user
   */
  migrateToAuthenticatedCart: async (cartService: any) => {
    const guestCart = localCartService.getCart();

    if (guestCart.items.length === 0) {
      return;
    }

    try {
      // Add all guest cart items to the authenticated cart
      for (const item of guestCart.items) {
        for (let i = 0; i < item.quantity; i++) {
          await cartService.addItem({
            itemId: item.id,
            quantity: 1,
          });
        }
      }

      // Clear guest cart after migration
      localCartService.clearCart();
      console.log("Guest cart migrated to authenticated cart");
    } catch (error) {
      console.error("Error migrating guest cart:", error);
    }
  },
};

export default localCartService;
