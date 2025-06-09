"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { orderService } from "@/services";

// Mock order data
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

interface Order {
  id: string;
  date: string;
  status:
    | "processing"
    | "packed"
    | "out_for_delivery"
    | "delivered"
    | "cancelled";
  items: OrderItem[];
  total: number;
  address: string;
  paymentMethod: string;
  deliveryPerson?: {
    name: string;
    phone: string;
    rating: number;
  };
  estimatedDelivery: string;
}

// Sample order for demonstration
const mockOrder: Order = {
  id: "ORD12345678",
  date: "2023-11-01T14:30:00",
  status: "out_for_delivery",
  items: [
    {
      id: "1",
      name: "Lays Classic Potato Chips",
      quantity: 2,
      price: 20,
      imageUrl: "/assets/images/categories/chips_and_namkeen.png",
    },
    {
      id: "3",
      name: "Dairy Milk Chocolate",
      quantity: 1,
      price: 40,
      imageUrl: "/assets/images/categories/chocolates.png",
    },
    {
      id: "5",
      name: "Maggi Noodles",
      quantity: 3,
      price: 14,
      imageUrl: "/assets/images/categories/snacks.png",
    },
  ],
  total: 122,
  address: "123 Main Street, Apartment 4B, Mumbai, MH 400001",
  paymentMethod: "UPI",
  deliveryPerson: {
    name: "Rahul Kumar",
    phone: "+91 9876543210",
    rating: 4.8,
  },
  estimatedDelivery: "Today, 2:30 PM - 3:00 PM",
};

export default function TrackOrder() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams?.get("id");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // Fetch order details from the API
    const fetchOrder = async () => {
      if (!orderId) {
        setError("Order ID is missing. Please check the URL.");
        setLoading(false);
        return;
      }

      setLoading(true);
      const loadingToast = toast.loading("Loading order details...");      try {
        // Call the real API service
        const response = await orderService.getOrder(orderId);
        
        if (response && response.order) {
          setOrder(response.order);
          toast.dismiss(loadingToast);
          toast.success("Order details loaded successfully");
        } else {
          throw new Error("Order data is invalid");
        }
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Failed to load order details. Please try again later.");
        
        // Fallback to mock data for demo purposes
        if (orderId === "ORD12345678") {
          setOrder(mockOrder);
          toast.dismiss(loadingToast);
          toast.success("Mock order details loaded");
        } else {
          toast.dismiss(loadingToast);
          toast.error("Order not found");
        }
      }
      finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    } else {
      setError("Please provide an order ID to track your order.");
      setLoading(false);
      toast.error("Order ID is missing");
    }
  }, [orderId]);
  // Handle cancellation of the order
  const handleCancelOrder = async () => {
    if (!order) return;
    
    try {
      const cancelToast = toast.loading("Cancelling your order...");
      
      // Call the real API to cancel the order
      const response = await orderService.cancelOrder(order.id, "Customer cancelled");
      
      // Update the local order state to show cancelled
      setOrder({
        ...order,
        status: "cancelled"
      });
      
      toast.dismiss(cancelToast);
      toast.success("Order cancelled successfully");
    } catch (error) {
      console.error("Failed to cancel order:", error);
      toast.error("Failed to cancel order. Please try again or contact customer support.");
    }
  };
  // Helper function to get status step
  const getStatusStep = (status: Order["status"]) => {
    switch (status) {
      case "processing":
        return 1;
      case "packed":
        return 2;
      case "out_for_delivery":
        return 3;
      case "delivered":
        return 4;
      case "cancelled":
        return 0;
      default:
        return 0;
    }
  };

  // Calculate status step if order exists
  const statusStep = order ? getStatusStep(order.status) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B46C1]"></div>
            <p className="mt-4 text-gray-600">Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-red-500 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Order Tracking Error
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => router.push("/account/orders")}
              className="bg-[#6B46C1] text-white px-6 py-2 rounded-lg hover:bg-[#5B3AA7] transition-colors"
            >
              Go to My Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return null; // This should never happen as we would show error instead
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Order Tracking
        </h1>

        {/* Order Status Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Order #{order.id}
              </h2>
              <p className="text-gray-500 text-sm">
                Placed on{" "}
                {new Date(order.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === "delivered"
                  ? "bg-green-100 text-green-800"
                  : order.status === "cancelled"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {order.status === "processing" && "Processing"}
              {order.status === "packed" && "Packed"}
              {order.status === "out_for_delivery" && "Out for Delivery"}
              {order.status === "delivered" && "Delivered"}
              {order.status === "cancelled" && "Cancelled"}
            </div>
          </div>

          {/* Stepper */}
          {order.status !== "cancelled" && (
            <div className="mb-8">
              <div className="relative">
                {/* Progress Bar */}
                <div className="overflow-hidden h-2 mb-6 flex rounded bg-gray-200">
                  <div
                    className="bg-[#6B46C1] transition-all duration-500"
                    style={{ width: `${(statusStep / 4) * 100}%` }}
                  ></div>
                </div>

                {/* Steps */}
                <div className="flex justify-between relative">
                  <div
                    className={`flex flex-col items-center ${
                      statusStep >= 1 ? "text-[#6B46C1]" : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`rounded-full h-8 w-8 flex items-center justify-center mb-1 ${
                        statusStep >= 1
                          ? "bg-[#6B46C1] text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      1
                    </div>
                    <div className="text-xs font-medium">Processing</div>
                  </div>

                  <div
                    className={`flex flex-col items-center ${
                      statusStep >= 2 ? "text-[#6B46C1]" : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`rounded-full h-8 w-8 flex items-center justify-center mb-1 ${
                        statusStep >= 2
                          ? "bg-[#6B46C1] text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      2
                    </div>
                    <div className="text-xs font-medium">Packed</div>
                  </div>

                  <div
                    className={`flex flex-col items-center ${
                      statusStep >= 3 ? "text-[#6B46C1]" : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`rounded-full h-8 w-8 flex items-center justify-center mb-1 ${
                        statusStep >= 3
                          ? "bg-[#6B46C1] text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      3
                    </div>
                    <div className="text-xs font-medium">Out for Delivery</div>
                  </div>

                  <div
                    className={`flex flex-col items-center ${
                      statusStep >= 4 ? "text-[#6B46C1]" : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`rounded-full h-8 w-8 flex items-center justify-center mb-1 ${
                        statusStep >= 4
                          ? "bg-[#6B46C1] text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      4
                    </div>
                    <div className="text-xs font-medium">Delivered</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Estimated Delivery Time */}
          <div className="bg-[#F3F0FF] p-4 rounded-lg mb-4">
            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#6B46C1] mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="text-gray-600 text-sm">Estimated Delivery Time</p>
                <p className="font-semibold text-gray-800">
                  {order.estimatedDelivery}
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Person Info */}
          {order.deliveryPerson && order.status === "out_for_delivery" && (
            <div className="border border-gray-200 p-4 rounded-lg mb-4">
              <h3 className="font-medium text-gray-800 mb-2">
                Delivery Person
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 rounded-full h-10 w-10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {order.deliveryPerson.name}
                    </p>
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm text-gray-600">
                        {order.deliveryPerson.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <a
                  href={`tel:${order.deliveryPerson.phone}`}
                  className="flex items-center gap-2 bg-[#6B46C1] text-white px-4 py-2 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Call
                </a>
              </div>
            </div>
          )}

          {/* Delivery Address */}
          <div className="mb-4">
            <h3 className="font-medium text-gray-800 mb-2">Delivery Address</h3>
            <p className="text-gray-600">{order.address}</p>
          </div>
        </div>

        {/* Order Items Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Order Items</h3>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center border-b border-gray-100 pb-4"
              >
                <div className="bg-[#F3F0FF] rounded-lg h-16 w-16 p-2 flex items-center justify-center mr-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-12 w-12 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "/assets/images/meal_options/pizza.png";
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{item.name}</h4>
                  <p className="text-gray-500 text-sm">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">
                    ₹{item.price * item.quantity}
                  </p>
                  <p className="text-gray-500 text-xs">
                    ₹{item.price} per item
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{order.total - 30}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="font-medium">₹30</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-2">
              <span>Total</span>
              <span>₹{order.total}</span>
            </div>
            <div className="text-right mt-1">
              <span className="text-gray-500 text-xs">
                Paid via {order.paymentMethod}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <button
            onClick={() => router.push("/account/orders")}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back to Orders
          </button>          {order.status !== "delivered" && order.status !== "cancelled" && (
            <button
              onClick={handleCancelOrder}
              className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
