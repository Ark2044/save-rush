"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CouponSelector from "./CouponSelector";
import { useCart } from "@/context/CartContext";
import { addressService, cartService, paymentService } from "@/services";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import GuestCheckoutPrompt from "./GuestCheckoutPrompt";
import ScheduleOrderModal from "./ScheduleOrderModal";
import { FiEdit2, FiClock } from "react-icons/fi";

interface Address {
  id: string;
  type: string;
  address: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: "card" | "upi" | "wallet" | "cod";
  name: string;
  isDefault?: boolean;
  cardNumber?: string;
  expiryDate?: string;
  upiId?: string;
  walletProvider?: string;
}

interface CartModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CartModal({ open, onClose }: CartModalProps) {
  const [showCoupons, setShowCoupons] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [scheduledDelivery, setScheduledDelivery] = useState<{
    date: string;
    time: string;
  } | null>(null);
  const {
    items,
    updateQuantity,
    totalItems,
    totalPrice,
    loading: cartLoading,
    appliedCoupon,
    discountedPrice,
  } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  // Fetch user addresses and payment methods when modal opens and user is authenticated
  useEffect(() => {
    const fetchAddressesAndPayments = async () => {
      if (!user || !open) return;

      setAddressLoading(true);
      setPaymentLoading(true);
      try {
        // Fetch addresses
        const addressResponse = await addressService.getAddresses();
        if (addressResponse && addressResponse.addresses) {
          setAddresses(addressResponse.addresses);

          // Select default address if available
          const defaultAddress = addressResponse.addresses.find(
            (addr: Address) => addr.isDefault
          );
          if (defaultAddress) {
            setSelectedAddress(defaultAddress.id);
          } else if (addressResponse.addresses.length > 0) {
            setSelectedAddress(addressResponse.addresses[0].id);
          }
        }

        // Fetch payment methods
        const paymentResponse = await paymentService.getPaymentMethods();
        if (paymentResponse && paymentResponse.methods) {
          setPaymentMethods(paymentResponse.methods);

          // Select default payment method if available
          const defaultPayment = paymentResponse.methods.find(
            (method: PaymentMethod) => method.isDefault
          );
          if (defaultPayment) {
            setSelectedPaymentMethod(defaultPayment.id);
          } else if (paymentResponse.methods.length > 0) {
            setSelectedPaymentMethod(paymentResponse.methods[0].id);
          }
        }
      } catch (error) {
        console.error("Failed to fetch addresses or payment methods:", error);
        // Fallback to mock address data
        const mockAddress = {
          id: "default-address-id",
          type: "Home",
          address: "123 Main Street, Apartment 4B",
          locality: "Downtown",
          city: "New York",
          state: "NY",
          pincode: "10001",
          isDefault: true,
        };
        setAddresses([mockAddress]);
        setSelectedAddress(mockAddress.id);

        // Fallback to mock payment methods
        const mockPaymentMethods = [
          {
            id: "upi-payment-method",
            type: "upi" as const,
            name: "UPI",
            upiId: "user@ybl",
            isDefault: true,
          },
          {
            id: "cod-payment-method",
            type: "cod" as const,
            name: "Cash on Delivery",
            isDefault: false,
          },
        ];
        setPaymentMethods(mockPaymentMethods);
        setSelectedPaymentMethod(mockPaymentMethods[0].id);
      } finally {
        setAddressLoading(false);
        setPaymentLoading(false);
      }
    };

    fetchAddressesAndPayments();
  }, [user, open]);

  const handleScheduleDelivery = (date: string, time: string) => {
    setScheduledDelivery({ date, time });
    toast.success(
      `Delivery scheduled for ${new Date(date).toLocaleDateString()} at ${time}`
    );
  };

  const formatScheduledTime = (date: string, time: string) => {
    const dateObj = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    let dateStr;
    if (date === today.toISOString().split("T")[0]) {
      dateStr = "Today";
    } else if (date === tomorrow.toISOString().split("T")[0]) {
      dateStr = "Tomorrow";
    } else {
      dateStr = dateObj.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    }

    const [hour, minute] = time.split(":");
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? "PM" : "AM";
    const displayHour =
      hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
    const timeStr = `${displayHour}:${minute} ${ampm}`;

    return `${dateStr} at ${timeStr}`;
  };

  const handleProceedToCheckout = async () => {
    if (!user) {
      onClose();
      router.push("/login?redirect=checkout");
      return;
    }

    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setCheckoutLoading(true);
      const checkoutToast = toast.loading("Processing your order...");
      const response = await cartService.checkout({
        deliveryAddress: selectedAddress,
        paymentMethod: selectedPaymentMethod,
        couponCode: appliedCoupon ? appliedCoupon.code : undefined,
      });

      toast.dismiss(checkoutToast);
      toast.success("Order placed successfully!");
      onClose();

      // Navigate to order tracking page
      if (response && response.orderId) {
        router.push(`/track?id=${response.orderId}`);
      } else if (response && response._id) {
        router.push(`/track?id=${response._id}`);
      } else {
        router.push("/account/orders");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Failed to place order. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Handle adding a new address
  const handleAddNewAddress = () => {
    // Close the cart modal
    onClose();
    // Navigate to the address page
    router.push("/account/addresses?action=new");
  };

  // Handle coupon selection
  const handleSelectCoupon = (couponCode: string) => {
    setSelectedCoupon(couponCode);
    setShowCoupons(false);
    // Toast notification is handled in the CouponSelector component
  };

  // Handle address selection
  const handleSelectAddress = (addressId: string) => {
    setSelectedAddress(addressId);
  };

  // Handle payment method selection
  const handleSelectPaymentMethod = (paymentMethodId: string) => {
    setSelectedPaymentMethod(paymentMethodId);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 transition-opacity cursor-pointer"
        onClick={onClose}
      />
      {/* Enhanced responsive modal */}
      <aside
        className="fixed top-0 right-0 h-full w-full sm:max-w-md lg:max-w-lg bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 transform translate-x-0 sm:rounded-l-2xl overflow-hidden"
        style={{ boxShadow: "0 8px 32px rgba(80, 80, 120, 0.18)" }}
      >
        {/* Enhanced responsive header */}
        <div className="bg-[#6B46C1] text-white px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 sm:rounded-tl-2xl flex items-center justify-between safe-area-inset">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
            My Cart
          </h2>
          <button
            onClick={onClose}
            className="text-white text-xl sm:text-2xl font-bold focus:outline-none cursor-pointer p-1 hover:bg-white/10 rounded-full transition-colors btn-touch"
          >
            &times;
          </button>
        </div>

        {/* Enhanced responsive cart content */}
        <div className="px-3 sm:px-4 lg:px-6 py-4 sm:py-5 lg:py-6 flex-1 overflow-y-auto modal-scrollbar-hide">
          {showCoupons ? (
            <CouponSelector
              onBack={() => setShowCoupons(false)}
              onSelect={handleSelectCoupon}
              selectedCoupon={selectedCoupon}
            />
          ) : (
            <>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 mb-3 sm:mb-4 lg:mb-6"
                >
                  {/* Responsive product image */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 relative mr-3 sm:mr-4 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Image
                      src={item.imageUrl || "/assets/images/products/milk.png"}
                      alt={item.name}
                      fill
                      className="object-contain rounded-lg p-0.5 sm:p-1"
                      sizes="(max-width: 640px) 48px, (max-width: 1024px) 56px, 64px"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "/assets/images/products/milk.png";
                      }}
                    />
                  </div>

                  {/* Responsive product info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium sm:font-semibold text-gray-900 leading-tight text-sm sm:text-base line-clamp-2">
                      {item.name}
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-2">
                      <button
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full text-gray-800 bg-gray-100 text-sm sm:text-base cursor-pointer hover:bg-gray-200 transition-colors btn-touch flex items-center justify-center"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="px-1 sm:px-2 text-gray-800 text-sm sm:text-base font-medium min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-100 text-gray-800 text-sm sm:text-base cursor-pointer hover:bg-gray-200 transition-colors btn-touch flex items-center justify-center"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Responsive price */}
                  <div className="font-semibold text-gray-900 ml-2 sm:ml-4 text-sm sm:text-base lg:text-lg whitespace-nowrap">
                    ₹{item.basePrice * item.quantity}
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  Your cart is empty
                </div>
              )}{" "}
              {/* Coupons */}
              {items.length > 0 && (
                <button
                  className={`w-full py-3 rounded-xl ${
                    appliedCoupon
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-[#F3F0FF] text-[#6B46C1]"
                  } 
                    font-semibold mb-6 shadow cursor-pointer flex justify-between items-center px-4`}
                  onClick={() => setShowCoupons(true)}
                >
                  <span>
                    {appliedCoupon
                      ? `Coupon Applied: ${appliedCoupon.code} (${appliedCoupon.discount}% off)`
                      : "See all coupons"}
                  </span>
                  <span>{appliedCoupon ? "✓" : ">"}</span>
                </button>
              )}
              {/* Bill Details */}
              {items.length > 0 && (
                <div className="bg-[#E9E3FF] rounded-xl p-6 mb-6 shadow">
                  <div className="font-semibold mb-2 text-gray-800">
                    Bill Details
                  </div>
                  <div className="flex justify-between text-gray-800 items-center mb-1 text-sm">
                    <span className="flex items-center gap-2">Items total</span>
                    <span>
                      ₹{discountedPrice ? discountedPrice : totalPrice}
                    </span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600 items-center mb-1 text-sm">
                      <span className="flex items-center gap-2">
                        Discount ({appliedCoupon.code})
                      </span>
                      <span>
                        -₹
                        {discountedPrice !== undefined
                          ? (discountedPrice - totalPrice).toFixed(2)
                          : "0.00"}
                      </span>
                    </div>
                  )}
                  {totalPrice > 0 && (
                    <>
                      <div className="flex justify-between text-gray-800 items-center mb-1 text-sm">
                        <span className="flex items-center gap-2">
                          Handling charges
                        </span>
                        <span>₹11</span>
                      </div>
                      <div className="flex justify-between text-gray-800 items-center mb-2 text-sm">
                        <span className="flex items-center gap-2">
                          Delivery charges
                        </span>
                        <span>₹30</span>
                      </div>
                      <div className="flex justify-between text-gray-800 items-center font-semibold text-base mt-2">
                        <span>Grand Total</span>
                        <span>₹{totalPrice + 41}</span>
                      </div>
                    </>
                  )}
                </div>
              )}
              {/* Delivery Scheduling */}
              {items.length > 0 && (
                <div className="bg-white rounded-xl p-6 mb-6 shadow">
                  <div className="flex justify-between items-center mb-3">
                    <div className="font-semibold text-gray-800">
                      Delivery Time
                    </div>
                    <button
                      className="text-[#6B46C1] font-medium text-sm cursor-pointer"
                      onClick={() => setScheduleModalOpen(true)}
                    >
                      {scheduledDelivery ? "Change" : "Schedule"}
                    </button>
                  </div>

                  {scheduledDelivery ? (
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-200">
                      <div className="flex items-center gap-2 text-[#6B46C1]">
                        <FiClock className="h-5 w-5" />
                        <span className="font-medium">
                          {formatScheduledTime(
                            scheduledDelivery.date,
                            scheduledDelivery.time
                          )}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <button
                        className="py-3 rounded-lg bg-[#E9E3FF] text-[#6B46C1] font-medium cursor-pointer flex items-center justify-center gap-2"
                        onClick={() => setScheduleModalOpen(true)}
                      >
                        <FiClock className="h-4 w-4" />
                        Schedule for later
                      </button>
                      <div className="text-center text-sm text-gray-500">
                        Or get it delivered ASAP
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* Addresses */}
              {items.length > 0 && !user && <GuestCheckoutPrompt />}
              {items.length > 0 && user && (
                <div className="bg-white rounded-xl p-6 mb-6 shadow">
                  <div className="flex justify-between items-center mb-3">
                    <div className="font-semibold text-gray-800">
                      Delivery Address
                    </div>
                    <button
                      className="text-[#6B46C1] font-medium text-sm cursor-pointer"
                      onClick={handleAddNewAddress}
                    >
                      + Add New
                    </button>
                  </div>
                  <div className="flex flex-col gap-3">
                    {addressLoading ? (
                      <div className="animate-pulse flex flex-col gap-2">
                        <div className="h-16 bg-gray-100 rounded-lg"></div>
                        <div className="h-16 bg-gray-100 rounded-lg"></div>
                        <div className="h-16 bg-gray-100 rounded-lg"></div>
                      </div>
                    ) : (
                      addresses.map((address) => (
                        <div
                          key={address.id}
                          className="border rounded-lg p-4 relative"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-gray-900">
                                {address.type}
                              </div>
                              <div className="text-sm text-gray-600 mt-1">
                                {address.address}, {address.locality},{" "}
                                {address.city}, {address.state},{" "}
                                {address.pincode}
                              </div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                              <FiEdit2 className="h-5 w-5" />
                            </button>
                          </div>
                          <div className="absolute top-4 right-4">
                            <input
                              type="radio"
                              name="address"
                              className="w-4 h-4 text-[#6B46C1] cursor-pointer"
                              onChange={() => handleSelectAddress(address.id)}
                              checked={selectedAddress === address.id}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
              {/* Payment Methods */}
              {items.length > 0 && user && (
                <div className="bg-white rounded-xl p-6 mb-6 shadow">
                  <div className="font-semibold mb-3 text-gray-800">
                    Payment Method
                  </div>
                  <div className="flex flex-col gap-3">
                    {paymentLoading ? (
                      <div className="animate-pulse flex flex-col gap-2">
                        <div className="h-16 bg-gray-100 rounded-lg"></div>
                        <div className="h-16 bg-gray-100 rounded-lg"></div>
                      </div>
                    ) : paymentMethods.length === 0 ? (
                      <div className="text-center text-gray-500 py-4">
                        No payment methods available
                      </div>
                    ) : (
                      paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className="flex justify-between items-center p-4 rounded-lg border cursor-pointer hover:bg-gray-100 transition"
                          onClick={() => handleSelectPaymentMethod(method.id)}
                        >
                          <div>
                            <div className="font-medium text-gray-900">
                              {method.name}
                            </div>
                            {method.type === "card" && (
                              <div className="text-sm text-gray-600">
                                **** **** **** {method.cardNumber?.slice(-4)}
                              </div>
                            )}
                            {method.type === "upi" && (
                              <div className="text-sm text-gray-600">
                                UPI ID: {method.upiId}
                              </div>
                            )}
                            {method.type === "wallet" && (
                              <div className="text-sm text-gray-600">
                                Wallet Provider: {method.walletProvider}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="paymentMethod"
                              className="w-4 h-4 text-[#6B46C1] cursor-pointer"
                              onChange={() =>
                                handleSelectPaymentMethod(method.id)
                              }
                              checked={selectedPaymentMethod === method.id}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        {/* Footer */}
        {!showCoupons && items.length > 0 && (
          <div className="p-6 border-t bg-white rounded-bl-2xl">
            <button
              className="w-full py-4 rounded-xl bg-black text-white font-semibold text-lg shadow hover:bg-gray-900 transition cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={handleProceedToCheckout}
              disabled={checkoutLoading || items.length === 0}
            >
              {" "}
              {checkoutLoading
                ? "Processing..."
                : user
                ? `Proceed To Pay (₹${totalPrice + 41})`
                : "Sign in to Checkout"}
            </button>
          </div>
        )}
      </aside>

      {/* Schedule Order Modal */}
      <ScheduleOrderModal
        open={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        onSchedule={handleScheduleDelivery}
      />
    </>
  );
}
