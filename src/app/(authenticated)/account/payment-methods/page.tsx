"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { paymentService } from "@/services";
import toast from "react-hot-toast";

interface PaymentMethod {
  id: string;
  type: "card" | "upi" | "wallet";
  last4?: string;
  brand?: string;
  isDefault: boolean;
}

export default function PaymentMethods() {
  const [activeTab, setActiveTab] = useState("saved");
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCardData, setNewCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
    isDefault: false,
  });

  const fetchMethods = async () => {
    try {
      setLoading(true);
      const fetchedMethods = await paymentService.getPaymentMethods();
      setMethods(fetchedMethods || []);
    } catch (error) {
      toast.error("Failed to load payment methods.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMethods();
  }, []);

  const handleNewCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewCardData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveCard = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading("Saving card...");
    try {
      await paymentService.savePaymentMethod({
        type: "card",
        cardNumber: newCardData.number,
        expiryDate: newCardData.expiry,
        // CVV and name are usually not stored for security reasons
        isDefault: newCardData.isDefault,
      });
      toast.dismiss(loadingToast);
      toast.success("Card saved successfully!");
      fetchMethods(); // Refresh list
      setActiveTab("saved"); // Switch back to saved methods
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to save card.");
      console.error("Save card error:", error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4 md:p-6 mb-20">
      <div className="flex items-center mb-6">
        <Link href="/account" className="text-[#6B46C1] mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold">Payment Methods</h1>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <div className="flex space-x-6">
          <button
            className={`pb-3 px-1 ${
              activeTab === "saved"
                ? "border-b-2 border-[#6B46C1] text-[#6B46C1] font-medium"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("saved")}
          >
            Saved Methods
          </button>
          <button
            className={`pb-3 px-1 ${
              activeTab === "add"
                ? "border-b-2 border-[#6B46C1] text-[#6B46C1] font-medium"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("add")}
          >
            Add New
          </button>
        </div>
      </div>

      {activeTab === "saved" ? (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-medium mb-4">Saved Payment Methods</h3>
            {loading ? (
              <p>Loading...</p>
            ) : methods.length > 0 ? (
              methods.map((method) => (
                <div className="border-t pt-4" key={method.id}>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <div className="w-12 h-8 bg-gray-100 flex items-center justify-center rounded mr-3">
                        {/* Icon can be dynamic based on method.type */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium capitalize">
                          {method.type === "card"
                            ? `${method.brand} **** ${method.last4}`
                            : method.type}
                        </p>
                        {method.isDefault && (
                          <p className="text-xs text-green-600">
                            Default method
                          </p>
                        )}
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      className="h-4 w-4 text-[#6B46C1]"
                      defaultChecked={method.isDefault}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                You haven't saved any payment methods yet.
              </p>
            )}
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-medium mb-2">Credit & Debit Cards</h3>
            <p className="text-sm text-gray-500 mb-4">
              You haven't saved any cards yet
            </p>
            <button
              onClick={() => setActiveTab("add")}
              className="text-[#6B46C1] text-sm font-medium flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add New Card
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="font-medium mb-6">Add New Payment Method</h3>

          <form className="space-y-4" onSubmit={handleSaveCard}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                name="number"
                value={newCardData.number}
                onChange={handleNewCardChange}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6B46C1]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiry"
                  value={newCardData.expiry}
                  onChange={handleNewCardChange}
                  placeholder="MM/YY"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6B46C1]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={newCardData.cvv}
                  onChange={handleNewCardChange}
                  placeholder="123"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6B46C1]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name on Card
              </label>
              <input
                type="text"
                name="name"
                value={newCardData.name}
                onChange={handleNewCardChange}
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6B46C1]"
              />
            </div>

            <div className="flex items-center mt-3">
              <input
                type="checkbox"
                id="saveCard"
                name="isDefault"
                checked={newCardData.isDefault}
                onChange={handleNewCardChange}
                className="h-4 w-4 text-[#6B46C1] rounded"
              />
              <label htmlFor="saveCard" className="ml-2 text-sm text-gray-700">
                Set as default payment method
              </label>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={() => setActiveTab("saved")}
                className="mr-3 px-4 py-2 text-[#6B46C1] border border-[#6B46C1] rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#6B46C1] text-white rounded-lg"
              >
                Save Card
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
