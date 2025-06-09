"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import toast from "react-hot-toast";
import { cartService } from "@/services";
import { useAuth } from "./AuthContext";

interface CartItem {
  id: string;
  name: string;
  imageUrl: string;
  basePrice: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  originalPrice?: number;
  currentPrice?: number;
  totalPrice: number;
  appliedCoupon?: {
    id: string;
    code: string;
    discount: number;
  } | null;
}

interface CartContextType {
  items: CartItem[];
  loading: boolean;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (couponId: string) => Promise<boolean>;
  removeCoupon: () => Promise<boolean>;
  totalItems: number;
  totalPrice: number;
  discountedPrice?: number;
  appliedCoupon?: { id: string; code: string; discount: number } | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Utility functions for safer calculations
const safeQuantity = (quantity: number): number => {
  return isNaN(quantity) || quantity < 1 ? 1 : Math.min(quantity, 99);
};

const safePrice = (price: number): number => {
  return isNaN(price) || price < 0 ? 0 : price;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartState, setCartState] = useState<CartState>({
    items: [],
    totalPrice: 0,
  });
  const [loading, setLoading] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);
  const { user, isGuest, guestId } = useAuth();

  // Track authentication status to handle cart migration
  const [wasGuest, setWasGuest] = useState(true);

  // Fetch cart when user or guest status changes
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        // If user just logged in (was guest, now authenticated), migrate cart
        if (wasGuest && !isGuest && user && hasInitialized) {
          try {
            await cartService.migrateGuestCart();
            console.log("Guest cart migrated successfully");
          } catch (error) {
            console.error("Failed to migrate guest cart:", error);
            // Continue anyway, just log the error
          }
        }

        const response = await cartService.getCart();
        if (response && response.cart) {
          if (response.cart.items && Array.isArray(response.cart.items)) {
            // Transform the backend cart items structure to match our frontend structure
            const transformedItems = response.cart.items.map((item: any) => ({
              id: item.product._id,
              name: item.product.name,
              imageUrl:
                item.product.imageUrl || "/assets/images/products/milk.png",
              basePrice: item.product.price,
              quantity: item.quantity,
            }));

            setCartState({
              items: transformedItems,
              totalPrice: response.cart.totalPrice || 0,
              originalPrice: response.cart.originalPrice,
              currentPrice: response.cart.currentPrice,
              appliedCoupon: response.cart.appliedCoupon
                ? {
                    id: response.cart.appliedCoupon._id,
                    code: response.cart.appliedCoupon.code,
                    discount: response.cart.appliedCoupon.discount,
                  }
                : null,
            });
          } else {
            setCartState({
              items: [],
              totalPrice: 0,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        // If there's an error, continue with empty cart
        setCartState({
          items: [],
          totalPrice: 0,
        });
      } finally {
        setLoading(false);
        setHasInitialized(true);
        setWasGuest(isGuest);
      }
    };

    fetchCart();
  }, [user, isGuest, guestId]);
  const addToCart = async (item: Omit<CartItem, "quantity">) => {
    // Make sure the item has all required properties
    if (!item.id || !item.name) {
      console.error("Invalid item data:", item);
      toast.error("Unable to add item to cart");
      return;
    }

    try {
      const existingItem = cartState.items.find((i) => i.id === item.id); // For guest users, add the full item details to localStorage first
      if (isGuest) {
        const localCartService = (await import("@/services/localCartService"))
          .default;
        localCartService.addItemWithDetails({
          id: item.id,
          name: item.name,
          imageUrl: item.imageUrl,
          basePrice: item.basePrice,
          quantity: 1,
        });
      } else {
        // For authenticated users, add to backend
        await cartService.addItem({
          itemId: item.id,
          quantity: 1,
        });
      }

      // Then update the local state after successful operation
      setCartState((currentState) => {
        const existingItem = currentState.items.find((i) => i.id === item.id);

        let newItems;
        if (existingItem) {
          newItems = currentState.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
          newItems = [...currentState.items, { ...item, quantity: 1 }];
        }

        // Recalculate total price
        const newTotalPrice = newItems.reduce(
          (sum, item) =>
            sum + safePrice(item.basePrice) * safeQuantity(item.quantity),
          0
        );

        return {
          ...currentState,
          items: newItems,
          totalPrice: newTotalPrice,
        };
      });

      // Show success toast after both operations succeed
      if (existingItem) {
        toast.success(`Added another ${item.name} to cart`);
      } else {
        toast.success(`${item.name} added to cart`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      if (!itemId) {
        console.error("Invalid item ID for removal");
        return;
      }

      const itemToRemove = cartState.items.find((item) => item.id === itemId);
      if (!itemToRemove) {
        console.error(`Item with ID ${itemId} not found in cart`);
        return;
      }

      // Update local state first
      setCartState((currentState) => {
        const newItems = currentState.items.filter(
          (item) => item.id !== itemId
        );

        // Recalculate total price
        const newTotalPrice = newItems.reduce(
          (sum, item) =>
            sum + safePrice(item.basePrice) * safeQuantity(item.quantity),
          0
        );

        return {
          ...currentState,
          items: newItems,
          totalPrice: newTotalPrice,
        };
      });

      toast.success(`${itemToRemove.name} removed from cart`);

      // Update backend (works for both guest and authenticated users)
      await cartService.removeItem(itemId);
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item from cart");

      // Refresh the cart in case of error to resync with backend
      try {
        const response = await cartService.getCart();
        if (response && response.cart && response.cart.items) {
          const transformedItems = response.cart.items.map((item: any) => ({
            id: item.product._id,
            name: item.product.name,
            imageUrl:
              item.product.imageUrl || "/assets/images/products/milk.png",
            basePrice: item.product.price,
            quantity: item.quantity,
          }));

          setCartState({
            items: transformedItems,
            totalPrice: response.cart.totalPrice || 0,
            originalPrice: response.cart.originalPrice,
            currentPrice: response.cart.currentPrice,
            appliedCoupon: response.cart.appliedCoupon
              ? {
                  id: response.cart.appliedCoupon._id,
                  code: response.cart.appliedCoupon.code,
                  discount: response.cart.appliedCoupon.discount,
                }
              : null,
          });
        }
      } catch (refreshError) {
        console.error("Error refreshing cart:", refreshError);
      }
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      // Validate inputs
      if (!itemId) {
        console.error("Invalid item ID for quantity update");
        return;
      }

      if (quantity < 1) {
        await removeFromCart(itemId);
        return;
      }

      // Limit maximum quantity to prevent issues
      const safeQty = Math.min(quantity, 99);

      // Update local state first
      setCartState((currentState) => {
        const targetItem = currentState.items.find(
          (item) => item.id === itemId
        );
        if (!targetItem) {
          console.error(`Item with ID ${itemId} not found in cart`);
          return currentState;
        }

        const updatedItems = currentState.items.map((item) =>
          item.id === itemId ? { ...item, quantity: safeQty } : item
        );

        if (targetItem && targetItem.quantity !== safeQty) {
          toast.success(`Updated ${targetItem.name} quantity to ${safeQty}`);
        }

        // Recalculate total price
        const newTotalPrice = updatedItems.reduce(
          (sum, item) =>
            sum + safePrice(item.basePrice) * safeQuantity(item.quantity),
          0
        );

        return {
          ...currentState,
          items: updatedItems,
          totalPrice: newTotalPrice,
        };
      });

      // Update backend (works for both guest and authenticated users)
      await cartService.updateItem({
        itemId,
        quantity: safeQty,
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const clearCart = async () => {
    try {
      // Update local state first
      setCartState({
        items: [],
        totalPrice: 0,
      });
      toast.success("Cart cleared");

      // Update backend (works for both guest and authenticated users)
      await cartService.clearCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  const applyCoupon = async (couponId: string): Promise<boolean> => {
    try {
      const response = await cartService.applyCoupon(couponId);

      if (response && response.newPrice) {
        // Refresh cart to get updated state
        const cartResponse = await cartService.getCart();
        if (cartResponse && cartResponse.cart) {
          setCartState((currentState) => ({
            ...currentState,
            originalPrice: cartResponse.cart.originalPrice,
            currentPrice: cartResponse.cart.currentPrice,
            appliedCoupon: cartResponse.cart.appliedCoupon
              ? {
                  id: cartResponse.cart.appliedCoupon._id,
                  code: cartResponse.cart.appliedCoupon.code,
                  discount: cartResponse.cart.appliedCoupon.discount,
                }
              : null,
          }));
        }
        toast.success("Coupon applied successfully!");
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Error applying coupon:", error);
      toast.error(error.message || "Failed to apply coupon");
      return false;
    }
  };

  const removeCoupon = async (): Promise<boolean> => {
    try {
      const response = await cartService.removeCoupon();

      if (response) {
        setCartState((currentState) => ({
          ...currentState,
          originalPrice: undefined,
          currentPrice: undefined,
          appliedCoupon: null,
        }));
        toast.success("Coupon removed");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error removing coupon:", error);
      toast.error("Failed to remove coupon");
      return false;
    }
  };

  const totalItems = cartState.items.reduce(
    (sum, item) => sum + safeQuantity(item.quantity),
    0
  );

  // Calculate the correct price based on whether a coupon is applied
  const totalPrice =
    cartState.currentPrice !== undefined
      ? cartState.currentPrice
      : cartState.items.reduce(
          (sum, item) =>
            sum + safePrice(item.basePrice) * safeQuantity(item.quantity),
          0
        );

  // Original price before discount (if a coupon is applied)
  const discountedPrice = cartState.originalPrice;

  return (
    <CartContext.Provider
      value={{
        items: cartState.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        totalItems,
        totalPrice,
        discountedPrice,
        appliedCoupon: cartState.appliedCoupon,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
