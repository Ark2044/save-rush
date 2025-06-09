"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function PaymentMethods() {
  const [activeTab, setActiveTab] = useState("saved");

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

            <div className="border-t pt-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="w-12 h-8 bg-gray-100 flex items-center justify-center rounded mr-3">
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
                    <p className="font-medium">UPI</p>
                    <p className="text-xs text-gray-500">Pay via any UPI app</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  className="h-4 w-4 text-[#6B46C1]"
                  defaultChecked
                />
              </div>
            </div>

            <div className="border-t pt-2">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="w-12 h-8 bg-gray-100 flex items-center justify-center rounded mr-3">
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
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-xs text-gray-500">
                      Pay when your order arrives
                    </p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  className="h-4 w-4 text-[#6B46C1]"
                />
              </div>
            </div>
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

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
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
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6B46C1]"
              />
            </div>

            <div className="flex items-center mt-3">
              <input
                type="checkbox"
                id="saveCard"
                className="h-4 w-4 text-[#6B46C1] rounded"
              />
              <label htmlFor="saveCard" className="ml-2 text-sm text-gray-700">
                Save this card for future payments
              </label>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setActiveTab("saved")}
                className="mr-3 px-4 py-2 text-[#6B46C1] border border-[#6B46C1] rounded-lg"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-[#6B46C1] text-white rounded-lg">
                Save Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
