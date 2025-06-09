"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { orderService } from "@/services";

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
  estimatedDelivery: string;
}

// Mock orders for demonstration
const mockOrders: Order[] = [
  {
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
    estimatedDelivery: "Today, 2:30 PM - 3:00 PM",
  },
  {
    id: "ORD87654321",
    date: "2023-10-28T10:15:00",
    status: "delivered",
    items: [
      {
        id: "2",
        name: "Kurkure Masala Munch",
        quantity: 3,
        price: 20,
        imageUrl: "/assets/images/categories/chips_and_namkeen.png",
      },
      {
        id: "4",
        name: "Amul Butter",
        quantity: 1,
        price: 50,
        imageUrl: "/assets/images/ingredients/cheese.png",
      },
    ],
    total: 110,
    address: "123 Main Street, Apartment 4B, Mumbai, MH 400001",
    estimatedDelivery: "Oct 28, 11:30 AM - 12:00 PM",
  },
];

export default function Orders() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch real orders from the backend
    const fetchOrders = async () => {
      setLoading(true);
      const loadingToast = toast.loading("Loading your orders...");

      try {
        if (user) {
          // Try to get orders from the real API
          const response = await orderService.getOrders();

          if (response && response.orders && response.orders.length > 0) {
            setOrders(response.orders);
            toast.dismiss(loadingToast);
            toast.success(
              `Found ${response.orders.length} order${
                response.orders.length > 1 ? "s" : ""
              }`
            );
          } else {
            // Fall back to mock data if API returns empty result
            setOrders(mockOrders);
            toast.dismiss(loadingToast);
            toast.success(
              `Found ${mockOrders.length} order${
                mockOrders.length > 1 ? "s" : ""
              }`
            );
          }
        } else {
          // Not signed in - use mock data
          setOrders(mockOrders);
          toast.dismiss(loadingToast);

          if (mockOrders.length > 0) {
            toast.success(
              `Found ${mockOrders.length} order${
                mockOrders.length > 1 ? "s" : ""
              }`
            );
          } else {
            toast.error("You don't have any orders yet");
          }
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        // Fall back to mock data in case of error
        setOrders(mockOrders);
        toast.dismiss(loadingToast);
        toast.error("Couldn't connect to server, showing offline data");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // Get status badge color and text
  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "processing":
        return { color: "bg-yellow-100 text-yellow-800", text: "Processing" };
      case "packed":
        return { color: "bg-blue-100 text-blue-800", text: "Packed" };
      case "out_for_delivery":
        return {
          color: "bg-purple-100 text-purple-800",
          text: "Out for Delivery",
        };
      case "delivered":
        return { color: "bg-green-100 text-green-800", text: "Delivered" };
      case "cancelled":
        return { color: "bg-red-100 text-red-800", text: "Cancelled" };
      default:
        return { color: "bg-gray-100 text-gray-800", text: "Unknown" };
    }
  }; // Handle track order button click
  const handleTrackOrder = async (orderId: string) => {
    toast.loading("Loading order tracking...", { id: "track-order" });

    try {
      // Try to fetch tracking information from the backend
      await orderService.trackOrder(orderId);
      router.push(`/track?id=${orderId}`);
    } catch (error) {
      console.error("Error tracking order:", error);
      // Even if the API call fails, we still navigate to the page
      // which will show mock data
      router.push(`/track?id=${orderId}`);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold">My Orders</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40 bg-white rounded-lg shadow-sm">
          <svg
            className="animate-spin h-8 w-8 text-[#6B46C1]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : orders.length > 0 ? (
        <div className="grid gap-4">
          {orders.map((order) => {
            const { color, text } = getStatusBadge(order.status);
            return (
              <div
                key={order.id}
                className="border rounded-lg p-5 bg-white shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800">
                        Order #{order.id}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${color}`}
                      >
                        {text}
                      </span>
                    </div>
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
                  <div className="mt-3 md:mt-0">
                    <button
                      onClick={() => handleTrackOrder(order.id)}
                      className="text-[#6B46C1] hover:underline font-medium text-sm flex items-center gap-1"
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
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      Track Order
                    </button>
                  </div>
                </div>

                {/* Order Items */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="space-y-3">
                    {order.items.slice(0, 2).map((item) => (
                      <div key={item.id} className="flex items-center">
                        <div className="bg-[#F3F0FF] rounded-lg h-12 w-12 p-1 flex items-center justify-center mr-3">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-8 w-8 object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src =
                                "/assets/images/meal_options/pizza.png";
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity} × ₹{item.price}
                          </p>
                        </div>
                      </div>
                    ))}

                    {order.items.length > 2 && (
                      <p className="text-sm text-gray-500">
                        + {order.items.length - 2} more item(s)
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                    <span className="font-medium">Order Total:</span>
                    <span className="font-semibold text-gray-800">
                      ₹{order.total}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:justify-between">
                  <button
                    onClick={() => handleTrackOrder(order.id)}
                    className="bg-[#6B46C1] text-white px-4 py-2 rounded-lg hover:bg-[#5B3AA7] transition-colors flex items-center justify-center gap-2"
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Track Order
                  </button>

                  {order.status === "delivered" && (
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
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
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Reorder
                    </button>
                  )}

                  {(order.status === "processing" ||
                    order.status === "packed") && (
                    <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-300 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <h2 className="text-xl font-medium mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-4">
            You haven't placed any orders yet.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#6B46C1] text-white px-5 py-2 rounded-lg"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
